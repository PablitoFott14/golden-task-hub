import type { GoldenTask, SearchEntry } from "./types";
import { vendorCloseout } from "./tasks/vendorCloseout";
import { checklist } from "./checklist";
import { clarifications, conflicts, history } from "./spec";
import { process } from "./process";

export const tasks: GoldenTask[] = [vendorCloseout];

export function taskById(id: string | undefined): GoldenTask | undefined {
  return tasks.find((t) => t.meta.id === id);
}

/** One flat index over everything the hub holds. Feeds the ⌘K palette. */
export const searchIndex: SearchEntry[] = [
  ...tasks.flatMap<SearchEntry>((t) => [
    {
      kind: "Golden task",
      title: t.meta.title,
      hint: `${t.meta.category} · ${t.meta.subcategory} · ${t.meta.turns} turns`,
      to: `/golden-tasks/${t.meta.id}`,
      terms: `${t.meta.oneLiner} ${t.meta.universe} ${t.meta.persona} ${t.meta.deliverables.join(" ")}`,
    },
    {
      kind: "Golden task",
      title: "The conversation — four annotated turns",
      hint: t.meta.title,
      to: `/golden-tasks/${t.meta.id}#conversation`,
      terms: `prompt turns follow-up revision ${t.turns.map((x) => x.adds).join(" ")}`,
    },
    {
      kind: "Golden task",
      title: "The inputs — eleven attached files",
      hint: t.meta.title,
      to: `/golden-tasks/${t.meta.id}#inputs`,
      terms: t.inputs.map((i) => `${i.file} ${i.shows} ${i.vendors.join(" ")}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "The evidence ledger — every vendor, both sources",
      hint: t.meta.title,
      to: `/golden-tasks/${t.meta.id}#ledger`,
      terms: t.ledger.map((r) => `${r.vendor} ${r.verdict} ${r.amount ?? ""}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "The rubric set — 21 objective criteria",
      hint: t.meta.title,
      to: `/golden-tasks/${t.meta.id}#rubrics`,
      terms: t.rubrics.map((r) => r.text).join(" "),
    },
    {
      kind: "Golden task",
      title: "The subjective block — 10 presentation criteria",
      hint: t.meta.title,
      to: `/golden-tasks/${t.meta.id}#subjective`,
      terms: t.subjective.map((r) => r.text).join(" "),
    },
    {
      kind: "Golden task",
      title: "What Model A actually did",
      hint: t.meta.title,
      to: `/golden-tasks/${t.meta.id}#model-a`,
      terms: `${t.run.summary} ${t.run.observations.map((o) => `${o.title} ${o.actual}`).join(" ")}`,
    },
    ...t.traps.map<SearchEntry>((p) => ({
      kind: "Golden task",
      title: p.title,
      hint: `Designed friction · ${p.where}`,
      to: `/golden-tasks/${t.meta.id}#traps`,
      terms: `${p.body} ${p.tests} trap friction`,
    })),
  ]),
  ...clarifications.map<SearchEntry>((c) => ({
    kind: "Clarification",
    title: `${c.n}. ${c.title}`,
    hint: c.tags.join(" · "),
    to: `/spec#c-${c.n}`,
    terms: `${c.question} ${c.asks.join(" ")} ${c.context.join(" ")} ${(c.proposal ?? []).join(" ")}`,
  })),
  ...conflicts.map<SearchEntry>((c) => ({
    kind: "Conflict",
    title: c.title,
    hint: "Sources disagree — open",
    to: `/spec#conflicts`,
    terms: `${c.a.says} ${c.b.says} ${c.guidance}`,
  })),
  ...checklist.flatMap<SearchEntry>((s) =>
    s.checks.map<SearchEntry>((c) => ({
      kind: "Pre-submit check",
      title: `${c.id} — ${c.q}`,
      hint: `${s.n}. ${s.title} · ${c.ref}`,
      to: `/checklist#${s.id}`,
      terms: c.f,
    })),
  ),
  ...process.map<SearchEntry>((p) => ({
    kind: "Process",
    title: `Step ${p.n} — ${p.title}`,
    hint: p.produces,
    to: `/#${p.id}`,
    terms: p.body,
  })),
  ...history.map<SearchEntry>((h) => ({
    kind: "History",
    title: h.change,
    hint: `${h.area} · ${h.state === "flagged" ? "needs a decision" : "settled"}`,
    to: "/spec#history",
    terms: h.why,
  })),
];

/** Cheap subsequence-free scoring: all terms must appear somewhere. */
export function search(q: string, limit = 24): SearchEntry[] {
  const needles = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!needles.length) return [];
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of searchIndex) {
    const title = e.title.toLowerCase();
    const hay = `${title} ${e.hint} ${e.terms}`.toLowerCase();
    if (!needles.every((n) => hay.includes(n))) continue;
    let score = 0;
    for (const n of needles) {
      if (title.startsWith(n)) score += 6;
      else if (title.includes(n)) score += 4;
      else if (e.hint.toLowerCase().includes(n)) score += 2;
      else score += 1;
    }
    scored.push({ e, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.e);
}
