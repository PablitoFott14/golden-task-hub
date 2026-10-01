import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookMarked, ChevronDown, MessageCircleQuestion } from "lucide-react";
import { faq } from "../data/faq";
import type { FaqItem } from "../data/types";
import { Crosslinks } from "./ui";
import { cx } from "../lib/util";

/** Rows shown before the reader asks for the rest. The list is the whole FAQ,
 *  so this is the only thing keeping the landing page short as questions are
 *  added. */
const PEEK = 5;

function Row({ f, open, onToggle }: { f: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-xl border transition duration-300",
        open
          ? "border-brand-300 bg-brand-50/50 shadow-soft dark:border-brand-500/40 dark:bg-brand-500/10"
          : "border-ink-200/70 bg-surface hover:border-brand-300"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="mono-label shrink-0 rounded bg-ink-100 px-1.5 py-1 text-ink-500">
          {f.topic}
        </span>
        <span className="min-w-0 flex-1 text-[13.5px] font-semibold leading-snug text-ink-900">
          {f.q}
        </span>
        <ChevronDown
          size={15}
          className={cx(
            "shrink-0 transition-transform duration-300",
            open ? "rotate-180 text-brand-500" : "text-ink-400"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-ink-200/70 px-4 py-4">
              {f.a.map((p, i) => (
                <p key={i} className="mb-2.5 text-[13.5px] leading-relaxed text-ink-700 last:mb-0">
                  {p}
                </p>
              ))}
              <Crosslinks links={f.links} className="mt-4" />
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-200/70 pt-3">
                <span className="mono-label flex items-center gap-1.5 text-ink-400">
                  <BookMarked size={12} aria-hidden />
                  Guidelines {f.refs.map((r) => r.section).join(" · ")}
                </span>
                <Link
                  to={`/faq#${f.id}`}
                  className="group ml-auto inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 dark:text-brand-300"
                >
                  Open it in the FAQ
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * The FAQ, surfaced on the landing page. It reads the same `faq` data the
 * `/faq` page renders, so a new question appears here the moment it is added
 * and nothing has to be written twice. One row is open at a time and the list
 * is capped at PEEK, which is what keeps the section from growing into the
 * page it links to.
 */
export default function QuickAnswers() {
  const [open, setOpen] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  const shown = all ? faq : faq.slice(0, PEEK);
  const rest = faq.length - PEEK;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.55fr] lg:gap-12">
      <div className="lg:self-start">
        <span className="chip bg-violet-500/12 text-violet-700 ring-1 ring-violet-500/25 dark:text-violet-300">
          <MessageCircleQuestion size={12} /> Quick answers
        </span>
        <h2 className="mt-4 font-display text-[26px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[30px]">
          The questions the method raises, answered right here
        </h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">
          MEMORY.md, inputs.zip against the inputs folder, how milestones split, what Model B
          actually does. Open one and read it without leaving the page.
        </p>
        <Link to="/faq" className="btn-primary mt-6">
          All {faq.length} questions <ArrowRight size={15} />
        </Link>
        <p className="mt-4 text-[12px] leading-relaxed text-ink-400">
          Every answer names the guidelines section it comes from.
        </p>
      </div>

      <div className="min-w-0 space-y-2.5">
        {shown.map((f) => (
          <Row key={f.id} f={f} open={open === f.id} onToggle={() => setOpen(open === f.id ? null : f.id)} />
        ))}

        {rest > 0 && (
          <button
            onClick={() => setAll((v) => !v)}
            aria-expanded={all}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink-300 px-4 py-2.5 text-[12.5px] font-semibold text-ink-500 transition hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-300"
          >
            {all ? "Show fewer" : `${rest} more question${rest === 1 ? "" : "s"}`}
            <ChevronDown
              size={14}
              className={cx("transition-transform duration-300", all && "rotate-180")}
              aria-hidden
            />
          </button>
        )}
      </div>
    </div>
  );
}
