import { ArrowDown, Info, Route } from "lucide-react";
import type { Bundle, Card, Status, StatusKey } from "../../types";
import { STATUS_TONE, scoreTone } from "../../lib/tone";
import { cx, shortDate } from "../../lib/util";
import { ZONES, overrideNote } from "../Standing";

interface Level {
  key: StatusKey;
  label: string;
  rule: string;
  swatch: string;
  text: string;
  /** The stretch of the average the level covers; Final Call has none. */
  band?: [number, number];
}

/**
 * The four levels, worst first. Final Call is set by failed audits rather than by the average, so it is
 * hatched, and ruled off from the average's three bands in the list on a phone.
 */
const LEVELS: Level[] = [
  { key: "final_warning", label: "Final Call", rule: "every audited task is a fail", swatch: "hatch-rose", text: STATUS_TONE.final_warning.text },
  ...ZONES.map((z, i) => ({
    key: (["high_risk", "improvement_expected", "on_track"] as const)[i],
    label: z.label,
    rule: z.note,
    swatch: z.swatch,
    text: z.text,
    band: [z.from, z.to] as [number, number],
  })),
];

/** The dot each projection carries: the colour of the level it leads to. */
const DOT: Record<StatusKey, string> = {
  final_warning: "bg-rose-500",
  high_risk: "bg-amber-500",
  improvement_expected: "bg-sky-500",
  on_track: "bg-emerald-500",
  not_evaluated: "bg-ink-300",
};

/** Each level's share of the bar: a quarter each, so Final Call reads as a level like the others. */
const SHARE = 100 / LEVELS.length;

/** The average's thresholds, under the bar where its bands meet. */
const TICKS = [...ZONES.map((z, i) => ({ value: z.from, at: (i + 1) * SHARE })), { value: ZONES[ZONES.length - 1].to, at: 100 }];

/**
 * Where the contributor stands on the bar, in percent of its width. Where the average decides the status,
 * the marker sits at the average inside its band and shows it; where a rule decides it (Final Call, or the
 * first pass after it), the marker sits mid-level, since the average is not what put them there.
 */
function place(status: Status): { x: number; mean: string | null } | null {
  const i = LEVELS.findIndex((l) => l.key === status.key);
  if (i < 0) return null;
  const band = LEVELS[i].band;
  if (!band || status.liftedFromWarning || status.mean === null) return { x: (i + 0.5) * SHARE, mean: null };
  const within = ((status.mean - band[0]) / (band[1] - band[0])) * 100;
  return { x: i * SHARE + (Math.min(94, Math.max(6, within)) / 100) * SHARE, mean: status.meanDisplay };
}

/**
 * The four levels on one bar, with a marker where the contributor stands, and the levels named under it:
 * a row on a wide screen, a list on a phone. Their level is marked on the bar by its full colour and the
 * marker, and under it by its ground and weight.
 */
