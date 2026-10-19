import { memo, type ReactNode } from "react";
import { ArrowDown, ArrowUp, FileText, Image as ImageIcon, Paperclip, Reply, UserRound } from "lucide-react";
import { cx } from "../../lib/util";
import { money } from "../../lib/explore/ctx";
import { fmtShortDay, weekdayName } from "../../lib/explore/time";
import type { Column, Dataset, ExploreIndex, Item, RowKind } from "../../lib/explore/types";
import type { Row } from "../../lib/explore/query";
import { Amount, Avatar, Highlight, ServerIcon, ServerMark, snippet, useWhen } from "./bits";

/** Row heights per kind, for the virtual list. */
const HEIGHT: Partial<Record<RowKind, number>> = {
  email: 78,
  message: 62,
  conversation: 62,
  event: 60,
  txn: 52,
  file: 56,
  post: 76,
  comment: 58,
  account: 54,
  contact: 58,
  listing: 64,
  activity: 56,
  reminder: 58,
  trip: 58,
  record: 62,
  table: 40,
  health: 40,
};
export const HEAD_HEIGHT = 34;
export const rowHeight = (kind: RowKind) => HEIGHT[kind] ?? 52;
/** A row outside its own table (a search hit, a day, a person's records) is a list row. */
export const listHeight = (kind: RowKind) => rowHeight(kind === "table" || kind === "health" ? "record" : kind);

export const isTable = (ds: Dataset) => (ds.row === "table" || ds.row === "health") && !!ds.columns?.length;

/* ------------------------------------------------------------ list rows */

