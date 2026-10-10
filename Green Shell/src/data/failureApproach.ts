import type { EvidenceLevel, FailureGroup, FailureGroupId, FailurePattern } from "./types";

/**
 * The Failure Approach tab: where agents break, what that means for Model A,
 * and how to plan a Leg A that exposes it honestly.
 *
 * Transcribed from `failure approach/failure_approach.md`, which sits beside
 * this project with the two studies it was written from: the final report on
 * how Claude Opus fails as an agent, and the task writer cheat sheet. The
 * folder is source material and stays out of git, like the guidelines.
 *
 * **The strings keep the source's citation brackets, so this file stays
 * diffable against the md.** The page decides what reaches the screen:
 *
 * - `[G 4]` is a guidelines section. It renders as a § badge at the end of the
 *   line, the way the pre-submit gate prints its refs.
 * - `[Q Prompt, Valid Model Failure]` is a QA rubric dimension. It renders as a
 *   link to that dimension's card in the Spec Doc, resolved against
 *   `specGroups` by name, so a renamed dimension falls back to plain text
 *   rather than to a dead link.
 * - `[R 3.1]`, `[C Multimodal, trap 1]` and `[I 07]` point at the report, the
 *   cheat sheet and the intro onboarding's slide text. They are provenance for
 *   whoever maintains the hub and never reach the screen.
 *
 * Two more conventions, both handled by the page's text renderer:
 *
 * - Any pattern code (A1 to D4) in any string links to its card.
 * - `{{target|label}}` is a link. The target is an anchor on this page (a pane,
 *   a pattern or a section id) or, when it starts with `/`, a hub route.
 *
 * Edits made on the way in, all of them copy rather than substance: "course"
 * reads "onboarding", as everywhere in the hub; "section N" became a link to
 * the pane that holds it; and a sentence that named the report or the cheat
 * sheet says "the studies" instead, because no page names the document behind
 * a rationale.
 *
 * **Additions from the two studies.** The md was cross-read against both of
 * them, and a few practical insights it left out were added where they apply
 * to a Green Shell task: one you can find in an assigned universe or build into
 * your own inputs. Each one carries an `Added from the studies` comment naming
 * the trap it came from, so the md stays the reference for everything else.
 */

/* --------------------------------------------------------------- the panes */

export type FaPaneId =
  | "overview"
  | "real-failure"
  | "patterns"
  | FailureGroupId
  | "planning"
  | "leg-a"
  | "leg-b"
  | "keeps-passing"
  | "not-to-build"
  | "evidence";

export interface FaPane {
  id: FaPaneId;
  label: string;
  /** The rail heading the pane sits under. */
  section: "Start here" | "The patterns" | "Put it to work" | "The evidence";
  /** One line, used as the search hint. */
  blurb: string;
}

export const faHeader = {
  eyebrow: "Failure Approach",
  title: "Where agents break, and how to plan for it",
  sub: "Where Opus breaks as an agent, what that means for Model A, and how to plan a Leg A that exposes real weaknesses honestly.",
};

/* ----------------------------------------------------------------- groups */

export const failureGroups: FailureGroup[] = [
  {
    id: "finding",
    letter: "A",
    title: "Finding the evidence",
    stage: "Data acquisition",
    blurb:
      "The record that decides the answer: never opened, read one level too high, scoped by a filter, or written off after an empty lookup.",
  },
  {
    id: "media",
    letter: "B",
    title: "Reading the media",
    stage: "Its own group",
    blurb:
      "The value taken from a file: a first look written as exact, media never tested against the claim, or text read in place of what only the media carries.",
    intro: [
      "Agents open media directly and early; the guidelines confirm this for both models [G 8.2]. A provided file left unopened is only 2% of information seeking failures [R 3.1]. So plan on the value the model takes away from a file, not on whether it opens it.",
    ],
  },
  {
    id: "reasoning",
    letter: "C",
    title: "Reasoning over it",
    stage: "Processing and reasoning",
    blurb:
      "Between the evidence and the answer: the convenient source, one story, a paraphrased rule, the number nobody computed, the missing join, the wrong date frame.",
  },
  {
    id: "delivering",
    letter: "D",
    title: "Delivering",
    stage: "Output generation",
    blurb:
      "The last step: a gap filled with something plausible, a fact lost on the way into the artifact, the wrong final state, a finished artifact never checked.",
  },
];

export const faPanes: FaPane[] = [
  {
    id: "overview",
    label: "Overview",
    section: "Start here",
    blurb: "How to use this tab, which model the studies measured, and the short version.",
  },
  {
    id: "real-failure",
    label: "Real or manufactured",
    section: "Start here",
    blurb:
      "The one question before any failure counts, what you control, and how a real failure differs from a manufactured one.",
  },
  {
    id: "patterns",
    label: "Pattern index",
    section: "The patterns",
    blurb:
      "Every pattern in one table, with its evidence, its OpenClaw MM share and where it fits best, plus how to read a card.",
  },
  ...failureGroups.map<FaPane>((g) => ({
    id: g.id,
    label: g.title,
    section: "The patterns",
    blurb: g.blurb,
  })),
  {
    id: "planning",
    label: "Plan the task",
    section: "Put it to work",
    blurb:
      "From your parameters to a Leg A run you do not patch, with the combinations that fail together and a worked example.",
  },
  {
    id: "leg-a",
    label: "Read the Leg A run",
    section: "Put it to work",
    blurb:
      "Where to look in the tool calls, the model's words, the artifacts and the final message, and how to rate the run against the criteria you planned.",
  },
  {
    id: "leg-b",
    label: "Hint in Leg B",
    section: "Put it to work",
    blurb: "The same patterns in the golden run, and a hint for each that stays at the level of intent.",
  },
  {
    id: "keeps-passing",
    label: "When Model A keeps passing",
    section: "Put it to work",
    blurb:
      "Why each planned failure point passed, and how to redesign inside your parameters instead of patching.",
  },
  {
    id: "not-to-build",
    label: "What not to build around",
    section: "Put it to work",
    blurb:
      "What shows up in the studies but rarely pays off in Green Shell, and the rubric advice that does not carry over.",
  },
  {
    id: "evidence",
    label: "Where the evidence comes from",
    section: "The evidence",
    blurb:
      "What the two studies measured, what failed in OpenClaw MM, the habits behind the patterns and the limits worth knowing.",
  },
];

/* ------------------------------------------------------------------ overview */

export const faIntro = [
  "This page turns two studies of graded Opus failures into a working guide for Green Shell tasks. It covers where agents tend to break, why, what that looks like in a run, and how to build a natural scenario around it without manufacturing the failure.",
  "It does not replace the guidelines. Wherever the studies and the guidelines disagree, the guidelines win, and this page already follows them.",
];

/** "How to use this page", one entry per moment in the task. */
export const faHowToUse: { when: string; body: string }[] = [
  {
    when: "Before you plan",
    body: "Read which model this is about and the short version, below, then {{real-failure|Real or manufactured}}.",
  },
  {
    when: "While you plan",
    body: "Use the {{patterns|pattern index}} to shortlist the patterns your parameters support, then follow {{planning|Plan the task}} step by step. Count failure points by what stays independent: the {{worked-example|worked example}} draws six failure points from six patterns, and three of them stay independent for the budget.",
  },
  {
    when: "After Leg A runs",
    body: "Use {{leg-a|Read the Leg A run}}.",
  },
  {
    when: "If Model A keeps passing",
    body: "Use {{keeps-passing|When Model A keeps passing}}. Do not patch the task.",
  },
  {
    when: "Once",
    body: "{{evidence|Where the evidence comes from}} is the evidence behind everything else. Read it once.",
  },
];

export const faWhichModel = {
  /**
   * The header line every pane shows. `so` is the source's own sentence, but
   * it opens on "So" and reads as a conclusion out of its paragraph, so the
   * header carries the same claim with its premise attached.
   */
  banner:
    "The studies measured Opus, and Leg A runs on a different model. So every pattern here is a tendency to plan around, not a prediction: confirm each one on your own Leg A run.",
  measured: "The studies measured Opus: versions 4.6, 4.8 and 5 [R 1].",
  legs: "In the guidelines, Leg A is the GPT leg, and Leg B runs on Opus [G 3; G 6.1]. Model A and Model B are different frontier models [G 8.1].",
  so: "So for Model A, every pattern here is a tendency to plan around, not a prediction. Confirm each one on your own Leg A run.",
  safestLead: "The safest ground is what the guidelines record for both models [G 8.1; G 8.2]:",
  safest: [
    "Not opening a connected service",
    "Saying something is unavailable without testing it",
    "Asking instead of searching",
    "Stopping with a placeholder in the deliverable",
    "Taking a file in the input folder as proof that an item belongs to a set the prompt defined elsewhere",
    "Trusting OCR over its own look at the image",
  ],
  safestAfter: "On this page those are A1, A3, A4, B1 and D3.",
  legB: "The same patterns tell you where the golden run will need hints, because Leg B runs on the model the studies measured. See {{leg-b|Hint in Leg B}}.",
  terms: [
    { term: "Opus", means: "what the studies measured" },
    { term: "Model A", means: "the model in your Leg A run" },
    { term: "the model", means: "what the guidelines say about both" },
  ],
};

/**
 * "The short version". `patterns` and `to` are the hub's: each point is the
 * summary of a pattern or a pane, and the link is where that summary expands.
 */
export const faShortVersion: { title: string; body: string; patterns?: string[]; to?: FaPaneId }[] = [
  {
    title: "Agents answer from what is already in front of them.",
    body: "The most common failure in the data is a source that held the answer and was never opened. In OpenClaw MM, the multimodal project in the studies, 73% of the tasks with failures left a needed source unopened [R 4].",
    patterns: ["a1"],
  },
  {
    title: "They trust the first read.",
    body: "One look at an image, one search, one page of results, one version of a document. Hedged reads become exact facts in the deliverable.",
    patterns: ["b1", "a2"],
  },
  {
    title: "They take the convenient source over the right one.",
    body: "A memory note, a plan, a status flag or a filename wins over the record that settles the question.",
    patterns: ["c1"],
  },
  {
    title: "They apply their own version of a rule.",
    body: "The rule is in your inputs, and the agent applies a paraphrase, an everyday meaning or a tempting number in the data instead.",
    patterns: ["c3"],
  },
  {
    title: "They quit or overshoot at the last step.",
    body: "The final write never happens, the agent asks instead of acting, or it acts beyond what the user asked for.",
    patterns: ["d3"],
  },
  {
    title: "A real failure is one the model had a fair chance to avoid.",
    body: "The evidence was reachable, the request was clear, and nothing was hidden, broken or forced.",
    to: "real-failure",
  },
  {
    title: "Plan the failure points before you run.",
    body: "Spread them across the stages of the task and across your inputs, so the 30% bar never rests on one fragile miss.",
    to: "planning",
  },
];

/* --------------------------------------------- 1. real or manufactured failure */

export const faRealFailure = {
  /** Shown large, with the lead under it, so the lead points back at it rather than repeating it. */
  question: "Did the model have a fair opportunity to get it right?",
  lead: "The guidelines ask that one question before any failure counts [G 4]. A failure opportunity is real when a careful agent, with the same prompt, inputs and tools, would have passed.",
  control: [
    {
      area: "Universe",
      you: "Which assigned services the scenario depends on, and which records you build around after exploring them",
      notYou:
        "The records it holds. You find the stale note, the later thread reply or the long table during exploration, and build on it [G 1.2.1]",
    },
    {
      area: "Inputs",
      you: "The files you upload, each with a role: signal, distractor or noise [G 1.2.2]. Their size too: video at 480p, images at 1080p or lower, audio as MP3 at 64 kbps, before upload [G 1.2.2]",
      notYou: "How the model reads them: one look, an OCR pass or a description tool",
    },
    {
      area: "Prompt",
      you: "A natural request in the user's voice, the named output files, and the wording of your **assigned** execution target [G 1.2.3; G 1.1.2]",
      notYou: "How the model reads it. One turn, no follow ups, no chance to clarify [G 1.1.2]",
    },
  ],
  controlNote:
    "The studies were written for projects where the task writer builds the data and the tools. In Green Shell, the universe comes with your task parameters [G 1.1.2]. So **you find the failure structure during exploration, then connect it to inputs you design.**",
  compare: [
    {
      build: "The deciding record sits in an assigned, loaded service, and the request gives a reason to open it",
      not: "The record is in no service, or in one that is not assigned or not loaded",
      why: "Data not in the server, or a bad load, is your defect [G 4; G 1.2.1]",
    },
    {
      build: "The rule lives in an input file, and its exact wording matters",
      not: "The rule lives only in your Desired Outcome or in your head",
      why: "A requirement the model never saw [G 4; G 1.3]",
    },
    {
      build: "A crossed out value any person can read",
      not: "Handwriting nobody can read; a photo too dark or blurred",
      why: "Media no person could read [G 4; G 1.2.5]",
    },
    {
      build:
        "Two sources disagree, and the request or an input says which one wins, or the task asks to flag mismatches",
      not: "Two sources disagree and nothing says which wins",
      why: "An undecided source conflict [G 4]",
    },
    {
      build: "Your inputs agree with the universe, except at the conflicts you planned",
      not: "A date, amount or serial in your photo that misses the universe record by accident",
      why: "Seed data stays consistent except where the inconsistency is the point [C Fairness checklist]",
    },
    {
      build: "A messy real file: rotated photo, scanned page, awkward filename",
      not: "A corrupted file or a forbidden format meant to break a tool",
      why: "A run that breaks, or a forbidden format, is your defect [G 4]",
    },
    {
      build: "A distractor with a role, like an older photo of the same whiteboard",
      not: "An input that rewrites or contradicts the prompt",
      why: "Contradictory multimodal input [G 4]",
    },
    {
      build: "Conventions the prompt or an input sets",
      not: "Grading an unstated habit: a format, email etiquette, who to copy",
      why: "Unstated conventions are off limits [C Fairness checklist]; no criterion for a format the prompt never stated [G 5.4]",
    },
    {
      build: "Constraints a real user in this situation would state",
      not: "Stacked or unrealistic constraints added for difficulty",
      why: "Contrived scenario [G 4]; Bad Constraints [Q Prompt, Constraints]",
    },
    {
      build: "A request with one defensible reading",
      not: "A miss that rests on another reasonable reading",
      why: "Fail, No Model Failure: an ambiguous interpretation [Q Prompt, Valid Model Failure]",
    },
    {
      build: "A miss that changes what the user receives",
      not: "A one cent rounding or a cosmetic slip carrying the bar",
      why: "A weak, unpronounced failure fails the same QA check [Q Prompt, Valid Model Failure]",
    },
    {
      build:
        "Failure points planned before the run, or a full redesign with a fresh Leg A run when Model A passes ({{keeps-passing|When Model A keeps passing}})",
      not: "Asks or complexity bolted onto a task after its run, then graded against that same run",
      why: "Do not patch the scenario halfway [G 1]",
    },
    {
      build: "Each miss weighted once, at its real difficulty",
      not: "One miss repeated across many criteria to reach 30%",
      why: "Never forced or artificially scored [G Hard Client Requirements]; the weight sits on the reasoning act, never the restatement [G 5.2]",
    },
  ],
  namedLead: "The valid failures in the guidelines [G 4] map onto this page:",
  named: [
    { label: "Universe evidence never found", patterns: ["a1"] },
    { label: "An accessible tool left unused", patterns: ["a1", "a4"] },
    { label: "Misread a legible value", patterns: ["b1"] },
    { label: "Filename taken as evidence", patterns: ["b2", "c1"] },
    { label: "Cross reference collapsed to one side", patterns: ["c2"] },
    { label: "Logic flow misapplied", patterns: ["c3"] },
    { label: "Fabricated precision", patterns: ["d1"] },
    { label: "Conditional handled wrong", patterns: ["d3"] },
  ],
  legBLead:
    "So does the guidelines' Leg B example, five rounds of a workout tracker going wrong [G 6.2.1]:",
  legB: [
    { label: "Reads the plan as the record", patterns: ["c1"] },
    { label: "Right sources, wrong window", patterns: ["c6"] },
    { label: "Names the media instead of showing it", patterns: ["d2"] },
    { label: "Attaches media by filename order, not by content", patterns: ["b2"] },
    { label: "Trusts the note over the footage", patterns: ["c1"] },
  ],
};

