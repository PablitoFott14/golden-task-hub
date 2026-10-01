import type { ClaimSheetTask, ComplexityOption } from "./types";

/**
 * The single turn claim sheet, and the option vocabularies it defines.
 *
 * Source: `single_turn_quick_hits - Tasks.csv`, the sheet contributors claim
 * these tasks from. Every value here is transcribed from it exactly — no
 * value is invented, merged or tidied — because the point of the Complexity
 * form's dropdowns is that a contributor can only pick something the project
 * actually assigns.
 *
 * Two things the CSV cannot supply, and where each comes from instead:
 *
 * - **Use case and subcategory.** The sheet covers 8 of the 11 use cases and
 *   10 of the 68 subcategories. Those two dropdowns are driven by `taxonomy.ts`
 *   instead, which is section 1.1.1 of the guidelines and a strict superset:
 *   every category and subcategory the sheet uses is in it, spelled the same
 *   way. Driving them from the sheet would lock out a contributor assigned any
 *   of the other 58.
 * - **The universe.** Driven by `universes.ts`, generated from the exports on
 *   Drive. All ten universes the sheet uses are among them.
 *
 * The CSV's `MM input` column holds artifact names rather than input types in
 * every row, so it is not used as a vocabulary here. Input choice is step 4 of
 * the method and not an assigned parameter.
 */

/* ------------------------------------------------------------- vocabularies */

/**
 * Output artifact. Two sources, kept apart rather than reconciled: the
 * complexity bar names seven deliverable types and states the floor for each,
 * and the claim sheet writes its own two labels. A contributor picks what their
 * assignment actually says.
 */
export const artifactOptions: ComplexityOption[] = [
  { value: "Explainer video", note: "P0 · several data driven scenes", group: "Complexity bar" },
  { value: "Interactive HTML", note: "P0 · interaction that works", group: "Complexity bar" },
  { value: "Dashboard", note: "P0 · several linked views", group: "Complexity bar" },
  { value: "Presentation", note: "P1 · 10 to 15 slides", group: "Complexity bar" },
  { value: "Designed PDF", note: "P1 · multi page, laid out", group: "Complexity bar" },
  { value: "CSV or structured data", note: "P1 · multi row, derived", group: "Complexity bar" },
  { value: "Document or report", note: "P2 · sections, tables, figures", group: "Complexity bar" },
  { value: "Interactive HTML (dashboard)", group: "As the claim sheet writes it" },
  { value: "HTML", group: "As the claim sheet writes it" },
];

/**
 * Primary capability. The first group is every capability the sheet assigns as
 * a primary; the second is the rest of its capability vocabulary, which it
 * assigns as secondary. Both groups are the sheet's own values — the split is
 * how it uses them, not a judgement about what may be primary — so a
 * contributor assigned one of the others is not locked out.
 */
export const primaryOptions: ComplexityOption[] = [
  { value: "ocr", group: "Assigned as primary on the sheet" },
  { value: "read_fine_detail", group: "Assigned as primary on the sheet" },
  { value: "reason_over_diagram", group: "Assigned as primary on the sheet" },
  { value: "reconcile_amounts", group: "Assigned as primary on the sheet" },
  { value: "extract", group: "Assigned as primary on the sheet" },
  { value: "apply_external_rule", group: "Assigned as primary on the sheet" },
  { value: "compare", group: "Elsewhere on the sheet, as secondary" },
  { value: "compute_answer", group: "Elsewhere on the sheet, as secondary" },
  { value: "convert_or_rebuild", group: "Elsewhere on the sheet, as secondary" },
  { value: "create_from_brief", group: "Elsewhere on the sheet, as secondary" },
  { value: "execution_target", group: "Elsewhere on the sheet, as secondary" },
  { value: "filter_out_of_scope", group: "Elsewhere on the sheet, as secondary" },
  { value: "find_in_another_app", group: "Elsewhere on the sheet, as secondary" },
  { value: "identify_objects_and_attributes", group: "Elsewhere on the sheet, as secondary" },
  { value: "manage_contradictions", group: "Elsewhere on the sheet, as secondary" },
  { value: "reject_false_source", group: "Elsewhere on the sheet, as secondary" },
  { value: "summarize", group: "Elsewhere on the sheet, as secondary" },
  { value: "use_latest_info", group: "Elsewhere on the sheet, as secondary" },
];

