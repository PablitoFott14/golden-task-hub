import type { Entity, EntityKind } from "./types";

/**
 * Who is who across a universe's servers.
 *
 * Every server names people its own way: a contact id, a Slack id, an email
 * address, an Instagram handle, a messaging handle like `p_luis`, a name on a
 * calendar invite. Each sighting is a `Claim`, and claims that share an email
 * address, a phone number, a server id or a full name are one entity. Names
 * merge only when they are a first and a last name exactly (accents, case and
 * punctuation aside), and organization names only when they are the same name
 * with any "LLC", "Inc." or "Co." taken off, so "Blue Ridge Mill Supply" and
 * "Blue Ridge Community Bank" stay two.
 */

export interface Claim {
  names?: (string | null | undefined)[];
  emails?: (string | null | undefined)[];
  phones?: (string | null | undefined)[];
  /** `server:id`. */
  ids?: string[];
  kind?: EntityKind;
  /** How much to trust this claim's name: contacts 3, a server profile 2, an email header 1. */
  strength?: number;
  /** The names are an organization's: also merge on the name without its suffix. */
  org?: boolean;
  inContacts?: boolean;
  handle?: { server: string; label: string };
  job?: string | null;
  city?: string | null;
  note?: string | null;
  address?: string | null;
  self?: boolean;
}

const PUBLIC_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "me.com",
  "live.com",
  "msn.com",
  "comcast.net",
  "att.net",
]);

export const normName = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ORG_TAIL = /\s+(llc|inc|co|company|corp|corporation|ltd|pllc|pc|lp|llp)$/;
export const orgKey = (s: string) => {
  let n = normName(s).replace(/^the\s+/, "");
  while (ORG_TAIL.test(n)) n = n.replace(ORG_TAIL, "");
  return n;
};

export const normEmail = (s: string) => s.trim().toLowerCase();
export const normPhone = (s: string) => {
  let d = s.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d.length === 10 ? d : "";
};

/** `Name <addr>` or a bare address. */
export function parseAddress(s: string): { name: string; email: string } {
  const m = /^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/.exec(s);
  if (m) return { name: m[1].trim(), email: normEmail(m[2]) };
  return { name: "", email: /@/.test(s) ? normEmail(s) : "" };
}

/** A full name: two or more words, no digits, not an address. */
const isFullName = (n: string) => /\s/.test(n) && !/\d|@/.test(n);

/** A sighting with only a first name to go on, as on a calendar invite or a
 *  messaging handle: it is matched after every fuller claim is in. */
const isWeak = (c: Claim) =>
  !c.self &&
  !(c.emails ?? []).some((e) => e && /@/.test(e)) &&
  !(c.phones ?? []).some((p) => p && normPhone(p)) &&
  (c.names ?? []).some((n) => n && n.trim()) &&
  (c.names ?? []).every((n) => !n || !isFullName(normName(n)));

export const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

interface Node extends Claim {
  keys: string[];
}

export class Registry {
  private nodes: Node[] = [];
  private parent: number[] = [];
  private owner = new Map<string, number>();
  private finalized = false;
  private weak: Claim[] = [];
  entities: Entity[] = [];
  private keyEntity = new Map<string, number>();
  private firstNames = new Map<string, number[]>();
  private usedKeys = new Map<string, number>();
  /** Entity by its URL key. */
  byUrlKey = new Map<string, number>();
  self = -1;

  private find(i: number): number {
    while (this.parent[i] !== i) {
      this.parent[i] = this.parent[this.parent[i]];
      i = this.parent[i];
    }
    return i;
  }

