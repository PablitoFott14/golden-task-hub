import { useEffect, useRef, useState } from "react";
import { ChevronDown, FileText, Gauge, RotateCcw } from "lucide-react";
import type { Attempt, Block, Bundle, FeedbackSection, Focus } from "../types";
import { cx, shortDate, squash } from "../lib/util";
import { CopyButton, ScoreBadge, SectionHeading } from "./ui";

const SECTION: Record<FeedbackSection["kind"], { note: string; rule: string; tint: string }> = {
  solid: { note: "What held up", rule: "border-emerald-500/50", tint: "text-emerald-700 dark:text-emerald-300" },
  failing: { note: "The findings that failed the task", rule: "border-rose-500/60", tint: "text-rose-700 dark:text-rose-300" },
  nonfailing: { note: "Findings that cost points without failing the task", rule: "border-amber-500/60", tint: "text-amber-700 dark:text-amber-300" },
  extra: { note: "Further notes from the audit", rule: "border-sky-500/50", tint: "text-sky-700 dark:text-sky-300" },
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The text with the passage an improvement card points at marked, matched across line breaks. */
function Marked({ text, quote }: { text: string; quote?: string }) {
  if (!quote) return <>{text}</>;
  const words = squash(quote).split(" ").filter(Boolean);
  const m = words.length ? new RegExp(words.map(escapeRe).join("\\s+")).exec(text) : null;
  if (!m) return <>{text}</>;
  return (
    <>
      {text.slice(0, m.index)}
      <mark className="evidence" data-evidence>
        {m[0]}
      </mark>
      {text.slice(m.index + m[0].length)}
    </>
  );
}

function Blocks({ blocks, quote }: { blocks: Block[]; quote?: string }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.t === "dim" ? null : b.t === "q" ? (
          <pre
            key={i}
            className="my-2.5 overflow-x-auto whitespace-pre-wrap rounded-lg border border-ink-200/70 bg-raised px-3.5 py-2.5 font-mono text-[12.5px] leading-relaxed text-ink-800"
          >
            <Marked text={b.text} quote={quote} />
          </pre>
        ) : (
          <p key={i} className="my-2.5 text-[14px] leading-relaxed text-ink-800">
            <Marked text={b.text} quote={quote} />
          </p>
        )
      )}
    </>
  );
}

function Structured({ attempt, quote }: { attempt: Attempt; quote?: string }) {
  const s = attempt.feedback.structured!;
  return (
    <div>
      <Blocks blocks={s.lead} quote={quote} />
      {s.sections.map((sec) => {
        const look = SECTION[sec.kind];
        return (
          <section key={sec.name} className={cx("mt-6 border-l-[3px] pl-4 sm:pl-5", look.rule)}>
            <h4 className="flex flex-wrap items-baseline gap-x-2.5">
              <span className={cx("mono-label", look.tint)}>{sec.name}</span>
              <span className="text-[12px] text-ink-400">{look.note}</span>
            </h4>
            <Blocks blocks={sec.intro} quote={quote} />
            {sec.items.map((it) => (
              <article key={it.n} className="mt-4 rounded-xl border border-ink-200/70 bg-surface p-3.5 sm:p-4">
                <h5 className="flex gap-2 text-[14.5px] font-semibold leading-snug text-ink-900">
                  <span className="font-mono text-ink-400">{it.n}.</span>
                  <span>
                    <Marked text={it.title} quote={quote} />
                  </span>
                </h5>
                {(it.qcDimension || it.dimension || it.tags.length > 0) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(it.qcDimension || it.dimension) && (
                      <span className="chip !py-0.5 !text-[11px] bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200">
                        {it.dimension ? "Dimension: " : ""}
                        {it.dimension ?? it.qcDimension}
                      </span>
                    )}
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className={cx(
                          "chip !py-0.5 !text-[11px] ring-1 ring-inset",
                          t.startsWith("Fail")
                            ? "bg-rose-500/10 text-rose-700 ring-rose-500/25 dark:text-rose-300"
                            : "bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300"
                        )}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <Blocks blocks={it.blocks} quote={quote} />
              </article>
            ))}
          </section>
        );
      })}
      {s.closing && <p className="mt-6 border-t border-ink-200/70 pt-3 text-[12px] text-ink-400">{s.closing}</p>}
    </div>
  );
}

/**
 * One open attempt: its failing dimensions, the copy and original-text controls, the notes on complexity,
 * a correction or a replaced attempt, then the feedback itself with the passage `quote` marks scrolled
 * into view. Shared by both page layouts; the parent keeps `original` so it survives closing the attempt.
 * `narrow` holds the text to a reading measure (the compact layout).
 */
