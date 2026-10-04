"""Auditable, append-only AI assessments and guarded pregame forecast publishing.

This runner detects work, verifies identities and kickoff eligibility, and
publishes human/AI-authored analysis. It deliberately contains no winner model.
"""

from __future__ import annotations

import argparse
import base64
import copy
from datetime import datetime, timedelta
import json
import logging
from logging.handlers import RotatingFileHandler
import os
from pathlib import Path
import re
import subprocess
import sys
import time
from urllib.parse import urlsplit

from nfl_common import (
    EASTERN, FETCH_ERRORS, Game, LIVE_URL, ORIGINAL_PUBLISHED_AT, PAGE_PATH, PICKS_SHA256,
    ROOT, SCOREBOARD_URL, SUMMARY_URL, UTC, digest, fetch_json, instant, load_games,
    read_html, script_data, seal, stamp, validate_fixtures, validate_paragraph, verify_seal, write_json,
)

LOG = logging.getLogger("matziq.nfl.analysis")
PREGAME_MARGIN = timedelta(minutes=10)
FORECAST_PATH = PAGE_PATH.with_name("forecasts.json")
DEFAULT_STATE = Path(os.environ.get("LOCALAPPDATA", str(Path.home()))) / "Matziq" / "NflPicks2026" / "analysis"
PENDING_REASON = "Awaiting a verified pregame assessment"
TBD_REASON = "Awaiting official playoff matchup confirmation"


def validate_forecast_paragraph(paragraph: str) -> None:
    validate_paragraph(paragraph)
    opening = re.split(r"(?<=[.!?])\s+", paragraph, maxsplit=1)[0]
    if not re.search(r"\b(expect|should|will|could|may|favor|lean|project)\b", opening, re.IGNORECASE):
        raise ValueError("A pregame explanation must open with a forward-looking forecast, not a past outcome.")
    if re.search(r"\b(was expected|were expected|was viewed|were viewed|original pick favored)\b", paragraph, re.IGNORECASE):
        raise ValueError("Current pregame explanations cannot describe the selection in retrospective language.")


def explanation_revision_id(entry: dict) -> str:
    return "explanation-" + digest({key: value for key, value in entry.items() if key != "id"})[:24]


def validate_projected_score(value: dict, away_id: str, home_id: str, pick_id: str) -> None:
    if not isinstance(value, dict) or (value.get("awayTeamId"), value.get("homeTeamId")) != (away_id, home_id):
        raise ValueError("A projected score must identify the exact away and home team IDs.")
    away, home = value.get("awayScore"), value.get("homeScore")
    if any(isinstance(score, bool) or not isinstance(score, int) or not 0 <= score <= 99 for score in (away, home)):
        raise ValueError("Projected points must be whole numbers from 0 through 99.")
    winner = away_id if away > home else home_id if home > away else None
    if winner is None or winner != pick_id:
        raise ValueError("The selected winner must score strictly more projected points than its opponent.")
    if "pickTeamId" in value and value["pickTeamId"] != pick_id:
        raise ValueError("The score projection's selected team does not match the recorded pick.")


def score_projection_id(entry: dict) -> str:
    return "score-" + digest({key: value for key, value in entry.items() if key != "id"})[:24]


def empty_ledger(now: datetime) -> dict:
    return seal({
        "schemaVersion": 1, "season": 2026, "picksSha256": PICKS_SHA256,
        "createdAt": stamp(now), "lastAssessedAt": None, "assessments": [],
    })


