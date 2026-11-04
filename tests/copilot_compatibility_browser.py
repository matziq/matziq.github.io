"""Exercise every prepared redirect in Edge without contacting the new domain."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import sys
from threading import Thread
from urllib.parse import quote, urlsplit
from urllib.request import urlopen

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import copilot_compatibility as compatibility


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


def main():
    manifest = json.loads(compatibility.MANIFEST.read_text(encoding="utf-8"))
    server = ThreadingHTTPServer(
        ("127.0.0.1", 0), partial(QuietHandler, directory=str(compatibility.ROOT))
    )
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    origin = f"http://127.0.0.1:{server.server_port}/"
    suffix = "?topic=Data%20Handling&tag=a%2Fb&tag=c&next=https%3A%2F%2Fexample.com%2F#section%20one"
    redirects = 0
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(channel="msedge", headless=True)
            try:
                context = browser.new_context()
                context.route("https://copilotdocs.org/**", lambda route: route.fulfill(
                    status=200, content_type="text/html",
                    body="<!DOCTYPE html><html lang='en-US'><title>Canonical test destination</title><p>Destination</p></html>",
                ))
                page = context.new_page()
                for entry in manifest["main_site_entries"]:
                    if entry["kind"] != "page":
                        continue
                    path = entry["source_path"]
                    aliases = [path]
                    if path.endswith("/index.html"):
                        aliases.append(path.removesuffix("index.html"))
                    for alias in aliases:
                        page.goto(origin + quote(alias, safe="/") + suffix,
                                  wait_until="domcontentloaded")
                        expected = entry["new_url"] + suffix
                        page.wait_for_url(expected, wait_until="domcontentloaded")
                        assert page.url == expected, (alias, page.url, expected)
                        redirects += 1
                context.close()

                context = browser.new_context(java_script_enabled=False)
                context.route("https://copilotdocs.org/**", lambda route: route.fulfill(
                    status=200, content_type="text/html", body="<title>No-script destination</title>"
                ))
                page = context.new_page()
                page.goto(origin + "GH-300_exam_prep/" + suffix, wait_until="domcontentloaded")
                page.wait_for_url("https://copilotdocs.org/GH-300_exam_prep/**",
                                  wait_until="domcontentloaded")
                assert urlsplit(page.url).path == "/GH-300_exam_prep/"
                assert not urlsplit(page.url).query
                context.close()
            finally:
                browser.close()

        assets = 0
        for entry in manifest["main_site_entries"]:
            if entry["kind"] != "asset":
                continue
            path = entry["source_path"]
            with urlopen(origin + quote(path, safe="/"), timeout=10) as response:
                assert response.status == 200
                assert response.read() == (compatibility.ROOT / path).read_bytes(), path
            assets += 1
        print(f"Edge passed: {redirects} directory/explicit-page redirects preserve query/fragment; "
              f"no-JavaScript refresh works; {assets} retained asset URLs serve unchanged bytes.")
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


if __name__ == "__main__":
    main()
