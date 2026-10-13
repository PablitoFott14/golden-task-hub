"""Keep `presubmit-gate.md` and `src/data/checklist.ts` saying the same thing.

    python scripts/gate_md.py export   # checklist.ts -> presubmit-gate.md
    python scripts/gate_md.py sync     # presubmit-gate.md -> checklist.ts
    python scripts/gate_md.py check    # fail if the two disagree

`presubmit-gate.md` is the hand-editable copy of the gate. Edit it, run `sync`,
then reprint the PDF with `build_presubmit_gate.py`: the pane, the PDF and the
Markdown all come off `checklist.ts`, so the Markdown is the only one that can
drift, and `check` is what catches it.

**Ids are positional and are recomputed on every sync.** Section n and id come
from the order of the `##` headings, and a check's letter comes from its
section while its number comes from its place in it. So moving a section in the
Markdown renumbers it and everything in it, which is the point: the gate is read
in order and A1 has to be the first check of the first section.

That also means a reorder silently repoints every `tag` in the rest of the hub,
so `sync` prints the ids that moved, and `check` verifies that every inbound
`/reference#sN` link in `src/` still names a check that exists in that section.
Fix the links it lists; nothing else will tell you.

Needs: Node on PATH (22.18 or later, for type stripping). No node_modules.
"""
import io
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TS = ROOT / "src" / "data" / "checklist.ts"
MD = ROOT / "presubmit-gate.md"
SRC = ROOT / "src"

# `checklist.ts` writes these as `${GT}#x`; the Markdown carries the resolved
# path, and sync puts the constant back so the file keeps its own idiom.
GT = "/golden-tasks/charge-disputes"

HEADER = """<!--
  The editable copy of the pre-submit gate.

  Edit this file, then run, from `Green Shell/`:
      python scripts/gate_md.py sync            # write it into src/data/checklist.ts
      python scripts/build_presubmit_gate.py    # reprint public/docs/presubmit-gate.pdf

  `python scripts/gate_md.py check` fails if this file and checklist.ts disagree,
  and `export` regenerates this file from checklist.ts if the code moved first.

  The headings and the **Field:** names are the format. Change the text after
  them, add or remove `###` checks and `##` sections, reorder them freely. Do not
  renumber by hand: section numbers and check ids are recomputed from the order
  on sync, and sync prints anything that moved so the links elsewhere in the hub
  can follow it. A value may wrap over as many lines as you like.
-->"""

META_FIELDS = [
    ("subtitle", "Subtitle"),
    ("estimate", "Estimate"),
    ("warning", "Warning"),
    ("banner", "Banner"),
    ("pdf", "PDF"),
]
NESTED_META = [("ready", "Ready"), ("fix", "Fix")]
LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


# --------------------------------------------------------------- reading the TS

def load_ts():
    """The gate as plain data, straight from the TypeScript the hub ships."""
    script = (
        "const m = await import(process.argv[1]);"
        "process.stdout.write(JSON.stringify({ meta: m.checklistMeta, sections: m.checklist }));"
    )
    r = subprocess.run(
        ["node", "--input-type=module", "-e", script, TS.as_uri()],
        capture_output=True, text=True, encoding="utf-8",
    )
    if r.returncode != 0:
        sys.exit("node could not load checklist.ts:\n" + r.stderr)
    return json.loads(r.stdout)


# ------------------------------------------------------------------- rendering

def to_md(data):
    meta, out = data["meta"], [f"# {data['meta']['title']}", "", HEADER, "", "## Masthead", ""]
    for key, label in META_FIELDS:
        out.append(f"**{label}:** {meta[key]}")
        out.append("")
    for key, label in NESTED_META:
        out.append(f"**{label} title:** {meta[key]['title']}")
        out.append("")
        out.append(f"**{label} body:** {meta[key]['body']}")
        out.append("")
    for sec in data["sections"]:
        out += [f"## {sec['n']}. {sec['title']}", "", f"**Prompt:** {sec['prompt']}", ""]
        for c in sec["checks"]:
            out += [f"### {c['id']}", "", f"**Q:** {c['q']}", "", f"**Fix:** {c['f']}", ""]
            if c.get("ref"):
                out += [f"**Ref:** {c['ref']}", ""]
            if c.get("links"):
                out.append("**Links:**")
                for l in c["links"]:
                    tag = l.get("tag", "")
                    out.append(f"- `{tag}` {l['label']} -> {l['to']}")
                out.append("")
    return "\n".join(out).rstrip("\n") + "\n"


def js(value):
    """A TypeScript double-quoted string. JSON escaping is valid TS escaping."""
    return json.dumps(value, ensure_ascii=False)


def ts_link(l):
    to = l["to"]
    to_src = f"`${{GT}}{to[len(GT):]}`" if to.startswith(GT) else js(to)
    tag = f'tag: {js(l["tag"])}, ' if l.get("tag") else ""
    return "{ to: %s, %slabel: %s }" % (to_src, tag, js(l["label"]))


