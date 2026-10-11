import type { ChecklistSection } from "./types";

/**
 * The pre-submit gate, written against the Green Shell guidelines as of the
 * Oct 8, 2026 revision. It started as a transcription of Red Shell's
 * `checklist.md` and kept that gate's purpose and frame: one pass, run when
 * the task is finished, seven sections in the order a task is built, a short
 * question per check and a footnote that says how to fix it. What changed is
 * the content: single turn instead of turns, fourteen assigned parameters, the
 * 80/20 rule and the two automatic fails, the subjective block in section 7,
 * and Leg B checked as Leg B.
 *
 * **This file is the source of the PDF too.** `scripts/build_presubmit_gate.py`
 * reads it through Node and prints `public/docs/presubmit-gate.pdf`, so the page
 * and the printable gate cannot disagree. Keep this file free of value imports
 * for that reason: Node loads it on its own, with only `import type` erased.
 *
 * Section refs point into `[External] Green Shell – Guidelines`, by its own
 * numbering. The links are added here and exist only in the hub.
 */

const GT = "/golden-tasks/charge-disputes";

/**
 * The masthead count is derived, here and in the PDF. Everything on screen
 * that states the number reads this, because a hardcoded total is the one
 * thing that silently drifts when a check is added.
 */
export const checkCount = () => checklist.reduce((n, s) => n + s.checks.length, 0);

