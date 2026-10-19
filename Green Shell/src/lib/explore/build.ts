import { makeClock, addDays, dayNum, type Clock } from "./time";
import type { ExploreSource } from "./load";
import { Registry, fmtPhone, normPhone, type Claim } from "./people";
import { mediaKind, mimeOf, pretty, type Ctx, type DatasetInit, type ItemInit, type ServerDef } from "./ctx";
import type { Dataset, Entity, ExploreIndex, Ident, IdentKind, Item, PersonRef } from "./types";
import { email, hourBucket, messaging, messenger, slack } from "./servers/comms";
import { duffel, fintrack, generic, linkLedgers, plaid } from "./servers/money";
import { airtable, calendar, contacts, filesystem, reminder } from "./servers/records";
import { facebook, instagram } from "./servers/social";
import { apple_health, fitbit, strava } from "./servers/health";

/**
 * Builds a universe's `ExploreIndex` from its stored seed, in five passes:
 *
 * 1. **Who is who.** Every server's builder claims the people it names, and
 *    claims that share an address, a phone, an id or a full name merge.
 * 2. **Records.** Each builder turns its records into items, in datasets with
 *    the facets that suit its data. A server with no builder of its own, or
 *    one whose builder fails on data it did not expect, gets generic datasets
 *    instead, so every stored record is always reachable.
 * 3. **Links the data states.** A comment's post, a booking's quote, a
 *    recurring series' transactions, the same transaction in Plaid and
 *    Fintrack, the emails of one thread, the copies of one file.
 * 4. **Mentions and shared references.** A full name, a phone number or an
 *    address in a record's text ties it to that entity. An invoice number, a
 *    booking reference, a file name or an amount that recurs across records
 *    becomes an `Ident` they share.
 * 5. **Days and search.** Items are bucketed by day in the persona's zone, and
 *    each gets the lowercased text the search reads.
 */

const SERVERS: Record<string, ServerDef> = {
  email,
  messaging,
  messenger,
  slack,
  plaid,
  fintrack,
  duffel,
  calendar,
  contacts,
  reminder,
  filesystem,
  airtable,
  instagram,
  facebook,
  apple_health,
  fitbit,
  strava,
};

const DOC_LABELS: Record<string, string> = { memory: "Memory", tensions: "Tensions", storylines: "Storylines", npcs: "Relationships" };

/** The persona's own "now", read the way the viewer reads it. */
function personaNow(now: string | null): number {
  if (!now) return Date.now();
  const s = now.trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && /(Z|[+-]\d{2}:?\d{2})$/.test(s)) {
    const t = Date.parse(s);
    if (!Number.isNaN(t)) return t;
  }
  const t = Date.parse(s.slice(0, 10) + "T12:00:00Z");
  return Number.isNaN(t) ? Date.now() : t;
}