export const ItemRow = memo(function ItemRow({
  ix,
  it,
  terms,
  selected,
  cursor,
  onOpen,
  showServer,
}: {
  ix: ExploreIndex;
  it: Item;
  terms: string[];
  selected: boolean;
  cursor: boolean;
  onOpen: (i: number) => void;
  showServer?: boolean;
}) {
  const when = useWhen();
  const kind = it.kind;
  let body: ReactNode;
  const right = (
    <span className="ml-3 flex shrink-0 flex-col items-end gap-0.5 text-right">
      {it.amount !== null && kind !== "account" && kind !== "contact" ? <Amount value={it.amount} className="text-[13.5px] font-semibold" /> : null}
      <span className="whitespace-nowrap font-mono text-[11.5px] text-ink-400">
        {kind === "event" || kind === "reminder" ? when.time(it) || (it.allDay ? "All day" : "") : when.short(it)}
      </span>
    </span>
  );
  const line = (a: ReactNode, b?: ReactNode, c?: ReactNode) => (
    <span className="flex min-w-0 flex-1 flex-col justify-center">
      <span className="flex min-w-0 items-center gap-1.5 text-[13.5px] font-semibold text-ink-900">{a}</span>
      {b !== undefined && b !== "" && <span className="truncate text-[12.5px] text-ink-500">{b}</span>}
      {c !== undefined && c !== "" && <span className="truncate text-[12.5px] text-ink-400">{c}</span>}
    </span>
  );
  const title = <Highlight text={it.title} terms={terms} className="truncate" />;
  const thumb = it.media.find((m) => m.kind === "image" && m.url);

  switch (kind) {
    case "email": {
      const unread = it.f.status === "Unread";
      body = (
        <>
          <span className={cx("mt-1.5 h-2 w-2 shrink-0 self-start rounded-full", unread ? "bg-[oklch(0.58_0.15_var(--h))]" : "bg-transparent")} aria-label={unread ? "Unread" : undefined} />
          <span className="flex min-w-0 flex-1 flex-col justify-center">
            <span className="flex min-w-0 items-center gap-1.5 text-[13px] text-ink-600">
              {it.f.folder === "Sent" && <Reply size={12} className="shrink-0 text-ink-400" aria-label="Sent" />}
              <Highlight text={it.f.folder === "Sent" ? `To ${(it.people.filter((p) => p.role === "to").map((p) => ix.entities[p.e]?.name).join(", ")) || "recipients"}` : it.sub} terms={terms} className={cx("truncate", unread && "font-semibold text-ink-900")} />
              {it.n.thread > 1 && <span className="shrink-0 rounded bg-ink-100 px-1 font-mono text-[10.5px] text-ink-500">{it.n.thread}</span>}
              {it.media.length > 0 && <Paperclip size={12} className="shrink-0 text-ink-400" aria-label={`${it.media.length} attachments`} />}
            </span>
            <span className={cx("truncate text-[13.5px] text-ink-900", unread ? "font-bold" : "font-semibold")}>{title}</span>
            <span className="truncate text-[12.5px] text-ink-400">
              <Highlight text={snippet(it.text, terms, 150)} terms={terms} />
            </span>
          </span>
        </>
      );
      break;
    }
    case "message":
    case "comment": {
      body = (
        <>
          <Avatar name={it.title} size={30} className="self-start" />
          {line(
            <>
              <Highlight text={it.title} terms={terms} className="truncate" />
              <span className="truncate text-[12px] font-normal text-ink-400">{it.sub}</span>
              {it.media.length > 0 && <Paperclip size={12} className="shrink-0 text-ink-400" />}
              {it.f.state === "Unsent" && <span className="shrink-0 rounded bg-rose-500/10 px-1 text-[10.5px] font-semibold text-rose-700 dark:text-rose-300">Unsent</span>}
            </>,
            <Highlight text={snippet(it.text, terms, 170) || (it.media.length ? it.media.map((m) => m.name).join(", ") : "")} terms={terms} />
          )}
        </>
      );
      break;
    }
    case "event": {
      body = (
        <>
          <DateBlock day={it.day} />
          {line(
            title,
            [when.time(it) && it.end ? `${when.time(it)} to ${it.end ? new Date(it.end).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: ix.tz }) : ""}` : it.allDay ? "All day" : "", it.sub].filter(Boolean).join(" · "),
            it.people.filter((p) => p.e !== ix.self && p.role === "with").length ? `With ${it.people.filter((p) => p.e !== ix.self && p.role === "with").map((p) => ix.entities[p.e]?.name).join(", ")}` : undefined
          )}
        </>
      );
      break;
    }
    case "reminder": {
      body = (
        <>
          <DateBlock day={it.day} />
          {line(
            <>
              {title}
              {it.f.done === "Completed" && <span className="shrink-0 rounded bg-emerald-500/10 px-1 text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-300">Done</span>}
            </>,
            <Highlight text={snippet(it.text, terms, 150)} terms={terms} />,
            it.sub
          )}
        </>
      );
      break;
    }
    case "file": {
      body = (
        <>
          {thumb ? (
            <img src={thumb.url!} alt="" loading="lazy" className="h-10 w-10 shrink-0 rounded-md border border-ink-200 object-cover" />
          ) : (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-100 text-ink-500">
              {it.media[0]?.kind === "image" ? <ImageIcon size={16} /> : <FileText size={16} />}
            </span>
          )}
          {line(title, it.sub || "(top level)")}
          <span className="ml-3 flex shrink-0 flex-col items-end text-right font-mono text-[11.5px] text-ink-400">
            <span>{it.n.size !== undefined ? `${it.n.size.toLocaleString("en-US")} KB` : ""}</span>
            <span>{when.short(it)}</span>
          </span>
        </>
      );
      return <RowShell it={it} selected={selected} cursor={cursor} onOpen={onOpen} showServer={showServer}>{body}</RowShell>;
    }
    case "post":
    case "listing": {
      body = (
        <>
          {thumb ? (
            <img src={thumb.url!} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-md border border-ink-200 object-cover" />
          ) : (
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-100 text-ink-400">
              <ServerIcon server={it.server} size={18} />
            </span>
          )}
          {line(title, it.sub, kind === "post" && it.n.comments ? `${it.n.comments} comments` : <Highlight text={snippet(it.text, terms, 110)} terms={terms} />)}
        </>
      );
      break;
    }
    case "contact":
    case "account": {
      const e = it.people[0]?.e;
      const ent = e !== undefined ? ix.entities[e] : undefined;
      body = (
        <>
          <Avatar name={it.title} size={32} />
          {line(title, <Highlight text={it.sub} terms={terms} />)}
          {ent && kind === "contact" ? (
            <span className="ml-3 flex shrink-0 items-center gap-1 text-ink-400" title={Object.entries(ent.servers).map(([s, n]) => `${ix.servers.find((x) => x.id === s)?.label ?? s} ${n}`).join(", ")}>
              {Object.keys(ent.servers)
                .slice(0, 7)
                .map((s) => (
                  <ServerIcon key={s} server={s} size={13} />
                ))}
              {Object.keys(ent.servers).length > 7 && <span className="font-mono text-[11px]">+{Object.keys(ent.servers).length - 7}</span>}
              <span className="ml-1 font-mono text-[11.5px] tabular-nums">{ent.items.length}</span>
            </span>
          ) : it.amount !== null ? (
            <Amount value={it.amount} className="ml-3 text-[13.5px] font-semibold" />
          ) : it.n.reach ? (
            <span className="ml-3 shrink-0 rounded bg-ink-100 px-1.5 py-0.5 text-[11px] font-medium text-ink-500">{it.n.reach} other servers</span>
          ) : null}
        </>
      );
      return <RowShell it={it} selected={selected} cursor={cursor} onOpen={onOpen} showServer={showServer}>{body}</RowShell>;
    }
    default: {
      body = line(title, <Highlight text={it.sub} terms={terms} />, it.text && kind !== "txn" ? <Highlight text={snippet(it.text, terms, 140)} terms={terms} /> : undefined);
    }
  }
  return (
    <RowShell it={it} selected={selected} cursor={cursor} onOpen={onOpen} showServer={showServer}>
      {body}
      {right}
    </RowShell>
  );
});

