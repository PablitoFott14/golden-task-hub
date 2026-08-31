import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { checklist, totalChecks, verdict } from "../data/checklist";
import { Chip, Crosslinks, IconArrow, IconCheck, IconFile } from "../components/ui";
import { asset, cx, usePersisted, useReveal, useScrollSpy } from "../lib/hooks";

export default function PreSubmit() {
  const [ticked, setTicked] = usePersisted<Record<string, boolean>>("rsh.checklist.v1", {});
  const [hideDone, setHideDone] = useState(false);
  const active = useScrollSpy(checklist.map((s) => s.id));
  useReveal();

  const done = useMemo(() => checklist.flatMap((s) => s.checks).filter((c) => ticked[c.id]).length, [ticked]);
  const pct = Math.round((done / totalChecks) * 100);
  const complete = done === totalChecks;

  const toggle = (id: string) => setTicked((p) => ({ ...p, [id]: !p[id] }));

  return (
    <>
      <section className="opener">
        <div className="shell">
          <p className="label" style={{ marginBottom: "var(--space-sm)" }}>
            Pre-submit gate
          </p>
          <h1 style={{ fontSize: "var(--text-display-s)" }}>Run this once, when you think you are finished.</h1>
          <p className="lede" style={{ marginTop: "var(--space-md)" }}>
            {totalChecks} checks, about five minutes. Tick a box only when you have actually looked — not when you
            assume. Not a replacement for the guidelines: the section refs point into them, and they stay the source of
            truth.
          </p>

          <div style={{ marginTop: "var(--space-lg)", maxWidth: "34rem" }}>
            <div className="foot-line__row" style={{ marginBottom: "var(--space-xs)" }}>
              <span className="tnum">
                {done} / {totalChecks} ticked
              </span>
              <span className="nav__spacer" />
              <span className="tnum">{pct}%</span>
            </div>
            <div className="meter" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={totalChecks}>
              <i style={{ transform: `scaleX(${done / totalChecks})`, width: "100%" }} />
            </div>
          </div>

          <div className="btnrow" style={{ marginTop: "var(--space-lg)" }}>
            <button className="btn" aria-pressed={hideDone} onClick={() => setHideDone((h) => !h)}>
              {hideDone ? "Show every check" : "Show only what is left"}
            </button>
            <a className="btn" href={asset("docs/presubmit-gate.pdf")} target="_blank" rel="noreferrer">
              <IconFile /> Printable PDF
            </a>
            {done > 0 && (
              <button className="btn" onClick={() => setTicked({})}>
                Reset for a new task
              </button>
            )}
          </div>
          <p className="small dim" style={{ marginTop: "var(--space-sm)" }}>
            Ticks are remembered in this browser only. Reset before you start the next task.
          </p>
        </div>
      </section>

      <div className="shell page">
        <div className="withrail">
          <nav className="rail" aria-label="Sections">
            <p className="label" style={{ marginBottom: "var(--space-xs)" }}>
              Sections
            </p>
            <ol>
              {checklist.map((s) => {
                const n = s.checks.filter((c) => ticked[c.id]).length;
                return (
                  <li key={s.id}>
                    <Link to={{ hash: `#${s.id}` }} className={cx(active === s.id && "is-active")}>
                      {s.n}. {s.title}
                      <span className="tnum dim" style={{ float: "right", fontSize: "var(--text-xs)" }}>
                        {n}/{s.checks.length}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div>
            {checklist.map((s) => {
              const checks = hideDone ? s.checks.filter((c) => !ticked[c.id]) : s.checks;
              const n = s.checks.filter((c) => ticked[c.id]).length;
              if (hideDone && checks.length === 0) {
                return (
                  <section key={s.id} id={s.id} className="sec sec--tight">
                    <div className="sec__head" style={{ marginBottom: 0 }}>
                      <h2 style={{ fontSize: "var(--text-md)" }}>
                        {s.n}. {s.title}
                      </h2>
                      <p>
                        <Chip tone="ok" dot>
                          all {s.checks.length} ticked
                        </Chip>
                      </p>
                    </div>
                  </section>
                );
              }
              return (
                <section key={s.id} id={s.id} className="sec sec--tight">
                  <div className="sec__head">
                    <div className="chiprow" style={{ marginBottom: "var(--space-xs)" }}>
                      <Chip tone={n === s.checks.length ? "ok" : "plain"} dot={n === s.checks.length}>
                        {n} / {s.checks.length}
                      </Chip>
                    </div>
                    <h2>
                      {s.n}. {s.title}
                    </h2>
                    <p>{s.prompt}</p>
                  </div>

                  {s.context.length > 0 && (
                    <div className="grid grid--2" style={{ marginBottom: "var(--space-lg)" }}>
                      {s.context.map((b) => (
                        <div
                          key={b.lead}
                          className={cx("note", b.tone === "warn" && "note--warn", b.tone === "accent" && "note--accent")}
                        >
                          <b>{b.lead}</b>
                          {b.body && <p style={{ marginTop: "var(--space-2xs)" }}>{b.body}</p>}
                          {b.examples && (
                            <div className="stack-sm" style={{ marginTop: "var(--space-xs)" }}>
                              {b.examples.map((ex, i) => (
                                <span key={i} className={cx("exline", ex.ok ? "exline--yes" : "exline--no")}>
                                  <i>{ex.ok ? "✓" : "✗"}</i>
                                  <span>{ex.text}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <ul style={{ listStyle: "none" }}>
                    {checks.map((c) => {
                      const on = !!ticked[c.id];
                      return (
                        <li key={c.id} className={cx("check", on && "is-done")}>
                          <button
                            className="check__box"
                            aria-pressed={on}
                            aria-label={`${on ? "Untick" : "Tick"} ${c.id}`}
                            onClick={() => toggle(c.id)}
                          >
                            <IconCheck />
                          </button>
                          <div>
                            <p className="check__q">
                              <span className="check__id">{c.id}</span>
                              {c.q}
                            </p>
                            <p className="check__f">
                              {c.f} <span className="check__ref">{c.ref}</span>
                            </p>
                            <Crosslinks links={c.links} label="Worked example" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}

            <section className="sec">
              <div className="grid grid--2">
                <div className="panel" style={complete ? { borderColor: "var(--color-ok)" } : undefined}>
                  <div className="panel__head">
                    <Chip tone="ok" dot>
                      {verdict.go.title}
                    </Chip>
                  </div>
                  <div className="panel__body">
                    <p className="small">{verdict.go.body}</p>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel__head">
                    <Chip tone="no" dot>
                      {verdict.no.title}
                    </Chip>
                  </div>
                  <div className="panel__body">
                    <p className="small">{verdict.no.body}</p>
                  </div>
                </div>
              </div>

              <div className="btnrow" style={{ marginTop: "var(--space-xl)" }}>
                <Link className="btn btn--primary" to="/golden-tasks/vendor-closeout">
                  See a passing task <IconArrow size={12} />
                </Link>
                <Link className="btn" to="/spec#conflicts">
                  Open conflicts
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
