/* Hallmark · macrostructure: Stat-Led · genre: modern-minimal, inside the Golden Task Hub's design system · tone: utilitarian
 * pre-emit critique: P4 H5 E5 S5 R4 V4 · contrast: pass (40–41) · mobile: pass 320–768 (34, 50–57) */
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, LogOut } from "lucide-react";
import type { Bundle, Focus } from "../../types";
import { cx, shortDate } from "../../lib/util";
import { CbIdChip, Mark, ThemeToggle } from "../ui";
import FeedbackSheet from "./FeedbackSheet";
import Issues from "./Issues";
import Resources from "./Resources";
import Standing from "./Standing";
import Tasks from "./Tasks";

/** The Golden Task Hub's main pages, linked beside the Guidelines under the header. */
const HUB_PAGES = ["hub-spec", "hub-whats-new", "hub-universes", "hub-fa"];

/**
 * The compact layout, for every CB when config.json's newCardLayout is "all", else the CB IDs it lists. One
 * reading column: where the contributor stands and what their next audits can do, the areas where
 * improvement is expected, what to do about each in the next task with the hub pages that help, then the
 * feedback of every audited attempt, which opens over the page. The
 * Guidelines and the hub's main pages are linked once, under the header, and every finding names the
 * section of the Guidelines it falls under.
 *
 * The same component is the card everywhere it is shown. Standalone (this app), it brings its own header.
 * Embedded, inside a page that already has one (the Golden Task Hub's My Performance tab, the card view of
 * Green Shell Insights), it keeps only a slim bar: the resource links, the CB ID and, where `onExit` is
 * given, the way out. `stickyTop` places that bar under the host's own sticky header.
 */
export default function CompactDashboard({
  bundle,
  onExit,
  embedded = false,
  stickyTop = "top-0",
}: {
  bundle: Bundle;
  onExit?: () => void;
  embedded?: boolean;
  stickyTop?: string;
}) {
  const [sheet, setSheet] = useState<Focus | null>(null);
  const [issue, setIssue] = useState<{ id: string; nonce: number } | null>(null);
  const attempts = useMemo(() => Object.fromEntries(bundle.attempts.map((a) => [a.attemptId, a])), [bundle]);

  const showAttempt = useCallback((attemptId: string, quote?: string) => {
    setSheet((f) => ({ attemptId, quote, nonce: (f?.nonce ?? 0) + 1 }));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setSheet(null);
  }, [bundle.cbId]);

  const res = bundle.resources;
  const hub = HUB_PAGES.map((id) => bundle.refs[id]).filter(Boolean);
  const open = sheet ? attempts[sheet.attemptId] : undefined;

  const resourceLinks = (
    <>
      <a
        href={res.guidelinesUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={res.guidelinesVersion ? `Official Project Guidelines, ${res.guidelinesVersion}` : undefined}
        className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded text-[13px] font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
      >
        <BookOpen size={14} className="shrink-0" aria-hidden />
        Official Project Guidelines
        <ArrowUpRight size={13} className="shrink-0" aria-hidden />
      </a>
      {hub.length > 0 && <span className="h-4 w-px shrink-0 bg-ink-200" aria-hidden />}
      {hub.map((r) => (
        <a
          key={r.id}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          title={r.lookFor}
          className="focus-ring inline-flex shrink-0 items-center gap-1 rounded text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-900 active:text-ink-950"
        >
          {r.title}
          <ArrowUpRight size={12} className="shrink-0 text-ink-400" aria-hidden />
        </a>
      ))}
    </>
  );

  const exitButton = onExit && (
    <button
      type="button"
      onClick={onExit}
      className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-900 active:bg-ink-100"
      aria-label="Leave and enter another CB ID"
      title="Leave"
    >
      <LogOut size={16} aria-hidden />
    </button>
  );

  return (
    <div className={cx("flex flex-col overflow-x-clip", !embedded && "min-h-screen")}>
      {embedded ? (
        <header className={cx("sticky z-30 border-b border-ink-200/70 bg-ink-50/90 backdrop-blur-md", stickyTop)}>
          <div className="column flex h-11 items-center gap-3">
            <nav
              aria-label="Project resources"
              className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {resourceLinks}
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <CbIdChip id={bundle.cbId} />
              {exitButton}
            </div>
          </div>
        </header>
      ) : (
        <header className={cx("sticky z-40 border-b border-ink-200/70 bg-ink-50/90 backdrop-blur-md", stickyTop)}>
          <div className="column flex h-14 items-center gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Mark size={32} />
              <span className="hidden leading-tight sm:block">
                <span className="block font-display text-[15px] font-bold tracking-tight text-ink-900">My Performance</span>
                <span className="mono-label block text-[9.5px] text-ink-500">Golden Task Hub · Green Shell</span>
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <CbIdChip id={bundle.cbId} />
              <ThemeToggle />
              {exitButton}
            </div>
          </div>
          <div className="border-t border-ink-200/60">
            <nav
              aria-label="Project resources"
              className="column flex h-9 items-center gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {resourceLinks}
            </nav>
          </div>
        </header>
      )}

      <main className="column flex-1 space-y-12 py-6 sm:space-y-14 sm:py-8">
        <Standing
          bundle={bundle}
          onOpenAttempt={(id) => showAttempt(id)}
          onStart={(id) => setIssue((f) => ({ id, nonce: (f?.nonce ?? 0) + 1 }))}
        />
        <Issues bundle={bundle} onShow={showAttempt} focus={issue} />
        <Resources bundle={bundle} />
        <Tasks bundle={bundle} onOpen={(id) => showAttempt(id)} />
      </main>

      <footer className={cx("border-t border-ink-200/70 bg-surface", embedded ? "mt-2" : "mt-6")}>
        <div className="column flex flex-col gap-1.5 py-6 text-[12.5px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Built from your audit records on {shortDate(bundle.generatedAt)}. Scores and feedback are the audit's own, shown without
            changes.
          </span>
          <span>The official Guidelines{res.guidelinesVersion ? `, ${res.guidelinesVersion},` : ""} stay the source of truth.</span>
        </div>
      </footer>

      {sheet && open && (
        <FeedbackSheet attempt={open} quote={sheet.quote} pulse={sheet.nonce} onClose={() => setSheet(null)} />
      )}
    </div>
  );
}