export function buildIndex(src: ExploreSource): ExploreIndex {
  const clock = makeClock(src.tz);
  const clocks = new Map<string, Clock>([[src.tz, clock]]);
  const clockFor = (tz: string) => {
    let c = clocks.get(tz);
    if (!c) clocks.set(tz, (c = makeClock(tz)));
    return c;
  };
  const personaName = src.persona.name.split(/[,(]/)[0].trim();
  const first = personaName.split(/\s+/)[0] || personaName;
  const nowMs = personaNow(src.persona.now);
  const reg = new Registry();
  const servers = Object.keys(src.seed);

  // 1. Who is who.
  reg.claim({ self: true, names: [personaName], strength: 2 });
  for (const s of servers) {
    try {
      SERVERS[s]?.claims?.(src.seed[s] as Record<string, unknown>, reg, src);
    } catch (e) {
      console.error(`explore: ${s} people`, e);
    }
  }
  reg.finalize();
  const self = reg.self >= 0 ? reg.self : reg.claim({ self: true, names: [personaName] });

  // 2. Records.
  const items: Item[] = [];
  const byKey = new Map<string, number>();
  const datasets = new Map<string, Dataset>();
  const pending: { from: Item; key: string; why: string; back?: string }[] = [];
  const refsOf = new Map<number, string[]>();
  const posts: (() => void)[] = [];
  const hourFacet = new Set<string>();

  const ctx: Ctx = {
    src,
    clock,
    clockFor,
    reg,
    self,
    first,
    nowMs,
    nowDay: clock.day(nowMs),
    dataset(server, d: DatasetInit) {
      const key = `${server}/${d.id}`;
      const ds: Dataset = {
        key,
        server,
        id: d.id,
        label: d.label,
        noun: d.noun,
        items: [],
        row: d.row,
        facets: d.facets ?? [],
        sorts: d.sorts ?? [],
        groups: d.groups ?? [],
        defaultSort: d.defaultSort ?? d.sorts?.[0]?.id ?? "",
        defaultGroup: d.defaultGroup,
        columns: d.columns,
        ranges: d.ranges,
        chart: d.chart,
        note: d.note,
        dated: false,
      };
      datasets.set(key, ds);
      if (ds.facets.some((f) => f.id === "hour")) hourFacet.add(key);
      return ds;
    },
    add(ds, init: ItemInit) {
      const c = init.whenTz ? clockFor(init.whenTz) : clock;
      const when = c.parse(init.when);
      const end = c.parse(init.end);
      const allDay = !!init.allDay || !!when?.dateOnly;
      const at = when?.ms ?? null;
      const day = when ? (when.dateOnly && typeof init.when === "string" ? init.when.slice(0, 10) : clock.day(when.ms)) : null;
      const people: PersonRef[] = [];
      for (const r of init.people ?? []) if (r && r.e >= 0 && !people.some((p) => p.e === r.e && p.role === r.role)) people.push(r);
      const f: Record<string, string | string[]> = {};
      for (const [k, v] of Object.entries(init.f ?? {})) if (v !== null && v !== undefined && v !== "") f[k] = v;
      if (day) {
        f.month ??= day.slice(0, 7);
        f.weekday ??= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(dayNum(day) * 86_400_000).getUTCDay()];
      }
      if (hourFacet.has(ds.key) && at !== null && !allDay && f.hour === undefined) f.hour = hourBucket(clock.minute(at));
      const n: Record<string, number> = {};
      for (const [k, v] of Object.entries(init.n ?? {})) if (typeof v === "number" && Number.isFinite(v)) n[k] = v;
      let key = `${ds.key}/${String(init.id)}`;
      if (byKey.has(key)) {
        let k = 2;
        while (byKey.has(`${key}#${k}`)) k++;
        key = `${key}#${k}`;
      }
      const it: Item = {
        i: items.length,
        key,
        server: ds.server,
        ds: ds.key,
        kind: init.kind ?? ds.row,
        title: init.title,
        sub: init.sub ?? "",
        text: init.text ?? "",
        at,
        end: end?.ms ?? null,
        day,
        allDay,
        amount: init.amount ?? null,
        people,
        f,
        n,
        media: init.media ?? [],
        thread: init.thread ?? null,
        links: [],
        idents: [],
        raw: init.raw,
        also: init.also ?? [],
        hay: "",
      };
      items.push(it);
      byKey.set(key, it.i);
      ds.items.push(it.i);
      if (at !== null) ds.dated = true;
      for (const l of init.links ?? []) pending.push({ from: it, key: l.key, why: l.why, back: l.back });
      if (init.refs?.length) refsOf.set(it.i, init.refs.filter(Boolean));
      return it;
    },
    ref: (e, role) => (e === null || e === undefined || e < 0 ? null : { e, role }),
    person: (c: Claim) => reg.claim(c),
    ekey: (e) => (e === null || e === undefined || e < 0 ? null : reg.entities[e]?.key ?? null),
    media: (name, path, mime, size) => {
      const m = mimeOf(name, mime);
      return { name, url: path ? src.url(path) : null, mime: m, kind: mediaKind(m, name), size };
    },
    post: (fn) => posts.push(fn),
    item: (key) => {
      const i = byKey.get(key);
      return i === undefined ? undefined : items[i];
    },
  };

  for (const s of servers) {
    const seed = src.seed[s] as Record<string, unknown>;
    if (!seed || typeof seed !== "object") continue;
    const before = items.length;
    const dsBefore = new Set(datasets.keys());
    try {
      if (SERVERS[s]) SERVERS[s].build(seed, ctx, s);
      else generic(ctx, s, seed, []);
    } catch (e) {
      // A builder that trips on data it did not expect: drop what it made and
      // fall back to generic datasets, so the records stay reachable.
      console.error(`explore: ${s}`, e);
      for (const it of items.splice(before)) byKey.delete(it.key);
      for (const k of [...datasets.keys()]) if (!dsBefore.has(k)) datasets.delete(k);
      for (let i = pending.length - 1; i >= 0; i--) if (pending[i].from.i >= before) pending.splice(i, 1);
      for (const k of [...refsOf.keys()]) if (k >= before) refsOf.delete(k);
      generic(ctx, s, seed, []);
    }
  }

  // 3. Links the data states.
  const link = (a: Item, b: Item, why: string, back?: string) => {
    if (a.i === b.i || a.links.some((l) => l.to === b.i && l.why === why)) return;
    a.links.push({ to: b.i, why });
    if (back) b.links.push({ to: a.i, why: back });
  };
  for (const p of pending) {
    const t = byKey.get(p.key);
    if (t !== undefined) link(p.from, items[t], p.why, p.back);
  }
  const threads = new Map<string, number[]>();
  for (const it of items) if (it.thread && (it.kind === "email" || it.server === "slack" || it.thread.startsWith("sha:"))) {
    const k = `${it.ds}|${it.thread}`;
    if (!threads.has(k)) threads.set(k, []);
    threads.get(k)!.push(it.i);
  }
  for (const [k, ids] of threads) {
    if (ids.length < 2 || ids.length > 60) continue;
    const why = k.includes("|sha:") ? "An identical copy" : "In the same thread";
    for (const a of ids) for (const b of ids) if (a !== b) items[a].links.push({ to: b, why });
  }
  linkLedgers(items, (a, b, why, back) => link(a, b, why, back));

  // Every entity's appearances, before mentions add to them.
  const appear = (it: Item, e: number) => {
    const ent = reg.entities[e];
    if (!ent || ent.items[ent.items.length - 1] === it.i) return;
    ent.items.push(it.i);
    ent.servers[it.server] = (ent.servers[it.server] ?? 0) + 1;
    if (it.at !== null) {
      ent.first = ent.first === null ? it.at : Math.min(ent.first, it.at);
      ent.last = ent.last === null ? it.at : Math.max(ent.last, it.at);
    }
  };
  for (const it of items) for (const p of it.people) appear(it, p.e);

  // 4. Mentions.
  mentions(items, reg, self, appear);

  // Shared references.
  const idents = buildIdents(items, refsOf);
  for (const id of idents) for (const i of id.items) items[i].idents.push(id.i);
  for (const id of idents) {
    if (id.kind !== "file") continue;
    const fsItems = id.items.filter((i) => items[i].server === "filesystem");
    if (fsItems.length && id.items.some((i) => items[i].server !== "filesystem")) for (const i of fsItems) items[i].f.elsewhere = "Also sent as an attachment";
  }

  for (const fn of posts) {
    try {
      fn();
    } catch (e) {
      console.error("explore: post", e);
    }
  }

  // 5. Days and search.
  const days = new Map<string, number[]>();
  const put = (d: string, i: number) => {
    if (!days.has(d)) days.set(d, []);
    days.get(d)!.push(i);
  };
  for (const it of items) {
    if (!it.day) continue;
    put(it.day, it.i);
    // A stay or a trip spans its days, up to three weeks.
    if (it.end !== null && it.at !== null && it.end > it.at) {
      const last = clock.day(it.allDay ? it.end - 1 : it.end);
      for (let d = addDays(it.day, 1), k = 0; d <= last && k < 21; d = addDays(d, 1), k++) put(d, it.i);
    }
  }
  for (const list of days.values()) list.sort((a, b) => (items[a].at ?? 0) - (items[b].at ?? 0));
  const identLabel = (i: number) => idents[i].label;
  for (const it of items) {
    it.hay = [
      it.title,
      it.sub,
      it.text,
      ...it.people.map((p) => reg.entities[p.e]?.name ?? ""),
      ...it.media.map((m) => m.name),
      ...it.idents.map(identLabel),
    ]
      .join("\n")
      .toLowerCase();
  }

  const dayKeys = [...days.keys()].sort();
  const range = src.persona.range;
  const serverInfo = servers
    .map((s) => {
      const nav = src.nav.find((n) => n.id === s);
      return {
        id: s,
        label: nav?.label ?? pretty(s),
        emoji: nav?.emoji ?? "",
        count: nav?.count ?? 0,
        stored: Object.values((src.seed[s] ?? {}) as Record<string, unknown>).reduce<number>((a, v) => a + (Array.isArray(v) ? v.length : 0), 0),
        datasets: [...datasets.values()].filter((d) => d.server === s && d.items.length).map((d) => d.key),
      };
    })
    .filter((s) => s.datasets.length);
  const order = src.nav.map((n) => n.id);
  serverInfo.sort((a, b) => (order.indexOf(a.id) + 1 || 999) - (order.indexOf(b.id) + 1 || 999));

  // Stored records no item holds, so each server can still list them.
  const held = new Set<unknown>();
  for (const it of items) {
    held.add(it.raw);
    for (const v of Object.values(it.raw)) if (Array.isArray(v)) for (const r of v) held.add(r);
    for (const a of it.also) held.add(a.rec);
  }
  const extras = new Map<string, { collection: string; rows: Record<string, unknown>[] }[]>();
  for (const s of servers) {
    const seed = src.seed[s] as Record<string, unknown>;
    if (!seed || typeof seed !== "object") continue;
    for (const [coll, rows] of Object.entries(seed)) {
      if (!Array.isArray(rows)) continue;
      const left = rows.filter((r): r is Record<string, unknown> => !!r && typeof r === "object" && !held.has(r));
      if (!left.length) continue;
      if (!extras.has(s)) extras.set(s, []);
      extras.get(s)!.push({ collection: coll, rows: left });
    }
  }

  const entities: Entity[] = reg.entities;
  return {
    slug: src.slug,
    tz: clock.tz,
    persona: src.persona,
    servers: serverInfo,
    datasets,
    items,
    entities,
    idents,
    byKey,
    entityByKey: reg.byUrlKey,
    identByKey: new Map(idents.map((d) => [d.key, d.i])),
    days,
    dayMin: range?.[0] ?? dayKeys[0] ?? null,
    dayMax: range?.[1] ?? dayKeys[dayKeys.length - 1] ?? null,
    self,
    docs: Object.entries(src.docs)
      .filter(([, t]) => t && t.trim())
      .map(([id, text]) => ({ id, label: DOC_LABELS[id] ?? pretty(id), text })),
    base: src.base,
    extras,
  };
}

