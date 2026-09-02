import type { MethodStep } from "./types";

const GT = "/golden-tasks/vendor-closeout";

/**
 * The method, derived from `rationale.md` for the vendor closeout task and
 * cross-read against [External] OpenClaw MM Rubrics MULTI TURN – Guidelines v2.
 *
 * Nine steps, in the order they actually happen. Each one carries the
 * principle, what it means, the moves that satisfy it, and the place in the
 * Golden Task where you can see it landed.
 */
export const methodSteps: MethodStep[] = [
  {
    n: 1,
    id: "universe",
    phase: "Design",
    title: "Universe interaction",
    slogan: "Go find the story. Do not invent one.",
    means:
      "Open the universe before you have an idea, holding your assigned category and subcategory in view. Read the services, the people and the workflows until a situation shows up that is already there in the data. The scenario you pick should be one the universe can prove.",
    moves: [
      "Ask the agent to map the universe first: services, people, lifecycle stages, recurring workflows, and the periods with the richest data.",
      "Narrow to one phase of that lifecycle, then look for the channels, tables and records that carry it.",
      "Pull the underlying records so the scenario stands on evidence rather than on memory.",
      "Confirm the loadout in the Universe Explorer and add the Service Universe Artifact ID before you deploy.",
    ],
    produces: "A grounded situation, with the records that prove it.",
    rule: {
      label: "Four parameters are assigned and cannot change",
      body: "Task type, category, subcategory, universe. A task that drifts from any one of them is rejected at QC no matter how good it is.",
    },
    inTask: {
      body: "Harmony Games is a studio with a full lifecycle in its data, so the task took the shutdown phase. Two channels carried it, #winddown and #executives, and both were pulled through SQL before a single prompt was written.",
      link: { to: `${GT}#universe`, tag: "GT", label: "The two channels the task is built on" },
    },
  },
  {
    n: 2,
    id: "inputs",
    phase: "Design",
    title: "Multimodal inputs",
    slogan: "Attach what the person would actually have.",
    means:
      "Pick evidence that belongs to the moment the scenario describes, in the formats that moment would produce. A handwritten total belongs on paper, a confirmation belongs in a screenshot, a rule with thresholds belongs in a document. Realistic noise stays in.",
    moves: [
      "Give every file a job: it carries required signal, or it is a deliberate distractor.",
      "Spread the answer across modalities so no single file settles the task.",
      "Leave room for two to four follow ups. The input set is what the rest of the conversation feeds on.",
      "Ship deferred assets in the zip from the start, under neutral filenames.",
    ],
    produces: "An input pack that is messy on purpose and load bearing in fact.",
    rule: {
      label: "Take the attachments away",
      body: "If the task is still solvable, the media was decorative. That is the ablation the whole project is built on.",
    },
    inTask: {
      body: "Eleven files recovered in a rush: confirmation emails, billing pages, a photo of a monitor, a photographed page of handwriting, exported invoices, and one invoice for a vendor that is not even in scope.",
      link: { to: `${GT}#inputs`, tag: "GT", label: "Every input and the fact it carries" },
    },
  },
  {
    n: 3,
    id: "scenario",
    phase: "Design",
    title: "The scenario and the GTFA",
    slogan: "Solve it yourself before you ask anyone else to.",
    means:
      "Write the opening prompt and plan the arc of the follow ups while the scenario is still in front of you. Then resolve the answer completely. The Ground Truth Final Answer is the end state you grade everything against, so it exists before the first run, not after it.",
    moves: [
      "Name every expected output file in the prompt itself, spelled exactly as it must appear.",
      "Keep the thresholds and rules in the inputs, so finding them is part of the work.",
      "Decide what each follow up is for: a deferred asset, a revision, a cross-check, a held back clarification.",
      "Resolve the GTFA down to the values: the totals, the dates, the classifications, the edge cases.",
    ],
    produces: "The prompt set, and the one answer it has to reach.",
    rule: {
      label: "Three to five turns",
      body: "Fewer than three is rejected automatically, and every turn has to consume the state the turn before it produced.",
    },
    inTask: {
      body: "One rule stated once in turn 1 decides all twenty vendors, and the GTFA resolved every one of them before the run started: four receipts, four unconfirmed, twelve not cancelled, one out of pool.",
      link: { to: `${GT}#answer`, tag: "GT", label: "The resolved answer, vendor by vendor" },
    },
  },
  {
    n: 4,
    id: "draft-history",
    phase: "Design",
    title: "Draft History",
    slogan: "Say why the agent is there, not what to type.",
    means:
      "The Agent Objective explains why this person needs help and what success looks like, without revealing the steps. The Desired Outcome states the end state in inspectable terms: each artifact named, what has to be inside it, and the logic that produces it.",
    moves: [
      "Write the objective at a level a colleague could act on without being told the method.",
      "Write the outcome as observable results, never as statements of intent.",
      "Check that every requirement you plan to grade also appears in a prompt the agent receives.",
    ],
    produces: "The formal record the rubrics and the golden are both measured against.",
    rule: {
      label: "The agent never sees this",
      body: "Draft History is not embedded in the agent. A requirement that lives only here was never asked for, so it cannot be graded.",
    },
    inTask: {
      body: "Every output the rubrics check is named in a prompt: the folder, the receipt filenames, MEMORY.md, emails_draft.md, the subject line, the SVG. Nothing is graded that the agent was not asked for.",
      link: { to: `${GT}#turns`, tag: "GT", label: "The four prompts, and what each one adds" },
    },
  },
  {
    n: 5,
    id: "failure",
    phase: "Leg A",
    title: "Model failure and follow ups",
    slogan: "If the model sails through, the task is not ready.",
    means:
      "Run the opening prompt and measure the first turn against the GTFA. You are looking for genuine failure across at least half the rubric weight. Failures are found, never manufactured, and you never tell the model what it missed.",
    moves: [
      "Score turn 1 against the GTFA before writing anything else.",
      "Restructure if the first turn already captures the whole intent, or if the failures are cosmetic.",
      "Adjust the planned follow ups to what the run actually produced, keeping the intent identical.",
      "Run the dependency check on every follow up before you keep it.",
    ],
    produces: "A trajectory that fails honestly, and a conversation that still holds together.",
    rule: {
      label: "Could this turn be answered without the previous turns?",
      body: "If yes, the turn is a standalone request wearing a follow up costume. Revise it or drop it.",
    },
    inTask: {
      body: "Model A never called a Slack tool at all. It worked from the attachments alone and failed 19 of 21 objective criteria, and the two it passed were the two that needed no reasoning.",
      link: { to: `${GT}#model-a`, tag: "GT", label: "Where the run actually broke" },
    },
  },
  {
    n: 6,
    id: "rubrics",
    phase: "Grade",
    title: "Objective rubrics",
    slogan: "A grader with the prompt closed can still rate it.",
    means:
      "Write the criteria against the downloaded trajectory and artifacts. Each one embeds the value it checks, sits in the category and evaluation target it would really be graded under, and carries a weight that answers how hard it was to satisfy.",
    moves: [
      "Walk the prompt once per turn and cover every ask, including the ones introduced mid conversation.",
      "Embed the exact value, filename, date or classification inside the criterion text.",
      "Cover the trajectory too. Agent Behavior is always Trajectory, never an artifact.",
      "Keep negatives near a quarter of the block, each naming a failure the setup genuinely invites.",
    ],
    produces: "A block that can be rated without you in the room.",
    rule: {
      label: "Weights are a fixed set",
      body: "Only −5, −3, −1, +1, +3, +5. Anything outside it fails Rubric Structure on its own, and weight measures difficulty rather than importance.",
    },
    inTask: {
      body: "Twenty one criteria, each pinning its own amount, filename, date and person. Criterion 18 is the counter example worth studying: it ships with no category and no evaluation target.",
      link: { to: `${GT}#rubrics`, tag: "GT", label: "All 21 criteria and how Model A rated" },
    },
  },
  {
    n: 7,
    id: "milestones",
    phase: "Leg B",
    title: "Milestones",
    slogan: "One intent, one milestone. Nothing about the answer.",
    means:
      "Milestones are the script the simulator replays against a run that went a different way. Each one is the requirement of its turn written as intent, stripped of anything specific to the response you happened to see.",
    moves: [
      "Split by requirement, grouped by turn. Three asks in a turn produce three milestones.",
      "Refer to artifacts by what they are for, not by filename, value or format.",
      "Attach the modifier that says what the turn does to existing work: opening, deferred asset, clarification gated, revision.",
      "Write continuation criteria that are true or false on inspection.",
    ],
    produces: "A milestone set that still lands on a run you have never seen.",
    rule: {
      label: "Behavior you never asked for is a leak",
      body: "A milestone that encodes how the agent should work, when the user never requested it, gets the task rejected.",
    },
    inTask: {
      body: "The vendor rule is a constraint the user stated, so a milestone may require it. The four receipts, the total and the percentage are answers, so no milestone names them.",
      link: { to: "/spec#milestones", tag: "QC", label: "The three milestone dimensions QC scores" },
    },
  },
  {
    n: 8,
    id: "golden",
    phase: "Leg B",
    title: "Golden solution",
    slogan: "Point at the intent. Never at the answer.",
    means:
      "Same opening prompt, new conversation, and you steer with intent level prompts until the model reaches the best possible version of the deliverable. After each turn, check the milestones. If one is unmet, hint at the unresolved intent without saying what was wrong.",
    moves: [
      "Keep the persona and the register of the original user on every steering prompt.",
      "Advance only when every milestone for that turn is reached.",
      "Hint by pointing back at context the user would plausibly remember, not at the value.",
      "Ship finished artifacts only. Nothing in the golden folder may describe how the answer was reached.",
    ],
    produces: "The golden artifacts, and a run that proves the rubric set is passable.",
    rule: {
      label: "The golden passes its own block",
      body: "Anything the golden fails is a broken criterion, not a broken golden.",
    },
    inTask: {
      body: "The model first confused the roughly $15,000 Sunset fee with the $50,000 all in estimate. The correction stayed in Leonard's voice and pointed back at an early December conversation, so the model found the figure itself.",
      link: { to: `${GT}#golden`, tag: "GT", label: "The golden deliverables" },
    },
  },
  {
    n: 9,
    id: "subjective",
    phase: "Grade",
    title: "Subjective rubrics",
    slogan: "Judge the render. Nothing the prompt asked for.",
    means:
      "Put the golden artifact and the Model A artifact side by side and let the real differences write the criteria. A presentation choice that helps the reader becomes a positive, one that hurts becomes a negative. Anything the prompt explicitly required belongs in the objective block instead.",
    moves: [
      "Name one identifiable element and one visible property per criterion.",
      "Weight by impact on the reader's experience, not by difficulty.",
      "Grade only what the format can actually show. A PDF cannot respond to hover.",
      "Rate every criterion against both models yourself. Pre-filled selections are not to be trusted.",
    ],
    produces: "A presentation block a reviewer can locate and score on the render alone.",
    rule: {
      label: "Ten or more, and no filler",
      body: "No looks professional, no well designed, no high quality. Name the property, or cut the criterion.",
    },
    inTask: {
      body: "Ten criteria came out of one comparison of the two rendered SVGs. Model A's percentage slot reads needs estimate at headline weight, which is an artifact handed over asking its reader to finish it.",
      link: { to: `${GT}#subjective`, tag: "GT", label: "The ten criteria and what they caught" },
    },
  },
];

