import type { CSSProperties, ReactNode } from "react";
import {
  Activity,
  BellRing,
  Bike,
  BookUser,
  CalendarDays,
  Database,
  Facebook,
  FolderOpen,
  HeartPulse,
  Instagram,
  Landmark,
  Mail,
  MessageCircle,
  MessageSquare,
  Plane,
  Slack,
  Table2,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cx } from "../../lib/util";
import { fmtDay, fmtShortDay } from "../../lib/explore/time";
import { money } from "../../lib/explore/ctx";
import type { Item } from "../../lib/explore/types";
import { useExplore } from "./context";

const ICONS: Record<string, LucideIcon> = {
  email: Mail,
  calendar: CalendarDays,
  contacts: BookUser,
  messaging: MessageSquare,
  messenger: MessageCircle,
  slack: Slack,
  plaid: Landmark,
  fintrack: Wallet,
  duffel: Plane,
  airtable: Table2,
  filesystem: FolderOpen,
  instagram: Instagram,
  facebook: Facebook,
  apple_health: HeartPulse,
  fitbit: Activity,
  strava: Bike,
  reminder: BellRing,
};

/** Each server's own tint, so a record's origin reads at a glance. */
const TINT: Record<string, number> = {
  email: 250,
  calendar: 210,
  contacts: 280,
  messaging: 150,
  messenger: 230,
  slack: 320,
  plaid: 165,
  fintrack: 120,
  duffel: 200,
  airtable: 60,
  filesystem: 80,
  instagram: 350,
  facebook: 255,
  apple_health: 15,
  fitbit: 185,
  strava: 40,
  reminder: 95,
};

export function ServerIcon({ server, size = 15, className }: { server: string; size?: number; className?: string }) {
  const Icon = ICONS[server] ?? Database;
  return <Icon size={size} className={className} aria-hidden />;
}

export const tint = (server: string) => ({ "--t": TINT[server] ?? 260 }) as CSSProperties;

/** A server's icon in its tint, for list rows. */
export function ServerMark({ server, size = 28 }: { server: string; size?: number }) {
  return (
    <span
      style={{ ...tint(server), width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-lg bg-[oklch(0.95_0.03_var(--t))] text-[oklch(0.42_0.11_var(--t))] dark:bg-[oklch(0.3_0.05_var(--t))] dark:text-[oklch(0.85_0.08_var(--t))]"
    >
      <ServerIcon server={server} size={Math.round(size * 0.52)} />
    </span>
  );
}

export function ServerTag({ server, label }: { server: string; label: string }) {
  return (
    <span
      style={tint(server)}
      className="inline-flex items-center gap-1 rounded-md bg-[oklch(0.95_0.03_var(--t))] px-1.5 py-0.5 text-[11.5px] font-semibold text-[oklch(0.4_0.11_var(--t))] dark:bg-[oklch(0.3_0.05_var(--t))] dark:text-[oklch(0.86_0.08_var(--t))]"
    >
      <ServerIcon server={server} size={12} />
      {label}
    </span>
  );
}

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
export const initialsOf = (n: string) =>
  n
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

export function Avatar({ name, size = 28, className }: { name: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      style={{ "--eh": hash(name) % 360, width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.38)) } as CSSProperties}
      className={cx(
        "grid shrink-0 place-items-center rounded-full bg-[oklch(0.92_0.05_var(--eh))] font-bold text-[oklch(0.36_0.1_var(--eh))] dark:bg-[oklch(0.34_0.06_var(--eh))] dark:text-[oklch(0.9_0.06_var(--eh))]",
        className
      )}
    >
      {initialsOf(name)}
    </span>
  );
}

