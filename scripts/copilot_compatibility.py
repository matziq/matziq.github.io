"""Generate fixed Copilot redirects from the approved canonical migration manifest."""

import argparse
import hashlib
import html
import json
from pathlib import Path, PurePosixPath
import subprocess
from urllib.parse import quote


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts" / "copilot-compatibility.json"
ORIGIN = "https://copilotdocs.org/"


def source_bytes(sha, path):
    return subprocess.check_output(["git", "show", f"{sha}:{path}"], cwd=ROOT)


def blob_oid(path, content):
    # Apply Git's clean filters so Windows checkout line endings are not edits.
    return subprocess.check_output(
        ["git", "hash-object", f"--path={path}", "--stdin"], input=content, cwd=ROOT
    ).decode("ascii").strip()


def destination(path):
    route = path.removesuffix("index.html") if path.endswith("/index.html") else path
    return ORIGIN + quote(route, safe="/")


def render_redirect(target):
    escaped = html.escape(target, quote=True)
    return f"""<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Moved &mdash; Copilot documentation</title>
<link rel="canonical" href="{escaped}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url={escaped}">
<script>
  (function () {{
    var target = {json.dumps(target)};
    location.replace(target + window.location.search + window.location.hash);
  }})();
</script>
<style>
  body{{margin:0;min-height:100vh;box-sizing:border-box;display:grid;place-items:center;
       font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
       background:#f3f0e6;color:#0f2d45;padding:2rem;text-align:center}}
  main{{max-width:42rem;overflow-wrap:anywhere}}
  a{{color:#14557d}}
  h1{{font-size:1.4rem;margin:0 0 .75rem}}
  p{{margin:.75rem 0}}
  @media (prefers-color-scheme:dark){{body{{background:#071b2b;color:#f2efe6}}a{{color:#82c7ec}}}}
</style>
</head>
<body>
  <main>
    <h1>This page has moved</h1>
    <p>Copilot documentation now has its own home.</p>
    <p><a href="{escaped}">Continue to this page on copilotdocs.org</a></p>
    <p><small>Redirecting you automatically&hellip;</small></p>
  </main>
</body>
</html>
"""


def validate_manifest(manifest):
    paths = set()
    for entry in manifest["main_site_entries"]:
        path = entry["source_path"]
        relative = PurePosixPath(path)
        if (
            relative.is_absolute() or ".." in relative.parts or "\\" in path
            or ":" in path or path in paths
        ):
            raise ValueError(f"Unsafe or duplicate path: {path}")
        paths.add(path)
        if not any(path == candidate or path.startswith(candidate + "/")
                   for candidate in manifest["main_site"]["candidates"]):
            raise ValueError(f"Path outside approved scope: {path}")
        if entry["kind"] not in ("page", "asset"):
            raise ValueError(f"Unsupported entry kind: {path}")
        if entry["new_url"] != destination(path):
            raise ValueError(f"Destination differs from approved root mapping: {path}")
        if entry["old_url"] != entry["new_url"].replace(ORIGIN, "https://memconfigmgr.org/", 1):
            raise ValueError(f"Unexpected old URL: {path}")
    if len(paths) != manifest["main_site"]["file_count"]:
        raise ValueError("Manifest count does not match entries")
    if manifest.get("collisions"):
        raise ValueError("Resolve canonical collisions before generating redirects")


def import_manifest(path):
    approved = json.loads(path.read_text(encoding="utf-8-sig"))
    manifest = {key: approved[key] for key in
                ("main_site", "training", "collisions", "main_site_entries")}
    validate_manifest(manifest)
    for entry in manifest["main_site_entries"]:
        original = source_bytes(manifest["main_site"]["source_sha"], entry["source_path"])
        entry["source_sha256"] = hashlib.sha256(original).hexdigest()
        entry["source_clean_blob"] = blob_oid(entry["source_path"], original)
    return manifest


def generate(manifest, check=False):
    validate_manifest(manifest)
    pending = []
    for entry in manifest["main_site_entries"]:
        path = ROOT.joinpath(*PurePosixPath(entry["source_path"]).parts)
        current = path.read_bytes()
        original_blob = entry["source_clean_blob"]
        if entry["kind"] == "asset":
            if blob_oid(entry["source_path"], current) != original_blob:
                raise ValueError(f"Retained asset changed: {entry['source_path']}")
            continue
        expected = render_redirect(entry["new_url"]).encode("utf-8")
        if current.replace(b"\r\n", b"\n") == expected:
            continue
        if check:
            raise ValueError(f"Redirect differs from manifest: {entry['source_path']}")
        if blob_oid(entry["source_path"], current) != original_blob:
            raise ValueError(f"Refusing to overwrite modified source: {entry['source_path']}")
        pending.append((path, expected))
    for path, content in pending:
        path.write_bytes(content)
    pages = sum(entry["kind"] == "page" for entry in manifest["main_site_entries"])
    print(f"{'Verified' if check else 'Generated'} {pages} redirects; "
          f"{len(manifest['main_site_entries']) - pages} retained assets unchanged.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", type=Path, help="Import the approved canonical manifest")
    parser.add_argument("--check", action="store_true", help="Verify without writing files")
    args = parser.parse_args()
    if args.manifest and args.check:
        parser.error("--manifest and --check cannot be combined")
    manifest = (import_manifest(args.manifest) if args.manifest else
                json.loads(MANIFEST.read_text(encoding="utf-8")))
    generate(manifest, args.check)
    if args.manifest:
        MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
