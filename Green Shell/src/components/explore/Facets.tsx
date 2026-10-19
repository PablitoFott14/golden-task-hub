import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight, UserRound, X } from "lucide-react";
import { cx } from "../../lib/util";
import { facetLabel, facetValues, type QueryResult, type QueryState } from "../../lib/explore/query";
import type { Dataset, ExploreIndex, Facet, RangeDef } from "../../lib/explore/types";
import { money } from "../../lib/explore/ctx";

/**
 * The filters a dataset offers, each with how many records every value would
 * leave. A facet that has the same value on every record filters nothing, so
 * it is not a filter here: it is said once, under "Every record here".
 */
export function FacetPanel({
  ix,
  ds,
  st,
  res,
  onToggle,
  onClear,
  onRange,
  onDates,
  onEntity,
}: {
  ix: ExploreIndex;
  ds: Dataset;
  st: QueryState;
  res: QueryResult;
  onToggle: (facet: string, value: string) => void;
  onClear: (facet: string) => void;
  onRange: (id: string, lo: number | null, hi: number | null) => void;
  onDates: (from: string | null, to: string | null) => void;
  onEntity?: (e: number) => void;
}) {
  const bounds = useMemo(() => {
    let lo = "";
    let hi = "";
    for (const i of ds.items) {
      const d = ix.items[i].day;
      if (!d) continue;
      if (!lo || d < lo) lo = d;
      if (!hi || d > hi) hi = d;
    }
    return { lo, hi };
  }, [ix, ds]);
  const shapes = useMemo(() => {
    const out = new Map<string, string[]>();
    for (const f of ds.facets) {
      const vals = new Set<string>();
      for (const i of ds.items) {
        const v = ix.items[i].f[f.id];
        for (const x of v === undefined ? [] : Array.isArray(v) ? v : [v]) vals.add(x);
        if (vals.size > 1) break;
      }
      out.set(f.id, [...vals]);
    }
    return out;
  }, [ix, ds]);
  const constant = ds.facets.filter((f) => (shapes.get(f.id)?.length ?? 0) === 1 && !st.f[f.id]?.length);
  const live = ds.facets.filter((f) => (shapes.get(f.id)?.length ?? 0) > 1 || st.f[f.id]?.length);

  return (
    <div className="space-y-1 pb-6">
      {ds.dated && bounds.lo && (
        <Block title="Dates" active={!!(st.from || st.to)} onClear={() => onDates(null, null)} open>
          <div className="grid grid-cols-2 gap-2 px-1">
            <DateInput label="From" value={st.from ?? ""} min={bounds.lo} max={st.to ?? bounds.hi} onChange={(v) => onDates(v || null, st.to)} />
            <DateInput label="To" value={st.to ?? ""} min={st.from ?? bounds.lo} max={bounds.hi} onChange={(v) => onDates(st.from, v || null)} />
          </div>
        </Block>
      )}
      {(ds.ranges ?? []).map((r) => (
        <RangeBlock key={r.id} ix={ix} ds={ds} r={r} value={st.rg[r.id] ?? [null, null]} onChange={(lo, hi) => onRange(r.id, lo, hi)} />
      ))}
      {live.map((f) => (
        <FacetBlock
          key={f.id}
          ix={ix}
          ds={ds}
          f={f}
          selected={st.f[f.id] ?? []}
          counts={res.counts.get(f.id) ?? new Map()}
          onToggle={(v) => onToggle(f.id, v)}
          onClear={() => onClear(f.id)}
          onEntity={onEntity}
        />
      ))}
      {constant.length > 0 && (
        <div className="mx-1 mt-3 rounded-lg bg-ink-100/70 px-3 py-2.5 text-[12.5px] leading-relaxed text-ink-600 dark:bg-ink-100">
          <div className="mono-label mb-1 text-[10px] text-ink-400">Every record here</div>
          {constant.map((f) => (
            <div key={f.id}>
              <span className="text-ink-500">{f.label}:</span> <span className="font-medium text-ink-800">{facetLabel(ix, f, shapes.get(f.id)![0])}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Block({ title, children, active, onClear, open: start = true }: { title: string; children: ReactNode; active?: boolean; onClear?: () => void; open?: boolean }) {
  const [open, setOpen] = useState(start);
  return (
    <div className="border-b border-ink-200/60 py-2 last:border-0">
      <div className="flex items-center gap-1 px-1">
        <button type="button" onClick={() => setOpen(!open)} className="flex min-w-0 flex-1 items-center gap-1 rounded py-1 text-left text-[12.5px] font-semibold text-ink-800 hover:text-ink-950" aria-expanded={open}>
          {open ? <ChevronDown size={14} className="shrink-0 text-ink-400" /> : <ChevronRight size={14} className="shrink-0 text-ink-400" />}
          <span className="truncate">{title}</span>
        </button>
        {active && onClear && (
          <button type="button" onClick={onClear} className="rounded px-1.5 py-0.5 text-[11.5px] font-semibold text-brand-600 hover:bg-brand-500/10 dark:text-brand-300">
            Clear
          </button>
        )}
      </div>
      {open && <div className="mt-1">{children}</div>}
    </div>
  );
}

function DateInput({ label, value, min, max, onChange }: { label: string; value: string; min: string; max: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-[11.5px] text-ink-500">
      {label}
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 block w-full rounded-md border border-ink-200 bg-surface px-1.5 py-1 font-mono text-[12px] text-ink-800 [color-scheme:light] focus:border-brand-400 focus:outline-none dark:[color-scheme:dark]"
      />
    </label>
  );
}

function RangeBlock({ ix, ds, r, value, onChange }: { ix: ExploreIndex; ds: Dataset; r: RangeDef; value: [number | null, number | null]; onChange: (lo: number | null, hi: number | null) => void }) {
  const span = useMemo(() => {
    let lo = Infinity;
    let hi = -Infinity;
    for (const i of ds.items) {
      const v = r.get(ix.items[i]);
      if (v === null || !Number.isFinite(v)) continue;
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
    return Number.isFinite(lo) ? { lo, hi } : null;
  }, [ix, ds, r]);
  if (!span || span.lo === span.hi) return null;
  const fmt = (n: number) => (r.money ? money(n) : `${Math.round(n * 10) / 10}${r.unit ? " " + r.unit : ""}`);
  const input = (k: 0 | 1, ph: number) => (
    <input
      type="number"
      inputMode="decimal"
      value={value[k] ?? ""}
      placeholder={fmt(ph)}
      onChange={(e) => {
        const v = e.target.value === "" ? null : Number(e.target.value);
        onChange(k === 0 ? v : value[0], k === 1 ? v : value[1]);
      }}
      className="block w-full rounded-md border border-ink-200 bg-surface px-1.5 py-1 font-mono text-[12px] text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none"
      aria-label={`${r.label} ${k === 0 ? "at least" : "at most"}`}
    />
  );
  return (
    <Block title={r.label} active={value[0] !== null || value[1] !== null} onClear={() => onChange(null, null)}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 px-1 text-[11.5px] text-ink-400">
        {input(0, span.lo)}
        <span>to</span>
        {input(1, span.hi)}
      </div>
    </Block>
  );
}

function FacetBlock({
  ix,
  ds,
  f,
  selected,
  counts,
  onToggle,
  onClear,
  onEntity,
}: {
  ix: ExploreIndex;
  ds: Dataset;
  f: Facet;
  selected: string[];
  counts: Map<string, number>;
  onToggle: (v: string) => void;
  onClear: () => void;
  onEntity?: (e: number) => void;
}) {
  const [more, setMore] = useState(false);
  const [find, setFind] = useState("");
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());
  const values = useMemo(() => facetValues(ix, ds, f, counts, selected), [ix, ds, f, counts, selected]);
  const peak = Math.max(1, ...values.map((v) => v.count));
  const sel = new Set(selected);
  let shown = values;
  if (f.tree) {
    // A folder shows when its parent is open or chosen; the top level always shows.
    const visible = (v: string) => {
      const parts = v.split("/");
      for (let k = 1; k < parts.length; k++) {
        const parent = parts.slice(0, k).join("/");
        if (!openNodes.has(parent) && !sel.has(parent)) return false;
      }
      return true;
    };
    shown = [...values].sort((a, b) => a.value.localeCompare(b.value)).filter((v) => visible(v.value));
  } else if (find.trim()) {
    const q = find.trim().toLowerCase();
    shown = values.filter((v) => facetLabel(ix, f, v.value).toLowerCase().includes(q));
  }
  const limit = f.tree ? 200 : more || find ? 400 : f.top ?? (f.primary ? 8 : 6);
  const hidden = Math.max(0, shown.length - limit);
  const hasChildren = (v: string) => f.tree && values.some((x) => x.value.startsWith(v + "/"));
  return (
    <Block title={f.label} active={selected.length > 0} onClear={onClear} open={f.primary || selected.length > 0 || values.length <= 6}>
      {!f.tree && values.length > 12 && (
        <input
          type="search"
          value={find}
          onChange={(e) => setFind(e.target.value)}
          placeholder={`Find ${f.label.toLowerCase()}`}
          className="mx-1 mb-1.5 block w-[calc(100%-0.5rem)] rounded-md border border-ink-200 bg-surface px-2 py-1 text-[12.5px] text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none"
        />
      )}
      <ul className="space-y-px">
        {shown.slice(0, limit).map(({ value, count }) => {
          const on = sel.has(value);
          const depth = f.tree ? value.split("/").length - 1 : 0;
          const e = f.entity ? ix.entityByKey.get(value) : undefined;
          const label = facetLabel(ix, f, value);
          return (
            <li key={value} className="group/v relative flex items-center" style={depth ? { paddingLeft: depth * 12 } : undefined}>
              {f.tree &&
                (hasChildren(value) ? (
                  <button
                    type="button"
                    onClick={() => setOpenNodes((s) => {
                      const n = new Set(s);
                      if (n.has(value)) n.delete(value);
                      else n.add(value);
                      return n;
                    })}
                    className="grid h-5 w-4 shrink-0 place-items-center text-ink-400 hover:text-ink-700"
                    aria-label={openNodes.has(value) ? `Collapse ${label}` : `Expand ${label}`}
                  >
                    {openNodes.has(value) || sel.has(value) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                ) : (
                  <span className="w-4 shrink-0" />
                ))}
              <button
                type="button"
                onClick={() => onToggle(value)}
                aria-pressed={on}
                className={cx(
                  "relative flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 py-[3px] text-left text-[12.5px] transition",
                  on ? "bg-[oklch(0.95_0.035_var(--h))] font-semibold text-[oklch(0.34_0.1_var(--h))] dark:bg-[oklch(0.3_0.05_var(--h))] dark:text-[oklch(0.9_0.06_var(--h))]" : count ? "text-ink-700 hover:bg-ink-100" : "text-ink-400 hover:bg-ink-100"
                )}
                title={label}
              >
                <span
                  className={cx(
                    "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[4px] border",
                    on ? "border-[oklch(0.56_0.15_var(--h))] bg-[oklch(0.56_0.15_var(--h))] text-white" : "border-ink-300 bg-surface"
                  )}
                  aria-hidden
                >
                  {on && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="min-w-0 flex-1 truncate">{label}</span>
                <span className="relative shrink-0 font-mono text-[11px] tabular-nums text-ink-400">{count.toLocaleString("en-US")}</span>
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 bg-ink-200/35 dark:bg-ink-300/15" style={{ width: `${(count / peak) * 100}%` }} />
              </button>
              {e !== undefined && onEntity && (
                <button
                  type="button"
                  onClick={() => onEntity(e)}
                  className="ml-0.5 hidden h-6 w-6 shrink-0 place-items-center rounded text-ink-400 hover:bg-ink-100 hover:text-ink-800 group-hover/v:grid focus-visible:grid"
                  title={`Open ${label}'s page`}
                  aria-label={`Open ${label}'s page`}
                >
                  <UserRound size={13} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {hidden > 0 && (
        <button type="button" onClick={() => setMore(true)} className="ml-1 mt-1 text-[12px] font-semibold text-brand-600 hover:underline dark:text-brand-300">
          Show {hidden} more
        </button>
      )}
      {more && !find && values.length > (f.top ?? 8) && (
        <button type="button" onClick={() => setMore(false)} className="ml-1 mt-1 text-[12px] font-semibold text-ink-500 hover:underline">
          Show fewer
        </button>
      )}
    </Block>
  );
}

/** The filters in force, as chips that each remove one. */
export function ActiveFilters({
  ix,
  ds,
  st,
  onToggle,
  onRange,
  onDates,
  onSearch,
  onAll,
}: {
  ix: ExploreIndex;
  ds: Dataset;
  st: QueryState;
  onToggle: (facet: string, value: string) => void;
  onRange: (id: string, lo: number | null, hi: number | null) => void;
  onDates: (from: string | null, to: string | null) => void;
  onSearch: (q: string) => void;
  onAll: () => void;
}) {
  const chips: { key: string; label: string; drop: () => void }[] = [];
  if (st.q) chips.push({ key: "q", label: `Text: "${st.q}"`, drop: () => onSearch("") });
  if (st.from || st.to) chips.push({ key: "dates", label: `Dates: ${st.from ?? "start"} to ${st.to ?? "end"}`, drop: () => onDates(null, null) });
  for (const r of ds.ranges ?? []) {
    const v = st.rg[r.id];
    if (!v || (v[0] === null && v[1] === null)) continue;
    const fmt = (n: number) => (r.money ? money(n) : `${n}${r.unit ? " " + r.unit : ""}`);
    chips.push({ key: "rg" + r.id, label: `${r.label}: ${v[0] !== null ? fmt(v[0]) : "any"} to ${v[1] !== null ? fmt(v[1]) : "any"}`, drop: () => onRange(r.id, null, null) });
  }
  for (const f of ds.facets) for (const v of st.f[f.id] ?? []) chips.push({ key: f.id + v, label: `${f.label}: ${facetLabel(ix, f, v)}`, drop: () => onToggle(f.id, v) });
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.drop}
          className="inline-flex max-w-[22rem] items-center gap-1 rounded-full border border-[oklch(0.86_0.05_var(--h))] bg-[oklch(0.97_0.02_var(--h))] py-0.5 pl-2.5 pr-1.5 text-[12px] font-medium text-[oklch(0.36_0.1_var(--h))] hover:border-[oklch(0.75_0.09_var(--h))] dark:border-[oklch(0.42_0.06_var(--h))] dark:bg-[oklch(0.27_0.04_var(--h))] dark:text-[oklch(0.88_0.06_var(--h))]"
          title="Remove this filter"
        >
          <span className="truncate">{c.label}</span>
          <X size={12} className="shrink-0" aria-hidden />
        </button>
      ))}
      {chips.length > 1 && (
        <button type="button" onClick={onAll} className="px-1.5 text-[12px] font-semibold text-ink-500 hover:text-ink-900">
          Clear all
        </button>
      )}
    </div>
  );
}