def validate_ledger(ledger: dict, games: list[Game]) -> None:
    verify_seal(ledger)
    if ledger.get("schemaVersion") != 1 or ledger.get("season") != 2026 or ledger.get("picksSha256") != PICKS_SHA256:
        raise ValueError("The forecast ledger does not match the immutable 2026 predictions.")
    game_ids = {game.event_id for game in games}
    explanation_ids = {f"original-{game.event_id}" for game in games if game.original}
    ids = set()
    previous_time = instant(ledger["createdAt"])
    for assessment in ledger["assessments"]:
        if assessment["id"] in ids or instant(assessment["assessedAt"]) < previous_time:
            raise ValueError("Assessment history is duplicated or out of order.")
        ids.add(assessment["id"])
        previous_time = instant(assessment["assessedAt"])
        if assessment["status"] != "completed" or not assessment["summary"] or not assessment["sources"]:
            raise ValueError("An assessment needs an explicit completed outcome and research sources.")
        for source in assessment["sources"].values():
            url = urlsplit(source["url"])
            if url.scheme != "https" or not url.hostname or url.username or url.password:
                raise ValueError("Research sources must be public HTTPS URLs without credentials.")
            instant(source["checkedAt"])
            if not source.get("title"):
                raise ValueError("A research source needs a readable title.")
        decided = set()
        for decision in assessment["decisions"]:
            event_id = decision["eventId"]
            if event_id not in game_ids or event_id in decided:
                raise ValueError("An assessment contains an unknown or repeated fixture.")
            decided.add(event_id)
            participants = (decision["awayTeamId"], decision["homeTeamId"])
            if decision["pickTeamId"] not in participants or not all(team_id.isdigit() for team_id in participants):
                raise ValueError("A prediction must select an official, known participant.")
            if not isinstance(decision["reason"], str) or not decision["reason"].strip() or not decision["rationale"].strip():
                raise ValueError("Every prediction needs an explanation and a separate substantive rationale.")
            if assessment.get("reasonFormat") == "paragraph":
                validate_paragraph(decision["reason"])
                if assessment.get("explanationPolicy") == "forecast-until-final":
                    validate_forecast_paragraph(decision["reason"])
            explanation_ids.add(f"{assessment['id']}:{event_id}")
            if assessment.get("scorePolicy") == "pregame-only" and decision["applied"]:
                validate_projected_score(decision.get("projectedScore"), *participants, decision["pickTeamId"])
            if set(decision["factors"]) != {"performance", "availability", "news", "context"} or any(
                len(text.strip()) < 12 for text in decision["factors"].values()
            ):
                raise ValueError("Assess performance, QB/injuries, roster/news, and rest/travel/venue explicitly.")
            if len(decision["sourceIds"]) < 2 or any(source not in assessment["sources"] for source in decision["sourceIds"]):
                raise ValueError("Each decision needs at least two referenced research sources.")
            if decision["applied"]:
                proof = decision["pregameProof"]
                effective = instant(decision["effectiveAt"])
                if (
                    proof["state"] != "pre" or proof["completed"] is not False or proof.get("hasStarted")
                    or instant(proof["verifiedAt"]) > effective
                    or instant(proof["scheduledAt"]) - effective < PREGAME_MARGIN
                    or (proof["awayTeamId"], proof["homeTeamId"]) != participants
                ):
                    raise ValueError("An applied forecast lacks a valid pregame safety margin and status proof.")
    if ledger["lastAssessedAt"] != (ledger["assessments"][-1]["assessedAt"] if ledger["assessments"] else None):
        raise ValueError("The latest assessment timestamp does not match the history.")
    if ledger.get("explanationFormat") == "paragraph":
        if not isinstance(ledger.get("paragraphs"), dict):
            raise ValueError("The forecast ledger is missing its published paragraph explanations.")
        for revision_id, paragraph in ledger["paragraphs"].items():
            if revision_id not in explanation_ids:
                raise ValueError("A paragraph references an unknown pick revision.")
            validate_paragraph(paragraph)
    revision_ids = set()
    for entry in ledger.get("explanationRevisions", []):
        if entry["id"] in revision_ids or entry["id"] != explanation_revision_id(entry):
            raise ValueError("Explanation history has a duplicate or invalid immutable revision.")
        revision_ids.add(entry["id"])
        if entry["eventId"] not in game_ids or entry["pickRevisionId"] not in explanation_ids:
            raise ValueError("An explanation revision references an unknown game or pick.")
        game = next(game for game in games if game.event_id == entry["eventId"])
        if entry["pickTeamId"] not in (game.away_id, game.home_id):
            raise ValueError("An explanation revision cannot invent a selection.")
        validate_paragraph(entry["paragraph"])
        instant(entry["createdAt"])
        if not entry["sources"]:
            raise ValueError("An explanation revision needs its supporting sources.")
        for source in entry["sources"]:
            url = urlsplit(source["url"])
            if url.scheme != "https" or not url.hostname or url.username or url.password:
                raise ValueError("Explanation sources must be public HTTPS URLs.")
            instant(source["checkedAt"])
        proof = entry["proof"]
        if entry["kind"] == "pregame":
            validate_forecast_paragraph(entry["paragraph"])
            if proof["state"] != "pre" or proof["completed"] or proof["hasStarted"] or instant(entry["createdAt"]) >= instant(proof["scheduledAt"]):
                raise ValueError("A pregame explanation cannot be rewritten after kickoff.")
        elif entry["kind"] == "incorrect-final":
            if (
                proof["status"] != "final" or proof["pickResult"] != "incorrect"
                or proof["winnerTeamId"] is None or proof["winnerTeamId"] == entry["pickTeamId"]
                or entry["resultSignature"] != final_signature(proof)
            ):
                raise ValueError("Only a verified incorrect final can receive a postgame explanation.")
        else:
            raise ValueError("Unknown explanation revision kind.")
    score_ids = set()
    for entry in ledger.get("scoreProjections", []):
        if entry["id"] in score_ids or entry["id"] != score_projection_id(entry):
            raise ValueError("Score projection history contains a duplicate or changed revision.")
        score_ids.add(entry["id"])
        if entry["eventId"] not in game_ids or entry["pickRevisionId"] not in explanation_ids:
            raise ValueError("A score projection references an unknown game or pick revision.")
        game = next(game for game in games if game.event_id == entry["eventId"])
        validate_projected_score(entry, game.away_id, game.home_id, entry["pickTeamId"])
        proof = entry["pregameProof"]
        created = instant(entry["createdAt"])
        if (
            proof["state"] != "pre" or proof["completed"] or proof["hasStarted"]
            or (proof["awayTeamId"], proof["homeTeamId"]) != (game.away_id, game.home_id)
            or instant(proof["verifiedAt"]) > created
            or created - instant(proof["verifiedAt"]) > timedelta(seconds=90)
            or instant(proof["scheduledAt"]) - created < PREGAME_MARGIN
        ):
            raise ValueError("A score projection must be verified and recorded before kickoff.")


def projected_score(game: Game, ledger: dict, pick_id: str | None, *, before: datetime | None = None, publications=None) -> dict | None:
    if pick_id is None or not game.teams_known:
        return None
    latest = None
    for entry in ledger.get("scoreProjections", []):
        if entry["eventId"] != game.event_id or (entry["awayTeamId"], entry["homeTeamId"]) != (game.away_id, game.home_id):
            continue
        if before is not None:
            if instant(entry["createdAt"]) >= before:
                continue
            publication = publications.get(entry["id"]) if publications is not None else None
            if publications is not None and (publication is None or instant(publication["committedAt"]) >= before):
                continue
        latest = entry
    return latest if latest and latest["pickTeamId"] == pick_id else None


