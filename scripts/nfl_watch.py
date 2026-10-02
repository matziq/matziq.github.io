#!/usr/bin/env python3
"""Open the published NFL page once for newly confirmed finals, without editing picks."""

from __future__ import annotations

import argparse
from contextlib import contextmanager
from datetime import datetime, timedelta
import json
import logging
from logging.handlers import RotatingFileHandler
import os
from pathlib import Path
import subprocess
import sys
import time
import urllib.request

from nfl_results import (
    LIVE_URL, PAGE_PATH, SCOPE_START, UTC, fetch_json, instant, load_games,
    next_check, script_data, stamp, validate_results,
)


LOG = logging.getLogger("matziq.nfl")
OPERATION_MARKERS = (
    "MERGE_HEAD", "rebase-merge", "rebase-apply", "CHERRY_PICK_HEAD",
    "REVERT_HEAD", "sequencer", "index.lock",
)


class SyncBlocked(RuntimeError):
    pass


def save_state(path: Path, state: dict) -> None:
    temporary = path.with_suffix(".tmp")
    with temporary.open("w", encoding="utf-8", newline="\n") as stream:
        json.dump(state, stream, indent=2, sort_keys=True)
        stream.write("\n")
        stream.flush()
        os.fsync(stream.fileno())
    temporary.replace(path)


