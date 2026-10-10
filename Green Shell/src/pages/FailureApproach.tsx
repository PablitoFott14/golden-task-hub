import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  BookMarked,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  Copy,
  CornerDownRight,
  Eye,
  FileSearch,
  Hammer,
  Info,
  Lightbulb,
  ListTree,
  Lock,
  MessageSquareQuote,
  Microscope,
  RotateCcw,
  Scale,
  ShieldCheck,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import {
  faEvidence,
  faHeader,
  faHowToUse,
  faIndex,
  faIntro,
  faKeepsPassing,
  faLegA,
  faLegB,
  faNotToBuild,
  faPanes,
  faPlanning,
  faRealFailure,
  faShortVersion,
  faWhichModel,
  failureGroups,
  failurePatterns,
  groupById,
  patternById,
  patternsIn,
  type FaPane,
  type FaPaneId,
} from "../data/failureApproach";
import type {
  EvidenceLevel,
  FailureGradeLine,
  FailureGroupId,
  FailurePattern,
  FailureWhy,
} from "../data/types";
import { specGroups } from "../data/specDoc";
import { Inline } from "../components/Markdown";
import { Callout, Crosslinks, Reveal, SectionHeading } from "../components/ui";
import { useRailFollow, useStickyFit } from "../lib/useStickyFit";
import { cx } from "../lib/util";

/**
 * The Failure Approach tab.
 *
 * **Laid out the way the Spec Doc is**, because it is the same problem: more
 * content than one page can carry, in groups a reader opens one at a time. A
 * vertical rail lists the panes with their counts, one pane renders at a time,
 * and an inbound `#anchor` opens the pane that holds it. The rail is bounded
 * with `useStickyFit` and follows the active row, like every rail in the hub.
 *
 * **A pattern group is the Method page's idiom**: one compact card per
 * pattern, and the selected one opens in full in a panel below. One card at a
 * time is what keeps seventeen of them readable; opened flat they are the
 * length of the guidelines. `/failure-approach#c3` opens the group, selects
 * C3, and the layout's own scroll effect lands on its panel.
 *
 * Clicks on the rail, a card or the footer move the pane without touching the
 * URL, the same as the Spec Doc. That is why the hash effect watches `key` as
 * well as `hash`: a link aimed at the anchor already in the URL changes
 * neither string, and without the key it would be a dead click.
 *
 * All the copy comes from `failureApproach.ts`, and every string goes through
 * `FaText` below, which is where the citation brackets, the pattern codes and
 * the link markup turn into badges, chips and links.
 */

/* ----------------------------------------------------------------- the text */

const CODES = failurePatterns.map((p) => p.code);
/** A `{{target|label}}` link, or a pattern code standing on its own. */
const TOKEN = new RegExp(`(\\{\\{[^|}]+\\|[^}]+\\}\\})|\\b(${CODES.join("|")})\\b`, "g");
/** `[G 4; G 1.2.1]`, `[Q Prompt, Constraints]`, `[R 3.1]`: any citation the source carries. */
const CITE = /\s*\[([GRCQI] [^\]]*)\]/g;

const slug = (s: string) => s.replace(/[^a-z0-9]/gi, "-").toLowerCase();
/** Has to match `dimSlug` in SpecDoc.tsx, which puts this anchor on every dimension card. */
const dimSlug = (name: string) => "dim-" + slug(name).replace(/-+/g, "-").replace(/^-|-$/g, "");

interface SpecRef {
  label: string;
  to?: string;
}

/**
 * `Prompt, Valid Model Failure` resolved to the Spec Doc card it names. The
 * name is matched as a prefix because the source writes "Hint Leak" for "Hint
 * Leak (Leg B)". A name the spec no longer carries renders as text, never as a
 * dead link.
 */
function specRef(ref: string): SpecRef {
  const at = ref.indexOf(", ");
  const group = at < 0 ? "" : ref.slice(0, at);
  const dim = at < 0 ? ref : ref.slice(at + 2);
  const g = specGroups.find((x) => x.group === group);
  const d =
    g?.dimensions.find((x) => x.name === dim) ?? g?.dimensions.find((x) => x.name.startsWith(dim));
  return { label: dim, to: d ? `/spec#${dimSlug(d.name)}` : undefined };
}

interface Refs {
  body: string;
  /** Guidelines sections, in order, once each. */
  g: string[];
  /** Spec Doc dimensions. */
  q: SpecRef[];
}

/**
 * Lifts the citations out of a string. `G` and `Q` are kept for the tail;
 * `R`, `C` and `I` are the studies and the onboarding's slide text, which are
 * provenance for the maintainer and are dropped here.
 */
function splitRefs(text: string): Refs {
  const g: string[] = [];
  const q: SpecRef[] = [];
  const body = text.replace(CITE, (_match, inner: string) => {
    for (const part of inner.split(/;\s*/)) {
      const rest = part.slice(2).trim();
      if (part[0] === "G" && !g.includes(rest)) g.push(rest);
      if (part[0] === "Q") {
        const r = specRef(rest);
        if (!q.some((x) => x.label === r.label)) q.push(r);
      }
    }
    return "";
  });
  return { body, g, q };
}

function HubLink({ to, children }: { to: string; children: ReactNode }) {
  const cls =
    "font-semibold text-brand-700 underline decoration-brand-500/35 underline-offset-2 transition hover:decoration-brand-500 dark:text-brand-300";
  return to.startsWith("/") ? (
    <Link to={to} className={cls}>
      {children}
    </Link>
  ) : (
    <Link to={{ hash: `#${to}` }} className={cls}>
      {children}
    </Link>
  );
}

/** A pattern code inside running text, as a link to its card. */
function PatternRef({ id }: { id: string }) {
  const p = patternById[id];
  return (
    <Link
      to={{ hash: `#${id}` }}
      title={`${p.code} · ${p.name}`}
      className="mx-px inline-block rounded bg-brand-500/10 px-1 font-mono text-[0.85em] font-bold text-brand-700 transition hover:bg-brand-500/20 dark:text-brand-300"
    >
      {p.code}
    </Link>
  );
}

/** Turns codes and `{{target|label}}` into links. `self` stays plain text. */
function decorate(s: string, self?: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of s.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(<Fragment key={`t${last}`}>{s.slice(last, at)}</Fragment>);
    if (m[1]) {
      const inner = m[1].slice(2, -2);
      const bar = inner.indexOf("|");
      out.push(
        <HubLink key={`l${at}`} to={inner.slice(0, bar)}>
          {inner.slice(bar + 1)}
        </HubLink>
      );
    } else {
      const id = m[2].toLowerCase();
      out.push(id === self ? <Fragment key={`c${at}`}>{m[2]}</Fragment> : <PatternRef key={`c${at}`} id={id} />);
    }
    last = at + m[0].length;
  }
  if (last === 0) return s;
  if (last < s.length) out.push(<Fragment key={`t${last}`}>{s.slice(last)}</Fragment>);
  return out;
}

/**
 * The guidelines sections a line rests on, printed after it the way the
 * pre-submit gate prints its refs, and the Spec Doc dimensions as links.
 */
function RefTail({ g, q }: { g: string[]; q: SpecRef[] }) {
  if (g.length === 0 && q.length === 0) return null;
  return (
    <>
      {g.length > 0 && (
        <span className="ml-1.5 font-mono text-[10.5px] text-ink-400" title="Guidelines section">
          {g.map((s, i) => (
            <span key={s} className="whitespace-nowrap">
              {i === 0 ? "§" : " · "}
              {s}
            </span>
          ))}
        </span>
      )}
      {q.map((r) =>
        r.to ? (
          <Link
            key={r.label}
            to={r.to}
            title={`In the Spec Doc: ${r.label}`}
            className="ml-1.5 inline-block whitespace-nowrap rounded bg-sky-500/10 px-1.5 font-mono text-[10px] font-semibold text-sky-700 transition hover:bg-sky-500/20 dark:text-sky-300"
          >
            QC · {r.label}
          </Link>
        ) : (
          <span key={r.label} className="ml-1.5 whitespace-nowrap font-mono text-[10px] text-ink-400">
            QC · {r.label}
          </span>
        )
      )}
    </>
  );
}

/** Every string on this page goes through here. */
function FaText({ text, self }: { text: string; self?: string }) {
  const { body, g, q } = splitRefs(text);
  return (
    <>
      <Inline text={body} plain={(s) => decorate(s, self)} />
      <RefTail g={g} q={q} />
    </>
  );
}

