import type { MethodStep } from "./types";

const GT = "/golden-tasks/charge-disputes";

/**
 * The method for Green Shell, eleven steps, in the order they actually happen.
 *
 * Rewritten against [External] Green Shell Guidelines v1, and brought up to the
 * Oct 8, 2026 revision: fourteen assigned parameters rather than seven, every
 * assigned input modality covered, the execution target stated in the prompt.
 * The Nov 11, 2026 revision (v3) reordered the back half to the platform's
 * order: the golden runs first (step 7), 8 pass@k runs follow on their own
 * (step 8), both rubric blocks are built from the golden (steps 9 and 10), and
 * grading all 8 runs and rating the first valid Opus run close the task
 * (step 11). Leg A is gone. The `failure` id stays on the last step because
 * that is where model failure is measured now, and links from outside the
 * hub name it. The project is single turn, so the
 * milestone step is gone and the prompt is its own step: there is one prompt
 * and it has to carry everything.
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
    slogan: "Fourteen are assigned. None of them is a suggestion.",
    means:
      "A task arrives with fourteen parameters already decided: the task type, the use case and the subcategory, the universe, the scenario, the assigned tools, the output artifact, the primary and secondary capabilities, the input and output modalities, the execution target, the verification condition, and the access the scenario assumes. They are binding client requirements. A deviation is allowed only where the universe genuinely cannot support a parameter or the scenario is too simple to bring the average pass@k score down to 0.7 or below, and only as far as that strictly needs.",
    moves: [
      "Read your subcategory definition and its scope check before anything else, and read the pair by the user's intent rather than by what the input files are about.",
      "Check the neighbouring subcategory inside the same use case. Fitting one of those better is a category relevance failure even though the use case is right.",
      "Confirm the assigned tools are loaded, then name the step each one is necessary for. The correct final state has to depend on them.",
      "Treat the rest as the boundaries: every assigned input modality covered, the deliverable inside the output modalities, the execution target stated in the prompt, the verification condition covered without its answers in the prompt.",
    ],
    produces: "Every parameter in the task, and the scope check that proves the fit.",
    rule: {
      label: "Drift from any assigned parameter is an automatic rejection",
      body: "Omitting or substituting one makes the task invalid, however good the rest of it is. The 6 categories and 16 subcategories are retired: the taxonomy is now 11 use cases and 68 subcategories.",
    },
    inTask: {
      body: "A receipts and disputes task sits in Personal finance, under detecting and disputing erroneous charges. What fixes the pair is the user's intent, contesting charges she believes are wrong. The receipts and the bank records are only how that intent is evidenced, and they would have pointed at a different subcategory on their own. It was built when seven parameters were assigned, so its walkthrough also shows how the audit reads the two modalities a task that old never carried: off the scenario.",
      link: { to: `${GT}#parameters`, tag: "GT", label: "What it was assigned, and what each one binds" },
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
      "Use SQL, or download the whole universe, for the tables, relationships and edge cases the visualizers never surface.",
      "Anchor to dates you have actually seen. Universe calendars are fixed, so next Tuesday can land on a week that holds nothing.",
    ],
    produces: "A grounded situation, with the records that prove it.",
    rule: {
      label: "A thin loadout is an environment defect, not a model failure",
      body: "If only a few servers are loaded the universe loaded wrong, and it has to be reloaded before you continue. Claiming the universe cannot support the scenario when exploring it would have shown it can fails the task automatically. Add the Service Universe Artifact ID before you deploy, whatever the Universe Creator calls it.",
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
      "Put every date searched on a live server, such as a Duffel flight, at least a month after the day you write the task, so it can still be run when the client reviews it.",
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
    links: [
      { to: "/failure-approach", tag: "FA", label: "Real Opus failures to build the scenario around" },
      { to: "/alignments#flag-genuine-complexity", tag: "UA", label: "44 tasks rejected: complexity has to come from the scenario" },
      { to: "/alignments#flag-live-dates", tag: "UA", label: "Dates searched on a live server need at least a month of room" },
    ],
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
      "Cover every assigned input modality, each carrying part of the answer, so no single source carries the whole of it. An image earns its slot by what has to be seen in it, not by the text it happens to contain.",
      "Keep health inputs mocked or synthetic, and keep the answer out of every filename.",
    ],
    produces: "An input set where each file earns its place.",
    rule: {
      label: "At least three multimodal inputs per task",
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
      "The task is single turn. One prompt is sent automatically when you submit. You steer the golden from it, and each of the 8 pass@k runs answers it once, with no follow-ups. Anything you expect the agent to produce has to be requested here, in the user's own voice, or it cannot be graded at all.",
    moves: [
      "Name every expected output file, spelled exactly as it has to appear.",
      "Open with a realistic goal and close with a clear call to action, in language a real person would use.",
      "State today's date in the user's voice, matching the date the universe assumes, so that tonight or in time has one right answer.",
      "Require action inside the assigned universe, subcategory and tools, without naming the tools as calls.",
      "State the assigned execution target and any limit on the run, such as nothing sent, and keep the answers to the verification condition out of the prompt.",
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
    links: [
      { to: "/alignments#flag-dates", tag: "UA", label: "Anchor the prompt and the rubric to a stated date" },
    ],
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
    id: "golden",
    phase: "Golden",
    title: "Golden solution",
    slogan: "Point at the intent. Never at the answer.",
    inherits:
      "Design is finished and the prompt goes out. The golden is the first run, so it proves the task can be solved in this universe, with these inputs, before a single criterion exists.",
    means:
      "The golden comes first. You act as the user simulator and steer the model until it produces the ideal response to the prompt as written. Hinting is the method for getting there, not an optional extra. Both rubric blocks are built from this golden, so a weak golden weakens every criterion written from it.",
    moves: [
      "Keep the original intent, context and persona consistent from the first message to the last.",
      "Hint by pointing back at context the user would plausibly remember, never at the value.",
      "Check every output against your GTFA before you complete the conversation. If the universe cannot deliver what the prompt asks, fix the task and restart the golden.",
      "Ship finished artifacts only. Nothing in them may describe how the answer was reached.",
      "Download the trajectory and the final artifacts. The rubrics are built from them.",
    ],
    produces: "A validated golden, the reference both rubric blocks are built from.",
    rule: {
      label: "The golden and the GTFA agree",
      body: "The rubric does not exist yet. Where the golden and your GTFA differ, decide which side is wrong: correct the GTFA if it misread the prompt, the inputs or the data, and steer again if the golden missed a valid requirement. Reaching it once by accident proves nothing: you have to be able to steer the model there deliberately.",
    },
    inTask: {
      body: "Four steers took the same prompt from two disputes to five. The one that found the hardest of them pointed at her own photographs being taken in a rush, and at what she had filled in by hand. It never mentioned the slip, the restaurant or the figure.",
      link: { to: `${GT}#golden`, tag: "GT", label: "The four steers, and what each one never says" },
    },
    links: [
      { to: "/alignments#flag-golden-agrees", tag: "UA", label: "The golden has to pass its own rubric" },
    ],
  },
  {
    n: 8,
    id: "passk",
    phase: "Pass@k",
    title: "Pass@k runs",
    slogan: "Eight runs start on their own. Plan the rubric while they do.",
    inherits:
      "The golden is complete, so the task is proven solvable. Now the same prompt, word for word, goes to the models with nobody steering, to record how they actually behave.",
    means:
      "Once the golden is complete, 8 pass@k runs launch automatically: 4 on Claude Opus 5.5 and 4 on Muse Wonder 1.1, each answering the prompt once with no follow-ups. Nothing is needed from you while they run, which takes 15 to 20 minutes. The first valid Opus run is the reference run, the one every Present or Not Present rating is checked against.",
    moves: [
      "Start planning the rubric from the golden and your GTFA: walk the prompt and list every ask that will need a criterion.",
      "Download the first valid Opus run, its trajectory and its final artifacts, once it finishes. It is the reference run, the run the platform calls Model A.",
      "Retry or replace a run that fails or ends with an error. You can move on once 4 Opus and 4 Muse runs have completed without errors.",
      "Read the Trajectory Validator's flags as signals to check, never as conclusions.",
    ],
    produces: "Eight runs to grade, and the reference run to rate.",
    rule: {
      label: "Not every failure is yours to keep",
      body: "A broken run is never a model failure. Neither is a requirement the model never saw, an undecided source conflict, or media no person could read: those are task defects. A legible value misread, or an accessible tool left unused, is a real finding.",
    },
    inTask: {
      body: "This task predates pass@k. Its prompt went out once, to a single Opus 5 run made before its golden: 71 tool calls, one page and three drafts, two of the five disputes found. That one run plays the part the reference run plays today.",
      link: { to: `${GT}#runs`, tag: "GT", label: "The one run this task was measured on" },
    },
    links: [
      { to: "/failure-approach", tag: "FA", label: "How Opus actually fails, case by case" },
    ],
  },
  {
    n: 9,
    id: "rubrics",
    phase: "Rubrics",
    title: "Objective rubrics",
    slogan: "Grade what was delivered, not how it got there.",
    inherits:
      "The golden showed what the task can deliver, and the GTFA said what it should hold. The criteria are built from those two, never shaped around what the runs happened to do.",
    means:
      "Build the criteria from the golden and the GTFA. At least 80% of them grade completion, which is the artifact, the state change or the final message. At most 20% grade process, and zero is the preferred number. A criterion the golden could not satisfy is a broken criterion, not a harder task.",
    moves: [
      "Write the completion version of every criterion first. A reasoning decision is graded where it lands in the deliverable.",
      "Embed the exact value, filename, date or classification, copied from the source rather than typed from memory.",
      "Grade a live price, rate or availability as the value retrieved during the run, with yours in parentheses as an example, never as a fixed figure.",
      "Keep a process criterion only where no deliverable can show the failure.",
      "Give a group of more than eight similar outcomes one completeness criterion and at most five spot checks.",
      "Use fixed dates and the user's own boundary. A rule of below 40 counts 40 or above, and a value sitting exactly on the line is settled or accepted both ways.",
      "Search the prompt as submitted and every criterion for ](http and \\_, the marks an editor leaves when it turns a name into a link.",
      "Write criteria only for what the prompt, its inputs and the universe require, and keep the ones the runs pass. A criterion stretched to make a run fail is a rubric issue, not a failure.",
    ],
    produces: "A block that can be rated without you in the room, and that the golden passes in full.",
    rule: {
      label: "Two issues fail the task on their own",
      body: "Process over the 20% cap, and any criterion that only checks a file, section, column or record exists. Both are automatic fails whatever the severity percentages say.",
    },
    inTask: {
      body: "Twenty six criteria, each pinning its own transaction id, amount, date and filename. None of them targets the trajectory, which is the preferred number rather than merely inside the cap, and not one checks only that something exists.",
      link: { to: `${GT}#rubrics`, tag: "GT", label: "All 26 criteria and how the reference run rated" },
    },
    links: [
      { to: "/alignments#flag-genuine-complexity", tag: "UA", label: "Complexity has to come from the scenario, not from a stretched rubric" },
      { to: "/alignments#flag-thresholds", tag: "UA", label: "A correct answer must never fail a criterion" },
      { to: "/alignments#flag-link-code", tag: "UA", label: "No link code in the prompt or the criteria" },
      { to: "/alignments#flag-dynamic-values", tag: "UA", label: "A live value is graded as retrieved, never as a fixed figure" },
    ],
  },
  {
    n: 10,
    id: "subjective",
    phase: "Rubrics",
    title: "Subjective rubrics",
    slogan: "Judge the render. Nothing the prompt asked for.",
    inherits:
      "Everything the prompt demanded is graded in the objective block. What is left is how the deliverable reads to the person who asked for it, and the golden's render is the reference for that.",
    means:
      "Put the golden artifact and the reference run's artifact side by side and let the real differences write the criteria, each one written against what the golden's render actually shows. A presentation choice that helps the reader becomes a positive, one that hurts becomes a negative. Anything the prompt explicitly required belongs in the objective block instead.",
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
  {
    n: 11,
    id: "failure",
    phase: "Pass@k",
    title: "Grading and rating",
    slogan: "Read the score. Never tune the rubric to it.",
    inherits:
      "Both blocks are built and the 8 runs are waiting. Grading measures the task against the models, and rating checks that measurement on the reference run.",
    means:
      "Click Grade runs and the agentic judge grades all 8 runs against your rubrics. Their average score has to fall between 0.3 and 0.7, and it has to come from genuine rubrics aligned with the golden. Then verify every prefilled Present or Not Present on the first valid Opus run, and justify every failure.",
    moves: [
      "Add the eight run scores, four Opus and four Muse, and divide by 8. The panel is for information and does not block submission: the range is yours to check.",
      "Above 0.7, the task is too easy: revisit the scenario's complexity, never the rubric set.",
      "Below 0.3, check that every criterion accepts every valid answer and that no run broke. If both hold, revisit the scenario.",
      "Change a criterion only to fix a genuine defect, then grade the 8 runs again. A change to the prompt or the inputs means a new golden and new runs.",
      "Open the reference run's trajectory and artifacts and verify every prefilled rating, in both blocks: the evidence for each Present, the failing line or value for each Not Present. Correct whatever is wrong.",
      "Justify every failure in three parts: why the rubric is correct, where the run failed, and why it is necessary.",
    ],
    produces: "A score in range that nobody tuned, and ratings you checked yourself.",
    rule: {
      label: "The preferred run changes nothing here",
      body: "All 8 runs are generated and all 8 are graded, whichever run is marked as preferred. Prefilled ratings are the judge's verdicts, and they are not yours until you have checked every one.",
    },
    inTask: {
      body: "This task was rated before pass@k, so it has no 8-run average. Its one Opus 5 run opened the receipt at tool call 3 and found the sale email at call 52, then cleared the charge anyway. Rated criterion by criterion, it lost 36 of the 69 positive weight in the objective block, on four findings that each change what the user does next.",
      link: { to: `${GT}#model-a`, tag: "GT", label: "Where the run broke, and how it was rated" },
    },
    links: [
      { to: "/failure-approach#keeps-passing", tag: "FA", label: "Score above 0.7? Find out why first" },
      { to: "/alignments#flag-genuine-complexity", tag: "UA", label: "Out of range? Change the scenario, never the rubric" },
    ],
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
  { label: "Parameters followed", body: "All fourteen assigned parameters implemented exactly, with no omission, substitution or drift." },
  { label: "Multimodal", body: "Media required for a core requirement, enforced by the ablation, and images that need real visual interpretation." },
  { label: "Cross-modal", body: "One step's output becomes the next step's necessary input." },
  { label: "Objective", body: "Every output asked for in the prompt and grounded in the prompt, the inputs or the universe." },
  { label: "Subjective quality", body: "A rendered artifact whose presentation can be judged." },
  { label: "Pass@k score in range", body: "The average score of the 8 pass@k runs falls between 0.3 and 0.7, from genuine rubrics built from the golden." },
];