@contextmanager
def state_lock(directory: Path):
    path = directory / "watcher.lock"
    with path.open("a+b") as stream:
        stream.seek(0)
        if not stream.read(1):
            stream.write(b"0")
            stream.flush()
        stream.seek(0)
        if os.name == "nt":
            import msvcrt
            msvcrt.locking(stream.fileno(), msvcrt.LK_NBLCK, 1)
        else:
            import fcntl
            fcntl.flock(stream.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        try:
            yield
        finally:
            stream.seek(0)
            if os.name == "nt":
                msvcrt.locking(stream.fileno(), msvcrt.LK_UNLCK, 1)
            else:
                fcntl.flock(stream.fileno(), fcntl.LOCK_UN)


def safe_sync(root: Path, git_exe: str = "git") -> str:
    environment = dict(os.environ, GIT_TERMINAL_PROMPT="0", GCM_INTERACTIVE="Never")

    def git(*arguments: str) -> bytes:
        command = [git_exe, "--no-pager", *arguments]
        process = subprocess.run(
            command, cwd=root, env=environment, capture_output=True, timeout=120,
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0,
        )
        if process.returncode:
            message = process.stderr.decode("utf-8", errors="replace").strip()
            raise SyncBlocked(f"Git {' '.join(arguments[:2])} failed: {message}")
        return process.stdout

    if not root.is_dir() or not (root / ".git").is_dir():
        raise SyncBlocked("Source sync requires the assigned primary checkout, not a worktree.")
    if Path(git("rev-parse", "--show-toplevel").decode().strip()).resolve() != root.resolve():
        raise SyncBlocked("The source path is not the repository root.")
    if git("symbolic-ref", "--short", "HEAD").strip() != b"main":
        raise SyncBlocked("The user switched branches; no automatic branch switch is allowed.")
    remote = git("remote", "get-url", "origin").decode().strip()
    if remote not in {
        "https://github.com/matziq/matziq.github.io.git",
        "https://github.com/matziq/matziq.github.io",
        "git@github.com:matziq/matziq.github.io.git",
    }:
        raise SyncBlocked("The source origin no longer matches the NFL site's repository.")
    for marker in OPERATION_MARKERS:
        path = Path(git("rev-parse", "--git-path", marker).decode().strip())
        if (root / path).exists():
            raise SyncBlocked(f"Git operation in progress: {marker}.")
    custom_hooks = b"core.hookspath=" in git("config", "--list").lower()
    hook_path = Path(git("rev-parse", "--git-path", "hooks/post-merge").decode().strip())
    if custom_hooks or (root / hook_path).exists():
        raise SyncBlocked("A custom Git hook requires a manual source synchronization.")
    if git("diff", "--no-ext-diff", "--binary") or git("diff", "--cached", "--no-ext-diff", "--binary"):
        raise SyncBlocked("User-owned tracked changes are present; left untouched. Commit or resolve them manually before source sync.")
    before = git("status", "--porcelain=v1", "--untracked-files=all", "-z")
    untracked = [item.decode("utf-8").casefold().rstrip("/") for item in git("ls-files", "--others", "--exclude-standard", "-z").split(b"\0") if item]
    git("fetch", "--no-tags", "--no-recurse-submodules", "origin", "main")
    git("merge-base", "--is-ancestor", "HEAD", "origin/main")
    changed = [item.decode("utf-8").casefold().rstrip("/") for item in git("diff", "--name-only", "-z", "HEAD", "origin/main").split(b"\0") if item]
    for incoming in changed:
        for local in untracked:
            if incoming == local or incoming.startswith(local + "/") or local.startswith(incoming + "/"):
                raise SyncBlocked(f"Incoming path overlaps a user-owned untracked path: {local}.")
    if git("symbolic-ref", "--short", "HEAD").strip() != b"main" or git("status", "--porcelain=v1", "--untracked-files=all", "-z") != before:
        raise SyncBlocked("The checkout changed during sync preparation; left untouched.")
    git(
        "-c", "core.autocrlf=false", "-c", "merge.autoStash=false", "-c", "submodule.recurse=false",
        "merge", "--ff-only", "--no-edit", "--no-autostash", "--no-overwrite-ignore", "origin/main",
    )
    head = git("rev-parse", "HEAD").decode().strip()
    if head != git("rev-parse", "origin/main").decode().strip():
        raise SyncBlocked("Local HEAD does not match the fetched origin/main.")
    if git("status", "--porcelain=v1", "--untracked-files=all", "-z") != before:
        raise SyncBlocked("Working-tree status changed during synchronization; inspect it manually.")
    LOG.info("Source synchronized to %s; preexisting untracked status preserved.", head)
    return head


def read_live_html() -> str:
    request = urllib.request.Request(
        LIVE_URL + "?watch=" + str(time.time_ns()),
        headers={"Cache-Control": "no-cache", "User-Agent": "Matziq-NFL-Watcher/1.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def run_once(
    root: Path,
    state_dir: Path,
    now: datetime,
    *,
    fetch=fetch_json,
    read_html=read_live_html,
    sync=safe_sync,
    open_url=None,
    force_poll: bool = False,
    dry_run: bool = False,
) -> dict:
    path = state_dir / "state.json"
    state = json.loads(path.read_text(encoding="utf-8")) if path.exists() else None
    games = load_games((root / PAGE_PATH).read_text(encoding="utf-8"))
    if state is not None:
        if (
            state.get("schemaVersion") != 1 or not isinstance(state.get("seenFinalIds"), list)
            or not set(state["seenFinalIds"]).issubset({game.event_id for game in games})
            or not state.get("bootstrappedAt")
        ):
            raise ValueError("Watcher state is invalid. It was not reset or re-baselined.")
        if not force_poll and (state.get("monitoringComplete") or (state.get("nextPollAt") and now < instant(state["nextPollAt"]))):
            LOG.info("No game check is due; skipped networking and source sync.")
            return state
    if now < SCOPE_START and not force_poll:
        LOG.info("The October 2026 game scope has not started.")
        return state or {}

    snapshot = fetch(LIVE_URL + "results.json?watch=" + str(time.time_ns()))
    validate_results(snapshot, games)
    issues = [event_id for event_id, result in snapshot["games"].items() if result["error"]]
    if issues:
        LOG.warning("Published ESPN source issues remain for event IDs %s; last confirmed results are retained.", issues)
    if state and instant(snapshot["publishedAt"]) < instant(state["publishedAt"]):
        raise ValueError("The live server returned an older results snapshot; notification state was preserved.")
    live_html = read_html()
    if load_games(live_html) != games or script_data(live_html, "results-data") != snapshot:
        raise ValueError("The HTML and results feed are not deployed together yet. Browser launch deferred.")

    seen = set(state["seenFinalIds"]) if state else set()
    finals = {event_id for event_id, result in snapshot["games"].items() if result["status"] == "final"}
    newly_final = finals - seen if state else set()
    updated = dict(state or {})
    updated.update(
        schemaVersion=1, bootstrappedAt=updated.get("bootstrappedAt", stamp(now)),
        lastPolledAt=stamp(now), publishedAt=snapshot["publishedAt"], lastRevision=snapshot["revision"],
        seenFinalIds=sorted(seen | finals), lastError=None, syncError=None,
    )
    checks = [next_check(result, now) for result in snapshot["games"].values()]
    active = [check for check in checks if check is not None]
    updated["monitoringComplete"] = not active
    updated["nextPollAt"] = stamp(max(now + timedelta(minutes=5), min(active))) if active else None
    needs_sync = state is None or state.get("lastRevision") != snapshot["revision"] or state.get("syncError")
    if needs_sync and not dry_run:
        try:
            updated["lastSyncedCommit"] = sync(root)
        except (SyncBlocked, OSError, subprocess.TimeoutExpired) as error:
            updated["syncError"] = str(error)
            updated["nextPollAt"] = stamp(now + timedelta(minutes=5))
            updated["monitoringComplete"] = False
            LOG.error("Source synchronization blocked (no files discarded): %s", error)

    if state is None:
        LOG.info("Bootstrap: baselined %d existing finals; opened no historical tabs.", len(finals))
    # Persist launch intent before the OS call so a process interruption cannot replay a tab.
    if newly_final:
        updated["lastOpenedEventIds"] = sorted(newly_final)
        updated["lastOpenedAt"] = stamp(now)
    save_state(path, updated)
    if newly_final:
        url = LIVE_URL + "?results=" + snapshot["revision"]
        try:
            if dry_run:
                LOG.info("DRY RUN: would open one page for new finals %s.", sorted(newly_final))
            else:
                if open_url is None:
                    os.startfile(url)
                else:
                    open_url(url)
                LOG.info("Opened the deployed page for new finals %s.", sorted(newly_final))
        except OSError as error:
            updated["seenFinalIds"] = sorted(seen)
            updated["lastError"] = f"Browser launch failed: {error}"
            updated["nextPollAt"] = stamp(now + timedelta(minutes=5))
            updated["monitoringComplete"] = False
            save_state(path, updated)
            raise
    else:
        LOG.info("No newly finished games; no browser launch. Revision %s.", snapshot["revision"])
    return updated


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, required=True)
    parser.add_argument("--state-dir", type=Path, required=True)
    parser.add_argument("--git-exe", default="git")
    parser.add_argument("--poll", action="store_true")
    parser.add_argument("--bootstrap", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--fixture", type=Path, help="Offline test directory containing index.html and results.json; requires --dry-run.")
    args = parser.parse_args()
    root, state_dir = args.repo_root.resolve(), args.state_dir.resolve()
    if state_dir == root or root in state_dir.parents:
        raise ValueError("Watcher state must be outside the publicly served repository.")
    if args.fixture and not args.dry_run:
        raise ValueError("A fixture can only be used with --dry-run; production browser launches are forbidden.")
    state_dir.mkdir(parents=True, exist_ok=True)
    handler = RotatingFileHandler(state_dir / "watcher.log", maxBytes=524288, backupCount=3, encoding="utf-8")
    handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    LOG.setLevel(logging.INFO)
    LOG.addHandler(handler)
    if sys.stderr is not None:
        LOG.addHandler(logging.StreamHandler())
    try:
        with state_lock(state_dir):
            options = {}
            if args.fixture:
                fixture = args.fixture.resolve()
                options["fetch"] = lambda _url: json.loads((fixture / "results.json").read_text(encoding="utf-8"))
                options["read_html"] = lambda: (fixture / "index.html").read_text(encoding="utf-8")
            state = run_once(
                root, state_dir, datetime.now(UTC), force_poll=args.bootstrap or bool(args.fixture),
                dry_run=args.dry_run, sync=lambda repo: safe_sync(repo, args.git_exe), **options,
            )
            return 1 if state.get("syncError") else 0
    except (OSError, ValueError, KeyError, TypeError, RuntimeError, subprocess.TimeoutExpired) as error:
        LOG.exception("Watcher failed; existing notification state is retained: %s", error)
        return 1


if __name__ == "__main__":
    sys.exit(main())