def append_score_projection(ledger: dict, game: Game, result: dict, projected: dict, proof: dict, now: datetime) -> dict:
    pick_id = result.get("scoredPickTeamId")
    if (
        pick_id is None or not result.get("pickRevisionId") or result.get("pickLockedAt") or result.get("hasStarted")
        or result["status"] not in {"scheduled", "postponed", "delayed"}
    ):
        raise ValueError("Only an existing unstarted pick may receive a projected score.")
    validate_projected_score(projected, game.away_id, game.home_id, pick_id)
    if (
        proof["state"] != "pre" or proof["completed"] or proof["hasStarted"]
        or (proof["awayTeamId"], proof["homeTeamId"]) != (game.away_id, game.home_id)
        or instant(proof["verifiedAt"]) > now
        or now - instant(proof["verifiedAt"]) > timedelta(seconds=90)
        or instant(proof["scheduledAt"]) - now < PREGAME_MARGIN
    ):
        raise ValueError("The projected score needs a fresh pregame check and ten-minute safety margin.")
    previous = projected_score(game, ledger, pick_id)
    if previous and all(previous[key] == projected[key] for key in ("awayTeamId", "homeTeamId", "awayScore", "homeScore")):
        return previous
    entry = {
        "eventId": game.event_id, "pickRevisionId": result["pickRevisionId"], "pickTeamId": pick_id,
        **{key: projected[key] for key in ("awayTeamId", "homeTeamId", "awayScore", "homeScore")},
        "createdAt": stamp(now), "pregameProof": proof,
    }
    entry["id"] = score_projection_id(entry)
    ledger.setdefault("scoreProjections", []).append(entry)
    ledger["scorePolicy"] = "pregame-only"
    return entry


def apply_score_snapshot(game: Game, result: dict, ledger: dict, publications=None) -> None:
    if result.get("projectedScoreLockedAt"):
        return
    pick_id = result.get("scoredPickTeamId")
    cutoff = instant(result["pickCutoffAt"]) if result.get("pickCutoffAt") else None
    forecast = projected_score(game, ledger, pick_id, before=cutoff, publications=publications if cutoff else None)
    result["projectedScore"] = {key: forecast[key] for key in (
        "id", "awayTeamId", "homeTeamId", "awayScore", "homeScore", "createdAt", "pickTeamId", "pickRevisionId",
    )} if forecast else None
    result["projectedScoreLockedAt"] = result.get("pickLockedAt")
    result["projectedScoreStatus"] = (
        "unpicked" if pick_id is None else "available" if forecast else
        "not-predicted-before-kickoff" if cutoff else "pending"
    )


def selection_paragraph(game: Game, ledger: dict, selected: dict, *, before: datetime | None = None) -> str:
    if selected["teamId"] is None:
        return ""
    paragraph = ledger.get("paragraphs", {}).get(selected["revisionId"], selected["reason"])
    for entry in ledger.get("explanationRevisions", []):
        if (
            entry["kind"] == "pregame" and entry["eventId"] == game.event_id
            and entry["pickRevisionId"] == selected["revisionId"] and entry["pickTeamId"] == selected["teamId"]
            and (before is None or instant(entry["createdAt"]) < before)
        ):
            paragraph = entry["paragraph"]
    validate_paragraph(paragraph)
    return paragraph


def add_paragraphs(ledger: dict, paragraphs: dict, games: list[Game], now: datetime) -> dict:
    validate_ledger(ledger, games)
    updated = copy.deepcopy(ledger)
    prior = updated.setdefault("paragraphs", {})
    for revision_id, paragraph in paragraphs.items():
        validate_paragraph(paragraph)
        if revision_id in prior and prior[revision_id] != paragraph:
            raise ValueError("Published explanation history cannot be overwritten.")
        prior[revision_id] = paragraph
    updated.update(explanationFormat="paragraph", paragraphsUpdatedAt=stamp(now))
    seal(updated)
    validate_ledger(updated, games)
    for game in games:
        selection_paragraph(game, updated, selection(game, updated))
    return updated


def append_explanation_revision(ledger: dict, game: Game, result: dict, paragraph: str, sources: list[dict], now: datetime, kind: str, proof=None) -> dict:
    validate_paragraph(paragraph)
    pick_id = result.get("scoredPickTeamId")
    if pick_id is None or not result.get("pickRevisionId"):
        raise ValueError("A game without a pick cannot have a pick explanation.")
    if kind == "pregame":
        validate_forecast_paragraph(paragraph)
        if (
            result.get("pickLockedAt") or result.get("hasStarted")
            or result["status"] not in {"scheduled", "postponed", "delayed"}
            or instant(result["scheduledAt"]) <= now or not proof
        ):
            raise ValueError("Only a verified unstarted pick may receive a pregame wording revision.")
    elif kind == "incorrect-final":
        if result["status"] != "final" or result["pickResult"] != "incorrect" or result.get("error"):
            raise ValueError("Do not rewrite a correct, tied, unfinished, or unverified pick explanation.")
        proof = {key: result[key] for key in (
            "eventId", "awayTeamId", "homeTeamId", "awayScore", "homeScore", "winnerTeamId",
            "scheduledAt", "statusDetail", "resultUpdatedAt", "status", "pickResult",
        )}
    else:
        raise ValueError("Unknown explanation revision kind.")
    entry = {
        "eventId": game.event_id, "pickRevisionId": result["pickRevisionId"], "pickTeamId": pick_id,
        "kind": kind, "paragraph": paragraph, "createdAt": stamp(now), "sources": sources, "proof": proof,
    }
    if kind == "incorrect-final":
        entry["resultSignature"] = final_signature(result)
    entry["id"] = explanation_revision_id(entry)
    existing = ledger.setdefault("explanationRevisions", [])
    if any(item["id"] == entry["id"] for item in existing):
        return entry
    if kind == "incorrect-final" and any(
        item["kind"] == kind and item.get("resultSignature") == entry["resultSignature"]
        and item["pickRevisionId"] == entry["pickRevisionId"] for item in existing
    ):
        raise ValueError("This incorrect final already has a recorded review; do not duplicate or overwrite it.")
    existing.append(entry)
    ledger["explanationPolicy"] = "forecast-until-final"
    return entry


