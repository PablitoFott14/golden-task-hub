import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Ban,
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  MessageSquareQuote,
  Quote,
  Scale,
  Sparkles,
  StickyNote,
  Target,
  Wand2,
  X,
} from "lucide-react";
import { taskById } from "../data";
import { methodSteps } from "../data/method";
import type {
  AssignedParameter,
  GoldenTask,
  InputAsset,
  PromptMark,
  Steer,
  TaskStage,
  Trap,
  XLink,
} from "../data/types";
import type { RailGroup } from "../components/ui";
import { Callout, Crosslinks, Reveal, SectionRail, Stat } from "../components/ui";
import { Inline, MdLines } from "../components/Markdown";
import Ledger from "../components/Ledger";
import Rubrics from "../components/Rubrics";
import SubjectiveRubrics from "../components/SubjectiveRubrics";
import { useScrollSpy } from "../lib/useScrollSpy";
import { asset, cx } from "../lib/util";

/**
 * The walkthrough is the method, walked.
 *
 * One section per method step, in method order, each one framed the same way:
 * what happened here, why the step could not be skipped, the work itself, then
 * the handoff into the next step. The handoff is the point of the page. A
 * reader who skips it is reading a finished task; a reader who follows it is
 * watching one get built.
 *
 * `stages` lives in the task data rather than here, because which step a
 * section belongs to is a fact about the task. The rail still takes its numbers
 * and its titles from the method, never from the task.
 */

const step = (n: number) => methodSteps.find((m) => m.n === n)!;

/* ------------------------------------------------------------------- pieces */

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
      >
        <X size={18} />
      </button>
      <motion.img
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        src={src}
        alt={alt}
        className="max-h-full max-w-full rounded-xl object-contain shadow-lift"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

