---
name: adoption-catalog-page
description: Build a single-file, print-friendly HTML "activity catalog" page (overview table plus per-activity detail tables) in the style of Copilot_Adoption_Activity_Catalog-1.html. Use when asked to create a catalog, menu, or offering list of training, workshops, webinars, or adoption activities with audience, audience size, and length.
---

# Adoption Activity Catalog Page

Reverse-engineered from `Copilot_Adoption_Activity_Catalog-1.html` at the repo root. Output is one self-contained HTML file: no JavaScript, no external assets.

## Structure of the source page

1. `<header>`: dark blue band (`#0f3d6e`) with an `h1` title and a one-line subtitle.
2. `<main>` (max-width 1300px, centered) containing, in order:
   - **Activity Overview**: plain `<table>` with columns Activity, Audience, Audience size, Length. One row per activity.
   - Footnote `<p class="note">` explaining `*` markers (for example "No limit" means no fixed cap).
   - **Detail sections**, one per activity that has sub-items: `<h2>`, `<p class="sub">` intro, then `<table class="detail">`. Column widths come from the `.detail` CSS (first column bold, columns 2-4 narrow). Final column is free text ("What it covers" or "Function-specific use cases").
   - Optional `<p class="callout">` (purple left border) for delivery options.
   - Closing `<p class="note">` disclaimer.
3. Unused but defined CSS: `.legend`, `.grid`, `.wk`, `.cell`, `.ev` plus color classes (`.launch`, `.train`, `.web`, `.hands`, `.agent`, `.exec`, `.champ`) for an optional week-by-day calendar view; `.tag` for inline badges.

## Conventions

- Audience size values: `Up to N`, or `No limit<sup>*</sup>` with the footnote.
- Length values: ranges like `60-90 min`, `1-2 hrs`, `1 day, in person`, `Recurring, 30-60 min`.
- Audience sizes on detail tables follow the parent activity unless stated.
- Escape `&` as `&amp;`. Use American English spelling.
- Mark any extrapolated value with `*` and add a "confirm during planning" note.
- Keep the 5-column `detail` table shape so the width rules apply.

## Procedure

1. Gather the activities (name, audience, size, length) and which need a breakdown.
2. Copy `assets/template.html` (alongside this file) to the destination, for example `<name>.html`.
3. Replace `{{TITLE}}`, `{{SUBTITLE}}`, and other `{{...}}` placeholders.
4. Fill the overview rows, then duplicate the detail section block per activity; delete unused blocks and comments.
5. Open the file in a browser (or `python3 -m http.server`) to check layout, and print preview for `@media print`.
6. Confirm no `{{` placeholders remain: `grep -n '{{' <file>`.

## Optional calendar grid

For a schedule view, add a `.legend` row of colored `<span class="launch">` chips, then a `.grid` with a `.hd` header row (empty first cell + 5 weekday headers), and per week a `.wk` label followed by five `.cell`s containing `<div class="ev train"><b>Title</b><span>Detail</span><em>Duration</em></div>`.