def postgame_review(ledger: dict, result: dict) -> dict | None:
    if result["status"] != "final" or result["pickResult"] != "incorrect":
        return None
    signature = final_signature(result)
    return next((
        entry for entry in reversed(ledger.get("explanationRevisions", []))
        if entry["kind"] == "incorrect-final" and entry["eventId"] == result["eventId"]
        and entry["pickRevisionId"] == result.get("pickRevisionId") and entry["resultSignature"] == signature
    ), None)


def selection(game: Game, ledger: dict | None, *, before: datetime | None = None, publications: dict | None = None) -> dict:
    selected = {
        "teamId": game.pick_id, "reason": game.reason or (PENDING_REASON if game.teams_known else TBD_REASON),
        "revisionId": f"original-{game.event_id}" if game.original else None,
        "effectiveAt": ORIGINAL_PUBLISHED_AT if game.original else None,
        "assessmentId": None,
    }
    if ledger is None:
        return selected
    for assessment in ledger["assessments"]:
        publication = publications.get(assessment["id"]) if publications is not None else None
        for decision in assessment["decisions"]:
            if (
                decision["eventId"] != game.event_id or not decision["applied"]
                or (decision["awayTeamId"], decision["homeTeamId"]) != (game.away_id, game.home_id)
            ):
                continue
            if before is not None:
                if instant(decision["effectiveAt"]) >= before:
                    continue
                if publications is not None and (publication is None or instant(publication["committedAt"]) >= before):
                    continue
            old_reason = selection_paragraph(game, ledger, selected, before=instant(assessment["assessedAt"])) if assessment.get("reasonFormat") == "paragraph" and ledger.get("explanationFormat") == "paragraph" else selected["reason"]
            if (selected["teamId"], old_reason) == (decision["pickTeamId"], decision["reason"]):
                continue
            selected = {
                "teamId": decision["pickTeamId"], "reason": decision["reason"],
                "revisionId": f"{assessment['id']}:{game.event_id}", "effectiveAt": decision["effectiveAt"],
                "assessmentId": assessment["id"],
            }
    return selected


def apply_pick_snapshots(games: list[Game], results: dict, ledger: dict | None, now: datetime, publications=None) -> None:
    for game in games:
        result = results[game.event_id]
        was_locked = bool(result.get("pickLockedAt"))
        previous_explanation = result.get("pickExplanation")
        if not result.get("pickLockedAt"):
            kickoff = instant(result["scheduledAt"])
            started = game.teams_known and (result.get("hasStarted") or result["status"] in {"in_progress", "final"})
            clock_lock = game.teams_known and now >= kickoff and result["status"] not in {"postponed", "delayed", "canceled"}
            cutoff = min(now, kickoff) if started or clock_lock else None
            choice = selection(game, ledger, before=cutoff, publications=publications if cutoff else None)
            result.update(
                scoredPickTeamId=choice["teamId"], pickReason=choice["reason"],
                pickRevisionId=choice["revisionId"], pickEffectiveAt=choice["effectiveAt"],
                pickAssessmentId=choice["assessmentId"], pickLockedAt=stamp(now) if cutoff else None,
                pickCutoffAt=stamp(cutoff) if cutoff else None,
            )
        if result["status"] == "final":
            pick_id = result.get("scoredPickTeamId", game.pick_id)
            winner = result["winnerTeamId"]
            result["pickResult"] = "no_pick" if pick_id is None else "tie" if winner is None else "correct" if winner == pick_id else "incorrect"
        if ledger and ledger.get("scorePolicy") == "pregame-only":
            apply_score_snapshot(game, result, ledger, publications)
        if ledger and ledger.get("explanationFormat") == "paragraph":
            selected = {
                "teamId": result.get("scoredPickTeamId", game.pick_id),
                "revisionId": result.get("pickRevisionId"), "reason": result.get("pickReason", game.reason),
            }
            if ledger.get("explanationPolicy") != "forecast-until-final":
                result["pickExplanation"] = selection_paragraph(game, ledger, selected)
                continue
            if selected["teamId"] is None:
                result.update(pickExplanation="", pregameExplanation="", explanationPhase="none", explanationRevisionId=None, explanationUpdatedAt=None)
                continue
            if not was_locked:
                cutoff = instant(result["pickCutoffAt"]) if result.get("pickCutoffAt") else None
                result["pregameExplanation"] = selection_paragraph(game, ledger, selected, before=cutoff)
            elif "pregameExplanation" not in result:
                result["pregameExplanation"] = previous_explanation or selection_paragraph(game, ledger, selected)
            result["pickExplanation"] = result["pregameExplanation"]
            result.update(explanationPhase="pregame", explanationRevisionId=None, explanationUpdatedAt=None)
            if result["status"] == "final" and result["pickResult"] == "incorrect":
                review = postgame_review(ledger, result)
                if review:
                    result.update(pickExplanation=review["paragraph"], explanationPhase="incorrect-final",
                                  explanationRevisionId=review["id"], explanationUpdatedAt=review["createdAt"])
                else:
                    result["explanationPhase"] = "awaiting-review"


