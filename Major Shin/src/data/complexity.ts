import type { ComplexityField, ComplexityProposal } from "./types";

/**
 * The Increase Complexity Proposals tool.
 *
 * The form collects the seven assigned parameters, the scenario, and whatever
 * the contributor learned from the universe, then asks the model for a small
 * set of concrete additions. **It never rewrites the scenario.** Every proposal
 * is something the contributor reads, judges and applies by hand, which is why
 * each one states what it adds, why that is real difficulty, and what it leaves
 * exactly as assigned.
 *
 * The universe context field is the answer to "how does the model know what is
 * in this universe". Giving the model standing access to every universe is not
 * maintainable, and the contributor has already done this lookup: step 2 of the
 * method has them interrogate the agent in the Database tab. They paste that
 * answer here, so the context is current, scoped to the task, and costs nothing
 * to maintain.
 *
 * The endpoint lives at `VITE_COMPLEXITY_API`. The key never reaches the
 * browser: the page posts this form to a small function, and the function is
 * what holds the credential and talks to the model.
 */

export const complexityFields: ComplexityField[] = [
  {
    id: "useCase",
    label: "Use case",
    hint: "L1, assigned",
    kind: "use-case",
    required: true,
    assigned: true,
  },
  {
    id: "subcategory",
    label: "Subcategory",
    hint: "L2, assigned",
    kind: "subcategory",
    required: true,
    assigned: true,
  },
  {
    id: "universe",
    label: "Universe",
    hint: "The assigned universe",
    kind: "text",
    required: true,
    assigned: true,
    placeholder: "openclaw_mm_marisela_ybarra_commerce_product",
  },
  {
    id: "artifact",
    label: "Output artifact",
    hint: "What the task has to produce",
    kind: "text",
    required: true,
    assigned: true,
    placeholder: "Interactive HTML page",
  },
  {
    id: "primary",
    label: "Primary capabilities",
    hint: "Assigned",
    kind: "text",
    required: true,
    assigned: true,
    placeholder: "reconcile_amounts",
  },
  {
    id: "secondary",
    label: "Secondary capabilities",
    hint: "Assigned",
    kind: "text",
    required: true,
    assigned: true,
    placeholder: "ocr, manage_contradictions, compute_answer",
  },
  {
    id: "tools",
    label: "Assigned tools",
    hint: "Where the scenario names them",
    kind: "text",
    required: false,
    placeholder: "Leave blank if none were assigned",
  },
  {
    id: "scenario",
    label: "Scenario",
    hint: "Assigned. The only parameter with any give",
    kind: "textarea",
    required: true,
    assigned: true,
    placeholder:
      "The scenario as it was assigned to you, in the user's voice. Paste it exactly rather than summarising it.",
  },
  {
    id: "universeContext",
    label: "Universe context",
    hint: "What the Database tab agent told you",
    kind: "textarea",
    required: true,
    placeholder:
      "Paste what you learned exploring the universe: the services actually loaded, the records and date ranges you found, the people and workflows the scenario can anchor to. The proposals are only as good as this.",
  },
];

/**
 * A worked example, so the page shows what it produces before an endpoint is
 * wired up. Taken from a real single turn task in Personal finance.
 */
export const exampleInput = {
  useCase: "Personal finance",
  subcategory: "Detecting & disputing erroneous charges",
  universe: "openclaw_mm_marisela_ybarra_commerce_product",
  artifact: "Interactive HTML page",
  primary: "reconcile_amounts",
  secondary: "ocr, manage_contradictions, compute_answer",
  tools: "",
  scenario:
    "I think the garden centre charged me twice. Two paper receipts attached, one is faded. Go through my accounts for the last sixty days, find the charges these belong to, and tell me whether it is a real duplicate or a hold and a settlement.",
  universeContext:
    "FinTrack holds the transactions with IDs and the last four digits of two accounts. Gmail carries order confirmations and a promotions thread. The calendar has fixed dates in May to July 2026. There is an employer account with a monthly spend allowance.",
};

