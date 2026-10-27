import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";
import CompactDashboard from "../performance/card/components/compact/Dashboard";
import type { Bundle } from "../performance/card/types";
import { CB_ID, KEY, loadCard, recall, remember, type CardFailure } from "../performance/api";
import { cx } from "../lib/util";
import "../performance/card/card.css";

/**
 * My Performance: a contributor's own performance card, the one the project team sees for them in Green
 * Shell Insights. The contributor opens the tab from their personal link, enters their CB ID, and the card
 * opens under the hub's header: where they stand, the issues to fix first, what to do in the next task,
 * and every audited attempt's feedback.
 *
 * The link carries a key bound to that one CB ID (see ../performance/api.ts). It is taken out of the
 * address bar as soon as the tab opens and held for this tab only, so the address can be shared or
 * screenshotted without it. A CB ID on its own opens nothing.
 *
 * The card under src/performance/card is a verbatim copy of the CB Performance & Project Guidance Hub's
 * (Evals/cb-guidance-hub/app/src), written by its scripts/sync-hub-card.mjs. Change it there, never here.
 */

const MESSAGES: Record<CardFailure | "need-key", string> = {
  "not-found": "No card is on record for this CB ID yet. A card appears once your first task has been audited.",
  "bad-key": "This CB ID does not match your personal key. Check the CB ID, or open this tab again from your personal link.",
  "need-key": "Open this tab from the personal link you were sent, or paste the key from it, then enter your CB ID.",
  inactive: "This personal link is no longer active. If you think that is a mistake, contact the project team.",
  rate: "Too many attempts in a short time. Wait a minute and try again.",
  unavailable: "My Performance is not available right now. Try again later.",
  network: "The card could not be loaded. Check your connection and try again in a moment.",
};

const OFFERS = [
  "Your status and average, and what your next audits can do to it",
  "The issues to fix first, each with the feedback it comes from",
  "What to do differently in your next task, with the hub pages that help",
  "Every audited attempt's feedback, exactly as the audit wrote it",
];

