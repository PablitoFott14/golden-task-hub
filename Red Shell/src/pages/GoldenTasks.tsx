import { Link } from "react-router-dom";
import { ArrowRight, Image as ImageIcon, Layers, ShieldAlert, Sparkles } from "lucide-react";
import { tasks } from "../data";
import type { GoldenTask } from "../data/types";
import { Reveal, SectionHeading } from "../components/ui";
import { asset, cx } from "../lib/util";

/** The strip across the top of a card. Real inputs from the task, up to four. */
function Canvas({ t }: { t: GoldenTask }) {
  const shots = t.inputs.filter((i) => i.kind !== "pdf" && i.kind !== "doc").slice(0, 4);
  if (shots.length === 0) {
    return (
      <div className="grid h-40 place-items-center border-b border-ink-200/70 bg-raised text-ink-300">
        <ImageIcon size={26} />
      </div>
    );
  }
  return (
    <div
      className={cx(
        "grid h-40 gap-px overflow-hidden border-b border-ink-200/70 bg-ink-200",
        shots.length === 1 && "grid-cols-1",
        shots.length === 2 && "grid-cols-2",
        shots.length === 3 && "grid-cols-3",
        shots.length >= 4 && "grid-cols-4"
      )}
    >
      {shots.map((s) => (
        <img
          key={s.file}
          src={asset(s.src)}
          alt={s.shows}
          loading="lazy"
          className="h-full w-full bg-surface object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
      ))}
    </div>
  );
}

function TaskCard({ t }: { t: GoldenTask }) {
  const visuals = t.inputs.filter((i) => i.kind !== "doc").length;
  return (
    <Link
      to={`/golden-tasks/${t.meta.id}`}
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
      <Canvas t={t} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="chip bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/25 dark:text-gold-300">
            <Sparkles size={11} /> {t.meta.status}
          </span>
          <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
            {t.meta.category}
          </span>
          <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
            {t.meta.subcategory}
          </span>
        </div>

        <h2 className="mt-3.5 font-display text-[19px] font-bold leading-snug tracking-tight text-ink-900">
          {t.meta.title}
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{t.meta.oneLiner}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <ImageIcon size={13} className="text-brand-500" />
            <span className="font-mono">{visuals}</span> visual inputs
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers size={13} className="text-brand-500" />
            <span className="font-mono">{t.rubrics.length + t.subjective.length}</span> rubrics
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="font-mono">{t.turns.length}</span> turns
          </span>
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 border-t border-ink-200/70 pt-4 text-[13px] font-semibold text-brand-600 dark:text-brand-300">
          View task walkthrough
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function GoldenTasks() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative py-12">
          <SectionHeading
            eyebrow="Golden Tasks"
            title="Finished tasks, opened up"
            sub="Each one is a full walkthrough: the prompts, the inputs, the evidence behind every decision, the rubrics, and where the model broke. Read them to calibrate the level of complexity your own task has to reach."
          />
        </div>
      </section>

      <div className="wrap py-10">
        <Reveal>
          <div className="mb-8 flex flex-col gap-3 rounded-2xl border-2 border-rose-400/70 bg-rose-50/70 p-5 dark:border-rose-500/40 dark:bg-rose-500/10 sm:flex-row sm:items-start sm:gap-4 sm:p-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-300">
              <ShieldAlert size={20} />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-[17px] font-bold tracking-tight text-rose-700 dark:text-rose-300">
                Reference only
              </h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-700">
                Use these scenarios only as references to understand the expected level of
                complexity. Do not copy or reuse them.{" "}
                <strong className="font-bold text-rose-700 dark:text-rose-300">
                  Doing so will result in automatic removal from the project.
                </strong>
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
          {tasks.map((t, i) => (
            <Reveal key={t.meta.id} delay={Math.min(i * 0.05, 0.2)} className="h-full">
              <TaskCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
