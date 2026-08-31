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
    <div className="content">
      <header className="phead">
        <p className="phead__eyebrow label">OpenClaw MM Rubrics · Multi-turn · Red Shell</p>
        <h1 className="phead__title">The central reference for multi-turn task work.</h1>
        <p className="lede phead__lede">
          Everything a contributor needs in one place — a worked golden task, the clarifications that are actually open,
          and the gate to run before you submit. Find your answer in a minute or two.
        </p>
        <div className="phead__stats">
          <span className="stat"><span className="stat__n">{tasks.length}</span><span className="stat__l">golden task</span></span>
          <span className="stat"><span className="stat__n">{clarifications.length}</span><span className="stat__l">clarifications</span></span>
          <span className="stat"><span className="stat__n">{totalChecks}</span><span className="stat__l">pre-submit checks</span></span>
          <span className="stat"><span className="stat__n">{process.length}</span><span className="stat__l">process steps</span></span>
          <span className="stat"><span className="stat__n stat__n--warn">{conflicts.length}</span><span className="stat__l">open conflicts</span></span>
        </div>
      </header>

      <section className="section">
        <div className="section__head">
          <h2>Start from the question you have</h2>
          <p>Six ways in. Each one lands on the exact section that answers it.</p>
        </div>
        <ul className="rows">
          {QUESTIONS.map((q) => (
            <li key={q.to + q.q}>
              <Link className="row" to={q.to}>
                <span>
                  <span className="row__title">{q.q}</span>
                  <span className="row__sub">{q.a}</span>
                </span>
                <span className="row__go">
                  {q.go} <IconArrow size={12} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="process">
        <div className="section__head">
          <h2>The process, end to end</h2>
          <p>
            Nine steps across two legs. Most rejections come from skipping one of the first three — each step names what
            it produces and which pre-submit check will ask about it later.
          </p>
        </div>

        <ol className="steps">
          {process.map((s) => (
            <li key={s.id} id={s.id}>
              <span className="stage">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p className="dim" style={{ marginTop: "var(--space-2xs)" }}>{s.body}</p>
                <p className="label" style={{ marginTop: "var(--space-sm)" }}>Produces · {s.produces}</p>
                {s.links && (
                  <div className="chiprow" style={{ marginTop: "var(--space-sm)" }}>
                    {s.links.map((l) => (
                      <Link key={l.to + l.label} className="xlink" to={l.to}>
                        {l.tag && <b>{l.tag}</b>}
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Open right now</h2>
          <p>
            Decisions that have not landed. If your task touches one of these, say which reading you took rather than
            picking silently.
          </p>
        </div>

        <ul className="rows">
          {conflicts.map((c) => (
            <li key={c.id}>
              <Link className="row" to="/spec#conflicts">
                <span>
                  <span className="row__title">{c.title}</span>
                  <span className="row__sub">{c.a.source} vs {c.b.source}</span>
                </span>
                <Chip tone="warn" dot>conflict</Chip>
              </Link>
            </li>
          ))}
          {flagged.map((h) => (
            <li key={h.id}>
              <Link className="row" to="/spec#history">
                <span>
                  <span className="row__title">{h.change}</span>
                  <span className="row__sub">{h.area} · {h.why}</span>
                </span>
                <Chip tone="warn">needs a decision</Chip>
              </Link>
            </li>
          ))}
          <li>
            <Link className="row" to="/spec#todos">
              <span>
                <span className="row__title">{open} outstanding items on the rollout</span>
                <span className="row__sub">Screening, the linters, the course walkthrough, and sharing the spec doc.</span>
              </span>
              <span className="row__go">To-do <IconArrow size={12} /></span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Take it with you</h2>
        </div>
        <div className="cards">
          <a className="tile" href={asset("docs/presubmit-gate.pdf")} target="_blank" rel="noreferrer">
            <div className="tile__top">
              <span className="tile__icon"><IconFile size={16} /></span>
              <span className="tile__k">2 pages</span>
            </div>
            <p className="tile__title">presubmit-gate.pdf</p>
            <p className="tile__desc">The printable gate — the same {totalChecks} checks as the tab, laid out for two sheets beside the screen.</p>
            <span className="tile__go">Open the PDF <IconArrow size={12} /></span>
          </a>

          <div className="tile tile--static">
            <div className="tile__top">
              <span className="tile__icon"><IconFile size={16} /></span>
              <span className="tile__k">Sources</span>
            </div>
            <p className="tile__title">Sources of truth</p>
            <p className="tile__desc">This hub is a working surface over documents that live elsewhere. When they disagree, the guidelines win.</p>
            <p className="small" style={{ marginTop: "var(--space-sm)" }}>
              <code className="tok">clarifications.md</code> · <code className="tok">purposed_solution.md</code> ·{" "}
              <code className="tok">taxonomy_updates.md</code>
            </p>
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
      </section>
    </div>
  );
}
