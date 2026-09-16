import type { GoldenTask, SearchEntry } from "./types";
import { vendorCloseout } from "./tasks/vendorCloseout";
import { methodSteps } from "./method";
import { checklist } from "./checklist";
import { authoringStandards, rubricQualityIssues, specGroups, weightBuckets } from "./specDoc";
import { faq } from "./faq";
import { guidelineChanges } from "./changes";
import { universeVideos } from "./videos";

/** Matches the nav ids the Spec Doc page derives from its group names. */
const slug = (s: string) => s.replace(/[^a-z0-9]/gi, "-").toLowerCase();

export const tasks: GoldenTask[] = [vendorCloseout];

export function taskById(id: string): GoldenTask | undefined {
  return tasks.find((t) => t.meta.id === id);
}

/**
 * The ⌘K index. Written per content type rather than generated, so a new
 * content shape stays invisible to search until it is mapped here.
 * `terms` is folded into the match but never displayed, which is how a search
 * for a vendor name finds the evidence ledger.
 */
export const searchIndex: SearchEntry[] = [
  ...methodSteps.map<SearchEntry>((s) => ({
    kind: "Method",
    title: `${s.n}. ${s.title}`,
    hint: s.slogan,
    to: `/#${s.id}`,
    terms: [s.means, s.produces, s.moves.join(" "), s.rule?.body ?? "", s.inTask.body].join(" "),
  })),

  ...guidelineChanges.map<SearchEntry>((c) => ({
    kind: "Change" as const,
    title: c.title,
    hint: `${c.date} · ${c.version}`,
    to: "/#latest-changes",
    terms: [
      c.body,
      c.does,
      `${c.ref.section} ${c.ref.title}`,
      "guideline change update version history new latest",
    ].join(" "),
  })),

  ...universeVideos.map<SearchEntry>((v) => ({
    kind: "Video" as const,
    title: v.title,
    hint: `Universe interaction · ${v.duration}`,
    to: "/#universe-videos",
    terms: [
      v.covers,
      v.seen,
      v.fix,
      "universe interaction recording screencast artifact id snapshot load explore agent database redeploy",
    ].join(" "),
  })),

  ...tasks.map<SearchEntry>((t) => ({
    kind: "Golden task",
    title: t.meta.title,
    hint: `${t.meta.category} · ${t.meta.turns} turns · ${t.meta.status}`,
    to: `/golden-tasks/${t.meta.id}`,
    terms: [
      t.meta.oneLiner,
      t.meta.universe,
      t.meta.persona,
      t.meta.subcategory,
      t.meta.deliverables.join(" "),
      t.meta.modalities.join(" "),
      t.premise,
    ].join(" "),
  })),

  ...tasks.flatMap<SearchEntry>((t) => [
    {
      kind: "Golden task",
      title: "Evidence ledger",
      hint: `All ${t.ledger.length} vendors, and why each lands where it does`,
      to: `/golden-tasks/${t.meta.id}#ledger`,
      terms: t.ledger.map((r) => `${r.vendor} ${r.verdict} ${r.why}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "The four prompts",
      hint: "What each turn adds, and the state it consumes",
      to: `/golden-tasks/${t.meta.id}#turns`,
      terms: t.turns.map((x) => `${x.text} ${x.adds} ${x.consumes}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "Draft History",
      hint: "The Agent Objective and the Desired Outcome, as the task was filed",
      to: `/golden-tasks/${t.meta.id}#draft-history`,
      terms: [
        t.draftHistory.objective.join(" "),
        t.draftHistory.objectiveReads.map((r) => `${r.title} ${r.body}`).join(" "),
        t.draftHistory.outcome
          .map((o) => `${o.summary} ${o.produces.join(" ")} ${o.lines.join(" ")}`)
          .join(" "),
        "agent objective desired outcome",
      ].join(" "),
    },
    {
      kind: "Golden task",
      title: "Objective rubrics",
      hint: `${t.rubrics.length} criteria, rated against Model A`,
      to: `/golden-tasks/${t.meta.id}#rubrics`,
      terms: t.rubrics.map((r) => `${r.text} ${r.category} ${r.target}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "Subjective rubrics",
      hint: `${t.subjective.length} presentation criteria, each with the OT and GT renders it came from`,
      to: `/golden-tasks/${t.meta.id}#subjective`,
      terms: t.subjective
        .map((r) => `${r.text} ${r.artifact} ${r.asks} ${r.derived} ${r.legA.verdict} ${r.legB.verdict}`)
        .join(" "),
    },
    {
      kind: "Golden task",
      title: "Milestones",
      hint: `${t.milestones.length} milestones, grouped by turn`,
      to: `/golden-tasks/${t.meta.id}#milestones`,
      terms: t.milestones.map((m) => `turn ${m.turn} ${m.text}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "Hinting in practice",
      hint: "The milestone check after each turn, and the steer the run needed",
      to: `/golden-tasks/${t.meta.id}#hinting`,
      terms: [
        t.goldenRun.hint.prompt,
        t.goldenRun.hint.missed,
        t.goldenRun.hint.recovered,
        t.goldenRun.checks.map((c) => `${c.title} ${c.body} ${c.next}`).join(" "),
        "golden conversation transcript hint milestone check",
      ].join(" "),
    },
    {
      kind: "Golden task",
      title: "Designed friction",
      hint: `${t.traps.length} traps, and what each one tests`,
      to: `/golden-tasks/${t.meta.id}#traps`,
      terms: t.traps.map((x) => `${x.title} ${x.where} ${x.body} ${x.tests}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "Multimodal inputs",
      hint: `${t.inputs.length} files, and the fact each one carries`,
      to: `/golden-tasks/${t.meta.id}#inputs`,
      terms: t.inputs.map((i) => `${i.file} ${i.shows} ${i.carries}`).join(" "),
    },
  ]),

  ...checklist.flatMap<SearchEntry>((s) =>
    s.checks.map((c) => ({
      kind: "Pre-submit check" as const,
      title: `${c.id} · ${s.title}`,
      hint: c.q,
      to: `/checklist#${s.id}`,
      terms: `${c.f} ${c.ref} ${s.prompt}`,
    }))
  ),

  ...specGroups.flatMap<SearchEntry>((g) =>
    g.dimensions.map((d) => ({
      kind: "QC spec" as const,
      title: `${g.group} · ${d.name}`,
      hint: d.question,
      to: `/spec#${slug(g.group)}`,
      terms: [d.description, d.errorTags.map((t) => t.label).join(" "), d.options.map((o) => o.text).join(" ")].join(" "),
    }))
  ),

  ...rubricQualityIssues.map<SearchEntry>((i) => ({
    kind: "QC spec",
    title: `${i.severity} issue · ${i.name}`,
    hint: i.definition.split("\n")[0],
    to: "/spec#rubric-quality",
    terms: i.definition,
  })),

  ...weightBuckets.map<SearchEntry>((b) => ({
    kind: "QC spec",
    title: `Weight ${b.score > 0 ? `+${b.score}` : b.score} · ${b.level}`,
    hint: b.definition.split("\n")[0],
    to: "/spec#weights",
    terms: `${b.definition} ${b.examples.join(" ")}`,
  })),

  ...authoringStandards.map<SearchEntry>((st) => ({
    kind: "QC spec",
    title: st.name,
    hint: st.body.split("\n")[0],
    to: "/spec#standards",
    terms: st.body,
  })),

  ...faq.map<SearchEntry>((f) => ({
    kind: "FAQ",
    title: f.q,
    hint: f.a[0],
    to: `/faq#${f.id}`,
    terms: `${f.a.join(" ")} ${f.topic} ${f.refs.map((r) => `${r.section} ${r.title}`).join(" ")}`,
  })),
];
