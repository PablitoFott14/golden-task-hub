import { ArrowRight, CircleAlert, Sparkles } from "lucide-react";
import type { GuidelineChange } from "../data/types";
import { guidelineChanges, guidelinesVersion } from "../data/changes";
import { Crosslinks, Eyebrow, Reveal } from "./ui";
import { cx } from "../lib/util";

/**
 * The guideline changes that move something a contributor has to do.
 *
 * It is a band on the landing page, not a changelog page, so the height is the
 * constraint that shapes it. Every card carries its own date rather than
 * sitting under a date heading: grouping read well but cost a row per date and
 * left a half empty row wherever a date shipped one change. Three columns and a
 * date chip say the same thing in half the band.
 *
 * Everything renders open. The set in `changes.ts` is already filtered down to
 * what changes the work, and a change behind a disclosure is a change nobody
 * reads. That is also the cap: keep any addition inside a card, and keep the
 * set short enough that two rows is the whole thing.
 */

const impactTone: Record<GuidelineChange["impact"], { chip: string; label: string }> = {
  hard: {
    chip: "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300",
    label: "Hard rule",
  },
  shape: {
    chip: "bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/25 dark:text-sky-300",
    label: "Changes the shape",
  },
};

function ChangeCard({ c }: { c: GuidelineChange }) {
  const tone = impactTone[c.impact];
  return (
    <article className="card flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[12px] font-bold text-ink-900">{c.date}</span>
        <span className="chip bg-ink-100 text-ink-500 ring-1 ring-ink-200">{c.version}</span>
        <span className={cx("chip ml-auto", tone.chip)}>
          {c.impact === "hard" ? <CircleAlert size={11} /> : <Sparkles size={11} />}
          {tone.label}
        </span>
      </div>

      <h3 className="mt-3 font-display text-[15.5px] font-bold leading-snug tracking-tight text-ink-900">
        {c.title}
      </h3>
      <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-ink-500">{c.body}</p>

      <div className="mt-4 rounded-xl border border-ink-200/70 bg-raised p-3.5">
        <div className="mono-label mb-1.5 flex items-center gap-1.5 text-brand-600 dark:text-brand-300">
          <ArrowRight size={12} /> What you do now
        </div>
        <p className="text-[12.5px] leading-relaxed text-ink-700">{c.does}</p>
      </div>

      <div className="mono-label mt-3.5 text-ink-400">
        {c.ref.section} · {c.ref.title}
      </div>
      <Crosslinks links={c.links} className="mt-2.5" />
    </article>
  );
}

export default function LatestChanges() {
  const hard = guidelineChanges.filter((c) => c.impact === "hard").length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow className="text-rose-600 dark:text-rose-300">Latest important changes</Eyebrow>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-[28px]">
            What moved in the guidelines, and what it makes you do
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Not the full version history. These are the {guidelineChanges.length} entries that
            change how a task is built or reviewed, {hard} of them a rule a task fails without.
            Newest first.
          </p>
        </div>
        <span className="chip shrink-0 bg-ink-100 text-ink-600 ring-1 ring-ink-200">
          Guidelines {guidelinesVersion.version} · {guidelinesVersion.updated}
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guidelineChanges.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i * 0.04, 0.2)} className="h-full">
            <ChangeCard c={c} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
