import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { taskById } from "../data";
import type { InputAsset } from "../data/types";
import Ledger from "../components/Ledger";
import Rubrics from "../components/Rubrics";
import { Chip, Code, Crosslinks, Disclose, FileLink, IconArrow, Lightbox } from "../components/ui";
import { asset, cx, useReveal, useScrollSpy } from "../lib/hooks";

const SECTIONS = [
  { id: "scenario", label: "Scenario" },
  { id: "conversation", label: "The conversation" },
  { id: "inputs", label: "The inputs" },
  { id: "format", label: "The format spec" },
  { id: "universe", label: "The universe" },
  { id: "answer", label: "The answer" },
  { id: "ledger", label: "Evidence ledger" },
  { id: "rubrics", label: "Objective rubrics" },
  { id: "subjective", label: "Subjective block" },
  { id: "model-a", label: "What Model A did" },
  { id: "traps", label: "Designed friction" },
  { id: "takeaways", label: "Takeaways" },
];

const ROLE_TONE = {
  evidence: "ok",
  contradicts: "warn",
  distractor: "no",
  spec: "accent",
} as const;

const ROLE_LABEL = {
  evidence: "load-bearing",
  contradicts: "contradicts",
  distractor: "distractor",
  spec: "format spec",
} as const;

function isImage(a: InputAsset) {
  return a.kind === "image" || a.kind === "photo" || a.kind === "handwriting";
}

