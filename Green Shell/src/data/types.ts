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
/* --------------------------------------------------------------- onboarding */

/**
 * One onboarding. It is hosted and deployed on its own, so the hub carries
 * the card and the link rather than the material itself.
 */
export interface OnboardingItem {
  id: string;
  n: number;
  title: string;
  /** One line, the reason to open it. */
  tagline: string;
  /** Two or three sentences on what it is. */
  blurb: string;
  /** The deck's own cover slide, under `public/onboarding/`. */
  cover: string;
  /** Where the onboarding actually lives. */
  url: string;
  /** Countable facts, rendered as a small stat row. */
  stats: { k: string; v: string }[];
  /** What is inside, one line per theme. */
  covers: string[];
  cta: string;
  tone: "brand" | "rose";
}

/* --------------------------------------------------------------- complexity */

/** One field of the complexity proposal form. */
/**
 * One option in a Complexity field's list. Every value is taken from a project
 * source — the taxonomy, the guidelines' complexity bar, the universe exports or
 * the claim sheet — and never written here by hand, so a contributor can only
 * ever pick something the project actually defines.
 */
export interface ComplexityOption {
  value: string;
  /** Shown beside the value where the source states something about it. */
  note?: string;
  /** Options sharing a group are listed under it. */
  group?: string;
}

/**
 * One field of the Complexity form.
 *
 * `select`, `multi`, `use-case`, `subcategory` and `universe` are all closed
 * lists: there is no typing in any of them. `textarea` is the scenario alone,
 * which is prose unique to the task and has no option set to pick from.
 */
export interface ComplexityField {
  id: string;
  label: string;
  /** What the guidelines call it, shown under the label. */
  hint: string;
  kind: "select" | "multi" | "textarea" | "use-case" | "subcategory" | "universe";
  required: boolean;
  placeholder?: string;
  /** Which assigned parameter this is, for the chip on the field. */
  assigned?: boolean;
  /** The closed list, for `select` and `multi`. */
  options?: ComplexityOption[];
  /** Shown in the empty state of a `select`, or as the prompt on a `multi`. */
  empty?: string;
}

/**
 * One row of the single turn claim sheet, as the picker offers it. Selecting a
 * row fills every field of the form, so a contributor working a sheet task
 * never types anything at all.
 */
export interface ClaimSheetTask {
  ref: string;
  taskId: string;
  useCase: string;
  subcategory: string;
  universe: string;
  artifact: string;
  primary: string;
  secondary: string;
  tools: string;
  scenario: string;
}

/**
 * What one universe export holds, summarised. The Complexity tool's universe
 * dropdown is a list of these, and the context it sends the model is built from
 * the one selected. GENERATED into `universes.ts`; see that file.
 */
export interface UniverseSummary {
  id: string;
  /** The account holder, derived from the export's name. */
  label: string;
  /** Where the bulk of the records fall, tails trimmed. */
  span?: string;
  services: { name: string; records: string }[];
}

/**
 * One proposal returned by the model. It never rewrites the scenario: it names
 * an addition, says why that addition is genuine complexity rather than
 * friction, and states what it leaves untouched.
 */
export interface ComplexityProposal {
  title: string;
  /** The change itself, concretely. */
  adds: string;
  /** Why it raises real difficulty. */
  why: string;
  /** The multimodal inputs it implies, if any. */
  inputs?: string[];
  /** How it moves the deliverable toward the bar for its type. */
  bar?: string;
  /** What it deliberately leaves as assigned. */
  keeps?: string;
}

/* ----------------------------------------------------------------- taxonomy */

/**
 * One subcategory (L2) of the use case taxonomy. `name` and `covers` are the
 * guidelines' own wording, stored verbatim. `scenarios` is hub copy: three
 * examples of what the pair looks like as a task here.
 */
export interface TaxonomySub {
  id: string;
  name: string;
  covers: string;
  scenarios: string[];
}

/** One use case (L1), with its scope check and its subcategories. */
export interface TaxonomyGroup {
  id: string;
  l1: string;
  /** The scope check the guidelines print beside the use case, verbatim. */
  scope: string;
  subs: TaxonomySub[];
}

