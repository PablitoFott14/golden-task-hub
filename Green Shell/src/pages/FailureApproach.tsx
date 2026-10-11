import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, type To } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BadgeCheck,
  Calculator,
  CalendarClock,
  CalendarDays,
  ChartLine,
  Check,
  ChevronDown,
  ChevronRight,
  Database,
  FileSearch,
  FileText,
  Flag,
  FlaskConical,
  Gavel,
  GitCompareArrows,
  Hammer,
  Image as ImageIcon,
  Images,
  Info,
  LayoutGrid,
  ListChecks,
  Mail,
  MessagesSquare,
  PenLine,
  Radar,
  RotateCcw,
  Rows3,
  Scale,
  ScanEye,
  SearchCheck,
  SearchX,
  Send,
  ShieldCheck,
  Sigma,
  Sparkles,
  Star,
  TriangleAlert,
  WandSparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  allCases,
  caseById,
  categoryById,
  faHeader,
  faPassing,
  faPrinciple,
  faSources,
  failureCategories,
  failurePatterns,
  featureGroups,
  legAModel,
  patternById,
  patternsIn,
  seenOnLegA,
  sourceLabel,
  taskFeatures,
} from "../data/failureApproach";
import type {
  CaseSource,
  FailureCase,
  FailureCategory,
  FailureCategoryId,
  FailurePattern,
  PassDiagnosis,
  TaskFeature,
} from "../data/types";
import { Callout, Crosslinks, Reveal } from "../components/ui";
import { cx } from "../lib/util";

/**
 * The Failure Approach: how Opus actually fails, case by case, and how to make
 * Model A fail the same way for real.
 *
 * **Three levels, one hash.** The overview holds the seven failure types as
 * cards; a type holds its patterns; a pattern holds its real cases and the ways
 * to build it into a Leg A. `#<category>` opens a type, `#<pattern>` opens a
 * pattern and `#keeps-passing` opens the diagnosis for a Leg A that passed.
 * The view is derived from the hash on every render, never held in state, so
 * a deep link renders the right view first time, the back button walks back
 * through the levels, and every crumb and card is an ordinary link.
 *
 * **The header band and its bar persist across the views**, the same idiom as
 * Reference: the seven types, the overview and the diagnosis, one click apart
 * from anywhere. The band carries the scroll anchor for whichever view is
 * open, so every move lands on the bar with the new view under it. On the
 * overview it also carries where the cases come from, because that is what a
 * contributor needs to know before trusting any of them.
 *
 * The first version of this tab was a thirteen pane rail with planning, Leg B
 * hints and rating guidance. Its anchors still resolve through `LEGACY` to the
 * closest view here, because it was live and links to it may have left the hub.
 */

/* -------------------------------------------------------------- text layer */

/**
 * The data keeps its provenance in brackets: `[G 4]`, `[Q Prompt, Constraints]`,
 * `[R 3.1; C Overview]`. None of it reaches the screen. A section number tells
 * a contributor nothing they can act on, and every string goes through this.
 */
const plain = (s: string) => s.replace(/\s*\[[GRCQ] [^\]]*\]/g, "");

/* ---------------------------------------------------------------- lookups */

const catIcon: Record<FailureCategoryId, LucideIcon> = {
  looking: SearchX,
  seeing: ScanEye,
  trusting: GitCompareArrows,
  rules: Scale,
  working: Calculator,
  calls: Gavel,
  finishing: Flag,
};

const featureIcon: Record<TaskFeature, LucideIcon> = {
  photo: ImageIcon,
  handwriting: PenLine,
  chart: ChartLine,
  audio: AudioLines,
  document: FileText,
  email: Mail,
  chat: MessagesSquare,
  calendar: CalendarDays,
  records: Database,
  rule: ListChecks,
  numbers: Sigma,
  dates: CalendarClock,
  "per-item": Rows3,
  send: Send,
  edit: WandSparkles,
};

const featureLabel = Object.fromEntries(taskFeatures.map((f) => [f.id, f.label])) as Record<
  TaskFeature,
  string
>;

/** A pattern's number within its type, "1.2". */
const patternNo = (p: FailurePattern) =>
  `${categoryById[p.category].n}.${patternsIn(p.category).indexOf(p) + 1}`;

const ratio = (c?: FailureCase) => (c?.runs ? c.runs.failed / c.runs.of : 0);

/** The case that repeated most, among those run more than once. */
function strongest(p: FailurePattern): FailureCase | undefined {
  return p.cases
    .filter((c) => c.runs && c.runs.of > 1)
    .reduce<FailureCase | undefined>((best, c) => {
      if (!best) return c;
      const a = ratio(best);
      const b = ratio(c);
      return b > a || (b === a && c.runs!.of > best.runs!.of) ? c : best;
    }, undefined);
}

const caveatOf = (p: FailurePattern) => p.caveat ?? categoryById[p.category].caveat;

const legACases = allCases.filter((c) => c.model === legAModel).length;
const goldenCases = allCases.filter((c) => c.source === "golden").length;

/**
 * The first version's anchors, mapped to the nearest view of this one. Its
 * group panes were `finding`, `media`, `reasoning` and `delivering`, its
 * patterns `a1` to `d4`. Anything else it had lands on the overview.
 */
const LEGACY: Record<string, string> = {
  finding: "looking",
  media: "seeing",
  reasoning: "trusting",
  delivering: "finishing",
  a1: "unopened-service",
  a2: "one-level-down",
  a3: "convenient-set",
  a4: "empty-search",
  b1: "handwriting",
  b2: "never-compares",
  b3: "text-over-media",
  c1: "proxy-source",
  c2: "one-story",
  c3: "paraphrased-rule",
  c4: "uncomputed",
  c5: "no-match",
  c6: "wrong-dates",
  d1: "fills-gaps",
  d2: "loses-specifics",
  d3: "stops-short",
  d4: "never-rechecks",
  "not-to-build": faPassing.id,
};

