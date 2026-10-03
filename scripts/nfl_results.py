#!/usr/bin/env python3
"""Discover remaining 2026 NFL fixtures and update confirmed, pregame-pick results."""

from __future__ import annotations

import argparse
import copy
from datetime import datetime, timedelta
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time
import urllib.request
from nfl_common import (
    EASTERN, FETCH_ERRORS, FINAL_TYPES, Fetch, Game, LIVE_URL, PAGE_PATH, PICKS_SHA256,
    ROOT, SCOREBOARD_URL, SCOPE_START, SUMMARY_URL, UTC, digest, fetch_json, instant,
    load_games, read_html, replace_data, script_data, stamp, validate_paragraph, write_json,
)
from nfl_forecasts import apply_pick_snapshots, publication_history, validate_ledger, validate_projected_score
from nfl_season import coverage_complete, discover


def initial_result(game: Game) -> dict:
    return {
        "eventId": game.event_id,
        "awayTeamId": game.away_id,
        "homeTeamId": game.home_id,
        "scheduledAt": game.scheduled_at,
        "timeConfirmed": game.time_confirmed,
        "hasStarted": False,
        "status": "scheduled",
        "statusDetail": "Scheduled",
        "awayScore": None,
        "homeScore": None,
        "winnerTeamId": None,
        "pickResult": "pending",
        "firstFinalAt": None,
        "resultUpdatedAt": None,
        "checkedAt": None,
        "lastAttemptAt": None,
        "error": None,
        "sourceUrl": None,
    }


def validate_results(payload: dict, games: list[Game], *, allow_pending_rebind=False) -> None:
    if payload.get("schemaVersion") != 1 or payload.get("picksSha256") != PICKS_SHA256:
        raise ValueError("Results schema or original-picks digest does not match.")
    expected_revision = digest({key: value for key, value in payload.items() if key != "revision"})
    if payload.get("revision") != expected_revision:
        raise ValueError("Results revision does not match its contents.")
    if set(payload.get("games", {})) != {game.event_id for game in games}:
        raise ValueError("Results must contain exactly the scoped season fixture IDs.")
    for game in games:
        result = payload["games"][game.event_id]
        if (result["eventId"], result["awayTeamId"], result["homeTeamId"]) != (
            game.event_id, game.away_id, game.home_id
        ):
            if not (allow_pending_rebind and not game.original and result["status"] in {"scheduled", "postponed", "delayed"} and not result.get("pickLockedAt")):
                raise ValueError(f"Results identity mismatch for {game.event_id}.")
        instant(result["scheduledAt"])
        picked = result.get("scoredPickTeamId", game.pick_id)
        if picked is not None and picked not in (game.away_id, game.home_id):
            raise ValueError(f"Invalid selected team for {game.event_id}.")
        if payload.get("scorePolicy") == "pregame-only":
            projection = result.get("projectedScore")
            status = result.get("projectedScoreStatus")
            if projection is not None:
                validate_projected_score(projection, game.away_id, game.home_id, picked)
                if status != "available" or not projection.get("id") or not projection.get("pickRevisionId"):
                    raise ValueError("A score projection needs an auditable forecast revision.")
                instant(projection["createdAt"])
            else:
                expected = "unpicked" if picked is None else "not-predicted-before-kickoff" if result.get("pickLockedAt") else "pending"
                if status != expected:
                    raise ValueError("A missing score projection must be labeled explicitly, not guessed.")
            if result.get("projectedScoreLockedAt") != result.get("pickLockedAt"):
                raise ValueError("A score projection must lock with its pregame pick.")
        if payload.get("explanationFormat") == "paragraph":
            if picked is None:
                if result.get("pickExplanation") != "":
                    raise ValueError("A game without a prediction must not have a pick explanation.")
            else:
                validate_paragraph(result.get("pickExplanation"))
        if payload.get("explanationPolicy") == "forecast-until-final":
            if picked is None:
                if result.get("pregameExplanation") != "" or result.get("explanationPhase") != "none":
                    raise ValueError("An unpicked game cannot have a pregame or postgame explanation.")
            else:
                validate_paragraph(result.get("pregameExplanation"))
                phase = result.get("explanationPhase")
                if phase in {"incorrect-final", "awaiting-review"}:
                    if result["status"] != "final" or result["pickResult"] != "incorrect":
                        raise ValueError("Only an incorrect completed pick may have a postgame review.")
                    if phase == "incorrect-final" and (not result.get("explanationRevisionId") or not result.get("explanationUpdatedAt")):
                        raise ValueError("A postgame review needs a recorded explanation revision.")
                elif phase != "pregame":
                    raise ValueError("Unknown pick explanation phase.")
                if phase != "incorrect-final" and result["pickExplanation"] != result["pregameExplanation"]:
                    raise ValueError("A correct or unfinished pick must retain its pregame wording.")
        if result["status"] == "final":
            away = score(result["awayScore"])
            home = score(result["homeScore"])
            winner = game.away_id if away > home else game.home_id if home > away else None
            verdict = "no_pick" if picked is None else "tie" if winner is None else "correct" if winner == picked else "incorrect"
            if (
                result["winnerTeamId"] != winner or result["pickResult"] != verdict
                or not result["firstFinalAt"] or not result["resultUpdatedAt"]
            ):
                raise ValueError(f"Inconsistent final result for {game.event_id}.")
        elif (
            result["status"] not in {"scheduled", "in_progress", "postponed", "delayed", "canceled"}
            or result["pickResult"] != "pending"
            or any(result[key] is not None for key in ("awayScore", "homeScore", "winnerTeamId"))
        ):
            raise ValueError(f"Nonfinal event {game.event_id} contains an invented result.")


