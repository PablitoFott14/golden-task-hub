/**
 * Dates in the persona's own time zone.
 *
 * Every viewer engine formats its dates in one zone, the `TZ` constant at the
 * top of its script, whatever zone the reader is in. Explore buckets records
 * into days in that same zone, so a day here holds exactly what the viewer
 * shows under that date. Seeds mix epoch seconds, epoch milliseconds, ISO
 * strings with an offset and ISO strings without one; a string without an
 * offset is wall time in the persona's zone, and a bare date is a whole day.
 */

export interface Clock {
  tz: string;
  /** `YYYY-MM-DD` of an instant, in the persona's zone. */
  day(ms: number): string;
  /** Minutes since local midnight, 0 to 1439. */
  minute(ms: number): number;
  /** Wall time in the persona's zone to an instant. */
  fromWall(y: number, mo: number, d: number, h?: number, mi?: number, s?: number): number;
  /** Any seed timestamp to an instant, or null. `dateOnly` is set for a bare date. */
  parse(v: unknown): { ms: number; dateOnly: boolean } | null;
  time(ms: number): string;
  dateTime(ms: number): string;
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?)?\s*(Z|[+-]\d{2}:?\d{2})?$/;

export function makeClock(tz: string): Clock {
  let zone = tz;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: zone });
  } catch {
    zone = "UTC";
  }
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric", minute: "2-digit" });
  const dtFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  /** The zone's offset at an instant, cached per quarter hour: every zone's
   *  offset changes on a quarter hour boundary. */
  const offCache = new Map<number, number>();
  const offset = (ms: number): number => {
    const q = Math.floor(ms / 900_000);
    const hit = offCache.get(q);
    if (hit !== undefined) return hit;
    const at = q * 900_000;
    const p: Record<string, number> = {};
    for (const x of parts.formatToParts(new Date(at))) if (x.type !== "literal") p[x.type] = Number(x.value);
    const off = Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second) - at;
    offCache.set(q, off);
    return off;
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const day = (ms: number) => {
    const d = new Date(ms + offset(ms));
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  };
  const minute = (ms: number) => {
    const d = new Date(ms + offset(ms));
    return d.getUTCHours() * 60 + d.getUTCMinutes();
  };
  const fromWall = (y: number, mo: number, d: number, h = 0, mi = 0, s = 0) => {
    const guess = Date.UTC(y, mo - 1, d, h, mi, s);
    const first = guess - offset(guess);
    // Across a change of offset the first guess can land an hour out.
    return guess - offset(first);
  };

  const parse = (v: unknown): { ms: number; dateOnly: boolean } | null => {
    if (v === null || v === undefined || v === "" || typeof v === "boolean") return null;
    if (typeof v === "number" || (typeof v === "string" && /^\d{9,13}(\.\d+)?$/.test(v.trim()))) {
      const n = Number(v);
      if (!Number.isFinite(n) || n <= 0) return null;
      const ms = n > 1e12 ? n : n * 1000;
      // Anything outside 2001 to 2096 is a count, not a time.
      return ms > 978_307_200_000 && ms < 4_000_000_000_000 ? { ms, dateOnly: false } : null;
    }
    if (typeof v !== "string") return null;
    const m = ISO.exec(v.trim());
    if (!m) return null;
    const [, y, mo, d, h, mi, s, z] = m;
    if (h === undefined) return { ms: fromWall(+y, +mo, +d, 12), dateOnly: true };
    if (z) {
      const ms = Date.parse(v.trim().replace(" ", "T"));
      return Number.isNaN(ms) ? null : { ms, dateOnly: false };
    }
    return { ms: fromWall(+y, +mo, +d, +h, +mi, s ? +s : 0), dateOnly: false };
  };

  return {
    tz: zone,
    day,
    minute,
    fromWall,
    parse,
    time: (ms) => timeFmt.format(new Date(ms)),
    dateTime: (ms) => dtFmt.format(new Date(ms)),
  };
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const ymd = (day: string) => {
  const [y, m, d] = day.split("-").map(Number);
  return { y, m, d };
};
/** Day number since the epoch, for arithmetic on `YYYY-MM-DD`. */
export const dayNum = (day: string) => {
  const { y, m, d } = ymd(day);
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000);
};
export const numDay = (n: number) => new Date(n * 86_400_000).toISOString().slice(0, 10);
export const addDays = (day: string, n: number) => numDay(dayNum(day) + n);
export const weekdayOf = (day: string) => new Date(dayNum(day) * 86_400_000).getUTCDay();
export const weekdayName = (day: string) => WEEKDAYS[weekdayOf(day)];
/** The Monday that starts a day's week. */
export const weekOf = (day: string) => addDays(day, -((weekdayOf(day) + 6) % 7));
export const monthOf = (day: string) => day.slice(0, 7);

export const fmtDay = (day: string, withYear = true) => {
  const { y, m, d } = ymd(day);
  return `${WEEKDAYS[weekdayOf(day)]}, ${MONTHS[m - 1]} ${d}${withYear ? `, ${y}` : ""}`;
};
export const fmtDayLong = (day: string) => {
  const { y, m, d } = ymd(day);
  return `${WEEKDAYS_LONG[weekdayOf(day)]}, ${MONTHS_LONG[m - 1]} ${d}, ${y}`;
};
export const fmtShortDay = (day: string) => {
  const { m, d } = ymd(day);
  return `${MONTHS[m - 1]} ${d}`;
};
export const fmtMonth = (month: string) => {
  const [y, m] = month.split("-").map(Number);
  return `${MONTHS_LONG[m - 1]} ${y}`;
};
export const fmtWeek = (monday: string) => `Week of ${fmtShortDay(monday)}, ${monday.slice(0, 4)}`;
export const WEEKDAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
