"""Focused browser checks; uses an existing Playwright installation."""

import argparse
import copy
import csv
from datetime import timedelta
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import tempfile
from threading import Thread
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright, expect

from test_nfl_results import GAMES, HTML, NOW, ROOT, snapshot
import nfl_results as nfl


PAGE_URL_PATH = "/" + nfl.PAGE_PATH.as_posix()
ALLOWED_PATHS = {PAGE_URL_PATH, PAGE_URL_PATH.rsplit("/", 1)[0] + "/", PAGE_URL_PATH.rsplit("/", 1)[0] + "/results.json"}


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if urlsplit(self.path).path not in ALLOWED_PATHS:
            self.send_error(404)
            return
        super().do_GET()

    def log_message(self, _format, *_args):
        pass


def check(browser, url, artifacts):
    context = browser.new_context(viewport={"width": 1440, "height": 1100}, accept_downloads=True)
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(url, wait_until="networkidle")
    rows = page.locator("#picks-body tr")
    expect(rows).to_have_count(73)
    expect(page.locator("#app-error")).to_be_hidden()
    expect(page.locator('meta[name="robots"]')).to_have_attribute("content", "noindex, nofollow, noarchive")
    expect(page.locator('meta[name="referrer"]')).to_have_attribute("content", "no-referrer")
    original = page.locator("#games-data").text_content()
    assert nfl.digest(json.loads(original)) == nfl.PICKS_SHA256
    first = page.locator('[data-event-id="401872964"]')
    expect(first.locator(".pick-name")).to_have_text("Steelers")
    expect(first.locator(".final-score")).to_have_text("Steelers 24 - Browns 27")
    expect(first.locator(".verdict")).to_have_text("Pick: Incorrect")
    expect(page.locator("#record-summary")).to_have_text("This view: 0 correct / 1 incorrect / 0 tied / 72 pending")

    names = page.get_by_label("Team names", exact=True)
    names.select_option("location")
    expect(first.locator(".matchup")).to_have_text("Pittsburgh at Cleveland")
    expect(first.locator(".pick-name")).to_have_text("Pittsburgh")
    expect(first.locator(".result-cell")).to_contain_text("Winner: Cleveland")
    labels = page.locator("#team-filter option").all_text_contents()
    for label in ("Dallas", "Buffalo", "NY Jets", "NY Giants", "LA Rams", "LA Chargers"):
        assert label in labels, label
    page.reload(wait_until="networkidle")
    expect(names).to_have_value("location")
    expect(first.locator(".matchup")).to_have_text("Pittsburgh at Cleveland")

    search = page.get_by_label("Search games", exact=True)
    search.fill("NY Jets")
    expect(rows).to_have_count(sum("Jets" in (row[2], row[3]) for row in json.loads(original)))
    search.fill("Buffalo")
    expect(rows).to_have_count(sum("Bills" in (row[2], row[3]) for row in json.loads(original)))
    names.select_option("mascot")
    expect(rows).to_have_count(sum("Bills" in (row[2], row[3]) for row in json.loads(original)))
    search.fill("")
    page.get_by_label("Team", exact=True).select_option("6")
    names.select_option("location")
    expect(page.get_by_label("Team", exact=True)).to_have_value("6")
    expect(rows).to_have_count(5)
    page.get_by_role("button", name="Week 5", exact=False).click()
    page.get_by_label("Day", exact=True).select_option("Thu")
    search.fill("Cowboys")
    expect(rows).to_have_count(1)
    expect(rows.locator(".pick-name")).to_have_text("Dallas")
    page.get_by_role("button", name="Reset view", exact=True).first.click()
    expect(rows).to_have_count(73)
    expect(names).to_have_value("location")

    page.locator('[data-sort="teams"]').click()
    assert page.evaluate("""() => {
      const values = [...document.querySelectorAll(".matchup")].map(node => node.textContent);
      const sorted = [...values].sort(new Intl.Collator("en-US", {numeric:true}).compare);
      return values.every((value, index) => value === sorted[index]);
    }""")
    page.locator('[data-sort="pick"]').click()
    assert page.evaluate("""() => {
      const values = [...document.querySelectorAll(".pick-name")].map(node => node.textContent);
      const sorted = [...values].sort(new Intl.Collator("en-US", {numeric:true}).compare);
      return values.every((value, index) => value === sorted[index]);
    }""")
    page.locator('[data-sort="winner"]').click()
    expect(rows.first.locator(".result-cell")).to_contain_text("Winner: Cleveland")
    page.locator('[data-sort="date"]').click()
    with page.expect_download() as download:
        page.get_by_role("button", name="Export CSV", exact=True).click()
    with tempfile.TemporaryDirectory() as directory:
        file = Path(directory) / "picks.csv"
        download.value.save_as(file)
        with file.open(encoding="utf-8-sig", newline="") as stream:
            exported = list(csv.DictReader(stream))
    assert len(exported) == 73
    final_row = next(row for row in exported if row["Date"] == "Oct 1, 2026")
    assert final_row["Teams"] == "Pittsburgh at Cleveland"
    assert final_row["Team Picked to Win"] == "Pittsburgh"
    assert final_row["Winner"] == "Cleveland" and final_row["Pick result"] == "incorrect"
    assert final_row["Final score"] == "Pittsburgh 24 - Cleveland 27"
    assert sorted(row["5 Words Why Picked"] for row in exported) == sorted(row[6] for row in json.loads(original))

    page.evaluate("document.documentElement.dataset.theme = 'dark'")
    page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    page.emulate_media(media="print")
    expect(page.locator("html")).to_have_attribute("data-theme", "light")
    expect(page.locator(".filters")).to_be_hidden()
    expect(first.locator(".final-score")).to_be_visible()
    assert page.locator("thead").evaluate("node => getComputedStyle(node).display") == "table-header-group"
    page.emulate_media(media="screen")
    page.evaluate("window.dispatchEvent(new Event('afterprint'))")
    expect(page.locator("html")).to_have_attribute("data-theme", "dark")
    page.evaluate("document.documentElement.dataset.theme = 'light'")
    if artifacts:
        page.screenshot(path=str(artifacts / "nfl-desktop.png"))
    page.set_viewport_size({"width": 390, "height": 1000})
    expect(page.get_by_label("Sort games", exact=True)).to_be_visible()
    page.get_by_label("Sort games", exact=True).select_option("teams:desc")
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "Mobile layout overflowed."
    expect(rows.first.locator(".result-cell")).to_be_visible()
    if artifacts:
        page.screenshot(path=str(artifacts / "nfl-mobile.png"))
    search.fill("no-fixture-can-match-this")
    expect(page.locator("#empty-state")).to_be_visible()
    expect(page.get_by_role("button", name="Export CSV", exact=True)).to_be_disabled()
    page.locator("#empty-reset-button").click()
    expect(rows).to_have_count(73)
    assert not errors, errors
    context.close()

    blocked = browser.new_context()
    blocked.add_init_script("""Object.defineProperty(window, "localStorage", {
      get() { throw new DOMException("Fixture storage restriction", "SecurityError"); }
    });""")
    page = blocked.new_page()
    page.goto(url, wait_until="networkidle")
    expect(page.locator("#preference-note")).to_be_visible()
    page.get_by_label("Team names", exact=True).select_option("location")
    expect(page.locator("#picks-body tr")).to_have_count(73)
    expect(page.locator("#preference-note")).to_contain_text("cannot save")
    blocked.close()

    offline = browser.new_context()
    offline.route("**/results.json?*", lambda route: route.abort("failed"))
    page = offline.new_page()
    page.goto(url, wait_until="networkidle")
    expect(page.locator("#source-warning")).to_be_visible()
    expect(page.locator('[data-event-id="401872964"] .final-score')).to_have_text("Steelers 24 - Browns 27")
    offline.close()

    fixture = snapshot(*(game.event_id for game in GAMES[:3]), now=NOW + timedelta(days=3))
    fixture["games"][GAMES[0].event_id].update(awayScore=30, winnerTeamId="23", pickResult="correct", statusDetail="Final / OT")
    fixture["games"][GAMES[1].event_id].update(awayScore=30, winnerTeamId=GAMES[1].away_id, pickResult="correct")
    fixture["games"][GAMES[2].event_id].update(awayScore=21, homeScore=21, winnerTeamId=None, pickResult="tie", statusDetail="Final / OT")
    fixture["games"][GAMES[3].event_id].update(status="postponed", statusDetail="Postponed - awaiting a verified final", scheduledAt="2026-10-06T17:00:00Z")
    fixture["revision"] = nfl.digest({key: value for key, value in fixture.items() if key != "revision"})
    scenarios = browser.new_context()
    scenarios.route("**/results.json?*", lambda route: route.fulfill(json=fixture))
    page = scenarios.new_page()
    page.goto(url, wait_until="networkidle")
    expect(page.locator("#record-summary")).to_have_text("This view: 2 correct / 0 incorrect / 1 tied / 70 pending")
    page.get_by_label("Team names", exact=True).select_option("location")
    tied = page.locator(f'[data-event-id="{GAMES[2].event_id}"]')
    expect(tied.locator(".result-cell")).to_contain_text("Final / OT")
    expect(tied.locator(".verdict")).to_have_text("Pick: Tie")
    postponed = page.locator(f'[data-event-id="{GAMES[3].event_id}"]')
    expect(postponed.locator(".schedule-change")).to_contain_text("Original date retained.")
    expect(postponed.locator("time")).to_have_attribute("datetime", "2026-10-04")
    expect(page.locator('[data-event-id="401872964"] .pick-name')).to_have_text("Pittsburgh")
    assert page.locator("#games-data").text_content() == original
    scenarios.close()

    invalid = copy.deepcopy(fixture)
    invalid["games"][GAMES[0].event_id]["homeScore"] = None
    rejected = browser.new_context()
    rejected.route("**/results.json?*", lambda route: route.fulfill(json=invalid))
    page = rejected.new_page()
    page.goto(url, wait_until="networkidle")
    expect(page.locator("#source-warning")).to_be_visible()
    expect(page.locator('[data-event-id="401872964"] .final-score')).to_have_text("Steelers 24 - Browns 27")
    rejected.close()
    portable = browser.new_context(offline=True)
    page = portable.new_page()
    page.goto((ROOT / nfl.PAGE_PATH).as_uri(), wait_until="load")
    expect(page.locator("#picks-body tr")).to_have_count(73)
    expect(page.locator("#source-status")).to_contain_text("Offline snapshot")
    page.get_by_label("Team names", exact=True).select_option("location")
    expect(page.locator('[data-event-id="401872964"] .final-score')).to_have_text("Pittsburgh 24 - Cleveland 27")
    portable.close()
    print("PASS: original picks, current final, names, persistence, aliases, filters, all sorts, CSV, print, mobile, storage denial, offline/error retention, OT, ties, corrections, and rescheduling.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", help="Use a deployed page instead of the bounded local test server.")
    parser.add_argument("--artifacts", type=Path)
    args = parser.parse_args()
    if args.artifacts:
        args.artifacts.mkdir(parents=True, exist_ok=True)
    server = None
    thread = None
    if args.url:
        url = args.url
    else:
        server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Handler, directory=str(ROOT)))
        thread = Thread(target=server.serve_forever, daemon=True)
        thread.start()
        url = f"http://127.0.0.1:{server.server_port}{PAGE_URL_PATH}"
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            try:
                check(browser, url, args.artifacts)
            finally:
                browser.close()
    finally:
        if server:
            server.shutdown()
            server.server_close()
            thread.join()


if __name__ == "__main__":
    main()