export interface MethodStep {
  n: number;
  id: string;
  /** Short name for the step. */
  title: string;
  /** The principle, in one memorable line. */
  slogan: string;
  /**
   * What arrives from the step before and what this step does with it. The
   * method is one decision carried forward, not ten independent checks, so
   * every step except the first states its own inheritance.
   */
  inherits?: string;
  /** Two or three sentences. Never more. */
  means: string;
  /** Concrete moves, three or four bullets. */
  moves: string[];
  /** What this step hands to the next one. */
  produces: string;
  /**
   * How the principle shows up in a real task. `link` points at the Golden
   * Task section where it landed, and is omitted while the published task
   * cannot demonstrate the step correctly.
   */
  inTask: { body: string; link?: XLink };
  /** Optional hard rule worth pinning, taken from the guidelines. */
  rule?: { label: string; body: string };
  /** Which phase of the workflow the step belongs to. */
  phase: "Design" | "Leg A" | "Leg B" | "Grade";
}

/* --------------------------------------------------------------- golden task */

/**
 * The Golden Task is a build, not a gallery. Every shape below belongs to one
 * stage of that build, and `stages` is the order they happen in, so a reader
 * follows the task being made rather than reading a finished task backwards.
 */

export interface TaskMeta {
  id: string;
  serviceId: string;
  title: string;
  /** One line a reader can hold in their head. */
  oneLiner: string;
  /** The L1 use case, as the taxonomy writes it. */
  useCase: string;
  /** The L2 subcategory id, as the task sheet writes it. */
  subcategory: string;
  universe: string;
  persona: string;
  /** The one output artifact the prompt names. */
  deliverable: string;
  modalities: string[];
  status: "Golden" | "Draft";
  /** Where the source folder lives on Drive, for anyone who needs the raw files. */
  sourcePath: string;
}

/**
 * One stage of the walkthrough: a method step, and what this task did at it.
 *
 * `did` / `why` / `handoff` are the frame every stage renders in, and the
 * handoff is what makes the page a sequence rather than a list. The method's
 * own `produces` and `inherits` carry the general version; this is the one
 * sentence of it that is true for this task.
 */
export interface TaskStage {
  /** The method step this stage is. There is exactly one stage per step. */
  step: number;
  /** The section id, which every inbound XLink and the scroll spy use. */
  id: string;
  /** The heading on the page. The rail uses the method's own title instead. */
  title: string;
  /** What actually happened at this step, in this task. */
  did: string;
  /** Why the step could not be skipped here. One line. */
  why: string;
  /** What it handed to the next stage. */
  handoff: string;
}

/** One of the seven assigned parameters, and what it binds. */
export interface AssignedParameter {
  label: string;
  value: string;
  /** What this parameter decided downstream. */
  binds: string;
  /** Set where the value is a literal from the task sheet, rendered mono. */
  literal?: boolean;
}

/**
 * One service of the universe, what it is read for, and a record that actually
 * decides something. `offConnector` marks a service outside the assigned tools,
 * which is a designed cross-source dependency rather than an oversight.
 */
export interface UniverseSource {
  service: string;
  carries: string;
  decides: string;
  offConnector?: boolean;
}

/** One file the user attached to the conversation. */
export interface InputAsset {
  file: string;
  /** Path under public/. */
  src: string;
  kind: "photo" | "screenshot" | "doc" | "notes";
  /** What a person sees when they open it. */
  shows: string;
  /** The load-bearing fact it carries, or why it carries none. */
  carries: string;
  /** Why it is in the pack, the design intent. */
  /** `decides` settles a dispute, `clears` proves a charge correct, `spec` is the format. */
  role: "decides" | "clears" | "spec";
  /** The charges it speaks to. */
  charges: string[];
  /**
   * The render the golden had to make before the file could be read. Only the
   * files that arrived rotated, folded or cropped carry one, and it is the
   * clearest evidence that the media is load bearing.
   */
  straight?: { src: string; note: string };
}

export type ChargeVerdict = "dispute" | "company" | "correct";

