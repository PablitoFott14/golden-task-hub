import { useMemo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Clock, Download, RotateCcw, ShieldCheck } from "lucide-react";
import { checklist, checklistMeta } from "../data/checklist";
import { Crosslinks, Reveal, SectionRail } from "../components/ui";
import { useScrollSpy } from "../lib/useScrollSpy";
import { usePersisted } from "../lib/usePersisted";
import { asset, cx } from "../lib/util";

const SECTIONS = checklist.map((s) => ({ id: s.id, label: `${s.n}. ${s.title}` }));
const IDS = SECTIONS.map((s) => s.id);
const ALL = checklist.flatMap((s) => s.checks.map((c) => c.id));

export default function PreSubmit() {
  const active = useScrollSpy(IDS);
  const [ticked, setTicked] = usePersisted<string[]>("rsh.checklist.v2", []);

  const done = useMemo(() => new Set(ticked), [ticked]);
  const count = ALL.filter((id) => done.has(id)).length;
  const pct = Math.round((count / ALL.length) * 100);
  const ready = count === ALL.length;

  const toggle = (id: string) =>
    setTicked(done.has(id) ? ticked.filter((x) => x !== id) : [...ticked, id]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative py-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300">
              <Clock size={11} /> {checklistMeta.estimate}
            </span>
            <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
              {ALL.length} checks · {checklist.length} sections
            </span>
          </div>

          <h1 className="mt-5 font-display text-[34px] font-bold tracking-tight text-ink-900 sm:text-[44px]">
            {checklistMeta.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">
            {checklistMeta.subtitle}
          </p>

          <div className="mt-6 max-w-2xl rounded-xl border border-amber-300/70 bg-amber-50/60 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
            <div className="mono-label mb-1.5 flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
              <AlertTriangle size={13} /> {checklistMeta.warning.split(".")[0]}
            </div>
            <p className="text-[13px] leading-relaxed text-ink-700">{checklistMeta.banner}</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={asset(checklistMeta.pdf)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <Download size={15} /> Open the printable PDF
            </a>
            {count > 0 && (
              <button onClick={() => setTicked([])} className="btn-ghost">
                <RotateCcw size={15} /> Reset ticks
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Sticky progress */}
      <div className="sticky top-16 z-30 border-b border-ink-200/70 bg-ink-50/90 backdrop-blur-md">
        <div className="wrap flex items-center gap-4 py-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-200">
            <motion.div
              className={cx(
                "h-full rounded-full",
                ready ? "bg-emerald-500" : "bg-gradient-to-r from-brand-600 to-brand-400"
              )}
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="shrink-0 font-mono text-[12px] font-semibold text-ink-600">
            {count} / {ALL.length}
          </span>
          <span
            className={cx(
              "chip shrink-0",
              ready
                ? "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300"
                : "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300"
            )}
          >
            {ready ? <ShieldCheck size={11} /> : <AlertTriangle size={11} />}
            <span className="hidden sm:inline">
              {ready ? checklistMeta.ready.title : checklistMeta.fix.title}
            </span>
          </span>
        </div>
      </div>

      <div className="wrap py-12">
        <div className="gap-12 lg:grid lg:grid-cols-[1fr_220px]">
          <div className="min-w-0 space-y-14">
            {checklist.map((s) => {
              const sectionDone = s.checks.filter((c) => done.has(c.id)).length;
              return (
                <section key={s.id} id={s.id} className="scroll-mt-32">
                  <div className="flex flex-wrap items-baseline gap-3 border-b border-ink-200/70 pb-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-600 font-mono text-[13px] font-bold text-white">
                      {s.n}
                    </span>
                    <h2 className="font-display text-[22px] font-bold tracking-tight text-ink-900">
                      {s.title}
                    </h2>
                    <span className="ml-auto font-mono text-[12px] text-ink-400">
                      {sectionDone} / {s.checks.length}
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] italic leading-relaxed text-ink-500">{s.prompt}</p>

                  <ul className="mt-5 space-y-3">
                    {s.checks.map((c) => {
                      const isDone = done.has(c.id);
                      return (
                        <Reveal key={c.id}>
                          <li
                            className={cx(
                              "rounded-2xl border bg-surface p-4 transition duration-200 sm:p-5",
                              isDone
                                ? "border-emerald-300/60 bg-emerald-50/30 dark:border-emerald-500/25 dark:bg-emerald-500/[0.06]"
                                : "border-ink-200/70"
                            )}
                          >
                            <div className="flex items-start gap-3.5">
                              <button
                                onClick={() => toggle(c.id)}
                                role="checkbox"
                                aria-checked={isDone}
                                aria-label={`Mark ${c.id} as checked`}
                                className={cx(
                                  "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition duration-200",
                                  isDone
                                    ? "border-emerald-500 bg-emerald-500 text-white"
                                    : "border-ink-300 text-transparent hover:border-brand-400"
                                )}
                              >
                                <Check size={14} strokeWidth={3} />
                              </button>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-600">
                                    {c.id}
                                  </span>
                                  <span className="font-mono text-[11px] text-ink-400">{c.ref}</span>
                                </div>
                                <p
                                  className={cx(
                                    "mt-2 text-[14px] font-medium leading-relaxed",
                                    isDone ? "text-ink-500" : "text-ink-800"
                                  )}
                                >
                                  {c.q}
                                </p>
                                {c.f && (
                                  <p className="mt-2 border-l-2 border-ink-200 pl-3 text-[12.5px] leading-relaxed text-ink-500">
                                    {c.f}
                                  </p>
                                )}
                                <Crosslinks links={c.links} className="mt-3" />
                              </div>
                            </div>
                          </li>
                        </Reveal>
                      );
                    })}
                  </ul>
                </section>
              );
            })}

            {/* Verdict */}
            <section className="scroll-mt-32">
              <div className="grid gap-4 sm:grid-cols-2">
                <div
                  className={cx(
                    "rounded-2xl border p-5 transition",
                    ready
                      ? "border-emerald-400 bg-emerald-50/60 shadow-soft dark:border-emerald-500/40 dark:bg-emerald-500/10"
                      : "border-ink-200/70 bg-surface opacity-60"
                  )}
                >
                  <div className="mono-label mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck size={13} /> {checklistMeta.ready.title}
                  </div>
                  <p className="text-[13px] leading-relaxed text-ink-700">
                    {checklistMeta.ready.body}
                  </p>
                </div>
                <div
                  className={cx(
                    "rounded-2xl border p-5 transition",
                    !ready
                      ? "border-amber-400 bg-amber-50/60 shadow-soft dark:border-amber-500/40 dark:bg-amber-500/10"
                      : "border-ink-200/70 bg-surface opacity-60"
                  )}
                >
                  <div className="mono-label mb-2 flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                    <AlertTriangle size={13} /> {checklistMeta.fix.title}
                  </div>
                  <p className="text-[13px] leading-relaxed text-ink-700">
                    {checklistMeta.fix.body}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[12.5px] text-ink-400">
                Ticks are stored in this browser only. They are a convenience, never a record.
              </p>
            </section>
          </div>

          <SectionRail sections={SECTIONS} active={active} />
        </div>
      </div>
    </div>
  );
}
