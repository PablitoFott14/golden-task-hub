import { Fragment, lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, Navigate, useHref, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowRight, ArrowUpRight, Check, Copy, Download, MonitorSmartphone, Orbit, RotateCw, Telescope } from "lucide-react";
import { universeCatalog, type UniverseEntry } from "../data/universeCatalog";
import { Callout, SectionHeading } from "../components/ui";
import { loadUniverse, mountUniverse, type LoadedUniverse, type MountedUniverse } from "../lib/universeHost";
import { cx } from "../lib/util";

/**
 * The Universes tab: the persona universes, run inside the hub.
 *
 * It replaces the external Universe Viewers site and keeps its shape: a home
 * grid of persona cards, a bar of persona tabs, and a stage that holds one
 * persona's viewer at a time. Going back to the grid keeps the loaded viewer,
 * so returning to it is instant; opening another persona replaces it. "Open
 * full page" opens the same viewer with nothing around it, in a new tab.
 *
 * The viewer on the stage is the persona's own program, not a rebuild of it.
 * `universeHost.ts` runs it in a shadow root; this page only decides which one
 * and when. Routes: `/universes`, `/universes/:slug` (with `?pane=…&tab=…`
 * deep links), `/universes/:slug/full`, and `/universes/:slug/explore`.
 *
 * Explore is the same universe as a research tool: every record of every
 * server in one index, filtered, grouped and cross referenced by person, by
 * day and by shared reference (components/explore, lib/explore). It reads the
 * stored seed itself and never touches the viewer, so the two sit side by
 * side on the stage and switching between them keeps both where they were.
 *
 * Each universe also downloads whole, from its card and from the persona bar:
 * `<slug>.zip` on the repo's GitHub release `universes`. The build packs it
 * from the files it publishes (see vite.config.ts) and the deploy workflow
 * uploads it whenever its contents change, so it holds the version the hub is
 * serving without making the site itself any larger.
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
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-10-19" as the hub writes dates, "Oct 19, 2026". */
const dayLabel = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

/** Explore is its own chunk: the tab's grid and viewer never load it. */
const Explore = lazy(() => import("../components/explore/Explore"));

type Mode = "viewer" | "explore";

/* ------------------------------------------------------------ the ZIPs */

/** Where the ZIPs live: the assets of the release the deploy workflow keeps
 *  (.github/workflows/deploy.yml). GitHub answers with the file as an
 *  attachment, so the link downloads it and the page stays where it is. */
const ZIP_RELEASE = "https://github.com/PablitoFott14/golden-task-hub/releases/download/universes/";

/** Each ZIP's size, put in the bundle by the build that packed it. A build
 *  that packs none (the server-render check, `npm run dev`) has no sizes, and
 *  none show. */
const ZIP_BYTES = (import.meta.env.UNIVERSE_ZIPS ?? {}) as Record<string, number>;

function ZipLink({ u, place }: { u: UniverseEntry; place: "card" | "bar" }) {
  const size = ZIP_BYTES[u.slug] ? mbLabel(ZIP_BYTES[u.slug]) : "";
  const name = `${u.slug}.zip`;
  return (
    <a
      href={ZIP_RELEASE + name}
      download={name}
      title={`${name}${size ? `, ${size}` : ""}: every file and folder of this universe`}
      aria-label={`Download ${u.name}'s universe as a ZIP${size ? `, ${size}` : ""}`}
      className={cx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.64_0.15_var(--h))]",
        place === "card"
          ? "relative z-10 rounded-xl border border-[oklch(0.88_0.04_var(--h))] bg-[oklch(0.975_0.014_var(--h))] px-3 py-2 text-[13.5px] text-[oklch(0.4_0.11_var(--h))] hover:border-[oklch(0.78_0.08_var(--h))] hover:bg-[oklch(0.95_0.03_var(--h))] dark:border-[oklch(0.4_0.05_var(--h))] dark:bg-[oklch(0.26_0.03_var(--h))] dark:text-[oklch(0.86_0.08_var(--h))] dark:hover:border-[oklch(0.52_0.08_var(--h))] dark:hover:bg-[oklch(0.3_0.045_var(--h))]"
          : "shrink-0 rounded-lg border border-ink-200 bg-surface px-2.5 py-1.5 text-[13px] text-ink-700 hover:border-ink-300 hover:bg-ink-100 hover:text-ink-900"
      )}
      style={hue(u)}
    >
      <Download size={place === "card" ? 15 : 14} aria-hidden />
      {place === "card" ? (
        "Download universe (ZIP)"
      ) : (
        <>
          <span className="hidden md:inline">Download universe (ZIP)</span>
          <span className="md:hidden">ZIP</span>
        </>
      )}
      {size && <span className={cx("font-medium text-ink-400", place === "bar" && "hidden lg:inline")}>{size}</span>}
    </a>
  );
}