/* -------------------------------------------------------------- mentions */

const PHONE = /(?:\+?1[\s.-]?)?\(?\b(\d{3})\)?[\s.-]?(\d{3})[\s.-](\d{4})\b/g;
const EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A record that names someone in its text: a full name, their phone number,
 *  their address. Names are only the cast that appears in the persona's own
 *  servers (contacts, mail, messages, the calendar), never every one of
 *  thousands of followers, so a follower who shares a name with a word in a
 *  caption does not light up. */
function mentions(items: Item[], reg: Registry, self: number, appear: (it: Item, e: number) => void) {
  const CORE = new Set(["contacts", "email", "messaging", "messenger", "slack", "calendar", "plaid", "fintrack", "airtable"]);
  const cast = reg.entities.filter(
    (e) => e.i !== self && (e.kind === "person" || e.kind === "org") && /\s/.test(e.name) && e.name.length >= 5 && e.name.length <= 60 && (e.inContacts || Object.keys(e.servers).some((s) => CORE.has(s)))
  );
  const byName = new Map<string, number>();
  for (const e of cast) if (!byName.has(e.name.toLowerCase())) byName.set(e.name.toLowerCase(), e.i);
  const names = [...byName.keys()].sort((a, b) => b.length - a.length);
  const re = names.length ? new RegExp(`(?<![\\w])(?:${names.map(escapeRe).join("|")})(?![\\w])`, "gi") : null;
  for (const it of items) {
    const text = `${it.title}\n${it.text}`;
    if (!text.trim()) continue;
    const found = new Set<number>();
    if (re) for (const m of text.matchAll(re)) {
      const e = byName.get(m[0].toLowerCase());
      if (e !== undefined) found.add(e);
    }
    for (const m of text.matchAll(PHONE)) {
      const e = reg.byKey("p:" + normPhone(m[1] + m[2] + m[3]));
      if (e !== null) found.add(e);
    }
    for (const m of text.matchAll(EMAIL)) {
      const e = reg.byKey("e:" + m[0].toLowerCase());
      if (e !== null) found.add(e);
    }
    for (const e of found) {
      if (e === self || it.people.some((p) => p.e === e)) continue;
      it.people.push({ e, role: "mentioned" });
      appear(it, e);
    }
  }
}