export function AttemptBody({
  attempt,
  quote,
  pulse,
  original,
  onToggleOriginal,
  narrow = false,
}: {
  attempt: Attempt;
  quote?: string;
  pulse: number;
  original: boolean;
  onToggleOriginal: () => void;
  narrow?: boolean;
}) {
  const body = useRef<HTMLDivElement>(null);
  const structured = attempt.feedback.structured;
  const showOriginal = original || !structured;

  useEffect(() => {
    if (!quote) return;
    const t = window.setTimeout(() => {
      const el = body.current?.querySelector("[data-evidence]");
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        el.classList.remove("flash");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("flash");
      }
    }, 350);
    return () => window.clearTimeout(t);
  }, [quote, pulse]);

  return (
    <div className="border-t border-ink-200/70">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-raised px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {attempt.failingDimensions.length === 0 && <span className="text-[12.5px] font-medium text-ink-500">No failing dimension</span>}
          {attempt.failingDimensions.map((d) => (
            <span key={d} className="chip !py-0.5 !text-[11px] bg-rose-500/10 text-rose-700 ring-1 ring-inset ring-rose-500/25 dark:text-rose-300">
              Failing: {d}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={attempt.feedback.raw} label="Copy feedback" done="Feedback copied" />
          {structured && (
            <button type="button" className="btn-sm focus-ring" onClick={onToggleOriginal} aria-pressed={original}>
              {original ? <RotateCcw size={14} /> : <FileText size={14} />}
              {original ? "Show structured view" : "Show original text"}
            </button>
          )}
        </div>
      </div>

      <div ref={body} className={cx("px-4 pb-6 pt-4 sm:px-6", narrow && "max-w-[40rem]")}>
        {attempt.complexity?.level && (
          <p className="mb-2 flex gap-2 text-[13px] text-ink-600">
            <Gauge size={15} className="mt-0.5 shrink-0 text-ink-400" />
            <span>
              <span className="font-semibold text-ink-800">Complexity: {attempt.complexity.level}.</span>{" "}
              {attempt.complexity.meetsBar === true && "Model A's genuine failure rate clears the client's 30% minimum."}
              {attempt.complexity.meetsBar === false && "Model A's failure rate falls short of the client's 30% minimum."}
            </span>
          </p>
        )}
        {attempt.corrected && (
          <p className="mb-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-[13px] text-sky-800 dark:text-sky-200">
            This attempt was rescored to {attempt.score} after a manual review. The audit's own score was {attempt.auditScore}.
          </p>
        )}
        {!attempt.countsTowardStatus && attempt.supersededBy && (
          <p className="mb-2 rounded-lg border border-ink-200 bg-raised px-3 py-2 text-[13px] text-ink-600">
            An earlier attempt at the same task. Your later attempt <span className="attempt-id">{attempt.supersededBy}</span> is the
            one that counts toward your status.
          </p>
        )}
        {showOriginal ? (
          <pre className="whitespace-pre-wrap break-words rounded-xl border border-ink-200/70 bg-raised p-4 font-mono text-[12.5px] leading-relaxed text-ink-800">
            {attempt.feedback.raw}
          </pre>
        ) : (
          <Structured attempt={attempt} quote={quote} />
        )}
      </div>
    </div>
  );
}

function AttemptCard({
  attempt,
  open,
  onToggle,
  quote,
  pulse,
}: {
  attempt: Attempt;
  open: boolean;
  onToggle: () => void;
  quote?: string;
  pulse: number;
}) {
  const [original, setOriginal] = useState(false);

  return (
    <article
      id={`attempt-${attempt.attemptId}`}
      tabIndex={-1}
      className={cx("card scroll-mt-32 overflow-hidden outline-none transition", open ? "col-span-full shadow-lift" : "card-hover")}
    >
      <button type="button" onClick={onToggle} aria-expanded={open} className="focus-ring flex w-full items-start justify-between gap-3 p-4 text-left">
        <span className="min-w-0">
          <span className="mono-label block text-[10px] text-ink-400">Attempt ID</span>
          <span className="attempt-id mt-0.5 block break-all">{attempt.attemptId}</span>
          <span className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-ink-500">
            <span>Audited {shortDate(attempt.auditDate)}</span>
            {attempt.complexity?.level && (
              <span className="inline-flex items-center gap-1">
                <Gauge size={12} /> {attempt.complexity.level}
              </span>
            )}
            {!attempt.countsTowardStatus && <span className="font-semibold text-ink-600">Earlier attempt, not counted</span>}
            {attempt.corrected && <span className="font-semibold text-sky-700 dark:text-sky-300">Rescored after review</span>}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-2">
          <ScoreBadge score={attempt.score} verdict={open ? attempt.verdict : undefined} />
          <ChevronDown size={17} className={cx("text-ink-400 transition", open && "rotate-180")} />
        </span>
      </button>

      {open && (
        <AttemptBody attempt={attempt} quote={quote} pulse={pulse} original={original} onToggleOriginal={() => setOriginal((o) => !o)} />
      )}
    </article>
  );
}

export default function Feedback({ bundle, focus }: { bundle: Bundle; focus: Focus | null }) {
  const [open, setOpen] = useState<string | null>(null);
  const [quote, setQuote] = useState<string | undefined>();
  const [pulse, setPulse] = useState(0);
  const attempts = bundle.attempts;

  useEffect(() => {
    if (!focus) return;
    setOpen(focus.attemptId);
    setQuote(focus.quote);
    setPulse((p) => p + 1);
    const t = window.setTimeout(() => {
      const el = document.getElementById(`attempt-${focus.attemptId}`);
      if (!el) return;
      if (!focus.quote) el.scrollIntoView({ block: "start", behavior: "smooth" });
      el.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(t);
  }, [focus]);

  return (
    <section id="feedback" aria-labelledby="feedback-title" className="scroll-mt-32">
      <SectionHeading id="feedback" eyebrow="Audited feedback" title="Every audited attempt">
        Newest first. Open an attempt to read its full feedback, every finding as the audit wrote it, and copy the original
        text.
      </SectionHeading>
      {attempts.length === 0 ? (
        <div className="card p-6 text-[14px] text-ink-600">No audited attempts yet. Each one appears here once its audit is complete.</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {attempts.map((a) => (
            <AttemptCard
              key={a.attemptId}
              attempt={a}
              open={open === a.attemptId}
              quote={open === a.attemptId ? quote : undefined}
              pulse={open === a.attemptId ? pulse : 0}
              onToggle={() => {
                setQuote(undefined);
                setOpen((o) => (o === a.attemptId ? null : a.attemptId));
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
