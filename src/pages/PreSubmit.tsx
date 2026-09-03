import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ClipboardList,
  Download,
  Eye,
  EyeOff,
  FileText,
  Gauge,
  Image as ImageIcon,
  Layers,
  RotateCcw,
  ScrollText,
  Send,
  Wand2,
} from "lucide-react";
import { checklist, checklistMeta } from "../data/checklist";
import type { Check as CheckItem, ChecklistSection } from "../data/types";
import { Crosslinks } from "../components/ui";
import { useScrollSpy } from "../lib/useScrollSpy";
import { asset, cx } from "../lib/util";

const CHECKS_KEY = "rsh.presubmit.checks.v1";
const DETAIL_KEY = "rsh.presubmit.detail.v1";

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
  /** Guidance and cross-links are off by default, so the gate stays scannable. */
  const [detail, setDetail] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DETAIL_KEY) === "1";
    } catch {
      return false;
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

  useEffect(() => {
    try {
      localStorage.setItem(DETAIL_KEY, detail ? "1" : "0");
    } catch {
      /* private window */
    }
  }, [detail]);

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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="mono-label mb-1 text-brand-600 dark:text-brand-300">Pre-Submit Gate</div>
          <h1 className="font-display text-[26px] font-bold tracking-tight text-ink-900">
            One last pass before you submit
          </h1>
          <p className="mt-1 text-[13.5px] text-ink-500">
            {checklistMeta.subtitle} <span className="text-ink-400">{checklistMeta.estimate}</span>
          </p>
        </div>
        <a
          href={asset(checklistMeta.pdf)}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost shrink-0 px-3 py-2 text-[13px]"
        >
          <Download size={14} /> Printable PDF
        </a>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/70 bg-amber-50/60 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-700 dark:border-amber-500/30 dark:bg-amber-500/10">
        <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300" />
        <span>
          <strong className="font-semibold text-ink-900">
            {checklistMeta.warning.split(". ")[0]}.
          </strong>{" "}
          {checklistMeta.warning.split(". ").slice(1).join(". ")} {checklistMeta.banner}
        </span>
      </p>

      <div className="mt-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-7">
        {/* Sidebar: progress, density, jump nav */}
        <aside className="mb-5 lg:mb-0 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-3.5">
            <div className="flex items-center justify-between">
              <span className="mono-label text-ink-400">Progress</span>
              <span className="font-mono text-[13px] font-extrabold text-ink-900">
                {done}/{total}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-200/70">
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

            <div className="mt-3 flex gap-1.5">
              <button onClick={submit} className="btn-primary flex-1 px-2.5 py-1.5 text-[13px]">
                <Send size={14} /> Submit &amp; reset
              </button>
              {done > 0 && (
                <button
                  onClick={() => setChecked(new Set())}
                  className="btn-ghost px-2 py-1.5"
                  title="Clear all checks"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setDetail((d) => !d)}
              aria-pressed={detail}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-ink-200 px-2.5 py-1.5 text-[12.5px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
            >
              {detail ? <EyeOff size={13} /> : <Eye size={13} />}
              {detail ? "Hide guidance" : "Show guidance"}
            </button>
          </div>

          <nav className="mt-2.5 flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
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
                    "group flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-semibold transition lg:w-full",
                    on
                      ? "bg-brand-500/10 text-brand-700 dark:text-brand-300"
                      : "text-ink-600 hover:bg-ink-100"
                  )}
                >
                  <Icon
                    size={14}
                    className={cx(
                      "shrink-0",
                      on ? "text-brand-600 dark:text-brand-300" : "text-ink-400"
                    )}
                  />
                  <span className="flex-1 whitespace-nowrap lg:whitespace-normal">{s.title}</span>
                  <span
                    className={cx(
                      "ml-auto hidden items-center rounded-full px-1.5 font-mono text-[10.5px] font-bold lg:inline-flex",
                      complete
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                        : "bg-ink-100 text-ink-500"
                    )}
                  >
                    {complete ? <Check size={10} /> : `${sectionDone}/${s.checks.length}`}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-3">
          {checklist.map((s) => (
            <SectionBlock
              key={s.id}
              section={s}
              checked={checked}
              detail={detail}
              onToggle={toggle}
              onSetMany={setMany}
            />
          ))}

          <div
            className={cx(
              "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[12.5px] leading-relaxed transition",
              allDone
                ? "border-emerald-400 bg-emerald-50/60 text-ink-700 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                : "border-amber-300/70 bg-amber-50/60 text-ink-700 dark:border-amber-500/30 dark:bg-amber-500/10"
            )}
          >
            {allDone ? (
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle
                size={15}
                className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300"
              />
            )}
            <span>
              <strong className="font-semibold text-ink-900">
                {allDone ? checklistMeta.ready.title : checklistMeta.fix.title}.
              </strong>{" "}
              {allDone ? checklistMeta.ready.body : checklistMeta.fix.body}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  checked,
  detail,
  onToggle,
  onSetMany,
}: {
  section: ChecklistSection;
  checked: Set<string>;
  detail: boolean;
  onToggle: (id: string) => void;
  onSetMany: (ids: string[], value: boolean) => void;
}) {
  const Icon = sectionIcon[section.id] ?? FileText;
  const doneCount = section.checks.filter((i) => checked.has(i.id)).length;
  const complete = doneCount === section.checks.length;
  const itemIds = section.checks.map((i) => i.id);

  return (
    <section id={section.id} className="card scroll-mt-20 overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-ink-200/70 bg-raised px-4 py-2.5">
        <span
          className={cx(
            "grid h-7 w-7 shrink-0 place-items-center rounded-lg transition",
            complete
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
              : "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
          )}
        >
          {complete ? <Check size={15} /> : <Icon size={15} />}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-[15px] font-bold tracking-tight text-ink-900">
            {section.n}. {section.title}
          </h2>
          <p className="truncate text-[12px] text-ink-500">{section.prompt}</p>
        </div>
        <span
          className={cx(
            "shrink-0 rounded-full px-2 py-0.5 font-mono text-[11px] font-bold",
            complete
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
              : "bg-ink-100 text-ink-500"
          )}
        >
          {doneCount}/{section.checks.length}
        </span>
        <button
          onClick={() => onSetMany(itemIds, !complete)}
          className="shrink-0 rounded-lg border border-ink-200 px-2 py-1 text-[11.5px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
        >
          {complete ? "Uncheck all" : "Check all"}
        </button>
      </div>

      <ul className="divide-y divide-ink-200/60">
        {section.checks.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            on={checked.has(item.id)}
            detail={detail}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </ul>
    </section>
  );
}

function ItemRow({
  item,
  on,
  detail,
  onToggle,
}: {
  item: CheckItem;
  on: boolean;
  detail: boolean;
  onToggle: () => void;
}) {
  return (
    <li className={cx("transition", on && "bg-emerald-50/40 dark:bg-emerald-500/[0.05]")}>
      <div className="flex items-start gap-2.5 px-3 py-2">
        <button
          onClick={onToggle}
          role="checkbox"
          aria-checked={on}
          aria-label={`Mark ${item.id} as checked`}
          className={cx(
            "mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded border-2 transition",
            on
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-ink-300 bg-surface text-transparent hover:border-brand-400"
          )}
        >
          <Check size={12} strokeWidth={3} />
        </button>

        <div className="min-w-0 flex-1">
          <button onClick={onToggle} className="block w-full text-left text-[13.5px] leading-snug">
            <span className="mr-1.5 font-mono text-[11px] font-bold text-ink-400">{item.id}</span>
            <span
              className={cx(
                "font-medium transition",
                on ? "text-ink-400 line-through" : "text-ink-800"
              )}
            >
              {item.q}
            </span>
          </button>

          {detail && (
            <div className="mt-1.5">
              {item.f && (
                <p className="border-l-2 border-ink-200 pl-2.5 text-[12px] leading-relaxed text-ink-500">
                  {item.f}
                </p>
              )}
              <Crosslinks links={item.links} className="mt-2" />
            </div>
          )}
        </div>

        <span className="mt-0.5 hidden shrink-0 font-mono text-[10.5px] text-ink-400 sm:block">
          {item.ref}
        </span>
      </div>
    </li>
  );
}