function RowShell({ it, selected, cursor, onOpen, showServer, children }: { it: Item; selected: boolean; cursor: boolean; onOpen: (i: number) => void; showServer?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(it.i)}
      data-item={it.key}
      aria-current={selected ? "true" : undefined}
      className={cx(
        "flex h-full w-full items-center gap-3 border-b border-ink-200/60 px-4 text-left transition-colors focus-visible:outline-none",
        selected ? "bg-[oklch(0.96_0.03_var(--h))] dark:bg-[oklch(0.27_0.04_var(--h))]" : cursor ? "bg-ink-100" : "hover:bg-ink-100/70",
        cursor && "shadow-[inset_3px_0_0_oklch(0.58_0.15_var(--h))]"
      )}
    >
      {showServer && <ServerMark server={it.server} size={26} />}
      {children}
    </button>
  );
}

function DateBlock({ day }: { day: string | null }) {
  if (!day) return <span className="w-10 shrink-0" />;
  return (
    <span className="flex w-10 shrink-0 flex-col items-center rounded-md border border-ink-200 bg-surface py-0.5 leading-none">
      <span className="text-[10px] font-semibold uppercase text-[oklch(0.5_0.14_var(--h))] dark:text-[oklch(0.78_0.11_var(--h))]">{weekdayName(day)}</span>
      <span className="mt-0.5 text-[15px] font-bold text-ink-900">{Number(day.slice(8, 10))}</span>
      <span className="mt-0.5 text-[9.5px] text-ink-400">{fmtShortDay(day).split(" ")[0]}</span>
    </span>
  );
}

