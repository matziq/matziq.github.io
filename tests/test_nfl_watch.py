import copy
from datetime import timedelta
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

from test_nfl_results import GAMES, HTML, NOW, snapshot
import nfl_results as nfl
import nfl_watch as watch


class WatcherTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.base = Path(self.directory.name)
        self.root = self.base / "repo"
        self.state_dir = self.base / "private"
        self.state_dir.mkdir()
        page = self.root / nfl.PAGE_PATH
        page.parent.mkdir(parents=True)
        page.write_text(HTML, encoding="utf-8")
        self.opened = []
        self.synced = []
        self.now = NOW

    def run_snapshot(self, payload, **options):
        page = self.base / "live.html"
        nfl.write_results(page, HTML, payload)
        def sync(root):
            self.synced.append(root)
            return "fixture-commit"
        return watch.run_once(
            self.root, self.state_dir, self.now,
            fetch=lambda _url: payload, read_html=lambda: page.read_text(encoding="utf-8"),
            open_url=self.opened.append, force_poll=True, sync=options.pop("sync", sync), **options,
        )

    def test_bootstrap_does_not_open_existing_finals(self):
        state = self.run_snapshot(snapshot(GAMES[0].event_id))
        self.assertEqual(state["seenFinalIds"], [GAMES[0].event_id])
        self.assertFalse(self.opened)
        self.assertEqual(len(self.synced), 1)

    def test_new_finals_share_one_launch_and_duplicate_polls_do_not_reopen(self):
        self.run_snapshot(snapshot(GAMES[0].event_id))
        self.now = NOW + timedelta(days=3)
        payload = snapshot(*(game.event_id for game in GAMES[:3]), now=self.now)
        state = self.run_snapshot(payload)
        self.assertEqual(len(self.opened), 1)
        self.assertEqual(state["lastOpenedEventIds"], sorted(game.event_id for game in GAMES[1:3]))
        self.assertIn(payload["revision"], self.opened[0])
        self.run_snapshot(payload)
        self.assertEqual(len(self.opened), 1)

    def test_corrected_scores_do_not_relaunch(self):
        payload = snapshot(GAMES[0].event_id)
        self.run_snapshot(payload)
        corrected = copy.deepcopy(payload)
        result = corrected["games"][GAMES[0].event_id]
        result.update(awayScore=30, winnerTeamId="23", pickResult="correct")
        corrected["revision"] = nfl.digest({key: value for key, value in corrected.items() if key != "revision"})
        self.run_snapshot(corrected)
        self.assertFalse(self.opened)
        self.assertEqual(len(self.synced), 2)

    def test_mixed_deployment_does_not_consume_notifications(self):
        old = snapshot(GAMES[0].event_id)
        self.run_snapshot(old)
        state_before = (self.state_dir / "state.json").read_bytes()
        new = snapshot(*(game.event_id for game in GAMES[:2]), now=NOW + timedelta(days=3))
        with self.assertRaisesRegex(ValueError, "not deployed together"):
            watch.run_once(
                self.root, self.state_dir, NOW + timedelta(days=3),
                fetch=lambda _url: new, read_html=lambda: HTML, force_poll=True,
                open_url=self.opened.append,
            )
        self.assertEqual((self.state_dir / "state.json").read_bytes(), state_before)
        self.assertFalse(self.opened)

    def test_api_failure_and_corrupt_state_never_rebaseline(self):
        self.run_snapshot(snapshot(GAMES[0].event_id))
        state_before = (self.state_dir / "state.json").read_bytes()
        def failure(_url):
            raise OSError("offline fixture")
        with self.assertRaises(OSError):
            watch.run_once(self.root, self.state_dir, NOW, fetch=failure, force_poll=True)
        self.assertEqual((self.state_dir / "state.json").read_bytes(), state_before)
        (self.state_dir / "state.json").write_text('{"schemaVersion":1}', encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "not reset"):
            self.run_snapshot(snapshot())
        self.assertFalse(self.opened)

    def test_sync_blocker_preserves_user_work_but_live_notification_still_works(self):
        self.run_snapshot(snapshot(GAMES[0].event_id))
        self.now = NOW + timedelta(days=3)
        def blocked(_root):
            raise watch.SyncBlocked("User-owned tracked changes")
        state = self.run_snapshot(snapshot(*(game.event_id for game in GAMES[:2]), now=self.now), sync=blocked)
        self.assertIn("tracked changes", state["syncError"])
        self.assertEqual(len(self.opened), 1)
        self.assertFalse(state["monitoringComplete"])

    def test_launch_failure_is_logged_and_retried_without_historical_replay(self):
        self.run_snapshot(snapshot(GAMES[0].event_id))
        self.now = NOW + timedelta(days=3)
        new = snapshot(*(game.event_id for game in GAMES[:2]), now=self.now)
        page = self.base / "live.html"
        nfl.write_results(page, HTML, new)
        def failure(_url):
            raise OSError("No browser registered")
        with self.assertRaises(OSError):
            watch.run_once(
                self.root, self.state_dir, self.now, fetch=lambda _url: new,
                read_html=lambda: page.read_text(encoding="utf-8"),
                sync=lambda _root: "fixture", open_url=failure, force_poll=True,
            )
        state = json.loads((self.state_dir / "state.json").read_text())
        self.assertEqual(state["seenFinalIds"], [GAMES[0].event_id])
        self.assertIn("Browser launch failed", state["lastError"])
        self.run_snapshot(new)
        self.assertEqual(len(self.opened), 1)

    def test_private_dry_run_never_opens_browser_or_syncs(self):
        self.run_snapshot(snapshot(GAMES[0].event_id), dry_run=True)
        self.now = NOW + timedelta(days=3)
        state = self.run_snapshot(snapshot(*(game.event_id for game in GAMES[:2]), now=self.now), dry_run=True)
        self.assertFalse(self.opened)
        self.assertFalse(self.synced)
        self.assertEqual(state["lastOpenedEventIds"], [GAMES[1].event_id])

    def test_skip_outside_due_windows_makes_no_network_calls(self):
        self.run_snapshot(snapshot(GAMES[0].event_id))
        def forbidden(_url):
            self.fail("A network call was made outside a due window.")
        state = watch.run_once(self.root, self.state_dir, NOW + timedelta(minutes=5), fetch=forbidden)
        self.assertEqual(state["seenFinalIds"], [GAMES[0].event_id])

    def test_lock_prevents_duplicate_instances(self):
        with watch.state_lock(self.state_dir):
            with self.assertRaises(OSError):
                with watch.state_lock(self.state_dir):
                    self.fail("Second watcher acquired the lock.")


class SourceSyncTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / ".git").mkdir()
        self.calls = []
        self.status = b"?? user-owned.txt\0"
        self.branch = b"main\n"
        self.changes = b"unlisted/site/results.json\0"
        self.dirty = False

    def process(self, command, **_kwargs):
        self.calls.append(command)
        args = command[2:]
        values = {
            ("rev-parse", "--show-toplevel"): str(self.root).encode(),
            ("symbolic-ref", "--short", "HEAD"): self.branch,
            ("remote", "get-url", "origin"): b"https://github.com/matziq/matziq.github.io.git",
            ("config", "--list"): b"",
            ("diff", "--no-ext-diff", "--binary"): b"dirty" if self.dirty else b"",
            ("diff", "--cached", "--no-ext-diff", "--binary"): b"",
            ("status", "--porcelain=v1", "--untracked-files=all", "-z"): self.status,
            ("ls-files", "--others", "--exclude-standard", "-z"): b"user-owned.txt\0",
            ("diff", "--name-only", "-z", "HEAD", "origin/main"): self.changes,
            ("rev-parse", "HEAD"): b"same-head\n",
            ("rev-parse", "origin/main"): b"same-head\n",
        }
        if args[:2] == ["rev-parse", "--git-path"]:
            out = str(self.root / ".git" / args[2]).encode()
        else:
            out = values.get(tuple(args), b"")
        return subprocess.CompletedProcess(command, 0, out, b"")

    def test_safe_sync_only_fetches_and_fast_forwards(self):
        with patch.object(watch.subprocess, "run", side_effect=self.process):
            self.assertEqual(watch.safe_sync(self.root), "same-head")
        commands = [" ".join(call) for call in self.calls]
        merge = next(command for command in commands if "merge --ff-only" in command)
        self.assertIn("--no-overwrite-ignore", merge)
        self.assertIn("--no-autostash", merge)
        self.assertFalse(any(any(f" {word} " in command for word in ("reset", "stash", "checkout", "commit", "push", "add")) for command in commands))

    def test_untracked_collision_tracked_changes_branch_and_merge_blockers(self):
        for scenario in ("collision", "dirty", "branch", "merge"):
            self.changes = b"user-owned.txt\0" if scenario == "collision" else b"other\0"
            self.dirty = scenario == "dirty"
            self.branch = b"feature\n" if scenario == "branch" else b"main\n"
            marker = self.root / ".git" / "MERGE_HEAD"
            if scenario == "merge":
                marker.write_text("in progress")
            with self.subTest(scenario=scenario), patch.object(watch.subprocess, "run", side_effect=self.process):
                with self.assertRaises(watch.SyncBlocked):
                    watch.safe_sync(self.root)
            self.assertFalse(any("merge" in call and "--ff-only" in call for call in self.calls))


if __name__ == "__main__":
    unittest.main()
