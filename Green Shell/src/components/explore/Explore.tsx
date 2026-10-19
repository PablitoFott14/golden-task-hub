import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useHref, useNavigate, useSearchParams } from "react-router-dom";
import { AlertTriangle, CalendarDays, Compass, Link2, Menu, Pin, RotateCw, Search, Users, X } from "lucide-react";
import { cx } from "../../lib/util";
import { loadExploreSource } from "../../lib/explore/load";
import { buildIndex } from "../../lib/explore/build";
import { makeClock } from "../../lib/explore/time";
import { pretty } from "../../lib/explore/ctx";
import { searchAll, terms } from "../../lib/explore/query";
import type { ExploreIndex } from "../../lib/explore/types";
import { ExploreContext, useExplore, type ExploreApi } from "./context";
import { ServerIcon } from "./bits";
import { Detail } from "./Detail";
import { HomeView } from "./HomeView";
import { EntityView } from "./EntityView";
import { DayView } from "./DayView";
import { ConnectionsView, ExtrasPanel, IdentView, Missing, PeopleView, PinnedView, SearchView, ServerView } from "./Views";

/** Pinned records per persona, a convenience on this device only. */
const PINS = "gsh.explore.pins.v1";
function readPins(slug: string): string[] {
  try {
    const all = JSON.parse(localStorage.getItem(PINS) ?? "{}") as Record<string, unknown>;
    return Array.isArray(all[slug]) ? (all[slug] as unknown[]).filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function writePins(slug: string, keys: string[]) {
  try {
    const all = JSON.parse(localStorage.getItem(PINS) ?? "{}") as Record<string, unknown>;
    all[slug] = keys;
    localStorage.setItem(PINS, JSON.stringify(all));
  } catch {
    /* a private window: the pins last as long as the page */
  }
}

/**
 * Explore: a universe as a research tool rather than a set of app screens.
 * It reads the same stored seed the viewer runs on, builds one index of every
 * record, person and shared reference (lib/explore), and lays it out by
 * server, by person, by day and by reference, with every view in the address.
 *
 * It sits beside the viewer on the stage and never touches it: the viewer
 * stays the persona's own program, and "Show in viewer" opens the same server
 * there.
 */

/** One index per universe for the life of the page, so coming back is instant. */
const indexes = new Map<string, Promise<ExploreIndex>>();

function useIndex(slug: string) {
  const [state, setState] = useState<{ k: "loading"; done: number; total: number } | { k: "ready"; ix: ExploreIndex } | { k: "error"; message: string }>({ k: "loading", done: 0, total: 0 });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let alive = true;
    setState({ k: "loading", done: 0, total: 0 });
    let p = indexes.get(slug);
    if (!p) {
      p = loadExploreSource(slug, (done, total) => alive && setState({ k: "loading", done, total }))
        // A frame for the progress to paint before the index is built.
        .then((src) => new Promise<ExploreIndex>((res) => setTimeout(() => res(buildIndex(src)), 16)));
      indexes.set(slug, p);
      p.catch(() => indexes.delete(slug));
    }
    p.then((ix) => alive && setState({ k: "ready", ix })).catch((e: unknown) => alive && setState({ k: "error", message: e instanceof Error ? e.message : String(e) }));
    return () => {
      alive = false;
    };
  }, [slug, attempt]);
  return { state, retry: () => setAttempt((n) => n + 1) };
}

