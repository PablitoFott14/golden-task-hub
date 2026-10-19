import { useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Database, Link2, Pin, Search, Trash2 } from "lucide-react";
import { cx } from "../../lib/util";
import { pretty } from "../../lib/explore/ctx";
import { connectionsDirectory, peopleDirectory } from "../../lib/explore/related";
import { searchAll, terms } from "../../lib/explore/query";
import { useExplore } from "./context";
import { DatasetView } from "./DatasetView";
import { ItemRow, listHeight } from "./Rows";
import { Avatar, ServerMark, ServerTag, plural, useWhen } from "./bits";
import { money } from "../../lib/explore/ctx";
import { Fields } from "./Detail";

/* ------------------------------------------------------------- a server */

export function ServerView({ server, dsId }: { server: string; dsId: string | null }) {
  const api = useExplore();
  const { ix } = api;
  const info = ix.servers.find((s) => s.id === server);
  if (!info) return <Missing what="That server is not in this universe." />;
  const key = info.datasets.find((k) => k === `${server}/${dsId}`) ?? info.datasets[0];
  const ds = ix.datasets.get(key)!;
  const total = info.datasets.reduce((a, k) => a + (ix.datasets.get(k)?.items.length ?? 0), 0);
  const extras = ix.extras.get(server) ?? [];
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-ink-200/70 bg-surface px-4 pt-3">
        <div className="flex flex-wrap items-center gap-3">
          <ServerMark server={server} size={34} />
          <div className="min-w-0">
            <h1 className="font-display text-[19px] font-bold tracking-tight text-ink-950">{info.label}</h1>
            <p className="text-[12.5px] text-ink-500">
              {plural(total, "record")}
              {info.datasets.length > 1 ? ` in ${info.datasets.length} collections` : ""}
              {info.stored > total * 1.05 ? `, from ${info.stored.toLocaleString("en-US")} stored records` : ""}
              {ds.note ? ` · ${ds.note}` : ""}
            </p>
          </div>
          <span className="flex-1" />
          <a href={api.viewerHref(server)} className="inline-flex items-center gap-1 rounded-lg border border-ink-200 px-2.5 py-1.5 text-[12.5px] font-semibold text-ink-600 hover:border-ink-300 hover:bg-ink-100 hover:text-ink-900">
            Show in viewer <ArrowUpRight size={13} />
          </a>
        </div>
        <nav className="-mb-px mt-2.5 flex gap-1 overflow-x-auto [scrollbar-width:none]" aria-label={`${info.label} collections`}>
          {info.datasets.map((k) => {
            const d = ix.datasets.get(k)!;
            const on = k === key;
            return (
              <button
                key={k}
                type="button"
                onClick={() => api.openServer(server, d.id)}
                aria-current={on ? "page" : undefined}
                className={cx(
                  "whitespace-nowrap border-b-2 px-3 pb-2 pt-1 text-[13px] font-semibold transition",
                  on ? "border-[oklch(0.58_0.15_var(--h))] text-ink-950" : "border-transparent text-ink-500 hover:text-ink-900"
                )}
              >
                {d.label} <span className="ml-0.5 font-mono text-[11px] font-normal text-ink-400">{d.items.length.toLocaleString("en-US")}</span>
              </button>
            );
          })}
        </nav>
      </header>
      <DatasetView
        key={ds.key}
        ix={ix}
        ds={ds}
        aside={
          extras.length > 0 && (
            <button
              type="button"
              onClick={() => api.go((p) => p.set("r", "extras:" + server))}
              className="mx-1 mt-3 flex w-[calc(100%-0.5rem)] items-center gap-2 rounded-lg border border-dashed border-ink-300 px-3 py-2 text-left text-[12.5px] text-ink-600 hover:border-ink-400 hover:bg-ink-100"
            >
              <Database size={14} className="shrink-0 text-ink-400" />
              <span>
                Also stored here: {extras.map((x) => pretty(x.collection).toLowerCase()).join(", ")}
              </span>
            </button>
          )
        }
      />
    </div>
  );
}

