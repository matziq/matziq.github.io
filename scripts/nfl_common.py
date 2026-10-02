"""Shared identities, immutable original picks, and public NFL source access."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import time
from typing import Callable
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
PAGE_PATH = Path("unlisted") / "1ff39048f9eaca39e2808bb7b2b687a5" / "index.html"
LIVE_URL = "https://memconfigmgr.org/unlisted/1ff39048f9eaca39e2808bb7b2b687a5/"
API_ROOT = "https://site.api.espn.com/apis/site/v2/sports/football/nfl"
SCOREBOARD_URL = API_ROOT + "/scoreboard"
SUMMARY_URL = API_ROOT + "/summary"
SCHEDULE_SOURCE = "https://media.nfl.com/football-information/2026/news/2026-nfl-schedule-announced"
PICKS_SHA256 = "5addb302dba2ccf1fc31f6df595fac62b32b002a860c9dcc8841dd4d193fafd2"
ORIGINAL_PUBLISHED_AT = "2026-10-01T19:23:00Z"
EASTERN = ZoneInfo("America/New_York")
UTC = timezone.utc
SCOPE_START = datetime(2026, 10, 1, tzinfo=EASTERN)
FINAL_TYPES = {"STATUS_FINAL", "STATUS_FINAL_OVERTIME", "STATUS_FINAL_TIE"}
FETCH_ERRORS = (OSError, ValueError, TimeoutError)
Fetch = Callable[[str], dict]
ROUND_NAMES = {1: "Wild Card", 2: "Divisional", 3: "Conference championships", 4: "Super Bowl LXI"}
ROUND_COUNTS = {1: 6, 2: 4, 3: 2, 4: 1}


@dataclass(frozen=True)
class Game:
    event_id: str
    original_date: str
    week: int
    away_id: str
    home_id: str
    pick_id: str | None
    scheduled_at: str
    season_type: int = 2
    venue: str = ""
    reason: str = ""
    original: bool = True
    time_confirmed: bool = True

    @property
    def teams_known(self) -> bool:
        return self.away_id.isdigit() and self.home_id.isdigit() and self.away_id != self.home_id

    @property
    def round_label(self) -> str:
        return f"Week {self.week}" if self.season_type == 2 else ROUND_NAMES[self.week]


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


def seal(payload: dict) -> dict:
    payload["revision"] = digest({key: value for key, value in payload.items() if key != "revision"})
    return payload


def verify_seal(payload: dict) -> None:
    if payload.get("revision") != digest({key: value for key, value in payload.items() if key != "revision"}):
        raise ValueError("The document revision does not match its contents.")


def validate_paragraph(value: object) -> None:
    if (
        not isinstance(value, str) or value != value.strip()
        or len(value.split()) < 10 or len(value) > 1400
        or re.search(r"[\r\n\t<>]", value) or not re.search(r"[.!?]$", value)
    ):
        raise ValueError("A pick explanation must be one concise plain-text paragraph, with complete sentences and no HTML or line breaks.")


def script_data(html: str, identifier: str) -> object:
    matches = re.findall(
        rf'<script type="application/json" id="{re.escape(identifier)}">(.*?)</script>', html, re.DOTALL
    )
    if len(matches) != 1:
        raise ValueError(f"Expected exactly one {identifier} data block.")
    return json.loads(matches[0])


def replace_data(html: str, identifier: str, payload: object) -> str:
    newline = "\r\n" if "\r\n" in html else "\n"
    data = json.dumps(payload, ensure_ascii=True, indent=2, sort_keys=True).replace("<", "\\u003c")
    data = data.replace("\n", newline)
    pattern = rf'(<script type="application/json" id="{re.escape(identifier)}">).*?(</script>)'
    updated, count = re.subn(pattern, lambda match: match[1] + newline + data + newline + "  " + match[2], html, flags=re.DOTALL)
    if count != 1:
        raise ValueError(f"Expected a single {identifier} snapshot to update.")
    return updated


def read_html(path: Path) -> str:
    return path.read_bytes().decode("utf-8")


def write_json(path: Path, payload: dict) -> None:
    text = json.dumps(payload, ensure_ascii=True, indent=2, sort_keys=True) + "\n"
    if not path.exists() or path.read_text(encoding="utf-8") != text:
        path.write_text(text, encoding="utf-8", newline="\n")


def original_games(html: str) -> list[Game]:
    picks = script_data(html, "games-data")
    if not isinstance(picks, list) or len(picks) != 73 or digest(picks) != PICKS_SHA256:
        raise ValueError("The original 73 predictions have changed. Refusing to update.")
    catalog = script_data(html, "catalog-data")
    if not isinstance(catalog, dict) or catalog.get("season") != 2026 or catalog.get("seasonType") != 2:
        raise ValueError("The original catalog must identify the 2026 regular season.")
    bindings, teams = catalog["events"], catalog["teams"]
    if len(bindings) != 73 or len({entry[0] for entry in bindings}) != 73:
        raise ValueError("The original catalog must bind 73 unique event IDs.")
    games = []
    for pick, binding in zip(picks, bindings, strict=True):
        week, date, away, home, venue, chosen, reason = pick
        event_id, away_id, home_id, kickoff = binding
        if (
            not all(isinstance(value, str) and value.isdigit() for value in (event_id, away_id, home_id))
            or teams[away][0] != away_id or teams[home][0] != home_id
            or chosen not in (away, home) or len(reason.split()) != 5
            or instant(kickoff).astimezone(EASTERN).date().isoformat() != date
        ):
            raise ValueError(f"Invalid immutable original fixture {event_id}.")
        games.append(Game(event_id, date, week, away_id, home_id, teams[chosen][0], kickoff, venue=venue, reason=reason))
    return games


def validate_fixtures(fixtures: dict, html: str) -> None:
    verify_seal(fixtures)
    if fixtures.get("schemaVersion") != 1 or fixtures.get("season") != 2026:
        raise ValueError("Fixture coverage must be for the 2026 NFL season.")
    catalog = script_data(html, "catalog-data")
    allowed_teams = {value[0] for value in catalog["teams"].values()}
    events = fixtures.get("events")
    if not isinstance(events, dict):
        raise ValueError("The fixtures document has no event map.")
    for event_id, event in events.items():
        if not event_id.isdigit() or event_id != event["eventId"] or event["season"] != 2026:
            raise ValueError("Invalid fixture event or season identity.")
        phase, week = event["seasonType"], event["week"]
        if not ((phase == 2 and 4 <= week <= 18) or (phase == 3 and week in ROUND_NAMES)):
            raise ValueError("A fixture is outside the remaining regular season and official postseason.")
        ids = (event["awayTeamId"], event["homeTeamId"])
        if ids[0] == ids[1] or any(team_id not in allowed_teams | {"-1", "-2"} for team_id in ids):
            raise ValueError("Unknown NFL participant ID in the fixture catalog.")
        if phase == 2 and not all(team_id in allowed_teams for team_id in ids):
            raise ValueError("A remaining regular-season matchup cannot be speculative.")
        for field in ("originalScheduledAt", "scheduledAt", "discoveredAt", "lastVerifiedAt"):
            instant(event[field])
        if not isinstance(event["timeConfirmed"], bool):
            raise ValueError("A fixture needs an explicit kickoff-confirmation flag.")
    for original in original_games(html):
        event = events.get(original.event_id)
        if not event or (
            event["seasonType"], event["week"], event["awayTeamId"], event["homeTeamId"],
            event["originalDate"], event["originalScheduledAt"],
        ) != (
            2, original.week, original.away_id, original.home_id, original.original_date, original.scheduled_at,
        ):
            raise ValueError("The fixture catalog changed an original matchup or initial date.")
    regular = sum(event["seasonType"] == 2 for event in events.values())
    if regular != 224:
        raise ValueError(f"Expected the 224 regular-season fixtures from October 1 onward, found {regular}.")
    for week, expected in ROUND_COUNTS.items():
        if sum(event["seasonType"] == 3 and event["week"] == week for event in events.values()) > expected:
            raise ValueError(f"Too many official games in postseason round {week}.")


def load_games(html: str, fixtures: dict | None = None) -> list[Game]:
    originals = original_games(html)
    if fixtures is None and 'id="fixtures-data"' in html:
        fixtures = script_data(html, "fixtures-data")
    if fixtures is None:
        return originals
    validate_fixtures(fixtures, html)
    known = {game.event_id for game in originals}
    extra = []
    for event in fixtures["events"].values():
        if event["eventId"] in known:
            continue
        extra.append(Game(
            event["eventId"], event["originalDate"], event["week"],
            event["awayTeamId"], event["homeTeamId"], None, event["originalScheduledAt"],
            season_type=event["seasonType"], venue=event["venue"], original=False,
            time_confirmed=event["originalTimeConfirmed"],
        ))
    return originals + sorted(extra, key=lambda game: (game.season_type, game.week, game.scheduled_at, game.event_id))


def fetch_json(url: str) -> dict:
    request = urllib.request.Request(
        url, headers={"Accept": "application/json", "User-Agent": "Matziq-NFL-Picks/2.0"}
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
