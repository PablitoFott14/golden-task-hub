import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, Navigate, useHref, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowRight, ArrowUpRight, Orbit, RotateCw } from "lucide-react";
import { universeCatalog, type UniverseEntry } from "../data/universeCatalog";
import { SectionHeading } from "../components/ui";
import { loadUniverse, mountUniverse, type LoadedUniverse, type MountedUniverse } from "../lib/universeHost";
import { cx } from "../lib/util";

/**
 * The Universes tab: the three persona universes, run inside the hub.
 *
 * It replaces the external Universe Viewers site and keeps its shape: a home
 * grid of persona cards, a bar of persona tabs, and a stage that holds one
 * persona's viewer at a time. Going back to the grid keeps the loaded viewer,
 * so returning to it is instant; opening another persona replaces it. "Open
 * full page" opens the same viewer with nothing around it, in a new tab.
 *
 * The viewer on the stage is the persona's own program, not a rebuild of it.
 * `universeHost.ts` runs it in a shadow root; this page only decides which one
 * and when. Routes: `/universes`, `/universes/:slug` (with the newer engine's
 * `?pane=…&tab=…` deep links), and `/universes/:slug/full`.
 */

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const initials = (n: string) =>
  n
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
const mbLabel = (bytes: number) => `${Math.max(1, Math.round(bytes / 1_000_000))} MB`;
const hue = (u: UniverseEntry) => ({ "--h": u.hue }) as CSSProperties;

/* -------------------------------------------------------------- the grid */

