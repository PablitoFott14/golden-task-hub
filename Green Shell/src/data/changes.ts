import type { GuidelineChange } from "./types";

/**
 * What a contributor has to do differently, and why. Two sources feed it:
 * the Version History table and the [NEW] callouts of
 * `[External] Green Shell – Guidelines .md`, which is the source of truth for
 * everything Green Shell changed against the Red Shell project it replaced;
 * and anything the client flags afterwards, which arrives as a note to the
 * team rather than as a guidelines revision.
 *
 * A client flag carries `version: "Client flag"` in place of a guidelines
 * version, because the guidelines have not moved, and it leaves `before`
 * unset: the renderer labels that field "In Red Shell", which is wrong for a
 * rule about how Green Shell tasks are being built right now. Its `refs` still
 * name the sections the rule applies in, so the reader can check us.
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

/**
 * The `version` a client flag carries, in place of a guidelines version. Read
 * rather than typed, because anything counting the guidelines rule set on its
 * own has to exclude these and a second copy of the string would drift.
 */
export const clientFlagVersion = "Client flag";

export const guidelineChanges: GuidelineChange[] = [
  {
    id: "input-diversity",
    date: "Oct 8, 2026",
    version: clientFlagVersion,
    title: "Images have to be worth looking at, not only worth reading",
    body: "The client went through the image inputs across the project and found roughly 95% of them were text in picture form: screenshots of documents, emails and threads. An image now has to carry visual information the model interprets rather than transcribes. This bites hardest where the assigned input_modalities include image, which is where a reviewer looks first.",
    does: "Before attaching an image, ask what the model has to do with it. If the answer is read the words, it is a document, so make it one and spend the image slot on something that has to be looked at.",
    refs: [{ section: "1.2.2", title: "Select the Multimodal Inputs" }],
    impact: "shape",
    detail: {
      label: "Images that carry visual information",
      items: [
        "Photos of physical objects, products, receipts and real environments, where the state of the thing is the fact.",
        "Charts, graphs, diagrams, maps and visual layouts, where the reading comes from the shape rather than from a label.",
        "Images the model has to identify, compare, measure or reason about, instead of lifting a string out of.",
        "A screenshot is still right where the document itself is the evidence. What the client flagged is an image set made of nothing else.",
        "Diversity is not a quota. An interpretive image that carries no part of the answer is decoration, and every file still has to earn its place.",
      ],
    },
    links: [
      { to: "/#inputs", tag: "M4", label: "An input set where each file earns its place" },
      { to: "/reference#input-floor", tag: "WN", label: "Three inputs is a floor, and it is enforced" },
      { to: "/spec#input-artifacts", tag: "QC", label: "Realism, safety and the input floor" },
    ],
  },
  {
    id: "assigned-tool-use",
    date: "Oct 8, 2026",
    version: clientFlagVersion,
    title: "Assigned tools have to be used, not just assigned",
    body: "Carrying the right connectors is not the same as building on them. The client asked for genuine tool use driven by the scenario, and named browsing and image generation specifically. Tools are assigned under hatch_connectors on the parameter sheet and surface as assigned tools once tasking moves to the dash.",
    does: "Name the step in your scenario that each assigned tool is necessary for, and check the deliverable could not be produced without it. If you cannot name that step, the task is not using the tool and is not finished. Never bolt on a call just to show one happened.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.2.3", title: "Create the Prompt" },
      { section: "8.3", title: "The Services in the Universe" },
      { section: "8.3.1", title: "The Built-in Tools" },
    ],
    impact: "hard",
    detail: {
      label: "What meaningful use looks like",
      items: [
        "Browser: external research, cross referencing several sites, verifying a source, or a value that is only correct at run time.",
        "Image generation (muse-image-1.0): a visual asset the model produces or edits and then places inside the assigned output artifact.",
        "Web values move between runs, so grade the retrieval and the relationship the model has to establish, not the figure you saw while writing the rubric.",
        "Google Drive is working again. If it still fails on your task, drop that one connector and hold every other parameter exactly as assigned.",
        "Social media interactions are wanted too. The universes that support them are still being built, so this lands once those tools exist.",
      ],
    },
    links: [
      { to: "/reference#assigned-tools", tag: "WN", label: "Assigned tools are mandatory, and drift is rejected" },
      { to: "/#parameters", tag: "M1", label: "Confirm the loadout before you design" },
      { to: "/spec#trajectory", tag: "QC", label: "Feasibility with tools" },
    ],
  },
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
    id: "failure-threshold",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Model A has to fail at least 30%, and 50% is still preferred",
    before: "Red Shell required Model A to fail at least 50% of the final rubric score.",
    body: "The Model A trajectory has to show genuine failures worth at least 30% of the final rubric score, with meaningful impact on task completion and on what the user receives. A genuine failure rate of 50% or higher is still preferred. The failures have to be authentic, never forced or artificially scored to reach the threshold.",
    does: "Aim for 50% or more, and submit a task whose genuine failures clear 30% rather than inflating a weight, adding asks after the run or forcing a miss to reach the higher number. If the model passes too easily, revisit the scenario's complexity while keeping it realistic and planned.",
    refs: [
      { section: "Hard Client Requirements", title: "Model A has to fail" },
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.2", title: "Building the Idea" },
    ],
    impact: "hard",
    detail: {
      label: "Reading the bar",
      items: [
        "The QA rubric draws the same line from the other side: a Model A score above 70% fails the task as trivial.",
        "Only genuine failures count toward it. A raised weight, an ask added after the run, or one miss repeated across several criteria is exactly what the rule rules out.",
        "Where the assigned scenario is too simple to reach 30%, its complexity may be raised, and only as far as needed, while every other parameter stays as assigned.",
      ],
    },
    links: [
      { to: "/#failure", tag: "M7", label: "If the model sails through, the task is not ready" },
      { to: "/failure-approach", tag: "FA", label: "How Opus actually fails, case by case" },
      { to: "/spec#dim-all-criteria-scoring", tag: "QC", label: "All Criteria Scoring" },
    ],
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

/**
 * The Red Shell to Green Shell rule set on its own, without the client flags
 * layered on since. Anything that says how many rules changed coming from Red
 * Shell counts this, not `guidelineChanges`, which also holds the flags.
 */
export const guidelinesOnlyChanges = guidelineChanges.filter(
  (c) => c.version !== clientFlagVersion
);
