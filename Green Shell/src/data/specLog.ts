/**
 * What moved in the Green Shell QC spec, revision by revision.
 *
 * Hand-authored, and deliberately kept out of [specDoc.ts](./specDoc.ts): that
 * file is generated from the spec exports and anything written into it is lost
 * on the next regeneration.
 *
 * **Green Shell starts here.** The hub is carrying the first Green Shell export,
 * so there is one entry and it has no changes under it: there is no earlier
 * Green Shell revision to diff against. The next export gets its own entry,
 * derived by diffing it against this one, with an entry per dimension that
 * actually changed.
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
