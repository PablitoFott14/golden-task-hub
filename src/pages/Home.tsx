import { Link } from "react-router-dom";
import { checklist, totalChecks } from "../data/checklist";
import { clarifications, conflicts, history, todos } from "../data/spec";
import { process } from "../data/process";
import { tasks } from "../data";
import { asset, useReveal } from "../lib/hooks";
import { Chip, IconArrow, IconFile } from "../components/ui";

const QUESTIONS = [
  {
    q: "What does a strong completed task actually look like?",
    a: "One golden task, opened up — the conversation, the evidence, the rubric set, and the run that failed it.",
    to: "/golden-tasks/vendor-closeout",
    go: "Golden task",
  },
  {
    q: "What should I check before I submit?",
    a: `${totalChecks} checks in seven sections, about five minutes. Ticks are remembered on this device.`,
    to: "/checklist",
    go: "Pre-submit",
  },
  {
    q: "Has this grey area already been addressed?",
    a: "Eight clarifications with the proposal on the table, plus the places two source documents still disagree.",
    to: "/spec",
    go: "Spec doc",
  },
  {
    q: "What is the expected process, step by step?",
    a: "Nine steps across two legs, from exploring the universe to writing the subjective block.",
    to: "/#process",
    go: "The steps",
  },
  {
    q: "Why did a criterion get written the way it did?",
    a: "Twenty-one objective criteria and ten presentation ones, each next to what the run actually did.",
    to: "/golden-tasks/vendor-closeout#rubrics",
    go: "Rubrics",
  },
  {
    q: "How do I make a task hard without making it longer?",
    a: "Seven designed friction points from the golden task, and what each one tests.",
    to: "/golden-tasks/vendor-closeout#traps",
    go: "Friction",
  },
];

