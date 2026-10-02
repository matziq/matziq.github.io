import copy
import base64
from datetime import datetime, timedelta
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from test_nfl_results import GAMES, HTML, NOW, event_for, snapshot
import nfl_common as common
import nfl_forecasts as forecasts
import nfl_results as nfl
import nfl_season as season


def ledger_at(now=NOW):
    return forecasts.empty_ledger(now)


def candidate_for(games, ledger, results, now, selections=None):
    batch = forecasts.batch_for(games, results, ledger, now)
    selected = selections or {}
    sources = {
        "performance": {"title": "Public performance fixture", "url": "https://www.espn.com/nfl/", "checkedAt": common.stamp(now)},
        "availability": {"title": "Public injury fixture", "url": "https://www.nfl.com/injuries/", "checkedAt": common.stamp(now)},
    }
    decisions = [{
        "eventId": game.event_id, "pickTeamId": selected.get(game.event_id, game.pick_id or game.away_id),
        "reason": "I expect the selected team to have the stronger matchup. The opponent's strengths and uncertain availability could still change the outcome.",
        "rationale": "Reviewed the current opponent context and verified availability before making this provisional selection.",
        "factors": {
            "performance": "Current form is compared with opponent quality rather than raw wins.",
            "availability": "Verified current injuries and quarterback changes are distinguished from uncertain return dates.",
            "news": "Suspensions, roster changes and recent usage are checked without inventing future transactions.",
            "context": "Rest, travel, venue and available weather are considered; unknown forecasts remain unknown.",
        },
        "sourceIds": list(sources),
    } for game in games if game.teams_known and results["games"][game.event_id]["status"] != "final"]
    return batch, {
        "batchId": batch["id"], "evidenceCollectedAt": common.stamp(now), "summary": "Fixture reassessment.",
        "limitations": "Not a guarantee; only known participants may be selected.",
        "sources": sources, "teamAssessments": {}, "decisions": decisions,
    }


