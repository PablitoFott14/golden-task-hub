import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  Gauge,
  Image as ImageIcon,
  Layers,
  RotateCcw,
  ScrollText,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { checklist, checklistMeta } from "../data/checklist";
import type { Check as CheckItem, ChecklistSection } from "../data/types";
import { Crosslinks, Reveal, SectionHeading } from "../components/ui";
import { useScrollSpy } from "../lib/useScrollSpy";
import { asset, cx } from "../lib/util";

const CHECKS_KEY = "rsh.presubmit.checks.v1";

const sectionIcon: Record<string, typeof FileText> = {
  s1: Layers,
  s2: ImageIcon,
  s3: FileText,
  s4: ClipboardList,
  s5: ScrollText,
  s6: Wand2,
  s7: Gauge,
};

export default function PreSubmit() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(CHECKS_KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });
  const [justReset, setJustReset] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKS_KEY, JSON.stringify([...checked]));
    } catch {
      /* private window */
    }
  }, [checked]);

  const ids = useMemo(() => checklist.map((s) => s.id), []);
  const activeId = useScrollSpy(ids);

  const { total, done } = useMemo(() => {
    const items = checklist.flatMap((s) => s.checks);
    return { total: items.length, done: items.filter((i) => checked.has(i.id)).length };
  }, [checked]);

  const pct = total ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done === total;

  const toggle = (id: string) => {
    setJustReset(false);
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const setMany = (itemIds: string[], value: boolean) => {
    setJustReset(false);
    setChecked((prev) => {
      const next = new Set(prev);
      itemIds.forEach((id) => (value ? next.add(id) : next.delete(id)));
      return next;
    });
  };

  const submit = () => {
    setChecked(new Set());
    setJustReset(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => setJustReset(false), 4000);
  };

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading
            eyebrow="Pre-Submit Gate"
            title="One last pass before you submit"
            sub={checklistMeta.subtitle}
          />
          <a href={asset(checklistMeta.pdf)} target="_blank" rel="noreferrer" className="btn-ghost shrink-0">
            <Download size={15} /> Printable PDF
          </a>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-5 rounded-xl border border-amber-300/70 bg-amber-50/60 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            <AlertTriangle size={13} /> Rubrics are the biggest source of rejections
          </div>
          <p className="text-[13px] leading-relaxed text-ink-700">
            {checklistMeta.warning.split(". ").slice(1).join(". ")} {checklistMeta.banner}
          </p>
        </div>
      </Reveal>

      <div className="mt-8 lg:grid lg:grid-cols-[270px_1fr] lg:gap-8">
        {/* Sidebar: progress + jump nav */}
        <aside className="mb-6 lg:mb-0 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">Progress</span>
              <span className="text-sm font-extrabold text-ink-900">
                {done}/{total}
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-200/70">
              <motion.div
                className={cx("h-full rounded-full", allDone ? "bg-emerald-500" : "bg-brand-500")}
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <AnimatePresence>
              {(justReset || allDone) && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 flex items-center gap-1.5 overflow-hidden text-[12px] font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={14} className="shrink-0" />
                  {justReset ? "Reset, ready for the next task." : "All clear. You are good to submit."}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-3 flex gap-2">
              <button onClick={submit} className="btn-primary flex-1 px-3 py-2 text-sm">
                <Send size={15} /> Submit &amp; reset
              </button>
              {done > 0 && (
                <button
                  onClick={() => setChecked(new Set())}
                  className="btn-ghost px-2.5 py-2 text-sm"
                  title="Clear all checks"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>

            <p className="mt-3 text-[11.5px] leading-relaxed text-ink-400">
              Ticks are stored in this browser only. They are a convenience, never a record.
            </p>
          </div>

          {/* Jump nav (scrollspy) */}
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {checklist.map((s) => {
              const Icon = sectionIcon[s.id] ?? FileText;
              const sectionDone = s.checks.filter((i) => checked.has(i.id)).length;
              const complete = sectionDone === s.checks.length;
              const on = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => jump(s.id)}
                  className={cx(
                    "group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition lg:w-full",
                    on
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                      : "text-ink-600 hover:bg-ink-100"
                  )}
                >
                  <Icon
                    size={15}
                    className={cx("shrink-0", on ? "text-brand-600 dark:text-brand-300" : "text-ink-400")}
                  />
                  <span className="flex-1 whitespace-nowrap lg:whitespace-normal">{s.title}</span>
                  <span
                    className={cx(
                      "ml-auto hidden items-center rounded-full px-1.5 text-[11px] font-bold lg:inline-flex",
                      complete
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                        : "bg-ink-100 text-ink-500"
                    )}
                  >
                    {complete ? <Check size={11} /> : `${sectionDone}/${s.checks.length}`}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* All sections, always visible */}
        <div className="min-w-0 space-y-5">
          {checklist.map((s) => (
            <SectionBlock key={s.id} section={s} checked={checked} onToggle={toggle} onSetMany={setMany} />
          ))}

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className={cx(
                "rounded-2xl border p-5 transition",
                allDone
                  ? "border-emerald-400 bg-emerald-50/60 shadow-soft dark:border-emerald-500/40 dark:bg-emerald-500/10"
                  : "border-ink-200/70 bg-surface opacity-60"
              )}
            >
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                <Sparkles size={13} /> {checklistMeta.ready.title}
              </div>
              <p className="text-[13px] leading-relaxed text-ink-700">{checklistMeta.ready.body}</p>
            </div>
            <div
              className={cx(
                "rounded-2xl border p-5 transition",
                !allDone
                  ? "border-amber-400 bg-amber-50/60 shadow-soft dark:border-amber-500/40 dark:bg-amber-500/10"
                  : "border-ink-200/70 bg-surface opacity-60"
              )}
            >
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                <AlertTriangle size={13} /> {checklistMeta.fix.title}
              </div>
              <p className="text-[13px] leading-relaxed text-ink-700">{checklistMeta.fix.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  checked,
  onToggle,
  onSetMany,
}: {
  section: ChecklistSection;
  checked: Set<string>;
  onToggle: (id: string) => void;
  onSetMany: (ids: string[], value: boolean) => void;
}) {
  const Icon = sectionIcon[section.id] ?? FileText;
  const doneCount = section.checks.filter((i) => checked.has(i.id)).length;
  const complete = doneCount === section.checks.length;
  const itemIds = section.checks.map((i) => i.id);

  return (
    <section id={section.id} className="card scroll-mt-24 overflow-hidden">
      <div className="flex items-start gap-3 border-b border-ink-200/70 p-5">
        <span
          className={cx(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition",
            complete
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
              : "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
          )}
        >
          {complete ? <Check size={20} /> : <Icon size={20} />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">
              {section.n}. {section.title}
            </h2>
            <span
              className={cx(
                "chip",
                complete
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                  : "bg-ink-100 text-ink-500"
              )}
            >
              {doneCount}/{section.checks.length}
            </span>
          </div>
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-500">{section.prompt}</p>
        </div>
        <button
          onClick={() => onSetMany(itemIds, !complete)}
          className="shrink-0 self-center rounded-lg border border-ink-200 bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700"
        >
          {complete ? "Uncheck all" : "Check all"}
        </button>
      </div>

      <ul className="divide-y divide-ink-200/70">
        {section.checks.map((item) => (
          <ItemRow key={item.id} item={item} on={checked.has(item.id)} onToggle={() => onToggle(item.id)} />
        ))}
      </ul>
    </section>
  );
}

function ItemRow({ item, on, onToggle }: { item: CheckItem; on: boolean; onToggle: () => void }) {
  return (
    <li className={cx("transition", on && "bg-emerald-50/40 dark:bg-emerald-500/[0.05]")}>
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={onToggle}
          role="checkbox"
          aria-checked={on}
          aria-label={`Mark ${item.id} as checked`}
          className={cx(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition",
            on
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-ink-300 bg-surface text-transparent hover:border-brand-400"
          )}
        >
          <Check size={13} strokeWidth={3} />
        </button>

        <div className="min-w-0 flex-1">
          <button onClick={onToggle} className="block w-full text-left">
            <span className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-600">
                {item.id}
              </span>
              <span className="font-mono text-[11px] text-ink-400">{item.ref}</span>
            </span>
            <span
              className={cx(
                "block text-[14px] font-semibold leading-snug transition",
                on ? "text-ink-400 line-through" : "text-ink-800"
              )}
            >
              {item.q}
            </span>
          </button>
          {item.f && (
            <p
              className={cx(
                "mt-2 border-l-2 border-ink-200 pl-3 text-[12.5px] leading-relaxed transition",
                on ? "text-ink-400" : "text-ink-500"
              )}
            >
              {item.f}
            </p>
          )}
          <Crosslinks links={item.links} className="mt-3" />
        </div>
      </div>
    </li>
  );
}