/* -------------------------------------------------------------- 2. patterns */

export const faIndex = {
  lead: "Patterns follow the three stages every Green Shell task must contain: **data acquisition, processing and reasoning, and output generation** [G Hard Client Requirements]. Reading the media is its own group, because every task here depends on it.",
  shareNote:
    "**OpenClaw MM share** is how much of that project's failed criteria the capability behind each pattern explains [R 2]. The A and B groups carry almost two thirds of them. Most C and D patterns earn their place through how reliably they repeat on newer Opus versions (C1 to C4 at 70% or more), not through how often they appeared in OpenClaw MM [C Overview]. C6, D1 and D2 are the weakest on that count, so never let the bar rest on them.",
  evidence: [
    {
      level: "strong" as EvidenceLevel,
      text: "In a capability where 70% or more of failures on Opus 4.8 and 5 repeat across runs, with incidents that failed in most runs.",
    },
    { level: "moderate" as EvidenceLevel, text: "A lower repeat rate, between 47% and 69%." },
    {
      level: "limited" as EvidenceLevel,
      text: "No repeat data for the capability, and the incidents are single graded runs, mostly Opus 4.6.",
    },
  ],
  evidenceNote: "Strong means reliable when it fires, not common. For how common, check the OpenClaw MM share.",
  card: [
    {
      label: "Why it happens",
      text: "Marks each point as **Documented** (what the data shows) or **Likely** (an interpretation).",
    },
    {
      label: "In the guidelines",
      text: "Links the pattern to a rule or example in the guidelines, when one exists.",
    },
    { label: "Scenario ideas", text: "Are suggestions. Nobody measured them on Green Shell tasks." },
    {
      label: "Grade it where it lands",
      text: "Gives an example criterion. Filenames in the examples are illustrative; copy every literal from your own sources [G 5.1].",
    },
  ],
};

