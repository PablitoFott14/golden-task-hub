import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { faq, faqTopics } from "../data/faq";
import { Crosslinks, Reveal } from "../components/ui";
import { cx } from "../lib/util";

export default function Faq() {
  const { hash } = useLocation();
  const [topic, setTopic] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(
    hash ? decodeURIComponent(hash.slice(1)) : faq[0].id
  );

  const shown = topic === "All" ? faq : faq.filter((f) => f.topic === topic);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative py-14">
          <span className="chip bg-violet-500/12 text-violet-700 ring-1 ring-violet-500/25 dark:text-violet-300">
            <HelpCircle size={11} /> Common questions
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-[34px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[44px]">
            The questions everyone asks in their first week
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">
            Short answers, each one linked back into the method, the Golden Task or the checks that
            depend on it. If a question here changes how you would build something, follow the link
            rather than taking the summary alone.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {faqTopics.map((tp) => {
              const n = tp === "All" ? faq.length : faq.filter((f) => f.topic === tp).length;
              if (n === 0) return null;
              return (
                <button
                  key={tp}
                  onClick={() => setTopic(tp)}
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition",
                    topic === tp
                      ? "border-brand-400 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                      : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300"
                  )}
                >
                  {tp}
                  <span className="font-mono text-[11px] text-ink-400">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="wrap py-12">
        <ul className="mx-auto max-w-3xl space-y-3">
          {shown.map((f) => {
            const isOpen = open === f.id;
            return (
              <Reveal key={f.id}>
                <li
                  id={f.id}
                  className={cx(
                    "scroll-mt-24 overflow-hidden rounded-2xl border bg-surface transition duration-200",
                    isOpen ? "border-brand-300 shadow-soft" : "border-ink-200/70"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-3.5 p-5 text-left"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-mono text-[11px] font-bold text-brand-700 dark:text-brand-300">
                      {f.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[16px] font-bold leading-snug text-ink-900">
                        {f.q}
                      </span>
                      <span className="mono-label mt-1.5 block text-ink-400">{f.topic}</span>
                    </span>
                    <ChevronDown
                      size={17}
                      className={cx(
                        "mt-1 shrink-0 text-ink-400 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-ink-200/70 px-5 pb-5 pt-4 sm:pl-[62px]">
                          {f.a.map((p, i) => (
                            <p
                              key={i}
                              className="mb-3 text-[14px] leading-relaxed text-ink-700 last:mb-0"
                            >
                              {p}
                            </p>
                          ))}
                          <Crosslinks links={f.links} className="mt-4" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-ink-200/70 bg-raised p-6">
          <h2 className="font-display text-[17px] font-bold text-ink-900">
            Nothing here answers it?
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">
            The guidelines stay the source of truth for anything this page does not cover. For how a
            decision plays out in practice, the worked task is usually faster than reading the
            section again.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/golden-tasks/vendor-closeout" className="btn-primary">
              Open the Golden Task <ArrowRight size={15} />
            </Link>
            <Link to="/checklist" className="btn-ghost">
              Run the pre-submit gate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
