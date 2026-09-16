import type { GuidelineChange } from "./types";

const GT = "/golden-tasks/vendor-closeout";

/**
 * Transcribed from the Version History table and the [NEW] callouts in
 * `[External] OpenClaw MM Rubrics MULTI TURN – Guidelines .md`, which is the
 * source of truth for all of it.
 *
 * This is not the changelog. It is only the entries that change how a task is
 * built or reviewed, which is why every one carries `does`. A version bump that
 * moves nothing a contributor has to do does not belong here, and the block has
 * to stay short enough to read standing up.
 *
 * Newest first. `guidelinesVersion` below is what the header of that document
 * currently says, so the band can state which revision it is reporting.
 */
export const guidelinesVersion = { version: "v4", updated: "Sep 11, 2026" };

export const guidelineChanges: GuidelineChange[] = [
  {
    id: "universe-videos",
    date: "Sep 11, 2026",
    version: "v4",
    title: "Three universe interaction recordings",
    body: "The guidelines now carry three short screen recordings: loading the universe correctly, grounding the scenario inside it, and recovering a session that loaded wrong. Four minutes for the set.",
    does: "Watch all three before your first task. They are in the hub, one section under the hero.",
    ref: { section: "1.2.1", title: "Start With the Universe" },
    impact: "shape",
    links: [{ to: "/#universe-videos", tag: "VIDEO", label: "The three recordings" }],
  },
  {
    id: "trajectory-cap",
    date: "Sep 10, 2026",
    version: "v3",
    title: "Trajectory rubrics are capped at five",
    body: "Criteria whose evaluation target is Trajectory now run to a maximum of five, with a minimum of zero. They are not mandatory, and the guidelines add that they should focus on the last response.",
    does: "Count the Trajectory targets in your block. Over five, keep the ones carrying the strongest reasoning signal and move the rest of the coverage onto the artifacts, where it can still be graded.",
    ref: { section: "5.1", title: "Rubric Fundamentals" },
    impact: "hard",
    links: [
      { to: `${GT}#rubrics`, tag: "GT", label: "Five Trajectory criteria, four of them spot checks" },
      { to: "/checklist#s5", tag: "E9", label: "Five or fewer Trajectory targets" },
    ],
  },
  {
    id: "min-inputs",
    date: "Sep 10, 2026",
    version: "v3",
    title: "Three input files is the floor",
    body: "The conversation with Model A has to carry at least three input files. Fewer than three is a shortfall in the task itself, not in the run.",
    does: "Count the attachments before you send the opening prompt. Distractors and noise files count toward it, as long as each one is there on purpose.",
    ref: { section: "1.2.2", title: "Select the Multimodal Inputs" },
    impact: "hard",
    links: [
      { to: `${GT}#inputs`, tag: "GT", label: "Eleven files, and the fact each one carries" },
      { to: "/checklist#s2", tag: "B3", label: "The hard rules for the input set" },
    ],
  },
  {
    id: "factuality-removed",
    date: "Sep 6, 2026",
    version: "v2",
    title: "Factuality and Hallucination is out of the category table",
    body: "The categories in the guidelines now run Safety and Boundaries, Tool Use, Agent Behavior, Instruction Following and Task Completion. A criterion that checks whether a value or a claim is correct belongs in Task Completion, which is also the default anything unresolved falls to. The QC spec sheet still carries the old definition, so expect to see it quoted in a review.",
    does: "Re-read every criterion you tagged Factuality. If the model did the work and simply got it wrong, it is Task Completion.",
    ref: { section: "5.4", title: "Category & Evaluation Target" },
    impact: "hard",
    links: [
      { to: `${GT}#rubrics`, tag: "GT", label: "The Datadog criterion, recategorised" },
      { to: "/spec#rubric-criteria", tag: "QC", label: "How a miscategorisation is scored" },
    ],
  },
  {
    id: "rubric-coverage",
    date: "Sep 6, 2026",
    version: "v2",
    title: "The rubric count comes from coverage, never from a target",
    body: "There is no fixed number of rubrics, and no threshold to clear. Thorough coverage, outcome oriented criteria included, usually lands somewhere around 15 to 30.",
    does: "Stop writing toward a number. Walk the prompt once per turn, cover every ask, and let the count fall where it falls.",
    ref: { section: "5.1", title: "Rubric Fundamentals" },
    impact: "shape",
    links: [
      { to: "/#rubrics", tag: "M6", label: "A grader with the prompt closed can still rate it" },
      { to: "/checklist#s5", tag: "E1", label: "Walk the prompt once per turn" },
    ],
  },
  {
    id: "scenario-grounding",
    date: "Sep 6, 2026",
    version: "v2",
    title: "Ground the scenario through the agent, not by reading the tables",
    body: "The assigned scenario is grounded by interacting with the AI agent in the Database tab directly. Inspecting the universe by hand is what leads people to conclude the scenario has no connection to it, when the connection is there and undocumented.",
    does: "Ask the agent where the scenario can anchor before you draft a line of it. Skipping this compromises the complexity of everything built on top.",
    ref: { section: "1.1", title: "Task Parameters & Execution Rules" },
    impact: "hard",
    links: [
      { to: "/#universe-videos", tag: "VIDEO", label: "What a real universe interaction looks like" },
      { to: "/checklist#s1", tag: "A2", label: "Confirm the loadout before you design" },
    ],
  },
];
