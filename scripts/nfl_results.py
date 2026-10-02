#!/usr/bin/env python3
"""Update only the confirmed results of the original 73 NFL predictions."""

from __future__ import annotations

import argparse
import copy
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time
from typing import Callable
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
PAGE_PATH = Path("unlisted") / "1ff39048f9eaca39e2808bb7b2b687a5" / "index.html"
LIVE_URL = "https://memconfigmgr.org/unlisted/1ff39048f9eaca39e2808bb7b2b687a5/"
SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard"
SUMMARY_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary"
PICKS_SHA256 = "5addb302dba2ccf1fc31f6df595fac62b32b002a860c9dcc8841dd4d193fafd2"
EASTERN = ZoneInfo("America/New_York")
UTC = timezone.utc
SCOPE_START = datetime(2026, 10, 1, tzinfo=EASTERN)
FINAL_TYPES = {"STATUS_FINAL", "STATUS_FINAL_OVERTIME", "STATUS_FINAL_TIE"}
FETCH_ERRORS = (OSError, ValueError, TimeoutError)
Fetch = Callable[[str], dict]


@dataclass(frozen=True)
class Game:
    event_id: str
    original_date: str
    week: int
    away_id: str
    home_id: str
    pick_id: str
    scheduled_at: str


def instant(value: str) -> datetime:
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise ValueError("A source timestamp is missing its time zone.")
    return parsed.astimezone(UTC)


def stamp(value: datetime) -> str:
    return value.astimezone(UTC).isoformat(timespec="seconds").replace("+00:00", "Z")


def digest(value: object) -> str:
    return hashlib.sha256(
        json.dumps(value, ensure_ascii=True, separators=(",", ":"), sort_keys=True).encode()
    ).hexdigest()


def script_data(html: str, identifier: str) -> object:
    matches = re.findall(
        rf'<script type="application/json" id="{re.escape(identifier)}">(.*?)</script>',
        html,
        re.DOTALL,
    )
    if len(matches) != 1:
        raise ValueError(f"Expected exactly one {identifier} data block.")
    return json.loads(matches[0])


def read_html(path: Path) -> str:
    return path.read_bytes().decode("utf-8")


def load_games(html: str) -> list[Game]:
    picks = script_data(html, "games-data")
    if not isinstance(picks, list) or len(picks) != 73 or digest(picks) != PICKS_SHA256:
        raise ValueError("The original 73 predictions have changed. Refusing to update.")
    catalog = script_data(html, "catalog-data")
    if not isinstance(catalog, dict) or catalog.get("season") != 2026 or catalog.get("seasonType") != 2:
        raise ValueError("The catalog must identify the 2026 regular season.")
    bindings = catalog["events"]
    teams = catalog["teams"]
    if len(bindings) != len(picks) or len({entry[0] for entry in bindings}) != len(picks):
        raise ValueError("The catalog must bind exactly 73 unique ESPN event IDs.")
    games = []
    for pick, binding in zip(picks, bindings, strict=True):
        week, original_date, away, home, _venue, chosen, reason = pick
        event_id, away_id, home_id, scheduled_at = binding
        if (
            not all(isinstance(value, str) and value.isdigit() for value in (event_id, away_id, home_id))
            or teams[away][0] != away_id
            or teams[home][0] != home_id
            or chosen not in (away, home)
            or len(reason.split()) != 5
            or instant(scheduled_at).astimezone(EASTERN).date().isoformat() != original_date
        ):
            raise ValueError(f"Invalid original-date/team binding for event {event_id}.")
        games.append(Game(event_id, original_date, week, away_id, home_id, teams[chosen][0], scheduled_at))
    return games


def fetch_json(url: str) -> dict:
    request = urllib.request.Request(
        url, headers={"Accept": "application/json", "User-Agent": "Matziq-NFL-Picks/1.0"}
    )
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = json.load(response)
            if not isinstance(payload, dict):
                raise ValueError("The source returned a non-object JSON document.")
            return payload
        except urllib.error.HTTPError as error:
            if error.code not in (429, 500, 502, 503, 504) or attempt == 2:
                raise
        except (urllib.error.URLError, TimeoutError):
            if attempt == 2:
                raise
        time.sleep(2 ** attempt)
    raise RuntimeError("HTTP retry loop ended without a response.")


