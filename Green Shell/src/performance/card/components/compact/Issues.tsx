import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, ChevronDown, ChevronRight, FileSearch } from "lucide-react";
import type { Attempt, Bundle, Card, Impact, Ref } from "../../types";
import { isWritten } from "../../types";
import { scoreTone } from "../../lib/tone";
import { cx, scrollToId, shortDate } from "../../lib/util";

const SOURCE: Record<string, string> = { spec: "QC spec", guidelines: "Guidelines", appendix: "Spec appendix" };
const COST: Record<Impact, string> = { failing: "failed a task", issue: "cost points", requirement: "not scored" };

/** The area's number, the badge "For your next task" repeats beside its actions and the pages that help with it. */
export function Rank({ n, small }: { n: number; small?: boolean }) {
  return (
    <span
      className={cx(
        "grid shrink-0 place-items-center rounded-md bg-ink-100 font-mono font-bold text-ink-600 ring-1 ring-inset ring-ink-200/80",
        small ? "h-5 w-5 text-[11px]" : "h-6 w-6 text-[12px]"
      )}
      aria-hidden
    >
      {n}
    </span>
  );
}

/** One dot per audited task: dark where the issue was found, rose where it failed the task. */
function Frequency({ card }: { card: Card }) {
  const { attempts, of, failing } = card.frequency;
  const dots = Array.from({ length: Math.min(of, 12) }, (_, i) => (i < failing ? "fail" : i < attempts ? "hit" : "miss"));
  return (
    <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-500">
      <span className="flex gap-0.5" aria-hidden>
        {dots.map((d, i) => (
          <span key={i} className={cx("h-2 w-2 rounded-full", d === "fail" ? "bg-rose-500" : d === "hit" ? "bg-ink-600" : "bg-ink-200")} />
        ))}
      </span>
      <span>
        {attempts} of {of} task{of === 1 ? "" : "s"}
      </span>
      {failing > 0 ? (
        <span className="font-semibold text-rose-600 dark:text-rose-300">· {failing} failed</span>
      ) : (
        <span>· {COST[card.impact]}</span>
      )}
    </span>
  );
}

/** A finding as one row: the quote a written card cites, or the finding an automatic card files. */
interface Row {
  attemptId: string;
  text: string;
  quote?: string;
  guideline?: string | null;
}

function rowsOf(card: Card): Row[] {
  const out: Row[] = [];
  for (const e of card.evidence) {
    if (isWritten(e)) out.push({ attemptId: e.attemptId, text: e.quote, quote: e.quote, guideline: e.guideline });
    else for (const f of e.findings) out.push({ attemptId: e.attemptId, text: f.text, guideline: f.guideline });
  }
  return out;
}

function Finding({
  row,
  attempt,
  guideline,
  onShow,
}: {
  row: Row;
  attempt?: Attempt;
  guideline?: Ref;
  onShow: (attemptId: string, quote?: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onShow(row.attemptId, row.quote)}
        title={`Attempt ${row.attemptId}: open its feedback${row.quote ? " at this passage" : ""}`}
        aria-haspopup="dialog"
        className="focus-ring group flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-raised active:bg-ink-100"
      >
        {attempt && (
          <span
            className={cx("grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-[12px] font-bold ring-1 ring-inset", scoreTone(attempt.score))}
            aria-label={`Scored ${attempt.score}`}
          >
            {attempt.score}
          </span>
        )}
        <span className="min-w-0 max-w-prose flex-1">
          <span className={cx("block text-[14px] leading-relaxed text-ink-800", !row.quote && "line-clamp-3")}>
            {row.quote ? `“${row.text}”` : row.text}
          </span>
          <span className="mt-1 flex flex-wrap items-start gap-x-3 gap-y-0.5 text-[12px] text-ink-500">
            {attempt && <span>{shortDate(attempt.auditDate)}</span>}
            {guideline && (
              <span className="inline-flex min-w-0 items-start gap-1">
                <BookOpen size={12} className="mt-0.5 shrink-0" aria-hidden />
                <span>Guidelines {guideline.title}</span>
              </span>
            )}
          </span>
        </span>
        <FileSearch size={15} className="ml-auto mt-1 shrink-0 text-ink-400 transition-colors group-hover:text-brand-600" aria-hidden />
      </button>
    </li>
  );
}

