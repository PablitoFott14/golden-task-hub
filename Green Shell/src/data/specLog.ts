/**
 * What changed in the Green Shell QC spec lately, written for contributors.
 *
 * Hand-authored, and deliberately kept out of [specDoc.ts](./specDoc.ts): that
 * file is generated from the spec exports and anything written into it is lost
 * on the next regeneration.
 *
 * **The log is the last five changes, not a history.** A change is a group:
 * one thing an author or reviewer now does differently, with every dimension it
 * touches listed under it. V6 touched twenty dimensions and is five changes
 * here. When a new revision lands, diff its export against the one the hub was
 * carrying, write what moved as grouped changes, most important first, and put
 * the revision on top. Then delete changes from the bottom until five remain,
 * drop any older change the new spec supersedes, and delete a revision left
 * with none. A revision that moves nothing earns no entry.
 *
 * Red Shell's log is a separate file inside its own project and keeps its own
 * history. Nothing here touches it, and the two never merge: this is the Green
 * Shell spec's log, not the multi-turn spec's.
 *
 * The copy is hub copy: what changed and what it means, in a few words. It does
 * not quote the old wording, because every live dimension links to its card and
 * the card carries the current one. It never points out gaps in the spec.
 */

/**
 * What a change does. `removed` is a dimension the spec no longer scores,
 * `scoring` changes what passes or fails, and `guidance` changes how a
 * dimension is read or checked.
 */
export type SpecChangeKind = "removed" | "scoring" | "guidance";

/** One dimension a change touches. */
export interface SpecChangeItem {
  /**
   * The dimension, named exactly as specDoc.ts names it. Its link is derived
   * from this string, so a typo here is a link that goes nowhere and a
   * dimension renamed in the spec has to be renamed here too. Under a
   * `removed` change it names the dimension as it was and renders no link,
   * since nothing is left to open.
   */
  dimension: string;
  /** What moved for this dimension, in a few words. Left out when the change's note covers it. */
  text?: string;
}

export interface SpecChange {
  kind: SpecChangeKind;
  /** The change in one line. */
  title: string;
  /** What it means for an author, in a sentence or two, where the title needs it. */
  note?: string;
  items: SpecChangeItem[];
}

export interface SpecRevision {
  id: string;
  /** The revision as the export names it, e.g. "V6". */
  version: string;
  /** The date the export carries. */
  date: string;
  /** The revision in one line, the way the banner heads it. */
  title: string;
  /** Most important first, so trimming takes the minor ones first. */
  changes: SpecChange[];
}

/** Sits above the entries, the way every appendix section carries a note. */
export const specLogNote =
  "The latest changes to the spec, newest first. Each dimension links to its current wording.";

/**
 * Newest first, and five changes at most across every revision here.
 *
 * V6 was diffed against V4, since V5 never reached the hub, so it carries
 * everything in between. Constraints, Hint Leak (Leg B), All Criteria Scoring,
 * the 80/20 split and Single-Turn Structure were reworded without changing what
 * they score, so they carry no entry.
 */
export const specRevisions: SpecRevision[] = [
  {
    id: "green-shell-v6",
    version: "V6",
    date: "Oct 26, 2026",
    title: "Five dimensions leave the spec, and the parameter checks read the fields in the task",
    changes: [
      {
        kind: "removed",
        title: "Five dimensions are no longer scored",
        note: "The spec now scores 28 dimensions, down from 33. The Guidelines' rules on existence checks and spot checks still apply.",
        items: [
          { dimension: "Expertise" },
          { dimension: "Existence Check" },
          { dimension: "Rubric Spot Checks" },
          { dimension: "Architectural Depth & Friction Exposure" },
          { dimension: "Genuine Media Inspection" },
        ],
      },
      {
        kind: "scoring",
        title: "Three prompt dimensions are judged differently",
        items: [
          {
            dimension: "Reasoning Requirement",
            text: "The Non-Fail band is gone, so a prompt scores 2 or 5. It passes when it needs reasoning beyond simple factual lookup or definition.",
          },
          {
            dimension: "Valid Model Failure",
            text: "Model A is judged against what each criterion should have checked, so a failure that disappears once the criterion is corrected does not count. The Fail no longer names a weak failure or one built on an ambiguous prompt.",
          },
          {
            dimension: "Professionalism",
            text: "Judged against the assigned L1 category, not the domain.",
          },
        ],
      },
      {
        kind: "scoring",
        title: "Flagged missing criteria join the rubric quality denominator",
        note: "The denominator is now every criterion written, objective and subjective blocks together, plus any missing criteria flagged. With 20 written and 2 flagged missing, it is 22.",
        items: [
          { dimension: "Overall Rubric Quality - 10%" },
          { dimension: "Overall Rubric Quality - 15%" },
          { dimension: "Overall Rubric Quality - 20%" },
        ],
      },
      {
        kind: "guidance",
        title: "Parameter checks read the fields assigned in the task",
        note: "Each is checked against a field assigned in the task instead of the task parameter sheet. The scored options are unchanged.",
        items: [
          { dimension: "Assigned Universe", text: "The “Universe” field." },
          {
            dimension: "MM Inputs",
            text: "The “Input Modalities” field. Where an older task has none, use the scenario in the in-task task parameters, not the task json.",
          },
          { dimension: "Output Artifact", text: "The “Output Modalities” field." },
          { dimension: "Category Relevance", text: "The “Use Case (L1)” field." },
          {
            dimension: "Subcategory Relevance",
            text: "The “Subcategory (L2)” field. Renamed from Domain Relevance.",
          },
        ],
      },
      {
        kind: "guidance",
        title: "Smaller changes to four dimensions",
        items: [
          {
            dimension: "Minimum Multimodal Inputs",
            text: "The 5 no longer asks that every file has a purpose. Intentional distractors still count.",
          },
          {
            dimension: "Artifact Completeness",
            text: "A requested file under the wrong name is not a missing artifact. Match it to its request by content.",
          },
          {
            dimension: "Subjective Block Scope",
            text: "The guidance no longer says the block is positives only.",
          },
          {
            dimension: "Feasibility With Tools",
            text: "Judged on the requests in Trajectory A or B. Where the assigned scenario was infeasible, the primary request is the one the prompt depends on.",
          },
        ],
      },
    ],
  },
];

/** Total changes across every revision, for the rail count. */
export const specChangeCount = specRevisions.reduce((n, r) => n + r.changes.length, 0);

/** The revision the spec data currently reflects. */
export const specRevisionCurrent = specRevisions[0];
