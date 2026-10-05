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
import nfl_common as common
import nfl_forecasts as forecasts


HISTORY = common.script_data(HTML, "history-data")
HISTORICAL_IDS = set(HISTORY["games"])
TOTAL_GAMES = len(GAMES) + len(HISTORICAL_IDS)


def team_count(team_id):
    return sum(team_id in (game.away_id, game.home_id) for game in GAMES) + sum(
        team_id in (game["awayTeamId"], game["homeTeamId"]) for game in HISTORY["games"].values()
    )


PAGE_URL_PATH = "/" + nfl.PAGE_PATH.as_posix()
ALLOWED_PATHS = {PAGE_URL_PATH, PAGE_URL_PATH.rsplit("/", 1)[0] + "/", *(
    PAGE_URL_PATH.rsplit("/", 1)[0] + "/" + filename for filename in ("results.json", "fixtures.json", "forecasts.json")
)}


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
    expect(rows).to_have_count(TOTAL_GAMES)
    expect(page.locator("#app-error")).to_be_hidden()
    expect(page.locator('meta[name="robots"]')).to_have_attribute("content", "noindex, nofollow, noarchive")
    expect(page.locator('meta[name="referrer"]')).to_have_attribute("content", "no-referrer")
    original = page.locator("#games-data").text_content()
    schedule = json.loads(page.locator("#fixtures-data").text_content())
    ledger = json.loads(page.locator("#forecasts-data").text_content())
    current_results = json.loads(page.locator("#results-data").text_content())
    assert nfl.digest(json.loads(original)) == nfl.PICKS_SHA256
    first = page.locator('[data-event-id="401872964"]')
    expect(first.locator(".pick-name")).to_have_text("Steelers")
    expect(first.locator(".final-score")).to_have_text("Steelers 24 - Browns 27")
    expect(first.locator(".verdict")).to_have_text("Pick: Incorrect")
    tally = {key: sum(result["pickResult"] == key for result in current_results["games"].values()) for key in ("correct", "incorrect", "tie", "pending")}
    expect(page.locator("#record-summary")).to_have_text(f"This view: {tally['correct']} correct / {tally['incorrect']} incorrect / {tally['tie']} tied / {tally['pending']} pending / 48 historical results excluded")
    graded = tally["correct"] + tally["incorrect"] + tally["tie"]
    expect(page.locator("#season-accuracy strong")).to_have_text(f"{int(tally['correct'] * 1000 / graded + 0.5) / 10:.1f}% correct")
    expect(page.locator("#season-accuracy")).to_contain_text(f"{tally['correct']} of {graded} graded picks")
    expect(first.locator(".pick-name")).to_have_class("pick-name pick-incorrect")
    expect(first.locator(".reason-cell")).to_have_class("reason-cell reason-incorrect")
    expect(first.locator(".reason-label")).to_have_text("\u2717 Why the pick was wrong")
    assert first.locator(".reason-cell").evaluate("node => getComputedStyle(node).color") == first.locator(".pick-name").evaluate(
        "node => getComputedStyle(node).color"), "Wrong-pick reasoning and box must share the red state color."
    expect(first.locator(".fantasy-leaders li")).to_have_count(3)
    expect(first.locator(".fantasy-title")).to_have_text("Top fantasy players (PPR)")
    for event_id, result in current_results["games"].items():
        row = page.locator(f'[data-event-id="{event_id}"]')
        if result["scoredPickTeamId"] is None:
            continue
        state = result["pickResult"] if result["status"] == "final" else "pending"
        expect(row.locator(".pick-name")).to_have_attribute("data-pick-state", state)
        if result["status"] != "final":
            expect(row.locator(".fantasy-leaders")).to_have_count(0)
            expect(row.locator(".reason-label")).to_have_count(0)
        elif state == "correct":
            expect(row.locator(".reason-cell")).to_have_class("reason-cell reason-correct")
            expect(row.locator(".reason-cell p")).to_have_text(result["pregameExplanation"])
    colors = {state: page.locator(f".pick-name.pick-{state}").first.evaluate("node => getComputedStyle(node).color")
              for state in ("pending", "correct", "incorrect")}
    assert len(set(colors.values())) == 3, colors
    assert colors["pending"] == "rgb(29, 78, 216)", colors

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
    expect(rows).to_have_count(team_count("20"))
    search.fill("Buffalo")
    assert rows.count() >= team_count("2")
    buffalo_matches = rows.count()
    names.select_option("mascot")
    expect(rows).to_have_count(buffalo_matches)
    search.fill("")
    page.get_by_label("Team", exact=True).select_option("6")
    names.select_option("location")
    expect(page.get_by_label("Team", exact=True)).to_have_value("6")
    expect(rows).to_have_count(team_count("6"))
    page.get_by_role("button", name="Original 73", exact=False).click()
    page.get_by_label("Week / round", exact=True).select_option("2:5")
    page.get_by_label("Day", exact=True).select_option("Thu")
    search.fill("Cowboys")
    expect(rows).to_have_count(1)
    expect(rows.locator(".pick-name")).to_have_text("Dallas")
    page.get_by_role("button", name="Reset view", exact=True).first.click()
    expect(rows).to_have_count(TOTAL_GAMES)
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
    expect(rows.first.locator(".actual-winner")).to_be_visible()
    page.locator('[data-sort="date"]').click()
    with page.expect_download() as download:
        page.get_by_role("button", name="Export CSV", exact=True).click()
    with tempfile.TemporaryDirectory() as directory:
        file = Path(directory) / "picks.csv"
        download.value.save_as(file)
        with file.open(encoding="utf-8-sig", newline="") as stream:
            exported = list(csv.DictReader(stream))
    assert len(exported) == TOTAL_GAMES
    final_row = next(row for row in exported if row["Date"] == "Oct 1, 2026")
    assert final_row["Teams"] == "Pittsburgh at Cleveland"
    assert final_row["Team Picked to Win"] == "Pittsburgh"
    assert final_row["Winner"] == "Cleveland" and final_row["Pick result"] == "incorrect"
    assert final_row["Final score"] == "Pittsburgh 24 - Cleveland 27"
    original_ids = {game.event_id for game in GAMES if game.original}
    for row in exported:
        if row["ESPN event ID"] not in HISTORICAL_IDS and current_results["games"][row["ESPN event ID"]]["scoredPickTeamId"] is not None:
            common.validate_paragraph(row["Why Picked"])
        else:
            assert row["Why Picked"] == ""
    for row in exported:
        if row["ESPN event ID"] in HISTORICAL_IDS:
            assert all(row[key] == "" for key in ("Why Picked", "Team Picked to Win", "Pick result",
                "Original or initial pick", "Original or initial reason", "Pick effective (UTC)", "Pick locked (UTC)", "Last assessment (UTC)", "Revision history", "Archived original wording"))
    exported_by_id = {row["ESPN event ID"]: row for row in exported}
    assert len(exported_by_id) == TOTAL_GAMES
    for game in GAMES:
        if game.original:
            assert exported_by_id[game.event_id]["Original or initial reason"] == ledger["paragraphs"][f"original-{game.event_id}"]
            assert exported_by_id[game.event_id]["Archived original wording"] == game.reason
    for event_id in ("401872964", "401872966", "401873037"):
        reason = page.locator(f'[data-event-id="{event_id}"] .reason-cell p')
        expect(reason).to_have_count(1)
        expect(reason).to_have_text(current_results["games"][event_id]["pickExplanation"])
        common.validate_paragraph(reason.inner_text())
    search.fill("drive efficiency")
    expect(first).to_be_visible()
    search.fill("")
    expect(first.locator(".explanation-status")).to_contain_text("postgame review")
    expect(first.locator(".reason-cell p")).to_contain_text("choice was wrong")
    for event_id in ("401872966", "401873037"):
        if current_results["games"][event_id]["status"] != "final":
            forecasts.validate_forecast_paragraph(page.locator(f'[data-event-id="{event_id}"] .reason-cell p').inner_text())
    assert final_row["Explanation phase"] == "incorrect-final"
    assert final_row["Pregame explanation"] == current_results["games"]["401872964"]["pregameExplanation"]
    assert "incorrect-final" in final_row["Explanation history"]
    assert all(row["Winner"] != "TBD" or row["Pick result"] == "pending" for row in exported)
    first.locator("summary").click()
    expect(first.locator(".pick-history")).to_contain_text("October 1 original: Pittsburgh")
    page.get_by_role("button", name="Playoffs", exact=False).click()
    expect(rows).to_have_count(13)
    expect(page.locator(".pick-name").first).to_have_text("TBD")
    expect(rows.locator(".reason-cell p")).to_have_count(0)
    page.get_by_label("Week / round", exact=True).select_option("3:4")
    expect(rows).to_have_count(1)
    expect(rows).to_contain_text("Feb 14, 2027")
    page.get_by_role("button", name="Reset view", exact=True).first.click()

    page.evaluate("document.documentElement.dataset.theme = 'dark'")
    page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    page.emulate_media(media="print")
    expect(page.locator("html")).to_have_attribute("data-theme", "light")
    expect(page.locator(".filters")).to_be_hidden()
    expect(first.locator(".final-score")).to_be_visible()
    expect(first.locator(".reason-cell p")).to_have_text(current_results["games"]["401872964"]["pickExplanation"])
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
    expect(rows).to_have_count(TOTAL_GAMES)
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
    expect(page.locator("#picks-body tr")).to_have_count(TOTAL_GAMES)
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
    fixture["fixtureRevision"] = schedule["revision"]
    fixture["forecastRevision"] = ledger["revision"]
    fixture["explanationFormat"] = "paragraph"
    fixture["explanationPolicy"] = "forecast-until-final"
    fixture["scorePolicy"] = "pregame-only"
    fixture["forecastPublications"] = {}
    forecasts.apply_pick_snapshots(GAMES, fixture["games"], ledger, NOW + timedelta(days=3))
    fixture["games"][GAMES[0].event_id].update(awayScore=30, winnerTeamId="23", pickResult="correct", statusDetail="Final / OT")
    fixture["games"][GAMES[1].event_id].update(awayScore=30, winnerTeamId=GAMES[1].away_id, pickResult="correct")
    fixture["games"][GAMES[2].event_id].update(awayScore=21, homeScore=21, winnerTeamId=None, pickResult="tie", statusDetail="Final / OT")
    fixture["games"][GAMES[3].event_id].update(status="postponed", statusDetail="Postponed - awaiting a verified final", scheduledAt="2026-10-06T17:00:00Z")
    forecasts.apply_pick_snapshots(GAMES, fixture["games"], ledger, NOW + timedelta(days=3))
    fixture["revision"] = nfl.digest({key: value for key, value in fixture.items() if key != "revision"})
    scenarios = browser.new_context()
    scenarios.route("**/results.json?*", lambda route: route.fulfill(json=fixture))
    page = scenarios.new_page()
    page.goto(url, wait_until="networkidle")
    expect(page.locator("#record-summary")).to_have_text(f"This view: 2 correct / 0 incorrect / 1 tied / {len(GAMES) - 3} pending / 48 historical results excluded")
    page.get_by_label("Team names", exact=True).select_option("location")
    tied = page.locator(f'[data-event-id="{GAMES[2].event_id}"]')
    expect(tied.locator(".result-cell")).to_contain_text("Final / OT")
    expect(tied.locator(".verdict")).to_have_text("Pick: Tie")
    postponed = page.locator(f'[data-event-id="{GAMES[3].event_id}"]')
    expect(postponed.locator(".schedule-change")).to_contain_text("Initial schedule retained.")
    expect(postponed.locator("time")).to_have_attribute("datetime", "2026-10-04")
    expect(page.locator('[data-event-id="401872964"] .pick-name')).to_have_text("Pittsburgh")
    expect(page.locator('[data-event-id="401872964"] .explanation-status')).to_have_text("Pregame explanation unchanged.")
    expect(page.locator('[data-event-id="401872964"] .reason-cell p')).to_have_text(fixture["games"]["401872964"]["pregameExplanation"])
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
    expect(page.locator("#picks-body tr")).to_have_count(TOTAL_GAMES)
    expect(page.locator("#source-status")).to_contain_text("Offline snapshot")
    page.get_by_label("Team names", exact=True).select_option("location")
    expect(page.locator('[data-event-id="401872964"] .final-score')).to_have_text("Pittsburgh 24 - Cleveland 27")
    portable.close()
    if ledger["assessments"]:
        changed = None
        audited = browser.new_context()
        page = audited.new_page()
        page.goto(url, wait_until="networkidle")
        for latest in reversed(ledger["assessments"]):
          for decision in latest["decisions"]:
            if decision["applied"] and decision["previousPickTeamId"] is not None and decision["pickTeamId"] != decision["previousPickTeamId"]:
                row = page.locator(f'[data-event-id="{decision["eventId"]}"]')
                row.locator("summary").click()
                expected_reason = ledger["paragraphs"].get(f'{latest["id"]}:{decision["eventId"]}', decision["reason"])
                expect(row.locator(".pick-history")).to_contain_text(expected_reason)
                assert row.locator(".pick-history a").count() >= 2
                common.validate_paragraph(row.locator(".reason-cell").inner_text())
                changed = decision
                break
          if changed:
            break
        assert changed, "The initial researched revisions were not present."
        expect(page.locator("#analysis-status")).to_contain_text("Last researched assessment")
        audited.close()
    print("PASS: original picks, current final, names, persistence, aliases, filters, all sorts, CSV, print, mobile, storage denial, offline/error retention, OT, ties, corrections, and rescheduling.")


