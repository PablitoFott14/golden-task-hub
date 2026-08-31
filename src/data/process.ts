import type { ProcessStep } from "./types";

/**
 * Nine steps across two legs, from the High-Level Task Workflow in
 * `taxonomy_updates.md`. This is the expected shape of the work — the
 * pre-submit gate is what you run over the result.
 */

export const process: ProcessStep[] = [
  {
    n: "0",
    id: "p-explore",
    title: "Explore the universe, properly",
    body: "Add the Service Universe Artifact ID, confirm the tools your idea needs actually exist, and identify the two or three servers your task will make the agent coordinate. This step decides whether the task is strong or weak.",
    produces: "A loadout you have seen, and a date window you can anchor to",
    links: [
      { to: "/checklist#s1", tag: "A2", label: "Confirm the loadout · add the Artifact ID" },
      { to: "/golden-tasks/vendor-closeout#universe", tag: "GT", label: "What #winddown and #executives each hold" },
    ],
  },
  {
    n: "1",
    id: "p-story",
    title: "Write the Story Draft, upload the zip",
    body: "Agent Objective, Desired Outcome, category and subcategory, plus the zip of multimodal context. The Story Draft is internal — the model never sees it, so any format requirement has to appear literally in the prompt or you cannot enforce it in a rubric.",
    produces: "Story Draft · the MM zip and its categories",
    links: [
      { to: "/checklist#s4", tag: "D1", label: "Nothing the agent never saw can be graded" },
      { to: "/spec#c-2", tag: "#2", label: "Which turn do these two fields describe?" },
    ],
  },
  {
    n: "2",
    id: "p-inputs",
    title: "Submit turn 1, then upload the inputs folder",
    body: "Only the opening prompt goes in here. Then place every input file in a folder named inputs, upload it, and click Create Universe. Two uploads, two purposes: the zip registers your context and its categories, the inputs folder builds the environment the agent works inside. You need both.",
    produces: "The environment · turn 1 posted",
    links: [
      { to: "/checklist#s3", tag: "C1", label: "Every output file named in the prompt" },
      { to: "/spec#c-7", tag: "#7", label: "Never ask the model to create MEMORY.md" },
    ],
  },
  {
    n: "3",
    id: "p-run-a",
    title: "Run the Model A trajectory",
    body: "Run, wait for prompt_agent at step 5 of 8, open the conversation, read what the agent actually produced, then write the next follow-up reactively. Two to five turns, then Complete Conversation. Download each turn’s artifacts before you send the next follow-up — once you move on, that turn’s output is far harder to retrieve.",
    produces: "The Model A conversation · per-turn artifacts and trajectories",
    links: [
      { to: "/checklist#s7", tag: "G3", label: "Trajectory downloads, once per turn" },
      { to: "/golden-tasks/vendor-closeout#conversation", tag: "GT", label: "Four turns written reactively" },
    ],
  },
  {
    n: "4",
    id: "p-spot",
    title: "Spot the agent’s mistakes",
    body: "At least 50% of the total rubric score has to fail, with failures that materially affect task completion. If the run sailed through, the scenario needs more difficulty — do not close the gap by adding criteria the model happens to miss.",
    produces: "A list of real failures, grounded in the trajectory",
    links: [
      { to: "/checklist#s1", tag: "A4", label: "The 50% threshold" },
      { to: "/golden-tasks/vendor-closeout#model-a", tag: "GT", label: "19 of 21 failed, and why" },
    ],
  },
  {
    n: "5",
    id: "p-objective",
    title: "Author the objective rubrics",
    body: "Written against the last turn. Every criterion atomic, binary and self-contained, with the concrete value embedded. At least one high-weight criterion must check a value obtainable only by inspecting the media. Then mark each one Present or Not Present against Model A, and justify every failure.",
    produces: "The objective block · justifications for every failing criterion",
    links: [
      { to: "/checklist#s5", tag: "E1–E8", label: "Eight checks over this block" },
      { to: "/golden-tasks/vendor-closeout#rubrics", tag: "GT", label: "21 criteria, with statuses" },
    ],
  },
  {
    n: "6",
    id: "p-milestones",
    title: "Write the milestones",
    body: "One per requirement you expressed, grouped by the turn it belongs to. Intent level only — a milestone hints, it never tells. “The information from the test image is added to the video”, not “add the $126 price to the video”. Naming the value leaks the answer.",
    produces: "The milestones artifact, between the two legs",
    links: [{ to: "/spec#c-8", tag: "#8", label: "One per requirement, or one per turn?" }],
  },
  {
    n: "7",
    id: "p-golden",
    title: "Reach the ideal response — the golden",
    body: "A new conversation with the same opening prompt. Hint turn by turn using your milestones until the model produces the ideal response. You may use more hinting turns here than in Model A. Hints stay intent level and never name the answer. Freeze the result as finished artifacts only — no trajectory, no method notes, no scaffolding.",
    produces: "golden/ — finished artifacts only",
    links: [
      { to: "/checklist#s7", tag: "G2", label: "The golden passes the complete set" },
      { to: "/spec#conflicts", tag: "!", label: "Which leg produces the golden — open" },
    ],
  },
  {
    n: "8",
    id: "p-subjective",
    title: "Write the subjective block",
    body: "Presentation and opinion only: layout, legibility, hierarchy, structure, cross-artifact consistency, register. Each criterion names one observable property of the render. Rate both artifacts side by side, Present or Not Present, then justify the failures against Model A only. Never repeat a deterministic value check from the objective block here.",
    produces: "The subjective block · Model A justifications",
    links: [
      { to: "/checklist#s6", tag: "F1–F3", label: "Three checks over this block" },
      { to: "/golden-tasks/vendor-closeout#subjective", tag: "GT", label: "Ten criteria and four failures" },
    ],
  },
];
