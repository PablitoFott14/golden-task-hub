import type { GoldenTask, SearchEntry } from "./types";
import { chargeDisputes } from "./tasks/chargeDisputes";
import { methodSteps } from "./method";
import { checklist } from "./checklist";
import { authoringStandards, rubricQualityIssues, specGroups, weightBuckets } from "./specDoc";
import { faq } from "./faq";
import { guidelineChanges } from "./changes";
import { taxonomy } from "./taxonomy";
import { onboardingItems } from "./onboarding";
import { universeVideos } from "./videos";
import { specRevisions } from "./specLog";

/** Matches the nav ids the Spec Doc page derives from its group names. */
const slug = (s: string) => s.replace(/[^a-z0-9]/gi, "-").toLowerCase();

export const tasks: GoldenTask[] = [chargeDisputes];

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

  /* One row per subcategory, not per use case: the subcategory is what a
     contributor is assigned and what they search for. The use case, the scope
     check and the scenarios ride along in `terms`, so searching a scenario
     word finds the pair it belongs to. */
  ...onboardingItems.map<SearchEntry>((c) => ({
    kind: "Onboarding" as const,
    title: c.title,
    hint: `${c.stats.map((x) => `${x.k} ${x.v}`).join(" · ")}`,
    to: "/reference#onboarding",
    terms: [c.tagline, c.blurb, c.covers.join(" "), "onboarding slides training intro"].join(" "),
  })),

  ...taxonomy.flatMap<SearchEntry>((g) =>
    g.subs.map((s) => ({
      kind: "Use case" as const,
      title: s.name,
      hint: `${g.l1} · L2`,
      to: "/reference#use-case-and-tools",
      terms: [
        g.l1,
        g.scope,
        s.covers,
        s.scenarios.join(" "),
        "category subcategory taxonomy use case L1 L2 assigned parameter",
      ].join(" "),
    }))
  ),

  ...guidelineChanges.map<SearchEntry>((c) => ({
    kind: "Must read" as const,
    title: c.title,
    hint: `${c.date} · ${c.version}`,
    to: `/reference#${c.id}`,
    terms: [
      c.body,
      c.does,
      c.refs.map((r) => `${r.section} ${r.title}`).join(" "),
      c.before ?? "",
      c.detail?.items.join(" ") ?? "",
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
    hint: `${t.meta.useCase} · single turn · ${t.meta.status}`,
    to: `/golden-tasks/${t.meta.id}`,
    terms: [
      t.meta.oneLiner,
      t.meta.universe,
      t.meta.persona,
      t.meta.subcategory,
      t.meta.deliverable,
      t.meta.modalities.join(" "),
      t.premise,
    ].join(" "),
  })),

  /* One row per stage, so searching a method step lands on the step of the
     walkthrough that implements it rather than on the task as a whole. */
  ...tasks.flatMap<SearchEntry>((t) =>
    t.stages.map((st) => ({
      kind: "Golden task" as const,
      title: st.title,
      hint: `Step ${st.step} in the walkthrough`,
      to: `/golden-tasks/${t.meta.id}#${st.id}`,
      terms: [st.did, st.why, st.handoff].join(" "),
    }))
  ),

  ...tasks.flatMap<SearchEntry>((t) => [
    {
      kind: "Golden task",
      title: "The resolved answer",
      hint: `All ${t.ledger.length} charges, and why each lands where it does`,
      to: `/golden-tasks/${t.meta.id}#gtfa`,
      terms: t.ledger
        .map((r) => `${r.merchant} ${r.date} ${r.charged} ${r.verdict} ${r.evidence} ${r.why}`)
        .join(" "),
    },
    {
      kind: "Golden task",
      title: "The one prompt, annotated",
      hint: "Every span that is doing work, and what the prompt withholds",
      to: `/golden-tasks/${t.meta.id}#prompt`,
      terms: [
        t.prompt.text,
        t.prompt.marks.map((m) => `${m.label} ${m.body}`).join(" "),
        t.prompt.withheld.map((w) => `${w.title} ${w.body}`).join(" "),
      ].join(" "),
    },
    {
      kind: "Golden task",
      title: "The assigned parameters",
      hint: "All seven, and what each one binds",
      to: `/golden-tasks/${t.meta.id}#parameters`,
      terms: [
        t.parameters.map((x) => `${x.label} ${x.value} ${x.binds}`).join(" "),
        t.scopeCheck.body,
        t.scopeCheck.neighbour,
      ].join(" "),
    },
    {
      kind: "Golden task",
      title: "Universe interaction",
      hint: "Which service decides which finding",
      to: `/golden-tasks/${t.meta.id}#universe`,
      terms: [
        t.universeFacts.map((f) => `${f.k} ${f.v}`).join(" "),
        t.universeSources.map((x) => `${x.service} ${x.carries} ${x.decides}`).join(" "),
      ].join(" "),
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
      hint: `${t.subjective.length} presentation criteria, each with the two renders it came from`,
      to: `/golden-tasks/${t.meta.id}#subjective`,
      terms: t.subjective
        .map((r) => `${r.text} ${r.artifact} ${r.asks} ${r.derived} ${r.legA.verdict} ${r.legB.verdict}`)
        .join(" "),
    },
    {
      kind: "Golden task",
      title: "Hinting in practice",
      hint: `${t.goldenRun.steers.length} steers, and what each one never says`,
      to: `/golden-tasks/${t.meta.id}#golden`,
      terms: [
        t.goldenRun.opening,
        t.goldenRun.steers
          .map((x) => `${x.prompt} ${x.missed} ${x.does.join(" ")} ${x.avoids.join(" ")} ${x.recovered}`)
          .join(" "),
        "golden solution steer hint user simulator leg b",
      ].join(" "),
    },
    {
      kind: "Golden task",
      title: "Where Model A broke",
      hint: t.run.summary,
      to: `/golden-tasks/${t.meta.id}#model-a`,
      terms: t.run.observations.map((o) => `${o.title} ${o.expected} ${o.actual}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "Designed friction",
      hint: `${t.traps.length} traps, and what each one tests`,
      to: `/golden-tasks/${t.meta.id}#gtfa`,
      terms: t.traps.map((x) => `${x.title} ${x.where} ${x.body} ${x.tests}`).join(" "),
    },
    {
      kind: "Golden task",
      title: "Multimodal inputs",
      hint: `${t.inputs.length} files, and the fact each one carries`,
      to: `/golden-tasks/${t.meta.id}#inputs`,
      terms: t.inputs.map((i) => `${i.file} ${i.shows} ${i.carries} ${i.charges.join(" ")}`).join(" "),
    },
  ]),

  ...checklist.flatMap<SearchEntry>((s) =>
    s.checks.map((c) => ({
      kind: "Pre-submit check" as const,
      title: `${c.id} · ${s.title}`,
      hint: c.q,
      to: `/reference#${s.id}`,
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

  ...specRevisions.flatMap<SearchEntry>((rev) =>
    rev.changes.map((ch) => ({
      kind: "QC spec" as const,
      title: `Spec change · ${ch.dimension}`,
      hint: `${rev.date} · ${ch.summary}`,
      to: "/spec#log",
      terms: `${ch.group} ${ch.detail} spec change log revision updated`,
    }))
  ),

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
    to: `/reference#${f.id}`,
    terms: `${f.a.join(" ")} ${f.topic} ${f.refs.map((r) => `${r.section} ${r.title}`).join(" ")}`,
  })),
];
