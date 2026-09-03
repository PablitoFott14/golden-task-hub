import type { ChecklistSection } from "./types";

/**
 * Transcribed verbatim from `presubmit-gate.pdf`
 * (G:\My Drive\Red Shell\Coruses & Screenings\Guidelines\presubmit-gate.pdf,
 * source of truth `checklist.md` in the same folder).
 *
 * Question text and footnotes are the PDF's own wording. Section refs point
 * into [External] OpenClaw MM Rubrics MULTI TURN – Guidelines v2. The links
 * are added here and exist only in the hub.
 */

const GT = "/golden-tasks/vendor-closeout";

export const checklistMeta = {
  title: "Pre-Submit Gate",
  subtitle: "Run it once when the task is finished and you are deciding whether to submit.",
  estimate: "~5 min",
  warning:
    "Rubrics are the biggest source of rejections. A Major issue fails the task above 10% of the criteria set.",
  banner:
    "Tick a box only when you have actually looked, not when you assume.",
  pdf: "docs/presubmit-gate.pdf",
  ready: {
    title: "Ready to submit",
    body: "Every box ticked, and each one because you looked rather than assumed. If a check felt uncertain rather than clean, it is not ticked, so go back to the section it names.",
  },
  fix: {
    title: "Fix before submitting",
    body: "Any box left empty. Fix the item, then re-run the section it sits in. Changing a rule in the prompt or the inputs usually moves something in the rubric block too.",
  },
};

