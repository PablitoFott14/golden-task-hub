"""Build the one page pre-submit gate PDF from the hub's own checklist.

    python scripts/build_presubmit_gate.py          # writes public/docs/presubmit-gate.pdf
    python scripts/build_presubmit_gate.py --png    # and a preview PNG in the temp folder

`src/data/checklist.ts` is the single source: the Pre-Submit pane renders it and
this prints it, so the page and the printable gate cannot disagree. Node loads
the file directly (type stripping, Node 22.18 or later, no node_modules), the
script lays it out as one Letter page of HTML, and headless Chrome prints it,
which is how the original Red Shell gate was made.

The page holds one Letter sheet by stepping the type scale down until the
content fits, two points at a time from 100%, and refuses to write below 80%:
a gate that needs smaller type than that has too many checks, and a new rule
should go into an existing check's wording instead. The scale it settled on is
printed, so a change that pushes it down is visible.

Needs: Node on PATH, Google Chrome (or CHROME pointing at it), PyMuPDF.
Runs from any directory; nothing under the project is written except the PDF.
"""
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src" / "data" / "checklist.ts"
OUT = ROOT / "public" / "docs" / "presubmit-gate.pdf"

CHROME_CANDIDATES = [
    os.environ.get("CHROME", ""),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "google-chrome",
    "chromium",
]

# The original gate's palette, read off its PDF.
INK = "#15171e"
NAVY = "#2e2d6b"
MUTED = "#767e90"
REF = "#5250a8"
TINT = "#ededf7"
RULE = "#e7eaf0"
OK_BG, OK_LINE = "#e8f2ec", "#1b6b45"
NO_BG, NO_LINE = "#fbedeb", "#a93122"