/** The frame every stage renders in. */
function StageHead({ s }: { s: TaskStage }) {
  const m = step(s.step);
  return (
    <div className="mb-7">
      <Link
        to={`/#${m.id}`}
        className="group inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-surface px-2.5 py-1.5 text-[11.5px] transition hover:border-brand-300"
      >
        <span className="grid h-4 w-4 place-items-center rounded bg-brand-600 font-mono text-[9px] font-bold text-white">
          {m.n}
        </span>
        <span className="font-semibold text-ink-900">{m.title}</span>
        <span className="hidden text-ink-500 sm:inline">{m.slogan}</span>
        <ArrowUpRight size={12} className="text-ink-400" />
      </Link>

      <h2 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-tight text-ink-900">
        {s.title}
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-ink-200/70 bg-raised px-4 py-3">
          <div className="mono-label mb-1 text-ink-400">What happened here</div>
          <p className="text-[13px] leading-relaxed text-ink-700">{s.did}</p>
        </div>
        <div className="rounded-xl border border-brand-300/50 bg-brand-50/50 px-4 py-3 dark:border-brand-500/25 dark:bg-brand-500/10">
          <div className="mono-label mb-1 text-brand-700 dark:text-brand-300">
            Why the step is there
          </div>
          <p className="text-[13px] leading-relaxed text-ink-700">{s.why}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * The join between two stages. It carries this task's handoff and the next
 * step's own `inherits` line, so the general rule and the worked instance sit
 * together and the sequence reads as one decision carried forward.
 */
function Handoff({ s, next }: { s: TaskStage; next?: TaskStage }) {
  if (!next) return null;
  const m = step(next.step);
  return (
    <div aria-hidden={false} className="relative mt-10 pl-5">
      <span className="absolute left-[9px] top-0 h-full w-px bg-gradient-to-b from-brand-400/60 to-ink-200" />
      <span className="absolute left-0 top-3 grid h-[19px] w-[19px] place-items-center rounded-full bg-brand-600 text-white shadow-glow">
        <ArrowDown size={11} />
      </span>
      <div className="rounded-xl border border-ink-200/70 bg-raised px-4 py-3.5">
        <div className="mono-label mb-1.5 text-ink-400">
          Hands to step {m.n}, {m.title}
        </div>
        <p className="text-[13px] font-semibold leading-relaxed text-ink-900">{s.handoff}</p>
        {m.inherits && (
          <p className="mt-2 border-t border-ink-200/70 pt-2 text-[12.5px] leading-relaxed text-ink-500">
            {m.inherits}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- step 1 */

function Parameters({ t }: { t: GoldenTask }) {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-surface">
        {t.parameters.map((p: AssignedParameter, i) => (
          <div
            key={p.label}
            className={cx(
              "grid gap-x-6 gap-y-1 px-4 py-3.5 sm:grid-cols-[180px_1fr] sm:px-5",
              i > 0 && "border-t border-ink-200/70"
            )}
          >
            <div>
              <div className="mono-label text-ink-400">{p.label}</div>
              <div
                className={cx(
                  "mt-1 break-words text-[13px] font-semibold text-ink-900",
                  p.literal && "font-mono text-[12px]"
                )}
              >
                {p.value}
              </div>
            </div>
            <p className="text-[12.5px] leading-relaxed text-ink-600 sm:self-center">{p.binds}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Callout title="The scope check" tone="ok" icon={<Check size={12} />}>
          {t.scopeCheck.body}
        </Callout>
        <Callout title="The neighbour it is not" tone="no" icon={<Ban size={12} />}>
          {t.scopeCheck.neighbour}
        </Callout>
      </div>

      <Crosslinks
        className="mt-4"
        links={[
          { to: "/reference#use-case-and-tools", tag: "T", label: "The 11 use cases and 68 subcategories" },
          { to: "/reference#s1", tag: "C1", label: "Is the pair implemented without drift?" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 2 */

function Universe({ t }: { t: GoldenTask }) {
  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {t.universeFacts.map((f) => (
          <Stat key={f.k} label={f.k} value={f.v} />
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {t.universeSources.map((s) => (
          <Reveal key={s.service}>
            <div
              className={cx(
                "card p-5",
                s.offConnector && "border-amber-300/70 dark:border-amber-500/30"
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Database size={14} className="text-ink-400" />
                <h3 className="font-display text-[15.5px] font-bold text-ink-900">{s.service}</h3>
                {s.offConnector && (
                  <span className="chip bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300">
                    <AlertTriangle size={11} /> Outside the assigned connectors
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{s.carries}</p>
              <div className="mt-3 rounded-lg bg-raised px-3.5 py-2.5">
                <div className="mono-label mb-1 text-ink-400">What it decides</div>
                <p className="text-[12.5px] leading-relaxed text-ink-700">{s.decides}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Crosslinks
        className="mt-4"
        links={[
          { to: "/#universe-videos", tag: "V", label: "The universe interaction recordings" },
          { to: "/reference#s2", tag: "C2", label: "Is the scenario grounded in records you have seen?" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 3 */

function TrapCard({ t }: { t: Trap }) {
  const m = t.step ? step(t.step) : undefined;
  const links: XLink[] = [
    ...(m ? [{ to: `/#${m.id}`, tag: `M${m.n}`, label: m.title }] : []),
    ...(t.links ?? []),
  ];
  return (
    <div className="card h-full p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-500/12 text-amber-600 dark:text-amber-300">
          <AlertTriangle size={15} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[15.5px] font-bold leading-snug text-ink-900">
            {t.title}
          </h3>
          <div className="mt-1 font-mono text-[11.5px] text-ink-400">{t.where}</div>
        </div>
      </div>
      <p className="mt-3.5 text-[13px] leading-relaxed text-ink-600">{t.body}</p>
      <div className="mt-3.5 rounded-lg bg-raised px-3 py-2.5">
        <div className="mono-label mb-1 text-ink-400">What it tests</div>
        <p className="text-[12.5px] leading-relaxed text-ink-700">{t.tests}</p>
      </div>
      <Crosslinks links={links} className="mt-3.5" />
    </div>
  );
}

function Gtfa({ t }: { t: GoldenTask }) {
  return (
    <>
      <div className="card overflow-hidden">
        <div className="grid gap-5 border-b border-ink-200/70 bg-raised p-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div>
            <div className="mono-label text-ink-400">Owed back, in total</div>
            <div className="mt-1 font-display text-5xl font-bold text-ink-900">{t.answer.total}</div>
          </div>
          <p className="text-[13.5px] leading-relaxed text-ink-600">{t.answer.basis}</p>
        </div>
        <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.answer.counts.map((c) => (
            <Stat key={c.label} label={c.label} value={c.v} tone={c.tone} />
          ))}
        </div>
      </div>

      <h3 className="mb-3 mt-10 font-display text-[18px] font-bold tracking-tight text-ink-900">
        Twelve charges, and why each one lands where it does
      </h3>
      <p className="mb-4 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        Every row was resolved before the prompt was ever sent. Open one to see the records behind
        it, and what makes it hard to reach.
      </p>
      <Ledger rows={t.ledger} />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mono-label mb-2.5 flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
            <Ban size={12} /> What must not happen
          </div>
          <ul className="space-y-2">
            {t.mustNot.map((x) => (
              <li key={x} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700">
                <X size={12} className="mt-1 shrink-0 text-rose-500" />
                <span className="min-w-0 flex-1">{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <div className="mono-label mb-2.5 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
            <Check size={12} /> What still counts as right
          </div>
          <ul className="space-y-2">
            {t.variations.map((x) => (
              <li key={x} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700">
                <Check size={12} className="mt-1 shrink-0 text-emerald-500" />
                <span className="min-w-0 flex-1">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-ink-500">
        Both lists are part of the answer. Without them a reviewer has to guess whether a different
        but defensible reading is a failure, and two reviewers guess differently.
      </p>

      <h3 className="mb-3 mt-10 font-display text-[18px] font-bold tracking-tight text-ink-900">
        Seven pieces of designed friction
      </h3>
      <p className="mb-4 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        None of these is a gotcha. Each one is a place where two real records have to be reconciled,
        which is where genuine difficulty comes from.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {t.traps.map((trap) => (
          <Reveal key={trap.id} className="h-full">
            <TrapCard t={trap} />
          </Reveal>
        ))}
      </div>

      <Crosslinks
        className="mt-5"
        links={[
          { to: "/reference#s3", tag: "C3", label: "Is the answer resolved before the first run?" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 4 */

const roleTone: Record<InputAsset["role"], { label: string; chip: string }> = {
  decides: {
    label: "Decides a dispute",
    chip: "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300",
  },
  clears: {
    label: "Clears a charge",
    chip: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300",
  },
  spec: {
    label: "The page format",
    chip: "bg-brand-500/12 text-brand-700 ring-1 ring-brand-500/25 dark:text-brand-300",
  },
};

const kindIcon: Record<InputAsset["kind"], JSX.Element> = {
  photo: <ImageIcon size={11} />,
  screenshot: <ImageIcon size={11} />,
  doc: <FileText size={11} />,
  notes: <StickyNote size={11} />,
};

function InputCard({
  inp,
  onZoom,
}: {
  inp: InputAsset;
  onZoom: (v: { src: string; alt: string }) => void;
}) {
  const url = asset(inp.src);
  const viewable = inp.kind === "photo" || inp.kind === "screenshot";
  return (
    <div className="card flex h-full flex-col overflow-hidden">
      {viewable ? (
        <button
          onClick={() => onZoom({ src: url, alt: inp.shows })}
          className="group relative block aspect-[16/10] w-full overflow-hidden bg-ink-100"
        >
          <img
            src={url}
            alt={inp.shows}
            loading="lazy"
            className="h-full w-full object-contain transition duration-500 ease-out group-hover:scale-[1.03]"
          />
        </button>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group flex aspect-[16/10] w-full items-center justify-center gap-2 bg-raised text-ink-400 transition hover:text-brand-600"
        >
          <FileText size={24} />
          <span className="text-[12.5px] font-semibold">Open the file</span>
          <ExternalLink size={13} />
        </a>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={cx("chip", roleTone[inp.role].chip)}>{roleTone[inp.role].label}</span>
          <span className="chip bg-ink-100 text-ink-500 ring-1 ring-ink-200">
            {kindIcon[inp.kind]}
            {inp.kind}
          </span>
        </div>
        <div className="mt-2.5 break-all font-mono text-[11.5px] font-semibold text-ink-800">
          {inp.file}
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-600">{inp.shows}</p>

        <div className="mt-3 border-t border-ink-200/70 pt-3">
          <div className="mono-label mb-1 text-ink-400">Carries</div>
          <p className="text-[12.5px] leading-relaxed text-ink-700">{inp.carries}</p>
        </div>

        {inp.charges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {inp.charges.map((c) => (
              <span
                key={c}
                className="rounded-md border border-ink-200 bg-raised px-1.5 py-0.5 font-mono text-[10.5px] text-ink-600"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {inp.straight && (
          <div className="mt-auto pt-4">
            <div className="mono-label mb-1.5 flex items-center gap-1.5 text-gold-700 dark:text-gold-300">
              <Wand2 size={12} /> What the golden had to do with it
            </div>
            <button
              onClick={() => onZoom({ src: asset(inp.straight!.src), alt: inp.straight!.note })}
              className="block w-full overflow-hidden rounded-lg border border-gold-400/50 bg-white"
            >
              <img
                src={asset(inp.straight.src)}
                alt={inp.straight.note}
                loading="lazy"
                className="max-h-56 w-full object-contain"
              />
            </button>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{inp.straight.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Inputs({
  t,
  onZoom,
}: {
  t: GoldenTask;
  onZoom: (v: { src: string; alt: string }) => void;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {t.inputs.map((inp) => (
          <Reveal key={inp.file} className="h-full">
            <InputCard inp={inp} onZoom={onZoom} />
          </Reveal>
        ))}
      </div>

      <h3 className="mb-3 mt-10 font-display text-[18px] font-bold tracking-tight text-ink-900">
        The format rule lives in an attachment
      </h3>
      <p className="mb-4 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        Nothing in the prompt says what the page looks like. The shape of it is in the ninth file,
        which is what makes finding and following it part of the work.
      </p>
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-ink-200/70 px-5 py-3">
          <StickyNote size={14} className="text-ink-400" />
          <span className="font-mono text-[12px] font-semibold text-ink-700">
            {t.layoutNotes.file}
          </span>
          <a
            href={asset(t.layoutNotes.src)}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600 hover:underline dark:text-brand-300"
          >
            Open <ExternalLink size={12} />
          </a>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap p-5 font-mono text-[12.5px] leading-relaxed text-ink-700">
          {t.layoutNotes.body}
        </pre>
      </div>
      <Callout title="Why it is an attachment" tone="accent" icon={<Lightbulb size={13} />}>
        Four of the eleven subjective criteria exist because this file says what it says and stops
        there. It asks for four fields and a filter, so naming the account, grouping the two kinds of
        claim and keeping the total in step with the filter are all additions, which is exactly what
        the presentation block is for.
      </Callout>

      <Crosslinks
        className="mt-4"
        links={[{ to: "/reference#s3", tag: "C3", label: "Does every input earn its place?" }]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 5 */

type Segment = { text: string; mark?: PromptMark; n?: number };

/** Splits the stored prompt on its marked spans. Nothing here rewords it. */
function segments(text: string, marks: PromptMark[]): Segment[] {
  const hits = marks
    .map((m) => ({ m, at: text.indexOf(m.quote) }))
    .filter((h) => h.at >= 0)
    .sort((a, b) => a.at - b.at);

  const out: Segment[] = [];
  let cursor = 0;
  let n = 0;
  for (const h of hits) {
    if (h.at < cursor) continue;
    if (h.at > cursor) out.push({ text: text.slice(cursor, h.at) });
    out.push({ text: h.m.quote, mark: h.m, n: ++n });
    cursor = h.at + h.m.quote.length;
  }
  if (cursor < text.length) out.push({ text: text.slice(cursor) });
  return out;
}

function AnnotatedPrompt({ t }: { t: GoldenTask }) {
  const [active, setActive] = useState<string | null>(null);
  const notes = useRef<Record<string, HTMLLIElement | null>>({});
  const segs = segments(t.prompt.text, t.prompt.marks);
  const numbered = segs.filter((s): s is Required<Segment> => !!s.mark);

  const pick = (id: string) => {
    setActive(id);
    notes.current[id]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <>
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_380px]">
        <div className="card overflow-hidden lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2 border-b border-ink-200/70 bg-raised px-5 py-3">
            <MessageSquareQuote size={14} className="text-ink-400" />
            <span className="text-[13px] font-bold text-ink-900">The prompt, in full</span>
            <span className="ml-auto font-mono text-[11px] text-ink-500">sent once</span>
          </div>
          <blockquote className="relative p-5 pl-9">
            <Quote size={14} className="absolute left-4 top-5 text-ink-300" aria-hidden />
            <p className="whitespace-pre-wrap text-[13.5px] leading-[1.75] text-ink-700">
              {segs.map((s, i) =>
                s.mark ? (
                  <button
                    key={i}
                    onClick={() => pick(s.mark!.id)}
                    className={cx(
                      "rounded px-0.5 text-left underline decoration-dotted underline-offset-4 transition",
                      active === s.mark.id
                        ? "bg-brand-500/20 font-semibold text-ink-900 decoration-brand-500"
                        : "bg-brand-500/[0.07] decoration-brand-400/60 hover:bg-brand-500/15"
                    )}
                  >
                    {s.text}
                    <sup className="ml-0.5 font-mono text-[9.5px] font-bold text-brand-600 dark:text-brand-300">
                      {s.n}
                    </sup>
                  </button>
                ) : (
                  <span key={i}>{s.text}</span>
                )
              )}
            </p>
          </blockquote>
        </div>

        <div>
          <div className="mono-label mb-2 text-ink-400">
            {numbered.length} spans that are doing work
          </div>
          <ol className="space-y-2">
            {numbered.map((s) => {
              const on = active === s.mark.id;
              return (
                <li
                  key={s.mark.id}
                  ref={(el) => {
                    notes.current[s.mark.id] = el;
                  }}
                  aria-current={on ? "true" : undefined}
                >
                  <button
                    onClick={() => setActive(on ? null : s.mark.id)}
                    className={cx(
                      "w-full rounded-xl border px-3.5 py-3 text-left transition",
                      on
                        ? "border-brand-400 bg-brand-500/10"
                        : "border-ink-200/80 bg-surface hover:border-ink-300"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-brand-600 font-mono text-[10px] font-bold text-white">
                        {s.n}
                      </span>
                      <span className="text-[12.5px] font-bold text-ink-900">{s.mark.label}</span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-600">
                      {s.mark.body}
                    </p>
                    {s.mark.cost && (
                      <p className="mt-1.5 border-l-2 border-rose-400/60 pl-2 text-[12px] leading-relaxed text-ink-500">
                        {s.mark.cost}
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <h3 className="mb-3 mt-10 font-display text-[18px] font-bold tracking-tight text-ink-900">
        What the prompt deliberately does not say
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {t.prompt.withheld.map((w) => (
          <div key={w.title} className="rounded-xl border border-ink-200/70 bg-raised px-4 py-3">
            <div className="text-[12.5px] font-bold text-ink-900">{w.title}</div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-600">{w.body}</p>
          </div>
        ))}
      </div>

      <Crosslinks
        className="mt-5"
        links={[
          { to: "/reference#s4", tag: "C4", label: "Is every graded requirement stated in the prompt?" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 6 */

function DraftHistoryBlock({ t }: { t: GoldenTask }) {
  return (
    <>
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200/70 bg-raised px-5 py-3">
          <Target size={14} className="text-ink-400" />
          <span className="text-[13px] font-bold text-ink-900">Agent Objective</span>
          <span className="ml-auto font-mono text-[11px] text-ink-500">why she is asking</span>
        </div>
        <div className="space-y-3 p-5">
          {t.draftHistory.objective.map((p, i) => (
            <p key={i} className="text-[13.5px] leading-relaxed text-ink-700">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {t.draftHistory.objectiveReads.map((r) => (
          <div key={r.title} className="rounded-xl border border-ink-200/70 bg-raised px-4 py-3">
            <div className="text-[12.5px] font-bold leading-snug text-ink-900">{r.title}</div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-600">{r.body}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 mt-8 flex flex-wrap items-center gap-2">
        <ClipboardList size={14} className="text-ink-400" />
        <span className="text-[13px] font-bold text-ink-900">Desired Outcome</span>
        <span className="font-mono text-[11px] text-ink-500">
          the end state, in terms someone else can check
        </span>
      </div>

      <div className="space-y-4">
        {t.draftHistory.outcome.map((o) => (
          <Reveal key={o.n}>
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 border-b border-ink-200/70 bg-raised px-5 py-3">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-gold-500 font-mono text-[11px] font-bold text-white">
                  {o.n}
                </span>
                <span className="text-[13px] font-semibold text-ink-900">{o.summary}</span>
                <div className="ml-auto flex flex-wrap gap-1.5">
                  {o.produces.map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-ink-200 bg-surface px-2 py-0.5 font-mono text-[10.5px] text-ink-600"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-1.5 text-[13px] leading-relaxed text-ink-700">
                  <MdLines lines={o.lines} />
                </div>

                <div className="mt-4 rounded-xl border border-ink-200/70 bg-raised p-4">
                  <div className="mono-label mb-2 flex items-center gap-1.5 text-ink-400">
                    <MessageSquareQuote size={12} />
                    Asked for, out loud, in the prompt
                  </div>
                  <div className="space-y-2">
                    {o.askedFor.map((q) => (
                      <p
                        key={q}
                        className="border-l-2 border-brand-400/60 pl-2.5 text-[12.5px] leading-relaxed text-ink-600"
                      >
                        {q}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Callout title="What it may spell out" tone="ok" icon={<Check size={12} />}>
          The end state, down to the values: every amount, every transaction id, the two tabs and the
          six recipients. This is the answer that was already resolved, written so a reviewer can
          check it without redoing the work.
        </Callout>
        <Callout title="What it can never stand in for" tone="no" icon={<X size={12} />}>
          A prompt. Every item above is requested out loud in the one message the agent receives, and
          that is the only reason any of it can be graded. A rule that lives only here was never
          asked for.
        </Callout>
      </div>

      <Crosslinks
        className="mt-4"
        links={[
          { to: "/golden-tasks/charge-disputes#prompt", tag: "GT", label: "The prompt it has to match" },
          { to: "/golden-tasks/charge-disputes#gtfa", tag: "GT", label: "The answer it was resolved from" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 7 */

function ArtifactLink({
  file,
  what,
  src,
}: {
  file: string;
  what: string;
  src?: string;
}) {
  const inner = (
    <>
      <FileText size={15} className="mt-0.5 shrink-0 text-ink-400" />
      <span className="min-w-0 flex-1">
        <span className="block break-all font-mono text-[11.5px] font-semibold text-ink-800">
          {file}
        </span>
        <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-500">{what}</span>
      </span>
      {src && <ExternalLink size={13} className="mt-0.5 shrink-0 text-ink-300" />}
    </>
  );
  return src ? (
    <a
      href={asset(src)}
      target="_blank"
      rel="noreferrer"
      className="card card-hover flex items-start gap-3 p-4"
    >
      {inner}
    </a>
  ) : (
    <div className="card flex items-start gap-3 p-4">{inner}</div>
  );
}

function ModelA({ t }: { t: GoldenTask }) {
  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {t.run.stats.map((s) => (
          <Stat key={s.k} label={s.k} value={s.v} />
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {t.run.score.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-rose-300/60 bg-rose-50/50 px-4 py-3 dark:border-rose-500/25 dark:bg-rose-500/10"
          >
            <div className="mono-label text-rose-700 dark:text-rose-300">{s.label}</div>
            <div className="mt-1 font-display text-2xl font-bold text-ink-900">{s.pct}</div>
            <div className="mt-0.5 font-mono text-[11.5px] text-ink-500">
              {s.lost} of {s.of} lost
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-500">
        The bar is at least 50% of the final rubric score, on failures that materially affect what
        the user asked for. One negative criterion was also triggered.
      </p>

      <Callout title="What it did reach" tone="ok" icon={<Check size={12} />}>
        <ul className="mt-1 space-y-1.5">
          {t.run.kept.map((k) => (
            <li key={k} className="flex gap-2">
              <span aria-hidden className="select-none text-ink-400">
                &bull;
              </span>
              <span className="min-w-0 flex-1">{k}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-ink-500">
          This is what makes the failure a finding rather than a broken run. The model worked, the
          tools worked, and it still got three of the five wrong.
        </p>
      </Callout>

      <h3 className="mb-4 mt-10 font-display text-[18px] font-bold tracking-tight text-ink-900">
        Where the run actually broke
      </h3>
      <div className="space-y-4">
        {t.run.observations.map((o) => (
          <Reveal key={o.title}>
            <div className="card p-5">
              <h4 className="font-display text-[16px] font-bold text-ink-900">{o.title}</h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-300/50 bg-emerald-50/50 p-3.5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                  <div className="mono-label mb-1 text-emerald-700 dark:text-emerald-300">
                    Expected
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-ink-700">{o.expected}</p>
                </div>
                <div className="rounded-lg border border-rose-300/50 bg-rose-50/50 p-3.5 dark:border-rose-500/25 dark:bg-rose-500/10">
                  <div className="mono-label mb-1 text-rose-700 dark:text-rose-300">Actual</div>
                  <p className="text-[12.5px] leading-relaxed text-ink-700">{o.actual}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="mono-label text-ink-400">Costs criteria</span>
                {o.rubrics.map((n) => (
                  <span
                    key={n}
                    className="rounded border border-ink-200 bg-raised px-1.5 py-0.5 font-mono text-[11px] text-ink-600"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6">
        <div className="mono-label mb-3 text-ink-400">What Model A shipped</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {t.run.artifacts.map((a) => (
            <ArtifactLink key={a.file} file={a.file} what={a.what} src={a.src} />
          ))}
        </div>
      </div>

      <Crosslinks
        className="mt-4"
        links={[
          { to: "/reference#s5", tag: "C5", label: "Did the model fail on things that matter?" },
          { to: "/golden-tasks/charge-disputes#subjective", tag: "GT", label: "The same page, beside the golden" },
          { to: "/failure-approach#leg-a", tag: "FA", label: "Where else a Leg A run breaks, pattern by pattern" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 8 */

function RubricBlock({ t }: { t: GoldenTask }) {
  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {t.rubricShape.map((r) => (
          <div key={r.label} className="rounded-xl border border-ink-200/70 bg-raised px-4 py-3">
            <div className="mono-label text-ink-400">{r.label}</div>
            <div className="mt-1 font-display text-2xl font-bold text-ink-900">{r.value}</div>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{r.note}</p>
          </div>
        ))}
      </div>

      <div className="my-5 grid gap-4 lg:grid-cols-2">
        <Callout title="The 80/20 rule, with nothing spent" tone="ok" icon={<Scale size={12} />}>
          At least 80% of a block grades completion and at most 20% grades process. This block is
          100% completion. Every reasoning decision is graded where it lands: in a row on the page,
          in the body of a draft, or in the mailbox.
        </Callout>
        <Callout title="No criterion only checks that something exists" tone="accent" icon={<Target size={12} />}>
          Each one carries its own value. The transaction id, the amount, the date, the account
          digits, the receipt reference and the filename are inside the criterion, which is what lets
          someone who was never in the room rate it.
        </Callout>
      </div>

      <Rubrics rubrics={t.rubrics} />

      <Crosslinks
        className="mt-5"
        links={[
          { to: "/spec#rubric-quality", tag: "SPEC", label: "The rubric quality issues a reviewer scores" },
          { to: "/reference#s6", tag: "C6", label: "Is every criterion ratable without you?" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------- step 9 */

function SteerCard({ s }: { s: Steer }) {
  const [open, setOpen] = useState(s.n === 1);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-raised"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gold-500 font-mono text-[11px] font-bold text-white">
          {s.n}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold text-ink-900">Steer {s.n}</span>
          <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-500">
            Still missing: {s.missed}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={cx("mt-1 shrink-0 text-ink-400 transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-200/70 p-5">
              <blockquote className="relative rounded-xl border border-gold-400/60 bg-gold-50/70 p-4 pl-9 dark:border-gold-500/35 dark:bg-gold-500/10">
                <Quote size={14} className="absolute left-3.5 top-4 text-gold-500" aria-hidden />
                <p className="text-[13.5px] leading-relaxed text-ink-800">{s.prompt}</p>
              </blockquote>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-300/50 bg-emerald-50/50 p-3.5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                  <div className="mono-label mb-1.5 text-emerald-700 dark:text-emerald-300">
                    What it points at
                  </div>
                  <ul className="space-y-1.5">
                    {s.does.map((d) => (
                      <li key={d} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700">
                        <span aria-hidden className="select-none text-ink-400">
                          &bull;
                        </span>
                        <span className="min-w-0 flex-1">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-rose-300/50 bg-rose-50/50 p-3.5 dark:border-rose-500/25 dark:bg-rose-500/10">
                  <div className="mono-label mb-1.5 text-rose-700 dark:text-rose-300">
                    What it never says
                  </div>
                  <ul className="space-y-1.5">
                    {s.avoids.map((d) => (
                      <li key={d} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700">
                        <span aria-hidden className="select-none text-ink-400">
                          &bull;
                        </span>
                        <span className="min-w-0 flex-1">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-raised px-3.5 py-2.5">
                <div className="mono-label mb-1 text-ink-400">What came back</div>
                <p className="text-[12.5px] leading-relaxed text-ink-700">{s.recovered}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Golden({ t }: { t: GoldenTask }) {
  return (
    <>
      <Callout title="The opening message is the task, unchanged" tone="gold" icon={<Sparkles size={12} />}>
        {t.goldenRun.opening}
      </Callout>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink-200/70 bg-surface">
        {t.goldenRun.progress.map((p, i) => (
          <div
            key={p.label}
            className={cx(
              "flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 sm:px-5",
              i > 0 && "border-t border-ink-200/70"
            )}
          >
            <span className="w-32 shrink-0 text-[12.5px] font-bold text-ink-900">{p.label}</span>
            <span className="w-20 shrink-0 font-mono text-[12px] font-semibold text-brand-700 dark:text-brand-300">
              {p.found}
            </span>
            <span className="w-32 shrink-0 font-mono text-[12px] text-ink-700">{p.total}</span>
            <span className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-ink-500">
              {p.note}
            </span>
          </div>
        ))}
      </div>

      <h3 className="mb-2 mt-10 font-display text-[18px] font-bold tracking-tight text-ink-900">
        Four steers, and the no leak rule on every one
      </h3>
      <p className="mb-4 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        A steer is not a turn of the task. It is the same user, still talking, pointing back at
        context she would plausibly have. Read what each one points at against what it never says.
      </p>
      <div className="space-y-3">
        {t.goldenRun.steers.map((s) => (
          <Reveal key={s.n}>
            <SteerCard s={s} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6">
        <div className="mono-label mb-3 text-ink-400">What the golden hands over</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {t.goldenRun.artifacts.map((a) => (
            <ArtifactLink key={a.file} file={a.file} what={a.what} src={a.src} />
          ))}
        </div>
      </div>

      <Crosslinks
        className="mt-4"
        links={[
          { to: "/reference#s7", tag: "C7", label: "Does the golden pass its own block?" },
          { to: "/reference#faq", tag: "FAQ", label: "How much may a hint carry?" },
          { to: "/failure-approach#leg-b", tag: "FA", label: "A hint for each failure pattern" },
        ]}
      />
    </>
  );
}

/* ------------------------------------------------------------------ step 10 */

function Subjective({ t }: { t: GoldenTask }) {
  return (
    <>
      <p className="mb-5 max-w-3xl text-[13.5px] leading-relaxed text-ink-500">{t.subjectiveNote}</p>
      <SubjectiveRubrics rubrics={t.subjective} />
      <Crosslinks
        className="mt-5"
        links={[
          { to: "/reference#s6", tag: "C6", label: "Is every subjective criterion judged on the render?" },
          { to: "/spec#rubric-quality", tag: "SPEC", label: "Filler language, and why it fails" },
        ]}
      />
    </>
  );
}

/* -------------------------------------------------------------------- page */

export default function TaskDetail() {
  const { id } = useParams();
  const task = taskById(id ?? "");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const active = useScrollSpy(task ? task.stages.map((s) => s.id) : []);

  if (!task) {
    return (
      <div className="wrap py-28 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">No task with that id.</h1>
        <Link to="/golden-tasks" className="btn-primary mt-6">
          Back to Golden Tasks
        </Link>
      </div>
    );
  }

  const t = task;

  /** The rail is the method: its numbers and titles come from `methodSteps`. */
  const rail: RailGroup[] = t.stages.map((s) => {
    const m = step(s.step);
    return { n: m.n, id: m.id, title: m.title, sections: [{ id: s.id, label: s.title }] };
  });

  const body = (s: TaskStage) => {
    switch (s.id) {
      case "parameters":
        return <Parameters t={t} />;
      case "universe":
        return <Universe t={t} />;
      case "gtfa":
        return <Gtfa t={t} />;
      case "inputs":
        return <Inputs t={t} onZoom={setLightbox} />;
      case "prompt":
        return <AnnotatedPrompt t={t} />;
      case "draft-history":
        return <DraftHistoryBlock t={t} />;
      case "model-a":
        return <ModelA t={t} />;
      case "rubrics":
        return <RubricBlock t={t} />;
      case "golden":
        return <Golden t={t} />;
      case "subjective":
        return <Subjective t={t} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-80" />
        <div className="wrap relative py-12">
          <Link
            to="/golden-tasks"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-500 transition hover:text-brand-600"
          >
            <ArrowLeft size={14} /> Golden Tasks
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="chip bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/25 dark:text-gold-300">
              <Sparkles size={11} /> {t.meta.status}
            </span>
            <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
              {t.meta.useCase}
            </span>
            <span className="chip bg-ink-100 font-mono text-ink-600 ring-1 ring-ink-200">
              {t.meta.subcategory}
            </span>
            <span className="chip bg-brand-500/12 text-brand-700 ring-1 ring-brand-500/25 dark:text-brand-300">
              Single turn
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-[32px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[44px]">
            {t.meta.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-ink-600">{t.premise}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Universe" value={<span className="font-mono text-[12px]">{t.meta.universe}</span>} />
            <Stat label="Persona" value={t.meta.persona} />
            <Stat label="Deliverable" value={<span className="font-mono">{t.meta.deliverable}</span>} />
            <Stat label="Model A result" value={`${t.run.score[2].pct} of the weight lost`} tone="no" />
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {t.whyGolden.map((w, i) => (
              <div
                key={i}
                className="flex gap-2.5 rounded-xl border border-gold-300/60 bg-gold-50/50 px-4 py-3 dark:border-gold-500/25 dark:bg-gold-500/10"
              >
                <Sparkles size={13} className="mt-1 shrink-0 text-gold-600 dark:text-gold-300" />
                <p className="text-[12.5px] leading-relaxed text-ink-700">
                  <Inline text={w} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to read the page */}
      <div className="border-b border-ink-200/70 bg-raised">
        <div className="wrap flex flex-wrap items-center gap-x-3 gap-y-1.5 py-3.5">
          <Eye size={14} className="shrink-0 text-brand-600 dark:text-brand-300" />
          <span className="text-[12.5px] font-bold text-ink-900">
            Ten stages, in the order the work happened.
          </span>
          <span className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-ink-500">
            Each one says what was decided, why the step exists, and what it hands to the next. Read
            the handoffs and the task builds itself.
          </span>
        </div>
      </div>

      <div className="wrap py-12">
        <div className="gap-12 lg:grid lg:grid-cols-[240px_1fr]">
          <SectionRail groups={rail} active={active} flat title="The method, walked" />

          <div className="min-w-0">
            {t.stages.map((s, i) => (
              <section key={s.id} id={s.id} className={cx("scroll-mt-24", i > 0 && "pt-12")}>
                <StageHead s={s} />
                {body(s)}
                <Handoff s={s} next={t.stages[i + 1]} />
              </section>
            ))}

            {/* The end of the sequence */}
            <div className="mt-12 rounded-2xl border border-ink-200/70 bg-raised p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Mail size={15} className="text-gold-600 dark:text-gold-300" />
                <h2 className="font-display text-[17px] font-bold tracking-tight text-ink-900">
                  Ten steps later, the task is submittable
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-600">
                One prompt, nine attachments, a resolved answer, a run that failed on things that
                matter, {t.rubrics.length} objective criteria, {t.subjective.length} subjective ones
                and a golden that passes its own block. The gate is the last thing between here and
                handing it in.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/reference#pre-submit" className="btn">
                  <ClipboardList size={14} /> Run the pre-submit gate
                </Link>
                <Link to="/" className="btn-ghost">
                  <Calendar size={14} /> Back to the method
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