class ForecastTests(unittest.TestCase):
    def setUp(self):
        self.games = GAMES[:3]
        self.events = [event_for(game, final=index == 0) for index, game in enumerate(self.games)]
        self.results, _ = nfl.refresh(self.games, None, lambda _url: {"events": self.events}, NOW, force=True)
        self.ledger = ledger_at()
        self.now = NOW + timedelta(minutes=5)

    def prepare(self, selections=None, events=None, now=None):
        now = now or self.now
        batch, candidate = candidate_for(self.games, self.ledger, self.results, now, selections)
        verified = forecasts.verify_current_games(self.games, self.results, lambda _url: {"events": events or self.events}, now)
        return forecasts.prepare_assessment(self.games, self.results, self.ledger, batch, candidate, verified, now)

    def test_new_final_duplicate_and_meaningful_correction_triggers(self):
        batch = forecasts.batch_for(self.games, self.results, self.ledger, self.now)
        self.assertEqual(set(batch["triggerResults"]), {self.games[0].event_id})
        prepared = self.prepare()
        self.assertIsNone(forecasts.batch_for(self.games, self.results, prepared, self.now))
        corrected = copy.deepcopy(self.results)
        corrected["games"][self.games[0].event_id].update(homeScore=30, resultUpdatedAt=common.stamp(self.now))
        common.seal(corrected)
        next_batch = forecasts.batch_for(self.games, corrected, prepared, self.now)
        self.assertNotEqual(next_batch["id"], batch["id"])
        heartbeat = copy.deepcopy(self.results)
        heartbeat["publishedAt"] = common.stamp(self.now)
        common.seal(heartbeat)
        self.assertIsNone(forecasts.batch_for(self.games, heartbeat, prepared, self.now))

    def test_failure_keeps_batch_retryable_and_does_not_mutate_ledger(self):
        batch, candidate = candidate_for(self.games, self.ledger, self.results, self.now)
        before = copy.deepcopy(self.ledger)
        candidate["decisions"] = candidate["decisions"][:-1]
        verified = forecasts.verify_current_games(self.games, self.results, lambda _url: {"events": self.events}, self.now)
        with self.assertRaisesRegex(ValueError, "omitted"):
            forecasts.prepare_assessment(self.games, self.results, self.ledger, batch, candidate, verified, self.now)
        self.assertEqual(self.ledger, before)
        self.assertEqual(forecasts.batch_for(self.games, self.results, self.ledger, self.now)["id"], batch["id"])

    def test_actual_pregame_status_and_safety_margin_block_late_changes(self):
        events = copy.deepcopy(self.events)
        events[1]["competitions"][0]["status"]["type"].update(state="in", name="STATUS_IN_PROGRESS")
        prepared = self.prepare(events=events)
        decision = next(item for item in prepared["assessments"][0]["decisions"] if item["eventId"] == self.games[1].event_id)
        self.assertFalse(decision["applied"])
        self.assertEqual(decision["action"], "skipped_locked")
        just_before = common.instant(self.games[1].scheduled_at) - timedelta(minutes=5)
        prepared = self.prepare(now=just_before)
        self.assertFalse(next(item for item in prepared["assessments"][0]["decisions"] if item["eventId"] == self.games[1].event_id)["applied"])

    def test_frozen_last_published_pregame_pick_scores_correctly(self):
        game = self.games[1]
        prepared = self.prepare({game.event_id: game.home_id})
        assessment_id = prepared["assessments"][0]["id"]
        publications = {assessment_id: {"commit": "a" * 40, "committedAt": common.stamp(self.now + timedelta(seconds=1))}}
        final_events = [event_for(item, final=True) for item in self.games]
        final_now = common.instant(game.scheduled_at) + timedelta(hours=5)
        result, errors = nfl.refresh(
            self.games, self.results, lambda _url: {"events": final_events}, final_now, force=True,
            forecasts=prepared, publications=publications,
        )
        self.assertFalse(errors)
        locked = result["games"][game.event_id]
        self.assertEqual(locked["scoredPickTeamId"], game.home_id)
        self.assertEqual(locked["pickResult"], "correct")
        self.assertIsNotNone(locked["pickLockedAt"])
        self.assertEqual(result["games"][self.games[0].event_id]["scoredPickTeamId"], self.games[0].pick_id)
        self.assertEqual(result["games"][self.games[0].event_id]["pickResult"], "incorrect")
        final_events[1] = event_for(game, final=True, away=30, home=27)
        corrected, _ = nfl.refresh(
            self.games, result, lambda _url: {"events": final_events}, final_now + timedelta(hours=1),
            force=True, forecasts=prepared, publications=publications,
        )
        self.assertEqual(corrected["games"][game.event_id]["scoredPickTeamId"], game.home_id)
        self.assertEqual(corrected["games"][game.event_id]["pickResult"], "incorrect")

    def test_after_kickoff_commit_cannot_improve_record(self):
        game = self.games[1]
        prepared = self.prepare({game.event_id: game.home_id})
        assessment_id = prepared["assessments"][0]["id"]
        cutoff = common.instant(game.scheduled_at)
        publications = {assessment_id: {"commit": "a" * 40, "committedAt": common.stamp(cutoff + timedelta(seconds=1))}}
        choice = forecasts.selection(game, prepared, before=cutoff, publications=publications)
        self.assertEqual(choice["teamId"], game.pick_id)
        self.assertEqual(choice["revisionId"], f"original-{game.event_id}")

    def test_changed_final_since_research_is_rejected(self):
        batch, candidate = candidate_for(self.games, self.ledger, self.results, self.now)
        corrected = copy.deepcopy(self.results)
        corrected["games"][self.games[0].event_id]["resultUpdatedAt"] = common.stamp(self.now + timedelta(seconds=1))
        common.seal(corrected)
        with self.assertRaisesRegex(ValueError, "corrected"):
            forecasts.prepare_assessment(self.games, corrected, self.ledger, batch, candidate, {}, self.now)

    def test_unpicked_official_matchup_triggers_without_new_final(self):
        game = common.Game("900001", "2027-01-16", 1, "2", "12", None, "2027-01-16T21:30:00Z", season_type=3, original=False)
        result, errors = nfl.refresh([game], None, lambda _url: {"events": [event_for(game)]}, NOW, force=True)
        self.assertFalse(errors)
        batch = forecasts.batch_for([game], result, self.ledger, NOW)
        self.assertEqual(batch["newOfficialFixtures"], [game.event_id])
        self.assertFalse(batch["triggerResults"])

    def test_unknown_playoff_participants_never_get_a_pick(self):
        game = common.Game("900002", "2027-02-14", 4, "-2", "-1", None, "2027-02-14T23:30:00Z", season_type=3, original=False)
        result, errors = nfl.refresh([game], None, lambda _url: {"events": [event_for(game)]}, NOW, force=True)
        self.assertFalse(errors)
        self.assertIsNone(forecasts.batch_for([game], result, self.ledger, NOW))
        self.assertIsNone(result["games"][game.event_id]["scoredPickTeamId"])
        self.assertEqual(result["games"][game.event_id].get("pickExplanation", ""), "")

    def test_suspended_or_delayed_started_game_is_not_revisable(self):
        for status in ("STATUS_SUSPENDED", "STATUS_DELAYED"):
            events = copy.deepcopy(self.events)
            events[1] = event_for(self.games[1], status=status, period=2)
            with self.subTest(status=status):
                prepared = self.prepare(events=events)
                decision = next(item for item in prepared["assessments"][0]["decisions"] if item["eventId"] == self.games[1].event_id)
                self.assertFalse(decision["applied"])

    def test_source_errors_do_not_become_final_triggers(self):
        broken = copy.deepcopy(self.results)
        broken["games"][self.games[0].event_id]["error"] = "Source identity mismatch"
        common.seal(broken)
        self.assertIsNone(forecasts.batch_for(self.games, broken, self.ledger, self.now))

    def test_updater_preserves_forecast_file_and_history_bytes(self):
        prepared = self.prepare()
        with tempfile.TemporaryDirectory() as directory:
            page = Path(directory) / "index.html"
            forecast_path = page.with_name("forecasts.json")
            common.write_json(forecast_path, prepared)
            before = forecast_path.read_bytes()
            fixtures = common.script_data(HTML, "fixtures-data")
            full_results = snapshot(GAMES[0].event_id)
            full_results["fixtureRevision"] = fixtures["revision"]
            full_results["forecastRevision"] = prepared["revision"]
            common.seal(full_results)
            nfl.write_results(page, HTML, full_results, fixtures, prepared)
            self.assertEqual(forecast_path.read_bytes(), before)
            self.assertEqual(common.script_data(common.read_html(page), "forecasts-data"), prepared)
            self.assertEqual(common.script_data(common.read_html(page), "games-data"), common.script_data(HTML, "games-data"))

    def test_invalid_paragraph_or_missing_sources_are_rejected(self):
        for invalid in ("reason", "sourceIds", "factors"):
            batch, candidate = candidate_for(self.games, self.ledger, self.results, self.now)
            candidate["decisions"][0][invalid] = "only two" if invalid == "reason" else [] if invalid == "sourceIds" else {}
            verified = forecasts.verify_current_games(self.games, self.results, lambda _url: {"events": self.events}, self.now)
            with self.subTest(invalid=invalid), self.assertRaises(ValueError):
                forecasts.prepare_assessment(self.games, self.results, self.ledger, batch, candidate, verified, self.now)

    def test_retained_pick_does_not_rewrite_its_original_timestamp(self):
        self.ledger = forecasts.add_paragraphs(self.ledger, {
            f"original-{game.event_id}": "I expect this team to benefit from the recorded matchup reasoning. The opponent could still win if that advantage does not materialize."
            for game in self.games
        }, self.games, NOW)
        batch, candidate = candidate_for(self.games, self.ledger, self.results, self.now)
        for decision in candidate["decisions"]:
            game = next(game for game in self.games if game.event_id == decision["eventId"])
            decision["reason"] = forecasts.selection_paragraph(game, self.ledger, forecasts.selection(game, self.ledger))
        verified = forecasts.verify_current_games(self.games, self.results, lambda _url: {"events": self.events}, self.now)
        prepared = forecasts.prepare_assessment(self.games, self.results, self.ledger, batch, candidate, verified, self.now)
        choice = forecasts.selection(self.games[1], prepared)
        self.assertEqual(choice["effectiveAt"], common.ORIGINAL_PUBLISHED_AT)
        self.assertEqual(prepared["assessments"][0]["changedPickCount"], 0)

    def test_publication_compare_and_swap_touches_only_forecasts_and_failure_is_retryable(self):
        batch, candidate = candidate_for(self.games, self.ledger, self.results, self.now)
        prepared = self.prepare()
        remote = {"sha": "remote-forecast-blob", "content": base64.b64encode(json.dumps(self.ledger).encode()).decode()}
        calls = []
        def api(arguments, payload=None):
            calls.append((arguments, payload))
            if payload is None:
                return remote
            self.assertEqual(payload["sha"], "remote-forecast-blob")
            self.assertEqual(payload["branch"], "main")
            self.assertIn("Co-authored-by: Copilot App", payload["message"])
            self.assertTrue(arguments[-1].endswith("/forecasts.json"))
            return {"commit": {"sha": "a" * 40}}
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / "repo"
            state_dir = Path(directory)
            with patch("nfl_watch.safe_sync", return_value="current-main"), patch.object(forecasts, "gh_json", side_effect=api), patch.object(
                forecasts, "preflight", return_value=(prepared, self.ledger, {}, self.games, datetime.now(common.UTC))
            ), patch.object(forecasts.subprocess, "run"):
                receipt = forecasts.publish(root, state_dir, batch, candidate)
            self.assertEqual(receipt["status"], "committed_pending_deployment")
            self.assertFalse((state_dir / "state.json").exists(), "Completion must wait for live deployment.")
            self.assertEqual(len(calls), 2)
        with tempfile.TemporaryDirectory() as directory:
            def rejected(arguments, payload=None):
                if payload is None:
                    return remote
                raise RuntimeError("Concurrent file SHA changed; HTTP 409")
            with patch("nfl_watch.safe_sync", return_value="current-main"), patch.object(forecasts, "gh_json", side_effect=rejected), patch.object(
                forecasts, "preflight", return_value=(prepared, self.ledger, {}, self.games, datetime.now(common.UTC))
            ), self.assertRaisesRegex(RuntimeError, "409"):
                forecasts.publish(Path(directory), Path(directory), batch, candidate)
            self.assertFalse((Path(directory) / "state.json").exists())
            self.assertIsNotNone(forecasts.batch_for(self.games, self.results, self.ledger, self.now))


