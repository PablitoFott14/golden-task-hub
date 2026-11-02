import { guidelineChanges } from "./changes";
import { methodSteps } from "./method";
import type { GuidelineChange, MethodStep } from "./types";

/**
 * Urgent Alignments: the issues the client flagged in delivered tasks, given a
 * tab of their own and a band at the top of the landing page.
 *
 * **The words are the Must Read entries', read by id.** Each issue is a client
 * flag in `changes.ts`, and this file never restates its title, body, example,
 * fix or refs, so the tab and the Must Read pane cannot drift apart. What it
 * adds is presentation only:
 *
 * - `short`, a label of a word or two for the navigator and the landing band.
 * - `status`, whether the issue came back from an earlier report, is new, or
 *   is a rule the Guidelines have carried from the start, reinforced rather
 *   than introduced. Each is stated in the entry's own body; this makes it a
 *   chip.
 * - `check`, the one line to verify before submitting, as the contributor post
 *   on the same flags words it.
 * - `rejected`, only where the client rejected tasks over the issue: how many,
 *   and their share of the delivery, shown as figures on the issue, its card
 *   and its band entry. The entry's body says the same in words.
 *
 * `step` is where the issue bites in the work: the method step the entry links
 * to first. It is read off the entry's links rather than typed again.
 *
 * To retire an issue, delete its row here; its Must Read entry stays as the
 * record. A flag that turns out not to be a contributor's mistake comes out
 * entirely, its Must Read entry and its method move with it: the Oct 27 graded
 * files flag was a bundling error, and was removed that way on Nov 2. To add
 * one, write the flag into `changes.ts` first, then add its row.
 */
export interface Alignment {
  id: string;
  short: string;
  status: "came-back" | "new" | "existing-rule";
  check: string;
  rejected?: { tasks: number; share: string };
  change: GuidelineChange;
  step: MethodStep;
}

const rows: Omit<Alignment, "change" | "step">[] = [
  {
    id: "flag-genuine-complexity",
    short: "Genuine complexity",
    status: "new",
    check:
      "Every criterion grades something the request requires, and Model A still fails 30% on the scenario itself.",
    rejected: { tasks: 44, share: "30%" },
  },
  {
    id: "flag-golden-agrees",
    short: "Golden and rubric",
    status: "came-back",
    check: "You can point to where the golden satisfies each criterion.",
  },
  {
    id: "flag-link-code",
    short: "Link code",
    status: "came-back",
    check: "The prompt and the criteria have no ](http and no \\_.",
  },
  {
    id: "flag-dates",
    short: "Dates",
    status: "new",
    check:
      "The prompt states today's date, criteria use fixed dates, and no graded record expires around delivery.",
  },
  {
    id: "flag-live-dates",
    short: "Live-server dates",
    status: "new",
    check:
      "Every date the scenario searches or books on a live server, such as Duffel, is at least a month after the day you write the task.",
  },
  {
    id: "flag-thresholds",
    short: "Thresholds",
    status: "new",
    check:
      "Thresholds match between the user's rule and the rubric, and values sitting exactly on a boundary are handled.",
  },
  {
    id: "flag-dynamic-values",
    short: "Dynamic values",
    status: "existing-rule",
    check:
      "No criterion requires a live price, rate or availability as a fixed figure: each grades the value retrieved during the run, with yours as an example.",
  },
];

/** Fails the build's render check loudly rather than showing an empty card. */
function resolve(row: (typeof rows)[number]): Alignment {
  const change = guidelineChanges.find((c) => c.id === row.id);
  if (!change) throw new Error(`Urgent Alignments: no Must Read entry "${row.id}"`);
  const stepId = (change.links ?? [])
    .map((l) => /^\/#([\w-]+)$/.exec(l.to)?.[1])
    .find((id) => id && methodSteps.some((s) => s.id === id));
  const step = methodSteps.find((s) => s.id === stepId);
  if (!step) throw new Error(`Urgent Alignments: "${row.id}" links to no method step`);
  return { ...row, change, step };
}

export const alignments: Alignment[] = rows.map(resolve);

const MONTHS = "JanFebMarAprMayJunJulAugSepOctNovDec";
const dateKey = (d: string) => {
  const [m, day, y] = d.replace(",", "").split(" ");
  return Number(y) * 10000 + (MONTHS.indexOf(m) / 3 + 1) * 100 + Number(day);
};
const yearOf = (d: string) => d.slice(d.lastIndexOf(",") + 1).trim();

/**
 * Dates as the entries carry them ("Oct 27, 2026"), distinct, oldest first, in
 * one phrase with a shared year said once: "Oct 27 and Nov 1, 2026".
 */
export function dayList(dates: string[]): string {
  const ds = [...new Set(dates)].sort((a, b) => dateKey(a) - dateKey(b));
  const oneYear = ds.every((d) => yearOf(d) === yearOf(ds[0]));
  const days = oneYear ? ds.map((d, i) => (i < ds.length - 1 ? d.slice(0, d.lastIndexOf(",")) : d)) : ds;
  return days.length < 2 ? days.join("") : `${days.slice(0, -1).join(", ")} and ${days[days.length - 1]}`;
}

/** The days the client flagged them. */
export const alignmentsFlagged = dayList(alignments.map((a) => a.change.date));

/** The newest of those days alone, for the landing band, where one date fits a phone. */
export const alignmentsUpdated = alignments
  .map((a) => a.change.date)
  .reduce((n, d) => (dateKey(d) > dateKey(n) ? d : n), alignments[0]?.change.date ?? "");

export const statusLabel: Record<Alignment["status"], string> = {
  "came-back": "Came back",
  new: "New",
  "existing-rule": "Existing rule",
};
