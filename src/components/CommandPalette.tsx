import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search, searchIndex } from "../data";
import type { SearchEntry } from "../data/types";
import { cx, useDismissable } from "../lib/hooks";
import { IconSearch } from "./ui";

/** Shown before anything is typed — the four places people actually go. */
const SUGGESTED: SearchEntry[] = [
  {
    kind: "Golden task",
    title: "Vendor closeout pack",
    hint: "The worked example, end to end",
    to: "/golden-tasks/vendor-closeout",
    terms: "",
  },
  { kind: "Clarification", title: "All eight clarifications", hint: "With the proposals on the table", to: "/spec", terms: "" },
  { kind: "Pre-submit check", title: "Pre-submit gate", hint: "29 checks, about five minutes", to: "/checklist", terms: "" },
  { kind: "Process", title: "The nine steps", hint: "Explore the universe → the subjective block", to: "/#process", terms: "" },
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useDismissable(open, onClose);

  const results = useMemo(() => (q.trim() ? search(q) : SUGGESTED), [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setI(0), [q]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(".is-active")?.scrollIntoView({ block: "nearest" });
  }, [i, open]);

  const go = (entry: SearchEntry) => {
    onClose();
    navigate(entry.to);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((n) => (results.length ? (n + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((n) => (results.length ? (n - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[i]) {
      e.preventDefault();
      go(results[i]);
    }
  };

  // Group headings appear only once per run of the same kind.
  let lastKind = "";

  return (
    <div
      className={cx("overlay", "overlay--cmdk", open && "is-open")}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="cmdk" role="dialog" aria-modal="true" aria-label="Search the hub">
          <div className="cmdk__field">
            <span className="dim" aria-hidden="true">
              <IconSearch size={16} />
            </span>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={`Search ${searchIndex.length} entries — a vendor, a rubric, a check id…`}
              aria-label="Search the hub"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd>esc</kbd>
          </div>

          <div className="cmdk__results" ref={listRef}>
            {results.length === 0 && (
              <p className="cmdk__empty">
                Nothing matches “{q}”. Try a vendor name, a check id like <code className="tok">E2</code>, or a word from a
                clarification.
              </p>
            )}
            {results.map((r, n) => {
              const head = r.kind !== lastKind ? r.kind : null;
              lastKind = r.kind;
              return (
                <div key={`${r.to}-${r.title}-${n}`}>
                  {head && <p className="cmdk__group">{q.trim() ? head : "Start here"}</p>}
                  <button
                    className={cx("cmdk__item", n === i && "is-active")}
                    onMouseEnter={() => setI(n)}
                    onClick={() => go(r)}
                  >
                    <span>
                      <strong>{r.title}</strong>
                      <small>{r.hint}</small>
                    </span>
                    <span className="cmdk__kind">{r.kind}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cmdk__foot">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> move
            </span>
            <span>
              <kbd>↵</kbd> open
            </span>
            <span>
              <kbd>esc</kbd> close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