/** Text with the search terms marked. */
export function Highlight({ text, terms, className }: { text: string; terms: string[]; className?: string }) {
  if (!terms.length || !text) return <span className={className}>{text}</span>;
  const low = text.toLowerCase();
  const marks: [number, number][] = [];
  for (const t of terms) {
    let k = low.indexOf(t);
    while (k >= 0 && marks.length < 40) {
      marks.push([k, k + t.length]);
      k = low.indexOf(t, k + t.length);
    }
  }
  if (!marks.length) return <span className={className}>{text}</span>;
  marks.sort((a, b) => a[0] - b[0]);
  const out: ReactNode[] = [];
  let at = 0;
  marks.forEach(([a, b], n) => {
    if (a < at) return;
    if (a > at) out.push(text.slice(at, a));
    out.push(
      <mark key={n} className="rounded-[3px] bg-amber-200/70 px-px text-inherit dark:bg-amber-400/30">
        {text.slice(a, b)}
      </mark>
    );
    at = b;
  });
  out.push(text.slice(at));
  return <span className={className}>{out}</span>;
}

/** A snippet of a long text around the first search term. */
export function snippet(text: string, terms: string[], max = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const low = flat.toLowerCase();
  const k = terms.map((t) => low.indexOf(t)).filter((x) => x >= 0).sort((a, b) => a - b)[0];
  if (k === undefined || k < max * 0.6) return flat.slice(0, max - 1).trimEnd() + "…";
  const start = Math.max(0, k - Math.round(max * 0.3));
  return "…" + flat.slice(start, start + max - 2).trim() + "…";
}

export function useWhen() {
  const { clock, ix } = useExplore();
  const year = (ix.persona.now ?? ix.dayMax ?? "").slice(0, 4);
  return {
    full(it: Item) {
      if (it.at === null) return "";
      if (it.allDay && it.day) return fmtDay(it.day);
      return clock.dateTime(it.at);
    },
    /** "Oct 20", with the year when it is not the persona's present year. */
    short(it: Item) {
      if (!it.day) return "";
      return fmtShortDay(it.day) + (it.day.slice(0, 4) !== year ? `, ${it.day.slice(0, 4)}` : "");
    },
    time(it: Item) {
      return it.at === null || it.allDay ? "" : clock.time(it.at);
    },
  };
}

export function Amount({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cx("font-mono tabular-nums", value > 0 ? "text-emerald-700 dark:text-emerald-300" : value < 0 ? "text-ink-900" : "text-ink-500", className)}>
      {money(value, true)}
    </span>
  );
}

export function EntityChip({ e, extra, onClick, size = "md" }: { e: number; extra?: ReactNode; onClick?: () => void; size?: "sm" | "md" }) {
  const { ix, openEntity } = useExplore();
  const ent = ix.entities[e];
  if (!ent) return null;
  return (
    <button
      type="button"
      onClick={onClick ?? (() => openEntity(e))}
      className={cx(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border border-ink-200 bg-surface text-left text-ink-800 transition hover:border-ink-300 hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
        size === "sm" ? "py-0.5 pl-0.5 pr-2 text-[12px]" : "py-1 pl-1 pr-2.5 text-[13px]"
      )}
      title={`${ent.name}: ${ent.items.length} records in ${Object.keys(ent.servers).length} servers`}
    >
      <Avatar name={ent.name} size={size === "sm" ? 18 : 22} />
      <span className="truncate font-medium">{ent.name}</span>
      {extra}
    </button>
  );
}

export function Pill({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <span title={title} className={cx("inline-flex items-center gap-1 rounded-md bg-ink-100 px-1.5 py-0.5 text-[11.5px] font-medium text-ink-600 ring-1 ring-inset ring-ink-200/70", className)}>
      {children}
    </span>
  );
}

export function Section({ title, count, children, action }: { title: string; count?: number; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="border-t border-ink-200/70 px-5 py-4">
      <div className="mb-2.5 flex items-center gap-2">
        <h3 className="mono-label text-ink-500">{title}</h3>
        {count !== undefined && <span className="font-mono text-[11px] text-ink-400">{count}</span>}
        <span className="flex-1" />
        {action}
      </div>
      {children}
    </section>
  );
}

export const plural = (n: number, one: string, many?: string) => `${n.toLocaleString("en-US")} ${n === 1 ? one : many ?? one + "s"}`;