  private union(a: number, b: number) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent[Math.max(ra, rb)] = Math.min(ra, rb);
  }

  private keysOf(c: Claim): string[] {
    const keys: string[] = [];
    if (c.self) keys.push("self");
    for (const id of c.ids ?? []) keys.push("id:" + id);
    for (const e of c.emails ?? []) if (e && /@/.test(e)) keys.push("e:" + normEmail(e));
    for (const p of c.phones ?? []) {
      const d = p ? normPhone(p) : "";
      if (d) keys.push("p:" + d);
    }
    for (const n of c.names ?? []) {
      if (!n) continue;
      const nn = normName(n);
      if (c.org) {
        const ok = orgKey(n);
        if (ok.length > 2) keys.push("o:" + ok);
      }
      // An organization also keeps its full name, so a mail header that spells
      // it out ("Mountain Credit Union <alerts@...>") finds the same entity.
      if (isFullName(nn)) keys.push("n:" + nn);
    }
    // A first name alone: the same first name again is the same sighting.
    if (isWeak(c)) for (const n of c.names ?? []) if (n && n.trim()) keys.push("w:" + normName(n));
    return keys;
  }

  /** A sighting. Before `finalize`, claims merge; after it, a claim resolves
   *  to the entity it names, or becomes a new one. */
  claim(c: Claim): number {
    const keys = this.keysOf(c);
    if (this.finalized) return this.resolve(c, keys);
    if (isWeak(c)) {
      this.weak.push(c);
      return -1;
    }
    const i = this.nodes.length;
    this.nodes.push({ ...c, keys });
    this.parent.push(i);
    for (const k of keys) {
      const o = this.owner.get(k);
      if (o === undefined) this.owner.set(k, i);
      else this.union(i, o);
    }
    return i;
  }

  /** The entity a claim names, without creating one. */
  lookup(c: Claim): number | null {
    for (const k of this.keysOf(c)) {
      const e = this.keyEntity.get(k);
      if (e !== undefined) return e;
    }
    // An organization's name also finds a person-like claim of the same name.
    for (const n of c.names ?? []) {
      if (!n) continue;
      const e = this.keyEntity.get("o:" + orgKey(n)) ?? this.keyEntity.get("n:" + normName(n));
      if (e !== undefined) return e;
    }
    return null;
  }

  /** One first name that only one known person has, as on a calendar invite. */
  byFirstName(first: string): number | null {
    const hits = this.firstNames.get(normName(first)) ?? [];
    return hits.length === 1 ? hits[0] : null;
  }

  byKey(k: string): number | null {
    return this.keyEntity.get(k) ?? null;
  }

  private resolve(c: Claim, keys: string[]): number {
    for (const k of keys) {
      const e = this.keyEntity.get(k);
      if (e !== undefined) {
        this.enrich(this.entities[e], c);
        for (const kk of keys) if (!this.keyEntity.has(kk)) this.keyEntity.set(kk, e);
        return e;
      }
    }
    // One first name: the one known person who has it, if only one does.
    const first = isWeak(c) ? this.byFirstName((c.names ?? []).find((n) => n && n.trim())!) : null;
    if (first !== null) {
      this.enrich(this.entities[first], c);
      for (const k of keys) this.keyEntity.set(k, first);
      return first;
    }
    const e = this.makeEntity([{ ...c, keys }]);
    for (const k of keys) this.keyEntity.set(k, e);
    return e;
  }

  private enrich(ent: Entity, c: Claim) {
    for (const em of c.emails ?? []) if (em && /@/.test(em) && !ent.emails.includes(normEmail(em))) ent.emails.push(normEmail(em));
    for (const p of c.phones ?? []) {
      const d = p ? normPhone(p) : "";
      if (d && !ent.phones.includes(d)) ent.phones.push(d);
    }
    if (c.handle && !ent.handles.some((h) => h.server === c.handle!.server && h.label === c.handle!.label)) ent.handles.push(c.handle);
  }

  private makeEntity(group: Node[]): number {
    const i = this.entities.length;
    const best = [...group].sort((a, b) => (b.strength ?? 1) - (a.strength ?? 1));
    let name = "";
    for (const g of best) {
      const n = (g.names ?? []).find((x) => x && x.trim() && !/@/.test(x));
      if (n) {
        name = n.trim();
        break;
      }
    }
    const emails: string[] = [];
    const phones: string[] = [];
    const handles: Entity["handles"] = [];
    for (const g of group) {
      for (const em of g.emails ?? []) if (em && /@/.test(em) && !emails.includes(normEmail(em))) emails.push(normEmail(em));
      for (const p of g.phones ?? []) {
        const d = p ? normPhone(p) : "";
        if (d && !phones.includes(d)) phones.push(d);
      }
      if (g.handle && !handles.some((h) => h.server === g.handle!.server && h.label === g.handle!.label)) handles.push(g.handle);
    }
    if (!name) name = emails[0] ?? (phones[0] ? fmtPhone(phones[0]) : "Unknown");
    // The kind comes from the strongest evidence: the contact card, then a
    // profile on a people server, then anything that says organization.
    const kind: EntityKind = group.some((g) => g.self)
      ? "self"
      : (group.find((g) => g.inContacts && (g.kind === "person" || g.kind === "org"))?.kind ??
        group.find((g) => g.kind === "person" && (g.strength ?? 1) >= 1.5)?.kind ??
        group.find((g) => g.kind === "org")?.kind ??
        group.find((g) => g.kind === "person")?.kind ??
        "unknown");
    const pick = (f: keyof Claim) => {
      for (const g of best) {
        const v = g[f];
        if (typeof v === "string" && v.trim()) return v.trim();
      }
      return "";
    };
    const domain = emails.map((e) => e.split("@")[1]).find((d) => d && !PUBLIC_DOMAINS.has(d)) ?? null;
    // A stable URL key: the name as a slug, numbered when two share one. The
    // order entities are made in is the seed's, so a key survives a reload.
    const slug = normName(name).replace(/\s+/g, "-").slice(0, 48) || "entity";
    const used = (this.usedKeys.get(slug) ?? 0) + 1;
    this.usedKeys.set(slug, used);
    const key = used === 1 ? slug : `${slug}-${used}`;
    this.byUrlKey.set(key, i);
    this.entities.push({
      i,
      key,
      name,
      kind,
      emails,
      phones,
      handles,
      inContacts: group.some((g) => g.inContacts),
      job: pick("job"),
      city: pick("city"),
      note: pick("note"),
      address: pick("address"),
      items: [],
      servers: {},
      domain,
      first: null,
      last: null,
    });
    if (kind === "self") this.self = i;
    return i;
  }

  finalize() {
    const groups = new Map<number, Node[]>();
    this.nodes.forEach((n, i) => {
      const r = this.find(i);
      if (!groups.has(r)) groups.set(r, []);
      groups.get(r)!.push(n);
    });
    for (const [, g] of [...groups].sort((a, b) => a[0] - b[0])) {
      const e = this.makeEntity(g);
      for (const n of g) for (const k of n.keys) this.keyEntity.set(k, e);
    }
    this.finalized = true;
    this.indexFirstNames();
    for (const c of this.weak.splice(0)) this.resolve(c, this.keysOf(c));
  }

  private indexFirstNames() {
    this.firstNames.clear();
    for (const e of this.entities) {
      if (e.kind !== "person" && e.kind !== "self") continue;
      const first = normName(e.name).split(" ")[0];
      if (!first) continue;
      const list = this.firstNames.get(first) ?? [];
      list.push(e.i);
      this.firstNames.set(first, list);
    }
  }

}

