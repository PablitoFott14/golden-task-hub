import { type ReactNode, useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, FileSearch, Paperclip } from "lucide-react";
import type { ChargeRow, ChargeVerdict } from "../data/types";
import { cx } from "../lib/util";

/**
 * The resolved answer, charge by charge.
 *
 * A row is open by default rather than collapsed, because the evidence is the
 * point: the verdict on its own is just a number, and what the hub is showing
 * is how a verdict is reached from two records that have to agree.
 */
const verdictMeta: Record<ChargeVerdict, { label: string; chip: string; dot: string }> = {
  dispute: {
    label: "Dispute",
    chip: "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  company: {
    label: "Company account",
    chip: "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  correct: {
    label: "Correct",
    chip: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
};

const order: (ChargeVerdict | "all")[] = ["all", "dispute", "company", "correct"];

export default function Ledger({ rows }: { rows: ChargeRow[] }) {
  const [filter, setFilter] = useState<ChargeVerdict | "all">("all");
  const [open, setOpen] = useState<string | null>(rows[0] ? key(rows[0]) : null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const r of rows) c[r.verdict] = (c[r.verdict] ?? 0) + 1;
    return c;
  }, [rows]);

  const shown = filter === "all" ? rows : rows.filter((r) => r.verdict === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {order.map((v) => {
          const active = filter === v;
          return (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition",
                active
                  ? "border-brand-400 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                  : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300"
              )}
            >
              {v !== "all" && <span className={cx("h-1.5 w-1.5 rounded-full", verdictMeta[v].dot)} />}
              {v === "all" ? "All charges" : verdictMeta[v].label}
              <span className="font-mono text-[11px] text-ink-400">{counts[v] ?? 0}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-ink-200/70 bg-surface">
        {shown.map((r, i) => {
          const meta = verdictMeta[r.verdict];
          const k = key(r);
          const isOpen = open === k;
          return (
            <div key={k} className={cx(i > 0 && "border-t border-ink-200/70")}>
              <button
                onClick={() => setOpen(isOpen ? null : k)}
                aria-expanded={isOpen}
                className={cx(
                  "flex w-full items-center gap-3 px-4 py-3.5 text-left transition sm:px-5",
                  isOpen ? "bg-raised" : "hover:bg-raised"
                )}
              >
                <span className={cx("h-2 w-2 shrink-0 rounded-full", meta.dot)} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-bold text-ink-900">
                    {r.merchant}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11.5px] text-ink-400">{r.date}</span>
                </span>
                <span className="hidden shrink-0 text-right sm:block">
                  <span className="block font-mono text-[12.5px] font-semibold text-ink-700">
                    {r.charged}
                  </span>
                  <span
                    className={cx(
                      "mt-0.5 block font-mono text-[11.5px]",
                      r.back ? "font-semibold text-rose-600 dark:text-rose-300" : "text-ink-400"
                    )}
                  >
                    {r.back ? `${r.back} back` : "no action"}
                  </span>
                </span>
                <span className={cx("chip hidden shrink-0 md:inline-flex", meta.chip)}>
                  {meta.label}
                </span>
                <ChevronDown
                  size={15}
                  className={cx(
                    "shrink-0 text-ink-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <div className="border-t border-ink-200/70 bg-raised px-4 py-4 sm:px-5">
                  <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-3">
                    <Field k="Transaction">{r.txn ?? "not in the statement"}</Field>
                    <Field k="Account">{r.account}</Field>
                    <Field k="Attachment">{r.input}</Field>
                  </dl>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div>
                      <div className="mono-label mb-1.5 flex items-center gap-1.5 text-ink-400">
                        <Paperclip size={12} /> What the records say
                      </div>
                      <p className="text-[12.5px] leading-relaxed text-ink-600">{r.evidence}</p>
                    </div>
                    <div>
                      <div className="mono-label mb-1.5 flex items-center gap-1.5 text-brand-600 dark:text-brand-300">
                        <FileSearch size={12} /> Why it lands here
                      </div>
                      <p className="text-[12.5px] leading-relaxed text-ink-700">{r.why}</p>
                    </div>
                  </div>

                  {r.trap && (
                    <div className="mt-4 flex gap-2.5 rounded-lg border border-amber-300/60 bg-amber-50/60 px-3.5 py-2.5 dark:border-amber-500/30 dark:bg-amber-500/10">
                      <AlertTriangle
                        size={13}
                        className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300"
                      />
                      <div className="min-w-0">
                        <div className="mono-label mb-0.5 text-amber-700 dark:text-amber-300">
                          What makes it hard
                        </div>
                        <p className="text-[12.5px] leading-relaxed text-ink-700">{r.trap}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Two charges share a merchant name, so the key has to carry the date too. */
function key(r: ChargeRow) {
  return `${r.merchant} ${r.date}`;
}

function Field({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="mono-label mb-0.5 text-ink-400">{k}</dt>
      <dd className="break-all font-mono text-[12px] text-ink-700">{children}</dd>
    </div>
  );
}