/** The three habits that decide whether the method above produces anything. */
export const mindset = [
  {
    id: "shoes",
    title: "Step into the user's shoes",
    body: "The scenario should be one a real person in that universe would actually be living through, not a benchmark dressed up as a story.",
  },
  {
    id: "evidence",
    title: "Let the evidence lead",
    body: "Difficulty comes from sources that have to agree, not from asking for more things. Two sources that disagree beat five that repeat each other.",
  },
  {
    id: "plan",
    title: "Plan before you run",
    body: "The prompt, the arc and the answer are settled while the scenario is still in front of you. Everything after that inherits whatever you decided here.",
  },
];

/** The client's hard requirements, restated in the register CBs read them in. */
export const hardRequirements = [
  { label: "Complex", body: "Planning, recovery, and work across several artifacts, tools or sources." },
  { label: "Long horizon", body: "State that survives three to five turns, deferred assets included." },
  { label: "Revision handling", body: "At least one turn changes the brief after something was delivered." },
  { label: "Multimodal", body: "Media required for a core requirement, enforced by the ablation." },
  { label: "Cross-modal", body: "One step's output becomes the next step's necessary input." },
  { label: "Objective", body: "Every output grounded in a rule or source stated in the prompt." },
  { label: "Subjective quality", body: "A rendered artifact whose presentation can be judged." },
  { label: "Model A fails", body: "At least 50% of the final rubric score, on failures that matter." },
];
