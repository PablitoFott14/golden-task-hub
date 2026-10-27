import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import type { Attempt } from "../../types";
import { scoreTone } from "../../lib/tone";
import { cx, shortDate } from "../../lib/util";
import { AttemptBody } from "../Feedback";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * One attempt's feedback in a panel over the page, so a finding or a score opens it without losing the
 * reader's place: Escape, the close button or the backdrop closes it, and focus goes back to what opened
 * it. The passage a finding points at is marked and brought into view, as on the current page.
 */
export default function FeedbackSheet({
  attempt,
  quote,
  pulse,
  onClose,
}: {
  attempt: Attempt;
  quote?: string;
  pulse: number;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [original, setOriginal] = useState(false);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => setOriginal(false), [attempt.attemptId]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !panel.current) return;
    const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50" onKeyDown={onKeyDown}>
      <div className="sheet-fade absolute inset-0 bg-ink-950/45" onClick={onClose} aria-hidden />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="sheet-in absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-surface shadow-lift sm:border-l sm:border-ink-200/70"
      >
        <header className="flex items-center gap-3 px-4 py-3 sm:px-6">
          <span
            className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-[15px] font-bold ring-1 ring-inset", scoreTone(attempt.score))}
            aria-label={`Score ${attempt.score}`}
          >
            {attempt.score}
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="sheet-title" className="text-[15px] font-semibold leading-snug text-ink-900">
              {shortDate(attempt.auditDate)} · {attempt.verdict}
            </h2>
            <p className="break-all font-mono text-[12px] font-medium text-ink-500">{attempt.attemptId}</p>
            <p className="mt-1 text-[12px] leading-snug text-ink-600">
              The same feedback is sent to your Outlier dashboard: look for this attempt ID in its Quality section.
            </p>
          </div>
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label="Close the feedback"
            className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-900 active:bg-ink-100"
          >
            <X size={17} aria-hidden />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <AttemptBody
            attempt={attempt}
            quote={quote}
            pulse={pulse}
            original={original}
            onToggleOriginal={() => setOriginal((o) => !o)}
          />
        </div>
      </div>
    </div>
  );
}
