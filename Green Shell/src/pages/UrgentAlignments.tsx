import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Wrench,
  XCircle,
} from "lucide-react";
import { alignments, alignmentsFlagged, statusLabel, type Alignment } from "../data/alignments";
import { Crosslinks, Reveal } from "../components/ui";
import { useScrollSpy } from "../lib/useScrollSpy";
import { useRailFollow, useStickyFit } from "../lib/useStickyFit";
import { cx } from "../lib/util";

/**
 * Urgent Alignments: the issues the client flagged in delivered tasks, laid out
 * for checking a task against rather than for reading through.
 *
 * The page is shaped by what each issue is: something that went wrong, what it
 * looked like, and the fix. So the band says why these come first, the cards
 * are the whole set at a glance and the way into each one, and every issue
 * opens with the problem, then puts the mistake beside the fix so the two read
 * together. An issue the client rejected tasks over leads with that count and
 * its share of the delivery. The page closes on the checks, one per issue, the
 * thing a contributor actually runs before submitting.
 *
 * Rose throughout, the hub's must-read signal. Status is a chip with its label,
 * never colour alone: rose for an issue that came back, sky for a new one.
 *
 * The words come from the Must Read entries (see `alignments.ts`), so nothing
 * here restates them.
 */

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const word = (n: number) => WORDS[n] ?? String(n);

/** The search strings and the link code itself, set in mono so the reader sees
 *  exactly the characters to look for. */
