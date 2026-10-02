"""Discover verified season fixtures, including official postseason TBD slots."""

from __future__ import annotations

import argparse
import copy
from datetime import datetime, timedelta
import json
from pathlib import Path
import sys

from nfl_common import (
    API_ROOT, EASTERN, PAGE_PATH, ROOT, ROUND_COUNTS, ROUND_NAMES, SCHEDULE_SOURCE,
    SCOREBOARD_URL, UTC, fetch_json, instant, original_games, read_html, script_data,
    seal, stamp, validate_fixtures, write_json,
)


POSTSEASON = [
    {"week": 1, "label": "Wild Card", "expectedGames": 6, "dateLabel": "Starts January 16, 2027", "queryDates": ["20270116", "20270117", "20270118"]},
    {"week": 2, "label": "Divisional", "expectedGames": 4, "dateLabel": "January 23-24, 2027", "queryDates": ["20270123", "20270124"]},
    {"week": 3, "label": "Conference championships", "expectedGames": 2, "dateLabel": "January 31, 2027", "queryDates": ["20270131"]},
    {"week": 4, "label": "Super Bowl LXI", "expectedGames": 1, "dateLabel": "February 14, 2027 - SoFi Stadium", "queryDates": ["20270214"]},
]


def normalize_schedule_event(event: dict) -> dict:
    normalized = copy.deepcopy(event)
    phase = event.get("seasonType", {}).get("type")
    normalized["season"] = {"year": event.get("season", {}).get("year"), "type": phase}
    for competition in normalized.get("competitions", []):
        for competitor in competition.get("competitors", []):
            raw_score = competitor.get("score")
            if isinstance(raw_score, dict):
                competitor["score"] = raw_score.get("displayValue")
    return normalized


def fixture(event: dict, allowed: set[str], now: datetime, source: str, previous: dict | None = None) -> dict:
    phase, week = event.get("season", {}).get("type"), event.get("week", {}).get("number")
    event_id = str(event.get("id", ""))
    if event.get("season", {}).get("year") != 2026 or not event_id.isdigit():
        raise ValueError("The schedule source contains a mismatched season or event ID.")
    if not ((phase == 2 and 4 <= week <= 18) or (phase == 3 and week in ROUND_NAMES)):
        raise ValueError("The event is not a scoped regular-season or postseason fixture.")
    competitions = event.get("competitions", [])
    if len(competitions) != 1 or str(competitions[0].get("id")) != event_id:
        raise ValueError("The schedule contains an ambiguous competition.")
    competition = competitions[0]
    sides = {item.get("homeAway"): item for item in competition.get("competitors", [])}
    if len(competition.get("competitors", [])) != 2 or set(sides) != {"away", "home"}:
        raise ValueError("A schedule fixture is missing its participants.")
    ids = {}
    for side in ("away", "home"):
        competitor = sides[side]
        team_id = str(competitor.get("team", {}).get("id"))
        if team_id != str(competitor.get("id")) or team_id not in allowed | {"-1", "-2"}:
            raise ValueError("The schedule has an unknown or inconsistent team ID.")
        if phase == 2 and team_id not in allowed:
            raise ValueError("A regular-season fixture has an unknown opponent.")
        ids[side] = team_id
    kickoff = instant(competition["date"])
    if event.get("date") and instant(event["date"]) != kickoff:
        raise ValueError("Event and competition kickoff dates disagree.")
    if not datetime(2026, 9, 1, tzinfo=UTC) <= kickoff < datetime(2027, 8, 1, tzinfo=UTC):
        raise ValueError("The fixture kickoff is outside the 2026 NFL season.")
    status = competition.get("status", {}).get("type", {})
    if status.get("state") not in {"pre", "in", "post"} or not isinstance(status.get("completed"), bool):
        raise ValueError("The fixture has no authoritative status.")
    if previous and (previous["awayTeamId"], previous["homeTeamId"]) != (ids["away"], ids["home"]):
        if status["state"] != "pre" or status["completed"]:
            raise ValueError("Participant changes after kickoff require review, not an automatic rewrite.")
    time_confirmed = bool(competition.get("timeValid", event.get("timeValid", True)))
    venue = competition.get("venue", {})
    city = venue.get("address", {}).get("city", "")
    result = dict(previous or {})
    result.update(
        eventId=event_id, season=2026, seasonType=phase, week=week,
        awayTeamId=ids["away"], homeTeamId=ids["home"], scheduledAt=stamp(kickoff),
        timeConfirmed=time_confirmed, venue=city if competition.get("neutralSite") else "",
        stadium=venue.get("fullName", ""), neutralSite=bool(competition.get("neutralSite")),
        sourceUrl=source, lastVerifiedAt=stamp(now),
    )
    if previous is None:
        result.update(
            originalDate=kickoff.astimezone(EASTERN).date().isoformat(),
            originalScheduledAt=stamp(kickoff), originalTimeConfirmed=time_confirmed,
            discoveredAt=stamp(now),
        )
    return result


