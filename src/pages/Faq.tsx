import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookMarked, HelpCircle, Search, X } from "lucide-react";
import { faq, faqTopics, guidelinesTitle } from "../data/faq";
import type { FaqItem } from "../data/types";
import { Crosslinks, Reveal } from "../components/ui";
import { useScrollSpy } from "../lib/useScrollSpy";
import { cx } from "../lib/util";

/** Wraps every match in <mark>, so a search shows where it hit. */
function Highlight({ text, q }: { text: string; q: string }) {
  const needle = q.trim();
  if (needle.length < 2) return <>{text}</>;
  const parts = text.split(new RegExp(`(${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === needle.toLowerCase() ? (
          <mark key={i} className="rounded bg-gold-300/60 px-0.5 text-ink-900 dark:bg-gold-500/40">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function matches(f: FaqItem, q: string) {
  const hay = [f.q, f.topic, f.a.join(" "), f.refs.map((r) => `${r.section} ${r.title}`).join(" ")]
    .join(" ")
    .toLowerCase();
  return hay.includes(q.trim().toLowerCase());
}

function Answer({ f, q }: { f: FaqItem; q: string }) {
  return (
    <article id={f.id} className="card scroll-mt-24 overflow-hidden">
      <div className="border-b border-ink-200/70 bg-raised px-5 py-4 sm:px-7">
        <div className="flex items-start gap-3.5">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-600 font-mono text-[12px] font-bold text-white">
            {f.n}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-[19px] font-bold leading-snug tracking-tight text-ink-900">
              <Highlight text={f.q} q={q} />
            </h2>
            <span className="mono-label mt-1.5 block text-ink-400">{f.topic}</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-7 sm:py-6">
        <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          <div className="min-w-0">
            {f.a.map((p, i) => (
              <p key={i} className="mb-3 text-[14.5px] leading-relaxed text-ink-700 last:mb-0">
                <Highlight text={p} q={q} />
              </p>
            ))}
            <Crosslinks links={f.links} className="mt-5" />
          </div>

          <aside className="self-start rounded-xl border border-ink-200/70 bg-raised p-4">
            <div className="mono-label mb-2.5 flex items-center gap-1.5 text-ink-400">
              <BookMarked size={13} /> References
            </div>
            <ul className="space-y-2">
              {f.refs.map((r) => (
                <li key={r.section + r.title} className="flex gap-2.5">
                  <span className="shrink-0 rounded bg-brand-500/10 px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand-700 dark:text-brand-300">
                    {r.section}
                  </span>
                  <span className="text-[12.5px] leading-snug text-ink-600">{r.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-ink-200/70 pt-2.5 text-[11.5px] leading-relaxed text-ink-400">
              {guidelinesTitle}
            </p>
          </aside>
        </div>
      </div>
    </article>
  );
}

export default function Faq() {
  const [topic, setTopic] = useState<string>("All");
  const [query, setQuery] = useState("");
  const box = useRef<HTMLInputElement>(null);

  /** `/` focuses the search, Escape clears it. Same keys as the spec page. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        box.current?.focus();
      }
      if (e.key === "Escape" && typing) {
        setQuery("");
        box.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const shown = useMemo(
    () =>
      faq
        .filter((f) => topic === "All" || f.topic === topic)
        .filter((f) => query.trim().length < 2 || matches(f, query)),
    [topic, query]
  );

  const ids = useMemo(() => shown.map((f) => f.id), [shown]);
  const active = useScrollSpy(ids);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200/70 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
        <div className="wrap relative py-12">
          <span className="chip bg-violet-500/12 text-violet-700 ring-1 ring-violet-500/25 dark:text-violet-300">
            <HelpCircle size={11} /> Common questions
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[32px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[40px]">
            The questions everyone asks in their first week
          </h1>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
            Every answer sits next to its question, and names the guidelines section it comes from.
          </p>
        </div>
      </section>

      <div className="wrap py-10">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* Rail: search, topics, and the question list */}
          <aside className="mb-8 lg:mb-0 lg:sticky lg:top-20 lg:self-start">
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                ref={box}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the questions"
                aria-label="Search the questions"
                className="w-full rounded-xl border border-ink-200 bg-surface py-2.5 pl-9 pr-9 text-[13.5px] text-ink-800 outline-none transition placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-ink-400 transition hover:text-ink-700"
                >
                  <X size={14} />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-ink-200 bg-raised px-1.5 py-0.5 font-mono text-[10px] text-ink-400 sm:block">
                  /
                </kbd>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {faqTopics.map((tp) => {
                const n = tp === "All" ? faq.length : faq.filter((f) => f.topic === tp).length;
                if (n === 0) return null;
                return (
                  <button
                    key={tp}
                    onClick={() => setTopic(tp)}
                    className={cx(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[12px] font-semibold transition",
                      topic === tp
                        ? "border-brand-400 bg-brand-500/10 text-brand-700 dark:text-brand-300"
                        : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300"
                    )}
                  >
                    {tp}
                    <span className="font-mono text-[10.5px] text-ink-400">{n}</span>
                  </button>
                );
              })}
            </div>

            <nav className="mt-5 hidden lg:block">
              <div className="mono-label mb-2.5 text-ink-400">
                {query.trim().length > 1 || topic !== "All"
                  ? `${shown.length} of ${faq.length} questions`
                  : "All questions"}
              </div>
              <ul className="space-y-1">
                {shown.map((f) => (
                  <li key={f.id}>
                    <Link
                      to={{ hash: `#${f.id}` }}
                      className={cx(
                        "group flex gap-2.5 rounded-xl px-2.5 py-2 text-[12.5px] leading-snug transition",
                        active === f.id
                          ? "bg-brand-500/10 font-semibold text-brand-700 dark:text-brand-300"
                          : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                      )}
                    >
                      <span
                        className={cx(
                          "mt-px grid h-5 w-5 shrink-0 place-items-center rounded font-mono text-[10px] font-bold transition",
                          active === f.id
                            ? "bg-brand-600 text-white"
                            : "bg-ink-100 text-ink-500 group-hover:bg-ink-200"
                        )}
                      >
                        {f.n}
                      </span>
                      <span className="line-clamp-3">{f.q}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Answers, all open */}
          <div className="min-w-0 space-y-5">
            {shown.length === 0 && (
              <div className="card p-8 text-center">
                <p className="text-[14px] text-ink-500">
                  Nothing matches <span className="font-semibold text-ink-800">{query}</span>.
                </p>
                <button onClick={() => setQuery("")} className="btn-ghost mt-4">
                  Clear the search
                </button>
              </div>
            )}
            {shown.map((f, i) => (
              <Reveal key={f.id} delay={Math.min(i * 0.03, 0.15)}>
                <Answer f={f} q={query} />
              </Reveal>
            ))}

            <div className="rounded-2xl border border-ink-200/70 bg-raised p-6">
              <h2 className="font-display text-[17px] font-bold text-ink-900">
                Nothing here answers it?
              </h2>
              <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-600">
                The guidelines stay the source of truth for anything this page does not cover. For
                how a decision plays out in practice, a worked task is usually faster than reading
                the section again.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/golden-tasks" className="btn-primary">
                  Open the Golden Tasks <ArrowRight size={15} />
                </Link>
                <Link to="/checklist" className="btn-ghost">
                  Run the pre-submit gate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
