import type { Clarification, Conflict, HistoryEntry, Todo } from "./types";

/**
 * Source of truth: `clarifications.md`, `purposed_solution.md`,
 * `outstanding_todo's.md` and `taxonomy_updates.md` in
 * G:\My Drive\Red Shell\Project clarifications  - outstanding to do's
 *
 * Items are joined by number, exactly as they are in the source folder.
 * Renumbering breaks the join — reword freely, renumber never.
 */

export const clarifications: Clarification[] = [
  {
    n: 1,
    title: "How far can a follow-up drift?",
    question:
      "Do follow-up turns have to stay on the same topic, or can they deviate as long as the progression feels natural?",
    asks: [
      "Do follow-up turns need to remain related to the same topic or subtopic?",
      "Where exactly is the line for deciding whether a follow-up is still natural enough for the conversation?",
    ],
    context: [
      "Example: the opening topic is visual shopping and comparison, but later turns move into something adjacent or different.",
    ],
    proposal: [
      "Follow-ups must stay inside the assigned category and subcategory. Within that boundary, natural progression into an adjacent need is fine and desirable, because it is what a real user does.",
    ],
    status: "proposed",
    tags: ["turns", "scenario"],
    links: [
      { to: "/golden-tasks/vendor-closeout#conversation", tag: "GT", label: "Four turns that stay in Operations & QA" },
      { to: "/checklist#s3", tag: "C3", label: "Every follow-up consumes the state before it" },
    ],
  },
  {
    n: 2,
    title: "Draft History and Desired Outcome — first turn or final state?",
    question:
      "Should Draft History and Desired Outcome describe the opening intent, or the end state the conversation actually reaches?",
    asks: [
      "Should Draft History and Desired Outcome be defined based on the initial turn or the final turn / final state?",
      "If the user's goal evolves across follow-ups, should these fields reflect the original intent or the eventual outcome being evaluated?",
    ],
    context: ["Depending on the result, this needs a taxonomy update."],
    proposal: [
      "Both should reflect the full conversation rather than only the final state. The conversation is expected to evolve through related asks, and all of them belong in the Agent Objective and the Desired Outcome — high level for the objective, as detailed as possible for the Desired Outcome, on a turn basis.",
    ],
    status: "blocks-taxonomy",
    tags: ["draft history", "desired outcome", "turns"],
    links: [
      { to: "/golden-tasks/vendor-closeout#answer", tag: "GT", label: "A Desired Outcome written per turn" },
      { to: "/checklist#s4", tag: "D2", label: "Shape of the end state, without pre-filling answers" },
    ],
  },
  {
    n: 3,
    title: "Can a subjective rubric grade something nobody asked for?",
    question:
      "Can subjective rubrics evaluate content that was never requested but also never prohibited, when the addition changes the experience?",
    asks: [
      "If an extra section improves clarity, should that be captured as a positive subjective rubric?",
      "If an extra section makes the artifact more cluttered or redundant, should that be a negative subjective rubric?",
    ],
    context: [
      "Examples: adding a CONFIRMED section to the invoices; adding an evidence section to the invoices.",
    ],
    proposal: [
      "Additions that improve the experience can be graded as positive subjective criteria, provided the criterion names an observable property of the render rather than a general impression.",
      "Additions that harm it cannot be captured as a negative subjective criterion, because the subjective block admits no negatives. Express the requirement positively in the objective block instead — for example, “the document contains only the sections named in formatting.md”.",
    ],
    status: "proposed",
    tags: ["subjective", "negatives"],
    links: [
      { to: "/spec#conflicts", tag: "!", label: "Sources disagree on subjective negatives" },
      {
        to: "/golden-tasks/vendor-closeout#model-a",
        tag: "GT",
        label: "Model A added a CONFIRMED section nobody asked for",
      },
    ],
  },
  {
    n: 4,
    title: "Where is the line between a negative rubric and a subjective one?",
    question:
      "When formatting is specified and the output adds an extra section, is that a negative objective rubric or a subjective one?",
    asks: [
      "Could this be a negative normal rubric, because the requested format specified the sections and implicitly expected only those?",
      "Or should it be treated as subjective depending on whether the extra section improves or harms the experience?",
      "Is the intended rule enhances UX → positive subjective, harms UX → negative subjective?",
    ],
    context: [
      "Example: formatting.md explicitly requires a particular set of sections, and the output adds an extra one.",
    ],
    proposal: [
      "The line is the source of the requirement, not the impact on the experience.",
      "If the prompt or an input file states the format explicitly, it belongs in the objective block under Instruction Following, phrased positively: “the report contains exactly the sections listed in formatting.md”.",
      "If the judgement is about how the rendered artifact reads or looks, it belongs in the subjective block.",
      "The “improves the experience means positive subjective, harms it means negative subjective” rule does not hold.",
    ],
    status: "proposed",
    tags: ["subjective", "objective", "formatting"],
    links: [
      { to: "/checklist#s6", tag: "F1", label: "One element, one visible property" },
      {
        to: "/golden-tasks/vendor-closeout#subjective",
        tag: "GT",
        label: "Ten presentation criteria, none of them from the prompt",
      },
    ],
  },
  {
    n: 5,
    title: "Do subjective rubrics use the six categories?",
    question: "Should subjective rubrics carry a category at all, and if so which ones?",
    asks: [
      "For subjective rubrics, does it make sense to have categories other than Task Completion?",
      "Can subjective interpretation happen in alternative paths within the trajectory, even if it is not reflected in the final answer?",
      "What other categories, if any, should subjective rubrics use?",
    ],
    context: [
      "Most subjective interpretations end up in the final answer or artifact, so Task Completion would cover almost all of them.",
      "Factuality seems fully objective, so it does not look like an appropriate subjective category.",
    ],
    proposal: [
      "The six categories belong to the objective block only. Subjective criteria are organised by the presentation dimension and artifact type they inspect — layout, legibility, hierarchy, structure, cross-artifact consistency, register.",
      "Factuality is correctly ruled out: anything checkable against a source of truth belongs to the objective block by definition.",
      "One for us rather than the client: if the tooling requires a category on every criterion, we need to decide what the subjective block submits, or have the field suppressed there.",
    ],
    status: "proposed",
    tags: ["subjective", "categories", "tooling"],
    links: [{ to: "/checklist#s6", tag: "F1", label: "Task Completion is the only valid category today" }],
  },
  {
    n: 6,
    title: "What does a subjective weight actually measure?",
    question: "Should subjective weight measure impact on the user's experience, and should graders set it each time?",
    asks: [
      "Should the weight represent how much impact the presence or absence has on the user's experience?",
      "Would a default weighting scheme such as 3/1 be better than asking graders to determine it each time?",
      "Should the rubric-generation questions be reframed around UX impact?",
    ],
    context: ["Since the rubric itself is subjective, the assigned weight will often also be subjective."],
    proposal: [
      "Keep the 1 / 3 / 5 scale, defined in presentation terms rather than difficulty terms: +5 the artifact is unusable for its audience without this; +3 core presentation competence, failure degrades it but a reader can still use it; +1 polish.",
      "A fixed 3-and-1 default is not recommended — it flattens the difference between an unreadable deliverable and a spacing inconsistency, and the 30% cap already stops presentation dominating the score.",
      "Reframing the generation questions around impact on the user is a good change and works with the scale above.",
    ],
    status: "proposed",
    tags: ["subjective", "weights"],
    links: [{ to: "/checklist#s6", tag: "F2", label: "Weights measure experience, not difficulty" }],
  },
  {
    n: 7,
    title: "MEMORY.md — create it, or reference one that exists?",
    question:
      "Can a prompt ask the agent to create MEMORY.md, or only to append to one that is already in the workspace?",
    asks: [
      "Does the agent need MEMORY.md to be referenced as if it exists — append, add — or can the prompt ask for it to be created?",
    ],
    context: ["The quick hits tasks did not have it. Depending on the result, this needs a taxonomy update."],
    proposal: [
      "Prompts must not instruct the model to create MEMORY.md. That much is explicit in the guidelines.",
      "What is not covered is whether a prompt may reference a MEMORY.md that already exists in the workspace — for example asking the agent to append to it. The quick hits prompt did instruct creation, so existing tasks are affected either way.",
    ],
    status: "blocks-taxonomy",
    tags: ["MEMORY.md", "prompt"],
    links: [
      {
        to: "/golden-tasks/vendor-closeout#conversation",
        tag: "GT",
        label: "Turn 1 says “add the vendor to MEMORY.md”, not “create”",
      },
      { to: "/checklist#s2", tag: "B4", label: "Hard rules on inputs and filenames" },
    ],
  },
  {
    n: 8,
    title: "One milestone per turn, or one per requirement?",
    question: "Can a turn carry multiple milestones, or does everything in a turn nest into one?",
    asks: [
      "Can a turn have multiple milestones, or does all the intent for that turn have to be nested into a single one?",
    ],
    context: [],
    proposal: [
      "A turn can carry multiple milestones: one per requirement, grouped by the turn it belongs to. A follow-up expressing three requirements produces three milestones.",
      "Worth confirming, because the guidelines contradict themselves — §4 says one milestone per requirement, while the Task Workflow table says one per follow-up. Nesting several requirements into a single milestone makes the intent spec too coarse to steer a run that diverges.",
    ],
    status: "proposed",
    tags: ["milestones", "turns"],
    links: [
      {
        to: "/golden-tasks/vendor-closeout#conversation",
        tag: "GT",
        label: "Turn 1 alone carries the folder, the receipts and both MEMORY sections",
      },
    ],
  },
];

