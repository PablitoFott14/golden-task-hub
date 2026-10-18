import { guidelinesOnlyChanges } from "./changes";
import { onboardingItems } from "./onboarding";
import { universeViewers } from "./universeViewers";

/**
 * The notice bar under the nav on the landing page.
 *
 * **This is not a changelog of the site.** It carries three things and nothing
 * else: a guidelines update, a change to the onboarding material, and a
 * resource a contributor should start using on their next task. A tab moving
 * or a tool shipping does not go here — a contributor does not have to act on
 * it, and a bar that fills up with site housekeeping stops being read, which
 * costs us the one place a real guidelines change can be announced.
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
 * entry you cannot act on is an announcement rather than a notice. A `to` that
 * starts with `http` is a site of its own and opens in a new tab. Entries are
 * historical: they describe what landed on their date and are not rewritten
 * when the hub moves on, so a count written into one is correct to leave alone.
 *
 * Newest first. `hubUpdates[0]` is the one the collapsed bar shows.
 */

export type HubUpdateKind = "guidelines" | "onboarding" | "resource";

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
  /** Opens the thing the entry describes: a hub route, or an `http` URL. */
  to: string;
}

/**
 * The Oct 4 entry announced the Red Shell to Green Shell rule set, so it counts
 * that set alone. A client flag added later is a separate entry of its own and
 * must not inflate this one: reading `guidelineChanges` here made the sentence
 * drift upward the moment the first flag landed.
 */
const hardRules = guidelinesOnlyChanges.filter((c) => c.impact === "hard").length;

export const hubUpdates: HubUpdate[] = [
  {
    id: "universe-viewers",
    date: "Oct 18, 2026",
    kind: "resource",
    what: "Explore your universe in the Universe Viewers",
    where: "The Method → top of the page",
    why: "Each viewer holds one persona's apps, files and messages, so you can see what the data holds before you build a task on it. The card at the top of this page opens it too.",
    to: universeViewers.url,
  },
  {
    id: "scenario-adherence",
    date: "Oct 14, 2026",
    kind: "guidelines",
    what: "Scenario Adherence is scored as a topicality check now",
    where: "Spec Doc → Task Parameters",
    why: "The V4 rubric fails the dimension only where the prompt and the assigned scenario share nothing at all. Changing the particular companies, or how many of them, is still on topic. Both error categories are renamed Off-Topic, so the one a reviewer applies changes too.",
    to: "/spec#dim-scenario-adherence",
  },
  {
    id: "dynamic-values",
    date: "Oct 11, 2026",
    kind: "guidelines",
    what: "A rubric on a live web value grades the retrieval, not the figure",
    where: "Reference → Must Read: Project Updates",
    why: "Browsing is an expected part of a task now, so more criteria are being written against values the model has to fetch. Name the figure you saw as the required answer and the next correct run fails it. Phrase it as the current value retrieved during the run, with your number in parentheses as an example.",
    to: "/reference#dynamic-values",
  },
  {
    id: "failure-approach-cases",
    date: "Oct 11, 2026",
    kind: "guidelines",
    what: "Every failure case now names the trigger you can build",
    where: "Failure Approach",
    why: "28 patterns and 89 real cases from graded Opus runs, each one saying why it failed rather than only that it did. The Opus 5 cases are marked, the build ideas link back to the cases they came from, and the tab opens on where the evidence comes from. Take your failure point from a case instead of inventing one.",
    to: "/failure-approach",
  },
  {
    id: "binding-parameters",
    date: "Oct 11, 2026",
    kind: "guidelines",
    what: "All fourteen assigned parameters are binding",
    where: "Reference → Must Read: Project Updates",
    why: "The guidelines now assign fourteen parameters, not seven, adding the input and output modalities, the execution target, the verification condition and the access the scenario assumes. Every one has to show in the finished task.",
    to: "/reference#binding-parameters",
  },
  {
    id: "leg-a-opus-5",
    date: "Oct 11, 2026",
    kind: "guidelines",
    what: "Leg A runs Opus 5",
    where: "The Method → Model failure",
    why: "The guidelines changed the Leg A model from GPT to Opus 5. Plan your failure points around how Opus actually fails: the Failure Approach is built from graded Opus runs.",
    to: "/#failure",
  },
  {
    id: "failure-threshold",
    date: "Oct 11, 2026",
    kind: "guidelines",
    what: "Model A has to fail at least 30%, and 50% is still preferred",
    where: "Reference → Must Read: Project Updates",
    why: "The hub had been showing Red Shell's 50% floor. Genuine failures on 30% of the final rubric score is the Green Shell minimum, and a failure forced or scored up to reach either number does not count.",
    to: "/reference#failure-threshold",
  },
  {
    id: "green-shell-onboardings",
    date: "Oct 9, 2026",
    kind: "onboarding",
    what: "Both onboardings are now the Green Shell versions",
    where: "Reference → Onboarding",
    why: "The intro teaches the single turn task end to end, and Common Errors keeps the Red Shell mistakes that still apply, restated against the Green Shell rules. Rerun both if you went through the multi-turn versions.",
    to: "/reference#onboarding",
  },
  {
    id: "input-diversity",
    date: "Oct 8, 2026",
    kind: "guidelines",
    what: "Images have to be worth looking at, not only worth reading",
    where: "Reference → Must Read: Project Updates",
    why: "Roughly 95% of the images shipped so far are text in picture form. Photos of real objects, charts, diagrams and maps, anything the model has to interpret rather than transcribe.",
    to: "/reference#input-diversity",
  },
  {
    id: "assigned-tool-use",
    date: "Oct 8, 2026",
    kind: "guidelines",
    what: "Assigned tools have to be used, not just assigned",
    where: "Reference → Must Read: Project Updates",
    why: "The client asked for genuine tool use driven by the scenario, and named browsing and image generation. Name the step each assigned tool is necessary for, and check the deliverable could not be produced without it.",
    to: "/reference#assigned-tool-use",
  },
  {
    id: "guidelines-must-read",
    date: "Oct 4, 2026",
    kind: "guidelines",
    what: "Guidelines updates: read these before your next task",
    where: "Reference → Must Read: Project Updates",
    why: `All ${guidelinesOnlyChanges.length} rules that changed coming from Red Shell, ${hardRules} of them a rule a task fails without. Each one names the Red Shell rule it replaces and the guidelines sections it came from.`,
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