export const failurePatterns: FailurePattern[] = [
  /* ------------------------------------------------ A. Finding the evidence */
  {
    id: "a1",
    code: "A1",
    group: "finding",
    name: "Stops at the first source that looks complete",
    share: { value: "39%", with: "A1 to A3" },
    fit: "Every task with assigned services",
    happens:
      "Opus answers from the first source that seems sufficient: the input folder, the tool whose name matches the request, the system the prompt names, or a memory note. The service that holds the deciding record is loaded and never called. The deliverable is still written with full confidence.",
    why: [
      {
        tag: "Documented",
        text: "Premature closure explains about 55% of information seeking failures. Assuming a source is unavailable, or treating the input folder as the whole universe, explains about 28% [R 3.1].",
      },
      {
        tag: "Documented",
        text: "Opus rarely runs a discovery step, such as listing what is connected, before concluding [R 3.1].",
      },
      {
        tag: "Likely",
        text: "A tool or file whose name matches the request feels like the complete answer [R 3.1, triggers].",
      },
    ],
    evidence: {
      level: "strong",
      points: [
        "A source that held the answer and was never opened is the most common pattern in the data: about one in eight root failures, and 65% of information seeking failures [R At a glance; R 3.1].",
        "Across information seeking as a whole, 82% of failures on Opus 4.8 and 5 repeat in more than one run [C Overview].",
        "Information seeking fell from 36% to 25% of root failures between Opus 4.6 and 4.8 in one project, on different task batches [R 2; C Overview]. The studies read this as plain single system misses shrinking, while depth, pagination and scope traps still hold [C Information seeking]. Even so, a value that lived only in a service the prompt never named still failed 4 of 6 runs on Opus 4.8 [C Information seeking, trap 4].",
        "**OpenClaw MM:** a spec required cropping a framed sketch to the frame's real ratio, \"not eyeballed\". The user's note said \"the 12x16 i think\", while the order confirmation for an 11×14 frame sat in the inbox. Opus made zero email queries, used 12x16 and dropped the \"i think\" [R 3.1].",
      ],
    },
    guidelines:
      "\"Opening a connected service at all\" is listed as unreliable for both models: \"This is the default, not an edge case\" [G 8.2].",
    ideas: [
      "Let a value in the media lead to a record only a service holds: the only visible serial number on a product label, which finds the matching CRM record and its transaction history. This is the guidelines' own example of strong reconciliation [G 1.2.2].",
      "Let the user's note carry a hedged value (\"the 12x16 i think\"), while the universe holds the record that settles it: an order confirmation, a booking, a receipt.",
      "Let the user say a source is incomplete (\"the app doesn't seem to show everything\"). That makes the source the thing to audit, not the answer [R 3.1, lessons].",
      "Let the request imply a service it does not name. \"Right after my usual team meeting\" can only be answered from the calendar.",
    ],
    watch: [
      "No calls at all to an assigned, loaded service that your GTFA needs.",
      "Every tool call stays inside the input folder.",
      "A hedged value from an input (\"i think\", \"around\", \"~\") lands in the artifact as exact.",
      "\"Now I have everything I need\" before any service was queried.",
    ],
    fair: [
      "The service must be assigned and loaded. A partial load is an environment defect, never a model failure [G 1.2.1]. A service outside your assigned tools is drift [G 1.1.2].",
      "The request must give a reason to look there. Never grade a fact the prompt gave no reason to seek [C Information seeking, fairness].",
      "Confirm the record exists with SQL, then confirm the agent's own tools reach it: ask the in universe agent, or call the tool it would use [G 1.2.1; G 4].",
    ],
    grade: [
      { say: "Put the value only the record holds into the criterion:" },
      {
        criterion:
          "gallery.html crops the sketch to the 11×14 ratio of the frame in the Framebridge order confirmation.",
        kind: "use",
      },
      {
        criterion: "The model searches the inbox.",
        kind: "avoid",
        note: "Process, which counts toward the 20% cap [G 5.1].",
      },
    ],
    takeaway:
      "Agents work from what is in front of them. Put the deciding fact one natural step away, in a service the scenario gives a reason to open.",
  },
  {
    id: "a2",
    code: "A2",
    group: "finding",
    name: "Stops one level above the answer",
    share: { value: "39%", with: "A1 to A3" },
    fit: "Threads, sent mail, second sheets",
    happens:
      "Opus opens the right system and stops at its surface. It reads the top of a channel, not the thread reply, and the inbox, not the sent folder. It stops at the list instead of the record, and at the first worksheet instead of the second.",
    why: [
      {
        tag: "Documented",
        text: "Within information seeking, records never opened below the list level (9%), result sets read only in part (4%) and searches that stopped at the first hit (2%) add up to about 15% [R 3.1].",
      },
      {
        tag: "Documented",
        text: "The record that changes the answer sits one step further on: in a sent folder, a thread reply, page two, an unnamed ledger or outside a convenient filter [C Information seeking].",
      },
      {
        tag: "Likely",
        text: "A tidy first result looks like the whole picture, so the next step never happens.",
      },
    ],
    evidence: {
      level: "strong",
      lead: "Opus 4.8 and 5 failed these in most runs:",
      points: [
        "A thread reply said a test had been stopped. Opus read the channel history four times and wrote \"live\" into the doc and the card, 6 of 6 runs [C Information seeking, trap 3].",
        "Opus 5 never read a Slack thread to its last reply, and wrote that a shipped ad was unfinished, 6 of 6 runs [C Synthesis, trap 3].",
        "The disclosure dates sat in emails in the sent folder. Opus searched the inbox once and reported zero violations, 4 of 4 runs on Opus 5 [C Information seeking, trap 1].",
      ],
      after: [
        "On Opus 4.6, in **OpenClaw MM**, a food log workbook's second worksheet set a target of 1,800 calories against 2,000 on the first. All eight sibling runs missed it [R 3.15; C Faithful extraction, trap 4].",
        "In OpenClaw MM, unfetched result pages showed up in only 2% of tasks with failures [R 4]. Lean on threads, sent mail and second sheets before pagination.",
      ],
    },
    ideas: [
      "During exploration, look for what your universe already keeps one level down. Good finds are a thread where a later reply reverses the top message, an email that exists only in sent mail, or a record whose detail holds fields the list lacks. Build on one you found.",
      "Make the user's question about the current or final state: \"where did we land on…\", \"what did we actually agree\".",
      "In your own inputs, use a multi page document, or a workbook you built yourself, where the deciding part is not on the first page or sheet. Never use an LLM generated .pdf, .docx, .xlsx or .csv [G 1.2.2; Q Input Artifacts, Realism].",
    ],
    watch: [
      "Channel history read, thread never opened.",
      "One search per system, with no second query.",
      "A result that shows a total larger than the rows returned, and no further page fetched.",
      "\"The latest status\" taken from a top level message.",
    ],
    fair: [
      "The deeper level must be reachable with the agent's tools: a thread tool, a folder parameter, paging [C Information seeking, fairness].",
      "\"Most recent\" must have one answer, with the later record clearly dated after the earlier one [C Information seeking, fairness].",
      "If the second sheet or page disagrees with the first, the prompt must ask for mismatches to be flagged, or the file must say which value is current [G 4].",
    ],
    grade: [
      { criterion: "status_report.md records the BoomBit test as stopped on 2026-02-13.", kind: "use" },
      {
        say: "The wrong path, \"live\", fails it cleanly. If the pending review call matters to the user, grade it in its own criterion.",
      },
    ],
    takeaway:
      "The answer is often one level down. Find where your universe already keeps a later or deeper record, and ask about the current state.",
  },
  {
    id: "a3",
    code: "A3",
    group: "finding",
    name: "Builds the set from a convenient filter",
    share: { value: "39%", with: "A1 to A3" },
    fit: "\"Every\", \"all\", \"still open\" requests",
    happens:
      "Asked for \"every\" item of some kind, Opus builds the set from a handy proxy: one entity filter, a vendor name, a status, an ID prefix, or the files in the folder. Part of what is in scope is never examined, and the total looks complete.",
    why: [
      {
        tag: "Documented",
        text: "Populations scoped by a convenient filter are 3% of information seeking failures, and actions taken on only part of a set are 7% of task completion failures [R 3.1; R 3.5].",
      },
      {
        tag: "Documented",
        text: "The requested population can span two statuses. An intermediate status (approved, scheduled) sounds resolved, while the request covers everything still unpaid or undelivered [C Quantitative reasoning, trap 3].",
      },
    ],
    evidence: {
      level: "strong",
      lead: "A small share of failures, but the incidents repeat. Opus 4.8:",
      points: [
        "A query filtered by one entity found 7 invoices for $10,179.20 and never saw 10 others worth $653,393.14, 4 of 5 runs [C Information seeking, trap 5].",
        "\"Open\" was read as \"pending approval\" only, dropping two approved but unpaid invoices, 4 of 6 runs [C Quantitative reasoning, trap 3].",
        "In a loan by loan close out, notes were logged only on the files that moved money, 4 of 6 runs [C Task completion, trap 3].",
      ],
    },
    guidelines:
      "\"Separating in the folder from in scope\" is listed as unreliable for both models: \"Where membership comes from one source and evidence from another, it will not reconcile the two unaided\" [G 8.2].",
    ideas: [
      "Write the membership rule in your input (a policy page, a list in a photo, a sentence in a voice note) so that an item you found during exploration falls outside the convenient filter. Check with a query that the filter really misses it.",
      "Make the item outside the filter large enough to change the headline.",
      "Include items whose right outcome is \"no action\", when the deliverable already has a slot per item.",
    ],
    watch: [
      "A total that matches a filter, not the rule.",
      "A set whose size equals the number of files in the input folder.",
      "An item counted in the set only because its file sits in the input folder, while the membership rule excludes it [G 8.2].",
      "Items described as \"the batch\" that skip the ones needing no action.",
    ],
    fair: [
      "Word the request so the wide reading is the only defensible one, as in \"every open invoice\", \"full exposure\", \"still sitting in SAP\". A request that only says \"pending\" makes the narrower total defensible [C Quantitative reasoning, fairness].",
      "More than 8 similar items get one completeness criterion and up to five spot checks, not one criterion each [G 5.1.1].",
    ],
    grade: [
      { say: "Name the set next to the value:" },
      {
        criterion:
          "The email to matthew.li@brookfieldcpas.com states 7 open CrownPeak invoices totaling $10,354.25: 5 pending approval and 2 approved but unpaid.",
        kind: "use",
      },
      { say: "A right total over the wrong set still fails." },
    ],
    takeaway: "Define the set by a rule, not by a container, and let the rule live in the inputs.",
  },
  {
    id: "a4",
    code: "A4",
    group: "finding",
    name: "Treats an empty or failed lookup as proof",
    share: { value: "7%", with: "A4 and D1" },
    fit: "Records found by an ID the media supplies",
    happens:
      "A search returns nothing, a tool errors, or a lookup by ID says \"not found\". Opus concludes the thing does not exist, says it has no access, or moves on as if the read had worked.",
    why: [
      {
        tag: "Documented",
        text: "False \"no record\", \"no access\" or \"searched\" claims are 31% of calibration failures [R 3.4]. Empty or failed lookups accepted as absence are 23% of verification failures [R 3.16]. Tool errors not worked around, or recovered the wrong way, are 33% of tool use failures [R 3.13].",
      },
      {
        tag: "Likely",
        text: "When the obvious query comes back empty, a story of absence is easier than a second query.",
      },
    ],
    evidence: {
      level: "moderate",
      points: [
        "One inbox search per borrower, by full name, returned nothing for eight of eleven. Opus never searched the inbox by loan number, lender or decision keywords, though it later ran a loan number query on Sent. It took a status flag as the answer [R 3.1].",
        "Keyword searches came back empty, while the record was reachable by its case number. In 2 of 6 runs, Opus 4.8 wrote \"no disposition was ever reached\" into a memo [C Verification, trap 1].",
        "**OpenClaw MM:** the image tool errored on a video thumbnail. Without mentioning the error, Opus picked the first recipe in the text file, a vegetable soup. The video showed chicken soup [R 3.13; C Tool use, trap 1].",
      ],
    },
    guidelines:
      "\"Testing before it declares something unavailable\" is listed as unreliable for both models. One run answered \"I do not have access to your executives channel from here\" with the Slack tools in its own list [G 8.2].",
    ideas: [
      "Let the user refer to something the way people do, by a nickname or a description. The record itself is filed under an identifier that appears in the media: a reference number on a receipt photo, an order number on a box label.",
      "Place a plausible first candidate in a text list beside a video or photo that decides between candidates. If the media read fails, the first item is the tempting default [R 3.13].",
      "Use naturally messy inputs, such as a scanned page with no text layer, but do not count on them alone. In the run the guidelines describe, the model recovered by rendering the pages and reading the image, and the guidelines class scanned PDFs as \"works, but costs turns\" [G 8.2].",
    ],
    watch: [
      "An empty result followed by a definite claim of absence.",
      "\"I don't have access\" while the tool is loaded.",
      "A tool error in the trajectory that is never mentioned again.",
      "A question to the user for a value that sits in the universe [G 8.2].",
    ],
    fair: [
      "Leave a cue that tells a wrong query from a true absence: an identifier already in hand, a second system, a count [C Verification, fairness].",
      "Never break a tool or a file on purpose. A crash, a timeout or a broken session is never a model failure [G 4].",
      "An unplanned tool error counts only when the run went on, a working route existed (another tool, rendering the file, installing the missing library) and the model wrote the deliverable without it [G 4; G 8.2].",
    ],
    grade: [
      { say: "Grade the value the record holds:" },
      { criterion: "close_out.md states that partner clearance by Steven Perry is on record.", kind: "use" },
      {
        say: "Before adding the negative *\"close_out.md states that no disposition was reached\"*, ask the three questions under {{rating|Rating the run}}. Two noes make it redundant [G 5.3].",
      },
    ],
    takeaway:
      "An empty result is a question about the query. Give the record a natural key that only the media supplies.",
  },

  /* --------------------------------------------------- B. Reading the media */
  {
    id: "b1",
    code: "B1",
    group: "media",
    name: "Takes one look and writes the read as exact",
    share: { value: "25%", with: "B1 to B3" },
    fit: "Counts, pen corrections, positions, charts",
    happens:
      "Opus reads an image in one pass and writes what comes back into the deliverable as fact. A hedged \"about 30\" becomes 30. Pen corrections, dense counts, positions and chart lines are where the read goes wrong.",
    why: [
      {
        tag: "Documented",
        text: "Perception error is the mechanism in 85% of multimodal failures [R 3.9]. Misread handwriting and marks are 30%, and wrong counts or identities another 30%. Images labeled by position, or annotations misplaced, are 12%; spoken or embedded figures not extracted, 11%; chart series misread, 8% [R 3.9].",
      },
      {
        tag: "Documented",
        text: "In OpenClaw MM, Opus saw images through an image tool, so part of each error may belong to the tool. Acting on hedged descriptions without a second look is Opus's own contribution [R 3.9].",
      },
      {
        tag: "Likely",
        text: "In Green Shell the model views images directly [G 8.2], so the part of the evidence that belongs to the description tool may not carry over. What does carry over is trust in a first read.",
      },
    ],
    evidence: {
      level: "limited",
      lead: "Multimodal perception is 25% of OpenClaw MM failed criteria [R 2], but every trap below is a single graded Opus 4.6 run, with no repeat data [C Multimodal].",
      points: [
        "A notes photo had a weight struck through as 3, rewritten as 2, then circled as 5 with \"this matters most\". Opus used the 2, so Set B won 17 to 13, when the circled 5 makes Set A the winner, 21 to 17 [C Multimodal, trap 1].",
        "Asked for exact counts, Opus wrote \"~30 toppers\" as 30 when there were 28, so the required flag string was wrong [C Multimodal, trap 2].",
        "Tracing four wires on a hand drawn diagram in one image call, it got none of the four right [C Multimodal, trap 3].",
        "**OpenClaw MM:** two reads of the same graph disagreed on which side was shaded. After a leading second query, Opus took the reading that matched the student's answer and marked it correct [R 3.14].",
        // Added from the studies: the inventory case and the worksheet clues,
        // [C Multimodal, traps 2 and 5] and [R 3.9]. Identity is half of the
        // 30% "wrong counts or identities", and the md had no example of it.
        "**OpenClaw MM:** reconciling an office table against a note, Opus read three stacked sticky pads as one block, and never tied a vanished Pikachu figure to the note's \"Charger 1\" line, so it reported zero chargers taken. Elsewhere it took a worksheet's printed picture clues for a child's doodles [C Multimodal, traps 2 and 5; R 3.9].",
      ],
    },
    guidelines:
      "\"Trusting OCR over its own eyes\" is listed for both models: OCR read a vendor logo as \"Eis Meetpsrre\", and the model issued a receipt for an unnamed vendor after viewing the image itself [G 8.2]. \"Misread a legible value\" is a valid failure [G 4].",
    ideas: [
      "A whiteboard or notes photo where a value was crossed out and replaced, because the plan changed.",
      "A photo where an exact count decides something: stock on a shelf, items packed, seats taken.",
      "A chart where reading the right series, by color or by gridline, sets a value the task uses.",
      "A floor plan or a map where a position decides the answer: which room, which corner, which side.",
      // Added from the studies: [C Multimodal, trap 5].
      "An object whose identity is ambiguous at a glance, where the right call changes a count: a charger shaped like a toy figure, or picture clues that belong to a printed worksheet rather than to the child who filled it in.",
    ],
    watch: [
      "\"About\", \"approximately\" or \"appears to\" in the image read, then an exact number in the artifact.",
      "One image call for a task that needs an exact count.",
      "Two reads of the same image that disagree, settled by a leading question. Read the wording of the agent's own image queries.",
      "Legend entries matched to lines by order, not by color.",
    ],
    fair: [
      "Export each image at its upload size (1080p or lower), open it at 100% and read the deciding value yourself. If you have to zoom or guess, a reviewer will call it unreadable [G 1.2.2; G 1.2.5].",
      "If a convention decides the reading (crossed out means superseded, circled means final), state it in the prompt or an input, in the user's own words, as in \"including anything I fixed in pen\" [C Multimodal, fairness].",
    ],
    grade: [
      {
        say: "A value read off one image and reported is usually +3. It reaches +5 when the deliverable carries it after reconciling it against another source, such as a universe record or a rule in another input [G 5.2].",
      },
      { criterion: "scorecard.csv applies a weight of 5 to the ANONYMOUS criterion.", kind: "use" },
      {
        say: "That criterion reads one photo through its pen corrections, so weight it by the axes it actually uses.",
      },
    ],
    takeaway:
      "The weakness is not that the model cannot see. It trusts its first look. Make an exact visual value decide something.",
  },
  {
    id: "b2",
    code: "B2",
    group: "media",
    name: "Sees the media but never tests it against the claim",
    share: { value: "25%", with: "B1 to B3" },
    fit: "Photos that confirm or refute a written claim",
    happens:
      "Opus describes the media, then does not use it for the job: checking a written claim against a photo, comparing two images, or matching each image to the right record. It goes by the filename, the order of the files, or the text around the image.",
    why: [
      {
        tag: "Documented",
        text: "Images described but never tested against the written claim are 9% of multimodal failures. Images labeled by position, or annotations misplaced, are 12% [R 3.9].",
      },
      {
        tag: "Documented",
        text: "When an image batch timed out and was split into two calls, related photos landed in different calls, which discouraged comparing them [R 3.11, triggers].",
      },
      {
        tag: "Likely, from OpenClaw",
        text: "A description pass answers \"what is in this image\" for each file, and the comparison the task needs is never asked [R 3.11, triggers].",
      },
    ],
    evidence: {
      level: "limited",
      lead: "Single graded Opus 4.6 runs:",
      points: [
        "**OpenClaw MM:** a portfolio PDF's cover showed a superseded banner with the shop name in three words. Opus had every clue, including a final file noted \"name fixed\", and never compared the cover with the two banner files [R 3.9].",
        "**OpenClaw MM:** five photos showed two different shirt designs. Opus classified each photo alone and reported one design. Believing any front matched any back, it attached the one design 1 front, when every back photo belongs to design 2 [R 3.11].",
        "In a work order task, Opus's own image read said `parking_photo.jpg` showed staining and no pothole. It still matched the photo to the parking lot pothole order [C Verification, trap 4].",
      ],
    },
    guidelines:
      "\"Filename taken as evidence\" is a valid failure [G 4]. A matching case is a −5 example: trusting `parking_pothole.jpg` instead of inspecting the oil stain inside it [G 5.2]. The Leg B example lists \"attaches media by filename order, not by content\" [G 6.2.1].",
    ideas: [
      "A user's draft, listing or flyer makes claims the photos can confirm or refute: \"hardwood floors throughout\", next to a photo of wall to wall carpet in the main bedroom.",
      "Several photos of similar items, where the deliverable needs them grouped or paired: two versions of a product, front and back shots.",
      "Natural, uninformative filenames such as `IMG_6506.jpg`, so only the content can decide. Distractors and look alike photos are allowed when they are deliberate [G 1.2.2].",
    ],
    watch: [
      "A claim marked \"verified\" with no step that compares it with the image.",
      "Attachments chosen in filename order.",
      "One variant reported where the photos show two.",
    ],
    fair: [
      "A filename may suggest content the file does not hold, when a real user would have named it that way. It must never reveal the expected answer [G 1.2.2; G 5.2].",
      "Keep filenames and captions from contradicting each other unless the task is to check content against labels, and never let a matching name be the only thing that makes the trap work [C Multimodal, fairness].",
      "The difference that decides it must be visible at upload size.",
    ],
    grade: [
      {
        criterion:
          "listing_audit.md marks the flooring claim as incorrect, because IMG_2207.jpg shows wall to wall carpet in the main bedroom.",
        kind: "use",
      },
    ],
    takeaway: "Ask for a judgment that only comparing the media can settle.",
  },
  {
    id: "b3",
    code: "B3",
    group: "media",
    name: "Reads the text and misses what only the media carries",
    share: { value: "25%", with: "B1 to B3" },
    fit: "Spoken rules, marks on a page",
    happens:
      "When text and media cover the same ground, Opus leans on the text: the transcript, the printed page, the PDF's text layer, the first sheet. A rule spoken only in a recording, marks drawn on a page, or a caption under an image never reach the deliverable.",
    why: [
      {
        tag: "Documented",
        text: "A rule spoken only in a recording was missed, while a printed list \"made the audio feel redundant\" [R 3.9, triggers].",
      },
      {
        tag: "Documented",
        text: "A fast, low accuracy transcription model, piped through `tail -20`, exposed only the last 1:40 of a 3:44 recording [R 3.9; C Multimodal, trap 4].",
      },
      {
        tag: "Documented",
        text: "A text only PDF tool returned a confident table built from a note, while the real picks were red X marks on the page [C Faithful extraction, trap 3].",
      },
      {
        tag: "Documented",
        text: "When Opus reads text and structured records, document sections, tables or pages never read are 38% of extraction failures across all five projects [R 3.15]. This pattern targets the same habit applied to media.",
      },
    ],
    evidence: {
      level: "limited",
      lead: "Single graded Opus 4.6 runs [C Multimodal, trap 4; C Faithful extraction, trap 3], plus the eight of eight sibling runs that missed the second worksheet [R 3.15].",
      points: [],
    },
    ideas: [
      "The deciding rule or correction is spoken in a voice note and written nowhere else: \"take 0.5% a year off every mix for fees\".",
      "A printed form or list with handwritten marks that select items.",
      "A recording longer than a minute, where the key line is not at the end.",
    ],
    watch: [
      "A transcript read only in part, or a low fidelity transcription.",
      "A PDF with marks extracted as text and never rendered.",
      "A deliverable that matches the printed list exactly, while the audio changed it.",
    ],
    fair: [
      "Keep audio clear, as MP3 at 64 kbps, and well under 5 to 10 minutes, so a failure is the model's choice, not a timeout [G 1.2.2; G 4].",
      "A figure shown on screen in a video must stay legible at 480p [G 1.2.2].",
      "Do not leave a transcript of the same audio anywhere in the environment. That makes the media unnecessary [Q Prompt, MM Dependence].",
      "The spoken rule must add to the prompt, never contradict it [G 4].",
    ],
    grade: [
      {
        criterion:
          "asset_allocation.html shows the 90/10 mix at 6.1% a year, after the 0.5% fee from the voice note.",
        kind: "use",
      },
    ],
    takeaway:
      "Put a deciding fact where only listening or looking reaches it. That is also what makes the media necessary under the ablation test.",
  },

  /* --------------------------------------------------- C. Reasoning over it */
  {
    id: "c1",
    code: "C1",
    group: "reasoning",
    name: "Trusts the convenient source over the record",
    share: { value: "4%" },
    fit: "Plan against actual, old against new",
    happens:
      "When two sources could answer, Opus takes the one already in hand or neatly labeled: a memory note, a plan, a status flag, a filename, the user's recollection, an older version. It writes that into the deliverable without opening the record that settles it.",
    why: [
      {
        tag: "Documented",
        text: "Proxy trust is the mechanism in 89% of source evaluation failures. Stale memory over the live record is 62% of them; a secondary note over the primary record, 18%; a flag or label over the content, 11% [R 3.8].",
      },
      {
        tag: "Documented",
        text: "These are rare but severe. Most were critical, because the wrong source silently becomes the answer [R 3.8].",
      },
    ],
    evidence: {
      level: "strong",
      lead: "70% of source evaluation failures on Opus 4.8 and 5 repeat across runs [C Overview].",
      points: [
        "A borrower level \"closed\" flag came from an older loan. Opus 4.8 withdrew a live loan anyway, 3 of 4 runs [C Source evaluation, trap 1].",
        "**OpenClaw MM:** a yarn audit graded its yarn frames against a proposed \"pastel summer palette\" from an April message, instead of the two colorways actually shipped in February [R 3.8].",
        "**OpenClaw MM:** asked which video was strongest \"right now\", Opus crowned the leader of a five month old screenshot with no caveat. One of eight runs noticed [C Temporal, trap 4; R 3.10].",
      ],
    },
    guidelines:
      "\"Filename taken as evidence\" [G 4]. The Leg B example names \"reads the plan as the record\" and \"trusts the note over the footage\" [G 6.2.1].",
    ideas: [
      "What was planned against what happened: a calendar of scheduled sessions against photos or notes from the sessions that took place.",
      "An older and a newer version of the same thing among the inputs: two photos of a whiteboard taken an hour apart.",
      "A notes file with a confident figure, while the ledger holds the current one, and a request for what the user \"actually\" spends.",
      "A tracker note with no date, superseded by a later dated record: a Linear issue says the work is not pushed, while a merged GitHub pull request covers it. Opus 4.8 anchored on the note and called the work out of scope, 4 of 6 runs [C Source evaluation, trap 2].",
    ],
    watch: [
      "Values traced to notes or memory while the live record was available.",
      "The older of two versions used.",
      "\"Done\", \"final\" or \"confirmed\" labels accepted without opening what they describe.",
    ],
    fair: [
      "One source must be the record, and the task must say so: the request (\"what I actually spend\", \"the latest\") or a rule in an input decides which wins [G 4; G 1.2.3]. The studies also accept a domain convention [C Source evaluation, fairness]. This page does not rely on one, because a winner the prompt never names is an undecided source conflict [G 4].",
      "Ask for the latest, real or actual value, and point at where it was shared [C Source evaluation, fairness].",
      "Make the newer version recognizably newer from its content: the correction shows on it, a date is written on it, or a dated universe record refers to it. Filename numbers or EXIF alone are a weak cue. A person must be able to read the deciding evidence [G 1.2.2], and a conflict nothing settles is undecided [G 4].",
    ],
    grade: [
      {
        criterion:
          "yarn_audit.md marks frame 1's pink yarn as not matching Midnight or Sage, the colorways confirmed in the 10 February email.",
        kind: "use",
      },
    ],
    takeaway:
      "Give the scenario a natural gap between what was planned and what is true, and make the request about what is true.",
  },
  {
    id: "c2",
    code: "C2",
    group: "reasoning",
    name: "Settles on one story",
    share: { value: "4%" },
    fit: "Sources that disagree, a premise to test",
    happens:
      "When sources disagree, Opus picks a side and writes it as settled, without telling the reader there was a conflict. When the user or a colleague offers a premise, it reads the records through that premise. A big picture story decides items whose own records say otherwise. The opposite also happens: where the evidence settles the call, it hedges, offers a menu or invents a third option.",
    why: [
      {
        tag: "Documented",
        text: "Contradictions collapsed instead of surfaced are 41% of conflict failures, and two figures for the same item never compared, 37%. The mechanisms are evidence overreach (31%), premature closure (27%) and anchoring on the first source (26%) [R 3.14].",
      },
      {
        tag: "Documented",
        text: "In judgment failures, the final call contradicts the evidence 53% of the time; a hedge or an invented third option where a call was due, 26% [R 3.12].",
      },
    ],
    evidence: {
      level: "strong",
      label: "Strong for conflicts, Moderate for judgment",
      lead: "77% of conflict failures and 61% of judgment failures on Opus 4.8 and 5 repeat across runs [C Overview]. Judgment rose from 2% to 7% of root failures between Opus 4.6 and 4.8 in one project, on different task batches [C Overview; R 2].",
      points: [
        "Three systems explained one figure three ways. Opus ruled one wrong or merged all three into \"one cause\", 5 of 6 runs [C Conflict, trap 1].",
        "A sweeping product story retired the Metadata card, whose own description showed English keywords still outstanding, in 3 of 6 runs. Every run retired 18 to 30 of 40 cards, against a golden answer of 5 [C Judgment, trap 2].",
        "A user said \"at least a couple of the conclusions people settled on in Slack do not survive contact with the code\". Opus then overturned a conclusion that did survive, 4 of 6 runs [C Judgment, trap 4].",
      ],
    },
    guidelines: "\"Cross reference collapsed to one side\" is a valid failure [G 4].",
    ideas: [
      "A user premise, in the prompt or a voice note, that the records partly refute: \"I'm pretty sure the contractor billed us twice.\"",
      "A photo and a system record that disagree on a status, such as delivered intact against marked damaged.",
      "Two documented explanations for one figure, with a request to reconcile them.",
    ],
    watch: [
      "\"X is right\" with the other source never mentioned.",
      "A premise reported as \"confirmed\".",
      "A reconciliation with no line for what does not match.",
      "\"Your call\", \"most likely\" or a list of options where the records settle it.",
    ],
    fair: [
      "The prompt must invite the surfacing, as in \"flag anything off\" or \"reconcile X against Y\" [C Conflict, fairness].",
      "If the data cannot settle the winner, grade that the conflict is named, not which side was picked [C Conflict, rubric advice].",
    ],
    grade: [
      {
        criterion:
          "claim_review.md states that IMG_3112.jpg shows the outer box intact, while the carrier record for parcel PCL-20418 marks it damaged.",
        kind: "use",
      },
      { say: "Word a verdict so a hedge fails [C Judgment, rubric advice]:" },
      { criterion: "release_review.md states that the fix will not ship in the 17 February build.", kind: "use" },
    ],
    takeaway:
      "Find the disagreement your universe and media already contain, and ask for a reconciliation the user can act on.",
  },
  {
    id: "c3",
    code: "C3",
    group: "reasoning",
    name: "Applies its own version of the rule",
    share: { value: "5%" },
    fit: "Rules in input files",
    happens:
      "The rule is in the inputs, and Opus reads it. Then it applies something else: its own paraphrase, the everyday meaning of a word the rule redefines, a tempting threshold field in the data, or its default convention.",
    why: [
      {
        tag: "Documented",
        text: "A rule in the provided material not applied is 62% of rule failures; a category, threshold or cohort misapplied, 22% [R 3.6]. The main mechanisms are requirement neglect (33%) and domain knowledge gaps (23%), followed by default override and evidence overreach (9% each) [R 3.6].",
      },
      {
        tag: "Documented",
        text: "Opus compressed a policy's eligible list (\"clients, prospective investors, and outside advisors\") into \"External BD meals only\", then reasoned from its own paraphrase [R 3.6].",
      },
    ],
    evidence: {
      level: "strong",
      lead: "81% of rule failures on Opus 4.8 and 5 repeat across runs. Their share of root failures went from 1% on Opus 4.6 to 5% on Opus 4.8 in one project, on different task batches, so read the rise as indicative [C Overview; R 2].",
      points: [
        "**OpenClaw MM:** an expense audit approved a \"networking\" dinner with a law school classmate as a business meal. That one line pushed the total over budget and triggered an exception file that should never have been written [R 3.6].",
        "**OpenClaw MM:** a separate one paragraph note said a money figure that disagrees with the bank is replaced by the bank. Opus never applied it to a growth claim [R 3.7].",
        "A decision lived in an email reply, while the item's own record showed no approver. Opus 4.8 read the reply, reasoned from the record's arithmetic instead and posted nothing, 5 of 6 runs [C Domain rules, trap 1].",
        // Added from the studies: the tempting threshold field the card's own
        // "What happens" names had no incident behind it [C Domain rules, trap 2].
        "A close checklist required every reconciliation approved before the period locked, and each record carried its own variance threshold. Opus 4.8 used the threshold as the test and called an unapproved reconciliation with a $2.31 variance not blocking, 6 of 6 runs [C Domain rules, trap 2].",
        // Added from the studies: [C Domain rules, trap 5].
        "Told \"if the extension was caused by our error we absorb it and refund the borrower\", Opus 4.8 issued the refund and never booked the cost it was meant to absorb, 3 of 6 runs [C Domain rules, trap 5].",
      ],
    },
    guidelines:
      "Keep thresholds, rules and formats in the input files, where the agent must find them, unless the assigned scenario already states them [G 1.2.3]. \"Logic flow misapplied\" is a valid failure [G 4].",
    ideas: [
      "A rules document, or a photo of posted rules, where a term means something specific and narrower than usual.",
      "An eligibility list with a near match nearby: a friend described as \"networking\".",
      "A rule split across modalities: a rate in a chart, a fee in a voice note, the compounding in a text file.",
      // Added from the studies: [C Domain rules, trap 2], recast for an
      // assigned universe, where the field is found rather than seeded.
      "A field on a universe record that looks like the test, such as a threshold, a tolerance or a priority, found during exploration. Write the real rule into an input, so that one item passes the field and fails the rule.",
      // Added from the studies: [C Domain rules, trap 5].
      "A rule in the user's own words that implies two treatments, where the second is the easy one to drop: \"if it was our mistake, we absorb the cost and refund them\" means a refund and an absorbed cost, both in the deliverable.",
    ],
    watch: [
      "The agent's own summary of the rule is shorter than the rule.",
      "A classification with no test from the rule beside it.",
      "A default convention, such as yearly compounding or rounding, where the input set another.",
    ],
    fair: [
      "The rule must be retrievable and cued by the request [C Domain rules, fairness].",
      "The tempting alternative must be wrong for the stated question, not a defensible reading [C Domain rules, fairness].",
      "The rule must not contradict the prompt [G 4].",
    ],
    grade: [
      {
        criterion: "expense_audit.md rejects line 3, the Win Son dinner with Yuki Tanaka, as a personal meal.",
        kind: "use",
      },
      {
        say: "Applying a rule from the inputs, where the model can be wrong at the classification, is Task Completion [G 5.4].",
      },
    ],
    takeaway:
      "Put the rule in the inputs and make its exact wording matter. On newer versions, this is a growing share of what still breaks.",
  },
  {
    id: "c4",
    code: "C4",
    group: "reasoning",
    name: "Has every number, never computes the one that decides",
    share: { value: "2%" },
    fit: "Claims to check, thresholds in inputs",
    happens:
      "Opus holds every number it needs and never runs the last division, sum or comparison. Or it computes over the wrong set: page one, one status, one account. Then it labels the figure with what it meant to compute.",
    why: [
      {
        tag: "Documented",
        text: "Quantitative failures split evenly between a wrong input or basis (24%) and a miscount of data already in hand (24%). Next come a figure that could be derived and never was (17%), a component left out (16%), and the wrong set or window (14%) [R 3.7].",
      },
      {
        tag: "Documented",
        text: "Opus often tallies long tool outputs by hand in its reasoning instead of computing them [R 3.7].",
      },
      {
        tag: "Documented",
        text: "A matching part lends credibility to the claim beside it. A $387 deposit matched an email's $387, so the email's \"12% growth\" was accepted too [R 3.7, triggers].",
      },
      {
        tag: "In the guidelines",
        text: "The model sums a few values it already holds correctly, so \"the difficulty is always in sourcing the numbers, never in the arithmetic on them\" [G 8.2].",
      },
      {
        tag: "Likely",
        text: "A short sum is safe. Long hand tallies, the choice of numbers and set, and a deciding figure nobody computes are where it breaks.",
      },
    ],
    evidence: {
      level: "strong",
      lead: "79% of quantitative failures on Opus 4.8 and 5 repeat across runs. Their share rose from 2% to 4% between Opus 4.6 and 4.8 in one project, on different task batches [C Overview; R 2].",
      points: [
        "**OpenClaw MM:** checking a \"12% growth\" claim, Opus pulled deposits of $275 and $387, never divided them (+40.7%), and marked the claim fine [R 3.7].",
        "Every loan record held the amount, the rate, the income and the lender's cap. Opus 4.8 computed the ratio on none of 15 files, 4 of 4 runs [C Quantitative reasoning, trap 1].",
        // Added from the studies: the component left out, 16% of these
        // failures, had no incident behind it [C Quantitative reasoning, trap 2].
        "Two booked liabilities on one account sat in different systems. Opus 4.6 reported each inside its own section and never added them to the account total of about $140,000 against $9,010 invoiced, 4 of 6 runs [C Quantitative reasoning, trap 2].",
      ],
    },
    ideas: [
      "A claim in an input whose truth takes one division over universe data: a photographed flyer, a chart on a slide, a price tag on a shelf. Keep screenshots of text a minority of your images, and never screenshot an email the universe already holds [G Hard Client Requirements; G 1.2.2].",
      "A decision that turns on a ratio or threshold the user set in an input, such as a budget in a voice note or a cap in a document [G 1.2.3].",
      "A long list of records, where a count drives the decision.",
      // Added from the studies: [C Quantitative reasoning, trap 2].
      "A total the request needs whose parts sit in different places, such as a charge in the universe and a cost on a receipt photo, so it exists only if the model adds them up.",
    ],
    watch: [
      "\"Need to verify X\" where X could have been computed.",
      "Totals added up in prose, not in code.",
      "Counts that disagree with the agent's own tables.",
    ],
    fair: [
      "Every convention the computation needs must be in the data, or standard for the domain [C Quantitative reasoning, fairness].",
      "The population must be unambiguous in the request (see A3).",
    ],
    grade: [
      {
        criterion:
          "audit.md marks the '12% growth' claim as needing correction, with revenue up 40.7% from $275 to $387.",
        kind: "use",
      },
    ],
    takeaway:
      "Make the outcome hinge on a number nobody hands the model. It breaks on sourcing and scoping the number, and on long hand tallies, rarely on a short sum.",
  },
  {
    id: "c5",
    code: "C5",
    group: "reasoning",
    name: "Gets both halves, never makes the join",
    share: { value: "2%" },
    fit: "Matching media to records",
    happens:
      "Opus retrieves every piece and still misses the link that is the deliverable. It misses two charges that share a key, binds a fact to a look alike entity, or attributes money to the account it landed in, not the booking it came from.",
    why: [
      {
        tag: "Documented",
        text: "Entities conflated or facts attached to the wrong entity are 51% of synthesis failures; retrieved facts never connected, 44% [R 3.11].",
      },
      {
        tag: "Documented",
        text: "Dropped facts and unconnected facts fail together 1.43 times as often as chance [R 4].",
      },
    ],
    evidence: {
      level: "moderate",
      lead: "68% of synthesis failures on Opus 4.8 and 5 repeat across runs. But the capability's share fell from 5% to 3% between Opus 4.6 and 4.8, and it is 2% of OpenClaw MM failed criteria [C Overview; R 2].",
      points: [
        "Two of eight repeated loans were true double charges. In 4 of 6 runs, Opus 4.8 grouped the charges by eye and reported \"exactly one\". Only the run that scripted the grouping found both [C Synthesis, trap 1].",
        "Opus 4.8 listed project tickets with their due dates, assignees and states, matched them by title only, and never reported that every open ticket was overdue, 6 of 6 runs. Every fact was in its first list result [C Synthesis, trap 4].",
        "**OpenClaw MM:** the two shirt designs in B2 are also a join failure [R 3.11].",
        // Added from the studies: a join that only two tables make,
        // [C Conflict, trap 2].
        "A vendor list marked one vendor inactive, while its 48 monthly bills kept arriving. Opus 4.8 pulled both tables, even printed that vendor's bill total, and cleared it, because its own checklist never joined the two, 6 of 6 runs [C Conflict, trap 2].",
      ],
    },
    ideas: [
      "Media that must be matched to universe records: a receipt photo to its transaction, a label's serial number to its CRM record [G 1.2.2].",
      "Two contacts with similar names, where only one fits the facts.",
      "A shared account that receives money for several things, while the bookings say which is which.",
      // Added from the studies: [C Conflict, trap 2], found in the universe
      // during exploration rather than seeded.
      "A status in one record that the activity in another contradicts, found during exploration, such as a vendor marked inactive that is still billing. Ask for anything that looks off, so the join is the finding.",
    ],
    watch: ["The right facts listed in separate sections and never combined.", "The first look alike chosen."],
    fair: [
      "The linking key must exist and be reachable [C Synthesis, fairness].",
      "Decoys must differ by a field value, not by judgment [C Synthesis, fairness].",
    ],
    grade: [
      {
        criterion: "The email rundown states that a $425.00 refund was issued on loan LN-2024-00095 (Romano).",
        kind: "use",
      },
    ],
    takeaway: "Make the deliverable the join itself, through a key the media supplies.",
  },
  {
    id: "c6",
    code: "C6",
    group: "reasoning",
    name: "Reads the dates in the wrong frame",
    share: { value: "1%" },
    fit: "Dated snapshots, window edges",
    happens:
      "Opus builds a date window from its own idea of the period, a tool default or the system clock. Then it labels the result by the window it meant, not by the dates on the records it got back. One item on a boundary day, an evening event stored under the next day's UTC date, or a months old snapshot read as \"now\" shifts the answer.",
    why: [
      {
        tag: "Documented",
        text: "A boundary, time zone or cutoff off by one is 46% of date failures; a date's meaning or currency misjudged, 31%; the wrong period or \"today\" anchor, 21% [R 3.10].",
      },
      {
        tag: "Documented",
        text: "Date failures cascade more than any other kind. 75% of date related failed criteria follow from one wrong window [R 3.10].",
      },
      {
        tag: "Documented",
        text: "Opus filtered by month before converting from UTC to local time, and built a \"Q1\" filter before reading the rules file that defined it [R 3.10, triggers].",
      },
    ],
    evidence: {
      level: "moderate",
      lead: "64% of date failures on Opus 4.8 and 5 repeat across runs [C Overview]. But every incident below is an Opus 4.6 run, mostly single graded runs [C Temporal]. Date failures are 7% of OpenClaw Main failed criteria and 1% of OpenClaw MM [R 2].",
      points: [
        "**OpenClaw MM:** the only ranking in the inputs was a screenshot dated Feb 12, the task was dated Jul 8, and the user asked which video was strongest \"right now\". Opus crowned the screenshot's leader. One of eight runs noticed [C Temporal, trap 4; R 3.10].",
        "An exclusive end bound dropped the March 31 run. The report said 41 runs and 244.88 km against a 250 km goal, which the user had beaten with 42 runs and 251.92 km [C Temporal, trap 1].",
        // Added from the studies: dates said relative to a day, which a voice
        // note or a message carries naturally [C Temporal, trap 5].
        "A Tuesday briefing called April 29, 2026 a Friday when it was a Wednesday, and resolved an April 17 email's \"this Sunday\" to April 26 instead of April 19, with a date command available and unused [C Temporal, trap 5].",
      ],
    },
    guidelines: "The Leg B example lists \"right sources, wrong window\" [G 6.2.1].",
    ideas: [
      "A dated snapshot among the inputs (a screenshot, a printout, a photo of a board), and a question about the current state that the universe answers.",
      "A window stated in the prompt with one real item on its last day, or an evening event that a time zone pushes across a month boundary, with the time zone discoverable in the universe.",
      // Added from the studies: [C Temporal, trap 5].
      "A relative date in a voice note or a message (\"this Sunday\", \"the day after the workshop\") that the deliverable has to turn into a calendar date, with the day it was said on record.",
    ],
    watch: [
      "A window label that does not match the dates on the records returned.",
      "A count one short or one over at the edge of the window.",
      "A snapshot's date written in the agent's own notes, while the snapshot is still treated as current.",
    ],
    fair: [
      "Universe dates are fixed, so write the real window into the prompt: \"the week of 12 May\", not \"next Tuesday\" [G 1.2.1]. Never build on the run's clock.",
      "The time zone and the window's edges must be discoverable [C Temporal, fairness].",
    ],
    grade: [
      {
        criterion:
          "thumbnail_audit.md states that the YouTube Studio screenshot shows first month figures from Feb 12, 2026, not current totals.",
        kind: "use",
      },
    ],
    takeaway:
      "State the window, then put one real item on its edge. The model labels the window it meant, not the one it got.",
  },

  /* ----------------------------------------------------------- D. Delivering */
  {
    id: "d1",
    code: "D1",
    group: "delivering",
    name: "Fills the gap with something plausible",
    share: { value: "7%", with: "A4 and D1" },
    fit: "Slots the records leave empty",
    happens:
      "When a value is missing or a lookup failed, Opus writes a plausible one. It states inferences as facts, writes pending items as confirmed, and reports checks it never ran.",
    why: [
      {
        tag: "Documented",
        text: "Fabricated specifics are 30% of calibration failures; inferences presented as fact, 20%; unverified items written as confirmed, 9%; completion claimed without a trace behind it, 9% [R 3.4].",
      },
      {
        tag: "Documented",
        text: "Gap filling is the mechanism in 35% of these, and evidence overreach in 25% [R 3.4].",
      },
      {
        tag: "Likely",
        text: "A format with a slot for every item pushes Opus to fill every slot [C Calibration].",
      },
    ],
    evidence: {
      level: "moderate",
      lead: "Only 47% of calibration failures on Opus 4.8 and 5 repeat across runs, the lowest of any capability [C Overview]. Do not let the 30% bar rest on this pattern alone.",
      points: [
        "**OpenClaw MM:** all four web searches failed. The next turn opened with \"Now I have everything I need\", and the document carried district statistics that exist in no source [R 3.4].",
        "A register filled an audience cell with a market the records never stated, 5 of 6 runs on Opus 4.8 [C Calibration, trap 1].",
        "Asked what it could not stand up, Opus 4.8 listed two unreadable files and left out the unopened agreement its main conclusion rested on, 4 of 6 runs [C Calibration, trap 5].",
        "On Opus 4.6, a build log left out the calendar and contacts searches that returned nothing, 10 of 10 runs [C Long horizon, trap 4].",
      ],
    },
    guidelines:
      "\"Fabricated precision\" is a valid failure: measurements to the millimeter with no ruler in frame [G 4].",
    ideas: [
      "A deliverable with a slot per item, where the honest value for some items is \"not recorded\", and a user who says to state only what can be backed up.",
      "A user who asks what could not be confirmed: \"tell me anything you couldn't stand up\".",
      "A photo that invites a measurement but holds no scale.",
    ],
    watch: [
      "Specific numbers with no source in the trajectory.",
      "\"Verified\" or \"confirmed\" with no matching tool call.",
      "\"Likely\" in the agent's notes that disappears in the deliverable.",
      "A caveat in the final message while the artifact itself claims every figure is verified.",
    ],
    fair: [
      "State the evidence standard, as in \"only what we can back up\", \"where that's recorded\" or \"leave blank if you can't verify\" [C Calibration, fairness].",
      "The true value must be reachable or truly absent. If it is absent, \"not established\" is the right answer, and the rubric must accept it [C Calibration, fairness].",
    ],
    grade: [
      { say: "Grade the honest value as a positive:" },
      {
        criterion: "report.md reports Carmel Clay per pupil spending as $11,200, the figure in Airtable.",
        kind: "use",
      },
      { say: "Where the value is truly absent, write the positive so silence cannot pass:" },
      {
        criterion: "register.csv states that no target market is recorded for the Spanish labeled cards.",
        kind: "use",
      },
      {
        say: "Either one already fails an invented figure, so a separate negative is rarely needed [G 5.3]. Grade the artifact, not the chat [C Calibration, rubric advice].",
      },
    ],
    takeaway: "Leave honest gaps in the scenario. Agents tend to fill them.",
  },
  {
    id: "d2",
    code: "D2",
    group: "delivering",
    name: "Finds the fact, then loses it in the deliverable",
    share: { value: "1%" },
    fit: "Exact figures on the surface the reader sees",
    happens:
      "The right fact is in the trajectory and not in the artifact. Specifics blur into summaries (\"two borrowers\", \"~$11.8K\"), facts drop out, findings stay in a side file or an earlier message, or the final message only points to an attachment.",
    why: [
      {
        tag: "Documented",
        text: "Compression loss is the mechanism in 79% of these failures. Specific figures or IDs generalized are 42%; a retrieved fact absent from the deliverable, 40%; a finding on the wrong surface, 16% [R 3.3].",
      },
      {
        tag: "Documented",
        text: "A summary asked for in the last sentence of a long prompt was executed 37 to 45 tool calls later, and came back as a one line sign off [R 3.5, triggers].",
      },
    ],
    evidence: {
      level: "moderate",
      lead: "53% of these failures on Opus 4.8 and 5 repeat across runs, and the share fell from 20% to 15% between Opus 4.6 and 4.8 [C Overview; R 2]. It is 1% of OpenClaw MM failed criteria [R 2]. On Opus 5 it still repeats:",
      points: [
        "The email to the recipient carried only a combined total, while the PDF held the figures she needed, 3 of 4 runs [C Output fidelity, trap 1].",
        "A credit was traced to two accounts, and no deliverable named both account numbers, 4 of 4 runs [C Output fidelity, trap 3].",
      ],
    },
    guidelines:
      "Green Shell grades every decision where it lands: the value in the artifact, the state change or the final message [G 5]. The Leg B example lists \"names the media instead of showing it\" [G 6.2.1].",
    ideas: [
      "A deliverable that must carry an identifier or an exact figure for each item. Ask for the content, not the layout, so the subjective block keeps room [G 1.2.3].",
      "A message in your assigned execution target that the prompt asks to carry a key figure itself.",
    ],
    watch: [
      "Figures rounded or softened between the trajectory and the artifact.",
      "\"See attached\" where the message itself was asked to carry the finding.",
      "Identifiers replaced by friendly names.",
    ],
    fair: [
      "Require a value on a surface only when the prompt asks for it there [G Hard Client Requirements; G 1.3]. The studies also accept a reader who plainly needs it there [C Output fidelity, fairness]. Green Shell does not: a requirement the model never saw is an invalid failure [G 4].",
    ],
    grade: [
      {
        say: "Only when the prompt asks the message to carry the figure, for example \"tell Carlton in the message how far ahead the 90/10 mix ends\":",
      },
      {
        criterion: "The Slack message to Carlton states that the 90/10 mix ends $45,156 ahead of the 30/70 mix.",
        kind: "use",
      },
      {
        say: "The {{/reference#intro|intro onboarding}}'s prompt does not ask for this, so there it would grade a requirement the model never saw [G 4].",
      },
    ],
    takeaway: "Ask for the specifics on the surface the reader sees. Agents tend to compress them away.",
  },
  {
    id: "d3",
    code: "D3",
    group: "delivering",
    name: "Ends in the wrong final state",
    share: { value: "3%" },
    fit: "Execution targets with more than one action",
    happens:
      "The run ends short of the execution target or beyond it. Short: a required write or send never happens, Opus recommends or asks instead of acting, it stops one step before the final state, or it acts on part of the set. Beyond: it sends or posts somewhere the user did not ask for, or acts when a condition said not to.",
    why: [
      {
        tag: "Documented",
        text: "A required write never performed is 34% of task completion failures, and no deliverable at all is 27%. Recommending, asking or delegating instead of acting is 25%. Acting on part of the set (7%), on the wrong target (5%) or although a condition failed (3%) make up the rest [R 3.5].",
      },
      {
        tag: "Documented",
        text: "The mechanisms are running out of steam (42%) and over deference (30%) [R 3.5].",
      },
      {
        tag: "Documented",
        text: "Ending with a question or an offer is an OpenClaw habit: 16% of OpenClaw Main and 12% of OpenClaw MM tasks with failures, against 4% in Enterprise Atlas Advanced [R 4].",
      },
    ],
    evidence: {
      level: "moderate",
      lead: "58% of task completion failures on Opus 4.8 and 5 repeat across runs, and the share rose from 14% to 18% between Opus 4.6 and 4.8 [C Overview; R 2]. The single traps below are among the most reliable in the data, all on Opus 4.8:",
      points: [
        "Told to take a batch of moves \"end to end\", Opus escalated the routing to a manager instead of booking the only qualified carrier, 6 of 6 runs [C Task completion, trap 1].",
        "It stopped at \"approved\" (one run at \"submitted\") and never took two reconciliations to \"certified\", 6 of 6 runs. Told to correct a tracker, it added a comment and left the stale description and priority untouched, 6 of 6 runs [C Task completion, trap 2].",
        "A vendor named only in the item catalog and a vendor capability sheet, never in the emails, was never emailed, 6 of 6 runs [C Task completion, trap 4].",
        "Asked in chat to \"send me\" a link, it emailed the user from their own mailbox, 5 of 6 runs [C Instruction adherence, trap 4].",
        // Added from the studies: the recipient the data implies, when the
        // name on the record is not the person who acts [C Judgment, trap 1].
        "Asked for an owner on each blocker, it named the preparer printed on three entries stuck at approval, not the manager who had to route them, 5 of 5 runs [C Judgment, trap 1].",
      ],
    },
    guidelines:
      "The model fired a question with four invented figures to choose from, rather than search for the real one, and shipped an email with \"(needs shutdown estimate amount to compute)\" in the body [G 8.2]. \"Conditional handled wrong\" is a valid failure [G 4].",
    ideas: [
      "Stay inside your **assigned** execution target and access [G 1.1.2].",
      // The closing clause is added from the studies [C Judgment, trap 1].
      "Read the assigned target for a second step it already implies: the file attached to the message, an event at a time only the universe settles, a recipient found in contacts rather than named in the prompt, or the person who acts next on an item rather than the name printed on its record.",
      "If the assigned target carries a limit, such as nothing sent, state it in the prompt in the user's words. With a mail tool connected, that limit is the overshoot test.",
      "If the target posts to a channel the user limits by audience (\"nothing reaches the investors\"), check the channel's members during exploration. Opus 4.8 retrieved a member list that included investor accounts, posted anyway and said nothing had reached the investor, 6 of 6 runs [C Instruction adherence, trap 3].",
      "Use a condition only when the assigned target already allows both outcomes.",
    ],
    watch: [
      "A run that ends with \"Want me to…?\" or another offer.",
      "Writes listed in the final message that are not in the state changes.",
      "A record left in an intermediate state, or a comment where a status change was asked for.",
      "A placeholder in a delivered artifact. Grade the value that should stand there, never the artifact's presence [G 8.2].",
    ],
    fair: [
      "Single turn means no confirmation is possible, so the prompt must give the authority to act. A caveat must not forbid the action you grade [G 1.1.2; C Task completion, fairness].",
      "State the execution target in the prompt, or it cannot be graded [G 1.1.2]. With read access only, the task must not depend on any write [G 1.1.2].",
      "Never add outbound actions or limits that your parameters do not include. That is drift [G Hard Client Requirements].",
    ],
    grade: [
      { say: "Split the delivery into two signals, both on the State Change target [G 5.4]:" },
      { criterion: "One Slack DM to Carlton carries asset_allocation.html as an attachment.", kind: "use" },
      {
        criterion: "The Slack DM to Carlton asks for his thoughts before the presentation is finalized.",
        kind: "use",
      },
    ],
    takeaway:
      "State your assigned execution target exactly. Where it holds more than one action, or a recipient the data implies, the last step is where the model quits early or overshoots.",
  },
  {
    id: "d4",
    code: "D4",
    group: "delivering",
    name: "Never checks the finished artifact",
    share: { value: "2%" },
    fit: "Edited media, summaries built from details",
    happens:
      "Opus writes the deliverable in one pass and rarely reopens it. Its own table says one thing and its summary another. An edit its own checks said had failed is reported as done.",
    why: [
      {
        tag: "Documented",
        text: "The agent's own evidence contradicting its conclusion is 42% of verification failures; a write never read back before claiming success, 18% [R 3.16].",
      },
      {
        tag: "Documented",
        text: "70% of OpenClaw MM tasks with failures showed no sign that Opus verified its outputs, the highest of any project [R 4].",
      },
      {
        tag: "Documented",
        text: "Self checks without an outside signal are weak. The fix is rereading the artifact and requerying the system, not rethinking [R 3.16].",
      },
    ],
    evidence: {
      level: "moderate",
      lead: "69% of verification failures on Opus 4.8 and 5 repeat across runs [C Overview]. Verification is 2% of root failures [R 2], but the habit sits behind failures in other patterns.",
      points: [
        "**OpenClaw MM:** three image checks reported remnants of an old logo under the new one. Opus deleted the previews and reported the logo replaced [R 3.16].",
        "Opus listed 19 November rides in its own table, reported 13 in the summary, and explained the gap with a deduplication step it never ran [R 3.16].",
      ],
    },
    ideas: [
      "An edit to a provided image or document, where a careless first pass leaves visible traces: a logo swap, a redaction, a crop.",
      "A deliverable with a detail table and a summary built from it, where the counts are long enough to tally by hand.",
    ],
    watch: [
      "A summary figure that disagrees with the agent's own detail rows.",
      "A final check that failed, followed by \"done\".",
      "Previews or intermediate files deleted right after the last edit.",
    ],
    fair: [
      "The defect must be visible in the delivered render, at its delivered size.",
      "Grade the artifact, not the act of checking: \"reviewed its output\" is process [G 5.1].",
    ],
    grade: [{ criterion: "ride_report.md reports 19 rides for November.", kind: "use" }],
    takeaway:
      "Ask for an artifact whose summary must agree with its own details, or an edit whose result is visible. The model rarely looks again.",
  },
];

