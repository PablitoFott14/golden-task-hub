"""
Check that src/data/specDoc.ts still carries the spec exports in full.

    python scripts/check_spec.py

Re-parses both CSVs independently of gen_spec.py and asserts that every
dimension, every answer option with its score and justification flag, every
rubric quality definition, every weight bucket with its examples, every
difficulty dimension and every authoring standard is present in the generated
file and **byte-identical** to the source cell.

It exists because the transcription is the product here: the spec doc is only
worth reading if it is the standard rather than a summary of it. Run it after
every `gen_spec.py`, and after any hand edit to `specDoc.ts` that was not
supposed to change content.

Exits non-zero on the first mismatch so it can gate a commit.
"""

import csv
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS = os.path.join(ROOT, "src", "data", "specDoc.ts")


def norm(s):
    s = (s or "").replace("\r\n", "\n").replace("\r", "\n")
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def block(ts, name):
    """The JSON literal assigned to `export const <name>`."""
    i = ts.index("export const %s" % name)
    s = ts[ts.index("=", i) + 1:]
    s = s[s.index("["):]
    depth, out = 0, []
    for ch in s:
        out.append(ch)
        if ch in "[{":
            depth += 1
        elif ch in "]}":
            depth -= 1
            if depth == 0:
                break
    return json.loads("".join(out))


def rows_of(path):
    with open(path, encoding="utf-8-sig", newline="") as fh:
        return [[norm(c) for c in r] + [""] * (4 - len(r)) for r in csv.reader(fh)]


def main():
    ts = open(TS, encoding="utf-8").read()
    groups = block(ts, "specGroups")
    issues = block(ts, "rubricQualityIssues")
    buckets = block(ts, "weightBuckets")
    deprecated = block(ts, "deprecatedWeightBuckets")
    standards = block(ts, "authoringStandards")
    difficulty = block(ts, "difficultyDimensions")
    fails = []

    # ---------------------------------------------------------- the dimensions
    rubric = sorted(glob.glob(os.path.join(ROOT, "*-rubric.csv")))
    if not rubric:
        sys.exit("no *-rubric.csv beside the project, nothing to check against")
    with open(rubric[0], encoding="utf-8-sig", newline="") as fh:
        rows = list(csv.DictReader(fh))

    flat = {"%s - %s" % (g["group"], d["name"]): d for g in groups for d in g["dimensions"]}
    n_dims = n_opts = 0
    current = None
    for r in rows:
        title = norm(r.get("title"))
        if title:
            current, n_dims = title, n_dims + 1
            d = flat.get(title)
            if not d:
                fails.append("dimension missing: %s" % title)
                continue
            if d["question"] != norm(r.get("questionText")):
                fails.append("question text differs: %s" % title)
            if d["description"] != re.sub(r"^\.\s*", "", norm(r.get("questionDescription"))):
                fails.append("guidance differs: %s" % title)
        text = norm(r.get("answerOptionText"))
        if text:
            n_opts += 1
            d = flat.get(current or "")
            if not d:
                continue
            hit = [o for o in d["options"] if o["text"] == text]
            if not hit:
                fails.append("option missing under %s: %r" % (current, text[:60]))
                continue
            if str(hit[0]["score"]) != norm(r.get("answerOptionScore")):
                fails.append("option score differs under %s" % current)
            if hit[0]["justify"] != (norm(r.get("answerOptionRequiresJustification")).lower() == "true"):
                fails.append("option justification flag differs under %s" % current)

    if n_dims != len(flat):
        fails.append("dimension count: csv %d, specDoc %d" % (n_dims, len(flat)))

    # ------------------------------------------------------------ the appendix
    ap = rows_of(os.path.join(ROOT, "appendix.csv"))
    heads = [i for i, r in enumerate(ap) if r[0] and not r[1] and not r[2]]
    sections = []
    for n, i in enumerate(heads):
        end = heads[n + 1] if n + 1 < len(heads) else len(ap)
        sections.append((ap[i][0], [r for r in ap[i + 1:end] if any(r)]))

    by_issue = {x["name"]: x for x in issues}
    by_bucket = {(x["level"], x["score"]): x for x in buckets}
    by_dep = {(x["level"], x["score"]): x for x in deprecated}
    by_std = {x["name"]: x for x in standards}
    seen = {"issues": 0, "buckets": 0, "deprecated": 0, "standards": 0, "difficulty": 0}

    for title, body in sections:
        head = title.split("\n", 1)[0].strip()
        if head == "Rubric Quality Definitions":
            for r in body:
                if r[1] and r[2]:
                    seen["issues"] += 1
                    it = by_issue.get(r[1])
                    if not it:
                        fails.append("rubric quality issue missing: %s" % r[1])
                    elif it["definition"] != r[2]:
                        fails.append("rubric quality definition differs: %s" % r[1])
        elif head == "Criteria Weight Definitions":
            is_dep = "\n" in title
            table, key = (by_dep, "deprecated") if is_dep else (by_bucket, "buckets")
            for r in body:
                if "4 Difficulty Dimensions" in (r[0], r[1]):
                    want = [re.sub(r"^-\s*", "", x).strip() for x in r[2].split("\n") if x.strip()]
                    seen["difficulty"] = len(want)
                    if want != difficulty:
                        fails.append("difficulty dimensions differ")
                    continue
                if r[0] in ("", "Level") or not re.fullmatch(r"-?\d+", r[1] or ""):
                    continue
                seen[key] += 1
                b = table.get((r[0], int(r[1])))
                if not b:
                    fails.append("weight bucket missing%s: %s (%s)" % (" [deprecated]" if is_dep else "", r[0], r[1]))
                    continue
                if b["definition"] != r[2]:
                    fails.append("weight definition differs: %s" % r[0])
                want = [x.strip() for x in re.split(r"\n\s*\n", r[3]) if x.strip()]
                if b["examples"] != want:
                    fails.append("weight examples differ: %s" % r[0])
        elif head.endswith("Authoring Standards"):
            for r in body:
                if r[1] and r[2]:
                    seen["standards"] += 1
                    st = by_std.get(r[1])
                    if not st:
                        fails.append("authoring standard missing: %s" % r[1])
                    elif st["body"] != r[2]:
                        fails.append("authoring standard body differs: %s" % r[1])
        else:
            fails.append("appendix section not transcribed at all: %r" % head)

    print("dimensions  csv %3d  specDoc %3d" % (n_dims, len(flat)))
    print("options     csv %3d  specDoc %3d" % (n_opts, sum(len(d["options"]) for d in flat.values())))
    print("issues      csv %3d  specDoc %3d" % (seen["issues"], len(issues)))
    print("weights     csv %3d  specDoc %3d   deprecated csv %d  specDoc %d"
          % (seen["buckets"], len(buckets), seen["deprecated"], len(deprecated)))
    print("difficulty  csv %3d  specDoc %3d" % (seen["difficulty"], len(difficulty)))
    print("standards   csv %3d  specDoc %3d" % (seen["standards"], len(standards)))
    print("appendix sections seen: %s" % ", ".join(t.split("\n")[0] for t, _ in sections))

    if fails:
        print("\n%d MISMATCH(ES):" % len(fails))
        for f in fails:
            print("  -", f)
        sys.exit(1)
    print("\nevery dimension, option, definition and example is present and byte-identical to the CSVs")


if __name__ == "__main__":
    main()
