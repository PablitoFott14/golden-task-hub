import type {
  CaseSource,
  FailureCategory,
  FailureCategoryId,
  FailurePattern,
  PassDiagnosis,
  TaskFeature,
  XLink,
} from "./types";

/**
 * The Failure Approach: how Opus actually fails as an agent, shown through real
 * graded runs, and how to build the same pressure into a Leg A.
 *
 * Sources, all inside `failure approach/` beside this project and gitignored:
 *
 * - `opus_failure_report (2).html`, cited [R section]: the incidents, the
 *   failure mode and mechanism shares, the cross cutting behaviors.
 * - `task_writer_cheat_sheet (3).html`, cited [C card, trap n]: the traps that
 *   repeat across runs on Opus 4.8 and 5, each with a real example.
 * - `failure_approach.md`: the Green Shell translation of both, which is where
 *   the scenario ideas, the fairness rules and the "Model A passed" diagnosis
 *   were first worked out against the guidelines.
 *
 * Two more sources are this project's own: the guidelines' section 8.2, which
 * records what the model did in real Green Shell runs [G 8.2], and the hub's
 * Golden Task, whose Model A run is `run.observations` in
 * `tasks/chargeDisputes.ts`. Those twelve cases carry the `golden` and
 * `guidelines` sources and come first in every pattern that has one.
 *
 * **Every case is a real run.** Ask, did, truth and wrote are what the source
 * says happened, paraphrased into the hub's copy rules and never extended: a
 * study vignette that is cut short in the source stays cut short here, and a
 * case whose source gives no right answer carries none. Names and records in
 * the study cases come from synthetic task data. Quoted model output keeps its
 * wording, except where the source used an em dash, which is reworded around.
 *
 * **Selection.** The studies hold 17 capabilities and 85 traps. What is here is
 * what applies to a Green Shell Leg A: an assigned universe, your own
 * multimodal inputs, one prompt. Left out on purpose: deliverable formatting,
 * memory and logging order, and every trap that needs control of the
 * environment (page sizes, exclusive bounds, broken tools), which the "Model A
 * passed" view lists as what rarely pays off. Hints and Leg B are not here at
 * all: this tab is about making Model A fail.
 *
 * Citation brackets follow the old convention so the page's text layer stays
 * small: `[G x]` renders as a section badge, `[Q Group, Dimension]` as a link
 * to its Spec Doc card, and `[R …]` / `[C …]` never reach the screen.
 */

const GT = "/golden-tasks/charge-disputes";
const gtRun: XLink = { to: `${GT}#model-a`, tag: "GT", label: "This run in the Golden Task" };

/* -------------------------------------------------------------------- page */

export const faHeader = {
  eyebrow: "Failure Approach",
  title: "Where Opus really breaks",
  sub: "Real failures from graded runs: what Opus was asked, what it did instead, and why. Each pattern comes with ways to put the same pressure into your own Leg A, and the test that keeps the failure real.",
};

/** The one test every failure point has to pass, said once on the way in. */
export const faPrinciple = {
  title: "A failure only counts if a careful agent would have passed",
  body: "Same prompt, same inputs, same tools: the evidence was reachable, the request was clear, and nothing was hidden, broken or forced. Every pattern carries its own version of that test. [G 4]",
  links: [
    { to: "/#failure", tag: "M7", label: "Not every failure is yours to keep" },
    { to: "/spec#dim-valid-model-failure", tag: "QC", label: "Valid Model Failure" },
  ] as XLink[],
};

/** How the cases are labeled, for the legend above them. */
export const sourceLabel: Record<CaseSource, { label: string; hint: string }> = {
  golden: {
    label: "Green Shell · Golden Task",
    hint: "The Model A run of the hub's Golden Task, on this project.",
  },
  guidelines: {
    label: "Green Shell · guidelines",
    hint: "A run the guidelines record in section 8.2, which says both models share the weakness.",
  },
  "openclaw-mm": {
    label: "OpenClaw MM",
    hint: "The study project closest to Green Shell: multimodal, all on Opus 4.6, one graded run per task.",
  },
  study: {
    label: "Study run",
    hint: "One of the other four agent projects in the studies.",
  },
};

/* --------------------------------------------------------------- features */

export const featureGroups = ["Your inputs", "Your universe", "Your task"] as const;

export const taskFeatures: { id: TaskFeature; group: (typeof featureGroups)[number]; label: string }[] = [
  { id: "photo", group: "Your inputs", label: "Photos" },
  { id: "handwriting", group: "Your inputs", label: "Handwriting or marks" },
  { id: "chart", group: "Your inputs", label: "Charts, diagrams, maps" },
  { id: "audio", group: "Your inputs", label: "Audio or video" },
  { id: "document", group: "Your inputs", label: "Documents or sheets" },
  { id: "email", group: "Your universe", label: "Email" },
  { id: "chat", group: "Your universe", label: "Chat threads" },
  { id: "calendar", group: "Your universe", label: "Calendar" },
  { id: "records", group: "Your universe", label: "Records and trackers" },
  { id: "rule", group: "Your task", label: "A rule or threshold" },
  { id: "numbers", group: "Your task", label: "A figure to work out" },
  { id: "dates", group: "Your task", label: "Dates or a window" },
  { id: "per-item", group: "Your task", label: "A verdict per item" },
  { id: "send", group: "Your task", label: "A send, post or update" },
  { id: "edit", group: "Your task", label: "An edited image or file" },
];

/* ------------------------------------------------------------- categories */

export const failureCategories: FailureCategory[] = [
  {
    id: "looking",
    n: 1,
    stage: "Finding the evidence",
    name: "Stops looking too soon",
    short: "Stops looking",
    line: "Answers from the first source that looks complete, so the record that settles it is never opened.",
    // [C Information seeking, what breaks]
    summary:
      "Opus decides what evidence exists from the first list, the first page, the first hit or the systems the prompt names, then treats a tidy or empty result as the whole picture. The record that changes the answer sits one step further on: in a service nobody named, in sent mail, in a thread reply, outside a convenient filter.",
    lever: "Put the deciding fact one natural step away, somewhere the request gives a reason to look.",
    // [R 2] OpenClaw MM column: information seeking 39%.
    stat: { value: "39%", label: "of failed criteria in OpenClaw MM, the largest share of any failure type" },
  },
  {
    id: "seeing",
    n: 2,
    stage: "Reading the media",
    name: "Misreads what it sees or hears",
    short: "Misreads media",
    line: "Takes one look, writes the first read as exact, and misses what only the image or the recording carries.",
    // [C Multimodal perception, what breaks]
    summary:
      "Opus reads an image in one pass and writes whatever comes back, hedges included, into the deliverable as exact fact. It misreads pen corrections, miscounts stacked items, binds wires and lines to the wrong positions, and skips what lives only in a recording or in the picture rather than in the text.",
    lever: "Make an exact visual or spoken value decide something, and put it where only looking or listening reaches it.",
    // [R 2] OpenClaw MM column: multimodal perception 25%.
    stat: { value: "25%", label: "of failed criteria in OpenClaw MM, the second largest share" },
    // [C Multimodal: every incident a single graded Opus 4.6 run]; [R 3.9: part
    // of each error may belong to the image tool]; [G 8.2: views images directly].
    caveat:
      "The study cases here are Opus 4.6 runs, nearly all graded once, and the studies hold no repeat data for reading media. Those runs saw images through a description tool, so part of each error may belong to the tool; in Green Shell the model views images itself. What carries over is the trust in a first read, and the Golden Task shows it still happens.",
  },
  {
    id: "trusting",
    n: 3,
    stage: "Weighing the sources",
    name: "Trusts the wrong source",
    short: "Wrong source",
    line: "When two sources could answer, takes the convenient one and writes it as settled.",
    // [C Source evaluation and Conflict detection, what breaks]
    summary:
      "When sources disagree, Opus takes whichever is already in hand, neatly labeled or presupposed by the user: a notes file, a plan, a status flag, a colleague's claim. It writes that into files and messages without opening the record that settles it, and often without saying there was a conflict at all.",
    lever: "Give the scenario a natural gap between what was planned, noted or claimed and what is true, and make the request about what is true.",
    // [R 3.8] proxy trust is the mechanism in 89% of source evaluation failures.
    stat: { value: "89%", label: "of wrong source failures come from trusting a proxy: a note, a flag, a label, a filename" },
  },
  {
    id: "rules",
    n: 4,
    stage: "Applying the rules",
    name: "Applies its own version of the rule",
    short: "Bends the rule",
    line: "Reads the rule in your inputs, then decides from what looks obvious in the data.",
    // [C Domain and policy rule application, what breaks]
    summary:
      "Opus retrieves the right facts, then decides the treatment from what looks self evident: a threshold field in the data, a tidy calculation, the everyday meaning of a word, its own paraphrase of the policy. One wrong call then carries faithfully into every deliverable.",
    lever: "Put the rule in your inputs and make its exact wording change the result.",
    // [C Overview] 81% repeat, second only to information seeking (82%).
    stat: { value: "81%", label: "of rule failures on Opus 4.8 and 5 repeat across runs, second only to a missed source" },
  },
  {
    id: "working",
    n: 5,
    stage: "Working it out",
    name: "Has the pieces, never works them out",
    short: "Never works it out",
    line: "Holds every number and record it needs, and never runs the sum, the match or the date check that decides.",
    // [C Quantitative reasoning, Synthesis and Temporal reasoning, what breaks]
    summary:
      "Opus retrieves every operand and every record, then never runs the last division, groups by eye instead of matching the records, or builds a date window from its own idea of the period. The deliverable looks complete and confident; the missing step only shows against the right answer.",
    lever: "Make the outcome hinge on a number, a match or a date nobody hands the model.",
    // [C Overview] quantitative reasoning 79%.
    stat: { value: "79%", label: "of number failures on Opus 4.8 and 5 repeat across runs" },
  },
  {
    id: "calls",
    n: 6,
    stage: "Making the call",
    name: "Makes calls the evidence does not support",
    short: "Unbacked calls",
    line: "Fills empty slots with plausible values, lets one story decide every item, or picks the name it can see.",
    // [C Judgment and Calibration, what breaks]
    summary:
      "Opus usually gathers the right evidence and then commits to the wrong verdict, owner or tier: a big picture story, its own default scheme or the only name visible on a record overrides what each item's facts say. Where a record is silent, it fills the slot with something plausible and states it as fact.",
    lever: "Leave honest gaps, ask for one call per item, and make the right owner someone the data implies.",
    // [R 2] OpenClaw MM column: calibration and honesty 7%, third after 39 and 25.
    stat: { value: "7%", label: "of failed criteria in OpenClaw MM are filled gaps and false claims, the third largest share" },
  },
  {
    id: "finishing",
    n: 7,
    stage: "Delivering",
    name: "Does not finish the job",
    short: "Doesn't finish",
    line: "Investigates well, then stops short, asks instead of acting, overshoots or loses the specifics on the way out.",
    // [C Task completion and Output fidelity, what breaks]
    summary:
      "Opus often finds the right facts and then fails to turn them into the writes and sends: it comments instead of updating, stops a step before the final state, asks instead of acting, skips the items that need no action, sends where nobody asked, or blurs the specifics in the deliverable. It still reports the job as done.",
    lever: "Make the last step matter: an execution target with more than one action, a recipient the data implies, the specifics on the surface the reader sees.",
    // [R 2] Enterprise Atlas Advanced, task completion 14% (4.6) to 18% (4.8).
    stat: {
      value: "18%",
      label: "of Opus 4.8's failures were unfinished jobs, in the one project run on both versions, up from 14% on Opus 4.6",
    },
  },
];

/* --------------------------------------------------------------- patterns */

