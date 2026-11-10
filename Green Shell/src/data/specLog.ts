/**
 * What changed in the Green Shell QC spec lately, written for contributors.
 *
 * Hand-authored, and deliberately kept out of [specDoc.ts](./specDoc.ts): that
 * file is generated from the spec exports and anything written into it is lost
 * on the next regeneration.
 *
 * **The log is the last five changes, not a history.** A change is a group:
 * one thing an author or reviewer now does differently, with every dimension it
 * touches listed under it. V7 touched seventeen dimensions and is five changes
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
 * V7 was diffed against V6. Its five changes fill the log, so V6 came out.
 * MM Inputs and Minimum Multimodal Inputs also had an option reworded without
 * changing what it scores, which carries no entry.
 */
export const specRevisions: SpecRevision[] = [
  {
    id: "green-shell-v7",
    version: "V7",
    date: "Nov 10, 2026",
    title: "Six dimensions join the spec, and All Criteria Scoring leaves it",
    changes: [
      {
        kind: "scoring",
        title: "Four new checks on the prompt, the criteria and Model A's run",
        items: [
          {
            dimension: "Plain text",
            text: "The prompt and every criterion are plain text, with no link code, escapes or editor notes. A graded file name or value turned into link code fails.",
          },
          {
            dimension: "Date Alignment",
            text: "When the answer depends on today, the records, the golden and the criteria agree with the date the prompt states, or with the run's timestamp where it states none.",
          },
          {
            dimension: "Model A Run Completed",
            text: "Model A's run has to finish and open every input its failed criteria depend on. An error, a timeout or an input it could not open fails.",
          },
          {
            dimension: "Verifiable Live Data",
            text: "Every graded value is reachable from the package: the inputs, the universe, or a saved copy of the page. A fixed value found only on a live page fails. Examples are checked against the saved copy, so a live page that changed later does not make a criterion incorrect.",
          },
        ],
      },
      {
        kind: "scoring",
        title: "The golden is rated against its own rubric, and pass@k is scored",
        items: [
          {
            dimension: "Passes Rubric",
            text: "Every criterion in both blocks is rated against the golden, which has to score 100%. Missing one weight 1 subjective criterion is a Non-Fail, anything more fails.",
          },
          {
            dimension: "Pass@k Scores",
            text: "A pass@k of 70% or more is a Non-Fail.",
          },
        ],
      },
      {
        kind: "scoring",
        title: "Five dimensions score differently",
        items: [
          {
            dimension: "Realism",
            text: "A new Fail, Illegible Graded Value: a graded value a careful reader cannot read with confidence, and no other input settles it. Fix it with a sharper scan or a tolerance in the criterion.",
          },
          {
            dimension: "Constraints",
            text: "Stacked constraints, such as three or more formatting constraints, are a Non-Fail now, not a Fail.",
          },
          {
            dimension: "Valid Model Failure",
            text: "Judged on Model A alone. A criterion failed because the run broke, through an error, a timeout or an input it could not open, is not a model failure.",
          },
          {
            dimension: "Overall Rubric Quality - 15%",
            text: "A Moderate issue whose fix leaves every Present and Not Present rating unchanged counts as Minor.",
          },
          {
            dimension: "Overall Rubric Quality - 20%",
            text: "A Moderate issue whose fix leaves every Present and Not Present rating unchanged counts as Minor.",
          },
        ],
      },
      {
        kind: "removed",
        title: "All Criteria Scoring is no longer scored",
        note: "A Model A score above 70% no longer fails the task as trivial. The Guidelines' 30% failure floor still applies. With the six new dimensions, the spec scores 33, up from 28.",
        items: [{ dimension: "All Criteria Scoring" }],
      },
      {
        kind: "guidance",
        title: "Smaller changes to five dimensions",
        items: [
          {
            dimension: "MM Inputs",
            text: "Modality is read from the content as well as the file type. An image with text in it covers both the image and the text modality, and counts toward the minimum of three.",
          },
          {
            dimension: "Minimum Multimodal Inputs",
            text: "The Text modality also covers images with written text in them.",
          },
          {
            dimension: "Subjective Block Scope",
            text: "Presentation the prompt states outright, such as putting the data in a table, is graded in the objective block and is not block bleed.",
          },
          {
            dimension: "Artifact Completeness",
            text: "A golden that fails a rubric criterion is judged under Passes Rubric, not here.",
          },
          {
            dimension: "Completeness",
            text: "A truncated, timed out or errored Model A run is judged under Model A Run Completed, not here.",
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
