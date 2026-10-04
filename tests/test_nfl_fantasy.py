from datetime import timedelta
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import nfl_common as common
import nfl_results as nfl
from test_nfl_results import GAMES, NOW, event_for


def athlete(athlete_id, name, *stats):
    return {"athlete": {"id": athlete_id, "displayName": name}, "stats": [str(value) for value in stats]}


def box_score(game):
    return {"boxscore": {"players": [
        {"team": {"id": game.away_id}, "statistics": [
            {"name": "passing", "keys": ["completions/passingAttempts", "passingYards", "yardsPerPassAttempt", "passingTouchdowns", "interceptions"],
             "athletes": [athlete("1", "Away Passer", "22/40", 300, "7.5", 3, 2)]},
            {"name": "rushing", "keys": ["rushingAttempts", "rushingYards", "yardsPerRushAttempt", "rushingTouchdowns"],
             "athletes": [athlete("1", "Away Passer", 3, 12, "4.0", 0), athlete("2", "Away Runner", 18, 95, "5.3", 1)]},
            {"name": "receiving", "keys": ["receptions", "receivingYards", "yardsPerReception", "receivingTouchdowns"],
             "athletes": [athlete("3", "Away Receiver", 7, 110, "15.7", 1), athlete("2", "Away Runner", 2, 15, "7.5", 0)]},
            {"name": "fumbles", "keys": ["fumbles", "fumblesLost", "fumblesRecovered"], "athletes": [athlete("2", "Away Runner", 1, 1, 0)]},
            {"name": "defensive", "keys": ["totalTackles", "sacks"], "athletes": [athlete("9", "Away Linebacker", 12, 3)]},
            {"name": "interceptions", "keys": ["interceptions", "interceptionYards", "interceptionTouchdowns"], "athletes": [athlete("9", "Away Linebacker", 1, 90, 1)]},
        ]},
        {"team": {"id": game.home_id}, "statistics": [
            {"name": "receiving", "keys": ["receptions", "receivingYards", "yardsPerReception", "receivingTouchdowns"],
             "athletes": [athlete("4", "Home Receiver", 5, 40, "8.0", 0)]},
            {"name": "kickReturns", "keys": ["kickReturns", "kickReturnYards", "yardsPerKickReturn", "longKickReturn", "kickReturnTouchdowns"],
             "athletes": [athlete("5", "Home Returner", 2, 130, "65.0", 100, 1)]},
            {"name": "kicking", "keys": ["fieldGoalsMade/fieldGoalAttempts", "totalKickingPoints"], "athletes": [athlete("6", "Home Kicker", "5/5", 18)]},
        ]},
    ]}}


class FantasyTests(unittest.TestCase):
    def setUp(self):
        self.game = GAMES[0]

    def test_ppr_scoring_ranks_only_offensive_box_score_points(self):
        leaders = common.fantasy_leaders(box_score(self.game), self.game.away_id, self.game.home_id)
        self.assertEqual(leaders["scoring"], "PPR")
        self.assertEqual([(player["name"], player["points"]) for player in leaders["players"]], [
            ("Away Receiver", 24.0), ("Away Passer", 21.2), ("Away Runner", 17.0),
        ])
        self.assertEqual(leaders["players"][1]["statLine"], "300 pass yds, 3 pass TD, 2 INT, 12 rush yds")
        self.assertEqual(leaders["players"][2]["teamId"], self.game.away_id)

    def test_box_score_must_match_matchup(self):
        wrong = box_score(self.game)
        wrong["boxscore"]["players"][1]["team"]["id"] = "999"
        with self.assertRaises(ValueError):
            common.fantasy_leaders(wrong, self.game.away_id, self.game.home_id)
        with self.assertRaises(ValueError):
            common.fantasy_leaders({"header": {}}, self.game.away_id, self.game.home_id)

    def run_refresh(self, final, previous=None, summary=None, now=NOW, notes=None):
        event = event_for(self.game, final=final, away=24, home=27)
        calls = []

        def fantasy(url):
            calls.append(url)
            if summary is None:
                raise ValueError("box score not posted")
            return summary

        result, errors = nfl.refresh(
            [self.game], previous, lambda _url: {"events": [event]}, now, force=True,
            fantasy_fetch=fantasy, notes=notes,
        )
        self.assertEqual(errors, [])
        return result, calls

    def test_finals_get_verified_leaders_and_unplayed_games_never_do(self):
        scheduled, calls = self.run_refresh(False, summary=box_score(self.game))
        self.assertIsNone(scheduled["games"][self.game.event_id]["fantasyLeaders"])
        self.assertEqual(calls, [])
        final, calls = self.run_refresh(True, previous=scheduled, summary=box_score(self.game), now=NOW + timedelta(days=3))
        leaders = final["games"][self.game.event_id]["fantasyLeaders"]
        self.assertEqual(calls, [f"{common.SUMMARY_URL}?event={self.game.event_id}"])
        self.assertEqual(leaders["sourceUrl"], calls[0])
        self.assertEqual(len(leaders["players"]), 3)
        nfl.validate_results(final, [self.game])

    def test_unavailable_box_score_is_a_retried_note_not_a_fabricated_list(self):
        notes = []
        final, _ = self.run_refresh(True, now=NOW + timedelta(days=3), notes=notes)
        self.assertIsNone(final["games"][self.game.event_id]["fantasyLeaders"])
        self.assertEqual(len(notes), 1)
        retried, calls = self.run_refresh(True, previous=final, summary=box_score(self.game), now=NOW + timedelta(days=3, hours=1))
        self.assertEqual(len(calls), 1)
        self.assertEqual(len(retried["games"][self.game.event_id]["fantasyLeaders"]["players"]), 3)
        failed, _ = self.run_refresh(True, previous=retried, now=NOW + timedelta(days=3, hours=2), notes=notes)
        self.assertEqual(failed["games"][self.game.event_id]["fantasyLeaders"], retried["games"][self.game.event_id]["fantasyLeaders"])

    def test_validator_rejects_leaders_for_unfinished_games(self):
        leaders = {**common.fantasy_leaders(box_score(self.game), self.game.away_id, self.game.home_id),
                   "sourceUrl": f"{common.SUMMARY_URL}?event={self.game.event_id}"}
        common.validate_fantasy(leaders, self.game.away_id, self.game.home_id, True)
        with self.assertRaises(ValueError):
            common.validate_fantasy(leaders, self.game.away_id, self.game.home_id, False)
        leaders["players"].reverse()
        with self.assertRaises(ValueError):
            common.validate_fantasy(leaders, self.game.away_id, self.game.home_id, True)


if __name__ == "__main__":
    unittest.main()