export default function Home() {
  useReveal();
  // The conflicts section already states three of the four flagged log entries;
  // only surface the ones it does not cover.
  const flagged = history.filter((h) => h.state === "flagged" && h.area === "Autorater");
  const open = todos.filter((t) => t.status !== "in progress").length;

  return (
    <>
      <section className="opener">
        <div className="shell">
          <p className="label" style={{ marginBottom: "var(--space-sm)" }}>
            OpenClaw MM Rubrics · Multi-turn · Red Shell
          </p>
          <h1>Everything you need. Nothing you read twice.</h1>
          <p className="lede" style={{ marginTop: "var(--space-md)" }}>
            The reference point for contributors building multi-turn multimodal tasks. A worked golden task, the
            clarifications that are actually open, and the gate to run before you submit.
          </p>
          <div className="opener__meta">
            <span className="label">{tasks.length} golden task</span>
            <span className="label">{clarifications.length} clarifications</span>
            <span className="label">{totalChecks} pre-submit checks</span>
            <span className="label">{process.length} process steps</span>
            <span className="label" style={{ color: "var(--color-warn)" }}>
              {conflicts.length} open conflicts
            </span>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <div className="sec__head">
            <h2>Start from the question you have.</h2>
          </div>
          <ul className="qlist">
            {QUESTIONS.map((q) => (
              <li key={q.to + q.q}>
                <Link className="qrow" to={q.to}>
                  <span>
                    <span className="qrow__q">{q.q}</span>
                    <span className="qrow__a" style={{ display: "block" }}>
                      {q.a}
                    </span>
                  </span>
                  <span className="qrow__go">
                    {q.go} <IconArrow size={12} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <hr className="rule" />
        </div>
      </section>

      <section className="band" id="process">
        <div className="shell">
          <p className="eyebrow">The process</p>
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 600, maxWidth: "22ch" }}>
            Nine steps, two legs. Most rejections come from skipping one of the first three.
          </h2>
          <p className="lede" style={{ marginTop: "var(--space-sm)" }}>
            Each step names what it produces and which pre-submit check will ask about it later.
          </p>

          <ol className="steps" style={{ marginTop: "var(--space-xl)" }}>
            {process.map((s) => (
              <li key={s.id} id={s.id} className="reveal">
                <span className="stage">{s.n}.0</span>
                <div>
                  <h3>{s.title}</h3>
                  <p style={{ color: "var(--color-graphite-muted)" }}>{s.body}</p>
                  <p className="label" style={{ marginTop: "var(--space-sm)" }}>
                    Produces · {s.produces}
                  </p>
                  {s.links && (
                    <div className="chiprow" style={{ marginTop: "var(--space-sm)" }}>
                      {s.links.map((l) => (
                        <Link key={l.to + l.label} className="xlink" to={l.to} style={{ background: "transparent" }}>
                          {l.tag && <b style={{ color: "var(--color-accent-on-dark)" }}>{l.tag}</b>}
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <div className="sec__head">
            <h2>Open right now</h2>
            <p>
              Decisions that have not landed. If your task touches one of these, say which reading you took rather than
              picking silently.
            </p>
          </div>

          <ul className="qlist">
            {conflicts.map((c) => (
              <li key={c.id}>
                <Link className="qrow" to="/spec#conflicts">
                  <span>
                    <span className="qrow__q">{c.title}</span>
                    <span className="qrow__a" style={{ display: "block" }}>
                      {c.a.source} vs {c.b.source}
                    </span>
                  </span>
                  <Chip tone="warn" dot>
                    conflict
                  </Chip>
                </Link>
              </li>
            ))}
            {flagged.map((h) => (
              <li key={h.id}>
                <Link className="qrow" to="/spec#history">
                  <span>
                    <span className="qrow__q">{h.change}</span>
                    <span className="qrow__a" style={{ display: "block" }}>
                      {h.area} · {h.why}
                    </span>
                  </span>
                  <Chip tone="warn">needs a decision</Chip>
                </Link>
              </li>
            ))}
            <li>
              <Link className="qrow" to="/spec#todos">
                <span>
                  <span className="qrow__q">{open} outstanding items on the rollout</span>
                  <span className="qrow__a" style={{ display: "block" }}>
                    Screening, the linters, the course walkthrough, and sharing the spec doc.
                  </span>
                </span>
                <span className="qrow__go">
                  To-do <IconArrow size={12} />
                </span>
              </Link>
            </li>
          </ul>
          <hr className="rule" />
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="shell">
          <div className="sec__head">
            <h2>Take it with you</h2>
          </div>
          <div className="grid grid--2">
            <a className="panel" href={asset("docs/presubmit-gate.pdf")} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div className="panel__head">
                <strong style={{ fontFamily: "var(--font-display)" }}>presubmit-gate.pdf</strong>
                <span className="label">2 pages · {totalChecks} checks</span>
              </div>
              <div className="panel__body">
                <p className="small dim">
                  The printable gate. Same {totalChecks} checks as the tab, laid out for two sheets beside the screen.
                </p>
                <span className="xlink" style={{ marginTop: "var(--space-sm)" }}>
                  <IconFile /> Open the PDF
                </span>
              </div>
            </a>

            <div className="panel">
              <div className="panel__head">
                <strong style={{ fontFamily: "var(--font-display)" }}>Sources of truth</strong>
              </div>
              <div className="panel__body stack-sm">
                <p className="small dim">
                  This hub is a working surface over documents that live elsewhere. When they disagree, the guidelines win.
                </p>
                <p className="small">
                  <code className="tok">[External] OpenClaw MM Rubrics MULTI TURN – Guidelines</code>
                </p>
                <p className="small">
                  <code className="tok">clarifications.md</code> · <code className="tok">purposed_solution.md</code> ·{" "}
                  <code className="tok">taxonomy_updates.md</code>
                </p>
                <p className="small">
                  <code className="tok">{`Tasks\\${tasks[0].meta.serviceId}`}</code>
                </p>
              </div>
            </div>
          </div>

          <div className="xlinks">
            <span className="label">Then</span>
            {checklist.slice(0, 3).map((s) => (
              <Link key={s.id} className="xlink" to={`/checklist#${s.id}`}>
                <b>{s.n}</b>
                {s.title}
              </Link>
            ))}
            <Link className="xlink" to="/checklist">
              All seven sections <IconArrow size={11} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
