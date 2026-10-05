import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Boxes,
  CircleAlert,
  ClipboardList,
  FileStack,
  Gauge,
  Layers,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import type { ComplexityField, ComplexityOption, ComplexityProposal } from "../data/types";
import { complexityFields, exampleProposals, exampleRef } from "../data/complexity";
import { claimSheet, claimSheetByRef } from "../data/claimSheet";
import { universeById, universes } from "../data/universes";
import { taxonomy } from "../data/taxonomy";
import { Eyebrow, Reveal, WipNotice } from "../components/ui";
import { cx } from "../lib/util";

/**
 * Increase Complexity Proposals.
 *
 * The contributor picks the assigned parameters, pastes the scenario, and gets
 * back a few concrete additions to judge. **Nothing is applied automatically**,
 * which is the whole design: the model proposes, the contributor decides, and
 * the scenario only ever changes by hand.
 *
 * **Every parameter is a closed list**, so nothing can be mistyped into the
 * request: see `data/complexity.ts` for where each list comes from. The universe
 * selection carries its own context too, read off the export rather than typed.
 *
 * The API key never reaches the browser. The page posts to the function named by
 * `VITE_COMPLEXITY_API`, and that function is what holds the credential. With no
 * endpoint configured the page still works as a reference: the example is a real
 * claim sheet task, so the shape of the output is visible before anyone wires
 * anything up.
 */

const ENDPOINT = import.meta.env.VITE_COMPLEXITY_API as string | undefined;

/**
 * Optional, and only a speed bump: a build time value ends up in the bundle, so
 * anyone can read it. It exists so the function's `ACCESS_CODE` can be turned on
 * to keep the endpoint off the open internet without breaking the page. The
 * spend cap on the API account is the real backstop.
 */
const ACCESS_CODE = import.meta.env.VITE_COMPLEXITY_CODE as string | undefined;

type Values = Record<string, string>;

const EMPTY: Values = Object.fromEntries(complexityFields.map((f) => [f.id, ""]));

const SELECT =
  "w-full rounded-xl border border-ink-200 bg-surface px-3 py-2 text-[13px] text-ink-800 outline-none transition focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50";

/** Options in source order, split into the groups the source puts them in. */
function grouped(options: ComplexityOption[]) {
  const out: { group: string; options: ComplexityOption[] }[] = [];
  for (const o of options) {
    const key = o.group ?? "";
    const last = out[out.length - 1];
    if (last && last.group === key) last.options.push(o);
    else out.push({ group: key, options: [o] });
  }
  return out;
}

const optionLabel = (o: ComplexityOption) => (o.note ? `${o.value} — ${o.note}` : o.value);

/** A closed list where more than one answer is right. Chips, not a multi select. */
function MultiPicker({
  field,
  value,
  onChange,
}: {
  field: ComplexityField;
  value: string;
  onChange: (next: string) => void;
}) {
  const options = field.options ?? [];
  const picked = value ? value.split(", ").filter(Boolean) : [];
  const toggle = (val: string) => {
    const next = picked.includes(val) ? picked.filter((x) => x !== val) : [...picked, val];
    // Option order, so the same set always submits the same string.
    onChange(
      options
        .filter((o) => next.includes(o.value))
        .map((o) => o.value)
        .join(", ")
    );
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = picked.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(o.value)}
              className={cx(
                "rounded-lg px-2 py-1 font-mono text-[11.5px] transition",
                on
                  ? "bg-brand-600 text-white ring-1 ring-brand-600"
                  : "bg-raised text-ink-600 ring-1 ring-ink-200 hover:ring-brand-500/40"
              )}
            >
              {o.value}
            </button>
          );
        })}
      </div>
      {picked.length === 0 && <p className="mt-1.5 text-[11.5px] text-ink-400">{field.empty}</p>}
    </div>
  );
}

