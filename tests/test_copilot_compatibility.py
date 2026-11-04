import copy
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import copilot_compatibility as compatibility


ROOT = compatibility.ROOT


class Metadata(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.tags = []
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


class CopilotCompatibilityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.manifest = json.loads(compatibility.MANIFEST.read_text(encoding="utf-8"))
        cls.entries = cls.manifest["main_site_entries"]
        cls.source = cls.manifest["main_site"]["source_sha"]

    def test_exact_manifest_coverage_and_no_project_shadow(self):
        compatibility.validate_manifest(self.manifest)
        self.assertEqual(len(self.entries), 53)
        self.assertEqual(sum(e["kind"] == "page" for e in self.entries), 25)
        self.assertEqual(sum(e["kind"] == "asset" for e in self.entries), 28)
        tracked = subprocess.check_output(
            ["git", "ls-tree", "-r", "--name-only", self.source, "--",
             *self.manifest["main_site"]["candidates"]], cwd=ROOT, text=True
        ).splitlines()
        self.assertEqual(set(tracked), {e["source_path"] for e in self.entries})
        self.assertFalse((ROOT / "copilot-training-docs").exists())

    def test_all_redirects_match_fixed_destinations_and_metadata(self):
        for entry in self.entries:
            if entry["kind"] != "page":
                continue
            with self.subTest(path=entry["source_path"]):
                content = (ROOT / entry["source_path"]).read_text(encoding="utf-8")
                target = entry["new_url"]
                self.assertEqual(content, compatibility.render_redirect(target))
                tags = Metadata(content).tags
                self.assertIn(("link", {"rel": "canonical", "href": target}), tags)
                self.assertIn(("meta", {"http-equiv": "refresh", "content": "0; url=" + target}), tags)
                self.assertIn(("meta", {"name": "robots", "content": "noindex, follow"}), tags)
                self.assertIn(("a", {"href": target}), tags)
                self.assertIn("location.replace(target + window.location.search + window.location.hash)", content)
                self.assertNotIn("location.pathname", content)

    def test_retained_assets_and_shared_favicons_match_source_blobs(self):
        for entry in self.entries:
            original = compatibility.source_bytes(self.source, entry["source_path"])
            self.assertEqual(hashlib.sha256(original).hexdigest(), entry["source_sha256"])
            if entry["kind"] == "asset":
                with self.subTest(path=entry["source_path"]):
                    self.assertEqual(
                        compatibility.blob_oid(entry["source_path"], (ROOT / entry["source_path"]).read_bytes()),
                        entry["source_clean_blob"],
                    )
        for path in ("images/favicon-agent-builder-026192ae.svg",
                     "images/favicon-mac-copilot-session-q7m4v8.svg"):
            self.assertEqual(
                compatibility.blob_oid(path, (ROOT / path).read_bytes()),
                compatibility.blob_oid(path, compatibility.source_bytes(self.source, path)),
            )

    def test_only_approved_existing_files_changed(self):
        baseline = subprocess.check_output(
            ["git", "log", "--diff-filter=A", "--format=%P", "-1", "--",
             "scripts/copilot-compatibility.json"], cwd=ROOT, text=True
        ).strip() or self.source
        changed = subprocess.check_output(
            ["git", "diff", "--name-only", baseline, "--"], cwd=ROOT, text=True
        ).splitlines()
        allowed = {e["source_path"] for e in self.entries if e["kind"] == "page"}
        allowed.update(("apps/index.html", "iomenu.html", "README.md",
                        "scripts/copilot_compatibility.py", "scripts/copilot-compatibility.json",
                        "tests/test_copilot_compatibility.py", "tests/copilot_compatibility_browser.py"))
        self.assertFalse(set(changed) - allowed)
        self.assertEqual((ROOT / "CNAME").read_text().strip(), "memconfigmgr.org")

    def test_navigation_changes_only_existing_public_destinations(self):
        replacements = {
            "apps/index.html": {
                "https://memconfigmgr.org/copilot-training-docs/": "https://copilotdocs.org/",
                "https://memconfigmgr.org/GH-300_exam_prep/": "https://copilotdocs.org/GH-300_exam_prep/",
            },
            "iomenu.html": {
                "matziq.github.io/copilot-training-docs/": "copilotdocs.org/",
                "memconfigmgr.org/GH-300_exam_prep/": "copilotdocs.org/GH-300_exam_prep/",
            },
        }
        for path, mapping in replacements.items():
            original = compatibility.source_bytes(self.source, path).decode("utf-8")
            for old, new in mapping.items():
                original = original.replace(old, new)
            self.assertEqual((ROOT / path).read_text(encoding="utf-8"), original)

    def test_encoded_paths_and_case_are_preserved(self):
        self.assertEqual(compatibility.destination("Case Sensitive/Guide #1.html"),
                         "https://copilotdocs.org/Case%20Sensitive/Guide%20%231.html")
        self.assertEqual(compatibility.destination("GH-300_exam_prep/index.html"),
                         "https://copilotdocs.org/GH-300_exam_prep/")

    def test_unsafe_and_unapproved_destinations_are_rejected(self):
        for field, value in (("source_path", "../index.html"),
                             ("source_path", "AI-900_exam_prep/index.html"),
                             ("new_url", "https://example.com/"),
                             ("kind", "unknown")):
            manifest = copy.deepcopy(self.manifest)
            manifest["main_site_entries"][0][field] = value
            with self.subTest(field=field, value=value), self.assertRaises(ValueError):
                compatibility.validate_manifest(manifest)


if __name__ == "__main__":
    unittest.main()
