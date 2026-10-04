"""Import verified Weeks 1-3 results without creating predictions or notifications."""

from __future__ import annotations

import argparse
from collections import Counter
from datetime import datetime
import json
from pathlib import Path
import sys

from nfl_common import (
    API_ROOT, EASTERN, Game, PAGE_PATH, ROOT, SCOREBOARD_URL, SUMMARY_URL, UTC,
    fantasy_leaders, fetch_json, instant, load_games, read_html, replace_data, script_data, seal,
    stamp, validate_fantasy, verify_seal, write_json,
)
from nfl_results import observation, summary_event
from nfl_season import normalize_schedule_event


HISTORY_FIELDS = {
    "eventId", "season", "seasonType", "week", "date", "scheduledAt",
    "awayTeamId", "homeTeamId", "venue", "timeConfirmed", "status",
    "statusDetail", "awayScore", "homeScore", "winnerTeamId", "checkedAt", "sourceUrl",
}


def validate_history(payload: dict, html: str) -> None:
    verify_seal(payload)
    if payload.get("schemaVersion") != 1 or payload.get("season") != 2026 or payload.get("purpose") != "historical-results-only":
        raise ValueError("Historical results must explicitly exclude predictions.")
    known_teams = {team[0] for team in script_data(html, "catalog-data")["teams"].values()}
    forecast_ids = {game.event_id for game in load_games(html)}
    events = payload.get("games", {})
    if len(events) != 48 or Counter(event["week"] for event in events.values()) != {1: 16, 2: 16, 3: 16}:
        raise ValueError("Expected all 48 regular-season games from Weeks 1-3.")
    for event_id, event in events.items():
        if (
            set(event) - {"fantasyLeaders"} != HISTORY_FIELDS or event_id != event["eventId"] or not event_id.isdigit()
            or event_id in forecast_ids or event["season"] != 2026 or event["seasonType"] != 2
            or event["week"] not in (1, 2, 3) or event["awayTeamId"] not in known_teams
            or event["homeTeamId"] not in known_teams or event["awayTeamId"] == event["homeTeamId"]
        ):
            raise ValueError("Historical identity is invalid or contains prediction fields.")
        kickoff = instant(event["scheduledAt"])
        instant(event["checkedAt"])
        validate_fantasy(event.get("fantasyLeaders"), event["awayTeamId"], event["homeTeamId"], event["status"] == "final")
        if kickoff.astimezone(EASTERN).date().isoformat() != event["date"]:
            raise ValueError("Historical game date does not match its verified Eastern kickoff.")
        if event["status"] == "final":
            scores = (event["awayScore"], event["homeScore"])
            if any(isinstance(value, bool) or not isinstance(value, int) or value < 0 for value in scores):
                raise ValueError("Historical final scores are missing or invalid.")
            away, home = scores
            winner = event["awayTeamId"] if away > home else event["homeTeamId"] if home > away else None
            if event["winnerTeamId"] != winner:
                raise ValueError("Historical final scores disagree with the winner.")
        elif event["status"] not in {"scheduled", "in_progress", "postponed", "delayed", "canceled"} or any(
            event[key] is not None for key in ("awayScore", "homeScore", "winnerTeamId")
        ):
            raise ValueError("An unfinished historical game cannot have an invented final.")


def historical_result(game: Game, event: dict, now: datetime, source: str, fetch=None) -> dict:
    verified = observation(event, game, now)
    extra = {}
    if fetch is not None:
        extra["fantasyLeaders"] = None
        if verified["status"] == "final":
            summary_url = f"{SUMMARY_URL}?event={game.event_id}"
            extra["fantasyLeaders"] = {**fantasy_leaders(fetch(summary_url), game.away_id, game.home_id), "sourceUrl": summary_url}
    return {
        **extra,
        "eventId": game.event_id, "season": 2026, "seasonType": 2, "week": game.week,
        "date": instant(verified["scheduledAt"]).astimezone(EASTERN).date().isoformat(),
        "awayTeamId": game.away_id, "homeTeamId": game.home_id, "venue": game.venue,
        "checkedAt": stamp(now), "sourceUrl": source,
        **{key: verified[key] for key in (
            "scheduledAt", "timeConfirmed", "status", "statusDetail", "awayScore", "homeScore", "winnerTeamId",
        )},
    }