export default function Explore({ slug, name, active }: { slug: string; name: string; active: boolean }) {
  const { state, retry } = useIndex(slug);
  if (state.k === "ready") return <Ready ix={state.ix} slug={slug} active={active} />;
  if (state.k === "error")
    return (
      <div className="grid h-full place-content-center justify-items-center gap-3 bg-ink-50 px-6 text-center">
        <AlertTriangle size={24} className="text-rose-500" aria-hidden />
        <b className="text-[16px] font-bold text-ink-900">{name}'s universe could not be read</b>
        <span className="max-w-md font-mono text-[12px] text-ink-500">{state.message}</span>
        <button onClick={retry} className="btn-primary mt-2">
          <RotateCw size={15} /> Try again
        </button>
      </div>
    );
  const pct = state.total ? Math.round((100 * state.done) / state.total) : 0;
  return (
    <div className="grid h-full place-content-center justify-items-center gap-2.5 bg-ink-50 text-center" role="status">
      <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-[oklch(0.9_0.03_var(--h))] border-t-[oklch(0.56_0.15_var(--h))] dark:border-[oklch(0.35_0.04_var(--h))] dark:border-t-[oklch(0.7_0.14_var(--h))]" />
      <b className="text-[16px] font-bold text-ink-900">Reading {name}'s universe</b>
      <span className="text-[14px] text-ink-500">{state.done && state.done === state.total ? "Linking records across servers" : "Every record, person and reference, a few seconds"}</span>
      <span className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-ink-200">
        <span className="block h-full rounded-full bg-[oklch(0.56_0.15_var(--h))] transition-[width] duration-200" style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}

function Ready({ ix, slug, active }: { ix: ExploreIndex; slug: string; active: boolean }) {
  // Kept mounted behind the viewer, Explore holds on to its own address and
  // ignores the viewer's, so coming back finds it where it was.
  const [live] = useSearchParams();
  const frozen = useRef(live);
  if (active) frozen.current = live;
  const sp = frozen.current;
  const activeRef = useRef(active);
  activeRef.current = active;
  const navigate = useNavigate();
  const viewerBase = useHref(`/universes/${slug}`);
  const clock = useMemo(() => makeClock(ix.tz), [ix]);
  const [railOpen, setRailOpen] = useState(false);
  const [pins, setPins] = useState<string[]>(() => readPins(slug).filter((k) => ix.byKey.has(k)));
  useEffect(() => writePins(slug, pins), [slug, pins]);

  const api: ExploreApi = useMemo(() => {
    const go: ExploreApi["go"] = (mut, opts) => {
      if (!activeRef.current) return;
      const p = opts?.fresh ? new URLSearchParams() : new URLSearchParams(sp);
      mut(p);
      const q = p.toString();
      navigate({ pathname: `/universes/${slug}/explore`, search: q ? `?${q}` : "" }, { replace: !opts?.push });
      setRailOpen(false);
    };
    return {
      ix,
      clock,
      slug,
      sp,
      go,
      openItem: (i) => go((p) => p.set("r", ix.items[i].key), { push: true }),
      openEntity: (e) => go((p) => p.set("p", ix.entities[e].key), { fresh: true, push: true }),
      openDay: (d) => go((p) => p.set("d", d), { fresh: true, push: true }),
      openIdent: (d) => go((p) => p.set("x", ix.idents[d].key), { fresh: true, push: true }),
      openServer: (server, ds, filters) =>
        go(
          (p) => {
            p.set("s", server);
            if (ds) p.set("ds", ds);
            for (const [k, vs] of Object.entries(filters ?? {})) for (const v of vs) (k === "q" ? p.set("q", v) : p.append("f." + k, v));
          },
          { fresh: true, push: true }
        ),
      viewerHref: (server) => `${viewerBase}?pane=${encodeURIComponent(server)}`,
      label: (s) => ix.servers.find((x) => x.id === s)?.label ?? pretty(s),
      pins,
      togglePin: (key) => setPins((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key])),
      clearPins: () => setPins([]),
    };
  }, [ix, clock, slug, sp, navigate, viewerBase, pins]);

  const p = sp.get("p");
  const d = sp.get("d");
  const x = sp.get("x");
  const v = sp.get("v");
  const s = sp.get("s");
  const q = sp.get("q") ?? "";
  const r = sp.get("r");
  let view;
  let where = "home";
  if (p) {
    const e = ix.entityByKey.get(p);
    view = e !== undefined ? <EntityView key={e} e={e} /> : <Missing what="That person is not in this universe." />;
    where = "people";
  } else if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
    view = <DayView key={d} day={d} />;
    where = "days";
  } else if (x) {
    const i = ix.identByKey.get(x);
    view = i !== undefined ? <IdentView key={i} d={i} /> : <Missing what="That reference is not in this universe." />;
    where = "links";
  } else if (v === "people") {
    view = <PeopleView />;
    where = "people";
  } else if (v === "links") {
    view = <ConnectionsView />;
    where = "links";
  } else if (v === "search" && q) {
    view = <SearchView q={q} />;
    where = "search";
  } else if (v === "pinned") {
    view = <PinnedView />;
    where = "pinned";
  } else if (s) {
    view = <ServerView key={s} server={s} dsId={sp.get("ds")} />;
    where = "server:" + s;
  } else view = <HomeView />;

  const item = r && !r.startsWith("extras:") ? ix.byKey.get(r) : undefined;
  const closeDetail = () => api.go((pp) => pp.delete("r"));
  const detail = r?.startsWith("extras:") ? (
    <ExtrasPanel server={r.slice(7)} onClose={closeDetail} />
  ) : item !== undefined ? (
    <Detail key={r!} it={ix.items[item]} terms={terms(where.startsWith("server:") || where === "search" ? q : "")} onClose={closeDetail} />
  ) : null;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && r) {
      e.preventDefault();
      closeDetail();
    }
  };
  // With nothing focused, "/" still goes to the search and Escape still closes the record.
  const root = useRef<HTMLDivElement>(null);
  const closeRef = useRef(closeDetail);
  closeRef.current = r ? closeDetail : () => {};
  useEffect(() => {
    if (!active) return;
    const onDoc = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (t && t !== document.body && !root.current?.contains(t)) return;
      if (e.key === "/") {
        const el = root.current?.querySelector<HTMLInputElement>("main [data-primary-search]") ?? root.current?.querySelector<HTMLInputElement>("nav input[type=search]");
        if (el) {
          e.preventDefault();
          el.focus();
        }
      } else if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onDoc);
    return () => document.removeEventListener("keydown", onDoc);
  }, [active]);

  return (
    <ExploreContext.Provider value={api}>
      <div ref={root} className="relative flex h-full min-h-0 bg-ink-50 text-ink-900" onKeyDown={onKey}>
        <Rail where={where} open={railOpen} onClose={() => setRailOpen(false)} q={where === "search" ? q : ""} />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-ink-200/70 bg-surface px-3 py-1.5 lg:hidden">
            <button type="button" onClick={() => setRailOpen(true)} className="btn-ghost px-2.5 py-1.5 text-[13px]">
              <Menu size={15} /> Servers
            </button>
          </div>
          <main className="flex min-h-0 flex-1 flex-col">{view}</main>
        </div>
        {detail && (
          <>
            <button type="button" aria-label="Close the record" onClick={closeDetail} className="absolute inset-0 z-20 bg-ink-950/20 xl:hidden" />
            <aside className="absolute inset-y-0 right-0 z-30 w-[min(480px,100%)] overflow-y-auto border-l border-ink-200 bg-surface shadow-lift xl:static xl:z-auto xl:w-[460px] xl:shrink-0 xl:shadow-none 2xl:w-[520px]" aria-label="Record">
              {detail}
            </aside>
          </>
        )}
      </div>
    </ExploreContext.Provider>
  );
}

