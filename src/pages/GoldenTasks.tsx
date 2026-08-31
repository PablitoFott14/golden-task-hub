import { Link } from "react-router-dom";
import { tasks } from "../data";
import { Chip, IconArrow } from "../components/ui";
import { useReveal } from "../lib/hooks";

const JUMPS = [
  { hash: "conversation", label: "The conversation" },
  { hash: "inputs", label: "The inputs" },
  { hash: "ledger", label: "Evidence ledger" },
  { hash: "answer", label: "The answer" },
  { hash: "rubrics", label: "Rubrics" },
  { hash: "model-a", label: "What Model A did" },
  { hash: "traps", label: "Designed friction" },
];

export default function GoldenTasks() {
  useReveal();
  return (
    <>
      <section className="opener">
        <div className="shell">
          <p className="label" style={{ marginBottom: "var(--space-sm)" }}>
            Golden tasks
          </p>
          <h1 style={{ fontSize: "var(--text-display-s)" }}>Tasks that already passed, opened up.</h1>
          <p className="lede" style={{ marginTop: "var(--space-md)" }}>
            Not a folder dump. Each one is the scenario, the evidence behind every decision, the criteria written against
            it, and the run that failed — in the order you would rebuild it.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="shell stack-lg">
          {tasks.map((t) => (
            <article key={t.meta.id} className="panel reveal">
              <div className="panel__head">
                <Chip tone="accent" dot>
                  {t.meta.status}
                </Chip>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)" }}>{t.meta.title}</strong>
                <span className="nav__spacer" />
                <span className="label">{t.meta.serviceId}</span>
              </div>

              <div className="panel__body stack">
                <p className="lede">{t.meta.oneLiner}</p>

                <div className="scroller">
                  <table className="spec">
                    <tbody>
                      <tr>
                        <th style={{ width: "9rem" }}>Category</th>
                        <td>
                          {t.meta.category} · {t.meta.subcategory}
                        </td>
                      </tr>
                      <tr>
                        <th>Universe</th>
                        <td>{t.meta.universe}</td>
                      </tr>
                      <tr>
                        <th>Persona</th>
                        <td>{t.meta.persona}</td>
                      </tr>
                      <tr>
                        <th>Turns</th>
                        <td>{t.meta.turns}, each consuming the state the one before it produced</td>
                      </tr>
                      <tr>
                        <th>Deliverables</th>
                        <td className="mono">{t.meta.deliverables.join(" · ")}</td>
                      </tr>
                      <tr>
                        <th>Modalities</th>
                        <td>{t.meta.modalities.join(" · ")}</td>
                      </tr>
                      <tr>
                        <th>Model A</th>
                        <td>{t.run.score}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="btnrow" style={{ marginTop: "var(--space-md)" }}>
                  <Link className="btn btn--primary" to={`/golden-tasks/${t.meta.id}`}>
                    Open the task <IconArrow size={12} />
                  </Link>
                  {JUMPS.map((j) => (
                    <Link key={j.hash} className="btn btn--sm" to={`/golden-tasks/${t.meta.id}#${j.hash}`}>
                      {j.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}

          <div className="note note--accent">
            <b>Adding the next one.</b> A task ships as one file under <code className="tok">src/data/tasks/</code> and its
            real artifacts under <code className="tok">public/tasks/&lt;id&gt;/</code>. Export it from{" "}
            <code className="tok">src/data/index.ts</code> and it appears here, in the ⌘K index, and anywhere a
            cross-reference points at it — no page changes.
          </div>
        </div>
      </section>
    </>
  );
}
