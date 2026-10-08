"""
Regenerate src/data/specDoc.ts from the Green Shell spec exports.

    python scripts/gen_spec.py

Two CSVs beside this project, both exported from the spec sheet:

    <task-id>-V<n>_-_<revision>-rubric.csv   the scored dimensions
    appendix.csv                             the appendix sections

Superseded rubric exports are left in place rather than deleted, so the glob
can match several. The most recently written one wins and the generator prints
which file it read.

**This is not the Red Shell generator.** Red Shell carries its own copy, which
scrapes the deployed multi-turn viewer at <https://qc-spec-mt-rubrics.vercel.app/>.
That viewer serves the multi-turn spec and has nothing to say about Green Shell,
so this one reads the exports directly. The two projects therefore keep separate
specs, separate change logs and separate generators, and neither can overwrite
the other.

Everything the viewer displays is transcribed verbatim — question text,
guidance, option wording, definitions and examples, em dashes and curly quotes
included — because this is a transcription of the standard rather than hub copy.
The only hand-authored blocks are `SECTION_NOTES` and `DIMENSION_LINKS` below,
which are the hub's own framing and cross-links; they live here so a
regeneration cannot lose them.

What moved between revisions is recorded by hand in ../src/data/specLog.ts and
rendered as the Change Log pane on /spec.
"""

import csv
import glob
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "src", "data", "specDoc.ts")

RUBRIC_GLOB = os.path.join(ROOT, "*-rubric.csv")
APPENDIX = os.path.join(ROOT, "appendix.csv")

# Hub copy: the one line that sits above each appendix section, the way the
# page has always framed them. Not spec content.
SECTION_NOTES = {
    "quality": "Referenced by the three Overall Rubric Quality questions: these definitions supply the major / moderate tallies that drive those scores. Severity grouping is reproduced exactly as the source sheet has it.",
    "weights": "Weight reflects the difficulty of what the criterion tests, not its importance to the prompt. Allowed set: {-5, -3, -1, +1, +3, +5}.",
    "standards": "What the Subjective Block Scope question above is graded against, carried in the appendix under its own heading.",
}


def norm(s: str) -> str:
    """Trim and collapse runaway blank lines, keeping the author's own breaks."""
    s = (s or "").replace("\r\n", "\n").replace("\r", "\n")
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def ts(value) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def rows_of(path):
    with open(path, encoding="utf-8-sig", newline="") as fh:
        return [[norm(c) for c in r] + [""] * (4 - len(r)) for r in csv.reader(fh)]


# ------------------------------------------------------------------ dimensions

def read_dimensions():
    paths = glob.glob(RUBRIC_GLOB)
    if not paths:
        raise SystemExit("no *-rubric.csv beside the project: %s" % RUBRIC_GLOB)
    # Old exports are kept beside the new one, and their revision numbers do not
    # sort usefully past V9, so take the newest file rather than the first name.
    path = max(paths, key=os.path.getmtime)
    print("rubric     : %s" % os.path.basename(path))
    with open(path, encoding="utf-8-sig", newline="") as fh:
        rows = list(csv.DictReader(fh))

    groups, order, current = {}, [], None
    for r in rows:
        title = norm(r.get("title"))
        if title:
            # "Rubric Criteria - Rubric Spot Checks" -> group, then dimension.
            group, name = title.split(" - ", 1) if " - " in title else ("Ungrouped", title)

            tags = []
            for piece in norm(r.get("errorCategories")).split(";"):
                brackets = re.findall(r"\[([^\]]+)\]", piece)
                if not brackets:
                    continue
                label = brackets[-1].strip()
                tags.append({
                    "label": label,
                    "type": "fail" if label.lower().startswith("fail") else "non-fail",
                })

            current = {
                "name": name,
                "question": norm(r.get("questionText")),
                # The export leaves a bare leading full stop on a few questions.
                "description": re.sub(r"^\.\s*", "", norm(r.get("questionDescription"))),
                "errorTags": tags,
                "options": [],
            }
            if group not in groups:
                groups[group] = []
                order.append(group)
            groups[group].append(current)

        text = norm(r.get("answerOptionText"))
        if text and current is not None:
            score = norm(r.get("answerOptionScore"))
            current["options"].append({
                "text": text,
                "score": int(score) if re.fullmatch(r"-?\d+", score or "") else 0,
                "justify": norm(r.get("answerOptionRequiresJustification")).lower() == "true",
            })

    return [{"group": g, "dimensions": groups[g]} for g in order]


