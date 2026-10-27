import { Info, Route } from "lucide-react";
import type { Bundle, Status } from "../types";
import { STATUS_TONE, scoreTone } from "../lib/tone";
import { cx, shortDate } from "../lib/util";

/** Where a mean sits on the 1 to 5 track, as a percentage of its width. */
const pos = (v: number) => `${((Math.min(5, Math.max(1, v)) - 1) / 4) * 100}%`;

export const ZONES = [
  { from: 1, to: 3, label: "High Risk", note: "3.00 or below", tint: "bg-amber-500/15", swatch: "bg-amber-500", text: "text-amber-700 dark:text-amber-300" },
  { from: 3, to: 4, label: "On Track, But Don't Relax", note: "above 3.00", tint: "bg-sky-500/15", swatch: "bg-sky-500", text: "text-sky-700 dark:text-sky-300" },
  { from: 4, to: 5, label: "Top Performer", note: "above 4.00", tint: "bg-emerald-500/15", swatch: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-300" },
];

/** Why the status is not simply the band the average sits in. After a lift, the path says it. */
export function overrideNote(status: Status): string | null {
  if (status.key !== "final_warning") return null;
  return status.scores.some((p) => p.score >= 3)
    ? "The Final Call rule comes before the average: the audited task right after the pass that took you out of Final Call failed, so it applies again."
    : "The Final Call rule comes before the average: it applies whenever every audited task failed, with a score of 1 or 2.";
}

function StandingTrack({ status }: { status: Status }) {
  if (status.mean === null) return null;
  const note = overrideNote(status);
  return (
    <figure aria-label={`Average score ${status.meanDisplay} on a scale of 1 to 5`}>
      <figcaption className="mono-label text-ink-400">Your average on the 1 to 5 scale</figcaption>
      <div className="relative mt-9">
        <div className="flex h-3 overflow-hidden rounded-full ring-1 ring-inset ring-ink-200">
          {ZONES.map((z) => (
            <div key={z.label} className={z.tint} style={{ width: `${((z.to - z.from) / 4) * 100}%` }} />
          ))}
        </div>
        {[3, 4].map((t) => (
          <div key={t} className="absolute top-0 h-3 w-px bg-ink-400/70" style={{ left: pos(t) }} aria-hidden />
        ))}
        <div className="absolute -top-8 -translate-x-1/2" style={{ left: pos(status.mean) }}>
          <div className="rounded-md bg-ink-900 px-1.5 py-0.5 font-mono text-[12px] font-bold text-surface shadow-soft">
            {status.meanDisplay}
          </div>
          <div className="mx-auto h-[18px] w-0.5 bg-ink-900" />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[10.5px] text-ink-400">
          <span>1.00</span>
          <span className="absolute -translate-x-1/2" style={{ left: pos(3) }}>
            3.00
          </span>
          <span className="absolute -translate-x-1/2" style={{ left: pos(4) }}>
            4.00
          </span>
          <span>5.00</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {ZONES.map((z) => (
          <div key={z.label} className="min-w-0">
            <div className={cx("text-[12px] font-semibold leading-snug", z.text)}>{z.label}</div>
            <div className="text-[11px] text-ink-400">{z.note}</div>
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-3 flex gap-1.5 text-[12px] leading-relaxed text-ink-500">
          <Info size={13} className="mt-0.5 shrink-0" />
          {note}
        </p>
      )}
    </figure>
  );
}

function ScoreHistory({ status, onOpen }: { status: Status; onOpen: (attemptId: string) => void }) {
  if (!status.scores.length) return null;
  return (
    <div className="mt-7">
      <div className="mono-label text-ink-400">Each audited task, oldest first</div>
      <ol className="mt-2.5 flex flex-wrap gap-1.5">
        {status.scores.map((s, i) => (
          <li key={s.attemptId}>
            <button
              type="button"
              onClick={() => onOpen(s.attemptId)}
              title={`Attempt ${s.attemptId}, audited ${shortDate(s.auditDate)}: score ${s.score}`}
              aria-label={`Task ${i + 1}: score ${s.score}, attempt ${s.attemptId}. Open its feedback.`}
              className={cx(
                "focus-ring grid h-9 w-9 place-items-center rounded-lg font-mono text-[14px] font-bold ring-1 ring-inset transition hover:-translate-y-0.5",
                scoreTone(s.score)
              )}
            >
              {s.score}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[11.5px] text-ink-400">Each task counts once, at its latest audited attempt. Select one to read its feedback.</p>
    </div>
  );
}

export default function Standing({ bundle, onOpenAttempt }: { bundle: Bundle; onOpenAttempt: (id: string) => void }) {
  const s = bundle.status;
  const tone = STATUS_TONE[s.key];
  const Icon = tone.icon;
  return (
    <section id="standing" aria-labelledby="standing-title" className="scroll-mt-32">
      <div className="card overflow-hidden">
        <div className={cx("h-1.5", tone.bar)} />
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="mono-label text-ink-400">Your project standing</p>
            <div className="mt-3 flex items-center gap-3.5">
              <span className={cx("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", tone.iconWrap)}>
                <Icon size={24} strokeWidth={2.2} />
              </span>
              <h1 id="standing-title" className={cx("font-display text-[30px] font-bold leading-none tracking-tight sm:text-[36px]", tone.text)}>
                {s.label}
              </h1>
            </div>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-800">{s.message}</p>
            <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-ink-200/70 bg-raised px-3.5 py-3">
                <dt className="text-[11.5px] font-medium text-ink-500">Average score</dt>
                <dd className="mt-0.5 font-mono text-[22px] font-bold text-ink-900">{s.meanDisplay ?? "Not yet"}</dd>
              </div>
              <div className="rounded-xl border border-ink-200/70 bg-raised px-3.5 py-3">
                <dt className="text-[11.5px] font-medium text-ink-500">Audited tasks</dt>
                <dd className="mt-0.5 font-mono text-[22px] font-bold text-ink-900">{s.auditedTasks}</dd>
              </div>
              <div className="col-span-2 rounded-xl border border-ink-200/70 bg-raised px-3.5 py-3 sm:col-span-1">
                <dt className="text-[11.5px] font-medium text-ink-500">Latest audit</dt>
                <dd className="mt-1.5 text-[14px] font-semibold text-ink-900">
                  {s.scores.length ? shortDate(s.scores[s.scores.length - 1].auditDate) : "None yet"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:border-l lg:border-ink-200/70 lg:pl-12">
            {s.mean === null ? (
              <div className="flex h-full flex-col justify-center rounded-xl border border-dashed border-ink-200 bg-raised p-5 text-[13.5px] leading-relaxed text-ink-600">
                Your average, the score of each audited task and what it takes to move up will appear here after your
                first audit.
              </div>
            ) : (
              <>
                <StandingTrack status={s} />
                <ScoreHistory status={s} onOpen={onOpenAttempt} />
              </>
            )}
          </div>
        </div>

        {s.path && (
          <div className="flex gap-3 border-t border-ink-200/70 bg-raised px-5 py-4 sm:px-8">
            <Route size={18} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" />
            <div>
              <div className="text-[14px] font-semibold text-ink-900">{s.path.headline}</div>
              {s.path.detail && <div className="mt-0.5 text-[13.5px] leading-relaxed text-ink-600">{s.path.detail}</div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