type View =
  | { kind: "overview" }
  | { kind: "category"; c: FailureCategory }
  | { kind: "pattern"; p: FailurePattern }
  | { kind: "passing" };

/** Own keys only: a hash like `#constructor` must not match the prototype. */
const own = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

function viewOf(id: string): View {
  if (own(categoryById, id)) return { kind: "category", c: categoryById[id as FailureCategoryId] };
  if (own(patternById, id)) return { kind: "pattern", p: patternById[id] };
  if (id === faPassing.id) return { kind: "passing" };
  return { kind: "overview" };
}

/* ------------------------------------------------------------------ pieces */

/**
 * A case says which Opus it ran on before anything else, because Leg A runs
 * Opus 5 and a case on that version is the closest evidence a contributor has.
 * The Leg A version is filled; the source sits beside it where it means
 * something to a contributor.
 */
function SourceChip({ c }: { c: FailureCase }) {
  const latest = c.model === legAModel;
  const where = sourceLabel[c.source as CaseSource].label;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5" title={sourceLabel[c.source].hint}>
      <span
        className={cx(
          "chip",
          latest
            ? "bg-brand-600 text-white"
            : "bg-ink-100 text-ink-700 ring-1 ring-ink-200"
        )}
      >
        {c.model ?? "Opus"}
        {latest && <span className="sr-only">, the model Leg A runs</span>}
      </span>
      {where && <span className="font-mono text-[11px] text-ink-500">{where}</span>}
    </span>
  );
}

/** Marks a pattern one of whose cases ran on the Leg A model. */
function LegAChip() {
  return (
    <span
      title={`At least one case here ran on ${legAModel}, the model Leg A runs`}
      className="chip bg-brand-500/15 text-brand-700 ring-1 ring-brand-500/25 dark:text-brand-300"
    >
      <BadgeCheck size={11} aria-hidden /> Seen on {legAModel}
    </span>
  );
}

/**
 * Runs of the same task, one dot each: filled for a run that failed, hollow for
 * one that passed. The words beside them carry the same fact, so the dots are
 * never the only way to read it.
 */
function RunDots({ c, short }: { c: FailureCase; short?: boolean }) {
  if (c.runLabel) {
    return <span className="whitespace-nowrap font-mono text-[11px] text-ink-400">{c.runLabel}</span>;
  }
  const r = c.runs;
  const dots = r ? Array.from({ length: r.of }, (_, i) => i < r.failed) : [true];
  const label = r
    ? short
      ? `${r.failed} of ${r.of} runs`
      : `failed ${r.failed} of ${r.of} runs`
    : c.source === "golden"
      ? "the Leg A run"
      : "one graded run";
  return (
    <span className="inline-flex items-center gap-1.5">
      <DotRow dots={dots} />
      <span className="whitespace-nowrap font-mono text-[11px] text-ink-500">{label}</span>
    </span>
  );
}

function DotRow({ dots }: { dots: boolean[] }) {
  return (
    <span aria-hidden className="flex gap-[3px]">
      {dots.map((on, i) => (
        <span
          key={i}
          className={cx(
            "h-2 w-2 rounded-full",
            on ? "bg-rose-500 dark:bg-rose-400" : "ring-1 ring-inset ring-ink-300"
          )}
        />
      ))}
    </span>
  );
}

