import { useState } from "react";
import { ArrowUpRight, ExternalLink, Gauge, ShieldAlert, XCircle } from "lucide-react";
import { rubricErrors, specDimensions, SPEC_URL } from "../data/specDoc";
import { Crosslinks, Reveal, SectionRail } from "../components/ui";
import { useScrollSpy } from "../lib/useScrollSpy";
import { cx } from "../lib/util";

const SECTIONS = [
  ...specDimensions.map((d) => ({ id: d.id, label: d.name })),
  { id: "errors", label: "Rubric error catalogue" },
];
const IDS = SECTIONS.map((s) => s.id);

const questionCount = specDimensions.reduce((n, d) => n + d.questions.length, 0);

export default function SpecDoc() {
  const active = useScrollSpy(IDS);
  const [severity, setSeverity] = useState<"All" | "Major" | "Moderate">("All");

  const errors = rubricErrors.filter((e) => severity === "All" || e.severity === severity);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative py-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/25 dark:text-sky-300">
              <Gauge size={11} /> Quality Control
            </span>
            <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
              {questionCount} scored questions · {specDimensions.length} dimensions
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-[34px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[44px]">
            What a reviewer scores your task against
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">
            This page is a map of the QC spec: the dimensions, what each question protects, and the
            thing that fails it. The live viewer stays the source of truth for the exact option
            wording and the score attached to each one.
          </p>

          <a
            href={SPEC_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-7 flex max-w-2xl items-center gap-4 rounded-2xl border border-ink-200/70 bg-raised p-4 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-900 text-ink-50">
              <Gauge size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-bold text-ink-900">
                Open the live QC spec viewer
              </span>
              <span className="block truncate font-mono text-[12px] text-ink-500">{SPEC_URL}</span>
            </span>
            <span className="btn-primary shrink-0">
              Open <ExternalLink size={14} />
            </span>
          </a>
        </div>
      </section>

      <div className="wrap py-12">
        <div className="gap-12 lg:grid lg:grid-cols-[1fr_220px]">
          <div className="min-w-0 space-y-16">
            {specDimensions.map((d) => (
              <section key={d.id} id={d.id} className="scroll-mt-24">
                <div className="border-b border-ink-200/70 pb-4">
                  <h2 className="font-display text-[24px] font-bold tracking-tight text-ink-900">
                    {d.name}
                  </h2>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">{d.purpose}</p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {d.questions.map((q) => (
                    <Reveal key={q.id} className="h-full">
                      <div className="card h-full p-5">
                        <h3 className="font-display text-[15.5px] font-bold leading-snug text-ink-900">
                          {q.name}
                        </h3>
                        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-600">{q.body}</p>
                        <div className="mt-4 rounded-lg border border-rose-300/50 bg-rose-50/40 p-3 dark:border-rose-500/25 dark:bg-rose-500/10">
                          <div className="mono-label mb-1 flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                            <XCircle size={12} /> Fails when
                          </div>
                          <p className="text-[12.5px] leading-relaxed text-ink-700">{q.fails}</p>
                        </div>
                        <Crosslinks links={q.links} className="mt-3.5" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}

            {/* Error catalogue */}
            <section id="errors" className="scroll-mt-24">
              <div className="border-b border-ink-200/70 pb-4">
                <h2 className="font-display text-[24px] font-bold tracking-tight text-ink-900">
                  Rubric error catalogue
                </h2>
                <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-ink-500">
                  These are what the Overall Rubric Quality score counts, with every criterion you
                  wrote as the denominator. Major issues above 10%, or Major and Moderate together
                  above 15%, and the task fails.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(["All", "Major", "Moderate"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={cx(
                      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition",
                      severity === s
                        ? "border-brand-400 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                        : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300"
                    )}
                  >
                    {s === "All" ? "All issues" : s}
                    <span className="font-mono text-[11px] text-ink-400">
                      {s === "All"
                        ? rubricErrors.length
                        : rubricErrors.filter((e) => e.severity === s).length}
                    </span>
                  </button>
                ))}
              </div>

              <ul className="mt-4 space-y-2.5">
                {errors.map((e) => (
                  <li key={e.name} className="card p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cx(
                          "chip",
                          e.severity === "Major"
                            ? "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300"
                            : "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300"
                        )}
                      >
                        <ShieldAlert size={11} /> {e.severity}
                      </span>
                      <h3 className="text-[14px] font-bold text-ink-900">{e.name}</h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{e.body}</p>
                    <Crosslinks links={e.links} className="mt-3" />
                  </li>
                ))}
              </ul>

              <a
                href={SPEC_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-600 hover:underline dark:text-brand-300"
              >
                Read the full definitions in the live spec
                <ArrowUpRight size={14} />
              </a>
            </section>
          </div>

          <SectionRail sections={SECTIONS} active={active} />
        </div>
      </div>
    </div>
  );
}
