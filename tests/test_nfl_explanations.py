import copy
from datetime import timedelta
import unittest

from test_nfl_results import GAMES, HTML, NOW, event_for
import nfl_common as common
import nfl_forecasts as forecasts
import nfl_results as nfl


PREGAME = "I expect Indianapolis to create the more reliable offense in this matchup. Washington could still win if its defense prevents the anticipated advantage from developing."
POSTGAME = "I picked Indianapolis expecting its offense to provide the edge, but that expectation was wrong in the verified final. Washington scored more points, so the chosen advantage did not translate into a win; the original selection remains recorded as incorrect."


class ExplanationLifecycleTests(unittest.TestCase):
    def setUp(self):
        self.game = GAMES[1]
        self.final_time = common.instant(self.game.scheduled_at) + timedelta(hours=5)
        self.ledger = forecasts.add_paragraphs(
            forecasts.empty_ledger(NOW), {f"original-{self.game.event_id}": PREGAME}, [self.game], NOW
        )
        self.ledger["explanationPolicy"] = "forecast-until-final"
        common.seal(self.ledger)
        self.initial, errors = nfl.refresh(
            [self.game], None, lambda _url: {"events": [event_for(self.game)]}, NOW, force=True,
            forecasts=self.ledger, publications={},
        )
        self.assertFalse(errors)

    def finish(self, away, home, previous=None, ledger=None, now=None):
        result, errors = nfl.refresh(
            [self.game], previous or self.initial,
            lambda _url: {"events": [event_for(self.game, final=True, away=away, home=home)]},
            now or self.final_time, force=True, forecasts=ledger or self.ledger, publications={},
        )
        self.assertFalse(errors)
        return result

    def source(self, when):
        return [{"title": "Verified final fixture", "url": f"{common.SUMMARY_URL}?event={self.game.event_id}", "checkedAt": common.stamp(when)}]

    def review(self, final, ledger=None, now=None):
        ledger = copy.deepcopy(ledger or self.ledger)
        now = now or self.final_time
        forecasts.append_explanation_revision(
            ledger, self.game, final["games"][self.game.event_id], POSTGAME, self.source(now), now, "incorrect-final"
        )
        common.seal(ledger)
        forecasts.validate_ledger(ledger, [self.game])
        return ledger

    def test_upcoming_predictions_are_forward_looking_and_single_paragraphs(self):
        result = self.initial["games"][self.game.event_id]
        self.assertEqual(result["pickExplanation"], PREGAME)
        self.assertEqual(result["pregameExplanation"], PREGAME)
        self.assertEqual(result["explanationPhase"], "pregame")
        forecasts.validate_forecast_paragraph(PREGAME)
        live = common.script_data(HTML, "results-data")
        for result in live["games"].values():
            if result["scoredPickTeamId"] is not None and result["status"] != "final":
                forecasts.validate_forecast_paragraph(result["pickExplanation"])

    def test_past_selection_language_is_rejected_for_future_assessments(self):
        for reason in (
            "The original pick favored Indianapolis because its offense was expected to lead the way. The game remains uncertain.",
            "Indianapolis won because its offense controlled Washington throughout the game. This is an unsupported future outcome claim.",
            "I expect Indianapolis to win because its offense was viewed as better. Washington may still respond effectively.",
        ):
            with self.subTest(reason=reason), self.assertRaises(ValueError):
                forecasts.validate_forecast_paragraph(reason)

    def test_correct_final_keeps_pregame_bytes_on_first_and_repeated_updates(self):
        final = self.finish(27, 24)
        correct = final["games"][self.game.event_id]
        self.assertEqual(correct["pickResult"], "correct")
        self.assertEqual(correct["pickExplanation"].encode(), PREGAME.encode())
        self.assertEqual(correct["pregameExplanation"], PREGAME)
        self.assertEqual(correct["explanationPhase"], "pregame")
        duplicate = self.finish(27, 24, final, now=self.final_time + timedelta(hours=1))
        self.assertEqual(duplicate["games"][self.game.event_id]["pickExplanation"], PREGAME)
        with self.assertRaisesRegex(ValueError, "correct, tied"):
            self.review(final)

    def test_tie_keeps_original_explanation_and_cannot_be_reviewed_as_a_mistake(self):
        tied = self.finish(24, 24)
        self.assertEqual(tied["games"][self.game.event_id]["pickExplanation"], PREGAME)
        self.assertEqual(tied["games"][self.game.event_id]["pickResult"], "tie")
        with self.assertRaises(ValueError):
            self.review(tied)

    def test_incorrect_final_waits_for_real_review_then_replaces_only_display_text(self):
        final = self.finish(24, 27)
        wrong = final["games"][self.game.event_id]
        self.assertEqual(wrong["pickExplanation"], PREGAME)
        self.assertEqual(wrong["explanationPhase"], "awaiting-review")
        ledger = self.review(final)
        reviewed = self.finish(24, 27, final, ledger, self.final_time + timedelta(minutes=1))
        result = reviewed["games"][self.game.event_id]
        self.assertEqual(result["pickExplanation"], POSTGAME)
        self.assertEqual(result["pregameExplanation"], PREGAME)
        self.assertEqual(result["explanationPhase"], "incorrect-final")
        for key in ("scoredPickTeamId", "pickResult", "pickReason", "pickRevisionId", "pickLockedAt", "pickEffectiveAt", "pickCutoffAt", "resultUpdatedAt"):
            self.assertEqual(result[key], wrong[key], key)
        self.assertEqual(ledger["paragraphs"][f"original-{self.game.event_id}"], PREGAME)
        self.assertEqual(ledger["explanationRevisions"][0]["proof"]["pickResult"], "incorrect")

    def test_score_correction_to_correct_restores_pregame_wording_without_deleting_review(self):
        wrong = self.finish(24, 27)
        ledger = self.review(wrong)
        reviewed = self.finish(24, 27, wrong, ledger, self.final_time + timedelta(minutes=1))
        corrected = self.finish(30, 27, reviewed, ledger, self.final_time + timedelta(hours=1))
        result = corrected["games"][self.game.event_id]
        self.assertEqual(result["pickResult"], "correct")
        self.assertEqual(result["pickExplanation"], PREGAME)
        self.assertEqual(result["explanationPhase"], "pregame")
        self.assertEqual(len(ledger["explanationRevisions"]), 1)

    def test_corrected_loss_invalidates_stale_review_and_remains_retryable(self):
        wrong = self.finish(24, 27)
        ledger = self.review(wrong)
        reviewed = self.finish(24, 27, wrong, ledger, self.final_time + timedelta(minutes=1))
        corrected = self.finish(24, 30, reviewed, ledger, self.final_time + timedelta(hours=1))
        result = corrected["games"][self.game.event_id]
        self.assertEqual(result["explanationPhase"], "awaiting-review")
        self.assertEqual(result["pickExplanation"], PREGAME)
        batch = forecasts.batch_for([self.game], corrected, ledger, self.final_time + timedelta(hours=1))
        self.assertEqual(set(batch["incorrectFinalReviews"]), {self.game.event_id})

    def test_transient_source_error_preserves_the_last_verified_mistake_review(self):
        wrong = self.finish(24, 27)
        ledger = self.review(wrong)
        reviewed = self.finish(24, 27, wrong, ledger, self.final_time + timedelta(minutes=1))
        def unavailable(_url):
            raise OSError("Temporary scoreboard outage")
        result, errors = nfl.refresh(
            [self.game], reviewed, unavailable, self.final_time + timedelta(hours=1),
            force=True, forecasts=ledger, publications={},
        )
        self.assertTrue(errors)
        self.assertEqual(result["games"][self.game.event_id]["pickExplanation"], POSTGAME)
        self.assertEqual(result["games"][self.game.event_id]["explanationPhase"], "incorrect-final")
        self.assertIsNotNone(result["games"][self.game.event_id]["error"])

    def test_already_processed_wrong_final_still_requires_missing_review(self):
        wrong = self.finish(24, 27)
        ledger = copy.deepcopy(self.ledger)
        ledger["assessments"] = [{
            "id": "prior-assessment", "assessedAt": common.stamp(self.final_time), "status": "completed",
            "summary": "The final was previously assessed without a mistaken-pick explanation.",
            "sources": {"final": self.source(self.final_time)[0]}, "decisions": [],
            "triggerResults": {self.game.event_id: forecasts.final_signature(wrong["games"][self.game.event_id])},
        }]
        ledger["lastAssessedAt"] = common.stamp(self.final_time)
        common.seal(ledger)
        batch = forecasts.batch_for([self.game], wrong, ledger, self.final_time)
        self.assertFalse(batch["triggerResults"])
        self.assertEqual(set(batch["incorrectFinalReviews"]), {self.game.event_id})
        ledger = self.review(wrong, ledger)
        self.assertIsNone(forecasts.batch_for([self.game], wrong, ledger, self.final_time))
        self.assertIsNotNone(forecasts.postgame_review(ledger, wrong["games"][self.game.event_id]))

    def test_duplicate_wrong_review_and_late_pregame_wording_are_rejected(self):
        wrong = self.finish(24, 27)
        ledger = self.review(wrong)
        with self.assertRaisesRegex(ValueError, "already has"):
            forecasts.append_explanation_revision(
                ledger, self.game, wrong["games"][self.game.event_id], POSTGAME,
                self.source(self.final_time + timedelta(minutes=1)), self.final_time + timedelta(minutes=1), "incorrect-final",
            )
        with self.assertRaisesRegex(ValueError, "unstarted"):
            forecasts.append_explanation_revision(
                ledger, self.game, wrong["games"][self.game.event_id], PREGAME,
                self.source(self.final_time), self.final_time, "pregame",
                {"state": "pre", "completed": False, "hasStarted": False, "scheduledAt": self.game.scheduled_at},
            )

    def test_final_only_batch_requires_review_and_publishes_without_new_pick_decisions(self):
        wrong = self.finish(24, 27)
        now = self.final_time + timedelta(minutes=5)
        batch = forecasts.batch_for([self.game], wrong, self.ledger, now)
        verified = forecasts.verify_current_games(
            [self.game], wrong, lambda _url: {"events": [event_for(self.game, final=True, away=24, home=27)]}, now
        )
        candidate = {
            "batchId": batch["id"], "evidenceCollectedAt": common.stamp(now),
            "summary": "Reviewed the incorrect final; no unstarted games remain in this fixture.",
            "limitations": "No hypothetical player injuries or outcomes are invented.",
            "sources": {"final": self.source(now)[0]}, "teamAssessments": {}, "decisions": [],
        }
        with self.assertRaisesRegex(ValueError, "one sourced mistaken-pick"):
            forecasts.prepare_assessment([self.game], wrong, self.ledger, batch, candidate, verified, now)
        candidate["postgameReviews"] = [{
            "eventId": self.game.event_id, "paragraph": POSTGAME, "sources": self.source(now),
        }]
        completed = forecasts.prepare_assessment([self.game], wrong, self.ledger, batch, candidate, verified, now)
        self.assertEqual(completed["assessments"][0]["decisions"], [])
        self.assertEqual(len(completed["assessments"][0]["postgameReviewIds"]), 1)
        self.assertIsNone(forecasts.batch_for([self.game], wrong, completed, now))
        self.assertEqual(forecasts.selection(self.game, completed), forecasts.selection(self.game, self.ledger))
        self.assertEqual(forecasts.postgame_review(completed, wrong["games"][self.game.event_id])["paragraph"], POSTGAME)

    def test_correct_final_batch_rejects_an_unnecessary_postgame_rewrite(self):
        correct = self.finish(27, 24)
        now = self.final_time + timedelta(minutes=5)
        batch = forecasts.batch_for([self.game], correct, self.ledger, now)
        verified = forecasts.verify_current_games(
            [self.game], correct, lambda _url: {"events": [event_for(self.game, final=True, away=27, home=24)]}, now
        )
        candidate = {
            "batchId": batch["id"], "evidenceCollectedAt": common.stamp(now),
            "summary": "The pregame choice was correct, so its wording is retained.",
            "limitations": "The original record is not retroactively improved.",
            "sources": {"final": self.source(now)[0]}, "teamAssessments": {}, "decisions": [],
            "postgameReviews": [{"eventId": self.game.event_id, "paragraph": POSTGAME, "sources": self.source(now)}],
        }
        with self.assertRaisesRegex(ValueError, "none for correct"):
            forecasts.prepare_assessment([self.game], correct, self.ledger, batch, candidate, verified, now)
        candidate["postgameReviews"] = []
        completed = forecasts.prepare_assessment([self.game], correct, self.ledger, batch, candidate, verified, now)
        self.assertFalse(completed.get("explanationRevisions"))
        self.assertEqual(completed["assessments"][0]["postgameReviewIds"], [])

    def test_unpicked_playoff_placeholder_stays_explanation_free(self):
        game = next(game for game in GAMES if game.season_type == 3)
        ledger = forecasts.empty_ledger(NOW)
        ledger.update(explanationFormat="paragraph", paragraphs={}, explanationPolicy="forecast-until-final")
        common.seal(ledger)
        result, errors = nfl.refresh([game], None, lambda _url: {"events": [event_for(game)]}, NOW, force=True, forecasts=ledger)
        self.assertFalse(errors)
        self.assertEqual(result["games"][game.event_id]["pickExplanation"], "")
        self.assertEqual(result["games"][game.event_id]["explanationPhase"], "none")

    def test_current_steelers_review_has_verified_postgame_context_and_preserved_choice(self):
        live = common.script_data(HTML, "results-data")["games"]["401872964"]
        self.assertEqual(live["scoredPickTeamId"], "23")
        self.assertEqual(live["pickResult"], "incorrect")
        self.assertEqual(live["explanationPhase"], "incorrect-final")
        self.assertIn("five sacks", live["pickExplanation"])
        self.assertIn("27-24", live["pickExplanation"])
        self.assertIn("Rodgers", live["pregameExplanation"])


if __name__ == "__main__":
    unittest.main()
