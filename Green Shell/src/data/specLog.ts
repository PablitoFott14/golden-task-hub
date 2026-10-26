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
 * **Only the five newest revisions are kept.** When a sixth lands, delete the
 * oldest: the log is for what moved recently, not the full history.
 *
 * Red Shell's log is a separate file inside its own project and keeps its own
 * history. Nothing here touches it, and the two never merge: this is the Green
 * Shell spec's history, not the multi-turn spec's.
 *
 * The summaries are hub copy. Where a line quotes the spec it is quoted
 * verbatim, because the wording is the thing that changed.
 */

/**
 * What part of a dimension the revision touched. `removed` is a dimension the
 * spec no longer scores at all.
 */
export type SpecChangeKind = "added" | "options" | "guidance" | "wording" | "removed";

export interface SpecChange {
  /** The group the dimension sits under, matching the rail. */
  group: string;
  /**
   * The dimension, named exactly as specDoc.ts names it. The entry's link is
   * derived from this string, so a typo here is a link that goes nowhere and a
   * dimension renamed in the spec has to be renamed here too. A `removed` entry
   * names the dimension as it was and renders no link, since nothing is left
   * to open.
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
  /** The revision as the export names it, e.g. "V6". Heads its batch in the log. */
  version: string;
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
    id: "green-shell-v6",
    version: "V6",
    date: "Oct 26, 2026",
    title: "Five dimensions leave the spec, and the parameter checks read the fields in the task",
    note: "The spec drops from 33 dimensions to 28, still across 7 groups, and this entry covers everything between V4 and V6. Expertise, Existence Check, Rubric Spot Checks, Architectural Depth & Friction Exposure and Genuine Media Inspection are no longer scored, and Domain Relevance is renamed Subcategory Relevance. Five parameter checks now read the fields assigned in the task instead of columns of the parameter sheet. Reasoning Requirement loses its middle band, Valid Model Failure is judged against corrected criteria, and the three rubric quality bands put flagged missing criteria in the denominator. Constraints, Hint Leak (Leg B), All Criteria Scoring, the 80/20 split and Single-Turn Structure are reworded without changing what they score, so they carry no entry.",
    changes: [
      {
        group: "Task Parameters",
        dimension: "Assigned Universe",
        kind: "guidance",
        summary: "Checked against the Universe field in the task.",
        detail:
          "The guidance now reads “Check against the \"Universe\" field assigned in-task.” in place of column F of the task parameter sheet. The options are unchanged.",
      },
      {
        group: "Task Parameters",
        dimension: "MM Inputs",
        kind: "guidance",
        summary: "Checked against the Input Modalities field in the task, with a fallback for older tasks.",
        detail:
          "The guidance now reads “Check against the \"Input Modalities\" field assigned in-task.” in place of column H of the task parameter sheet. Where an older task has no such field, “use the scenario in the in-task task parameters to determine the input types, not the task json.” The options are unchanged.",
      },
      {
        group: "Task Parameters",
        dimension: "Output Artifact",
        kind: "guidance",
        summary: "Checked against the Output Modalities field in the task.",
        detail:
          "The guidance now reads “Check against the \"Output Modalities\" field assigned in-task.” in place of column I of the task parameter sheet. The options are unchanged.",
      },
      {
        group: "Input Artifacts",
        dimension: "Minimum Multimodal Inputs",
        kind: "options",
        summary: "The 5 no longer asks that every file has a purpose.",
        detail:
          "The 5 now reads “The Model A conversation has 3 or more multimodal input files. (5)”. V4 added “each with a purpose (required signal or intentional distractor)”. The guidance keeps “Intentional distractors count.” and drops “Three is the minimum, not the target;”. The Fail, fewer than 3 multimodal input files, is unchanged.",
      },
      {
        group: "Prompt",
        dimension: "Reasoning Requirement",
        kind: "options",
        summary: "The Non-Fail band is gone, so a prompt scores 2 or 5.",
        detail:
          "The 3 for a prompt that “loosely or trivially includes the skills and/or reasoning of the assigned domain/level of expertise” is dropped with its error category. The 5 now reads “The prompt necessitates reasoning beyond simple factual lookup/definition.” where V4 asked for reasoning “in-line with the assigned domain/expertise level”. The Fail, a prompt that “only requires factual lookup or definition”, is unchanged.",
      },
      {
        group: "Prompt",
        dimension: "Valid Model Failure",
        kind: "guidance",
        summary: "Model A is judged against what each criterion should have checked.",
        detail:
          "The guidance now reads “Evaluate Model A against the true intent of each criterion, not the included evaluations. For an incorrect criterion, judge Model A against the corrected version (what the criterion should have checked).” A valid failure is a failed correct criterion, or a failed corrected version of an incorrect one. “If an incorrect criterion can’t be meaningfully corrected (irrelevant, out of scope), ignore it for this dimension.” A failure that disappears once the criterion is written correctly does not count.",
      },
      {
        group: "Prompt",
        dimension: "Valid Model Failure",
        kind: "options",
        summary: "The Fail no longer names a weak failure or one built on an ambiguous prompt.",
        detail:
          "The Fail now reads “The prompt does not cause at least one model to fail one or more criteria, OR the only criterion failed is incorrect, and the model response would fulfil a correctly written version.” V4's Fail also took in a failure that was “really weak (not pronounced)” and one “based on an ambiguous interpretation of the prompt”. The 5 is unchanged and still asks for a failure that “is pronounced and is based on a clear request in the prompt”.",
      },
      {
        group: "Prompt",
        dimension: "Professionalism",
        kind: "options",
        summary: "Judged against the assigned L1 category, not the domain.",
        detail:
          "The Fail now reads “The prompt does not sound like a question asked for work / business purposes in the given L1 category” and the 5 “The prompt is clearly designed by a professional in the assigned L1 category”. V4 said “in the given domain” and “in the chosen domain”. The professional the prompt has to sound like is now set by the use case the task was assigned.",
      },
      {
        group: "Prompt",
        dimension: "Subcategory Relevance",
        kind: "wording",
        summary: "Domain Relevance is renamed Subcategory Relevance and reads the Subcategory (L2) field in the task.",
        detail:
          "The question is now “Rate the Subcategory Relevance of the Prompt dimension.” and the guidance “Check against the \"Subcategory (L2)\" field assigned in-task.” in place of column E of the task parameter sheet. The options and both error categories are unchanged, and were already named Subcategory Relevance, so the name now matches what the dimension always checked.",
      },
      {
        group: "Prompt",
        dimension: "Category Relevance",
        kind: "guidance",
        summary: "Checked against the Use Case (L1) field in the task.",
        detail:
          "The guidance now reads “Check against the \"Use Case (L1)\" field assigned in-task.” in place of column D of the task parameter sheet. The options are unchanged.",
      },
      {
        group: "Prompt",
        dimension: "Expertise",
        kind: "removed",
        summary: "No longer scored.",
        detail:
          "The dimension that failed a prompt “the general population” could answer “without the need for specific domain knowledge OR background research” is gone, with Fail - No Expertise Needed Prompt and Non-Fail - No Expertise Needed.",
      },
      {
        group: "Golden Solution",
        dimension: "Artifact Completeness",
        kind: "options",
        summary: "A requested file under the wrong name is not a missing artifact.",
        detail:
          "The Fail adds “This does not include when a requested file is named in the prompt is mislabeled in the golden response (in those cases, determine which request the file aligns with based on its content instead).” A file is matched to the request it answers by what it holds, not by its name.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Overall Rubric Quality - 10%",
        kind: "guidance",
        summary: "Flagged missing criteria now count in the denominator.",
        detail:
          "The denominator is now “the number of criteria that the CB wrote, objective and subjective blocks together, plus any missing criteria flagged”. V4 kept missing criteria out of the denominator and said each one “counts as one issue and is added to the numerator only”, and that clause is gone. With 20 written criteria and 2 flagged missing, the denominator is 22. The appendix is unchanged and still counts each missing criterion as one issue.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Overall Rubric Quality - 15%",
        kind: "guidance",
        summary: "Flagged missing criteria now count in the denominator.",
        detail:
          "The same change as the 10% band: the denominator adds “any missing criteria flagged”, and the clause adding each missing criterion “to the numerator only” is gone. “a set of overlapping criteria counts as one issue” still stands.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Overall Rubric Quality - 20%",
        kind: "guidance",
        summary: "Flagged missing criteria now count in the denominator.",
        detail:
          "The same change as the 10% band: the denominator adds “any missing criteria flagged”, and the clause adding each missing criterion “to the numerator only” is gone. “a set of overlapping criteria counts as one issue” still stands.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Existence Check",
        kind: "removed",
        summary: "No longer scored as a dimension of its own.",
        detail:
          "The automatic fail for a criterion that “only verifies that a file, section, column or record exists” is gone, with Fail - Existence Check. The Guidelines still say a criterion that only checks existence fails the task automatically, and Subjective Block Scope still fails a subjective block holding two or more existence checks. Keep grading content.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Rubric Spot Checks",
        kind: "removed",
        summary: "No longer scored.",
        detail:
          "The Non-Fail for “more than 5 spot checks for any group of outcomes” is gone, with Non-Fail - Too Many Spot Checks. The Guidelines' rule stands: more than eight similar outcomes get one completeness criterion and up to five spot checks.",
      },
      {
        group: "Rubric Criteria",
        dimension: "Subjective Block Scope",
        kind: "guidance",
        summary: "The question no longer says the block is positives only.",
        detail:
          "The guidance drops “positives only” and “Outside the 80/20 count.” The second moved rather than went: the 80/20 split now opens “Applies to: Criteria in the Objective block only”. The options are unchanged.",
      },
      {
        group: "Trajectory",
        dimension: "Feasibility With Tools",
        kind: "guidance",
        summary: "Judged on the requests in either trajectory, and the primary request can come from the prompt.",
        detail:
          "The question now opens “Applies to: Requests in Trajectory A or B” where V4 said it was “based on the evaluations present in-task for Model A & B.” The primary request is still the deliverable the scenario's goal depends on, “(or the one the prompt depends on, in the case the assigned scenario was infeasible)”. Where the scenario could not be built as assigned, the band is read against the prompt's own primary deliverable.",
      },
      {
        group: "Trajectory",
        dimension: "Architectural Depth & Friction Exposure",
        kind: "removed",
        summary: "No longer scored.",
        detail:
          "The Fail for “No meaningful tool dependency” and the Non-Fail for tool use “not deeply integrated into the reasoning” are gone, with Fail - Major Depth Issues and Non-Fail - Minor Depth Issues.",
      },
      {
        group: "Trajectory",
        dimension: "Genuine Media Inspection",
        kind: "removed",
        summary: "No longer scored.",
        detail:
          "The trajectory check that every value attributed to a multimodal input traces to a step where that input was opened is gone, with Fail - Media Not Inspected and Non-Fail - Partial Inspection. MM Dependence, which asks whether the prompt can be answered without the non-text files, is unchanged.",
      },
    ],
  },
];

/** Total changes across every revision, for the rail count. */
export const specChangeCount = specRevisions.reduce((n, r) => n + r.changes.length, 0);

/** The revision the spec data currently reflects. */
export const specRevisionCurrent = specRevisions[0];
