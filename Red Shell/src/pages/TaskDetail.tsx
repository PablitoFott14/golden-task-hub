import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  FileText,
  Flag,
  Image as ImageIcon,
  Lightbulb,
  MessagesSquare,
  PenLine,
  Quote,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { taskById } from "../data";
import { methodSteps } from "../data/method";
import type { GoldenMessage, GoldenRun, InputAsset, Milestone, Trap, XLink } from "../data/types";
import type { RailGroup } from "../components/ui";
import { Callout, Crosslinks, Reveal, SectionRail, Stat } from "../components/ui";
import { MdLines } from "../components/Markdown";
import Ledger from "../components/Ledger";
import Rubrics from "../components/Rubrics";
import SubjectiveRubrics from "../components/SubjectiveRubrics";
import { useScrollSpy } from "../lib/useScrollSpy";
import { asset, cx } from "../lib/util";

/**
 * The walkthrough, nested under the method step each part of the task belongs
 * to. The rail renders this as the method itself, so the numbering is the
 * method's own and every section sits under the step that produced it. Every
 * step carries at least one section; a step with none would still keep its
 * place in the rail and link to the method page, because dropping it would make
 * the rail read as an eight step method.
 *
 * Order here is page order, and both have to stay in method order or the
 * scroll spy walks the rail backwards.
 */
const WALKTHROUGH: { step: number; sections: { id: string; label: string }[] }[] = [
  { step: 1, sections: [{ id: "universe", label: "The two channels" }] },
  {
    step: 2,
    sections: [
      { id: "inputs", label: "Eleven files" },
      { id: "format", label: "The receipt template" },
    ],
  },
  {
    step: 3,
    sections: [
      { id: "turns", label: "The four prompts" },
      { id: "answer", label: "The resolved answer" },
      { id: "ledger", label: "Evidence ledger" },
      { id: "traps", label: "Designed friction" },
    ],
  },
  { step: 4, sections: [{ id: "draft-history", label: "Objective and outcome" }] },
  { step: 5, sections: [{ id: "model-a", label: "Where Model A broke" }] },
  { step: 6, sections: [{ id: "rubrics", label: "The criteria block" }] },
  { step: 7, sections: [{ id: "milestones", label: "The milestone set" }] },
  {
    step: 8,
    sections: [
      { id: "golden", label: "The deliverables" },
      { id: "hinting", label: "Hinting in practice" },
    ],
  },
  { step: 9, sections: [{ id: "subjective", label: "The comparisons" }] },
];

/** The rail takes its numbers and its titles from the method, never from here. */
const RAIL: RailGroup[] = WALKTHROUGH.map((g) => {
  const step = methodSteps.find((m) => m.n === g.step)!;
  return { n: step.n, id: step.id, title: step.title, sections: g.sections };
});

/** Which method step a section implements, for the badge on its heading. */
const SECTION_STEP = new Map<string, number>(
  WALKTHROUGH.flatMap((g) => g.sections.map((s) => [s.id, g.step] as [string, number]))
);

const IDS = WALKTHROUGH.flatMap((g) => g.sections.map((s) => s.id));

const roleTone: Record<InputAsset["role"], { label: string; chip: string }> = {
  evidence: {
    label: "Evidence",
    chip: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300",
  },
  contradicts: {
    label: "Contradicts",
    chip: "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300",
  },
  distractor: {
    label: "Distractor",
    chip: "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300",
  },
  spec: {
    label: "Format spec",
    chip: "bg-brand-500/12 text-brand-700 ring-1 ring-brand-500/25 dark:text-brand-300",
  },
};

const kindIcon: Record<InputAsset["kind"], JSX.Element> = {
  image: <ImageIcon size={13} />,
  photo: <ImageIcon size={13} />,
  handwriting: <PenLine size={13} />,
  pdf: <FileText size={13} />,
  doc: <FileText size={13} />,
};