export default function TaskDetail() {
  const { id } = useParams();
  const task = taskById(id);
  const [zoom, setZoom] = useState<InputAsset | null>(null);
  const active = useScrollSpy(SECTIONS.map((s) => s.id));
  useReveal([task?.meta.id]);

  if (!task) {
    return (
      <section className="page">
        <div className="shell stack">
          <h1 style={{ fontSize: "var(--text-xl)" }}>No task with that id.</h1>
          <Link className="btn" to="/golden-tasks">
            Back to golden tasks <IconArrow size={12} />
          </Link>
        </div>
      </section>
    );
  }

  const t = task;

  return (
    <>
      <section className="opener">
        <div className="shell">
          <div className="chiprow" style={{ marginBottom: "var(--space-md)" }}>
            <Chip tone="accent" dot>
              {t.meta.status}
            </Chip>
            <Chip>{t.meta.category}</Chip>
            <Chip>{t.meta.subcategory}</Chip>
            <Chip>{t.meta.turns} turns</Chip>
            <Chip>{t.meta.serviceId}</Chip>
          </div>
          <h1 style={{ fontSize: "var(--text-display-s)" }}>{t.meta.title}</h1>
          <p className="lede" style={{ marginTop: "var(--space-md)" }}>
            {t.meta.oneLiner}
          </p>
          <div className="opener__meta">
            <span className="label">{t.meta.persona}</span>
            <span className="label">{t.meta.universe}</span>
            <span className="label">{t.meta.modalities.join(" · ")}</span>
          </div>
        </div>
      </section>

      <div className="shell page">
        <div className="withrail">
          <nav className="rail" aria-label="On this page">
            <p className="label" style={{ marginBottom: "var(--space-xs)" }}>
              On this page
            </p>
            <ol>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link to={{ hash: `#${s.id}` }} className={cx(active === s.id && "is-active")}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            {/* ------------------------------------------------ scenario */}
            <section id="scenario" className="sec sec--tight" style={{ paddingTop: 0 }}>
              <div className="sec__head">
                <h2>The scenario</h2>
              </div>
              <p className="lede">{t.premise}</p>
              <ul style={{ listStyle: "none", marginTop: "var(--space-lg)" }}>
                {t.whyGolden.map((w, i) => (
                  <li key={i} className="note note--accent" style={{ marginBottom: "var(--space-sm)" }}>
                    {w}
                  </li>
                ))}
              </ul>
            </section>

            {/* -------------------------------------------- conversation */}
            <section id="conversation" className="sec">
              <div className="sec__head">
                <h2>The conversation</h2>
                <p>
                  What the agent actually received. Everything else — the objective, the desired outcome, the rubrics —
                  is invisible to it.
                </p>
              </div>

              {t.turns.map((turn) => (
                <article key={turn.n} className="turn reveal">
                  <span className="turn__n">Turn {turn.n}</span>
                  <div>
                    <div className="code code--light" style={{ marginBottom: "var(--space-md)" }}>
                      <div className="code__label">
                        <span>User</span>
                        <span>{turn.produces.join(" · ")}</span>
                      </div>
                      <pre style={{ whiteSpace: "pre-wrap" }}>{turn.text}</pre>
                    </div>

                    <div className="scroller">
                      <table className="spec">
                        <tbody>
                          <tr>
                            <th style={{ width: "8rem" }}>Adds</th>
                            <td>{turn.adds}</td>
                          </tr>
                          <tr>
                            <th>Consumes</th>
                            <td>{turn.consumes}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {turn.notes?.map((n) => (
                      <div key={n.title} className={cx("note", n.tone && `note--${n.tone}`)} style={{ marginTop: "var(--space-md)" }}>
                        <b>{n.title}.</b> {n.body}
                      </div>
                    ))}
                  </div>
                </article>
              ))}

              <Crosslinks
                links={[
                  { to: "/checklist#s3", tag: "C3", label: "3 to 5 turns, each consuming the last" },
                  { to: "/checklist#s3", tag: "C4", label: "One turn changes the brief" },
                  { to: "/spec#c-1", tag: "#1", label: "How far can a follow-up drift?" },
                ]}
              />
            </section>

            {/* ------------------------------------------------- inputs */}
            <section id="inputs" className="sec">
              <div className="sec__head">
                <h2>The inputs</h2>
                <p>
                  {t.inputs.length} files. Ten carry a fact the task cannot be finished without; one is there to be
                  correctly ignored. Click any image to read it at full size.
                </p>
              </div>

              <div className="grid">
                {t.inputs.map((a) => (
                  <button
                    key={a.file}
                    className="thumb reveal"
                    onClick={() => isImage(a) && setZoom(a)}
                    style={!isImage(a) ? { cursor: "default" } : undefined}
                    aria-label={isImage(a) ? `Open ${a.file}` : a.file}
                  >
                    <figure>
                      {isImage(a) ? (
                        <img src={asset(a.src)} alt={a.shows} loading="lazy" width={640} height={360} />
                      ) : (
                        <span className="thumb__slug">{a.kind === "pdf" ? "PDF" : "MARKDOWN"}</span>
                      )}
                      <figcaption>
                        <span className="thumb__name">{a.file}</span>
                        <div className="chiprow" style={{ marginBottom: "var(--space-xs)" }}>
                          <Chip tone={ROLE_TONE[a.role]} dot>
                            {ROLE_LABEL[a.role]}
                          </Chip>
                          {a.vendors.map((v) => (
                            <Chip key={v}>{v}</Chip>
                          ))}
                        </div>
                        <p className="small dim">{a.shows}</p>
                        <p className="small" style={{ marginTop: "var(--space-xs)", color: "var(--color-ink-2)" }}>
                          <span className="label" style={{ marginRight: "0.45rem" }}>
                            Carries
                          </span>
                          {a.carries}
                        </p>
                      </figcaption>
                    </figure>
                  </button>
                ))}
              </div>

              <Crosslinks
                links={[
                  { to: "/checklist#s2", tag: "B2", label: "Take the attachments away — still solvable?" },
                  { to: "/checklist#s2", tag: "B3", label: "Every file carries a needed fact" },
                ]}
              />
            </section>

            {/* -------------------------------------------------- format */}
            <section id="format" className="sec sec--tight">
              <div className="sec__head">
                <h2>The format spec</h2>
                <p>
                  The rules the receipts must follow live in an input file, not in the prompt. Stating them in the prompt
                  would have removed the work the task exists to grade.
                </p>
              </div>
              <Code label={t.format.file} note="input file">
                {t.format.body}
              </Code>
              <div className="note note--warn" style={{ marginTop: "var(--space-md)" }}>
                <b>The field rules are where the difficulty hides.</b> Cancellation date is “the date confirmed in the
                slack channel”, formatted <code className="tok">YYYY-MM-DD</code> in <b>PST</b> — which is what turns a
                UTC timestamp into 2026-02-10 for Helpshift. Confirmed by is “the person whose Slack message confirms or
                provides the latest evidence”, which is what makes Robert correct for Soundly.
              </div>
              <Crosslinks links={[{ to: "/checklist#s3", tag: "C2", label: "Policies live in the inputs" }]} />
            </section>

            {/* ------------------------------------------------ universe */}
            <section id="universe" className="sec">
              <div className="sec__head">
                <h2>The universe</h2>
                <p>Twelve of the twenty pool vendors have no attachment at all. Only the channel classifies them.</p>
              </div>
              <div className="grid grid--2">
                {t.universeNotes.map((n) => (
                  <div key={n.title} className="panel reveal">
                    <div className="panel__head">
                      <strong style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)" }}>{n.title}</strong>
                    </div>
                    <div className="panel__body">
                      <p className="small">{n.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Crosslinks links={[{ to: "/checklist#s2", tag: "B1", label: "One fact only the universe holds" }]} />
            </section>

            {/* -------------------------------------------------- answer */}
            <section id="answer" className="sec">
              <div className="sec__head">
                <h2>The answer</h2>
                <p>Resolved before the task was built. If you cannot state it yourself, the scenario is not ready.</p>
              </div>

              <div className="panel">
                <div className="panel__head">
                  <span className="label">Headline figures</span>
                </div>
                <div className="panel__body">
                  <div className="chiprow" style={{ gap: "var(--space-md)", alignItems: "baseline" }}>
                    <span
                      className="tnum"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-2xl)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "var(--color-ink)",
                      }}
                    >
                      {t.answer.total}
                    </span>
                    <span
                      className="tnum"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xl)",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                      }}
                    >
                      {t.answer.percent}
                    </span>
                    {t.answer.counts.map((c) => (
                      <Chip key={c.label} tone={c.tone as "ok" | "warn" | "plain"} dot>
                        {c.n} {c.label}
                      </Chip>
                    ))}
                  </div>
                  <p className="mono small dim" style={{ marginTop: "var(--space-sm)" }}>
                    {t.answer.basis}
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: "var(--text-md)", margin: "var(--space-xl) 0 var(--space-sm)" }}>
                The expected final state
              </h3>
              <div className="grid grid--2">
                {t.deliverables.map((d) => (
                  <FileLink key={d.file} file={d.file} src={d.src} what={d.what} />
                ))}
              </div>

              <div className="note" style={{ marginTop: "var(--space-md)" }}>
                <b>The SVG is a reference build, not a format to match.</b> Layout, colour and styling are free. Only the
                figures and the names are graded — and they have to agree with the receipts and the email exactly.
              </div>

              <Disclose summary="See the golden vendor_cancellation.svg" meta="render">
                <img
                  src={asset("tasks/vendor-closeout/gt/vendor_cancellation.svg")}
                  alt="Golden infographic — total owed and percentage at the top, then the three vendor groups"
                  style={{ width: "100%", border: "1px solid var(--color-rule)", borderRadius: "var(--radius-lg)" }}
                />
              </Disclose>

              <Crosslinks links={[{ to: "/checklist#s4", tag: "D2", label: "The end state, without pre-filled answers" }]} />
            </section>

            {/* -------------------------------------------------- ledger */}
            <section id="ledger" className="sec">
              <div className="sec__head">
                <h2>The evidence ledger</h2>
                <p>
                  Every vendor in the pool, the two sources that speak to it, and why they land where they do. This is
                  the artifact that makes the rubric set checkable.
                </p>
              </div>
              <Ledger rows={t.ledger} />
              <Crosslinks links={[{ to: "/checklist#s7", tag: "G2", label: "The golden passes the complete set" }]} />
            </section>

            {/* ------------------------------------------------- rubrics */}
            <section id="rubrics" className="sec">
              <div className="sec__head">
                <h2>Objective rubrics</h2>
                <p>
                  {t.rubrics.length} criteria. Read any one with the prompt closed and you can still rate it — the
                  amount, the filename, the timestamp and the person are all inside the criterion.
                </p>
              </div>
              <Rubrics rubrics={t.rubrics} />
              <div className="note note--warn" style={{ marginTop: "var(--space-lg)" }}>
                <b>Criterion 18 is the counter-example.</b> It carries neither a category nor an evaluation target in the
                source file. Everything else in the set does. E7 in the pre-submit gate is the check that catches it.
              </div>
              <Crosslinks
                links={[
                  { to: "/checklist#s5", tag: "E2", label: "Rate it with the prompt closed" },
                  { to: "/checklist#s5", tag: "E7", label: "Category and evaluation target" },
                  { to: "/checklist#s5", tag: "E8", label: "Negatives name failures the setup invites" },
                ]}
              />
            </section>

            {/* ---------------------------------------------- subjective */}
            <section id="subjective" className="sec">
              <div className="sec__head">
                <h2>The subjective block</h2>
                <p>{t.subjectiveNote}</p>
              </div>

              <ol style={{ listStyle: "none" }}>
                {t.subjective.map((s) => (
                  <li key={s.n} className="check" style={{ gridTemplateColumns: "2.5rem minmax(0, 1fr)" }}>
                    <span className="check__id tnum" style={{ paddingTop: "0.15rem" }}>
                      {String(s.n).padStart(2, "0")}
                    </span>
                    <p className="check__q">{s.text}</p>
                  </li>
                ))}
              </ol>

              <h3 style={{ fontSize: "var(--text-md)", margin: "var(--space-xl) 0 var(--space-sm)" }}>
                Why Model A failed on presentation
              </h3>
              <div className="stack-sm">
                {t.subjectiveFailures.map((f) => (
                  <p key={f.n} className="note note--no">
                    <b>{f.n}.</b> {f.body}
                  </p>
                ))}
              </div>

              <Disclose summary="See Model A’s vendor_cancellation.svg" meta="render">
                <img
                  src={asset("tasks/vendor-closeout/ot/vendor_cancellation.svg")}
                  alt="Model A infographic — $2,650.00 and a placeholder where the percentage should be"
                  style={{ width: "100%", border: "1px solid var(--color-rule)", borderRadius: "var(--radius-lg)" }}
                />
              </Disclose>

              <Crosslinks
                links={[
                  { to: "/checklist#s6", tag: "F1", label: "One element, one visible property" },
                  { to: "/spec#c-3", tag: "#3", label: "Grading content nobody asked for" },
                  { to: "/spec#conflicts", tag: "!", label: "Sources disagree on subjective negatives" },
                ]}
              />
            </section>

            {/* ------------------------------------------------- model A */}
            <section id="model-a" className="sec">
              <div className="sec__head">
                <h2>What Model A actually did</h2>
                <p>{t.run.summary}</p>
              </div>

              <p className="note note--no">
                <b>{t.run.score}</b>
              </p>

              <div className="scroller" style={{ marginTop: "var(--space-lg)" }}>
                <table className="spec">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "13rem" }}>Finding</th>
                      <th style={{ minWidth: "20rem" }}>Expected</th>
                      <th style={{ minWidth: "20rem" }}>Actual</th>
                      <th style={{ minWidth: "7rem" }}>Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.run.observations.map((o) => (
                      <tr key={o.title}>
                        <td>
                          <strong style={{ color: "var(--color-ink)" }}>{o.title}</strong>
                        </td>
                        <td>{o.expected}</td>
                        <td>{o.actual}</td>
                        <td className="mono tnum">{o.rubrics.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: "var(--text-md)", margin: "var(--space-xl) 0 var(--space-sm)" }}>
                The artifacts it produced
              </h3>
              <div className="grid grid--2">
                {t.run.artifacts.map((d) => (
                  <FileLink key={d.file} file={d.file} src={d.src} what={d.what} />
                ))}
              </div>

              <Crosslinks
                links={[
                  { to: "/checklist#s1", tag: "A4", label: "The 50% failure threshold" },
                  { to: "/checklist#s7", tag: "G3", label: "Download the trajectory once per turn" },
                ]}
              />
            </section>

            {/* --------------------------------------------------- traps */}
            <section id="traps" className="sec">
              <div className="sec__head">
                <h2>Designed friction</h2>
                <p>
                  The part worth copying. None of it makes the task longer — all of it makes the task harder to get right
                  by guessing.
                </p>
              </div>

              <div className="stack-lg">
                {t.traps.map((p) => (
                  <article key={p.id} className="panel reveal">
                    <div className="panel__head">
                      <strong style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)" }}>{p.title}</strong>
                      <span className="nav__spacer" />
                      <span className="label mono">{p.where}</span>
                    </div>
                    <div className="panel__body">
                      <p>{p.body}</p>
                      <p className="small" style={{ marginTop: "var(--space-sm)" }}>
                        <span className="label" style={{ marginRight: "0.5rem" }}>
                          Tests
                        </span>
                        {p.tests}
                      </p>
                      <Crosslinks links={p.links} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ----------------------------------------------- takeaways */}
            <section id="takeaways" className="sec">
              <div className="sec__head">
                <h2>Take these to your own task</h2>
              </div>
              <div className="stack-lg">
                {t.takeaways.map((k) => (
                  <div key={k.title}>
                    <h3 style={{ fontSize: "var(--text-md)", marginBottom: "var(--space-2xs)" }}>{k.title}</h3>
                    <p className="measure">{k.body}</p>
                    <Crosslinks links={k.links} />
                  </div>
                ))}
              </div>

              <div className="btnrow" style={{ marginTop: "var(--space-xl)" }}>
                <Link className="btn btn--primary" to="/checklist">
                  Run the pre-submit gate <IconArrow size={12} />
                </Link>
                <Link className="btn" to="/spec">
                  Check the clarifications
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Lightbox
        open={!!zoom}
        src={zoom ? asset(zoom.src) : ""}
        name={zoom?.file ?? ""}
        caption={zoom?.carries}
        onClose={() => setZoom(null)}
      />
    </>
  );
}
