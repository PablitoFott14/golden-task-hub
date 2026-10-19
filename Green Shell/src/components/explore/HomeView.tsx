import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Link2, Search, Users } from "lucide-react";
import { dayNum, fmtDay, fmtDayLong } from "../../lib/explore/time";
import { useExplore } from "./context";
import { Avatar, ServerIcon, ServerMark, plural } from "./bits";
import { MonthGrid } from "./DayView";
import { identRank, plainLine } from "../../lib/explore/related";

/**
 * Where Explore opens: one search over the whole universe, every server with
 * what it holds and when, the people who reach across the most servers, the
 * references that tie records on different servers together, and the days
 * the most happened.
 */
export function HomeView() {
  const api = useExplore();
  const { ix } = api;
  const [q, setQ] = useState("");
  const present = ix.persona.now?.slice(0, 10) ?? null;
  const people = useMemo(
    () =>
      ix.entities
        .filter((e) => e.i !== ix.self && e.items.length)
        .sort((a, b) => Object.keys(b.servers).length - Object.keys(a.servers).length || b.items.length - a.items.length)
        .slice(0, 12),
    [ix]
  );
  const shared = useMemo(() => ix.idents.filter((d) => d.servers.length >= 2).sort((a, b) => identRank(b) - identRank(a)), [ix]);
  const busiest = useMemo(
    () =>
      [...ix.days]
        .map(([d, ids]) => ({ d, n: ids.length, servers: new Set(ids.map((i) => ix.items[i].server)).size }))
        .sort((a, b) => b.servers - a.servers || b.n - a.n)
        .slice(0, 6),
    [ix]
  );
  const spark = useMemo(() => {
    const lo = ix.dayMin ? dayNum(ix.dayMin) : 0;
    const hi = ix.dayMax ? dayNum(ix.dayMax) : 0;
    const weeks = Math.max(1, Math.ceil((hi - lo + 1) / 7));
    const out = new Map<string, number[]>();
    for (const s of ix.servers) {
      const c = new Array<number>(weeks).fill(0);
      for (const k of s.datasets)
        for (const i of ix.datasets.get(k)!.items) {
          const d = ix.items[i].day;
          if (!d) continue;
          const w = Math.floor((dayNum(d) - lo) / 7);
          if (w >= 0 && w < weeks) c[w]++;
        }
      out.set(s.id, c);
    }
    return out;
  }, [ix]);
  const records = ix.items.length;
  const known = ix.entities.filter((e) => e.items.length).length;
  const crossPeople = ix.entities.filter((e) => e.i !== ix.self && Object.keys(e.servers).length >= 2).length;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <section className="border-b border-ink-200/70 bg-surface px-5 py-6 sm:px-7">
        <div className="mono-label text-[oklch(0.5_0.13_var(--h))] dark:text-[oklch(0.78_0.1_var(--h))]">Explore</div>
        <h1 className="mt-1 font-display text-[26px] font-bold tracking-tight text-ink-950">{ix.persona.name.replace(/[.\s]+$/, "")}</h1>
        {ix.persona.subtitle && <p className="mt-0.5 text-[14px] text-ink-600">{ix.persona.subtitle}</p>}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink-600">
          {present && (
            <button type="button" onClick={() => api.openDay(present)} className="inline-flex items-center gap-1.5 hover:text-ink-900 hover:underline">
              <CalendarDays size={14} className="text-ink-400" /> Present day: <b className="font-semibold text-ink-900">{fmtDayLong(present)}</b>
            </button>
          )}
          {ix.dayMin && ix.dayMax && (
            <span>
              Records from {fmtDay(ix.dayMin)} to {fmtDay(ix.dayMax)}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink-500">
          <span>{plural(records, "record")}</span>
          <span>{plural(ix.servers.length, "server")}</span>
          <span>
            {plural(known, "person and organization", "people and organizations")}, {crossPeople} on two servers or more
          </span>
          <span>{plural(shared.length, "reference")} shared across servers</span>
        </div>
        <form
          className="relative mt-5 max-w-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) api.go((p) => (p.set("v", "search"), p.set("q", q.trim())), { fresh: true, push: true });
          }}
        >
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
          <input
            data-primary-search
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search every server: a name, a merchant, a number"
            className="w-full rounded-xl border border-ink-200 bg-ink-50 py-3 pl-10 pr-24 text-[14.5px] text-ink-900 placeholder:text-ink-400 focus:border-[oklch(0.7_0.1_var(--h))] focus:bg-surface focus:outline-none"
            aria-label="Search the whole universe"
          />
          <button type="submit" className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 text-[13px]">
            Search
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 gap-6 px-5 py-6 sm:px-7 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-7">
          <section>
            <Head title="Servers" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {ix.servers.map((s) => {
                const c = spark.get(s.id) ?? [];
                const peak = Math.max(1, ...c);
                const total = s.datasets.reduce((a, k) => a + (ix.datasets.get(k)?.items.length ?? 0), 0);
                return (
                  <button key={s.id} type="button" onClick={() => api.openServer(s.id)} className="card card-hover flex flex-col gap-2 p-3.5 text-left">
                    <div className="flex items-center gap-2.5">
                      <ServerMark server={s.id} size={30} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] font-semibold text-ink-900">{s.label}</div>
                        <div className="truncate text-[12px] text-ink-500">
                          {s.datasets
                            .map((k) => ix.datasets.get(k)!)
                            .map((d) => `${d.items.length.toLocaleString("en-US")} ${d.label.toLowerCase()}`)
                            .join(" · ")}
                        </div>
                      </div>
                      <span className="font-mono text-[12px] text-ink-400">{total.toLocaleString("en-US")}</span>
                    </div>
                    {c.some(Boolean) && (
                      <svg viewBox={`0 0 ${c.length} 20`} preserveAspectRatio="none" className="h-6 w-full" aria-hidden>
                        {c.map((v, k) => (v ? <rect key={k} x={k + 0.1} width={0.8} y={20 - (v / peak) * 19} height={(v / peak) * 19} className="fill-[oklch(0.62_0.12_var(--h))] opacity-70" /> : null))}
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <Head title="People who reach across the most servers" action={<More onClick={() => api.go((p) => p.set("v", "people"), { fresh: true })}>All people</More>} />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-3">
              {people.map((e) => (
                <button key={e.i} type="button" onClick={() => api.openEntity(e.i)} className="card card-hover flex items-center gap-3 p-3 text-left">
                  <Avatar name={e.name} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-semibold text-ink-900">{e.name}</div>
                    <div className="truncate text-[12px] text-ink-500">{e.job || (e.kind === "org" ? "Organization" : e.inContacts ? "In contacts" : "")}</div>
                    <div className="mt-1 flex items-center gap-1 text-ink-400">
                      {Object.keys(e.servers).map((s) => (
                        <ServerIcon key={s} server={s} size={12} />
                      ))}
                      <span className="ml-1 font-mono text-[11px]">{e.items.length}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {shared.length > 0 && (
            <section>
              <Head title="References that tie servers together" action={<More onClick={() => api.go((p) => p.set("v", "links"), { fresh: true })}>All connections</More>} />
              <div className="card divide-y divide-ink-200/70 overflow-hidden">
                {shared.slice(0, 10).map((d) => (
                  <button key={d.key} type="button" onClick={() => api.openIdent(d.i)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-ink-100/70">
                    <Link2 size={15} className="shrink-0 text-ink-400" />
                    <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-semibold text-ink-900">{d.label}</span>
                    <span className="flex shrink-0 items-center gap-1 text-ink-400">
                      {d.servers.map((s) => (
                        <ServerIcon key={s} server={s} size={13} />
                      ))}
                    </span>
                    <span className="w-20 shrink-0 text-right text-[12px] text-ink-500">{plural(d.items.length, "record")}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="min-w-0 space-y-6">
          {present && (
            <section className="card p-4">
              <MonthGrid day={present} />
            </section>
          )}
          <section>
            <Head title="Days the most servers saw" />
            <div className="card divide-y divide-ink-200/70 overflow-hidden">
              {busiest.map((b) => (
                <button key={b.d} type="button" onClick={() => api.openDay(b.d)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-ink-100/70">
                  <CalendarDays size={15} className="shrink-0 text-ink-400" />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink-900">{fmtDay(b.d)}</span>
                  <span className="shrink-0 text-[12px] text-ink-500">
                    {b.servers} servers, {b.n}
                  </span>
                </button>
              ))}
            </div>
          </section>
          {ix.docs.length > 0 && (
            <section>
              <Head title="The persona's notes" />
              <div className="card divide-y divide-ink-200/70 overflow-hidden">
                {ix.docs.map((d) => {
                  const all = d.text.split(/\n/).filter((l) => /^##\s/.test(l));
                  // The tensions themselves, not the coverage tables after them.
                  const named = all.filter((l) => /^##\s+(T\d+[.:]|standing consideration)/i.test(l));
                  const heads = (d.id === "tensions" && named.length ? named : all).map((l) => plainLine(l).replace(/^(standing consideration|tension|storyline|s\d+|t\d+)\s*[:.]\s*/i, ""));
                  return (
                    <div key={d.id} className="px-4 py-3">
                      <a href={api.viewerHref(d.id)} className="flex items-center gap-2 text-[13px] font-semibold text-ink-900 hover:underline">
                        <BookOpen size={14} className="text-ink-400" /> {d.label}
                        <span className="font-normal text-ink-400">{heads.length ? plural(heads.length, "section") : ""}</span>
                        <ArrowUpRight size={13} className="ml-auto text-ink-400" />
                      </a>
                      {d.id === "tensions" && heads.length > 0 && (
                        <ul className="mt-1.5 space-y-1 text-[12px] leading-snug text-ink-600">
                          {heads.slice(0, 10).map((h, k) => (
                            <li key={k} className="flex gap-1.5">
                              <span className="text-ink-300">·</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          <section className="rounded-xl border border-dashed border-ink-300 p-4 text-[12.5px] leading-relaxed text-ink-600">
            <div className="mb-1 flex items-center gap-1.5 font-semibold text-ink-800">
              <Users size={14} /> Finding a thread
            </div>
            Open a record and follow what it connects to: the people in it, the records it links to, the references it shares, the rest of its day. A person's page lists every record they appear in, on every server.
            {present && (
              <button type="button" onClick={() => api.openDay(present)} className="mt-2 inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline dark:text-brand-300">
                Start from the present day <ArrowRight size={13} />
              </button>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

function Head({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <h2 className="font-display text-[15px] font-bold tracking-tight text-ink-900">{title}</h2>
      <span className="flex-1" />
      {action}
    </div>
  );
}

function More({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 hover:underline dark:text-brand-300">
      {children} <ArrowRight size={13} />
    </button>
  );
}
