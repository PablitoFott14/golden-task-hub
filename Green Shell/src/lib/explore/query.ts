import type { Dataset, ExploreIndex, Facet, Group, Item, Sort } from "./types";

/**
 * Filtering a dataset. Within one facet the values chosen are alternatives,
 * across facets they all have to hold, and each facet counts its values over
 * the records every other filter lets through, so a count is always what a
 * click on that value would show.
 */

export interface QueryState {
  q: string;
  f: Record<string, string[]>;
  rg: Record<string, [number | null, number | null]>;
  from: string | null;
  to: string | null;
  sort: string;
  group: string;
}

export const emptyState = (ds: Dataset): QueryState => ({ q: "", f: {}, rg: {}, from: null, to: null, sort: ds.defaultSort, group: ds.defaultGroup ?? "" });

/** Search terms: words, or "quoted phrases", all of which must appear. */
export function terms(q: string): string[] {
  const out: string[] = [];
  const re = /"([^"]+)"|(\S+)/g;
  for (const m of q.toLowerCase().matchAll(re)) {
    const t = (m[1] ?? m[2] ?? "").trim();
    if (t) out.push(t);
  }
  return out;
}

export const matches = (it: Item, ts: string[]) => ts.every((t) => it.hay.includes(t));

const valuesOf = (it: Item, id: string): string[] => {
  const v = it.f[id];
  return v === undefined ? [] : Array.isArray(v) ? v : [v];
};

export interface QueryResult {
  /** Records passing every filter, sorted. */
  rows: number[];
  /** Per facet: value to count, over the records every other filter passes. */
  counts: Map<string, Map<string, number>>;
  /** Records passing the search and the dates, before any facet. */
  base: number[];
  total: number;
}

export function runQuery(ix: ExploreIndex, ds: Dataset, st: QueryState): QueryResult {
  const ts = terms(st.q);
  const fromN = st.from;
  const toN = st.to;
  const ranges = (ds.ranges ?? []).filter((r) => st.rg[r.id] && (st.rg[r.id][0] !== null || st.rg[r.id][1] !== null));
  const base: number[] = [];
  for (const i of ds.items) {
    const it = ix.items[i];
    if (ts.length && !matches(it, ts)) continue;
    if ((fromN || toN) && (!it.day || (fromN && it.day < fromN) || (toN && it.day > toN))) continue;
    let ok = true;
    for (const r of ranges) {
      const v = r.get(it);
      const [lo, hi] = st.rg[r.id];
      if (v === null || (lo !== null && v < lo) || (hi !== null && v > hi)) {
        ok = false;
        break;
      }
    }
    if (ok) base.push(i);
  }
  const active = ds.facets.filter((f) => st.f[f.id]?.length);
  const sets = new Map(active.map((f) => [f.id, new Set(st.f[f.id])]));
  const counts = new Map<string, Map<string, number>>();
  for (const f of ds.facets) counts.set(f.id, new Map());
  const rows: number[] = [];
  for (const i of base) {
    const it = ix.items[i];
    // Which facets this record fails: none, it counts everywhere; one, it
    // counts only for that facet; more, nowhere.
    let failed: string | null = null;
    let fails = 0;
    for (const f of active) {
      const want = sets.get(f.id)!;
      if (!valuesOf(it, f.id).some((v) => want.has(v))) {
        failed = f.id;
        if (++fails > 1) break;
      }
    }
    if (fails > 1) continue;
    if (fails === 0) rows.push(i);
    for (const f of ds.facets) {
      if (fails === 1 && f.id !== failed) continue;
      const m = counts.get(f.id)!;
      for (const v of valuesOf(it, f.id)) m.set(v, (m.get(v) ?? 0) + 1);
    }
  }
  sortRows(ix, ds, rows, st.sort);
  return { rows, counts, base, total: ds.items.length };
}

/** A table column as a sort: `col:<column>:asc` or `col:<column>:desc`. */
function columnSort(ds: Dataset, sortId: string): Sort | null {
  if (!sortId.startsWith("col:")) return null;
  const id = sortId.slice(4, sortId.lastIndexOf(":"));
  const dir = sortId.endsWith(":asc") ? 1 : -1;
  if (id === "__day") return { id: sortId, label: "Day", key: (it) => it.day, dir };
  const col = ds.columns?.find((c) => c.id === id);
  if (!col) return null;
  return { id: sortId, label: col.label, key: (it) => { const v = col.get(it); return typeof v === "string" ? v.toLowerCase() : v; }, dir };
}

