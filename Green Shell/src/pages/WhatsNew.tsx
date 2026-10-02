import {
  ArrowRight,
  BookMarked,
  CircleAlert,
  CornerDownRight,
  Sparkles,
} from "lucide-react";
import type { GuidelineChange } from "../data/types";
import { guidelineChanges, guidelinesVersion } from "../data/changes";
import { Crosslinks, Eyebrow, Reveal } from "../components/ui";
import Taxonomy from "../components/Taxonomy";
import { useScrollSpy } from "../lib/useScrollSpy";
import { useRailFollow, useStickyFit } from "../lib/useStickyFit";
import { cx } from "../lib/util";

/**
 * What changed between Red Shell and Green Shell.
 *
 * This used to be a band under the hero, and six cards was the cap on it. The
 * change set outgrew that: a rule like 80/20 cannot be taught in a card, and
 * the taxonomy needs 68 subcategories beside it. So it is a page, with a rail,
 * and every entry carries the sections of the guidelines it came from rather
 * than asking the reader to take the hub's word for the rule.
 *
 * `before` is what makes it a comparison rather than an announcement. Most
 * readers arrive with the Red Shell rule in their head, so the entry names the
 * thing being replaced before it states the replacement.
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

function ChangeEntry({ c }: { c: GuidelineChange }) {
  const tone = impactTone[c.impact];
  return (
    <article id={c.id} className="card scroll-mt-24 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className={cx("chip", tone.chip)}>
          {c.impact === "hard" ? <CircleAlert size={11} /> : <Sparkles size={11} />}
          {tone.label}
        </span>
        <span className="mono-label ml-auto text-ink-400">
          {c.date} · {c.version}
        </span>
      </div>

      <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink-900 sm:text-2xl">
        {c.title}
      </h2>

      {/* Named before the replacement, because the reader is holding the old
          rule and will keep applying it until it is contradicted by name. */}
      {c.before && (
        <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-ink-200/70 bg-raised p-3.5 text-[13px] leading-relaxed text-ink-500">
          <CornerDownRight size={14} className="mt-0.5 shrink-0 text-ink-400" />
          <span>
            <span className="mono-label mr-1.5 text-ink-400">In Red Shell</span>
            {c.before}
          </span>
        </p>
      )}

      <p className="mt-4 text-[14.5px] leading-relaxed text-ink-600">{c.body}</p>

      <div className="mt-5 rounded-xl border border-ink-200/70 bg-raised p-4">
        <div className="mono-label mb-1.5 flex items-center gap-1.5 text-brand-600 dark:text-brand-300">
          <ArrowRight size={12} /> What you do now
        </div>
        <p className="text-[13.5px] leading-relaxed text-ink-700">{c.does}</p>
      </div>

      {c.detail && (
        <div className="mt-5">
          <div className="mono-label mb-2 text-ink-400">{c.detail.label}</div>
          <ul className="space-y-2">
            {c.detail.items.map((d, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-600">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-500/60" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Where the guidelines carry it. Every section the rule touches, so the
          reader can open the document at the right place and check us. */}
      <div className="mt-6 border-t border-ink-200/70 pt-4">
        <div className="mono-label mb-2 flex items-center gap-1.5 text-ink-400">
          <BookMarked size={12} /> In the guidelines
        </div>
        <div className="flex flex-wrap gap-1.5">
          {c.refs.map((r) => (
            <span
              key={`${r.section}-${r.title}`}
              className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200"
            >
              <span className="font-mono font-bold">{r.section}</span>
              <span className="text-ink-400">·</span>
              {r.title}
            </span>
          ))}
        </div>
      </div>

      <Crosslinks links={c.links} className="mt-4" />

      {c.embed === "taxonomy" && (
        <div className="mt-8 border-t border-ink-200/70 pt-7">
          <Taxonomy />
        </div>
      )}
    </article>
  );
}

export default function WhatsNew() {
  const ids = guidelineChanges.map((c) => c.id);
  const active = useScrollSpy(ids);
  const { ref: railRef, maxHeight } = useStickyFit<HTMLElement>(28);
  useRailFollow(railRef, active);

  const hard = guidelineChanges.filter((c) => c.impact === "hard").length;

  return (
    <div className="wrap py-12">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow className="text-rose-600 dark:text-rose-300">
            Red Shell to Green Shell
          </Eyebrow>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-[40px]">
            What is new in Green Shell
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
            Not the full version history. These are the {guidelineChanges.length} changes that move
            what a contributor actually does, {hard} of them a rule a task fails without. Each one
            names the Red Shell rule it replaces and the sections of the guidelines it came from.
            Search{" "}
            <span className="font-mono text-[14px] font-semibold text-ink-700">[NEW]</span> in the
            guidelines to find every tagged section.
          </p>
          <span className="chip mt-5 bg-ink-100 text-ink-600 ring-1 ring-ink-200">
            Guidelines {guidelinesVersion.version} · {guidelinesVersion.updated}
          </span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
        <aside
          ref={railRef}
          style={{ maxHeight }}
          className="hidden self-start overflow-y-auto lg:sticky lg:top-24 lg:block"
        >
          <div className="mono-label mb-3 text-ink-400">The changes</div>
          <ol className="space-y-1.5">
            {guidelineChanges.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  data-rail={c.id}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cx(
                    "flex gap-2.5 rounded-xl py-1.5 pl-2 pr-2.5 text-[12.5px] font-semibold leading-snug transition duration-200",
                    active === c.id
                      ? "bg-brand-500/10 text-brand-700 dark:text-brand-300"
                      : "text-ink-500 hover:bg-raised hover:text-ink-800"
                  )}
                >
                  <span className="font-mono text-ink-400">{i + 1}</span>
                  <span>{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="grid gap-5">
          {guidelineChanges.map((c, i) => (
            <Reveal key={c.id} delay={Math.min(i * 0.03, 0.15)}>
              <ChangeEntry c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