def discover(html: str, previous: dict | None, fetch, now: datetime, *, force=False, results=None) -> dict:
    if previous:
        validate_fixtures(previous, html)
        if not force and now < instant(previous["nextDiscoveryAt"]):
            return previous
    teams = {entry[0] for entry in script_data(html, "catalog-data")["teams"].values()}
    events = copy.deepcopy(previous["events"]) if previous else {}
    regular_due = force or previous is None or now - instant(previous["regularCheckedAt"]) >= timedelta(days=1)
    if regular_due:
        fetched = {}
        for team_id in sorted(teams, key=int):
            url = f"{API_ROOT}/teams/{team_id}/schedule?season=2026&seasontype=2"
            data = fetch(url)
            if data.get("season", {}).get("year") != 2026 or data.get("season", {}).get("type") != 2:
                raise ValueError(f"Wrong season in team {team_id}'s schedule.")
            for raw in data.get("events", []):
                if raw.get("week", {}).get("number", 0) < 4:
                    continue
                normalized = normalize_schedule_event(raw)
                record = fixture(normalized, teams, now, url, events.get(str(raw["id"])))
                if record["eventId"] in fetched:
                    other = fetched[record["eventId"]]
                    for field in ("awayTeamId", "homeTeamId", "scheduledAt", "seasonType", "week"):
                        if other[field] != record[field]:
                            raise ValueError("Team schedules disagree; leaving the fixture catalog unchanged.")
                fetched[record["eventId"]] = record
        if len(fetched) != 224:
            raise ValueError(f"Expected 224 remaining regular-season fixtures, received {len(fetched)}.")
        events.update(fetched)
        for game in original_games(html):
            record = events[game.event_id]
            if (record["awayTeamId"], record["homeTeamId"], record["week"]) != (game.away_id, game.home_id, game.week):
                raise ValueError("The schedule contradicts an immutable original matchup.")
            record.update(originalDate=game.original_date, originalScheduledAt=game.scheduled_at, originalTimeConfirmed=True)

    seen_postseason = set()
    for round_info in POSTSEASON:
        for day in round_info["queryDates"]:
            url = f"{SCOREBOARD_URL}?dates={day}"
            data = fetch(url)
            if not isinstance(data.get("events"), list):
                raise ValueError("A postseason scoreboard is missing its events list.")
            for raw in data["events"]:
                if raw.get("season", {}).get("type") != 3:
                    continue
                record = fixture(raw, teams, now, url, events.get(str(raw["id"])))
                if record["week"] != round_info["week"]:
                    raise ValueError("The postseason event disagrees with the official round calendar.")
                events[record["eventId"]] = record
                seen_postseason.add(record["eventId"])
    for event_id, previous_event in list(events.items()):
        if previous_event["seasonType"] != 3 or event_id in seen_postseason:
            continue
        url = f"{API_ROOT}/summary?event={event_id}"
        header = fetch(url).get("header")
        if not isinstance(header, dict):
            raise ValueError("A missing/rescheduled postseason slot has no authoritative summary.")
        if isinstance(header.get("week"), int):
            header["week"] = {"number": header["week"]}
        events[event_id] = fixture(header, teams, now, url, previous_event)

    # Matchups are often filled shortly after a qualifying final; use a tight
    # discovery window then, and a daily check when no announcement is expected.
    recent_final = results and any(
        result["status"] == "final" and result["resultUpdatedAt"]
        and now - instant(result["resultUpdatedAt"]) < timedelta(hours=24)
        for event_id, result in results["games"].items()
        if event_id in events and (events[event_id]["seasonType"] == 3 or events[event_id]["week"] == 18)
    )
    unknown = any(event["seasonType"] == 3 and (
        event["awayTeamId"] not in teams or event["homeTeamId"] not in teams
    ) for event in events.values()) or sum(event["seasonType"] == 3 for event in events.values()) < 13
    interval = timedelta(minutes=5) if recent_final and unknown else timedelta(days=1)
    payload = {
        "schemaVersion": 1, "season": 2026, "source": SCHEDULE_SOURCE,
        "regularSeasonRemaining": 224, "originalPredictions": 73,
        "postseason": POSTSEASON, "events": events,
        "lastDiscoveryAt": stamp(now), "nextDiscoveryAt": stamp(now + interval),
        "regularCheckedAt": stamp(now) if regular_due else previous["regularCheckedAt"],
    }
    seal(payload)
    validate_fixtures(payload, html)
    return payload


def coverage_complete(fixtures: dict, results: dict, now: datetime) -> bool:
    events = fixtures["events"]
    for week, count in ROUND_COUNTS.items():
        round_events = [event for event in events.values() if event["seasonType"] == 3 and event["week"] == week]
        if len(round_events) != count:
            return False
        if any(event["awayTeamId"].startswith("-") or event["homeTeamId"].startswith("-") for event in round_events):
            return False
    for event_id, event in events.items():
        result = results.get(event_id)
        if not result:
            return False
        if event["seasonType"] == 2 and result["status"] == "canceled":
            if now < instant(result["scheduledAt"]) + timedelta(days=7):
                return False
        elif result["status"] != "final" or not result["firstFinalAt"] or now < instant(result["firstFinalAt"]) + timedelta(days=7):
            return False
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    page = args.root / PAGE_PATH
    path = page.with_name("fixtures.json")
    previous = json.loads(path.read_text()) if path.exists() else None
    payload = discover(read_html(page), previous, fetch_json, datetime.now(UTC), force=args.force)
    write_json(path, payload)
    known = sum(event["awayTeamId"].isdigit() and event["homeTeamId"].isdigit() for event in payload["events"].values())
    print(json.dumps({"fixtures": len(payload["events"]), "knownMatchups": known, "regularSeason": 224, "originals": 73, "revision": payload["revision"]}))


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"NFL fixture discovery failed: {error}", file=sys.stderr)
        sys.exit(1)
