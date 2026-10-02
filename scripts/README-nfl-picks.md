# NFL picks results automation

The unlisted page at `https://memconfigmgr.org/unlisted/1ff39048f9eaca39e2808bb7b2b687a5/`
keeps the original 73 predictions, original dates, and five-word reasons intact.
The link discourages indexing; it is not authentication or private storage.

`index.html` contains the immutable predictions, an ESPN ID catalog, and an
offline results snapshot. `results.json` contains the same results for the
page and local watcher. Do not edit either results snapshot by hand. Mascot
and Location display preferences are browser-local; NY Jets, NY Giants,
LA Rams, and LA Chargers stay unambiguous.

## Cloud updates

The **Update NFL picks results** workflow runs on a five-minute cron and can
also be run manually. Scheduled Actions can start late, and ESPN and Pages
can lag; this is not an exact game-end notification service.

The Python standard-library updater binds each game to its ESPN event ID,
home/away team IDs, original week, and 2026 regular season. It requests
individual dated scoreboards using Eastern dates, including DST, and uses
the same event's summary if a postponed game disappears from that date.
Only a completed final with valid scores can decide a pick. A tie is neither
correct nor incorrect. Invalid or unavailable source data is logged and
shown on affected rows; the last confirmed result is retained.

ESPN checks are daily before game windows, every five minutes from 30 minutes
before kickoff through 12 hours after kickoff, then every 15 minutes for
unresolved games for seven days and every six hours thereafter. Rescheduled
kickoffs move the polling window, not the original prediction date. Finals
are rechecked hourly for a day and daily for seven days for corrections.
Canceled games stop after their seven-day observation window. Only these 73
games are monitored, including unresolved games after November 2. A manual
run with `force` enabled also rechecks older finals.

Unchanged scheduled checks do not create a commit every five minutes:
meaningful changes and at most hourly check receipts are published. A
manual forced recheck publishes a fresh check receipt immediately. “Last successful
published check” is the time actually stored in the snapshot; “Last result
change” is when the updater observed a new or corrected final, not an
invented game-end timestamp. Failures never advance successful-check times.

The workflow can write repository contents and request Pages builds, with
no additional secret or personal access token. It stages only the page's
results block and `results.json`, pushes normally, explicitly requests the
existing branch-based Pages build, and verifies the exact live HTML and
results revision. It does not rely on a `GITHUB_TOKEN` push triggering Pages.
Concurrent push rejection or deployment failure fails visibly and can be
retried by the next run; no force push, reset, or rebase is used.

```powershell
python -B scripts\nfl_results.py --force
python -B -m unittest discover -s tests -p 'test_nfl_*.py'
python -B tests\nfl_browser.py
```

## Windows browser notification

Run `scripts\install_nfl_watcher.ps1` from the signed-in user's PowerShell
after the updated page is deployed. It registers **Matziq NFL Picks 2026
Results**, a limited, interactive-user task, every five minutes and at logon.
No administrator privileges or password are required. The PC must be awake
and the same user signed in; cloud updates continue while the PC is asleep.

The installer copies the two Python files to
`%LOCALAPPDATA%\Matziq\NflPicks2026\code`. State and rotating logs stay under
`%LOCALAPPDATA%\Matziq\NflPicks2026`, never in the public repository.
Python 3.12+ with Eastern time-zone data and Git must remain available at
their installation paths. Re-run the installer after changing watcher code
or moving the checkout. It refuses to replace an unrelated task.

First setup records existing finals without opening historical tabs. Later
new final IDs open one visible default-browser page per polling batch, only
after the live HTML and JSON agree. Duplicate checks and score corrections
do not reopen tabs. Launch intent is persisted before invoking Windows to
avoid replay after interruption; a reported launch failure is retried.
Closing the browser does not stop the scheduled task.

On a changed published snapshot, the watcher fetches and fast-forwards the
primary local `main` checkout with autostash disabled and ignored/untracked
overwrite protection. It never commits, stages, switches branches, resets,
stashes, or pushes. Tracked local edits, divergence, in-progress Git
operations, hooks, or colliding untracked files block synchronization and
produce an explicit log error and nonzero task result. The live-page
notification can still open safely; resolve the checkout blocker manually
and the next due task retries. Existing untracked work is preserved.

```powershell
Get-ScheduledTask -TaskName 'Matziq NFL Picks 2026 Results'
Get-ScheduledTaskInfo -TaskName 'Matziq NFL Picks 2026 Results'
Get-Content "$env:LOCALAPPDATA\Matziq\NflPicks2026\watcher.log" -Tail 30
Start-ScheduledTask -TaskName 'Matziq NFL Picks 2026 Results'
```

For isolated notification tests, use `nfl_watch.py --dry-run --fixture`
with a private fixture directory containing `index.html` and `results.json`
and a separate private `--state-dir`. Fixture mode cannot launch a browser
or synchronize Git. Do not delete production state to test notifications:
that would deliberately baseline all existing finals again.