/* --------------------------------------------------------- 3. plan the task */

export interface FaPlanStep {
  n: number;
  /** The anchor, and the in-pane jump target. */
  id: string;
  title: string;
  /** Short label for the jump strip. */
  short: string;
  body?: string[];
  points?: string[];
}

export const faPlanning = {
  lead: "The guidelines expect at least two hours of planning, and a GTFA that shows \"where and why the model is expected to fail\" before anything runs [G 1].",
  steps: [
    {
      n: 1,
      id: "plan-parameters",
      short: "Parameters",
      title: "Start from your parameters",
      body: [
        "Use them to shortlist patterns, then keep only those your exploration supports. A pattern that pulls the task outside the parameters is drift [G 1.1].",
      ],
    },
    {
      n: 2,
      id: "plan-explore",
      short: "Explore",
      title: "Explore the universe for failure structure",
      body: [
        "Ask the in universe agent one question at a time, and keep the answers in your planning notes [G 1.2.1]:",
      ],
    },
    {
      n: 3,
      id: "plan-evidence",
      short: "Evidence",
      title: "Place the evidence across modalities",
      points: [
        "Use at least three multimodal inputs and every assigned input modality, each carrying part of the answer [G 1.2.2].",
        "Most images should need real visual reading: photos, diagrams, charts, maps, real objects. Screenshots of text stay a minority [G Hard Client Requirements].",
        "Give each input a role: signal, distractor or noise [G 1.2.2].",
        "Put each fact where it naturally lives: a figure in a photo, a rule in a voice note, a threshold in a document.",
        "Let at least one media value lead to a record the universe holds. The guidelines expect strong reconciliation in almost every task [G 1.2.2].",
      ],
    },
    {
      n: 4,
      id: "plan-gtfa",
      short: "GTFA",
      title: "Write the failure points into the GTFA",
      body: [
        "Give each failure point a card, and write its Leg B hint now. Hints stay at intent level and never carry the answer [G 6.2]. A rule of thumb, not a guideline: if you cannot write the hint that way, the point is hidden too deep, so rework it before you run.",
      ],
    },
    {
      n: 5,
      id: "plan-prompt",
      short: "Prompt",
      title: "Write the prompt as the user would",
      points: [
        "Ask for the outcome, and name every output file [G 1.2.3].",
        "Point at the inputs the way the user would, without saying what is in them.",
        "State your assigned execution target, with any limit it carries [G 1.1.2].",
        "Keep thresholds, rules and formats in the inputs, unless the assigned scenario already states them [G 1.2.3].",
        "Never reveal the Verification condition's answers [G 1.1.2].",
        "Single turn already removes the chance to clarify. \"Don't ask me anything\" or \"I'm in a hurry\" adds little and rates as a basic constraint [Q Prompt, Constraints].",
      ],
    },
    {
      n: 6,
      id: "plan-budget",
      short: "Budget",
      title: "Check the failure budget",
      points: [
        "A Model A score above 70% fails QA as a trivial task [Q Rubric Criteria, All Criteria Scoring]. Genuine failures must reach at least 30% of the final rubric score, and 50% is preferred [G Hard Client Requirements].",
        "As a rough check, add up the weight your planned failure points would fail, and compare it with the weight of the whole objective block.",
        "Most failed criteria fired in half the runs or fewer where the same task ran six times [R 2], and Leg A is graded on one run. A rule of thumb, not a measurement: plan well above the line, so the bar still holds if only about half of your points fire.",
        "\"Repeats in more than one run\" does not mean \"fails every time\". A criterion that failed 2 of 6 runs counts as repeating [C Overview].",
        "Spread the points over at least three stages and two modalities. Do not let the bar rest on D1 or D2, the least repeatable patterns [C Overview].",
        "A cascade counts once for each criterion it really fails, never more (see the {{worked-example|worked example}}).",
      ],
    },
    {
      n: 7,
      id: "plan-run",
      short: "Run",
      title: "Run the plan as written, and do not patch it",
      body: [
        "The scenario you planned is the one you grade [G 1]. If the Task Runner holds more than one conversation, star the one you rate as Preferred [G 3]. A plan that needs a lucky run is a plan to redo ({{keeps-passing|When Model A keeps passing}}), not to rerun.",
      ],
    },
  ] as FaPlanStep[],
  /** Step 1: "If your parameters include", and the patterns to try first. */
  shortlist: [
    { has: "Audio or video input", patterns: ["b3", "b1"] },
    { has: "Photos, charts, diagrams or maps", patterns: ["b1", "b2"] },
    {
      has: "A service whose records the media can key into (Gmail, Calendar, Contacts, Sheets, Drive)",
      patterns: ["a1", "a4", "c5"],
    },
    { has: "Chat or mail with threads and sent mail", patterns: ["a2", "c1"] },
    { has: "A rule, policy or threshold the scenario implies", patterns: ["c3", "c4"] },
    { has: "A dated snapshot or a time window", patterns: ["c6", "c1"] },
    { has: "An execution target with a send, a post or an event", patterns: ["d3", "d2"] },
    { has: "A deliverable with one slot per item (CSV, dashboard, catalog)", patterns: ["a3", "d1"] },
    { has: "An edited image, or a summary built from details", patterns: ["d4"] },
  ],
  /** Step 2: the questions to put to the in universe agent. */
  explore: [
    {
      q: "List every connected service and how many records each holds.",
      note: "Confirms the load.",
      patterns: ["a1"],
    },
    {
      q: "Which Slack threads have a reply, dated after the parent, that changes a decision, a date or an amount?",
      patterns: ["a2", "c1"],
    },
    { q: "Which emails exist only in Sent?", patterns: ["a2"] },
    {
      q: "Which searches or lists return more rows than one page? Give the total and the page size.",
      patterns: ["a2", "a3"],
    },
    {
      q: "For this topic, which records have a status field that disagrees with a later message or comment?",
      patterns: ["c1", "c2"],
    },
    {
      q: "Which records carry an identifier (an order, serial, reference or confirmation number) that could appear on a label, a receipt or a screen?",
      patterns: ["a4", "c5"],
    },
    { q: "Which contacts or accounts have similar names?", patterns: ["c5"] },
    { q: "Which records fall on the first or last day of the range I plan to use?", patterns: ["c6"] },
  ] as { q: string; note?: string; patterns: string[] }[],
  exploreAfter:
    "Then ask the agent for the SQL behind each answer and run it yourself, so the GTFA cites the record, not the agent's summary [G 1.2.1].",
  /** Step 4: one failure point, as the GTFA card writes it. */
  template: {
    title: "Monthly deposit",
    fields: [
      { label: "Pattern", value: "B1, C1" },
      { label: "Truth and where it lives", value: "$400, IMG_4410.jpg (the later board, $300 crossed out)" },
      { label: "Predictable wrong value", value: "$300, from IMG_4409.jpg, the earlier board" },
      { label: "Proof it is reachable", value: "IMG_4410.jpg opened at upload size, $400 legible" },
      { label: "Criterion and weight", value: "the criterion that grades it, and its weight" },
      { label: "Verification condition item", value: "the item it covers" },
      {
        label: "Leg B hint if the golden misses it",
        value: "\"The presentation still uses a monthly amount we moved away from on the board.\"",
      },
    ],
  },
  /** Step 6, the three thresholds the budget is checked against. */
  budget: {
    trivial: "Model A scores above 70%, so the task fails QA as trivial",
    floor: "The minimum the guidelines accept",
    preferred: "What the guidelines prefer",
  },
  combos: {
    id: "combinations",
    title: "Combinations that fail together",
    lead: "Some patterns fail in the same task more often than chance [R 4; C Stacking traps]:",
    more: [
      {
        title: "A rule that changes a number",
        patterns: ["c3", "c4"],
        lift: "1.53",
        body: "A misapplied rule reappears as a wrong total.",
      },
      {
        title: "Several facts that must all reach the deliverable and connect",
        patterns: ["d2", "c5"],
        lift: "1.43",
      },
      {
        title: "A long task with deliverable instructions stated early",
        lift: "1.29",
        body: "This pairs instruction adherence with long horizon memory, both set aside in {{not-to-build|What not to build around}}, so keep early instructions few and natural.",
      },
    ] as { title: string; patterns?: string[]; lift: string; body?: string }[],
    less: [
      { title: "Unopened sources with source evaluation", lift: "0.68" },
      { title: "Unopened sources with date errors", lift: "0.63" },
    ],
    lessBody:
      "Some fail together **less** often than chance [R 4]. When the record is never opened, there is nothing left to misjudge or misdate. A C1 or C6 point built on a record that A1 or A2 hides will not fire separately, so count it once.",
  },
  worked: {
    id: "worked-example",
    title: "Worked example: one task, six failure points",
    lead: "The {{/reference#intro|intro onboarding}}'s running example [I 05 to 08] is `asset_allocation.html`, an asset allocation presentation built in the `openclaw_mm_dana_reyes_advisor` universe. It uses six input files (four signals, one distractor, one noise file), the calendar and Slack. Read through these patterns, its GTFA already holds six failure points, each with its own source. The wrong values are predictions, not observed runs.",
    rows: [
      {
        point: "Monthly deposit",
        patterns: ["b1", "c1"],
        truth: "`IMG_4410.jpg`: $300 crossed out for $400",
        gtfa: "$400 a month",
        wrong: "$300 from `IMG_4409.jpg`, the older board: 90/10 ends at $140,266",
      },
      {
        point: "Fee",
        patterns: ["b3"],
        truth: "`voice_note_0512.mp3` only",
        gtfa: "0.5% a year off every mix",
        wrong: "No fee, 90/10 at 6.6%: $198,539",
      },
      {
        point: "Return rates",
        patterns: ["b1"],
        truth: "The chart in `IMG_4398.jpg`",
        gtfa: "Stocks 7%, bonds 3%",
        wrong: "Series swapped, 90/10 nets 2.9%: $129,896",
      },
      {
        point: "Compounding",
        patterns: ["c3"],
        truth: "`what_to_cover.txt`",
        gtfa: "Monthly: 90/10 ends at $187,022",
        wrong: "Yearly by default: $178,481",
      },
      {
        point: "Review slot",
        patterns: ["a1"],
        truth: "Calendar: the team meeting ends at 10:30",
        gtfa: "Mon 18 May, 10:30 to 10:45",
        wrong: "A guessed time, or no event booked",
      },
      {
        point: "Delivery",
        patterns: ["d3"],
        truth: "The prompt's execution target",
        gtfa: "One Slack DM to Carlton with the file, asking for his thoughts",
        wrong: "An email, a channel post, or no file attached",
      },
    ],
    notes: [
      {
        title: "How the first four count.",
        body: "They converge on one figure. The intro onboarding grades it as one +5 criterion: the 90/10 mix reaching $187,022 at age 45, from $400 a month at 6.1% after the fee [I 07]. A miss on any of the four fails that criterion, and two misses still fail it once. They count as separate failures only where the presentation states each assumption on its own, graded where it shows. Then weight the final figure for the compounding step alone, so it does not restate the others [G 5.2]. Either way, count the budget on what stays independent: the case study figure, the review slot and the delivery.",
      },
      {
        title: "The review slot needs a pinned date.",
        body: "The prompt says only \"on Monday\". The GTFA has to show why Mon 18 May is the only Monday that fits. A run that books another Monday counts only if that reading is not defensible [Q Prompt, Valid Model Failure]. In your own prompts, write the date in [G 1.2.1].",
      },
      {
        title: "To go further.",
        body: "Here the universe settles only the meeting time, and the media settles every figure. In your own task, let at least one media value lead to a record the universe holds [G 1.2.2].",
      },
    ],
  },
};

