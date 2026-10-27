import { ChevronRight, Gauge, Info } from "lucide-react";
import type { Bundle } from "../../types";
import { scoreTone } from "../../lib/tone";
import { cx, shortDate } from "../../lib/util";

/**
 * Every audited attempt, newest first, each opening its full feedback over the page. The same feedback is
 * sent to the contributor's Outlier dashboard, whose Quality section lists the same attempt IDs: the note
 * says so, as the feedback PDF does.
 */
export default function Tasks({ bundle, onOpen }: { bundle: Bundle; onOpen: (attemptId: string) => void }) {
  const attempts = bundle.attempts;
  return (
    <section id="tasks" aria-labelledby="tasks-title" className="scroll-mt-28">
      <h2 id="tasks-title" className="font-display text-[22px] font-bold tracking-tight text-ink-900 sm:text-[24px]">
        Your audit feedback
      </h2>
      {attempts.length > 0 && (
        <>
          <p className="mt-1 text-[13.5px] text-ink-500">Newest first. Open one to read its full feedback.</p>
          <p className="mt-3 flex max-w-prose gap-2 text-[13.5px] leading-relaxed text-ink-700">
            <Info size={15} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" aria-hidden />
            <span>
              The same feedback is sent to your Outlier dashboard: its Quality section lists these attempt IDs, each with its score, so
              you can find any of these tasks there.
            </span>
          </p>
        </>
      )}
      {attempts.length === 0 ? (
        <div className="card mt-4 p-5 text-[14px] text-ink-600">No audited attempts yet. Each one appears here once its audit is complete.</div>
      ) : (
        <ul className="card mt-4 divide-y divide-ink-200/70 overflow-hidden">
          {attempts.map((a) => (
            <li key={a.attemptId}>
              <button
                type="button"
                onClick={() => onOpen(a.attemptId)}
                aria-haspopup="dialog"
                className="focus-ring group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-raised/60 active:bg-raised sm:px-5"
              >
                <span
                  className={cx("grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-[14px] font-bold ring-1 ring-inset", scoreTone(a.score))}
                  aria-label={`Score ${a.score}`}
                >
                  {a.score}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-[14px] font-semibold text-ink-900">{shortDate(a.auditDate)}</span>
                    <span className="text-[13px] text-ink-600">{a.verdict}</span>
                    {!a.countsTowardStatus && <span className="text-[12.5px] font-semibold text-ink-600">Earlier attempt, not counted</span>}
                    {a.corrected && <span className="text-[12.5px] font-semibold text-sky-700 dark:text-sky-300">Rescored after review</span>}
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-ink-500">
                    <span className="break-all font-mono font-medium tracking-tight">{a.attemptId}</span>
                    {a.complexity?.level && (
                      <span className="inline-flex items-center gap-1">
                        <Gauge size={12} aria-hidden /> {a.complexity.level} complexity
                      </span>
                    )}
                  </span>
                </span>
                <ChevronRight size={18} className="shrink-0 text-ink-400 transition-colors group-hover:text-ink-700" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
