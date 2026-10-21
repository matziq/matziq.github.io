---
name: adoption-catalog-page
description: Build a single-file, print-friendly HTML "activity catalog" page (overview table plus per-activity detail tables) for any training, enablement, workshop, webinar, or adoption program. Use when asked to create a catalog, menu, or offering list of activities with audience, audience size, and length.
---

# Activity Catalog Page

Generates one self-contained HTML file (no JavaScript, no external assets) from a small JSON input. Derived from a real Copilot adoption catalog, kept as a worked example in `examples/copilot-adoption-catalog.html`; the skill itself works for any program.

## When not to use

- Calendar-only schedules with dates and times: use the optional grid in `assets/calendar.css` or a calendar tool.
- Content users must edit or sort: use a spreadsheet.
- Multi-page sites or slide decks.

## Questions to ask if inputs are missing

1. Activity names, audience, and length for each row.
2. Audience size cap per activity ("No limit" needs a footnote; confirm wording).
3. Which activities need a detail breakdown (sessions, functions, tracks) and what columns.
4. Branding colors (`brand` for the header/headings, `accent` for the callout border), or accept the defaults.
5. Whether a table of contents is wanted (useful for 4+ sections).

## Procedure

1. Write an input JSON file (schema below). `examples/sample-input.json` is a starting point.
2. Run: `python3 .github/skills/adoption-catalog-page/scripts/render.py input.json out.html [--toc] [--brand '#rrggbb'] [--accent '#rrggbb']`
3. Fix any validation errors it prints (exit code 1, no file written), then rerun.
4. Open the HTML in a browser and use print preview to check layout.

Output location and naming: write to the folder the user names, otherwise the repo root or a new folder named for the catalog. Use lowercase kebab-case, for example `team-enablement-catalog.html`. Never overwrite an existing file without asking.

## Input schema

```json
{
  "title": "string (required)",
  "subtitle": "string",
  "allow_html": "false (default). true = cells, intros, callouts, notes are trusted raw HTML",
  "brand": "#rrggbb (default #0f3d6e)",
  "accent": "#rrggbb (default #8764b8)",
  "activities": [
    {"name": "", "audience": "", "size": "Up to 25 | No limit* | 40", "length": "60-90 min", "detail": true}
  ],
  "notes": ["* footnote text; one note must start with * if any value uses *"],
  "sections": [
    {
      "activity": "must match an activities[].name",
      "title": "heading",
      "level": "2 (default) or 3 for a subheading (h3, excluded from the TOC)",
      "intro": "optional paragraph",
      "columns": ["optional; default Session, Audience, Audience size, Length, What it covers"],
      "rows": [["5 cells each: name, audience, size, length, details"]],
      "callout": {"label": "Delivery options", "text": "optional"},
      "notes": ["optional notes shown after this section's table"]
    }
  ],
  "footer": "closing note"
}
```

By default all text is HTML-escaped, so `&` and `<` are safe. Any `*` becomes a superscript footnote marker, and `{tag:Label}` becomes a small badge. Set `"allow_html": true` only for trusted input.

## Validation performed by render.py

- No `{{placeholder}}` left in the output.
- Required activity fields present; every `detail: true` activity has a section, and every section maps to an overview activity.
- Detail rows have 5 cells.
- Size values match `Up to N`, `No limit`, or a number (optional `*`); length contains a duration, `Flexible`, or `Recurring`.
- Any `*` used has a footnote note starting with `*`.
- Colors are `#rrggbb`.

## Testing

`python3 .github/skills/adoption-catalog-page/scripts/test_render.py` runs regression tests, including a check that `examples/copilot-adoption-catalog.json` renders to the same visible text as the original `examples/copilot-adoption-catalog.html`. Markup differs by design (semantic tables, CSS variables); text and structure match.

## Design notes

- Layout: colored header band, centered `main` (max 1300px), overview table, optional detail sections, notes. Tables use `<thead>`, `<th scope="col">`, and a `<caption>`, and sit in a scroll wrapper for mobile.
- Reskinning is one edit: CSS variables `--brand` and `--accent` in `assets/template.html`.
- Print: tables and callouts avoid page splits; the TOC is hidden.
- Contrast: white text on the optional calendar colors was checked at 4.5:1 or better (WCAG AA); heading and tag colors pass on their backgrounds. Re-check any custom `brand`/`accent`.
- The source page's SharePoint `data-sp-site-theme` dark-theme block is intentionally omitted: it is host-injected and unused by the page's own CSS.
- The unused calendar grid (weekly view with `.legend`, `.grid`, `.ev` color classes) lives in `assets/calendar.css`; paste it into the template's `<style>` only when a schedule view is needed.
- Use American English spelling in generated content.