function Scale({ status }: { status: Status }) {
  const here = place(status);
  return (
    <div className="mt-7">
      <div className="relative mt-9" aria-hidden>
        <div className="flex h-2.5 overflow-hidden rounded-full">
          {LEVELS.map((l) => (
            <span key={l.key} className={cx("w-1/4 border-l-2 border-surface first:border-l-0", l.swatch, l.key !== status.key && "opacity-30")} />
          ))}
        </div>
        {here && (
          <span className="absolute inset-y-0" style={{ left: `${here.x}%` }}>
            <span className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-ink-900 shadow-soft" />
            <span
              className={cx(
                "absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-ink-900 px-1.5 py-0.5 font-mono text-[11.5px] font-bold leading-tight text-surface shadow-soft",
                here.x > 85 ? "right-0 translate-x-2.5" : "left-0 -translate-x-1/2"
              )}
            >
              You{here.mean && ` · ${here.mean}`}
            </span>
          </span>
        )}
      </div>
      <div className="relative mt-1.5 h-4 font-mono text-[10.5px] text-ink-400" aria-hidden>
        {TICKS.map((t) => (
          <span key={t.value} className={cx("absolute", t.at === 100 ? "right-0" : "-translate-x-1/2")} style={t.at === 100 ? undefined : { left: `${t.at}%` }}>
            {t.value.toFixed(2)}
          </span>
        ))}
      </div>
      <ol aria-label="Status levels" className="mt-3 space-y-1 sm:grid sm:grid-cols-4 sm:gap-1.5 sm:space-y-0">
        {LEVELS.map((l) => {
          const on = l.key === status.key;
          const apart = l.key === "final_warning";
          return (
            <li
              key={l.key}
              aria-current={on ? "true" : undefined}
              className={cx(
                "relative flex gap-3 rounded-xl border px-2.5 py-2 sm:block sm:px-2",
                on ? STATUS_TONE[l.key].soft : "border-transparent",
                apart &&
                  "mb-3 after:absolute after:inset-x-2.5 after:-bottom-2 after:border-t after:border-dashed after:border-ink-300 after:content-[''] sm:mb-0 sm:after:hidden"
              )}
            >
              <span className={cx("w-1.5 shrink-0 self-stretch rounded-full sm:hidden", l.swatch, !on && "opacity-30")} />
              <span className="block min-w-0">
                <span className={cx("block text-[13px] leading-snug", on ? cx("font-bold", l.text) : "font-semibold text-ink-600")}>
                  {l.label}
                  {on && <span className="sr-only"> (your status)</span>}
                </span>
                <span className={cx("block text-[12px] leading-snug", apart ? "text-rose-700 dark:text-rose-300" : "text-ink-500")}>{l.rule}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Scores({ status, onOpen }: { status: Status; onOpen: (attemptId: string) => void }) {
  if (!status.scores.length) return null;
  const latest = status.scores[status.scores.length - 1];
  return (
    <div className="mt-4 max-w-[17rem]">
      <ol aria-label="Your scores, oldest first" className="flex flex-wrap gap-1.5">
        {status.scores.map((s, i) => (
          <li key={s.attemptId}>
            <button
              type="button"
              onClick={() => onOpen(s.attemptId)}
              title={`Attempt ${s.attemptId}, audited ${shortDate(s.auditDate)}: score ${s.score}. Open its feedback.`}
              aria-label={`Task ${i + 1}: score ${s.score}, attempt ${s.attemptId}. Open its feedback.`}
              aria-haspopup="dialog"
              className={cx(
                "focus-ring grid h-8 w-8 place-items-center rounded-lg font-mono text-[14px] font-bold ring-1 ring-inset transition-transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none",
                scoreTone(s.score)
              )}
            >
              {s.score}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[12px] leading-snug text-ink-500">
        Your scores, oldest first. Latest audit {shortDate(latest.auditDate)}. Each task counts once, at its latest attempt.
      </p>
      <p className="mt-3 flex gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-2.5 py-2 text-[13px] leading-snug text-ink-800">
        <Info size={15} className="mt-px shrink-0 text-brand-600 dark:text-brand-300" aria-hidden />
        <span>
          The feedback for these scores is sent to your <strong className="font-semibold text-ink-900">Outlier dashboard</strong>: find each
          task in its Quality section by attempt ID.
        </span>
      </p>
    </div>
  );
}

/** What the next audits do to the status, the arithmetic the build worked out from the record, then where to start. */
function Outlook({ status, first, onStart }: { status: Status; first?: Card; onStart: (cardId: string) => void }) {
  const path = status.path;
  if (!path) return null;
  const points = path.points ?? (path.detail ? [{ text: path.detail, to: null }] : []);
  return (
    <div className="border-t border-ink-200/70 bg-raised px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex gap-3">
        <Route size={18} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" aria-hidden />
        <div className="min-w-0 max-w-prose">
          <p className="text-[16px] font-semibold leading-snug text-ink-900">{path.headline}</p>
          {points.length > 0 && (
            <ul className="mt-3 space-y-2">
              {points.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-700">
                  <span className={cx("mt-2 h-2 w-2 shrink-0 rounded-full", p.to ? DOT[p.to] : "bg-ink-300")} aria-hidden />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          )}
          {first && (
            <p className="mt-4 border-t border-ink-200/70 pt-3.5 text-[14px] leading-relaxed text-ink-700">
              <button
                type="button"
                onClick={() => onStart(first.id)}
                className="focus-ring mr-1.5 inline-flex items-center gap-1 whitespace-nowrap rounded font-semibold text-brand-700 hover:text-brand-800 hover:underline active:text-brand-900 dark:text-brand-300 dark:hover:text-brand-200 dark:active:text-brand-100"
              >
                Start with issue {first.rank}
                <ArrowDown size={14} aria-hidden />
              </button>
              {first.issue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Standing({
  bundle,
  onOpenAttempt,
  onStart,
}: {
  bundle: Bundle;
  onOpenAttempt: (id: string) => void;
  onStart: (cardId: string) => void;
}) {
  const s = bundle.status;
  const tone = STATUS_TONE[s.key];
  const Icon = tone.icon;
  const note = overrideNote(s);
  return (
    <section id="standing" aria-labelledby="standing-title" className="scroll-mt-28">
      <div className="card overflow-hidden">
        <div className={cx("h-1", tone.bar)} />
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
            <div className="min-w-0 flex-1 basis-[19rem]">
              <p className="text-[13px] font-medium text-ink-500">Your standing</p>
              <h1
                id="standing-title"
                className={cx("mt-1.5 flex items-start gap-2.5 font-display text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[34px]", tone.text)}
              >
                <Icon className="mt-1 h-6 w-6 shrink-0 sm:h-7 sm:w-7" strokeWidth={2.4} aria-hidden />
                <span className="min-w-0 [overflow-wrap:anywhere]">{s.label}</span>
              </h1>
              <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-700">{s.message}</p>
            </div>
            {s.meanDisplay && (
              <div className="max-w-full shrink-0">
                <dl className="flex gap-8">
                  <div>
                    <dt className="text-[12.5px] font-medium text-ink-500">Average</dt>
                    <dd className="mt-1 font-mono text-[40px] font-bold leading-none tabular-nums text-ink-900">{s.meanDisplay}</dd>
                  </div>
                  <div>
                    <dt className="text-[12.5px] font-medium text-ink-500">Audited tasks</dt>
                    <dd className="mt-1 font-mono text-[40px] font-bold leading-none tabular-nums text-ink-900">{s.auditedTasks}</dd>
                  </div>
                </dl>
                <Scores status={s} onOpen={onOpenAttempt} />
              </div>
            )}
          </div>
          <Scale status={s} />
          {note && (
            <p className="mt-3 flex max-w-prose gap-2 text-[13px] leading-relaxed text-ink-600">
              <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
              {note}
            </p>
          )}
        </div>
        <Outlook status={s} first={bundle.priorities.cards[0]} onStart={onStart} />
      </div>
    </section>
  );
}