def score(value: object) -> int:
    if isinstance(value, bool) or not re.fullmatch(r"\d{1,3}", str(value)):
        raise ValueError("A final score is missing or invalid.")
    return int(str(value))


def observation(event: dict, game: Game, now: datetime) -> dict:
    season = event.get("season", {})
    week = event.get("week", {})
    if (
        str(event.get("id")) != game.event_id
        or season.get("year") != 2026 or season.get("type") != game.season_type
        or (week.get("number") if isinstance(week, dict) else week) != game.week
    ):
        raise ValueError("ESPN event ID, season, or original week does not match.")
    competitions = event.get("competitions", [])
    if len(competitions) != 1 or str(competitions[0].get("id")) != game.event_id:
        raise ValueError("Missing or ambiguous ESPN competition.")
    competition = competitions[0]
    kickoff = instant(competition["date"])
    if event.get("date") and instant(event["date"]) != kickoff:
        raise ValueError("Event and competition dates disagree.")
    if not datetime(2026, 8, 1, tzinfo=UTC) <= kickoff < datetime(2027, 8, 1, tzinfo=UTC):
        raise ValueError("The event date is outside the verified 2026 NFL season.")
    competitors = competition.get("competitors", [])
    if len(competitors) != 2:
        raise ValueError("Expected two competitors.")
    sides = {competitor.get("homeAway"): competitor for competitor in competitors}
    if set(sides) != {"away", "home"}:
        raise ValueError("Missing home/away identity.")
    for side, team_id in (("away", game.away_id), ("home", game.home_id)):
        competitor = sides[side]
        if str(competitor.get("id")) != team_id or str(competitor.get("team", {}).get("id")) != team_id:
            raise ValueError("ESPN participant IDs do not match the immutable fixture.")
    status = competition.get("status") or event.get("status", {})
    status_type = status.get("type", {})
    name = status_type.get("name", "")
    completed = status_type.get("completed")
    state = status_type.get("state")
    if not isinstance(completed, bool) or state not in {"pre", "in", "post"}:
        raise ValueError("Missing authoritative game completion status.")
    result = {
        "scheduledAt": stamp(kickoff), "status": "scheduled", "statusDetail": "Scheduled",
        "timeConfirmed": bool(competition.get("timeValid", event.get("timeValid", True))),
        "hasStarted": state == "in" or name in FINAL_TYPES or name == "STATUS_SUSPENDED" or int(status.get("period", 0)) > 0,
        "awayScore": None, "homeScore": None, "winnerTeamId": None, "pickResult": "pending",
    }
    if name in FINAL_TYPES:
        if not completed or state != "post" or kickoff > now or not game.teams_known:
            raise ValueError("The source has not confirmed a valid final.")
        away, home = score(sides["away"].get("score")), score(sides["home"].get("score"))
        winner = game.away_id if away > home else game.home_id if home > away else None
        for side, team_id in (("away", game.away_id), ("home", game.home_id)):
            flag = sides[side].get("winner")
            if flag is not None and (not isinstance(flag, bool) or flag != (winner == team_id)):
                raise ValueError("Final scores and the source winner flags disagree.")
        overtime = (
            int(status.get("period", 0)) > 4 or "OVERTIME" in name
            or bool(re.search(r"\bOT\b", str(status_type.get("detail", ""))))
        )
        result.update(
            status="final", statusDetail="Final / OT" if overtime else "Final",
            awayScore=away, homeScore=home, winnerTeamId=winner,
            pickResult="no_pick" if game.pick_id is None else "tie" if winner is None else "correct" if winner == game.pick_id else "incorrect",
        )
    elif name in {"STATUS_CANCELED", "STATUS_CANCELLED"}:
        result.update(status="canceled", statusDetail="Canceled - no final result")
    elif completed or state == "post":
        raise ValueError(f"Unrecognized terminal source status: {name}.")
    elif name == "STATUS_POSTPONED":
        result.update(status="postponed", statusDetail="Postponed - awaiting a verified final")
    elif name in {"STATUS_DELAYED", "STATUS_SUSPENDED"}:
        result.update(status="delayed", statusDetail="Delayed - awaiting a verified final")
    elif state == "in":
        result.update(status="in_progress", statusDetail="In progress - awaiting final")
    elif name not in {"STATUS_SCHEDULED", "STATUS_TBD"}:
        raise ValueError(f"Unrecognized pregame source status: {name}.")
    elif now >= kickoff + timedelta(hours=12):
        result["statusDetail"] = "Final not yet confirmed by ESPN"
    elif not game.teams_known:
        result["statusDetail"] = "Awaiting official playoff matchup"
    elif not result["timeConfirmed"]:
        result["statusDetail"] = "Scheduled - kickoff date/time TBD"
    return result