export const checklistMeta = {
  title: "Pre-Submit Gate",
  subtitle: "Run it once when the task is finished and you are deciding whether to submit.",
  estimate: "~5 min",
  warning:
    "Rubrics are the biggest source of rejections. Process over the 20% cap and an existence check fail a task on their own, and Major issues fail it above 10% of the criteria set.",
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
    title: "Parameters and scenario",
    prompt: "Is this the task you were assigned, and is it hard enough to be worth grading?",
    checks: [
      {
        id: "A1",
        q: "Does the finished task implement all fourteen assigned parameters exactly, with any deviation limited to what the universe or the failure threshold genuinely forced?",
        f: "Go down the parameter sheet line by line, not just the category pair. Drift from any one of them is an automatic rejection.",
        ref: "§Hard Client Requirements · 1.1 · 1.1.2",
        links: [
          { to: "/#parameters", tag: "M1", label: "Fourteen are assigned. None of them is a suggestion" },
          { to: "/reference#binding-parameters", tag: "WN", label: "All fourteen are binding, and what counts as drift" },
        ],
      },
      {
        id: "A2",
        q: "Does the scenario sit naturally inside the assigned use case and subcategory, read by the user's intent, rather than having been bent to fit them?",
        f: "A neighbouring subcategory that fits better is a category relevance failure, even when the use case is right. Re-read the definition and its scope check.",
        ref: "§1.1.1 · 1.2.5",
        links: [
          { to: `${GT}#parameters`, tag: "GT", label: "Why the intent fixes the pair, not the inputs" },
          { to: "/reference#use-case-and-tools", tag: "WN", label: "11 use cases and 68 subcategories" },
        ],
      },
      {
        id: "A3",
        q: "Did you ground the scenario by exploring the universe through the AI agent in the Database tab, confirm the loadout in the Universe Explorer, and anchor every date to a window you actually saw in the data?",
        f: "Inspecting by hand is how people conclude a scenario has no anchor. A thin loadout is an environment defect, and claiming the universe cannot support a scenario it can fails the task automatically.",
        ref: "§1.1 · 1.2.1",
        links: [
          { to: "/#universe", tag: "M2", label: "Go find the story, do not invent one" },
          { to: "/#universe-videos", tag: "VIDEO", label: "Loading and exploring the universe, on screen" },
          { to: "/spec#trajectory", tag: "QC", label: "Feasibility with tools" },
        ],
      },
      {
        id: "A4",
        q: "Does the output artifact clear the complexity bar for its type, with work across all three stages that a short linear exchange could not finish?",
        f: "Plan the complexity before the run, never patch it in after. Add a cross-system handoff, not more asks.",
        ref: "§Hard Client Requirements · Complexity Bar · 1",
        links: [
          { to: "/#scenario", tag: "M3", label: "Complexity is planned, never patched in" },
          { to: "/reference#planned-complexity", tag: "WN", label: "The floor each deliverable has to clear" },
          { to: `${GT}#gtfa`, tag: "GT", label: "Seven designed friction points" },
        ],
      },
      {
        id: "A5",
        q: "Did Model A genuinely fail at least 30% of the final rubric score, ideally 50% or more, with failures that materially affect task completion?",
        f: "If the run sailed through, redesign inside your parameters and run Leg A again. Never force a failure, add an ask after the run or inflate a weight to reach the bar.",
        ref: "§Hard Client Requirements · 1.2 · 4",
        links: [
          { to: "/#failure", tag: "M7", label: "If the model sails through, the task is not ready" },
          { to: `${GT}#model-a`, tag: "GT", label: "52% of the objective weight lost" },
          { to: "/failure-approach#keeps-passing", tag: "FA", label: "Model A passed? Find out why" },
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
        q: "Is there at least one fact the task cannot be completed without that lives only in the universe, and does the agent have to read the universe, not only write to it?",
        f: "Notes, calendar entries and drafts the agent creates are outputs, not universe interaction. The correct final state has to depend on the assigned tools, not on whichever service is easiest to reach.",
        ref: "§1.2.2 · 1.2.5 · 8.3",
        links: [
          { to: `${GT}#universe`, tag: "GT", label: "One dispute that only the calendar settles" },
          { to: "/reference#assigned-tool-use", tag: "WN", label: "Assigned tools have to be used" },
        ],
      },
      {
        id: "B2",
        q: "Take the attachments away. Does the task become unsolvable? If not, it does not require the multimodal reasoning expected.",
        f: "Not every input has to be essential: realistic noise and distractor files are encouraged, as long as recovering the facts the task needs still takes multimodal reasoning.",
        ref: "§Hard Client Requirements · 1.2.2",
        links: [
          { to: "/#inputs", tag: "M4", label: "Attach what the person would actually have" },
          { to: `${GT}#inputs`, tag: "GT", label: "Three disputes that exist only on paper" },
        ],
      },
      {
        id: "B3",
        q: "Do the inputs cover every assigned input modality, with at least three of them in the Model A conversation and most images needing real visual interpretation rather than being screenshots of text?",
        f: "A page of text in picture form is a document, not an image. Three is the floor, and many tasks need substantially more.",
        ref: "§Hard Client Requirements · 1.1.2 · 1.2.2 · 1.3",
        links: [
          { to: "/reference#input-diversity", tag: "WN", label: "Images worth looking at, not only reading" },
          { to: "/reference#input-floor", tag: "WN", label: "Three inputs is the floor, not the target" },
          { to: `${GT}#inputs`, tag: "GT", label: "Nine files, and the fact each one carries" },
        ],
      },
      {
        id: "B4",
        q: "Do the inputs clear the hard rules: downsampled, no .heic, no LLM-generated .pdf/.docx/.xlsx, under the 20% LLM cap, no junk or system files, CC0 or CC BY, synthetic personas only?",
        f: "Then check the names: no filename, manifest or helper document may reveal the expected answer. Handwriting legible, images sharp, audio clear and short.",
        ref: "§1.2.2",
        links: [{ to: "/spec#input-artifacts", tag: "QC", label: "Realism, safety and the input floor" }],
      },
    ],
  },
  {
    n: 3,
    id: "s3",
    title: "The prompt",
    prompt: "Does the one prompt actually ask for what you are about to grade?",
    checks: [
      {
        id: "C1",
        q: "Is every expected output file named explicitly in the prompt itself, spelled exactly as it must appear?",
        f: "A filename that appears only in an input file, the Agent Objective or the Desired Outcome was never asked for, even when the assigned scenario names none.",
        ref: "§1.2.3 · 1.3",
        links: [{ to: `${GT}#prompt`, tag: "GT", label: "The output file, spelled exactly" }],
      },
      {
        id: "C2",
        q: "Is the prompt built from the assigned scenario, in the user's own voice, with everything the agent needs in it, its inputs or the universe, and a call to action it can finish in a single turn?",
        f: "Model A gets the initial prompt and no follow-ups. Leave room for subjectivity: a visual requirement the prompt states becomes objective.",
        ref: "§1.1.2 · 1.2.3 · 3",
        links: [
          { to: "/#prompt", tag: "M5", label: "One prompt, and everything in it" },
          { to: "/reference#single-turn", tag: "WN", label: "Tasks are single turn" },
        ],
      },
      {
        id: "C3",
        q: "Do the thresholds, rules and policies the agent must apply live in the inputs, where it has to find them, unless the assigned scenario already states them?",
        f: "Stating the policy in the prompt removes the work you meant to grade.",
        ref: "§1.2.3",
        links: [{ to: `${GT}#inputs`, tag: "GT", label: "The page format lives in an attachment" }],
      },
      {
        id: "C4",
        q: "Does the prompt state the assigned execution target and any limit on the run, such as nothing sent, and keep the verification condition's answers out of it?",
        f: "A target the prompt never states cannot be graded. No shortcut, clue or filename may give the answer away.",
        ref: "§1.1.2 · 1.2.3",
        links: [{ to: `${GT}#prompt`, tag: "GT", label: "Every span of the prompt that is doing work" }],
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
        q: "Is every requirement you intend to grade actually stated in the prompt the agent received?",
        f: "The Draft History is not embedded in the agent. A requirement living only there was never asked for, so it cannot be graded.",
        ref: "§1.3",
        links: [
          { to: "/#draft-history", tag: "M6", label: "Say why the agent is there, not what to type" },
          { to: `${GT}#draft-history`, tag: "GT", label: "Each outcome item, next to the line that asks for it" },
        ],
      },
      {
        id: "D2",
        q: "Does the Desired Outcome describe the shape of the end state without pre-filling the answers, and does it match the GTFA you resolved?",
        f: "If you cannot state the one correct answer yourself, the scenario was never ready to write up.",
        ref: "§1.2.4 · 1.3",
        links: [
          { to: "/#scenario", tag: "M3", label: "Solve it yourself first" },
          { to: `${GT}#gtfa`, tag: "GT", label: "The resolved answer, charge by charge" },
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
        q: "Walking the prompt, is every ask covered by a criterion, with each core decision graded where it lands in the deliverable?",
        f: "Missing Criteria is a Major issue. No target count: thorough coverage usually lands around 15 to 30.",
        ref: "§5 · 5.1 · 5.7",
        links: [{ to: "/spec#rubric-criteria", tag: "QC", label: "The rubric error catalogue" }],
      },
      {
        id: "E2",
        q: "Do at least 80% of the objective criteria grade completion, and is every process criterion one that no deliverable could show?",
        f: "Tool Use, Agent Behavior, any Trajectory target and narration of the model's own work are process. Over 20% fails the task automatically, and zero is preferred.",
        ref: "§5.1 · 5.4 · 5.6",
        links: [
          { to: "/#rubrics", tag: "M8", label: "Grade what was delivered, not how it got there" },
          { to: "/reference#outcome-over-process", tag: "WN", label: "80/20: grade the outcome, not the route" },
          { to: `${GT}#rubrics`, tag: "GT", label: "Zero Trajectory criteria, which is the target" },
        ],
      },
      {
        id: "E3",
        q: "Does every criterion grade content, and none only that a file, section, column or record exists?",
        f: "An existence check fails the task automatically at any weight. A criterion on the value inside the file already proves the file exists.",
        ref: "§5.1 · 5.6",
        links: [{ to: "/reference#no-existence-checks", tag: "WN", label: "Existence is never a criterion" }],
      },
      {
        id: "E4",
        q: "Read with the prompt closed: can a grader rate every criterion Present or Not Present from the criterion and its evaluation target alone, and does every literal in it match its source exactly?",
        f: "Embed the exact value, filename, date or classification, copied from the source, never typed from memory. A literal the source does not carry is an Incorrect Criteria issue.",
        ref: "§5.1 · 5.5 · 5.7",
        links: [
          { to: "/#rubrics", tag: "M8", label: "A grader with the prompt closed can still rate it" },
          { to: "/reference#literal-matching", tag: "WN", label: "Every literal matches its source" },
          { to: `${GT}#rubrics`, tag: "GT", label: "26 criteria that each pin their own value" },
        ],
      },
      {
        id: "E5",
        q: "Is each criterion atomic and positively phrased, with no two checking the same thing or demanding outcomes that cannot both hold?",
        f: "Split only where two halves could pass independently; several values serving one finding stay in one criterion. Use OR only for outcomes that are genuinely equivalent.",
        ref: "§5.1 · 5.1.2 · 5.6",
      },
      {
        id: "E6",
        q: "Is every weight in {−5, −3, −1, +1, +3, +5}, and does each answer how hard the criterion was to satisfy rather than how much it matters?",
        f: "Any value outside the set fails Rubric Structure on its own. A value read off the media and reconciled against another source is usually +5.",
        ref: "§5.2 · 5.7",
        links: [{ to: "/spec#rubric-criteria", tag: "QC", label: "Rubric structure" }],
      },
      {
        id: "E7",
        q: "Is every criterion in the category and evaluation target it would actually be graded under?",
        f: "Agent Behavior is always Trajectory: written against an artifact, a state change or the final message, it grades the deliverable. Instruction Following needs a line you can quote from the prompt.",
        ref: "§5.4",
        links: [{ to: `${GT}#rubrics`, tag: "GT", label: "Every criterion carries its own value" }],
      },
      {
        id: "E8",
        q: "Are negatives around a quarter of the block and under 30%, and does any group of more than eight similar outcomes use one completeness criterion plus at most five spot checks?",
        f: "Each negative names a failure the setup genuinely invites, not every “don't” in the prompt.",
        ref: "§5.1.1 · 5.3",
        links: [{ to: `${GT}#gtfa`, tag: "GT", label: "Nine charges, nine criteria, no group to collapse" }],
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
        f: "Do not force extra criteria to hit the number. No “looks professional”, “well designed” or “high quality”: name the property a reviewer can locate and score.",
        ref: "§7.1",
        links: [
          { to: "/#subjective", tag: "M10", label: "Judge the render" },
          { to: `${GT}#subjective`, tag: "GT", label: "Eleven criteria from one comparison" },
        ],
      },
      {
        id: "F2",
        q: "Do the weights measure impact on the user's experience rather than difficulty, and does every criterion grade something the format can actually show?",
        f: "A PDF cannot respond to hover and a static graphic cannot play audio. The category is Task Completion and the target the Final Answer Artifact, with User-Facing Message a rare exception.",
        ref: "§7.1 · 7.2 · 7.4",
      },
      {
        id: "F3",
        q: "Did you rate every subjective criterion Present or Not Present against both models yourself, with justifications written at the user-experience level?",
        f: "Pre-filled selections are not to be trusted, and the Model B set is entirely yours to determine. Literal matching applies here as rigorously as in the objective block.",
        ref: "§5.1 · 7.5",
        links: [{ to: "/spec#rubric-criteria", tag: "QC", label: "Subjective block scope" }],
      },
    ],
  },
  {
    n: 7,
    id: "s7",
    title: "Golden, dynamic values and final state",
    prompt: "The last things that break a task after everything else is right.",
    checks: [
      {
        id: "G1",
        q: "Did Leg B run the same prompt word for word, every hint at intent level and in the same persona, and does the golden pass the complete objective rubric set?",
        f: "If the model could copy your hint straight into the artifact, you gave away the answer. Anything the golden fails is a broken criterion, not a broken golden.",
        ref: "§5.7 · 6.1 · 6.2",
        links: [
          { to: "/#golden", tag: "M9", label: "Point at the intent, never at the answer" },
          { to: `${GT}#golden`, tag: "GT", label: "The golden run, steer by steer" },
        ],
      },
      {
        id: "G2",
        q: "If the scenario touches the public internet or another dynamic type of information, essentially prices, is no criterion pinned to a value that can legitimately change between runs?",
        f: "Grade the retrieval and the relationship the model has to establish, with the value given as an example rather than as the required answer.",
        ref: "§8.3.1",
      },
      {
        id: "G3",
        q: "Are the trajectories and final artifacts downloaded, the preferred run starred, and does every failed criterion carry all three justification parts?",
        f: "A failure is a positive rated Not Present or a negative rated Present. Every one carries a justification; the golden needs none.",
        ref: "§3 · 5.5",
        links: [{ to: "/spec#trajectory", tag: "QC", label: "Trajectory completeness" }],
      },
    ],
  },
];
