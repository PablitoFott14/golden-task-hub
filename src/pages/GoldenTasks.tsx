import { Link } from "react-router-dom";
import { tasks } from "../data";
import { Chip, IconArrow } from "../components/ui";
import { useReveal } from "../lib/hooks";

const JUMPS = [
  { hash: "conversation", label: "Conversation" },
  { hash: "inputs", label: "Inputs" },
  { hash: "ledger", label: "Evidence ledger" },
  { hash: "answer", label: "The answer" },
  { hash: "rubrics", label: "Rubrics" },
  { hash: "model-a", label: "What Model A did" },
  { hash: "traps", label: "Designed friction" },
];

export default function GoldenTasks() {
  useReveal();
  return (
    <div className="content">
      <header className="phead">
        <p className="phead__eyebrow label">Reference library</p>
        <h1 className="phead__title">Tasks that already passed, opened up.</h1>
        <p className="lede phead__lede">
          Not a folder dump. Each one is the scenario, the evidence behind every decision, the criteria written against
          it, and the run that failed — in the order you would rebuild it.
        </p>
      </header>

      <div className="stack-lg">
        {tasks.map((t) => (
          <article key={t.meta.id} className="card">
            <div className="card__head">
              <span className="status status--accent"><span className="status__dot" />{t.meta.status}</span>
              <h2 className="card__title">{t.meta.title}</h2>
              <span className="card__spacer" />
              <span className="chip mono">{t.meta.serviceId}</span>
            </div>

            <div className="card__body stack">
              <p className="lede">{t.meta.oneLiner}</p>

              <div className="chiprow">
                <Chip>{t.meta.category}</Chip>
                <Chip>{t.meta.subcategory}</Chip>
                <Chip>{t.meta.turns} turns</Chip>
                {t.meta.modalities.map((m) => <Chip key={m}>{m}</Chip>)}
              </div>

              <table className="kv">
                <tbody>
                  <tr><th>Universe</th><td>{t.meta.universe}</td></tr>
                  <tr><th>Persona</th><td>{t.meta.persona}</td></tr>
                  <tr><th>Deliverables</th><td className="mono">{t.meta.deliverables.join(" · ")}</td></tr>
                  <tr><th>Model A</th><td>{t.run.score}</td></tr>
                </tbody>
              </table>

              <div className="btnrow" style={{ marginTop: "var(--space-2xs)" }}>
                <Link className="btn btn--primary" to={`/golden-tasks/${t.meta.id}`}>
                  Open the task <IconArrow size={12} />
                </Link>
              </div>

              <div className="xlinks">
                <span className="label">Jump to</span>
                {JUMPS.map((j) => (
                  <Link key={j.hash} className="xlink" to={`/golden-tasks/${t.meta.id}#${j.hash}`}>
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
    </div>
  );
}