/** Secondary capabilities. Every value the sheet's secondary column uses. */
export const secondaryOptions: ComplexityOption[] = [
  { value: "apply_external_rule" },
  { value: "compare" },
  { value: "compute_answer" },
  { value: "convert_or_rebuild" },
  { value: "create_from_brief" },
  { value: "execution_target" },
  { value: "filter_out_of_scope" },
  { value: "find_in_another_app" },
  { value: "identify_objects_and_attributes" },
  { value: "manage_contradictions" },
  { value: "ocr" },
  { value: "reconcile_amounts" },
  { value: "reject_false_source" },
  { value: "summarize" },
  { value: "use_latest_info" },
];

/** Assigned tools, from the sheet's Connectors column. */
export const toolOptions: ComplexityOption[] = [
  { value: "browser" },
  { value: "Finances (Plaid)" },
  { value: "Gmail" },
  { value: "Google Calendar" },
  { value: "Google Contacts" },
  { value: "Google Drive" },
  { value: "Google Sheets" },
  { value: "Google Slides" },
  { value: "muse-image-1.0" },
];

/* ------------------------------------------------------------------ the rows */

export const claimSheet: ClaimSheetTask[] = [
  {
    ref: "ST-002",
    taskId: "6ab82ece4b8df21cfe07add8",
    useCase: "SMB",
    subcategory: "Running business operations",
    universe: "openclaw-openclaw_mm_cyprian_aloysius_bellweather_20260831-universe",
    artifact: "Interactive HTML (dashboard)",
    primary: "ocr",
    secondary: "reconcile_amounts, find_in_another_app, execution_target",
    tools: "Gmail, Google Sheets, Google Contacts",
    scenario:
      "Photographed this week's delivery dockets, eleven of them, two are carbon copies and one has a quantity crossed out and rewritten by hand. Match them against the open lines in the job log Yolanda keeps, then raise the invoices as email drafts to the right customer contacts. Do not send anything. Any docket that does not match a job line, leave it out and tell me.\n\nRequired Output:\nAn interactive HTML dashboard: dockets down one axis and open job lines down the other, each match showing the evidence for it, unmatched dockets in their own pane, and the amended quantity displayed with both readings. A panel lists the drafts that were created, one per matched docket.",
  },
  {
    ref: "ST-003",
    taskId: "6ab82ece4b8df21cfe07add9",
    useCase: "Shopping",
    subcategory: "Hunting best deals & bargaining",
    universe: "openclaw_mm_jayden_brown",
    artifact: "Interactive HTML (dashboard)",
    primary: "ocr",
    secondary: "apply_external_rule, use_latest_info, filter_out_of_scope, compute_answer",
    tools: "browser",
    scenario:
      "Shelf tag from the store, photo attached. Find me the same unit cheaper online, but only count sellers that ship to Raleigh, have stock today, and are the retailer themselves rather than a marketplace seller. Give me the delivered price with shipping and what I actually save against the tag.\n\nRequired Output:\nAn interactive HTML comparison: qualifying sellers with delivered price including shipping and the saving against the tag, each of the three rules shown as a pass or fail per seller rather than assumed. Non-qualifying sellers are present but filtered out by default, with the rule they failed named.",
  },
  {
    ref: "ST-004",
    taskId: "6ab82ece4b8df21cfe07adda",
    useCase: "Shopping",
    subcategory: "Handling returns, refunds & CS resolution",
    universe: "openclaw_mm_brandon_lewis",
    artifact: "HTML",
    primary: "read_fine_detail",
    secondary: "apply_external_rule, create_from_brief, execution_target",
    tools: "Gmail",
    scenario:
      "Screenshot of my order page and a photo of the returns card that came in the box. Two of the items are going back. Work out whether I am still inside the window for each, and if I am, write and send the request to their support address with the order reference. If one is not eligible, leave it out.\n\nRequired Output:\nAn HTML page showing the eligibility determination for both items, each with the clause from the returns card and the dates it was computed from, the ineligible item marked with the shorter sale window, and a copy of the message that was sent.",
  },
  {
    ref: "ST-005",
    taskId: "6ab82ece4b8df21cfe07addb",
    useCase: "Personal productivity",
    subcategory: "Running the family operations hub",
    universe: "openclaw_mm_ricardo_lopez",
    artifact: "Interactive HTML (dashboard)",
    primary: "ocr",
    secondary: "compare, use_latest_info, find_in_another_app, execution_target",
    tools: "Google Calendar, Gmail",
    scenario:
      "Photo of the term letter that came home in Sofia's bag. Put every dated thing on it into my calendar, check it against what is already there including the weeks the girls are with Celeste, and tell me where we have a clash. Two of those dates were changed in the newsletter that came yesterday, so use the newer one where they differ.\n\nRequired Output:\nAn interactive HTML term dashboard: every dated item as an entry with its source, the two superseded dates showing both the letter value and the newsletter value with the newer one applied, and clashes highlighted against existing events including the alternating custody weeks. A toggle switches between all events and clashes only.",
  },
  {
    ref: "ST-006",
    taskId: "6ab82ece4b8df21cfe07addc",
    useCase: "Creativity",
    subcategory: "Designing & crafting",
    universe: "openclaw_mm_thaddeus_okonjo_commerce_product",
    artifact: "HTML",
    primary: "reason_over_diagram",
    secondary: "identify_objects_and_attributes, compute_answer, create_from_brief",
    tools: "browser, muse-image-1.0",
    scenario:
      "Photo of the wall to the left of the garage door with a tape measure in shot. I want shelving built in there for the printer and the filament. Work out the real dimensions from the photo, show me what three shelf spacings would look like in that space, and give me a cut list for the one you would pick. The outlet and the light switch have to stay reachable.\n\nRequired Output:\nAn HTML page carrying the derived dimensions with the method shown, the three shelf spacings rendered side by side with the generated visual for each, the outlet and switch marked as clear, and the cut list for the chosen spacing summing to stocked board lengths.",
  },
  {
    ref: "ST-007",
    taskId: "6ab82ece4b8df21cfe07addd",
    useCase: "Personal finance",
    subcategory: "Detecting & disputing erroneous charges",
    universe: "openclaw_mm_marisela_ybarra_commerce_product",
    artifact: "HTML",
    primary: "reconcile_amounts",
    secondary: "ocr, manage_contradictions, compute_answer",
    tools: "Finances (Plaid), Gmail",
    scenario:
      "I think the garden centre charged me twice. Two paper receipts attached, one is faded. Go through my accounts for the last sixty days, find the charges these belong to, and tell me whether it is a real duplicate or a hold and a settlement. If it is a real duplicate, draft the dispute with the dates and amounts. Do not send it.\n\nRequired Output:\nAn HTML page: each receipt matched to its transaction with the matching evidence shown, the hold and settlement pair explained as one authorisation rather than two charges, the genuine duplicate stated with both dates and amounts, and the drafted dispute rendered in full.",
  },
  {
    ref: "ST-009",
    taskId: "6ab82ece4b8df21cfe07adde",
    useCase: "Research",
    subcategory: "Comparing & evaluating options",
    universe: "openclaw-openclaw_mm_winslow_chinedu_achebe_20260831-universe",
    artifact: "Interactive HTML (dashboard)",
    primary: "ocr",
    secondary: "compare, reject_false_source, filter_out_of_scope",
    tools: "browser",
    scenario:
      "Spec sheet I picked up at the MODEX stand, photographed. Compare it against the two nearest alternatives on the specs that actually matter for continuous duty in a pick module, and tell me which one I should shortlist. Ignore anything that is not the manufacturer's own documentation, and if a claim on this sheet does not appear in their published documentation, say so.\n\nRequired Output:\nAn interactive HTML comparison of the three units on continuous-duty specs, each figure carrying the manufacturer document and its date, the trade-show duty-cycle claim shown in its own state as unsupported by the published datasheet, and a control to show only manufacturer-sourced figures.",
  },
  {
    ref: "ST-011",
    taskId: "6ab82ece4b8df21cfe07addf",
    useCase: "SMB",
    subcategory: "Gathering competitor & market intel",
    universe: "openclaw-openclaw_mm_delphina_marisa_rocchi_20260830-universe",
    artifact: "Interactive HTML (dashboard)",
    primary: "ocr",
    secondary: "compare, filter_out_of_scope, use_latest_info, reject_false_source",
    tools: "browser",
    scenario:
      "Three other makers sell made-to-measure corsetry and none of them publish a price list any more, which is why my prices have been wrong since 2022. Screenshots of two of their current listings attached. Go through their own sites and work out what a piece comparable to my S bend actually costs and what lead time they promise. Only count what is on their own site. If a price is only visible after an enquiry form, say so rather than estimating it.\n\nRequired Output:\nA single HTML page: one row per maker with the comparable piece, price and quoted lead time, each cell carrying the page it was read from and the date. Enquiry-only prices render as not published rather than as a figure. A control filters to published prices only, and excluded forum, resale and marketplace sources are listed separately rather than dropped silently.",
  },
  {
    ref: "ST-012",
    taskId: "6ab82ece4b8df21cfe07ade0",
    useCase: "Work productivity",
    subcategory: "Producing work deliverables",
    universe: "openclaw-openclaw_mm_genoveva_pastrana_20260830-universe",
    artifact: "HTML",
    primary: "extract",
    secondary: "summarize, convert_or_rebuild, execution_target",
    tools: "Google Drive, Google Slides",
    scenario:
      "The buyer's assistant sent me the recording of this morning's call as a file, attached. I need two things out of it: a clean transcript of the section where they set the promo depth, and a six-slide deck for Sun-Hee in the structure she asks for every time, which is context, what they asked for, what we committed to, risks, cost, next steps. Save the deck next to the recording.\n\nRequired Output:\nAn HTML deliverable containing both: the verbatim transcript of the promo-depth section, and the six-slide deck rendered as HTML slides in the stated order, whose cost slide matches the revised figure in the transcript on the same page.",
  },
  {
    ref: "ST-013",
    taskId: "6ab82ece4b8df21cfe07ade1",
    useCase: "Travel",
    subcategory: "Planning trips",
    universe: "openclaw_mm_nkechi_adeyemi_clark_operations_qa",
    artifact: "Interactive HTML (dashboard)",
    primary: "apply_external_rule",
    secondary: "use_latest_info, compute_answer, find_in_another_app, execution_target",
    tools: "Google Calendar, browser",
    scenario:
      "Mum's knee replacement is on the sixth of October and Imogen and I are going over for ten days. The dates are blocked on my calendar and nothing else is decided. Work out what the ten days actually have to cover given she is in hospital for part of it and not walking for the rest, and put a plan against the calendar block, split into what has to be booked before we fly and what can wait until we land. Anything you cannot establish from a source, leave as an open question instead of filling it in.\n\nRequired Output:\nAn interactive HTML plan across the ten days, each day carrying what it has to cover, with a toggle between what must be booked before departure and what can wait until arrival and the reason each falls where it does. Open questions, including discharge timing, appear as their own pane and are never resolved into the plan.",
  },
];

export const claimSheetByRef = (ref: string) => claimSheet.find((t) => t.ref === ref);