export const failurePatterns: FailurePattern[] = [
  /* ============================================================ 1 looking */
  {
    id: "unopened-service",
    category: "looking",
    name: "Never opens the service that holds the answer",
    line: "The deciding record sits in a loaded service that is never called.",
    happens:
      "Opus answers from the first source that seems enough: the input folder, the tool whose name matches the request, the user's own note. The service holding the deciding record is loaded and never called, and the deliverable is still written with full confidence.",
    why: [
      "A source that held the answer and was never opened is the most common failure in the studies: about one in eight of every distinct mistake, and 65% of the misses in finding evidence. [R At a glance; R 3.1]",
      "Mostly it settles on the first plausible source (about 55%) or assumes a source is out of reach without trying it (about 28%). It rarely lists what is connected before it concludes. [R 3.1]",
    ],
    cases: [
      {
        // run.observations[2], "The record it never looked at"; GTFA El Dorado line.
        id: "calendar-never-checked",
        source: "golden",
        title: "The calendar it never checked",
        ask: "Check her May to July charges against her receipt photos and “any purchase evidence you can find on my registers”, and work out which ones to dispute.",
        did: "Its calendar lookups never covered Jun 25 to 28, and it never searched for El Dorado. The receipt agreed with the bank, so it cleared the charge.",
        truth: "Dispute $62.00: the receipt bills three nights from Jun 25, and her calendar shows two.",
        wrote: "$186.00 cleared as “Matches”.",
        why: "Two sources agreed, so the one that settles it was never opened.",
        link: gtRun,
      },
      {
        // [G 8.2] Unreliable: "Opening a connected service at all".
        id: "tools-loaded",
        source: "guidelines",
        title: "282 service tools, loaded and waiting",
        ask: "A Green Shell run with the universe connected: 282 service tools across fourteen servers.",
        did: "The guidelines list opening a connected service at all as the first thing the model does unreliably, for both models.",
        note: "“This is the default, not an edge case. It costs you nothing to arrange, because it happens on its own.”",
      },
      {
        // [R 3.1] vignette, OpenClaw MM, "Source never queried · Proxy trust".
        id: "frame-in-inbox",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "The frame size sitting in the inbox",
        ask: "Crop a framed sketch for a portfolio to “the exact aspect ratio of the frame i ordered”, “not eyeballed”. The only size in hand was the user's note: “the 12x16 i think”.",
        did: "Made zero email or calendar queries. It had planned a record lookup only for the one system the spec named, so it took the note's size and dropped the “i think”.",
        truth: "11×14, from the Framebridge order confirmation sitting unread in the inbox.",
        wrote: "12×16, with the hedge stripped.",
        fix: "One email search for “Framebridge” before the crop.",
      },
      {
        // [C Information seeking, trap 4]
        id: "bill-nobody-pulled",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "The one bill nobody pulled",
        ask: "Reconcile a borrower's Loan Estimate line by line against the actual charges across Stripe, QuickBooks and the lender and title emails, and compute the exact amount owed back.",
        did: "The lender email, the title statement and Stripe each held an overage, and it found those. Three of the four failing runs never pulled the QuickBooks bills, and carried the disclosed $20 forward as “no change of record”.",
        truth: "$442.50 owed back. The flood certification actually cost $30.00, recorded only as one QuickBooks bill.",
        wrote: "$432.50, in the file note, the email and the Slack hold.",
      },
    ],
    build: [
      "Let the request imply a service without naming it. The Golden Task's prompt points at her accounts, mail and calendar as “any purchase evidence you can find on my registers”; “right after my usual team meeting” can only be answered from the calendar.",
      "Let the user's note carry a hedged value, “the 12x16 i think”, while the universe holds the record that settles it: an order confirmation, a booking, a receipt.",
      "Let a value in the media lead to a record only a service holds: the serial number on a product label finds the CRM record and its history. The guidelines use this as their example of strong reconciliation. [G 1.2.2]",
      // [R 3.1] FreshDirect vignette and lessons.
      "Let the user say a source is incomplete, “the app doesn't seem to show everything”. In one study run the user said exactly that, and Opus still made the app its whole investigation.",
    ],
    fair: [
      "The service must be assigned and loaded. A partial load is an environment defect, never a model failure, and a service outside your assigned tools is drift. [G 1.2.1; G 1.1.2]",
      "The request must give a reason to look there. Never grade a fact the prompt gave no reason to seek.",
      "Confirm the record exists with SQL, then confirm the agent's own tools reach it. [G 1.2.1]",
    ],
    spot: [
      "No calls at all to an assigned service your GTFA needs.",
      "Every tool call stays inside the input folder.",
      "“Now I have everything I need” before any service was queried.",
      "A hedged value from an input, “i think”, “around”, “~”, written into the artifact as exact.",
    ],
    fits: ["email", "calendar", "records", "chat", "photo"],
  },
  {
    id: "one-level-down",
    category: "looking",
    name: "Stops one level above the answer",
    line: "Reads the channel, not the thread reply; the inbox, not sent mail; the first sheet, not the second.",
    happens:
      "Opus opens the right system and stops at its surface. The record that changes the answer sits one step further: a reply further down a thread, an email in the sent folder, the second worksheet, page two.",
    why: [
      "Records never opened below the list level, result sets read only in part and searches that stopped at the first hit add up to about 15% of the misses in finding evidence. [R 3.1]",
      "Plain single system misses are shrinking on newer versions, but depth traps like these still failed in most runs on Opus 4.8 and 5. [C Information seeking, on newer versions]",
    ],
    cases: [
      {
        // [C Information seeking, trap 3]
        id: "reply-stopped-test",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "The reply that stopped the test",
        ask: "Close out every publisher conversation, taking each status from the most recent record, and open a follow up card for anything still open.",
        did: "Read the channel history four times and opened only an old intro thread. The newest top level message read like a live test; a reply two days later, in a thread of seven, said “Stopped the test today”.",
        truth: "Stopped on 2026-02-13, with a review call still owed.",
        wrote: "“Live”, in both the write up and the card.",
      },
      {
        // [C Information seeking, trap 1]
        id: "dates-in-sent",
        source: "study",
        model: "Opus 5",
        runs: { failed: 4, of: 4 },
        title: "The 74 dates in Sent",
        ask: "Audit 74 closed loan files for disclosures sent without the three business day wait, and escalate any file two or more days short.",
        did: "Searched the phrase once against the inbox, got title company mail, decided it was “not mine to read”, and declared the wait “not determinable”. The 74 delivery dates sat in the processors' sent folders.",
        truth: "Three files closed short of the wait, LN-2024-00057 by three business days.",
        wrote: "Zero violations.",
      },
      {
        // [C Synthesis, trap 3]
        id: "thread-not-finished",
        source: "study",
        model: "Opus 5",
        runs: { failed: 6, of: 6 },
        title: "The thread it never read to the end",
        ask: "Reconstruct what a game's launch really shipped, against what people believe.",
        did: "Never opened an evening Slack thread to its end. The thread ran from a rejection at 21:03 to “campaign on” at 21:37. It sided with a colleague's message, and even filed a ticket about the live ad's wrong store link without seeing the contradiction.",
        truth: "The playable ad shipped and is live.",
        wrote: "“The playable is genuinely unfinished, and Robert is right.”",
      },
      {
        // [R 3.15] vignette, OpenClaw MM; [C Faithful extraction, trap 4].
        id: "second-worksheet",
        source: "openclaw-mm",
        model: "Opus 4.6",
        runs: { failed: 8, of: 8 },
        title: "The second worksheet",
        ask: "Reconstruct two weeks of a food log workbook and flag its contradictions in log_issues.csv.",
        did: "Printed every sheet in one call, used only the first, whose header read “Daily calorie target: 2000”, and declared “Now I have everything”.",
        truth: "The second worksheet sets the target at 1,800: the very conflict the user wanted flagged.",
        wrote: "No mention, in the CSV or the summary.",
        fix: "List the sheet names first, then read each sheet in its own call.",
      },
    ],
    build: [
      "During exploration, look for what your universe already keeps one level down: a thread where a later reply reverses the top message, an email that exists only in Sent, a record whose detail holds fields the list lacks. Build on one you found.",
      "Make the question about the current or final state: “where did we land on…”, “what did we actually agree”.",
      "In your own inputs, a multi page document or a workbook you built yourself, with the deciding part off the first page or sheet. Never an LLM generated .pdf, .docx, .xlsx or .csv. [G 1.2.2]",
      "Lean on threads, sent mail and second sheets before pagination: unfetched result pages showed up in only 2% of OpenClaw MM tasks with failures. [R 4]",
    ],
    fair: [
      "The deeper level must be reachable with the agent's tools: a thread tool, a folder parameter, paging.",
      "“Most recent” needs one answer, with the later record clearly dated after the earlier one.",
      "If the second sheet or page disagrees with the first, the prompt asks for mismatches to be flagged, or the file says which value is current. [G 4]",
    ],
    spot: [
      "Channel history read, thread never opened.",
      "One search per system, and no second query.",
      "A result that shows a total larger than the rows returned, and no next page.",
      "“The latest status” taken from a top level message.",
    ],
    fits: ["chat", "email", "document", "records"],
  },
  {
    id: "convenient-set",
    category: "looking",
    name: "Builds the set from a convenient filter",
    line: "Asked for every item, it builds the set from one filter, one status or the files in the folder.",
    happens:
      "Asked for “every” item of some kind, Opus builds the set from a handy proxy: one entity, one vendor, one status, or the files in the input folder. Part of what is in scope is never examined, and the total still looks complete.",
    why: [
      "A set scoped by a convenient filter is a small share of failures, 3% of the misses in finding evidence, but the cases repeat in most runs. [R 3.1; C Information seeking, trap 5]",
      "An in between status, approved or scheduled, sounds resolved while the request still covers everything unpaid or undelivered. [C Quantitative reasoning, trap 3]",
    ],
    cases: [
      {
        // [G 8.2] Unreliable: "Separating in the folder from in scope".
        id: "invoice-in-folder",
        source: "guidelines",
        title: "The invoice in the folder",
        ask: "The prompt defined a set of vendors in one place, and the input folder held an invoice.",
        did: "It took the attached invoice as proof the vendor belonged to a set the prompt had defined somewhere else entirely.",
        note: "“Where membership comes from one source and evidence from another, it will not reconcile the two unaided.”",
      },
      {
        // [C Information seeking, trap 5]
        id: "other-entity",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 5 },
        title: "The other entity's invoices",
        ask: "A partner risk summary of the vendor invoices due in May and still pending approval, with a named owner on every flagged item.",
        did: "A broad query overflowed to a file it never opened, so it queried again with one entity filter, found 7 invoices, and never met the 10 belonging to the other entity, none of them with an approver.",
        truth: "10 more invoices, $653,393.14, under the other entity.",
        wrote: "7 invoices and $10,179.20, in the memo, the partner email, the Slack post and the ownership emails.",
      },
      {
        // [C Quantitative reasoning, trap 3]
        id: "open-meant-pending",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "Open meant pending, it decided",
        ask: "“Every open CrownPeak invoice still sitting in SAP”, with “the full exposure breakdown”.",
        did: "The pull returned all ten invoices with their statuses. It defined open as pending approval and dropped the two that were approved but unpaid.",
        truth: "7 open invoices, $10,354.25: 5 pending approval, 2 approved but unpaid.",
        wrote: "5 invoices, $8,260.52.",
      },
      {
        // [C Information seeking, trap 5]
        id: "appraisal-other-vendor",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "The appraisal billed under a title company",
        ask: "Audit the appraisal fees.",
        did: "Selected the bills by appraiser vendor.",
        truth: "A $391 appraisal line for Harris, filed under Tryon Title & Escrow.",
        wrote: "Missing, in every run.",
      },
    ],
    build: [
      "Write the membership rule in your input, a policy page, a list in a photo, a sentence in a voice note, so an item you found during exploration falls outside the convenient filter. Check with a query that the filter really misses it.",
      "Make the item outside the filter large enough to change the headline.",
      "Let an in between status sound resolved while the request still covers it: approved but unpaid, scheduled but not delivered.",
      "Put a file in the input folder for an item the rule excludes, so membership and evidence come from different places. [G 8.2]",
    ],
    fair: [
      "Word the request so the wide reading is the only defensible one: “every open invoice”, “the full exposure”, “still unpaid”. A request that only says “pending” makes the narrower set defensible.",
    ],
    spot: [
      "A total that matches a filter, not the rule.",
      "A set whose size equals the number of files in the input folder.",
      "An item counted only because its file sits in the input folder.",
    ],
    fits: ["rule", "per-item", "records", "document"],
  },
  {
    id: "empty-search",
    category: "looking",
    name: "Takes an empty search as proof",
    line: "A search comes back empty or a tool errors, and it concludes the thing does not exist.",
    happens:
      "A search returns nothing, a tool errors, or a lookup says “not found”. Opus concludes the record does not exist, says it has no access, or moves on as if the read had worked.",
    why: [
      "False “no record”, “no access” or “searched” claims are 31% of honesty failures, and an empty or failed lookup taken as absence is 23% of verification failures. [R 3.4; R 3.16]",
      "A tool error not worked around is a third of tool use failures. [R 3.13]",
    ],
    cases: [
      {
        // [G 8.2] Unreliable: "Testing before it declares something unavailable".
        id: "channel-no-access",
        source: "guidelines",
        title: "The channel it said it could not reach",
        ask: "A Green Shell run with the Slack tools loaded.",
        did: "It answered “I do not have access to your executives channel from here”, with slack_search_channels and slack_health sitting in its own tool list.",
        note: "Grade what the missing lookup costs the deliverable, the value absent or wrong in the artifact, never evidence of having looked.",
      },
      {
        // [C Verification, trap 1]
        id: "clearance-case-number",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 2, of: 6 },
        title: "The clearance filed under a case number",
        ask: "Close an anti money laundering review only if the record shows the work was finished and two partners cleared it.",
        did: "The obvious thread ended on an open question, and its searches for “Acme wire” came back empty. The completion report and both clearances sat in a case thread and an email thread, reachable by the entry number.",
        truth: "Partner clearance by Steven Perry is on record.",
        wrote: "“No disposition was ever reached”, in the close out memo.",
      },
      {
        // [C Verification, trap 1]
        id: "name-already-held",
        source: "study",
        model: "Opus 4.6",
        runs: { failed: 6, of: 6 },
        title: "The name it already held",
        ask: "A mortgage task that needed the engagement notes held in the CRM.",
        did: "Searched the CRM companies for “DeLuca”, got zero results, and never tried the contact “Frank DeLuca”, whose name it already held.",
        truth: "The engagement notes, filed under the contact.",
        wrote: "Nothing from them.",
      },
      {
        // [R 3.13] vignette, OpenClaw MM; [C Tool use, trap 1].
        id: "soup-video",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "The soup in the video",
        ask: "Overlay “the full recipe for the soup” on a cooking video, taking it from a text file that held several recipes.",
        did: "The image tool errored on the video's thumbnail. Without mentioning the error, it picked the first recipe in the file.",
        truth: "Chicken Soup, the one the video shows.",
        wrote: "Vegetable Soup, the file's first entry.",
        fix: "Pull a frame from the video and look at it another way before choosing.",
      },
    ],
    build: [
      "Let the user refer to something the way people do, by a nickname or a description, while the record is filed under an identifier that appears in the media: a reference number on a receipt photo, an order number on a box label.",
      "Let the obvious thread end on an open question, with the answer in a reply or a second system reachable by an identifier the agent already holds.",
      "Put a plausible first candidate in a text list beside a photo or a video that decides between the candidates. If the media read fails, the first item is the tempting default.",
    ],
    fair: [
      "Leave a cue that tells a wrong query from a true absence: an identifier already in hand, a second system, a count.",
      "Never break a tool or a file on purpose. A crash, a timeout or a broken session is never a model failure. [G 4]",
      "An unplanned tool error counts only when a working route existed and the model wrote the deliverable without it. [G 4; G 8.2]",
    ],
    spot: [
      "An empty result followed by a definite claim of absence.",
      "“I don't have access” while the tool is loaded.",
      "A tool error that is never mentioned again.",
    ],
    fits: ["email", "records", "chat", "photo", "audio"],
  },

  /* ============================================================= 2 seeing */
  {
    id: "handwriting",
    category: "seeing",
    name: "Misreads handwriting and pen corrections",
    line: "Takes the wrong layer of a value that was crossed out, rewritten or written over print.",
    happens:
      "A value is struck through and rewritten, circled as final, or written by hand over a printed figure. Opus reads it in one pass, takes the wrong layer, and carries it into every figure built on it.",
    why: ["Misread handwriting, marks and notation are 30% of media failures, the joint largest kind. [R 3.9]"],
    cases: [
      {
        // run.observations[1], "A first read it never went back to"; GTFA Carlos O'Kelly's line.
        id: "slip-cropped-twice",
        source: "golden",
        title: "The slip it cropped twice",
        ask: "Check her May to July charges against her receipt photos and “any purchase evidence you can find on my registers”, and work out which ones to dispute.",
        did: "Cropped the restaurant slip at tool calls 36 and 37 and recorded “Amount $18.74 + tip $5.25, total written $23.99”, $18.74 being what the bank charged. It concluded the restaurant never captured the tip.",
        truth: "Dispute $4.75: a printed base of $8.74 plus a $5.25 tip, signed at $13.99.",
        wrote: "“Nothing owed”.",
        link: gtRun,
      },
      {
        // [C Multimodal, trap 1]
        id: "circled-five",
        source: "study",
        model: "Opus 4.6",
        title: "The weight circled in pen",
        ask: "Score two designer sets using the weights on a photographed notes page, “including anything i fixed in pen”.",
        did: "The weight for one criterion read 3, struck through, then 2 written beside it, then a circled 5 marked “this matters most”. It took the 2.",
        truth: "A weight of 5, so Set A wins 21 to 17.",
        wrote: "A weight of 2, Set B the winner 17 to 13, and outreach drafted to the wrong designer.",
      },
      {
        // [C Multimodal, trap 1]
        id: "crossed-out-palette",
        source: "study",
        model: "Opus 4.6",
        title: "The palette that was crossed out",
        ask: "A cover art brief built from a handwritten note.",
        did: "The note had “deep purple / indigo” and “Ask Trevor for design help” crossed out. It caught one revision and missed those two.",
        truth: "Neither crossed out item in the brief.",
        wrote: "The crossed out palette as the primary one in cover_art_brief.md.",
      },
    ],
    build: [
      "A whiteboard or notes photo where a value was crossed out and replaced because the plan changed, and the final value flips the outcome.",
      "A figure written by hand over a printed one: a tip and a signed total on a slip, a corrected quantity on a delivery note.",
      "A correction chain, struck, rewritten, then circled as final, with the convention said in the user's words: “including anything I fixed in pen”.",
    ],
    fair: [
      "Export each image at its upload size, 1080p or lower, open it at 100% and read the deciding value yourself. If you have to zoom or guess, a reviewer will call it unreadable. [G 1.2.2; G 1.2.5]",
      "If a convention decides the reading, crossed out means superseded, circled means final, state it in the prompt or an input.",
    ],
    spot: [
      "One image call on the page that carries the corrections.",
      "“Appears to”, “approximately” or “~” in the read, then an exact value in the artifact.",
    ],
    fits: ["handwriting", "photo"],
  },
  {
    id: "counts-by-eye",
    category: "seeing",
    name: "Counts and identifies by eye",
    line: "Writes “~30” as 30, and names an object by what it looks like at a glance.",
    happens:
      "Asked for an exact count or an identity, Opus eyeballs the photo, writes a hedged “about 30” as 30, and names objects by what they resemble rather than what they are.",
    why: ["Wrong counts, presence or identity are 30% of media failures, level with misread handwriting. [R 3.9]"],
    cases: [
      {
        // [C Multimodal, trap 2]
        id: "toppers",
        source: "study",
        model: "Opus 4.6",
        title: "The 28 toppers",
        ask: "Exact item counts per kit from four photos, and the flag “RETAKE PHOTO, CONTAINS [N] ITEMS” for any kit with 28 or more.",
        did: "Eyeballed “~30 toppers” and “~12 erasers”, then wrote 30 and 12 as exact figures.",
        truth: "28 toppers and 15 erasers.",
        wrote: "30 and 12, so the flag string was wrong.",
      },
      {
        // [R 3.9]; [C Multimodal, traps 2 and 5]
        id: "charger-toy",
        source: "study",
        model: "Opus 4.6",
        title: "The charger shaped like a toy",
        ask: "Reconcile before and after photos of an office table against a colleague's note of what was taken.",
        did: "Read three stacked sticky pads as one block and missed a lone blister pack. It saw a Pikachu figure had gone and never connected it to the note's “Charger 1”.",
        truth: "All five items reconcile, and one charger was taken.",
        wrote: "Four of the five items mismatched, and chargers taken = 0.",
      },
      {
        // [C Multimodal, trap 5]
        id: "teachers-drawings",
        source: "study",
        model: "Opus 4.6",
        title: "The teacher's drawings",
        ask: "Review ten photos of a child's worksheets for a parent.",
        did: "Took the teacher's picture clues, one per item and drawn in the same ink as the printed words, for the child's doodles.",
        truth: "The drawings belong to the printed worksheet.",
        wrote: "That she filled the page with drawings instead of working.",
      },
    ],
    build: [
      "A photo where an exact count decides something: stock on a shelf, items packed, seats taken. Make a miscount of one or two change the output.",
      "Items that overlap, stack or sit in clutter.",
      "A look alike whose identity changes a count or a verdict: a charger shaped like a toy.",
    ],
    fair: [
      "Count it yourself at upload size. If the items cannot be told apart at that size, it is a data problem, not a perception failure.",
    ],
    spot: [
      "“About”, “~” or “approximately” in the read, then an exact number in the artifact.",
      "One image call for a task that needs an exact count.",
    ],
    fits: ["photo", "numbers"],
  },
  {
    id: "positions",
    category: "seeing",
    name: "Binds things to the wrong position",
    line: "Traces wires, corners, chart lines or shading to the wrong place in one sweep.",
    happens:
      "When the answer depends on where something is, which wire lands on which port, which corner a bed sits in, which side of a line is shaded, Opus makes one pass and writes a confident answer that is wrong.",
    why: ["Images labeled by position or annotations misplaced are 12% of media failures, and chart series misread another 8%. [R 3.9]"],
    cases: [
      {
        // [C Multimodal, trap 3]
        id: "four-wires",
        source: "study",
        model: "Opus 4.6",
        title: "Four wires, none right",
        ask: "Trace four router to modem wires on a hand drawn closet diagram and write the port map.",
        did: "Made one image call, got a confident description of the trace, and wrote it down with no second pass.",
        truth: "1→4, 2→1, 3→2, 4→3.",
        wrote: "1→2, 2→3, 3→1, 4→4: zero of four correct.",
      },
      {
        // [R 3.14] vignette, OpenClaw MM, "Confirmation bias toward the user's premise".
        id: "shaded-side",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "Which side was shaded",
        ask: "Check a student's graphed inequalities against the answer she wrote.",
        did: "Two reads of the same image disagreed on which side of the vertical line was shaded. After a second, leading question, it took the read that matched the student's answer.",
        truth: "Shaded to the right of the line, so her answer is wrong.",
        wrote: "The exercise marked correct.",
        fix: "One neutral question, left or right, before marking it correct.",
      },
      {
        // [C Multimodal, trap 3]
        id: "garden-corner",
        source: "study",
        model: "Opus 4.6",
        title: "The corner of the bed",
        ask: "Draw a garden plan from a blueprint.",
        did: "Worked from a text extraction of the blueprint.",
        truth: "The deep shade cell of Bed B sits bottom right: south east, with north up.",
        wrote: "Drawn in the north east corner.",
      },
    ],
    build: [
      "A floor plan or a map where a position decides the answer: which room, which corner, which side.",
      "A chart where reading the right series, by color or by gridline, sets a value the task uses.",
      "A hand drawn diagram with crossing paths.",
    ],
    fair: ["Check the position yourself at upload size, and keep the north arrow or the legend the reading depends on in frame."],
    spot: [
      "Two reads of the same image that disagree, settled by a leading question. Read the wording of the agent's own image queries.",
      "Legend entries matched to lines by order, not by color.",
    ],
    fits: ["chart", "photo", "handwriting"],
  },
  {
    id: "text-over-media",
    category: "seeing",
    name: "Takes the text over what only the media carries",
    line: "Trusts the printed list, the text layer or the OCR over what the recording or the picture shows.",
    happens:
      "When text and media cover the same ground, Opus leans on the text: a printed list, the PDF's text layer, an OCR pass, the tail of a transcript. A rule spoken only in a recording, or a selection marked by hand on a page, never reaches the deliverable.",
    why: [
      "A printed list made the audio “feel redundant”, and a fast, low accuracy transcription piped through tail -20 exposed only the end of the recording. [R 3.9]",
      "When Opus reads documents, sections, tables or pages it never reaches are 38% of its extraction failures. [R 3.15]",
    ],
    cases: [
      {
        // [G 8.2] Works, but costs turns: "Trusting OCR over its own eyes".
        id: "logo-ocr",
        source: "guidelines",
        title: "The logo OCR got wrong",
        ask: "A Green Shell run with an image carrying a vendor's logo, which the model had already viewed directly.",
        did: "OCR rendered the logo as “Eis Meetpsrre”. It went with that and issued a receipt for an unnamed vendor.",
        note: "This is where a criterion on a value read off the media genuinely discriminates, which is also why the value has to be legible at full size.",
      },
      {
        // [C Multimodal, trap 4]; [R 3.9 triggers].
        id: "rule-only-spoken",
        source: "study",
        model: "Opus 4.6",
        title: "The rule that was only spoken",
        ask: "Run a household assessment from a session recording, photos of the printed workbook and the bank data.",
        did: "The instructor added two categories and a route to Tier 3 in speech only. It transcribed with the smallest Whisper model piped through tail -20, saw only the garbled last 1:40 of a 3:44 recording, and worked from the printed page.",
        truth: "Tier 3: a household with 15 or more weeks of food assistance is Tier 3, whatever its ratio.",
        wrote: "Tier 2.",
      },
      {
        // [C Faithful extraction, trap 3]
        id: "x-marks",
        source: "study",
        model: "Opus 4.6",
        title: "The picks marked with an X",
        ask: "Put the products a sister picked on a returned PDF list into a CSV, and email the matching photos.",
        did: "Ran a text only PDF tool twice and accepted its table, built from a note at the foot of the page, “I like the first 3. and the last one”. It never rendered the pages, even after the tool said it could not see visual elements.",
        truth: "Red X marks on Products 4, 7, 8 and 11.",
        wrote: "Products 1, 2, 3 and 12, in the CSV, the email and the reply.",
      },
    ],
    build: [
      "The deciding rule or correction spoken in a voice note and written nowhere else: “take 0.5% a year off every mix for fees”.",
      "A printed form or list with marks made by hand that select items, beside a typed note that seems to answer the same question.",
      "A recording longer than a minute, with the key line away from the end.",
      "A logo, a stamp or a label in a photo that a person reads at once and OCR would garble.",
    ],
    fair: [
      "Keep audio clear, MP3 at 64 kbps, and well under 5 to 10 minutes, so a miss is the model's choice, not a timeout. [G 1.2.2; G 4]",
      "Keep any figure shown in a video legible at 480p. [G 1.2.2]",
      "Leave no transcript of the same audio anywhere in the environment, or the media stops being necessary. [Q Prompt, MM Dependence]",
      "The spoken rule adds to the prompt, never contradicts it. [G 4]",
    ],
    spot: [
      "A transcript read only in part, or made with a low fidelity model.",
      "A PDF with marks, extracted as text and never rendered.",
      "A deliverable that matches the printed list exactly, where the audio changed it.",
    ],
    fits: ["audio", "document", "handwriting", "photo"],
  },
  {
    id: "never-compares",
    category: "seeing",
    name: "Never tests the image against the claim",
    line: "Describes every photo and never checks it against the claim, or goes by the filename and the order of the files.",
    happens:
      "Opus describes the media, then never puts it to work: checking a written claim against a photo, comparing two images, matching each image to the right record. It goes by the filename, the order of the files, the caption or the printed total.",
    why: [
      "Images described but never tested against the written claim are 9% of media failures, and images labeled by position 12%. [R 3.9]",
      "When a batch of images is split across calls, related photos land apart and the comparison never happens. [R 3.11]",
    ],
    cases: [
      {
        // run.observations[0], "The receipt it had already opened"; GTFA Hobby Lobby line.
        id: "receipt-already-opened",
        source: "golden",
        title: "The receipt it had already opened",
        ask: "Check her May to July charges against her receipt photos and the purchase evidence in her records, and work out which ones to dispute.",
        did: "Opened the receipt at tool call 3 and found the store's 40% sale email at tool call 52, then cleared the charge as “all at 40% off, $17.39 saved”. The receipt's own savings line agreed with its wrong total.",
        truth: "Dispute $17.20: two of the four cotton lines printed “40% OFF 0.00”.",
        wrote: "Cleared as matching.",
        link: gtRun,
      },
      {
        // [R 3.9] vignette, OpenClaw MM, "Image described but not tested against written claim".
        id: "banner-on-cover",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "The banner on the cover",
        ask: "Audit the claims in a portfolio PDF made for a shop, against the delivered files.",
        did: "Had every clue, including a final banner file noted “name fixed per eric”, and never compared the cover with the two banner files.",
        truth: "The cover reproduces the superseded three word banner, under the caption “Final shop banner as delivered”.",
        wrote: "No correction to the cover.",
        fix: "One targeted look: which banner file matches the cover, and what each wordmark says.",
      },
      {
        // [R 3.11] vignette, OpenClaw MM, "Entity conflated".
        id: "two-shirts",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "Two shirts, one design",
        ask: "Pick the shirt photos for an email, with a front and a back that match.",
        did: "When the call on all eleven images timed out, it retried in batches of 5 and 6, asked each image what it showed, and never asked which ones share a design.",
        truth: "Five photos showing two different designs.",
        wrote: "“1 Commit 250 t-shirt design”, and one design's front sent with the other design's back.",
        fix: "One comparative call on the five photos: which share a print, and which front pairs with which back.",
      },
      {
        // [C Verification, trap 4]
        id: "pothole-stain",
        source: "study",
        model: "Opus 4.6",
        title: "The pothole that was a stain",
        runLabel: "runs not stated",
        ask: "Match photos to open work orders and contact the vendors.",
        did: "Its own read of parking_photo.jpg said staining and no pothole. It matched the photo to the “Parking lot pothole” order anyway.",
        truth: "Staining and no pothole, as its own read said.",
        wrote: "Matched to the pothole order, and the vendor emailed.",
      },
    ],
    build: [
      "A draft, listing or flyer whose claims the photos can confirm or refute: “hardwood floors throughout”, beside a photo of carpet in the main bedroom.",
      "A receipt photo whose printed lines must be checked against a sale, a quote or an agreed price held in the universe.",
      "Several photos of similar items that the deliverable needs grouped or paired: two versions of a product, fronts and backs.",
      "Natural, uninformative filenames such as IMG_6506.jpg, so only the content can decide. [G 1.2.2]",
    ],
    fair: [
      "A filename may suggest content the file does not hold, when a real user would have named it that way. It must never reveal the answer. [G 1.2.2]",
      "The difference that decides it must be visible at upload size.",
    ],
    spot: [
      "A claim marked as verified with no step that compares it with the image.",
      "Attachments chosen in filename order.",
      "One variant reported where the photos show two.",
    ],
    fits: ["photo", "document", "records"],
  },

  /* =========================================================== 3 trusting */
  {
    id: "proxy-source",
    category: "trusting",
    name: "Takes the note, the plan or the label over the record",
    line: "A notes file, a plan, a status flag or an older version wins over the record that settles it.",
    happens:
      "When two sources could answer, Opus takes the one already in hand or neatly labeled: a notes file, a plan, a status flag, an older version. It writes that into the deliverable without opening the record that settles the question, and sometimes keeps the proxy after it has seen the record.",
    why: [
      "A stale note over the live record is 62% of these failures, a secondary note over the primary record 18%, a flag or a label over the content 11%. [R 3.8]",
      "Rare but severe: most were critical, because the wrong source silently becomes the answer. [R 3.8]",
    ],
    cases: [
      {
        // [R 3.8] vignette, OpenClaw MM, "Secondary note, report or photo trusted over primary records".
        id: "proposed-palette",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "The palette that was only proposed",
        ask: "Audit product photos against the yarn a supplier actually shipped, with a reason tied to something specific in the inbox.",
        did: "Retrieved the February email confirming what shipped, then graded the frames against a “pastel summer palette” floated in an April message.",
        truth: "Midnight and Sage, confirmed on 10 February. Frame 1's pink yarn matches neither.",
        wrote: "Frame 1 cleared, its pink “consistent with W&W's agreed 'pastel summer palette' campaign”.",
        fix: "Write down the confirmed colorways, and mark the April plan as proposed, before grading a single frame.",
      },
      {
        // [C Source evaluation, trap 5]
        id: "reading-in-notes",
        source: "study",
        model: "Opus 4.6",
        title: "The reading in the notes file",
        ask: "Before a family call, the mother's latest A1C, “She shared it with all of us not long ago”, saved as one number with its source.",
        did: "Answered from the notes file without a single messaging search, and cited the notes file as its source.",
        truth: "7.0, from her Nov 18 message in the family chat.",
        wrote: "7.2, from MEMORY.md.",
      },
      {
        // [C Source evaluation, trap 2]
        id: "note-merge-superseded",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "The note the merge superseded",
        ask: "What realistically ships in the next build, with the corrected scope written into the tracker.",
        did: "Listed the pull requests with a filter that dropped their descriptions, and anchored on a ticket note with no date: “latest work is not yet pushed to develop”.",
        truth: "PR #37, merged to develop on Feb 13, covered the work.",
        wrote: "Unpushed and out of scope, with the ticket left uncorrected.",
      },
      {
        // [C Source evaluation, trap 1]
        id: "closed-flag",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 3, of: 4 },
        title: "The closed flag from an older loan",
        ask: "Work 17 loans stuck before closing, decide what holds each one, and reassign the live files.",
        did: "Sorted the stack by a borrower level “closed” flag that came from the borrower's earlier, funded loan. It later noticed the link to the older loan, and kept the flag anyway.",
        truth: "Still live: March emails showed him chasing a close, so the loan stays in clear_to_close.",
        wrote: "Withdrawn, with no processor assigned.",
      },
    ],
    build: [
      "What was planned against what happened: a calendar of scheduled sessions beside photos or notes from the sessions that took place.",
      "An older and a newer version of the same thing among the inputs: two photos of a whiteboard taken an hour apart.",
      "A notes file with a confident figure while the universe holds the current one, and a request for what the user “actually” spends.",
      "A tracker note with no date, superseded by a later dated record.",
    ],
    fair: [
      "One source must be the record, and the task has to say so: the request (“what I actually spend”, “the latest”) or a rule in an input decides which wins. A winner the prompt never names is an undecided source conflict. [G 4]",
      "Make the newer version recognizably newer from its content: a written date, a visible correction, a dated universe record that refers to it. A filename number or EXIF alone is a weak cue.",
    ],
    spot: [
      "A value traced to a note or to memory while the live record was available.",
      "The older of two versions used.",
      "“Done”, “final” or “confirmed” accepted without opening what it describes.",
    ],
    fits: ["photo", "document", "records", "chat", "email"],
  },
  {
    id: "one-story",
    category: "trusting",
    name: "Picks one side and never says the sources disagree",
    line: "Two sources disagree; it picks one, or merges them into one cause, and never tells the reader.",
    happens:
      "When sources disagree, Opus picks a side and writes it as settled, or blends the explanations into one, without telling the reader there was a conflict. It rarely writes the sentence “these sources disagree and the records do not settle it”.",
    why: [
      "Contradictions collapsed instead of surfaced are 41% of conflict failures, and two figures for one item never compared another 37%. [R 3.14]",
      "77% of these repeat across runs on Opus 4.8 and 5. [C Overview]",
    ],
    cases: [
      {
        // [C Conflict and anomaly detection, trap 1]
        id: "three-explanations",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 5, of: 6 },
        title: "Three explanations, one cause",
        ask: "Establish the real state of an overdue month end close, reconciling a −$572.87 cash timing difference against the competing explanations, then email the manager and post to the team channel.",
        did: "Three systems explained the figure three ways: a currency revaluation, an unposted manual reclass, a sweep that did not run. It had all three, ruled one wrong in one run and merged them into “one cause” in another.",
        truth: "Three conflicting explanations, reported as conflicting.",
        wrote: "One story, and no word to the manager that the sources disagree.",
      },
      {
        // [C Conflict and anomaly detection, trap 3]; [R 3.14] vignette.
        id: "funded-said-everyone",
        source: "study",
        model: "Opus 4.6",
        runs: { failed: 6, of: 6 },
        title: "Funded, said everyone but the record",
        ask: "Reconstruct a colleague's findings on three loans, the user adding “one of them is already funded”, then email the team, note each loan and flag the funded one.",
        did: "The colleague's message called the loan “already closed”. The loan record it retrieved showed “processing”. It carried “FUNDED/CLOSED” into the email, the CRM flag, the hold post and the summary, and one run wrote “Raymond correctly flagged this as already closed”.",
        truth: "The record says processing, against the colleague's closed.",
        wrote: "“FUNDED/CLOSED” on every surface.",
      },
      {
        // [R 3.14] vignette, OpenClaw Main, "Contradiction collapsed instead of surfaced".
        id: "tidy-total-won",
        source: "study",
        title: "The tidy total that won",
        ask: "“I need to know what I'm really spending on FreshDirect each month. The app doesn't seem to show everything.”",
        did: "The app's orders came to about $267 a month. The user's words and its own notes, about $720 to $880 a month, both said the app was missing purchases. The precise number won, and it overwrote the notes with it.",
        truth: "About $1,071 a month: 33 card charges, $6,427, in the card ledger it never queried.",
        wrote: "“Actual spend is ~$267/month”, saved over the earlier estimate.",
        fix: "Label the $267 as the orders visible in the app, and keep the conflict in the notes instead of overwriting them.",
      },
    ],
    build: [
      "A photo and a system record that disagree on a status: a box delivered intact, against a carrier record that marks it damaged.",
      "Two documented explanations for one figure, and a request to reconcile them.",
      "A precise number from one tool beside softer signs that it is incomplete: the user's own words, an older estimate.",
    ],
    fair: [
      "The prompt must invite the surfacing: “flag anything off”, “reconcile X against Y”.",
      "If the data cannot settle the winner, grade that the conflict is named, not which side was picked.",
    ],
    spot: [
      "“X is right”, with the other source never mentioned.",
      "A reconciliation with no line for what does not match.",
      "A stored estimate overwritten with the tidier number.",
    ],
    fits: ["records", "photo", "chat", "email"],
  },
  {
    id: "premise",
    category: "trusting",
    name: "Confirms the premise it was handed",
    line: "Reads the records through what the user or a colleague already believes.",
    happens:
      "When the user or a colleague offers a premise, Opus reads the records through it. It confirms a claim whose headline happens to be right while the detail is wrong, overturns a conclusion because the user said some would not survive, or upgrades a remark into a confirmed pattern.",
    why: [
      "Preferring a tidy story to what the records support (31%) and anchoring on the first framing (26%) are two of the three main reasons a conflict collapses. [R 3.14]",
    ],
    cases: [
      {
        // [C Verification, trap 4]
        id: "kinney-rentals",
        source: "study",
        model: "Opus 5",
        runs: { failed: 1, of: 4 },
        title: "The couple of rentals on Kinney",
        ask: "A 94 second screen recording, “a couple of rentals right on Kinney by the Zilker house”, and a one page PDF for a friend.",
        did: "Found that every Kinney Avenue listing is for sale, then found exactly two rentals elsewhere in the ring, and told the user the check “came out at exactly two”.",
        truth: "The Kinney listings in the ring are for sale, not for rent.",
        wrote: "“Exactly two”, with Kinney never mentioned in the reply or the PDF.",
      },
      {
        // [C Judgment, trap 4]
        id: "conclusion-survived",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "The conclusion that did survive",
        ask: "A readiness review, with the user's warning that “at least a couple of the conclusions people settled on in Slack do not survive contact with the code”.",
        did: "Treated a correct Slack explanation, that a symptom came from a development build, as one of the conclusions to overturn.",
        truth: "The code confirms it: the only switch involved compiles into editor and development builds only.",
        wrote: "That it “doesn't survive the code”.",
      },
      {
        // [C Calibration, trap 4]
        id: "tough-files",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 3, of: 4 },
        title: "Tough files, confirmed",
        ask: "Test the user's claim that one processor gets the strongest files, “I only want to say what we can really back up”, then email a short factual follow up.",
        did: "The records held two troubled files moved to her and a colleague's remark that she “gets the tough files”. It cited the remark as corroboration.",
        truth: "Two recorded moves, and no pattern.",
        wrote: "The tough files pattern “confirmed”, and “she tends to get the hardest files”.",
      },
    ],
    build: [
      "A premise in the prompt or a voice note that the records partly refute: “I'm pretty sure the contractor billed us twice.”",
      "A claim whose headline number is right while the named detail is wrong, so the agent meets the contradiction on its way to the number.",
      "A suspicion the data refutes, with one unexplained residual nearby that keeps the suspicion tempting.",
    ],
    fair: [
      "The refuting record is reachable, and the prompt asks for the claim to be checked.",
      "If you grade overreach, state the evidence standard: “only what we can back up”.",
    ],
    spot: [
      "A premise reported as confirmed, or as checking out.",
      "The contradicting detail in the trajectory and missing from the deliverable.",
    ],
    fits: ["audio", "records", "chat", "document"],
  },

  /* ============================================================== 4 rules */
  {
    id: "paraphrased-rule",
    category: "rules",
    name: "Applies its paraphrase of the rule",
    line: "Compresses the rule into its own words, or reaches for the everyday meaning, then reasons from that.",
    happens:
      "The rule is in the inputs and Opus reads it. Then it applies something shorter: its own paraphrase, the everyday meaning of a word the rule redefines, its own idea of what counts as a duplicate.",
    why: [
      "A rule in the provided material that never touches the output is 62% of rule failures, and a category, threshold or cohort misapplied 22%. [R 3.6]",
      "One misclassified line is enough to flip a rule that gates a write, a file written or a message sent. [R 3.6]",
    ],
    cases: [
      {
        // [R 3.6] vignette, OpenClaw MM, "Category, threshold or cohort criterion misapplied".
        id: "networking-dinner",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "The networking dinner",
        ask: "Audit expense lines against a meals policy and a $300 budget, writing an exception file only if the total goes over.",
        did: "Compressed the policy's eligible guests, “clients, prospective investors, and outside advisors”, into “External BD meals only”. Then it approved a dinner with a law school classmate, marked “networking”, as an external business meal.",
        truth: "A personal meal. The approved total is $289.52, $10.48 under the budget, so no exception file.",
        wrote: "The dinner approved at $75.00, the total over budget, and an exception file that should never have been written.",
        fix: "Test each guest against the policy's own list, and look the guest up in contacts.",
      },
      {
        // [R 3.6] vignette, OpenClaw Main, "Explicit rule or procedure in provided material not applied".
        id: "duplicate-key",
        source: "study",
        title: "Duplicates by its own key",
        ask: "Merge proposed events into a calendar, and “drop any exact duplicates based on the EventID”.",
        did: "Dropped EV-004 as a duplicate of EV-003 because the title, description and timestamp matched. It never mentioned the EventID.",
        truth: "Two different EventIDs, so both events stay.",
        wrote: "EV-004 dropped from schedule.ics.",
        fix: "Compare the key the user named, and log a content overlap as a note instead of a drop.",
      },
    ],
    build: [
      "A rules document, or a photo of posted rules, where a term means something narrower than usual.",
      "An eligibility list with a near match nearby: a friend described as “networking”.",
      "A rule whose outcome gates a write: an exception file only if the total goes over, a message only if a check fails. One misread line then flips the whole branch.",
      "A rule split across modalities: a rate in a chart, a fee in a voice note, the compounding in a text file.",
    ],
    fair: [
      "The rule must be retrievable and cued by the request.",
      "The tempting alternative must be wrong for the question asked, not a defensible reading.",
      "The rule must not contradict the prompt. [G 4]",
    ],
    spot: [
      "The agent's own summary of the rule is shorter than the rule.",
      "A classification with no test from the rule beside it.",
      "A default convention, yearly compounding or rounding, where the input set another.",
    ],
    fits: ["rule", "document", "per-item"],
  },
  {
    id: "tempting-test",
    category: "rules",
    name: "Lets the data decide instead of the rule",
    line: "A threshold field in the records, or a tidy calculation, replaces the test or the approval the user set.",
    happens:
      "The records offer an easier test than the one the user set: a variance threshold field, a tolerance, the arithmetic of a reconciliation. Opus adopts it, even with the governing rule or approval already in hand.",
    why: [
      "All three cases are Opus 4.8 runs, two of them failing five or six times in six, and 81% of rule failures on newer versions repeat across runs. [C Domain rules, on newer versions; C Overview]",
    ],
    cases: [
      {
        // [C Domain rules, trap 2]
        id: "variance-threshold",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "The $2.31 variance",
        ask: "Which reconciliations truly block the period lock. The close checklist, already retrieved, required every reconciliation to be approved before lock.",
        did: "One sat at “submitted”, unapproved, with a $2.31 variance under a $10 threshold field. It adopted “variance > variance_threshold” as its own blocker test.",
        truth: "A blocker, because it is unapproved.",
        wrote: "“Not blocking”, in the email, the Slack post and the chat, while the same run listed a $0.00 submitted reconciliation as a blocker.",
      },
      {
        // [C Domain rules, trap 2]
        id: "tie-out-to-zero",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 3, of: 6 },
        title: "Tie out to zero",
        ask: "“How many tie out to zero vs have gaps.”",
        did: "Counted a −$0.37 reconciliation inside its $10 tolerance as tying out.",
        truth: "3 tie out and 3 have gaps.",
        wrote: "4 and 2, with the total off by 37 cents.",
      },
      {
        // [C Domain rules, trap 1]
        id: "approval-in-reply",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 5, of: 6 },
        title: "The approval in the reply",
        ask: "Restate the month's trade payables, including a correction “I had approved how to handle myself” whose entry never got posted.",
        did: "Read the email reply that set the exact entry, then reasoned from the reconciliation arithmetic that the ledger was already right, and posted nothing.",
        truth: "$55,346.26, after the approved entry.",
        wrote: "$61,415.17, in the memo, the email and the Slack note.",
      },
    ],
    build: [
      "A record with a salient field, a tolerance or a score, while the rule in your input, a checklist or the user's own words (“tie out to zero”), sets a different test. Include one item that passes the tempting test and fails the real one.",
      "A decision recorded in a message, an email reply or a thread, while the item's own record still shows nothing.",
    ],
    fair: [
      "The governing rule or approval must be reachable and cued by the prompt.",
      "If the prompt says “material”, a materiality test is fair game. Word it so only one test applies.",
    ],
    spot: [
      "A test the agent states in its own words that is not the one in the input.",
      "An approval retrieved in the trajectory and missing from what the agent did.",
    ],
    fits: ["rule", "records", "numbers", "email"],
  },
  {
    id: "half-rule",
    category: "rules",
    name: "Applies half of the rule",
    line: "Does the obvious half of a rule, or spots an exclusion and leaves it in the total.",
    happens:
      "A rule in plain words implies two actions, or a list mixes items the rule excludes. Opus does the salient half: it refunds and never books the cost, or it spots the excluded items and leaves them in the headline anyway.",
    why: ["A category, threshold or cohort misapplied, decoys swept in or qualifiers dropped, is about a fifth of rule failures. [R 3.6]"],
    cases: [
      {
        // [C Domain rules, trap 5]
        id: "refund-no-absorption",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 3, of: 6 },
        title: "Refunded, never absorbed",
        ask: "“If the extension was caused by our error we absorb it and refund the borrower”, closing a batch loan by loan. A sibling file in the same batch already showed the absorption booked.",
        did: "Classified the file as the firm's error, refunded the $500 charge, and even noted that the sibling's absorption “correctly hit 6351”.",
        truth: "A matching $500 bill to account 6351 for this file too.",
        wrote: "No bill, and nothing in the loan note.",
      },
      {
        // [C Domain rules, trap 3]; [R 3.6] vignette, EA Commercial.
        id: "test-accounts",
        source: "study",
        model: "Opus 5",
        runs: { failed: 4, of: 6 },
        title: "The test accounts in the total",
        ask: "Reconcile the coins “we agreed to give players” against the ledger, and post a breakdown.",
        did: "Four QA test accounts, 41,000 coins, were requested in the same channel and logged under the same item, and a process page excluded them. Two runs identified them, one writing “41,000 of the ‘compensation’ total was internal QA top-ups”, and still left them in the headline table.",
        truth: "636,000 coins agreed and 630,000 landed, for real players.",
        wrote: "711,000 or 677,000 agreed and 671,000 landed, with the exclusion as a footnote.",
      },
    ],
    build: [
      "A rule said colloquially that implies two actions, “refund the customer and book the cost”, with one sibling item already showing the full treatment.",
      "Items the rule excludes, stored under the same tag or in the same channel as the items it includes, with the fuller rule in a document the agent can reach.",
    ],
    fair: [
      "The precedent must match the treatment you expect, and the decoy must fail the real rule without doubt, like a test account requested as a top up.",
    ],
    spot: [
      "An exclusion stated in a note or a footnote while the headline still includes it.",
      "The second action named in the agent's reasoning and absent from the state changes.",
    ],
    fits: ["rule", "records", "send", "numbers"],
  },

  /* ============================================================ 5 working */
  {
    id: "uncomputed",
    category: "working",
    name: "Never computes the number that decides",
    line: "Has both figures behind a growth claim, a ratio or a total, and never runs the one line calculation.",
    happens:
      "Opus holds every number it needs and never runs the last division, sum or comparison. A matching part lends credibility to the claim beside it, and “need to verify” stands in for a ratio it could have worked out.",
    why: [
      "A figure that could be derived and never was is 17% of number failures, and a part left out of a total 16%. [R 3.7]",
      "The guidelines add the other half: the model sums values it already holds correctly, so the difficulty is in sourcing the numbers, never the arithmetic on them. [G 8.2]",
    ],
    cases: [
      {
        // [R 3.7] vignette, OpenClaw MM, "Derivable figure left uncomputed".
        id: "growth-claim",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "The 12% growth claim",
        ask: "Audit the claims in a draft against the records, under one rule: a money figure that disagrees with the bank is replaced by the bank's.",
        did: "Pulled the March and April deposits, $275 and $387, and never divided them. Because the April $387 matched the shop's own email, it took the email's “12% growth” as confirmed too.",
        truth: "Revenue up 40.7%, so the claim needs correcting under the bank rule.",
        wrote: "“Fine as-is”, and “12% growth” confirmed to the user.",
        fix: "One division, 387 / 275, before assigning the verdict.",
      },
      {
        // [C Quantitative reasoning, trap 1]; [R 3.7] vignette, Long Horizon.
        id: "fifteen-ratios",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 4 },
        title: "Fifteen ratios, none computed",
        ask: "Work 15 stalled loan files, decide which to revive, and write the conclusion onto each file.",
        did: "Every record carried the loan amount, the rate, the income and the lender's cap, and no ratio field. It computed the ratio on none of them, and wrote “verify DTI” and “may be tight” into the note and the email.",
        truth: "About 57.6% against a 43% cap, on the one file over its limit.",
        wrote: "“May be tight”, and that file filed as “likely dead” on a status flag.",
      },
      {
        // [C Quantitative reasoning, trap 2]; [R 3.7] vignette, EA Advanced.
        id: "two-accruals",
        source: "study",
        model: "Opus 4.6",
        runs: { failed: 4, of: 6 },
        title: "Two accruals, never summed",
        ask: "A candid summary of four open matters on one client account, including “the money side of all this”.",
        did: "A $90K accrual sat in one bill and one channel, a $50K accrual in another. It reported each inside its own matter, headlining one as a “$40K exposure”.",
        truth: "About $140,000 of booked liability on the account, against $9,010 invoiced.",
        wrote: "No total, in the email, the CRM note or the reply.",
      },
    ],
    build: [
      "A claim in an input whose truth takes one division over universe data: a photographed flyer, a chart on a slide, a price tag on a shelf.",
      "A decision that turns on a ratio or a threshold the user set in an input: a budget in a voice note, a cap in a document. [G 1.2.3]",
      "The parts of one total in different places, so the total only exists if the model builds it.",
    ],
    fair: [
      "Every convention the calculation needs is in the data, or standard for the domain.",
      "The set it runs over is unambiguous in the request.",
    ],
    spot: [
      "“Need to verify X” where X could have been computed.",
      "Every operand in the trajectory, and no calculation in the artifact.",
      "Totals added up in prose instead of in code.",
    ],
    fits: ["numbers", "photo", "chart", "rule", "records"],
  },
  {
    id: "no-match",
    category: "working",
    name: "Never makes the match",
    line: "Retrieves both halves, the charge and the booking, the flag and the bills, and never links them.",
    happens:
      "Opus retrieves every piece and still misses the link that is the deliverable: two charges that share a key, a fact bound to the right one of two look alikes, money credited to the booking it came from rather than the account it landed in, a status in one table that changes what the rows in another mean.",
    why: [
      "Facts attached to the wrong entity are 51% of synthesis failures, and retrieved facts never connected 44%. [R 3.11]",
      "Facts dropped from the deliverable and facts never connected fail together 1.43 times as often as chance. [R 4]",
    ],
    cases: [
      {
        // [C Synthesis, trap 1]; [R 3.11] vignette, EA Advanced.
        id: "exactly-one",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "Exactly one, it said",
        ask: "Re-audit appraisal fees, refund only the borrowers genuinely charged twice, and email the rundown.",
        did: "Retrieved 581 charges over 7 pages, with 8 loans repeated, and grouped them by eye.",
        truth: "Two loans charged twice, Gupta and Romano. Only the run that scripted the grouping found Romano.",
        wrote: "“Exactly one loan was genuinely charged the appraisal fee twice.”",
        fix: "Save every page and script the grouping by loan, checking the count against the total.",
      },
      {
        // [C Conflict and anomaly detection, trap 2]
        id: "inactive-vendor",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "The inactive vendor still billing",
        ask: "Re-audit the fees, flag anything off on the vendor and billing side, and email the result.",
        did: "Pulled the vendor list, where one vendor was marked inactive, and the bills, where 48 monthly bills from it ran on to Feb 2026. It even printed that vendor's totals. Its own checklist never joined the bills to the inactive flag.",
        truth: "An inactive vendor still being billed, about $19,891.87 since 2024.",
        wrote: "The vendor cleared in the email.",
      },
      {
        // [C Synthesis, trap 2]; [R 3.11] vignette, Long Horizon.
        id: "account-named-after-house",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 4 },
        title: "The account named after the house",
        ask: "A per property close out for two rentals, tied to the two checking accounts.",
        did: "The accounts were nicknamed by property, but the payouts landed in both. Only the booking lines named the property, and it had already read one. It summed the deposits by account.",
        truth: "Each property's income from its own booking lines.",
        wrote: "$22,571.07 of Zilker income: a split that followed where the money landed.",
      },
      {
        // [C Synthesis, trap 4]
        id: "every-ticket-overdue",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "Every open ticket overdue",
        ask: "Reconcile ten invoices against a project's tickets, log the gaps and email the result.",
        did: "Listed the tickets twice, each with its due date, assignee and state, and matched them to invoices by title only.",
        truth: "All five open tickets overdue as of a date it had used itself, and one with no assignee. Every fact was in its first list result.",
        wrote: "None of it.",
      },
    ],
    build: [
      "Media that must be matched to universe records: a receipt photo to its transaction, a label's serial number to its CRM record. [G 1.2.2]",
      "Two contacts or accounts with similar names, where only one fits the facts.",
      "A shared account that receives money for several things, while the bookings say which is which.",
      "A status in one place, a vendor marked inactive, that changes what the rows somewhere else mean.",
    ],
    fair: [
      "The linking key must exist and be reachable.",
      "Look alikes must differ by a field value, not by judgment.",
    ],
    spot: [
      "The right facts in separate sections, never combined.",
      "The first look alike chosen.",
      "Totals grouped by the container, the account, the folder, the channel, instead of by what the records say.",
    ],
    fits: ["records", "photo", "numbers", "per-item"],
  },
  {
    id: "wrong-dates",
    category: "working",
    name: "Reads the dates in the wrong frame",
    line: "Treats an old snapshot as now, drops the item on the edge day, or guesses a weekday.",
    happens:
      "Opus builds a date window from its own idea of the period, a tool default or the clock, then labels the result by the window it meant instead of the dates on the records it got. An old snapshot is read as now, the item on the boundary day falls out, a weekday is guessed.",
    why: [
      "An edge, a time zone or a cutoff off by one is 46% of date failures, a date's meaning or age misjudged 31%, the wrong period or “today” 21%. [R 3.10]",
      "Date failures cascade more than any other kind: 75% of the criteria they fail follow from one wrong window. [R 3.10]",
    ],
    caveat:
      "Every case here is an Opus 4.6 run, and dates are only 1% of OpenClaw MM failures, though 64% of date failures on Opus 4.8 and 5 still repeat across runs. Never let the bar rest on this pattern alone.",
    cases: [
      {
        // [R 3.10] vignette, OpenClaw MM; [C Temporal, trap 4].
        id: "screenshot-february",
        source: "openclaw-mm",
        model: "Opus 4.6",
        runs: { failed: 7, of: 8 },
        title: "The screenshot from February",
        ask: "A thumbnail audit naming the strongest video “right now”, with a first_month_views column. The only ranking in the inputs was a screenshot from Feb 12, and the task was dated Jul 8.",
        did: "Wrote “screenshot from Feb 12, 2026” in its own header, then crowned the screenshot's leader as the strongest video today, with no caveat.",
        truth: "A five month old first month snapshot cannot say who leads now.",
        wrote: "“Your strongest video is the Celtics switch breakdown.”",
        fix: "One sentence saying the screenshot is a February first month snapshot, and the crown withheld.",
      },
      {
        // [C Temporal, trap 4]
        id: "last-30-days",
        source: "study",
        model: "Opus 4.6",
        runs: { failed: 8, of: 8 },
        title: "The last 30 days that were February",
        ask: "A finance review of the last 30 days.",
        did: "Got an empty result for the 30 days before the session, saw the latest transaction was Feb 24, and still headed the section “last 30 days” over February's rows.",
        truth: "The last 30 days of available data, labeled by their real dates, with the gap stated.",
        wrote: "“Last 30 days”, over February.",
      },
      {
        // [C Temporal, trap 1]
        id: "last-day-of-quarter",
        source: "study",
        model: "Opus 4.6",
        title: "The last day of the quarter",
        ask: "A Q1 fitness check-in, under a rules file that said “January 1 through March 31, 2026 inclusive”.",
        did: "Queried with an exclusive end date in the same turn it read the rules, which dropped March 31. Its own check re-added the same 41 rows.",
        truth: "42 runs and 251.92 km: the 250 km goal beaten.",
        wrote: "41 runs and 244.88 km, short of the goal.",
      },
      {
        // [C Temporal, trap 5]
        id: "tomorrow-friday",
        source: "study",
        model: "Opus 4.6",
        title: "Tomorrow, Friday April 29",
        ask: "A morning briefing for Tuesday April 28, from four CSVs and a voice note.",
        did: "Wrote “Sprint Planning is tomorrow (Friday April 29)”, and read an April 17 email's “This Sunday” as April 26. It had a shell and never ran cal or date.",
        truth: "April 29 is a Wednesday, and that Sunday was April 19.",
        wrote: "Friday, and April 26.",
      },
    ],
    build: [
      "A dated snapshot among your inputs, a screenshot, a printout, a photo of a board, and a question about the current state that the universe answers.",
      "Relative dates in an input: “this Sunday” in an email, “tomorrow” in a voice note.",
      "A window stated in the prompt with one real item on its last day, or an evening event a time zone pushes into the next month, with the time zone discoverable in the universe.",
    ],
    fair: [
      "Universe dates are fixed, so write the real window into the prompt: “the week of 12 May”, not “next Tuesday”. Never build on the run's clock. [G 1.2.1]",
      "The time zone and the window's edges must be discoverable.",
      "Never build on tool behavior you cannot control, like an end date the tool treats as exclusive. An edge day item you found in the universe, with a working route to it, is fine.",
    ],
    spot: [
      "A window label that does not match the dates on the records returned.",
      "A count one short or one over at the edge of the window.",
      "A snapshot's date in the agent's own notes while the snapshot is still treated as current.",
    ],
    fits: ["dates", "photo", "calendar", "email"],
  },

  /* ============================================================== 6 calls */
  {
    id: "fills-gaps",
    category: "calls",
    name: "Fills the gap with something plausible",
    line: "A slot the records leave empty gets a plausible value, and a check it never ran gets reported.",
    happens:
      "When a value is missing or a lookup failed, Opus writes a plausible one. It states inferences as facts, writes pending items as confirmed, adds entries nobody asked for, and reports checks it never ran.",
    why: [
      "Fabricated specifics are 30% of honesty failures, inferences stated as fact 20%, unverified items written as confirmed 9%. [R 3.4]",
      "A format with a slot for every item pushes it to fill every slot. [C Calibration]",
    ],
    caveat:
      "Only 47% of these failures repeat across runs on Opus 4.8 and 5, the lowest of any kind. Build this pattern beside others, never as the one the bar rests on.",
    cases: [
      {
        // run.observations[4], "A tab that filled up with guesses".
        id: "tab-of-guesses",
        source: "golden",
        title: "A tab that filled up with guesses",
        ask: "Work out which of the charges she is unsure about are supported and which to dispute, on one page with a tab for each.",
        did: "Counted 19 charges as cleared, adding ones she never asked about and gave no evidence for.",
        truth: "The second tab limited to the charges she asked about that turned out correct.",
        wrote: "19 charges cleared, including Dillons Marketplace at $310.00 under “No receipt exists”.",
        link: gtRun,
      },
      {
        // [R 3.4] vignette, OpenClaw MM, "Fabricated identifier, record, action or placeholder data".
        id: "statistics-from-nowhere",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "Statistics from nowhere",
        ask: "Rank school districts with a webinar's formula, which needed figures the user never supplied.",
        did: "Noted which figures it was missing and searched the web four times. Every search came back “web_search is disabled or no provider is available”, and the next turn opened “Now I have everything I need”.",
        truth: "The figures held in Airtable, or cells marked as unavailable.",
        wrote: "District statistics that exist in no source, Carmel Clay's per pupil spending at $13,800 against the $11,200 in Airtable.",
        fix: "Mark each unsourced input as unverified, and say which rankings are provisional.",
      },
      {
        // [C Calibration, trap 1]
        id: "market-nobody-recorded",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 5, of: 6 },
        title: "The market nobody recorded",
        ask: "A 40 row register of every card on a board, with an intended audience or market cell to be filled where that was recorded.",
        did: "Several cards carried only Spanish or English language labels, and later material discussed a publisher's South America focus. It filled the cell with “SA/Spanish”, even in a run whose own card comment said Spanish was only a localization language.",
        truth: "“Not established.”",
        wrote: "A market the records never stated.",
      },
      {
        // [C Calibration, trap 5]
        id: "could-not-stand-up",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "What it said it could not stand up",
        ask: "An audit with a section for “whatever you could not stand up”.",
        did: "Never opened the agreement its main conclusion rested on, which sat behind a document link. Its “What I could NOT stand up” section listed two unreadable files instead.",
        truth: "That it could not establish whether the agreement was an exclusive license, the fact its conclusion rested on.",
        wrote: "The deal classified anyway, and the gap left off the list.",
      },
    ],
    build: [
      "A deliverable with a slot per item, where the honest value for some is “not recorded”, and a user who says to state only what can be backed up.",
      "A user who asks what could not be confirmed: “tell me anything you couldn't stand up”.",
      "A photo that invites a measurement but holds no scale. The guidelines name fabricated precision, millimeters with no ruler in frame, as a valid failure. [G 4]",
    ],
    fair: [
      "State the evidence standard: “only what we can back up”, “where that's recorded”, “leave blank if you can't verify”.",
      "The true value must be reachable or truly absent. If it is absent, “not established” is the right answer, and the rubric accepts it.",
    ],
    spot: [
      "Specific numbers with no source in the trajectory.",
      "“Verified” or “confirmed” with no matching tool call.",
      "“Likely” in the agent's notes that disappears from the deliverable.",
    ],
    fits: ["per-item", "photo", "records", "numbers"],
  },
  {
    id: "sweeping-story",
    category: "calls",
    name: "Lets one story decide every item",
    line: "Builds a big picture story first, then disposes of each item through it, against the item's own record.",
    happens:
      "Asked for one verdict per item, Opus first builds a story about the whole, a product sunset, a hand off, a pivot, and then disposes of every item through it, even where an item's own record says otherwise.",
    why: [
      "In judgment failures the final call contradicts the evidence 53% of the time. [R 3.12]",
      "Judgment's share of all failures rose from 2% to 7% between Opus 4.6 and 4.8. [R 2]",
    ],
    cases: [
      {
        // [C Judgment, trap 2]; [R 3.12] vignette, EA Commercial.
        id: "retired-against-description",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 3, of: 6 },
        title: "Retired against its own description",
        ask: "Audit 40 cards on a board against the roadmaps, the tickets, the files and the chat, with one recommendation per card.",
        did: "Each run built a different lifecycle story for the board's two games and retired 18 to 30 cards. It retired the Metadata card, whose own description said the English keywords were still outstanding, even in a run whose own cell read “EN never finished”.",
        truth: "5 cards to retire. Metadata: finish it, because the English keywords are still needed.",
        wrote: "“Retire.”",
      },
      {
        // [C Judgment, trap 2]
        id: "active-partner",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "The partner it called inactive",
        ask: "The same 40 card audit.",
        did: "Retired a partner's card as inactive.",
        truth: "A current, active deck for that partner sat in Drive.",
        wrote: "Retired.",
      },
    ],
    build: [
      "One verdict per item across many items, with a dramatic later event, a sunset, a hand off, a pivot, that makes a bulk verdict feel justified, and a few items whose own records point the other way.",
    ],
    fair: ["Each graded item's verdict follows from its own record, which the agent can reach."],
    spot: [
      "Many items disposed of the same way in one sweep.",
      "An item's own evidence cell contradicting its verdict.",
    ],
    fits: ["per-item", "records"],
  },
  {
    id: "own-scheme",
    category: "calls",
    name: "Uses its own categories instead of yours",
    line: "Replaces your tiers, buckets or pass and fail test with its own, or invents a third option.",
    happens:
      "Given the user's own test, tiers or buckets, Opus applies its default scheme instead, or invents a conditional verdict, a third bucket or a menu of options where the user's test and the evidence settle the call.",
    why: ["A hedge, a question or an invented third option where a call was due is 26% of judgment failures. [R 3.12]"],
    cases: [
      {
        // [C Judgment, trap 3]
        id: "own-blocker-line",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 5, of: 6 },
        title: "Below its own blocker line",
        ask: "A go or no go on a test, with a clearance condition for every blocker, a ticket for anything open, and the user's rule that a result nobody can interpret is worse than none.",
        did: "Found that the remaining budget bought too small a sample, and that two changes landed across both arms. Then it sorted them with its own scheme of blockers, open items and caveats, and placed both below the line.",
        truth: "Both are blockers under the user's rule, each with a clearance condition and a ticket.",
        wrote: "Neither carried a clearance condition, and both escaped ticketing.",
      },
      {
        // [C Judgment, trap 5]
        id: "conditional-verdict",
        source: "study",
        model: "Opus 4.6",
        title: "A conditional on a pass or fail list",
        ask: "Check a set of listing photos against a PASS or FAIL checklist, and write the draft that follows from the result.",
        did: "Invented a “conditional” verdict for IMG_3308.",
        truth: "A pass or a fail for every photo.",
        wrote: "A fail count of “exactly half”, and the required draft skipped.",
      },
      {
        // [C Domain rules, trap 3]
        id: "fourth-bucket",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "A bucket the user never had",
        ask: "Sort a set of contract terminations into the user's three buckets.",
        did: "Invented an “ordinary CEO authority / N/A” bucket for two of them.",
        truth: "Each termination in one of the user's three buckets.",
        wrote: "A fourth bucket.",
      },
    ],
    build: [
      "Put the user's own test, tiers or buckets in the prompt or an input, and tie an obligation to them: a ticket for every blocker, a draft for every fail.",
      "A binary checklist in an input, pass or fail, over photos where one is borderline but decidable.",
      "A settled feasibility call beside a genuine open choice, so a hedge changes the outcome.",
    ],
    fair: [
      "Grade the consequence the prompt tied to the label, the ticket, the draft, rather than the label's wording, unless the prompt defines it.",
      "If the prompt allows “unresolved”, the graded items must be verifiable with the tools.",
    ],
    spot: [
      "Categories in the deliverable that the user never defined.",
      "“Your call”, “most likely” or a menu of options where the records settle it.",
    ],
    fits: ["rule", "per-item", "photo"],
  },
  {
    id: "wrong-owner",
    category: "calls",
    name: "Picks the name it can see, not the one who acts",
    line: "Assigns or addresses the name visible on the record, not the person or party who has to act next.",
    happens:
      "Asked for an owner or a recipient, Opus takes the name in front of it: the preparer on the record, the address in the last email, the contact flagged as the user. The one who has to act next is one lookup away.",
    why: ["The wrong owner, recipient or assignee is 13% of judgment failures. [R 3.12]"],
    cases: [
      {
        // run.observations[5], "A dispute addressed to a mailbox that does not read mail".
        id: "alerts-mailbox",
        source: "golden",
        title: "A dispute sent to a mailbox that reads no mail",
        ask: "Draft each dispute email “to whoever it needs to go to”, and leave them in drafts.",
        did: "Wrote the right content for the Kohl's dispute and addressed it to alerts@intrustbank.com, the bank's alerts address, whose own mail says not to reply and which its own page called an unmonitored alerts box.",
        truth: "The draft written to Kohl's, with the address left for her to fill in, since her records hold none.",
        wrote: "The bank's alerts inbox.",
        link: gtRun,
      },
      {
        // [C Judgment, trap 1]
        id: "preparer-not-approver",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 5, of: 5 },
        title: "The preparer, not the approver",
        ask: "Log the true blockers on an overdue close with an owner for each, and email the manager.",
        did: "Three entries were stuck at approval, which only that manager could route, and their records carried only a preparer field. It set the owner to the preparer, or to a list of preparers and reviewers.",
        truth: "The manager himself, Daniel Jones.",
        wrote: "Someone else, so the recipient read that another person owned the fix he had to make.",
      },
      {
        // [C Judgment, trap 1]; [R 3.12] vignette, Long Horizon.
        id: "back-and-forth",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 2, of: 4 },
        title: "The person I went back and forth with",
        ask: "Email a second recipient described only as “the person I went back and forth with over that edited field”.",
        did: "The exchange sat in sent mail. It inferred the recipient from a similar looking discrepancy instead, and emailed the borrower, or another colleague.",
        truth: "Grace Yamamoto, the colleague in that exchange.",
        wrote: "The borrower, Larry Harrison, sent the internal findings.",
      },
    ],
    build: [
      "A recipient or owner the data implies instead of naming: described by role, or by a past exchange the universe holds.",
      "A record whose visible name, a preparer, an assignee, a sender, is not the person who must act next.",
      "A tempting address in front of the agent that cannot act on the message: an alerts box, a shared inbox.",
    ],
    fair: [
      "The right person or party must be derivable from the records the task leads to.",
      "Grade an owner or a recipient only when the prompt asks for one.",
    ],
    spot: [
      "An owner field filled with the record's preparer or assignee.",
      "A message addressed to whoever appeared in the last email read.",
    ],
    fits: ["send", "email", "records"],
  },

  /* ========================================================== 7 finishing */
  {
    id: "stops-short",
    category: "finishing",
    name: "Stops one step short of the final state",
    line: "Stops at approved instead of certified, or comments instead of updating, and reports it done.",
    happens:
      "The run ends short of the execution target: one state before the final one, a comment where the record had to change, a description rewritten while the status stays put. It still reports the job as done.",
    why: [
      "A required write never performed is 34% of task completion failures, and the main reasons are running out of steam (42%) and deferring when it could act (30%). [R 3.5]",
    ],
    cases: [
      {
        // [C Task completion, trap 2]
        id: "approved-not-certified",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "Approved, never certified",
        ask: "Post the agreed corrections and re-run two reconciliations “so they tie out”. Their lifecycle runs update, submit, approve, certify.",
        did: "Stopped at approve, one run at submit, never called the certify step or read the state back, and declared “Both affected reconciliations are now approved and tie out at $0 residual”.",
        truth: "Both reconciliations certified.",
        wrote: "Approved.",
      },
      {
        // [C Task completion, trap 2]
        id: "comment-not-fix",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "A comment instead of the fix",
        ask: "Write the corrected ship and slip picture into the tracker.",
        did: "Left the ticket's stale “cosmetic, low impact” description and its priority untouched, and recorded the correction as a comment.",
        truth: "The description and the priority corrected.",
        wrote: "A comment.",
      },
      {
        // [C Long horizon, trap 5]
        id: "still-done",
        source: "study",
        model: "Opus 5",
        runs: { failed: 1, of: 6 },
        title: "Still Done, after 170 calls",
        ask: "Finish a 21 clip footage handoff and bring the tracker, marked Done since 2024, up to date.",
        did: "After about 170 tool calls it rewrote the tracker's description to say five clips were still blocked, and never changed its state.",
        truth: "Moved back to Todo, as the other five runs did.",
        wrote: "Done, contradicting its own summary.",
      },
    ],
    build: [
      "Phrase the request as a result, “get it reflected in the tracker”, “bring both to certified”, where the result needs a specific field change or a final state.",
      "Read your assigned execution target for a second step it already implies: the file attached to the message, the status change after the note.",
    ],
    fair: [
      "State the execution target in the prompt, or it cannot be graded. With read access only, the task must not depend on any write. [G 1.1.2]",
      "Stay inside your assigned target and access, and never add outbound actions your parameters leave out. [G 1.1.2; G Hard Client Requirements]",
    ],
    spot: [
      "Writes listed in the final message that are not in the state changes.",
      "A record left in an intermediate state, or a comment where a status change was asked for.",
    ],
    fits: ["send", "records"],
  },
  {
    id: "asks-instead",
    category: "finishing",
    name: "Asks, defers or escalates instead of acting",
    line: "Asks the user, hands the call to a manager or ships a placeholder, with the authority and the means to act.",
    happens:
      "Authorized to act, Opus recommends, asks or hands the decision upward, or delivers with a placeholder where a value it could have found should be. In a single turn task nobody answers, so the job stays undone.",
    why: [
      "Recommending, asking or delegating instead of acting is 25% of task completion failures. [R 3.5]",
      "Ending with a question or an offer is an OpenClaw habit: 12% of OpenClaw MM tasks with failures, against 4% in Enterprise Atlas. [R 4]",
    ],
    cases: [
      {
        // [G 8.2] Unreliable: "Resisting the urge to ask".
        id: "four-figures",
        source: "guidelines",
        title: "Four invented figures to choose from",
        ask: "A Green Shell run where a needed value was not in the prompt.",
        did: "It fired AskUserQuestion with four invented figures to choose from, instead of searching the universe for the real one.",
        note: "Expect this whenever a needed value is not in the prompt, and grade it through the deliverable: the real value, found in the universe, is the one that appears in the artifact.",
      },
      {
        // [G 8.2] Unreliable: "Stopping when it is missing something".
        id: "placeholder-email",
        source: "guidelines",
        title: "The placeholder in the email",
        ask: "A Green Shell run whose deliverable was an email that needed one more figure.",
        did: "The delivered email carried “(needs shutdown estimate amount to compute)” in its body.",
        note: "“The artifact exists and looks finished.” Criteria have to test its contents, never its presence.",
      },
      {
        // [C Task completion, trap 1]
        id: "not-mine-to-decide",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "Not mine to decide",
        ask: "Lock four moves “end to end, use your judgment”, with the caveat “do not commit us to anything nobody has signed off on”.",
        did: "Classified the hazardous cylinders correctly, then escalated the routing and the pricing to an account manager as “not mine to decide”, held back the reply to the client, and reported the move “held for sign-off”.",
        truth: "The only qualified carrier booked, and the client told the surcharge applies and needs his sign off.",
        wrote: "An escalation.",
      },
    ],
    build: [
      "Let a needed value live in the universe and not in the prompt. Expect the urge to ask, and grade the real value in the artifact. [G 8.2]",
      "Give the authority to act in the prompt, with a caveat that limits one kind of action, unapproved spend, while the graded action sits inside the persona's role.",
    ],
    fair: [
      "Single turn means no confirmation is possible, so the prompt must give the authority to act. A caveat must not forbid the action you grade. [G 1.1.2]",
      "Grade the value that should stand where a placeholder is, never the artifact's presence. [G 8.2]",
    ],
    spot: [
      "A run that ends with “Want me to…?” or another offer.",
      "A question to the user for a value the universe holds.",
      "A placeholder in a delivered artifact.",
    ],
    fits: ["send", "records", "numbers"],
  },
  {
    id: "misses-items",
    category: "finishing",
    name: "Skips the second recipient or the quiet items",
    line: "Emails the one person named and never the vendor the data implies; logs the files that moved money and skips the rest.",
    happens:
      "The execution target holds more than the obvious action. Opus makes the one satisfying send and skips the party the data implies, or acts on the items that need a fix and skips the ones whose right outcome is “no action”.",
    why: ["Acting on only part of the set is 7% of task completion failures, and running out of steam explains 42% of task completion failures overall. [R 3.5]"],
    cases: [
      {
        // [C Task completion, trap 4]
        id: "transporter-in-catalog",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "The transporter only the catalog named",
        ask: "Lock a batch of moves, one of them a 1969 Triumph to ship by enclosed transporter at an approved $1,100 add on.",
        did: "The transporter was named only in the item catalog and a vendor capability sheet, never in the emails. It wrote the split into the record, emailed a colleague to turn down his shortcut, and reported the move “LOCKED”.",
        truth: "An email to the transporter's dispatch, booking it.",
        wrote: "No email to the transporter, and no transporter named.",
      },
      {
        // [C Task completion, trap 3]
        id: "batch-two-files",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 4, of: 6 },
        title: "The batch was two files, it said",
        ask: "Close out a batch loan by loan, with “a real look” and a log on each file.",
        did: "Refunded and credited the two files that needed it, and logged only those. One run never looked up a third file at all; another declared “the batch was two files”.",
        truth: "A note on every file, the excluded one and the one the borrower asked for included.",
        wrote: "Notes on two files.",
      },
    ],
    build: [
      "A recipient the data implies, found in contacts or a catalog rather than in the prompt. Name one explicit recipient as well, so there is a satisfying single send to stop at.",
      "Items whose right outcome is “no action”, when the deliverable has a slot per item.",
    ],
    fair: [
      "Every recipient or item you grade must be reachable in a place the task plausibly leads.",
      "Ask for per item outcomes in words with one reading: “a note on every file you review, including ones you exclude”.",
    ],
    spot: [
      "One send where the target implies two.",
      "“The batch” that skips the items needing no action.",
    ],
    fits: ["send", "per-item", "records"],
  },
  {
    id: "overshoots",
    category: "finishing",
    name: "Acts where nobody asked",
    line: "Emails you from your own mailbox, or posts past the audience limit you set, then says the limit held.",
    happens:
      "The run ends beyond the execution target: Opus sends or posts somewhere the user did not ask, or acts where the user's limit says not to, and reports that the limit held.",
    why: [
      "An audience or privacy limit breached is 14% of the failures to follow an instruction, and an action taken though its condition failed is 3% of task completion failures. [R 3.2; R 3.5]",
    ],
    cases: [
      {
        // [C Instruction adherence, trap 4]
        id: "send-me-in-chat",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 5, of: 6 },
        title: "Send me, in a chat",
        ask: "A chat task ending “Send me the document link and the main decisions”, with the user's own mailbox connected.",
        did: "Said it would send the link by email, mailed the user from his own mailbox to himself as more “durable”, then repeated the content in chat.",
        truth: "The reply in chat, and nothing sent.",
        wrote: "An email nobody asked for.",
      },
      {
        // [C Instruction adherence, trap 3]
        id: "founders-only",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 6, of: 6 },
        title: "Founders only",
        ask: "A founders only audit, posted to a named channel, with nothing reaching the investor.",
        did: "The channel's member list, one call away, held seven accounts: the three founders and four that matched the investor channel's members. It retrieved the list, posted the full summary, and assured the user nothing had reached the investor.",
        truth: "Seven members, not three, so the post reached the investor's side.",
        wrote: "The summary posted, and the assurance.",
      },
    ],
    build: [
      "If your assigned target carries a limit, nothing sent, drafts only, state it in the user's words. With a mail tool connected, that limit is the overshoot test.",
      "If the target posts to a channel the user limits by audience, check the channel's members during exploration.",
    ],
    fair: [
      "Never add outbound actions or limits your parameters do not include. That is drift. [G Hard Client Requirements]",
      "The audience evidence, a member list, must come back from a tool the task already uses.",
    ],
    spot: [
      "A send or a post in the state changes that the prompt never asked for.",
      "A member list retrieved and never compared with the limit.",
    ],
    fits: ["send", "chat", "email"],
  },
  {
    id: "loses-specifics",
    category: "finishing",
    name: "Loses the specifics on the way out",
    line: "The exact figure, ID or name is in the trajectory, and the deliverable says “30+” or “the Mueller account”.",
    happens:
      "The right fact is in the trajectory and not in the artifact. Figures blur into summaries, identifiers turn into friendly names, findings stay in a side file, and the message only points at the attachment.",
    why: [
      "Compression is behind 79% of these: specifics generalized 42%, a retrieved fact missing from the deliverable 40%, a finding on the wrong surface 16%. [R 3.3]",
    ],
    caveat:
      "This kind fell from 20% to 15% of failures on Opus 4.8 and is 1% of OpenClaw MM, so build on figures the prompt asks for in the message itself, not on a plain single omission.",
    cases: [
      {
        // [C Output fidelity, trap 1]
        id: "cover-note",
        source: "study",
        model: "Opus 5",
        runs: { failed: 3, of: 4 },
        title: "The email that was only a cover note",
        ask: "A one page PDF, and an email to the recipient with each house's cleaning figures.",
        did: "Put the figures in the PDF and wrote the email as a cover note with only the combined total.",
        truth: "Each house's charged and paid figures in the body of the email.",
        wrote: "The combined total.",
      },
      {
        // [C Output fidelity, trap 3]
        id: "two-accounts",
        source: "study",
        model: "Opus 5",
        runs: { failed: 4, of: 4 },
        title: "Two accounts, never named",
        ask: "Say where an unexplained credit went, as the accountant's note asked.",
        did: "Traced a $685.32 credit into one account and, in one run, the same day draw out to another.",
        truth: "That the $685.32 left account 6621 the same day, as an owner draw to account 4412.",
        wrote: "“Left the same day as an owner draw”, with no account number in any cell, email or reply.",
      },
      {
        // [C Output fidelity, trap 5]
        id: "thirty-plus",
        source: "study",
        model: "Opus 4.8",
        runs: { failed: 3, of: 4 },
        title: "“30+”, and just Evan",
        ask: "Every fraud incident of the year, with the specifics.",
        did: "Read the access review and wrote “30+” files, and called Evan Mercer just “Evan” after pulling the staff list.",
        truth: "34 files, and the full name.",
        wrote: "“30+”, and “Evan”.",
      },
    ],
    build: [
      "A deliverable that must carry an identifier or an exact figure for each item. Ask for the content, not the layout.",
      "A message the prompt asks to carry the key figures itself, beside a file that also holds them.",
    ],
    fair: ["Require a value on a surface only when the prompt asks for it there. [G 4]"],
    spot: [
      "Figures rounded or softened between the trajectory and the artifact.",
      "“See attached” where the message was asked to carry the finding.",
      "Identifiers replaced by friendly names.",
    ],
    fits: ["send", "per-item", "numbers"],
  },
  {
    id: "never-rechecks",
    category: "finishing",
    name: "Never rechecks what it made",
    line: "Writes the deliverable in one pass: its summary disagrees with its own details, or a failed edit is reported done.",
    happens:
      "Opus writes the deliverable in one pass and rarely opens it again. Its summary says one thing and its details another, or an edit its own checks said had failed is reported as done.",
    why: [
      "70% of OpenClaw MM tasks with failures showed no sign that Opus checked its outputs, the highest of any project. [R 4]",
      "Its own evidence contradicting its conclusion is 42% of verification failures. [R 3.16]",
    ],
    cases: [
      {
        // run.observations[3], "A page that contradicts its own draft".
        id: "page-against-draft",
        source: "golden",
        title: "A page that contradicts its own draft",
        ask: "Check her company purchases against a $50 monthly allowance, and draft an email to her manager for anything never sorted.",
        did: "Put the Jun 6 and Jul 5 company charges on the page and left out May 2 and May 31.",
        truth: "All four charges on the page, May's first $50.00 inside the total, as its own draft to the manager said: $105.40.",
        wrote: "$123.40 on the page, against $105.40 in the draft.",
        link: gtRun,
      },
      {
        // [R 3.16] vignette, OpenClaw MM, "Write result not read back before claiming success".
        id: "logo-still-there",
        source: "openclaw-mm",
        model: "Opus 4.6",
        title: "The logo that was still there",
        ask: "Swap the old logo on a can design for the new one.",
        did: "Pasted the new logo over the old. Three image checks reported remnants, and each time it scrubbed harder. Then it deleted every preview and reported the swap done.",
        truth: "The old logo still visible around the new one.",
        wrote: "The logo reported as replaced.",
        fix: "One more image check on the final preview, before deleting it.",
      },
      {
        // [R 3.16] vignette, OpenClaw Main, "Own evidence or line items contradict own conclusion".
        id: "nineteen-rides",
        source: "study",
        title: "19 rides in the table, 13 in the summary",
        ask: "A monthly ride report from the activity data.",
        did: "Listed all 19 November rides in its own detail table, reported 13 in the summary, and explained the gap with a deduplication step it never ran.",
        truth: "19 rides.",
        wrote: "13, “after deduplication”.",
        fix: "Count the detail rows with a short script and copy the result into both tables.",
      },
    ],
    build: [
      "An edit to a provided image or document where a careless first pass leaves visible traces: a logo swap, a redaction, a crop.",
      "A deliverable with a detail table and a summary built from it, long enough to tally by hand.",
      "Two surfaces built from the same figures, a page and a draft, so a slip in one shows against the other.",
    ],
    fair: [
      "The defect must be visible in the delivered render, at its delivered size.",
      "Grade the artifact, not the act of checking: “reviewed its output” is process. [G 5.1]",
    ],
    spot: [
      "A summary figure that disagrees with the agent's own detail rows.",
      "A final check that failed, followed by “done”.",
      "Previews or working files deleted right after the last edit.",
    ],
    fits: ["edit", "numbers", "per-item", "photo"],
  },
];

