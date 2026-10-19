import { useMemo, useState, type ReactNode } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "../../lib/util";
import { addDays, dayNum, fmtDayLong, fmtMonth, monthOf, weekdayOf } from "../../lib/explore/time";
import { useExplore } from "./context";
import { ItemRow, listHeight } from "./Rows";
import { ServerIcon, plural, tint } from "./bits";

/**
 * One day across every server, in the persona's own time zone: when each
 * thing happened on a 24 hour strip, the records in time order, and a month
 * of days around it to move through. The day a task is set on, and the days
 * either side of it, are where a well grounded task starts.
 */
export function DayView({ day }: { day: string }) {
  const api = useExplore();
  const { ix, clock } = api;
  const [server, setServer] = useState<string | null>(null);
  const all = useMemo(() => ix.days.get(day) ?? [], [ix, day]);
  const ids = server ? all.filter((i) => ix.items[i].server === server) : all;
  const servers = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of all) m.set(ix.items[i].server, (m.get(ix.items[i].server) ?? 0) + 1);
    return [...m].sort((a, b) => b[1] - a[1]);
  }, [ix, all]);
  const allDay = ids.filter((i) => ix.items[i].allDay || ix.items[i].day !== day);
  const timed = ids.filter((i) => !ix.items[i].allDay && ix.items[i].day === day);
  const now = ix.persona.now?.slice(0, 10) ?? null;
  const gap = now ? dayNum(day) - dayNum(now) : null;
  const selected = api.sp.get("r");
  const prevDay = [...ix.days.keys()].filter((d) => d < day).sort().pop();
  const nextDay = [...ix.days.keys()].filter((d) => d > day).sort()[0];

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="space-y-3 border-b border-ink-200/70 bg-surface px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[oklch(0.95_0.035_var(--h))] text-[oklch(0.42_0.12_var(--h))] dark:bg-[oklch(0.3_0.05_var(--h))] dark:text-[oklch(0.86_0.08_var(--h))]">
              <CalendarDays size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[21px] font-bold tracking-tight text-ink-950">{fmtDayLong(day)}</h1>
              <p className="text-[12.5px] text-ink-500" data-count={all.length}>
                {plural(all.length, "record")} in {plural(servers.length, "server")}
                {gap === null ? "" : gap === 0 ? " · the persona's present day" : ` · ${plural(Math.abs(gap), "day")} ${gap < 0 ? "before" : "after"} the present day`}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <NavBtn onClick={() => api.openDay(addDays(day, -1))} label="The day before">
                <ChevronLeft size={16} />
              </NavBtn>
              <NavBtn onClick={() => api.openDay(addDays(day, 1))} label="The day after">
                <ChevronRight size={16} />
              </NavBtn>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter active={server === null} onClick={() => setServer(null)}>
              Every server <span className="font-mono text-[11px] opacity-70">{all.length}</span>
            </Filter>
            {servers.map(([s, n]) => (
              <Filter key={s} server={s} active={server === s} onClick={() => setServer(server === s ? null : s)}>
                <ServerIcon server={s} size={13} /> {api.label(s)} <span className="font-mono text-[11px] opacity-70">{n}</span>
              </Filter>
            ))}
          </div>
          {timed.length > 0 && <Clockface ids={timed} day={day} />}
          {!all.length && (
            <p className="text-[13px] text-ink-500">
              Nothing is dated this day.{" "}
              {prevDay && (
                <button type="button" onClick={() => api.openDay(prevDay)} className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
                  The closest day before with records
                </button>
              )}
              {prevDay && nextDay && " or "}
              {nextDay && (
                <button type="button" onClick={() => api.openDay(nextDay)} className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
                  the closest after
                </button>
              )}
              .
            </p>
          )}
        </header>
        <div className="bg-surface">
          {allDay.length > 0 && <Group title="All day, or spanning this day" ids={allDay} selected={selected} />}
          {timed.length > 0 && <Group title="Through the day" ids={timed} selected={selected} />}
        </div>
        <p className="px-4 py-3 text-[11.5px] text-ink-400">Times are in the persona's time zone, {clock.tz.replace(/_/g, " ")}.</p>
      </div>
      {!selected && (
        <aside className="hidden w-[300px] shrink-0 overflow-y-auto border-l border-ink-200/70 bg-surface px-4 py-4 xl:block">
          <MonthGrid day={day} />
        </aside>
      )}
    </div>
  );
}

function Group({ title, ids, selected }: { title: string; ids: number[]; selected: string | null }) {
  const { ix, openItem } = useExplore();
  return (
    <section>
      <div className="flex h-[34px] items-end border-b border-ink-200 bg-ink-50 px-4 pb-1.5 text-[12px] font-semibold text-ink-700">
        {title} <span className="ml-2 font-mono text-[11px] font-normal text-ink-400">{ids.length}</span>
      </div>
      {ids.map((i) => {
        const it = ix.items[i];
        return (
          <div key={i} style={{ height: listHeight(it.kind) }}>
            <ItemRow ix={ix} it={it} terms={[]} selected={it.key === selected} cursor={false} onOpen={openItem} showServer />
          </div>
        );
      })}
    </section>
  );
}