/** A server's stored records that are not items of their own: profiles, institutions, channel lists. */
export function ExtrasPanel({ server, onClose }: { server: string; onClose: () => void }) {
  const api = useExplore();
  const extras = api.ix.extras.get(server) ?? [];
  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-ink-200/70 bg-surface/95 px-5 py-2.5 backdrop-blur">
        <ServerTag server={server} label={api.label(server)} />
        <span className="flex-1" />
        <button type="button" onClick={onClose} className="rounded-md px-2 py-1 text-[12.5px] font-semibold text-ink-500 hover:bg-ink-100 hover:text-ink-900">
          Close
        </button>
      </div>
      <div className="space-y-5 px-5 py-4">
        <p className="text-[12.5px] text-ink-500">The rest of what this server stores: who the account belongs to, its settings and the lists the records above refer to.</p>
        {extras.map((x) => (
          <section key={x.collection}>
            <h3 className="mono-label mb-2 text-ink-500">
              {pretty(x.collection)} <span className="font-mono text-[11px] font-normal text-ink-400">{x.rows.length}</span>
            </h3>
            <div className="space-y-2">
              {x.rows.slice(0, 300).map((r, k) => (
                <div key={k} className="rounded-lg border border-ink-200/70 p-2">
                  <Fields value={r} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------- people, connections */

export function PeopleView() {
  const api = useExplore();
  const dir = useMemo(() => peopleDirectory(api.ix), [api.ix]);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ViewHead title="People" sub="Everyone and every organization the universe names, matched across servers by address, phone, account and full name." />
      <DatasetView ix={dir.pix} ds={dir.ds} onActivate={(i) => api.openEntity(dir.pix.items[i].people[0].e)} />
    </div>
  );
}

export function ConnectionsView() {
  const api = useExplore();
  const dir = useMemo(() => connectionsDirectory(api.ix), [api.ix]);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ViewHead title="Connections" sub="References several records share: invoice and order numbers, booking codes, model numbers, file names, phone numbers, and amounts that recur outside the bank feeds." />
      <DatasetView ix={dir.pix} ds={dir.ds} onActivate={(i) => api.openIdent(dir.pix.items[i].idents[0])} />
    </div>
  );
}

export function IdentView({ d }: { d: number }) {
  const api = useExplore();
  const { ix } = api;
  const ident = ix.idents[d];
  const groups = useMemo(() => {
    const by = new Map<string, number[]>();
    for (const i of ident.items) {
      const s = ix.items[i].server;
      if (!by.has(s)) by.set(s, []);
      by.get(s)!.push(i);
    }
    for (const l of by.values()) l.sort((a, b) => (ix.items[a].at ?? 0) - (ix.items[b].at ?? 0));
    return [...by];
  }, [ix, ident]);
  const selected = api.sp.get("r");
  const kind = { code: "Reference", amount: "Amount", file: "File name", phone: "Phone number" }[ident.kind];
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <ViewHead
        count={ident.items.length}
        icon={<Link2 size={18} />}
        title={ident.label}
        sub={`${kind} in ${plural(ident.items.length, "record")} across ${plural(ident.servers.length, "server")}, in time order.`}
      />
      <div className="space-y-4 p-4">
        {groups.map(([s, ids]) => (
          <section key={s} className="overflow-hidden rounded-xl border border-ink-200/70 bg-surface">
            <div className="flex items-center gap-2 border-b border-ink-200/70 px-4 py-2">
              <ServerTag server={s} label={api.label(s)} />
              <span className="font-mono text-[11px] text-ink-400">{ids.length}</span>
            </div>
            {ids.map((i) => (
              <div key={i} style={{ height: listHeight(ix.items[i].kind) }}>
                <ItemRow ix={ix} it={ix.items[i]} terms={terms(ident.label)} selected={ix.items[i].key === selected} cursor={false} onOpen={api.openItem} />
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- search */

export function SearchView({ q }: { q: string }) {
  const api = useExplore();
  const { ix } = api;
  const res = useMemo(() => searchAll(ix, q), [ix, q]);
  const ts = terms(q);
  const selected = api.sp.get("r");
  const total = res.hits.reduce((a, h) => a + h.rows.length, 0);
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <ViewHead count={total} icon={<Search size={18} />} title={`"${q}"`} sub={total ? `${plural(total, "record")} in ${plural(new Set(res.hits.map((h) => h.ds.server)).size, "server")}` : "Nothing in this universe matches."} />
      <div className="space-y-4 p-4">
        {(res.entities.length > 0 || res.idents.length > 0) && (
          <section className="rounded-xl border border-ink-200/70 bg-surface p-4">
            {res.entities.length > 0 && (
              <>
                <h3 className="mono-label mb-2 text-ink-500">People and organizations</h3>
                <div className="flex flex-wrap gap-1.5">
                  {res.entities.slice(0, 24).map((e) => (
                    <button key={e} type="button" onClick={() => api.openEntity(e)} className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 py-1 pl-1 pr-2.5 text-[13px] hover:bg-ink-100">
                      <Avatar name={ix.entities[e].name} size={22} />
                      <span className="font-medium text-ink-800">{ix.entities[e].name}</span>
                      <span className="text-[11px] text-ink-400">{plural(Object.keys(ix.entities[e].servers).length, "server")}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {res.idents.length > 0 && (
              <>
                <h3 className={cx("mono-label mb-2 text-ink-500", res.entities.length > 0 && "mt-4")}>Shared references</h3>
                <div className="flex flex-wrap gap-1.5">
                  {res.idents.slice(0, 24).map((d) => (
                    <button key={d} type="button" onClick={() => api.openIdent(d)} className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-2.5 py-1 text-[13px] hover:bg-ink-100">
                      <Link2 size={13} className="text-ink-400" />
                      <span className="font-mono font-medium text-ink-800">{ix.idents[d].label}</span>
                      <span className="text-[11px] text-ink-400">{plural(ix.idents[d].servers.length, "server")}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
        {res.hits.map((h) => (
          <section key={h.ds.key} className="overflow-hidden rounded-xl border border-ink-200/70 bg-surface">
            <div className="flex items-center gap-2 border-b border-ink-200/70 px-4 py-2">
              <ServerTag server={h.ds.server} label={api.label(h.ds.server)} />
              <span className="text-[12.5px] font-semibold text-ink-700">{h.ds.label}</span>
              <span className="font-mono text-[11px] text-ink-400">{h.rows.length}</span>
              <span className="flex-1" />
              <button type="button" onClick={() => api.openServer(h.ds.server, h.ds.id, { q: [q] })} className="text-[12.5px] font-semibold text-brand-600 hover:underline dark:text-brand-300">
                {h.rows.length > 5 ? `All ${h.rows.length}, with filters` : "Open with filters"}
              </button>
            </div>
            {h.rows.slice(0, 5).map((i) => (
              <div key={i} style={{ height: listHeight(ix.items[i].kind) }}>
                <ItemRow ix={ix} it={ix.items[i]} terms={ts} selected={ix.items[i].key === selected} cursor={false} onOpen={api.openItem} />
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- pinned */

/** The records set aside while building a task, in the order they were
 *  pinned, and all of them as one text to paste into the task's notes. */
export function PinnedView() {
  const api = useExplore();
  const { ix } = api;
  const when = useWhen();
  const [copied, setCopied] = useState(false);
  const ids = api.pins.map((k) => ix.byKey.get(k)).filter((i): i is number => i !== undefined);
  const selected = api.sp.get("r");
  const text = () =>
    [
      `${ix.persona.name.replace(/[.\s]+$/, "")}: ${plural(ids.length, "pinned record")}`,
      "",
      ...ids.map((i, k) => {
        const it = ix.items[i];
        return [
          `${k + 1}. ${api.label(it.server)}${ix.datasets.get(it.ds) && ix.datasets.get(it.ds)!.label !== api.label(it.server) ? `, ${ix.datasets.get(it.ds)!.label}` : ""}${it.at !== null ? ` · ${when.full(it)}` : ""}`,
          `   ${it.title}`,
          ...(it.sub ? [`   ${it.sub}`] : []),
          ...(it.amount !== null ? [`   ${money(it.amount, true)}`] : []),
        ].join("\n");
      }),
    ].join("\n");
  const copy = async () => {
    const t = text();
    try {
      await navigator.clipboard.writeText(t);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = t;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <ViewHead icon={<Pin size={18} />} title="Pinned" sub={ids.length ? `${plural(ids.length, "record")} set aside, from ${plural(new Set(ids.map((i) => ix.items[i].server)).size, "server")}. Kept on this device.` : "Nothing pinned yet."}>
        {ids.length > 0 && (
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={copy} className="btn-ghost px-3 py-1.5 text-[13px]">
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy as text"}
            </button>
            <button type="button" onClick={api.clearPins} className="btn-ghost px-3 py-1.5 text-[13px]">
              <Trash2 size={14} /> Clear
            </button>
          </div>
        )}
      </ViewHead>
      {ids.length ? (
        <div className="bg-surface">
          {ids.map((i) => (
            <div key={i} style={{ height: listHeight(ix.items[i].kind) }}>
              <ItemRow ix={ix} it={ix.items[i]} terms={[]} selected={ix.items[i].key === selected} cursor={false} onOpen={api.openItem} showServer />
            </div>
          ))}
        </div>
      ) : (
        <p className="max-w-xl px-5 py-6 text-[13.5px] leading-relaxed text-ink-600">
          Open any record and press Pin. Pinned records from every server gather here, in the order you pinned them, and copy out as one text: a quick way to hold the evidence a task stands on while you look for the rest.
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- shared */

export function ViewHead({ title, sub, icon, children, count }: { title: string; sub?: string; icon?: ReactNode; children?: ReactNode; count?: number }) {
  return (
    <header className="border-b border-ink-200/70 bg-surface px-4 py-3">
      <div className="flex items-center gap-3">
        {icon && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[oklch(0.95_0.035_var(--h))] text-[oklch(0.42_0.12_var(--h))] dark:bg-[oklch(0.3_0.05_var(--h))] dark:text-[oklch(0.86_0.08_var(--h))]">{icon}</span>}
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-[19px] font-bold tracking-tight text-ink-950">{title}</h1>
          {sub && (
            <p className="text-[12.5px] text-ink-500" data-count={count}>
              {sub}
            </p>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}

export function Missing({ what }: { what: string }) {
  const api = useExplore();
  return (
    <div className="grid flex-1 place-content-center justify-items-center gap-2 p-8 text-center">
      <b className="text-ink-900">{what}</b>
      <button type="button" onClick={() => api.go(() => {}, { fresh: true })} className="btn-ghost px-3 py-1.5 text-[13px]">
        Back to the overview
      </button>
    </div>
  );
}