def final_signature(result: dict) -> str:
    if result["status"] != "final":
        raise ValueError("Only verified finals can trigger a result reassessment.")
    return digest({key: result[key] for key in (
        "eventId", "awayTeamId", "homeTeamId", "awayScore", "homeScore",
        "winnerTeamId", "scheduledAt", "statusDetail", "resultUpdatedAt",
    )})


def processed_signatures(ledger: dict) -> dict:
    processed = {}
    for assessment in ledger["assessments"]:
        processed.update(assessment["triggerResults"])
    return processed


def batch_for(games: list[Game], results: dict, ledger: dict, now: datetime) -> dict | None:
    processed = processed_signatures(ledger)
    finals = {
        event_id: final_signature(result)
        for event_id, result in results["games"].items()
        if result["status"] == "final" and not result["error"]
        and processed.get(event_id) != final_signature(result)
    }
    unpicked = [
        game.event_id for game in games if game.teams_known
        and selection(game, ledger)["teamId"] is None
        and results["games"][game.event_id]["status"] in {"scheduled", "postponed", "delayed"}
        and instant(results["games"][game.event_id]["scheduledAt"]) > now + PREGAME_MARGIN
    ]
    pending_reviews = {
        event_id: final_signature(result) for event_id, result in results["games"].items()
        if ledger.get("explanationPolicy") == "forecast-until-final" and result["status"] == "final"
        and result["pickResult"] == "incorrect" and not result.get("error") and not postgame_review(ledger, result)
    }
    if not finals and not unpicked and not pending_reviews:
        return None
    identity = {"triggerResults": finals, "newOfficialFixtures": sorted(unpicked)}
    if pending_reviews:
        identity["incorrectFinalReviews"] = pending_reviews
    return {
        "id": "assessment-" + digest(identity)[:24], **identity,
        "detectedAt": stamp(now), "resultsRevision": results["revision"],
        "baseForecastRevision": ledger["revision"],
    }


def verify_current_games(games: list[Game], results: dict, fetch, now: datetime) -> dict:
    from nfl_results import observation, summary_event
    boards = {}
    verified = {}
    for game in games:
        result = results["games"].get(game.event_id)
        kickoff = result["scheduledAt"] if result else game.scheduled_at
        day = instant(kickoff).astimezone(EASTERN).strftime("%Y%m%d")
        url = f"{SCOREBOARD_URL}?dates={day}"
        if day not in boards:
            board = fetch(url)
            if not isinstance(board.get("events"), list):
                raise ValueError(f"Missing authoritative scoreboard for {day}.")
            boards[day] = board
        matches = [event for event in boards[day]["events"] if str(event.get("id")) == game.event_id]
        if len(matches) > 1:
            raise ValueError("Duplicate event IDs during the prepublication check.")
        if matches:
            event = matches[0]
        else:
            url = f"{SUMMARY_URL}?event={game.event_id}"
            event = summary_event(fetch(url))
        observed = observation(event, game, now)
        status = event["competitions"][0].get("status") or event.get("status", {})
        observed["proof"] = {
            "verifiedAt": stamp(now), "sourceUrl": url,
            "state": status["type"]["state"], "completed": status["type"]["completed"],
            "hasStarted": observed["hasStarted"],
            "scheduledAt": observed["scheduledAt"], "awayTeamId": game.away_id,
            "homeTeamId": game.home_id, "season": 2026, "seasonType": game.season_type, "week": game.week,
        }
        verified[game.event_id] = observed
    return verified


