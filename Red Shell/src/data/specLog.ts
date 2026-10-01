/**
 * What moved in the QC spec, revision by revision.
 *
 * Hand-authored, and deliberately kept out of [specDoc.ts](./specDoc.ts): that
 * file is generated from the spec export and anything written into it is lost
 * on the next regeneration. Every entry here is derived by diffing the new
 * export against the one the hub was carrying, so an entry exists only where
 * the standard actually changed.
 *
 * The summaries are hub copy. Where a line quotes the spec it is quoted
 * verbatim, because the wording is the thing that changed.
 */

/** What part of a dimension the revision touched. */
export type SpecChangeKind = "added" | "options" | "guidance" | "wording";

export interface SpecChange {
  /** The group the dimension sits under, matching the rail. */
  group: string;
  /**
   * The dimension, named exactly as specDoc.ts names it. The entry's link is
   * derived from this string, so a typo here is a link that goes nowhere and a
   * dimension renamed in the spec has to be renamed here too.
   */
  dimension: string;
  kind: SpecChangeKind;
  /** What moved, in one line. */
  summary: string;
  /** What it says now, and what that changes for an author. */
  detail: string;
}

export interface SpecRevision {
  id: string;
  /** The date the export carries. */
  date: string;
  /** The revision named in one line, the way the banner heads it. */
  title: string;
  /** The revision as a whole, in a sentence. */
  note: string;
  changes: SpecChange[];
}

/** Sits above the entries, the way every appendix section carries a note. */
export const specLogNote =
  "Only changes that alter what a reviewer scores or an author writes. Every entry links to the dimension it changed, so the current wording is one click away.";

/** Newest first. */
export const specRevisions: SpecRevision[] = [
  {
    id: "2026-09-20",
    date: "Sep 20, 2026",
    title: "A new scoring dimension, split failures, and narrowed guidance",
    note: "Seven changes landed together in this revision: one new scoring dimension (Golden/Preferred Run Selection), a restructured Subjective Block Scope rubric that splits its two failures apart, Trajectory Exclusion narrowed to leave conversation logs alone, and guidance added or clarified on four more requirements. The spec now scores 22 dimensions rather than 21.",
    changes: [
      {
        group: "Trajectory",
        dimension: "Golden/Preferred Run Selection",
        kind: "added",
        summary: "A new dimension, and the only one that scores the filing rather than the task.",
        detail:
          "Binary. A task is penalised, non-fail at 3, when no preferred run is selected for the golden trajectory, and passes at 5 once one is. Nothing about the run itself is judged here, only whether the selection was made.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Subjective Block Scope",
        kind: "options",
        summary: "The two ways the block goes wrong are now two separate failures.",
        detail:
          "This used to be one Fail covering both scope bleed and unobservable criteria. It is now four options: 2+ objective checks in the block is one Fail, and 2+ criteria naming no observable property is another. The non-fail is narrowed to exactly 1 criterion of either kind, so a single bad criterion no longer reads as a pass.",
      },
      {
        group: "Golden Solution",
        dimension: "Trajectory Exclusion",
        kind: "guidance",
        summary: "Conversation logs are out of scope here, and caveats are not leakage.",
        detail:
          "The dimension now says plainly not to assess conversation logs, which belong to Simulator Answer Leak, and that caveats do not count toward leakage. It separates narration, how the work was done, from a caveat, the state of the deliverable, with worked examples of each. The Fail option was rewritten around that split, and the pass no longer turns on filenames.",
      },
      {
        group: "Milestones",
        dimension: "Continuation Criteria & Assets",
        kind: "guidance",
        summary: "A malformed continuation criterion does not always fail here any more.",
        detail:
          "A criterion that evaluates nothing fails this dimension only where it leaves its milestone's requirement unchecked. Where another criterion on the same milestone, or on another milestone in the same turn, still checks that requirement, it is recorded under Milestone Annotations as an inaccurate continuation criterion instead.",
      },
      {
        group: "Multi-Turn",
        dimension: "Turn Structure & Dependency",
        kind: "wording",
        summary: "Four follow-up turns is no longer a ceiling.",
        detail:
          "The guidance reads \"at least 2–4 follow-up turns\" where it read \"2–4\", and the pass option now asks for \"at least 2-4 meaningful follow-up turns\". A longer conversation is not penalised by this dimension, as long as every turn still does real work.",
      },
      {
        group: "Input Artifacts",
        dimension: "Realism",
        kind: "guidance",
        summary: "The intent behind the category is stated, and it is narrower than it read.",
        detail:
          "It exists to catch inputs that look machine made or printed. Inputs that look handwritten, carry some mess, or are anything other than very clean screenshots are fine, which is a lower bar than the original wording implied.",
      },
      {
        group: "Trajectory",
        dimension: "Completeness",
        kind: "guidance",
        summary: "The dimension finally says what it covers.",
        detail:
          "It shipped with no guidance at all. It now states that it is about whether an agent trajectory is missing or truncated.",
      },
    ],
  },
];

/** Total changes across every revision, for the rail count. */
export const specChangeCount = specRevisions.reduce((n, r) => n + r.changes.length, 0);

/** The revision the spec data currently reflects. */
export const specRevisionCurrent = specRevisions[0];
