import type { SpecDimension, XLink } from "./types";

/**
 * The Quality Control spec, summarised from the live viewer at
 * https://qc-spec-mt-rubrics.vercel.app/ (built from the QC spec sheet exports).
 *
 * This page is a map, not a copy. Every dimension here links back to the live
 * spec, which stays the source of truth for the exact option wording and scores.
 */
export const SPEC_URL = "https://qc-spec-mt-rubrics.vercel.app/";

export const specDimensions: SpecDimension[] = [
  {
    id: "trajectory",
    name: "Trajectory",
    purpose: "Was the task worth running, and did the agent really do the work.",
    questions: [
      {
        id: "feasibility",
        name: "Feasibility with tools",
        body: "Everything the prompt asks for has to be actionable by the tools the session actually has.",
        fails: "The primary request is impractical or impossible with the tools available or enabled.",
        links: [{ to: "/checklist#s1", tag: "A2", label: "Confirm the loadout before you design" }],
      },
      {
        id: "depth",
        name: "Architectural depth and friction exposure",
        body: "The task has to force multi stage planning, real tool dependency, and at least one genuine friction point, so different models separate.",
        fails: "No meaningful tool dependency, and every model performs about the same.",
        links: [
          { to: "/#failure", tag: "M5", label: "If the model sails through, the task is not ready" },
          { to: "/golden-tasks/vendor-closeout#traps", tag: "GT", label: "Seven designed friction points" },
        ],
      },
      {
        id: "media",
        name: "Genuine media inspection",
        body: "Every value attributed to a multimodal input has to trace to a step where the agent actually opened and processed that input.",
        fails: "Values attributed to the media with no evidence of opening it, inferred from filenames or the user's wording.",
        links: [{ to: "/#inputs", tag: "M2", label: "Take the attachments away" }],
      },
      {
        id: "completeness",
        name: "Completeness",
        body: "Every agent trajectory is present and complete.",
        fails: "At least one trajectory is missing.",
        links: [{ to: "/checklist#s7", tag: "G3", label: "Download the trajectories and star the preferred run" }],
      },
    ],
  },
  {
    id: "verifiers",
    name: "Verifiers",
    purpose: "Does the rubric actually check the media.",
    questions: [
      {
        id: "artifact-verification",
        name: "Artifact verification",
        body: "At least one criterion has to depend on the contents of a non text input, not merely on its existence.",
        fails: "No criterion depends on the content of a non text file. Existence checks do not count.",
        links: [{ to: "/#rubrics", tag: "M6", label: "A grader with the prompt closed can still rate it" }],
      },
    ],
  },
  {
    id: "multi-turn",
    name: "Multi-turn",
    purpose: "Is this one conversation, or several single turn tasks stacked up.",
    questions: [
      {
        id: "turn-dependency",
        name: "Turn structure and dependency",
        body: "Two to four follow ups, each delivering, extending, correcting, constraining or answering, and each depending on state established earlier.",
        fails: "No follow ups, or follow ups that could be reordered with no change to the outcome.",
        links: [
          { to: "/checklist#s3", tag: "C3", label: "Every follow up consumes the turn before it" },
          { to: "/golden-tasks/vendor-closeout#turns", tag: "GT", label: "What each of the four turns consumes" },
        ],
      },
      {
        id: "answer-leak",
        name: "Simulator answer leak",
        body: "The user may say that something is wrong. The user may not say what the right answer is, where exactly to find it, or how many of anything there are.",
        fails: "A user turn supplies a value, count, position or conclusion the agent was supposed to derive.",
        links: [
          { to: "/#golden", tag: "M8", label: "Point at the intent, never at the answer" },
          { to: "/checklist#s3", tag: "C5", label: "Never flag the miss" },
        ],
      },
      {
        id: "revision",
        name: "Revision turn handling",
        body: "The golden shows the edit applied to work that already existed: earlier content kept, the change visible, nothing stale left behind.",
        fails: "Earlier turn content the revision never asked to remove is missing, or the revision has no visible effect.",
        links: [{ to: "/checklist#s3", tag: "C4", label: "One turn changes the brief after delivery" }],
      },
    ],
  },
  {
    id: "milestones",
    name: "Milestones",
    purpose: "Would the script still work on a run that went a different way.",
    questions: [
      {
        id: "intent-level",
        name: "Intent-level abstraction",
        body: "Every milestone records intent, stripped of anything specific to the response the authoring run happened to produce.",
        fails: "A milestone encodes the answer, or references artifacts a divergent run may never create.",
        links: [{ to: "/#milestones", tag: "M7", label: "One intent, one milestone" }],
      },
      {
        id: "continuation",
        name: "Continuation criteria and assets",
        body: "Each milestone says what must be true before the simulator advances, checkable without a judgment call, and lists the assets handed over at that step.",
        fails: "Missing continuation criteria, or criteria that cannot be evaluated without a judgment call.",
      },
      {
        id: "annotations",
        name: "Milestone annotations",
        body: "Five parts per milestone: the turn, the modifier, the assets delivered, the milestone itself, and the continuation criteria.",
        fails: "An inaccurate modifier, continuation criteria or asset label for the turn it is attached to.",
      },
    ],
  },
  {
    id: "golden-solution",
    name: "Golden solution",
    purpose: "Is the ideal response actually ideal, and does it leak the path.",
    questions: [
      {
        id: "artifact-completeness",
        name: "Artifact completeness",
        body: "Every file named in the prompt exists in the golden folder, every content rule is satisfied, and nothing is asserted that the inputs do not support.",
        fails: "A named file is missing or misnamed, a content rule is unsatisfied, or the golden asserts an unsupported finding.",
        links: [{ to: "/checklist#s7", tag: "G2", label: "The golden passes the complete objective set" }],
      },
      {
        id: "trajectory-exclusion",
        name: "Trajectory exclusion",
        body: "The golden folder ships finished artifacts only. The external judge receives the artifacts and never the golden trajectory.",
        fails: "A trajectory, trace, conversation log, status file, or any narration of how the answer was reached.",
      },
    ],
  },
  {
    id: "prompt",
    name: "Prompt",
    purpose: "Could the task be finished without ever looking at the media.",
    questions: [
      {
        id: "mm-dependence",
        name: "Multimodal dependence",
        body: "The explicit requests of the prompt must be impossible to fulfil without multimodal reasoning. A transcript sitting beside the audio breaks this.",
        fails: "The prompt can be completely fulfilled without any multimodal reasoning or processing.",
        links: [{ to: "/checklist#s2", tag: "B2", label: "Take the attachments away" }],
      },
    ],
  },
  {
    id: "input-artifacts",
    name: "Input artifacts",
    purpose: "Do the inputs look like something a real person would hand over.",
    questions: [
      {
        id: "realism",
        name: "Realism",
        body: "Real user data is messy: duplicates, missing timestamps, blurry phone shots, skewed scans, mixed orientations. A curated set of perfect files is a fail.",
        fails: "More than 20% of the necessary inputs are highly artificial, or any LLM generated xlsx, docx or pdf is present.",
        links: [{ to: "/golden-tasks/vendor-closeout#inputs", tag: "GT", label: "Eleven files recovered in a rush" }],
      },
      {
        id: "safety",
        name: "Safety",
        body: "Medical images, tax documents, insurance claims, faces, children and IDs need synthetic or mocked data.",
        fails: "An input carries sensitive private information that can identify a real, existing person.",
        links: [{ to: "/checklist#s2", tag: "B3", label: "The hard rules for inputs" }],
      },
      {
        id: "deferred",
        name: "Deferred asset handling",
        body: "The file ships in the input folder at upload time, but nothing about it may preview the turn that delivers it.",
        fails: "A deferred asset's filename or a manifest reveals the content or purpose of the later turn.",
        links: [{ to: "/checklist#s3", tag: "C4", label: "Name the deferred asset on the turn it enters scope" }],
      },
    ],
  },
  {
    id: "rubric-criteria",
    name: "Rubric criteria",
    purpose: "The largest single source of rejections.",
    questions: [
      {
        id: "overall-quality",
        name: "Overall rubric quality",
        body: "Scored on the share of criteria carrying issues, using every criterion you wrote as the denominator. The error catalogue below is what gets counted.",
        fails: "Major issues above 10% of the criteria, or Major and Moderate together above 15%.",
        links: [{ to: "/checklist#s5", tag: "E", label: "The eight objective rubric checks" }],
      },
      {
        id: "structure",
        name: "Rubric structure",
        body: "Weights come from a fixed set, and weight reflects the difficulty of what the criterion tests rather than its importance to the prompt.",
        fails: "Any criterion uses a weight outside −5, −3, −1, +1, +3, +5.",
        links: [{ to: "/checklist#s5", tag: "E6", label: "Every weight in the allowed set" }],
      },
      {
        id: "spot-checks",
        name: "Rubric spot checks",
        body: "For a group of similar outcomes, write one criterion checking the volume plus up to five spot checks.",
        fails: "More than five spot checks for any one group of outcomes.",
        links: [{ to: "/checklist#s5", tag: "E8", label: "One completeness criterion plus five spot checks" }],
      },
      {
        id: "subjective-scope",
        name: "Subjective block scope",
        body: "Presentation only: layout, legibility, hierarchy, structure, cross artifact consistency, register. Each criterion names one observable property.",
        fails: "Two or more deterministic value, existence or process checks sitting in the subjective block.",
        links: [
          { to: "/#subjective", tag: "M9", label: "Judge the render, nothing the prompt asked for" },
          { to: "/checklist#s6", tag: "F1", label: "Ten or more, each anchored to one element" },
        ],
      },
    ],
  },
];

