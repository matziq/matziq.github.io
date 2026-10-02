import copy
from datetime import datetime, timedelta
import json
from pathlib import Path
import re
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import nfl_results as nfl


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / nfl.PAGE_PATH).read_text(encoding="utf-8")
GAMES = nfl.load_games(HTML)
NOW = datetime(2026, 10, 2, 18, tzinfo=nfl.UTC)


def event_for(game, *, final=False, away=24, home=27, status=None, date=None, period=4):
    name = status or ("STATUS_FINAL" if final else "STATUS_SCHEDULED")
    return {
        "id": game.event_id, "date": date or game.scheduled_at,
        "season": {"year": 2026, "type": 2}, "week": {"number": game.week},
        "competitions": [{
            "id": game.event_id, "date": date or game.scheduled_at,
            "status": {"period": period, "type": {
                "name": name, "completed": final,
                "state": "post" if final else "in" if name == "STATUS_IN_PROGRESS" else "pre",
                "detail": "Final/OT" if period > 4 else "Final" if final else "Scheduled",
            }},
            "competitors": [
                {"id": game.away_id, "team": {"id": game.away_id, "displayName": "Deliberately misleading name"},
                 "homeAway": "away", "score": str(away), "winner": away > home if final else False},
                {"id": game.home_id, "team": {"id": game.home_id, "displayName": "Another misleading name"},
                 "homeAway": "home", "score": str(home), "winner": home > away if final else False},
            ],
        }],
    }


def snapshot(*final_ids, now=NOW):
    ids = set(final_ids)
    events = [event_for(game, final=game.event_id in ids) for game in GAMES]
    result, errors = nfl.refresh(GAMES, None, lambda _url: {"events": events}, now, force=True)
    if errors:
        raise AssertionError(errors)
    return result