/** A quiet toggle that folds secondary detail under an issue. */
function Fold({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="focus-ring inline-flex items-center gap-1 whitespace-nowrap rounded text-[13px] font-semibold text-ink-600 transition-colors hover:text-ink-900 active:text-ink-950"
      >
        <ChevronRight size={15} className={cx("transition-transform motion-reduce:transition-none", open && "rotate-90")} aria-hidden />
        {label}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

/** The standard the card is scored against and the full notes it restates. */
function Standard({ card }: { card: Card }) {
  const notes = card.fromImprovements ?? [];
  return (
    <div className="max-w-prose space-y-2.5">
      {card.standard.map((s, i) => (
        <figure key={i} className="border-l-2 border-brand-400 pl-3">
          <blockquote className="text-[13.5px] leading-relaxed text-ink-700">“{s.quote}”</blockquote>
          <figcaption className="mt-0.5 text-[12px] text-ink-500">
            {SOURCE[s.source]} · {s.where}
          </figcaption>
        </figure>
      ))}
      {notes.map((t, i) => (
        <div key={i} className="rounded-lg bg-raised p-3">
          <div className="text-[12px] font-semibold text-ink-500">From your feedback document</div>
          <p className="mt-1 text-[13.5px] leading-relaxed text-ink-700">{t}</p>
        </div>
      ))}
    </div>
  );
}

function Issue({
  card,
  written,
  open,
  onToggle,
  attempts,
  refs,
  onShow,
}: {
  card: Card;
  written: boolean;
  open: boolean;
  onToggle: () => void;
  attempts: Record<string, Attempt>;
  refs: Record<string, Ref>;
  onShow: (attemptId: string, quote?: string) => void;
}) {
  const panel = `issue-panel-${card.id}`;
  const rows = rowsOf(card);
  const notes = card.fromImprovements ?? [];
  const more = card.standard.length && notes.length ? "The standard and the full note" : card.standard.length ? "The standard you are scored against" : "The full note";
  return (
    <li id={`issue-${card.id}`} className="scroll-mt-28">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panel}
        className="focus-ring flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-raised/60 active:bg-raised sm:px-5"
      >
        <Rank n={card.rank} />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-ink-900">{card.issue}</span>
          <Frequency card={card} />
        </span>
        <ChevronDown
          size={18}
          className={cx("mt-0.5 shrink-0 text-ink-400 transition-transform motion-reduce:transition-none", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div id={panel} className="space-y-4 px-4 pb-5 sm:pl-14 sm:pr-6">
          {written && <p className="max-w-prose text-[14px] leading-relaxed text-ink-600">{card.observed}</p>}
          <div className="space-y-2">
            <Fold label={`Where the audits found it (${rows.length})`}>
              <ul className="-mx-2 max-w-prose divide-y divide-ink-200/70">
                {rows.map((r, i) => (
                  <Finding
                    key={i}
                    row={r}
                    attempt={attempts[r.attemptId]}
                    guideline={r.guideline ? refs[r.guideline] : undefined}
                    onShow={onShow}
                  />
                ))}
              </ul>
            </Fold>
            {(card.standard.length > 0 || notes.length > 0) && (
              <Fold label={more}>
                <Standard card={card} />
              </Fold>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

function ImprovementNotes({ notes }: { notes: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="focus-ring inline-flex items-center gap-1 whitespace-nowrap rounded text-[13px] font-semibold text-ink-600 transition-colors hover:text-ink-900 active:text-ink-950"
      >
        <ChevronRight size={15} className={cx("transition-transform motion-reduce:transition-none", open && "rotate-90")} aria-hidden />
        Your audit notes in full ({notes.length})
      </button>
      {open && (
        <ol className="card mt-2 space-y-3 px-4 py-4 sm:px-5">
          {notes.map((t, i) => (
            <li key={i} className="flex max-w-prose gap-3 text-[13.5px] leading-relaxed text-ink-700">
              <span className="font-mono text-[12px] font-bold text-ink-500">{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function Issues({
  bundle,
  onShow,
  focus,
}: {
  bundle: Bundle;
  onShow: (attemptId: string, quote?: string) => void;
  /** An issue to open and bring into view, from the standing's "Start with". */
  focus: { id: string; nonce: number } | null;
}) {
  const { cards, mode, note, improvementNotes } = bundle.priorities;
  const [open, setOpen] = useState<Set<string>>(() => new Set(cards.slice(0, 1).map((c) => c.id)));
  const attempts = Object.fromEntries(bundle.attempts.map((a) => [a.attemptId, a]));

  useEffect(() => {
    if (!focus) return;
    setOpen((s) => new Set(s).add(focus.id));
    const t = window.setTimeout(() => scrollToId(`issue-${focus.id}`), 40);
    return () => window.clearTimeout(t);
  }, [focus]);

  const toggle = (id: string) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="issues" aria-labelledby="issues-title" className="scroll-mt-28">
      <h2 id="issues-title" className="font-display text-[22px] font-bold tracking-tight text-ink-900 sm:text-[24px]">
        Areas where improvement is expected
      </h2>
      {note && <p className="mt-3 rounded-xl border border-ink-200 bg-raised px-4 py-3 text-[13.5px] leading-relaxed text-ink-600">{note}</p>}
      {cards.length > 0 && (
        <ul className="card mt-4 divide-y divide-ink-200/70 overflow-hidden">
          {cards.map((c) => (
            <Issue
              key={c.id}
              card={c}
              written={mode === "written"}
              open={open.has(c.id)}
              onToggle={() => toggle(c.id)}
              attempts={attempts}
              refs={bundle.refs}
              onShow={onShow}
            />
          ))}
        </ul>
      )}
      {improvementNotes.length > 0 && <ImprovementNotes notes={improvementNotes} />}
    </section>
  );
}