export const exampleProposals: ComplexityProposal[] = [
  {
    title: "Make one receipt wrong rather than one charge duplicated",
    adds:
      "Add a receipt whose own arithmetic is wrong: a discount the promotions email says applies to the whole range, printed as a zero on two of the lines. The bank total and the receipt total agree, so nothing looks wrong until the email is read against the line items.",
    why: "The duplicate is findable by comparing two numbers. This one cannot be found without reading the image, finding the rule in a different source, and applying it per line. It adds an axis of reasoning rather than another thing to check.",
    inputs: ["A photo of the itemised receipt", "The promotions email carrying the discount window"],
    bar: "Gives the page a second row class to render and explain, which is what moves it from a table to something a reader can interrogate.",
    keeps:
      "Still Personal finance, still detecting and disputing erroneous charges, still the user contesting her own charges.",
  },
  {
    title: "Split the evidence so no single source settles a charge",
    adds:
      "Put the amount on the receipt, the date on the calendar, and the account it landed on in the transaction record, then include one charge where the receipt date and the calendar disagree by a day.",
    why: "It forces a three way reconciliation and makes the conflict a decision rather than a lookup. The agent has to decide which source governs, and the deliverable has to show why.",
    inputs: ["A booking receipt with its own stated dates", "A calendar export covering the same week"],
    bar: "Each disputed row now carries evidence from three places, which is what a linked view is for.",
    keeps: "The intent, the artifact and both capability sets are untouched.",
  },
  {
    title: "Add a class of charge that must be left alone",
    adds:
      "Include regular spending and anything outside the stated window in the same records, with no instruction naming them. The scenario already fixes a date range, so the boundary is already stated.",
    why: "Scope restraint is graded on the deliverable: a page that lists a charge from outside the window is wrong. It raises difficulty without adding a single new ask to the prompt.",
    bar: "Keeps the page honest, since the filter has to actually exclude them rather than render everything.",
    keeps: "No new requirement enters the prompt, so the assigned scenario is unchanged.",
  },
  {
    title: "Give one dispute no recipient",
    adds:
      "Make one of the merchants have no contact address anywhere in the records, while the others do.",
    why: "It creates a case where the correct behaviour is to leave a field for the user rather than invent one. Fabricating an address is exactly the failure the task should be able to catch.",
    bar: "The drafted dispute becomes a thing with state rather than a block of text.",
    keeps: "Still one deliverable, still the same subcategory and intent.",
  },
];

/**
 * The system prompt the function sends. It lives here as the reviewable copy;
 * the function holds the authoritative one, so edit both together.
 */
export const complexitySystemPrompt = `You are reviewing a single turn multimodal agent task for the OpenClaw MM Rubrics project (Major Shin) and proposing ways to raise its genuine complexity.

You never rewrite the scenario. You propose additions and adjustments the contributor will apply by hand.

Hard constraints on every proposal:
- The assigned use case (L1) and subcategory (L2) stay exactly as given. The pair has to remain the natural home of the scenario, judged by the user's intent and not by what the files are about.
- All assigned parameters stay as given: universe, output artifact, primary capabilities, secondary capabilities, and any assigned tools. Only the scenario may be adjusted, and only so far as its core nature, intent and type stay intact.
- Everything you propose must be supported by the universe context provided. Never invent services, records or data that were not described.
- Complexity must be genuine: evidence that has to be reconciled across sources and modalities. Never artificial friction, extra unrelated asks, contrived constraints, or more things to do for their own sake.
- The task is single turn. Everything lands in one prompt, so never propose follow up turns, revision turns or milestones.
- Respect the multimodal requirement: at least three inputs, and more where the scenario naturally carries them. Health inputs must be mocked or synthetic.
- Keep the deliverable at or above the complexity bar for its type. The P0 artifacts are the explainer video with several data driven scenes, interactive HTML with interaction that actually works, and the dashboard with several linked views over data the model extracted itself.
- The task must stay realistic. A real person in that universe has to plausibly be living through it.

Return between 3 and 5 proposals, ordered by how much difficulty they add for how little added length. For each one give: a short title, what it adds concretely, why that is real difficulty rather than friction, the multimodal inputs it implies, how it helps the deliverable clear its bar, and what it deliberately leaves as assigned.

Prefer proposals that add an axis of reasoning over proposals that add another item to check. A source that contradicts another source is worth more than five that repeat each other.`;
