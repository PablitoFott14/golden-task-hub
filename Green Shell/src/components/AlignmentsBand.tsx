import { Link } from "react-router-dom";
import { ArrowRight, BookMarked, ChevronRight, RotateCcw, ShieldAlert, Sparkles } from "lucide-react";
import { alignments, alignmentsUpdated, statusLabel, type Alignment } from "../data/alignments";
import { cx } from "../lib/util";

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** Whole rows only, so every label keeps to one line: six fit one row from
 *  `xl` (about 1200px, which `lg` lacks), eight two rows of four from `lg`. */
const issueCols: Record<number, string> = {
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-3 lg:grid-cols-5",
  6: "sm:grid-cols-3 xl:grid-cols-6",
  8: "sm:grid-cols-2 lg:grid-cols-4",
};

/** The status under each label, in the tab's colours: rose came back, sky
 *  new, amber a rule the Guidelines have carried from the start. */
const statusText: Record<Alignment["status"], string> = {
  "came-back": "text-rose-700 dark:text-rose-300",
  new: "text-sky-700 dark:text-sky-300",
  "existing-rule": "text-amber-700 dark:text-amber-300",
};
const statusIcon: Record<Alignment["status"], typeof RotateCcw> = {
  "came-back": RotateCcw,
  new: Sparkles,
  "existing-rule": BookMarked,
};

/**
 * The Urgent Alignments band, the first block under the nav on the landing
 * page, above the update notice and the hero.
 *
 * It is the one thing on the page that has to be seen before anything else, so
 * it sits first and every issue in it is a direct link to that issue on the
 * tab. Filled rose, the hub's must-read signal, and a solid button, so it reads
 * as louder than the notice bar under it, which is a row of text.
 *
 * **It stays short on a phone.** The issue links and the button show from `sm`
 * up; below that the band is its headline alone, which is itself the link,
 * because every extra row here pushes the hero, and the Universe Viewers card
 * in it, further down the first screen. At 390 by 844 that card's button still
 * ends inside the first screen.
 */
export default function AlignmentsBand() {
  if (alignments.length === 0) return null;
  const n = WORDS[alignments.length] ?? String(alignments.length);
  return (
    <section
      aria-label="Urgent Alignments"
      className="relative border-b border-rose-500/25 bg-gradient-to-r from-rose-500/15 via-rose-500/10 to-rose-500/5"
    >
      <div className="wrap py-3 sm:py-4">
        {/* Two rows: the headline and the button, then the issues across the
            full width, so every issue keeps its label on one line. */}
        <div className="flex items-center gap-4">
          {/* The headline is the link into the tab, so on a phone, where the
              issue links and the button are left out, the band is still one tap. */}
          <Link to="/alignments" className="group flex min-w-0 flex-1 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-600 text-white shadow-soft">
              <ShieldAlert size={19} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="mono-label block text-rose-700 dark:text-rose-300">
                Urgent Alignments · {alignmentsUpdated}
              </span>
              <span className="block font-display text-[16px] font-bold leading-snug text-ink-900 sm:text-[17px]">
                The client flagged {n} issues. Avoid them in every task.
              </span>
            </span>
            <ChevronRight size={20} className="shrink-0 text-rose-600 sm:hidden dark:text-rose-300" aria-hidden />
          </Link>
          <Link
            to="/alignments"
            className="btn hidden shrink-0 bg-rose-600 text-white shadow-soft hover:bg-rose-700 sm:inline-flex"
          >
            Open Urgent Alignments <ArrowRight size={15} />
          </Link>
        </div>

        <ol className={cx("mt-3 hidden gap-2 sm:grid", issueCols[alignments.length] ?? "sm:grid-cols-3")}>
          {alignments.map((a, i) => {
            const Icon = statusIcon[a.status];
            return (
              <li key={a.id}>
                <Link
                  to={`/alignments#${a.id}`}
                  title={a.change.title}
                  className="flex h-full items-center gap-2 rounded-xl border border-rose-500/25 bg-surface/80 px-2.5 py-2 transition hover:-translate-y-px hover:border-rose-400 hover:shadow-soft"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-rose-600 font-mono text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-semibold leading-tight text-ink-800">
                      {a.short}
                    </span>
                    <span
                      className={cx(
                        "mt-0.5 flex flex-wrap items-center gap-x-1 text-[10.5px] font-semibold",
                        statusText[a.status]
                      )}
                    >
                      <Icon size={10} />
                      {statusLabel[a.status]}
                      {a.rejected && (
                        <span className="font-bold text-rose-700 dark:text-rose-300">
                          · {a.rejected.tasks} rejected, {a.rejected.share}
                        </span>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
