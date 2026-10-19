import { useDeferredValue, useMemo, useState } from "react";
import { AtSign, Mail, MapPin, Phone, Search, UserRound } from "lucide-react";
import { cx } from "../../lib/util";
import { fmtPhone } from "../../lib/explore/people";
import { docMentions, roleLabel, sameDomain, together } from "../../lib/explore/related";
import { matches, terms } from "../../lib/explore/query";
import { fmtDay, fmtMonth } from "../../lib/explore/time";
import type { Entity } from "../../lib/explore/types";
import { useExplore } from "./context";
import { Avatar, EntityChip, Highlight, ServerIcon, plural, tint } from "./bits";
import { TimeStrip } from "./TimeStrip";
import { VirtualList } from "./VirtualList";
import { GroupHead, HEAD_HEIGHT, ItemRow, listHeight } from "./Rows";
import type { Row } from "../../lib/explore/query";

/**
 * One person or organization across the whole universe: who they are, every
 * record that involves them on every server, in time order, who they turn up
 * with, and what the persona's own notes say about them.
 */
export function EntityView({ e }: { e: number }) {
  const api = useExplore();
  const { ix } = api;
  const ent = ix.entities[e];
  const [server, setServer] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);
  const [range, setRange] = useState<[string | null, string | null]>([null, null]);
  const ts = useMemo(() => terms(dq), [dq]);
  const roleOf = (i: number) => ix.items[i].people.find((p) => p.e === e)?.role ?? "mentioned";
  const roles = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of ent.items) m.set(roleOf(i), (m.get(roleOf(i)) ?? 0) + 1);
    return [...m].sort((a, b) => b[1] - a[1]);
  }, [ent]);
  const rows = useMemo(() => {
    const out = ent.items.filter((i) => {
      const it = ix.items[i];
      if (server && it.server !== server) return false;
      if (role && roleOf(i) !== role) return false;
      if (ts.length && !matches(it, ts)) return false;
      if ((range[0] || range[1]) && (!it.day || (range[0] && it.day < range[0]) || (range[1] && it.day > range[1]))) return false;
      return true;
    });
    return out.sort((a, b) => (ix.items[b].at ?? -Infinity) - (ix.items[a].at ?? -Infinity));
  }, [ix, ent, server, role, ts, range]);
  const grouped: Row[] = useMemo(() => {
    const out: Row[] = [];
    let cur = "";
    let head: Extract<Row, { kind: "head" }> | null = null;
    for (const i of rows) {
      const m = ix.items[i].day?.slice(0, 7) ?? "";
      if (m !== cur || !head) {
        cur = m;
        head = { kind: "head", key: m, label: m ? fmtMonth(m) : "Undated", count: 0, sum: null, entity: null };
        out.push(head);
      }
      head.count++;
      out.push({ kind: "item", i });
    }
    return out;
  }, [ix, rows]);
  const often = useMemo(() => together(ix, ent), [ix, ent]);
  const domain = useMemo(() => sameDomain(ix, ent), [ix, ent]);
  const notes = useMemo(() => docMentions(ix, ent.kind === "self" ? [] : [ent.name]), [ix, ent]);
  const selected = api.sp.get("r");
  const servers = Object.entries(ent.servers).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="space-y-3 border-b border-ink-200/70 bg-surface px-4 py-4">
          <div className="flex items-start gap-3.5">
            <Avatar name={ent.name} size={52} />
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-ink-950">{ent.name}</h1>
              <p className="mt-0.5 text-[13px] text-ink-600">
                {[kindLabel(ent), ent.job, ent.city].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-0.5 text-[12.5px] text-ink-500">
                {plural(ent.items.length, "record")} in {plural(servers.length, "server")}
                {ent.first !== null && ent.last !== null && ent.first !== ent.last ? `, ${fmtDay(api.clock.day(ent.first))} to ${fmtDay(api.clock.day(ent.last))}` : ""}
              </p>
            </div>
          </div>
          <Identity ent={ent} />
          {ent.note && <p className="max-w-3xl text-[13px] leading-relaxed text-ink-700">{ent.note}</p>}
          <div className="flex flex-wrap gap-1.5">
            <ServerFilter active={server === null} onClick={() => setServer(null)} label="Every server" n={ent.items.length} />
            {servers.map(([s, n]) => (
              <ServerFilter key={s} server={s} active={server === s} onClick={() => setServer(server === s ? null : s)} label={api.label(s)} n={n} />
            ))}
          </div>
          {roles.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
              <span className="text-ink-400">As</span>
              {roles.map(([r, n]) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(role === r ? null : r)}
                  aria-pressed={role === r}
                  className={cx("rounded-full border px-2 py-0.5 font-medium", role === r ? "border-[oklch(0.7_0.1_var(--h))] bg-[oklch(0.96_0.03_var(--h))] text-[oklch(0.36_0.1_var(--h))] dark:bg-[oklch(0.28_0.04_var(--h))] dark:text-[oklch(0.9_0.06_var(--h))]" : "border-ink-200 text-ink-600 hover:bg-ink-100")}
                >
                  {roleLabel(r)} <span className="font-mono text-[10.5px] text-ink-400">{n}</span>
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <label className="relative min-w-[180px] flex-1">
              <Search size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
              <input
                data-primary-search
                type="search"
                value={q}
                onChange={(ev) => setQ(ev.target.value)}
                placeholder={`Search ${ent.name}'s records`}
                className="w-full rounded-lg border border-ink-200 bg-ink-50 py-1.5 pl-8 pr-2.5 text-[13.5px] text-ink-900 placeholder:text-ink-400 focus:border-[oklch(0.7_0.1_var(--h))] focus:bg-surface focus:outline-none"
              />
            </label>
            <span className="shrink-0 text-[12.5px] text-ink-500" data-count={rows.length}>
              {plural(rows.length, "record")}
            </span>
          </div>
          <TimeStrip ix={ix} all={ent.items} rows={rows} from={range[0]} to={range[1]} onRange={(a, b) => setRange([a, b])} height={44} nowDay={ix.persona.now?.slice(0, 10)} />
        </header>
        <VirtualList
          rows={grouped}
          height={(r) => (r.kind === "head" ? HEAD_HEIGHT : listHeight(ix.items[r.i].kind))}
          resetKey={`${e}|${server}|${role}|${dq}|${range.join()}`}
          className="flex-1 bg-surface"
          render={(r) => (r.kind === "head" ? <GroupHead ix={ix} row={r} onEntity={api.openEntity} /> : <ItemRow ix={ix} it={ix.items[r.i]} terms={ts} selected={ix.items[r.i].key === selected} cursor={false} onOpen={api.openItem} showServer />)}
        />
      </div>

      {!selected && (
        <aside className="hidden w-[340px] shrink-0 space-y-5 overflow-y-auto border-l border-ink-200/70 bg-surface px-4 py-4 xl:block">
          {often.length > 0 && (
            <div>
              <h3 className="mono-label mb-2 text-ink-500">Turns up with</h3>
              <div className="flex flex-wrap gap-1.5">
                {often.map(({ e: o, n }) => (
                  <EntityChip key={o} e={o} size="sm" extra={<span className="font-mono text-[10.5px] text-ink-400">{n}</span>} />
                ))}
              </div>
            </div>
          )}
          {domain.length > 0 && (
            <div>
              <h3 className="mono-label mb-2 text-ink-500">Same address domain, {ent.domain}</h3>
              <div className="flex flex-wrap gap-1.5">
                {domain.slice(0, 20).map((o) => (
                  <EntityChip key={o} e={o} size="sm" />
                ))}
              </div>
            </div>
          )}
          {notes.length > 0 && (
            <div>
              <h3 className="mono-label mb-2 text-ink-500">In the persona's notes</h3>
              <ul className="space-y-2.5">
                {notes.map((n, k) => (
                  <li key={k} className="rounded-lg border border-ink-200/70 bg-raised p-2.5 text-[12.5px] leading-relaxed text-ink-700">
                    <div className="mb-1 text-[11px] font-semibold text-ink-400">
                      {n.doc} · {n.heading}
                    </div>
                    <Highlight text={n.text} terms={[ent.name.toLowerCase()]} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

const kindLabel = (e: Entity) => (e.kind === "self" ? "The persona" : e.kind === "org" ? "Organization" : e.kind === "person" ? (e.inContacts ? "In contacts" : "Person") : "");

function Identity({ ent }: { ent: Entity }) {
  const bits = [
    ...ent.emails.map((m) => ({ icon: <Mail size={13} />, text: m })),
    ...ent.phones.map((p) => ({ icon: <Phone size={13} />, text: fmtPhone(p) })),
    ...ent.handles.map((h) => ({ icon: <AtSign size={13} />, text: `${h.label}` })),
    ...(ent.address ? [{ icon: <MapPin size={13} />, text: ent.address }] : []),
  ];
  if (!bits.length) return null;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-ink-600">
      {bits.slice(0, 12).map((b, k) => (
        <span key={k} className="inline-flex min-w-0 items-center gap-1.5">
          <span className="text-ink-400">{b.icon}</span>
          <span className="truncate">{b.text}</span>
        </span>
      ))}
    </div>
  );
}

function ServerFilter({ server, label, n, active, onClick }: { server?: string; label: string; n: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={server ? tint(server) : undefined}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[12.5px] font-semibold transition",
        active
          ? server
            ? "border-[oklch(0.75_0.08_var(--t))] bg-[oklch(0.95_0.03_var(--t))] text-[oklch(0.38_0.11_var(--t))] dark:border-[oklch(0.5_0.08_var(--t))] dark:bg-[oklch(0.3_0.05_var(--t))] dark:text-[oklch(0.88_0.08_var(--t))]"
            : "border-ink-400 bg-ink-100 text-ink-900"
          : "border-ink-200 text-ink-600 hover:bg-ink-100"
      )}
    >
      {server ? <ServerIcon server={server} size={13} /> : <UserRound size={13} />}
      {label}
      <span className="font-mono text-[11px] font-normal opacity-70">{n}</span>
    </button>
  );
}

