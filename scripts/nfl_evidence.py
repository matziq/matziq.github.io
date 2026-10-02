"""Collect dated public evidence for an AI assessment; never choose winners."""

from __future__ import annotations

import argparse
from datetime import datetime, timedelta
from pathlib import Path
import sys

from nfl_common import API_ROOT, EASTERN, PAGE_PATH, ROOT, SCOREBOARD_URL, UTC, fetch_json, instant, read_html, script_data, stamp, write_json


def collect(html: str, fetch, now: datetime) -> dict:
    catalog = script_data(html, "catalog-data")
    sources = {}

    def get(identifier, url):
        data = fetch(url)
        sources[identifier] = {"id": identifier, "url": url, "checkedAt": stamp(now), "sourceTimestamp": data.get("timestamp")}
        return data

    injuries = get("injuries", API_ROOT + "/injuries")
    if injuries.get("season", {}).get("year") != 2026:
        raise ValueError("The injury source is not reporting the 2026 season.")
    by_team = {}
    for group in injuries.get("injuries", []):
        by_team[str(group["id"])] = [{
            "player": item["athlete"]["displayName"],
            "position": item["athlete"].get("position", {}).get("abbreviation"),
            "status": item["status"], "reportedAt": item["date"],
            "report": item.get("shortComment", ""), "context": item.get("longComment", ""),
        } for item in group.get("injuries", []) if item.get("status") != "Active"]
    news = get("news", API_ROOT + "/news?limit=80")
    articles = []
    for article in news.get("articles", []):
        published = article.get("published")
        url = article.get("links", {}).get("web", {}).get("href")
        if not published or not url or not now - timedelta(days=10) <= instant(published) <= now + timedelta(minutes=2):
            continue
        if "/video/" in url:
            continue
        articles.append({
            "title": article["headline"], "publishedAt": published, "url": url,
            "summary": article.get("description", ""),
            "teamIds": [str(category["teamId"]) for category in article.get("categories", []) if category.get("teamId")],
        })
    teams = {}
    for mascot, (team_id, location, full_name) in catalog["teams"].items():
        schedule = get(f"schedule-{team_id}", f"{API_ROOT}/teams/{team_id}/schedule?season=2026&seasontype=2")
        depth = get(f"depth-{team_id}", f"{API_ROOT}/teams/{team_id}/depthcharts")
        roster = get(f"roster-{team_id}", f"{API_ROOT}/teams/{team_id}/roster?season=2026")
        for data in (schedule, depth, roster):
            if data.get("season", {}).get("year") != 2026 or data.get("season", {}).get("type") not in (2, 3):
                raise ValueError(f"Team {team_id} evidence has a mismatched season.")
            if str(data.get("team", {}).get("id")) != team_id:
                raise ValueError(f"Team {team_id} evidence has a mismatched team ID.")
        quarterbacks = []
        starters = []
        for group in depth.get("depthchart", []):
            for position in group.get("positions", {}).values():
                abbreviation = position["position"]["abbreviation"]
                players = position.get("athletes", [])
                if abbreviation == "QB":
                    quarterbacks = [{
                        "id": player["id"], "name": player["displayName"],
                        "injuries": [{
                            "status": item.get("status"), "date": item.get("date"),
                            "report": item.get("shortComment", ""),
                        } for item in player.get("injuries", [])],
                    } for player in players]
                if players:
                    starters.append({"position": abbreviation, "name": players[0]["displayName"], "id": players[0]["id"]})
        if not quarterbacks:
            raise ValueError(f"No quarterback depth chart was available for team {team_id}.")
        schedule_events = list(schedule.get("events", []))
        if now >= datetime(2027, 1, 10, tzinfo=UTC):
            playoffs = get(f"playoffs-{team_id}", f"{API_ROOT}/teams/{team_id}/schedule?season=2026&seasontype=3")
            if playoffs.get("season", {}).get("year") != 2026 or playoffs.get("season", {}).get("type") != 3:
                raise ValueError("Postseason evidence has a mismatched season/type.")
            schedule_events.extend(playoffs.get("events", []))
        discipline = [
            {"player": athlete["displayName"], "status": athlete.get("status"), "position": athlete.get("position", {}).get("abbreviation")}
            for group in roster.get("athletes", []) for athlete in group.get("items", [])
            if any(word in str(athlete.get("status", {})).lower() for word in ("suspend", "exempt", "reserve"))
        ]
        history = []
        future = []
        for event in schedule_events:
            competition = event["competitions"][0]
            own = next(competitor for competitor in competition["competitors"] if str(competitor["id"]) == team_id)
            other = next(competitor for competitor in competition["competitors"] if str(competitor["id"]) != team_id)
            item = {
                "eventId": str(event["id"]), "date": event["date"], "week": event["week"]["number"],
                "opponentId": str(other["id"]), "opponent": other["team"]["displayName"], "side": own["homeAway"],
                "neutral": bool(competition.get("neutralSite")), "timeConfirmed": bool(competition.get("timeValid", True)),
                "city": competition.get("venue", {}).get("address", {}).get("city", ""),
            }
            if competition["status"]["type"]["completed"] and instant(event["date"]) <= now:
                item.update(pointsFor=int(own["score"]["value"]), pointsAgainst=int(other["score"]["value"]))
                history.append(item)
            else:
                future.append(item)
        teams[team_id] = {
            "name": full_name, "mascot": mascot, "location": location, "record": depth["team"].get("recordSummary"),
            "pointsFor": sum(game["pointsFor"] for game in history),
            "pointsAgainst": sum(game["pointsAgainst"] for game in history),
            "completedGames": history, "remainingSchedule": future, "byeWeek": schedule.get("byeWeek"),
            "quarterbackDepthOrder": quarterbacks, "listedStarters": starters,
            "disciplineAndReserveStatuses": discipline,
            "injuryFeedPresent": team_id in by_team, "injuries": by_team.get(team_id, []),
            "news": [article for article in articles if team_id in article["teamIds"]],
            "sourceIds": [f"schedule-{team_id}", f"depth-{team_id}", f"roster-{team_id}", "injuries", "news"],
        }
    conditions = {}
    for offset in range(8):
        day = (now.astimezone(EASTERN) + timedelta(days=offset)).strftime("%Y%m%d")
        board = get(f"conditions-{day}", f"{SCOREBOARD_URL}?dates={day}")
        for event in board.get("events", []):
            if event.get("season", {}).get("year") != 2026:
                continue
            competition = event["competitions"][0]
            conditions[str(event["id"])] = {
                "scheduledAt": event["date"], "weather": event.get("weather"),
                "venue": {key: competition.get("venue", {}).get(key) for key in ("fullName", "indoor", "address")},
                "sourceId": f"conditions-{day}",
            }
    return {
        "schemaVersion": 1, "season": 2026, "collectedAt": stamp(now),
        "purpose": "Evidence only. An AI must evaluate performance, opponent quality, QB/injuries, roster/news, venue, travel and rest; no deterministic winner model is used.",
        "sources": sources, "teams": teams, "news": articles, "nearTermConditions": conditions,
        "limitations": "Depth-chart order is not a guaranteed game-day starter. Dated injury or suspension reports do not prove later-week availability. Return estimates, usage, opponent quality, coaching/roster changes and weather require interpretation, not mechanical flips. Missing weather or disciplinary reports are unknown, not all-clear confirmations. Long-range weather, flex times and playoff qualifiers are not invented.",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    root, output = args.root.resolve(), args.output.resolve()
    if root == output or root in output.parents:
        raise ValueError("Research bundles belong outside the public repository.")
    payload = collect(read_html(root / PAGE_PATH), fetch_json, datetime.now(UTC))
    output.parent.mkdir(parents=True, exist_ok=True)
    write_json(output, payload)
    print(f"Collected current public evidence for {len(payload['teams'])} teams and {len(payload['news'])} dated news reports: {output}")
    for team in payload["teams"].values():
        quarterbacks = ", ".join(player["name"] for player in team["quarterbackDepthOrder"][:2])
        print(f"{team['name']}: {team['record']}; points {team['pointsFor']}-{team['pointsAgainst']}; QB order {quarterbacks}; {len(team['injuries'])} injury reports.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, TypeError, StopIteration) as error:
        print(f"Evidence collection failed; assessment remains retryable: {error}", file=sys.stderr)
        sys.exit(1)