/* ---------------------------------------------------- when Model A passes */

/**
 * The diagnosis is the md's section 6, step 1, with the patterns renamed. The
 * odds are its steps 2 to 4 and its budget step, and the list of what rarely
 * pays off is its section 7 beside the "Reliable" rows of guidelines 8.2.
 */
export const faPassing = {
  id: "keeps-passing",
  title: "Model A passed? Find out why first",
  short: "Model A passed?",
  lead: "Most passes have a reason you can read in the trajectory. Find it for each planned failure point before you change anything.",
  rule: "Do not add asks to the prompt you ran, and do not rate or reweight criteria to reach 30%. Go back to planning, redesign inside your parameters, and run Leg A again with the revised prompt and inputs. [G 1; G Hard Client Requirements]",
  links: [
    { to: "/#scenario", tag: "M3", label: "Complexity is planned, never patched in" },
    { to: "/#failure", tag: "M7", label: "If the model sails through, the task is not ready" },
  ] as XLink[],
  diagnoseLead: "Open the trajectory at the step where Model A found the truth, then read across.",
  diagnose: [
    {
      gave: "The fact was in the input folder or the prompt",
      tell: "Reading the inputs or the prompt was enough.",
      change: "Find a universe record that already holds the deciding value, take that value out of the prompt and the inputs, and let the media carry only the key that finds it. [G 1.2.2]",
      patterns: ["unopened-service", "empty-search", "no-match"],
    },
    {
      gave: "The prompt pointed at where the fact was",
      tell: "The prompt named the service, the channel, the sheet or the file.",
      change: "Keep the reason to look and drop the location: “right after my usual team meeting”, not “check my calendar”. [G 1.2.3]",
      patterns: ["unopened-service", "one-level-down"],
    },
    {
      gave: "The media value was unambiguous",
      tell: "One clean read was enough.",
      change: "Add a realistic distractor: the older version, the crossed out value, the look alike.",
      patterns: ["handwriting", "counts-by-eye", "proxy-source"],
    },
    {
      gave: "Only one source existed",
      tell: "There was nothing to reconcile.",
      change: "Find a second universe record that disagrees, and let the request or an input decide which one wins. [G 4]",
      patterns: ["one-story", "proxy-source"],
    },
    {
      gave: "The rule was common sense",
      tell: "The everyday meaning gave the right answer.",
      change: "Use a rule from an input whose exact wording changes the result.",
      patterns: ["paraphrased-rule", "tempting-test"],
    },
    {
      gave: "The last step was trivial",
      tell: "One write ended the task.",
      change: "Use the full assigned execution target, including any step the data implies, without adding actions your parameters leave out. [G 1.1.2]",
      patterns: ["stops-short", "misses-items"],
    },
  ] as PassDiagnosis[],
  odds: [
    {
      id: "plan-above",
      title: "Plan more failure points than the bar needs",
      // [R 2] most failed criteria failed in half the runs or fewer.
      body: "Where the same task ran six times, most failed criteria failed in half the runs or fewer, and your Leg A is graded on one run. A rule of thumb, not a measurement: plan well above 30%, so the bar still holds if only about half of your points fire.",
    },
    {
      id: "spread",
      title: "Spread them out",
      body: "Put the points across the three stages every task has, finding the evidence, reasoning over it and delivering, and across at least two modalities, so the bar never rests on one fragile miss. [G Hard Client Requirements]",
    },
    {
      id: "repeat",
      title: "Favor what repeats",
      // [R 2] 57% of every run failures are information seeking; [C Overview] repeat rates.
      body: "A source Opus does not think to open, it tends to skip every time: most of the failures that happen in every run are missed sources. Rules, numbers, judgment and unfinished jobs all grew as a share of failures on newer versions. Filled gaps repeat least, at 47%.",
    },
    {
      id: "stack",
      title: "Stack the patterns that fail together",
      // [R 4] lifts 1.53, 1.43; 0.68 and 0.63.
      body: "A rule that changes a number fails 1.53 times as often as chance, because a misapplied rule comes back as a wrong total, and several facts that must all reach the deliverable and connect fail 1.43 times as often. But a source or a date trap built on a record another trap already hides will not fire on its own (0.68 and 0.63): a record never opened leaves nothing to misjudge, so count it once.",
    },
    {
      id: "reuse",
      title: "Reuse what already worked",
      // [R When nothing is working, 2]
      body: "Read where Model A failed in your own graded tasks and in the Golden Task: the trigger, the wrong move, the value that caught it. Rebuild the same mechanism with fresh data. It is the only lever with direct evidence on Model A.",
      link: gtRun,
    },
    {
      id: "deepen",
      title: "Go deeper in the universe, inside your parameters",
      // [R When nothing is working, 1]; [G 1.1; G 1.1.2]
      body: "In the studies, more records and cross links to cover was the best supported lever, and rules whose wording matters a close second: summaries that look complete and are not, later replies that change a decision. Choose them from what your assigned services already hold, never from a service outside them, and adjust the scenario only as far as section 1.1 allows. [G 1.1; G 1.1.2]",
    },
  ] as { id: string; title: string; body: string; link?: XLink }[],
  rarely: [
    {
      id: "formats",
      title: "Output formats",
      body: "Markdown, HTML, SVG, CSV and JSON cost it nothing. Difficulty never lives in the output format. [G 8.2]",
    },
    {
      id: "conventions",
      title: "Conventions you state",
      body: "State a convention precisely and it will be met, then checked: told a filename pattern, it ran a regex over its own outputs. Format checks never go above +1, and three or more formatting constraints fail as Bad Constraints. [G 8.2; G 5.2; Q Prompt, Constraints]",
    },
    {
      id: "arithmetic",
      title: "Arithmetic on numbers it holds",
      body: "It sums values it already holds correctly and carries the total through. Build on sourcing and scoping the numbers instead. [G 8.2]",
    },
    {
      id: "opening",
      title: "Whether it opens your files",
      // [R 3.1] a provided file never opened is 2% of information seeking failures.
      body: "It lists the workspace first and opens every attachment, images included, in the first minutes. Plan on the value it takes away, not on whether it opens the file. [G 8.2]",
    },
    {
      id: "libraries",
      title: "A missing library or tool",
      body: "It probes the toolchain and installs what is missing. An absent library is a delay, never a blocker. [G 8.2]",
    },
    {
      id: "pressure",
      title: "Pressure phrasing",
      body: "“No questions”, “I'm in a hurry”: single turn already removes the chance to clarify, and padding like this rates as a basic constraint. [Q Prompt, Constraints]",
    },
    {
      id: "memory",
      title: "Memory and logging order",
      // [R 3.17] long horizon state is 1% of root failures.
      body: "Reading a memory file first or logging as it goes is 1% of failures in the studies. Grading the order of tool calls is process, and MEMORY.md is never mandatory. [G 5.1; G 1.2.3]",
    },
    {
      id: "environment",
      title: "Traps that need control of the environment",
      body: "Page sizes, exclusive date bounds, hidden default scopes, a converter that fails, an unreadable file. You cannot configure the universe, and breaking a file or a tool on purpose produces an invalid failure. [G 4]",
    },
  ] as { id: string; title: string; body: string }[],
};