/* --------------------------------------------------------------- the pieces */

const LEVEL: Record<EvidenceLevel, { n: number; word: string }> = {
  strong: { n: 3, word: "Strong" },
  moderate: { n: 2, word: "Moderate" },
  limited: { n: 1, word: "Limited" },
};

/** Strength of evidence: a three step meter beside the word, never a colour on its own. */
function EvidenceMeter({ level, label }: { level: EvidenceLevel; label?: string }) {
  const l = LEVEL[level];
  return (
    <span className="inline-flex items-center gap-1.5" title={`Evidence: ${label ?? l.word}`}>
      <span aria-hidden className="flex items-end gap-[2px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cx(
              "w-[3px] rounded-sm",
              ["h-1.5", "h-2.5", "h-3.5"][i],
              i < l.n ? "bg-brand-500 dark:bg-brand-400" : "bg-ink-200"
            )}
          />
        ))}
      </span>
      <span className="text-[11.5px] font-semibold text-ink-600">{label ?? l.word}</span>
    </span>
  );
}

function CodeBadge({ code, on }: { code: string; on?: boolean }) {
  return (
    <span
      className={cx(
        "grid h-7 min-w-[2.25rem] shrink-0 place-items-center rounded-lg px-1.5 font-mono text-[12px] font-bold transition duration-200",
        on ? "bg-brand-600 text-white shadow-glow" : "bg-brand-500/10 text-brand-700 dark:text-brand-300"
      )}
    >
      {code}
    </span>
  );
}

/** A row of pattern links outside running text: a table cell, a card foot. */
function PatternChips({ ids, className }: { ids: string[]; className?: string }) {
  return (
    <span className={cx("inline-flex flex-wrap gap-1", className)}>
      {ids.map((id) => {
        const p = patternById[id];
        return (
          <Link
            key={id}
            to={{ hash: `#${id}` }}
            title={`${p.code} · ${p.name}`}
            className="rounded-md bg-brand-500/10 px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand-700 transition hover:bg-brand-500/20 dark:text-brand-300"
          >
            {p.code}
          </Link>
        );
      })}
    </span>
  );
}

function PaneHeader({
  icon: Icon,
  badge,
  title,
  note,
}: {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3 border-b border-ink-200/70 pb-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 font-mono text-[17px] font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
        {badge ?? (Icon ? <Icon size={20} /> : null)}
      </span>
      <div className="min-w-0">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">{title}</h2>
        {note && <p className="mt-0.5 text-[13px] text-ink-500">{note}</p>}
      </div>
    </div>
  );
}

function SubHead({ id, title, sub }: { id?: string; title: string; sub?: ReactNode }) {
  return (
    <div id={id} className={cx("mb-4 mt-10", id && "scroll-mt-24")}>
      <h3 className="font-display text-[18px] font-bold tracking-tight text-ink-900">{title}</h3>
      {sub && <p className="mt-1 max-w-3xl text-[13.5px] leading-relaxed text-ink-500">{sub}</p>}
    </div>
  );
}

function Lead({ text }: { text: string }) {
  return (
    <p className="max-w-3xl text-[14.5px] leading-relaxed text-ink-600">
      <FaText text={text} />
    </p>
  );
}

function Dot() {
  return <span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-brand-500/60" />;
}

function Bullets({
  items,
  self,
  icon,
}: {
  items: string[];
  self?: string;
  /** Replaces the dot, for a list whose items all say the same kind of thing. */
  icon?: ReactNode;
}) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
          {icon ?? <Dot />}
          <span className="min-w-0">
            <FaText text={t} self={self} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A labelled block inside a card. */
function Panel({ icon: Icon, title, aside, children }: { icon: LucideIcon; title: ReactNode; aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-200/70 bg-raised p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Icon size={15} className="shrink-0 text-brand-600 dark:text-brand-300" />
        <span className="font-display text-[15px] font-bold text-ink-900">{title}</span>
        {aside && <span className="ml-auto">{aside}</span>}
      </div>
      {children}
    </div>
  );
}

function SubLabel({ children, note, first }: { children: ReactNode; note?: string; first?: boolean }) {
  return (
    <div className={cx("mb-2", !first && "mt-5")}>
      <div className="mono-label text-ink-400">{children}</div>
      {note && <p className="mt-0.5 text-[11.5px] leading-snug text-ink-400">{note}</p>}
    </div>
  );
}

/** Copies one line for the in universe agent, or the blank failure point card. */
function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked: the text is on screen to select by hand */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={done ? "Copied" : `${label}: ${text.split("\n")[0]}`}
      className={cx(
        "inline-flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-[11.5px] font-semibold transition",
        done
          ? "border-emerald-300 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-300"
          : "border-ink-200 text-ink-500 hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
      )}
    >
      {done ? <Check size={12} /> : <Copy size={12} />}
      {done ? "Copied" : label}
    </button>
  );
}

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/* --------------------------------------------------------------------- panes */