def prepare_assessment(games: list[Game], results: dict, ledger: dict, batch: dict, candidate: dict, verified: dict, now: datetime) -> dict:
    validate_ledger(ledger, games)
    if candidate["batchId"] != batch["id"] or batch["baseForecastRevision"] != ledger["revision"]:
        raise ValueError("The candidate is based on a stale assessment batch or forecast ledger.")
    if now - instant(candidate["evidenceCollectedAt"]) > timedelta(hours=3):
        raise ValueError("Research is more than three hours old; refresh the evidence before publishing.")
    required_finals = {**batch["triggerResults"], **batch.get("incorrectFinalReviews", {})}
    for event_id, signature in required_finals.items():
        if final_signature(results["games"][event_id]) != signature:
            raise ValueError("A triggering result was corrected; research the new final revision instead.")
        if instant(candidate["evidenceCollectedAt"]) < instant(results["games"][event_id]["resultUpdatedAt"]):
            raise ValueError("Research predates a triggering final; collect current evidence.")
    if batch_for(games, results, ledger, now) is None:
        raise ValueError("This result batch has already been assessed.")
    by_id = {game.event_id: game for game in games}
    supplied = {decision["eventId"]: decision for decision in candidate["decisions"]}
    if len(supplied) != len(candidate["decisions"]):
        raise ValueError("Repeated game in the candidate analysis.")
    eligible = {
        game.event_id for game in games if game.teams_known
        and not results["games"][game.event_id].get("pickLockedAt")
        and verified[game.event_id]["proof"]["state"] == "pre"
        and not verified[game.event_id]["proof"]["completed"]
        and not verified[game.event_id]["proof"]["hasStarted"]
        and instant(verified[game.event_id]["scheduledAt"]) > now + PREGAME_MARGIN
    }
    if eligible - set(supplied):
        raise ValueError(f"The assessment omitted {len(eligible - set(supplied))} eligible remaining games.")
    decisions = []
    initial, changed, retained, skipped = 0, 0, 0, 0
    score_enabled = ledger.get("scorePolicy") == "pregame-only"
    for event_id, candidate_decision in supplied.items():
        if event_id not in by_id:
            raise ValueError("Candidate contains an event outside the verified season fixtures.")
        game = by_id[event_id]
        if not game.teams_known:
            raise ValueError("Do not predict unofficial playoff participants.")
        decision = copy.deepcopy(candidate_decision)
        validate_forecast_paragraph(decision["reason"])
        old = selection(game, ledger)
        old_reason = selection_paragraph(game, ledger, old) if ledger.get("explanationFormat") == "paragraph" else old["reason"]
        applied = event_id in eligible
        action = "skipped_locked" if not applied else "initial" if old["teamId"] is None else (
            "change" if (old["teamId"], old_reason) != (decision["pickTeamId"], decision["reason"]) else "retain"
        )
        initial += action == "initial"
        changed += applied and old["teamId"] is not None and old["teamId"] != decision["pickTeamId"]
        retained += action == "retain"
        skipped += not applied
        decision.update(
            awayTeamId=game.away_id, homeTeamId=game.home_id, applied=applied, action=action,
            previousPickTeamId=old["teamId"], effectiveAt=stamp(now),
            pregameProof=verified[event_id]["proof"],
        )
        if score_enabled and applied:
            proposed = decision.get("projectedScore")
            prior_score = projected_score(game, ledger, old["teamId"])
            if proposed is None:
                if decision["pickTeamId"] != old["teamId"] or prior_score is None:
                    raise ValueError("New or changed winner picks require explicit away/home score projections.")
                proposed = {key: prior_score[key] for key in ("awayTeamId", "homeTeamId", "awayScore", "homeScore")}
            validate_projected_score(proposed, game.away_id, game.home_id, decision["pickTeamId"])
            decision["projectedScore"] = proposed
        decisions.append(decision)
    assessment = {
        "id": batch["id"], "status": "completed", "assessedAt": stamp(now), "reasonFormat": "paragraph",
        "explanationPolicy": "forecast-until-final",
        "evidenceCollectedAt": candidate["evidenceCollectedAt"],
        "triggerResults": batch["triggerResults"], "newOfficialFixtures": batch["newOfficialFixtures"],
        "summary": candidate["summary"], "limitations": candidate["limitations"],
        "sources": candidate["sources"], "teamAssessments": candidate["teamAssessments"],
        "decisions": decisions, "initialPickCount": initial, "changedPickCount": changed,
        "retainedCount": retained, "skippedLockedCount": skipped,
    }
    prepared = copy.deepcopy(ledger)
    reviews = candidate.get("postgameReviews", [])
    supplied_reviews = {review["eventId"]: review for review in reviews}
    if len(supplied_reviews) != len(reviews):
        raise ValueError("Duplicate postgame review in the candidate.")
    required_reviews = {
        event_id for event_id in required_finals
        if results["games"][event_id]["status"] == "final"
        and results["games"][event_id]["pickResult"] == "incorrect"
        and not postgame_review(ledger, results["games"][event_id])
    }
    if ledger.get("explanationPolicy") == "forecast-until-final" and set(supplied_reviews) != required_reviews:
        raise ValueError("Provide one sourced mistaken-pick explanation for each unreviewed incorrect final, and none for correct picks or ties.")
    for event_id, review in supplied_reviews.items():
        if event_id not in required_reviews:
            raise ValueError("A postgame explanation can only review a triggering incorrect final.")
        actual = verified[event_id]
        result = results["games"][event_id]
        if actual["status"] != "final" or any(actual[key] != result[key] for key in ("awayScore", "homeScore", "winnerTeamId")):
            raise ValueError("The postgame explanation is based on a stale or unconfirmed final.")
        for source in review["sources"]:
            if instant(source["checkedAt"]) < instant(result["resultUpdatedAt"]):
                raise ValueError("Postgame research must be verified after the final result.")
        append_explanation_revision(prepared, by_id[event_id], result, review["paragraph"], review["sources"], now, "incorrect-final")
    assessment["postgameReviewIds"] = [
        entry["id"] for entry in prepared.get("explanationRevisions", [])
        if entry["kind"] == "incorrect-final" and entry["eventId"] in supplied_reviews
    ]
    prepared["assessments"].append(assessment)
    if score_enabled:
        assessment["scorePolicy"] = "pregame-only"
        score_changes = 0
        for decision in decisions:
            if not decision["applied"]:
                continue
            game = by_id[decision["eventId"]]
            selected = selection(game, prepared)
            prior_score = projected_score(game, ledger, selected["teamId"])
            score = append_score_projection(
                prepared, game, {
                    **results["games"][game.event_id],
                    "scoredPickTeamId": selected["teamId"], "pickRevisionId": selected["revisionId"],
                }, decision["projectedScore"], decision["pregameProof"], now,
            )
            decision["scoreProjectionId"] = score["id"]
            score_changes += prior_score is None or score["id"] != prior_score["id"]
        assessment["changedScoreCount"] = score_changes
    prepared["lastAssessedAt"] = assessment["assessedAt"]
    seal(prepared)
    validate_ledger(prepared, games)
    return prepared


def publication_history(root: Path, ledger: dict) -> dict:
    if not ledger["assessments"] and not ledger.get("scoreProjections"):
        return {}
    path = FORECAST_PATH.as_posix()
    process = subprocess.run(
        ["git", "log", "--reverse", "--format=%H %cI", "--", path],
        cwd=root, check=True, capture_output=True, text=True,
    )
    history = {}
    for line in process.stdout.splitlines():
        commit, committed_at = line.split(" ", 1)
        raw = subprocess.check_output(["git", "show", f"{commit}:{path}"], cwd=root)
        prior = json.loads(raw)
        for assessment in prior["assessments"]:
            history.setdefault(assessment["id"], {"commit": commit, "committedAt": stamp(instant(committed_at))})
        for projection in prior.get("scoreProjections", []):
            history.setdefault(projection["id"], {"commit": commit, "committedAt": stamp(instant(committed_at))})
    return history


