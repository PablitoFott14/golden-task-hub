"""
Regenerate src/data/specDoc.ts from the deployed QC spec viewer.

The deployed page at https://qc-spec-mt-rubrics.vercel.app/ is the source of
truth. It is currently ahead of the CSV exports sitting on Drive, which are
missing "Milestones - Milestone Annotations", so parse the page rather than
the CSVs.

    curl -s https://qc-spec-mt-rubrics.vercel.app/ -o qcspec.html
    python scripts/gen_spec.py qcspec.html

Only `dimensionLinks` at the foot of the generated file is hand-authored, so
keep that block in sync here when a dimension is added or renamed.
"""

import html
import io
import os
import json
import re
import sys

SRC = sys.argv[1] if len(sys.argv) > 1 else "qcspec.html"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "data", "specDoc.ts")

page = open(SRC, encoding="utf-8").read()


def text(fragment: str) -> str:
    """Strip tags, unescape entities, normalise whitespace but keep newlines."""
    fragment = re.sub(r"<br\s*/?>", "\n", fragment)
    fragment = re.sub(r"<[^>]+>", "", fragment)
    fragment = html.unescape(fragment)
    fragment = re.sub(r"[ \t]+\n", "\n", fragment)
    fragment = re.sub(r"\n{3,}", "\n\n", fragment)
    return fragment.strip()


def ts(value) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


sections = re.findall(
    r'<section class="[^"]*" id="(sec-[^"]+)"><h2>(.*?)</h2>(.*?)</section>',
    page,
    re.S,
)
by_id = {sid: (text(title), body) for sid, title, body in sections}

# ------------------------------------------------------------------ questions

groups = []
for sid, (title, body) in by_id.items():
    if sid in ("sec-quality", "sec-weights", "sec-standards"):
        continue
    dimensions = []
    for art in re.findall(r'<article class="q"[^>]*data-kind="question">(.*?)</article>', body, re.S):
        full_name = text(re.search(r"<h3>(.*?)</h3>", art, re.S).group(1))
        name = full_name.split(" - ", 1)[1] if " - " in full_name else full_name
        question = text(re.search(r'<p class="qtext">(.*?)</p>', art, re.S).group(1))

        tags = []
        for raw in re.findall(r'<span class="tag">(.*?)</span>', art, re.S):
            brackets = re.findall(r"\[([^\]]+)\]", text(raw))
            if not brackets:
                continue
            label = brackets[-1].strip()
            tags.append({"label": label, "type": "fail" if label.lower().startswith("fail") else "non-fail"})

        desc_match = re.search(r'<div class="desc-body">(.*?)</div>', art, re.S)
        description = text(desc_match.group(1)) if desc_match else ""
        # the export leaves a bare leading full stop on a few questions
        description = re.sub(r"^\.\s*", "", description)

        options = []
        opts_block = art.split('<div class="opts">', 1)
        if len(opts_block) == 2:
            for piece in re.split(r'(?=<div class="opt )', opts_block[1]):
                score_m = re.search(r'data-score="(-?\d+)"', piece)
                body_m = re.search(r'<div class="opt-body">(.*?)</div>', piece, re.S)
                if score_m and body_m:
                    options.append({
                        "text": text(body_m.group(1)),
                        "score": int(score_m.group(1)),
                        "justify": 'class="just"' in piece,
                    })

        dimensions.append({
            "name": name,
            "question": question,
            "description": description,
            "errorTags": tags,
            "options": options,
        })
    if dimensions:
        groups.append({"group": title, "dimensions": dimensions})

# ------------------------------------------------------ appendix: rubric quality

quality_title, quality_body = by_id["sec-quality"]
quality_note = text(re.search(r'<p class="sec-note">(.*?)</p>', quality_body, re.S).group(1))
issues = []
for chunk in re.split(r'<h4 class="subhead[^"]*"[^>]*>', quality_body)[1:]:
    severity = text(chunk.split("</h4>")[0]).replace(" Issues", "").strip()
    for art in re.findall(r'<article class="q card"[^>]*>(.*?)</article>', chunk, re.S):
        heading = re.search(r"<h3>(.*?)</h3>", art, re.S).group(1)
        name = text(re.sub(r'<span class="badge[^>]*>.*?</span>', "", heading, flags=re.S))
        definition = text(re.search(r'<div class="blk-b">(.*?)</div>', art, re.S).group(1))
        issues.append({"name": name, "severity": severity, "definition": definition})

# ------------------------------------------------------------ appendix: weights