export function sortRows(ix: ExploreIndex, ds: Dataset, rows: number[], sortId: string) {
  const s = columnSort(ds, sortId) ?? ds.sorts.find((x) => x.id === sortId) ?? ds.sorts[0];
  if (!s) return rows;
  const keys = new Map<number, number | string | null>();
  for (const i of rows) keys.set(i, s.key(ix.items[i]));
  rows.sort((a, b) => {
    const ka = keys.get(a)!;
    const kb = keys.get(b)!;
    if (ka === null && kb === null) return a - b;
    if (ka === null) return 1;
    if (kb === null) return -1;
    if (ka < kb) return -s.dir;
    if (ka > kb) return s.dir;
    return a - b;
  });
  return rows;
}

/** The values a facet offers, in its order, with their counts. */
export function facetValues(ix: ExploreIndex, ds: Dataset, f: Facet, counts: Map<string, number>, selected: string[]): { value: string; count: number }[] {
  const all = new Map<string, number>();
  // Every value the dataset has, so a value filtered down to zero still shows.
  for (const i of ds.items) for (const v of valuesOf(ix.items[i], f.id)) if (!all.has(v)) all.set(v, 0);
  for (const [v, n] of counts) all.set(v, n);
  for (const v of selected) if (!all.has(v)) all.set(v, 0);
  const list = [...all].map(([value, count]) => ({ value, count }));
  const label = (v: string) => facetLabel(ix, f, v).toLowerCase();
  if (f.order === "given" && f.given) {
    const idx = (v: string) => {
      const k = f.given!.indexOf(v);
      return k < 0 ? 999 : k;
    };
    list.sort((a, b) => idx(a.value) - idx(b.value) || label(a.value).localeCompare(label(b.value)));
  } else if (f.order === "alpha") list.sort((a, b) => a.value.localeCompare(b.value));
  else if (f.order === "desc") list.sort((a, b) => b.value.localeCompare(a.value));
  else list.sort((a, b) => b.count - a.count || label(a.value).localeCompare(label(b.value)));
  return list;
}

export function facetLabel(ix: ExploreIndex, f: Facet, v: string): string {
  if (f.entity) {
    const e = ix.entityByKey.get(v);
    return e === undefined ? v : ix.entities[e].name;
  }
  if (f.tree) return v.slice(v.lastIndexOf("/") + 1);
  return f.fmt ? f.fmt(v) : v;
}

/* --------------------------------------------------------------- groups */

export type Row = { kind: "head"; key: string; label: string; count: number; sum: number | null; entity: number | null } | { kind: "item"; i: number };

export function groupRows(ix: ExploreIndex, ds: Dataset, rows: number[], groupId: string, sortId: string): Row[] {
  const g = ds.groups.find((x) => x.id === groupId);
  if (!g) return rows.map((i) => ({ kind: "item", i }));
  const buckets = new Map<string, number[]>();
  const none: number[] = [];
  for (const i of rows) {
    const k = g.key(ix.items[i]);
    const ks = k === null ? [] : Array.isArray(k) ? k : [k];
    if (!ks.length) none.push(i);
    for (const x of ks) {
      if (!buckets.has(x)) buckets.set(x, []);
      buckets.get(x)!.push(i);
    }
  }
  const sort = ds.sorts.find((s) => s.id === sortId);
  const ordered = orderGroups(ix, g, buckets, sort?.dir ?? -1);
  const out: Row[] = [];
  const head = (key: string, ids: number[], label: string) => {
    const sum = g.sum ? ids.reduce((a, i) => a + (ix.items[i].amount ?? 0), 0) : null;
    const entity = g.entity ? ix.entityByKey.get(key) ?? null : null;
    out.push({ kind: "head", key, label, count: ids.length, sum, entity });
    for (const i of ids) out.push({ kind: "item", i });
  };
  for (const [k, ids] of ordered) head(k, ids, groupLabel(ix, g, k));
  if (none.length) head("", none, "Not set");
  return out;
}

