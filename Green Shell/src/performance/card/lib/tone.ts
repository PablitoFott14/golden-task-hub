import {
  AlertTriangle,
  CheckCircle2,
  Hourglass,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Impact, StatusKey } from "../types";

/**
 * Colour is a second signal, never the only one: every status, impact and score also carries its
 * label and an icon. Rose is the hub's "act on this" colour, amber its caution, emerald a pass.
 */
export interface Tone {
  icon: LucideIcon;
  text: string;
  iconWrap: string;
  bar: string;
  soft: string;
}

export const STATUS_TONE: Record<StatusKey, Tone> = {
  final_warning: {
    icon: AlertTriangle,
    text: "text-rose-700 dark:text-rose-300",
    iconWrap: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
    bar: "bg-rose-500",
    soft: "border-rose-500/30 bg-rose-500/10",
  },
  high_risk: {
    icon: TrendingDown,
    text: "text-amber-700 dark:text-amber-300",
    iconWrap: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    bar: "bg-amber-500",
    soft: "border-amber-500/30 bg-amber-500/10",
  },
  improvement_expected: {
    icon: TrendingUp,
    text: "text-sky-700 dark:text-sky-300",
    iconWrap: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
    bar: "bg-sky-500",
    soft: "border-sky-500/30 bg-sky-500/10",
  },
  on_track: {
    icon: CheckCircle2,
    text: "text-emerald-700 dark:text-emerald-300",
    iconWrap: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    bar: "bg-emerald-500",
    soft: "border-emerald-500/30 bg-emerald-500/10",
  },
  not_evaluated: {
    icon: Hourglass,
    text: "text-ink-700",
    iconWrap: "bg-ink-100 text-ink-500",
    bar: "bg-ink-300",
    soft: "border-ink-200 bg-raised",
  },
};

export const IMPACT: Record<Impact, { label: string; chip: string; dot: string }> = {
  failing: {
    label: "Failed a task",
    chip: "bg-rose-500/10 text-rose-700 ring-1 ring-inset ring-rose-500/25 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  issue: {
    label: "Non-failing issue",
    chip: "bg-amber-500/10 text-amber-700 ring-1 ring-inset ring-amber-500/25 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  requirement: {
    label: "Guidelines requirement",
    chip: "bg-sky-500/10 text-sky-700 ring-1 ring-inset ring-sky-500/25 dark:text-sky-300",
    dot: "bg-sky-500",
  },
};

/** A score's colour, by the band the status rules read: 1 and 2 fail, 3 passes with issues, 4 and 5 pass. */
export function scoreTone(score: number): string {
  if (score <= 2) return "bg-rose-500/15 text-rose-700 ring-rose-500/30 dark:text-rose-300";
  if (score === 3) return "bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-300";
  if (score === 4) return "bg-sky-500/15 text-sky-700 ring-sky-500/30 dark:text-sky-300";
  return "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300";
}
