import type { Dataset, Entity, ExploreIndex, Ident, Item } from "./types";
import { groupFacet, pretty, SORT_TITLE, sortNum } from "./ctx";

/**
 * What a record, a person or a day connects to. All of it is read off the
 * index: nothing here guesses beyond what `build.ts` linked.
 */

export interface Related {
  people: { e: number; roles: string[] }[];
  linked: { why: string; items: number[] }[];
  shared: { ident: Ident; others: number[] }[];
  sameDay: number[];
  /** Records within three days that involve someone this one does. */
  nearby: number[];
}

const ROLE_LABEL: Record<string, string> = {
  from: "From",
  to: "To",
  cc: "Cc",
  with: "With",
  author: "Author",
  member: "Member",
  merchant: "Merchant",
  payee: "Payee",
  mentioned: "Mentioned",
  contact: "Contact",
  seller: "Seller",
  commenter: "Commented",
  account: "Account",
  participant: "In the conversation",
  passenger: "Traveler",
  field: "Named in the record",
};
export const roleLabel = (r: string) => ROLE_LABEL[r] ?? pretty(r);

export function related(ix: ExploreIndex, it: Item): Related {
  const people: Related["people"] = [];
  for (const p of it.people) {
    if (p.e === ix.self) continue;
    const have = people.find((x) => x.e === p.e);
    if (have) {
      if (!have.roles.includes(p.role)) have.roles.push(p.role);
    } else people.push({ e: p.e, roles: [p.role] });
  }
  const linkedMap = new Map<string, number[]>();
  for (const l of it.links) {
    if (!linkedMap.has(l.why)) linkedMap.set(l.why, []);
    const list = linkedMap.get(l.why)!;
    if (!list.includes(l.to)) list.push(l.to);
  }
  const linked = [...linkedMap].map(([why, items]) => ({ why, items: items.sort((a, b) => (ix.items[a].at ?? 0) - (ix.items[b].at ?? 0)) }));
  const shared = it.idents.map((d) => ({ ident: ix.idents[d], others: ix.idents[d].items.filter((i) => i !== it.i) })).filter((s) => s.others.length);
  shared.sort((a, b) => b.ident.servers.length - a.ident.servers.length || a.others.length - b.others.length);
  const sameDay = it.day ? (ix.days.get(it.day) ?? []).filter((i) => i !== it.i) : [];
  const near = new Map<number, number>();
  const linkedSet = new Set(it.links.map((l) => l.to));
  if (it.at !== null) {
    for (const { e } of people) {
      const ent = ix.entities[e];
      if (ent.items.length > 2500) continue;
      for (const i of ent.items) {
        const o = ix.items[i];
        if (i === it.i || o.at === null || linkedSet.has(i) || (o.thread && o.thread === it.thread)) continue;
        const dt = Math.abs(o.at - it.at);
        if (dt <= 3 * 86_400_000) near.set(i, Math.min(near.get(i) ?? Infinity, dt));
      }
    }
  }
  const nearby = [...near].sort((a, b) => a[1] - b[1]).slice(0, 12).map(([i]) => i);
  return { people, linked, shared, sameDay, nearby };
}

/** People who share records with an entity, most shared first. */
export function together(ix: ExploreIndex, e: Entity, limit = 12): { e: number; n: number }[] {
  const n = new Map<number, number>();
  for (const i of e.items) {
    const seen = new Set<number>();
    for (const p of ix.items[i].people) {
      if (p.e === e.i || p.e === ix.self || seen.has(p.e)) continue;
      seen.add(p.e);
      n.set(p.e, (n.get(p.e) ?? 0) + 1);
    }
  }
  return [...n].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([x, c]) => ({ e: x, n: c }));
}

/** Others at the same organization's domain: Dana at piedmontgrain.com and the company's orders address. */
export function sameDomain(ix: ExploreIndex, e: Entity): number[] {
  if (!e.domain) return [];
  return ix.entities.filter((x) => x.i !== e.i && x.domain === e.domain && x.items.length).map((x) => x.i);
}