weights_title, weights_body = by_id["sec-weights"]
weights_note = text(re.search(r'<p class="sec-note">(.*?)</p>', weights_body, re.S).group(1))
difficulty, buckets = [], []
for art in re.findall(r'<article class="q card"[^>]*>(.*?)</article>', weights_body, re.S):
    heading = re.search(r"<h3>(.*?)</h3>", art, re.S).group(1)
    badge = re.search(r'<span class="badge wt[^"]*">(-?\d+)</span>', heading)
    level = text(re.sub(r'<span class="badge[^>]*>.*?</span>', "", heading, flags=re.S))
    blocks = re.findall(r'<div class="blk">(.*?)</div></div>', art + "</div>", re.S)
    parts = {}
    for blk in re.findall(r'<div class="blk">(.*?)(?=<div class="blk">|$)', art, re.S):
        head = re.search(r'<div class="blk-h">(.*?)</div>', blk, re.S)
        body_m = re.search(r'<div class="blk-b">(.*?)</div>', blk, re.S)
        if body_m:
            parts[text(head.group(1)) if head else ""] = text(body_m.group(1))
    if level == "4 Difficulty Dimensions":
        difficulty = [re.sub(r"^-\s*", "", x).strip() for x in parts.get("", "").split("\n") if x.strip()]
        continue
    if badge:
        buckets.append({
            "level": level,
            "score": int(badge.group(1)),
            "definition": parts.get("Definition (Agent-Building Context)", ""),
            "examples": [x.strip() for x in parts.get("Typical Examples", "").split("\n") if x.strip()],
        })

# ---------------------------------------------------------- appendix: standards

standards_title, standards_body = by_id["sec-standards"]
standards_note = text(re.search(r'<p class="sec-note">(.*?)</p>', standards_body, re.S).group(1))
standards = []
for art in re.findall(r'<article class="q card"[^>]*>(.*?)</article>', standards_body, re.S):
    name = text(re.search(r"<h3>(.*?)</h3>", art, re.S).group(1))
    body_m = re.search(r'<div class="blk-b">(.*?)</div>', art, re.S)
    standards.append({"name": name, "body": text(body_m.group(1)) if body_m else ""})

n_dims = sum(len(g["dimensions"]) for g in groups)
n_opts = sum(len(d["options"]) for g in groups for d in g["dimensions"])
sys.stderr.write(
    f"groups={len(groups)} dimensions={n_dims} options={n_opts} issues={len(issues)} "
    f"weights={len(buckets)} standards={len(standards)} difficulty={len(difficulty)}\n"
)
for g in groups:
    sys.stderr.write(f"  {g['group']}: {len(g['dimensions'])}\n")

