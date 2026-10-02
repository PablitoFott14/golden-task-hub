import type { GuidelineChange } from "./types";

/**
 * What Green Shell changed, against the Red Shell multi-turn project it
 * replaced. Transcribed from the Version History table and the [NEW] callouts
 * of `[External] Green Shell – Guidelines .md`, which is the source of truth.
 *
 * This is not the version history. An entry earns its place only by changing
 * what a contributor does, which is why every one carries `does`. `before`
 * names the Red Shell rule being replaced, because most readers of this page
 * are arriving with the old one in their head.
 *
 * `refs` lists every section the rule touches rather than one, so a reader can
 * open the guidelines at the right place instead of searching. The section
 * numbers come from the Version History row, which maps each update to the
 * sections it was applied in.
 *
 * `detail` is supporting context and is optional on purpose. It is there where
 * the rule is easy to misread, and absent where the rule explains itself.
 *
 * Newest first.
 */
export const guidelinesVersion = { version: "Green Shell v1", updated: "Sep 27, 2026" };

export const guidelineChanges: GuidelineChange[] = [
  {
    id: "single-turn",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Tasks are single turn, so milestones are gone",
    before:
      "Red Shell ran 3 to 5 turns, with a milestone set per turn, a revision turn, and a milestone check deciding whether the next prompt was a turn or a hint.",
    body: "The task type is always single turn. One initial prompt goes in, it is sent automatically when you submit, and the agent answers it once. There are no further turns, so there is no milestone set to write. Leg B still runs that same prompt word for word, steered at intent level until the model reaches the ideal response.",
    does: "Put every requirement into the one prompt. Anything it does not ask for cannot be graded, whatever the Draft History records.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "2.1", title: "Sending the Prompt" },
      { section: "6", title: "Golden Solution, Leg B" },
    ],
    impact: "hard",
    detail: {
      label: "What this removes from the old workflow",
      items: [
        "No milestone set, and no milestone check between turns.",
        "No revision turn, and no deferred asset arriving later in the conversation.",
        "No turn structure or dependency to design, so difficulty has to come from the scenario instead.",
        "Hinting survives, but only inside Leg B, where you steer the same prompt toward the ideal response.",
      ],
    },
  },
  {
    id: "use-case-and-tools",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "A new use case taxonomy, 11 use cases and 68 subcategories",
    before:
      "Red Shell assigned one of 6 categories and 16 subcategories. Those labels are retired and are not valid values any more.",
    body: "Every task is assigned one use case (L1) and one subcategory (L2) from the Hatch taxonomy. The pair is fixed, and the scenario, the prompt and the deliverable all have to be its natural home. Assign by the user's intent, never by what the input files happen to be about.",
    does: "Read your L2 definition and its scope check before you design anything, then check the neighbouring L2 in the same use case. Fitting that one better is a category relevance failure even when the use case is right.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.1.1", title: "Use-Case Taxonomy (L1 & L2)" },
      { section: "1.2.5", title: "Common Scenario Issues Getting Tasks Rejected" },
    ],
    impact: "hard",
    embed: "taxonomy",
    detail: {
      label: "Reading the taxonomy",
      items: [
        "The scope check is the tie breaker. SMB needs a small business context, Shopping needs the user to be buying, Research loses to any use case that owns the topic.",
        "Four lower traffic use cases after Learning, and emotional wellbeing support, are out of scope. Health and Fitness is not a catch all for them.",
        "Every scenario below clears the complexity bar for its deliverable. A pair that only supports a plain document is a pair you have not finished designing against.",
      ],
    },
  },
  {
    id: "binding-parameters",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "All seven assigned parameters are binding",
    before:
      "Red Shell assigned four: task type, category, subcategory and universe. The rest of the brief was treated as guidance.",
    body: "Category, subcategory, universe, scenario, output artifact, primary capabilities and secondary capabilities are all assigned, and all of them have to be implemented and visible in the finished task. Omitting, substituting or drifting from any one makes the task invalid.",
    does: "Check the finished task against every assigned parameter before you submit, not just the category pair. The scenario is the only one you may adjust, and only to reach the complexity bar.",
    refs: [
      { section: "Hard Client Requirements", title: "Task parameters are mandatory" },
      { section: "1.1", title: "Task Parameters & Execution Rules" },
    ],
    impact: "hard",
    detail: {
      label: "What counts as drift",
      items: [
        "Producing a different artifact than the one assigned, even a better one.",
        "Exercising a capability the brief did not name, in place of one it did.",
        "Reworking the scenario into a different kind of situation. Adjusting it for complexity is allowed, changing its core nature and intent is not.",
      ],
    },
  },
  {
    id: "assigned-tools",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Assigned tools are mandatory, and tool drift is rejected",
    body: "Where a scenario comes with specific tools or connectors, the task has to be built on them. The correct final state must depend on those tools, and a task that reaches its outcome through a different service is rejected at QC. The loadout documented in the appendix is background only and never justifies substituting one.",
    does: "Build the scenario on the assigned tools rather than on whichever service is easiest to reach, and make sure the deliverable genuinely cannot be produced without them.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.2.3", title: "Create the Prompt" },
      { section: "1.2.5", title: "Common Scenario Issues Getting Tasks Rejected" },
      { section: "8.3", title: "The Services in the Universe" },
    ],
    impact: "hard",
  },
  {
    id: "input-floor",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Three multimodal inputs is the floor, not the target",
    before:
      "Red Shell set the same minimum of three, and in practice it was read as the number to hit.",
    body: "The Model A conversation needs a minimum of three multimodal inputs. Three is the requirement, not the goal, and many tasks need substantially more than that to meet the complexity bar the client expects.",
    does: "Use as many inputs as the scenario naturally needs, and never trim a task down to three or slightly more.",
    refs: [{ section: "1.2.2", title: "Select the Multimodal Inputs" }],
    impact: "hard",
  },
  {
    id: "outcome-over-process",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "80/20: grade the outcome, not the route",
    before:
      "Red Shell capped Trajectory criteria at five and treated them as ordinary coverage. That cap is gone and the 80/20 rule replaces it.",
    body: "At least 80% of your objective criteria have to grade completion: the artifact, the state change, the final message. At most 20% may grade process, which is Tool Use, Agent Behavior, any Trajectory target and narration of the model's own work, and zero is preferred. Above the cap the task fails automatically as Process Over Cap.",
    does: "Write the completion version first. Grade a reasoning decision where it lands in the deliverable, and grade a lookup the model skipped by what its absence costs the artifact. Keep a process criterion only where no deliverable can show the failure.",
    refs: [
      { section: "5", title: "Objective Rubrics" },
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.4", title: "Category & Evaluation Target" },
      { section: "5.6", title: "How the Client Defines Rubric Issue Severity" },
      { section: "5.7", title: "Final Rubric Checklist" },
      { section: "8.2", title: "What the Model Actually Does" },
    ],
    impact: "hard",
    detail: {
      label: "Counting it, and the rewrite it forces",
      items: [
        "Count the objective block only, positives and negatives alike, and round down. 12 criteria allow 2 process criteria, 20 allow 4.",
        "The test: could the deliverable be perfect and this criterion still fail? Then it is process.",
        "Process: the model opens klin.png before writing report.md. Completion: report.md records the 48 spaces per rack shown in klin.png. The second catches the same failure, because a model that never looked cannot know the value.",
        "A missing lookup is graded by what it costs the deliverable, not by evidence that the model tried.",
      ],
    },
  },
  {
    id: "literal-matching",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Every literal has to match its source exactly",
    body: "Every filename, ID, value, date or string a criterion references must match the source exactly. A literal the source does not actually carry cannot be satisfied by any run, and it counts as an Incorrect Criteria issue, which is Major. This applies just as rigorously to the subjective block.",
    does: "Copy each literal straight from the attachment, the universe record or the GTFA. Open the source and check every one of them before you submit.",
    refs: [
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.7", title: "Final Rubric Checklist" },
    ],
    impact: "hard",
  },
  {
    id: "no-existence-checks",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "A criterion that only checks existence is never valid",
    body: "Do not write a criterion that only verifies a file, section, column or record is there. Existence is already implied by any criterion that grades content. No weight makes one of these acceptable, and it fails the task automatically as an Existence Check.",
    does: "Grade what the file records instead. A criterion on the value inside it already proves the file exists.",
    refs: [
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.2", title: "Rubric Weights" },
      { section: "5.6", title: "How the Client Defines Rubric Issue Severity" },
      { section: "5.7", title: "Final Rubric Checklist" },
    ],
    impact: "hard",
    detail: {
      label: "The rewrite",
      items: [
        "Not valid: array_survey.csv contains the columns string_id, output_w and variance_pct.",
        "Valid: array_survey.csv records a variance_pct of −12.4 for string S-07, the string whose output is read off the inverter photo.",
        "Naming the specific files inside a folder does not save it. If nothing in the criterion grades content, it is still an existence check.",
      ],
    },
  },
  {
    id: "planned-complexity",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Complexity is planned, never patched in",
    body: "Complexity has to come from a natural, well planned scenario rather than from artificial friction, extra constraints or contrived inputs. Do not improvise the task as you go, and do not wait for the model to fail before deciding to add difficulty. The guidelines set the expectation at a minimum of two hours on planning before a task is ready.",
    does: "Settle the deliverable, the dependencies, the inputs and the intended workflow before you build anything, and check the deliverable against the complexity bar for its type while the scenario is still on paper.",
    refs: [
      { section: "Complexity Bar", title: "Genuine complexity is not negotiable" },
      { section: "1", title: "Planning the Agent Task" },
      { section: "1.2", title: "Building the Idea" },
    ],
    impact: "shape",
    detail: {
      label: "The floor each deliverable has to clear",
      items: [
        "P0, explainer video: several scenes driven by the data or the documents, not one static frame with narration.",
        "P0, interactive HTML: interaction that actually works, controls that respond, state that changes. A styled static page does not qualify.",
        "P0, dashboard: several linked views over data the model extracted itself. One chart is not a dashboard.",
        "P1 covers presentations of 10 to 15 slides, multi page designed PDFs and multi row structured data. A plain document or report is P2.",
      ],
    },
  },
];
