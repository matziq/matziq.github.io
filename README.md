# matziq.github.io

Public GitHub Pages site, served at https://memconfigmgr.org/

- Collection gateway: https://memconfigmgr.org/
- Apps: https://memconfigmgr.org/apps/
- Recipes: https://memconfigmgr.org/recipes/
- Recipe editor: https://memconfigmgr.org/recipes/admin/
- Fun and games: https://memconfigmgr.org/games/
- Complete site index: https://memconfigmgr.org/iomenu.html
- Book of Mormon comparison: https://memconfigmgr.org/religion/book-of-mormon-comparison.html

The Book of Mormon comparison is a standalone page hosted on this site. Existing
religious-study redirect pages remain unchanged.

## Alina Rea stats

https://memconfigmgr.org/stats.html is a root-level, self-contained snapshot of
Alina Rea's Fall 2026 MaxPreps player statistics and total-sacks rankings for
Division 4A seniors, Division 4A overall, and Arizona statewide. The page links
to all four sources and identifies its retrieval date and the player profile's
last update. It does not refresh automatically; verify all four sources and
update the values and timestamps together when refreshing the snapshot.

## Content that moved to its own domain

Ward mission and religious-study content now lives on dedicated domains. The
old paths on this site are kept as redirect pages so existing links, bookmarks
and printed QR codes still work.

### Ward Mission Leader - https://wardmission.org/

- WML resources: https://wardmission.org/
- Love, Share, Invite missionary activity: https://wardmission.org/love-share-invite.html
- WML Personality Test: https://wardmission.org/personality.html
- Fifth Sunday lesson: https://wardmission.org/fifth-sunday/
- 15-minute lesson: https://wardmission.org/fifth-sunday/15-minute/
- Linger Longer Potluck signup: https://wardmission.org/linger_longer/
- Ward Fast signup: https://wardmission.org/wardfast/ (short link: https://wardmission.org/wf/)

Served from the `matziq/wml` repository.

### Evidences of the True Church - https://evidenceoftruth.online/

Served from the `matziq/evidenceoftruth` repository.

## Prepared Copilot domain migration (not published)

The canonical destination is `https://copilotdocs.org/`, served from
`matziq/copilot-training-docs`. This checkout prepares compatibility only; do not
deploy these replacements until the canonical content and valid HTTPS are ready.
No domain, Pages setting, DNS record, or live content is changed by these scripts.

The approved source snapshots are:

- Main site: `708a21c7e5853dedcdb844b63795b8e1bcf0228c`.
- Training repository: `025efa67f3a7e4f98b33f660e91b45975d6d2af6`.

The machine-readable compatibility manifest in `scripts/copilot-compatibility.json`
is derived from the canonical migration manifest. Its 53 main-site files comprise
25 fixed-destination HTML redirects and 28 retained assets. Each index page covers
both its directory URL and explicit `index.html` URL. Spelling and case are
preserved. The two HTML practice-source documents are assets, not redirect pages.
Retained downloads, scripts, styles, data, and shared favicons remain unchanged.
Future document edits belong in the canonical repository, not the redirect pages.
No unlisted guide is added to public navigation or a generated site index.
The root site, AI-900, AI-901, AB-100, AB-620, and unrelated content stay unchanged;
only existing Copilot and GH-300 links in Apps and the Everything Menu are updated.

### Old project URLs use native Pages routing

Do **not** create a parent `/copilot-training-docs/` shadow subtree. The project
currently owns that route. GitHub documents user-domain inheritance and the
individual project-domain override:
[custom domains across repositories](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages#using-a-custom-domain-across-multiple-repositories).
That documentation does not itself guarantee former-prefix fallthrough.

Read-only probes on November 4, 2026 confirmed the same account's existing
`/wml/` and `/evidenceoftruth/` projects return native HTTP 301 redirects from
`memconfigmgr.org` to their configured custom domains. Deep directory paths,
explicit HTML paths, and encoded query strings are preserved while only the
repository prefix is stripped. For example:

```text
https://memconfigmgr.org/evidenceoftruth/religion/religion-comparison.html?routeprobe=a%20b&x=1
301 Location: https://evidenceoftruth.online/religion/religion-comparison.html?routeprobe=a%20b&x=1
```

The same deep-path behavior was observed from `matziq.github.io`. A headless Edge
navigation from `/wml/wardfast/?routeprobe=a%20b&x=1#compatibility-fragment`
finished at the corresponding `wardmission.org` URL with its query and fragment
intact and HTTP 200. This is consistent with
[RFC 9110 section 10.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.2):
a redirect Location without a fragment inherits the original fragment.

Therefore old `/copilot-training-docs/<path>` URLs, including direct downloads,
will rely on the training project's custom-domain redirect to the same `<path>`
at the new root. This is evidence from existing projects, not a claim that the
Copilot-specific cutover has been verified. The canonical manifest inventories
515 training files for destination verification; they are not duplicated here.

Main-site compatibility pages are browser redirects, **not HTTP 301 responses**.
JavaScript uses a fixed manifest destination plus the original query and fragment
with `location.replace`. Without JavaScript, meta refresh and a visible link
still reach the matching page, but cannot preserve a dynamic query or fragment.
Browser storage does not move across origins: GH-300 study progress and guide
preferences remain on the old origin and are neither copied nor erased.

### Regeneration and checks

```powershell
python scripts\copilot_compatibility.py --check
python -m unittest discover -s tests -p test_copilot_compatibility.py
python tests\copilot_compatibility_browser.py
```

The browser check requires the existing Python Playwright package and Microsoft
Edge. It serves the checkout on an ephemeral loopback port and intercepts the
canonical destination, so it does not depend on or modify the live new domain.
To import an updated approved canonical manifest, run
`python scripts\copilot_compatibility.py --manifest <manifest-path>`.
The generator refuses modified source pages, changed retained assets, duplicate
or out-of-scope paths, and destinations outside the exact canonical root mapping.
Git clean filters account for Windows checkout line endings; retained Git blobs
remain byte-for-byte identical to the pinned source snapshot.

### Cutover gates and rollback

Preparation is local only. DNS now has the four GitHub Pages apex A records and
an ownership challenge TXT, but Pages domain assignment and valid TLS are still
pending. Do not publish these stubs while the canonical destination is unavailable.
Coordinate canonical deployment and compatibility deployment with the creator.
Keep the training repository's existing content, reconcile its deployment mode,
and verify domain ownership before assigning the custom domain.

After an authorized cutover, verify old project root, deep directory, explicit
HTML, encoded filename, and direct-download URLs from **both** old hosts. Require
the exact mapped destination over valid HTTPS, no loops, query/fragment retention
in a browser, complete manifest coverage, unchanged downloads, and unaffected
main-site exam sites. Native project redirects must be verified live; stop
cutover if they behave differently from the same-account evidence.

Rollback must be coordinated with the canonical repository and Pages setting:
revert the compatibility commit to restore main-site pages/navigation, and
restore the prior canonical deployment and domain assignment as appropriate.
Retain source snapshots and do not clear old browser storage.