const CODE = /(\[[^\]\s]+\]\(https?:\/\/[^)\s]+\)|\]\(http|\\_)/g;
function Marked({ text }: { text: string }) {
  const parts = text.split(CODE);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <code
            key={i}
            className={cx(
              "rounded bg-rose-500/10 px-1 py-px font-mono text-[0.92em] text-rose-800 dark:text-rose-200",
              // A search string stays whole; a full link may break on a phone.
              p.length <= 8 ? "whitespace-nowrap" : "break-all"
            )}
          >
            {p}
          </code>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

const statusTone: Record<Alignment["status"], string> = {
  "came-back": "bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/25 dark:text-rose-200",
  new: "bg-sky-500/15 text-sky-700 ring-1 ring-sky-500/25 dark:text-sky-200",
};

function StatusChip({ status }: { status: Alignment["status"] }) {
  return (
    <span className={cx("chip", statusTone[status])}>
      {status === "came-back" ? <RotateCcw size={11} /> : <Sparkles size={11} />}
      {statusLabel[status]}
    </span>
  );
}

/** A rejection the client made over the issue, as two figures: the tasks it
 *  cost and their share of the delivery. Label above value, values in ink. */
function RejectedFigures({ r }: { r: NonNullable<Alignment["rejected"]> }) {
  return (
    <dl className="mt-5 grid max-w-md grid-cols-2 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10">
      <div className="p-4">
        <dt className="flex items-center gap-1.5 text-[12.5px] font-semibold leading-snug text-rose-700 dark:text-rose-300">
          <XCircle size={13} className="shrink-0" /> Tasks rejected by the client
        </dt>
        <dd className="mt-2 text-[40px] font-semibold leading-none tracking-tight text-ink-900">{r.tasks}</dd>
      </div>
      <div className="border-l border-rose-500/25 p-4">
        <dt className="text-[12.5px] font-semibold leading-snug text-rose-700 dark:text-rose-300">
          Share of the total delivery
        </dt>
        <dd className="mt-2 text-[40px] font-semibold leading-none tracking-tight text-ink-900">{r.share}</dd>
      </div>
    </dl>
  );
}

/** The same rejection as one solid chip, for the cards and the header. */
function RejectedChip({ r }: { r: NonNullable<Alignment["rejected"]> }) {
  return (
    <span className="chip bg-rose-600 font-bold text-white">
      <XCircle size={11} /> {r.tasks} tasks rejected · {r.share}
    </span>
  );
}

/** The overview grid, sized so the cards fill whole rows. */
const overviewCols: Record<number, string> = {
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-3",
};

function Num({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={cx(
        "grid shrink-0 place-items-center rounded-lg bg-rose-600 font-mono font-bold text-white",
        className
      )}
    >
      {n}
    </span>
  );
}

function IssueCard({ a, n }: { a: Alignment; n: number }) {
  const c = a.change;
  return (
    <article id={a.id} className="card scroll-mt-24 overflow-hidden">
      <header className="border-b border-ink-200/70 bg-rose-500/5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Num n={n} className="h-8 w-8 text-[13px]" />
          <StatusChip status={a.status} />
          <span className="mono-label text-ink-400">
            Issue {n} of {alignments.length}
          </span>
          <Link
            to={`/#${a.step.id}`}
            className="mono-label ml-auto text-ink-400 transition hover:text-brand-600"
          >
            Where it bites · Step {a.step.n}, {a.step.title}
          </Link>
        </div>
        {a.rejected && <RejectedFigures r={a.rejected} />}
        <h2 className="mt-4 font-display text-[22px] font-bold leading-snug tracking-tight text-ink-900 sm:text-[26px]">
          {c.title}
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-600">{c.body}</p>
      </header>

      {/* The mistake beside the fix, so the two are read together. */}
      <div className="grid lg:grid-cols-2">
        <div className="p-6 sm:p-8 lg:border-r lg:border-ink-200/70">
          <div className="mono-label mb-3 flex items-center gap-1.5 text-rose-600 dark:text-rose-300">
            <Eye size={13} /> What it looks like
          </div>
          <ul className="space-y-2.5 border-l-2 border-rose-400/50 pl-4">
            {(c.example ?? []).map((e, i) => (
              <li key={i} className="text-[13.5px] leading-relaxed text-ink-700">
                <Marked text={e} />
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-raised p-6 sm:p-8">
          <div className="mono-label mb-3 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
            <Wrench size={13} /> How to fix it
          </div>
          <p className="text-[14px] leading-relaxed text-ink-700">
            <Marked text={c.does} />
          </p>
          <div className="mt-5 flex gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3.5">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" />
            <div>
              <div className="mono-label text-emerald-700 dark:text-emerald-300">Check before you submit</div>
              <p className="mt-1 text-[13.5px] font-medium leading-relaxed text-ink-800">
                <Marked text={a.check} />
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-ink-200/70 px-6 py-5 sm:px-8">
        <div className="mono-label mb-2 flex items-center gap-1.5 text-ink-400">
          <BookMarked size={12} /> In the guidelines
        </div>
        <div className="flex flex-wrap gap-1.5">
          {c.refs.map((r) => (
            <span
              key={`${r.section}-${r.title}`}
              className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200"
            >
              <span className="font-mono font-bold">{r.section}</span>
              <span className="text-ink-400">·</span>
              {r.title}
            </span>
          ))}
        </div>
        <Crosslinks links={c.links} className="mt-4" />
      </footer>
    </article>
  );
}

export default function UrgentAlignments() {
  const ids = [...alignments.map((a) => a.id), "before-you-submit"];
  const active = useScrollSpy(ids);
  const { ref: railRef, maxHeight } = useStickyFit<HTMLElement>(28);
  useRailFollow(railRef, active);

  const cameBack = alignments.filter((a) => a.status === "came-back").length;
  const fresh = alignments.length - cameBack;

  return (
    <div>
      {/* The band: why these come before anything else in the hub. */}
      <section className="relative overflow-hidden border-b border-rose-500/20 bg-surface">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent" />
        <div className="wrap relative pb-8 pt-10">
          <div className="mono-label flex items-center gap-1.5 text-rose-600 dark:text-rose-300">
            <ShieldAlert size={13} /> Urgent Alignments
          </div>
          <h1 className="mt-2 font-display text-[30px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[38px]">
            {word(alignments.length)} issues to avoid in every task
          </h1>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-600">
            The client reviewed the delivered tasks and flagged these {word(alignments.length).toLowerCase()}. They apply to
            every task, new or being fixed. {word(cameBack)} had been flagged in earlier reports and
            came back, so the client is watching them closely.
          </p>
          <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-500">
            For most issues the client only named a few example tasks. If yours was not named, that
            does not mean it is clean, so check your own tasks.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip bg-ink-100 text-ink-600 ring-1 ring-ink-200">
              Flagged {alignmentsFlagged}
            </span>
            <span className={cx("chip", statusTone["came-back"])}>
              <RotateCcw size={11} /> {cameBack} came back
            </span>
            <span className={cx("chip", statusTone.new)}>
              <Sparkles size={11} /> {fresh} new
            </span>
            {alignments.map((a) => a.rejected && <RejectedChip key={a.id} r={a.rejected} />)}
          </div>
        </div>
      </section>

      <div className="wrap py-10">
        {/* The whole set at a glance, and the way into each issue. */}
        <Reveal>
          <ol className={cx("grid gap-3 sm:grid-cols-2", overviewCols[alignments.length] ?? "lg:grid-cols-3")}>
            {alignments.map((a, i) => (
              <li key={a.id}>
                <Link
                  to={{ hash: `#${a.id}` }}
                  className="card group flex h-full flex-col p-4 transition duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-lift"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Num n={i + 1} className="h-7 w-7 text-[12px]" />
                    <StatusChip status={a.status} />
                    {a.rejected && <RejectedChip r={a.rejected} />}
                  </div>
                  <div className="mt-3 font-display text-[15px] font-bold leading-snug text-ink-900">
                    {a.short}
                  </div>
                  <div className="mt-1 text-[12.5px] leading-snug text-ink-500">{a.change.title}</div>
                  <div className="mt-auto flex items-center gap-1 pt-3 text-[12px] font-semibold text-rose-600 dark:text-rose-300">
                    The mistake and the fix
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside
            ref={railRef}
            style={{ maxHeight }}
            className="hidden self-start overflow-y-auto lg:sticky lg:top-24 lg:block"
          >
            <div className="mono-label mb-3 text-ink-400">The issues</div>
            <ol className="space-y-1.5">
              {[...alignments.map((a) => ({ id: a.id, label: a.short })), { id: "before-you-submit", label: "Before you submit" }].map(
                (r, i) => (
                  <li key={r.id}>
                    <a
                      href={`#${r.id}`}
                      data-rail={r.id}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(r.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={cx(
                        "flex items-center gap-2.5 rounded-xl py-1.5 pl-2 pr-2.5 text-[12.5px] font-semibold leading-snug transition duration-200",
                        active === r.id
                          ? "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                          : "text-ink-500 hover:bg-raised hover:text-ink-800"
                      )}
                    >
                      <span className="font-mono text-ink-400">
                        {i < alignments.length ? i + 1 : <ClipboardCheck size={12} />}
                      </span>
                      <span>{r.label}</span>
                    </a>
                  </li>
                )
              )}
            </ol>
          </aside>

          <div className="grid gap-6">
            {alignments.map((a, i) => (
              <Reveal key={a.id}>
                <IssueCard a={a} n={i + 1} />
              </Reveal>
            ))}

            {/* The checks, one per issue: what to run before submitting. */}
            <Reveal>
              <section id="before-you-submit" className="card scroll-mt-24 p-6 sm:p-8">
                <div className="mono-label flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                  <ClipboardCheck size={13} /> Before you submit
                </div>
                <h2 className="mt-2 font-display text-[22px] font-bold tracking-tight text-ink-900">
                  {word(alignments.length)} checks, one per issue
                </h2>
                <ol className="mt-5 space-y-3">
                  {alignments.map((a, i) => (
                    <li key={a.id} className="flex items-start gap-3">
                      <Num n={i + 1} className="mt-0.5 h-6 w-6 text-[11px]" />
                      <div className="flex-1 text-[14px] leading-relaxed text-ink-700">
                        <Marked text={a.check} />{" "}
                        <Link
                          to={{ hash: `#${a.id}` }}
                          className="whitespace-nowrap text-[12.5px] font-semibold text-rose-600 hover:underline dark:text-rose-300"
                        >
                          {a.short}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link to="/reference#pre-submit" className="btn-ghost mt-6">
                  <ClipboardCheck size={16} /> Then run the full Pre-Submit Gate
                </Link>
              </section>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
