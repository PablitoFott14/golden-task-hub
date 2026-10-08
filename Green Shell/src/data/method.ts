import type { MethodStep } from "./types";

const GT = "/golden-tasks/charge-disputes";

/**
 * The method for Green Shell, ten steps, in the order they actually happen.
 *
 * Rewritten against [External] Green Shell Guidelines v1. The project is single
 * turn, so the milestone step is gone and the prompt is its own step: there is
 * one prompt and it has to carry everything.
 *
 * The order is the argument. Step 1 is the assigned pair, because every later
 * decision is checked back against it; step 2 is the universe, because the
 * loadout decides which scenarios that pair can actually support; steps 3 and 4
 * are where the two meet and produce the scenario and the evidence it needs.
 *
 * `inTask` points at the section of the Golden Task walkthrough that implements
 * the step. The published task is single turn and built against these
 * guidelines, so every step carries one: the walkthrough is one section per
 * step, in this order, which is the relationship the whole hub is built on.
 */
export const methodSteps: MethodStep[] = [
  {
    n: 1,
    id: "parameters",
    phase: "Design",
    title: "Task parameters",
    slogan: "Seven are assigned. None of them is a suggestion.",
    means:
      "A task arrives with its parameters already decided: category, subcategory, universe, scenario, output artifact, primary capabilities and secondary capabilities. They are binding client requirements. Only the scenario has any give, and only as far as reaching the complexity bar while its core nature and intent stay as assigned.",
    moves: [
      "Read your subcategory definition and its scope check before anything else, and assign by the user's intent rather than by what the input files are about.",
      "Check the neighbouring subcategory inside the same use case. Fitting one of those better is a category relevance failure even though the use case is right.",
      "Confirm the assigned tools, then name the step each one is necessary for. Where the scenario names them, the correct final state has to depend on them.",
      "Keep the pair in front of you. The universe, the scenario, the inputs and the prompt are each checked back against it.",
    ],
    produces: "An assigned pair you can defend, and the scope check that proves the fit.",
    rule: {
      label: "Drift from any assigned parameter is an automatic rejection",
      body: "Omitting or substituting one makes the task invalid, however good the rest of it is. The 6 categories and 16 subcategories are retired: the taxonomy is now 11 use cases and 68 subcategories.",
    },
    inTask: {
      body: "A receipts and disputes task sits in Personal finance, under detecting and disputing erroneous charges. What fixes the pair is the user's intent, contesting charges she believes are wrong. The receipts and the bank records are only how that intent is evidenced, and they would have pointed at a different subcategory on their own.",
      link: { to: `${GT}#parameters`, tag: "GT", label: "All seven, and what each one binds" },
    },
  },
  {
    n: 2,
    id: "universe",
    phase: "Design",
    title: "Universe interaction",
    slogan: "Go find the story. Do not invent one.",
    inherits:
      "Step 1 handed you a fixed pair and the scope check that proves it. You are no longer looking for a good situation, only for the one this universe can evidence inside that pair.",
    means:
      "Open the universe holding the assigned pair in view. The loadout decides what the task can be, so read the services, the people and the workflows until a situation shows up that the data already supports. The scenario you pick has to be one the universe can prove.",
    moves: [
      "Confirm what is actually loaded in the Universe Explorer before designing anything around a service.",
      "Interact with the AI agent in the Database tab. Inspecting by hand is what leads people to conclude there is no connection when there is one.",
      "Use SQL for the tables, relationships and edge cases the visualizers never surface.",
      "Anchor to dates you have actually seen. Universe calendars are fixed, so next Tuesday can land on a week that holds nothing.",
    ],
    produces: "A grounded situation, with the records that prove it.",
    rule: {
      label: "A thin loadout is an environment defect, not a model failure",
      body: "If only a few servers are loaded the universe loaded wrong, and it has to be reloaded before you continue. Add the Service Universe Artifact ID before you deploy, whatever the Universe Creator calls it.",
    },
    inTask: {
      body: "Marisela Ybarra's universe carries four months of charges, the order emails and written estimates that price them, and a calendar. One of the five disputes is settled only by that calendar, which is not one of the task's assigned connectors, and nothing in the two that are assigned contradicts the receipt.",
      link: { to: `${GT}#universe`, tag: "GT", label: "Which service decides which finding" },
    },
  },
  {
    n: 3,
    id: "scenario",
    phase: "Design",
    title: "The scenario and the GTFA",
    slogan: "Solve it yourself before you ask anyone else to.",
    inherits:
      "The pair says what the task has to be about. The universe says what can actually be proved. The scenario is the one situation where both are true at once, which is why it comes third and not first.",
    means:
      "The scenario is where the assigned pair and the universe meet. Build it so the pair is its natural home, then resolve the answer completely. The Ground Truth Final Answer is the end state you grade everything against, so it exists before the first run, not after it.",
    moves: [
      "Settle the deliverable first. It clears the complexity bar for its type or the scenario is not finished.",
      "Keep the thresholds and rules in the inputs, so finding them is part of the work.",
      "Build friction that the situation would really produce, never constraints bolted on to look hard.",
      "Resolve the GTFA down to the values: the totals, the dates, the classifications, the edge cases.",
    ],
    produces: "A scenario the pair explains, and the one answer it has to reach.",
    rule: {
      label: "Complexity is planned, never patched in",
      body: "Do not improvise and do not wait for the model to fail before adding difficulty. Expect to spend at least two hours understanding the scenario and grounding it before the task is ready.",
    },
    inTask: {
      body: "Twelve charges were resolved to the cent before the prompt was sent: five to dispute, four company purchases against a monthly cap, three correct and shown as correct. The answer also fixes what must not happen, and which different but defensible readings still count as right.",
      link: { to: `${GT}#gtfa`, tag: "GT", label: "The resolved answer, charge by charge" },
    },
  },
  {
    n: 4,
    id: "inputs",
    phase: "Design",
    title: "Multimodal inputs",
    slogan: "Three is the floor. It is not the target.",
    inherits:
      "The scenario fixes the moment and the deliverable. That decides the evidence: what this person would really be holding, and how much of it the deliverable forces the agent to reconcile.",
    means:
      "Pick evidence that belongs to the moment the scenario describes, in the formats that moment would produce. A handwritten total belongs on paper, a confirmation belongs in a screenshot, a rule with thresholds belongs in a document. Realistic noise stays in.",
    moves: [
      "Use as many inputs as the scenario naturally needs. Most tasks need substantially more than three to clear the complexity bar.",
      "Give every file a purpose. Required signal or a deliberate distractor, never decoration.",
      "Spread the evidence across modalities, so no single source carries the whole answer. An image earns its slot by what has to be seen in it, not by the text it happens to contain.",
      "Keep health inputs mocked or synthetic, and keep the answer out of every filename.",
    ],
    produces: "An input set where each file earns its place.",
    rule: {
      label: "At least three multimodal inputs in the Model A conversation",
      body: "Three is the minimum requirement rather than the goal, and trimming a task down to three or slightly more is the mistake the rule exists to stop.",
    },
    inTask: {
      body: "Nine files, in the state someone who keeps receipts badly would really have them. One photograph carries two unrelated receipts, two arrive rotated and folded across the line that decides the dispute, and the ninth file is the layout of the page rather than evidence.",
      link: { to: `${GT}#inputs`, tag: "GT", label: "Nine files, and the fact each one carries" },
    },
  },
  {
    n: 5,
    id: "prompt",
    phase: "Design",
    title: "The initial prompt",
    slogan: "One prompt. Everything the task needs is in it.",
    inherits:
      "Pair, universe, scenario, GTFA and inputs are all settled. The prompt is where every one of them becomes the only thing the agent will ever see.",
    means:
      "The task is single turn. One prompt is sent automatically when you submit, and the agent answers it once. Anything you expect the agent to produce has to be requested here, in the user's own voice, or it cannot be graded at all.",
    moves: [
      "Name every expected output file, spelled exactly as it has to appear.",
      "Open with a realistic goal and close with a clear call to action, in language a real person would use.",
      "Require action inside the assigned universe, subcategory and tools, without naming the tools as calls.",
      "Leave room for subjectivity. State the visual requirements you want graded objectively, and no more.",
    ],
    produces: "The one prompt the whole task is built on.",
    rule: {
      label: "The Draft History is not embedded in the agent",
      body: "The prompt and the multimodal context are the only context the agent has. A requirement that lives only in the Desired Outcome was never asked for, so no criterion may grade it.",
    },
    inTask: {
      body: "The one prompt names the page to produce, says the drafts are not to be sent, fixes the window to the charges between May and July, and states the $50 monthly rule once in her own words. The rules that decide which charges hold up are left in the attachments and the universe, where the agent has to go and find them.",
      link: { to: `${GT}#prompt`, tag: "GT", label: "Every span of the prompt that is doing work" },
    },
  },
  {
    n: 6,
    id: "draft-history",
    phase: "Design",
    title: "Draft History",
    slogan: "Say why the agent is there, not what to type.",
    inherits:
      "The prompt is written. Draft History records the same scenario formally, and each field has to agree with it: the category and subcategory from step 1, the outcome from step 3, the files from step 4.",
    means:
      "The Agent Objective explains why this person needs help and what success looks like, without revealing the steps. The Desired Outcome states the end state in inspectable terms: each artifact named, what has to be inside it, and the logic that produces it.",
    moves: [
      "Write the objective at a level a colleague could act on without being told the method.",
      "Write the outcome as observable results, never as statements of intent.",
      "Confirm the category and subcategory fields against the universe you actually built on.",
      "Check that every requirement you plan to grade also appears in the prompt the agent receives.",
    ],
    produces: "The formal record the rubrics and the golden are both measured against.",
    rule: {
      label: "A format rule that lives only here cannot be graded",
      body: "The Desired Outcome is internal to you. If a rule has to hold in the deliverable, it has to appear in the prompt as well.",
    },
    inTask: {
      body: "Every output the rubrics check is asked for out loud in the one prompt: the page, the four fields on each row, the date filter, the buttons and the six drafts. The item easiest to get wrong, leaving a recipient blank rather than inventing one, is written into both.",
      link: {
        to: `${GT}#draft-history`,
        tag: "GT",
        label: "Each outcome item, beside the line that asks for it",
      },
    },
  },
  {
    n: 7,
    id: "failure",
    phase: "Leg A",
    title: "Model failure",
    slogan: "If the model sails through, the task is not ready.",
    inherits:
      "Design is finished and the prompt goes out once. What comes back is measured against the GTFA you resolved in step 3, not against what looks reasonable.",
    means:
      "The prompt goes out and the agent answers it once. Measure that answer against the GTFA. You are looking for genuine failure across at least half the rubric weight, on failures that materially affect what the user asked for. Failures are found, never manufactured.",
    moves: [
      "Score the run against the GTFA before writing a single criterion.",
      "Restructure the task if the run captures the whole intent, or if what it missed is cosmetic.",
      "Separate a real failure from a broken run. A session abort or a forbidden input format is your defect, not a weakness you found.",
      "Keep the trajectory and the artifacts. They are what the objective block is written against.",
    ],
    produces: "A trajectory that fails honestly, on things that matter.",
    rule: {
      label: "Not every failure is yours to keep",
      body: "A requirement the model never saw, an undecided source conflict, or media no person could read either are task defects. A legible value misread, or an accessible tool left unused, is a real finding.",
    },
    inTask: {
      body: "Model A opened the receipt at tool call 3 and found the sale email at call 52, then cleared the charge anyway. It lost 36 of the 69 positive weight in the objective block and all 23 in the subjective one, on four findings that each change what the user does next.",
      link: { to: `${GT}#model-a`, tag: "GT", label: "Where the run actually broke" },
    },
  },
  {
    n: 8,
    id: "rubrics",
    phase: "Grade",
    title: "Objective rubrics",
    slogan: "Grade what was delivered, not how it got there.",
    inherits:
      "The run handed you a trajectory and a set of artifacts. The criteria are written against those, and against the GTFA that already said what should have been in them.",
    means:
      "Write the criteria against the downloaded trajectory and artifacts. At least 80% of them grade completion, which is the artifact, the state change or the final message. At most 20% grade process, and zero is the preferred number.",
    moves: [
      "Write the completion version of every criterion first. A reasoning decision is graded where it lands in the deliverable.",
      "Embed the exact value, filename, date or classification, copied from the source rather than typed from memory.",
      "Keep a process criterion only where no deliverable can show the failure.",
      "Give a group of more than eight similar outcomes one completeness criterion and at most five spot checks.",
    ],
    produces: "A block that can be rated without you in the room.",
    rule: {
      label: "Two issues fail the task on their own",
      body: "Process over the 20% cap, and any criterion that only checks a file, section, column or record exists. Both are automatic fails whatever the severity percentages say.",
    },
    inTask: {
      body: "Twenty six criteria, each pinning its own transaction id, amount, date and filename. None of them targets the trajectory, which is the preferred number rather than merely inside the cap, and not one checks only that something exists.",
      link: { to: `${GT}#rubrics`, tag: "GT", label: "All 26 criteria and how Model A rated" },
    },
  },
  {
    n: 9,
    id: "golden",
    phase: "Leg B",
    title: "Golden solution",
    slogan: "Point at the intent. Never at the answer.",
    inherits:
      "The criteria define what passing means. Leg B has to prove the set is actually passable, on the same prompt, word for word.",
    means:
      "A new conversation on the same prompt, word for word, against a different model. You act as the user simulator and steer until the model produces the ideal response to that prompt. Hinting is the method for getting there, not an optional extra.",
    moves: [
      "Keep the original intent, context and persona consistent from the first message to the last.",
      "Hint by pointing back at context the user would plausibly remember, never at the value.",
      "Keep the no leak rule on every turn you type, however late in the conversation it is.",
      "Ship finished artifacts only. Nothing in the golden folder may describe how the answer was reached.",
    ],
    produces: "The golden artifacts, and a run that proves the rubric set is passable.",
    rule: {
      label: "The golden passes its own block",
      body: "Anything the golden fails is a broken criterion, not a broken golden. Reaching it once by accident proves nothing: you have to be able to steer the model there deliberately.",
    },
    inTask: {
      body: "Four steers took the same prompt from two disputes to five. The one that found the hardest of them pointed at her own photographs being taken in a rush, and at what she had filled in by hand. It never mentioned the slip, the restaurant or the figure.",
      link: { to: `${GT}#golden`, tag: "GT", label: "The four steers, and what each one never says" },
    },
  },
  {
    n: 10,
    id: "subjective",
    phase: "Grade",
    title: "Subjective rubrics",
    slogan: "Judge the render. Nothing the prompt asked for.",
    inherits:
      "Leg A produced one render and Leg B produced the better one. Everything the prompt demanded is already graded above, so what is left between the two renders is this block.",
    means:
      "Put the golden artifact and the Model A artifact side by side and let the real differences write the criteria. A presentation choice that helps the reader becomes a positive, one that hurts becomes a negative. Anything the prompt explicitly required belongs in the objective block instead.",
    moves: [
      "Name one identifiable element and one visible property per criterion.",
      "Weight by impact on the reader's experience, not by difficulty.",
      "Grade only what the format can actually show. A PDF cannot respond to hover.",
      "Check every literal here too. Literal matching applies to this block just as rigorously.",
    ],
    produces: "A presentation block a reviewer can locate and score on the render alone.",
    rule: {
      label: "Ten or more, and no filler",
      body: "No looks professional, no well designed, no high quality. Name the property, or cut the criterion.",
    },
    inTask: {
      body: "Thirty candidates came out of one comparison of the two pages, and eleven survived. The clearest is a page that contradicts itself on screen: filter the list to June and the only total on it still reads the figure for all four charges.",
      link: { to: `${GT}#subjective`, tag: "GT", label: "The eleven criteria and the renders behind them" },
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
    body: "The pair, the scenario, the prompt and the answer are settled while the scenario is still in front of you. Everything after that inherits whatever you decided here.",
  },
];

/** The client's hard requirements, restated in the register CBs read them in. */
export const hardRequirements = [
  { label: "Complex", body: "Planning, recovery, and work across several artifacts, tools or sources." },
  { label: "Parameters followed", body: "All seven assigned parameters implemented, with no drift." },
  { label: "Multimodal", body: "Media required for a core requirement, enforced by the ablation." },
  { label: "Cross-modal", body: "One step's output becomes the next step's necessary input." },
  { label: "Objective", body: "Every output grounded in a rule or source stated in the prompt." },
  { label: "Subjective quality", body: "A rendered artifact whose presentation can be judged." },
  { label: "Model A fails", body: "At least 50% of the final rubric score, on failures that matter." },
];
