/**
 * One contributor's bundle, as build/build.py writes it to data/cb/<cb-id>.json. Everything here comes
 * from the audit pipeline's own records; the page lays it out and never derives a score of its own.
 */

/** Keys as the build writes them; the labels a contributor reads ("On Track, But Don't Relax", "Top Performer") come with the status. */
export type StatusKey = "final_warning" | "high_risk" | "improvement_expected" | "on_track" | "not_evaluated";

export type Impact = "failing" | "issue" | "requirement";

export interface ScorePoint {
  attemptId: string;
  score: number;
  auditDate: string;
}

export interface Status {
  key: StatusKey;
  label: string;
  message: string;
  auditedTasks: number;
  mean: number | null;
  meanDisplay: string | null;
  scores: ScorePoint[];
  /** The latest audited task is the first pass after Final Call: High Risk whatever the average, and the next audited task has to pass too. */
  liftedFromWarning: boolean;
  /** What the next audits do to the status. `points` are the sentences of `detail`, each with the status it leads to. */
  path: { headline: string; detail?: string | null; points?: { text: string; to: StatusKey | null }[] } | null;
}

export interface Ref {
  id: string;
  kind: "guidelines" | "hub";
  title: string;
  requirement?: string | null;
  lookFor: string;
  url: string;
  route?: string;
}

export interface CardRef {
  id: string;
  lookFor?: string;
}

export interface Standard {
  source: "spec" | "guidelines" | "appendix";
  where: string;
  quote: string;
}

export interface WrittenEvidence {
  attemptId: string;
  quote: string;
  impact: Impact;
  section: string;
  item: number | null;
  /** The Guidelines entry (a key of Bundle.refs) whose section holds the requirement. */
  guideline?: string | null;
}

export interface AutoEvidence {
  attemptId: string;
  impact: Impact;
  findings: { label: string; text: string; impact: Impact; guideline?: string | null }[];
}

export interface Card {
  id: string;
  rank: number;
  category: { id: string; label: string; group: string };
  issue: string;
  observed: string;
  todo: string[];
  standard: Standard[];
  impact: Impact;
  frequency: { attempts: number; of: number; failing: number };
  evidence: (WrittenEvidence | AutoEvidence)[];
  refs: CardRef[];
  fromImprovements?: string[];
}

export interface Block {
  t: "p" | "q" | "dim";
  text: string;
}

export interface FeedbackItem {
  n: number;
  title: string;
  dimension: string | null;
  qcDimension: string | null;
  category: string | null;
  tags: string[];
  blocks: Block[];
}

export interface FeedbackSection {
  name: "WHAT IS SOLID" | "QC RATINGS" | "NON-FAILING ISSUES" | "EXTRA";
  kind: "solid" | "failing" | "nonfailing" | "extra";
  intro: Block[];
  items: FeedbackItem[];
}

export interface StructuredFeedback {
  attemptLine: string | null;
  failingLine: string | null;
  lead: Block[];
  sections: FeedbackSection[];
  closing: string | null;
}

export interface Attempt {
  attemptId: string;
  auditDate: string;
  score: number;
  auditScore: number;
  corrected: boolean;
  verdict: string;
  countsTowardStatus: boolean;
  supersededBy: string | null;
  complexity: { level: string; meetsBar: boolean | null } | null;
  failingDimensions: string[];
  feedback: { raw: string; structured: StructuredFeedback | null };
}

export interface Bundle {
  version: number;
  cbId: string;
  generatedAt: string;
  /** 2: the compact layout, for whoever config.json's newCardLayout covers ("all", or the CB IDs it lists). */
  layout?: number;
  status: Status;
  priorities: {
    mode: "written" | "automatic" | "none";
    note: string | null;
    auditedAttempts: number;
    cards: Card[];
    improvementNotes: string[];
  };
  attempts: Attempt[];
  resources: {
    guidelinesUrl: string;
    guidelinesVersion: string | null;
    specVersion: string;
    reread: { id: string; count: number }[];
    hub: { id: string; count: number }[];
    core: { spec: string[]; updates: string[]; hub: string[] };
  };
  refs: Record<string, Ref>;
}

export function isWritten(e: WrittenEvidence | AutoEvidence): e is WrittenEvidence {
  return (e as WrittenEvidence).quote !== undefined;
}

/** What the page asks the dashboard to do when a card points at a passage of an attempt's feedback. */
export interface Focus {
  attemptId: string;
  quote?: string;
  nonce: number;
}