/* -------------------------------------------------------------- the grid */

/** Copies the Universe Artifact ID, the name a task's universe goes by. */
function CopyId({ id, name }: { id: string; name: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 1600);
    return () => window.clearTimeout(t);
  }, [state]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setState("done");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = id;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      setState(ok ? "done" : "failed");
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${name}'s Universe Artifact ID`}
      className="-my-1 -mr-1.5 inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-[12px] font-semibold text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.64_0.15_var(--h))]"
    >
      {state === "done" ? <Check size={13} className="text-emerald-600 dark:text-emerald-400" aria-hidden /> : <Copy size={13} aria-hidden />}
      <span aria-live="polite">{state === "done" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}</span>
    </button>
  );
}

/** The whole card opens the viewer, through the stretched "Open viewer" link,
 *  and the Explore and ZIP buttons sit above that link. So does the artifact
 *  ID, so it can be selected and copied without opening anything. */
function PersonaCard({ u }: { u: UniverseEntry }) {
  return (
    <div
      style={hue(u)}
      className="card group relative flex h-full flex-col p-[22px] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[oklch(0.8_0.07_var(--h))] hover:shadow-[0_12px_30px_-16px_oklch(0.4_0.09_var(--h)/0.45)] has-[.card-open:focus-visible]:-translate-y-0.5 has-[.card-open:focus-visible]:border-[oklch(0.8_0.07_var(--h))] dark:hover:border-[oklch(0.5_0.08_var(--h))] dark:has-[.card-open:focus-visible]:border-[oklch(0.5_0.08_var(--h))]"
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
      <div className="relative z-10 mb-3.5 mt-auto rounded-xl border border-ink-200/70 bg-raised px-3.5 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="mono-label text-ink-400">Universe Artifact ID</span>
          {u.artifactId && <CopyId id={u.artifactId} name={u.name} />}
        </div>
        {/* It wraps at its own underscores and hyphens, never inside a word. */}
        <div className="mt-1 select-all font-mono text-[12px] leading-snug text-ink-800 [overflow-wrap:anywhere]">
          {u.artifactId
            ? u.artifactId.split(/(_)/).map((s, i) => (i % 2 ? <Fragment key={i}>{s}<wbr /></Fragment> : s))
            : "Not recorded"}
        </div>
        <div className="mt-2.5 flex items-baseline justify-between gap-2 border-t border-ink-200/70 pt-2.5">
          <span className="mono-label text-ink-400">Last updated</span>
          <span className={cx("text-[13px]", u.lastUpdated ? "font-semibold text-ink-800" : "text-ink-500")}>
            {u.lastUpdated ? dayLabel(u.lastUpdated) : "Pending"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-ink-200/70 pt-3.5 text-[13px] text-ink-500">
        <span>
          {u.apps.length} apps · {u.files} files · {mbLabel(u.loadBytes)}
        </span>
        <Link
          to={`/universes/${u.slug}`}
          aria-label={`Open ${u.name}'s viewer`}
          className="card-open inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[oklch(0.44_0.13_var(--h))] outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] dark:text-[oklch(0.8_0.1_var(--h))]"
        >
          Open viewer
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="relative z-10 mt-3.5 grid gap-2">
        <Link
          to={`/universes/${u.slug}/explore`}
          aria-label={`Explore ${u.name}'s universe: every server, person and day, filtered and cross referenced`}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[oklch(0.5_0.14_var(--h))] px-3 py-2 text-[13.5px] font-semibold text-white transition hover:bg-[oklch(0.45_0.14_var(--h))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.64_0.15_var(--h))] focus-visible:ring-offset-2 dark:bg-[oklch(0.62_0.13_var(--h))] dark:text-[oklch(0.15_0.03_var(--h))] dark:hover:bg-[oklch(0.68_0.12_var(--h))]"
          style={hue(u)}
        >
          <Telescope size={15} aria-hidden /> Explore the data
        </Link>
        <ZipLink u={u} place="card" />
      </div>
    </div>
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
          <div role="note" className="mt-6 max-w-3xl">
            <Callout title="Not always the latest version" tone="warn" icon={<AlertTriangle size={13} aria-hidden />}>
              Universes are updated regularly, but the latest changes may not always be reflected here. While most
              universe data generally remains unchanged, always verify relevant information directly through the
              Database Agent or any of the legs of the agent before relying on it for your task.
            </Callout>
          </div>
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

function PersonaBar({ u: staged, fullHref, mode }: { u: UniverseEntry; fullHref: string; mode: Mode }) {
  const current = staged.slug;
  const tail = mode === "explore" ? "/explore" : "";
  // The tabs scroll sideways when they outrun the bar, and keep the open one in view.
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    const on = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !on || nav.scrollWidth <= nav.clientWidth) return;
    const left = on.offsetLeft;
    const right = left + on.offsetWidth;
    if (left < nav.scrollLeft || right > nav.scrollLeft + nav.clientWidth) {
      nav.scrollTo({ left: left - (nav.clientWidth - on.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [current]);
  return (
    <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-ink-200/70 bg-surface px-3 sm:gap-[18px] sm:px-[18px]">
      <Link
        to="/universes"
        className="inline-flex items-center gap-2 whitespace-nowrap font-display text-[14px] font-bold tracking-tight text-ink-900 hover:text-brand-600 dark:hover:text-brand-300"
      >
        <Orbit size={16} className="text-brand-600 dark:text-brand-300" aria-hidden />
        <span className="hidden sm:inline">Universes</span>
      </Link>
      <nav ref={navRef} className="relative flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]" aria-label="Personas">
        {universeCatalog.map((u) => {
          const on = u.slug === current;
          return (
            <Link
              key={u.slug}
              to={`/universes/${u.slug}${tail}`}
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
      <ModeSwitch u={staged} mode={mode} />
      <ZipLink u={staged} place="bar" />
      {mode === "viewer" && (
        <a
          href={fullHref}
          target="_blank"
          rel="noopener"
          className="hidden items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-ink-500 hover:text-ink-900 xl:inline-flex"
        >
          Open full page <ArrowUpRight size={14} aria-hidden />
        </a>
      )}
    </div>
  );
}

/** The persona's own viewer, or Explore: the same universe two ways. */
function ModeSwitch({ u, mode }: { u: UniverseEntry; mode: Mode }) {
  const tab = (to: Mode, label: string, short: string, Icon: typeof Telescope) => (
    <Link
      to={to === "explore" ? `/universes/${u.slug}/explore${lastExplore.get(u.slug) ?? ""}` : `/universes/${u.slug}`}
      aria-current={mode === to ? "page" : undefined}
      title={to === "explore" ? "Filter, group and cross reference every server" : "The persona's apps, as they look"}
      className={cx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-[13px] font-semibold transition",
        mode === to ? "bg-surface text-ink-900 shadow-soft ring-1 ring-ink-200" : "text-ink-500 hover:text-ink-900"
      )}
    >
      <Icon size={14} aria-hidden />
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{short}</span>
    </Link>
  );
  return (
    <div className="flex shrink-0 rounded-lg bg-ink-100 p-0.5" role="group" aria-label="View">
      {tab("viewer", "Viewer", "Viewer", MonitorSmartphone)}
      {tab("explore", "Explore", "Explore", Telescope)}
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
  mode,
  search,
}: {
  u: UniverseEntry;
  visible: boolean;
  full: boolean;
  mode: Mode;
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
  const showViewer = visible && mode === "viewer";
  // Each side loads the first time it is shown, so opening Explore first reads
  // a few MB of records rather than the viewer's whole download.
  const [wanted, setWanted] = useState(showViewer);
  const [explored, setExplored] = useState(visible && mode === "explore");
  useEffect(() => {
    if (showViewer) setWanted(true);
    if (visible && mode === "explore") setExplored(true);
  }, [showViewer, visible, mode]);

  // Fetch the viewer once it is wanted, and take it down with the stage.
  useEffect(() => {
    if (!wanted) return;
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
  }, [u.slug, attempt, wanted]);

  // Run it once it is here and on screen, so it lays out against a real stage.
  useEffect(() => {
    const data = loaded.current;
    if (!data || !showViewer || mounted.current || !hostRef.current) return;
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
      // An engine without deep links of its own opened the pane once; the
      // address does not go on claiming a pane it will not keep.
      if (!mounted.current.deepLinks && pane.current) {
        pane.current = "";
        writePane("");
      }
    } catch (e) {
      console.error(e);
      setPhase({ k: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }, [ready, showViewer]);

  // A universe kept loaded behind the grid, or behind Explore, hears no keys.
  useEffect(() => {
    mounted.current?.setActive(showViewer);
  }, [showViewer, ready]);

  // A link to another pane of the open universe, Explore's "Show in viewer" among them.
  useEffect(() => {
    const next = paneOf(search);
    if (!next || next === pane.current) return;
    pane.current = next;
    const m = mounted.current;
    if (!m) return;
    m.show(next);
    if (!m.deepLinks) {
      pane.current = "";
      writePane("");
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
    document.title = `${u.name} · ${mode === "explore" ? "Explore" : "Universes"} · Golden Task Hub`;
    return () => {
      el.style.overflow = prev;
      document.title = title;
    };
  }, [visible, u.name, mode]);

  const pct = phase.k === "loading" && phase.total ? Math.round((100 * phase.done) / phase.total) : 0;

  return (
    <div
      className={cx("fixed inset-x-0 bottom-0 flex flex-col bg-ink-50", full ? "top-0 z-[60]" : "top-16 z-30", !visible && "hidden")}
      aria-hidden={!visible}
    >
      {!full && <PersonaBar u={u} fullHref={fullHref} mode={mode} />}
      <div className="relative min-h-0 flex-1">
        <div className={cx("absolute inset-0 bg-[#0b0d10]", mode !== "viewer" && "hidden")}>
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
        {explored && (
          <div className={cx("absolute inset-0", mode !== "explore" && "hidden")} style={hue(u)}>
            <Suspense fallback={<div className="h-full bg-ink-50" />}>
              <Explore slug={u.slug} name={u.name} active={visible && mode === "explore"} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

/** Where Explore was last left, per persona, so the switch goes back there. */
const lastExplore = new Map<string, string>();

export default function Universes() {
  const { pathname, search } = useLocation();
  const m = pathname.match(/^\/universes(?:\/([^/]+))?(\/full|\/explore)?\/?$/);
  const slug = m?.[1] ? decodeURIComponent(m[1]) : null;
  const entry = slug ? universeCatalog.find((u) => u.slug === slug) : undefined;
  const mode: Mode = m?.[2] === "/explore" ? "explore" : "viewer";
  if (entry && mode === "explore") lastExplore.set(entry.slug, search);
  // The stage keeps the last persona opened while the grid is showing.
  const [kept, setKept] = useState<string | null>(entry?.slug ?? null);
  const [keptMode, setKeptMode] = useState<Mode>(mode);
  useEffect(() => {
    if (entry) {
      setKept(entry.slug);
      setKeptMode(mode);
    }
  }, [entry, mode]);

  if (!m || (slug && !entry)) return <Navigate to="/universes" replace />;
  const staged = universeCatalog.find((u) => u.slug === (entry?.slug ?? kept));

  return (
    <>
      {!entry && <UniversesHome />}
      {staged && (
        <UniverseStage
          key={staged.slug}
          u={staged}
          visible={!!entry}
          full={m[2] === "/full"}
          mode={entry ? mode : keptMode}
          search={entry && mode === "viewer" ? search : ""}
        />
      )}
    </>
  );
}
