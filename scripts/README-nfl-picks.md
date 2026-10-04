# NFL season picks and reassessment

The unlisted page is
`https://memconfigmgr.org/unlisted/1ff39048f9eaca39e2808bb7b2b687a5/`.
It discourages indexing but is not authenticated or private.

The immutable `games-data` and original ESPN catalog retain all 73 October
predictions, dates, and original compact wording. `fixtures.json` extends coverage
to 224 regular-season games from October 1 onward: 151 additional matchups.
The 13 official playoff slots remain TBD until ESPN supplies actual
participants. No speculative bracket or player availability is presented
as fact. The NFL's 2026 calendar specifies Wild Card starting January 16,
2027; divisional January 23-24; conference championships January 31; and
Super Bowl LXI February 14 at SoFi Stadium.

`forecasts.json` is an append-only ledger of researched assessments.
Every assessment records its triggering final-result revisions, timestamp,
sources with check times, all remaining eligible decisions, original/current
selection, a concise one-paragraph explanation, separate supporting rationale, and explicit performance,
availability, news, and context factors. A no-change decision is recorded
as an assessment, not a forced flip. Newly known playoff matchups also
trigger analysis even without a new final. Original/initial picks and
history are available in each row and CSV; active names follow the saved
Mascot/Location preference. The HTML embeds all snapshots for offline use.

The original compact phrases and legacy assessment decisions are not
rewritten. Published `paragraphs` in `forecasts.json` are keyed to those
existing pick revision IDs; `results.json` exposes the selected
`pickExplanation` without changing the pick, effective time, kickoff lock,
or grade. Original
wording remains visible in history and a separate archival CSV field.
Current table/card/search/export/print uses **Why Picked** paragraphs.
Historical games and unpicked playoff TBDs have no pick explanation.

New assessments use `reasonFormat: paragraph` and write one concise,
plain-text paragraph in each decision's `reason`: usually two to four
sentences, with concrete matchup support and an appropriate limitation.
No exact five-word constraint applies to new explanations. HTML, line
breaks, empty or fragmentary explanations are rejected. Sources remain in
the separate evidence/history fields. Archived originals retain their
existing byte-level integrity check and original digest.

Pregame explanations are future-oriented forecasts ("I expect", "should",
or "could"), not accounts of an outcome that has not happened. Existing
wording corrections are appended to `explanationRevisions`, never
overwritten in the original paragraph map or old assessments. The current
pregame paragraph is frozen with the selection once play starts.

After a final, **correct picks retain their exact pregame explanation**;
ties and games without a pick do not receive a mistaken-pick review.
Only an incorrect final receives a new sourced postgame paragraph that
explains why the pregame reasoning proved mistaken. The original pick and
grade never change. The previous pregame text, review timestamp, verified
final signature and source URLs remain in the history and CSV. A corrected
score invalidates a stale review; if it makes the pick correct, the
unchanged pregame paragraph is restored. While a wrong pick's review is
pending, the page explicitly retains the pregame text instead of inventing
an explanation.

The same-session scan adds missing incorrect-final reviews to its retryable
batch, even if the final itself was already assessed. Each future candidate
includes `postgameReviews` for the batch's unreviewed incorrect finals:
`eventId`, `paragraph`, and `sources` (title/url/checkedAt). Read the verified
ESPN summary/box score/scoring plays or a reputable dated recap before
writing that paragraph. Do not supply reviews for correct or tied games.
The publish runner verifies the final again, requires every needed review,
and appends it through the existing forecast-only compare-and-swap commit.
If no upcoming games remain, an empty decision list plus the required
postgame reviews is valid. Source errors leave the review retryable.

## Projected final scores

Every picked game that was still unstarted when this feature was added has
an explicit score forecast. **Predicted final (away - home)** is separate
from the actual Final Result. Mascot/Location names identify both teams;
the selected winner must have strictly more projected points. The
**Score forecasts** game view filters to available projections. Search,
week/team/day filters, CSV, print and mobile preserve the same mapping.
Historical and Winners-only views never add prediction data.