/* --------------------------------------------------------- 4. reading leg a */

export const faLegA = {
  lead: "Download the trajectory and every artifact before you rate anything [G 3]. Then look in four places.",
  places: [
    {
      id: "look-calls",
      title: "In the tool calls",
      items: [
        { text: "Assigned services the GTFA needs that were never called.", patterns: ["a1"] },
        { text: "One search per system, and no second query after an empty result.", patterns: ["a2", "a4"] },
        { text: "Results with a total larger than what was read, and no next page.", patterns: ["a2", "a3"] },
        { text: "Tool errors that are never mentioned again.", patterns: ["a4"] },
        { text: "One image call where an exact count or a comparison was needed.", patterns: ["b1", "b2"] },
      ],
    },
    {
      id: "look-words",
      title: "In the model's own words",
      items: [
        { text: "\"Now I have everything I need\" right after a failed or empty lookup.", patterns: ["a1", "d1"] },
        { text: "\"I don't have access\" while the tool is loaded.", patterns: ["a4"] },
        { text: "\"Approximately\" or \"~\" in the read, then exact values in the artifact.", patterns: ["b1"] },
        { text: "A shortened restatement of a rule.", patterns: ["c3"] },
      ],
    },
    {
      id: "look-artifacts",
      title: "In the artifacts and state changes",
      items: [
        { text: "Values that match the older version, the plan or the memory note, not the record.", patterns: ["c1"] },
        { text: "Totals over a filtered set, or a window label that does not match the data.", patterns: ["a3", "c6"] },
        { text: "Hedged reads stated as exact; specifics blurred into summaries.", patterns: ["b1", "d2"] },
        { text: "A summary that disagrees with its own details.", patterns: ["d4"] },
        {
          text: "A record left in an intermediate state; a send that never happened, or one the user did not ask for.",
          patterns: ["d3"],
        },
      ],
    },
    {
      id: "look-final",
      title: "In the final message",
      items: [
        { text: "A question or an offer instead of a finished job.", patterns: ["d3"] },
        { text: "A pointer to an attachment where the message was asked to carry the finding.", patterns: ["d2"] },
        { text: "Claims of checks or coverage the trajectory does not show.", patterns: ["d1"] },
      ],
    },
  ],
  rating: {
    id: "rating",
    title: "Rating the run against the criteria you planned",
    rules: [
      "**Write the criteria from the GTFA and the prompt, not from the run.** Every ask in the prompt and every value in the GTFA gets a criterion, whether Model A passed it or not [G 5; G 5.7]. The run only decides Present or Not Present.",
      "**An unplanned miss** gets a criterion only when it grades an ask the prompt made, or a value the GTFA already holds.",
      "**Grade it where it lands:** the value, classification or decision in the artifact, the state change or the final message. At least 80% of objective criteria must grade completion, and zero process criteria is preferred [G 5.1].",
      "**Never grade existence.** A criterion that only checks that a file, section, column or record exists fails the task automatically [G 5.1; G 5.6].",
      "**One signal per criterion.** If two halves could pass separately, split them [G 5.1].",
      "**Name the value and the file,** so the criterion stands alone, and copy every literal from the source [G 5.1].",
      "**Spot check repeats.** More than 8 items with the same outcome get one completeness criterion and up to five spot checks [G 5.1.1].",
      "**Weight by difficulty, not importance.** A media value reconciled against another source is usually +5; a value read off one image and reported is usually +3 [G 5.2].",
      "**Pick the category and target.** A value or rule the model applies from the inputs, where it can be wrong (a rate, a threshold, an eligibility test), is Task Completion. A user authored constraint on how the output is packaged is Instruction Following, wherever it is written, in the prompt or an input file: which channel to post in, a section count, a format [G 5.4].",
      "**Use a negative only for a specific, plausible failure** the scenario or trajectory exposes, phrased as what happened. Ask whether a positive already covers it, whether Model A actually did it, and whether removing it would leave anything ungraded. Keep negatives around a quarter of the block, below 30% [G 5.2; G 5.3].",
      "**Check it against the golden.** The golden must pass every criterion [G 5.7].",
      "**Justify each failure in three parts:** why the criterion is correct, where Model A failed, and why it is necessary [G 5.5]. For \"where\", cite the exact turn, tool call or output holding the mistake: the earliest step that explains it, and the output where the wrong value lands [G 5.5].",
    ],
  },
};