def check_history_and_winners(browser, url, artifacts):
    context = browser.new_context(viewport={"width": 1440, "height": 1100}, accept_downloads=True)
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(url, wait_until="networkidle")
    away_winner = next(game for game in HISTORY["games"].values() if game["winnerTeamId"] == game["awayTeamId"])
    for theme in ("light", "dark"):
        page.evaluate("(theme) => { document.documentElement.dataset.theme = theme; }", theme)
        colors = page.evaluate("""() => {
          const probe = document.createElement("span");
          document.body.append(probe);
          const color = name => {
            probe.style.color = `var(${name})`;
            return getComputedStyle(probe).color;
          };
          const winner = color("--cp-success-text"), neutral = color("--cp-text");
          const luminance = value => {
            const channels = value.match(/[\\d.]+/g).slice(0, 3).map(Number).map(value => {
              value /= 255;
              return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
            });
            return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
          };
          const foreground = luminance(winner);
          const contrasts = ["--cp-bg", "--cp-surface", "--cp-bg-elevated"].map(name => {
            const background = luminance(color(name));
            return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
          });
          probe.remove();
          return {winner, neutral, contrasts};
        }""")
        assert min(colors["contrasts"]) >= 4.5, (theme, colors)
        for game in (HISTORY["games"]["401872656"], away_winner):
            row = page.locator(f'[data-event-id="{game["eventId"]}"]')
            winner_id = game["winnerTeamId"]
            loser_id = game["awayTeamId"] if winner_id == game["homeTeamId"] else game["homeTeamId"]
            winner = row.locator(f'.matchup-team[data-team-id="{winner_id}"]')
            loser = row.locator(f'.matchup-team[data-team-id="{loser_id}"]')
            expect(winner).to_have_css("color", colors["winner"])
            expect(loser).to_have_css("color", colors["neutral"])
            expect(loser).to_have_attribute("class", "matchup-team")
            expect(winner.locator(".winner-marker")).to_have_attribute("aria-hidden", "true")
            assert "\\u2605".encode().decode("unicode_escape") in winner.locator(".winner-marker").evaluate("node => getComputedStyle(node, '::after').content")
            expect(row.locator(".actual-winner")).to_have_css("color", colors["winner"])
            expect(row.locator(".pick-name")).to_have_count(0)
            expect(row.locator(".verdict")).to_have_count(0)
        expect(page.locator('[data-event-id="401872656"] .matchup-team[data-team-id="26"]')).to_have_text("Seahawks")
        expect(page.locator('[data-event-id="401872656"] .actual-winner')).to_have_text("Winner: Seahawks")
        expect(page.locator('[data-event-id="401872964"] .historical-winner')).to_have_count(0)
    page.evaluate("document.documentElement.dataset.theme = 'light'")
    options = page.locator("#week-filter option").all_text_contents()
    for label in ("Week 1 / History", "Week 2 / History", "Week 3 / History", "Week 18", "Super Bowl LXI"):
        assert label in options
    rows = page.locator("#picks-body tr")
    historical = page.locator("#picks-body .history-row")
    expect(historical).to_have_count(48)
    expect(historical.locator(".pick-name")).to_have_count(0)
    expect(historical.locator(".verdict")).to_have_count(0)
    assert all(not text.strip() for text in historical.locator(".reason-cell").all_text_contents())
    season_text = page.locator("#season-accuracy").text_content()
    page.locator('#week-nav [data-scope="history"]').click()
    expect(rows).to_have_count(48)
    expect(page.locator("#season-accuracy")).to_have_text(season_text)
    expect(page.locator("#record-summary")).to_have_text("48 historical results. No predictions or grading.")
    expect(page.locator('[data-sort="pick"]')).to_be_hidden()
    page.get_by_label("Week / round", exact=True).select_option("2:2")
    page.get_by_label("Game view", exact=True).select_option("winners")
    expect(rows).to_have_count(16)
    expect(page.locator("#winner-note")).to_contain_text("0 tied games excluded")
    expect(rows.locator(".verdict")).to_have_count(0)
    page.get_by_label("Team names", exact=True).select_option("location")
    page.locator('[data-sort="winner"]').click()
    assert page.evaluate("""() => {
      const values = [...document.querySelectorAll(".actual-winner")].map(node => node.textContent);
      const sorted = [...values].sort(new Intl.Collator("en-US", {numeric:true}).compare);
      return values.every((value, index) => value === sorted[index]);
    }""")
    page.get_by_label("Week / round", exact=True).select_option("2:1")
    page.get_by_label("Day", exact=True).select_option("Wed")
    page.get_by_label("Team", exact=True).select_option("17")
    page.get_by_label("Search games", exact=True).fill("Patriots")
    expect(rows).to_have_count(1)
    expect(rows.locator(".actual-winner")).to_have_text("Winner: Seattle")
    expect(rows.locator('.matchup-team[data-team-id="26"]')).to_have_attribute("class", "matchup-team historical-winner")
    expect(rows.locator('.matchup-team[data-team-id="17"]')).to_have_attribute("class", "matchup-team")
    expect(rows.locator(".actual-winner")).to_have_attribute("class", "actual-winner historical-winner")
    expect(rows.locator(".final-score")).to_have_text("New England 10 - Seattle 13")
    with page.expect_download() as download:
        page.get_by_role("button", name="Export CSV", exact=True).click()
    with tempfile.TemporaryDirectory() as directory:
        file = Path(directory) / "winners.csv"
        download.value.save_as(file)
        with file.open(encoding="utf-8-sig", newline="") as stream:
            reader = csv.DictReader(stream)
            exported = list(reader)
            assert not any("pick" in column.lower() or "reason" in column.lower() for column in reader.fieldnames)
    assert len(exported) == 1
    assert exported[0]["Winner"] == "Seattle"
    assert exported[0]["Date"] == "Sep 9, 2026"
    assert exported[0]["ESPN event ID"] == "401872656"
    page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    page.emulate_media(media="print")
    expect(page.locator('[data-sort="pick"]')).to_be_hidden()
    expect(rows.locator(".reason-cell")).to_be_hidden()
    expect(rows.locator(".actual-winner")).to_be_visible()
    expect(page.locator("#print-note")).to_contain_text("Winners only")
    page.emulate_media(media="screen")
    page.evaluate("window.dispatchEvent(new Event('afterprint'))")
    page.set_viewport_size({"width": 390, "height": 1000})
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
    expect(rows.locator(".actual-winner")).to_be_visible()
    expect(rows.locator(".pick-cell")).to_be_hidden()
    if artifacts:
        page.screenshot(path=str(artifacts / "nfl-historical-winner-mobile.png"), full_page=True)
    page.get_by_role("button", name="Reset view", exact=True).first.click()
    page.get_by_label("Week / round", exact=True).select_option("2:4")
    page.get_by_label("Game view", exact=True).select_option("winners")
    week_four = [game.event_id for game in GAMES if game.season_type == 2 and game.week == 4]
    live = json.loads(page.locator("#results-data").text_content())["games"]
    expect(rows).to_have_count(sum(live[event_id]["status"] == "final" and live[event_id]["winnerTeamId"] is not None for event_id in week_four))
    expect(page.locator('[data-event-id="401872964"] .actual-winner')).to_have_text("Winner: Cleveland")
    expect(page.locator('[data-event-id="401872964"] .fantasy-leaders li')).to_have_count(3)
    expect(rows.locator(".pick-name")).to_have_count(0)
    page.get_by_label("Week / round", exact=True).select_option("2:5")
    expect(rows).to_have_count(0)
    expect(page.locator("#empty-state")).to_be_visible()
    expect(page.get_by_role("button", name="Export CSV", exact=True)).to_be_disabled()
    assert not errors, errors
    context.close()

    modified = copy.deepcopy(HISTORY)
    week_one = [item for item in modified["games"].values() if item["week"] == 1]
    week_one[0].update(awayScore=20, homeScore=20, winnerTeamId=None)
    week_one[1].update(status="canceled", statusDetail="Canceled - no final result", awayScore=None, homeScore=None, winnerTeamId=None)
    common.seal(modified)
    altered_html = common.replace_data(HTML, "history-data", modified)
    fixture = browser.new_context()
    fixture.route(url, lambda route: route.fulfill(body=altered_html, content_type="text/html"))
    page = fixture.new_page()
    page.goto(url, wait_until="networkidle")
    page.get_by_label("Week / round", exact=True).select_option("2:1")
    expect(page.locator("#picks-body tr")).to_have_count(16)
    expect(page.locator(f'[data-event-id="{week_one[0]["eventId"]}"] .actual-winner')).to_have_text("Tie / no winner")
    expect(page.locator(f'[data-event-id="{week_one[0]["eventId"]}"] .historical-winner')).to_have_count(0)
    expect(page.locator(f'[data-event-id="{week_one[1]["eventId"]}"] .historical-winner')).to_have_count(0)
    page.get_by_label("Game view", exact=True).select_option("winners")
    expect(page.locator("#picks-body tr")).to_have_count(14)
    expect(page.locator("#winner-note")).to_contain_text("1 tied game excluded")
    expect(page.locator(f'[data-event-id="{week_one[0]["eventId"]}"]')).to_have_count(0)
    expect(page.locator(f'[data-event-id="{week_one[1]["eventId"]}"]')).to_have_count(0)
    fixture.close()
    print("PASS: all 48 historical games, zero retrospective picks/grades, weekly winners, tie/canceled exclusions, names/search/team/day/sort, pick-free CSV/print, and mobile.")


