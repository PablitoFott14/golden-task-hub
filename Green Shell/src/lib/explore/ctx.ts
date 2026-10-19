import type { Clock } from "./time";
import { fmtDay, fmtMonth, fmtWeek, monthOf, weekdayName, weekOf, WEEKDAY_ORDER } from "./time";
import type { ExploreSource } from "./load";
import type { Claim, Registry } from "./people";
import type { ChartKind, Column, Dataset, Facet, Group, Item, Media, PersonRef, RangeDef, Role, RowKind, Sort } from "./types";

/**
 * What every server's builder is handed. A builder reads its own seed and
 * turns each stored record into one item, in one or more datasets, with the
 * facets, sorts and groupings that suit what that server actually holds.
 */

/** A seed record. Builders read these and never write to them. */
export type Rec = Record<string, any>;

export interface DatasetInit {
  id: string;
  label: string;
  noun: string;
  row: RowKind;
  facets?: Facet[];
  sorts?: Sort[];
  groups?: Group[];
  defaultSort?: string;
  defaultGroup?: string;
  columns?: Column[];
  ranges?: RangeDef[];
  chart?: ChartKind;
  note?: string;
}

export interface ItemInit {
  id: string | number;
  title: string;
  sub?: string;
  text?: string;
  when?: unknown;
  end?: unknown;
  /** The zone a time without an offset is in, when it is not the persona's. */
  whenTz?: string;
  allDay?: boolean;
  amount?: number | null;
  people?: (PersonRef | null)[];
  f?: Record<string, string | string[] | null | undefined>;
  n?: Record<string, number | null | undefined>;
  media?: Media[];
  thread?: string | null;
  /** Records this one points at, by item key, resolved once every item exists. */
  links?: { key: string; why: string; back?: string }[];
  /** Strings that are references other records may share (invoice numbers, file names). */
  refs?: string[];
  raw: Rec;
  /** Other stored records that belong with this one: an account's owner, a post's media. */
  also?: { label: string; rec: Rec }[];
  kind?: RowKind;
}

export interface Ctx {
  src: ExploreSource;
  clock: Clock;
  clockFor(tz: string): Clock;
  reg: Registry;
  self: number;
  /** The persona's first name, for labels like "Only Elena". */
  first: string;
  nowMs: number;
  nowDay: string;
  dataset(server: string, d: DatasetInit): Dataset;
  add(ds: Dataset, it: ItemInit): Item;
  ref(e: number | null | undefined, role: Role): PersonRef | null;
  /** The entity a sighting names, made if no other server named it. */
  person(c: Claim): number;
  ekey(e: number | null | undefined): string | null;
  media(name: string, path: string | null | undefined, mime?: string, size?: number): Media;
  /** Runs once every entity knows where it appears. */
  post(fn: () => void): void;
  item(key: string): Item | undefined;
}

export interface ServerDef {
  claims?(seed: Rec, reg: Registry, src: ExploreSource): void;
  build(seed: Rec, ctx: Ctx, server: string): void;
}

/* ---------------------------------------------------------------- helpers */

export const arr = (v: unknown): Rec[] => (Array.isArray(v) ? (v.filter((x) => x && typeof x === "object") as Rec[]) : []);
export const str = (v: unknown): string => (v === null || v === undefined ? "" : typeof v === "string" ? v : typeof v === "number" || typeof v === "boolean" ? String(v) : "");
export const num = (v: unknown): number | null => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return null;
};
export const isRef = (v: unknown): v is { _extracted_to: string } =>
  !!v && typeof v === "object" && !Array.isArray(v) && typeof (v as Rec)._extracted_to === "string";

/** An enum as words: `FOOD_AND_DRINK` and `in store` read "Food and drink", "In store". */
export const pretty = (s: unknown): string => {
  const t = str(s).replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!t) return "";
  const lower = t === t.toUpperCase() || t === t.toLowerCase() ? t.toLowerCase() : t;
  return lower[0].toUpperCase() + lower.slice(1);
};

export const firstLine = (s: string, max = 90) => {
  const line = s.split(/\n/).map((x) => x.trim()).find(Boolean) ?? "";
  return line.length > max ? line.slice(0, max - 1).trimEnd() + "…" : line;
};

export const leaf = (p: string) => p.slice(p.lastIndexOf("/") + 1);
export const dirname = (p: string) => (p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "");

const EXT_MIME: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  heic: "image/heic",
  mp4: "video/mp4",
  mov: "video/quicktime",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc: "application/msword",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  md: "text/markdown",
  txt: "text/plain",
};
export const mimeOf = (name: string, given?: string) => given || EXT_MIME[(name.split(".").pop() ?? "").toLowerCase()] || "";
export const mediaKind = (mime: string, name = ""): Media["kind"] => {
  const m = mimeOf(name, mime);
  if (m.startsWith("image/")) return "image";
  if (m === "application/pdf") return "pdf";
  if (m.startsWith("video/")) return "video";
  if (/word|document|text\/|spreadsheet|excel|csv|markdown/.test(m)) return "doc";
  return "other";
};
export const KIND_LABEL: Record<Media["kind"], string> = { image: "Image", pdf: "PDF", video: "Video", doc: "Document", other: "Other file" };

export const money = (n: number, sign = false) => {
  const s = Math.abs(n).toLocaleString("en-US", { style: "currency", currency: "USD" });
  return sign ? (n < 0 ? "−" + s : n > 0 ? "+" + s : s) : n < 0 ? "−" + s : s;
};

/* --------------------------------------------------------- shared shapes */

export const SORT_NEW: Sort = { id: "new", label: "Newest first", key: (it) => it.at, dir: -1 };
export const SORT_OLD: Sort = { id: "old", label: "Oldest first", key: (it) => it.at, dir: 1 };
export const SORT_TITLE: Sort = { id: "az", label: "A to Z", key: (it) => it.title.toLowerCase(), dir: 1 };
export const sortNum = (id: string, label: string, field: string, dir: 1 | -1 = -1): Sort => ({ id, label, key: (it) => it.n[field] ?? null, dir });

export const GROUP_DAY: Group = { id: "day", label: "Day", key: (it) => it.day, order: "time", fmt: (k) => fmtDay(k) };
export const GROUP_WEEK: Group = { id: "week", label: "Week", key: (it) => (it.day ? weekOf(it.day) : null), order: "time", fmt: fmtWeek };
export const GROUP_MONTH: Group = { id: "month", label: "Month", key: (it) => (it.day ? monthOf(it.day) : null), order: "time", fmt: fmtMonth };
export const GROUP_WEEKDAY: Group = { id: "weekday", label: "Weekday", key: (it) => (it.day ? weekdayName(it.day) : null), order: "given", given: WEEKDAY_ORDER };
export const groupFacet = (id: string, label: string, opts: Partial<Group> = {}): Group => ({
  id,
  label,
  key: (it) => {
    const v = it.f[id];
    return v === undefined ? null : v;
  },
  order: "count",
  ...opts,
});

export const WEEKDAY_FACET: Facet = { id: "weekday", label: "Weekday", order: "given", given: WEEKDAY_ORDER };
export const MONTH_FACET: Facet = { id: "month", label: "Month", order: "alpha", fmt: fmtMonth };

/** Facets every dated item can carry. */
export const dateFacets = (day: string | null) => (day ? { weekday: weekdayName(day), month: monthOf(day) } : {});