export const fmtPhone = (d: string) => (d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d);

/** A name that reads as a business: "Valley Tire & Auto", "Banfield Pet Hospital". */
export const orgName = (name: string) =>
  /&|\b(llc|inc|co|corp|company|ltd|pllc|group|bank|credit union|insurance|hospital|clinic|dental|dentistry|pharmacy|school|schools|academy|university|college|church|market|markets|store|shop|supply|services?|repair|auto|motors|plumbing|electric|energy|utilities|airlines?|airport|hotel|inn|restaurant|cafe|café|bakery|studio|records|press|print|media|news|times|association|board|department|county|city of|office|center|centre|partners|law|realty|mechanical|tire|vet|veterinary|pet|fitness|gym|club)\b/i.test(name);

/** Mail from a system address rather than a person: no-reply, newsletters, alerts. */
export const automatedAddress = (email: string) =>
  /^(no-?reply|do-?not-?reply|donotreply|newsletters?|news|alerts?|notifications?|notify|info|hello|support|updates?|orders?|billing|team|marketing|receipts?|service|customerservice|customercare|care|mail|contact|events?|deals|offers|statements?|reservations|bookings?|confirm(ation)?s?|digest|community|members?|membership|feedback|help|admin|office|sales|shop|store|accounts?|payments?|invoices?|reminders?|appointments?|scheduling|frontdesk|dispatch|pharmacy|rx|hr|careers|jobs|press|editor|webmaster|security)([._+-].*)?@/i.test(
    email
  );