def check_score_projections(browser, url):
    context = browser.new_context(viewport={"width": 1440, "height": 1100}, accept_downloads=True)
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(url, wait_until="networkidle")
    current = json.loads(page.locator("#results-data").text_content())["games"]
    names = {value[0]: {"mascot": mascot, "location": value[1]} for mascot, value in common.script_data(HTML, "catalog-data")["teams"].items()}
    by_id = {game.event_id: game for game in GAMES}

    def text(score, mode="mascot"):
        return f"{names[score['awayTeamId']][mode]} {score['awayScore']} - {names[score['homeTeamId']][mode]} {score['homeScore']}"

    projected = [event_id for event_id, result in current.items() if result["projectedScore"]]
    upcoming = [event_id for event_id in projected if current[event_id]["status"] == "scheduled" and not current[event_id]["pickLockedAt"]]
    away_id = next(event_id for event_id in upcoming if current[event_id]["scoredPickTeamId"] == current[event_id]["awayTeamId"])
    home_id = next(event_id for event_id in upcoming if current[event_id]["scoredPickTeamId"] == current[event_id]["homeTeamId"])
    away_score, home_score = current[away_id]["projectedScore"], current[home_id]["projectedScore"]
    expect(page.locator("#picks-body .projected-score")).to_have_count(len(projected))
    expect(page.locator(".history-row .projected-score")).to_have_count(0)
    final = page.locator('[data-event-id="401872964"]')
    expect(final.locator(".projected-score")).to_have_count(0)
    expect(final.locator(".projected-score-unavailable")).to_have_text("No score forecast was recorded before kickoff.")
    expect(final.locator(".final-score")).to_have_text("Steelers 24 - Browns 27")
    away = page.locator(f'[data-event-id="{away_id}"]')
    home = page.locator(f'[data-event-id="{home_id}"]')
    expect(away.locator(".projected-score")).to_have_text(text(away_score))
    expect(home.locator(".projected-score")).to_have_text(text(home_score))
    assert away_score["awayScore"] > away_score["homeScore"] and home_score["homeScore"] > home_score["awayScore"]
    expect(away.locator(".projected-score-label")).to_have_text("Predicted final (away - home)")
    expect(away.locator(".final-score")).to_have_count(0)
    expect(away.locator(".pick-name")).to_have_attribute("data-pick-state", "pending")
    expect(home.locator(".pick-name")).to_have_text(names[current[home_id]["homeTeamId"]]["mascot"])
    away.locator("summary").click()
    expect(away.locator(".score-history").filter(has_text=text(away_score))).not_to_have_count(0)
    page.get_by_label("Team names", exact=True).select_option("location")
    expect(away.locator(".projected-score")).to_have_text(text(away_score, "location"))
    expect(home.locator(".projected-score")).to_have_text(text(home_score, "location"))
    page.get_by_label("Game view", exact=True).select_option("projections")
    expect(page.locator("#picks-body tr")).to_have_count(len(projected))
    expect(page.locator(".history-row")).to_have_count(0)
    expect(final).to_have_count(0)
    game = by_id[home_id]
    page.get_by_label("Week / round", exact=True).select_option(f"{game.season_type}:{game.week}")
    expect(page.locator("#picks-body tr")).to_have_count(sum(
        by_id[event_id].season_type == game.season_type and by_id[event_id].week == game.week for event_id in projected))
    page.get_by_label("Team", exact=True).select_option(current[home_id]["homeTeamId"])
    page.get_by_label("Search games", exact=True).fill(f"{names[home_score['homeTeamId']]['location']} {home_score['homeScore']}")
    expect(home).to_be_visible()
    with page.expect_download() as download:
        page.get_by_role("button", name="Export CSV", exact=True).click()
    with tempfile.TemporaryDirectory() as directory:
        file = Path(directory) / "projected-scores.csv"
        download.value.save_as(file)
        with file.open(encoding="utf-8-sig", newline="") as stream:
            exported = list(csv.DictReader(stream))
    row = next(item for item in exported if item["ESPN event ID"] == home_id)
    assert (row["Projected away team"], row["Projected away points"], row["Projected home team"], row["Projected home points"]) == (
        names[home_score["awayTeamId"]]["location"], str(home_score["awayScore"]), names[home_score["homeTeamId"]]["location"], str(home_score["homeScore"]),
    )
    assert row["Predicted final score"] == text(home_score, "location")
    assert row["Final score"] == "" and row["Pick result"] == "pending" and row["Pick box color"] == "Blue (current)"
    assert row["Top fantasy players (PPR)"] == ""
    assert row["Score forecast status"] == "available" and row["Score forecast dated (UTC)"]
    assert row["Score forecast locked (UTC)"] == ""
    page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    page.emulate_media(media="print")
    expect(home.locator(".projected-score")).to_be_visible()
    expect(page.locator("#print-note")).to_contain_text("Score forecasts")
    page.emulate_media(media="screen")
    page.evaluate("window.dispatchEvent(new Event('afterprint'))")
    page.set_viewport_size({"width": 390, "height": 1000})
    expect(home.locator(".projected-score")).to_be_visible()
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
    page.get_by_role("button", name="Reset view", exact=True).first.click()
    page.get_by_label("Game view", exact=True).select_option("winners")
    expect(page.locator("#picks-body .projected-score")).to_have_count(0)
    with page.expect_download() as download:
        page.get_by_role("button", name="Export CSV", exact=True).click()
    with tempfile.TemporaryDirectory() as directory:
        file = Path(directory) / "winners.csv"
        download.value.save_as(file)
        with file.open(encoding="utf-8-sig", newline="") as stream:
            columns = next(csv.reader(stream))
    assert not any("project" in column.lower() or "predict" in column.lower() for column in columns)
    page.get_by_role("button", name="Reset view", exact=True).first.click()
    page.locator('#week-nav [data-scope="playoffs"]').click()
    expect(page.locator("#picks-body .projected-score")).to_have_count(0)
    expect(page.locator("#picks-body .projected-score-unavailable")).to_have_count(0)
    assert not errors, errors
    context.close()

    invalid = copy.deepcopy(common.script_data(HTML, "results-data"))
    score = invalid["games"][away_id]["projectedScore"]
    score["awayScore"], score["homeScore"] = score["homeScore"], score["awayScore"]
    common.seal(invalid)
    rejected = browser.new_context()
    rejected.route("**/results.json?*", lambda route: route.fulfill(json=invalid))
    page = rejected.new_page()
    page.goto(url, wait_until="networkidle")
    expect(page.locator("#source-warning")).to_be_visible()
    expect(page.locator(f'[data-event-id="{away_id}"] .projected-score')).to_have_text(text(away_score))
    rejected.close()
    print(f"PASS: {len(projected)} score projections, away/home winner mapping, blue pending boxes, no retrospective score, naming/search/filter/CSV/print/mobile, history/TBD/winner-view exclusion, and invalid-score retention.")


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
                check_history_and_winners(browser, url, args.artifacts)
                check_score_projections(browser, url)
            finally:
                browser.close()
    finally:
        if server:
            server.shutdown()
            server.server_close()
            thread.join()


if __name__ == "__main__":
    main()