function Rail({ where, open, onClose, q }: { where: string; open: boolean; onClose: () => void; q: string }) {
  const api = useExplore();
  const { ix } = api;
  const [text, setText] = useState(q);
  useEffect(() => setText(q), [q]);
  const hits = useMemo(() => {
    if (!q) return null;
    const m = new Map<string, number>();
    for (const h of searchAll(ix, q).hits) m.set(h.ds.server, (m.get(h.ds.server) ?? 0) + h.rows.length);
    return m;
  }, [ix, q]);
  const present = ix.persona.now?.slice(0, 10) ?? ix.dayMax;
  const item = (key: string, icon: ReactNode, label: string, onClick: () => void, n?: number | null) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      aria-current={where === key ? "page" : undefined}
      className={cx(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium transition",
        where === key ? "bg-[oklch(0.95_0.035_var(--h))] font-semibold text-[oklch(0.34_0.1_var(--h))] dark:bg-[oklch(0.3_0.05_var(--h))] dark:text-[oklch(0.9_0.06_var(--h))]" : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
      )}
    >
      <span className="shrink-0 opacity-80">{icon}</span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {n !== undefined && n !== null && <span className={cx("shrink-0 font-mono text-[11px] tabular-nums", hits && n ? "font-semibold text-[oklch(0.5_0.14_var(--h))] dark:text-[oklch(0.78_0.1_var(--h))]" : "text-ink-400")}>{n.toLocaleString("en-US")}</span>}
    </button>
  );
  return (
    <>
      {open && <button type="button" aria-label="Close the menu" onClick={onClose} className="absolute inset-0 z-40 bg-ink-950/25 lg:hidden" />}
      <nav
        aria-label="Explore"
        className={cx(
          "z-50 flex w-[228px] shrink-0 flex-col border-r border-ink-200/70 bg-surface",
          open ? "absolute inset-y-0 left-0 shadow-lift" : "hidden lg:flex"
        )}
      >
        <form
          className="relative border-b border-ink-200/70 p-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) api.go((p) => (p.set("v", "search"), p.set("q", text.trim())), { fresh: true, push: true });
          }}
        >
          <Search size={14} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
          <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search every server"
            className="w-full rounded-lg border border-ink-200 bg-ink-50 py-1.5 pl-8 pr-2 text-[13px] text-ink-900 placeholder:text-ink-400 focus:border-[oklch(0.7_0.1_var(--h))] focus:bg-surface focus:outline-none"
            aria-label="Search every server"
          />
          {open && (
            <button type="button" onClick={onClose} className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-ink-500 hover:bg-ink-100 lg:hidden" aria-label="Close the menu">
              <X size={15} />
            </button>
          )}
        </form>
        <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-2">
          {item("home", <Compass size={15} />, "Overview", () => api.go(() => {}, { fresh: true, push: true }))}
          {item("people", <Users size={15} />, "People", () => api.go((p) => p.set("v", "people"), { fresh: true, push: true }), ix.entities.filter((e) => e.items.length).length)}
          {present && item("days", <CalendarDays size={15} />, "Days", () => api.openDay(present), ix.days.size)}
          {item("links", <Link2 size={15} />, "Connections", () => api.go((p) => p.set("v", "links"), { fresh: true, push: true }), ix.idents.length)}
          {item("pinned", <Pin size={15} />, "Pinned", () => api.go((p) => p.set("v", "pinned"), { fresh: true, push: true }), api.pins.length || null)}
          <div className="mono-label px-2.5 pb-1 pt-3 text-[10px] text-ink-400">{hits ? `Servers, matches for "${q}"` : "Servers"}</div>
          {ix.servers.map((s) => {
            const total = s.datasets.reduce((a, k) => a + (ix.datasets.get(k)?.items.length ?? 0), 0);
            const n = hits ? hits.get(s.id) ?? 0 : total;
            return item(
              "server:" + s.id,
              <ServerIcon server={s.id} size={15} />,
              s.label,
              () => (hits && n ? api.openServer(s.id, searchAll(ix, q).hits.find((h) => h.ds.server === s.id)?.ds.id, { q: [q] }) : api.openServer(s.id)),
              n
            );
          })}
        </div>
        <div className="border-t border-ink-200/70 px-3 py-2 text-[11px] leading-relaxed text-ink-400">
          <kbd className="font-mono">/</kbd> search, <kbd className="font-mono">j</kbd> <kbd className="font-mono">k</kbd> move, <kbd className="font-mono">Enter</kbd> open, <kbd className="font-mono">Esc</kbd> close
        </div>
      </nav>
    </>
  );
}

