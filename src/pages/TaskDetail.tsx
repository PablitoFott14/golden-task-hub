import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  PenLine,
  Quote,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { taskById } from "../data";
import { methodSteps } from "../data/method";
import type { InputAsset, Trap, XLink } from "../data/types";
import { Callout, Crosslinks, Reveal, SectionRail, Stat } from "../components/ui";
import Ledger from "../components/Ledger";
import Rubrics, { Ticks } from "../components/Rubrics";
import { useScrollSpy } from "../lib/useScrollSpy";
import { asset, cx } from "../lib/util";

const SECTIONS: { id: string; label: string; step?: number }[] = [
  { id: "universe", label: "The universe", step: 1 },
  { id: "inputs", label: "Multimodal inputs", step: 2 },
  { id: "format", label: "The format spec", step: 2 },
  { id: "turns", label: "The four prompts", step: 3 },
  { id: "answer", label: "The resolved answer", step: 3 },
  { id: "ledger", label: "Evidence ledger", step: 3 },
  { id: "model-a", label: "Where Model A broke", step: 5 },
  { id: "rubrics", label: "Objective rubrics", step: 6 },
  { id: "golden", label: "Golden deliverables", step: 8 },
  { id: "subjective", label: "Subjective block", step: 9 },
  { id: "traps", label: "Designed friction" },
  { id: "takeaways", label: "What to copy" },
];

const IDS = SECTIONS.map((s) => s.id);

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
  const meta = SECTIONS.find((s) => s.id === id);
  const step = meta?.step ? methodSteps.find((m) => m.n === meta.step) : undefined;
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
          <SectionRail sections={SECTIONS} active={active} />

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

            {/* Rubrics */}
            <section id="rubrics" className="scroll-mt-24">
              <SectionHead
                id="rubrics"
                title={`${t.rubrics.length} objective criteria`}
                sub="Read any one of them with the prompt closed. The amount, the filename, the date and the person are all inside the criterion, which is what makes it ratable by someone who was never in the room."
              />
              <Rubrics rubrics={t.rubrics} />
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

            {/* Subjective */}
            <section id="subjective" className="scroll-mt-24">
              <SectionHead
                id="subjective"
                title="Ten criteria from one side by side comparison"
                sub={t.subjectiveNote}
              />
              <ol className="space-y-2">
                {t.subjective.map((s) => (
                  <li key={s.n} className="card flex items-start gap-3 p-4">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-mono text-[11px] font-bold text-brand-700 dark:text-brand-300">
                      {s.n}
                    </span>
                    <p className="text-[13px] leading-relaxed text-ink-700">
                      <Ticks text={s.text} />
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <div className="mono-label mb-3 text-ink-400">
                  What the comparison actually caught
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {t.subjectiveFailures.map((f) => (
                    <div
                      key={f.n}
                      className="rounded-xl border border-rose-300/50 bg-rose-50/40 p-4 dark:border-rose-500/25 dark:bg-rose-500/10"
                    >
                      <div className="mono-label mb-1.5 text-rose-700 dark:text-rose-300">
                        Criterion {f.n}
                      </div>
                      <p className="text-[12.5px] leading-relaxed text-ink-700">{f.body}</p>
                    </div>
                  ))}
                </div>
              </div>
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

            {/* Takeaways */}
            <section id="takeaways" className="scroll-mt-24">
              <SectionHead
                id="takeaways"
                title="What to copy into your own task"
                sub="Five habits this task is built on. None of them depend on the scenario being about vendors."
              />
              <div className="space-y-3">
                {t.takeaways.map((tk, i) => (
                  <Reveal key={tk.title}>
                    <div className="card p-5">
                      <div className="flex items-start gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gold-500/15 font-mono text-[11px] font-bold text-gold-700 dark:text-gold-300">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-[15.5px] font-bold text-ink-900">
                            {tk.title}
                          </h3>
                          <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{tk.body}</p>
                          <Crosslinks links={tk.links} className="mt-3" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
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