def field(indent, key, value):
    """`key: "value",` on one line, always.

    The array is rewritten whole on every sync, so the layout has to be a
    function of the content alone. Wrapping long strings by hand, the way this
    file was first written, would reflow a different set of lines each time and
    bury the real change in the diff.
    """
    return [f"{indent}{key}: {js(value)},"]


def to_ts(data, source):
    """Splice the meta object and the checklist array back into checklist.ts."""
    meta = data["meta"]
    m = ["export const checklistMeta = {", f'  title: {js(meta["title"])},']
    for key, _ in META_FIELDS:
        m += field("  ", key, meta[key])
    for key, _ in NESTED_META:
        m.append(f"  {key}: {{")
        m += field("    ", "title", meta[key]["title"])
        m += field("    ", "body", meta[key]["body"])
        m.append("  },")
    m.append("};")

    c = ["export const checklist: ChecklistSection[] = ["]
    for sec in data["sections"]:
        c += ["  {", f"    n: {sec['n']},", f"    id: {js(sec['id'])},"]
        c += field("    ", "title", sec["title"])
        c += field("    ", "prompt", sec["prompt"])
        c.append("    checks: [")
        for ch in sec["checks"]:
            c += ["      {", f"        id: {js(ch['id'])},"]
            c += field("        ", "q", ch["q"])
            c += field("        ", "f", ch["f"])
            if ch.get("ref"):
                c += field("        ", "ref", ch["ref"])
            if ch.get("links"):
                rendered = [ts_link(l) for l in ch["links"]]
                one = f"        links: [{', '.join(rendered)}],"
                if len(one) <= 100:
                    c.append(one)
                else:
                    c.append("        links: [")
                    c += [f"          {r}," for r in rendered]
                    c.append("        ],")
            c.append("      },")
        c += ["    ],", "  },"]
    c.append("];")

    for block, start, end in (
        ("\n".join(m), "export const checklistMeta = {", "\n};"),
        ("\n".join(c), "export const checklist: ChecklistSection[] = [", "\n];"),
    ):
        i = source.index(start)
        j = source.index(end, i) + len(end)
        source = source[:i] + block + source[j:]
    return source


# --------------------------------------------------------------------- parsing

FIELD = re.compile(r"^\*\*([A-Za-z ]+):\*\*\s*(.*)$")


def parse_md(text):
    """Markdown back to the same structure, strict about the shape."""
    meta, sections, errors = {"ready": {}, "fix": {}}, [], []
    label_to_key = {label: key for key, label in META_FIELDS}
    sec = check = None
    field_name = None           # where loose continuation lines go
    buf = []

    def flush():
        nonlocal field_name, buf
        if field_name is None:
            return
        value = " ".join(x.strip() for x in buf if x.strip()).strip()
        target, key = field_name
        target[key] = value
        field_name, buf = None, []

    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line, n = lines[i], i + 1
        i += 1
        if line.startswith("<!--"):                      # skip the header comment
            while i < len(lines) and "-->" not in lines[i - 1]:
                i += 1
            continue
        if not line.strip():
            continue
        if line.startswith("# "):
            flush()
            meta["title"] = line[2:].strip()
            continue
        if line.startswith("## "):
            flush()
            title = line[3:].strip()
            if title == "Masthead":
                sec = check = None
                continue
            m = re.match(r"^\d+\.\s*(.+)$", title)
            if not m:
                errors.append(f"line {n}: section heading needs a number, got {title!r}")
                continue
            sec = {"title": m.group(1).strip(), "checks": []}
            sections.append(sec)
            check = None
            continue
        if line.startswith("### "):
            flush()
            if sec is None:
                errors.append(f"line {n}: check {line[4:].strip()!r} sits outside a section")
                continue
            check = {"id": line[4:].strip(), "links": []}
            sec["checks"].append(check)
            continue
        if line.startswith("- `") or line.startswith("- ["):
            flush()
            m = re.match(r"^-\s*`([^`]*)`\s*(.+?)\s*->\s*(\S+)$", line)
            if not m or check is None:
                errors.append(f"line {n}: cannot read link {line.strip()!r}")
                continue
            link = {"to": m.group(3), "label": m.group(2)}
            if m.group(1):
                link["tag"] = m.group(1)
            check["links"].append(link)
            continue
        m = FIELD.match(line)
        if m:
            flush()
            label, rest = m.group(1).strip(), m.group(2)
            if label == "Links":
                continue                                  # the items carry it
            if label in label_to_key:
                field_name = (meta, label_to_key[label])
            elif label in ("Ready title", "Ready body", "Fix title", "Fix body"):
                outer, inner = label.split(" ")
                field_name = (meta[outer.lower()], inner)
            elif label == "Prompt":
                if sec is None:
                    errors.append(f"line {n}: Prompt outside a section")
                    continue
                field_name = (sec, "prompt")
            elif label in ("Q", "Fix", "Ref"):
                if check is None:
                    errors.append(f"line {n}: {label} outside a check")
                    continue
                field_name = (check, {"Q": "q", "Fix": "f", "Ref": "ref"}[label])
            else:
                errors.append(f"line {n}: unknown field {label!r}")
                continue
            buf = [rest]
            continue
        if field_name is not None:
            buf.append(line)                              # a wrapped value
            continue
        errors.append(f"line {n}: cannot place {line.strip()[:60]!r}")
    flush()

    for s in sections:
        for c in s["checks"]:
            if not c["links"]:
                del c["links"]
    if errors:
        sys.exit("presubmit-gate.md does not parse:\n  " + "\n  ".join(errors))
    return {"meta": meta, "sections": sections}


