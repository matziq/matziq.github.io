#!/usr/bin/env python3
"""Render a catalog JSON file into a standalone HTML page and validate it.

Usage: render.py input.json output.html [--toc] [--brand '#0f3d6e'] [--accent '#8764b8']
Exit code 1 if validation fails.
"""
import argparse, json, re, sys
from html import escape
from pathlib import Path

TEMPLATE = Path(__file__).resolve().parent.parent / "assets" / "template.html"
SIZE_RE = re.compile(r"^(Up to \d+|No limit|\d+)(\*)?(;.*|\s.*)?$")
LENGTH_RE = re.compile(r"\d|Flexible|Recurring", re.I)
COLOR_RE = re.compile(r"^#[0-9a-fA-F]{6}$")


RAW = False  # set from the input's "allow_html" flag
TAG_RE = re.compile(r"\{tag:([^}]+)\}")


def cell(text):
    """Escape text ('*' becomes a superscript marker, '{tag:X}' a badge).

    With "allow_html": true in the input, text is trusted and emitted as-is.
    """
    text = str(text)
    if RAW:
        return text
    out, pos = "", 0
    for m in TAG_RE.finditer(text):
        out += _plain(text[pos:m.start()]) + f'<span class="tag">{escape(m.group(1))}</span>'
        pos = m.end()
    return out + _plain(text[pos:])


def _plain(text):
    return escape(text).replace("*", "<sup>*</sup>")


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def table(headers, rows, caption, css=""):
    h = "".join(f'<th scope="col">{escape(x)}</th>' for x in headers)
    b = "".join("<tr>" + "".join(f"<td>{cell(c)}</td>" for c in r) + "</tr>\n" for r in rows)
    cls = f' class="{css}"' if css else ""
    return (f'<div class="table-wrap"><table{cls}><caption>{escape(caption)}</caption>'
            f"<thead><tr>{h}</tr></thead>\n<tbody>\n{b}</tbody></table></div>")


def validate(data, html):
    errs = []
    acts = data.get("activities", [])
    if not acts:
        errs.append("no activities")
    names = [a.get("name") for a in acts]
    for a in acts:
        for k in ("name", "audience", "size", "length"):
            if not a.get(k):
                errs.append(f"activity {a.get('name')!r}: missing {k}")
        if a.get("size") and not SIZE_RE.match(a["size"]):
            errs.append(f"activity {a['name']!r}: size {a['size']!r} must look like 'Up to 25', 'No limit*' or a number")
        if a.get("length") and not LENGTH_RE.search(a["length"]):
            errs.append(f"activity {a['name']!r}: length {a['length']!r} needs a duration (e.g. '60-90 min')")
    for s in data.get("sections", []):
        if s.get("activity") not in names:
            errs.append(f"section {s.get('title')!r}: activity {s.get('activity')!r} not in overview")
        for r in s.get("rows", []):
            if len(r) != 5:
                errs.append(f"section {s.get('title')!r}: row needs 5 cells, got {len(r)}")
            elif r[2] and not SIZE_RE.match(r[2]):
                errs.append(f"section {s.get('title')!r}: size {r[2]!r} invalid")
    for a in acts:
        if a.get("detail") and a["name"] not in {s.get("activity") for s in data.get("sections", [])}:
            errs.append(f"activity {a['name']!r} has detail=true but no section")
    if "<sup>*</sup>" in html and not any(n.lstrip().startswith("*") for n in data.get("notes", [])):
        errs.append("'*' used but no note starting with '*' explains it")
    if re.search(r"\{\{[A-Z_]+\}\}", html):
        errs.append("unreplaced {{placeholder}} remains")
    return errs


def main():
    p = argparse.ArgumentParser()
    p.add_argument("input"); p.add_argument("output")
    p.add_argument("--toc", action="store_true")
    p.add_argument("--brand"); p.add_argument("--accent")
    a = p.parse_args()
    global RAW
    data = json.loads(Path(a.input).read_text(encoding="utf-8"))
    RAW = bool(data.get("allow_html"))
    brand = a.brand or data.get("brand", "#0f3d6e")
    accent = a.accent or data.get("accent", "#8764b8")
    for c in (brand, accent):
        if not COLOR_RE.match(c):
            sys.exit(f"invalid color {c!r}; use #rrggbb")

    body = ["<h2 id=\"overview\">Activity Overview</h2>"]
    body.append(table(["Activity", "Audience", "Audience size", "Length"],
                      [[x["name"], x["audience"], x["size"], x["length"]] for x in data["activities"]],
                      "Activity overview"))
    body += [f'<p class="note">{cell(n) if not n.startswith("*") else "*" + escape(n[1:])}</p>' for n in data.get("notes", [])]
    heads = [("overview", "Activity Overview")]
    for s in data.get("sections", []):
        sid = slug(s["title"])
        if s.get("level") != 3:
            heads.append((sid, s["title"]))
        lvl = 3 if s.get("level") == 3 else 2
        body.append(f'<h{lvl} id="{sid}">{escape(s["title"])}</h{lvl}>')
        if s.get("intro"):
            body.append(f'<p class="sub">{cell(s["intro"])}</p>')
        body.append(table(s.get("columns", ["Session", "Audience", "Audience size", "Length", "What it covers"]),
                          s["rows"], s["title"], "detail"))
        if s.get("callout"):
            body.append(f'<p class="callout"><b>{escape(s["callout"].get("label", "Note"))}:</b> {cell(s["callout"]["text"])}</p>')
        for n in s.get("notes", []):
            body.append(f'<p class="note">{cell(n)}</p>')
    if data.get("footer"):
        body.append(f'<p class="note">{cell(data["footer"])}</p>')

    toc = ""
    if a.toc:
        toc = '<nav class="toc" aria-label="Contents"><b>Contents</b><ul>' + "".join(
            f'<li><a href="#{i}">{escape(t)}</a></li>' for i, t in heads) + "</ul></nav>"
    html = (TEMPLATE.read_text(encoding="utf-8")
            .replace("{{BRAND}}", brand).replace("{{ACCENT}}", accent)
            .replace("{{TITLE}}", escape(data["title"])).replace("{{SUBTITLE}}", escape(data.get("subtitle", "")))
            .replace("{{TOC}}", toc).replace("{{BODY}}", "\n".join(body)))
    errs = validate(data, html)
    if errs:
        print("Validation failed:", *errs, sep="\n  - ")
        sys.exit(1)
    Path(a.output).write_text(html, encoding="utf-8")
    print(f"Wrote {a.output}")


if __name__ == "__main__":
    main()