/** One row of the resolved answer: a charge, and why it lands where it does. */
export interface ChargeRow {
  merchant: string;
  date: string;
  /** What was taken from the account. */
  charged: string;
  /** What she gets back, where anything does. */
  back?: string;
  verdict: ChargeVerdict;
  /** The FinTrack transaction id. */
  txn?: string;
  account: string;
  /** The attached file that evidences it. */
  input: string;
  /** What the records say, across both the attachment and the universe. */
  evidence: string;
  /** Why the two together land on this verdict. */
  why: string;
  /** The reason this row is hard, where it is. */
  trap?: string;
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
 * One span of the prompt worth reading closely. `quote` is matched against the
 * stored prompt at render time, so the prompt itself stays one verbatim string
 * and nothing here can quietly reword it.
 */
export interface PromptMark {
  id: string;
  /** Verbatim substring of `TaskPrompt.text`, matched once. */
  quote: string;
  label: string;
  /** What the span does for the task. */
  body: string;
  /** What breaks without it. */
  cost?: string;
}

/**
 * The one prompt. The task is single turn, so this is the whole of what the
 * agent is ever told, which is why it is annotated rather than just quoted.
 */
export interface TaskPrompt {
  /** Verbatim, typos included. */
  text: string;
  marks: PromptMark[];
  /** What the prompt deliberately leaves in the attachments and the universe. */
  withheld: { title: string; body: string }[];
}

/**
 * One numbered item of the Desired Outcome: an artifact, everything that has to
 * be inside it, and the lines of the prompt that ask for it. `askedFor` is the
 * check the whole field lives or dies on, because the agent is never handed any
 * of this.
 */
export interface OutcomeItem {
  n: number;
  /** What the item settles, in one line. */
  summary: string;
  /** The named outputs it resolves. */
  produces: string[];
  /** The item as the Draft History writes it, rendered as formatted text. */
  lines: string[];
  /** The prompt spans that ask the agent for it. Nothing is graded without one. */
  askedFor: string[];
}

/**
 * The Draft History: the Agent Objective and the Desired Outcome the task is
 * filed with. Stored the way it was written, because the wording is the thing
 * being studied.
 */
export interface DraftHistory {
  /** The Agent Objective, one entry per paragraph. */
  objective: string[];
  /** What each paragraph of the objective is doing, in the hub's words. */
  objectiveReads: { title: string; body: string }[];
  /** The Desired Outcome, one entry per numbered item. */
  outcome: OutcomeItem[];
}

export interface Rubric {
  n: number;
  text: string;
  /** The guidelines' weight: 5, 3, 1, or negative. */
  weight: number;
  category: string;
  target: string;
  polarity: "positive" | "negative";
  /** Result against the Model A run. */
  status: "present" | "not-present";
  /** One line on what actually happened. */
  observed?: string;
}

export interface Deliverable {
  file: string;
  what: string;
  /** Path under public/ when the real artifact ships with the hub. */
  src?: string;
  kind: "html" | "draft" | "folder";
}

export interface RunObservation {
  title: string;
  expected: string;
  actual: string;
  /** The criteria it costs. */
  rubrics: number[];
}

/** Leg A: the one prompt, answered once, measured against the GTFA. */
export interface ObservedRun {
  summary: string;
  /** Countable facts about the run itself. */
  stats: { k: string; v: string }[];
  /** What it did reach, so the failure reads as real rather than total. */
  kept: string[];
  observations: RunObservation[];
  /** The weight it lost, stated so the 50% bar can be checked. */
  score: { label: string; lost: string; of: string; pct: string }[];
  artifacts: Deliverable[];
}

/**
 * One steer of the golden run. Not a turn of the task: the task is single turn,
 * and this is the user simulator keeping the same person talking until the
 * model reaches the ideal answer to the prompt it already has.
 */
export interface Steer {
  n: number;
  /** The prompt, verbatim. */
  prompt: string;
  /** What was still wrong when it was sent. */
  missed: string;
  /** What it points at. */
  does: string[];
  /** What it never says. */
  avoids: string[];
  /** What the model did with it. */
  recovered: string;
}

/** Leg B: the same prompt, a new conversation, steered to the ideal answer. */
export interface GoldenRun {
  /** How the opening message relates to Leg A. */
  opening: string;
  steers: Steer[];
  /** The answer after each reply, so the climb is visible. */
  progress: { label: string; found: string; total: string; note: string }[];
  artifacts: Deliverable[];
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
 * What to show for one side of the comparison: the artifact as a reader sees
 * it, framed on the part the criterion is about. Subjective criteria are judged
 * on the render, so no markup ever reaches the screen.
 */
export interface RubricView {
  /** Path under public/. */
  src: string;
  /** The image's natural size, the units every box below is written in. */
  canvas: { w: number; h: number };
  /** The region to frame. Omitted shows the whole image. */
  focus?: Box;
  marks?: Mark[];
}

/** One side of the comparison a subjective criterion was written from. */
export interface RubricLeg {
  /** What the render does, in one line. */
  verdict: string;
  view: RubricView;
}

/**
 * A presentation criterion, plus the two outcomes it was derived from. Every
 * subjective rubric carries its own comparison, so a reader can put the two
 * renders side by side and see the difference the criterion names.
 */
export interface SubjectiveRubric {
  n: number;
  text: string;
  weight: number;
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

export interface GoldenTask {
  meta: TaskMeta;
  /** The scenario in the contributor's words, not the user's. */
  premise: string;
  /** What makes it golden. Three or four lines, no more. */
  whyGolden: string[];
  /** The ten stages, in method order. The page and the rail are both this. */
  stages: TaskStage[];