/* ------------------------------------------------------- where it comes from */

export const faSources = {
  title: "Where these cases come from",
  items: [
    {
      label: "Green Shell",
      body: "Runs on this project: the Model A run of the hub's Golden Task, and the runs the guidelines record in section 8.2, which says both models share each weakness it lists.",
    },
    {
      label: "The studies",
      // [R 1]
      body: "Two studies of graded Opus failures: 68,280 failed rubric criteria in 8,626 tasks across five agent projects, on Opus 4.6, 4.8 and 5. In every project Opus worked as an agent, reading email, calendars, chat, files and images through tools, then writing documents, sending messages and updating records.",
    },
    {
      label: "OpenClaw MM",
      // [R 1; R 2]
      body: "The closest of the five to Green Shell, and the only one where reading images matters: 845 tasks, all on Opus 4.6, graded on one run each.",
    },
    {
      label: "Runs",
      // [R 2]
      body: "Some projects ran each task several times, and the dots show those runs. Most failed criteria failed in half the runs or fewer, so a case that fails every time is the exception worth building on.",
    },
    {
      label: "Newer versions",
      // [C When nothing is working, still required]
      body: "Newer Opus versions handle some older traps better, a plain missed source most of all, so favor the cases that held on Opus 4.8 and 5.",
    },
    {
      label: "Names",
      // [C How to use it]
      body: "Names and records in the study cases come from synthetic task data.",
    },
  ],
};

/* ---------------------------------------------------------------- lookups */

export const categoryById = Object.fromEntries(failureCategories.map((c) => [c.id, c])) as Record<
  FailureCategoryId,
  FailureCategory
>;

export const patternById: Record<string, FailurePattern> = Object.fromEntries(
  failurePatterns.map((p) => [p.id, p])
);

export const patternsIn = (id: FailureCategoryId) => failurePatterns.filter((p) => p.category === id);

export const allCases = failurePatterns.flatMap((p) => p.cases);

/** A Green Shell case is a run on this project rather than in the studies. */
export const isGreenShell = (s: CaseSource) => s === "golden" || s === "guidelines";
