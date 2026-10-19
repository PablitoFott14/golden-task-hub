import { useMemo, useState } from "react";
import { cx } from "../../lib/util";
import { money } from "../../lib/explore/ctx";
import { fmtDay, fmtMonth } from "../../lib/explore/time";
import type { Dataset, ExploreIndex } from "../../lib/explore/types";

/**
 * The few charts that make a dataset legible at a glance, each drawn from the
 * records the filters leave and each clickable back into a filter: money in
 * and out by month with the categories and merchants behind it, a health
 * metric day by day, an account's daily insights.
 */

export function MoneyChart({ ix, rows, onFacet }: { ix: ExploreIndex; rows: number[]; onFacet: (facet: string, value: string) => void }) {
  const model = useMemo(() => {
    const months = new Map<string, { inn: number; out: number }>();
    const cats = new Map<string, number>();
    const merch = new Map<string, number>();
    let inn = 0;
    let out = 0;
    for (const i of rows) {
      const it = ix.items[i];
      if (it.amount === null || !it.day) continue;
      const m = it.day.slice(0, 7);
      const b = months.get(m) ?? { inn: 0, out: 0 };
      if (it.amount > 0) {
        b.inn += it.amount;
        inn += it.amount;
      } else {
        b.out -= it.amount;
        out -= it.amount;
        const c = String(it.f.category ?? "");
        if (c) cats.set(c, (cats.get(c) ?? 0) - it.amount);
        const mk = (it.f.merchant as string[] | undefined)?.[0];
        if (mk) merch.set(mk, (merch.get(mk) ?? 0) - it.amount);
      }
      months.set(m, b);
    }
    const list = [...months].sort((a, b) => a[0].localeCompare(b[0]));
    return {
      list,
      peak: Math.max(1, ...list.map(([, v]) => Math.max(v.inn, v.out))),
      cats: [...cats].sort((a, b) => b[1] - a[1]).slice(0, 6),
      merch: [...merch].sort((a, b) => b[1] - a[1]).slice(0, 6),
      inn,
      out,
    };
  }, [ix, rows]);
  if (!model.list.length) return null;
  const top = Math.max(1, ...model.cats.map((c) => c[1]), ...model.merch.map((m) => m[1]));
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <div className="mb-2 flex items-baseline gap-3 text-[12px]">
          <span className="mono-label text-[10px] text-ink-400">By month</span>
          <span className="text-emerald-700 dark:text-emerald-300">In {money(model.inn)}</span>
          <span className="text-rose-700 dark:text-rose-300">Out {money(model.out)}</span>
        </div>
        <div className="flex h-24 items-end gap-1">
          {model.list.map(([m, v]) => (
            <div key={m} className="flex min-w-0 flex-1 flex-col items-center gap-1" title={`${fmtMonth(m)}: in ${money(v.inn)}, out ${money(v.out)}`}>
              <div className="flex h-20 w-full items-end justify-center gap-px">
                <span className="w-1/2 max-w-[14px] rounded-t bg-emerald-500/70" style={{ height: `${(v.inn / model.peak) * 100}%` }} />
                <span className="w-1/2 max-w-[14px] rounded-t bg-rose-500/70" style={{ height: `${(v.out / model.peak) * 100}%` }} />
              </div>
              <span className="truncate text-[10px] text-ink-400">{fmtMonth(m).slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>
      <Bars title="Money out by category" list={model.cats.map(([k, v]) => ({ key: k, label: k, value: v }))} top={top} onPick={(k) => onFacet("category", k)} />
      <Bars title="Biggest payees" list={model.merch.map(([k, v]) => ({ key: k, label: ix.entities[ix.entityByKey.get(k) ?? -1]?.name ?? k, value: v }))} top={top} onPick={(k) => onFacet("merchant", k)} />
    </div>
  );
}

function Bars({ title, list, top, onPick }: { title: string; list: { key: string; label: string; value: number }[]; top: number; onPick: (k: string) => void }) {
  if (!list.length) return null;
  return (
    <div>
      <div className="mono-label mb-2 text-[10px] text-ink-400">{title}</div>
      <ul className="space-y-1">
        {list.map((x) => (
          <li key={x.key}>
            <button type="button" onClick={() => onPick(x.key)} className="group relative flex w-full items-center gap-2 overflow-hidden rounded px-1.5 py-0.5 text-left text-[12px] hover:bg-ink-100" title={`Filter to ${x.label}`}>
              <span aria-hidden className="absolute inset-y-0 left-0 rounded bg-rose-500/10" style={{ width: `${(x.value / top) * 100}%` }} />
              <span className="relative min-w-0 flex-1 truncate text-ink-700 group-hover:text-ink-900">{x.label}</span>
              <span className="relative shrink-0 font-mono tabular-nums text-ink-500">{money(x.value)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const HEALTH_METRICS: { id: string; label: string; fmt: (n: number) => string }[] = [
  { id: "steps", label: "Steps", fmt: (n) => Math.round(n).toLocaleString("en-US") },
  { id: "asleep", label: "Asleep", fmt: (n) => `${Math.floor(n / 60)}h ${String(Math.round(n % 60)).padStart(2, "0")}m` },
  { id: "rhr", label: "Resting heart rate", fmt: (n) => `${Math.round(n)} bpm` },
  { id: "hrv", label: "Heart rate variability", fmt: (n) => `${Math.round(n)} ms` },
  { id: "efficiency", label: "Sleep efficiency", fmt: (n) => `${Math.round(n)}%` },
  { id: "azm", label: "Active zone minutes", fmt: (n) => `${Math.round(n)} min` },
  { id: "exercise", label: "Exercise", fmt: (n) => `${Math.round(n)} min` },
];

/** Each metric the days carry, day by day, the filtered days in colour. */
export function HealthChart({ ix, ds, rows, onOpen }: { ix: ExploreIndex; ds: Dataset; rows: number[]; onOpen: (i: number) => void }) {
  const days = useMemo(() => [...ds.items].sort((a, b) => ((ix.items[a].day ?? "") < (ix.items[b].day ?? "") ? -1 : 1)), [ix, ds]);
  const on = useMemo(() => new Set(rows), [rows]);
  const metrics = HEALTH_METRICS.filter((m) => days.filter((i) => ix.items[i].n[m.id] !== undefined).length > days.length * 0.3).slice(0, 4);
  const [hover, setHover] = useState<number | null>(null);
  if (!metrics.length || days.length < 3) return null;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => {
        const vals = days.map((i) => ix.items[i].n[m.id]);
        const present = vals.filter((v): v is number => v !== undefined);
        const lo = Math.min(...present);
        const hi = Math.max(...present);
        const shown = rows.map((i) => ix.items[i].n[m.id]).filter((v): v is number => v !== undefined);
        const avg = shown.length ? shown.reduce((a, b) => a + b, 0) / shown.length : null;
        const W = 300;
        const H = 54;
        const bw = W / days.length;
        return (
          <div key={m.id} className="rounded-xl border border-ink-200/70 bg-surface p-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[12px] font-semibold text-ink-700">{m.label}</span>
              <span className="shrink-0 font-mono text-[11.5px] text-ink-500">{hover !== null && vals[hover] !== undefined ? m.fmt(vals[hover]!) : avg !== null ? `avg ${m.fmt(avg)}` : ""}</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-1.5 block h-14 w-full cursor-pointer" onMouseLeave={() => setHover(null)} role="img" aria-label={`${m.label} per day`}>
              {vals.map((v, k) => {
                if (v === undefined) return null;
                const h = hi === lo ? H / 2 : 4 + ((v - lo) / (hi - lo)) * (H - 6);
                const i = days[k];
                return (
                  <rect
                    key={k}
                    x={k * bw}
                    width={Math.max(1, bw * 0.8)}
                    y={H - h}
                    height={h}
                    onMouseEnter={() => setHover(k)}
                    onClick={() => onOpen(i)}
                    className={cx(on.has(i) ? "fill-[oklch(0.6_0.14_var(--h))] dark:fill-[oklch(0.72_0.12_var(--h))]" : "fill-ink-200 dark:fill-ink-300/50", hover === k && "fill-ink-900 dark:fill-white")}
                  />
                );
              })}
            </svg>
            <div className="mt-1 h-3.5 truncate text-[10.5px] text-ink-400">{hover !== null && ix.items[days[hover]].day ? fmtDay(ix.items[days[hover]].day!) : `${m.fmt(lo)} to ${m.fmt(hi)}`}</div>
          </div>
        );
      })}
    </div>
  );
}

/** Daily account insights, one line per metric. */
export function InsightChart({ ix, rows }: { ix: ExploreIndex; rows: number[] }) {
  const series = useMemo(() => {
    const by = new Map<string, { day: string; v: number }[]>();
    for (const i of rows) {
      const it = ix.items[i];
      const m = String(it.f.metric ?? "");
      if (!m || !it.day || it.n.value === undefined) continue;
      if (!by.has(m)) by.set(m, []);
      by.get(m)!.push({ day: it.day, v: it.n.value });
    }
    for (const l of by.values()) l.sort((a, b) => a.day.localeCompare(b.day));
    return [...by];
  }, [ix, rows]);
  if (!series.length) return null;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {series.map(([m, pts]) => {
        const lo = Math.min(...pts.map((p) => p.v));
        const hi = Math.max(...pts.map((p) => p.v));
        const W = 200;
        const H = 48;
        const path = pts.map((p, k) => `${k ? "L" : "M"}${(k / Math.max(1, pts.length - 1)) * W},${H - 3 - (hi === lo ? 0.5 : (p.v - lo) / (hi - lo)) * (H - 6)}`).join(" ");
        return (
          <div key={m} className="rounded-xl border border-ink-200/70 bg-surface p-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[12px] font-semibold text-ink-700">{m}</span>
              <span className="font-mono text-[11.5px] text-ink-500">{pts[pts.length - 1].v.toLocaleString("en-US")}</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-1.5 block h-12 w-full" role="img" aria-label={`${m} over time`}>
              <path d={path} fill="none" strokeWidth={2} vectorEffect="non-scaling-stroke" className="stroke-[oklch(0.6_0.14_var(--h))]" />
            </svg>
            <div className="mt-1 flex justify-between text-[10.5px] text-ink-400">
              <span>{pts[0].day.slice(5)}</span>
              <span>{pts[pts.length - 1].day.slice(5)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