  /* step 1 */
  parameters: AssignedParameter[];
  scopeCheck: { body: string; neighbour: string };

  /* step 2 */
  universeFacts: { k: string; v: string }[];
  universeSources: UniverseSource[];

  /* step 3 */
  answer: {
    total: string;
    basis: string;
    counts: { label: string; v: string; tone: string }[];
  };
  ledger: ChargeRow[];
  mustNot: string[];
  variations: string[];
  traps: Trap[];

  /* step 4 */
  inputs: InputAsset[];
  layoutNotes: { file: string; src: string; body: string };

  /* step 5 */
  prompt: TaskPrompt;

  /* step 6 */
  draftHistory: DraftHistory;

  /* step 7 */
  run: ObservedRun;

  /* step 8 */
  rubrics: Rubric[];
  /** The shape of the block, stated so the two caps can be checked. */
  rubricShape: { label: string; value: string; note: string }[];

  /* step 9 */
  goldenRun: GoldenRun;

  /* step 10 */
  subjective: SubjectiveRubric[];
  subjectiveNote: string;
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

/* ------------------------------------------------------------------- videos */

/**
 * One screen recording in a video set. The card on the landing page is a strip
 * and carries only `title` and `covers`, so `seen` and `fix` are read beside
 * the player rather than on the homepage. Both come from the recording itself:
 * the mistake it is a reply to, and the move that replaces it.
 */
export interface VideoGuide {
  n: number;
  id: string;
  title: string;
  /** One line for the card. */
  covers: string;
  /** The mistake the recording answers. */
  seen: string;
  /** What to do instead. */
  fix: string;
  /** Running time, as m:ss. */
  duration: string;
  /** Running time in seconds, so the set can total itself. */
  seconds: number;
  /** Path under public/. */
  src: string;
  /** Poster frame, path under public/. */
  poster: string;
}

/* ------------------------------------------------------------------ changes */

/**
 * One guideline change worth surfacing on the way in. The set is not the full
 * version history: it is only the changes that alter how a task is built or
 * reviewed, which is why every entry carries `does`, the move it forces.
 */
export interface GuidelineChange {
  id: string;
  /** The date the guidelines carry, "Sep 27, 2026". */
  date: string;
  /** The version that date shipped as. */
  version: string;
  /** The change, in one line. */
  title: string;
  /**
   * What Red Shell did. Present on every entry that replaces something rather
   * than adding it, because the page is a comparison and a reader arriving
   * from the old project needs the thing being replaced named.
   */
  before?: string;
  /** What it now says. Two or three sentences. */
  body: string;
  /** What a contributor has to do differently because of it. */
  does: string;
  /**
   * Where the guidelines carry it, every section it touches, so a reader can
   * trace the rule back to the source rather than taking the hub's word.
   */
  refs: GuidelineRef[];
  /** How much of the hub it moves. `hard` is a rule a task fails without. */
  impact: "hard" | "shape";
  /**
   * Practical supporting context: worked implications, the shape of a correct
   * fit, what the rule rules out. Only where it genuinely explains the change,
   * never for the sake of having one.
   */
  detail?: { label: string; items: string[] };
  /** Renders a larger reference block under the entry. */
  embed?: "taxonomy";
  links?: XLink[];
}

/* ------------------------------------------------------------------- search */

export interface SearchEntry {
  kind:
    | "Method"
    | "Use case"
    | "Onboarding"
    | "Tool"
    | "Golden task"
    | "Pre-submit check"
    | "QC spec"
    | "FAQ"
    | "Video"
    | "Must read";
  title: string;
  hint: string;
  to: string;
  /** Extra text folded into the match, never displayed. */
  terms: string;
}