def load():
    """The checklist as JSON, straight from the TypeScript the hub ships."""
    script = (
        "const m = await import(process.argv[1]);"
        "process.stdout.write(JSON.stringify({ meta: m.checklistMeta, sections: m.checklist, count: m.checkCount() }));"
    )
    r = subprocess.run(
        ["node", "--input-type=module", "-e", script, SOURCE.as_uri()],
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if r.returncode != 0:
        sys.exit("node could not load checklist.ts:\n" + r.stderr)
    return json.loads(r.stdout)


def chrome():
    for c in CHROME_CANDIDATES:
        if not c:
            continue
        p = shutil.which(c) or (c if Path(c).exists() else None)
        if p:
            return p
    sys.exit("Chrome not found. Set CHROME to its path.")


def esc(s):
    return html.escape(s, quote=False)


def rich(s):
    """Plain text, with file extensions set in mono as the original gate did."""
    out = esc(s)
    return re.sub(r"(?<![\w/])((?:\.[a-z]{2,4})(?:/\.[a-z]{2,4})*)(?![\w])", r'<code>\1</code>', out)


def columns_of(pdf):
    """How far down each column's text reaches, in points, read off the PDF."""
    import pymupdf

    with pymupdf.open(pdf) as d:
        p = d[0]
        mid = p.rect.width / 2
        top = bottom = None
        low = [0.0, 0.0]
        for b in p.get_text("blocks"):
            x0, y0, x1, y1, text = b[:5]
            if "Ready to submit" in text or "Fix before submitting" in text:
                bottom = y0 if bottom is None else min(bottom, y0)
                continue
            if "Parameters and" in text or text.strip().startswith("1"):
                top = y0 if top is None else min(top, y0)
            col = 0 if x1 <= mid + 4 else 1
            if bottom is None or y1 < bottom:
                low[col] = max(low[col], y1)
        return low


def section_html(s):
    rows = []
    for c in s["checks"]:
        foot = rich(c["f"]) if c["f"] else ""
        ref = f'<span class="ref">{esc(c["ref"])}</span>' if c.get("ref") else ""
        rows.append(
            f"""<div class="check"><span class="box"></span><div class="body">
<p class="q"><span class="id">{esc(c["id"])}</span>{rich(c["q"])}</p>
<p class="f">{foot}{" " if foot and ref else ""}{ref}</p></div></div>"""
        )
    return f"""<section><h2><span class="n">{s["n"]}</span>{esc(s["title"])}</h2>{"".join(rows)}</section>"""


def page(data, scale, cut):
    meta = data["meta"]
    left, right = data["sections"][:cut], data["sections"][cut:]
    n = data["count"]
    last = data["sections"][-1]["n"]
    s = scale
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>{esc(meta["title"])}</title>
<style>
@page {{ size: Letter; margin: 0; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; padding: 0; }}
body {{ font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; color: {INK};
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
.sheet {{ width: 8.5in; min-height: 10.98in; padding: 0.4in 0.38in 0.34in;
  display: flex; flex-direction: column; }}
code, .mono {{ font-family: Consolas, "SF Mono", Menlo, monospace; }}
.mast {{ background: {NAVY}; color: #fff; border-radius: 3px; display: flex; align-items: center;
  padding: {16 * s}px {22 * s}px; gap: {18 * s}px; }}
.mast h1 {{ font-size: {27 * s}px; margin: 0; font-weight: 700; letter-spacing: -0.2px; white-space: nowrap; }}
.mast .sub {{ border-left: 1px solid rgba(255,255,255,.35); padding-left: {18 * s}px; font-size: {11 * s}px;
  line-height: 1.45; flex: 1; }}
.mast .sub b {{ font-weight: 700; }}
.mast .count {{ text-align: right; white-space: nowrap; }}
.mast .count .big {{ font-size: {23 * s}px; font-weight: 700; line-height: 1; display: block; }}
.mast .count .mono {{ font-size: {9.8 * s}px; letter-spacing: 1.2px; opacity: .92; }}
.banner {{ background: {TINT}; color: {NAVY}; margin-top: {8 * s}px; padding: {7 * s}px {16 * s}px;
  font-size: {10.8 * s}px; line-height: 1.45; border-radius: 2px; }}
.banner b {{ font-size: {10 * s}px; letter-spacing: .3px; margin-right: {6 * s}px; }}
.cols {{ display: grid; grid-template-columns: 1fr 1fr; column-gap: {14 * s}px; margin-top: {10 * s}px; flex: 1; }}
.col + .col {{ border-left: 1px solid {RULE}; padding-left: {14 * s}px; }}
section {{ margin-bottom: {6 * s}px; }}
h2 {{ font-size: {12.2 * s}px; font-weight: 600; margin: 0 0 {2 * s}px; padding-bottom: {2.5 * s}px;
  border-bottom: 1.2px solid {NAVY}; display: flex; align-items: baseline; gap: {9 * s}px; }}
h2 .n {{ color: {NAVY}; font-weight: 700; font-size: {13.4 * s}px; min-width: {8 * s}px; }}
.check {{ display: flex; gap: {7 * s}px; padding: {2.6 * s}px 0; border-bottom: 1px solid {RULE};
  break-inside: avoid; }}
.check:last-child {{ border-bottom: 0; }}
.box {{ flex: none; width: {11 * s}px; height: {11 * s}px; margin-top: {1.5 * s}px; border: 1px solid {MUTED};
  border-radius: 2px; background: #fff; }}
.body {{ min-width: 0; }}
.q {{ margin: 0; font-size: {9.5 * s}px; line-height: 1.3; }}
.q code {{ font-size: {9 * s}px; background: {TINT}; padding: 0 {2 * s}px; border-radius: 2px; }}
.id {{ font-family: Consolas, monospace; font-weight: 700; color: {NAVY}; background: {TINT};
  font-size: {8.6 * s}px; padding: {0.6 * s}px {3 * s}px; border-radius: 2px; margin-right: {4 * s}px; }}
.f {{ margin: {1.2 * s}px 0 0; font-size: {8.4 * s}px; line-height: 1.3; color: {MUTED}; }}
.f code {{ font-size: {8.1 * s}px; }}
.ref {{ font-family: Consolas, monospace; color: {REF}; font-size: {8.2 * s}px; white-space: nowrap; }}
.verdicts {{ display: grid; grid-template-columns: 1fr 1fr; gap: {12 * s}px; margin-top: {6 * s}px; }}
.verdict {{ display: flex; gap: {9 * s}px; padding: {7 * s}px {12 * s}px; border-radius: 2px; }}
.verdict .box {{ width: {13 * s}px; height: {13 * s}px; margin-top: {1 * s}px; }}
.verdict h3 {{ margin: 0; font-size: {11.4 * s}px; font-weight: 700; }}
.verdict p {{ margin: {2 * s}px 0 0; font-size: {9.2 * s}px; line-height: 1.4; color: #4a5265; }}
.ok {{ background: {OK_BG}; border: 1px solid {OK_LINE}; }}
.ok h3 {{ color: {OK_LINE}; }}
.no {{ background: {NO_BG}; border: 1px solid {NO_LINE}; }}
.no h3 {{ color: {NO_LINE}; }}
.foot {{ display: flex; justify-content: space-between; align-items: baseline; margin-top: {7 * s}px;
  padding-top: {6 * s}px; border-top: 1.4px solid {NAVY}; font-size: {10 * s}px; color: {MUTED}; }}
.foot .mono {{ color: {NAVY}; font-weight: 700; font-size: {10.4 * s}px; }}
</style></head>
<body><div class="sheet">
<header class="mast">
  <h1>{esc(meta["title"])}</h1>
  <div class="sub">OpenClaw MM Rubrics <b>SINGLE TURN</b> · Green Shell.<br>{esc(meta["subtitle"].replace("Run it once", "Run once"))}</div>
  <div class="count"><span class="big">{n}</span><span class="mono">CHECKS · {esc(meta["estimate"].upper())}</span></div>
</header>
<div class="banner"><b>NOT A REPLACEMENT FOR THE GUIDELINES.</b>Section refs point into
  <i>[External] Green Shell Guidelines</i>, which stays the source of truth. {esc(meta["banner"])}</div>
<div class="cols">
  <div class="col">{"".join(section_html(x) for x in left)}</div>
  <div class="col">{"".join(section_html(x) for x in right)}</div>
</div>
<div class="verdicts">
  <div class="verdict ok"><span class="box"></span><div><h3>{esc(meta["ready"]["title"])}</h3><p>{esc(meta["ready"]["body"])}</p></div></div>
  <div class="verdict no"><span class="box"></span><div><h3>{esc(meta["fix"]["title"])}</h3><p>{esc(meta["fix"]["body"])}</p></div></div>
</div>
<footer class="foot"><span>{esc(meta["title"])} · OpenClaw MM Rubrics SINGLE TURN · Green Shell</span>
  <span class="mono">Page 1 of 1 · sections 1 to {last}</span></footer>
</div></body></html>"""


def render(html_text, work, exe):
    src = work / "gate.html"
    dst = work / "gate.pdf"
    src.write_text(html_text, encoding="utf-8")
    if dst.exists():
        dst.unlink()
    subprocess.run(
        [
            exe,
            "--headless=new",
            "--disable-gpu",
            "--no-first-run",
            "--no-default-browser-check",
            f"--user-data-dir={work / 'profile'}",
            "--no-pdf-header-footer",
            "--print-to-pdf-no-header",
            "--run-all-compositor-stages-before-draw",
            "--virtual-time-budget=3000",
            f"--print-to-pdf={dst}",
            src.as_uri(),
        ],
        capture_output=True,
        timeout=120,
    )
    if not dst.exists():
        sys.exit("Chrome wrote no PDF.")
    return dst


def main():
    import pymupdf

    data = load()
    exe = chrome()
    with tempfile.TemporaryDirectory(prefix="gate-") as tmp:
        work = Path(tmp)
        # Sections stay whole and in order. The cut between the two columns is
        # the one whose taller column is shortest, measured on a small render
        # where everything fits, so the page is never held down by a lopsided
        # pair of columns.
        cuts = range(1, len(data["sections"]))
        heights = {k: max(columns_of(render(page(data, 0.7, k), work, exe))) for k in cuts}
        cut = min(cuts, key=lambda k: heights[k])
        scale = 1.0
        while True:
            pdf = render(page(data, scale, cut), work, exe)
            with pymupdf.open(pdf) as d:
                pages = d.page_count
            if pages == 1:
                break
            scale = round(scale - 0.02, 2)
            if scale < 0.80:
                sys.exit("The gate does not fit one page at 80%. Fold a rule into an existing check instead.")
        OUT.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(pdf, OUT)
        print(
            f"wrote {OUT.relative_to(ROOT)}: {data['count']} checks, sections 1 to {cut} on the left,"
            f" one page at {round(scale * 100)}%"
        )
        if "--png" in sys.argv:
            with pymupdf.open(OUT) as d:
                png = Path(tempfile.gettempdir()) / "presubmit-gate-preview.png"
                d[0].get_pixmap(dpi=130).save(png)
                print(f"preview {png}")


if __name__ == "__main__":
    main()