/** A section heading that names the method step it implements. */
function SectionHead({
  id,
  title,
  sub,
}: {
  id: string;
  title: string;
  sub?: string;
}) {
  const n = SECTION_STEP.get(id);
  const step = n ? methodSteps.find((m) => m.n === n) : undefined;
  return (
    <div className="mb-6">
      {step && (
        <Link
          to={`/#${step.id}`}
          className="group mb-3 inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-surface px-2.5 py-1.5 text-[11.5px] transition hover:border-brand-300"
        >
          <span className="grid h-4 w-4 place-items-center rounded bg-brand-600 font-mono text-[9px] font-bold text-white">
            {step.n}
          </span>
          <span className="font-semibold text-ink-600 group-hover:text-ink-900">{step.slogan}</span>
          <ArrowUpRight size={12} className="text-ink-400" />
        </Link>
      )}
      <h2 className="font-display text-[26px] font-bold tracking-tight text-ink-900">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-500">{sub}</p>}
    </div>
  );
}

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

function TrapCard({ t }: { t: Trap }) {
  const step = t.step ? methodSteps.find((m) => m.n === t.step) : undefined;
  /** The method step first, then whatever else the trap points at. */
  const links: XLink[] = [
    ...(step ? [{ to: `/#${step.id}`, tag: `M${step.n}`, label: step.title }] : []),
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

/** The milestone set, grouped by the turn each requirement came from. */
function byTurn(ms: Milestone[]) {
  const groups: { turn: number; items: Milestone[] }[] = [];
  for (const m of ms) {
    const last = groups[groups.length - 1];
    if (last && last.turn === m.turn) last.items.push(m);
    else groups.push({ turn: m.turn, items: [m] });
  }
  return groups;
}

/** "Turn 1", or "Turns 2 and 3" for an outcome item that spans two of them. */
function turnLabel(ns: number[]) {
  if (ns.length === 1) return `Turn ${ns[0]}`;
  return `Turns ${ns.slice(0, -1).join(", ")} and ${ns[ns.length - 1]}`;
}

/** One message of the golden conversation. The steer is marked, because it is
 *  the one message that is not a turn of the task. */
function Message({ m }: { m: GoldenMessage }) {
  const user = m.role === "user";
  return (
    <div
      className={cx(
        "rounded-xl border p-4",
        m.hint
          ? "border-gold-400/70 bg-gold-50/70 dark:border-gold-500/35 dark:bg-gold-500/10"
          : user
            ? "border-ink-200/70 bg-raised"
            : "border-ink-200/70 bg-surface"
      )}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="mono-label text-ink-400">{user ? "User" : "Agent"}</span>
        <span className="rounded border border-ink-200 bg-surface px-1.5 py-0.5 font-mono text-[10.5px] text-ink-600">
          Turn {m.turn}
        </span>
        {m.hint && (
          <span className="rounded border border-gold-400/60 bg-gold-100/70 px-1.5 py-0.5 font-mono text-[10.5px] font-semibold text-gold-700 dark:bg-gold-500/15 dark:text-gold-300">
            Hint, not a turn
          </span>
        )}
      </div>
      <div className="space-y-1.5 text-[12.5px] leading-relaxed text-ink-700">
        <MdLines lines={m.lines} />
      </div>
    </div>
  );
}

/**
 * The golden conversation, collapsed. Ten messages is a long read and the point
 * of the section sits above it, so the transcript is the evidence rather than
 * the argument.
 */
function Transcript({ run }: { run: GoldenRun }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-raised"
      >
        <MessagesSquare size={15} className="shrink-0 text-ink-400" />
        <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-bold text-ink-900">
            The golden conversation
          </span>
          <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-500">
            All {run.conversation.length} messages, the four turns and the steer that sits between
            turn 3 and turn 4.
          </span>
        </span>
        <ChevronDown
          size={16}
          className={cx("shrink-0 text-ink-400 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="transcript"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-ink-200/70 p-5">
              {run.conversation.map((m, i) => (
                <Message key={i} m={m} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TaskDetail() {
  const { id } = useParams();
  const task = taskById(id ?? "");
  const active = useScrollSpy(IDS);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

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
              {t.meta.category}
            </span>
            <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
              {t.meta.subcategory}
            </span>
            <span className="chip bg-ink-100 font-mono text-ink-500 ring-1 ring-ink-200">
              {t.meta.serviceId}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-[32px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[44px]">
            {t.meta.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-ink-600">{t.premise}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Universe" value={t.meta.universe} />
            <Stat label="Persona" value={t.meta.persona} />
            <Stat label="Turns" value={`${t.meta.turns}, with one revision turn`} />
            <Stat label="Model A result" value={t.run.score} tone="no" />
          </div>
        </div>
      </section>

      <div className="wrap py-12">
        <div className="gap-12 lg:grid lg:grid-cols-[240px_1fr]">
          <SectionRail groups={RAIL} active={active} />

          <div className="min-w-0 space-y-20">
            {/* Universe */}
            <section id="universe" className="scroll-mt-24">
              <SectionHead
                id="universe"
                title="The universe did the choosing"
                sub="The scenario was not invented and then looked for. Two channels in the Harmony Games universe carried a real shutdown, and the task took its shape from what was already in them."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {t.universeNotes.map((n) => (
                  <Reveal key={n.title} className="h-full">
                    <div className="card h-full p-5">
                      <h3 className="font-display text-[15px] font-bold text-ink-900">{n.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{n.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Inputs */}
            <section id="inputs" className="scroll-mt-24">
              <SectionHead
                id="inputs"
                title="Eleven files, every one with a job"
                sub="Recovered in a rush during the cancellation week, in the formats that week would actually produce. Two of them exist to be resisted rather than used."
              />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {t.inputs.map((inp) => {
                  const isImage = ["image", "photo", "handwriting"].includes(inp.kind);
                  const url = asset(inp.src);
                  return (
                    <Reveal key={inp.file} className="h-full">
                      <div className="card flex h-full flex-col overflow-hidden">
                        {isImage ? (
                          <button
                            onClick={() => setLightbox({ src: url, alt: inp.shows })}
                            className="group relative block aspect-[16/10] w-full overflow-hidden bg-ink-100"
                          >
                            <img
                              src={url}
                              alt={inp.shows}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                            />
                          </button>
                        ) : (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex aspect-[16/10] w-full items-center justify-center gap-2 bg-raised text-ink-400 transition hover:text-brand-600"
                          >
                            <FileText size={26} />
                            <span className="text-[12.5px] font-semibold">Open the file</span>
                            <ExternalLink size={13} />
                          </a>
                        )}

                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={cx("chip", roleTone[inp.role].chip)}>
                              {roleTone[inp.role].label}
                            </span>
                            <span className="chip bg-ink-100 text-ink-500 ring-1 ring-ink-200">
                              {kindIcon[inp.kind]}
                              {inp.kind}
                            </span>
                          </div>
                          <div className="mt-2.5 break-all font-mono text-[11.5px] font-semibold text-ink-800">
                            {inp.file}
                          </div>
                          <p className="mt-2 text-[12.5px] leading-relaxed text-ink-600">
                            {inp.shows}
                          </p>
                          <div className="mt-3 border-t border-ink-200/70 pt-3">
                            <div className="mono-label mb-1 text-ink-400">Carries</div>
                            <p className="text-[12.5px] leading-relaxed text-ink-700">
                              {inp.carries}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>

            {/* Format */}
            <section id="format" className="scroll-mt-24">
              <SectionHead
                id="format"
                title="The rule lives in an attachment"
                sub="Nothing in the prompt says what a receipt looks like. The template is one of the eleven files, which is what makes finding and following it part of the work."
              />
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-ink-200/70 px-5 py-3">
                  <FileText size={14} className="text-ink-400" />
                  <span className="font-mono text-[12px] font-semibold text-ink-700">
                    {t.format.file}
                  </span>
                  <a
                    href={asset(t.format.src)}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600 hover:underline dark:text-brand-300"
                  >
                    Open <ExternalLink size={12} />
                  </a>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-ink-700">
                  {t.format.body}
                </pre>
              </div>
              <Callout title="Why it matters" tone="accent" icon={<Lightbulb size={13} />}>
                The PST clause in this file is the only thing that settles the Helpshift date. An
                agent that reads the template block and stops there gets the date wrong on exactly
                one of the four receipts.
              </Callout>
            </section>

            {/* Turns */}
            <section id="turns" className="scroll-mt-24">
              <SectionHead
                id="turns"
                title="Four turns, each one standing on the last"
                sub="Read the consumes line on each turn. None of them would work as an opening prompt, which is the whole test in Turn Structure."
              />
              <div className="space-y-5">
                {t.turns.map((turn) => (
                  <Reveal key={turn.n}>
                    <div className="card overflow-hidden">
                      <div className="flex flex-wrap items-center gap-2 border-b border-ink-200/70 bg-raised px-5 py-3">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-600 font-mono text-[11px] font-bold text-white">
                          {turn.n}
                        </span>
                        <span className="text-[13px] font-bold text-ink-900">Turn {turn.n}</span>
                        <div className="ml-auto flex flex-wrap gap-1.5">
                          {turn.produces.map((p) => (
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
                        <blockquote className="relative rounded-xl border border-ink-200/70 bg-raised p-4 pl-9">
                          <Quote
                            size={14}
                            className="absolute left-3.5 top-4 text-ink-300"
                            aria-hidden
                          />
                          <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink-700">
                            {turn.text}
                          </p>
                        </blockquote>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg border border-ink-200/70 px-3.5 py-2.5">
                            <div className="mono-label mb-1 text-ink-400">Adds</div>
                            <p className="text-[12.5px] leading-relaxed text-ink-700">{turn.adds}</p>
                          </div>
                          <div className="rounded-lg border border-ink-200/70 px-3.5 py-2.5">
                            <div className="mono-label mb-1 text-ink-400">Consumes</div>
                            <p className="text-[12.5px] leading-relaxed text-ink-700">
                              {turn.consumes}
                            </p>
                          </div>
                        </div>

                        {turn.notes && turn.notes.length > 0 && (
                          <div className="mt-4 space-y-2.5">
                            {turn.notes.map((n) => (
                              <Callout
                                key={n.title}
                                title={n.title}
                                tone={n.tone === "warn" ? "warn" : n.tone === "no" ? "no" : "accent"}
                                icon={<Target size={12} />}
                              >
                                {n.body}
                              </Callout>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Answer */}
            <section id="answer" className="scroll-mt-24">
              <SectionHead
                id="answer"
                title="The answer existed before the run did"
                sub="The GTFA resolved every vendor, every amount and every date up front. Grading became verification instead of reconstruction."
              />
              <div className="card overflow-hidden">
                <div className="grid gap-4 border-b border-ink-200/70 bg-raised p-6 sm:grid-cols-2">
                  <div>
                    <div className="mono-label text-ink-400">Total owed</div>
                    <div className="mt-1 font-display text-4xl font-bold text-ink-900">
                      {t.answer.total}
                    </div>
                  </div>
                  <div>
                    <div className="mono-label text-ink-400">Of the shutdown estimate</div>
                    <div className="mt-1 font-display text-4xl font-bold text-ink-900">
                      {t.answer.percent}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mono-label mb-1 text-ink-400">Basis</div>
                    <p className="font-mono text-[12.5px] leading-relaxed text-ink-600">
                      {t.answer.basis}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 p-6 sm:grid-cols-3">
                  {t.answer.counts.map((c) => (
                    <Stat key={c.label} label={c.label} value={String(c.n)} tone={c.tone} />
                  ))}
                </div>
              </div>
            </section>

            {/* Ledger */}
            <section id="ledger" className="scroll-mt-24">
              <SectionHead
                id="ledger"
                title="Every vendor, and why it lands where it does"
                sub="One rule, stated once in turn 1, run against twenty vendors. Open a row to see the Slack line and the attachment that decide it."
              />
              <Ledger rows={t.ledger} />
            </section>

            {/* Traps */}
            <section id="traps" className="scroll-mt-24">
              <SectionHead
                id="traps"
                title="Seven pieces of designed friction"
                sub="None of these is a gotcha. Each one is a place where two real sources have to be reconciled, which is where genuine difficulty comes from."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {t.traps.map((trap) => (
                  <Reveal key={trap.id} className="h-full">
                    <TrapCard t={trap} />
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Draft History */}
            <section id="draft-history" className="scroll-mt-24">
              <SectionHead
                id="draft-history"
                title="How the task was filed"
                sub="The Agent Objective and the Desired Outcome, as they were written. The agent is handed neither of them, so every item below carries the prompt that asks for the same thing out loud."
              />

              <div className="card overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 border-b border-ink-200/70 bg-raised px-5 py-3">
                  <Target size={14} className="text-ink-400" />
                  <span className="text-[13px] font-bold text-ink-900">Agent Objective</span>
                  <span className="ml-auto font-mono text-[11px] text-ink-500">
                    why the person is asking
                  </span>
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
                  <div
                    key={r.title}
                    className="rounded-xl border border-ink-200/70 bg-raised px-4 py-3"
                  >
                    <div className="text-[12.5px] font-bold leading-snug text-ink-900">
                      {r.title}
                    </div>
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
                        <span className="rounded-md border border-ink-200 bg-surface px-2 py-0.5 font-mono text-[10.5px] text-ink-600">
                          {turnLabel(o.turns)}
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
                            <MessagesSquare size={12} />
                            Asked for in the conversation
                          </div>
                          <div className="space-y-2.5">
                            {o.askedFor.map((a) => (
                              <div key={a.turn} className="flex gap-2.5">
                                <span className="mt-px grid h-5 shrink-0 place-items-center rounded-md bg-brand-600 px-1.5 font-mono text-[10px] font-bold text-white">
                                  T{a.turn}
                                </span>
                                <p className="text-[12.5px] leading-relaxed text-ink-600">
                                  {a.quote}
                                </p>
                              </div>
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
                  The end state, down to the values. Filenames, dates, confirmers, amounts, the
                  total and the percentage are all here, because this is the answer you already
                  resolved, written so a reviewer can check it without redoing the work.
                </Callout>
                <Callout title="What it can never stand in for" tone="no" icon={<X size={12} />}>
                  A prompt. Every item above is requested out loud in the conversation, and that is
                  the only reason any of it can be graded. A requirement that lives only here was
                  never asked for.
                </Callout>
              </div>

              <Crosslinks
                className="mt-4"
                links={[
                  {
                    to: "/checklist#s4",
                    tag: "D1",
                    label: "Is every graded requirement stated in a prompt?",
                  },
                  {
                    to: `/golden-tasks/${t.meta.id}#turns`,
                    tag: "GT",
                    label: "The four prompts it has to match",
                  },
                  {
                    to: `/golden-tasks/${t.meta.id}#answer`,
                    tag: "GT",
                    label: "The answer it was resolved from",
                  },
                ]}
              />
            </section>

            {/* Model A */}
            <section id="model-a" className="scroll-mt-24">
              <SectionHead
                id="model-a"
                title="Where the run actually broke"
                sub={t.run.summary}
              />
              <div className="space-y-4">
                {t.run.observations.map((o) => (
                  <Reveal key={o.title}>
                    <div className="card p-5">
                      <h3 className="font-display text-[16px] font-bold text-ink-900">{o.title}</h3>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-emerald-300/50 bg-emerald-50/50 p-3.5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                          <div className="mono-label mb-1 text-emerald-700 dark:text-emerald-300">
                            Expected
                          </div>
                          <p className="text-[12.5px] leading-relaxed text-ink-700">{o.expected}</p>
                        </div>
                        <div className="rounded-lg border border-rose-300/50 bg-rose-50/50 p-3.5 dark:border-rose-500/25 dark:bg-rose-500/10">
                          <div className="mono-label mb-1 text-rose-700 dark:text-rose-300">
                            Actual
                          </div>
                          <p className="text-[12.5px] leading-relaxed text-ink-700">{o.actual}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="mono-label text-ink-400">Criteria</span>
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
                <div className="mono-label mb-3 text-ink-400">What Model A actually shipped</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {t.run.artifacts.map((a) => (
                    <a
                      key={a.file}
                      href={a.src ? asset(a.src) : undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="card card-hover flex items-start gap-3 p-4"
                    >
                      <FileText size={15} className="mt-0.5 shrink-0 text-ink-400" />
                      <span className="min-w-0 flex-1">
                        <span className="block break-all font-mono text-[11.5px] font-semibold text-ink-800">
                          {a.file}
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-500">
                          {a.what}
                        </span>
                      </span>
                      <ExternalLink size={13} className="mt-0.5 shrink-0 text-ink-300" />
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Rubrics. The shape of the block is part of what is being
                shown, so the two counts that the guidelines now cap sit above
                it rather than being left for the reader to tally. */}
            <section id="rubrics" className="scroll-mt-24">
              <SectionHead
                id="rubrics"
                title={`${t.rubrics.length} objective criteria`}
                sub="Read any one of them with the prompt closed. The amount, the filename, the date and the person are all inside the criterion, which is what makes it ratable by someone who was never in the room."
              />
              <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <Callout title="Five Trajectory criteria, which is the ceiling" tone="accent" icon={<Target size={12} />}>
                  Since 10 September the block may carry at most five criteria whose evaluation
                  target is Trajectory, and it does not have to carry any. Everything else is graded
                  on the artifacts, where it stays gradable.{" "}
                  <Link to="/#latest-changes" className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 dark:text-brand-300">
                    What changed
                  </Link>
                </Callout>
                <Callout title="Twenty vendors, six criteria" tone="ok" icon={<ClipboardList size={12} />}>
                  A group of more than eight outcomes with the same shape is graded with one
                  completeness criterion and at most five spot checks, never one criterion per
                  element. Here that is criterion 6 plus the four reconciliations carrying the
                  strongest signal.
                </Callout>
              </div>
              <Rubrics rubrics={t.rubrics} />
            </section>

            {/* Milestones */}
            <section id="milestones" className="scroll-mt-24">
              <SectionHead
                id="milestones"
                title={`${t.milestones.length} milestones, one per requirement`}
                sub="Grouped by turn, and written as intent. Read any one of them on its own: it says what the turn asked for, and nothing about the answer that satisfies it."
              />
              <div className="space-y-4">
                {byTurn(t.milestones).map((g) => (
                  <Reveal key={g.turn}>
                    <div className="card overflow-hidden">
                      <div className="flex flex-wrap items-center gap-2 border-b border-ink-200/70 bg-raised px-5 py-3">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-600 font-mono text-[11px] font-bold text-white">
                          {g.turn}
                        </span>
                        <span className="text-[13px] font-bold text-ink-900">Turn {g.turn}</span>
                        <span className="ml-auto font-mono text-[11px] text-ink-500">
                          {g.items.length} milestone{g.items.length === 1 ? "" : "s"}
                        </span>
                      </div>
                      <ul className="divide-y divide-ink-200/60">
                        {g.items.map((m, i) => (
                          <li key={i} className="flex items-start gap-3 px-5 py-3">
                            <Flag size={13} className="mt-0.5 shrink-0 text-ink-300" />
                            <p className="text-[13px] leading-relaxed text-ink-700">{m.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Callout title="What a milestone may require" tone="ok" icon={<Check size={12} />}>
                  A constraint the user stated. The pool is the shutdown channel, and a name that did
                  not survive the export is out of it, so a milestone may say so.
                </Callout>
                <Callout title="What it may never carry" tone="no" icon={<X size={12} />}>
                  The answer, or the route to it. The four receipts, the total and the percentage are
                  results, so no milestone names a vendor, an amount, a filename or a format.
                </Callout>
              </div>
            </section>

            {/* Golden */}
            <section id="golden" className="scroll-mt-24">
              <SectionHead
                id="golden"
                title="What the golden hands over"
                sub="Finished artifacts only. The model reached these itself, steered with intent level prompts that never named a value."
              />
              <div className="grid gap-2 sm:grid-cols-2">
                {t.deliverables.map((d) => {
                  const inner = (
                    <>
                      <FileText size={15} className="mt-0.5 shrink-0 text-gold-500" />
                      <span className="min-w-0 flex-1">
                        <span className="block break-all font-mono text-[11.5px] font-semibold text-ink-800">
                          {d.file}
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-500">
                          {d.what}
                        </span>
                      </span>
                      {d.src && (
                        <ExternalLink size={13} className="mt-0.5 shrink-0 text-ink-300" />
                      )}
                    </>
                  );
                  return d.src ? (
                    <a
                      key={d.file}
                      href={asset(d.src)}
                      target="_blank"
                      rel="noreferrer"
                      className="card card-hover flex items-start gap-3 p-4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={d.file} className="card flex items-start gap-3 p-4">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Hinting */}
            <section id="hinting" className="scroll-mt-24">
              <SectionHead
                id="hinting"
                title="The decision point after every turn"
                sub="Milestones are not a report written at the end. They are checked on each reply, and that check is the only thing that decides what the next prompt is."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Callout title="Milestones reached" tone="ok" icon={<Check size={12} />}>
                  Continue to the next turn as written. Say nothing about the milestones, and add
                  nothing the user would not have said.
                </Callout>
                <Callout title="Milestones missed" tone="warn" icon={<Lightbulb size={12} />}>
                  Stay on the turn. Point back at the intent that is still open, in the voice of the
                  same user, and check the same milestone again on the next reply.
                </Callout>
              </div>

              <div className="mt-5 space-y-3">
                {t.goldenRun.checks.map((c) => (
                  <Reveal key={c.title}>
                    <div className="card p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cx(
                            "grid h-6 w-6 place-items-center rounded-lg",
                            c.met
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                          )}
                        >
                          {c.met ? <Check size={13} /> : <X size={13} />}
                        </span>
                        <span className="text-[13px] font-bold text-ink-900">{c.title}</span>
                        <span
                          className={cx(
                            "ml-auto rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold",
                            c.met
                              ? "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300"
                              : "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300"
                          )}
                        >
                          Turn {c.turn} {c.met ? "reached" : "missed"}
                        </span>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{c.body}</p>
                      <div className="mt-3 rounded-lg bg-raised px-3.5 py-2.5">
                        <div className="mono-label mb-1 text-ink-400">What happens next</div>
                        <p className="text-[12.5px] leading-relaxed text-ink-700">{c.next}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="card mt-5 overflow-hidden">
                  <div className="flex flex-wrap items-center gap-2 border-b border-ink-200/70 bg-gold-50/70 px-5 py-3 dark:bg-gold-500/10">
                    <Lightbulb size={14} className="text-gold-600 dark:text-gold-300" />
                    <span className="text-[13px] font-bold text-ink-900">
                      The one hint this run needed
                    </span>
                    <span className="ml-auto font-mono text-[11px] text-ink-500">
                      between turn 3 and turn 4
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="rounded-lg border border-ink-200/70 bg-raised px-3.5 py-2.5">
                      <div className="mono-label mb-1 text-ink-400">
                        The milestone it was aimed at
                      </div>
                      <p className="text-[12.5px] leading-relaxed text-ink-700">
                        {t.goldenRun.hint.missed}
                      </p>
                    </div>

                    <blockquote className="relative mt-4 rounded-xl border border-gold-400/60 bg-gold-50/70 p-4 pl-9 dark:border-gold-500/35 dark:bg-gold-500/10">
                      <Quote
                        size={14}
                        className="absolute left-3.5 top-4 text-gold-500"
                        aria-hidden
                      />
                      <p className="text-[13.5px] leading-relaxed text-ink-800">
                        {t.goldenRun.hint.prompt}
                      </p>
                    </blockquote>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-emerald-300/50 bg-emerald-50/50 p-3.5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                        <div className="mono-label mb-1.5 text-emerald-700 dark:text-emerald-300">
                          What it points at
                        </div>
                        <ul className="space-y-1.5">
                          {t.goldenRun.hint.does.map((d) => (
                            <li
                              key={d}
                              className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700"
                            >
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
                          {t.goldenRun.hint.avoids.map((d) => (
                            <li
                              key={d}
                              className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700"
                            >
                              <span aria-hidden className="select-none text-ink-400">
                                &bull;
                              </span>
                              <span className="min-w-0 flex-1">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-raised px-3.5 py-2.5">
                      <div className="mono-label mb-1 text-ink-400">What came back</div>
                      <p className="text-[12.5px] leading-relaxed text-ink-700">
                        {t.goldenRun.hint.recovered}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="mt-5">
                <Callout
                  title="The steer ended up inside turn 4"
                  tone="gold"
                  icon={<Sparkles size={12} />}
                >
                  Read the first line of turn 4 in the prompt set above. The context this hint carried
                  is written into the prompt the graded run receives, so the run being scored is asked
                  the same question the golden was steered to. The turns in the transcript below are
                  the wording of this run, before that tightening.
                </Callout>
              </div>

              <div className="mt-5">
                <Transcript run={t.goldenRun} />
              </div>
            </section>

            {/* Subjective */}
            <section id="subjective" className="scroll-mt-24">
              <SectionHead
                id="subjective"
                title="Ten criteria, each one from a side by side comparison"
                sub={t.subjectiveNote}
              />
              <SubjectiveRubrics rubrics={t.subjective} />
            </section>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