/** The rubric error catalogue that drives the Overall Rubric Quality score. */
export const rubricErrors: {
  name: string;
  severity: "Major" | "Moderate";
  body: string;
  links?: XLink[];
}[] = [
  {
    name: "Missing criteria, critical requirements",
    severity: "Major",
    body: "An explicit requirement of the prompt, or a critical implicit expectation, has no criterion checking it.",
    links: [{ to: "/checklist#s5", tag: "E1", label: "Walk the prompt once per turn" }],
  },
  {
    name: "Criteria not self contained",
    severity: "Major",
    body: "The criterion cannot be evaluated without the prompt, the reference text, another criterion or an external fact.",
    links: [{ to: "/checklist#s5", tag: "E2", label: "Read it with the prompt closed" }],
  },
  {
    name: "Criteria not atomic",
    severity: "Major",
    body: "Two or more completely unrelated constraints in one criterion, leaving no clear focus for the rating.",
    links: [{ to: "/checklist#s5", tag: "E5", label: "Split only where two halves pass independently" }],
  },
  {
    name: "Incorrect criteria",
    severity: "Major",
    body: "The criterion checks something the prompt never required, or contains a factual error.",
    links: [{ to: "/checklist#s5", tag: "E3", label: "Verify every value against the trajectory" }],
  },
  {
    name: "Turn-scoped criteria",
    severity: "Major",
    body: "The criterion holds only at an intermediate turn and is legitimately superseded later, so it fails against the final artifact even on a correct run.",
  },
  {
    name: "Cross-turn state not covered",
    severity: "Major",
    body: "The task carries a revision turn or a deferred asset, and nothing checks that earlier content survived it.",
    links: [{ to: "/checklist#s3", tag: "C4", label: "The revision turn" }],
  },
  {
    name: "Missing criteria, non-critical requirements",
    severity: "Moderate",
    body: "A non critical requirement of the prompt has no criterion checking it.",
  },
  {
    name: "Overlapping or redundant criteria",
    severity: "Moderate",
    body: "One criterion is fully encompassed by others, or several check the same thing in part.",
  },
  {
    name: "Overfitting and underfitting",
    severity: "Moderate",
    body: "Too rigid, so valid implementations are rejected, or too broad, so wrong ones pass.",
  },
  {
    name: "Subjective criteria",
    severity: "Moderate",
    body: "Vague or immeasurable wording in the objective block: good formatting, optimal code, well designed.",
  },
  {
    name: "Incorrect weights",
    severity: "Moderate",
    body: "A criterion weighted two levels off, for example +1 where +5 belongs.",
    links: [{ to: "/checklist#s5", tag: "E6", label: "Weight answers how hard, not how important" }],
  },
  {
    name: "Double negative",
    severity: "Moderate",
    body: "A negative criterion penalising the absence of something instead of rewarding its presence.",
  },
  {
    name: "Block bleed",
    severity: "Moderate",
    body: "A deterministic value check in the subjective block, or a presentation judgment in the objective block.",
  },
  {
    name: "Simulator-dependent criteria",
    severity: "Moderate",
    body: "The criterion can only be rated by knowing what the simulated user said, rather than what the agent produced.",
  },
  {
    name: "Miscategorized criteria",
    severity: "Moderate",
    body: "The chosen category has no observable link to what the criterion is actually assessing, and a clearly better one exists.",
    links: [{ to: "/checklist#s5", tag: "E7", label: "Agent Behavior is always Trajectory" }],
  },
  {
    name: "Turn-count criteria",
    severity: "Moderate",
    body: "The criterion checks how many turns were taken rather than what was achieved.",
  },
];