function PersonaCard({ u }: { u: UniverseEntry }) {
  return (
    <Link
      to={`/universes/${u.slug}`}
      style={hue(u)}
      className="card group flex h-full flex-col p-[22px] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[oklch(0.8_0.07_var(--h))] hover:shadow-[0_12px_30px_-16px_oklch(0.4_0.09_var(--h)/0.45)] focus-visible:-translate-y-0.5 focus-visible:border-[oklch(0.8_0.07_var(--h))] focus-visible:outline-none dark:hover:border-[oklch(0.5_0.08_var(--h))] dark:focus-visible:border-[oklch(0.5_0.08_var(--h))]"
    >
      <div className="mb-3.5 flex items-center gap-3.5">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[oklch(0.93_0.05_var(--h))] text-[17px] font-bold text-[oklch(0.32_0.1_var(--h))] dark:bg-[oklch(0.34_0.07_var(--h))] dark:text-[oklch(0.9_0.06_var(--h))]"
        >
          {initials(u.name)}
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-[18px] font-bold tracking-tight text-ink-900">
            {u.name}
            {u.age && <span className="ml-1.5 font-sans text-[15px] font-medium text-ink-400">{u.age}</span>}
          </h2>
          {u.city && <div className="text-[13.5px] text-ink-500">{u.city}</div>}
        </div>
      </div>
      <p className="mb-4 text-[14px] leading-relaxed text-ink-700">{u.role}</p>
      <div className="mb-[18px] flex flex-wrap gap-1.5">
        {u.apps.map((a) => (
          <span key={a} className="rounded-md bg-ink-100 px-2 py-0.5 text-[12px] text-ink-600 ring-1 ring-inset ring-ink-200/70">
            {a}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-200/70 pt-3.5 text-[13px] text-ink-500">
        <span>
          {u.apps.length} apps · {u.files} files · {mbLabel(u.loadBytes)}
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[oklch(0.44_0.13_var(--h))] dark:text-[oklch(0.8_0.1_var(--h))]">
          Open viewer
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function UniversesHome() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative py-12">
          <SectionHeading
            as="h1"
            eyebrow="Universes"
            title={`${WORDS[universeCatalog.length] ?? universeCatalog.length} persona universes`}
            sub="Each viewer holds one persona's apps, files and messages. Every name, address and document in them is synthetic. The pages are large, so the first open takes a few seconds."
          />
        </div>
      </section>
      <div className="wrap py-10">
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {universeCatalog.map((u) => (
            <PersonaCard key={u.slug} u={u} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- the stage */

function PersonaBar({ current, fullHref }: { current: string; fullHref: string }) {
  return (
    <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-ink-200/70 bg-surface px-3 sm:gap-[18px] sm:px-[18px]">
      <Link
        to="/universes"
        className="inline-flex items-center gap-2 whitespace-nowrap font-display text-[14px] font-bold tracking-tight text-ink-900 hover:text-brand-600 dark:hover:text-brand-300"
      >
        <Orbit size={16} className="text-brand-600 dark:text-brand-300" aria-hidden />
        <span className="hidden sm:inline">Universes</span>
      </Link>
      <nav className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]" aria-label="Personas">
        {universeCatalog.map((u) => {
          const on = u.slug === current;
          return (
            <Link
              key={u.slug}
              to={`/universes/${u.slug}`}
              aria-current={on ? "page" : undefined}
              style={hue(u)}
              className={cx(
                "flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[13.5px] font-semibold transition",
                on
                  ? "bg-[oklch(0.95_0.035_var(--h))] text-[oklch(0.34_0.1_var(--h))] dark:bg-[oklch(0.3_0.05_var(--h))] dark:text-[oklch(0.9_0.06_var(--h))]"
                  : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
              )}
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-[oklch(0.64_0.15_var(--h))]" />
              {u.name}
            </Link>
          );
        })}
      </nav>
      <span className="flex-1" />
      <a
        href={fullHref}
        target="_blank"
        rel="noopener"
        className="hidden items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-ink-500 hover:text-ink-900 sm:inline-flex"
      >
        Open full page <ArrowUpRight size={14} aria-hidden />
      </a>
    </div>
  );
}

type Phase =
  | { k: "loading"; done: number; total: number }
  | { k: "ready" }
  | { k: "error"; message: string };

/** `?pane=…&tab=…` on the route is the engine's `#pane=…&tab=…`. */
const paneOf = (search: string) => (search.length > 1 ? "#" + search.slice(1) : "");

/** Writes the engine's pane into the route's query without telling the router,
 *  the way the original page rewrote its own hash: the address follows the
 *  pane, nothing re-renders, and a reload lands on the same pane. */
function writePane(hash: string) {
  const route = window.location.hash.slice(1).split("?")[0];
  const q = hash.replace(/^#/, "");
  const next = `#${route}${q ? `?${q}` : ""}`;
  if (next !== window.location.hash) {
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search + next);
  }
}

function UniverseStage({
  u,
  visible,
  full,
  search,
}: {
  u: UniverseEntry;
  visible: boolean;
  full: boolean;
  search: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const loaded = useRef<LoadedUniverse | null>(null);
  const mounted = useRef<MountedUniverse | null>(null);
  const pane = useRef(paneOf(search));
  const [phase, setPhase] = useState<Phase>({ k: "loading", done: 0, total: 0 });
  const [ready, setReady] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const fullHref = useHref(`/universes/${u.slug}/full`);

  // Fetch the universe whenever the persona changes, and take the old one down.
  useEffect(() => {
    const ctrl = new AbortController();
    setPhase({ k: "loading", done: 0, total: 0 });
    let last = 0;
    loadUniverse(
      u.slug,
      (done, total) => {
        const now = performance.now();
        if (now - last > 80 || done === total) {
          last = now;
          setPhase({ k: "loading", done, total });
        }
      },
      ctrl.signal
    )
      .then((data) => {
        if (ctrl.signal.aborted) return;
        loaded.current = data;
        setReady((n) => n + 1);
      })
      .catch((e: unknown) => {
        if (!ctrl.signal.aborted) setPhase({ k: "error", message: e instanceof Error ? e.message : String(e) });
      });
    return () => {
      ctrl.abort();
      loaded.current = null;
      mounted.current?.destroy();
      mounted.current = null;
    };
  }, [u.slug, attempt]);

  // Run it once it is here and on screen, so it lays out against a real stage.
  useEffect(() => {
    const data = loaded.current;
    if (!data || !visible || mounted.current || !hostRef.current) return;
    try {
      mounted.current = mountUniverse(hostRef.current, data, {
        getPane: () => pane.current,
        setPane: (h) => {
          pane.current = h;
          writePane(h);
        },
      });
      loaded.current = null;
      setPhase({ k: "ready" });
    } catch (e) {
      console.error(e);
      setPhase({ k: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }, [ready, visible]);

  // A universe kept loaded behind the grid hears no keys.
  useEffect(() => {
    mounted.current?.setActive(visible);
  }, [visible, ready]);

  // A link to another pane of the open universe.
  useEffect(() => {
    const next = paneOf(search);
    if (next && next !== pane.current) {
      pane.current = next;
      mounted.current?.paneChanged();
    }
  }, [search]);

  // The stage fills the window under the nav, as the viewer site's did, so
  // the page behind it does not scroll.
  useEffect(() => {
    if (!visible) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    const title = document.title;
    document.title = `${u.name} · Universes · Golden Task Hub`;
    return () => {
      el.style.overflow = prev;
      document.title = title;
    };
  }, [visible, u.name]);

  const pct = phase.k === "loading" && phase.total ? Math.round((100 * phase.done) / phase.total) : 0;

  return (
    <div
      className={cx("fixed inset-x-0 bottom-0 flex flex-col bg-ink-50", full ? "top-0 z-[60]" : "top-16 z-30", !visible && "hidden")}
      aria-hidden={!visible}
    >
      {!full && <PersonaBar current={u.slug} fullHref={fullHref} />}
      <div className="relative min-h-0 flex-1 bg-[#0b0d10]">
        <div ref={hostRef} className="absolute inset-0" />
        {phase.k === "loading" && (
          <div
            style={hue(u)}
            className="absolute inset-0 grid place-content-center justify-items-center gap-2.5 bg-ink-50 text-center"
            role="status"
          >
            <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-[oklch(0.9_0.03_var(--h))] border-t-[oklch(0.56_0.15_var(--h))] dark:border-[oklch(0.35_0.04_var(--h))] dark:border-t-[oklch(0.7_0.14_var(--h))]" />
            <b className="text-[16px] font-bold text-ink-900">Opening {u.name}</b>
            <span className="text-[14px] text-ink-500">{mbLabel(u.loadBytes)}, usually a few seconds</span>
            <span className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-ink-200">
              <span
                className="block h-full rounded-full bg-[oklch(0.56_0.15_var(--h))] transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </span>
          </div>
        )}
        {phase.k === "error" && (
          <div className="absolute inset-0 grid place-content-center justify-items-center gap-3 bg-ink-50 px-6 text-center">
            <AlertTriangle size={24} className="text-rose-500" aria-hidden />
            <b className="text-[16px] font-bold text-ink-900">{u.name} could not be opened</b>
            <span className="max-w-md font-mono text-[12px] text-ink-500">{phase.message}</span>
            <button onClick={() => setAttempt((n) => n + 1)} className="btn-primary mt-2">
              <RotateCw size={15} /> Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function Universes() {
  const { pathname, search } = useLocation();
  const m = pathname.match(/^\/universes(?:\/([^/]+))?(\/full)?\/?$/);
  const slug = m?.[1] ? decodeURIComponent(m[1]) : null;
  const entry = slug ? universeCatalog.find((u) => u.slug === slug) : undefined;
  // The stage keeps the last persona opened while the grid is showing.
  const [kept, setKept] = useState<string | null>(entry?.slug ?? null);
  useEffect(() => {
    if (entry) setKept(entry.slug);
  }, [entry]);

  if (!m || (slug && !entry)) return <Navigate to="/universes" replace />;
  const staged = universeCatalog.find((u) => u.slug === (entry?.slug ?? kept));

  return (
    <>
      {!entry && <UniversesHome />}
      {staged && <UniverseStage u={staged} visible={!!entry} full={!!m[2]} search={entry ? search : ""} />}
    </>
  );
}