def next_check(result: dict, now: datetime) -> datetime | None:
    kickoff = instant(result["scheduledAt"])
    attempted = result["lastAttemptAt"]
    if not attempted:
        return SCOPE_START.astimezone(UTC)
    last = instant(attempted)
    if result["status"] == "final":
        final_at = instant(result["firstFinalAt"])
        stop = final_at + timedelta(days=7)
        if now >= stop:
            return None
        interval = timedelta(hours=1) if now < final_at + timedelta(days=1) else timedelta(days=1)
        return min(last + interval, stop)
    if result["status"] == "canceled" and now >= kickoff + timedelta(days=7):
        return None
    if now < kickoff - timedelta(minutes=30):
        return min(last + timedelta(days=1), kickoff - timedelta(minutes=30))
    if now < kickoff + timedelta(hours=12):
        return last + timedelta(minutes=5)
    if now < kickoff + timedelta(days=7):
        return last + timedelta(minutes=15)
    return last + timedelta(hours=6)


def summary_event(payload: dict) -> dict:
    header = payload.get("header")
    if not isinstance(header, dict):
        raise ValueError("The ESPN summary is missing its event header.")
    return header


def semantic_results(results: dict) -> dict:
    ignored = {"checkedAt", "lastAttemptAt", "firstFinalAt", "resultUpdatedAt"}
    return {
        event_id: {key: value for key, value in result.items() if key not in ignored}
        for event_id, result in results.items()
    }