function Crumbs({ items }: { items: { label: string; to?: To }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-1.5 text-[12.5px]">
      {items.map((it, i) => (
        <Fragment key={it.label}>
          {i > 0 && <ChevronRight size={12} className="shrink-0 text-ink-300" aria-hidden />}
          {it.to ? (
            <Link to={it.to} className="font-semibold text-ink-500 transition hover:text-brand-600">
              {it.label}
            </Link>
          ) : (
            <span aria-current="page" className="font-semibold text-ink-800">
              {it.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  note,
  count,
  id,
}: {
  icon?: LucideIcon;
  title: string;
  note?: ReactNode;
  count?: number;
  id?: string;
}) {
  return (
    <div id={id} className={cx(id && "scroll-mt-24")}>
      <h3 className="flex items-center gap-2 font-display text-[19px] font-bold tracking-tight text-ink-900">
        {Icon && (
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
            <Icon size={15} />
          </span>
        )}
        {title}
        {count !== undefined && (
          <span className="rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-500">
            {count}
          </span>
        )}
      </h3>
      {note && <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-ink-500">{note}</p>}
    </div>
  );
}

function CaveatNote({ text }: { text: string }) {
  return (
    <Callout title="How far the evidence goes" tone="warn" icon={<TriangleAlert size={13} />}>
      {plain(text)}
    </Callout>
  );
}

function FeatureTag({ f, on }: { f: TaskFeature; on?: boolean }) {
  const Icon = featureIcon[f];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11.5px] font-medium",
        on
          ? "bg-brand-500/15 text-brand-700 ring-1 ring-brand-500/25 dark:text-brand-300"
          : "bg-ink-100 text-ink-600"
      )}
    >
      <Icon size={11} aria-hidden />
      {featureLabel[f]}
    </span>
  );
}

function StepLink({ dir, to, kicker, label }: { dir: "prev" | "next"; to: To; kicker: string; label: string }) {
  return (
    <Link
      to={to}
      className={cx(
        "card card-hover group flex items-center gap-3 p-4",
        dir === "next" && "sm:flex-row-reverse sm:text-right"
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-100 text-ink-500 transition group-hover:bg-brand-500/10 group-hover:text-brand-600">
        {dir === "prev" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
      </span>
      <span className="min-w-0">
        <span className="mono-label block text-ink-400">{kicker}</span>
        <span className="mt-0.5 block text-[13.5px] font-semibold leading-snug text-ink-800">{label}</span>
      </span>
    </Link>
  );
}

/* --------------------------------------------------------------- the band */

/**
 * The seven types in run order, then the diagnosis, set apart because it is a
 * different moment: after the run rather than while building. One row from
 * 1280px; below that the row scrolls sideways and keeps the open type in view.
 * The way back to the overview is the crumb, the band's link and the nav tab.
 */
function CategoryBar({ active }: { active: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = ref.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth) return;
    const on = nav.querySelector<HTMLElement>('[aria-current="page"]');
    if (!on) {
      nav.scrollTo({ left: 0 });
      return;
    }
    const left = on.offsetLeft;
    const right = left + on.offsetWidth;
    if (left < nav.scrollLeft || right > nav.scrollLeft + nav.clientWidth) {
      nav.scrollTo({ left: left - (nav.clientWidth - on.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  const pill = (on: boolean, tone?: "amber") =>
    cx(
      "inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[12.5px] font-semibold transition",
      on
        ? "border-brand-500 bg-brand-600 text-white shadow-glow"
        : tone === "amber"
          ? "border-amber-300/70 bg-amber-50/70 text-amber-800 hover:border-amber-400 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
          : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300 hover:text-ink-900"
    );

  return (
    <nav
      ref={ref}
      aria-label="Failure types"
      className="relative -mx-1 mt-5 flex items-center gap-1.5 overflow-x-auto px-1 pb-1 xl:flex-wrap xl:overflow-visible"
    >
      {failureCategories.map((c) => {
        const on = c.id === active;
        return (
          <Link
            key={c.id}
            to={{ hash: `#${c.id}` }}
            aria-current={on ? "page" : undefined}
            title={c.name}
            className={pill(on)}
          >
            <span
              className={cx(
                "grid h-[18px] w-[18px] place-items-center rounded-md font-mono text-[10px] font-bold",
                on ? "bg-white/20 text-white" : "bg-ink-100 text-ink-500"
              )}
            >
              {c.n}
            </span>
            {c.short}
          </Link>
        );
      })}
      <span aria-hidden className="mx-1 h-6 w-px shrink-0 bg-ink-200" />
      <Link
        to={{ hash: `#${faPassing.id}` }}
        aria-current={active === faPassing.id ? "page" : undefined}
        className={pill(active === faPassing.id, "amber")}
      >
        <RotateCcw size={13} aria-hidden />
        {faPassing.short}
      </Link>
    </nav>
  );
}

const tileIcon: Record<string, LucideIcon> = {
  studies: FlaskConical,
  "openclaw-mm": Images,
  golden: Star,
};

/**
 * Where the cases come from, as the first thing on the overview. Three
 * sources, each with the one number that says how much stands behind it, and
 * the three things a reader needs to read a case: the dots, the versions, the
 * names. On a phone the reading notes fold away, so the types are still close.
 */
function SourcesStrip() {
  const notes = (
    <dl className="grid gap-x-6 gap-y-2.5 md:grid-cols-3">
      {faSources.notes.map((n) => (
        <div key={n.id} className="text-[12px] leading-relaxed text-ink-500">
          <dt className="mono-label mb-0.5 flex items-center gap-1.5 text-ink-400">
            {n.id === "runs" && <DotRow dots={[true, true, true, false]} />}
            {n.label}
          </dt>
          <dd>{plain(n.body)}</dd>
        </div>
      ))}
    </dl>
  );
  return (
    <section
      id={faSources.id}
      aria-labelledby="fa-sources-title"
      className="mt-6 scroll-mt-20 rounded-2xl border border-ink-200/70 bg-surface/80 p-4 shadow-soft backdrop-blur sm:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="fa-sources-title" className="mono-label text-brand-600 dark:text-brand-300">
          {faSources.title}
        </h2>
        <p className="font-mono text-[11.5px] text-ink-500">
          {allCases.length} real cases, {legACases} of them on {legAModel}, the model Leg A runs
        </p>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {faSources.tiles.map((t) => {
          const Icon = tileIcon[t.id] ?? Info;
          return (
            <div key={t.id} className="flex gap-3 rounded-xl border border-ink-200/60 bg-raised p-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
                <Icon size={17} aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className="font-display text-[22px] font-bold leading-none text-ink-900">
                    {t.value ?? String(goldenCases)}
                  </span>
                  <span className="text-[12px] font-semibold text-ink-600">{t.unit}</span>
                </div>
                <div className="mt-1 text-[12.5px] font-bold text-ink-800">{t.name}</div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-500">{plain(t.body)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 hidden border-t border-ink-200/70 pt-3 md:block">{notes}</div>
      <details className="group mt-3 border-t border-ink-200/70 pt-3 md:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[12.5px] font-semibold text-ink-600 [&::-webkit-details-marker]:hidden">
          How to read a case
          <ChevronDown size={14} className="transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="mt-2.5">{notes}</div>
      </details>
    </section>
  );
}

/* ---------------------------------------------------------------- overview */

function CategoryCard({ c }: { c: FailureCategory }) {
  const ps = patternsIn(c.id);
  const cases = ps.flatMap((p) => p.cases);
  const Icon = catIcon[c.id];
  return (
    <Link to={{ hash: `#${c.id}` }} className="card card-hover group flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
          <Icon size={20} />
        </span>
        <span className="font-mono text-[12px] font-bold text-ink-300">0{c.n}</span>
      </div>
      <div className="mono-label mt-4 text-ink-400">{c.stage}</div>
      <h3 className="mt-1 font-display text-[17px] font-bold leading-snug tracking-tight text-ink-900">
        {c.name}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{c.line}</p>

      <div className="mt-4">
        <div className="font-display text-[26px] font-bold leading-none text-brand-600 dark:text-brand-300">
          {c.stat.value}
        </div>
        <p className="mt-1 text-[11.5px] leading-snug text-ink-500">{c.stat.label}</p>
      </div>

      <ul className="mt-4 flex-1 space-y-1 border-t border-ink-200/70 pt-3.5">
        {ps.map((p) => (
          <li key={p.id} className="flex gap-1.5 text-[12.5px] leading-snug text-ink-600">
            <ChevronRight size={12} className="mt-[3px] shrink-0 text-ink-300" aria-hidden />
            {p.name}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 text-[11.5px] text-ink-500">
        <span className="font-mono">
          {ps.length} patterns · {cases.length} real cases
        </span>
        <ArrowRight
          size={14}
          className="ml-auto text-brand-500 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </Link>
  );
}

function PassingTile() {
  return (
    <Link
      to={{ hash: `#${faPassing.id}` }}
      className="group flex h-full flex-col rounded-2xl border border-amber-300/70 bg-amber-50/60 p-5 shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-lift dark:border-amber-500/30 dark:bg-amber-500/10"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300">
        <RotateCcw size={20} />
      </span>
      <div className="mono-label mt-4 text-amber-700 dark:text-amber-300">After the run</div>
      <h3 className="mt-1 font-display text-[17px] font-bold leading-snug tracking-tight text-ink-900">
        {faPassing.short}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
        Find out why each planned failure point passed, and what to change before you run Leg A
        again.
      </p>
      <ul className="mt-4 flex-1 space-y-1 border-t border-amber-300/50 pt-3.5 dark:border-amber-500/20">
        {[
          `${faPassing.diagnose.length} ways a pass gives itself away`,
          "How to raise the odds",
          "What rarely makes it fail",
        ].map((t) => (
          <li key={t} className="flex gap-1.5 text-[12.5px] leading-snug text-ink-700">
            <ChevronRight size={12} className="mt-[3px] shrink-0 text-amber-500" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
      <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-amber-700 dark:text-amber-300">
        Diagnose the run
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

function PatternRow({ p, hit }: { p: FailurePattern; hit: TaskFeature[] }) {
  const c = categoryById[p.category];
  const best = strongest(p);
  return (
    <Link to={{ hash: `#${p.id}` }} className="card card-hover group flex h-full gap-3 p-4">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-mono text-[11px] font-bold text-brand-700 dark:text-brand-300">
        {patternNo(p)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mono-label block text-ink-400">{c.name}</span>
        <span className="mt-0.5 block font-display text-[14.5px] font-bold leading-snug text-ink-900">
          {p.name}
        </span>
        <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-500">{p.line}</span>
        <span className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {hit.map((f) => (
            <FeatureTag key={f} f={f} on />
          ))}
          {best && <RunDots c={best} short />}
          {seenOnLegA(p) && <LegAChip />}
        </span>
      </span>
    </Link>
  );
}

function TaskFilter({
  picked,
  toggle,
  clear,
}: {
  picked: TaskFeature[];
  toggle: (f: TaskFeature) => void;
  clear: () => void;
}) {
  const results = useMemo(
    () =>
      failurePatterns
        .map((p, i) => ({ p, i, hit: p.fits.filter((f) => picked.includes(f)) }))
        .filter((x) => x.hit.length > 0)
        .sort(
          (a, b) =>
            b.hit.length - a.hit.length || ratio(strongest(b.p)) - ratio(strongest(a.p)) || a.i - b.i
        ),
    [picked]
  );

  return (
    <section>
      <SectionTitle
        id="your-task"
        icon={SearchCheck}
        title="Start from what your task has"
        note="Pick the inputs, the services and the asks your parameters give you. The patterns you can build on them appear below, the ones that repeat most first."
      />
      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {featureGroups.map((g) => (
          <div key={g} className="card p-4">
            <div className="mono-label mb-3 text-ink-400">{g}</div>
            <div className="flex flex-wrap gap-1.5">
              {taskFeatures
                .filter((f) => f.group === g)
                .map((f) => {
                  const on = picked.includes(f.id);
                  const Icon = featureIcon[f.id];
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggle(f.id)}
                      aria-pressed={on}
                      className={cx(
                        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12.5px] font-semibold transition",
                        on
                          ? "border-brand-500 bg-brand-600 text-white shadow-glow"
                          : "border-ink-200 bg-surface text-ink-600 hover:border-brand-300 hover:text-ink-900"
                      )}
                    >
                      <Icon size={13} aria-hidden />
                      {f.label}
                      {on && <X size={12} aria-hidden />}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-5">
        {picked.length === 0 ? (
          <p className="flex items-center gap-2 text-[13px] text-ink-400">
            <Info size={14} aria-hidden /> Pick one or more to see the patterns that fit.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[13.5px] font-semibold text-ink-800">
                {results.length} {results.length === 1 ? "pattern fits" : "patterns fit"}
              </span>
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
              >
                <X size={13} aria-hidden /> Clear
              </button>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {results.map((r) => (
                <PatternRow key={r.p.id} p={r.p} hit={r.hit} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Overview({
  picked,
  setPicked,
}: {
  picked: TaskFeature[];
  setPicked: (f: TaskFeature[]) => void;
}) {
  const toggle = (f: TaskFeature) =>
    setPicked(picked.includes(f) ? picked.filter((x) => x !== f) : [...picked, f]);

  return (
    <div className="wrap space-y-14 py-10">
      <section>
        <SectionTitle
          title="Seven ways Opus fails, in the order a run breaks"
          note="Each type holds the patterns that showed up in graded runs. Open one to see its real cases, why each one failed, and how to build the same pressure into your task."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {failureCategories.map((c, i) => (
            <Reveal key={c.id} delay={Math.min(i * 0.04, 0.24)} className="h-full">
              <CategoryCard c={c} />
            </Reveal>
          ))}
          <Reveal delay={0.28} className="h-full">
            <PassingTile />
          </Reveal>
        </div>
      </section>

      <TaskFilter picked={picked} toggle={toggle} clear={() => setPicked([])} />

      <section className="rounded-2xl border border-emerald-300/60 bg-emerald-50/50 p-5 sm:p-6 dark:border-emerald-500/25 dark:bg-emerald-500/10">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck size={16} />
          </span>
          <h3 className="font-display text-[15.5px] font-bold text-ink-900">{faPrinciple.title}</h3>
        </div>
        <p className="mt-3 max-w-4xl text-[13.5px] leading-relaxed text-ink-700">{plain(faPrinciple.body)}</p>
        <Crosslinks links={faPrinciple.links} className="mt-4" />
      </section>
    </div>
  );
}

/* ---------------------------------------------------------- one failure type */

function PatternCard({ p }: { p: FailurePattern }) {
  const best = strongest(p);
  const lead = p.cases[0];
  return (
    <Link to={{ hash: `#${p.id}` }} className="card card-hover group flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-md bg-brand-500/10 px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand-700 dark:text-brand-300">
          {patternNo(p)}
        </span>
        {best ? (
          <RunDots c={best} />
        ) : (
          <span className="font-mono text-[11px] text-ink-400">single graded runs</span>
        )}
        <ChevronRight
          size={15}
          className="ml-auto text-ink-300 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
      <h3 className="mt-3 font-display text-[17px] font-bold leading-snug tracking-tight text-ink-900">
        {p.name}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{p.line}</p>

      <div className="mt-4 rounded-xl border border-ink-200/70 bg-raised p-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono-label text-ink-400">Case</span>
          <SourceChip c={lead} />
        </div>
        <div className="mt-1.5 text-[13px] font-semibold text-ink-800">{lead.title}</div>
        <div className="mt-1.5 flex gap-1.5 text-[12px] leading-snug text-ink-500">
          <Zap size={13} className="mt-px shrink-0 text-brand-500" aria-hidden />
          <span>
            <span className="sr-only">Why it failed: </span>
            {plain(lead.why)}
          </span>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
        {seenOnLegA(p) && <LegAChip />}
        {p.caveat && (
          <span className="chip bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300">
            <TriangleAlert size={11} aria-hidden /> Evidence caveat
          </span>
        )}
        <span className="ml-auto font-mono text-[11px] text-ink-400">{p.cases.length} real cases</span>
      </div>
    </Link>
  );
}

function CategoryView({ c }: { c: FailureCategory }) {
  const ps = patternsIn(c.id);
  const Icon = catIcon[c.id];
  const prev = failureCategories[c.n - 2];
  const next = failureCategories[c.n];
  const cases = ps.flatMap((p) => p.cases);
  return (
    <div className="wrap py-8">
      <Crumbs items={[{ label: "Failure Approach", to: "/failure-approach" }, { label: `${c.n}. ${c.name}` }]} />

      <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-soft">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/15">
                <Icon size={15} />
              </span>
              Failure type {c.n} of {failureCategories.length} · {c.stage}
            </div>
            <h2 className="mt-3 font-display text-[28px] font-bold leading-tight tracking-tight sm:text-[34px]">
              {c.name}
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-white/90">{c.summary}</p>
            <div className="mt-5 flex max-w-3xl items-start gap-2.5 rounded-xl bg-white/10 p-3.5">
              <Hammer size={15} className="mt-0.5 shrink-0 text-white/75" aria-hidden />
              <p className="text-[13.5px] leading-relaxed text-white/90">
                <span className="font-bold uppercase tracking-[0.12em] text-white/65">Your lever</span>
                <span className="mx-1.5 text-white/40">·</span>
                {c.lever}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 lg:w-60">
            <div className="font-display text-[36px] font-bold leading-none">{c.stat.value}</div>
            <p className="mt-2 text-[12.5px] leading-snug text-white/85">{c.stat.label}</p>
            <div className="mt-3 border-t border-white/20 pt-3 font-mono text-[11.5px] text-white/80">
              {ps.length} patterns · {cases.length} real cases
            </div>
          </div>
        </div>
      </div>

      {c.caveat && (
        <div className="mt-5">
          <CaveatNote text={c.caveat} />
        </div>
      )}

      <div className="mt-10">
        <SectionTitle
          title="The patterns"
          count={ps.length}
          note="Each one opens with the real runs behind it and why each one failed, then the ways to build it into your Leg A."
        />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {ps.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 0.05, 0.2)} className="h-full">
            <PatternCard p={p} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <StepLink dir="prev" to={{ hash: `#${prev.id}` }} kicker="Previous type" label={prev.name} />
        ) : (
          <StepLink dir="prev" to="/failure-approach" kicker="Back to" label="All seven failure types" />
        )}
        {next ? (
          <StepLink dir="next" to={{ hash: `#${next.id}` }} kicker="Next type" label={next.name} />
        ) : (
          <StepLink dir="next" to={{ hash: `#${faPassing.id}` }} kicker="After the run" label={faPassing.short} />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- one pattern */

/** Who the run belongs to: the Golden Task is a Model A run, the studies measured Opus. */
const actor: Record<CaseSource, string> = {
  golden: "Model A",
  "openclaw-mm": "Opus",
  study: "Opus",
};

/**
 * One graded run, read top to bottom the way a contributor uses it: what was
 * asked, what the model did, the right answer beside what it wrote, then why it
 * failed, which is the part to copy into a Leg A. `flash` rings the card when a
 * build idea below has just pointed at it.
 */
function CaseCard({ c, flash }: { c: FailureCase; flash: boolean }) {
  const who = actor[c.source];
  return (
    <article
      id={`case-${c.id}`}
      className={cx(
        "card flex h-full scroll-mt-28 flex-col p-5 transition-shadow duration-500",
        flash && "ring-2 ring-brand-400 dark:ring-brand-500"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <SourceChip c={c} />
        <span className="ml-auto">
          <RunDots c={c} />
        </span>
      </div>
      <h4 className="mt-3 font-display text-[16px] font-bold leading-snug tracking-tight text-ink-900">
        {c.title}
      </h4>

      <dl className="mt-3 space-y-2.5 text-[13px] leading-relaxed">
        <div>
          <dt className="mono-label text-ink-400">The ask</dt>
          <dd className="mt-0.5 text-ink-700">{c.ask}</dd>
        </div>
        <div>
          <dt className="mono-label text-ink-400">What {who} did</dt>
          <dd className="mt-0.5 text-ink-700">{c.did}</dd>
        </div>
      </dl>

      {(c.truth || c.wrote) && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {c.truth && (
            <div className="rounded-lg border border-emerald-300/50 bg-emerald-50/50 p-3 dark:border-emerald-500/25 dark:bg-emerald-500/10">
              <div className="mono-label mb-1 flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                <Check size={12} aria-hidden /> Right answer
              </div>
              <p className="text-[12.5px] leading-relaxed text-ink-700">{c.truth}</p>
            </div>
          )}
          {c.wrote && (
            <div className="rounded-lg border border-rose-300/50 bg-rose-50/50 p-3 dark:border-rose-500/25 dark:bg-rose-500/10">
              <div className="mono-label mb-1 flex items-center gap-1 text-rose-700 dark:text-rose-300">
                <X size={12} aria-hidden /> What {who} wrote
              </div>
              <p className="text-[12.5px] leading-relaxed text-ink-700">{c.wrote}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2.5 rounded-lg bg-brand-500/10 p-3">
        <Zap size={14} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" aria-hidden />
        <p className="text-[12.5px] leading-relaxed text-ink-700">
          <span className="mono-label mr-1.5 text-brand-700 dark:text-brand-300">Why it failed</span>
          {plain(c.why)}
        </p>
      </div>

      {c.fix && (
        <p className="mt-3 text-[12.5px] leading-relaxed text-ink-600">
          <span className="mono-label mr-1.5 text-ink-400">One step would have caught it</span>
          {c.fix}
        </p>
      )}

      {c.link && <Crosslinks links={[c.link]} className="mt-auto pt-4" />}
    </article>
  );
}

/** Two cases on screen and the rest one click away. The data puts the Golden Task first, then the closest project. */
const FIRST_CASES = 2;

function PatternView({ p }: { p: FailurePattern }) {
  const c = categoryById[p.category];
  const siblings = patternsIn(p.category);
  const at = failurePatterns.indexOf(p);
  const prev = failurePatterns[at - 1];
  const next = failurePatterns[at + 1];
  const best = strongest(p);
  const caveat = caveatOf(p);
  const [more, setMore] = useState(false);
  const [target, setTarget] = useState<{ id: string; n: number } | null>(null);
  const shown = more ? p.cases : p.cases.slice(0, FIRST_CASES);
  const hidden = p.cases.length - FIRST_CASES;

  /* A build idea points at the cases it comes from. The case may be folded
     away, so it opens the list first and scrolls once the card is rendered,
     then rings it for a moment so the eye lands on the right one. `n` makes a
     second click on the same case count as a new request. */
  const showCase = (id: string) => {
    if (p.cases.findIndex((x) => x.id === id) >= FIRST_CASES) setMore(true);
    setTarget((t) => ({ id, n: (t?.n ?? 0) + 1 }));
  };
  useEffect(() => {
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`case-${target.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    const done = window.setTimeout(() => setTarget(null), 1800);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, [target]);

  return (
    <div className="wrap py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Crumbs
          items={[
            { label: "Failure Approach", to: "/failure-approach" },
            { label: `${c.n}. ${c.name}`, to: { hash: `#${c.id}` } },
            { label: p.name },
          ]}
        />
        <div className="flex gap-1.5">
          <Link
            to={prev ? { hash: `#${prev.id}` } : { hash: `#${c.id}` }}
            aria-label={prev ? `Previous pattern: ${prev.name}` : `Back to ${c.name}`}
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-500 transition hover:border-ink-300 hover:text-ink-900"
          >
            <ArrowLeft size={16} />
          </Link>
          <Link
            to={next ? { hash: `#${next.id}` } : { hash: `#${faPassing.id}` }}
            aria-label={next ? `Next pattern: ${next.name}` : faPassing.short}
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-500 transition hover:border-ink-300 hover:text-ink-900"
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {siblings.length > 1 && (
        <nav
          className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
          aria-label={`Patterns in ${c.name}`}
        >
          {siblings.map((s) => {
            const on = s.id === p.id;
            return (
              <Link
                key={s.id}
                to={{ hash: `#${s.id}` }}
                aria-current={on ? "page" : undefined}
                className={cx(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-semibold transition",
                  on
                    ? "bg-brand-500/10 text-brand-700 ring-1 ring-inset ring-brand-500/25 dark:text-brand-300"
                    : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                )}
              >
                <span className="font-mono text-[10.5px]">{patternNo(s)}</span>
                {s.name}
              </Link>
            );
          })}
        </nav>
      )}

      <header className="card mt-5 grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
        <div className="min-w-0">
          <div className="mono-label flex flex-wrap items-center gap-2 text-brand-600 dark:text-brand-300">
            <span className="rounded-md bg-brand-500/10 px-1.5 py-0.5 font-mono text-[11px] font-bold">
              {patternNo(p)}
            </span>
            {c.name}
          </div>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[32px]">
            {p.name}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600">{p.happens}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {best && (
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-2.5 py-1 ring-1 ring-rose-500/20">
                <span className="whitespace-nowrap text-[11.5px] font-semibold text-rose-700 dark:text-rose-300">
                  Most reliable
                </span>
                <RunDots c={best} short />
              </span>
            )}
            {seenOnLegA(p) && <LegAChip />}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="mono-label mr-1 text-ink-400">Builds on</span>
            {p.fits.map((f) => (
              <FeatureTag key={f} f={f} />
            ))}
          </div>
        </div>

        <div className="self-start rounded-xl border border-ink-200/70 bg-raised p-4">
          <div className="mono-label mb-2.5 flex items-center gap-1.5 text-ink-400">
            <Info size={12} aria-hidden /> What the data says
          </div>
          <ul className="space-y-2.5">
            {p.why.map((w) => (
              <li key={w} className="text-[12.5px] leading-relaxed text-ink-600">
                {plain(w)}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {caveat && (
        <div className="mt-5">
          <CaveatNote text={caveat} />
        </div>
      )}

      <section className="mt-10">
        <SectionTitle
          icon={FileSearch}
          title="Real cases"
          count={p.cases.length}
          note={
            <>
              Each case is a graded run: what was asked, what the model did, the right answer beside
              what it wrote, and why it failed. {legAModel} is the model your Leg A runs.{" "}
              <Link
                to={{ pathname: "/failure-approach", hash: `#${faSources.id}` }}
                className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
              >
                Where the cases come from
              </Link>
            </>
          }
        />
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {shown.map((x) => (
            <CaseCard key={x.id} c={x} flash={target?.id === x.id} />
          ))}
        </div>
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setMore((m) => !m)}
            aria-expanded={more}
            className="btn-ghost mt-4"
          >
            <ChevronDown size={15} className={cx("transition-transform", more && "rotate-180")} aria-hidden />
            {more ? "Show fewer cases" : `Show ${hidden} more ${hidden === 1 ? "case" : "cases"}`}
          </button>
        )}
      </section>

      <section className="mt-10">
        <SectionTitle
          icon={Hammer}
          title="Build it into your Leg A"
          note="Ways to put the same pressure into a task built on your assigned universe and your own inputs, each drawn from the cases above. They are starting points: confirm the structure exists in your universe before you build on it."
        />
        <ol className="mt-5 grid gap-3 md:grid-cols-2">
          {p.build.map((b, i) => {
            /* Only cases on this page: the link scrolls, it does not navigate. */
            const from = (b.from ?? []).filter((id) => p.cases.some((x) => x.id === id));
            return (
              <li key={b.text} className="card flex gap-3 p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-600 font-mono text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] leading-relaxed text-ink-700">{plain(b.text)}</p>
                  {from.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="mono-label text-ink-400">From</span>
                      {from.map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => showCase(id)}
                          aria-label={`Show the case: ${caseById[id].title}`}
                          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-raised px-2 py-0.5 text-left text-[11.5px] font-medium text-ink-600 transition hover:border-brand-300 hover:text-ink-900"
                        >
                          <FileSearch size={11} className="shrink-0 text-brand-500" aria-hidden />
                          {caseById[id].title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-300/60 bg-emerald-50/50 p-5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
          <h3 className="flex items-center gap-2 font-display text-[16px] font-bold text-ink-900">
            <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-300" aria-hidden />
            Keep it a real failure
          </h3>
          <ul className="mt-3 space-y-2.5">
            {p.fair.map((f) => (
              <li key={f} className="flex gap-2 text-[13px] leading-relaxed text-ink-700">
                <Check size={14} className="mt-[3px] shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                <span>{plain(f)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="flex items-center gap-2 font-display text-[16px] font-bold text-ink-900">
            <Radar size={16} className="text-brand-500" aria-hidden />
            Spot it in your run
          </h3>
          <ul className="mt-3 space-y-2.5">
            {p.spot.map((s) => (
              <li key={s} className="flex gap-2 text-[13px] leading-relaxed text-ink-700">
                <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                <span>{plain(s)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <StepLink dir="prev" to={{ hash: `#${prev.id}` }} kicker={`Previous · ${patternNo(prev)}`} label={prev.name} />
        ) : (
          <StepLink dir="prev" to={{ hash: `#${c.id}` }} kicker="Back to" label={c.name} />
        )}
        {next ? (
          <StepLink dir="next" to={{ hash: `#${next.id}` }} kicker={`Next · ${patternNo(next)}`} label={next.name} />
        ) : (
          <StepLink dir="next" to={{ hash: `#${faPassing.id}` }} kicker="After the run" label={faPassing.short} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Model A passed */

function DiagnosisCard({ d, n }: { d: PassDiagnosis; n: number }) {
  return (
    <div className="card flex h-full flex-col p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-500/15 font-mono text-[12px] font-bold text-amber-700 dark:text-amber-300">
          {n}
        </span>
        <h4 className="font-display text-[15.5px] font-bold leading-snug text-ink-900">{d.gave}</h4>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-600">
        <span className="mono-label mr-1.5 text-ink-400">What gave it away</span>
        {d.tell}
      </p>
      <div className="mt-3 flex gap-2.5 rounded-lg bg-brand-500/10 p-3">
        <ArrowRight size={14} className="mt-[3px] shrink-0 text-brand-600 dark:text-brand-300" aria-hidden />
        <p className="text-[13px] leading-relaxed text-ink-700">
          <span className="mono-label mr-1.5 text-brand-700 dark:text-brand-300">Change</span>
          {plain(d.change)}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {d.patterns.map((id) => (
          <Link
            key={id}
            to={{ hash: `#${id}` }}
            className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-surface px-2 py-1 text-[12px] font-medium text-ink-600 transition hover:border-brand-300 hover:text-ink-900"
          >
            <span className="font-mono text-[10.5px] text-brand-600 dark:text-brand-300">
              {patternNo(patternById[id])}
            </span>
            {patternById[id].name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PassingView() {
  return (
    <div className="wrap py-8">
      <Crumbs items={[{ label: "Failure Approach", to: "/failure-approach" }, { label: faPassing.short }]} />

      <header className="mt-4 rounded-2xl border border-amber-300/70 bg-amber-50/60 p-6 shadow-soft sm:p-8 dark:border-amber-500/30 dark:bg-amber-500/10">
        <div className="mono-label flex items-center gap-2 text-amber-700 dark:text-amber-300">
          <RotateCcw size={13} aria-hidden /> After the run
        </div>
        <h2 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[32px]">
          {faPassing.title}
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-600">{faPassing.lead}</p>
        <div className="mt-5 flex max-w-3xl gap-2.5 rounded-xl border border-amber-300/60 bg-surface/80 p-4 dark:border-amber-500/25">
          <TriangleAlert size={15} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden />
          <p className="text-[13.5px] leading-relaxed text-ink-700">{plain(faPassing.rule)}</p>
        </div>
        <Crosslinks links={faPassing.links} className="mt-4" />
      </header>

      <section className="mt-10">
        <SectionTitle
          icon={SearchCheck}
          title="What gave it away"
          count={faPassing.diagnose.length}
          note={faPassing.diagnoseLead}
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faPassing.diagnose.map((d, i) => (
            <DiagnosisCard key={d.gave} d={d} n={i + 1} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle icon={Sparkles} title="Raise the odds" />
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faPassing.odds.map((o) => (
            <div key={o.id} className="card flex h-full flex-col p-5">
              <h4 className="font-display text-[15px] font-bold leading-snug text-ink-900">{o.title}</h4>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-600">{plain(o.body)}</p>
              {o.link && <Crosslinks links={[o.link]} className="mt-4" />}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle
          icon={X}
          title="What rarely makes it fail"
          note="Recorded as reliable for both models, or set aside by the studies for a task like yours. Spend the effort elsewhere."
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {faPassing.rarely.map((r) => (
            <div key={r.id} className="rounded-xl border border-ink-200/70 bg-raised p-4">
              <h4 className="text-[13.5px] font-bold text-ink-900">{r.title}</h4>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-600">{plain(r.body)}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <StepLink dir="prev" to="/failure-approach" kicker="Back to" label="All seven failure types" />
        <StepLink
          dir="next"
          to={{ hash: `#${failureCategories[0].id}` }}
          kicker="Start with the biggest"
          label={failureCategories[0].name}
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- page */

export default function FailureApproach() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const raw = decodeURIComponent(hash.replace(/^#/, ""));
  const legacy = own(LEGACY, raw) ? LEGACY[raw] : undefined;
  const id = legacy ?? raw;
  const view = viewOf(id);
  const [picked, setPicked] = useState<TaskFeature[]>([]);

  /* An old anchor renders its new view straight away and the URL is tidied
     after, so a shared link to the first version never flashes the overview. */
  useEffect(() => {
    if (legacy) navigate({ hash: `#${legacy}` }, { replace: true });
  }, [legacy, navigate]);

  const active =
    view.kind === "category"
      ? view.c.id
      : view.kind === "pattern"
        ? view.p.category
        : view.kind === "passing"
          ? faPassing.id
          : "";
  const key = view.kind === "category" ? view.c.id : view.kind === "pattern" ? view.p.id : view.kind;
  const sub = view.kind !== "overview";

  return (
    <div>
      {/* The band carries the open view's anchor, so every move between views
          lands on the bar with the new view directly under it. Off the
          overview it drops the lead paragraph and the sources, to give the
          view the room. */}
      <section
        id={sub ? id : undefined}
        className="relative scroll-mt-16 overflow-hidden border-b border-ink-200/70 bg-surface"
      >
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className={cx("wrap relative", sub ? "pb-4 pt-7" : "pb-5 pt-10")}>
          <div className="mono-label text-brand-600 dark:text-brand-300">{faHeader.eyebrow}</div>
          <h1
            className={cx(
              "mt-2 font-display font-bold leading-tight tracking-tight text-ink-900",
              sub ? "text-[24px] sm:text-[28px]" : "text-[30px] sm:text-[36px]"
            )}
          >
            {faHeader.title}
          </h1>
          {sub ? (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11.5px] text-ink-500">
              <span>{failureCategories.length} failure types</span>
              <span>{failurePatterns.length} patterns</span>
              <span>{allCases.length} real cases</span>
              <Link
                to="/failure-approach"
                className="inline-flex items-center gap-1 font-sans text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
              >
                <LayoutGrid size={13} aria-hidden /> All failure types
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-ink-600">{faHeader.sub}</p>
              <SourcesStrip />
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11.5px] text-ink-500">
                <span>{failureCategories.length} failure types</span>
                <span>{failurePatterns.length} patterns</span>
                <Link
                  to={{ hash: "#your-task" }}
                  className="inline-flex items-center gap-1 font-sans text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
                >
                  Start from what your task has <ArrowDown size={13} aria-hidden />
                </Link>
              </div>
            </>
          )}
          <CategoryBar active={active} />
        </div>
      </section>

      <motion.div
        key={key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {view.kind === "overview" && <Overview picked={picked} setPicked={setPicked} />}
        {view.kind === "category" && <CategoryView c={view.c} />}
        {view.kind === "pattern" && <PatternView p={view.p} />}
        {view.kind === "passing" && <PassingView />}
      </motion.div>
    </div>
  );
}