class ResultsTests(unittest.TestCase):
    def setUp(self):
        self.game = GAMES[0]

    def refresh_one(self, event, previous=None, now=NOW):
        return nfl.refresh([self.game], previous, lambda _url: {"events": [event]}, now, force=True)

    def test_original_predictions_and_five_word_reasons(self):
        picks = nfl.script_data(HTML, "games-data")
        self.assertEqual(len(picks), 73)
        self.assertEqual(nfl.digest(picks), nfl.PICKS_SHA256)
        self.assertTrue(all(len(row[6].split()) == 5 for row in picks))
        self.assertEqual(self.game.event_id, "401872964")
        self.assertEqual((self.game.away_id, self.game.home_id, self.game.pick_id), ("23", "5", "23"))

    def test_prediction_edit_is_rejected(self):
        changed = HTML.replace("Rodgers gives Pittsburgh quarterback advantage", "This is an altered prediction")
        with self.assertRaisesRegex(ValueError, "predictions have changed"):
            nfl.load_games(changed)

    def test_current_final_and_prediction_separation(self):
        result, errors = self.refresh_one(event_for(self.game, final=True))
        game = result["games"][self.game.event_id]
        self.assertFalse(errors)
        self.assertEqual((game["awayScore"], game["homeScore"], game["winnerTeamId"], game["pickResult"]), (24, 27, "5", "incorrect"))
        self.assertEqual(self.game.pick_id, "23")
        self.assertEqual(game["resultUpdatedAt"], nfl.stamp(NOW))

    def test_final_overtime_and_tie(self):
        for away, home, verdict, winner in ((30, 27, "correct", "23"), (24, 24, "tie", None)):
            with self.subTest(verdict=verdict):
                result, errors = self.refresh_one(event_for(self.game, final=True, away=away, home=home, period=5))
                game = result["games"][self.game.event_id]
                self.assertFalse(errors)
                self.assertEqual(game["statusDetail"], "Final / OT")
                self.assertEqual((game["pickResult"], game["winnerTeamId"]), (verdict, winner))

    def test_live_scores_never_become_results(self):
        result, errors = self.refresh_one(event_for(self.game, away=42, home=0, status="STATUS_IN_PROGRESS"))
        game = result["games"][self.game.event_id]
        self.assertFalse(errors)
        self.assertEqual(game["status"], "in_progress")
        self.assertEqual(game["pickResult"], "pending")
        self.assertIsNone(game["awayScore"])
        self.assertIsNone(game["winnerTeamId"])

    def test_terminal_status_requires_complete_valid_scores(self):
        for mutation in ("missing-score", "partial", "wrong-state", "winner-disagreement", "negative-score"):
            event = event_for(self.game, final=True)
            competition = event["competitions"][0]
            if mutation == "missing-score":
                del competition["competitors"][0]["score"]
            elif mutation == "partial":
                competition["status"]["type"]["completed"] = False
            elif mutation == "wrong-state":
                competition["status"]["type"]["state"] = "in"
            elif mutation == "winner-disagreement":
                competition["competitors"][0]["winner"] = True
            else:
                competition["competitors"][0]["score"] = "-3"
            with self.subTest(mutation=mutation):
                result, errors = self.refresh_one(event)
                self.assertTrue(errors)
                self.assertEqual(result["games"][self.game.event_id]["pickResult"], "pending")

    def test_identity_season_week_side_and_date_guards(self):
        for mutation in ("id", "year", "season-type", "week", "team-id", "sides", "date-disagrees", "outside-season"):
            event = event_for(self.game, final=True)
            competition = event["competitions"][0]
            if mutation == "id":
                event["id"] = "999999"
            elif mutation == "year":
                event["season"]["year"] = 2025
            elif mutation == "season-type":
                event["season"]["type"] = 3
            elif mutation == "week":
                event["week"]["number"] = 5
            elif mutation == "team-id":
                competition["competitors"][0]["team"]["id"] = "5"
            elif mutation == "sides":
                competition["competitors"][0]["homeAway"] = "home"
            elif mutation == "date-disagrees":
                competition["date"] = "2026-10-03T00:15Z"
            else:
                event["date"] = competition["date"] = "2025-10-02T00:15Z"
            with self.subTest(mutation=mutation):
                with self.assertRaises(ValueError):
                    nfl.observation(event, self.game, NOW)

    def test_names_do_not_participate_in_matching(self):
        observed = nfl.observation(event_for(self.game, final=True), self.game, NOW)
        self.assertEqual(observed["winnerTeamId"], "5")

    def test_future_final_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "valid final"):
            nfl.observation(event_for(GAMES[-1], final=True), GAMES[-1], NOW)

    def test_corrected_final_and_duplicate_polling(self):
        first, _ = self.refresh_one(event_for(self.game, final=True))
        duplicate, _ = self.refresh_one(event_for(self.game, final=True), first, NOW + timedelta(minutes=5))
        self.assertEqual(duplicate["lastResultAt"], first["lastResultAt"])
        self.assertEqual(duplicate["games"][self.game.event_id]["firstFinalAt"], first["games"][self.game.event_id]["firstFinalAt"])
        corrected, _ = self.refresh_one(event_for(self.game, final=True, away=30, home=27), first, NOW + timedelta(hours=1))
        before, after = first["games"][self.game.event_id], corrected["games"][self.game.event_id]
        self.assertEqual(after["firstFinalAt"], before["firstFinalAt"])
        self.assertEqual(after["pickResult"], "correct")
        self.assertNotEqual(after["resultUpdatedAt"], before["resultUpdatedAt"])
        hourly, _ = self.refresh_one(event_for(self.game, final=True, away=30, home=27), corrected, NOW + timedelta(hours=2))
        self.assertEqual(hourly["lastResultAt"], corrected["lastResultAt"])
        self.assertGreater(hourly["lastSuccessfulCheckAt"], corrected["lastSuccessfulCheckAt"])

    def test_unchanged_automatic_poll_does_not_publish_every_five_minutes(self):
        now = nfl.instant(self.game.scheduled_at) + timedelta(hours=2)
        event = event_for(self.game, status="STATUS_IN_PROGRESS")
        first, _ = self.refresh_one(event, now=now)
        duplicate, errors = nfl.refresh([self.game], first, lambda _url: {"events": [event]}, now + timedelta(minutes=5))
        self.assertFalse(errors)
        self.assertEqual(duplicate, first)

    def test_transient_failure_and_nonfinal_regression_retain_final(self):
        first, _ = self.refresh_one(event_for(self.game, final=True))
        def unavailable(_url):
            raise OSError("HTTP 503 fixture")
        failed, errors = nfl.refresh([self.game], first, unavailable, NOW + timedelta(hours=1), force=True)
        self.assertTrue(errors)
        self.assertEqual(failed["games"][self.game.event_id]["homeScore"], 27)
        self.assertEqual(failed["lastSuccessfulCheckAt"], first["lastSuccessfulCheckAt"])
        regression, errors = self.refresh_one(event_for(self.game), first, NOW + timedelta(hours=1))
        self.assertTrue(errors)
        self.assertEqual(regression["games"][self.game.event_id]["status"], "final")
        self.assertIn("retained", regression["games"][self.game.event_id]["error"])
        restored, errors = self.refresh_one(event_for(self.game, final=True), failed, NOW + timedelta(hours=2))
        self.assertFalse(errors)
        self.assertIsNone(restored["games"][self.game.event_id]["error"])

    def test_duplicate_event_is_rejected(self):
        event = event_for(self.game, final=True)
        result, errors = nfl.refresh([self.game], None, lambda _url: {"events": [event, event]}, NOW, force=True)
        self.assertTrue(errors)
        self.assertEqual(result["games"][self.game.event_id]["pickResult"], "pending")

    def test_postponement_and_summary_reschedule_lookup(self):
        postponed, _ = self.refresh_one(event_for(self.game, status="STATUS_POSTPONED"))
        moved = event_for(self.game, final=True, date="2026-10-05T00:15Z")
        header = copy.deepcopy(moved)
        header["week"] = self.game.week
        del header["date"]
        urls = []
        def source(url):
            urls.append(url)
            return {"events": []} if "scoreboard?" in url else {"header": header}
        final, errors = nfl.refresh([self.game], postponed, source, NOW + timedelta(days=4), force=True)
        self.assertFalse(errors)
        self.assertEqual(postponed["games"][self.game.event_id]["status"], "postponed")
        self.assertEqual(final["games"][self.game.event_id]["scheduledAt"], "2026-10-05T00:15:00Z")
        self.assertEqual(final["games"][self.game.event_id]["status"], "final")
        self.assertEqual(self.game.original_date, "2026-10-01")
        self.assertIn("dates=20261001", urls[0])
        self.assertEqual(urls[1], nfl.SUMMARY_URL + "?event=401872964")

    def test_delayed_canceled_and_unknown_terminal_status(self):
        for name, status in (("STATUS_DELAYED", "delayed"), ("STATUS_SUSPENDED", "delayed"), ("STATUS_CANCELED", "canceled")):
            with self.subTest(name=name):
                result, errors = self.refresh_one(event_for(self.game, status=name))
                self.assertFalse(errors)
                self.assertEqual(result["games"][self.game.event_id]["status"], status)
                self.assertEqual(result["games"][self.game.event_id]["pickResult"], "pending")
        result, errors = self.refresh_one(event_for(self.game, final=True, status="STATUS_UNKNOWN"))
        self.assertTrue(errors)
        self.assertIsNone(result["games"][self.game.event_id]["awayScore"])

    def test_partial_response_updates_only_verified_games(self):
        games = GAMES[1:3]
        first = event_for(games[0], final=True)
        second = event_for(games[1], final=True)
        del second["competitions"][0]["competitors"][1]["score"]
        result, errors = nfl.refresh(games, None, lambda _url: {"events": [first, second]}, NOW + timedelta(days=3), force=True)
        self.assertTrue(errors)
        self.assertEqual(result["games"][games[0].event_id]["status"], "final")
        self.assertEqual(result["games"][games[1].event_id]["pickResult"], "pending")

    def test_one_dated_request_for_multiple_games(self):
        calls = []
        events = [event_for(game) for game in GAMES[1:15]]
        def source(url):
            calls.append(url)
            return {"events": events}
        _, errors = nfl.refresh(GAMES[1:15], None, source, NOW, force=True)
        self.assertFalse(errors)
        self.assertEqual(calls, [nfl.SCOREBOARD_URL + "?dates=20261004"])

    def test_eastern_dates_midnight_and_dst(self):
        self.assertEqual(nfl.instant(GAMES[0].scheduled_at).astimezone(nfl.EASTERN).date().isoformat(), "2026-10-01")
        self.assertEqual(nfl.instant(GAMES[59].scheduled_at).astimezone(nfl.EASTERN).strftime("%Y-%m-%d %H:%M %z"), "2026-10-29 20:15 -0400")
        self.assertEqual(nfl.instant(GAMES[-1].scheduled_at).astimezone(nfl.EASTERN).strftime("%Y-%m-%d %H:%M %z"), "2026-11-02 20:15 -0500")

    def test_poll_windows_and_delayed_games_after_november_two(self):
        result = nfl.initial_result(GAMES[-1])
        result["lastAttemptAt"] = "2026-11-04T12:00:00Z"
        self.assertEqual(nfl.next_check(result, nfl.instant("2026-11-04T12:01Z")), nfl.instant("2026-11-04T12:15Z"))
        result["lastAttemptAt"] = "2026-11-20T12:00:00Z"
        self.assertEqual(nfl.next_check(result, nfl.instant("2026-11-20T12:01Z")), nfl.instant("2026-11-20T18:00Z"))
        result["scheduledAt"] = "2026-11-23T18:00:00Z"
        self.assertEqual(nfl.next_check(result, nfl.instant("2026-11-20T12:01Z")), nfl.instant("2026-11-21T12:00Z"))

    def test_no_api_calls_before_scope_or_between_due_windows(self):
        calls = []
        result, errors = nfl.refresh(GAMES, None, lambda url: calls.append(url), datetime(2026, 9, 1, tzinfo=nfl.UTC))
        self.assertIsNone(result)
        self.assertFalse(errors)
        self.assertFalse(calls)
        first = snapshot(GAMES[0].event_id)
        result, errors = nfl.refresh(GAMES, first, lambda url: calls.append(url), NOW + timedelta(minutes=5))
        self.assertEqual(result, first)
        self.assertFalse(calls)

    def test_correction_window_stops_but_force_can_recheck(self):
        first, _ = self.refresh_one(event_for(self.game, final=True))
        self.assertIsNone(nfl.next_check(first["games"][self.game.event_id], NOW + timedelta(days=8)))
        result, errors = self.refresh_one(event_for(self.game, final=True, away=30), first, NOW + timedelta(days=8))
        self.assertFalse(errors)
        self.assertEqual(result["games"][self.game.event_id]["pickResult"], "correct")
        self.assertTrue(result["monitoringComplete"])

    def test_completed_monitoring_is_persisted_without_another_api_call(self):
        first, _ = self.refresh_one(event_for(self.game, final=True))
        calls = []
        completed, errors = nfl.refresh([self.game], first, lambda url: calls.append(url), NOW + timedelta(days=8))
        self.assertFalse(calls)
        self.assertFalse(errors)
        self.assertTrue(completed["monitoringComplete"])
        self.assertIsNone(completed["nextCheckAt"])
        self.assertEqual(completed["lastSuccessfulCheckAt"], first["lastSuccessfulCheckAt"])
        nfl.validate_results(completed, [self.game])

    def test_revisions_reject_tampering(self):
        result = snapshot(GAMES[0].event_id)
        result["games"][GAMES[0].event_id]["homeScore"] = 0
        with self.assertRaisesRegex(ValueError, "revision"):
            nfl.validate_results(result, GAMES)

    def test_generated_files_preserve_predictions_and_escape_script_endings(self):
        result = snapshot(GAMES[0].event_id)
        result["games"][GAMES[1].event_id]["error"] = "API failure </script><script>alert(1)</script>"
        result["revision"] = nfl.digest({key: value for key, value in result.items() if key != "revision"})
        with tempfile.TemporaryDirectory() as directory:
            page = Path(directory) / "index.html"
            page.write_text(HTML, encoding="utf-8")
            nfl.write_results(page, HTML, result)
            updated = page.read_text(encoding="utf-8")
            self.assertEqual(nfl.script_data(updated, "games-data"), nfl.script_data(HTML, "games-data"))
            self.assertEqual(nfl.script_data(updated, "catalog-data"), nfl.script_data(HTML, "catalog-data"))
            self.assertEqual(nfl.script_data(updated, "results-data"), result)
            self.assertEqual(json.loads(page.with_name("results.json").read_text()), result)
            self.assertNotIn("</script><script>alert(1)", updated)

    def test_updater_preserves_original_html_line_endings_and_nonresults_bytes(self):
        html = HTML.replace("\n", "\r\n")
        payload = snapshot(GAMES[0].event_id)
        with tempfile.TemporaryDirectory() as directory:
            page = Path(directory) / "index.html"
            page.write_bytes(html.encode("utf-8"))
            nfl.write_results(page, nfl.read_html(page), payload)
            updated = nfl.read_html(page)
            pattern = r'(<script type="application/json" id="results-data">).*?(</script>)'
            self.assertEqual(re.sub(pattern, "", updated, flags=re.DOTALL), re.sub(pattern, "", html, flags=re.DOTALL))
            self.assertEqual(updated.count("\n"), updated.count("\r\n"))


if __name__ == "__main__":
    unittest.main()
