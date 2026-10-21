#!/usr/bin/env python3
"""Regression tests: python3 scripts/test_render.py"""
import html, json, re, subprocess, sys, tempfile, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RENDER = ROOT / "scripts" / "render.py"


def render(data, *flags):
    with tempfile.TemporaryDirectory() as d:
        src, out = Path(d, "in.json"), Path(d, "out.html")
        src.write_text(json.dumps(data), encoding="utf-8")
        r = subprocess.run([sys.executable, str(RENDER), str(src), str(out), *flags],
                           capture_output=True, text=True)
        return r, (out.read_text(encoding="utf-8") if out.exists() else None)


def visible_text(page):
    page = page.split("<body>")[1]
    page = re.sub(r"<(style|nav)[^>]*>.*?</\1>|<caption>.*?</caption>", "", page, flags=re.S)
    page = page.replace("<sup>*</sup>", "*")
    return [t.strip() for t in html.unescape(re.sub(r"<[^>]+>", "|", page)).split("|") if t.strip()]


def sample():
    return json.loads((ROOT / "examples" / "sample-input.json").read_text(encoding="utf-8"))


class RenderTests(unittest.TestCase):
    def test_sample_renders(self):
        r, page = render(sample(), "--toc")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertIn('<th scope="col">', page)
        self.assertIn('class="toc"', page)

    def test_copilot_example_matches_original_text(self):
        data = json.loads((ROOT / "examples" / "copilot-adoption-catalog.json").read_text(encoding="utf-8"))
        r, page = render(data)
        self.assertEqual(r.returncode, 0, r.stdout)
        orig = (ROOT / "examples" / "copilot-adoption-catalog.html").read_text(encoding="utf-8-sig")
        self.assertEqual(visible_text(orig), visible_text(page))

    def test_escaping(self):
        d = sample(); d["activities"][1]["name"] = "R&D <script>x</script>"
        _, page = render(d)
        self.assertNotIn("<script>", page)
        self.assertIn("R&amp;D &lt;script&gt;", page)

    def test_allow_html_opt_in(self):
        d = sample(); d["allow_html"] = True; d["activities"][1]["name"] = "<b>Bold</b>"
        _, page = render(d)
        self.assertIn("<b>Bold</b>", page)

    def test_tag_and_section_notes_and_h3(self):
        d = sample(); d["sections"][0]["rows"][0][0] = "Quick Start {tag:New}"
        d["sections"][0]["notes"] = ["Section note"]; d["sections"][0]["level"] = 3
        _, page = render(d, "--toc")
        self.assertIn('<span class="tag">New</span>', page)
        self.assertIn('<p class="note">Section note</p>', page)
        self.assertIn("<h3 ", page)

    def test_validation_failures(self):
        for mutate in (
            lambda d: d["activities"][1].update(size="lots"),
            lambda d: d["activities"][1].update(length="soon"),
            lambda d: d["sections"][0].update(activity="Nope"),
            lambda d: d.update(notes=[]),
            lambda d: d["sections"][0]["rows"][0].pop(),
        ):
            d = sample(); mutate(d)
            r, page = render(d)
            self.assertEqual(r.returncode, 1)
            self.assertIsNone(page)

    def test_bad_color(self):
        r, _ = render(sample(), "--brand", "red")
        self.assertNotEqual(r.returncode, 0)


if __name__ == "__main__":
    unittest.main()