def initial_result(game: Game) -> dict:
    return {
        "eventId": game.event_id,
        "awayTeamId": game.away_id,
        "homeTeamId": game.home_id,
        "scheduledAt": game.scheduled_at,
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


def validate_results(payload: dict, games: list[Game]) -> None:
    if payload.get("schemaVersion") != 1 or payload.get("picksSha256") != PICKS_SHA256:
        raise ValueError("Results schema or original-picks digest does not match.")
    expected_revision = digest({key: value for key, value in payload.items() if key != "revision"})
    if payload.get("revision") != expected_revision:
        raise ValueError("Results revision does not match its contents.")
    if set(payload.get("games", {})) != {game.event_id for game in games}:
        raise ValueError("Results must contain exactly the 73 bound events.")
    for game in games:
        result = payload["games"][game.event_id]
        if (result["eventId"], result["awayTeamId"], result["homeTeamId"]) != (
            game.event_id, game.away_id, game.home_id
        ):
            raise ValueError(f"Results identity mismatch for {game.event_id}.")
        instant(result["scheduledAt"])
        if result["status"] == "final":
            away = score(result["awayScore"])
            home = score(result["homeScore"])
            winner = game.away_id if away > home else game.home_id if home > away else None
            verdict = "tie" if winner is None else "correct" if winner == game.pick_id else "incorrect"
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
        or season.get("year") != 2026 or season.get("type") != 2
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
    if not datetime(2026, 8, 1, tzinfo=UTC) <= kickoff < datetime(2027, 3, 1, tzinfo=UTC):
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
        "awayScore": None, "homeScore": None, "winnerTeamId": None, "pickResult": "pending",
    }
    if name in FINAL_TYPES:
        if not completed or state != "post" or kickoff > now:
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
            pickResult="tie" if winner is None else "correct" if winner == game.pick_id else "incorrect",
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
    games: list[Game], previous: dict | None, fetch: Fetch, now: datetime, force: bool = False
) -> tuple[dict | None, list[str]]:
    if previous is not None:
        validate_results(previous, games)
    results = copy.deepcopy(previous["games"]) if previous else {game.event_id: initial_result(game) for game in games}
    due = [
        game for game in games
        if force or (now >= SCOPE_START and (when := next_check(results[game.event_id], now)) is not None and now >= when)
    ]
    if not due:
        if previous and not previous["monitoringComplete"] and all(next_check(result, now) is None for result in results.values()):
            completed = dict(previous, publishedAt=stamp(now), nextCheckAt=None, monitoringComplete=True)
            completed["revision"] = digest({key: value for key, value in completed.items() if key != "revision"})
            return completed, []
        return previous, []
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
                for key in ("status", "statusDetail", "awayScore", "homeScore", "winnerTeamId", "pickResult")
            )
            result.update(observed, checkedAt=stamp(now), error=None, sourceUrl=url)
            if observed["status"] == "final":
                result["firstFinalAt"] = result["firstFinalAt"] or stamp(now)
                if changed_final:
                    result["resultUpdatedAt"] = stamp(now)
        except FETCH_ERRORS as error:
            result["error"] = str(error)
            errors.append(f"{game.event_id}: {error}")
    semantic_change = previous is None or semantic_results(results) != semantic_results(previous["games"])
    heartbeat = force or previous is None or now - instant(previous["publishedAt"]) >= timedelta(hours=1)
    if not semantic_change and not heartbeat:
        return previous, errors
    checks = [next_check(result, now) for result in results.values()]
    active_checks = [check for check in checks if check is not None]
    successful = [result["checkedAt"] for result in results.values() if result["checkedAt"]]
    finals = [result["resultUpdatedAt"] for result in results.values() if result["resultUpdatedAt"]]
    payload = {
        "schemaVersion": 1, "picksSha256": PICKS_SHA256,
        "source": {"name": "ESPN", "url": SCOREBOARD_URL},
        "publishedAt": stamp(now), "lastAttemptAt": stamp(now),
        "lastSuccessfulCheckAt": max(successful, default=None),
        "lastResultAt": max(finals, default=None),
        "nextCheckAt": stamp(min(active_checks)) if active_checks else None,
        "monitoringComplete": not active_checks,
        "games": results,
    }
    payload["revision"] = digest(payload)
    validate_results(payload, games)
    return payload, errors


def write_results(page: Path, html: str, payload: dict) -> None:
    data = json.dumps(payload, ensure_ascii=True, indent=2, sort_keys=True) + "\n"
    newline = "\r\n" if "\r\n" in html else "\n"
    safe_inline = data.replace("<", "\\u003c").replace("\n", newline)
    pattern = r'(<script type="application/json" id="results-data">).*?(</script>)'
    updated, count = re.subn(pattern, lambda match: match[1] + newline + safe_inline + "  " + match[2], html, flags=re.DOTALL)
    if count != 1 or script_data(updated, "games-data") != script_data(html, "games-data"):
        raise ValueError("Refusing to write outside the single results data block.")
    load_games(updated)
    result_path = page.with_name("results.json")
    if not result_path.exists() or result_path.read_text(encoding="utf-8") != data:
        result_path.write_text(data, encoding="utf-8", newline="\n")
    if updated != html:
        page.write_bytes(updated.encode("utf-8"))


def deployed_matches(expected: dict, expected_html: str, fetch: Fetch = fetch_json) -> bool:
    nonce = str(time.time_ns())
    remote = fetch(LIVE_URL + "results.json?check=" + nonce)
    if remote.get("revision") != expected["revision"]:
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
    parser.add_argument("--force", action="store_true", help="Recheck all 73 bound events, including old finals.")
    parser.add_argument("--ensure-published", action="store_true", help="Request a legacy Pages build if needed and verify live bytes.")
    arguments = parser.parse_args()
    page = arguments.root / PAGE_PATH
    if arguments.ensure_published:
        ensure_published(page)
        return 0
    html = read_html(page)
    games = load_games(html)
    result_path = page.with_name("results.json")
    previous = json.loads(result_path.read_text(encoding="utf-8")) if result_path.exists() else None
    if previous is not None and script_data(html, "results-data") != previous:
        raise ValueError("The HTML snapshot and results.json disagree; refusing to overwrite either.")
    payload, errors = refresh(games, previous, fetch_json, datetime.now(UTC), arguments.force)
    if payload is not None and payload != previous:
        write_results(page, html, payload)
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
