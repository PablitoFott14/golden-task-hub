import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import { searchIndex } from "../data";
import type { SearchEntry } from "../data/types";
import { cx } from "../lib/util";

const kindTone: Record<SearchEntry["kind"], string> = {
  Method: "bg-brand-500/12 text-brand-700 dark:text-brand-300",
  "Golden task": "bg-gold-500/15 text-gold-700 dark:text-gold-300",
  "Pre-submit check": "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  "QC spec": "bg-sky-500/12 text-sky-700 dark:text-sky-300",
  FAQ: "bg-violet-500/12 text-violet-700 dark:text-violet-300",
};

function score(entry: SearchEntry, q: string): number {
  const title = entry.title.toLowerCase();
  const hint = entry.hint.toLowerCase();
  const terms = entry.terms.toLowerCase();
  let total = 0;
  for (const word of q.split(/\s+/).filter(Boolean)) {
    if (title.startsWith(word)) total += 8;
    else if (title.includes(word)) total += 5;
    else if (hint.includes(word)) total += 3;
    else if (terms.includes(word)) total += 1;
    else return 0;
  }
  return total;
}

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return searchIndex.slice(0, 8);
    return searchIndex
      .map((e) => ({ e, s: score(e, query) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setCursor(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(results.length - 1, c + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(0, c - 1));
      }
      if (e.key === "Enter" && results[cursor]) {
        e.preventDefault();
        navigate(results[cursor].to);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, cursor, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink-950/40 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-ink-200 bg-surface shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink-200/70 px-4">
              <Search size={16} className="shrink-0 text-ink-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the method, the task, the checks, the spec…"
                className="h-14 w-full bg-transparent text-[15px] text-ink-900 outline-none placeholder:text-ink-400"
              />
              <kbd className="hidden shrink-0 rounded border border-ink-200 bg-ink-100 px-1.5 py-0.5 font-mono text-[10px] text-ink-500 sm:block">
                esc
              </kbd>
            </div>

            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-ink-400">
                  Nothing matches “{q}”.
                </li>
              )}
              {results.map((r, i) => (
                <li key={r.to + r.title}>
                  <button
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => {
                      navigate(r.to);
                      onClose();
                    }}
                    className={cx(
                      "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition",
                      i === cursor ? "bg-brand-500/10" : "hover:bg-ink-100"
                    )}
                  >
                    <span
                      className={cx(
                        "mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider",
                        kindTone[r.kind]
                      )}
                    >
                      {r.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold text-ink-900">
                        {r.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] text-ink-500">
                        {r.hint}
                      </span>
                    </span>
                    {i === cursor && (
                      <CornerDownLeft size={13} className="mt-1 shrink-0 text-ink-400" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
