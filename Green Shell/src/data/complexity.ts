import type { ComplexityField, ComplexityProposal } from "./types";
import { artifactOptions, primaryOptions, secondaryOptions, toolOptions } from "./claimSheet";

/**
 * The Increase Complexity Proposals tool.
 *
 * The form collects the assigned parameters and the scenario, then asks the
 * model for a small set of concrete additions. **It never rewrites the
 * scenario.** Every proposal is something the contributor reads, judges and
 * applies by hand, which is why each one states what it adds, why that is real
 * difficulty, and what it leaves exactly as assigned.
 *
 * **Every parameter is a closed list.** Nothing is typed: the use case and
 * subcategory come from `taxonomy.ts` (guidelines 1.1.1), the universe from
 * `universes.ts` (generated from the exports on Drive), and the artifact,
 * capability and tool vocabularies from `claimSheet.ts` (the single turn claim
 * sheet and the complexity bar). A contributor can only submit values the
 * project actually defines, so a typo or an invented capability cannot reach the
 * model and come back as a proposal built on it.
 *
 * The scenario is the one exception, and it has to be: it is prose unique to the
 * task, so there is no option set to pick from, and reading *this* scenario is
 * the whole job. For the ten tasks on the claim sheet even that is a selection —
 * the picker fills the scenario along with every other field.
 *
 * The universe context is no longer asked for either. It used to be a paste of
 * what the Database tab agent said; it is now derived from the selected
 * universe's own export, so it is always accurate and never retyped.
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
    empty: "Select the assigned use case",
  },
  {
    id: "subcategory",
    label: "Subcategory",
    hint: "L2, assigned",
    kind: "subcategory",
    required: true,
    assigned: true,
    empty: "Select the assigned subcategory",
  },
  {
    id: "universe",
    label: "Universe",
    hint: "The assigned universe",
    kind: "universe",
    required: true,
    assigned: true,
    empty: "Select the assigned universe",
  },
  {
    id: "artifact",
    label: "Output artifact",
    hint: "What the task has to produce",
    kind: "select",
    required: true,
    assigned: true,
    options: artifactOptions,
    empty: "Select the assigned artifact",
  },
  {
    id: "primary",
    label: "Primary capability",
    hint: "Assigned",
    kind: "select",
    required: true,
    assigned: true,
    options: primaryOptions,
    empty: "Select the assigned primary capability",
  },
  {
    id: "secondary",
    label: "Secondary capabilities",
    hint: "Assigned. Pick every one",
    kind: "multi",
    required: true,
    assigned: true,
    options: secondaryOptions,
    empty: "Tap each secondary capability you were assigned",
  },
  {
    id: "tools",
    label: "Assigned tools",
    hint: "Where the scenario names them",
    kind: "multi",
    required: false,
    options: toolOptions,
    empty: "Tap any connector the task was assigned. Leave empty if none were",
  },
  {
    id: "scenario",
    label: "Scenario",
    hint: "Assigned. The only parameter with any give",
    kind: "textarea",
    required: true,
    assigned: true,
    placeholder:
      "The scenario as it was assigned to you, in the user's voice. Paste it exactly rather than summarising it. Picking a task from the claim sheet above fills this in for you.",
  },
];

/**
 * The example output, shown with claim sheet task ST-007 so the page is
 * reviewable before an endpoint is configured. These are real proposals for that
 * task.
 */
export const exampleRef = "ST-007";

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
export const complexitySystemPrompt = `You are reviewing a single turn multimodal agent task for the OpenClaw MM Rubrics project (Green Shell) and proposing ways to raise its genuine complexity.

You never rewrite the scenario. You propose additions and adjustments the contributor will apply by hand.

Hard constraints on every proposal:
- The assigned use case (L1) and subcategory (L2) stay exactly as given. The pair has to remain the natural home of the scenario, judged by the user's intent and not by what the files are about.
- All assigned parameters stay as given: universe, output artifact, primary capability, secondary capabilities, and any assigned tools. Only the scenario may be adjusted, and only so far as its core nature, intent and type stay intact.
- Where tools are assigned, propose work that genuinely needs them: browsing for external research, cross referencing or a value only correct at run time, and image generation for a visual asset the model produces and places in the artifact. Never propose a call added only to show the tool was used.
- Everything you propose must be supported by the universe context provided. It lists the services loaded in this universe, how many records each holds and the window they fall in. Never invent a service, a record type or a date range that is not in it.
- Complexity must be genuine: evidence that has to be reconciled across sources and modalities. Never artificial friction, extra unrelated asks, contrived constraints, or more things to do for their own sake.
- The task is single turn. Everything lands in one prompt, so never propose follow up turns, revision turns or milestones.
- Respect the multimodal requirement: at least three inputs, and more where the scenario naturally carries them. Health inputs must be mocked or synthetic. Images must carry visual information the model has to interpret, such as objects, products, real environments, charts, diagrams, maps or layouts, never another screenshot of text.
- Keep the deliverable at or above the complexity bar for its type. The P0 artifacts are the explainer video with several data driven scenes, interactive HTML with interaction that actually works, and the dashboard with several linked views over data the model extracted itself.
- The task must stay realistic. A real person in that universe has to plausibly be living through it.

Return between 3 and 5 proposals, ordered by how much difficulty they add for how little added length. For each one give: a short title, what it adds concretely, why that is real difficulty rather than friction, the multimodal inputs it implies, how it helps the deliverable clear its bar, and what it deliberately leaves as assigned.

Prefer proposals that add an axis of reasoning over proposals that add another item to check. A source that contradicts another source is worth more than five that repeat each other.`;