# -------------------------------------------------------------------- appendix

def split_sections(rows):
    """The appendix is one sheet of stacked sections, each headed in column A."""
    heads = [i for i, r in enumerate(rows) if r[0] and not r[1] and not r[2]]
    out = []
    for n, i in enumerate(heads):
        end = heads[n + 1] if n + 1 < len(heads) else len(rows)
        out.append((rows[i][0], [r for r in rows[i + 1:end] if any(r)]))
    return out


def read_appendix():
    sections = split_sections(rows_of(APPENDIX))
    issues, difficulty, buckets, deprecated, standards = [], [], [], [], []
    dep_label = ""

    for title, body in sections:
        head = title.split("\n", 1)[0].strip()

        if head == "Rubric Quality Definitions":
            severity = ""
            for r in body:
                if r[0]:
                    # "Major Issues" -> "Major", the severity the page groups by.
                    severity = r[0].replace(" Issues", "").strip()
                if r[1] and r[2]:
                    issues.append({"name": r[1], "severity": severity, "definition": r[2]})

        elif head == "Criteria Weight Definitions":
            target = buckets
            if len(title.split("\n", 1)) > 1:
                # The sheet keeps a superseded scale, labelled in its own heading.
                target, dep_label = deprecated, title.split("\n", 1)[1].strip()
            for r in body:
                if r[1] == "4 Difficulty Dimensions" or r[0] == "4 Difficulty Dimensions":
                    difficulty.extend(
                        re.sub(r"^-\s*", "", x).strip() for x in r[2].split("\n") if x.strip()
                    )
                    continue
                if r[0] in ("", "Level") or not re.fullmatch(r"-?\d+", r[1] or ""):
                    continue  # the column header row
                target.append({
                    "level": r[0],
                    "score": int(r[1]),
                    "definition": r[2],
                    # Examples are one per paragraph in a single cell.
                    "examples": [x.strip() for x in re.split(r"\n\s*\n", r[3]) if x.strip()],
                })

        elif head.endswith("Authoring Standards"):
            for r in body:
                if r[1] and r[2]:
                    standards.append({"name": r[1], "body": r[2]})

        else:
            print("  ! unrecognised appendix section, not transcribed: %r" % head)

    return issues, difficulty, buckets, deprecated, dep_label, standards


