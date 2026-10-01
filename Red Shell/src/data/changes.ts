import type { GuidelineChange } from "./types";

/**
 * Transcribed from the Version History table and the [NEW] callouts in
 * `[External] Major Shin – Guidelines .md`, which is the source of truth for
 * all of it. That document replaced the multi-turn guidelines on Sep 27, 2026:
 * the project is single turn now, the version count restarts at v1, and the
 * whole change set is findable by searching [NEW] inside the document.
 *
 * This is not the changelog. It is only the entries that change how a task is
 * built or reviewed, which is why every one carries `does`. A version bump that
 * moves nothing a contributor has to do does not belong here, and the block has
 * to stay short enough to read standing up.
 *
 * No entry carries `links` yet, and that is deliberate. The rest of the hub,
 * the Golden Task, the checklist, the method and the FAQ included, still
 * teaches the multi-turn standard, so there is nothing to point a reader at
 * that would not contradict the card pointing at it. Add the links back as each
 * page is brought over.
 *
 * Newest first. `guidelinesVersion` below is what the header of that document
 * currently says, so the band can state which revision it is reporting.
 */
export const guidelinesVersion = { version: "Major Shin v1", updated: "Sep 27, 2026" };

export const guidelineChanges: GuidelineChange[] = [
  {
    id: "single-turn",
    date: "Sep 27, 2026",
    version: "Major Shin v1",
    title: "Tasks are single turn, so milestones are gone",
    body: "The task type is always single turn. One initial prompt goes in, it is sent automatically when you submit, and the agent answers it once. There are no further turns, so there is no milestone set to write. Leg B still runs that same prompt word for word, steered at intent level until the model reaches the ideal response.",
    does: "Put every requirement into the one prompt. Anything it does not ask for cannot be graded, whatever the Draft History records.",
    ref: { section: "1.1", title: "Task Parameters & Execution Rules" },
    impact: "hard",
  },
  {
    id: "use-case-and-tools",
    date: "Sep 27, 2026",
    version: "Major Shin v1",
    title: "New assigned parameters: use case, subcategory and tools",
    body: "The old 6 categories and 16 subcategories are retired, and those labels are no longer valid. Every task is assigned one of 11 use cases (L1) and one of 68 subcategories (L2), listed in 1.1.1. Assigned tools are mandatory wherever a scenario carries them: the correct final state has to depend on them, and building on another service is rejected at QC.",
    does: "Read your L2 definition and its scope check before you design, and assign by the user's intent, not by what the files are about. Build the scenario on the assigned tools, never on whichever service is easiest to reach.",
    ref: { section: "1.1", title: "Task Parameters & Execution Rules" },
    impact: "hard",
  },
  {
    id: "input-floor",
    date: "Sep 27, 2026",
    version: "Major Shin v1",
    title: "Three multimodal inputs is the floor, not the target",
    body: "The Model A conversation needs a minimum of three multimodal inputs. Three is the requirement, not the goal. Many tasks need substantially more than that to meet the complexity bar the client expects.",
    does: "Use as many inputs as the scenario naturally needs, and never trim a task down to three or slightly more.",
    ref: { section: "1.2.2", title: "Select the Multimodal Inputs" },
    impact: "hard",
  },
  {
    id: "outcome-over-process",
    date: "Sep 27, 2026",
    version: "Major Shin v1",
    title: "80/20: grade the outcome, not the route",
    body: "At least 80% of your objective criteria have to grade completion: the artifact, the state change, the final message. At most 20% may grade process, which is Tool Use, Agent Behavior, any Trajectory target and narration of the model's own work, and zero is preferred. Count the objective block only, positives and negatives alike, rounding down, so 12 criteria allow 2. Above the cap the task fails automatically as Process Over Cap, named in 5.6.",
    does: "Write the completion version first. Grade a reasoning decision where it lands in the deliverable, and grade a lookup the model skipped by what its absence costs the artifact. Keep a process criterion only where no deliverable can show the failure.",
    ref: { section: "5.1", title: "Rubric Fundamentals" },
    impact: "hard",
  },
  {
    id: "literal-matching",
    date: "Sep 27, 2026",
    version: "Major Shin v1",
    title: "Every literal has to match its source exactly",
    body: "Every filename, ID, value, date or string a criterion references must match the source exactly. A literal the source does not actually carry cannot be satisfied by any run, and it counts as an Incorrect Criteria issue, which is Major. This applies just as rigorously to the subjective block.",
    does: "Copy each literal straight from the attachment, the universe record or the GTFA. Open the source and check every one of them before you submit.",
    ref: { section: "5.1", title: "Rubric Fundamentals" },
    impact: "hard",
  },
  {
    id: "no-existence-checks",
    date: "Sep 27, 2026",
    version: "Major Shin v1",
    title: "A criterion that only checks existence is never valid",
    body: "Do not write a criterion that only verifies a file, section, column or record is there. Existence is already implied by any criterion that grades content. No weight makes one of these acceptable, and it fails the task automatically as an Existence Check, named in 5.6.",
    does: "Grade what the file records instead. A criterion on the value inside it already proves the file exists.",
    ref: { section: "5.1", title: "Rubric Fundamentals" },
    impact: "hard",
  },
];
