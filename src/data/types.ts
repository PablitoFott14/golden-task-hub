/**
 * Every entity in the hub carries a stable, URL-addressable `id`, because the
 * whole point of the hub is that one person can send another person a link to
 * the exact thing they mean.
 */

/** A pointer from one resource to another. Rendered by <Crosslinks />. */
export interface XLink {
  /** Where it goes: `/route#section-id`, or an absolute URL. */
  to: string;
  /** Short mono prefix, the id of the target ("E2", "M4", "GT"). */
  tag?: string;
  /** Human label. */
  label: string;
}

/* ------------------------------------------------------------------- method */

/**
 * One step of the method, derived from `rationale.md` and cross-read against
 * the project guidelines. The slogan is the memorable half, `means` the
 * minimal explanation, and `inTask` the line that ties it to the Golden Task.
 */
export interface MethodStep {
  n: number;
  id: string;
  /** Short name for the step. */
  title: string;
  /** The principle, in one memorable line. */
  slogan: string;
  /** Two or three sentences. Never more. */
  means: string;
  /** Concrete moves, three or four bullets. */
  moves: string[];
  /** What this step hands to the next one. */
  produces: string;
  /** How the principle shows up in the worked task. */
  inTask: { body: string; link: XLink };
  /** Optional hard rule worth pinning, taken from the guidelines. */
  rule?: { label: string; body: string };
  /** Which phase of the workflow the step belongs to. */
  phase: "Design" | "Leg A" | "Leg B" | "Grade";
}

/* --------------------------------------------------------------- golden task */

export type Verdict = "receipt" | "unconfirmed" | "not-cancelled" | "out-of-pool" | "skipped";

export interface TaskMeta {
  id: string;
  serviceId: string;
  title: string;
  /** One line a reader can hold in their head. */
  oneLiner: string;
  category: string;
  subcategory: string;
  universe: string;
  persona: string;
  turns: number;
  deliverables: string[];
  modalities: string[];
  status: "Golden" | "Draft";
  /** Where the source folder lives on Drive, for anyone who needs the raw files. */
  sourcePath: string;
}

/** One file the user attached to the conversation. */
export interface InputAsset {
  file: string;
  /** Path under public/. */
  src: string;
  kind: "image" | "photo" | "handwriting" | "pdf" | "doc";
  /** What a person sees when they open it. */
  shows: string;
  /** The load-bearing fact it carries, or why it carries none. */
  carries: string;
  /** Vendors it speaks to. */
  vendors: string[];
  /** Why it is in the pack, the design intent. */
  role: "evidence" | "contradicts" | "distractor" | "spec";
}

export interface Turn {
  n: number;
  text: string;
  /** What this turn adds that the previous one did not. */
  adds: string;
  /** The state it consumes from the turn before. */
  consumes: string;
  /** Named outputs the turn asks for. */
  produces: string[];
  /** Notes worth reading, traps planted in the wording. */
  notes?: { title: string; body: string; tone?: "accent" | "warn" | "no" }[];
}

/** One row of the evidence ledger, the heart of the task. */
export interface LedgerRow {
  vendor: string;
  verdict: Verdict;
  amount?: string;
  /** The Slack message that speaks to it. */
  universe: string;
  /** The attachment that speaks to it, or the absence of one. */
  attachment: string;
  /** Why the two together land on this verdict. */
  why: string;
  /** Number of mentions in #winddown, from the GTFA pool count. */
  mentions?: number;
}

export interface Rubric {
  n: number;
  text: string;
  category: string;
  target: string;
  polarity: "positive" | "negative";
  /** Result against the Model A run. */
  status: "present" | "not-present";
  /** One line on what actually happened. */
  observed?: string;
}

/** A rectangle in an artifact's own coordinates. */
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A labelled box drawn over a render, pointing at what the criterion is about. */
export interface Mark {
  box: Box;
  label: string;
  /**
   * Where the label sits relative to its box. The job is to land on empty
   * pixels: `inside` when the box frames blank space, `above` by default, and
   * `below` when the box is near the top of the frame.
   */
  place?: "above" | "below" | "inside";
  /** Which edge of the box the label hangs from. */
  align?: "left" | "right";
}