function orderGroups(ix: ExploreIndex, g: Group, buckets: Map<string, number[]>, dir: 1 | -1): [string, number[]][] {
  const list = [...buckets];
  if (g.order === "time") {
    // Groups of time follow the list: newest first lists the newest group first.
    const t = (ids: number[]) => ix.items[ids[0]].at ?? 0;
    return list.sort((a, b) => (dir === -1 ? t(b[1]) - t(a[1]) : t(a[1]) - t(b[1])));
  }
  if (g.order === "key") return list.sort((a, b) => a[0].localeCompare(b[0]));
  if (g.order === "keydesc") return list.sort((a, b) => b[0].localeCompare(a[0]));
  if (g.order === "given" && g.given) return list.sort((a, b) => (g.given!.indexOf(a[0]) + 1 || 999) - (g.given!.indexOf(b[0]) + 1 || 999));
  return list.sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

export function groupLabel(ix: ExploreIndex, g: Group, k: string): string {
  if (g.entity) {
    const e = ix.entityByKey.get(k);
    return e === undefined ? k : ix.entities[e].name;
  }
  return g.fmt ? g.fmt(k) : k;
}

/* ---------------------------------------------------------------- state */

/** A dataset's view state in the address: `q`, `f.<facet>` (repeated),
 *  `rg.<range>=lo..hi`, `from`, `to`, `sort`, `g`. */
export function readState(sp: URLSearchParams, ds: Dataset): QueryState {
  const st = emptyState(ds);
  st.q = sp.get("q") ?? "";
  for (const f of ds.facets) {
    const v = sp.getAll("f." + f.id);
    if (v.length) st.f[f.id] = v;
  }
  for (const r of ds.ranges ?? []) {
    const v = sp.get("rg." + r.id);
    if (!v) continue;
    const [lo, hi] = v.split("..");
    st.rg[r.id] = [lo ? Number(lo) : null, hi ? Number(hi) : null];
  }
  st.from = sp.get("from");
  st.to = sp.get("to");
  const sort = sp.get("sort");
  if (sort && (ds.sorts.some((s) => s.id === sort) || columnSort(ds, sort))) st.sort = sort;
  if (sp.has("g")) st.group = ds.groups.some((g) => g.id === sp.get("g")) ? sp.get("g")! : "";
  return st;
}

export function writeState(sp: URLSearchParams, ds: Dataset, st: QueryState) {
  for (const k of [...sp.keys()]) if (k === "q" || k.startsWith("f.") || k.startsWith("rg.") || k === "from" || k === "to" || k === "sort" || k === "g") sp.delete(k);
  if (st.q) sp.set("q", st.q);
  for (const [k, vs] of Object.entries(st.f)) for (const v of vs) sp.append("f." + k, v);
  for (const [k, [lo, hi]] of Object.entries(st.rg)) if (lo !== null || hi !== null) sp.set("rg." + k, `${lo ?? ""}..${hi ?? ""}`);
  if (st.from) sp.set("from", st.from);
  if (st.to) sp.set("to", st.to);
  if (st.sort && st.sort !== ds.defaultSort) sp.set("sort", st.sort);
  if (st.group !== (ds.defaultGroup ?? "")) sp.set("g", st.group);
}

export const isFiltered = (st: QueryState) =>
  !!st.q || Object.values(st.f).some((v) => v.length) || Object.values(st.rg).some(([a, b]) => a !== null || b !== null) || !!st.from || !!st.to;

/* --------------------------------------------------------------- global */

export interface GlobalHit {
  ds: Dataset;
  rows: number[];
}

/** One search across every dataset, grouped by dataset in server order. */
export function searchAll(ix: ExploreIndex, q: string): { hits: GlobalHit[]; entities: number[]; idents: number[] } {
  const ts = terms(q);
  if (!ts.length) return { hits: [], entities: [], idents: [] };
  const hits: GlobalHit[] = [];
  for (const s of ix.servers) {
    for (const key of s.datasets) {
      const ds = ix.datasets.get(key)!;
      const rows = ds.items.filter((i) => matches(ix.items[i], ts));
      if (rows.length) hits.push({ ds, rows: sortRows(ix, ds, rows, ds.defaultSort) });
    }
  }
  const entities = ix.entities
    .filter((e) => e.items.length && ts.every((t) => e.name.toLowerCase().includes(t) || e.emails.some((m) => m.includes(t)) || e.handles.some((h) => h.label.toLowerCase().includes(t))))
    .sort((a, b) => Object.keys(b.servers).length - Object.keys(a.servers).length || b.items.length - a.items.length)
    .map((e) => e.i);
  const idents = ix.idents.filter((d) => ts.every((t) => d.label.toLowerCase().includes(t))).map((d) => d.i);
  return { hits, entities, idents };
}
