import { useMemo, useState } from "react";
import { Check, Minus, Plus, X } from "lucide-react";
import type { Rubric } from "../data/types";
import { cx } from "../lib/util";

/** Renders `backticked` spans as mono chips, which is how the criteria are written. */
export function Ticks({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") && p.endsWith("`") ? (
          <code
            key={i}
            className="rounded border border-brand-200 bg-brand-50 px-1 py-0.5 font-mono text-[0.86em] font-semibold text-brand-800 dark:border-brand-500/40 dark:bg-brand-500/15 dark:text-brand-200"
          >
            {p.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

type Filter = "all" | "failed" | "passed" | "negative";

const filters: { k: Filter; label: string }[] = [
  { k: "all", label: "All criteria" },
  { k: "failed", label: "Model A failed" },
  { k: "passed", label: "Model A passed" },
  { k: "negative", label: "Negatives" },
];

/** A positive rated Not Present, or a negative rated Present, is a failure. */
function failed(r: Rubric) {
  return r.polarity === "positive" ? r.status === "not-present" : r.status === "present";
}

export default function Rubrics({ rubrics }: { rubrics: Rubric[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: rubrics.length,
      failed: rubrics.filter(failed).length,
      passed: rubrics.filter((r) => !failed(r)).length,
      negative: rubrics.filter((r) => r.polarity === "negative").length,
    }),
    [rubrics]
  );

  const shown = rubrics.filter((r) => {
    if (filter === "failed") return failed(r);
    if (filter === "passed") return !failed(r);
    if (filter === "negative") return r.polarity === "negative";
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={cx(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition",
              filter === f.k
                ? "border-brand-400 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300"
            )}
          >
            {f.label}
            <span className="font-mono text-[11px] text-ink-400">{counts[f.k]}</span>
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-3">
        {shown.map((r) => {
          const isFail = failed(r);
          return (
            <li
              key={r.n}
              className={cx(
                "rounded-2xl border bg-surface p-4 transition sm:p-5",
                isFail
                  ? "border-rose-300/60 dark:border-rose-500/25"
                  : "border-emerald-300/60 dark:border-emerald-500/25"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cx(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-[11px] font-bold",
                    r.polarity === "negative"
                      ? "bg-rose-500/12 text-rose-700 dark:text-rose-300"
                      : "bg-brand-500/10 text-brand-700 dark:text-brand-300"
                  )}
                  title={r.polarity === "negative" ? "Negative criterion" : "Positive criterion"}
                >
                  {r.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] leading-relaxed text-ink-800">
                    <Ticks text={r.text} />
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
                      {r.polarity === "negative" ? (
                        <Minus size={11} className="text-rose-500" />
                      ) : (
                        <Plus size={11} className="text-emerald-600" />
                      )}
                      {r.category}
                    </span>
                    <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
                      {r.target}
                    </span>
                    <span
                      className={cx(
                        "chip",
                        isFail
                          ? "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300"
                          : "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300"
                      )}
                    >
                      {isFail ? <X size={11} /> : <Check size={11} />}
                      {isFail ? "Model A failed" : "Model A passed"}
                    </span>
                  </div>

                  {r.observed && (
                    <p className="mt-3 border-l-2 border-ink-200 pl-3 text-[12.5px] leading-relaxed text-ink-500">
                      {r.observed}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