def refresh(
    games: list[Game], previous: dict | None, fetch: Fetch, now: datetime, force: bool = False,
    *, fixtures: dict | None = None, forecasts: dict | None = None, publications: dict | None = None,
) -> tuple[dict | None, list[str]]:
    if forecasts is not None:
        validate_ledger(forecasts, games)
    if previous is not None:
        prior_games = [game for game in games if game.event_id in previous["games"]]
        validate_results(previous, prior_games, allow_pending_rebind=True)
    results = {}
    for game in games:
        old = previous["games"].get(game.event_id) if previous else None
        results[game.event_id] = copy.deepcopy(old) if old and (old["awayTeamId"], old["homeTeamId"]) == (game.away_id, game.home_id) else initial_result(game)
    due = [
        game for game in games
        if force or (now >= SCOPE_START and (when := next_check(results[game.event_id], now)) is not None and now >= when)
    ]
    if not due and previous is None:
        return None, []
    boards: dict[str, dict | str] = {}
    errors = []
    for game in due:
        result = results[game.event_id]
        day = instant(result["scheduledAt"]).astimezone(EASTERN).strftime("%Y%m%d")
        url = f"{SCOREBOARD_URL}?dates={day}"
        result["lastAttemptAt"] = stamp(now)
        try:
            if day not in boards:
                try:
                    board = fetch(url)
                    if not isinstance(board.get("events"), list):
                        raise ValueError("The scoreboard is missing its events array.")
                    boards[day] = board
                except FETCH_ERRORS as error:
                    boards[day] = f"Scoreboard {day} unavailable: {error}"
            board = boards[day]
            if isinstance(board, str):
                raise ValueError(board)
            candidates = [event for event in board["events"] if str(event.get("id")) == game.event_id]
            if len(candidates) > 1:
                raise ValueError("Duplicate ESPN event IDs on the scoreboard.")
            if candidates:
                event = candidates[0]
            else:
                # A postponed game can disappear from its original day's scoreboard.
                url = f"{SUMMARY_URL}?event={game.event_id}"
                event = summary_event(fetch(url))
            observed = observation(event, game, now)
            if result["status"] == "final" and observed["status"] != "final":
                raise ValueError("Source no longer reports final; retained the last confirmed result.")
            changed_final = observed["status"] == "final" and any(
                result[key] != observed[key]
                for key in ("status", "statusDetail", "awayScore", "homeScore", "winnerTeamId")
            )
            result.update(observed, checkedAt=stamp(now), error=None, sourceUrl=url)
            if observed["status"] == "final":
                result["firstFinalAt"] = result["firstFinalAt"] or stamp(now)
                if changed_final:
                    result["resultUpdatedAt"] = stamp(now)
        except FETCH_ERRORS as error:
            result["error"] = str(error)
            errors.append(f"{game.event_id}: {error}")
    apply_pick_snapshots(games, results, forecasts, now, publications)
    complete = coverage_complete(fixtures, results, now) if fixtures else all(next_check(result, now) is None for result in results.values())
    fixture_revision = fixtures["revision"] if fixtures else None
    forecast_revision = forecasts["revision"] if forecasts else None
    semantic_change = previous is None or (
        semantic_results(results) != semantic_results(previous["games"])
        or fixture_revision != previous.get("fixtureRevision")
        or forecast_revision != previous.get("forecastRevision")
        or (publications or {}) != previous.get("forecastPublications", {})
        or (forecasts.get("explanationFormat") if forecasts else None) != previous.get("explanationFormat")
        or complete != previous["monitoringComplete"]
    )
    heartbeat = bool(due) and (force or previous is None or now - instant(previous["publishedAt"]) >= timedelta(hours=1))
    if not semantic_change and not heartbeat:
        return previous, errors
    checks = [next_check(result, now) for result in results.values()]
    active_checks = [check for check in checks if check is not None]
    if fixtures and not complete:
        active_checks.append(instant(fixtures["nextDiscoveryAt"]))
    successful = [result["checkedAt"] for result in results.values() if result["checkedAt"]]
    finals = [result["resultUpdatedAt"] for result in results.values() if result["resultUpdatedAt"]]
    payload = {
        "schemaVersion": 1, "picksSha256": PICKS_SHA256,
        "source": {"name": "ESPN", "url": SCOREBOARD_URL},
        "publishedAt": stamp(now), "lastAttemptAt": stamp(now) if due else previous["lastAttemptAt"],
        "lastSuccessfulCheckAt": max(successful, default=None),
        "lastResultAt": max(finals, default=None),
        "nextCheckAt": stamp(min(active_checks)) if active_checks and not complete else None,
        "monitoringComplete": complete,
        "fixtureRevision": fixture_revision, "forecastRevision": forecast_revision,
        "explanationFormat": forecasts.get("explanationFormat") if forecasts else None,
        "explanationPolicy": forecasts.get("explanationPolicy") if forecasts else None,
        "scorePolicy": forecasts.get("scorePolicy") if forecasts else None,
        "forecastPublications": publications or {},
        "analysis": {key: forecasts["assessments"][-1][key] for key in (
            "id", "assessedAt", "summary", "initialPickCount", "changedPickCount", "retainedCount", "skippedLockedCount"
        )} if forecasts and forecasts["assessments"] else None,
        "games": results,
    }
    if forecasts and forecasts["assessments"]:
        payload["analysis"]["changedScoreCount"] = forecasts["assessments"][-1].get("changedScoreCount", 0)
    payload["revision"] = digest(payload)
    validate_results(payload, games)
    return payload, errors


def write_results(page: Path, html: str, payload: dict, fixtures=None, forecasts=None) -> None:
    updated = replace_data(html, "results-data", payload)
    if fixtures is not None:
        updated = replace_data(updated, "fixtures-data", fixtures)
    if forecasts is not None:
        updated = replace_data(updated, "forecasts-data", forecasts)
    if script_data(updated, "games-data") != script_data(html, "games-data"):
        raise ValueError("The immutable original predictions changed.")
    load_games(updated)
    result_path = page.with_name("results.json")
    write_json(result_path, payload)
    if updated != html:
        page.write_bytes(updated.encode("utf-8"))