function OverviewPane() {
  return (
    <section>
      <PaneHeader icon={Compass} title="Overview" note="How to use this tab, which model it is about, and the short version" />
      <div className="max-w-3xl space-y-3">
        {faIntro.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-ink-600">
            <FaText text={p} />
          </p>
        ))}
      </div>

      <SubHead id="how-to-use" title="How to use this tab" />
      <ol className="card divide-y divide-ink-200/70 overflow-hidden">
        {faHowToUse.map((h, i) => (
          <li key={h.when} className="grid gap-1.5 px-4 py-3.5 sm:grid-cols-[200px_1fr] sm:gap-5 sm:px-5">
            <span className="flex items-center gap-2.5 self-start">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-600 font-mono text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-[13.5px] font-bold text-ink-900">{h.when}</span>
            </span>
            <p className="text-[13.5px] leading-relaxed text-ink-700">
              <FaText text={h.body} />
            </p>
          </li>
        ))}
      </ol>

      <SubHead id="which-model" title="Which model this is about" />
      <div className="card overflow-hidden">
        <div className="grid sm:grid-cols-2">
          <div className="border-b border-ink-200/70 p-5 sm:border-b-0 sm:border-r">
            <div className="mono-label mb-2 flex items-center gap-1.5 text-ink-400">
              <Microscope size={13} /> What the studies measured
            </div>
            <p className="text-[14px] leading-relaxed text-ink-700">
              <FaText text={faWhichModel.measured} />
            </p>
          </div>
          <div className="p-5">
            <div className="mono-label mb-2 flex items-center gap-1.5 text-ink-400">
              <FileSearch size={13} /> What your task runs on
            </div>
            <p className="text-[14px] leading-relaxed text-ink-700">
              <FaText text={faWhichModel.legs} />
            </p>
          </div>
        </div>
        <p className="flex gap-2.5 border-t border-ink-200/70 bg-brand-50/60 px-5 py-3.5 text-[14px] font-semibold leading-relaxed text-ink-900 dark:bg-brand-500/10">
          <Info size={16} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" />
          <span>
            <FaText text={faWhichModel.so} />
          </span>
        </p>
        <div className="border-t border-ink-200/70 p-5">
          <p className="text-[13.5px] leading-relaxed text-ink-700">
            <FaText text={faWhichModel.safestLead} />
          </p>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {faWhichModel.safest.map((s) => (
              <li key={s} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13.5px] font-semibold text-ink-800">
            <FaText text={faWhichModel.safestAfter} />
          </p>
        </div>
        <div className="grid gap-5 border-t border-ink-200/70 p-5 lg:grid-cols-[1.2fr_1fr]">
          <p className="text-[13.5px] leading-relaxed text-ink-700">
            <FaText text={faWhichModel.legB} />
          </p>
          <dl className="space-y-1.5 rounded-xl bg-raised p-3.5 text-[13px]">
            <div className="mono-label mb-1 text-ink-400">On this page</div>
            {faWhichModel.terms.map((t) => (
              <div key={t.term} className="flex gap-2">
                <dt className="shrink-0 font-bold text-ink-900">{t.term}</dt>
                <dd className="text-ink-600">means {t.means}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <SubHead id="short-version" title="The short version" />
      <ol className="grid gap-3 sm:grid-cols-2">
        {faShortVersion.map((s, i) => (
          <li key={s.title}>
          <Reveal delay={Math.min(i * 0.03, 0.15)} className="h-full">
            <div className="card flex h-full flex-col p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink-100 font-mono text-[12px] font-bold text-ink-600">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="font-display text-[15px] font-bold leading-snug tracking-tight text-ink-900">
                    {s.title}
                  </h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
                    <FaText text={s.body} />
                  </p>
                </div>
              </div>
              {(s.patterns || s.to) && (
                <div className="mt-auto flex items-center gap-2 pl-10 pt-3">
                  <span className="mono-label text-ink-400">See</span>
                  {s.patterns && <PatternChips ids={s.patterns} />}
                  {s.to && (
                    <Link
                      to={{ hash: `#${s.to}` }}
                      className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 dark:text-brand-300"
                    >
                      {paneLabel(s.to)} <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function RealFailurePane() {
  const f = faRealFailure;
  return (
    <section>
      <PaneHeader icon={Scale} title="Real or manufactured" note="What counts as a fair failure opportunity, and what is your defect instead" />

      <div className="rounded-2xl border border-brand-200/80 bg-brand-50/60 p-5 dark:border-brand-500/30 dark:bg-brand-500/10 sm:p-6">
        <div className="mono-label mb-2 text-brand-700 dark:text-brand-300">Before any failure counts</div>
        <p className="font-display text-[22px] font-bold leading-snug tracking-tight text-ink-900">
          {f.question}
        </p>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-ink-700">
          <FaText text={f.lead} />
        </p>
      </div>

      <SubHead id="control" title="What you control, and what you do not" />
      <div className="grid gap-3 lg:grid-cols-3">
        {f.control.map((c) => (
          <div key={c.area} className="card flex flex-col overflow-hidden">
            <div className="border-b border-ink-200/70 bg-raised px-4 py-2.5 font-display text-[15px] font-bold text-ink-900">
              {c.area}
            </div>
            <div className="flex-1 p-4">
              <div className="mono-label mb-1.5 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 size={12} /> You control
              </div>
              <p className="text-[13px] leading-relaxed text-ink-700">
                <FaText text={c.you} />
              </p>
            </div>
            <div className="border-t border-dashed border-ink-200 p-4">
              <div className="mono-label mb-1.5 flex items-center gap-1.5 text-ink-400">
                <Lock size={12} /> You do not control
              </div>
              <p className="text-[13px] leading-relaxed text-ink-600">
                <FaText text={c.notYou} />
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Callout title="In Green Shell" icon={<Info size={13} />}>
          <FaText text={f.controlNote} />
        </Callout>
      </div>

      <SubHead
        id="real-vs-manufactured"
        title="Real failure or manufactured failure"
        sub="Each row pairs what to build with the version that only looks like it, and says why the second one is your defect rather than the model's."
      />
      <div className="card overflow-hidden">
        <div className="hidden grid-cols-2 gap-4 border-b border-ink-200/70 bg-raised px-5 py-2.5 sm:grid">
          <span className="mono-label flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 size={12} /> Build this
          </span>
          <span className="mono-label flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
            <XCircle size={12} /> Not this
          </span>
        </div>
        <ul className="divide-y divide-ink-200/70">
          {f.compare.map((r, i) => (
            <li key={i} className="px-5 py-3.5">
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <p className="flex gap-2 text-[13px] leading-relaxed text-ink-800">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    <span className="sr-only">Build this: </span>
                    <FaText text={r.build} />
                  </span>
                </p>
                <p className="flex gap-2 text-[13px] leading-relaxed text-ink-600">
                  <XCircle size={14} className="mt-0.5 shrink-0 text-rose-500 dark:text-rose-400" />
                  <span>
                    <span className="sr-only">Not this: </span>
                    <FaText text={r.not} />
                  </span>
                </p>
              </div>
              <p className="mt-2 flex gap-2 pl-[22px] text-[12px] leading-relaxed text-ink-500">
                <CornerDownRight size={12} className="mt-0.5 shrink-0 text-ink-300" />
                <span>
                  <FaText text={r.why} />
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <SubHead id="named-in-guidelines" title="The guidelines already name these patterns" />
      <div className="grid gap-3 lg:grid-cols-2">
        {[
          { lead: f.namedLead, rows: f.named },
          { lead: f.legBLead, rows: f.legB },
        ].map((block) => (
          <div key={block.lead} className="card p-4 sm:p-5">
            <p className="text-[13px] leading-relaxed text-ink-600">
              <FaText text={block.lead} />
            </p>
            <ul className="mt-3 divide-y divide-ink-200/60">
              {block.rows.map((r) => (
                <li key={r.label} className="flex items-center justify-between gap-3 py-2">
                  <span className="text-[13px] text-ink-800">{r.label}</span>
                  <PatternChips ids={r.patterns} className="shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function IndexPane() {
  return (
    <section>
      <PaneHeader
        icon={ListTree}
        title="Pattern index"
        note={`${failurePatterns.length} patterns in ${failureGroups.length} groups. Open one to read its card.`}
      />
      <Lead text={faIndex.lead} />

      {/* The four groups, in the order the work happens. */}
      <ol className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {failureGroups.map((g, i) => (
          <li key={g.id} className="relative">
            <Link
              to={{ hash: `#${g.id}` }}
              className="card card-hover group flex h-full flex-col p-4"
            >
              <span className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 font-mono text-[13px] font-bold text-white">
                  {g.letter}
                </span>
                <span className="mono-label text-ink-400">{patternsIn(g.id).length} patterns</span>
              </span>
              <span className="mt-2.5 font-display text-[15px] font-bold leading-snug text-ink-900">{g.title}</span>
              <span className="mt-0.5 text-[12px] text-ink-500">{g.stage}</span>
            </Link>
            {i < failureGroups.length - 1 && (
              <ChevronRight
                aria-hidden
                size={16}
                className="absolute -right-[13px] top-1/2 z-10 hidden -translate-y-1/2 text-ink-300 lg:block"
              />
            )}
          </li>
        ))}
      </ol>

      <div className="card mt-6 overflow-hidden">
        <div className="hidden grid-cols-[minmax(0,1.6fr)_150px_150px_minmax(0,1fr)] gap-4 border-b border-ink-200/70 bg-raised px-5 py-2.5 md:grid">
          {["Pattern", "Evidence", "OpenClaw MM share", "Strongest fit"].map((h) => (
            <span key={h} className="mono-label text-ink-400">
              {h}
            </span>
          ))}
        </div>
        {failureGroups.map((g) => (
          <div key={g.id}>
            <div className="border-b border-ink-200/70 bg-ink-50/60 px-5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              {g.letter} · {g.title}
            </div>
            <ul className="divide-y divide-ink-200/60 border-b border-ink-200/70 last:border-b-0">
              {patternsIn(g.id).map((p) => (
                <li key={p.id}>
                  <Link
                    to={{ hash: `#${p.id}` }}
                    className="group grid gap-2 px-5 py-3 transition hover:bg-raised md:grid-cols-[minmax(0,1.6fr)_150px_150px_minmax(0,1fr)] md:items-center md:gap-4"
                  >
                    <span className="flex items-center gap-2.5">
                      <CodeBadge code={p.code} />
                      <span className="text-[13.5px] font-semibold leading-snug text-ink-900 group-hover:text-brand-700 dark:group-hover:text-brand-300">
                        {p.name}
                      </span>
                    </span>
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-[46px] md:contents">
                      <EvidenceMeter level={p.evidence.level} label={p.evidence.label} />
                      <span className="text-[12.5px] text-ink-600">
                        <span className="font-mono font-semibold text-ink-800">{p.share.value}</span>
                        {p.share.with && <span className="text-ink-400"> · {p.share.with}</span>}
                      </span>
                      <span className="text-[12.5px] leading-snug text-ink-500">{p.fit}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-ink-500">
        <FaText text={faIndex.shareNote} />
      </p>

      <SubHead id="how-to-read" title="How to read a card" />
      <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        <div className="card p-4 sm:p-5">
          <div className="mono-label mb-3 text-ink-400">Evidence says how much the data supports the pattern</div>
          <ul className="space-y-3">
            {faIndex.evidence.map((e) => (
              <li key={e.level} className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-3">
                <span className="self-start pt-0.5">
                  <EvidenceMeter level={e.level} />
                </span>
                <span className="text-[13px] leading-relaxed text-ink-700">{e.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-ink-200/70 pt-3 text-[13px] font-semibold leading-relaxed text-ink-800">
            <FaText text={faIndex.evidenceNote} />
          </p>
        </div>
        <ul className="card divide-y divide-ink-200/60 p-1.5">
          {faIndex.card.map((c) => (
            <li key={c.label} className="px-3.5 py-3">
              <div className="text-[13px] font-bold text-ink-900">{c.label}</div>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-600">
                <FaText text={c.text} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const whyTone: Record<FailureWhy["tag"], string> = {
  Documented: "bg-brand-500/10 text-brand-700 dark:text-brand-300",
  Likely: "bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200",
  "Likely, from OpenClaw": "bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200",
  "In the guidelines": "bg-sky-500/10 text-sky-700 dark:text-sky-300",
};

function GradeLines({ lines, self }: { lines: FailureGradeLine[]; self: string }) {
  return (
    <div className="space-y-2.5">
      {lines.map((l, i) =>
        "say" in l ? (
          <p key={i} className="text-[13px] leading-relaxed text-ink-700">
            <FaText text={l.say} self={self} />
          </p>
        ) : (
          <div
            key={i}
            className={cx(
              "rounded-xl border-l-4 bg-surface px-3.5 py-2.5",
              l.kind === "use"
                ? "border-l-emerald-400 dark:border-l-emerald-500/60"
                : "border-l-rose-400 dark:border-l-rose-500/60"
            )}
          >
            <div
              className={cx(
                "mono-label mb-1 flex items-center gap-1.5 text-[10px]",
                l.kind === "use" ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
              )}
            >
              {l.kind === "use" ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
              {l.kind === "use" ? "Example criterion" : "Not this"}
            </div>
            <p className="text-[13px] font-medium leading-relaxed text-ink-900">
              <FaText text={l.criterion} self={self} />
            </p>
            {l.note && (
              <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                <FaText text={l.note} self={self} />
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
}

const OPENCLAW_MM = "**OpenClaw MM:** ";

/** One incident from the studies. The ones from the multimodal project are marked. */
function EvidencePoint({ text }: { text: string }) {
  const mm = text.startsWith(OPENCLAW_MM);
  return (
    <li className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
      <Dot />
      <span className="min-w-0">
        {mm && (
          <span className="mr-1.5 inline-block rounded bg-violet-500/10 px-1.5 align-[1px] font-mono text-[9.5px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
            OpenClaw MM
          </span>
        )}
        <FaText text={mm ? capitalize(text.slice(OPENCLAW_MM.length)) : text} />
      </span>
    </li>
  );
}

function PatternDetail({ p, onGo }: { p: FailurePattern; onGo: (id: string) => void }) {
  const i = failurePatterns.indexOf(p);
  const prev = failurePatterns[i - 1];
  const next = failurePatterns[i + 1];
  const g = groupById[p.group];

  return (
    <motion.article
      key={p.id}
      id={p.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="card mt-6 scroll-mt-24 overflow-hidden"
    >
      <header className="border-b border-ink-200/70 bg-raised p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <CodeBadge code={p.code} on />
          <span className="mono-label text-ink-400">
            {g.letter} · {g.title}
          </span>
          <span className="ml-auto">
            <EvidenceMeter level={p.evidence.level} label={p.evidence.label} />
          </span>
        </div>
        <h3 className="mt-3 font-display text-[22px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[24px]">
          {p.name}
        </h3>
        <div className="mono-label mb-1 mt-4 text-ink-400">What happens</div>
        <p className="max-w-3xl text-[14.5px] leading-relaxed text-ink-700">
          <FaText text={p.happens} self={p.id} />
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip bg-surface text-ink-600 ring-1 ring-ink-200">
            OpenClaw MM share
            <span className="font-mono font-bold text-ink-900">{p.share.value}</span>
            {p.share.with && (
              <span className="text-ink-400">
                · <FaText text={p.share.with} self={p.id} />
              </span>
            )}
          </span>
          <span className="chip bg-surface text-ink-600 ring-1 ring-ink-200">
            Strongest fit <span className="font-semibold text-ink-900">{p.fit}</span>
          </span>
        </div>
      </header>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex gap-3 rounded-xl border border-gold-300/70 bg-gold-50/60 p-4 dark:border-gold-500/30 dark:bg-gold-500/10">
          <Lightbulb size={17} className="mt-0.5 shrink-0 text-gold-600 dark:text-gold-300" />
          <div>
            <div className="mono-label text-gold-700 dark:text-gold-300">Key takeaway</div>
            <p className="mt-1 text-[14px] font-semibold leading-relaxed text-ink-900">
              <FaText text={p.takeaway} self={p.id} />
            </p>
          </div>
        </div>

        <div>
          <div className="mono-label mb-2.5 text-ink-400">Why it happens</div>
          <ul className="space-y-2.5">
            {p.why.map((w, k) => (
              <li key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                {/* A fixed column, so the reasons line up; a chip that fits its word. */}
                <span className="shrink-0 sm:w-[150px] sm:pt-px">
                  <span
                    className={cx(
                      "mono-label inline-block rounded px-1.5 py-0.5 text-[9.5px]",
                      whyTone[w.tag]
                    )}
                  >
                    {w.tag}
                  </span>
                </span>
                <span className="min-w-0 text-[13px] leading-relaxed text-ink-700">
                  <FaText text={w.text} self={p.id} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel icon={Hammer} title="Build it">
            <SubLabel first note="Suggestions. Nobody measured them on Green Shell tasks.">
              Scenario ideas
            </SubLabel>
            <Bullets items={p.ideas} self={p.id} />
            <SubLabel>Keep it fair</SubLabel>
            <Bullets
              items={p.fair}
              self={p.id}
              icon={<ShieldCheck size={13} className="mt-[3px] shrink-0 text-emerald-600 dark:text-emerald-400" />}
            />
          </Panel>
          <Panel icon={Eye} title="Catch it and grade it">
            <SubLabel first>What to watch for in the run</SubLabel>
            <Bullets
              items={p.watch}
              self={p.id}
              icon={<Eye size={13} className="mt-[3px] shrink-0 text-ink-400" />}
            />
            <SubLabel note="Filenames are illustrative. Copy every literal from your own sources.">
              Grade it where it lands
            </SubLabel>
            <GradeLines lines={p.grade} self={p.id} />
          </Panel>
        </div>

        <div className={cx("grid items-start gap-4", p.guidelines && "lg:grid-cols-[1.6fr_1fr]")}>
          <Panel
            icon={Microscope}
            title="Evidence"
            aside={<EvidenceMeter level={p.evidence.level} label={p.evidence.label} />}
          >
            {p.evidence.lead && (
              <p className="mb-3 text-[13px] leading-relaxed text-ink-600">
                <FaText text={p.evidence.lead} self={p.id} />
              </p>
            )}
            {p.evidence.points.length > 0 && (
              <ul className="space-y-2.5">
                {p.evidence.points.map((t, k) => (
                  <EvidencePoint key={k} text={t} />
                ))}
              </ul>
            )}
            {p.evidence.after?.map((t, k) => (
              <p key={k} className="mt-3 text-[13px] leading-relaxed text-ink-600">
                <FaText text={t} self={p.id} />
              </p>
            ))}
          </Panel>
          {p.guidelines && (
            <Panel icon={BookMarked} title="In the guidelines">
              <p className="text-[13px] leading-relaxed text-ink-700">
                <FaText text={p.guidelines} self={p.id} />
              </p>
            </Panel>
          )}
        </div>
      </div>

      <footer className="grid gap-2 border-t border-ink-200/70 bg-raised px-5 py-3 sm:grid-cols-2">
        {prev ? (
          <button
            type="button"
            onClick={() => onGo(prev.id)}
            className="group flex min-w-0 items-center gap-2 rounded-lg py-1 text-left text-[12.5px] text-ink-600 transition hover:text-ink-900"
          >
            <ArrowLeft size={14} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span className="font-mono font-bold text-ink-400">{prev.code}</span>
            <span className="truncate">{prev.name}</span>
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button
            type="button"
            onClick={() => onGo(next.id)}
            className="group flex min-w-0 items-center gap-2 rounded-lg py-1 text-left text-[12.5px] text-ink-600 transition hover:text-ink-900 sm:justify-end sm:text-right"
          >
            <span className="font-mono font-bold text-ink-400">{next.code}</span>
            <span className="truncate">{next.name}</span>
            <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </footer>
    </motion.article>
  );
}

function GroupPane({
  group,
  picked,
  onPick,
  onGo,
}: {
  group: FailureGroupId;
  picked: string;
  onPick: (id: string) => void;
  onGo: (id: string) => void;
}) {
  const g = groupById[group];
  const list = patternsIn(group);
  const current = list.find((p) => p.id === picked) ?? list[0];
  return (
    <section>
      <PaneHeader
        badge={g.letter}
        title={g.title}
        note={`${g.stage} · ${list.length} patterns. Pick one to open its card.`}
      />
      {g.intro && (
        <div className="mb-5 max-w-3xl space-y-2">
          {g.intro.map((t, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-ink-600">
              <FaText text={t} />
            </p>
          ))}
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => {
          const on = p.id === current.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPick(p.id)}
              aria-pressed={on}
              className={cx(
                "group flex h-full w-full flex-col rounded-2xl border p-4 text-left transition duration-300 ease-out",
                on
                  ? "border-brand-400 bg-brand-50/70 shadow-glow dark:border-brand-500/50 dark:bg-brand-500/10"
                  : "border-ink-200/70 bg-surface shadow-soft hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
              )}
            >
              <span className="flex items-center gap-2.5">
                <CodeBadge code={p.code} on={on} />
                <EvidenceMeter level={p.evidence.level} />
                <ChevronRight
                  size={15}
                  className={cx(
                    "ml-auto shrink-0 transition-transform duration-300",
                    on ? "rotate-90 text-brand-500" : "text-ink-300 group-hover:translate-x-0.5"
                  )}
                />
              </span>
              <span className="mt-2.5 font-display text-[15px] font-bold leading-snug tracking-tight text-ink-900">
                {p.name}
              </span>
              <span className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
                Strongest fit: {p.fit}
              </span>
            </button>
          );
        })}
      </div>
      <PatternDetail p={current} onGo={onGo} />
    </section>
  );
}

/** Step 6, the three lines the budget is checked against, drawn to scale. */
function BudgetScale() {
  const zones = [
    { from: 0, to: 30, tone: "bg-rose-400/80 dark:bg-rose-500/60", label: faPlanning.budget.trivial, range: "Under 30%" },
    { from: 30, to: 50, tone: "bg-amber-400/80 dark:bg-amber-500/60", label: faPlanning.budget.floor, range: "30% to 50%" },
    { from: 50, to: 100, tone: "bg-emerald-500/80 dark:bg-emerald-500/60", label: faPlanning.budget.preferred, range: "50% and up" },
  ];
  return (
    <figure className="mt-4 rounded-xl border border-ink-200/70 bg-surface p-4">
      <figcaption className="mono-label mb-3 text-ink-400">Genuine failure, as a share of the final rubric score</figcaption>
      <div className="flex h-3 gap-[2px]" aria-hidden>
        {zones.map((z, i) => (
          <span
            key={z.range}
            className={cx(
              "h-full",
              z.tone,
              i === 0 && "rounded-l-[4px]",
              i === zones.length - 1 && "rounded-r-[4px]"
            )}
            style={{ width: `${z.to - z.from}%` }}
          />
        ))}
      </div>
      <div className="relative mt-1 h-4 font-mono text-[10.5px] text-ink-400" aria-hidden>
        {[0, 30, 50, 100].map((v) => (
          <span
            key={v}
            className={cx("absolute", v === 0 ? "left-0" : v === 100 ? "right-0" : "-translate-x-1/2")}
            style={v === 0 || v === 100 ? undefined : { left: `${v}%` }}
          >
            {v}%
          </span>
        ))}
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {zones.map((z) => (
          <li key={z.range} className="flex gap-2 text-[12px] leading-snug text-ink-600">
            <span className={cx("mt-1 h-2.5 w-2.5 shrink-0 rounded-sm", z.tone)} />
            <span>
              <span className="font-semibold text-ink-900">{z.range}.</span> {z.label}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

const blankCard = [
  "Failure point:",
  ...faPlanning.template.fields.map((f) => `${f.label}:`),
].join("\n");

function PlanningPane() {
  const p = faPlanning;
  const jumps = [
    ...p.steps.map((s) => ({ id: s.id, label: `${s.n} ${s.short}` })),
    { id: p.combos.id, label: "Combinations" },
    { id: p.worked.id, label: "Worked example" },
  ];
  return (
    <section>
      <PaneHeader icon={ClipboardList} title="Plan the task" note={`${p.steps.length} steps, all of them before Leg A runs`} />
      <Lead text={p.lead} />
      <nav aria-label="Jump to a step" className="mt-4 flex flex-wrap gap-1.5">
        {jumps.map((j) => (
          <Link
            key={j.id}
            to={{ hash: `#${j.id}` }}
            className="rounded-lg border border-ink-200 bg-surface px-2.5 py-1 text-[12px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
          >
            {j.label}
          </Link>
        ))}
      </nav>

      <ol className="relative mt-8 space-y-6">
        {p.steps.map((s, i) => (
          <li key={s.id} id={s.id} className="relative scroll-mt-24 pl-12">
            {i < p.steps.length - 1 && (
              <span aria-hidden className="absolute bottom-[-24px] left-[15px] top-10 w-px bg-ink-200" />
            )}
            <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-brand-600 font-mono text-[12px] font-bold text-white shadow-glow">
              {s.n}
            </span>
            <h3 className="pt-1 font-display text-[17px] font-bold tracking-tight text-ink-900">{s.title}</h3>
            <div className="mt-2 space-y-3">
              {s.body?.map((b, k) => (
                <p key={k} className="max-w-3xl text-[13.5px] leading-relaxed text-ink-700">
                  <FaText text={b} />
                </p>
              ))}
              {s.points && <Bullets items={s.points} />}

              {s.n === 1 && (
                <div className="card overflow-hidden">
                  <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-ink-200/70 bg-raised px-4 py-2">
                    <span className="mono-label text-ink-400">If your parameters include</span>
                    <span className="mono-label text-ink-400">Try first</span>
                  </div>
                  <ul className="divide-y divide-ink-200/60">
                    {p.shortlist.map((r) => (
                      <li key={r.has} className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5">
                        <span className="text-[13px] leading-snug text-ink-800">{r.has}</span>
                        <PatternChips ids={r.patterns} className="justify-end" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {s.n === 2 && (
                <>
                  <ul className="space-y-2">
                    {p.explore.map((e) => (
                      <li
                        key={e.q}
                        className="flex items-start gap-3 rounded-xl border border-ink-200/70 bg-surface px-3.5 py-2.5"
                      >
                        <MessageSquareQuote size={14} className="mt-0.5 shrink-0 text-ink-400" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-medium leading-relaxed text-ink-900">{e.q}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <PatternChips ids={e.patterns} />
                            {e.note && <span className="text-[12px] text-ink-500">{e.note}</span>}
                          </div>
                        </div>
                        <CopyButton text={e.q} />
                      </li>
                    ))}
                  </ul>
                  <p className="max-w-3xl text-[13.5px] leading-relaxed text-ink-700">
                    <FaText text={p.exploreAfter} />
                  </p>
                </>
              )}

              {s.n === 4 && (
                <div className="card overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-200/70 bg-raised px-4 py-2.5">
                    <span className="font-mono text-[12.5px] font-bold text-ink-900">
                      Failure point: {p.template.title}
                    </span>
                    <CopyButton text={blankCard} label="Copy blank card" />
                  </div>
                  <dl className="divide-y divide-ink-200/60">
                    {p.template.fields.map((f) => (
                      <div key={f.label} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[230px_1fr] sm:gap-4">
                        <dt className="mono-label pt-0.5 text-ink-400">{f.label}</dt>
                        <dd className="text-[13px] leading-relaxed text-ink-800">
                          <FaText text={f.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {s.n === 6 && <BudgetScale />}
            </div>
          </li>
        ))}
      </ol>

      <SubHead id={p.combos.id} title={p.combos.title} sub={<FaText text={p.combos.lead} />} />
      <div className="grid gap-3 lg:grid-cols-3">
        {p.combos.more.map((c) => (
          <div key={c.title} className="card flex flex-col p-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[26px] font-bold leading-none text-ink-900">{c.lift}×</span>
              <span className="mono-label text-ink-400">as often as chance</span>
            </div>
            <p className="mt-2.5 text-[13.5px] font-semibold leading-snug text-ink-900">{c.title}</p>
            {c.patterns && <PatternChips ids={c.patterns} className="mt-2" />}
            {c.body && (
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-600">
                <FaText text={c.body} />
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border border-dashed border-ink-300/80 p-4">
        <div className="flex flex-wrap gap-2">
          {p.combos.less.map((l) => (
            <span key={l.title} className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
              {l.title} <span className="font-mono font-bold text-ink-900">{l.lift}×</span>
            </span>
          ))}
        </div>
        <p className="mt-2.5 max-w-3xl text-[13px] leading-relaxed text-ink-700">
          <FaText text={p.combos.lessBody} />
        </p>
      </div>

      <SubHead id={p.worked.id} title={p.worked.title} />
      <Lead text={p.worked.lead} />
      <div className="card mt-4 overflow-hidden">
        <div className="hidden grid-cols-[170px_1fr_1fr_1fr] gap-4 border-b border-ink-200/70 bg-raised px-4 py-2.5 md:grid">
          {["Failure point", "Truth lives in", "GTFA value", "A likely wrong value"].map((h) => (
            <span key={h} className="mono-label text-ink-400">
              {h}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-ink-200/60">
          {p.worked.rows.map((r) => (
            <li key={r.point} className="grid gap-2 px-4 py-3 md:grid-cols-[170px_1fr_1fr_1fr] md:gap-4">
              <div>
                <div className="text-[13.5px] font-bold text-ink-900">{r.point}</div>
                <PatternChips ids={r.patterns} className="mt-1" />
              </div>
              {[
                { k: "Truth lives in", v: r.truth, tone: "text-ink-700" },
                { k: "GTFA value", v: r.gtfa, tone: "font-semibold text-emerald-700 dark:text-emerald-300" },
                { k: "A likely wrong value", v: r.wrong, tone: "text-rose-700 dark:text-rose-300" },
              ].map((c) => (
                <div key={c.k} className="text-[13px] leading-relaxed">
                  <span className="mono-label mb-0.5 block text-ink-400 md:hidden">{c.k}</span>
                  <span className={c.tone}>
                    <FaText text={c.v} />
                  </span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {p.worked.notes.map((n) => (
          <div key={n.title} className="rounded-2xl border border-ink-200/70 bg-raised p-4">
            <div className="text-[13.5px] font-bold text-ink-900">{n.title}</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-600">
              <FaText text={n.body} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const placeIcon: Record<string, LucideIcon> = {
  "look-calls": ListTree,
  "look-words": MessageSquareQuote,
  "look-artifacts": FileSearch,
  "look-final": CornerDownRight,
};

function LegAPane() {
  const a = faLegA;
  return (
    <section>
      <PaneHeader icon={FileSearch} title="Read the Leg A run" note={`${a.places.length} places to look, then rate what you find`} />
      <Lead text={a.lead} />
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {a.places.map((pl) => {
          const Icon = placeIcon[pl.id] ?? Eye;
          return (
            <div key={pl.id} id={pl.id} className="card scroll-mt-24 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
                  <Icon size={16} />
                </span>
                <h3 className="font-display text-[15px] font-bold text-ink-900">{pl.title}</h3>
              </div>
              <ul className="space-y-2">
                {pl.items.map((it) => (
                  <li key={it.text} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-700">
                    <Dot />
                    <span className="min-w-0 flex-1">
                      <FaText text={it.text} />
                    </span>
                    <PatternChips ids={it.patterns} className="shrink-0 justify-end" />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <Crosslinks
        className="mt-4"
        links={[
          { to: "/golden-tasks/charge-disputes#model-a", tag: "GT", label: "Where Model A broke in a worked task" },
          { to: "/#failure", tag: "M7", label: "If the model sails through, the task is not ready" },
        ]}
      />

      <SubHead id={a.rating.id} title={a.rating.title} />
      <ol className="grid gap-3 lg:grid-cols-2">
        {a.rating.rules.map((r, i) => (
          <li key={i} className="card flex gap-3 p-4">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-ink-100 font-mono text-[11px] font-bold text-ink-500">
              {i + 1}
            </span>
            <p className="min-w-0 text-[13px] leading-relaxed text-ink-700">
              <FaText text={r} />
            </p>
          </li>
        ))}
      </ol>
      <Crosslinks
        className="mt-4"
        links={[
          { to: "/#rubrics", tag: "M8", label: "Grade what was delivered, not how it got there" },
          { to: "/reference#outcome-over-process", tag: "WN", label: "80/20: grade the outcome, not the route" },
          { to: "/spec#rubric-quality", tag: "QC", label: "The rubric quality issues a reviewer scores" },
        ]}
      />
    </section>
  );
}

function LegBPane() {
  const b = faLegB;
  return (
    <section>
      <PaneHeader icon={MessageSquareQuote} title="Hint in Leg B" note="The same patterns in the golden run, steered at the level of intent" />
      <Lead text={b.lead} />
      <ul className="mt-5 space-y-2.5">
        {b.hints.map((h) => (
          <li key={h.pattern} className="card grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:items-center">
            <div className="flex items-center gap-2.5">
              <PatternChips ids={[h.pattern]} />
              <span className="text-[13.5px] font-semibold text-ink-900">{h.what}</span>
            </div>
            <p className="flex gap-2.5 rounded-xl border border-gold-300/70 bg-gold-50/60 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink-800 dark:border-gold-500/30 dark:bg-gold-500/10">
              <MessageSquareQuote size={14} className="mt-0.5 shrink-0 text-gold-600 dark:text-gold-300" />
              <span>
                <span className="sr-only">Hint: </span>“{h.hint}”
              </span>
            </p>
          </li>
        ))}
      </ul>

      <SubHead id="still-fails" title="When hints are not enough" sub={<FaText text={b.stillLead} />} />
      <div className="grid gap-3 lg:grid-cols-2">
        <Callout title="The input is legible and the scenario feasible" tone="ok" icon={<CheckCircle2 size={13} />}>
          <FaText text={b.feasible} />
        </Callout>
        <Callout title="The setup is contrived or infeasible" tone="warn" icon={<RotateCcw size={13} />}>
          <FaText text={b.infeasible} />
        </Callout>
      </div>
      <Crosslinks
        className="mt-4"
        links={[
          { to: "/golden-tasks/charge-disputes#golden", tag: "GT", label: "Four steers, and what each one never says" },
          { to: "/#golden", tag: "M9", label: "Point at the intent, never at the answer" },
        ]}
      />
    </section>
  );
}

function KeepsPassingPane() {
  const k = faKeepsPassing;
  return (
    <section>
      <PaneHeader
        icon={RotateCcw}
        title="When Model A keeps passing"
        note={`${k.steps.length + 1} steps back to a task that fails honestly`}
      />
      <Callout title="Redesign, never patch" tone="warn" icon={<Ban size={13} />}>
        <FaText text={k.rule} />
      </Callout>

      <SubHead id="diagnose" title={`1. ${k.diagnose.title}`} sub={<FaText text={k.diagnose.lead} />} />
      <div className="card overflow-hidden">
        <div className="hidden grid-cols-[1fr_1fr_1.6fr] gap-4 border-b border-ink-200/70 bg-raised px-5 py-2.5 md:grid">
          {["Why it passed", "What gave it away", "What to change"].map((h) => (
            <span key={h} className="mono-label text-ink-400">
              {h}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-ink-200/60">
          {k.diagnose.rows.map((r) => (
            <li key={r.why} className="grid gap-2 px-5 py-3.5 md:grid-cols-[1fr_1fr_1.6fr] md:gap-4">
              <p className="text-[13px] font-semibold leading-relaxed text-ink-900">{r.why}</p>
              <p className="text-[13px] leading-relaxed text-ink-600">
                <span className="mono-label mr-1.5 text-ink-400 md:hidden">Tell</span>
                {r.tell}
              </p>
              <p className="flex gap-2 text-[13px] leading-relaxed text-ink-800">
                <ArrowRight size={13} className="mt-1 shrink-0 text-brand-500" />
                <span>
                  <FaText text={r.change} />
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <ol className="mt-6 grid gap-3 lg:grid-cols-2">
        {k.steps.map((s) => (
          <li key={s.n} className="card p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 font-mono text-[12px] font-bold text-white">
                {s.n}
              </span>
              <h3 className="font-display text-[15px] font-bold leading-snug text-ink-900">{s.title}</h3>
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-700">
              <FaText text={s.body} />
            </p>
          </li>
        ))}
      </ol>
      <Crosslinks
        className="mt-4"
        links={[
          { to: "/reference#planned-complexity", tag: "WN", label: "Complexity is planned, never patched in" },
          { to: "/reference#s1", tag: "A4", label: "Did Model A fail on things that matter?" },
        ]}
      />
    </section>
  );
}

function NotToBuildPane() {
  const n = faNotToBuild;
  return (
    <section>
      <PaneHeader icon={Ban} title="What not to build around" note={`${n.items.length} things the studies found that rarely pay off here`} />
      <Lead text={n.lead} />
      <ul className="mt-5 grid gap-3 lg:grid-cols-2">
        {n.items.map((t, i) => (
          <li key={i} className="card flex gap-3 p-4">
            <Ban size={15} className="mt-0.5 shrink-0 text-ink-400" />
            <p className="min-w-0 text-[13px] leading-relaxed text-ink-700">
              <FaText text={t} />
            </p>
          </li>
        ))}
      </ul>

      <SubHead id="studies-advice" title={n.adviceTitle} />
      <ul className="card divide-y divide-ink-200/70 overflow-hidden">
        {n.advice.map((a) => (
          <li key={a.studies} className="grid gap-2 px-5 py-3.5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-5">
            <div>
              <div className="mono-label mb-1 text-ink-400">From the studies</div>
              <p className="text-[13px] font-semibold leading-snug text-ink-500">
                <FaText text={a.studies} />
              </p>
            </div>
            <div>
              <div className="mono-label mb-1 text-brand-600 dark:text-brand-300">In Green Shell</div>
              <p className="text-[13px] leading-relaxed text-ink-800">
                <FaText text={a.green} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * A single series of shares, one bar per category, each read against 100%.
 * Every value is printed beside its bar, so the hover layer never gates
 * anything: it lifts the bar and repeats the row in the readout below.
 */
function ShareBars({
  title,
  measure,
  rows,
}: {
  title: string;
  measure: string;
  rows: { label: string; value: number; shown: string; note?: string; patterns?: string[]; setAside?: boolean }[];
}) {
  const [hover, setHover] = useState<number | null>(null);
  const h = hover === null ? null : rows[hover];
  return (
    <figure className="card flex flex-col p-4 sm:p-5">
      <figcaption>
        <div className="font-display text-[15px] font-bold text-ink-900">{title}</div>
        <div className="mono-label mt-0.5 text-ink-400">{measure}</div>
      </figcaption>
      <ul className="mt-4 flex-1 space-y-3">
        {rows.map((r, i) => (
          <li
            key={r.label}
            tabIndex={0}
            aria-label={`${r.label}: ${r.shown}${r.note ? `, ${r.note}` : ""}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className={cx("text-[12.5px] leading-snug text-ink-700", hover === i && "font-semibold text-ink-900")}>
                {r.label}
                {r.note && <span className="text-ink-400"> ({r.note})</span>}
              </span>
              <span className="shrink-0 font-mono text-[12px] font-semibold tabular-nums text-ink-900">{r.shown}</span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-r-[4px] bg-brand-100 dark:bg-brand-500/15">
              <div
                className={cx(
                  "h-full rounded-r-[4px] bg-brand-500 transition-opacity dark:bg-brand-400",
                  hover !== null && hover !== i && "opacity-55"
                )}
                style={{ width: `${r.value}%` }}
              />
            </div>
            {(r.patterns || r.setAside) && (
              <div className="mt-1.5">
                {r.patterns && <PatternChips ids={r.patterns} />}
                {r.setAside && (
                  <span className="text-[11.5px] text-ink-500">
                    Set aside, see <HubLink to="not-to-build">What not to build around</HubLink>
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div aria-hidden className="mt-4 min-h-[38px] rounded-lg bg-raised px-3 py-2 text-[12px] leading-snug text-ink-500">
        {h ? (
          <>
            <span className="font-mono text-[13px] font-bold text-ink-900">{h.shown}</span>
            <span className="text-ink-400"> · {measure.toLowerCase()} · </span>
            {h.label}
          </>
        ) : (
          "Point at a bar to read it against the whole."
        )}
      </div>
    </figure>
  );
}

function EvidencePane() {
  const e = faEvidence;
  return (
    <section>
      <PaneHeader icon={Microscope} title="Where the evidence comes from" note="Read it once. Everything else on this tab rests on it." />
      <Lead text={e.lead} />
      {/* Value first, as the method page's stat row has it, so the figures
          line up whatever the length of the label under them. */}
      <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {e.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse justify-end rounded-xl border border-ink-200/70 bg-surface px-4 py-3">
            <dt className="mono-label mt-1.5 text-ink-400">{s.label}</dt>
            <dd className="font-sans text-[26px] font-semibold leading-none text-ink-900">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <Lead text={e.mm} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <ShareBars title={e.failed.title} measure={e.failed.measure} rows={e.failed.rows} />
        <div className="flex flex-col gap-3">
          <ShareBars title={e.behaved.title} measure={e.behaved.measure} rows={e.behaved.rows} />
          <p className="px-1 text-[12px] leading-relaxed text-ink-500">
            <FaText text={e.behaved.after} />
          </p>
        </div>
      </div>

      <SubHead id={e.habits.id} title={e.habits.title} sub={<FaText text={e.habits.lead} />} />
      <div className="card overflow-hidden">
        <div className="hidden grid-cols-[170px_1fr_90px_minmax(0,0.8fr)] gap-4 border-b border-ink-200/70 bg-raised px-5 py-2.5 md:grid">
          {["Habit", "What it looks like", "Of root failures", "Shows up in"].map((hd) => (
            <span key={hd} className="mono-label text-ink-400">
              {hd}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-ink-200/60">
          {e.habits.rows.map((r) => (
            <li key={r.habit} className="grid gap-1.5 px-5 py-3 md:grid-cols-[170px_1fr_90px_minmax(0,0.8fr)] md:items-center md:gap-4">
              <span className="text-[13.5px] font-bold text-ink-900">{r.habit}</span>
              <span className="text-[13px] leading-relaxed text-ink-600">{r.looks}</span>
              <span className="font-mono text-[13px] font-semibold text-ink-900">
                {r.share}
                <span className="ml-1.5 font-sans text-[11.5px] font-normal text-ink-400 md:hidden">of root failures</span>
              </span>
              <PatternChips ids={r.patterns} />
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-ink-600">
        <FaText text={e.habits.after} />
      </p>

      <SubHead id="glossary" title="Words this page borrows from the studies" />
      <dl className="grid gap-3 sm:grid-cols-2">
        {e.terms.map((t) => (
          <div key={t.term} className="card p-4">
            <dt className="text-[13.5px] font-bold text-ink-900">{t.term}</dt>
            <dd className="mt-1 text-[13px] leading-relaxed text-ink-600">
              <FaText text={t.means} />
            </dd>
          </div>
        ))}
      </dl>

      <SubHead id={e.limits.id} title={e.limits.title} />
      <ul className="card divide-y divide-ink-200/60 overflow-hidden">
        {e.limits.items.map((t, i) => (
          <li key={i} className="px-5 py-3.5 text-[13px] leading-relaxed text-ink-700">
            <FaText text={t} />
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {[e.counting, e.translated].map((t) => (
          <div key={t} className="rounded-2xl border border-ink-200/70 bg-raised p-4 text-[13px] leading-relaxed text-ink-700">
            <FaText text={t} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- the page */

const paneIcon: Partial<Record<FaPaneId, LucideIcon>> = {
  overview: Compass,
  "real-failure": Scale,
  patterns: ListTree,
  planning: ClipboardList,
  "leg-a": FileSearch,
  "leg-b": MessageSquareQuote,
  "keeps-passing": RotateCcw,
  "not-to-build": Ban,
  evidence: Microscope,
};

const isGroup = (id: FaPaneId): id is FailureGroupId => id in groupById;

function paneLabel(id: FaPaneId) {
  const pane = faPanes.find((p) => p.id === id);
  return pane ? pane.label : id;
}

/** What the rail badge counts, read off the data so it cannot drift. */
function paneCount(id: FaPaneId): number | undefined {
  if (isGroup(id)) return patternsIn(id).length;
  switch (id) {
    case "real-failure":
      return faRealFailure.compare.length;
    case "patterns":
      return failurePatterns.length;
    case "planning":
      return faPlanning.steps.length;
    case "leg-a":
      return faLegA.places.length;
    case "leg-b":
      return faLegB.hints.length;
    case "keeps-passing":
      return faKeepsPassing.steps.length + 1;
    case "not-to-build":
      return faNotToBuild.items.length;
    default:
      return undefined;
  }
}

/**
 * Which pane holds a given anchor, so a link from anywhere lands on the right
 * content. The panes, the patterns, the planning steps and the places to look
 * come from the data; the rest are section anchors this page renders.
 */
const paneHome: Record<string, FaPaneId> = {
  ...Object.fromEntries(faPanes.map((p) => [p.id, p.id])),
  ...Object.fromEntries(failurePatterns.map((p) => [p.id, p.group])),
  ...Object.fromEntries(faPlanning.steps.map((s) => [s.id, "planning"])),
  ...Object.fromEntries(faLegA.places.map((pl) => [pl.id, "leg-a"])),
  [faPlanning.combos.id]: "planning",
  [faPlanning.worked.id]: "planning",
  [faLegA.rating.id]: "leg-a",
  [faEvidence.habits.id]: "evidence",
  [faEvidence.limits.id]: "evidence",
  "how-to-use": "overview",
  "which-model": "overview",
  "short-version": "overview",
  control: "real-failure",
  "real-vs-manufactured": "real-failure",
  "named-in-guidelines": "real-failure",
  "how-to-read": "patterns",
  "still-fails": "leg-b",
  diagnose: "keeps-passing",
  "studies-advice": "not-to-build",
  glossary: "evidence",
};

const firstPicks = () =>
  Object.fromEntries(failureGroups.map((g) => [g.id, patternsIn(g.id)[0].id])) as Record<
    FailureGroupId,
    string
  >;

const RAIL_SECTIONS: FaPane["section"][] = ["Start here", "The patterns", "Put it to work", "The evidence"];

function SideButton({ pane, active, onClick }: { pane: FaPane; active: boolean; onClick: () => void }) {
  const Icon = paneIcon[pane.id];
  const count = paneCount(pane.id);
  return (
    <button
      type="button"
      onClick={onClick}
      data-rail={pane.id}
      aria-current={active ? "true" : undefined}
      className={cx(
        "group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition lg:w-full",
        active ? "bg-brand-600 text-white shadow-glow" : "text-ink-600 hover:bg-ink-100"
      )}
    >
      {isGroup(pane.id) ? (
        <span
          className={cx(
            "grid h-4 w-4 shrink-0 place-items-center rounded font-mono text-[10.5px] font-bold",
            active ? "bg-white/25 text-white" : "bg-ink-100 text-ink-500 group-hover:bg-ink-200"
          )}
        >
          {groupById[pane.id].letter}
        </span>
      ) : (
        Icon && <Icon size={16} className={cx("shrink-0", active ? "text-white" : "text-ink-400")} />
      )}
      <span className="whitespace-nowrap lg:whitespace-normal">{pane.label}</span>
      {count != null && (
        <span
          className={cx(
            "ml-auto hidden rounded-full px-1.5 text-[11px] font-bold lg:inline",
            active ? "bg-white/25 text-white" : "bg-ink-100 text-ink-500"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function PaneFooter({ active, onGo }: { active: FaPaneId; onGo: (id: FaPaneId) => void }) {
  const i = faPanes.findIndex((p) => p.id === active);
  const prev = faPanes[i - 1];
  const next = faPanes[i + 1];
  const label = (p: FaPane) => (isGroup(p.id) ? `${groupById[p.id].letter} · ${p.label}` : p.label);
  return (
    <div className="mt-12 grid gap-3 border-t border-ink-200/70 pt-6 sm:grid-cols-2">
      {prev ? (
        <button
          type="button"
          onClick={() => onGo(prev.id)}
          className="card card-hover group flex items-center gap-3 p-4 text-left"
        >
          <ArrowLeft size={16} className="shrink-0 text-ink-400 transition-transform group-hover:-translate-x-0.5" />
          <span className="min-w-0">
            <span className="mono-label block text-ink-400">Previous</span>
            <span className="block truncate text-[14px] font-bold text-ink-900">{label(prev)}</span>
          </span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <button
          type="button"
          onClick={() => onGo(next.id)}
          className="card card-hover group flex items-center gap-3 p-4 text-left sm:flex-row-reverse sm:text-right"
        >
          <ArrowRight size={16} className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5" />
          <span className="min-w-0">
            <span className="mono-label block text-ink-400">Next</span>
            <span className="block truncate text-[14px] font-bold text-ink-900">{label(next)}</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function FailureApproach() {
  const { hash, key } = useLocation();
  const anchor = decodeURIComponent(hash.replace(/^#/, ""));

  /* Read off the hash on first render, not after it, so a deep link never
     shows the overview for a frame before it switches. */
  const [active, setActive] = useState<FaPaneId>(() => paneHome[anchor] ?? "overview");
  const [picked, setPicked] = useState<Record<FailureGroupId, string>>(() => {
    const first = firstPicks();
    const p = patternById[anchor];
    return p ? { ...first, [p.group]: p.id } : first;
  });

  const frameRef = useRef<HTMLDivElement>(null);
  const { ref: railRef, maxHeight } = useStickyFit<HTMLElement>(28);
  useRailFollow(railRef, active);

  /* `key` as well as `hash`: see the note at the top of the file. */
  useEffect(() => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const pane = paneHome[id];
    if (!pane) return;
    setActive(pane);
    const p = patternById[id];
    if (p) setPicked((prev) => ({ ...prev, [p.group]: p.id }));
  }, [hash, key]);

  /** A pane chosen from the rail or the footer starts at its top, not wherever the last one was scrolled to. */
  const goTo = (id: FaPaneId) => {
    setActive(id);
    requestAnimationFrame(() => {
      const el = frameRef.current;
      if (el && el.getBoundingClientRect().top < 72) el.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };

  /** Brings a pattern's card into view, only when it is not on screen already. */
  const reveal = (id: string, always: boolean) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (always || top < 72 || top > window.innerHeight - 160)
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const pick = (id: string) => {
    const p = patternById[id];
    setPicked((prev) => ({ ...prev, [p.group]: id }));
    reveal(id, false);
  };

  /** The card's previous and next, which can cross into the next group. */
  const openPattern = (id: string) => {
    const p = patternById[id];
    setActive(p.group);
    setPicked((prev) => ({ ...prev, [p.group]: id }));
    reveal(id, true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading as="h1" eyebrow={faHeader.eyebrow} title={faHeader.title} sub={faHeader.sub} />
      </Reveal>

      {/* The one framing every pane depends on, kept in view on all of them. */}
      <Reveal>
        <div className="mt-5 flex max-w-3xl items-start gap-2.5 rounded-xl border border-ink-200/70 bg-surface px-4 py-3 text-[13px] leading-relaxed text-ink-600 shadow-soft">
          <Info size={15} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" />
          <span>
            <FaText text={faWhichModel.banner} />{" "}
            <HubLink to="which-model">Which model this is about</HubLink>
          </span>
        </div>
        <Crosslinks
          className="mt-4"
          links={[
            { to: "/#scenario", tag: "M3", label: "The GTFA says where the model fails" },
            { to: "/#failure", tag: "M7", label: "Model failure" },
            { to: "/#golden", tag: "M9", label: "Golden solution" },
          ]}
        />
      </Reveal>

      <div ref={frameRef} className="mt-8 scroll-mt-24 lg:grid lg:grid-cols-[236px_1fr] lg:gap-8">
        <nav
          ref={railRef}
          aria-label="Failure Approach sections"
          style={{ maxHeight }}
          className="mb-6 lg:sticky lg:top-20 lg:mb-0 lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:pr-1"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {RAIL_SECTIONS.map((section, si) => (
              <Fragment key={section}>
                <div
                  className={cx(
                    "hidden px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400 lg:block",
                    si > 0 && "mt-3"
                  )}
                >
                  {section}
                </div>
                {faPanes
                  .filter((p) => p.section === section)
                  .map((p) => (
                    <SideButton key={p.id} pane={p} active={active === p.id} onClick={() => goTo(p.id)} />
                  ))}
              </Fragment>
            ))}
          </div>
        </nav>

        <motion.div
          key={active}
          id={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 scroll-mt-24"
        >
          {active === "overview" && <OverviewPane />}
          {active === "real-failure" && <RealFailurePane />}
          {active === "patterns" && <IndexPane />}
          {isGroup(active) && (
            <GroupPane group={active} picked={picked[active]} onPick={pick} onGo={openPattern} />
          )}
          {active === "planning" && <PlanningPane />}
          {active === "leg-a" && <LegAPane />}
          {active === "leg-b" && <LegBPane />}
          {active === "keeps-passing" && <KeepsPassingPane />}
          {active === "not-to-build" && <NotToBuildPane />}
          {active === "evidence" && <EvidencePane />}
          <PaneFooter active={active} onGo={goTo} />
        </motion.div>
      </div>
    </div>
  );
}