/**
 * What to show for one side of the comparison.
 *
 * `render` is the artifact as a reader sees it, an SVG or a page image, framed
 * on the part the criterion is about. `doc` is a markdown deliverable, shown
 * formatted rather than as source, with the lines the criterion is about marked.
 * Subjective criteria are judged on the render, so neither form shows markup.
 */
export type RubricView =
  | {
      kind: "render";
      /** Path under public/. */
      src: string;
      /** The artifact's natural size, the units every box below is written in. */
      canvas: { w: number; h: number };
      /** The region to frame. Omitted shows the whole artifact. */
      focus?: Box;
      marks?: Mark[];
    }
  | {
      kind: "doc";
      /** Path under public/, so the whole document can be opened. */
      src: string;
      /** The excerpt, verbatim markdown lines, rendered as formatted text. */
      lines: string[];
      /** Indices into `lines` that the criterion is about. */
      mark: number[];
    };

/**
 * One side of the comparison a subjective criterion was written from. Leg A is
 * the observed task run, Leg B the golden.
 */
export interface RubricLeg {
  /** What the render does, in one line. */
  verdict: string;
  view: RubricView;
}

/**
 * A presentation criterion, plus the OT and GT outcomes it was derived from.
 * Every subjective rubric carries its own comparison, so a reader can put the
 * two renders side by side and see the difference the criterion names.
 */
export interface SubjectiveRubric {
  n: number;
  text: string;
  /** The artifact the criterion is judged on. */
  artifact: string;
  /** What the criterion is actually checking, in one line. */
  asks: string;
  /** Result against the Model A run. */
  status: "present" | "not-present";
  /** Leg A, the observed task run. */
  legA: RubricLeg;
  /** Leg B, the golden. */
  legB: RubricLeg;
  /** The difference between the two renders, and why it is writable as a criterion. */
  derived: string;
}

/** A designed difficulty, the part worth copying. */
export interface Trap {
  id: string;
  title: string;
  where: string;
  body: string;
  /** What it tests about the model. */
  tests: string;
  /** The method step this friction came out of. */
  step?: number;
  links?: XLink[];
}

/**
 * One numbered item of the Desired Outcome: an artifact, everything that has to
 * be inside it, and the turn it belongs to. `askedFor` is the line in the
 * conversation that requests it, which is the check the whole field lives or
 * dies on.
 */
export interface OutcomeItem {
  n: number;
  /** The turn or turns the item is filed under. */
  turns: number[];
  /** What the item settles, in one line. */
  summary: string;
  /** The named outputs it resolves. */
  produces: string[];
  /** The item as the Draft History writes it, rendered as formatted text. */
  lines: string[];
  /** The prompts that ask the agent for it. Nothing here is graded without one. */
  askedFor: { turn: number; quote: string }[];
}

/**
 * The Draft History: the Agent Objective and the Desired Outcome the task is
 * filed with. Stored the way it was written, like the turn prompts and the
 * milestone set, because the wording is the thing being studied.
 *
 * The agent never receives any of it, which is why every item carries the
 * prompt that asks for the same thing out loud.
 */
export interface DraftHistory {
  /** The Agent Objective, one entry per paragraph. */
  objective: string[];
  /** What each paragraph of the objective is doing, in the hub's words. */
  objectiveReads: { title: string; body: string }[];
  /** The Desired Outcome, one entry per numbered item. */
  outcome: OutcomeItem[];
}

/**
 * One milestone: the requirement of its turn written as intent, with anything
 * specific to the response stripped out. The simulator replays these against a
 * run that went a different way, so a milestone that named a value, a filename
 * or a format would only ever match the run it was written from.
 */
export interface Milestone {
  /** The turn whose requirement this is. */
  turn: number;
  /** The milestone, as the milestone set writes it. */
  text: string;
}

/** One message of the golden conversation, verbatim, as markdown lines. */
export interface GoldenMessage {
  role: "user" | "agent";
  /** The turn this message belongs to. A hint carries the turn it reopens. */
  turn: number;
  /** Set on a steering prompt, which is not one of the task's own turns. */
  hint?: boolean;
  lines: string[];
}

