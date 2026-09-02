import { Link } from "react-router-dom";
import { ArrowRight, FileText, Images, ListChecks, Route as RouteIcon, Sparkles } from "lucide-react";
import { tasks } from "../data";
import { methodSteps } from "../data/method";
import { Reveal, SectionHeading } from "../components/ui";

const jumps = [
  { hash: "turns", label: "The prompts", icon: <RouteIcon size={14} /> },
  { hash: "inputs", label: "The inputs", icon: <Images size={14} /> },
  { hash: "ledger", label: "Evidence ledger", icon: <ListChecks size={14} /> },
  { hash: "rubrics", label: "The rubrics", icon: <FileText size={14} /> },
];

export default function GoldenTasks() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative py-14">
          <SectionHeading
            eyebrow="Golden Tasks"
            title="A finished task, opened up"
            sub="Not a file browser. Every section names the method step it came from, so you can read a principle on the landing page and then see the exact decision it produced here, down to the sentence in the prompt that carries it."
          />
        </div>
      </section>

      <div className="wrap py-14">
        <div className="grid gap-6">
          {tasks.map((t, i) => (
            <Reveal key={t.meta.id} delay={i * 0.05}>
              <div className="card overflow-hidden lg:grid lg:grid-cols-[1.4fr_1fr]">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/25 dark:text-gold-300">
                      <Sparkles size={11} /> {t.meta.status}
                    </span>
                    <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
                      {t.meta.category}
                    </span>
                    <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
                      {t.meta.subcategory}
                    </span>
                    <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
                      {t.meta.turns} turns
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                    {t.meta.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                    {t.meta.oneLiner}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="mono-label mb-2 text-ink-400">Universe</div>
                      <p className="text-[13px] leading-relaxed text-ink-600">{t.meta.universe}</p>
                    </div>
                    <div>
                      <div className="mono-label mb-2 text-ink-400">Persona</div>
                      <p className="text-[13px] leading-relaxed text-ink-600">{t.meta.persona}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mono-label mb-2 text-ink-400">Modalities</div>
                    <div className="flex flex-wrap gap-1.5">
                      {t.meta.modalities.map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-ink-200 bg-raised px-2 py-1 font-mono text-[11px] text-ink-600"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mono-label mb-2 text-ink-400">Deliverables</div>
                    <div className="flex flex-wrap gap-1.5">
                      {t.meta.deliverables.map((d) => (
                        <span
                          key={d}
                          className="rounded-md border border-ink-200 bg-raised px-2 py-1 font-mono text-[11px] text-ink-600"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    <Link to={`/golden-tasks/${t.meta.id}`} className="btn-primary">
                      Open the breakdown <ArrowRight size={15} />
                    </Link>
                    {jumps.map((j) => (
                      <Link
                        key={j.hash}
                        to={`/golden-tasks/${t.meta.id}#${j.hash}`}
                        className="btn-ghost"
                      >
                        {j.icon} {j.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-ink-200/70 bg-raised p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div className="mono-label mb-4 text-ink-400">Why it is golden</div>
                  <ul className="space-y-3">
                    {t.whyGolden.map((w) => (
                      <li key={w} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: w.replace(
                              /\*\*(.+?)\*\*/g,
                              '<strong class="font-semibold text-ink-900">$1</strong>'
                            ),
                          }}
                        />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 border-t border-ink-200/70 pt-5">
                    <div className="mono-label mb-3 text-ink-400">Traced back to the method</div>
                    <div className="flex flex-wrap gap-1.5">
                      {methodSteps.map((s) => (
                        <Link
                          key={s.id}
                          to={`/#${s.id}`}
                          title={s.slogan}
                          className="rounded-md border border-ink-200 bg-surface px-2 py-1 font-mono text-[11px] text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
                        >
                          {s.n}. {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