export const conflicts: Conflict[] = [
  {
    id: "subjective-negatives",
    title: "Are negative criteria allowed in the subjective block?",
    a: {
      source: "purposed_solution.md §3–4 · Pre-Submit Gate §6",
      says: "The subjective block admits positive criteria only. A requirement that would be phrased negatively goes to the objective block instead, expressed positively.",
    },
    b: {
      source: "taxonomy_updates.md §5 (Subjective Rubrics)",
      says: "“Negatives stay — they were never banned here.” §3.2's “do not mix negative rubrics with subjective rubrics” is read as a boundary between the two blocks, not a ban, and §6 is quoted as allowing negative-weight subjective criteria with a ~25% target and 30% ceiling.",
    },
    guidance:
      "Until this is settled, the safe write is positive-only in the subjective block — that is what the pre-submit gate checks and what the golden task ships. If you need to capture a render property that actively hurts the reader, raise it rather than inventing a negative.",
    links: [
      { to: "/spec#c-3", tag: "#3", label: "Clarification 3" },
      { to: "/spec#c-4", tag: "#4", label: "Clarification 4" },
      { to: "/golden-tasks/vendor-closeout#subjective", tag: "GT", label: "Ten criteria, all positive" },
    ],
  },
  {
    id: "which-leg-golden",
    title: "Which leg produces the golden?",
    a: {
      source: "taxonomy_updates.md §4 (Milestones), current text",
      says: "“The run above is your reference conversation… its finished artifacts are the golden solution” — attributing the golden to the reference run.",
    },
    b: {
      source: "Guidelines §5 (Golden Solution / Model B / SOTA)",
      says: "The Golden Solution is what the original Model A conversation should have arrived at, and the worker's job in the Model B leg is to drive the model there.",
    },
    guidance:
      "Flagged in the taxonomy draft rather than decided — the sentence was removed instead of picking a side. Needs an owner before the taxonomy ships.",
    links: [{ to: "/spec#history", tag: "log", label: "Milestones section history" }],
  },
  {
    id: "leg-naming",
    title: "What are the two legs called?",
    a: { source: "taxonomy_updates.md §4", says: "Calls it “the Claude leg”." },
    b: { source: "The rest of the taxonomy", says: "Uses Model A and Model B throughout." },
    guidance:
      "Left neutral in the draft. Confirm one name — the mismatch will confuse anyone reading both sections in sequence.",
  },
];

