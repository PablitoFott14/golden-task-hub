import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ExternalLink, GitCompare, X } from "lucide-react";
import type { RubricLeg, SubjectiveRubric } from "../data/types";
import { asset, cx } from "../lib/util";
import { Ticks } from "./Rubrics";

/**
 * One side of the comparison. Leg A is the observed run and Leg B the golden,
 * marked by the letter and the label as well as the tone, never by colour on
 * its own.
 */
function Leg({
  leg,
  side,
  file,
}: {
  leg: RubricLeg;
  side: "A" | "B";
  file?: string;
}) {
  const isA = side === "A";
  return (
    <div
      className={cx(
        "flex min-w-0 flex-col rounded-xl border p-4",
        isA
          ? "border-rose-300/50 bg-rose-50/40 dark:border-rose-500/25 dark:bg-rose-500/10"
          : "border-emerald-300/50 bg-emerald-50/40 dark:border-emerald-500/25 dark:bg-emerald-500/10"
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cx(
            "grid h-5 w-5 shrink-0 place-items-center rounded font-mono text-[10px] font-bold text-white",
            isA ? "bg-rose-600" : "bg-emerald-600"
          )}
        >
          {side}
        </span>
        <span
          className={cx(
            "mono-label",
            isA ? "text-rose-700 dark:text-rose-300" : "text-emerald-700 dark:text-emerald-300"
          )}
        >
          Leg {side}, {isA ? "the observed run" : "the golden"}
        </span>
        {file && (
          <a
            href={asset(file)}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1 rounded-md border border-ink-200/80 bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
          >
            Open <ExternalLink size={10} />
          </a>
        )}
      </div>

      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-700">{leg.verdict}</p>

      <pre
        className={cx(
          "mt-3 overflow-x-auto rounded-lg border border-ink-200/70 bg-surface p-3 font-mono leading-relaxed text-ink-600",
          leg.form === "code" ? "text-[11px]" : "text-[11.5px]"
        )}
      >
        {leg.excerpt}
      </pre>
    </div>
  );
}

/**
 * The subjective block. Each criterion is one row, and the OT versus GT
 * comparison it was written from lives behind a disclosure so ten of them fit
 * on the page without scrolling past a wall of excerpts.
 */
export default function SubjectiveRubrics({ rubrics }: { rubrics: SubjectiveRubric[] }) {
  const [open, setOpen] = useState<number[]>([]);
  const allOpen = open.length === rubrics.length;

  const toggle = (n: number) =>
    setOpen((o) => (o.includes(n) ? o.filter((x) => x !== n) : [...o, n]));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpen(allOpen ? [] : rubrics.map((r) => r.n))}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
        >
          <GitCompare size={13} />
          {allOpen ? "Collapse every comparison" : "Expand every comparison"}
        </button>
        <span className="text-[12.5px] text-ink-400">
          Ten criteria. Open one to see the two artifacts it was written from.
        </span>
      </div>

      <ol className="space-y-2">
        {rubrics.map((s) => {
          const on = open.includes(s.n);
          const failed = s.status === "not-present";
          return (
            <li key={s.n} className="card overflow-hidden">
              <button
                onClick={() => toggle(s.n)}
                aria-expanded={on}
                className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-raised"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-mono text-[11px] font-bold text-brand-700 dark:text-brand-300">
                  {s.n}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-relaxed text-ink-800">
                    <Ticks text={s.text} />
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="chip bg-ink-100 font-mono text-ink-600 ring-1 ring-ink-200">
                      {s.artifact}
                    </span>
                    <span
                      className={cx(
                        "chip",
                        failed
                          ? "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300"
                          : "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300"
                      )}
                    >
                      {failed ? <X size={11} /> : <Check size={11} />}
                      {failed ? "Model A failed" : "Model A passed"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-ink-400">
                      <GitCompare size={11} />
                      {on ? "Hide the comparison" : "OT vs GT"}
                    </span>
                  </span>
                </span>

                <ChevronDown
                  size={16}
                  aria-hidden
                  className={cx(
                    "mt-0.5 shrink-0 text-ink-400 transition-transform duration-200",
                    on && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-ink-200/70 p-4">
                      <div className="rounded-lg bg-raised px-3.5 py-2.5">
                        <div className="mono-label mb-1 text-ink-400">What it checks</div>
                        <p className="text-[12.5px] leading-relaxed text-ink-700">{s.asks}</p>
                      </div>

                      <div className="mt-3 grid gap-3 lg:grid-cols-2">
                        <Leg leg={s.legA} side="A" file={s.files?.ot} />
                        <Leg leg={s.legB} side="B" file={s.files?.gt} />
                      </div>

                      <div className="mt-3 border-l-2 border-brand-400/60 pl-3">
                        <div className="mono-label mb-1 text-brand-600 dark:text-brand-300">
                          Why this became a criterion
                        </div>
                        <p className="text-[12.5px] leading-relaxed text-ink-600">{s.derived}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
