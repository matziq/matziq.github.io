# NFL season picks and reassessment

The unlisted page is
`https://memconfigmgr.org/unlisted/1ff39048f9eaca39e2808bb7b2b687a5/`.
It discourages indexing but is not authenticated or private.

The immutable `games-data` and original ESPN catalog retain all 73 October
predictions, dates, and five-word reasons. `fixtures.json` extends coverage
to 224 regular-season games from October 1 onward: 151 additional matchups.
The 13 official playoff slots remain TBD until ESPN supplies actual
participants. No speculative bracket or player availability is presented
as fact. The NFL's 2026 calendar specifies Wild Card starting January 16,
2027; divisional January 23-24; conference championships January 31; and
Super Bowl LXI February 14 at SoFi Stadium.

`forecasts.json` is an append-only ledger of researched assessments.
Every assessment records its triggering final-result revisions, timestamp,
sources with check times, all remaining eligible decisions, original/current
selection, five-word reason, longer rationale, and explicit performance,
availability, news, and context factors. A no-change decision is recorded
as an assessment, not a forced flip. Newly known playoff matchups also
trigger analysis even without a new final. Original/initial picks and
history are available in each row and CSV; active names follow the saved
Mascot/Location preference. The HTML embeds all snapshots for offline use.

## Independent cloud results workflow

**Update NFL picks results** remains a five-minute scheduled/manual Actions
workflow. It uses only `contents: write` and `pages: write`, with no new
secret or paid AI API. Scheduled runs can be late.

The deterministic updater does not analyze or choose winners. It verifies
stable event/team IDs, the 2026 season, regular/postseason type and round,
and individual Eastern-date scoreboards. Summary fallback follows delayed
or rescheduled event IDs. Flexible date/time changes are displayed without
rewriting original prediction dates; unconfirmed Week 18 times are TBD.

Checks are daily before game windows, five-minute near kickoff through
12 hours afterward, then every 15 minutes for unresolved games for a week
and every six hours thereafter. Finals are rechecked hourly for one day
and daily for seven days; a manual forced check includes older finals.
Official schedule discovery is daily, or every five minutes for a day
after a Week 18/postseason final when playoff participants remain unknown.
Only official known teams can receive forecasts. Monitoring ends only
after all 13 official playoff games are final, every remaining regular
game is final/canceled, and the seven-day correction windows have elapsed.
There is no November 2 or January 10 stop.

`results.json` freezes the last published pregame pick when play starts.
Suspended/started delayed games remain locked. Scoring uses this frozen
selection, never a rewritten historical original or a later assessment.
A tie is neither correct nor incorrect; a missed pregame prediction is
explicitly unscored. A ten-minute pregame revision safety margin and Git
publication timestamps prevent retroactive score improvement.

The bot writes only generated `results.json`, `fixtures.json`, and the
HTML's snapshot blocks. It never edits the forecast ledger. Unchanged polls
publish at most hourly check receipts; meaningful changes publish promptly.
It pushes normally, explicitly requests the existing branch-based Pages
build, then verifies HTML, results, fixtures and forecast revisions.
Concurrent push rejection fails visibly and the next run retries from
current main; no force push or rebase is used.

## Same-session researched reassessment

The app-native **five-minute session automation** wakes this existing
primary-checkout session, not a new agent/worktree. Its first operation is:

```powershell
python -B scripts\nfl_forecasts.py scan
```

Most ticks stop after the cheap published-results comparison. A new final,
meaningful corrected final, or newly official unpicked matchup produces a
private batch. Only then does the agent collect current public evidence
and exercise actual contextual judgment:

```powershell
python -B scripts\nfl_evidence.py --output "$env:LOCALAPPDATA\Matziq\NflPicks2026\analysis\evidence.json"
```

Research includes opponent-adjusted form and usage, confirmed injuries and
uncertain return timelines, suspensions/disciplinary absences, QB and other
key-player availability, roster/coaching news, travel/rest/home field, and
relevant near-term weather. Sources and timestamps must be cited. A depth
chart is not guaranteed availability; no report is not a clean bill of
health; long-range weather and future recoveries are unknown. The evidence
collector provides facts only and contains no deterministic pick formula.

The agent writes a private candidate with a decision for every eligible
remaining known matchup. Then:

```powershell
python -B scripts\nfl_forecasts.py publish --batch <private-batch.json> --candidate <private-candidate.json>
python -B scripts\nfl_forecasts.py finalize
```

`publish` fast-forwards the clean primary main checkout, verifies the
triggering finals and fresh status of every scoped event, rejects stale
research and late revisions, and appends one assessment via the GitHub
Contents API's file-SHA compare-and-swap. This forecast-only commit is
based on the current main tree, preserving concurrent score-bot changes.
It includes the Copilot coauthor trailer, safely synchronizes local source,
and dispatches the existing results workflow to refresh/deploy snapshots.

Only `finalize`, after the live JSON and HTML agree, advances the private
completion watermark. A committed-but-not-deployed assessment is retried,
not reanalyzed. Errors are explicit, logged, and leave results retryable.
Private state, batches, candidates and rotating logs:
`%LOCALAPPDATA%\Matziq\NflPicks2026\analysis`.
The public append-only ledger also prevents duplicate assessments if
private notification state needs recovery. Never delete it to replay work.

The AI reassessment requires the Copilot app/session and agent service to
be available and may consume normal agent credits. It does not run in the
cloud score workflow while the PC/app is unavailable. On resume it catches
up on unprocessed finals but never revises games that already started.
Cloud score updates continue independently.

## Windows browser task

**Matziq NFL Picks 2026 Results** remains the existing limited,
interactive-user task, running every five minutes and at logon. The
installer updates its action in place without replacing its triggers or
discarding notification state. Versioned immutable code is copied under
`%LOCALAPPDATA%\Matziq\NflPicks2026\code`; logs/state stay outside the site.
It requires the PC awake and the user signed in; no admin or password is
required.

First setup baselines historical finals without tabs. New finals open one
deployed page per batch, not every poll. New published forecast selections
can also open one page; openings within ten minutes are coalesced, and an
already-open page refreshes its complete snapshot. Duplicate finals,
retained picks and unchanged polls do not flood tabs.

The watcher uses only safe fast-forward source synchronization. User-owned
tracked edits, branch changes, divergence, hooks or colliding untracked
files are explicit blockers; it never commits, stages, switches, stashes,
resets or force-pushes. Its old version can temporarily report a snapshot
mismatch during upgrades; install the new version after deployment.

```powershell
.\scripts\install_nfl_watcher.ps1
Get-ScheduledTask -TaskName 'Matziq NFL Picks 2026 Results'
Get-ScheduledTaskInfo -TaskName 'Matziq NFL Picks 2026 Results'
Get-Content "$env:LOCALAPPDATA\Matziq\NflPicks2026\watcher.log" -Tail 20
python -B -m unittest discover -s tests -p 'test_nfl_*.py'
python -B tests\nfl_browser.py
```

Fixture mode (`nfl_watch.py --dry-run --fixture`) uses isolated private
state and cannot launch a real browser or synchronize Git.
