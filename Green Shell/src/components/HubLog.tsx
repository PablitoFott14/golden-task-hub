import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Megaphone } from "lucide-react";
import { hubUpdates, type HubUpdateKind } from "../data/hubLog";
import { cx } from "../lib/util";

/**
 * The project update notice, directly under the nav on the landing page.
 *
 * It sits above the hero rather than below it because the hero is around 800px
 * tall: anything under it is below the fold on a laptop and two screens down on
 * a phone, which is no use for something a contributor has to see on the way
 * in. Here it is the first thing on the page and costs one row of height.
 *
 * **Collapsed it shows only the newest entry.** That is what keeps it a notice
 * rather than a section. The chevron opens the rest; the headline itself is a
 * link to the thing it announces, which is why the row is a Link and a button
 * side by side rather than one nested in the other.
 *
 * **Rose, like every other must-read signal in the hub** — the Must Read pane,
 * the hero button, the palette chip. Amber marks an onboarding entry inside it,
 * which is the one kind here that is not urgent.
 *
 * It is deliberately not dismissible and not persisted. A contributor who hid
 * it once would stop seeing guidelines changes for good, and that is the one
 * thing this exists to prevent.
 */

const kindTone: Record<HubUpdateKind, { chip: string; label: string }> = {
  guidelines: {
    chip: "bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-200",
    label: "Guidelines",
  },
  onboarding: {
    chip: "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-200",
    label: "Onboarding",
  },
};

export default function HubLog() {
  const [open, setOpen] = useState(false);
  const latest = hubUpdates[0];
  const tone = kindTone[latest.kind];

  return (
    <section
      id="updates"
      className="scroll-mt-16 border-b border-rose-200/80 bg-rose-50/90 dark:border-rose-500/25 dark:bg-rose-500/[0.09]"
    >
      <div className="wrap">
        <div className="flex items-center gap-2 py-2">
          <Link
            to={latest.to}
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1 py-1 transition hover:bg-rose-500/10 sm:gap-3"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-rose-600 text-white shadow-soft">
              <Megaphone size={14} />
            </span>
            <span className={cx("chip hidden shrink-0 sm:inline-flex", tone.chip)}>
              {tone.label}
            </span>
            <span className="shrink-0 font-mono text-[11.5px] font-bold text-rose-700 dark:text-rose-300">
              {latest.date}
            </span>
            <span className="truncate text-[13px] font-bold text-ink-900">{latest.what}</span>
            <ArrowRight
              size={13}
              aria-hidden
              className="hidden shrink-0 text-rose-600 transition-transform group-hover:translate-x-0.5 dark:text-rose-300 sm:block"
            />
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="update-list"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12px] font-semibold text-rose-700 transition hover:bg-rose-500/15 dark:text-rose-300"
          >
            {/* The label stays visible at every width. Hiding it on a phone
                left the button with no accessible name, because `hidden` is
                display:none and drops it out of the a11y tree. */}
            <span>
              {open ? (
                "Hide"
              ) : (
                <>
                  All {hubUpdates.length}
                  <span className="hidden sm:inline">&nbsp;updates</span>
                </>
              )}
            </span>
            <ChevronDown
              size={15}
              aria-hidden
              className={cx("transition-transform duration-200", open && "rotate-180")}
            />
          </button>
        </div>

        {open && (
          <ol id="update-list" className="space-y-2 pb-3">
            {hubUpdates.map((u) => {
              const t = kindTone[u.kind];
              return (
                <li key={u.id}>
                  <Link
                    to={u.to}
                    className="card card-hover group flex flex-col gap-1.5 p-3.5 sm:flex-row sm:items-start sm:gap-4"
                  >
                    <span className="flex shrink-0 flex-wrap items-center gap-2 sm:w-[132px] sm:flex-col sm:items-start sm:gap-1.5">
                      <span className="font-mono text-[11.5px] font-bold text-ink-600">
                        {u.date}
                      </span>
                      <span className={cx("chip", t.chip)}>{t.label}</span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-bold leading-snug text-ink-900">
                        {u.what}
                      </span>
                      <span className="mono-label mt-1 block text-rose-600 dark:text-rose-300">
                        {u.where}
                      </span>
                      {u.why && (
                        <span className="mt-1.5 block text-[12.5px] leading-relaxed text-ink-500">
                          {u.why}
                        </span>
                      )}
                    </span>

                    <ArrowRight
                      size={15}
                      aria-hidden
                      className="hidden shrink-0 self-center text-ink-400 transition-transform group-hover:translate-x-0.5 sm:block"
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
