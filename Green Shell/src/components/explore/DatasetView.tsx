import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { BarChart3, Search, SlidersHorizontal, X } from "lucide-react";
import { cx } from "../../lib/util";
import { emptyState, groupRows, isFiltered, readState, runQuery, terms, writeState, type QueryState, type Row } from "../../lib/explore/query";
import type { Dataset, ExploreIndex } from "../../lib/explore/types";
import { useExplore } from "./context";
import { ActiveFilters, FacetPanel } from "./Facets";
import { TimeStrip } from "./TimeStrip";
import { VirtualList } from "./VirtualList";
import { GroupHead, HEAD_HEIGHT, ItemRow, TableHead, TableRow, isTable, rowHeight, tableMinWidth, tableCols } from "./Rows";
import { HealthChart, InsightChart, MoneyChart } from "./Charts";

/**
 * One dataset as a workspace: search, sort, group, the filters with their
 * counts, the records over time, the charts that suit it, and the list. Its
 * whole state is in the address, so a filtered view can be shared or bookmarked.
 */
export function DatasetView({
  ix,
  ds,
  onActivate,
  showServer,
  aside,
}: {
  ix: ExploreIndex;
  ds: Dataset;
  /** What opening a row does, when it is not opening the record. */
  onActivate?: (i: number) => void;
  showServer?: boolean;
  /** Extra content at the foot of the filters column. */
  aside?: ReactNode;
}) {
  const api = useExplore();
  const st = useMemo(() => readState(api.sp, ds), [api.sp, ds]);
  const [q, setQ] = useState(st.q);
  const typed = useRef(false);
  useEffect(() => {
    if (!typed.current) setQ(st.q);
    typed.current = false;
  }, [st.q, ds.key]);
  const dq = useDeferredValue(q);
  const live: QueryState = useMemo(() => ({ ...st, q: dq }), [st, dq]);
  const res = useMemo(() => runQuery(ix, ds, live), [ix, ds, live]);
  const ts = useMemo(() => terms(dq), [dq]);
  const rows: Row[] = useMemo(() => groupRows(ix, ds, res.rows, live.group, live.sort), [ix, ds, res.rows, live.group, live.sort]);
  const [cursor, setCursor] = useState(-1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(true);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const selectedKey = api.sp.get("r");

  const set = useCallback((next: QueryState) => api.go((p) => writeState(p, ds, next), { push: false }), [api, ds]);
  // The search box writes to the address a moment after typing stops.
  useEffect(() => {
    if (q === st.q) return;
    const t = setTimeout(() => {
      typed.current = true;
      set({ ...st, q });
    }, 260);
    return () => clearTimeout(t);
  }, [q, st, set]);
  const resetKey = `${ds.key}|${JSON.stringify(live.f)}|${live.q}|${live.from}|${live.to}|${live.sort}|${live.group}|${JSON.stringify(live.rg)}`;
  useEffect(() => setCursor(-1), [resetKey]);

  const toggle = (facet: string, value: string) => {
    const cur = st.f[facet] ?? [];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    set({ ...st, q, f: { ...st.f, [facet]: next } });
  };
  const open = (i: number) => (onActivate ? onActivate(i) : api.openItem(i));
  const itemAt = (k: number) => {
    const r = rows[k];
    return r && r.kind === "item" ? r.i : null;
  };
  const move = (d: number) => {
    let k = cursor;
    for (let n = 0; n < rows.length; n++) {
      k += d;
      if (k < 0 || k >= rows.length) return;
      if (rows[k].kind === "item") {
        setCursor(k);
        return;
      }
    }
  };
  const onKey = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement;
    const typing = t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA";
    if (typing) {
      if (t === search.current && e.key === "ArrowDown") {
        e.preventDefault();
        list.current?.focus();
        move(1);
      }
      return;
    }
    if (e.key === "/") {
      e.preventDefault();
      search.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Enter" && cursor >= 0) {
      const i = itemAt(cursor);
      if (i !== null) open(i);
    }
  };

  const table = isTable(ds);
  const chart =
    ds.chart === "money" ? <MoneyChart ix={ix} rows={res.rows} onFacet={(f, v) => !(st.f[f] ?? []).includes(v) && toggle(f, v)} /> : ds.chart === "health" ? <HealthChart ix={ix} ds={ds} rows={res.rows} onOpen={open} /> : ds.chart === "insights" ? <InsightChart ix={ix} rows={res.rows} /> : null;
  const sortLabel = ds.sorts.find((s) => s.id === live.sort)?.label ?? (live.sort.startsWith("col:") ? `${tableCols(ds).find((c) => `col:${c.id}` === live.sort.slice(0, live.sort.lastIndexOf(":")))?.label ?? "Column"}, ${live.sort.endsWith(":asc") ? "lowest" : "highest"} first` : "");
  const filtered = isFiltered(live);
  const height = (r: Row) => (r.kind === "head" ? HEAD_HEIGHT : rowHeight(table ? ds.row : ix.items[r.i].kind));

  const facets = (
    <FacetPanel
      ix={ix}
      ds={ds}
      st={live}
      res={res}
      onToggle={toggle}
      onClear={(f) => set({ ...st, q, f: { ...st.f, [f]: [] } })}
      onRange={(id, lo, hi) => set({ ...st, q, rg: { ...st.rg, [id]: [lo, hi] } })}
      onDates={(from, to) => set({ ...st, q, from, to })}
      onEntity={(e) => api.openEntity(e)}
    />
  );

  return (
    <div className="flex min-h-0 flex-1" onKeyDown={onKey}>
      <aside className="hidden w-[244px] shrink-0 overflow-y-auto border-r border-ink-200/70 bg-surface px-2.5 py-2 lg:block">
        {facets}
        {aside}
      </aside>
      {filtersOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden" role="dialog" aria-label="Filters">
          <div className="w-[300px] max-w-[85vw] overflow-y-auto border-r border-ink-200 bg-surface px-3 py-3 shadow-lift">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-ink-900">Filters</span>
              <button type="button" onClick={() => setFiltersOpen(false)} className="grid h-8 w-8 place-items-center rounded-md hover:bg-ink-100" aria-label="Close filters">
                <X size={16} />
              </button>
            </div>
            {facets}
            {aside}
          </div>
          <button type="button" className="flex-1 bg-ink-950/30" onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="space-y-2.5 border-b border-ink-200/70 bg-surface px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative min-w-[180px] flex-1">
              <Search size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
              <input
                ref={search}
                data-primary-search
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search ${res.total.toLocaleString("en-US")} ${ds.noun}`}
                className="w-full rounded-lg border border-ink-200 bg-ink-50 py-1.5 pl-8 pr-2.5 text-[13.5px] text-ink-900 placeholder:text-ink-400 focus:border-[oklch(0.7_0.1_var(--h))] focus:bg-surface focus:outline-none"
                aria-label={`Search ${ds.noun}`}
              />
            </label>
            <button type="button" onClick={() => setFiltersOpen(true)} className="btn-ghost px-3 py-1.5 text-[13px] lg:hidden">
              <SlidersHorizontal size={14} /> Filters
            </button>
            {ds.sorts.length > 0 && (
              <Select label="Sort" value={live.sort} onChange={(v) => set({ ...st, q, sort: v })} options={[...ds.sorts.map((s) => ({ value: s.id, label: s.label })), ...(live.sort.startsWith("col:") ? [{ value: live.sort, label: sortLabel }] : [])]} />
            )}
            {ds.groups.length > 0 && <Select label="Group" value={live.group} onChange={(v) => set({ ...st, q, group: v })} options={[{ value: "", label: "No grouping" }, ...ds.groups.map((g) => ({ value: g.id, label: g.label }))]} />}
            {chart && (
              <button type="button" onClick={() => setChartOpen(!chartOpen)} aria-pressed={chartOpen} className={cx("btn-ghost px-2.5 py-1.5 text-[13px]", chartOpen && "border-ink-300 bg-ink-100")} title={chartOpen ? "Hide the charts" : "Show the charts"}>
                <BarChart3 size={14} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-[12.5px] text-ink-500" data-count={res.rows.length}>
              <b className="font-semibold text-ink-900">{res.rows.length.toLocaleString("en-US")}</b>
              {filtered ? ` of ${res.total.toLocaleString("en-US")}` : ""} {ds.noun}
            </span>
            <ActiveFilters
              ix={ix}
              ds={ds}
              st={live}
              onToggle={toggle}
              onRange={(id, lo, hi) => set({ ...st, q, rg: { ...st.rg, [id]: [lo, hi] } })}
              onDates={(from, to) => set({ ...st, q, from, to })}
              onSearch={(v) => {
                setQ(v);
                set({ ...st, q: v });
              }}
              onAll={() => {
                setQ("");
                set({ ...emptyState(ds), sort: st.sort, group: st.group });
              }}
            />
          </div>
          {ds.dated && <TimeStrip ix={ix} all={ds.items} rows={res.rows} from={live.from} to={live.to} onRange={(from, to) => set({ ...st, q, from, to })} nowDay={ix.persona.now?.slice(0, 10)} />}
          {chart && chartOpen && res.rows.length > 0 && <div className="pt-1">{chart}</div>}
        </div>

        {rows.length ? (
          <VirtualList
            scrollRef={list}
            rows={rows}
            height={height}
            focus={cursor}
            resetKey={resetKey}
            className="flex-1 bg-surface outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400/50"
            header={table ? <TableHead ds={ds} sort={live.sort} onSort={(v) => set({ ...st, q, sort: v })} /> : undefined}
            headerHeight={table ? 36 : 0}
            minWidth={table ? tableMinWidth(tableCols(ds)) : undefined}
            render={(r, k) =>
              r.kind === "head" ? (
                <GroupHead ix={ix} row={r} onEntity={(e) => api.openEntity(e)} />
              ) : table ? (
                <TableRow ds={ds} it={ix.items[r.i]} terms={ts} selected={ix.items[r.i].key === selectedKey} cursor={k === cursor} onOpen={open} />
              ) : (
                <ItemRow ix={ix} it={ix.items[r.i]} terms={ts} selected={ix.items[r.i].key === selectedKey} cursor={k === cursor} onOpen={open} showServer={showServer} />
              )
            }
          />
        ) : (
          <div className="grid flex-1 place-content-center justify-items-center gap-2 bg-surface px-6 text-center">
            <b className="text-[15px] text-ink-900">Nothing matches</b>
            <span className="max-w-sm text-[13px] text-ink-500">No {ds.noun} pass every filter. Remove one, or search for something else.</span>
            {filtered && (
              <button
                type="button"
                className="btn-ghost mt-1 px-3 py-1.5 text-[13px]"
                onClick={() => {
                  setQ("");
                  set({ ...emptyState(ds), sort: st.sort, group: st.group });
                }}
              >
                Clear the filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <label className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-surface py-1 pl-2.5 pr-1 text-[12.5px] text-ink-500">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="max-w-[12rem] cursor-pointer truncate rounded bg-transparent py-0.5 pr-1 font-semibold text-ink-900 focus:outline-none">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
