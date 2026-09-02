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

export interface SubjectiveRubric {
  n: number;
  text: string;
  modelA?: "present" | "not-present";
  note?: string;
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
  /** Model A's presentation failures, quoted from subjective_rubrics.md. */
  subjectiveFailures: { n: number; body: string }[];
  run: { summary: string; score: string; observations: RunObservation[]; artifacts: Deliverable[] };
  traps: Trap[];
  takeaways: { title: string; body: string; links?: XLink[] }[];
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

export interface FaqItem {
  n: number;
  id: string;
  q: string;
  /** The answer, sanitized. Paragraphs. */
  a: string[];
  /** Grouping shown as a filter. */
  topic: string;
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