def renumber(data):
    """Ids come from position. Returns the ones that moved, old -> new."""
    moved = {}
    for si, sec in enumerate(data["sections"]):
        sec["n"] = si + 1
        sec["id"] = f"s{si + 1}"
        for ci, check in enumerate(sec["checks"]):
            want = f"{LETTERS[si]}{ci + 1}"
            if check.get("id") and check["id"] != want:
                moved[check["id"]] = want
            check["id"] = want
    return moved


# -------------------------------------------------------------------- checking

def inbound_link_problems(data):
    """Every `/reference#sN` link in src/ whose tag is not a check in sN."""
    checks = {s["id"]: {c["id"] for c in s["checks"]} for s in data["sections"]}
    out = []
    pattern = re.compile(r'to:\s*"/reference#(s\d+)",\s*tag:\s*"([A-Z]\d+)"')
    for path in sorted(SRC.rglob("*.ts")) + sorted(SRC.rglob("*.tsx")):
        for n, line in enumerate(io.open(path, encoding="utf-8"), 1):
            for sec, tag in pattern.findall(line):
                if tag not in checks.get(sec, set()):
                    where = path.relative_to(ROOT).as_posix()
                    out.append(f"{where}:{n}: /reference#{sec} is tagged {tag}, which is not in it")
    return out


def differences(a, b):
    """A readable list of what the TypeScript and the Markdown disagree on."""
    out = []
    for key in sorted(set(a["meta"]) | set(b["meta"])):
        if a["meta"].get(key) != b["meta"].get(key):
            out.append(f"meta.{key} differs")
    if len(a["sections"]) != len(b["sections"]):
        out.append(f"{len(a['sections'])} sections in the code, {len(b['sections'])} in the Markdown")
        return out
    for x, y in zip(a["sections"], b["sections"]):
        for key in ("n", "id", "title", "prompt"):
            if x.get(key) != y.get(key):
                out.append(f"{x.get('id')}: {key} differs")
        if len(x["checks"]) != len(y["checks"]):
            out.append(f"{x.get('id')}: {len(x['checks'])} checks in the code, {len(y['checks'])} in the Markdown")
            continue
        for p, q in zip(x["checks"], y["checks"]):
            for key in ("id", "q", "f", "ref"):
                if p.get(key) != q.get(key):
                    out.append(f"{p.get('id')}: {key} differs")
            if p.get("links", []) != q.get("links", []):
                out.append(f"{p.get('id')}: links differ")
    return out


# ------------------------------------------------------------------------ main

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode == "export":
        data = load_ts()
        MD.write_text(to_md(data), encoding="utf-8", newline="\n")
        n = sum(len(s["checks"]) for s in data["sections"])
        print(f"wrote {MD.relative_to(ROOT)}: {len(data['sections'])} sections, {n} checks")
        return

    if mode == "sync":
        data = parse_md(MD.read_text(encoding="utf-8"))
        moved = renumber(data)
        TS.write_text(to_ts(data, TS.read_text(encoding="utf-8")), encoding="utf-8", newline="\n")
        n = sum(len(s["checks"]) for s in data["sections"])
        print(f"wrote {TS.relative_to(ROOT)}: {len(data['sections'])} sections, {n} checks")
        if moved:
            print("ids moved: " + ", ".join(f"{k} -> {v}" for k, v in sorted(moved.items())))
        problems = inbound_link_problems(data)
        if problems:
            print("\nlinks in src/ that no longer point at the check they name:")
            print("  " + "\n  ".join(problems))
            sys.exit(1)
        print("reprint the PDF: python scripts/build_presubmit_gate.py")
        return

    if mode == "check":
        if not MD.exists():
            sys.exit(f"{MD.relative_to(ROOT)} does not exist. Run: python scripts/gate_md.py export")
        code = load_ts()
        md = parse_md(MD.read_text(encoding="utf-8"))
        renumber(md)
        problems = differences(code, md) + inbound_link_problems(code)
        if problems:
            sys.exit("the gate and its Markdown disagree:\n  " + "\n  ".join(problems))
        n = sum(len(s["checks"]) for s in code["sections"])
        print(f"in step: {len(code['sections'])} sections, {n} checks, every inbound tag resolves")
        return

    sys.exit(__doc__)


if __name__ == "__main__":
    main()