/** What the milestone check found at one point in the golden conversation. */
export interface MilestoneCheck {
  /** Where in the run the check happens. */
  title: string;
  /** The turn being checked. */
  turn: number;
  /** Whether every milestone for that turn was reached. */
  met: boolean;
  /** What the run actually produced against them. */
  body: string;
  /** What that decides for the next prompt. */
  next: string;
}

/**
 * The golden run. Same opening prompt, new conversation, steered with intent
 * level prompts. The milestones are checked after every turn, and that check is
 * the only thing that decides whether the next prompt is the next turn or a
 * hint, which is why the checks and the conversation are stored together.
 */
export interface GoldenRun {
  checks: MilestoneCheck[];
  /** The steer the run needed, and the anatomy of why it is allowed. */
  hint: {
    /** The milestone it is aimed at. */
    missed: string;
    /** The prompt, verbatim. */
    prompt: string;
    /** What it points at. */
    does: string[];
    /** What it never says. */
    avoids: string[];
    /** What the model did with it. */
    recovered: string;
  };
  conversation: GoldenMessage[];
}

export interface Deliverable {
  file: string;
  what: string;
  /** Path under public/ when the real artifact ships with the hub. */
  src?: string;
  kind: "pdf" | "svg" | "md" | "folder";
}

export interface RunObservation {
  title: string;
  expected: string;
  actual: string;
  rubrics: number[];
}

export interface GoldenTask {
  meta: TaskMeta;
  /** The scenario in the contributor's words, not the user's. */
  premise: string;
  /** What makes it golden. Three or four lines, no more. */
  whyGolden: string[];
  turns: Turn[];
  inputs: InputAsset[];
  /** The one written spec the agent must follow. */
  format: { file: string; src: string; body: string };
  universeNotes: { title: string; body: string }[];
  answer: {
    total: string;
    percent: string;
    basis: string;
    counts: { label: string; n: number; tone: string }[];
  };
  deliverables: Deliverable[];
  ledger: LedgerRow[];
  rubrics: Rubric[];
  subjective: SubjectiveRubric[];
  subjectiveNote: string;
  run: { summary: string; score: string; observations: RunObservation[]; artifacts: Deliverable[] };
  traps: Trap[];
  /** The Agent Objective and the Desired Outcome, as the task was filed. */
  draftHistory: DraftHistory;
  /** The milestone set, grouped by turn in the UI. */
  milestones: Milestone[];
  /** The golden conversation, and the milestone check that steered it. */
  goldenRun: GoldenRun;
}

/* ---------------------------------------------------------------- checklist */

export interface Check {
  id: string;
  q: string;
  f: string;
  ref: string;
  links?: XLink[];
}

export interface ChecklistSection {
  n: number;
  id: string;
  title: string;
  prompt: string;
  checks: Check[];
}

/* ----------------------------------------------------------------- spec doc */

/** One scored question in the QC spec. */
export interface SpecQuestion {
  id: string;
  name: string;
  /** What the reviewer is actually judging. */
  body: string;
  /** The failing option, in plain words. */
  fails: string;
  links?: XLink[];
}

export interface SpecDimension {
  id: string;
  name: string;
  /** One line on what this dimension protects. */
  purpose: string;
  questions: SpecQuestion[];
}

/* --------------------------------------------------------------------- faq */

/** A pointer into the guidelines, by section number and heading. */
export interface GuidelineRef {
  /** The section number as the guidelines write it, "1.2.3" or "5.1". */
  section: string;
  /** The heading that section carries. */
  title: string;
}

export interface FaqItem {
  n: number;
  id: string;
  q: string;
  /** The answer, sanitized. Paragraphs. */
  a: string[];
  /** Grouping shown as a filter. */
  topic: string;
  /** Where the guidelines answer this. Every item carries at least one. */
  refs: GuidelineRef[];
  links?: XLink[];
}

/* ------------------------------------------------------------------- search */

export interface SearchEntry {
  kind: "Method" | "Golden task" | "Pre-submit check" | "QC spec" | "FAQ";
  title: string;
  hint: string;
  to: string;
  /** Extra text folded into the match, never displayed. */
  terms: string;
}
