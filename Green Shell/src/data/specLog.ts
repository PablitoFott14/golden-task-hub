/**
 * What moved in the Green Shell QC spec, revision by revision.
 *
 * Hand-authored, and deliberately kept out of [specDoc.ts](./specDoc.ts): that
 * file is generated from the spec exports and anything written into it is lost
 * on the next regeneration.
 *
 * **Green Shell starts at the initial version**, which has no changes under it
 * because there was no earlier Green Shell revision to diff against. Every
 * revision after it is derived by diffing the new export against the one the
 * hub was carrying, with an entry per dimension that actually changed. A
 * revision that moves nothing earns no entry at all.
 *
 * Red Shell's log is a separate file inside its own project and keeps its own
 * history. Nothing here touches it, and the two never merge: this is the Green
 * Shell spec's history, not the multi-turn spec's.
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
    id: "green-shell-v4",
    date: "Oct 12, 2026",
    title: "Scenario Adherence stops asking for the scenario and asks whether you are on topic",
    note: "One dimension moved and the spec is still 33 dimensions across 7 groups. Scenario Adherence is now a topicality check: it reads the prompt against the assigned scenario and fails only where the two share nothing at all. Both of its error categories are renamed, and the note about adjusting a scenario the tools cannot perform is gone with the wording that needed it.",
    changes: [
      {
        group: "Task Parameters",
        dimension: "Scenario Adherence",
        kind: "guidance",
        summary:
          "The question asks whether the prompt is broadly on topic, not whether it follows the scenario as written.",
        detail:
          "It now reads “Ensure that the prompt broadly aligns with the context of the scenario presented in the “Scenario” field from the task parameters section.” The worked example settles how far that goes: a scenario about comparing two companies is still followed “even if the particular companies, or number of companies changes”. What replaced is the V3 instruction to stay “as close as possible to the scenario as written” and only fill in what it leaves open, and with it the note that a scenario may be adjusted where the environment's tools cannot perform it. That note is not needed any more, because nothing in the dimension now turns on reproducing a step.",
      },
      {
        group: "Task Parameters",
        dimension: "Scenario Adherence",
        kind: "options",
        summary:
          "Both error categories are renamed Off-Topic, and the Fail needs the prompt and the scenario to share nothing at all.",
        detail:
          "“Fail - Scenario Not Followed” and “Non-Fail - Loose Scenario Adherence” are now “Fail - Off-Topic” and “Non-Fail - Off-Topic”, so the error category a reviewer applies changes too. The Fail is “completely off-topic when examined alongside the assigned scenario; there are no elements tying the two together”, and the Non-Fail is “only tangentially related” with ties that are “loose or superficial”. A different user, a different goal or a different deliverable no longer fails the dimension on its own, which is what the V3 Fail named. The 5 keeps its shape and now reads “clearly related to the assigned scenario and faithfully recreate its goals and context”.",
      },
    ],
  },
  {
    id: "green-shell-v3",
    date: "Oct 5, 2026",
    title: "The three rubric quality bands now stand alone, and Scenario Adherence is scoped",
    note: "Five dimensions moved and nothing was added or dropped, so the spec is still 33 dimensions across 7 groups. The three Overall Rubric Quality bands each now judge only the severity they are named for, and the way to tally them moved out of the Fail option and into the question. Scenario Adherence is pinned to the prompt and its input files, and it bends where the tools cannot do what the scenario asks. Feasibility With Tools finally says what a primary request is.",
    changes: [
      {
        group: "Task Parameters",
        dimension: "Scenario Adherence",
        kind: "guidance",
        summary:
          "Where the tools cannot do what the scenario asks, the scenario may be adjusted and that still counts as following it.",
        detail:
          "A note added to the question: “When the assigned scenario or its execution target asks for an action the environment’s tools cannot perform the scenario may be adjusted to make the task feasible, i.e. the closest workable version of that part counts as following the scenario.” A step the environment cannot perform is no longer a choice between an infeasible task and a scenario breach. Build the closest workable version of that part and the dimension is satisfied.",
      },
      {
        group: "Task Parameters",
        dimension: "Scenario Adherence",
        kind: "options",
        summary:
          "The Fail reads only on the prompt and its input files, and extra material no longer reads as drift.",
        detail:
          "The Fail now names “the prompt and its input files”, defines a different goal as “a different outcome for the user, not an added constraint, filter, label or section to a goal already defined in the scenario”, and says errors in the rubric or the golden “are graded under their own dimensions, not here”. The 5 adds that extra input files, more items or added friction serving the same user, goal and deliverable count as filling in, “including inputs added to reach the 3-input minimum”. Building past the scenario is now explicitly safe, as long as the user, the goal and the deliverable hold.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Overall Rubric Quality - 10%",
        kind: "options",
        summary: "The 5 is now “No major issues.” and nothing else.",
        detail:
          "The pass band was “Less than 5% (<5%) of the rubrics have minor issues / No major or moderate issues”. Moderate and minor issues no longer hold this band below a 5, because the 15% and 20% bands count them. The counting method moved out of the Fail option text and into the question: the denominator is the criteria the CB wrote, “objective and subjective blocks together”, each written criterion counts once at its highest severity, and each missing criterion counts as one issue added to the numerator only.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Overall Rubric Quality - 15%",
        kind: "options",
        summary:
          "The cap on major issues is gone, and a set of overlapping criteria counts as one issue.",
        detail:
          "The Non-Fail dropped “(with major issues contributing lower than 5%)”, so this band no longer judges majors a second time. The 10% band does that on its own. The 5 dropped its “<5% minor issues” line and is now “No major or moderate issues”. The question carries the same counting method as the other two bands, plus the rule that “a set of overlapping criteria counts as one issue”.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Overall Rubric Quality - 20%",
        kind: "options",
        summary: "The pass band is one threshold across all three severities.",
        detail:
          "The 5 is now “Less than 5% (<5%) of the rubrics have minor, moderate, or major issues.”, in place of the old pair of lines. The Non-Fail dropped “(with major issues contributing lower than 5% and moderate issues contributing lower than 15%)”. With those caps gone from both this band and the 15% one, the three questions are independent: each counts its own severities against its own threshold.",
      },
      {
        group: "Trajectory",
        dimension: "Feasibility With Tools",
        kind: "guidance",
        summary: "Primary and secondary requests are defined.",
        detail:
          "The question now says “The primary request is the deliverable the scenario’s goal depends on; other asks are secondary.” That line decides the band. An infeasible primary request is the Fail, an infeasible secondary request is the Non-Fail, and until now nothing in the dimension said which was which.",
      },
    ],
  },
  {
    id: "green-shell-v2",
    date: "Oct 3, 2026",
    title: "Initial version",
    note: "The first Green Shell spec the hub has carried, transcribed from the V2 trivial task threshold export and its appendix. It scores 33 dimensions across 7 groups. There is no earlier Green Shell revision to compare it against, so nothing is logged as changed; the next export will be diffed against this one.",
    changes: [],
  },
];

/** Total changes across every revision, for the rail count. */
export const specChangeCount = specRevisions.reduce((n, r) => n + r.changes.length, 0);

/** The revision the spec data currently reflects. */
export const specRevisionCurrent = specRevisions[0];