/* ------------------------------------------------------------ references */

// INV-4471, BRM-20788, CAW-1129, AU-555A, HW-570214
const CODE = /\b[A-Z]{2,6}-(?=[A-Z0-9]*\d)[A-Z0-9]{2,10}(?:-[A-Z0-9]+)?\b/g;
// K7QZ4M, ASH4471906
const REF = /\b(?=[A-Z0-9]{6,12}\b)(?=[A-Z0-9]*\d)(?=[0-9]*[A-Z])[A-Z0-9]{6,12}\b/g;
// Invoice #20931, Order 88213, claim no. 4471
const LABELLED = /\b(?:invoice|inv|order|ord|ref|reference|confirmation|conf|booking|claim|case|ticket|policy|receipt|tracking|po)[\s_#:.-]{0,3}(?:no\.?|number|num)?[\s#:.-]{0,3}(\d{4,}[A-Z0-9-]*)\b/gi;
const MONEY = /\$\s?((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{2})?)/g;
const FINANCE = new Set(["plaid", "fintrack"]);

function buildIdents(items: Item[], refsOf: Map<number, string[]>): Ident[] {
  const found = new Map<string, { label: string; kind: IdentKind; items: Set<number> }>();
  const note = (kind: IdentKind, key: string, label: string, i: number) => {
    const k = `${kind}:${key}`;
    let v = found.get(k);
    if (!v) found.set(k, (v = { label, kind, items: new Set() }));
    v.items.add(i);
  };
  const codes = (s: string, i: number) => {
    const taken: [number, number][] = [];
    for (const m of s.matchAll(CODE)) {
      note("code", m[0], m[0], i);
      taken.push([m.index!, m.index! + m[0].length]);
    }
    for (const m of s.matchAll(REF)) {
      if (taken.some(([a, b]) => m.index! >= a && m.index! < b) || /^\d+[A-Z]{1,2}$/.test(m[0]) || /^[A-Z]+\d{1,2}$/.test(m[0])) continue;
      note("code", m[0], m[0], i);
    }
    for (const m of s.matchAll(LABELLED)) {
      const start = m.index! + m[0].lastIndexOf(m[1]);
      if (taken.some(([a, b]) => start >= a && start < b)) continue;
      note("code", m[1].toUpperCase(), m[1].toUpperCase(), i);
    }
  };
  for (const it of items) {
    const text = `${it.title}\n${it.sub}\n${it.text}`;
    codes(text, it.i);
    for (const m of text.matchAll(MONEY)) {
      const cents = Math.round(Number(m[1].replace(/,/g, "")) * 100);
      if (cents >= 1000) note("amount", String(cents), "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 }), it.i);
    }
    if (it.amount !== null && Math.abs(it.amount) >= 10 && (it.kind === "txn" || it.kind === "account")) {
      const cents = Math.round(Math.abs(it.amount) * 100);
      note("amount", String(cents), "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 }), it.i);
    }
    for (const [k, v] of Object.entries(it.n)) {
      if (!/total|price|cost|amount|paid|due|deposit|balance|received/i.test(k) || !Number.isFinite(v) || Math.abs(v) < 10) continue;
      const cents = Math.round(Math.abs(v) * 100);
      note("amount", String(cents), "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 }), it.i);
    }
    for (const m of text.matchAll(PHONE)) {
      const d = normPhone(m[1] + m[2] + m[3]);
      if (d) note("phone", d, fmtPhone(d), it.i);
    }
    for (const r of refsOf.get(it.i) ?? []) {
      if (/\.[a-z0-9]{2,5}$/i.test(r)) note("file", r.toLowerCase(), r, it.i);
      codes(r, it.i);
      if (/^[A-Z0-9][A-Z0-9-]{3,}$/i.test(r) && /\d/.test(r) && !/\.[a-z0-9]{2,5}$/i.test(r)) note("code", r.toUpperCase(), r.toUpperCase(), it.i);
    }
  }
  const out: Ident[] = [];
  for (const [key, v] of found) {
    const ids = [...v.items];
    if (ids.length < 2) continue;
    const servers = [...new Set(ids.map((i) => items[i].server))];
    // An amount ties records together only when it is rare and reaches beyond
    // the bank feeds, which hold every transaction twice.
    if (v.kind === "amount" && (ids.length > 8 || servers.every((s) => FINANCE.has(s)) || servers.length < 2)) continue;
    if (v.kind === "code" && ids.length > 40) continue;
    out.push({ i: out.length, key, label: v.label, kind: v.kind, items: ids, servers });
  }
  return out;
}