/* ----------------------------------------------------------- the notes */

export interface Snippet {
  doc: string;
  heading: string;
  text: string;
}

/** Strips the markdown a line carries, so no `**` or `##` reaches the page. */
export const plainLine = (raw: string) =>
  (/^\s*\|/.test(raw)
    ? raw
        .replace(/^\s*\||\|\s*$/g, "")
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean)
        .join(" · ")
    : raw
  )
    .replace(/^\s*(#+|[-*+]|\d+\.)\s+/, "")
    .replace(/\*\*|__|`/g, "")
    .replace(/(^|\W)[*_](\S[^*_]*\S|\S)[*_](?=\W|$)/g, "$1$2")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

/** Where the persona's notes name someone: the line, and the heading it sits under. */
export function docMentions(ix: ExploreIndex, names: string[], limit = 14): Snippet[] {
  const want = names.filter((n) => n && n.length >= 3).map((n) => n.toLowerCase());
  if (!want.length) return [];
  const out: Snippet[] = [];
  for (const d of ix.docs) {
    let heading = d.label;
    for (const raw of d.text.split(/\n/)) {
      const line = raw.trim();
      if (/^#{1,4}\s/.test(line)) {
        heading = plainLine(line);
        continue;
      }
      // A table's rule row, | --- | --- |, says nothing.
      if (/^\|?[\s:|-]+\|?$/.test(line)) continue;
      const low = line.toLowerCase();
      if (!want.some((w) => wordIn(low, w))) continue;
      const text = plainLine(line);
      if (text.length < 12) continue;
      out.push({ doc: d.label, heading, text: text.length > 320 ? text.slice(0, 317) + "…" : text });
      if (out.length >= limit) return out;
    }
  }
  return out;
}

const wordIn = (hay: string, w: string) => {
  let k = hay.indexOf(w);
  while (k >= 0) {
    const a = hay[k - 1];
    const b = hay[k + w.length];
    if ((!a || !/\w/.test(a)) && (!b || !/\w/.test(b))) return true;
    k = hay.indexOf(w, k + 1);
  }
  return false;
};

/* ------------------------------------------- directories as datasets */

/**
 * The People and Connections directories reuse the dataset view: each entity
 * or shared reference becomes a stand-in item in an index of its own, and the
 * same facets, sorting and search apply.
 */
export function peopleDirectory(ix: ExploreIndex): { pix: ExploreIndex; ds: Dataset } {
  const label = (s: string) => ix.servers.find((x) => x.id === s)?.label ?? pretty(s);
  const items: Item[] = [];
  const shown = ix.entities.filter((e) => e.items.length);
  for (const e of shown) {
    const servers = Object.keys(e.servers);
    items.push({
      i: items.length,
      key: "people/" + e.key,
      server: "people",
      ds: "people/all",
      kind: "contact",
      title: e.name,
      sub: [e.job, e.emails[0], e.city].filter(Boolean).join(" · "),
      text: e.note,
      at: e.last,
      end: null,
      day: null,
      allDay: false,
      amount: null,
      people: [{ e: e.i, role: "contact" }],
      f: {
        kind: e.kind === "self" ? "The persona" : e.kind === "person" ? "Person" : e.kind === "org" ? "Organization" : "Not clear",
        contacts: e.inContacts ? "In contacts" : "Not in contacts",
        servers: servers.map(label),
        reach: servers.length >= 4 ? "4 or more servers" : servers.length === 1 ? "1 server" : `${servers.length} servers`,
      },
      n: { reach: servers.length, count: e.items.length, ...(e.last !== null ? { last: e.last } : {}) },
      media: [],
      thread: null,
      links: [],
      idents: [],
      raw: {},
      also: [],
      hay: [e.name, ...e.emails, ...e.phones, ...e.handles.map((h) => h.label), e.job, e.city].join("\n").toLowerCase(),
    });
  }
  const ds: Dataset = {
    key: "people/all",
    server: "people",
    id: "all",
    label: "People",
    noun: "people and organizations",
    items: items.map((x) => x.i),
    row: "contact",
    facets: [
      { id: "kind", label: "Kind", order: "given", given: ["Person", "Organization", "Not clear", "The persona"], primary: true },
      { id: "reach", label: "Reach", order: "given", given: ["4 or more servers", "3 servers", "2 servers", "1 server"], primary: true },
      { id: "servers", label: "Appears in", primary: true },
      { id: "contacts", label: "Contacts", order: "given", given: ["In contacts", "Not in contacts"] },
    ],
    sorts: [sortNum("reach", "Most servers", "reach"), sortNum("count", "Most records", "count"), { id: "recent", label: "Most recently seen", key: (it) => it.n.last ?? null, dir: -1 }, { ...SORT_TITLE, label: "Name" }],
    groups: [groupFacet("kind", "Kind"), groupFacet("reach", "Reach", { order: "given", given: ["4 or more servers", "3 servers", "2 servers", "1 server"] })],
    defaultSort: "reach",
    dated: false,
  };
  return { pix: { ...ix, items, datasets: new Map([[ds.key, ds]]) }, ds };
}

/** Servers first; among equals a code or a file name, which name one thing,
 *  before a phone number, before an amount, which can recur by chance. */
export const identRank = (d: Ident) => d.servers.length * 10 + ({ code: 3, file: 2, phone: 1, amount: 0 }[d.kind] ?? 0) + Math.min(d.items.length, 9) / 10;

export function connectionsDirectory(ix: ExploreIndex): { pix: ExploreIndex; ds: Dataset } {
  const label = (s: string) => ix.servers.find((x) => x.id === s)?.label ?? pretty(s);
  const KIND: Record<string, string> = { code: "Reference or code", amount: "Amount", file: "File name", phone: "Phone number" };
  const items: Item[] = ix.idents.map((d, i) => ({
    i,
    key: "links/" + d.key,
    server: "links",
    ds: "links/all",
    kind: "record",
    title: d.label,
    sub: `${d.items.length} records · ${d.servers.map(label).join(", ")}`,
    text: "",
    at: null,
    end: null,
    day: null,
    allDay: false,
    amount: null,
    people: [],
    f: { kind: KIND[d.kind], servers: d.servers.map(label), spread: d.servers.length >= 3 ? "3 or more servers" : d.servers.length === 2 ? "2 servers" : "One server" },
    n: { servers: d.servers.length, count: d.items.length, rank: identRank(d) },
    media: [],
    thread: null,
    links: [],
    idents: [d.i],
    raw: {},
    also: [],
    hay: (d.label + "\n" + d.items.map((x) => ix.items[x].title).join("\n")).toLowerCase(),
  }));
  const ds: Dataset = {
    key: "links/all",
    server: "links",
    id: "all",
    label: "Connections",
    noun: "shared references",
    items: items.map((x) => x.i),
    row: "record",
    facets: [
      { id: "spread", label: "Across", order: "given", given: ["3 or more servers", "2 servers", "One server"], primary: true },
      { id: "kind", label: "Kind", order: "given", given: Object.values(KIND), primary: true },
      { id: "servers", label: "Appears in", primary: true },
    ],
    sorts: [sortNum("rank", "Most servers", "rank"), sortNum("count", "Most records", "count"), { ...SORT_TITLE, label: "A to Z" }],
    groups: [groupFacet("kind", "Kind"), groupFacet("spread", "Across", { order: "given", given: ["3 or more servers", "2 servers", "One server"] })],
    defaultSort: "rank",
    dated: false,
  };
  return { pix: { ...ix, items, datasets: new Map([[ds.key, ds]]) }, ds };
}
