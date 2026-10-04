import { Link } from "react-router-dom";
import { ArrowRight, History } from "lucide-react";
import { hubUpdatedOn, hubUpdates, type HubUpdateKind } from "../data/hubLog";
import { Reveal } from "./ui";
import { cx } from "../lib/util";

/**
 * The hub's own update log, directly under the hero on the landing page.
 *
 * It answers one question — what moved since I was last here — and it has to
 * answer it without being opened, so it is a flat list rather than a drawer or
 * a tab. Five entries is deliberate: a log you scroll is a log nobody reads.
 *
 * **Every row is a link to the thing it describes.** That is the whole point of
 * it. A changelog that tells you something moved without taking you there just
 * sends you looking.
 *
 * It does not duplicate the other two logs. The rubric's revision history lives
 * in the Spec Doc and the guidelines changes live in Must Read; this links to
 * both and restates neither.
 */

const kindTone: Record<HubUpdateKind, { chip: string; label: string }> = {
  // Rose, like every other must-read signal in the hub.
  guidelines: {
    chip: "bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300",
    label: "Guidelines",
  },
  added: {
    chip: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300",
    label: "New",
  },
  moved: {
    chip: "bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/25 dark:text-sky-300",
    label: "Moved",
  },
};

export default function HubLog() {
  return (
    <Reveal>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-glow">
          <History size={17} />
        </span>
        <h2 className="font-display text-[19px] font-bold tracking-tight text-ink-900">
          Hub update log
        </h2>
        <span className="rounded-md bg-brand-600 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
          {hubUpdatedOn}
        </span>
        <span className="mono-label text-ink-400">Newest first</span>
      </div>

      <ol className="mt-4 space-y-2">
        {hubUpdates.map((u) => {
          const tone = kindTone[u.kind];
          return (
            <li key={u.id}>
              <Link
                to={u.to}
                className="card card-hover group flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:gap-4"
              >
                {/* Date and kind sit in a fixed column on a wide screen so five
                    rows of dates line up and the list scans vertically. */}
                <span className="flex shrink-0 flex-wrap items-center gap-2 sm:w-[136px] sm:flex-col sm:items-start sm:gap-1.5">
                  <span className="font-mono text-[11.5px] font-semibold text-ink-500">
                    {u.date}
                  </span>
                  <span className={cx("chip", tone.chip)}>{tone.label}</span>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-bold leading-snug text-ink-900">
                    {u.what}
                  </span>
                  <span className="mono-label mt-1 block text-brand-600 dark:text-brand-300">
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

      {/* The two logs this one is not. Both are a click away rather than
          restated here, which is what keeps this list to five rows. */}
      <p className="mt-4 text-[12.5px] leading-relaxed text-ink-500">
        Looking for the rubric&rsquo;s own revision history?{" "}
        <Link
          to="/spec#log"
          className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700 dark:text-brand-300"
        >
          The Spec Doc change log
        </Link>{" "}
        records which dimension moved between exports.
      </p>
    </Reveal>
  );
}
