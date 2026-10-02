import copy
from datetime import timedelta
import json
from pathlib import Path
import tempfile
import unittest
from urllib.parse import parse_qs, urlsplit

from test_nfl_results import HTML, ROOT, event_for
import nfl_common as common
import nfl_forecasts as forecasts
import nfl_history as history
import nfl_results as nfl
import nfl_watch as watch


HISTORY = common.script_data(HTML, "history-data")
CURRENT = common.script_data(HTML, "results-data")
LEDGER = common.script_data(HTML, "forecasts-data")
GAMES = common.load_games(HTML)
NOW = common.instant(HISTORY["checkedAt"])


def historical_fixture(record):
    game = common.Game(
        record["eventId"], record["date"], record["week"], record["awayTeamId"],
        record["homeTeamId"], None, record["scheduledAt"], venue=record["venue"], original=False,
    )
    event = event_for(game, final=record["status"] == "final", away=record["awayScore"] or 0, home=record["homeScore"] or 0, period=5 if "OT" in record["statusDetail"] else 4)
    event["seasonType"] = {"type": 2}
    event["competitions"][0].update(
        neutralSite=bool(record["venue"]), venue={"address": {"city": record["venue"]}},
    )
    return game, event


class HistoricalResultsTests(unittest.TestCase):
    def test_48_historical_finals_no_predictions_and_correct_dates(self):
        history.validate_history(HISTORY, HTML)
        self.assertEqual(len(HISTORY["games"]), 48)
        for week in (1, 2, 3):
            self.assertEqual(sum(item["week"] == week for item in HISTORY["games"].values()), 16)
        self.assertEqual(min(item["date"] for item in HISTORY["games"].values()), "2026-09-09")
        self.assertEqual(max(item["date"] for item in HISTORY["games"].values()), "2026-09-28")
        first = HISTORY["games"]["401872656"]
        self.assertEqual((first["awayTeamId"], first["homeTeamId"], first["awayScore"], first["homeScore"], first["winnerTeamId"]), ("17", "26", 10, 13, "26"))
        self.assertTrue(all(set(item) == history.HISTORY_FIELDS for item in HISTORY["games"].values()))
        self.assertFalse(any("pick" in key.lower() for item in HISTORY["games"].values() for key in item))

    def test_season_specific_schedule_is_cross_checked_by_daily_event_id(self):
        events = [historical_fixture(item)[1] for item in HISTORY["games"].values()]
        calls = []
        def source(url):
            calls.append(url)
            parsed = urlsplit(url)
            if "/teams/" in parsed.path:
                self.assertEqual(parse_qs(parsed.query), {"season": ["2026"], "seasontype": ["2"]})
                team_id = parsed.path.split("/teams/")[1].split("/")[0]
                selected = [event for event in events if team_id in {competitor["id"] for competitor in event["competitions"][0]["competitors"]}]
                return {"season": {"year": 2026, "type": 2}, "events": selected}
            day = parse_qs(parsed.query)["dates"][0]
            selected = [event for event in events if common.instant(event["date"]).astimezone(common.EASTERN).strftime("%Y%m%d") == day]
            return {"events": selected}
        imported = history.collect_history(HTML, source, NOW)
        self.assertEqual(imported["games"], HISTORY["games"])
        self.assertEqual(sum("/teams/" in url for url in calls), 32)
        self.assertEqual(len(calls), len(set(calls)))

    def test_ties_and_unfinished_games_do_not_get_winners_or_pick_status(self):
        record = next(iter(HISTORY["games"].values()))
        game, event = historical_fixture(record)
        tied = event_for(game, final=True, away=20, home=20, period=5)
        result = history.historical_result(game, tied, NOW, "https://example.com")
        self.assertIsNone(result["winnerTeamId"])
        self.assertEqual(result["statusDetail"], "Final / OT")
        self.assertNotIn("pickResult", result)
        for status in ("STATUS_IN_PROGRESS", "STATUS_POSTPONED", "STATUS_CANCELED"):
            with self.subTest(status=status):
                result = history.historical_result(game, event_for(game, status=status), NOW, "https://example.com")
                self.assertIsNone(result["awayScore"])
                self.assertIsNone(result["winnerTeamId"])
                self.assertNotIn("pickResult", result)

    def test_missing_scores_wrong_season_and_unverified_winner_are_rejected(self):
        game, original = historical_fixture(next(iter(HISTORY["games"].values())))
        for kind in ("score", "season", "winner", "team"):
            event = copy.deepcopy(original)
            if kind == "score":
                event["competitions"][0]["competitors"][0].pop("score")
            elif kind == "season":
                event["season"]["year"] = 2025
            elif kind == "winner":
                event["competitions"][0]["competitors"][0]["winner"] = True
            else:
                event["competitions"][0]["competitors"][0]["team"]["id"] = "999"
            with self.subTest(kind=kind), self.assertRaises(ValueError):
                history.historical_result(game, event, NOW, "https://example.com")

    def test_prediction_fields_cannot_be_imported(self):
        changed = copy.deepcopy(HISTORY)
        next(iter(changed["games"].values()))["pickReason"] = "A retroactive prediction is forbidden"
        common.seal(changed)
        with self.assertRaisesRegex(ValueError, "prediction fields"):
            history.validate_history(changed, HTML)

    def test_import_and_result_updater_preserve_forecast_history_and_each_other(self):
        with tempfile.TemporaryDirectory() as directory:
            page = Path(directory) / "index.html"
            page.write_bytes(HTML.encode())
            history.write_history(page, HTML, HISTORY)
            updated = common.read_html(page)
            for identifier in ("games-data", "catalog-data", "forecasts-data", "fixtures-data", "results-data"):
                self.assertEqual(common.script_data(updated, identifier), common.script_data(HTML, identifier))
            nfl.write_results(page, updated, CURRENT)
            self.assertEqual(common.script_data(common.read_html(page), "history-data"), HISTORY)
            self.assertEqual(json.loads(page.with_name("history.json").read_text()), HISTORY)

    def test_history_is_excluded_from_forecast_targets_and_accuracy_denominator(self):
        self.assertEqual(len(GAMES), 237)
        self.assertEqual(len(CURRENT["games"]), 237)
        self.assertFalse(set(HISTORY["games"]) & set(CURRENT["games"]))
        self.assertFalse(set(HISTORY["games"]) & {game.event_id for game in GAMES})
        self.assertEqual(sum(result["pickResult"] == "incorrect" for result in CURRENT["games"].values()), 1)
        self.assertEqual(sum(result["pickResult"] == "pending" for result in CURRENT["games"].values()), 236)
        self.assertIsNone(forecasts.batch_for(GAMES, CURRENT, LEDGER, NOW))
        self.assertEqual(common.digest(common.script_data(HTML, "games-data")), common.PICKS_SHA256)

    def test_adding_old_finals_cannot_open_tabs_or_rebaseline_existing_state(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / "source"
            state_dir = Path(directory) / "private"
            state_dir.mkdir()
            page = root / common.PAGE_PATH
            page.parent.mkdir(parents=True)
            without_history = common.replace_data(HTML, "history-data", {})
            page.write_text(without_history, encoding="utf-8")
            opened = []
            options = {
                "fetch": lambda _url: CURRENT, "sync": lambda _root: "fixture-commit",
                "open_url": opened.append, "force_poll": True,
            }
            baseline = watch.run_once(root, state_dir, NOW, read_html=lambda: without_history, **options)
            page.write_text(HTML, encoding="utf-8")
            after = watch.run_once(root, state_dir, NOW + timedelta(minutes=5), read_html=lambda: HTML, **options)
            self.assertEqual(after["seenFinalIds"], baseline["seenFinalIds"])
            self.assertEqual(after["lastSeenAssessmentId"], baseline["lastSeenAssessmentId"])
            self.assertEqual(after["seenFinalIds"], ["401872964"])
            self.assertFalse(opened)


if __name__ == "__main__":
    unittest.main()