class SeasonTests(unittest.TestCase):
    def test_original_73_plus_151_and_13_official_tbd_slots(self):
        fixtures = common.script_data(HTML, "fixtures-data")
        common.validate_fixtures(fixtures, HTML)
        self.assertEqual(sum(game.original for game in GAMES), 73)
        self.assertEqual(sum(game.season_type == 2 for game in GAMES), 224)
        self.assertEqual(sum(game.season_type == 3 for game in GAMES), 13)
        self.assertEqual(common.digest(common.script_data(HTML, "games-data")), common.PICKS_SHA256)
        super_bowl = next(game for game in GAMES if game.season_type == 3 and game.week == 4)
        self.assertEqual(common.instant(super_bowl.scheduled_at).date().isoformat(), "2027-02-14")
        self.assertEqual(super_bowl.season_type, 3)

    def test_flexible_dates_preserve_initial_record_and_unknown_time(self):
        fixtures = common.script_data(HTML, "fixtures-data")
        original = next(event for event in fixtures["events"].values() if event["seasonType"] == 2 and event["week"] == 18)
        game = next(game for game in GAMES if game.event_id == original["eventId"])
        event = event_for(game, date="2027-01-09T21:30:00Z")
        event["competitions"][0]["timeValid"] = True
        record = season.fixture(event, {game.away_id, game.home_id}, NOW, "https://example.com", original)
        self.assertEqual(record["originalDate"], original["originalDate"])
        self.assertEqual(record["scheduledAt"], "2027-01-09T21:30:00Z")
        self.assertTrue(record["timeConfirmed"])
        self.assertFalse(record["originalTimeConfirmed"])

    def test_official_playoff_qualifiers_can_fill_tbd_but_not_after_kickoff(self):
        fixtures = common.script_data(HTML, "fixtures-data")
        previous = next(event for event in fixtures["events"].values() if event["seasonType"] == 3)
        game = common.Game(previous["eventId"], previous["originalDate"], previous["week"], "2", "12", None, previous["scheduledAt"], season_type=3, original=False)
        event = event_for(game)
        record = season.fixture(event, {"2", "12"}, NOW, "https://example.com", previous)
        self.assertEqual((record["awayTeamId"], record["homeTeamId"]), ("2", "12"))
        event["competitions"][0]["status"]["type"].update(state="in", name="STATUS_IN_PROGRESS")
        with self.assertRaisesRegex(ValueError, "after kickoff"):
            season.fixture(event, {"2", "12"}, NOW, "https://example.com", previous)

    def test_monitoring_does_not_stop_at_november_or_regular_season_end(self):
        fixtures = common.script_data(HTML, "fixtures-data")
        results = snapshot(GAMES[0].event_id)["games"]
        self.assertFalse(season.coverage_complete(fixtures, results, common.instant("2026-11-03T20:00Z")))
        self.assertFalse(season.coverage_complete(fixtures, results, common.instant("2027-01-11T20:00Z")))
        self.assertFalse(season.coverage_complete(fixtures, results, common.instant("2027-02-22T20:00Z")))

    def test_monitoring_waits_for_all_postseason_finals_and_corrections(self):
        fixtures = copy.deepcopy(common.script_data(HTML, "fixtures-data"))
        results = {}
        final_at = common.instant("2027-02-15T04:00:00Z")
        for event_id, event in fixtures["events"].items():
            if event["seasonType"] == 3:
                event.update(awayTeamId="2", homeTeamId="12")
            results[event_id] = {"status": "final", "firstFinalAt": common.stamp(final_at), "scheduledAt": event["scheduledAt"]}
        self.assertFalse(season.coverage_complete(fixtures, results, final_at + timedelta(days=6)))
        self.assertTrue(season.coverage_complete(fixtures, results, final_at + timedelta(days=7)))
        results[next(iter(results))]["status"] = "postponed"
        self.assertFalse(season.coverage_complete(fixtures, results, final_at + timedelta(days=8)))


if __name__ == "__main__":
    unittest.main()
