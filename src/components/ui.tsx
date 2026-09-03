import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CornerDownRight } from "lucide-react";
import type { XLink } from "../data/types";
import { cx } from "../lib/util";

/** Fade and rise on first view. Safe on filtered content, unlike an observer. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("mono-label mb-2 text-brand-600 dark:text-brand-300", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx(align === "center" && "mx-auto max-w-2xl text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-[28px]">
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">{sub}</p>}
    </div>
  );
}

/** A labelled figure. Used for task metadata and answer counts. */
export function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: ReactNode;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-raised px-4 py-3">
      <div className="mono-label text-ink-400">{label}</div>
      <div
        className={cx(
          "mt-1 text-sm font-semibold text-ink-900",
          tone === "ok" && "text-emerald-600 dark:text-emerald-400",
          tone === "warn" && "text-amber-600 dark:text-amber-400",
          tone === "no" && "text-rose-600 dark:text-rose-400"
        )}
      >
        {value}
      </div>
    </div>
  );
}

/**
 * The cross-link row. Links are authored in both directions, so a pre-submit
 * check points at the golden-task section that demonstrates it and that
 * section points back at the check.
 */
export function Crosslinks({ links, className }: { links?: XLink[]; className?: string }) {
  if (!links || links.length === 0) return null;
  return (
    <div className={cx("flex flex-wrap gap-2", className)}>
      {links.map((l) => {
        const external = l.to.startsWith("http");
        const body = (
          <>
            {l.tag && (
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                {l.tag}
              </span>
            )}
            <span className="text-ink-600 group-hover:text-ink-900">{l.label}</span>
            {external ? (
              <ArrowUpRight size={12} className="shrink-0 text-ink-400" />
            ) : (
              <CornerDownRight size={12} className="shrink-0 text-ink-300" />
            )}
          </>
        );
        const cls =
          "group inline-flex items-center gap-1.5 rounded-lg border border-ink-200/80 bg-surface px-2.5 py-1.5 text-[12px] font-medium transition hover:-translate-y-px hover:border-brand-300 hover:shadow-soft";
        return external ? (
          <a key={l.to + l.label} href={l.to} target="_blank" rel="noreferrer" className={cls}>
            {body}
          </a>
        ) : (
          <Link key={l.to + l.label} to={l.to} className={cls}>
            {body}
          </Link>
        );
      })}
    </div>
  );
}

/** A boxed aside. `tone` sets the accent, never the meaning on its own. */
export function Callout({
  title,
  tone = "accent",
  icon,
  children,
}: {
  title: string;
  tone?: "accent" | "warn" | "no" | "gold" | "ok";
  icon?: ReactNode;
  children: ReactNode;
}) {
  const frame: Record<string, string> = {
    accent: "border-brand-300/70 bg-brand-50/60 dark:border-brand-500/30 dark:bg-brand-500/10",
    warn: "border-amber-300/70 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/10",
    no: "border-rose-300/70 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-500/10",
    gold: "border-gold-300/70 bg-gold-50/70 dark:border-gold-500/30 dark:bg-gold-500/10",
    ok: "border-emerald-300/70 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10",
  };
  const head: Record<string, string> = {
    accent: "text-brand-700 dark:text-brand-300",
    warn: "text-amber-700 dark:text-amber-300",
    no: "text-rose-700 dark:text-rose-300",
    gold: "text-gold-700 dark:text-gold-300",
    ok: "text-emerald-700 dark:text-emerald-300",
  };
  return (
    <div className={cx("rounded-xl border p-4", frame[tone])}>
      <div className={cx("mono-label mb-1.5 flex items-center gap-1.5", head[tone])}>
        {icon}
        {title}
      </div>
      <div className="text-[13px] leading-relaxed text-ink-700">{children}</div>
    </div>
  );
}

/**
 * The sticky walkthrough rail. Steps are numbered in reading order, and the
 * active one is marked by the number, the bar and the weight together, never
 * by colour alone.
 */
export function SectionRail({
  sections,
  active,
  title = "Walkthrough",
}: {
  sections: { id: string; label: string }[];
  active: string;
  title?: string;
}) {
  return (
    <nav aria-label={title} className="sticky top-24 hidden self-start lg:block">
      <div className="mono-label mb-3 text-ink-400">{title}</div>
      <ol className="space-y-0.5">
        {sections.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <Link
                to={{ hash: `#${s.id}` }}
                aria-current={on ? "true" : undefined}
                className={cx(
                  "group flex items-center gap-2.5 rounded-xl py-2 pl-2 pr-2.5 text-[13px] leading-snug transition duration-200",
                  on
                    ? "bg-brand-500/10 font-semibold text-brand-700 ring-1 ring-inset ring-brand-500/20 dark:text-brand-300"
                    : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                )}
              >
                <span
                  className={cx(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-lg font-mono text-[11px] font-bold transition duration-200",
                    on
                      ? "bg-brand-600 text-white shadow-glow"
                      : "bg-ink-100 text-ink-500 group-hover:bg-ink-200 group-hover:text-ink-800"
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
