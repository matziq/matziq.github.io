import copy
from datetime import timedelta
import unittest

from test_nfl_results import GAMES, HTML, NOW, event_for
from test_nfl_forecasts import candidate_for
import nfl_common as common
import nfl_forecasts as forecasts
import nfl_results as nfl


class ProjectedScoreTests(unittest.TestCase):
    def setUp(self):
        self.games = GAMES[:2]
        self.game = self.games[1]
        self.ledger = forecasts.add_paragraphs(forecasts.empty_ledger(NOW), {
            f"original-{game.event_id}": "I expect the selected team to have the stronger matchup. Its opponent could still win if that anticipated advantage does not materialize."
            for game in self.games
        }, self.games, NOW)
        self.events = [event_for(game, final=index == 0) for index, game in enumerate(self.games)]
        self.initial, errors = nfl.refresh(self.games, None, lambda _url: {"events": self.events}, NOW, force=True)
        self.assertFalse(errors)
        self.proof = forecasts.verify_current_games(
            self.games, self.initial, lambda _url: {"events": self.events}, NOW
        )[self.game.event_id]["proof"]
        self.projection = {
            "awayTeamId": self.game.away_id, "homeTeamId": self.game.home_id, "awayScore": 24, "homeScore": 20,
        }
        self.entry = forecasts.append_score_projection(
            self.ledger, self.game, self.initial["games"][self.game.event_id], self.projection, self.proof, NOW
        )
        common.seal(self.ledger)
        forecasts.validate_ledger(self.ledger, self.games)
        self.publications = {self.entry["id"]: {"commit": "a" * 40, "committedAt": common.stamp(NOW + timedelta(seconds=1))}}

    def refresh(self, away=24, home=20, final=False, previous=None, ledger=None, now=None, publications=None):
        events = [self.events[0], event_for(self.game, final=final, away=away, home=home)]
        result, errors = nfl.refresh(
            self.games, previous or self.initial, lambda _url: {"events": events},
            now or NOW + timedelta(minutes=5), force=True, forecasts=ledger or self.ledger,
            publications=self.publications if publications is None else publications,
        )
        self.assertFalse(errors)
        return result

    def test_current_scores_cover_unstarted_picks_but_not_completed_or_tbd_games(self):
        live = common.script_data(HTML, "results-data")
        ledger = common.script_data(HTML, "forecasts-data")
        self.assertEqual(live["scorePolicy"], "pregame-only")
        self.assertEqual(ledger["scorePolicy"], "pregame-only")
        self.assertGreaterEqual(len(ledger["scoreProjections"]), 223)
        for game in GAMES:
            result = live["games"][game.event_id]
            score = result["projectedScore"]
            if score:
                forecasts.validate_projected_score(score, game.away_id, game.home_id, result["scoredPickTeamId"])
            elif result["scoredPickTeamId"] is None:
                self.assertEqual(result["projectedScoreStatus"], "unpicked")
            else:
                self.assertEqual(result["projectedScoreStatus"], "not-predicted-before-kickoff")
        first = live["games"]["401872964"]
        self.assertIsNone(first["projectedScore"])
        self.assertEqual(first["scoredPickTeamId"], "23")
        self.assertEqual(first["pickResult"], "incorrect")
        self.assertEqual(common.digest(common.script_data(HTML, "games-data")), common.PICKS_SHA256)

    def test_projected_points_must_match_away_home_and_the_chosen_winner(self):
        for change in (
            {"awayTeamId": self.game.home_id}, {"homeTeamId": "999"},
            {"awayScore": 20}, {"awayScore": 17}, {"awayScore": True},
            {"awayScore": 24.5}, {"homeScore": -1}, {"awayScore": 100},
            {"pickTeamId": self.game.home_id},
        ):
            with self.subTest(change=change), self.assertRaises(ValueError):
                forecasts.validate_projected_score({**self.projection, **change}, self.game.away_id, self.game.home_id, self.game.pick_id)

    def test_home_winner_mapping_is_validated_without_text_matching(self):
        home = {**self.projection, "awayScore": 20, "homeScore": 27}
        forecasts.validate_projected_score(home, self.game.away_id, self.game.home_id, self.game.home_id)

    def test_duplicate_projection_keeps_original_timestamp_and_history_entry(self):
        later = NOW + timedelta(minutes=5)
        proof = {**self.proof, "verifiedAt": common.stamp(later)}
        same = forecasts.append_score_projection(
            self.ledger, self.game, self.initial["games"][self.game.event_id], self.projection, proof, later
        )
        self.assertEqual(same, self.entry)
        self.assertEqual(len(self.ledger["scoreProjections"]), 1)

    def test_started_final_and_unpicked_games_cannot_receive_projections(self):
        for change in (
            {"pickLockedAt": common.stamp(NOW)}, {"hasStarted": True},
            {"status": "final"}, {"status": "in_progress"}, {"scoredPickTeamId": None},
        ):
            with self.subTest(change=change), self.assertRaises(ValueError):
                forecasts.append_score_projection(
                    self.ledger, self.game, {**self.initial["games"][self.game.event_id], **change},
                    self.projection, self.proof, NOW,
                )
        late = common.instant(self.game.scheduled_at) - timedelta(minutes=5)
        with self.assertRaisesRegex(ValueError, "safety margin"):
            forecasts.append_score_projection(
                self.ledger, self.game, self.initial["games"][self.game.event_id], self.projection,
                {**self.proof, "verifiedAt": common.stamp(late)}, late,
            )

    def test_projection_locks_at_kickoff_and_actual_corrections_do_not_rewrite_it(self):
        before = self.refresh()
        original = copy.deepcopy(before["games"][self.game.event_id]["projectedScore"])
        final_time = common.instant(self.game.scheduled_at) + timedelta(hours=5)
        final = self.refresh(away=17, home=30, final=True, previous=before, now=final_time)
        result = final["games"][self.game.event_id]
        self.assertEqual(result["projectedScore"], original)
        self.assertEqual(result["pickResult"], "incorrect")
        self.assertEqual((result["awayScore"], result["homeScore"]), (17, 30))
        self.assertEqual(result["projectedScoreLockedAt"], result["pickLockedAt"])
        corrected = self.refresh(away=31, home=30, final=True, previous=final, now=final_time + timedelta(hours=1))
        self.assertEqual(corrected["games"][self.game.event_id]["projectedScore"], original)
        self.assertEqual(corrected["games"][self.game.event_id]["pickResult"], "correct")

    def test_score_not_committed_before_kickoff_is_not_backfilled(self):
        final_time = common.instant(self.game.scheduled_at) + timedelta(hours=5)
        late_publication = {self.entry["id"]: {"commit": "b" * 40, "committedAt": self.game.scheduled_at}}
        result = self.refresh(final=True, now=final_time, publications=late_publication)["games"][self.game.event_id]
        self.assertIsNone(result["projectedScore"])
        self.assertEqual(result["projectedScoreStatus"], "not-predicted-before-kickoff")

    def prepare(self, new_pick=None, score="omitted"):
        now = NOW + timedelta(minutes=10)
        batch, candidate = candidate_for(self.games, self.ledger, self.initial, now)
        decision = candidate["decisions"][0]
        decision["reason"] = forecasts.selection_paragraph(self.game, self.ledger, forecasts.selection(self.game, self.ledger))
        if new_pick:
            decision["pickTeamId"] = new_pick
        if score != "omitted":
            decision["projectedScore"] = score
        verified = forecasts.verify_current_games(self.games, self.initial, lambda _url: {"events": self.events}, now)
        return forecasts.prepare_assessment(self.games, self.initial, self.ledger, batch, candidate, verified, now)

    def test_retained_pick_reuses_scores_when_future_decision_omits_them(self):
        prepared = self.prepare()
        assessment = prepared["assessments"][-1]
        self.assertEqual(assessment["scorePolicy"], "pregame-only")
        self.assertEqual(assessment["decisions"][0]["projectedScore"], self.projection)
        self.assertEqual(assessment["changedScoreCount"], 0)
        self.assertEqual(prepared["scoreProjections"], self.ledger["scoreProjections"])
        self.assertEqual(forecasts.selection(self.game, prepared), forecasts.selection(self.game, self.ledger))

    def test_changed_winner_requires_a_matching_new_score(self):
        with self.assertRaisesRegex(ValueError, "explicit"):
            self.prepare(new_pick=self.game.home_id)
        with self.assertRaisesRegex(ValueError, "strictly more"):
            self.prepare(new_pick=self.game.home_id, score=self.projection)
        score = {**self.projection, "awayScore": 20, "homeScore": 27}
        prepared = self.prepare(new_pick=self.game.home_id, score=score)
        self.assertEqual(len(prepared["scoreProjections"]), 2)
        self.assertEqual(prepared["scoreProjections"][-1]["homeScore"], 27)
        self.assertEqual(prepared["assessments"][-1]["changedScoreCount"], 1)

    def test_score_only_revision_does_not_change_selection_or_explanation_identity(self):
        prepared = self.prepare(score={**self.projection, "awayScore": 27})
        self.assertEqual(forecasts.selection(self.game, prepared), forecasts.selection(self.game, self.ledger))
        self.assertEqual(prepared["assessments"][-1]["changedPickCount"], 0)
        self.assertEqual(prepared["assessments"][-1]["changedScoreCount"], 1)
        self.assertEqual(prepared["scoreProjections"][0], self.entry)

    def test_old_score_for_a_different_current_winner_is_never_reused(self):
        self.assertIsNone(forecasts.projected_score(self.game, self.ledger, self.game.home_id))

    def test_changed_projection_history_or_status_fails_validation(self):
        ledger = copy.deepcopy(self.ledger)
        ledger["scoreProjections"][0]["awayScore"] = 30
        common.seal(ledger)
        with self.assertRaisesRegex(ValueError, "changed revision"):
            forecasts.validate_ledger(ledger, self.games)
        result = self.refresh()
        result["games"][self.game.event_id]["projectedScoreStatus"] = "pending"
        common.seal(result)
        with self.assertRaises(ValueError):
            nfl.validate_results(result, self.games)

    def test_empty_projection_never_means_zero_zero(self):
        result = self.refresh()["games"][self.games[0].event_id]
        self.assertIsNone(result["projectedScore"])
        self.assertEqual(result["projectedScoreStatus"], "not-predicted-before-kickoff")


if __name__ == "__main__":
    unittest.main()
