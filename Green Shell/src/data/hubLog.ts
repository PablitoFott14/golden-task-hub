import { guidelineChanges } from "./changes";

/**
 * What changed **in this hub**, newest first.
 *
 * Not to be confused with two other logs, which it links to rather than
 * duplicates:
 *
 * - `specLog.ts` is the revision history of the *rubric*: which dimension's
 *   wording or scored options moved between exports. It lives in the Spec Doc.
 * - `changes.ts` is what the *guidelines* changed going from Red Shell to Green
 *   Shell. It lives in Reference, as Must Read.
 *
 * This one is the site: a page added, a tool shipped, a tab moved. It exists
 * because a contributor who was here last week has no other way of finding out
 * that something they need has moved or arrived.
 *
 * **An entry earns its place by changing where a contributor goes or what they
 * have to read.** A wording fix does not. Every entry carries a `to` that opens
 * the thing it describes, because an entry you cannot act on is an
 * announcement, not a log.
 *
 * Dates are the day the change shipped, and entries are historical: they
 * describe what landed then and are not rewritten when the hub moves on.
 */

export type HubUpdateKind = "guidelines" | "added" | "moved";

export interface HubUpdate {
  id: string;
  /** The day it shipped. */
  date: string;
  kind: HubUpdateKind;
  /** What changed, in one line. */
  what: string;
  /** Where in the hub it landed, written the way the nav reads. */
  where: string;
  /** Why it matters, where that is not obvious from `what`. Optional. */
  why?: string;
  /** Opens the thing the entry describes. */
  to: string;
}

const hardRules = guidelineChanges.filter((c) => c.impact === "hard").length;

export const hubUpdates: HubUpdate[] = [
  {
    id: "guidelines-must-read",
    date: "Oct 4, 2026",
    kind: "guidelines",
    what: "Guidelines updates: read these before your next task",
    where: "Reference → Must Read",
    why: `All ${guidelineChanges.length} rules that changed coming from Red Shell, ${hardRules} of them a rule a task fails without. Each one names the Red Shell rule it replaces and the guidelines sections it came from.`,
    to: "/reference#whats-new",
  },
  {
    id: "five-tabs",
    date: "Oct 4, 2026",
    kind: "moved",
    what: "Eight tabs became five, and the spec doc now has its own",
    where: "Spec Doc · Reference",
    why: "Onboarding, the pre-submit gate, the project updates and the FAQ are panes of Reference. Every old link still works and still lands on the right pane.",
    to: "/spec",
  },
  {
    id: "green-shell-spec",
    date: "Oct 3, 2026",
    kind: "added",
    what: "The full Green Shell rubric is in the hub",
    where: "Spec Doc",
    why: "33 dimensions in 7 groups, every scored option and its guidance word for word from the rubric sheet, plus the rubric quality and weight appendix.",
    to: "/spec#task-parameters",
  },
  {
    id: "complexity-tool",
    date: "Oct 1, 2026",
    kind: "added",
    what: "Increase Complexity Proposals tool",
    where: "Complexity",
    why: "Pick the universe and the parameters from closed lists and get proposals back, so nothing has to be typed by hand.",
    to: "/complexity",
  },
  {
    id: "onboarding-materials",
    date: "Oct 1, 2026",
    kind: "added",
    what: "Onboarding materials",
    where: "Reference → Onboarding",
    why: "The two onboardings to run before your first task.",
    to: "/reference#onboarding",
  },
];

export const hubUpdatedOn = hubUpdates[0].date;
