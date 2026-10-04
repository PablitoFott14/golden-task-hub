import { ArrowUpRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import type { OnboardingItem } from "../data/types";
import { onboardingItems } from "../data/onboarding";
import { Eyebrow, Reveal } from "../components/ui";
import { asset, cx } from "../lib/util";

/**
 * Onboarding materials.
 *
 * Two cards, deliberately large. Both onboardings are complete applications with
 * their own navigation, deployed from their own repositories, so the hub links
 * to them rather than embedding them: see the note in `data/onboarding.ts` for
 * why an iframe is the wrong answer for each of them.
 *
 * What the hub owes them is discovery. The card carries the deck's real cover
 * slide, the real counts and what is actually inside, because a contributor
 * decides whether to spend twenty minutes on one from the card, not from the
 * link.
 */

const tones = {
  brand: {
    ring: "hover:ring-brand-500/30",
    chip: "bg-brand-500/12 text-brand-700 ring-1 ring-brand-500/25 dark:text-brand-300",
    btn: "btn-primary",
    icon: "text-brand-600 dark:text-brand-300",
  },
  rose: {
    ring: "hover:ring-rose-500/30",
    chip: "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300",
    btn: "btn bg-rose-600 text-white hover:bg-rose-700",
    icon: "text-rose-600 dark:text-rose-300",
  },
} as const;

function OnboardingCard({ c }: { c: OnboardingItem }) {
  const t = tones[c.tone];
  return (
    <article
      className={cx(
        "card flex h-full flex-col overflow-hidden ring-1 ring-transparent transition duration-300",
        t.ring
      )}
    >
      {/* The deck's own first slide. It is the single thing that makes the card
          read as real material rather than a link with a label. */}
      <a
        href={c.url}
        target="_blank"
        rel="noreferrer"
        className="group relative block overflow-hidden border-b border-ink-200/70 bg-ink-100"
      >
        <img
          src={asset(c.cover)}
          alt={`${c.title} cover slide`}
          width={880}
          height={495}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
          Open <ArrowUpRight size={12} />
        </span>
      </a>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cx("chip", t.chip)}>
            <GraduationCap size={11} /> Onboarding {c.n}
          </span>
          {c.stats.map((s) => (
            <span key={s.v} className="mono-label text-ink-400">
              <span className="font-bold text-ink-700">{s.k}</span> {s.v}
            </span>
          ))}
        </div>

        <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink-900">
          {c.title}
        </h2>
        <p className={cx("mt-1 text-[13.5px] font-semibold", t.icon)}>{c.tagline}</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-500">{c.blurb}</p>

        <div className="mt-5 rounded-xl border border-ink-200/70 bg-raised p-4">
          <div className="mono-label mb-2 flex items-center gap-1.5 text-ink-400">
            <BookOpen size={12} /> What is inside
          </div>
          <ul className="space-y-1.5">
            {c.covers.map((x, i) => (
              <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-600">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={c.url}
          target="_blank"
          rel="noreferrer"
          className={cx("mt-5 self-start", t.btn)}
        >
          {c.cta} <ArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}

export default function Onboarding({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? "h2" : "h1";

  return (
    <div className={embedded ? "wrap pb-12 pt-2" : "wrap py-12"}>
      <Reveal>
        <div className="max-w-3xl">
          {!embedded && (
            <Eyebrow className="text-brand-600 dark:text-brand-300">Onboarding materials</Eyebrow>
          )}
          <Heading className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-[40px]">
            Two onboardings, before your first task
          </Heading>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
            The intro is the project end to end. Common Errors is what actually goes wrong,
            taken from real audited tasks. Each one opens in its own tab and keeps its own
            navigation, so nothing here gets in the way of them.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {onboardingItems.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06} className="h-full">
            <OnboardingCard c={c} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 flex items-start gap-2.5 rounded-2xl border border-ink-200/70 bg-raised p-4 text-[13px] leading-relaxed text-ink-500">
          <Sparkles size={14} className="mt-0.5 shrink-0 text-gold-600 dark:text-gold-400" />
          <span>
            Both were written for the multi-turn project and still teach it. The rules that
            moved under Green Shell are on the What is new tab, and that is the one to read second.
          </span>
        </p>
      </Reveal>
    </div>
  );
}
