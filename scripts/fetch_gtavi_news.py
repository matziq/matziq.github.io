#!/usr/bin/env python3
"""Scrape the Featured News cards from the official Grand Theft Auto VI site.

The countdown page is a static GitHub Pages document, so it cannot fetch
rockstargames.com directly (no CORS headers). Instead this script runs in CI,
parses the server-rendered markup and writes gtavi_countdown/news.json, which
the page loads same-origin.
"""

from __future__ import annotations

import html
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

SOURCE_URL = "https://www.rockstargames.com/VI"
SITE_ROOT = "https://www.rockstargames.com"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "gtavi_countdown" / "news.json"
MAX_ITEMS = 6

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36"
)

CARD_RE = re.compile(
    r'<a href="(?P<url>https://www\.rockstargames\.com/newswire/article/[^"]+)"'
    r"(?P<body>.*?)</a>",
    re.DOTALL,
)
TITLE_RE = re.compile(r"<h4[^>]*>(?P<title>.*?)</h4>", re.DOTALL)
DATE_RE = re.compile(r"<p[^>]*>(?P<date>[^<]*?\d{4})</p>", re.DOTALL)
IMG_SRC_RE = re.compile(r'\ssrc="(?P<src>[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"')
TAG_RE = re.compile(r"<[^>]+>")

DATE_FORMATS = ("%B %d, %Y", "%b %d, %Y")


def fetch(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


def clean_text(raw: str) -> str:
    return html.unescape(TAG_RE.sub("", raw)).strip()


def absolute(url: str) -> str:
    if url.startswith("//"):
        url = "https:" + url
    elif url.startswith("/"):
        url = SITE_ROOT + url
    # The page ships 4K art; ask the image CDN for a thumbnail-sized crop.
    return re.sub(r"imwidth=\d+", "imwidth=640", url)


def to_iso(date_text: str) -> str | None:
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(date_text, fmt).date().isoformat()
        except ValueError:
            continue
    return None


def parse_items(markup: str) -> list[dict]:
    items: list[dict] = []
    seen: set[str] = set()

    for card in CARD_RE.finditer(markup):
        body = card.group("body")
        title_match = TITLE_RE.search(body)
        if not title_match:
            continue

        title = clean_text(title_match.group("title"))
        if not title:
            continue

        url = html.unescape(card.group("url"))
        if url in seen:
            continue
        seen.add(url)

        date_match = DATE_RE.search(body)
        date_text = clean_text(date_match.group("date")) if date_match else ""

        image_match = IMG_SRC_RE.search(body)
        image = absolute(html.unescape(image_match.group("src"))) if image_match else None

        items.append(
            {
                "title": title,
                "url": url,
                "date": date_text,
                "isoDate": to_iso(date_text),
                "image": image,
            }
        )

        if len(items) >= MAX_ITEMS:
            break

    return items


def main() -> int:
    try:
        markup = fetch(SOURCE_URL)
    except (urllib.error.URLError, TimeoutError) as error:
        print(f"error: could not fetch {SOURCE_URL}: {error}", file=sys.stderr)
        return 1

    items = parse_items(markup)
    if not items:
        print("error: no news cards found; the source markup likely changed", file=sys.stderr)
        return 1

    payload = {
        "source": SOURCE_URL,
        "newswire": "https://www.rockstargames.com/newswire",
        "fetchedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "items": items,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(items)} items to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