def load_context(root: Path):
    from nfl_results import validate_results
    page = root / PAGE_PATH
    html = read_html(page)
    fixtures = json.loads(page.with_name("fixtures.json").read_text(encoding="utf-8"))
    ledger = json.loads(page.with_name("forecasts.json").read_text(encoding="utf-8"))
    results = json.loads(page.with_name("results.json").read_text(encoding="utf-8"))
    games = load_games(html, fixtures)
    validate_ledger(ledger, games)
    validate_results(results, games)
    return html, fixtures, ledger, results, games


def fetch_live_context(root: Path):
    from nfl_results import validate_results
    html, fixtures, ledger, _local_results, _games = load_context(root)
    results = fetch_json(LIVE_URL + "results.json?analysis=" + str(time.time_ns()))
    if results.get("fixtureRevision") != fixtures["revision"]:
        fixtures = fetch_json(LIVE_URL + "fixtures.json?analysis=" + str(time.time_ns()))
    if results.get("forecastRevision") != ledger["revision"]:
        ledger = fetch_json(LIVE_URL + "forecasts.json?analysis=" + str(time.time_ns()))
    if results.get("fixtureRevision") != fixtures["revision"] or results.get("forecastRevision") != ledger["revision"]:
        raise ValueError("The live snapshot is between deployments; leave this assessment retryable.")
    games = load_games(html, fixtures)
    validate_ledger(ledger, games)
    validate_results(results, games)
    return html, fixtures, ledger, results, games


def scan(root: Path, directory: Path, now: datetime, local=False) -> dict:
    context = load_context(root) if local else fetch_live_context(root)
    _html, fixtures, ledger, results, games = context
    state_path = directory / "state.json"
    state = json.loads(state_path.read_text()) if state_path.exists() else {"schemaVersion": 1, "completedAssessmentIds": [], "processedResults": {}}
    if state.get("schemaVersion") != 1:
        raise ValueError("Unknown private watermark schema; it was not reset.")
    if ledger["assessments"] and ledger["assessments"][-1]["id"] not in state["completedAssessmentIds"]:
        report = {"status": "publication_pending", "assessmentId": ledger["assessments"][-1]["id"], "action": "Run finalize; do not repeat research."}
    else:
        batch = batch_for(games, results, ledger, now)
        if batch:
            path = directory / f"{batch['id']}-batch.json"
            write_json(path, batch)
            report = {"status": "research_required", "batch": batch, "batchPath": str(path)}
        else:
            report = {"status": "no_new_results", "monitoringComplete": results["monitoringComplete"], "lastAssessedAt": ledger["lastAssessedAt"]}
    state.update(lastCheckedAt=stamp(now), lastError=None, lastScan=report)
    write_json(state_path, state)
    LOG.info("Assessment scan: %s", report["status"])
    return report


def verify_worktree_snapshots(root: Path, html: str, fixtures: dict, ledger: dict, results: dict) -> None:
    if script_data(html, "games-data") is None:
        raise ValueError("Missing immutable original predictions.")
    for identifier, expected in (("fixtures-data", fixtures), ("forecasts-data", ledger), ("results-data", results)):
        if script_data(html, identifier) != expected:
            raise ValueError("Source snapshots are not synchronized; run the results updater before assessment publication.")


def preflight(root: Path, batch: dict, candidate: dict):
    html, fixtures, ledger, results, games = load_context(root)
    verify_worktree_snapshots(root, html, fixtures, ledger, results)
    now = datetime.now(UTC)
    verified = verify_current_games(games, results, fetch_json, now)
    # A stale published score must not trigger analysis of a different final.
    for event_id in {**batch["triggerResults"], **batch.get("incorrectFinalReviews", {})}:
        result = results["games"][event_id]
        observation = verified[event_id]
        if observation["status"] != "final" or any(observation[key] != result[key] for key in ("awayScore", "homeScore", "winnerTeamId")):
            raise ValueError("A triggering final changed during analysis; refresh results and re-assess the retryable batch.")
    finished = datetime.now(UTC)
    if finished - now > timedelta(seconds=90):
        raise ValueError("Pregame verification took too long; retry before publishing.")
    prepared = prepare_assessment(games, results, ledger, batch, candidate, verified, finished)
    return prepared, ledger, fixtures, games, finished


def gh_json(arguments, *, payload=None):
    command = ["gh", "api", *arguments]
    if payload is not None:
        command += ["--input", "-"]
    process = subprocess.run(
        command, input=json.dumps(payload) if payload is not None else None,
        capture_output=True, text=True, timeout=60,
    )
    if process.returncode:
        raise RuntimeError(f"GitHub request failed: {process.stderr.strip()}")
    return json.loads(process.stdout)