export const history: HistoryEntry[] = [
  {
    id: "h-overview-legs",
    area: "Project overview",
    change: "Rebuilt around two legs — the Model A trajectory, then a second conversation that produces the golden.",
    why: "The single-model framing no longer describes the project.",
    state: "settled",
  },
  {
    id: "h-overview-workflow",
    area: "Project overview",
    change: "Workflow expanded from 5 steps to 9, split by leg.",
    why: "Milestones, the golden leg and the subjective block did not exist before.",
    state: "settled",
  },
  {
    id: "h-overview-universe",
    area: "Project overview",
    change:
      "Added a meaningful universe interaction block: superficial vs meaningful table, the two-to-three server bar, and a depth-over-breadth warning.",
    why: "Biggest quality lever in the project and the most common rejection reason. The old overview only said “interact with the universe first”, which CBs satisfy by opening one app.",
    state: "settled",
  },
  {
    id: "h-overview-heic",
    area: "Project overview",
    change: "HEIC removed and banned.",
    why: "A direct reversal of the old advice, which recommended it.",
    state: "settled",
  },
  {
    id: "h-overview-qc",
    area: "Project overview",
    change:
      "Added downsampling, LLM artifacts capped at 20%, audio under 5–10 minutes, output filenames stated in the prompt, and no MEMORY.md.",
    why: "New requirements that fail a task at QC.",
    state: "settled",
  },
  {
    id: "h-overview-uploads",
    area: "Project overview",
    change: "Made the two uploads explicit — the zip at Story Draft, the inputs folder at Create Universe.",
    why: "Both exist and serve different purposes. CBs conflate them.",
    state: "settled",
  },
  {
    id: "h-overview-download",
    area: "Project overview",
    change: "Added “download artifacts before the next follow-up”.",
    why: "A multi-turn trap with no single-turn equivalent.",
    state: "settled",
  },
  {
    id: "h-rubric-quota",
    area: "Objective rubrics",
    change: "Removed the ~25% negative target and the 30% ceiling; negatives are now the exception.",
    why: "The guidelines say negatives should never be forced. A quota manufactures the redundant opposite-polarity pairs that §3.4 lists as a defect.",
    state: "settled",
  },
  {
    id: "h-rubric-weight",
    area: "Objective rubrics",
    change:
      "Weight redefined — positives scale by difficulty across four dimensions, negatives by how tempting the failure is. Rare but damaging failures become unit tests rather than −5.",
    why: "The old importance-based scale gives the same numbers a different meaning, so every weight lands wrong.",
    state: "settled",
  },
  {
    id: "h-rubric-target",
    area: "Objective rubrics",
    change: "Evaluation Target added as a required field, with routing hints.",
    why: "It was absent from the old section entirely.",
    state: "settled",
  },
  {
    id: "h-rubric-trace",
    area: "Objective rubrics",
    change:
      "Trace coverage added — 60–70% of weight on outcome, 30–40% on reasoning and process, with the category and evaluation-target mapping.",
    why: "Without it CBs load every rubric onto the final artifact and leave the trajectory ungraded.",
    state: "settled",
  },
  {
    id: "h-rubric-media",
    area: "Objective rubrics",
    change: "Added ≥1 media-only high-weight criterion and ≥1 deterministic criterion per artifact.",
    why: "New hard requirements.",
    state: "settled",
  },
  {
    id: "h-rubric-lastturn",
    area: "Objective rubrics",
    change: "Rubrics are authored against the last turn.",
    why: "A multi-turn anchor with no single-turn equivalent.",
    state: "settled",
  },
  {
    id: "h-rubric-count",
    area: "Objective rubrics",
    change: "Rubric count corrected to ≤5; the stray “2 criteria per category” line deleted.",
    why: "A hard cap in §3.1. The deleted line was a layout artifact implying twelve rubrics against a cap of five.",
    state: "settled",
  },
  {
    id: "h-rubric-bundling",
    area: "Objective rubrics",
    change: "Bundle only within the same data signal; long lists use an aggregate plus at most three spot checks.",
    why: "Independent items stay separate so partial failures still register in the score.",
    state: "settled",
  },
  {
    id: "h-milestones-granularity",
    area: "Milestones",
    change: "Milestone granularity corrected from one per follow-up to one per requirement, grouped by turn.",
    why: "One-per-follow-up makes the intent spec too coarse to steer a run that diverges.",
    state: "settled",
  },
  {
    id: "h-milestones-cap",
    area: "Milestones",
    change: "Turn cap corrected — the simulator leg is explicitly uncapped.",
    why: "The turn-depth tier described the authoring leg but sat where it read as a cap on the leg being steered.",
    state: "settled",
  },
  {
    id: "h-milestones-golden",
    area: "Milestones",
    change: "The sentence attributing the golden to the reference run was removed rather than rewritten.",
    why: "It contradicts the guidelines, which put the golden in the Model B leg. Needs a decision.",
    state: "flagged",
  },
  {
    id: "h-milestones-naming",
    area: "Milestones",
    change: "Leg naming left neutral rather than model-specific.",
    why: "The section called it “the Claude leg” while the rest of the taxonomy uses Model A and Model B.",
    state: "flagged",
  },
  {
    id: "h-subj-pairwise",
    area: "Subjective rubrics",
    change: "Pairwise quality scoring added as its own step, with the four fixed questions.",
    why: "The step was missing entirely from the old section.",
    state: "settled",
  },
  {
    id: "h-subj-notprompt",
    area: "Subjective rubrics",
    change: "Added “subjective criteria are not written from the prompt”.",
    why: "A visual requirement the prompt states is an objective rubric. This block grades what the brief left to judgement.",
    state: "settled",
  },
  {
    id: "h-subj-scope",
    area: "Subjective rubrics",
    change: "Applicability stated up front — the block runs only for rendered deliverables.",
    why: "§6 scopes it to decks, HTML, PDFs, catalogues and video.",
    state: "settled",
  },
  {
    id: "h-subj-justification",
    area: "Subjective rubrics",
    change: "Justification scope narrowed to Model A.",
    why: "§6.1 states it explicitly; the old wording implied both artifacts.",
    state: "settled",
  },
  {
    id: "h-subj-traps",
    area: "Subjective rubrics",
    change:
      "Writing traps added as a do-this-instead table: invented specificity, compound properties, grading the impossible, bare adjectives, non-discriminating criteria.",
    why: "None of the §6 writing rules appeared in the old section. Overfitting invented specifics is the most damaging, since it fails valid variants.",
    state: "settled",
  },
  {
    id: "h-subj-negatives",
    area: "Subjective rubrics",
    change: "Negative-weight presentation criteria kept, with the −1 / −3 / −5 table.",
    why: "Reads §3.2's mixing rule as a boundary between blocks rather than a ban. This is the open conflict — the pre-submit gate and the proposed solutions both assume positive-only.",
    state: "flagged",
  },
  {
    id: "h-autorater",
    area: "Autorater",
    change: "System prompts have to be rewritten before this ships — not the thresholds.",
    why: "They still encode the single-turn rules, and run against work built to the new taxonomy they will overflag heavily. Every false flag costs a CB time and trust.",
    state: "flagged",
  },
];

