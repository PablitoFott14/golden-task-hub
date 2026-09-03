import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Gauge,
  HelpCircle,
  Layers,
  MessageCircleQuestion,
  ShieldAlert,
  Sparkles,
  Target,
} from "lucide-react";
import { methodSteps, mindset, hardRequirements } from "../data/method";
import { tasks } from "../data";
import { Callout, Crosslinks, Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/util";

const phaseTone: Record<string, { chip: string; badge: string; bar: string }> = {
  Design: {
    chip: "bg-brand-500/12 text-brand-700 dark:text-brand-300",
    badge: "bg-brand-600",
    bar: "from-brand-600 to-brand-400",
  },
  "Leg A": {
    chip: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
    badge: "bg-amber-500",
    bar: "from-amber-500 to-gold-400",
  },
  "Leg B": {
    chip: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-600",
    bar: "from-emerald-600 to-teal-400",
  },
  Grade: {
    chip: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
    badge: "bg-sky-600",
    bar: "from-sky-600 to-cyan-400",
  },
};

const mindsetIcons = [<Target size={16} key="a" />, <Layers size={16} key="b" />, <Compass size={16} key="c" />];

function StepCard({
  s,
  active,
  onSelect,
}: {
  s: (typeof methodSteps)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const tone = phaseTone[s.phase];
  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      className={cx(
        "group flex h-full w-full flex-col rounded-2xl border p-5 text-left transition duration-300 ease-out",
        active
          ? "border-brand-400 bg-brand-50/70 shadow-glow dark:border-brand-500/50 dark:bg-brand-500/10"
          : "border-ink-200/70 bg-surface shadow-soft hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cx(
            "grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-[12px] font-bold text-white",
            tone.badge
          )}
        >
          {s.n}
        </span>
        <span className={cx("chip", tone.chip)}>{s.phase}</span>
        <ChevronRight
          size={15}
          className={cx(
            "ml-auto shrink-0 transition-transform duration-300",
            active ? "rotate-90 text-brand-500" : "text-ink-300 group-hover:translate-x-0.5"
          )}
        />
      </div>

      <h3 className="mt-3.5 font-display text-[16px] font-bold leading-snug tracking-tight text-ink-900">
        {s.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{s.slogan}</p>
    </button>
  );
}

export default function Method() {
  const [active, setActive] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const step = methodSteps.find((s) => s.n === active)!;

  /** Selecting a card should bring its detail panel into view, not leave it
   *  somewhere below the fold. Mount does not scroll, only a click does. */
  const select = useCallback((n: number) => {
    setActive(n);
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight - 200) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);
  const tone = phaseTone[step.phase];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora" />
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.35]" />
        <div className="wrap relative py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="chip bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/25 dark:text-gold-300">
                <Sparkles size={12} /> OpenClaw MM Rubrics · Multi-turn · Red Shell
              </span>
              <h1 className="mt-5 font-display text-[34px] font-bold leading-[1.06] tracking-tight text-ink-900 sm:text-[52px]">
                A strong task is designed,
                <br className="hidden sm:block" />{" "}
                <span className="bg-gradient-to-r from-brand-600 to-gold-500 bg-clip-text text-transparent">
                  not improvised.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-500">
                Nine steps, in the order they actually happen. Read the principle, then follow it
                straight into a Golden Task and see exactly where it landed.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={{ hash: "#method" }} className="btn-primary">
                  <Compass size={16} /> Start with the method
                </Link>
                <Link to="/golden-tasks" className="btn-ghost">
                  <BookOpenCheck size={16} /> See it in a Golden Task
                </Link>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                {[
                  { k: `${methodSteps.length}`, v: "method steps" },
                  { k: `${tasks.length}`, v: tasks.length === 1 ? "worked task" : "worked tasks" },
                  { k: "28", v: "gate checks" },
                ].map((x) => (
                  <div key={x.v} className="rounded-xl border border-ink-200/70 bg-surface px-4 py-3">
                    <dt className="font-display text-2xl font-bold text-ink-900">{x.k}</dt>
                    <dd className="mono-label mt-0.5 text-ink-400">{x.v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="card p-5">
                <div className="mono-label mb-4 text-brand-600 dark:text-brand-300">The mindset</div>
                <div className="space-y-4">
                  {mindset.map((m, i) => (
                    <div key={m.id} className="flex gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-300">
                        {mindsetIcons[i]}
                      </span>
                      <div>
                        <h3 className="text-[13.5px] font-bold text-ink-900">{m.title}</h3>
                        <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-500">{m.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/checklist"
                className="card card-hover group flex items-center gap-3 p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500/12 text-emerald-600 dark:text-emerald-300">
                  <ClipboardCheck size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-bold text-ink-900">
                    Finished a task already?
                  </span>
                  <span className="block text-[12.5px] text-ink-500">
                    Run the pre-submit gate before you hand it in.
                  </span>
                </span>
                <ArrowRight
                  size={15}
                  className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The method */}
      <section id="method" className="scroll-mt-20 border-b border-ink-200/70 bg-ink-50">
        <div className="wrap py-16">
          <Reveal>
            <SectionHeading
              eyebrow="The method"
              title="Nine steps, from an empty universe to a graded task"
              sub="Each card carries the step and the principle behind it in one line. Open one to see what it means, the moves it takes, the rule attached to it, and the place in a Golden Task where you can watch it work."
            />
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {methodSteps.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i * 0.04, 0.24)} className="h-full">
                <StepCard s={s} active={s.n === active} onSelect={() => select(s.n)} />
              </Reveal>
            ))}
          </div>

          {/* Detail panel */}
          <div ref={panelRef} className="scroll-mt-24" />
          <AnimatePresence mode="wait">
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="card mt-8 overflow-hidden"
            >
              <div className={cx("bg-gradient-to-br p-6 text-white sm:p-8", tone.bar)}>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                  <span>
                    Step {step.n} of {methodSteps.length} · {step.title}
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5">{step.phase}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5">→ {step.produces}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {step.slogan}
                </h3>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-white/90">
                  {step.means}
                </p>
              </div>

              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
                <div>
                  <div className="mono-label mb-3 text-ink-400">What it takes</div>
                  <ul className="space-y-2.5">
                    {step.moves.map((m) => (
                      <li key={m} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-700">
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0 text-emerald-500"
                          aria-hidden
                        />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  {step.rule && (
                    <Callout
                      title={step.rule.label}
                      tone="warn"
                      icon={<ShieldAlert size={13} />}
                    >
                      {step.rule.body}
                    </Callout>
                  )}
                </div>

                <div className="self-start rounded-2xl border border-gold-300/70 bg-gold-50/60 p-5 dark:border-gold-500/30 dark:bg-gold-500/10">
                  <div className="mono-label mb-2 flex items-center gap-1.5 text-gold-700 dark:text-gold-300">
                    <Sparkles size={13} /> In the Golden Task
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink-700">{step.inTask.body}</p>
                  <Crosslinks links={[step.inTask.link]} className="mt-4" />
                </div>

                <div className="flex flex-wrap gap-2 lg:col-span-2">
                  <button
                    disabled={step.n === 1}
                    onClick={() => select(Math.max(1, step.n - 1))}
                    className="btn-ghost disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={step.n === methodSteps.length}
                    onClick={() => select(Math.min(methodSteps.length, step.n + 1))}
                    className="btn-primary disabled:opacity-40"
                  >
                    Next step <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="border-b border-ink-200/70 bg-surface">
        <div className="wrap py-12">
          <Reveal>
            <Link
              to="/faq"
              className="group flex flex-col gap-5 rounded-2xl border border-brand-300/60 bg-gradient-to-r from-brand-50 via-surface to-gold-50/50 p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift dark:border-brand-500/30 dark:from-brand-500/10 dark:via-surface dark:to-gold-500/5 sm:flex-row sm:items-center sm:p-8"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-glow">
                <MessageCircleQuestion size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl font-bold tracking-tight text-ink-900">
                  New here, and something above raised a question?
                </span>
                <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink-500">
                  MEMORY.md, inputs.zip against the inputs folder, how milestones split, how Model B
                  actually runs. The answers everyone asks for in their first week are collected in
                  one place.
                </span>
              </span>
              <span className="btn-primary shrink-0">
                Read the FAQ
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Hard requirements */}
      <section className="border-b border-ink-200/70 bg-surface">
        <div className="wrap py-16">
          <Reveal>
            <SectionHeading
              eyebrow="The floor"
              title="Eight things every task has to contain"
              sub="A task that misses one of them does not get graded on how good the rest of it was."
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {hardRequirements.map((r, i) => (
              <Reveal key={r.label} delay={Math.min(i * 0.03, 0.2)} className="h-full">
                <div className="card h-full p-4">
                  <div className="flex items-center gap-2">
                    <Gauge size={14} className="shrink-0 text-brand-500" aria-hidden />
                    <div className="text-[13px] font-bold text-ink-900">{r.label}</div>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where to go next */}
      <section className="bg-ink-50">
        <div className="wrap py-16">
          <Reveal>
            <SectionHeading
              eyebrow="The rest of the hub"
              title="Everything else you need, one hop away"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                to: `/golden-tasks`,
                icon: <BookOpenCheck size={18} />,
                title: "Golden Tasks",
                body: "Finished tasks opened up: the prompts, the evidence, the rubrics, and where the model broke.",
                tone: "bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/25 dark:text-gold-300",
              },
              {
                to: "/checklist",
                icon: <ClipboardCheck size={18} />,
                title: "Pre-Submit Gate",
                body: "Twenty eight checks in seven sections. Roughly five minutes, run once before you submit.",
                tone: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300",
              },
              {
                to: "/spec",
                icon: <Gauge size={18} />,
                title: "QC Spec",
                body: "The twenty one questions your task is scored against, and the rubric error catalogue behind them.",
                tone: "bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/25 dark:text-sky-300",
              },
              {
                to: "/faq",
                icon: <HelpCircle size={18} />,
                title: "FAQ",
                body: "The questions that come up in everyone's first week, answered once and linked into everything else.",
                tone: "bg-violet-500/12 text-violet-700 ring-1 ring-violet-500/25 dark:text-violet-300",
              },
            ].map((c, i) => (
              <Reveal key={c.to} delay={Math.min(i * 0.04, 0.2)} className="h-full">
                <Link to={c.to} className="card card-hover group flex h-full flex-col p-5">
                  <span
                    className={cx("grid h-10 w-10 place-items-center rounded-xl", c.tone)}
                  >
                    {c.icon}
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-bold tracking-tight text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-500">{c.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 dark:text-brand-300">
                    Open
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