def collect_history(html: str, fetch, now: datetime, *, fantasy: bool = False) -> dict:
    catalog = script_data(html, "catalog-data")
    team_ids = {value[0] for value in catalog["teams"].values()}
    found = {}
    for team_id in sorted(team_ids, key=int):
        url = f"{API_ROOT}/teams/{team_id}/schedule?season=2026&seasontype=2"
        payload = fetch(url)
        if payload.get("season", {}).get("year") != 2026 or payload.get("season", {}).get("type") != 2:
            raise ValueError("The historical schedule source has the wrong season.")
        for raw in payload.get("events", []):
            week = raw.get("week", {}).get("number")
            if week not in (1, 2, 3):
                continue
            event = normalize_schedule_event(raw)
            competition = event["competitions"][0]
            sides = {entry["homeAway"]: str(entry["team"]["id"]) for entry in competition["competitors"]}
            if set(sides) != {"away", "home"} or any(value not in team_ids for value in sides.values()):
                raise ValueError("Historical schedule participants are not verified NFL team IDs.")
            venue = competition.get("venue", {}).get("address", {}).get("city", "") if competition.get("neutralSite") else ""
            kickoff = stamp(instant(event["date"]))
            game = Game(
                str(event["id"]), instant(kickoff).astimezone(EASTERN).date().isoformat(),
                week, sides["away"], sides["home"], None, kickoff, venue=venue, original=False,
            )
            observation(event, game, now)
            if game.event_id in found and found[game.event_id] != game:
                raise ValueError("The two team schedules disagree about a historical fixture.")
            found[game.event_id] = game
    if len(found) != 48:
        raise ValueError(f"The verified historical schedule is incomplete: {len(found)} of 48 games.")
    boards = {}
    results = {}
    for game in sorted(found.values(), key=lambda item: (item.scheduled_at, item.event_id)):
        day = instant(game.scheduled_at).astimezone(EASTERN).strftime("%Y%m%d")
        url = f"{SCOREBOARD_URL}?dates={day}"
        if day not in boards:
            boards[day] = fetch(url)
            if not isinstance(boards[day].get("events"), list):
                raise ValueError("A historical scoreboard has no event array.")
        matches = [event for event in boards[day]["events"] if str(event.get("id")) == game.event_id]
        if len(matches) > 1:
            raise ValueError("Duplicate historical event IDs in the scoreboard.")
        if matches:
            event = matches[0]
        else:
            url = f"{SUMMARY_URL}?event={game.event_id}"
            event = summary_event(fetch(url))
        results[game.event_id] = historical_result(game, event, now, url, fetch if fantasy else None)
    payload = seal({
        "schemaVersion": 1, "season": 2026, "purpose": "historical-results-only",
        "checkedAt": stamp(now), "source": SCOREBOARD_URL,
        "note": "Weeks 1-3 are historical results only. No picks, prediction grading, reassessment triggers, or new-final browser notifications are created.",
        "games": results,
    })
    validate_history(payload, html)
    return payload


def write_history(page: Path, html: str, payload: dict) -> None:
    validate_history(payload, html)
    updated = replace_data(html, "history-data", payload)
    for identifier in ("games-data", "catalog-data", "fixtures-data", "forecasts-data", "results-data"):
        if script_data(updated, identifier) != script_data(html, identifier):
            raise ValueError("History import attempted to modify a prediction or active result snapshot.")
    write_json(page.with_name("history.json"), payload)
    if updated != html:
        page.write_bytes(updated.encode("utf-8"))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    args = parser.parse_args()
    page = args.root / PAGE_PATH
    html = read_html(page)
    payload = collect_history(html, fetch_json, datetime.now(UTC), fantasy=True)
    write_history(page, html, payload)
    print(json.dumps({
        "historicalGames": len(payload["games"]),
        "byWeek": dict(sorted(Counter(game["week"] for game in payload["games"].values()).items())),
        "statuses": dict(Counter(game["status"] for game in payload["games"].values())),
        "firstDate": min(game["date"] for game in payload["games"].values()),
        "lastDate": max(game["date"] for game in payload["games"].values()),
        "ties": sum(game["status"] == "final" and game["winnerTeamId"] is None for game in payload["games"].values()),
        "checkedAt": payload["checkedAt"], "revision": payload["revision"],
    }, indent=2))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"Historical results import failed: {error}", file=sys.stderr)
        sys.exit(1)