/** What the request will carry about the universe, shown rather than asked for. */
function UniversePanel({ id }: { id: string }) {
  const u = universeById(id);
  if (!u) return null;
  return (
    <div className="mt-2 rounded-xl border border-ink-200/70 bg-raised p-3">
      <div className="mono-label mb-2 flex flex-wrap items-center gap-1.5 text-ink-400">
        <Boxes size={12} /> Universe context sent with the request
        {u.span && <span className="text-ink-500">· records {u.span}</span>}
      </div>
      <ul className="grid gap-1 sm:grid-cols-2">
        {u.services.map((s) => (
          <li key={s.name} className="text-[11.5px] leading-snug text-ink-600">
            <span className="font-mono font-bold text-ink-700">{s.name}</span>{" "}
            <span className="text-ink-500">{s.records}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11.5px] leading-relaxed text-ink-400">
        Read from the universe export, so it is what is actually loaded. Check it against the
        Database tab if your task depends on a record you do not see here.
      </p>
    </div>
  );
}

function ProposalCard({ p, n }: { p: ComplexityProposal; n: number }) {
  return (
    <article className="card p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-500/12 font-mono text-[12px] font-bold text-brand-700 dark:text-brand-300">
          {n}
        </span>
        <h3 className="font-display text-[15px] font-bold leading-snug tracking-tight text-ink-900">
          {p.title}
        </h3>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-700">{p.adds}</p>

      <div className="mt-4 rounded-xl border border-ink-200/70 bg-raised p-3.5">
        <div className="mono-label mb-1.5 flex items-center gap-1.5 text-brand-600 dark:text-brand-300">
          <Gauge size={12} /> Why this is real difficulty
        </div>
        <p className="text-[12.5px] leading-relaxed text-ink-600">{p.why}</p>
      </div>

      {p.inputs && p.inputs.length > 0 && (
        <div className="mt-3.5">
          <div className="mono-label mb-1.5 flex items-center gap-1.5 text-ink-400">
            <FileStack size={12} /> Inputs it implies
          </div>
          <ul className="space-y-1">
            {p.inputs.map((i, k) => (
              <li key={k} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-600">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.bar && (
        <p className="mt-3.5 text-[12.5px] leading-relaxed text-ink-500">
          <span className="mono-label mr-1.5 text-ink-400">Complexity bar</span>
          {p.bar}
        </p>
      )}

      {p.keeps && (
        <p className="mt-3 flex items-start gap-2 border-t border-ink-200/70 pt-3 text-[12.5px] leading-relaxed text-emerald-700 dark:text-emerald-300">
          <ShieldCheck size={13} className="mt-0.5 shrink-0" />
          <span>{p.keeps}</span>
        </p>
      )}
    </article>
  );
}

export default function Complexity() {
  const [v, setV] = useState<Values>(EMPTY);
  const [sheetRef, setSheetRef] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [proposals, setProposals] = useState<ComplexityProposal[]>([]);
  const [showingExample, setShowingExample] = useState(false);

  const subs = useMemo(() => taxonomy.find((g) => g.l1 === v.useCase)?.subs ?? [], [v.useCase]);

  const missing = complexityFields.filter((f) => f.required && !v[f.id]?.trim());
  const ready = missing.length === 0;

  const set = (id: string, val: string) =>
    setV((prev) => ({
      ...prev,
      [id]: val,
      ...(id === "useCase" ? { subcategory: "" } : null),
    }));

  /** A claim sheet row fills the whole form, scenario included. */
  const loadRef = (r: string) => {
    setSheetRef(r);
    const t = claimSheetByRef(r);
    if (!t) {
      setV(EMPTY);
      return;
    }
    setV({
      ...EMPTY,
      useCase: t.useCase,
      subcategory: t.subcategory,
      universe: t.universe,
      artifact: t.artifact,
      primary: t.primary,
      secondary: t.secondary,
      tools: t.tools,
      scenario: t.scenario,
    });
  };

  const loadExample = () => {
    loadRef(exampleRef);
    setProposals(exampleProposals);
    setShowingExample(true);
    setStatus("done");
  };

  async function submit() {
    if (!ENDPOINT) return;
    setStatus("loading");
    setError("");
    setShowingExample(false);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(ACCESS_CODE ? { "x-access-code": ACCESS_CODE } : null),
        },
        // Only the selections. The universe context is not sent: the function
        // builds it from the universe id off its own copy of the summaries, so
        // the request cannot carry text of its own choosing.
        body: JSON.stringify(v),
      });
      if (!res.ok) throw new Error(`The service answered ${res.status}.`);
      const data = (await res.json()) as { proposals?: ComplexityProposal[] };
      if (!data.proposals?.length) throw new Error("The service returned no proposals.");
      setProposals(data.proposals);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "The request failed.");
      setStatus("error");
    }
  }

  return (
    <div className="wrap py-12">
      <Reveal>
        <WipNotice className="mb-7" />
      </Reveal>

      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow className="text-violet-600 dark:text-violet-300">Design assistant</Eyebrow>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-[40px]">
            Increase complexity proposals
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
            Pick the assigned parameters, paste your scenario, and it proposes a few concrete ways
            to make the task genuinely harder. Every parameter is a list of what the project
            actually assigns, so nothing is typed and nothing drifts. It reads your scenario rather
            than replacing it, and nothing is applied for you.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              i: <ShieldCheck size={14} />,
              t: "Keeps every parameter",
              b: "The pair, the universe, the artifact and both capability sets come back untouched.",
            },
            {
              i: <Gauge size={14} />,
              t: "Aims at the bar",
              b: "Proposals are judged against the floor for your deliverable type, and the P0 artifacts in particular.",
            },
            {
              i: <AlertTriangle size={14} />,
              t: "No artificial friction",
              b: "An axis of reasoning beats another item to check. Extra asks for their own sake are what it exists to avoid.",
            },
          ].map((x) => (
            <div key={x.t} className="card p-4">
              <div className="mono-label mb-1.5 flex items-center gap-1.5 text-violet-600 dark:text-violet-300">
                {x.i} {x.t}
              </div>
              <p className="text-[12.5px] leading-relaxed text-ink-500">{x.b}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ------------------------------------------------------------ form */}
        <Reveal>
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">
                Your task
              </h2>
              <button onClick={loadExample} className="btn-ghost px-2.5 py-1 text-[12px]">
                <Sparkles size={13} /> Load an example
              </button>
            </div>

            {/* The whole form in one selection, for a task on the sheet. */}
            <div className="mt-5 rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-3.5">
              <label
                htmlFor="claim-ref"
                className="mb-1.5 flex flex-wrap items-center gap-1.5 text-[12.5px] font-bold text-ink-800"
              >
                <ClipboardList size={13} className="text-violet-600 dark:text-violet-300" />
                Load from the claim sheet
                <span className="mono-label text-ink-400">fills every field below</span>
              </label>
              <select
                id="claim-ref"
                value={sheetRef}
                onChange={(e) => loadRef(e.target.value)}
                className={SELECT}
              >
                <option value="">Not a claim sheet task — I will select the parameters</option>
                {claimSheet.map((t) => (
                  <option key={t.ref} value={t.ref}>
                    {t.ref} · {t.useCase} / {t.subcategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {complexityFields.map((f) => {
                const wide = f.kind === "textarea" || f.kind === "multi" || f.kind === "universe";
                return (
                  <div key={f.id} className={wide ? "sm:col-span-2" : ""}>
                    <label
                      htmlFor={f.id}
                      className="mb-1.5 flex flex-wrap items-center gap-1.5 text-[12.5px] font-bold text-ink-800"
                    >
                      {f.label}
                      {f.assigned && (
                        <span className="chip bg-violet-500/12 px-1.5 py-0 text-[10px] text-violet-700 ring-1 ring-violet-500/25 dark:text-violet-300">
                          <Lock size={9} /> assigned
                        </span>
                      )}
                      <span className="mono-label text-ink-400">{f.hint}</span>
                    </label>

                    {f.kind === "use-case" && (
                      <select
                        id={f.id}
                        value={v[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        className={SELECT}
                      >
                        <option value="">{f.empty}</option>
                        {taxonomy.map((g) => (
                          <option key={g.id} value={g.l1}>
                            {g.l1}
                          </option>
                        ))}
                      </select>
                    )}

                    {f.kind === "subcategory" && (
                      <select
                        id={f.id}
                        value={v[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        disabled={!v.useCase}
                        className={SELECT}
                      >
                        <option value="">{v.useCase ? f.empty : "Pick a use case first"}</option>
                        {subs.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    )}

                    {f.kind === "universe" && (
                      <>
                        <select
                          id={f.id}
                          value={v[f.id]}
                          onChange={(e) => set(f.id, e.target.value)}
                          className={SELECT}
                        >
                          <option value="">{f.empty}</option>
                          {universes.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.label === u.id ? u.id : `${u.label} · ${u.id}`}
                            </option>
                          ))}
                        </select>
                        <UniversePanel id={v[f.id]} />
                      </>
                    )}

                    {f.kind === "select" && (
                      <select
                        id={f.id}
                        value={v[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        className={SELECT}
                      >
                        <option value="">{f.empty}</option>
                        {grouped(f.options ?? []).map((g, i) =>
                          g.group ? (
                            <optgroup key={g.group} label={g.group}>
                              {g.options.map((o) => (
                                <option key={o.value} value={o.value}>
                                  {optionLabel(o)}
                                </option>
                              ))}
                            </optgroup>
                          ) : (
                            g.options.map((o) => (
                              <option key={`${i}-${o.value}`} value={o.value}>
                                {optionLabel(o)}
                              </option>
                            ))
                          )
                        )}
                      </select>
                    )}

                    {f.kind === "multi" && (
                      <MultiPicker field={f} value={v[f.id]} onChange={(next) => set(f.id, next)} />
                    )}

                    {f.kind === "textarea" && (
                      <textarea
                        id={f.id}
                        value={v[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        placeholder={f.placeholder}
                        rows={6}
                        className="w-full resize-y rounded-xl border border-ink-200 bg-surface px-3 py-2 text-[13px] leading-relaxed text-ink-800 outline-none transition placeholder:text-ink-400 focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-200/70 pt-5">
              <button
                onClick={submit}
                disabled={!ready || !ENDPOINT || status === "loading"}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-45"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Thinking about your scenario
                  </>
                ) : (
                  <>
                    <Wand2 size={16} /> Increase complexity proposals
                  </>
                )}
              </button>
              {!ready && (
                <span className="text-[12px] text-ink-400">
                  {missing.length} field{missing.length === 1 ? "" : "s"} still to fill
                </span>
              )}
            </div>

            {!ENDPOINT && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-400/40 bg-amber-500/10 p-3.5 text-[12.5px] leading-relaxed text-ink-700">
                <CircleAlert
                  size={14}
                  className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                />
                <span>
                  <span className="font-bold">No service connected yet.</span> The button turns on
                  once <span className="font-mono text-[12px]">VITE_COMPLEXITY_API</span> points at
                  the function. Until then, load the example to see exactly what it returns.
                </span>
              </div>
            )}
          </div>
        </Reveal>

        {/* ------------------------------------------------------- proposals */}
        <Reveal>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold tracking-tight text-ink-900">
                Proposals
              </h2>
              {showingExample && (
                <span className="chip bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/25 dark:text-gold-300">
                  <Sparkles size={11} /> Example · {exampleRef}
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 grid place-items-center rounded-2xl border border-dashed border-ink-200 p-10 text-center"
                >
                  <Layers size={22} className="text-ink-300" />
                  <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-400">
                    Fill in the form and the proposals land here. Each one is yours to accept, adapt
                    or ignore.
                  </p>
                </motion.div>
              )}

              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 grid gap-3"
                >
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="card animate-pulse p-5">
                      <div className="h-3.5 w-2/3 rounded bg-ink-200" />
                      <div className="mt-3 h-2.5 w-full rounded bg-ink-100" />
                      <div className="mt-2 h-2.5 w-5/6 rounded bg-ink-100" />
                      <div className="mt-4 h-14 rounded-xl bg-ink-100" />
                    </div>
                  ))}
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-start gap-2.5 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-[13px] leading-relaxed text-ink-700"
                >
                  <CircleAlert size={15} className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" />
                  <span>
                    <span className="font-bold">That did not go through.</span> {error} Your form is
                    still filled in, so you can try again.
                  </span>
                </motion.div>
              )}

              {status === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 grid gap-3"
                >
                  {proposals.map((p, i) => (
                    <ProposalCard key={i} p={p} n={i + 1} />
                  ))}
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-400">
                    Apply what holds up and leave what does not. Anything that drifts from an
                    assigned parameter is wrong however good it sounds, and the complexity still has
                    to read as something a real person would be living through.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className={cx("mt-10 text-center text-[12px] text-ink-400")}>
          Proposals are generated, so judge them. They do not score, approve or submit anything.
        </p>
      </Reveal>
    </div>
  );
}