/* --------------------------------------------------------------- 5. leg b */

export const faLegB = {
  lead: "Leg B runs on Opus [G 6.1], the model these studies measured. If the golden run hits one of these patterns, steer it with a hint at the level of intent [G 6.2]. Say that something is wrong, or point at the area where it lives. Never give the answer, a count or the exact file to open. The guidelines list \"There should be four of them\" as a leak [G 6.2; Q Golden Solution, Hint Leak].",
  hints: [
    { pattern: "a1", what: "The service never opened", hint: "I remember the confirmation came by email." },
    { pattern: "b1", what: "A hedged read written as exact", hint: "Some of the numbers I wrote on that board changed." },
    { pattern: "c1", what: "The plan read as the record", hint: "This shows what I planned, not what actually happened." },
    { pattern: "c6", what: "A stale snapshot read as now", hint: "That screenshot is from a while ago." },
    { pattern: "d3", what: "An action left undone", hint: "I don't see the message to Carlton yet." },
  ],
  stillLead: "If the model still fails a point after several honest hints, check the input first.",
  feasible:
    "If it is legible and the scenario is feasible, keep hinting at intent level until the golden lands. Switching approaches instead is an automatic rejection [G 6.2.1].",
  infeasible:
    "If the miss comes from a contrived or infeasible setup, such as a value at the edge of legibility, stop hinting. Rework the inputs and the prompt within the assigned scenario, and restart from Leg A [G 6.2.1].",
};