export const todos: Todo[] = [
  {
    n: 1,
    title: "taxonomy_updates.md",
    detail:
      "All six sections drafted. Two open decisions remain in the Milestones section: which leg produces the golden, and what the second leg should be called.",
    status: "in progress",
    dependsOn: "Clarifications 2 and 7",
    links: [{ to: "/spec#conflicts", tag: "!", label: "Both open decisions" }],
  },
  {
    n: 2,
    title: "Golden Task viewer for the new version",
    detail:
      "The previous viewer covers the single-turn version. The multi-turn edition needs golden examples showing both legs, the milestone spec, and a subjective block.",
    status: "in progress",
    dependsOn: "Taxonomy updates signed off",
    links: [{ to: "/golden-tasks", tag: "GT", label: "First task published here" }],
  },
  {
    n: 3,
    title: "Screening",
    detail: "Complex enough to keep spammers out of the project without throttling legitimate intake.",
    status: "not started",
  },
  {
    n: 4,
    title: "Review the linters",
    detail:
      "Several are misleading and will confuse CBs — a negative-criteria threshold that never existed, final-artifact mentions demanded on criteria that do not need them.",
    status: "not started",
    dependsOn: "Autorater prompts rewritten",
    links: [{ to: "/spec#history", tag: "log", label: "Where the overflagging comes from" }],
  },
  {
    n: 5,
    title: "Task walkthrough for the course",
    detail: "A worked end-to-end task to sit inside the intro course.",
    status: "not started",
    links: [{ to: "/golden-tasks/vendor-closeout", tag: "GT", label: "Vendor closeout pack" }],
  },
  {
    n: 6,
    title: "Share the spec doc with CBs and non-corp QMs",
    detail: "The QC spec viewer needs to reach the people being graded by it.",
    status: "not started",
  },
];