# ----------------------------------------------------------------------- links
# Hand-authored. Every `to` has to be a real anchor: method step ids in
# method.ts, checklist section ids (/reference#s1), change ids (/reference#...)
# and the
# golden task's own sections.
DIMENSION_LINKS = """export const dimensionLinks: Record<string, XLink[]> = {
  "Scenario Adherence": [
    { to: "/#parameters", tag: "M1", label: "The pair is the brief, not a label" },
    { to: "/reference#binding-parameters", tag: "WN", label: "Every assigned parameter is binding" },
  ],
  "Assigned Universe": [
    { to: "/#universe", tag: "M2", label: "Interrogate the universe before you design" },
  ],
  "MM Inputs": [
    { to: "/#inputs", tag: "M4", label: "Three is the floor, not the target" },
  ],
  "Output Artifact": [
    { to: "/reference#planned-complexity", tag: "WN", label: "The bar each deliverable has to clear" },
  ],
  "Minimum Multimodal Inputs": [
    { to: "/#inputs", tag: "M4", label: "An input set where each file earns its place" },
    { to: "/reference#input-floor", tag: "WN", label: "Three inputs is a floor, and it is enforced" },
  ],
  Realism: [
    { to: "/#inputs", tag: "M4", label: "What this person would really be holding" },
  ],
  Safety: [
    { to: "/reference#s2", tag: "B4", label: "Health inputs mocked or synthetic" },
  ],
  "Single-Turn Structure": [
    { to: "/reference#single-turn", tag: "WN", label: "One turn, and what that removes" },
    { to: "/#prompt", tag: "M5", label: "Everything lands in one prompt" },
  ],
  "Valid Model Failure": [
    { to: "/#failure", tag: "M7", label: "If the model sails through, the task is not ready" },
  ],
  "MM Dependence": [
    { to: "/#inputs", tag: "M4", label: "Take the attachments away and the prompt dies" },
  ],
  "Category Relevance": [
    { to: "/#parameters", tag: "M1", label: "Judged on the user's intent, not the files" },
    { to: "/reference#use-case-and-tools", tag: "WN", label: "Eleven use cases, sixty-eight subcategories" },
  ],
  "Domain Relevance": [
    { to: "/#universe", tag: "M2", label: "Grounded in what the universe actually holds" },
  ],
  "Overall Rubric Quality - 10%": [
    { to: "/#rubrics", tag: "M8", label: "A grader with the prompt closed can still rate it" },
  ],
  "Overall Rubric Quality - 15%": [
    { to: "/#rubrics", tag: "M8", label: "A grader with the prompt closed can still rate it" },
  ],
  "Overall Rubric Quality - 20%": [
    { to: "/#rubrics", tag: "M8", label: "A grader with the prompt closed can still rate it" },
  ],
  "80/20 Outcome Split (Process Over Cap)": [
    { to: "/reference#outcome-over-process", tag: "WN", label: "Eighty per cent outcome, and the cap that bites" },
    { to: "/#rubrics", tag: "M8", label: "Where the split is decided" },
  ],
  "Existence Check": [
    { to: "/reference#no-existence-checks", tag: "WN", label: "An existence check is an automatic fail" },
  ],
  "All Criteria Scoring": [
    { to: "/reference#literal-matching", tag: "WN", label: "Literal matching, and what it costs" },
  ],
  "Rubric Structure": [
    { to: "/#rubrics", tag: "M8", label: "One criterion, one observable outcome" },
  ],
  "Rubric Spot Checks": [
    { to: "/#rubrics", tag: "M8", label: "Spot checks, and the volume check beside them" },
  ],
  "Subjective Block Scope": [
    { to: "/#subjective", tag: "M10", label: "Presentation only, graded on the render" },
  ],
  "Artifact Verification": [
    { to: "/#rubrics", tag: "M8", label: "What a verifier can settle on its own" },
  ],
  "Artifact Completeness": [
    { to: "/#golden", tag: "M9", label: "Every artifact the prompt asked for" },
  ],
  "Hint Leak (Leg B)": [
    { to: "/#golden", tag: "M9", label: "Point at the intent, never at the answer" },
  ],
  "Feasibility With Tools": [
    { to: "/reference#s1", tag: "A2", label: "Confirm the loadout before you design" },
    { to: "/reference#assigned-tools", tag: "WN", label: "Assigned tools have to be named in the scenario" },
  ],
  "Architectural Depth & Friction Exposure": [
    { to: "/#failure", tag: "M7", label: "Designed friction, not artificial friction" },
  ],
  "Genuine Media Inspection": [
    { to: "/#inputs", tag: "M4", label: "Evidence the model has to actually read" },
  ],
  Completeness: [
    { to: "/reference#s7", tag: "G3", label: "Download the trajectories, star the preferred run" },
  ],
  "Golden/Preferred Run Selection": [
    { to: "/#golden", tag: "M9", label: "The run you file is part of the task" },
  ],
};
"""

# ----------------------------------------------------------------------- write

