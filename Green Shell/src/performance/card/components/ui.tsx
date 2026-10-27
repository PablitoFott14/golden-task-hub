import { useState, type ReactNode } from "react";
import { Check, Copy, Moon, Sun } from "lucide-react";
import { cx, copyText } from "../lib/util";
import { scoreTone } from "../lib/tone";
import { useTheme } from "../lib/useTheme";

/** The hub's mark: a gold star on the brand's deepest indigo. */
export function Mark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl bg-brand-950 shadow-soft"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width={size / 2} height={size / 2}>
        <path d="M12 3.2l2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 16.5l-5.2 2.7 1-5.75-4.2-4.1 5.8-.85z" className="fill-gold-400" />
      </svg>
    </span>
  );
}

export function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-900 active:bg-ink-100"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  aside,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <div className="mono-label text-brand-600 dark:text-brand-300">{eyebrow}</div>
        <h2 id={`${id}-title`} className="mt-1.5 font-display text-[26px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[30px]">
          {title}
        </h2>
        {children && <div className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{children}</div>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

export function ScoreBadge({ score, verdict, size = "md" }: { score: number; verdict?: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-lg font-semibold ring-1 ring-inset",
        scoreTone(score),
        size === "sm" ? "px-1.5 py-0.5 text-[11.5px]" : "px-2.5 py-1 text-[12.5px]"
      )}
    >
      <span className="font-mono">{score}</span>
      {verdict && <span className="font-sans">{verdict}</span>}
    </span>
  );
}

export function CopyButton({ text, label, done = "Copied" }: { text: string; label: string; done?: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <button
      type="button"
      className="btn-sm focus-ring"
      onClick={async () => {
        const ok = await copyText(text);
        setState(ok ? "ok" : "fail");
        window.setTimeout(() => setState("idle"), 1800);
      }}
    >
      {state === "ok" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
      <span aria-live="polite">{state === "ok" ? done : state === "fail" ? "Copy failed" : label}</span>
    </button>
  );
}

/** The CB ID in the machine-readout register, full on wide screens and shortened on a phone. */
export function CbIdChip({ id }: { id: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-surface px-2.5 py-1.5 font-mono text-[12px] font-semibold text-ink-700"
      title={id}
    >
      <span className="mono-label text-[9.5px] text-ink-400">CB</span>
      <span className="hidden md:inline">{id}</span>
      <span className="md:hidden">
        {id.slice(0, 6)}…{id.slice(-4)}
      </span>
    </span>
  );
}