The first set covers 223 unstarted picks. Pittsburgh-Cleveland was already
final before score predictions existed, so it says **No score forecast
was recorded before kickoff** instead of inventing a retrospective
forecast. Unpicked playoff TBDs and historical Weeks 1-3 have no projected
score. These are uncertain score estimates consistent with the recorded
matchup analysis, not actual scores or calibrated probabilities.

`forecasts.json` stores append-only `scoreProjections` with stable
away/home IDs, points, the selected team, pick revision, timestamp and
fresh pregame proof. New reassessment decisions use
`projectedScore: {awayTeamId, homeTeamId, awayScore, homeScore}`. When the
winner is retained, omitting that field retains its last score projection;
a changed winner or new pick requires an explicit winning projection.
Score-only changes do not rewrite the winner pick or explanation revision.

The runner validates integer points, identity and winner consistency, and
enforces the same ten-minute pregame publication margin. Git publication
timestamps prevent late forecasts from being counted as pregame. The
results snapshot freezes its projection at kickoff, including its absence
if none was published in time. Actual result corrections and mistaken-pick
explanation reviews cannot alter the frozen projected score. Both initial
and revised score forecasts remain in the row history and CSV.

## Pick colors and fantasy leaders

The pick box is blue while a game is pending, green when the pick won, and
red only when the pick lost (ties stay neutral). After a final, a correct
pick's reasoning is shown in green with its original wording unchanged; a
wrong pick's reasoning is shown in red with the postgame explanation of why
the pick was wrong (labeled as pending until that review is published).

Each final game, current or historical, stores `fantasyLeaders`: the three
players with the most PPR fantasy points in that matchup, computed by
`nfl_common.fantasy_leaders` from the ESPN game summary box score (0.04 per
passing yard, 4 per passing TD, -2 per interception, 0.1 per rushing or
receiving yard, 1 per reception, 6 per rushing/receiving/return TD, -2 per
fumble lost; defense and kickers are excluded). Unfinished games always have
`null`. If a summary fetch fails, the prior list is kept and the workflow logs
a warning instead of failing, then retries on the next run. The leaders appear
under the final score and are included in search and both CSV exports.

## Historical games and weekly winners

Weeks 1-3 (48 games, September 9-28, 2026) are stored in a separate
`history.json` and embedded `history-data` block. The import cross-checks
season-specific team schedules against dated ESPN scoreboards using stable
event/team IDs. Only authoritative finals receive scores and a winner.
Ties have no winner; an unfinished/canceled game never receives a guessed
result. Historical records contain no prediction or reason fields and are
never included in the prediction-accuracy denominator.

Use **History** or select **Week 1 / History** through **Week 3 / History**.
The **Game view** selector (`result-view`) offers **Winners only** for any
week, round, or other active filter. It shows confirmed winners and their
final scores, hides all pick/reason/grading columns, and explicitly reports
excluded ties. Historical-only and winners-only CSV/print output has no
prediction columns. In a mixed export, historical prediction cells are
blank. Mascot/Location naming, search, team/day filters, sorting, and mobile
layout work in both views.

For historical finals, only the actual winner's matchup name and Winner
line use contrast-checked green text. A star supplies a non-color marker;
losers, ties, unfinished games, and forecasted games remain neutral.

History is deliberately outside `fixtures.json`, `results.json`, and
`forecasts.json`. Importing old finals cannot produce AI assessment
targets, modify the forecast ledger, or replay Windows browser
notifications. The existing score updater preserves the historical
snapshot unchanged. To refresh this archival snapshot explicitly:

```powershell
python -B scripts\nfl_history.py
```

The importer updates only `history.json` and the HTML's `history-data`
block, leaving original picks, forecast history, active results and private
watermarks untouched. The displayed historical check timestamp identifies
the last verified archival import.

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
When the ledger exceeds the Contents API's inline-data limit, the runner
reads its immutable Git blob by that same SHA before the guarded write.
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
