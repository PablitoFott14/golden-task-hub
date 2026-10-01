import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Crosshair, Layers } from "lucide-react";
import { taxonomy, subcategoryCount, useCaseCount } from "../data/taxonomy";
import { Eyebrow } from "./ui";
import { cx } from "../lib/util";

/**
 * The use case taxonomy, 11 use cases and 68 subcategories.
 *
 * Everything is collapsed by default and one use case opens at a time. Opened
 * flat this block is several thousand words, which is the whole reason for the
 * disclosure: a contributor comes here to read the one pair they were assigned,
 * never the other sixty seven.
 *
 * The scope check is shown only when a use case is open, because it is the
 * thing that settles a wrong assignment and it reads as noise in a closed row.
 * Each subcategory carries the standard's own definition and then three
 * scenarios, which is what turns a label into something you can design against.
 */
export default function Taxonomy() {
  const [open, setOpen] = useState<string | null>(null);

  /* The anchor lives on the component rather than on whatever wraps it, so
     `#taxonomy` keeps working wherever the block is rendered. */
  return (
    <div id="taxonomy" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow className="text-violet-600 dark:text-violet-300">
            Use case taxonomy
          </Eyebrow>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-[28px]">
            The pair you are assigned, and what it looks like as a task
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            {useCaseCount()} use cases and {subcategoryCount()} subcategories replace the old 6 and
            16. Open yours, read the definition and the scope check, then check your scenario
            against the examples. They show the shape of a correct fit, never a menu to choose from.
          </p>
        </div>
        <span className="chip shrink-0 bg-ink-100 text-ink-600 ring-1 ring-ink-200">
          Assigned, not chosen
        </span>
      </div>

      <div className="mt-8 grid gap-2.5">
        {taxonomy.map((g) => {
          const isOpen = open === g.id;
          return (
            <div key={g.id} className={cx("card overflow-hidden", isOpen && "ring-1 ring-brand-500/25")}>
              <button
                onClick={() => setOpen(isOpen ? null : g.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-raised"
              >
                <Layers
                  size={14}
                  className={cx(
                    "shrink-0 transition",
                    isOpen ? "text-brand-600 dark:text-brand-300" : "text-ink-400"
                  )}
                />
                <span className="font-display text-[15px] font-bold tracking-tight text-ink-900">
                  {g.l1}
                </span>
                <span className="mono-label text-ink-400">
                  {g.subs.length} subcategories
                </span>
                <ChevronDown
                  size={15}
                  className={cx(
                    "ml-auto shrink-0 text-ink-400 transition-transform duration-200",
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
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-ink-200/70 px-5 pb-5 pt-4">
                      <p className="mb-4 flex items-start gap-2 rounded-xl bg-raised p-3 text-[12.5px] leading-relaxed text-ink-600">
                        <Crosshair
                          size={13}
                          className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-300"
                        />
                        <span>
                          <span className="mono-label mr-1.5 text-violet-700 dark:text-violet-300">
                            Scope check
                          </span>
                          {g.scope}
                        </span>
                      </p>

                      <div className="grid gap-3 lg:grid-cols-2">
                        {g.subs.map((s) => (
                          <div
                            key={s.id}
                            className="rounded-xl border border-ink-200/70 bg-surface p-4"
                          >
                            <h3 className="font-display text-[13.5px] font-bold leading-snug tracking-tight text-ink-900">
                              {s.name}
                            </h3>
                            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">
                              {s.covers}
                            </p>
                            <ul className="mt-3 space-y-1.5 border-t border-ink-200/70 pt-3">
                              {s.scenarios.map((sc, i) => (
                                <li
                                  key={i}
                                  className="flex gap-2 text-[12px] leading-relaxed text-ink-700"
                                >
                                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-500/60" />
                                  <span>{sc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
