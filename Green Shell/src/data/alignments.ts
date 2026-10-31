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
 * - `status`, whether the issue came back from an earlier report or is new.
 *   Both are stated in the entry's own body; this makes them a chip.
 * - `check`, the one line to verify before submitting, as the contributor post
 *   on the same flags words it.
 *
 * `step` is where the issue bites in the work: the method step the entry links
 * to first. It is read off the entry's links rather than typed again.
 *
 * To retire an issue, delete its row here; its Must Read entry stays as the
 * record. To add one, write the flag into `changes.ts` first, then add its row.
 */
export interface Alignment {
  id: string;
  short: string;
  status: "came-back" | "new";
  check: string;
  change: GuidelineChange;
  step: MethodStep;
}

const rows: Omit<Alignment, "change" | "step">[] = [
  {
    id: "flag-graded-files",
    short: "Graded files",
    status: "came-back",
    check: "Every file a criterion grades is in the task inputs.",
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
    id: "flag-thresholds",
    short: "Thresholds",
    status: "new",
    check:
      "Thresholds match between the user's rule and the rubric, and values sitting exactly on a boundary are handled.",
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

/** The day the client flagged them, as the entries carry it. */
export const alignmentsFlagged = alignments[0]?.change.date ?? "";

export const statusLabel: Record<Alignment["status"], string> = {
  "came-back": "Came back",
  new: "New",
};