export const checklist: ChecklistSection[] = [
  {
    n: 1,
    id: "s1",
    title: "Scenario shape",
    prompt: "Is this the task you were assigned, and is it hard enough to be worth grading?",
    checks: [
      {
        id: "A1",
        q: "Does the scenario sit naturally inside the assigned category, subcategory and universe, rather than having been bent to fit them?",
        f: "If not, re-read the subcategory definition and adjust until the pair is the scenario’s obvious home.",
        ref: "§1.1 · 1.2.5",
        links: [
          { to: "/#universe", tag: "M1", label: "Go find the story, do not invent one" },
          { to: `${GT}#universe`, tag: "GT", label: "Operations & QA inside a wound down studio" },
        ],
      },
      {
        id: "A2",
        q: "Did you confirm the loadout in the Universe Explorer, add the Service Universe Artifact ID, and anchor every date to a window you actually saw in the data?",
        f: "Without the Artifact ID the artifacts come back empty. Designing against a server that is not loaded is an environment defect, not a model failure.",
        ref: "§1.1 · 1.2.1",
        links: [{ to: "/spec#trajectory", tag: "QC", label: "Feasibility with tools" }],
      },
      {
        id: "A3",
        q: "Does the task require multi-system coordination across all three stages, data acquisition, processing and reasoning, and output generation?",
        f: "If it can be completed in a short linear exchange it is too simple. Add a cross-system handoff, not more asks.",
        ref: "§Hard Client Requirements · 1.2.5",
        links: [{ to: `${GT}#traps`, tag: "GT", label: "Seven designed friction points" }],
      },
      {
        id: "A4",
        q: "Did Model A actually fail at least 50% of the final rubric score, with failures that materially affect task completion?",
        f: "If the run sailed through, raise the reasoning difficulty. Do not close the gap with format micro-specifications the model happens to miss.",
        ref: "§Hard Client Requirements",
        links: [
          { to: "/#failure", tag: "M5", label: "If the model sails through, the task is not ready" },
          { to: `${GT}#model-a`, tag: "GT", label: "19 of 21 criteria failed" },
        ],
      },
    ],
  },
  {
    n: 2,
    id: "s2",
    title: "Universe and evidence",
    prompt: "Is the media load-bearing, and is the universe doing real work?",
    checks: [
      {
        id: "B1",
        q: "Is there at least one fact the task cannot be completed without that lives only in a connected service, and does the agent require meaningful interaction with the universe rather than superficial?",
        f: "",
        ref: "§1.2.2",
        links: [{ to: `${GT}#universe`, tag: "GT", label: "Sixteen of twenty rows exist only in Slack" }],
      },
      {
        id: "B2",
        q: "Take the attachments away. Does the task become unsolvable? If no, the model does not require the level of multimodal reasoning expected.",
        f: "Not every input needs to be essential: realistic noise and distractor files are allowed and encouraged, as long as the task still genuinely requires multimodal reasoning to recover the facts needed for completion.",
        ref: "§1.2.2",
        links: [
          { to: "/#inputs", tag: "M2", label: "Attach what the person would actually have" },
          { to: `${GT}#inputs`, tag: "GT", label: "A figure that exists only in handwriting" },
        ],
      },
      {
        id: "B3",
        q: "Do the inputs clear the hard rules: downsampled, no .heic, no LLM-generated .pdf/.docx/.xlsx, under the 20% LLM cap, no junk or system files, CC0 or CC BY, synthetic personas only?",
        f: "Then check the names: no filename, manifest or helper document may reveal the expected answer.",
        ref: "§1.2.2",
        links: [{ to: "/spec#input-artifacts", tag: "QC", label: "Realism, safety, deferred assets" }],
      },
    ],
  },
  {
    n: 3,
    id: "s3",
    title: "Prompt and turns",
    prompt: "Does the conversation actually ask for what you are about to grade?",
    checks: [
      {
        id: "C1",
        q: "Is every expected output file named explicitly in the prompt itself, spelled exactly as it must appear?",
        f: "A filename that appears only in an input file, the Agent Objective or the Desired Outcome was never asked for.",
        ref: "§1.2.3 · 1.3",
        links: [{ to: `${GT}#turns`, tag: "GT", label: "Every deliverable named in a prompt" }],
      },
      {
        id: "C2",
        q: "Do the thresholds, rules and policies the agent must apply live anywhere in the scenario, in the prompt or the multimodal inputs?",
        f: "",
        ref: "§1.2.3",
        links: [{ to: `${GT}#format`, tag: "GT", label: "The receipt format lives in an attachment" }],
      },
      {
        id: "C3",
        q: "Does the conversation run 3 to 5 turns, with every follow-up consuming the state the turn before it produced?",
        f: "Fewer than 3 turns is automatically rejected. A follow-up that would work as an independent opening prompt fails Turn Structure.",
        ref: "§1.1 · 1.2.3",
        links: [
          { to: "/spec#multi-turn", tag: "QC", label: "Turn structure and dependency" },
          { to: `${GT}#turns`, tag: "GT", label: "What each turn consumes" },
        ],
      },
      {
        id: "C4",
        q: "Is there at least one turn that changes the brief after something was already delivered, and is any deferred asset named explicitly on the turn it enters scope?",
        f: "A revision is a targeted edit to what exists. “I found another file” does not name the asset.",
        ref: "§Hard Client Requirements · 1.2.3 · 6.3",
        links: [{ to: `${GT}#turns`, tag: "GT", label: "Turn 4 is the revision turn" }],
      },
      {
        id: "C5",
        q: "Did you avoid flagging the miss anywhere, in the Leg A follow-ups and in your Leg B follow-ups and hints?",
        f: "Pointing at the failure compromises the 50% threshold. If the model could copy your hint straight into the artifact, you gave away the answer.",
        ref: "§1.2.3 · 7.2",
        links: [
          { to: "/#golden", tag: "M8", label: "Point at the intent, never at the answer" },
          { to: "/spec#multi-turn", tag: "QC", label: "Simulator answer leak" },
        ],
      },
    ],
  },
  {
    n: 4,
    id: "s4",
    title: "Draft History alignment",
    prompt: "Nothing the agent never saw can be graded.",
    checks: [
      {
        id: "D1",
        q: "Is every requirement you intend to grade actually stated in a prompt the agent received?",
        f: "The Draft History is not embedded in the agent. A requirement living only there was never asked for, so it cannot be graded.",
        ref: "§1.3 · 4",
        links: [{ to: "/#draft-history", tag: "M4", label: "The agent never sees this" }],
      },
      {
        id: "D2",
        q: "Does the Desired Outcome describe the shape of the end state without pre-filling the answers, and does it match the GTFA you resolved?",
        f: "If you cannot state the one correct answer yourself, the scenario was never ready to write up.",
        ref: "§1.2.4 · 1.3",
        links: [
          { to: "/#scenario", tag: "M3", label: "Solve it yourself first" },
          { to: `${GT}#answer`, tag: "GT", label: "The resolved answer" },
        ],
      },
    ],
  },
  {
    n: 5,
    id: "s5",
    title: "Objective rubrics",
    prompt:
      "Every criterion has to be ratable, correct at runtime, and grounded in something the prompt said.",
    checks: [
      {
        id: "E1",
        q: "Walking the prompt once per turn, is every ask covered by a criterion, including intents introduced in the middle turns, not just the final state?",
        f: "Missing Criteria and Turn Scoped are both Major issues.",
        ref: "§5.1 · 5.6 · 5.7",
        links: [{ to: "/spec#rubric-criteria", tag: "QC", label: "The rubric error catalogue" }],
      },
      {
        id: "E2",
        q: "Read with the prompt closed: can a grader rate every criterion Present or Not Present from the criterion and its evaluation target alone?",
        f: "Embed the exact value, filename, date or classification. Anchor “the photo” to the actual filename.",
        ref: "§5.1",
        links: [
          { to: "/#rubrics", tag: "M6", label: "A grader with the prompt closed can still rate it" },
          { to: `${GT}#rubrics`, tag: "GT", label: "21 criteria that each pin their own value" },
        ],
      },
      {
        id: "E3",
        q: "Is every value asserted in a criterion the one the tool, file or universe actually returns at runtime?",
        f: "Verify against the downloaded trajectory and artifacts rather than the note you took while authoring.",
        ref: "§5.1 · 5.5",
      },
      {
        id: "E4",
        q: "Does every literal format requirement trace back to a line you can quote from the prompt?",
        f: "Exact heading names, ordering, casing and phrasing are Instruction Following only when the user stated them. If you cannot cite the line, cut it.",
        ref: "§5.1 · 5.4",
      },
      {
        id: "E5",
        q: "Is each criterion atomic, and do no two criteria demand mutually exclusive outcomes or check the same thing twice with opposite polarity?",
        f: "Split only where two halves could pass independently; several values serving one finding stay in one criterion. A positive on X and a negative on Y are complementary, not contradictory.",
        ref: "§5.1 · 5.6",
      },
      {
        id: "E6",
        q: "Is every weight in {−5, −3, −1, +1, +3, +5}, and does each answer how hard the criterion was to satisfy rather than how much it matters?",
        f: "Any value outside the set fails Rubric Structure on its own. A requirement can be critical to the task and still be +1.",
        ref: "§5.2 · 5.7",
        links: [{ to: "/spec#rubric-criteria", tag: "QC", label: "Rubric structure" }],
      },
      {
        id: "E7",
        q: "Is every criterion in the category and evaluation target it would actually be graded under?",
        f: "Agent Behavior is always Trajectory. If you wrote it against an artifact, a state change or the final message, you are grading the deliverable and the category is wrong.",
        ref: "§5.4",
        links: [{ to: `${GT}#rubrics`, tag: "GT", label: "Criterion 18 carries neither" }],
      },
      {
        id: "E8",
        q: "Are negatives around a quarter of the block and under 30%, and does any group of more than eight similar outcomes use one completeness criterion plus at most five spot checks?",
        f: "Each negative must name a failure the setup genuinely invites, not mirror every “don’t” in the prompt.",
        ref: "§5.1.1 · 5.3",
      },
    ],
  },
  {
    n: 6,
    id: "s6",
    title: "Subjective block",
    prompt: "Presentation only, judged on the render.",
    checks: [
      {
        id: "F1",
        q: "Does the block hold 10 or more natural criteria, each anchored to one identifiable element and one visible property the prompt never asked for?",
        f: "Do not force extra rubrics to hit the number. No “looks professional”, “well designed” or “high quality”. Name the property a reviewer can locate and score.",
        ref: "§8.1",
        links: [
          { to: "/#subjective", tag: "M9", label: "Judge the render" },
          { to: `${GT}#subjective`, tag: "GT", label: "Ten criteria from one comparison" },
        ],
      },
      {
        id: "F2",
        q: "Do the weights measure impact on the user’s experience rather than difficulty, and does every criterion grade something the format can actually show?",
        f: "A PDF cannot respond to hover and a static graphic cannot play audio. Task Completion and Final Answer Artifact are the only valid category and target.",
        ref: "§8.1 · 8.2 · 8.4",
      },
      {
        id: "F3",
        q: "Did you rate every subjective criterion Present or Not Present against both models yourself, and are the justifications written at the user-experience level?",
        f: "Pre-filled selections are not to be trusted, and the Model B set is entirely yours to determine.",
        ref: "§8.5",
        links: [{ to: "/spec#rubric-criteria", tag: "QC", label: "Subjective block scope" }],
      },
    ],
  },
  {
    n: 7,
    id: "s7",
    title: "Dynamic values and final state",
    prompt: "The last things that break a task after everything else is right.",
    checks: [
      {
        id: "G1",
        q: "If the scenario touches the public internet or another dynamic type of information, essentially prices, is no criterion pinned to a value that can legitimately change between runs?",
        f: "Grade the retrieval and the relationship the model has to establish, with the value given as an example rather than as the required answer.",
        ref: "§9.3.1",
      },
      {
        id: "G2",
        q: "Does the golden pass the complete objective rubric set, with every named file present and every factual claim grounded in an input that was actually opened?",
        f: "Anything the golden fails is a broken criterion, not a broken golden.",
        ref: "§5.7 · 7",
        links: [
          { to: "/#golden", tag: "M8", label: "The golden passes its own block" },
          { to: `${GT}#golden`, tag: "GT", label: "The golden deliverables" },
        ],
      },
      {
        id: "G3",
        q: "Are the trajectories and final artifacts downloaded, the preferred run starred, and does every failed criterion carry all three justification parts?",
        f: "A failure is a positive rated Not Present or a negative rated Present. Every one carries a justification; the golden needs none.",
        ref: "§5.5 · 7.1",
        links: [{ to: "/spec#trajectory", tag: "QC", label: "Trajectory completeness" }],
      },
    ],
  },
];
