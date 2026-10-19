/**
 * The shapes Explore works with. A universe's seed is read once into an
 * `ExploreIndex`: every record of every server as an `Item`, grouped into
 * `Dataset`s (a server's browsable collections), the people and organizations
 * behind them as `Entity`s, and the references several records share as
 * `Ident`s. Nothing in it is written back; `raw` is the stored record itself.
 */

export type RowKind =
  | "email"
  | "event"
  | "message"
  | "conversation"
  | "txn"
  | "file"
  | "post"
  | "comment"
  | "account"
  | "contact"
  | "record"
  | "health"
  | "activity"
  | "listing"
  | "reminder"
  | "trip"
  | "table";

export type Role =
  | "from"
  | "to"
  | "cc"
  | "with"
  | "author"
  | "member"
  | "merchant"
  | "payee"
  | "mentioned"
  | "contact"
  | "seller"
  | "commenter"
  | "account"
  | "participant"
  | "passenger"
  | "field";

export interface PersonRef {
  e: number;
  role: Role;
}

export interface Media {
  name: string;
  /** Where the hub serves the bytes, or null when the universe does not carry them. */
  url: string | null;
  mime: string;
  kind: "image" | "pdf" | "video" | "doc" | "other";
  size?: number;
}

export interface Link {
  to: number;
  why: string;
}

export interface Item {
  i: number;
  /** Stable across loads: dataset key and the record's own id. */
  key: string;
  server: string;
  ds: string;
  kind: RowKind;
  title: string;
  sub: string;
  text: string;
  at: number | null;
  end: number | null;
  day: string | null;
  /** A bare date or an all day event: no time of day to show. */
  allDay: boolean;
  /** Money from the persona's side: positive in, negative out. */
  amount: number | null;
  people: PersonRef[];
  /** Facet values, already strings. */
  f: Record<string, string | string[]>;
  /** Numbers for sorting, ranges and table columns. */
  n: Record<string, number>;
  media: Media[];
  thread: string | null;
  links: Link[];
  idents: number[];
  raw: Record<string, unknown>;
  also: { label: string; rec: Record<string, unknown> }[];
  /** Lowercased text the search reads. */
  hay: string;
}

export interface Facet {
  id: string;
  label: string;
  /** Values are entity keys, shown as names. */
  entity?: boolean;
  order?: "count" | "alpha" | "given" | "desc";
  given?: string[];
  /** Values shown before "more". */
  top?: number;
  /** Shown above the others, open by default. */
  primary?: boolean;
  /** How a stored value reads: a month key as "October 2026". */
  fmt?: (v: string) => string;
  /** Values are folder paths: drawn as a tree. */
  tree?: boolean;
}

export interface Sort {
  id: string;
  label: string;
  key: (it: Item) => number | string | null;
  dir: 1 | -1;
}

export interface Group {
  id: string;
  label: string;
  key: (it: Item) => string | string[] | null;
  order?: "count" | "key" | "keydesc" | "time" | "given";
  given?: string[];
  fmt?: (k: string) => string;
  /** Show the summed amount on the group header. */
  sum?: boolean;
  entity?: boolean;
}

export interface Column {
  id: string;
  label: string;
  get: (it: Item) => string | number | null;
  num?: boolean;
  money?: boolean;
  width?: number;
  wrap?: boolean;
}

export interface RangeDef {
  id: string;
  label: string;
  get: (it: Item) => number | null;
  money?: boolean;
  unit?: string;
}

export type ChartKind = "money" | "health" | "insights" | "count";

export interface Dataset {
  key: string;
  server: string;
  id: string;
  label: string;
  /** What one row is, for counts: "messages", "transactions". */
  noun: string;
  items: number[];
  row: RowKind;
  facets: Facet[];
  sorts: Sort[];
  groups: Group[];
  defaultSort: string;
  defaultGroup?: string;
  columns?: Column[];
  ranges?: RangeDef[];
  chart?: ChartKind;
  /** One line under the title, about what the rows are. */
  note?: string;
  dated: boolean;
}

export type EntityKind = "self" | "person" | "org" | "unknown";

export interface Entity {
  i: number;
  key: string;
  name: string;
  kind: EntityKind;
  emails: string[];
  phones: string[];
  /** How the entity is named on each server: "@maggie.bakes.avl", "U_LUIS". */
  handles: { server: string; label: string }[];
  inContacts: boolean;
  job: string;
  city: string;
  note: string;
  address: string;
  items: number[];
  servers: Record<string, number>;
  domain: string | null;
  first: number | null;
  last: number | null;
}

export type IdentKind = "code" | "amount" | "file" | "phone";

export interface Ident {
  i: number;
  key: string;
  label: string;
  kind: IdentKind;
  items: number[];
  servers: string[];
}

export interface ServerInfo {
  id: string;
  label: string;
  emoji: string;
  /** The viewer's own count, for its nav. */
  count: number;
  /** Every stored record, profiles and follow lists included. */
  stored: number;
  datasets: string[];
}

export interface DocText {
  id: string;
  label: string;
  text: string;
}

export interface ExploreIndex {
  slug: string;
  tz: string;
  persona: { name: string; subtitle: string; now: string | null; range: [string, string] | null };
  servers: ServerInfo[];
  datasets: Map<string, Dataset>;
  items: Item[];
  entities: Entity[];
  idents: Ident[];
  byKey: Map<string, number>;
  entityByKey: Map<string, number>;
  identByKey: Map<string, number>;
  /** Item ids per day, in time order. */
  days: Map<string, number[]>;
  dayMin: string | null;
  dayMax: string | null;
  self: number;
  docs: DocText[];
  base: string;
  /** Per server, stored records no item holds: profiles, institutions, channel lists. */
  extras: Map<string, { collection: string; rows: Record<string, unknown>[] }[]>;
}