out = io.StringIO()
out.write('''import type { XLink } from "./types";

/**
 * The Quality Control spec, transcribed from the deployed viewer at
 * https://qc-spec-mt-rubrics.vercel.app/, which is the source of truth and is
 * currently ahead of the CSV exports on Drive.
 *
 * Generated. Re-run when the spec sheet is re-exported and redeployed:
 *
 *   curl -s https://qc-spec-mt-rubrics.vercel.app/ -o qcspec.html
 *   python gen_spec.py qcspec.html
 *
 * Question text, guidance, option wording and definitions are verbatim, em
 * dashes and curly quotes included, because this is a transcription of the
 * standard rather than hub copy. Only `dimensionLinks` at the foot of the file
 * is hand-authored.
 */
export const SPEC_URL = "https://qc-spec-mt-rubrics.vercel.app/";

export interface SpecErrorTag {
  label: string;
  type: "fail" | "non-fail";
}

export interface SpecOption {
  text: string;
  score: number;
  /** Every Fail and Non-Fail selection carries a written justification. */
  justify: boolean;
}

export interface SpecDimension {
  name: string;
  question: string;
  description: string;
  errorTags: SpecErrorTag[];
  options: SpecOption[];
}

export interface SpecGroup {
  group: string;
  dimensions: SpecDimension[];
}

export type IssueSeverity = "Major" | "Moderate" | "Minor";

export interface RubricQualityIssue {
  name: string;
  severity: IssueSeverity;
  definition: string;
}

export interface WeightBucket {
  level: string;
  score: number;
  definition: string;
  examples: string[];
}

export interface AuthoringStandard {
  name: string;
  body: string;
}

''')
out.write("export const specGroups: SpecGroup[] = " + ts(groups) + ";\n\n")
out.write("export const rubricQualityNote = " + ts(quality_note) + ";\n\n")
out.write("export const rubricQualityIssues: RubricQualityIssue[] = " + ts(issues) + ";\n\n")
out.write("export const weightsNote = " + ts(weights_note) + ";\n\n")
out.write("export const difficultyDimensions: string[] = " + ts(difficulty) + ";\n\n")
out.write("export const weightBuckets: WeightBucket[] = " + ts(buckets) + ";\n\n")
out.write("export const standardsNote = " + ts(standards_note) + ";\n\n")
out.write("export const authoringStandards: AuthoringStandard[] = " + ts(standards) + ";\n\n")
out.write('''/**
 * Cross-links from a dimension into the rest of the hub, keyed by dimension
 * name. Hand-authored, and mirrored by links pointing back at
 * `/spec#<group-slug>` from the method, the checklist and the golden task.
 */
export const dimensionLinks: Record<string, XLink[]> = {
  "Architectural Depth & Friction Exposure": [
    { to: "/#failure", tag: "M5", label: "If the model sails through, the task is not ready" },
    { to: "/golden-tasks/vendor-closeout#traps", tag: "GT", label: "Seven designed friction points" },
  ],
  "Feasibility With Tools": [
    { to: "/checklist#s1", tag: "A2", label: "Confirm the loadout before you design" },
  ],
  "Genuine Media Inspection": [
    { to: "/#inputs", tag: "M2", label: "Take the attachments away" },
    { to: "/golden-tasks/vendor-closeout#inputs", tag: "GT", label: "Every input and the fact it carries" },
  ],
  Completeness: [
    { to: "/checklist#s7", tag: "G3", label: "Download the trajectories, star the preferred run" },
  ],
  "Artifact Verification": [
    { to: "/#rubrics", tag: "M6", label: "A grader with the prompt closed can still rate it" },
  ],
  "Turn Structure & Dependency": [
    { to: "/checklist#s3", tag: "C3", label: "Every follow up consumes the turn before it" },
    { to: "/golden-tasks/vendor-closeout#turns", tag: "GT", label: "What each of the four turns consumes" },
  ],
  "Simulator Answer Leak": [
    { to: "/#golden", tag: "M8", label: "Point at the intent, never at the answer" },
    { to: "/checklist#s3", tag: "C5", label: "Never flag the miss" },
  ],
  "Revision Turn Handling": [
    { to: "/checklist#s3", tag: "C4", label: "One turn changes the brief after delivery" },
    { to: "/golden-tasks/vendor-closeout#turns", tag: "GT", label: "Turn 4 is the revision turn" },
  ],
  "Intent-Level Abstraction": [
    { to: "/#milestones", tag: "M7", label: "One intent, one milestone" },
  ],
  "Artifact Completeness": [
    { to: "/checklist#s7", tag: "G2", label: "The golden passes the complete objective set" },
    { to: "/golden-tasks/vendor-closeout#golden", tag: "GT", label: "The golden deliverables" },
  ],
  "MM dependence": [
    { to: "/checklist#s2", tag: "B2", label: "Take the attachments away" },
    { to: "/#inputs", tag: "M2", label: "Attach what the person would actually have" },
  ],
  Realism: [
    { to: "/golden-tasks/vendor-closeout#inputs", tag: "GT", label: "Eleven files recovered in a rush" },
  ],
  Safety: [
    { to: "/checklist#s2", tag: "B3", label: "The hard rules for inputs" },
  ],
  "Deferred Asset Handling": [
    { to: "/checklist#s3", tag: "C4", label: "Name the deferred asset on the turn it enters scope" },
  ],
  "Overall Rubric Quality": [
    { to: "/checklist#s5", tag: "E1", label: "Walk the prompt once per turn" },
    { to: "/golden-tasks/vendor-closeout#rubrics", tag: "GT", label: "21 criteria that each pin their own value" },
  ],
  "Rubric Structure": [
    { to: "/checklist#s5", tag: "E6", label: "Every weight in the allowed set" },
  ],
  "Rubric Spot Checks": [
    { to: "/checklist#s5", tag: "E8", label: "One completeness criterion plus five spot checks" },
  ],
  "Subjective Block Scope": [
    { to: "/#subjective", tag: "M9", label: "Judge the render, nothing the prompt asked for" },
    { to: "/golden-tasks/vendor-closeout#subjective", tag: "GT", label: "Ten criteria from one comparison" },
  ],
};
''')
open(OUT, "w", encoding="utf-8", newline="").write(out.getvalue())
print("written", OUT)