def publish(root: Path, directory: Path, batch: dict, candidate: dict) -> dict:
    from nfl_watch import safe_sync
    safe_sync(root)
    remote_path = "repos/matziq/matziq.github.io/contents/" + FORECAST_PATH.as_posix()
    remote = gh_json([remote_path + "?ref=main"])
    content = remote
    if remote.get("encoding") == "none":
        # Contents omits inline data above 1 MB; pin the read to its immutable blob.
        content = gh_json(["repos/matziq/matziq.github.io/git/blobs/" + remote["sha"]])
        if content.get("sha") != remote["sha"] or content.get("encoding") != "base64":
            raise ValueError("GitHub returned an unexpected forecast blob; no forecast was committed.")
    remote_ledger = json.loads(base64.b64decode(content["content"]))
    if any(assessment["id"] == batch["id"] for assessment in remote_ledger["assessments"]):
        LOG.info("The assessment already exists on main; retrying publication verification without re-analysis.")
        safe_sync(root)
        return {"status": "already_committed", "assessmentId": batch["id"]}
    prepared, previous, _fixtures, _games, checked_at = preflight(root, batch, candidate)
    if remote_ledger["revision"] != previous["revision"]:
        raise ValueError("A concurrent forecast edit changed the base; do not overwrite it.")
    encoded = base64.b64encode((json.dumps(prepared, ensure_ascii=True, indent=2, sort_keys=True) + "\n").encode()).decode()
    if datetime.now(UTC) - checked_at > timedelta(seconds=30):
        raise ValueError("The prepublication check expired; no forecast was committed.")
    response = gh_json(
        ["--method", "PUT", remote_path],
        payload={
            "branch": "main", "sha": remote["sha"], "content": encoded,
            "message": f"Reassess NFL forecasts after verified results\n\nAssessment-ID: {batch['id']}\n\nCo-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>",
        },
    )
    receipt = {"status": "committed_pending_deployment", "assessmentId": batch["id"], "commit": response["commit"]["sha"], "forecastRevision": prepared["revision"]}
    write_json(directory / f"{batch['id']}-publication.json", receipt)
    safe_sync(root)
    subprocess.run(["gh", "workflow", "run", "nfl-picks.yml", "--ref", "main"], cwd=root, check=True, timeout=60)
    LOG.info("Forecast-only compare-and-swap commit %s; completion awaits verified deployment.", receipt["commit"])
    return receipt


def finalize(root: Path, directory: Path) -> dict:
    from nfl_watch import read_live_html, safe_sync
    safe_sync(root)
    html, _fixtures, ledger, results, games = fetch_live_context(root)
    live_html = read_live_html()
    if script_data(live_html, "results-data") != results or script_data(live_html, "forecasts-data") != ledger:
        raise ValueError("The assessed forecasts are not yet in the live HTML; watermark remains retryable.")
    if not ledger["assessments"]:
        raise ValueError("No completed assessment is available to acknowledge.")
    validate_ledger(ledger, games)
    state_path = directory / "state.json"
    state = json.loads(state_path.read_text()) if state_path.exists() else {"schemaVersion": 1}
    state.update(
        completedAssessmentIds=[assessment["id"] for assessment in ledger["assessments"]],
        processedResults=processed_signatures(ledger), lastError=None,
        lastVerifiedPublicationAt=stamp(datetime.now(UTC)), forecastRevision=ledger["revision"],
        lastAssessmentId=ledger["assessments"][-1]["id"],
    )
    write_json(state_path, state)
    LOG.info("Verified live assessment %s; completion watermark saved.", state["lastAssessmentId"])
    return {"status": "completed", "assessmentId": state["lastAssessmentId"], "forecastRevision": ledger["revision"]}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("init", "scan", "prepare", "publish", "finalize"))
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--state-dir", type=Path, default=DEFAULT_STATE)
    parser.add_argument("--local", action="store_true", help="Setup-only scan of the local verified snapshot, before initial publication.")
    parser.add_argument("--batch", type=Path)
    parser.add_argument("--candidate", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    root, directory = args.root.resolve(), args.state_dir.resolve()
    if directory == root or root in directory.parents:
        raise ValueError("Assessment watermarks and drafts must stay outside the public source tree.")
    directory.mkdir(parents=True, exist_ok=True)
    handler = RotatingFileHandler(directory / "analysis.log", maxBytes=1048576, backupCount=3, encoding="utf-8")
    handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    LOG.addHandler(handler)
    LOG.setLevel(logging.INFO)
    from nfl_watch import state_lock
    try:
        with state_lock(directory):
            if args.command == "init":
                path = root / FORECAST_PATH
                if path.exists():
                    raise ValueError("The append-only forecast ledger already exists.")
                write_json(path, empty_ledger(datetime.now(UTC)))
                result = {"status": "initialized", "path": str(path)}
            elif args.command == "scan":
                result = scan(root, directory, datetime.now(UTC), args.local)
            elif args.command == "finalize":
                result = finalize(root, directory)
            else:
                if not args.batch or not args.candidate:
                    raise ValueError("A verified batch and AI-authored candidate file are required.")
                batch = json.loads(args.batch.read_text(encoding="utf-8"))
                candidate = json.loads(args.candidate.read_text(encoding="utf-8"))
                if args.command == "publish":
                    result = publish(root, directory, batch, candidate)
                else:
                    if not args.output or root in args.output.resolve().parents:
                        raise ValueError("Prepared assessments must be written to a private output path.")
                    prepared, _previous, _fixtures, _games, _now = preflight(root, batch, candidate)
                    write_json(args.output, prepared)
                    result = {"status": "prepared_not_published", "path": str(args.output), "revision": prepared["revision"]}
            print(json.dumps(result, indent=2))
    except (OSError, ValueError, KeyError, TypeError, RuntimeError, subprocess.SubprocessError) as error:
        LOG.exception("Assessment failed; unacknowledged results remain retryable: %s", error)
        path = directory / "state.json"
        state = json.loads(path.read_text()) if path.exists() else {"schemaVersion": 1, "completedAssessmentIds": [], "processedResults": {}}
        state.update(lastError=str(error), lastFailureAt=stamp(datetime.now(UTC)))
        write_json(path, state)
        print(f"Assessment failed; retryable: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
