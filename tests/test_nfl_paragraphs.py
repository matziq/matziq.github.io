import copy
from datetime import timedelta
import unittest

from test_nfl_results import GAMES, HTML, NOW, event_for
import nfl_common as common
import nfl_forecasts as forecasts
import nfl_results as results


LEDGER = common.script_data(HTML, "forecasts-data")
CURRENT = common.script_data(HTML, "results-data")


class ParagraphTests(unittest.TestCase):
    def test_all_current_picks_have_paragraphs_and_unpicked_games_have_none(self):
        self.assertEqual(LEDGER["explanationFormat"], "paragraph")
        self.assertEqual(CURRENT["explanationFormat"], "paragraph")
        picked = 0
        for game in GAMES:
            result = CURRENT["games"][game.event_id]
            if result["scoredPickTeamId"] is None:
                self.assertEqual(result["pickExplanation"], "")
            else:
                common.validate_paragraph(result["pickExplanation"])
                picked += 1
        self.assertGreaterEqual(picked, 224)
        self.assertEqual(common.digest(common.script_data(HTML, "games-data")), common.PICKS_SHA256)
        for game in common.original_games(HTML):
            common.validate_paragraph(LEDGER["paragraphs"][f"original-{game.event_id}"])

    def test_paragraph_expansion_preserves_every_existing_pick_revision(self):
        migrated = copy.deepcopy(LEDGER)
        migrated["assessments"] = [assessment for assessment in migrated["assessments"] if assessment.get("reasonFormat") != "paragraph"]
        legacy = copy.deepcopy(migrated)
        for key in ("paragraphs", "paragraphsUpdatedAt", "explanationFormat"):
            legacy.pop(key, None)
        common.seal(legacy)
        for game in GAMES:
            self.assertEqual(forecasts.selection(game, legacy), forecasts.selection(game, migrated))
        self.assertEqual(legacy["assessments"], migrated["assessments"])

    def test_locked_game_keeps_pick_grade_and_timestamps_when_explanation_is_added(self):
        game = GAMES[0]
        snapshot = copy.deepcopy(CURRENT["games"][game.event_id])
        snapshot.pop("pickExplanation")
        before = copy.deepcopy(snapshot)
        forecasts.apply_pick_snapshots([game], {game.event_id: snapshot}, LEDGER, NOW + timedelta(days=1))
        common.validate_paragraph(snapshot.pop("pickExplanation"))
        self.assertEqual(snapshot, before)
        self.assertEqual(snapshot["scoredPickTeamId"], "23")

    def test_empty_multiline_html_and_fragments_are_rejected(self):
        for value in ("", "Only five words live here", "One sentence\nAnother sentence follows with a meaningful reason for the pick.", "<p>A sentence explaining why this team was chosen over the opponent.</p>", "Ten or more words without the punctuation needed for a complete sentence", " Paragraphs cannot start with unexpected whitespace in their published text."):
            with self.subTest(value=value), self.assertRaises(ValueError):
                common.validate_paragraph(value)

    def test_published_paragraphs_cannot_be_overwritten(self):
        revision_id = f"original-{GAMES[0].event_id}"
        with self.assertRaisesRegex(ValueError, "cannot be overwritten"):
            forecasts.add_paragraphs(LEDGER, {
                revision_id: "This would replace an already published explanation with a different account of the original pick."
            }, GAMES, NOW)

    def test_a_missing_paragraph_fails_instead_of_reverting_to_short_wording(self):
        ledger = copy.deepcopy(LEDGER)
        revision_id = f"original-{GAMES[0].event_id}"
        del ledger["paragraphs"][revision_id]
        common.seal(ledger)
        with self.assertRaises(ValueError):
            forecasts.selection_paragraph(GAMES[0], ledger, forecasts.selection(GAMES[0], ledger))

    def test_legacy_pick_wording_is_not_used_as_the_current_export_explanation(self):
        first = CURRENT["games"]["401872964"]
        self.assertEqual(first["pickReason"], common.original_games(HTML)[0].reason)
        self.assertNotEqual(first["pickExplanation"], first["pickReason"])
        self.assertIn("pregame", first["pickExplanation"])
        new = CURRENT["games"]["401873037"]
        common.validate_paragraph(new["pickExplanation"])


if __name__ == "__main__":
    unittest.main()