export function GroupHead({ ix, row, onEntity }: { ix: ExploreIndex; row: Extract<Row, { kind: "head" }>; onEntity: (e: number) => void }) {
  return (
    <div className="flex h-full items-end gap-2 border-b border-ink-200 bg-ink-50 px-4 pb-1.5 text-[12px]">
      <span className="truncate font-semibold text-ink-700">{row.label || "Not set"}</span>
      <span className="font-mono text-[11px] text-ink-400">{row.count.toLocaleString("en-US")}</span>
      {row.sum !== null && <span className={cx("font-mono text-[11.5px] tabular-nums", row.sum > 0 ? "text-emerald-700 dark:text-emerald-300" : "text-ink-500")}>{money(row.sum, true)}</span>}
      <span className="flex-1" />
      {row.entity !== null && ix.entities[row.entity] && (
        <button type="button" onClick={() => onEntity(row.entity!)} className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline dark:text-brand-300">
          <UserRound size={12} /> Profile
        </button>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- tables */

export function columnWidths(cols: Column[]): string {
  return cols.map((c, i) => (i === 0 && !c.num ? "minmax(200px, 1.6fr)" : c.wrap ? "minmax(220px, 2fr)" : c.num ? "minmax(84px, 0.6fr)" : "minmax(130px, 1fr)")).join(" ");
}
export const tableMinWidth = (cols: Column[]) => cols.reduce((a, c, i) => a + (i === 0 && !c.num ? 200 : c.wrap ? 220 : c.num ? 84 : 130), 0) + 32;

export function TableHead({ ds, sort, onSort, lead }: { ds: Dataset; sort: string; onSort: (id: string) => void; lead?: string }) {
  const cols = tableCols(ds, lead);
  return (
    <div className="grid h-full items-center gap-3 border-b border-ink-200 bg-ink-50 px-4 text-[11.5px] font-semibold text-ink-500" style={{ gridTemplateColumns: columnWidths(cols) }}>
      {cols.map((c) => {
        const id = `col:${c.id}`;
        const on = sort === `${id}:asc` ? 1 : sort === `${id}:desc` ? -1 : 0;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSort(on === -1 ? `${id}:asc` : `${id}:desc`)}
            className={cx("flex min-w-0 items-center gap-1 truncate text-left hover:text-ink-900", c.num && "justify-end", on !== 0 && "text-ink-900")}
            title={`Sort by ${c.label}`}
          >
            <span className="truncate">{c.label}</span>
            {on === 1 && <ArrowUp size={11} className="shrink-0" />}
            {on === -1 && <ArrowDown size={11} className="shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}

/** Table columns with the row's own date first when the table has none of its own. */
export function tableCols(ds: Dataset, lead?: string): Column[] {
  const cols = ds.columns ?? [];
  if (ds.row === "health") return [{ id: "__day", label: lead ?? "Day", get: (it) => it.title }, ...cols];
  return cols;
}

export const TableRow = memo(function TableRow({ ds, it, terms, selected, cursor, onOpen }: { ds: Dataset; it: Item; terms: string[]; selected: boolean; cursor: boolean; onOpen: (i: number) => void }) {
  const cols = tableCols(ds);
  return (
    <button
      type="button"
      onClick={() => onOpen(it.i)}
      data-item={it.key}
      aria-current={selected ? "true" : undefined}
      className={cx(
        "grid h-full w-full items-center gap-3 border-b border-ink-200/60 px-4 text-left text-[12.5px] transition-colors",
        selected ? "bg-[oklch(0.96_0.03_var(--h))] dark:bg-[oklch(0.27_0.04_var(--h))]" : cursor ? "bg-ink-100" : "hover:bg-ink-100/70",
        cursor && "shadow-[inset_3px_0_0_oklch(0.58_0.15_var(--h))]"
      )}
      style={{ gridTemplateColumns: columnWidths(cols) }}
    >
      {cols.map((c, k) => {
        const v = c.get(it);
        const text = v === null ? "" : typeof v === "number" ? (c.money ? money(v) : v.toLocaleString("en-US")) : String(v);
        return (
          <span key={c.id} className={cx("min-w-0 truncate", c.num ? "text-right font-mono tabular-nums text-ink-700" : k === 0 ? "font-semibold text-ink-900" : "text-ink-600", v === null && "text-ink-300")}>
            {v === null ? "·" : <Highlight text={text} terms={terms} />}
          </span>
        );
      })}
    </button>
  );
});