/* ------------------------------------------------- 6. when model a keeps passing */

export const faKeepsPassing = {
  rule: "Do not add asks to the prompt you ran, and do not rate or reweight criteria to reach 30%. Go back to planning, redesign inside your parameters, and run Leg A again with the revised prompt and inputs [G 1; G Hard Client Requirements; G 6.2.1].",
  diagnose: {
    title: "Find out why each planned failure point passed.",
    lead: "Open the trajectory at the step where the model found the truth:",
    rows: [
      {
        why: "The fact was in the input folder or the prompt",
        tell: "Reading the inputs or the prompt was enough",
        change:
          "Find a universe record that already holds the deciding value, take that value out of the prompt and the inputs, and let the media carry only the key that finds it (A1, A4, C5) [G 1.2.2]",
      },
      {
        why: "The prompt pointed at where the fact was",
        tell: "The prompt named the service, channel, sheet or file",
        change:
          "Keep the reason to look, drop the location: \"right after my usual team meeting\", not \"check my calendar\" [G 1.2.3]",
      },
      {
        why: "The media value was unambiguous",
        tell: "One clean read was enough",
        change: "Add a realistic distractor: the older version, the crossed out value, the look alike (B1, C1)",
      },
      {
        why: "Only one source existed",
        tell: "There was nothing to reconcile",
        change:
          "Find a second universe record that disagrees, and let the request or an input decide which wins (C2) [G 4]",
      },
      {
        why: "The rule was common sense",
        tell: "The everyday meaning gave the right answer",
        change: "Use a rule from an input whose exact wording changes the result (C3)",
      },
      {
        why: "The last step was trivial",
        tell: "One write ended the task",
        change:
          "Use the full assigned execution target, including any step the data implies (D3), without adding actions your parameters leave out",
      },
    ],
  },
  steps: [
    {
      n: 2,
      title: "Deepen the work a careful agent must do.",
      body: "Explore further for what your assigned services already hold, and build on it: more records and cross links to cover, summaries that look complete and are not, later replies that change a decision [G 1.2.1]. Put rules whose wording matters in your inputs. The studies found universe complexity the best supported lever and literal rules well supported [R When nothing is working], but there the task writer built the data. Here you choose it from what the universe holds. A service outside your assigned tools is drift, not depth [G 1.1.2; G 8.3].",
    },
    {
      n: 3,
      title: "Favor patterns that repeat.",
      body: "Unopened sources are the most repeatable failure in the data [R 2; C Overview]. Rule application, quantitative reasoning, judgment and task completion grew as a share of failures on newer Opus versions [C Overview]. Treat these trends as hypotheses for Model A.",
    },
    {
      n: 4,
      title: "Reuse what already worked.",
      body: "Read where Model A failed in your own graded tasks and in the hub's {{/golden-tasks|golden tasks}}: the trigger, the wrong move and the criterion that caught it. Rebuild the same mechanism with fresh data [R When nothing is working]. It is the only lever with direct evidence on Model A.",
    },
    {
      n: 5,
      title: "Stay inside your parameters.",
      body: "You may adjust a scenario that is too simple to reach the failure threshold only as guidelines section 1.1 allows, and only as far as needed [G 1.1].",
    },
  ],
};