export default function Performance() {
  const [params, setParams] = useSearchParams();
  const linkKey = params.get("k");
  const [key, setKey] = useState<string | null>(() => recall().key);
  const [value, setValue] = useState(() => recall().id ?? "");
  const [keyValue, setKeyValue] = useState("");
  const [touched, setTouched] = useState(false);
  // Opening at once when this tab already holds a card, unless a different link has just arrived.
  const [busy, setBusy] = useState(() => {
    const s = recall();
    return Boolean(s.key && s.id && (linkKey === null || linkKey.trim() === s.key));
  });
  const [error, setError] = useState<string | null>(null);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const id = value.trim().toLowerCase();
  const valid = CB_ID.test(id);
  const showFormatError = touched && id.length > 0 && !valid;
  const typedKey = keyValue.trim();

  // A key in the address: keep it for this tab, then take it out of the address bar.
  useEffect(() => {
    if (linkKey === null) return;
    const k = linkKey.trim();
    if (KEY.test(k)) {
      if (k !== key) setBundle(null);
      setKey(k);
      remember({ key: k, id: k === key ? recall().id : null });
    }
    setParams(
      (p) => {
        p.delete("k");
        return p;
      },
      { replace: true }
    );
  }, [linkKey]);

  // A reload with a card open opens it again. The effect above has already run, so a new link's key has
  // replaced the one held, and with it the CB ID.
  useEffect(() => {
    const { key: k, id: i } = recall();
    if (!k || !i) {
      setBusy(false);
      return;
    }
    let live = true;
    loadCard(i, k).then((r) => {
      if (!live) return;
      setBusy(false);
      if (r.ok) setBundle(r.bundle);
      else setError(MESSAGES[r.reason]);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!bundle && !busy) input.current?.focus();
  }, [bundle, busy]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!valid) return;
    const k = key ?? (KEY.test(typedKey) ? typedKey : null);
    if (!k) {
      setError(MESSAGES["need-key"]);
      return;
    }
    setBusy(true);
    const r = await loadCard(id, k);
    setBusy(false);
    if (r.ok) {
      setKey(k);
      remember({ key: k, id });
      setBundle(r.bundle);
    } else {
      setError(MESSAGES[r.reason]);
    }
  }

  function leave() {
    setBundle(null);
    setError(null);
    remember({ key, id: null });
  }

  if (bundle) return <CompactDashboard bundle={bundle} embedded stickyTop="top-16" onExit={leave} />;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="wrap relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div>
          <div className="mono-label text-brand-600 dark:text-brand-300">My performance</div>
          <h1 className="mt-2 font-display text-[34px] font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-[44px]">
            Where you stand, and what to fix next
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-600">
            Your audited tasks, the patterns in your feedback, and the exact part of the project guidance behind each one, in one card
            that follows every new audit.
          </p>
          <ul className="mt-6 grid max-w-xl gap-2.5">
            {OFFERS.map((o) => (
              <li key={o} className="flex items-start gap-2.5 text-[14.5px] text-ink-700">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-[480px] lg:justify-self-end">
          <form onSubmit={submit} noValidate className="card p-5 sm:p-6">
            <label htmlFor="cb-id" className="text-[13.5px] font-semibold text-ink-800">
              Your CB ID
            </label>
            <div className="relative mt-2">
              <input
                ref={input}
                id="cb-id"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                maxLength={40}
                placeholder="Paste your CB ID"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(null);
                }}
                onBlur={() => setTouched(true)}
                aria-invalid={showFormatError}
                aria-describedby="cb-id-help"
                className={cx(
                  "w-full rounded-xl border bg-surface px-3.5 py-3 pr-16 font-mono text-[15px] tracking-tight text-ink-900 outline-none placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-brand-500",
                  showFormatError ? "border-rose-400" : "border-ink-200"
                )}
              />
              <span
                className={cx(
                  "pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[11px]",
                  valid ? "text-emerald-600 dark:text-emerald-400" : "text-ink-400"
                )}
              >
                {id.length}/24
              </span>
            </div>
            <p id="cb-id-help" className={cx("mt-2 text-[12.5px]", showFormatError ? "text-rose-600 dark:text-rose-300" : "text-ink-500")}>
              {showFormatError
                ? "A CB ID is 24 characters, using only the digits 0 to 9 and the letters a to f."
                : "24 characters, the digits 0 to 9 and the letters a to f."}
            </p>

            {key ? (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-3">
                <ShieldCheck size={17} className="mt-px shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                <div className="min-w-0 flex-1 text-[13px] leading-snug">
                  <div className="font-semibold text-ink-900">Personal link recognised</div>
                  <div className="text-ink-600">It opens your card and no one else&apos;s.</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setKey(null);
                    remember({ key: null, id: null });
                  }}
                  className="shrink-0 rounded text-[12.5px] font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300"
                >
                  Use another key
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <label htmlFor="cb-key" className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-800">
                  <KeyRound size={14} className="text-ink-400" aria-hidden /> Your personal key
                </label>
                <input
                  id="cb-key"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  maxLength={40}
                  placeholder="From your personal link"
                  value={keyValue}
                  onChange={(e) => {
                    setKeyValue(e.target.value);
                    setError(null);
                  }}
                  aria-describedby="cb-key-help"
                  className="mt-2 w-full rounded-xl border border-ink-200 bg-surface px-3.5 py-3 font-mono text-[14px] tracking-tight text-ink-900 outline-none placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-brand-500"
                />
                <p id="cb-key-help" className="mt-2 text-[12.5px] text-ink-500">
                  Opening your personal link fills this in. Otherwise paste the 22 characters after <span className="font-mono">k=</span> in
                  it.
                </p>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-[13px] font-medium text-rose-700 dark:text-rose-300"
              >
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary mt-5 w-full" disabled={busy}>
              {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : null}
              {busy ? "Opening your card" : "Open my card"}
              {!busy && <ArrowRight size={16} aria-hidden />}
            </button>
          </form>

          <div className="mt-4 flex items-start gap-2.5 px-1 text-[12.5px] leading-relaxed text-ink-500">
            <Lock size={14} className="mt-0.5 shrink-0 text-ink-400" aria-hidden />
            <p>
              Only you can open your card: it needs your CB ID and the key in your personal link together, and your key opens no one
              else&apos;s. Keep the link to yourself. Scores and feedback are shown exactly as the audit wrote them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
