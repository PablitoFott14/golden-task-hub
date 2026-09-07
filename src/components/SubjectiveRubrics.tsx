import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ExternalLink, GitCompare, Maximize2, Minimize2, X } from "lucide-react";
import type { Mark, RubricLeg, RubricView, SubjectiveRubric } from "../data/types";
import { asset, cx } from "../lib/util";
import { Ticks } from "./Rubrics";

/* ------------------------------------------------------------------ markdown */

/** `**bold**`, `*italic*` and `` `mono` ``, which is all the excerpts use. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <strong key={i} className="font-semibold text-ink-900">
              {p.slice(2, -2)}
            </strong>
          );
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2)
          return (
            <em key={i} className="text-ink-500">
              {p.slice(1, -1)}
            </em>
          );
        if (p.startsWith("`") && p.endsWith("`"))
          return (
            <code key={i} className="font-mono text-[0.92em] text-ink-800">
              {p.slice(1, -1)}
            </code>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

const cells = (row: string) =>
  row
    .split("|")
    .slice(1, -1)
    .map((c) => c.trim());

/**
 * The excerpt as a reader sees it, not as it is typed. A subjective criterion
 * is rated on the rendered document, so headings are headings and a table is a
 * table. Marked lines are the ones the criterion is about.
 */
function DocFrame({ view }: { view: Extract<RubricView, { kind: "doc" }> }) {
  const marked = new Set(view.mark);

  return (
    <div className="overflow-hidden rounded-lg border border-ink-200/70 bg-surface">
      <div className="space-y-1.5 p-3.5 text-[12.5px] leading-relaxed text-ink-700">
        {view.lines.map((line, i) => {
          const hit = marked.has(i);
          const frame = hit
            ? "-mx-1.5 rounded bg-gold-300/25 px-1.5 ring-1 ring-gold-500/40 dark:bg-gold-500/15"
            : "";

          // A table renders once, at its header row; the rest of it is skipped.
          if (line.trim().startsWith("|")) {
            const isHead = i === 0 || !view.lines[i - 1]?.trim().startsWith("|");
            if (!isHead) return null;
            const rows: string[] = [];
            for (let j = i; j < view.lines.length && view.lines[j].trim().startsWith("|"); j++)
              rows.push(view.lines[j]);
            const body = rows.filter((r) => !/^\|[\s|:-]+\|$/.test(r.trim()));
            return (
              <div key={i} className={cx("overflow-x-auto", frame)}>
                <table className="w-full border-collapse text-[11.5px]">
                  <tbody>
                    {body.map((r, ri) => (
                      <tr key={ri} className="border-b border-ink-200/60 last:border-0">
                        {cells(r).map((c, ci) => (
                          <td
                            key={ci}
                            className={cx(
                              "py-1 pr-3 align-top",
                              ri === 0 ? "font-semibold text-ink-800" : "text-ink-600"
                            )}
                          >
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          if (line.startsWith("### "))
            return (
              <p key={i} className={cx("font-display text-[13px] font-bold text-ink-900", frame)}>
                <Inline text={line.slice(4)} />
              </p>
            );
          if (line.startsWith("## "))
            return (
              <p key={i} className={cx("font-display text-[14px] font-bold text-ink-900", frame)}>
                <Inline text={line.slice(3)} />
              </p>
            );
          if (line.startsWith("> "))
            return (
              <p key={i} className={cx("border-l-2 border-ink-300 pl-2.5 text-ink-500", frame)}>
                <Inline text={line.slice(2)} />
              </p>
            );
          if (line.startsWith("- "))
            return (
              <p key={i} className={cx("flex gap-2", frame)}>
                <span aria-hidden className="select-none text-ink-400">
                  •
                </span>
                <span className="min-w-0 flex-1">
                  <Inline text={line.slice(2)} />
                </span>
              </p>
            );
          return (
            <p key={i} className={frame}>
              <Inline text={line} />
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- render */

/**
 * The artifact as it renders, framed on the part the criterion is about, with
 * that part boxed. Every box is written in the artifact's own coordinates, so
 * the framing maths is the same for a 1200px SVG and a 594px page image.
 */
function RenderFrame({
  view,
  whole,
  tone,
}: {
  view: Extract<RubricView, { kind: "render" }>;
  whole: boolean;
  tone: "a" | "b";
}) {
  const { canvas } = view;
  const f = whole || !view.focus ? { x: 0, y: 0, w: canvas.w, h: canvas.h } : view.focus;
  const pct = (n: number) => `${n * 100}%`;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-ink-200/70 bg-white"
      style={{ aspectRatio: `${f.w} / ${f.h}` }}
    >
      <img
        src={asset(view.src)}
        alt=""
        loading="lazy"
        className="absolute max-w-none"
        style={{ width: pct(canvas.w / f.w), left: pct(-f.x / f.w), top: pct(-f.y / f.h) }}
      />

      {view.marks?.map((m: Mark, i) => (
        <div
          key={i}
          className={cx(
            "absolute rounded-[3px] ring-2",
            tone === "a" ? "ring-rose-500/90" : "ring-emerald-500/90"
          )}
          style={{
            left: pct((m.box.x - f.x) / f.w),
            top: pct((m.box.y - f.y) / f.h),
            width: pct(m.box.w / f.w),
            height: pct(m.box.h / f.h),
          }}
        >
          {m.label && (
            <span
              className={cx(
                "absolute whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-bold leading-tight text-white shadow-soft",
                tone === "a" ? "bg-rose-600" : "bg-emerald-600",
                m.place === "below" && "top-full mt-1",
                m.place === "inside" && "top-1/2 -translate-y-1/2",
                (!m.place || m.place === "above") && "bottom-full mb-1",
                m.align === "right" ? "right-0" : "left-0",
                m.place === "inside" && (m.align === "right" ? "" : "left-1/2 -translate-x-1/2")
              )}
            >
              {m.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------- leg */

function Leg({ leg, side, whole }: { leg: RubricLeg; side: "A" | "B"; whole: boolean }) {
  const isA = side === "A";
  return (
    <div
      className={cx(
        "flex min-w-0 flex-col rounded-xl border p-3.5",
        isA
          ? "border-rose-300/50 bg-rose-50/40 dark:border-rose-500/25 dark:bg-rose-500/10"
          : "border-emerald-300/50 bg-emerald-50/40 dark:border-emerald-500/25 dark:bg-emerald-500/10"
      )}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span
          className={cx(
            "grid h-5 w-5 shrink-0 place-items-center rounded font-mono text-[10px] font-bold text-white",
            isA ? "bg-rose-600" : "bg-emerald-600"
          )}
        >
          {side}
        </span>
        <span
          className={cx(
            "mono-label",
            isA ? "text-rose-700 dark:text-rose-300" : "text-emerald-700 dark:text-emerald-300"
          )}
        >
          Leg {side}, {isA ? "the observed run" : "the golden"}
        </span>
        <a
          href={asset(leg.view.src)}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-1 rounded-md border border-ink-200/80 bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
        >
          Open <ExternalLink size={10} />
        </a>
      </div>

      {leg.view.kind === "render" ? (
        <RenderFrame view={leg.view} whole={whole} tone={isA ? "a" : "b"} />
      ) : (
        <DocFrame view={leg.view} />
      )}

      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-700">{leg.verdict}</p>
    </div>
  );
}

/* ---------------------------------------------------------------------- list */

/**
 * The subjective block. Each criterion is one row, and the two outcomes it was
 * written from sit behind a disclosure so ten of them fit on the page without
 * scrolling past a wall of artifacts.
 */
export default function SubjectiveRubrics({ rubrics }: { rubrics: SubjectiveRubric[] }) {
  const [open, setOpen] = useState<number[]>([]);
  const [whole, setWhole] = useState<number[]>([]);
  const allOpen = open.length === rubrics.length;

  const toggle = (n: number) =>
    setOpen((o) => (o.includes(n) ? o.filter((x) => x !== n) : [...o, n]));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpen(allOpen ? [] : rubrics.map((r) => r.n))}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
        >
          <GitCompare size={13} />
          {allOpen ? "Collapse every comparison" : "Expand every comparison"}
        </button>
        <span className="text-[12.5px] text-ink-400">
          Ten criteria. Open one to put the two outcomes side by side.
        </span>
      </div>

      <ol className="space-y-2">
        {rubrics.map((s) => {
          const on = open.includes(s.n);
          const full = whole.includes(s.n);
          const failed = s.status === "not-present";
          const framed = s.legA.view.kind === "render" && !!s.legA.view.focus;

          return (
            <li key={s.n} className="card overflow-hidden">
              <button
                onClick={() => toggle(s.n)}
                aria-expanded={on}
                className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-raised"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-mono text-[11px] font-bold text-brand-700 dark:text-brand-300">
                  {s.n}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-relaxed text-ink-800">
                    <Ticks text={s.text} />
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="chip bg-ink-100 font-mono text-ink-600 ring-1 ring-ink-200">
                      {s.artifact}
                    </span>
                    <span
                      className={cx(
                        "chip",
                        failed
                          ? "bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-300"
                          : "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/25 dark:text-emerald-300"
                      )}
                    >
                      {failed ? <X size={11} /> : <Check size={11} />}
                      {failed ? "Model A failed" : "Model A passed"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-ink-400">
                      <GitCompare size={11} />
                      {on ? "Hide the outcomes" : "Compare the outcomes"}
                    </span>
                  </span>
                </span>

                <ChevronDown
                  size={16}
                  aria-hidden
                  className={cx(
                    "mt-0.5 shrink-0 text-ink-400 transition-transform duration-200",
                    on && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-ink-200/70 p-4">
                      <div className="flex flex-wrap items-start gap-3 rounded-lg bg-raised px-3.5 py-2.5">
                        <div className="min-w-0 flex-1">
                          <div className="mono-label mb-1 text-ink-400">What it checks</div>
                          <p className="text-[12.5px] leading-relaxed text-ink-700">{s.asks}</p>
                        </div>
                        {framed && (
                          <button
                            onClick={() =>
                              setWhole((w) =>
                                w.includes(s.n) ? w.filter((x) => x !== s.n) : [...w, s.n]
                              )
                            }
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-ink-200 bg-surface px-2.5 py-1.5 text-[12px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
                          >
                            {full ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                            {full ? "Frame the criterion" : "Show the whole artifact"}
                          </button>
                        )}
                      </div>

                      <div className="mt-3 grid items-start gap-3 lg:grid-cols-2">
                        <Leg leg={s.legA} side="A" whole={full} />
                        <Leg leg={s.legB} side="B" whole={full} />
                      </div>

                      <div className="mt-3 border-l-2 border-brand-400/60 pl-3">
                        <div className="mono-label mb-1 text-brand-600 dark:text-brand-300">
                          Why this became a criterion
                        </div>
                        <p className="text-[12.5px] leading-relaxed text-ink-600">{s.derived}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
