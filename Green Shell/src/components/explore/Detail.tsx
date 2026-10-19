import { useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, CalendarDays, ChevronDown, ChevronRight, Download, ExternalLink, FileText, Link2, Pin, PinOff, UserRound, X } from "lucide-react";
import { cx } from "../../lib/util";
import { fmtDay, fmtDayLong } from "../../lib/explore/time";
import { money, pretty } from "../../lib/explore/ctx";
import { related, roleLabel } from "../../lib/explore/related";
import type { Item, Media } from "../../lib/explore/types";
import { urlPath } from "../../lib/universeHost";
import { Amount, Avatar, EntityChip, Highlight, Pill, Section, ServerMark, ServerTag, plural, useWhen } from "./bits";
import { useExplore } from "./context";
import { tableCols } from "./Rows";

/**
 * One record in full, then everything it connects to: the people in it and
 * where else they appear, the records the data links it to, the references it
 * shares with records on other servers, the rest of its day, and what the same
 * people were doing in the days around it. Every stored field is at the foot.
 */
export function Detail({ it, terms, onClose }: { it: Item; terms: string[]; onClose: () => void }) {
  const api = useExplore();
  const { ix } = api;
  const when = useWhen();
  const ds = ix.datasets.get(it.ds);
  const rel = useMemo(() => related(ix, it), [ix, it]);
  const isDirectory = it.server === "people" || it.server === "links";
  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-ink-200/70 bg-surface/95 px-5 py-2.5 backdrop-blur">
        <span className="min-w-0 truncate">
          <ServerTag server={it.server} label={`${api.label(it.server)}${ds && ds.label !== api.label(it.server) ? ` · ${ds.label}` : ""}`} />
        </span>
        <span className="flex-1" />
        {!isDirectory && (
          <button
            type="button"
            onClick={() => api.togglePin(it.key)}
            aria-pressed={api.pins.includes(it.key)}
            className={cx(
              "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[12px] font-semibold",
              api.pins.includes(it.key) ? "bg-[oklch(0.95_0.035_var(--h))] text-[oklch(0.36_0.1_var(--h))] dark:bg-[oklch(0.3_0.05_var(--h))] dark:text-[oklch(0.9_0.06_var(--h))]" : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
            )}
            title={api.pins.includes(it.key) ? "Take it off the pinned list" : "Keep it on the pinned list, to copy out with the others"}
          >
            {api.pins.includes(it.key) ? <PinOff size={13} /> : <Pin size={13} />}
            {api.pins.includes(it.key) ? "Pinned" : "Pin"}
          </button>
        )}
        {!isDirectory && (
          <a href={api.viewerHref(it.server)} className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 text-[12px] font-semibold text-ink-500 hover:bg-ink-100 hover:text-ink-900" title="The same server in the persona's own viewer" aria-label="Show in viewer">
            <span className="hidden sm:inline">Show in viewer</span> <ArrowUpRight size={13} />
          </a>
        )}
        <button type="button" onClick={onClose} className="grid h-7 w-7 place-items-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900" aria-label="Close the record">
          <X size={16} />
        </button>
      </div>

      <div className="px-5 pb-4 pt-4">
        <h2 className="font-display text-[19px] font-bold leading-snug tracking-tight text-ink-950">
          <Highlight text={it.title} terms={terms} />
        </h2>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-500">
          {it.at !== null && (
            <button type="button" onClick={() => it.day && api.openDay(it.day)} className="inline-flex items-center gap-1 hover:text-ink-900 hover:underline" title="Everything on this day, across every server">
              <CalendarDays size={13} />
              {when.full(it)}
              {it.end && it.end > (it.at ?? 0) && !it.allDay ? ` to ${api.clock.time(it.end)}` : it.end && it.allDay && it.day ? ` to ${fmtDay(api.clock.day(it.end - 1))}` : ""}
            </button>
          )}
          {it.sub && it.kind !== "email" && <span className="min-w-0">{it.sub}</span>}
        </div>
        {it.amount !== null && <Amount value={it.amount} className="mt-2 block text-[22px] font-bold" />}
      </div>

      <Body it={it} terms={terms} />

      <Facts it={it} />

      {rel.people.length > 0 && (
        <Section title="People" count={rel.people.length}>
          <div className="flex flex-wrap gap-1.5">
            {rel.people.slice(0, 40).map(({ e, roles }) => (
              <EntityChip key={e} e={e} extra={<span className="text-[11px] font-normal text-ink-400">{roles.map(roleLabel).join(", ")} · {ix.entities[e].items.length}</span>} />
            ))}
          </div>
          {rel.people.length > 40 && <p className="mt-2 text-[12px] text-ink-500">And {rel.people.length - 40} more.</p>}
        </Section>
      )}

      {rel.linked.map((l) => (
        <Section key={l.why} title={l.why} count={l.items.length}>
          <MiniList ids={l.items} limit={8} />
        </Section>
      ))}

      {rel.shared.length > 0 && (
        <Section title="Shares a reference with" count={rel.shared.reduce((a, s) => a + s.others.length, 0)}>
          <div className="space-y-3">
            {rel.shared.slice(0, 12).map((s) => (
              <div key={s.ident.key}>
                <button type="button" onClick={() => api.openIdent(s.ident.i)} className="mb-1 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-800 hover:underline">
                  <Link2 size={13} className="text-ink-400" />
                  <span className="font-mono">{s.ident.label}</span>
                  <span className="font-normal text-ink-400">
                    {kindWord(s.ident.kind)} · {plural(s.others.length, "other record")}
                  </span>
                </button>
                <MiniList ids={s.others} limit={4} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {it.day && rel.sameDay.length > 0 && (
        <Section
          title="Same day"
          count={rel.sameDay.length}
          action={
            <button type="button" onClick={() => api.openDay(it.day!)} className="text-[12px] font-semibold text-brand-600 hover:underline dark:text-brand-300">
              Open {fmtDay(it.day, false)}
            </button>
          }
        >
          <SameDay ids={rel.sameDay} />
        </Section>
      )}

      {rel.nearby.length > 0 && (
        <Section title="The same people, three days either side" count={rel.nearby.length}>
          <MiniList ids={rel.nearby} limit={8} showDay />
        </Section>
      )}

      {!isDirectory && <AllFields it={it} />}
    </div>
  );
}

const kindWord = (k: string) => ({ code: "reference", amount: "amount", file: "file name", phone: "phone number" })[k] ?? k;

/* ------------------------------------------------------------- the body */

function Body({ it, terms }: { it: Item; terms: string[] }) {
  const api = useExplore();
  const { ix } = api;
  const roleChips = (role: string, label: string) => {
    const ps = it.people.filter((p) => p.role === role);
    if (!ps.length) return null;
    return (
      <div className="flex items-start gap-2">
        <span className="w-12 shrink-0 pt-1 text-[12px] text-ink-400">{label}</span>
        <div className="flex min-w-0 flex-wrap gap-1">
          {ps.map((p) => (
            <EntityChip key={p.e} e={p.e} size="sm" />
          ))}
        </div>
      </div>
    );
  };
  const text = it.text ? (
    <div className="whitespace-pre-wrap break-words text-[13.5px] leading-relaxed text-ink-800">
      <Highlight text={it.text} terms={terms} />
    </div>
  ) : null;

  switch (it.kind) {
    case "email":
      return (
        <div className="space-y-3 px-5 pb-5">
          <div className="space-y-1.5">
            {roleChips("from", "From")}
            {roleChips("to", "To")}
            {roleChips("cc", "Cc")}
          </div>
          {text}
          <MediaList media={it.media} />
        </div>
      );
    case "message":
    case "comment":
      return (
        <div className="space-y-3 px-5 pb-5">
          {text}
          <MediaList media={it.media} />
          {it.thread && <Context it={it} />}
        </div>
      );
    case "conversation":
      return (
        <div className="space-y-3 px-5 pb-5">
          <div className="flex flex-wrap gap-1">
            {it.people
              .filter((p) => p.role === "participant")
              .map((p) => (
                <EntityChip key={p.e} e={p.e} size="sm" />
              ))}
          </div>
          <Transcript it={it} terms={terms} />
        </div>
      );
    case "event":
      return (
        <div className="space-y-3 px-5 pb-5">
          {it.sub && <p className="text-[13px] text-ink-600">{it.sub}</p>}
          {roleChips("with", "With")}
          {text}
        </div>
      );
    case "file":
      return (
        <div className="space-y-3 px-5 pb-5">
          <FilePreview m={it.media[0]} />
          <p className="break-all font-mono text-[12px] text-ink-500">{String((it.raw as { path?: unknown }).path ?? it.title)}</p>
        </div>
      );
    case "post":
    case "listing":
      return (
        <div className="space-y-3 px-5 pb-5">
          {it.media.filter((m) => m.kind === "image" && m.url).length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {it.media
                .filter((m) => m.kind === "image" && m.url)
                .slice(0, 6)
                .map((m) => (
                  <a key={m.url} href={m.url!} target="_blank" rel="noopener" className="block overflow-hidden rounded-lg border border-ink-200">
                    <img src={m.url!} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
                  </a>
                ))}
            </div>
          )}
          {text}
          {roleChips("author", "By")}
          {roleChips("seller", "Seller")}
        </div>
      );
    case "contact":
    case "account": {
      const e = it.people[0]?.e;
      const ent = e !== undefined ? ix.entities[e] : null;
      return (
        <div className="space-y-3 px-5 pb-5">
          {ent && (
            <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-raised p-3">
              <Avatar name={ent.name} size={40} />
              <div className="min-w-0 flex-1 text-[12.5px] text-ink-600">
                <div className="font-semibold text-ink-900">{ent.name}</div>
                <div>
                  {plural(ent.items.length, "record")} in {plural(Object.keys(ent.servers).length, "server")}
                </div>
              </div>
              <button type="button" onClick={() => api.openEntity(ent.i)} className="btn-ghost px-3 py-1.5 text-[12.5px]">
                <UserRound size={14} /> Profile
              </button>
            </div>
          )}
          {text}
        </div>
      );
    }
    case "health":
    case "table":
      return (
        <div className="px-5 pb-5">
          <dl className="grid grid-cols-[minmax(110px,40%)_1fr] gap-x-3 gap-y-1.5 text-[13px]">
            {(ix.datasets.get(it.ds) ? tableCols(ix.datasets.get(it.ds)!) : []).slice(it.kind === "health" ? 1 : 0).map((c) => {
              const v = c.get(it);
              if (v === null || v === "") return null;
              return (
                <div key={c.id} className="contents">
                  <dt className="text-ink-500">{c.label}</dt>
                  <dd className={cx("min-w-0 whitespace-pre-wrap break-words text-ink-900", c.num && "font-mono tabular-nums")}>
                    {typeof v === "number" ? (c.money ? money(v) : v.toLocaleString("en-US")) : <Highlight text={String(v)} terms={terms} />}
                  </dd>
                </div>
              );
            })}
          </dl>
          {it.kind === "health" && <SleepBar it={it} />}
          <MediaList media={it.media} />
        </div>
      );
    default:
      return (
        <div className="space-y-3 px-5 pb-5">
          {text}
          <MediaList media={it.media} />
        </div>
      );
  }
}

/** A night's sleep against the clock, from bedtime to waking. */
function SleepBar({ it }: { it: Item }) {
  const { clock } = useExplore();
  if (it.n.bedAt === undefined || it.n.wakeAt === undefined) return null;
  const start = (clock.minute(it.n.bedAt) + 720) % 1440; // minutes after noon
  const end = start + (it.n.wakeAt - it.n.bedAt) / 60000;
  const pct = (m: number) => `${(Math.min(1440, Math.max(0, m)) / 1440) * 100}%`;
  return (
    <div className="mt-4">
      <div className="mono-label mb-1 text-[10px] text-ink-400">The night, noon to noon</div>
      <div className="relative h-5 rounded bg-ink-100">
        <span className="absolute inset-y-0 rounded bg-indigo-400/70 dark:bg-indigo-400/50" style={{ left: pct(start), width: `calc(${pct(end)} - ${pct(start)})` }} />
        {[0, 360, 720, 1080].map((m) => (
          <span key={m} className="absolute inset-y-0 w-px bg-ink-300/60" style={{ left: pct(m) }} />
        ))}
      </div>
      <div className="mt-0.5 flex justify-between text-[10.5px] text-ink-400">
        <span>noon</span>
        <span>6 pm</span>
        <span>midnight</span>
        <span>6 am</span>
        <span>noon</span>
      </div>
      <p className="mt-1 text-[12px] text-ink-500">
        In bed {clock.time(it.n.bedAt)}, up {clock.time(it.n.wakeAt)}
      </p>
    </div>
  );
}

/** The record's facet values, as plain facts. */
function Facts({ it }: { it: Item }) {
  const { ix } = useExplore();
  const ds = ix.datasets.get(it.ds);
  if (!ds) return null;
  const rows = ds.facets
    .filter((f) => !f.entity && f.id !== "month" && f.id !== "weekday" && f.id !== "hour" && it.f[f.id] !== undefined)
    .map((f) => {
      const v = it.f[f.id];
      const vs = (Array.isArray(v) ? v : [v]).map((x) => (f.tree ? x : f.fmt ? f.fmt(x) : x));
      return { label: f.label, value: f.tree ? vs[vs.length - 1] : vs.join(", ") };
    })
    .filter((r) => r.value);
  if (!rows.length) return null;
  return (
    <Section title="Details">
      <dl className="grid grid-cols-[minmax(100px,38%)_1fr] gap-x-3 gap-y-1 text-[12.5px]">
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <dt className="text-ink-500">{r.label}</dt>
            <dd className="min-w-0 break-words text-ink-800">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function MediaList({ media }: { media: Media[] }) {
  if (!media.length) return null;
  return (
    <div className="space-y-1.5">
      <div className="mono-label text-[10px] text-ink-400">{plural(media.length, "attachment")}</div>
      <div className="grid grid-cols-1 gap-1.5">
        {media.map((m, k) => (
          <MediaRow key={m.name + k} m={m} />
        ))}
      </div>
    </div>
  );
}

function MediaRow({ m }: { m: Media }) {
  const body = (
    <>
      {m.kind === "image" && m.url ? (
        <img src={m.url} alt="" loading="lazy" className="h-10 w-10 shrink-0 rounded border border-ink-200 object-cover" />
      ) : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded border border-ink-200 bg-ink-100 text-ink-500">
          <FileText size={16} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-medium text-ink-800">{m.name}</span>
        <span className="block text-[11.5px] text-ink-400">{m.url ? `${pretty(m.kind === "doc" ? "document" : m.kind)}${m.size ? `, ${Math.max(1, Math.round(m.size / 1024))} KB` : ""}` : "Named in the record; the file itself is not part of this universe"}</span>
      </span>
      {m.url && <ExternalLink size={14} className="shrink-0 text-ink-400" />}
    </>
  );
  return m.url ? (
    <a href={m.url} target="_blank" rel="noopener" className="flex items-center gap-2.5 rounded-lg border border-ink-200 p-1.5 pr-2.5 hover:border-ink-300 hover:bg-ink-100">
      {body}
    </a>
  ) : (
    <div className="flex items-center gap-2.5 rounded-lg border border-dashed border-ink-200 p-1.5 pr-2.5">{body}</div>
  );
}

function FilePreview({ m }: { m: Media | undefined }) {
  if (!m) return null;
  if (!m.url) return <p className="rounded-lg border border-dashed border-ink-300 p-3 text-[12.5px] text-ink-500">This file is listed, but its contents are not part of this universe.</p>;
  return (
    <div className="space-y-2">
      {m.kind === "image" && (
        <a href={m.url} target="_blank" rel="noopener" className="block overflow-hidden rounded-lg border border-ink-200 bg-ink-100">
          <img src={m.url} alt={m.name} className="max-h-[360px] w-full object-contain" />
        </a>
      )}
      {m.kind === "video" && <video src={m.url} controls className="max-h-[360px] w-full rounded-lg border border-ink-200" />}
      <div className="flex flex-wrap gap-2">
        <a href={m.url} target="_blank" rel="noopener" className="btn-ghost px-3 py-1.5 text-[12.5px]">
          <ExternalLink size={14} /> Open
        </a>
        <a href={m.url} download={m.name} className="btn-ghost px-3 py-1.5 text-[12.5px]">
          <Download size={14} /> Download
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------- conversations, threads */

/** The messages either side of this one in its conversation or thread. */
function Context({ it }: { it: Item }) {
  const api = useExplore();
  const { ix } = api;
  const siblings = useMemo(() => ix.datasets.get(it.ds)!.items.filter((i) => ix.items[i].thread === it.thread).sort((a, b) => (ix.items[a].at ?? 0) - (ix.items[b].at ?? 0)), [ix, it]);
  const k = siblings.indexOf(it.i);
  if (siblings.length < 2) return null;
  const from = Math.max(0, k - 4);
  const slice = siblings.slice(from, k + 5);
  const conv = ix.items.find((x) => x.thread === it.thread && x.kind === "conversation");
  return (
    <div className="rounded-xl border border-ink-200 bg-raised p-3">
      <div className="mb-2 flex items-center gap-2">
        <span className="mono-label text-[10px] text-ink-400">In context</span>
        <span className="font-mono text-[11px] text-ink-400">
          {k + 1} of {siblings.length}
        </span>
        <span className="flex-1" />
        {conv && (
          <button type="button" onClick={() => api.openItem(conv.i)} className="text-[12px] font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Whole conversation
          </button>
        )}
      </div>
      <Bubbles ids={slice} current={it.i} />
    </div>
  );
}

function Transcript({ it, terms }: { it: Item; terms: string[] }) {
  const { ix } = useExplore();
  const ids = useMemo(() => {
    const sib = [...ix.datasets.values()].find((d) => d.server === it.server && d.row === "message");
    return sib ? sib.items.filter((i) => ix.items[i].thread === it.thread).sort((a, b) => (ix.items[a].at ?? 0) - (ix.items[b].at ?? 0)) : [];
  }, [ix, it]);
  if (!ids.length) return null;
  return (
    <div>
      <div className="mono-label mb-2 text-[10px] text-ink-400">{plural(ids.length, "message")}</div>
      <Bubbles ids={ids} terms={terms} />
    </div>
  );
}

function Bubbles({ ids, current, terms = [] }: { ids: number[]; current?: number; terms?: string[] }) {
  const api = useExplore();
  const { ix, clock } = api;
  let lastDay = "";
  return (
    <div className="space-y-1.5">
      {ids.map((i) => {
        const m = ix.items[i];
        const mine = m.people[0]?.e === ix.self;
        const dayHead = m.day && m.day !== lastDay ? m.day : null;
        if (m.day) lastDay = m.day;
        return (
          <div key={i}>
            {dayHead && <div className="my-2 text-center text-[11px] font-medium text-ink-400">{fmtDayLong(dayHead)}</div>}
            <button
              type="button"
              onClick={() => i !== current && api.openItem(i)}
              className={cx(
                "block max-w-[88%] rounded-2xl px-3 py-1.5 text-left text-[13px] leading-snug",
                mine ? "ml-auto bg-[oklch(0.93_0.05_var(--h))] text-[oklch(0.28_0.08_var(--h))] dark:bg-[oklch(0.33_0.06_var(--h))] dark:text-[oklch(0.94_0.03_var(--h))]" : "bg-surface text-ink-800 ring-1 ring-inset ring-ink-200",
                i === current && "ring-2 ring-[oklch(0.58_0.15_var(--h))]"
              )}
            >
              {!mine && <span className="block text-[11px] font-semibold text-ink-500">{m.title}</span>}
              <span className="whitespace-pre-wrap break-words">
                <Highlight text={m.text || m.media.map((x) => x.name).join(", ")} terms={terms} />
              </span>
              <span className="mt-0.5 block text-right font-mono text-[10px] opacity-60">{m.at !== null ? clock.time(m.at) : ""}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------- related lists */

export function MiniItem({ i, showDay }: { i: number; showDay?: boolean }) {
  const api = useExplore();
  const it = api.ix.items[i];
  const when = useWhen();
  return (
    <button type="button" onClick={() => api.openItem(i)} className="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left hover:bg-ink-100">
      <ServerMark server={it.server} size={24} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-semibold text-ink-900">{it.title}</span>
        <span className="block truncate text-[11.5px] text-ink-500">{it.sub || api.label(it.server)}</span>
      </span>
      {it.amount !== null && <Amount value={it.amount} className="shrink-0 text-[12px]" />}
      <span className="shrink-0 font-mono text-[11px] text-ink-400">{showDay ? when.short(it) : when.time(it) || when.short(it)}</span>
    </button>
  );
}

export function MiniList({ ids, limit = 6, showDay }: { ids: number[]; limit?: number; showDay?: boolean }) {
  const [all, setAll] = useState(false);
  const shown = all ? ids : ids.slice(0, limit);
  return (
    <div>
      {shown.map((i) => (
        <MiniItem key={i} i={i} showDay={showDay} />
      ))}
      {ids.length > limit && (
        <button type="button" onClick={() => setAll(!all)} className="ml-1.5 mt-1 text-[12px] font-semibold text-brand-600 hover:underline dark:text-brand-300">
          {all ? "Show fewer" : `Show all ${ids.length}`}
        </button>
      )}
    </div>
  );
}

function SameDay({ ids }: { ids: number[] }) {
  const { ix, label } = useExplore();
  const by = new Map<string, number>();
  for (const i of ids) by.set(ix.items[i].server, (by.get(ix.items[i].server) ?? 0) + 1);
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1">
        {[...by].map(([s, n]) => (
          <Pill key={s}>
            {label(s)} {n}
          </Pill>
        ))}
      </div>
      <MiniList ids={ids} limit={6} />
    </div>
  );
}

/* ------------------------------------------------------- stored fields */

function AllFields({ it }: { it: Item }) {
  const [open, setOpen] = useState(false);
  const recs = [{ label: "Record", rec: it.raw }, ...it.also];
  return (
    <section className="border-t border-ink-200/70 px-5 py-3">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center gap-1.5 text-left" aria-expanded={open}>
        {open ? <ChevronDown size={14} className="text-ink-400" /> : <ChevronRight size={14} className="text-ink-400" />}
        <span className="mono-label text-ink-500">Every stored field</span>
      </button>
      {open && (
        <div className="mt-2 space-y-3">
          {recs.map((r, k) => (
            <div key={k}>
              {recs.length > 1 && <div className="mb-1 text-[11.5px] font-semibold text-ink-500">{r.label}</div>}
              <Fields value={r.rec} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function Fields({ value, depth = 0 }: { value: unknown; depth?: number }): ReactNode {
  const { ix } = useExplore();
  if (value === null || value === undefined) return <span className="text-ink-400">empty</span>;
  if (typeof value !== "object") return <span className="whitespace-pre-wrap break-words">{String(value)}</span>;
  if (Array.isArray(value)) {
    if (!value.length) return <span className="text-ink-400">none</span>;
    if (value.every((v) => typeof v !== "object" || v === null)) return <span className="break-words">{value.map(String).join(", ")}</span>;
    return (
      <div className="space-y-1.5">
        {value.slice(0, 200).map((v, k) => (
          <div key={k} className="rounded-md border border-ink-200/70 p-1.5">
            <Fields value={v} depth={depth + 1} />
          </div>
        ))}
        {value.length > 200 && <span className="text-ink-400">{value.length - 200} more</span>}
      </div>
    );
  }
  const o = value as Record<string, unknown>;
  if (typeof o._extracted_to === "string") {
    const url = ix.base + urlPath(o._extracted_to);
    return (
      <a href={url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-brand-600 hover:underline dark:text-brand-300">
        {o._extracted_to.split("/").pop()} <ExternalLink size={12} />
      </a>
    );
  }
  return (
    <dl className={cx("grid grid-cols-[minmax(90px,34%)_1fr] gap-x-3 gap-y-1 font-mono text-[11.5px]", depth > 0 && "text-[11px]")}>
      {Object.entries(o).map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="truncate text-ink-400" title={k}>
            {k}
          </dt>
          <dd className="min-w-0 text-ink-800">
            <Fields value={v} depth={depth + 1} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function DayLink({ day, children }: { day: string; children?: ReactNode }) {
  const api = useExplore();
  return (
    <button type="button" onClick={() => api.openDay(day)} className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
      {children ?? fmtDay(day)}
    </button>
  );
}