/* ------------------------------------------------ 7. what not to build around */

export const faNotToBuild = {
  lead: "These show up in the source studies, but rarely pay off in Green Shell, or conflict with the guidelines.",
  items: [
    "**Exact formatting and notation,** such as dictated headers or one money format across files. Instruction adherence is 15% of failed criteria overall, but only 4% in OpenClaw MM [R 2], and exact strings and notation are about a quarter of it [R 3.2]. The model meets a stated convention and checks it [G 8.2]. Format checks never go above +1 [G 5.2], and three or more formatting constraints fail as Bad Constraints [Q Prompt, Constraints].",
    "**Memory and logging order,** such as reading MEMORY.md first or logging decisions as you go. These are 1% of root failures, and the order based traps are single Opus 4.6 runs [R 3.17; C Long horizon, traps 1 and 2]. Grading the order of tool calls is process [G 5.1], and MEMORY.md is never mandatory [G 1.2.3]. One habit from this group is worth keeping on a natural surface: a list of sources checked that drops the ones that returned nothing (see D1).",
    "**Traps that need control of the environment,** such as exclusive date bounds, hidden default scopes, unvalidated IDs, broken converters or unreadable files. You cannot configure the universe, and breaking a file or a tool on purpose produces an invalid failure [G 4]. A record in Sent (A2), or one on the edge day of a range (C6), that you find in the universe with a working route to it, is fine.",
    "**Arithmetic for its own sake.** The model sums a few values it holds correctly [G 8.2]. Build on sourcing and scoping the numbers (C4).",
    "**Pressure phrasing,** such as \"no questions\", \"I'm in a hurry\" or a requirement buried among loosely related asks. Single turn already removes clarification, and padding makes a weak prompt [G 1.2.3; Q Prompt, Constraints]. A natural request with several parts is fine.",
    "**Two larger mechanisms:** careless slips (8% of root failures) and running out of steam (7%) [R 6]. The studies treat both as occasional [R 6, labeling rules]. Running out of steam still explains 42% of task completion failures [R 3.5], one reason D3 needs a target with more than one step.",
  ],
  adviceTitle: "Rubric advice from the studies that does not carry over",
  advice: [
    {
      studies: "One criterion per item.",
      green:
        "Above eight similar items, write one completeness criterion and up to five spot checks on the items that carry the trap [G 5.1.1; Q Rubric Criteria, Rubric Spot Checks].",
    },
    {
      studies: "An action split into \"it was sent\" plus its content.",
      green:
        "A send with no content is a disguised existence check, which fails the task automatically [G 5.6; Q Rubric Criteria, Existence Check]. Grade the target and the content together.",
    },
    {
      studies: "One criterion per surface the missed fact reaches.",
      green:
        "Write a criterion for a surface only when the prompt asks for the fact there [G 5.7]. When one miss fails several such criteria, put the reasoning weight on one of them and weight the restatements low [G 5.2]. Count the miss once when you plan the budget [C Fairness checklist].",
    },
    {
      studies: "Checks on the order of tool calls.",
      green: "This is process, within the 20% cap at most [G 5.1].",
    },
    {
      studies: "The decoy value written into the criterion.",
      green:
        "State the correct value. Keep the decoy in the GTFA and use it in the justification [G 5.1; G 5.5].",
    },
    {
      studies: "Tolerances.",
      green: "Use the exact GTFA value [G 5.7]. Allow \"e.g.\" values only for live web data [G 8.3.1].",
    },
  ],
};

/* ------------------------------------------- 8. where the evidence comes from */

export const faEvidence = {
  lead: "The two source studies analyze **68,280 failed rubric criteria in 8,626 tasks with failures** across five agent projects, run with Opus 4.6, 4.8 and 5 [R 1]. In every project, Opus works as an agent: it reads email, calendars, chat, files and images through tools, then writes documents, sends messages and updates records.",
  stats: [
    { value: "68,280", label: "Failed criteria" },
    { value: "8,626", label: "Tasks with failures" },
    // Added from the studies: the root failure count and the rate per task
    // [R At a glance], which is what makes "one miss fails several criteria"
    // countable.
    { value: "24,764", label: "Distinct root failures" },
    { value: "2.9", label: "Root failures per task" },
  ],
  mm: "One of the five is **OpenClaw MM**, the only project in the studies where perception of images matters [R 2]. It has 845 tasks, all on Opus 4.6, graded on one run each [R 1; R 2]. It is the closest evidence to Green Shell tasks, so this page leans on it.",
  failed: {
    title: "What failed in OpenClaw MM",
    measure: "Share of failed criteria",
    rows: [
      { label: "Information seeking and source coverage", value: 39, shown: "39%", patterns: ["a1", "a2", "a3"] },
      { label: "Multimodal perception", value: 25, shown: "25%", patterns: ["b1", "b2", "b3"] },
      { label: "Calibration and honesty", value: 7, shown: "7%", patterns: ["d1", "a4"] },
      { label: "Domain and policy rule application", value: 5, shown: "5%", patterns: ["c3"] },
      { label: "Instruction adherence and deliverable form", value: 4, shown: "4%", setAside: true },
      { label: "Source evaluation and currency", value: 4, shown: "4%", patterns: ["c1"] },
      { label: "Task completion and execution", value: 3, shown: "3%", patterns: ["d3"] },
      {
        label: "Everything else",
        value: 13,
        shown: "about 13%",
        patterns: ["c2", "c4", "c5", "c6", "d2", "d4"],
      },
    ] as { label: string; value: number; shown: string; patterns?: string[]; setAside?: boolean }[],
  },
  behaved: {
    title: "How the runs behaved in OpenClaw MM",
    measure: "Share of tasks with failures",
    rows: [
      { label: "Left a needed source unopened", value: 73, shown: "73%" },
      { label: "Did not verify its outputs", value: 70, shown: "70%" },
      { label: "Totaled figures by hand instead of computing them", value: 64, shown: "64%", note: "indicative" },
      { label: "Stopped early", value: 34, shown: "34%" },
      { label: "Ended with a question or an offer instead of finishing", value: 12, shown: "12%" },
    ] as { label: string; value: number; shown: string; note?: string }[],
    after: "Judged from the transcript [R 4]. \"Totals by hand\" matched a manual check in 7 of 10 tasks.",
  },
  habits: {
    id: "habits",
    title: "The habits behind the patterns",
    lead: "Each failure in the data carries a mechanism: the most likely reason it happened [R 6]. These eight explain most of what you can design for.",
    rows: [
      {
        habit: "Premature closure",
        looks: "Stops at the first plausible answer, source or stopping point",
        share: "15%",
        patterns: ["a1", "a2", "b1", "c2"],
      },
      {
        habit: "Requirement neglect",
        looks: "Drops a stated rule or sub request while handling the rest",
        share: "13%",
        patterns: ["c3", "d3"],
      },
      {
        habit: "Compression loss",
        looks: "Summarizing squeezes out the dates, amounts, names and IDs",
        share: "9%",
        patterns: ["d2"],
      },
      {
        habit: "Default override",
        looks: "Applies its own conventions where the inputs set different ones",
        share: "8%",
        patterns: ["c3"],
      },
      {
        habit: "Assumed unavailability",
        looks: "Believes a tool or record is out of reach, or treats the input folder as the whole universe",
        share: "6%",
        patterns: ["a1", "a4"],
      },
      {
        habit: "Evidence overreach",
        looks: "Prefers a tidy, consistent story to what the records support",
        share: "5%",
        patterns: ["c2", "d1"],
      },
      {
        habit: "Gap filling",
        looks: "Invents a plausible value to avoid an empty slot",
        share: "4%",
        patterns: ["d1"],
      },
      {
        habit: "Proxy trust",
        looks: "Trusts a label, flag, filename, memory note or printed total over the content",
        share: "4%",
        patterns: ["c1", "b2"],
      },
    ],
    after: "Two more matter for this project: **perception error**, the mechanism in 85% of multimodal failures [R 3.9], and **over deference**, asking or recommending instead of acting, in 30% of task completion failures [R 3.5].",
  },
  terms: [
    { term: "Failed criterion", means: "One rubric line Opus did not meet." },
    {
      term: "Root failure",
      means: "One distinct mistake. A single mistake often fails several criteria downstream, such as a missed record that makes a total, a summary and a message all wrong. The studies call those downstream misses a cascade [R 2].",
    },
    {
      term: "Habit",
      means: "The studies' best guess at why a mistake happened. They call it a mechanism [R 6].",
    },
    {
      term: "Repeats across runs",
      means: "The same criterion failed in more than one run of the same task. It tells you a pattern is reliable when it fires, not that it fires often.",
    },
  ],
  limits: {
    id: "limits",
    title: "Limits worth knowing",
    items: [
      "**Many failures are intermittent.** Where the same task ran six times, most failed criteria failed in half the runs or fewer [R 2].",
      "**Some failures repeat more than others.** Failures that happen in every run are mostly information seeking: 57% of them, against 25% of those that failed in half the runs or fewer. A source Opus does not think to open, it tends to skip every time [R 2]. The studies' labeling rules also point failures that happen in every run toward proxy trust, assumed unavailability, domain gaps, perception errors and default override. That is how mechanisms were assigned, not a separate measurement, so read it as a hint [R 6, labeling rules].",
      "**Versions differ.** Enterprise Atlas Advanced is the cleanest comparison of Opus 4.6 and 4.8, with about half its tasks on each. OpenClaw Main's Opus 4.8 tasks are a later, differently designed batch and not comparable [R 2]. In Enterprise Atlas Advanced, information seeking fell from 36% to 25% of root failures, output fidelity from 20% to 15%, and tool use from 8% to 3%. Task completion rose from 14% to 18%, judgment from 2% to 7%, rule application from 1% to 5% and quantitative reasoning from 2% to 4% [R 2; C Overview]. The two versions ran on different task batches, so part of the shift may come from the tasks, and the Opus 5 samples are too small to compare [R 2].",
      "**The multimodal incidents are older.** Every multimodal trap in the studies comes from a single graded Opus 4.6 run, with no repeat data [C Multimodal]. Part of a perception error can also belong to the image tool Opus read through [R 3.9].",
      "**Shares are approximate.** The order of failure modes and mechanisms below the top one or two is indicative [R 3; R 6]. OpenClaw does not record whether a rating was human or automated [R Appendix].",
    ],
  },
  counting:
    "**How the studies count.** A failure is a rubric criterion graded as failed that traces to something Opus did or left undone [R 1].",
  translated:
    "**What changed on the way here.** The studies were written for projects where the task writer builds the data and the tools, and they measured Opus. Their traps were translated for an assigned universe and your own inputs. Their rubric advice was rewritten to the Green Shell rules: outcome based, positively phrased, self contained, with no existence checks [G 5.1]. In the guidelines, Leg A is the GPT leg [G 3], so every pattern is a hypothesis for Model A until your own run confirms it.",
};

/* ------------------------------------------------------------------ lookups */

export const patternById: Record<string, FailurePattern> = Object.fromEntries(
  failurePatterns.map((p) => [p.id, p])
);

export const groupById: Record<FailureGroupId, FailureGroup> = Object.fromEntries(
  failureGroups.map((g) => [g.id, g])
) as Record<FailureGroupId, FailureGroup>;

export const patternsIn = (group: FailureGroupId) => failurePatterns.filter((p) => p.group === group);