def deployed_matches(expected: dict, expected_html: str, fetch: Fetch = fetch_json) -> bool:
    nonce = str(time.time_ns())
    remote = fetch(LIVE_URL + "results.json?check=" + nonce)
    if remote.get("revision") != expected["revision"]:
        return False
    for filename, key in (("fixtures.json", "fixtureRevision"), ("forecasts.json", "forecastRevision")):
        if expected.get(key) and fetch(LIVE_URL + filename + "?check=" + nonce).get("revision") != expected[key]:
            return False
    request = urllib.request.Request(LIVE_URL + "?check=" + nonce, headers={"Cache-Control": "no-cache"})
    with urllib.request.urlopen(request, timeout=30) as response:
        live_html = response.read().decode("utf-8")
    return live_html == expected_html


def ensure_published(page: Path) -> None:
    expected_html = read_html(page)
    payload = json.loads(page.with_name("results.json").read_text(encoding="utf-8"))
    validate_results(payload, load_games(expected_html))
    try:
        if deployed_matches(payload, expected_html):
            print("The exact HTML and results revision are already live.")
            return
    except FETCH_ERRORS as error:
        print(f"Live check unavailable before deployment: {error}", file=sys.stderr)
    repository = os.environ.get("GITHUB_REPOSITORY")
    if repository != "matziq/matziq.github.io" or not os.environ.get("GH_TOKEN"):
        raise ValueError("Explicit Pages publishing requires this repository's workflow token.")
    subprocess.run(
        ["gh", "api", "--method", "POST", f"repos/{repository}/pages/builds"],
        check=True,
    )
    print("Requested a Pages build explicitly; a GITHUB_TOKEN push alone is not relied on.")
    for _ in range(32):
        time.sleep(15)
        try:
            if deployed_matches(payload, expected_html):
                print(f"Verified live HTML and results revision {payload['revision']}.")
                return
        except FETCH_ERRORS as error:
            print(f"Waiting for published files: {error}", file=sys.stderr)
    raise RuntimeError("Pages did not serve the exact updated HTML and results within eight minutes.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--force", action="store_true", help="Recheck the full scoped season, including postseason discovery and older finals.")
    parser.add_argument("--ensure-published", action="store_true", help="Request a legacy Pages build if needed and verify live bytes.")
    arguments = parser.parse_args()
    page = arguments.root / PAGE_PATH
    if arguments.ensure_published:
        ensure_published(page)
        return 0
    html = read_html(page)
    result_path = page.with_name("results.json")
    previous = json.loads(result_path.read_text(encoding="utf-8")) if result_path.exists() else None
    if previous is not None and script_data(html, "results-data") != previous:
        raise ValueError("The HTML snapshot and results.json disagree; refusing to overwrite either.")
    if previous and previous["monitoringComplete"] and not arguments.force:
        print("The full season and postseason correction windows are complete; no source checks are due.")
        return 0
    fixture_path = page.with_name("fixtures.json")
    fixtures = json.loads(fixture_path.read_text(encoding="utf-8")) if fixture_path.exists() else None
    if fixtures is not None:
        fixtures = discover(html, fixtures, fetch_json, datetime.now(UTC), force=arguments.force, results=previous)
    forecast_path = page.with_name("forecasts.json")
    forecasts = json.loads(forecast_path.read_text(encoding="utf-8")) if forecast_path.exists() else None
    games = load_games(html, fixtures)
    publications = publication_history(arguments.root, forecasts) if forecasts is not None else None
    payload, errors = refresh(
        games, previous, fetch_json, datetime.now(UTC), arguments.force,
        fixtures=fixtures, forecasts=forecasts, publications=publications,
    )
    if payload is not None and payload != previous:
        if fixtures is not None:
            write_json(fixture_path, fixtures)
        write_results(page, html, payload, fixtures, forecasts)
        print(f"Results revision {payload['revision']}; last result change {payload['lastResultAt']}.")
    else:
        print("No publishable results change; outside a check window or unchanged since the last published check.")
    for error in errors:
        print(f"::warning::{error}", file=sys.stderr)
    return 2 if errors else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, TypeError, RuntimeError, subprocess.CalledProcessError) as error:
        print(f"NFL results update failed: {error}", file=sys.stderr)
        sys.exit(1)
