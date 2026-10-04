import { guidelineChanges } from "./changes";
import { onboardingItems } from "./onboarding";

/**
 * The notice bar under the nav on the landing page.
 *
 * **This is not a changelog of the site.** It carries two things and nothing
 * else: a guidelines update, and a change to the onboarding material. A tab
 * moving or a tool shipping does not go here — a contributor does not have to
 * act on it, and a bar that fills up with site housekeeping stops being read,
 * which costs us the one place a real guidelines change can be announced.
 *
 * The test for an entry: **would a contributor do something differently because
 * of it, before their next task?** If not, leave it out.
 *
 * It does not duplicate the two logs it links to:
 *
 * - `changes.ts` is what the *guidelines* changed going from Red Shell to Green
 *   Shell, rendered as Must Read in Reference.
 * - `specLog.ts` is the revision history of the *rubric*, rendered in the Spec
 *   Doc change log.
 *
 * Every entry carries a `to` that opens the thing it describes, because an
 * entry you cannot act on is an announcement rather than a notice. Entries are
 * historical: they describe what landed on their date and are not rewritten
 * when the hub moves on, so a count written into one is correct to leave alone.
 *
 * Newest first. `hubUpdates[0]` is the one the collapsed bar shows.
 */

export type HubUpdateKind = "guidelines" | "onboarding";

export interface HubUpdate {
  id: string;
  /** The day it shipped. Shown on the bar, so keep the format short. */
  date: string;
  kind: HubUpdateKind;
  /** What changed, in one line. This is the bar's headline, so keep it tight. */
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
    where: "Reference → Must Read: Project Updates",
    why: `All ${guidelineChanges.length} rules that changed coming from Red Shell, ${hardRules} of them a rule a task fails without. Each one names the Red Shell rule it replaces and the guidelines sections it came from.`,
    to: "/reference#whats-new",
  },
  {
    id: "green-shell-spec",
    date: "Oct 3, 2026",
    kind: "guidelines",
    what: "The Green Shell rubric is in the hub in full",
    where: "Spec Doc",
    why: "33 dimensions in 7 groups, every scored option and its guidance word for word from the rubric sheet, plus the rubric quality and weight appendix. This is what a reviewer scores your task against.",
    to: "/spec#task-parameters",
  },
  {
    id: "onboarding-materials",
    date: "Oct 1, 2026",
    kind: "onboarding",
    what: "Onboarding material is live",
    where: "Reference → Onboarding",
    why: `The ${onboardingItems.length} onboardings to run before your first task, with the slides and the recording for each.`,
    to: "/reference#onboarding",
  },
];

export const hubUpdatedOn = hubUpdates[0].date;