/** The day's timed records on one strip from midnight to midnight, a lane per server. */
function Clockface({ ids, day }: { ids: number[]; day: string }) {
  const { ix, clock, openItem, label } = useExplore();
  const [hover, setHover] = useState<number | null>(null);
  const lanes = useMemo(() => {
    const m = new Map<string, number[]>();
    for (const i of ids) {
      const s = ix.items[i].server;
      if (!m.has(s)) m.set(s, []);
      m.get(s)!.push(i);
    }
    return [...m];
  }, [ix, ids]);
  const H = 22;
  const hov = hover !== null ? ix.items[hover] : null;
  return (
    <div className="rounded-xl border border-ink-200/70 bg-raised p-3">
      <div className="mb-1.5 flex h-4 items-center justify-between text-[11.5px] text-ink-500">
        <span className="truncate">{hov ? `${clock.time(hov.at!)} · ${label(hov.server)} · ${hov.title}` : "Hover a mark to see it, click to open it"}</span>
      </div>
      <div className="grid grid-cols-[92px_1fr] items-center gap-x-2">
        {lanes.map(([s, list]) => (
          <div key={s} className="contents">
            <span className="flex items-center gap-1.5 truncate text-[11.5px] text-ink-500" style={{ height: H }}>
              <ServerIcon server={s} size={12} />
              <span className="truncate">{label(s)}</span>
            </span>
            <div className="relative rounded bg-surface ring-1 ring-inset ring-ink-200/70" style={{ height: H }}>
              {[6, 12, 18].map((h) => (
                <span key={h} className="absolute inset-y-0 w-px bg-ink-200" style={{ left: `${(h / 24) * 100}%` }} />
              ))}
              {list.map((i) => {
                const it = ix.items[i];
                const m = it.day === day ? clock.minute(it.at!) : 0;
                const end = it.end && it.end > it.at! ? Math.min(1440, m + (it.end - it.at!) / 60000) : null;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openItem(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    style={{ ...tint(s), left: `${(m / 1440) * 100}%`, width: end ? `max(6px, ${((end - m) / 1440) * 100}%)` : 8 }}
                    className={cx("absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-[oklch(0.62_0.13_var(--t))] ring-2 ring-surface transition hover:scale-125 dark:bg-[oklch(0.72_0.12_var(--t))]", !end && "-translate-x-1/2", hover === i && "scale-125")}
                    aria-label={`${clock.time(it.at!)} ${it.title}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <span />
        <div className="relative mt-1 h-3 text-[10.5px] text-ink-400">
          {["12 am", "6 am", "12 pm", "6 pm", "12 am"].map((t, k) => (
            <span key={k} className={cx("absolute", k === 4 ? "right-0" : k ? "-translate-x-1/2" : "")} style={k && k < 4 ? { left: `${k * 25}%` } : undefined}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A month of days, shaded by how much happened on each. */
export function MonthGrid({ day }: { day: string }) {
  const { ix, openDay } = useExplore();
  const [month, setMonth] = useState(monthOf(day));
  const first = month + "-01";
  const lead = (weekdayOf(first) + 6) % 7;
  const daysIn = new Date(Date.UTC(+month.slice(0, 4), +month.slice(5, 7), 0)).getUTCDate();
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysIn }, (_, k) => `${month}-${String(k + 1).padStart(2, "0")}`)];
  const peak = Math.max(1, ...cells.map((d) => (d ? ix.days.get(d)?.length ?? 0 : 0)));
  const shift = (n: number) => {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(Date.UTC(y, m - 1 + n, 1));
    setMonth(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
  };
  const now = ix.persona.now?.slice(0, 10);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <NavBtn onClick={() => shift(-1)} label="Previous month">
          <ChevronLeft size={15} />
        </NavBtn>
        <span className="text-[13px] font-semibold text-ink-800">{fmtMonth(month)}</span>
        <NavBtn onClick={() => shift(1)} label="Next month">
          <ChevronRight size={15} />
        </NavBtn>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["M", "T", "W", "T", "F", "S", "S"].map((w, k) => (
          <span key={k} className="text-[10.5px] font-semibold text-ink-400">
            {w}
          </span>
        ))}
        {cells.map((d, k) => {
          if (!d) return <span key={k} />;
          const n = ix.days.get(d)?.length ?? 0;
          const a = n ? 0.15 + 0.85 * (n / peak) : 0;
          return (
            <button
              key={d}
              type="button"
              onClick={() => openDay(d)}
              title={`${d}: ${n} records`}
              className={cx(
                "relative aspect-square rounded-md text-[11.5px] font-medium transition hover:ring-2 hover:ring-ink-300",
                d === day && "ring-2 ring-[oklch(0.58_0.15_var(--h))]",
                n ? "text-ink-900" : "text-ink-300"
              )}
              style={{ background: n ? `oklch(0.62 0.14 var(--h) / ${a.toFixed(2)})` : undefined }}
            >
              {Number(d.slice(8))}
              {d === now && <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose-500" />}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-ink-400">Darker days hold more records. The dot marks the persona's present day.</p>
    </div>
  );
}

function NavBtn({ onClick, label, children }: { onClick: () => void; label: string; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="grid h-8 w-8 place-items-center rounded-lg border border-ink-200 text-ink-600 hover:bg-ink-100 hover:text-ink-900" aria-label={label} title={label}>
      {children}
    </button>
  );
}

function Filter({ server, active, onClick, children }: { server?: string; active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={server ? tint(server) : undefined}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[12.5px] font-semibold",
        active ? (server ? "border-[oklch(0.75_0.08_var(--t))] bg-[oklch(0.95_0.03_var(--t))] text-[oklch(0.38_0.11_var(--t))] dark:border-[oklch(0.5_0.08_var(--t))] dark:bg-[oklch(0.3_0.05_var(--t))] dark:text-[oklch(0.88_0.08_var(--t))]" : "border-ink-400 bg-ink-100 text-ink-900") : "border-ink-200 text-ink-600 hover:bg-ink-100"
      )}
    >
      {children}
    </button>
  );
}