def main():
    groups = read_dimensions()
    issues, difficulty, buckets, deprecated, dep_label, standards = read_appendix()

    n_dims = sum(len(g["dimensions"]) for g in groups)
    print("dimensions : %d in %d groups" % (n_dims, len(groups)))
    for g in groups:
        print("   %-18s %d" % (g["group"], len(g["dimensions"])))
    print("appendix   : %d rubric quality issues, %d weight buckets (%d deprecated),"
          " %d difficulty dimensions, %d authoring standards"
          % (len(issues), len(buckets), len(deprecated), len(difficulty), len(standards)))

    named = set(re.findall(r'^ {2}"?([^"\n:]+?)"?: \[', DIMENSION_LINKS, re.M))
    actual = {d["name"] for g in groups for d in g["dimensions"]}
    for miss in sorted(named - actual):
        print("   ! dimensionLinks names a dimension the spec no longer has: %r" % miss)
    print("   %d of %d dimensions carry cross-links" % (len(named & actual), len(actual)))

    out = f'''import type {{ XLink }} from "./types";

/**
 * The Green Shell Quality Control spec.
 *
 * GENERATED by scripts/gen_spec.py from the two exports beside this project:
 * the `*-rubric.csv` scored dimensions and `appendix.csv`. Do not edit by hand
 * below this header — re-run the generator when either export is re-exported.
 *
 * Question text, guidance, option wording, definitions and examples are
 * verbatim, em dashes and curly quotes included, because this is a
 * transcription of the standard rather than hub copy. `dimensionLinks` at the
 * foot is the one hand-authored block and it is written by the generator, so
 * that is where an edit to it has to go.
 *
 * Red Shell keeps its own `specDoc.ts`, its own generator and its own
 * `specLog.ts`, all built from the multi-turn viewer. The two never meet.
 *
 * What moved between revisions is recorded in ./specLog.ts and rendered as the
 * Change Log pane on /spec.
 */

export interface SpecErrorTag {{
  label: string;
  type: "fail" | "non-fail";
}}

export interface SpecOption {{
  text: string;
  score: number;
  /** Every Fail and Non-Fail selection carries a written justification. */
  justify: boolean;
}}

export interface SpecDimension {{
  name: string;
  question: string;
  description: string;
  errorTags: SpecErrorTag[];
  options: SpecOption[];
}}

export interface SpecGroup {{
  group: string;
  dimensions: SpecDimension[];
}}

export type IssueSeverity = "Major" | "Moderate" | "Minor";

export interface RubricQualityIssue {{
  name: string;
  severity: IssueSeverity;
  definition: string;
}}

export interface WeightBucket {{
  level: string;
  score: number;
  definition: string;
  examples: string[];
}}

export interface AuthoringStandard {{
  name: string;
  body: string;
}}

export const specGroups: SpecGroup[] = {ts(groups)};

export const rubricQualityNote = {json.dumps(SECTION_NOTES["quality"], ensure_ascii=False)};

export const rubricQualityIssues: RubricQualityIssue[] = {ts(issues)};

export const weightsNote = {json.dumps(SECTION_NOTES["weights"], ensure_ascii=False)};

export const difficultyDimensions: string[] = {ts(difficulty)};

export const weightBuckets: WeightBucket[] = {ts(buckets)};

/**
 * A superseded scale the sheet still carries, under its own heading. Kept so
 * the appendix is represented in full, and labelled with the sheet's own words
 * so nobody grades against it by mistake.
 */
export const deprecatedWeightsLabel = {json.dumps(dep_label, ensure_ascii=False)};

export const deprecatedWeightBuckets: WeightBucket[] = {ts(deprecated)};

export const standardsNote = {json.dumps(SECTION_NOTES["standards"], ensure_ascii=False)};

export const authoringStandards: AuthoringStandard[] = {ts(standards)};

/**
 * Cross-links from a dimension into the rest of the hub, keyed by dimension
 * name. Hand-authored in scripts/gen_spec.py, and mirrored by links pointing
 * back at `/spec#<group-slug>` from the method, the gate and Must Read.
 */
{DIMENSION_LINKS}'''

    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(out)
    print("\nwrote %s — %.1f KB" % (OUT, os.path.getsize(OUT) / 1024))


if __name__ == "__main__":
    main()
