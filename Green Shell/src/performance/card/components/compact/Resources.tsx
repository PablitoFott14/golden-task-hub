import { ArrowUpRight } from "lucide-react";
import type { Bundle, Ref } from "../../types";
import { Rank } from "./Issues";

/** At most this many Golden Task Hub pages per area: the card's own order puts the most useful first. */
const PER_ISSUE = 2;

interface Page {
  ref: Ref;
  /** How the page helps, with the areas each line is for: the card's own line, else the catalog's. */
  reasons: { ranks: number[]; text: string }[];
}

/** The hub pages the areas point to, in the areas' order, each once, with how it helps every area it serves. */
function pagesOf(bundle: Bundle): Page[] {
  const pages = new Map<string, Page>();
  for (const card of bundle.priorities.cards) {
    const hub = card.refs
      .map((r) => ({ ref: bundle.refs[r.id], lookFor: r.lookFor }))
      .filter((x) => x.ref && x.ref.kind === "hub")
      .slice(0, PER_ISSUE);
    for (const { ref, lookFor } of hub) {
      const page = pages.get(ref.id) ?? { ref, reasons: [] };
      const text = lookFor || ref.lookFor;
      const same = page.reasons.find((r) => r.text === text);
      if (!same) page.reasons.push({ ranks: [card.rank], text });
      else if (!same.ranks.includes(card.rank)) same.ranks.push(card.rank);
      pages.set(ref.id, page);
    }
  }
  return [...pages.values()];
}

/** "Spec Doc · Realism" reads as the page "Realism" in the Spec Doc. */
function split(title: string): { where: string | null; page: string } {
  const i = title.indexOf(" · ");
  return i < 0 ? { where: null, page: title } : { where: title.slice(0, i), page: title.slice(i + 3) };
}

/**
 * What to do differently next time, area by area and numbered as the areas above, then the Golden Task Hub
 * pages that help with them, each with a line on how it helps the area it is numbered with. The areas above
 * say what the audits found; this section only looks ahead, and nothing from the hub's navigation is
 * repeated here.
 */
export default function Resources({ bundle }: { bundle: Bundle }) {
  const cards = bundle.priorities.cards;
  if (!cards.length) return null;
  const pages = pagesOf(bundle);
  return (
    <section id="next-task" aria-labelledby="next-task-title" className="scroll-mt-28">
      <h2 id="next-task-title" className="font-display text-[22px] font-bold tracking-tight text-ink-900 sm:text-[24px]">
        For your next task
      </h2>
      <ol className="card mt-4 divide-y divide-ink-200/70">
        {cards.map((c) => (
          <li key={c.id} className="flex gap-3 px-4 py-4 sm:px-5">
            <Rank n={c.rank} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold leading-6 text-ink-600">{c.issue}</p>
              <ul className="mt-1 max-w-prose space-y-1.5">
                {c.todo.map((t, i) => (
                  <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {pages.length > 0 && (
        <>
          <h3 className="mt-8 font-display text-[17px] font-bold tracking-tight text-ink-900">Resources to help you improve</h3>
          <p className="mt-1 text-[13.5px] text-ink-500">Golden Task Hub pages, numbered with the area each one helps with.</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-2.5">
            {pages.map(({ ref, reasons }) => {
              const { where, page } = split(ref.title);
              return (
                <li key={ref.id} className="min-w-0">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group flex h-full gap-3 rounded-xl border border-ink-200/80 bg-surface p-3 transition-colors hover:border-brand-300 active:bg-raised sm:p-3.5"
                  >
                    <span className="min-w-0 flex-1">
                      {where && <span className="mono-label block text-[10px] text-brand-600 dark:text-brand-300">{where}</span>}
                      <span className="mt-0.5 block text-[14px] font-semibold leading-snug text-ink-900 group-hover:text-brand-700 dark:group-hover:text-brand-300">
                        {page}
                      </span>
                      <span className="mt-2 block space-y-1.5">
                        {reasons.map((r) => (
                          <span key={r.text} className="flex gap-2">
                            <span className="flex shrink-0 gap-1">
                              {r.ranks.map((n) => (
                                <Rank key={n} n={n} small />
                              ))}
                            </span>
                            <span className="min-w-0 text-[13px] leading-snug text-ink-600">
                              <span className="sr-only">For area {r.ranks.join(" and ")}: </span>
                              {r.text}
                            </span>
                          </span>
                        ))}
                      </span>
                    </span>
                    <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
