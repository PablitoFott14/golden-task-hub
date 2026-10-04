import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, GraduationCap, HelpCircle, ShieldAlert } from "lucide-react";
import Onboarding from "./Onboarding";
import PreSubmit from "./PreSubmit";
import WhatsNew from "./WhatsNew";
import Faq from "./Faq";
import { onboardingItems } from "../data/onboarding";
import { checkCount, checklist } from "../data/checklist";
import { guidelineChanges } from "../data/changes";
import { faq } from "../data/faq";
import { cx } from "../lib/util";

/**
 * Reference: the four things a contributor looks something up in, rather than
 * works from.
 *
 * Onboarding, what moved from Red Shell and the questions everyone asks were
 * three top-level tabs competing with the method and the spec, which are the
 * pages someone is actually in while building. The pre-submit gate joined them:
 * it is a tool you run once per task and a list you consult, not a standard to
 * read against, and giving it a tab of its own pushed the spec doc out of the
 * one place people look for the spec.
 *
 * **One pane at a time, picked by a bar across the top rather than a side
 * rail.** The spec's rail is vertical because it has eleven entries; this has
 * four, and three of these panes carry a rail of their own. A second vertical
 * rail beside those would be the layering this structure exists to remove.
 *
 * The panes are the original pages, rendered with `embedded` so they drop their
 * own hero and the page keeps one h1. Nothing inside them changed: the gate
 * keeps its progress bar, its persisted ticks and its section rail; the FAQ
 * keeps its search, its topic filter and its question rail; Must Read keeps
 * its change rail and the taxonomy accordion.
 *
 * The guidelines pane is labelled `Must Read: Project Updates` rather than
 * `What is new`, because a contributor who skips it fails a task. Its anchor is
 * still `whats-new`, so nothing that links to it had to move.
 */

const PANES = [
  {
    id: "onboarding",
    label: "Onboarding",
    icon: GraduationCap,
    count: onboardingItems.length,
    blurb: "Start here on your first day.",
  },
  {
    id: "pre-submit",
    label: "Pre-Submit",
    icon: ClipboardCheck,
    count: checkCount(),
    blurb: "The gate to run once, before you hand a task in.",
  },
  {
    // The id stays `whats-new`: it is the anchor every existing link and the
    // `/whats-new` redirect target, and renaming the label is a copy change.
    id: "whats-new",
    label: "Must Read: Project Updates",
    icon: ShieldAlert,
    count: guidelineChanges.length,
    blurb: "Every guidelines rule that changed. Read these before your next task.",
  },
  {
    id: "faq",
    label: "FAQ",
    icon: HelpCircle,
    count: faq.length,
    blurb: "The questions everyone asks in their first week.",
  },
] as const;

const PANE_IDS: Set<string> = new Set(PANES.map((p) => p.id));

/**
 * Which pane holds a given anchor, so every inbound link that used to target
 * the old `/onboarding`, `/checklist#s3`, `/whats-new#<change>` and
 * `/faq#<question>` routes still lands on the right content. Built from the
 * data, so a new check, change or question is covered without touching this
 * file.
 */
const paneHome: Record<string, string> = {
  ...Object.fromEntries(onboardingItems.map((o) => [o.id, "onboarding"])),
  ...Object.fromEntries(checklist.map((s) => [s.id, "pre-submit"])),
  ...Object.fromEntries(guidelineChanges.map((c) => [c.id, "whats-new"])),
  // The taxonomy accordion is rendered inside one of the change entries.
  taxonomy: "whats-new",
  ...Object.fromEntries(faq.map((f) => [f.id, "faq"])),
};

export default function Reference() {
  const { hash, key } = useLocation();
  const [active, setActive] = useState<string>(PANES[0].id);

  /* `key` is in the deps, not just `hash`: the bar moves the pane without
     touching the URL, so after a click the hash can name something off screen
     and a link targeting it would not re-run the effect on `[hash]` alone.
     Same reason the spec doc watches it. */
  useEffect(() => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;
    if (PANE_IDS.has(id)) setActive(id);
    else if (paneHome[id]) setActive(paneHome[id]);
  }, [hash, key]);

  const current = PANES.find((p) => p.id === active) ?? PANES[0];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative pb-5 pt-10">
          <div className="mono-label text-brand-600 dark:text-brand-300">Reference</div>
          <h1 className="mt-2 font-display text-[30px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[34px]">
            Look it up, then get back to the task
          </h1>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-600">
            {current.blurb}
          </p>

          <div
            role="tablist"
            aria-label="Reference sections"
            className="-mx-1 mt-5 flex gap-1.5 overflow-x-auto px-1 pb-1"
          >
            {PANES.map((p) => {
              const on = p.id === active;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(p.id)}
                  className={cx(
                    "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-[13.5px] font-semibold transition",
                    on
                      ? "border-brand-500 bg-brand-600 text-white shadow-glow"
                      : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300 hover:text-ink-900"
                  )}
                >
                  <p.icon size={15} />
                  {p.label}
                  <span
                    className={cx(
                      "rounded px-1.5 py-0.5 font-mono text-[10.5px]",
                      on ? "bg-white/20 text-white" : "bg-ink-100 text-ink-500"
                    )}
                  >
                    {p.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {active === "onboarding" && <Onboarding embedded />}
        {active === "pre-submit" && <PreSubmit embedded />}
        {active === "whats-new" && <WhatsNew embedded />}
        {active === "faq" && <Faq embedded />}
      </motion.div>
    </div>
  );
}
