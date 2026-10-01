import { useMemo, useState } from "react";
import { ChevronDown, MessageSquare, Paperclip } from "lucide-react";
import type { LedgerRow, Verdict } from "../data/types";
import { cx } from "../lib/util";

const verdictMeta: Record<Verdict, { label: string; chip: string; dot: string }> = {
  receipt: {
    label: "Receipt issued",
    chip: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  unconfirmed: {
    label: "Unconfirmed",
    chip: "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  "not-cancelled": {
    label: "Not cancelled",
    chip: "bg-ink-100 text-ink-600 ring-1 ring-ink-200",
    dot: "bg-ink-400",
  },
  "out-of-pool": {
    label: "Out of pool",
    chip: "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  skipped: {
    label: "Skipped",
    chip: "bg-violet-500/12 text-violet-700 ring-1 ring-violet-500/25 dark:text-violet-300",
    dot: "bg-violet-500",
  },
};

const order: (Verdict | "all")[] = [
  "all",
  "receipt",
  "unconfirmed",
  "not-cancelled",
  "out-of-pool",
  "skipped",
];

export default function Ledger({ rows }: { rows: LedgerRow[] }) {
  const [filter, setFilter] = useState<Verdict | "all">("all");
  const [open, setOpen] = useState<string | null>(rows[0]?.vendor ?? null);

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
          if (v !== "all" && !counts[v]) return null;
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
              {v !== "all" && (
                <span className={cx("h-1.5 w-1.5 rounded-full", verdictMeta[v].dot)} />
              )}
              {v === "all" ? "All vendors" : verdictMeta[v].label}
              <span className="font-mono text-[11px] text-ink-400">{counts[v]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-ink-200/70 bg-surface">
        {shown.map((r, i) => {
          const meta = verdictMeta[r.verdict];
          const isOpen = open === r.vendor;
          return (
            <div key={r.vendor} className={cx(i > 0 && "border-t border-ink-200/70")}>
              <button
                onClick={() => setOpen(isOpen ? null : r.vendor)}
                aria-expanded={isOpen}
                className={cx(
                  "flex w-full items-center gap-3 px-4 py-3.5 text-left transition sm:px-5",
                  isOpen ? "bg-raised" : "hover:bg-raised"
                )}
              >
                <span className={cx("h-2 w-2 shrink-0 rounded-full", meta.dot)} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-[13px] font-semibold text-ink-900">
                    {r.vendor}
                  </span>
                </span>
                {r.amount && (
                  <span className="hidden shrink-0 font-mono text-[12.5px] font-semibold text-ink-700 sm:block">
                    {r.amount}
                  </span>
                )}
                {typeof r.mentions === "number" && (
                  <span className="hidden shrink-0 font-mono text-[11px] text-ink-400 md:block">
                    {r.mentions} in #winddown
                  </span>
                )}
                <span className={cx("chip hidden shrink-0 sm:inline-flex", meta.chip)}>
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
                <div className="grid gap-4 border-t border-ink-200/70 bg-raised px-4 py-4 sm:grid-cols-2 sm:px-5">
                  <div>
                    <div className="mono-label mb-1.5 flex items-center gap-1.5 text-ink-400">
                      <MessageSquare size={12} /> Universe
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-ink-600">{r.universe}</p>
                  </div>
                  <div>
                    <div className="mono-label mb-1.5 flex items-center gap-1.5 text-ink-400">
                      <Paperclip size={12} /> Attachment
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-ink-600">{r.attachment}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mono-label mb-1.5 text-brand-600 dark:text-brand-300">
                      Why it lands here
                    </div>
                    <p className="text-[13px] leading-relaxed text-ink-700">{r.why}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
