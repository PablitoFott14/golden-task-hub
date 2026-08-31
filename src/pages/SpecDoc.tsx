import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { clarifications, conflicts, history, todos } from "../data/spec";
import { Chip, Crosslinks, Disclose, IconArrow, IconSearch } from "../components/ui";
import { cx, useReveal, useScrollSpy } from "../lib/hooks";

const SECTIONS = [
  { id: "clarifications", label: "Clarifications" },
  { id: "conflicts", label: "Open conflicts" },
  { id: "history", label: "Decision history" },
  { id: "todos", label: "Outstanding" },
];

const STATUS_TONE = {
  open: "warn",
  proposed: "accent",
  "blocks-taxonomy": "no",
} as const;

const STATUS_LABEL = {
  open: "no proposal yet",
  proposed: "proposal on the table",
  "blocks-taxonomy": "blocks the taxonomy",
} as const;

export default function SpecDoc() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const active = useScrollSpy(SECTIONS.map((s) => s.id));
  useReveal();

  const tags = useMemo(() => Array.from(new Set(clarifications.flatMap((c) => c.tags))).sort(), []);
  const areas = useMemo(() => Array.from(new Set(history.map((h) => h.area))), []);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return clarifications.filter((c) => {
      if (tag && !c.tags.includes(tag)) return false;
      if (!needle) return true;
      return `${c.n} ${c.title} ${c.question} ${c.asks.join(" ")} ${c.context.join(" ")} ${(c.proposal ?? []).join(" ")}`
        .toLowerCase()
        .includes(needle);
    });
  }, [q, tag]);

  const shownHistory = useMemo(() => (area ? history.filter((h) => h.area === area) : history), [area]);

  return (
    <>
      <section className="opener">
        <div className="shell">
          <p className="label" style={{ marginBottom: "var(--space-sm)" }}>
            Spec doc · project clarifications
          </p>
          <h1 style={{ fontSize: "var(--text-display-s)" }}>What is settled, what is proposed, what is still open.</h1>
          <p className="lede" style={{ marginTop: "var(--space-md)" }}>
            Eight clarifications with the proposal drafted against each. Nothing here counts as resolved until it is
            accepted — the proposals are starting positions, not decisions.
          </p>
          <div className="opener__meta">
            <span className="label">{clarifications.length} clarifications</span>
            <span className="label">{clarifications.filter((c) => c.status === "blocks-taxonomy").length} blocking the taxonomy</span>
            <span className="label" style={{ color: "var(--color-warn)" }}>
              {conflicts.length} open conflicts
            </span>
            <span className="label">{history.length} logged changes</span>
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
            {/* ------------------------------------------ clarifications */}
            <section id="clarifications" className="sec sec--tight" style={{ paddingTop: 0 }}>
              <div className="sec__head">
                <h2>Clarifications</h2>
                <p>Joined by number to the source documents. Reword freely; renumber never.</p>
              </div>

              <div className="filters">
                <label className="field">
                  <span className="dim" aria-hidden="true">
                    <IconSearch />
                  </span>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search the clarifications and the proposals"
                    aria-label="Search clarifications"
                  />
                </label>
                {tags.map((x) => (
                  <button key={x} className="toggle" aria-pressed={tag === x} onClick={() => setTag((c) => (c === x ? null : x))}>
                    {x}
                  </button>
                ))}
              </div>

              <div className="stack-lg" style={{ marginTop: "var(--space-md)" }}>
                {shown.map((c) => (
                  <article key={c.n} id={`c-${c.n}`} className="panel">
                    <div className="panel__head">
                      <span className="check__id tnum">{String(c.n).padStart(2, "0")}</span>
                      <strong style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)" }}>{c.title}</strong>
                      <span className="nav__spacer" />
                      <Chip tone={STATUS_TONE[c.status]} dot>
                        {STATUS_LABEL[c.status]}
                      </Chip>
                    </div>

                    <div className="panel__body">
                      <p className="lede" style={{ fontSize: "var(--text-base)", color: "var(--color-ink)" }}>
                        {c.question}
                      </p>

                      {c.proposal && (
                        <div style={{ marginTop: "var(--space-md)" }}>
                          <p className="label" style={{ marginBottom: "var(--space-xs)" }}>
                            Proposed
                          </p>
                          <div className="stack-sm">
                            {c.proposal.map((p, i) => (
                              <p key={i} className="note note--accent">
                                {p}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ marginTop: "var(--space-md)" }}>
                        <Disclose summary="The questions as they were asked" meta={`${c.asks.length} asks`}>
                          <ul style={{ listStyle: "none" }} className="stack-sm">
                            {c.asks.map((a, i) => (
                              <li key={i} className="note">
                                {a}
                              </li>
                            ))}
                            {c.context.map((a, i) => (
                              <li key={`ctx-${i}`} className="small dim" style={{ paddingLeft: "var(--space-md)" }}>
                                {a}
                              </li>
                            ))}
                          </ul>
                        </Disclose>
                      </div>

                      <div className="chiprow" style={{ marginTop: "var(--space-md)" }}>
                        {c.tags.map((x) => (
                          <Chip key={x}>{x}</Chip>
                        ))}
                      </div>

                      <Crosslinks links={c.links} />
                    </div>
                  </article>
                ))}
              </div>

              {shown.length === 0 && <p className="cmdk__empty">Nothing matches that filter.</p>}
            </section>

            {/* ----------------------------------------------- conflicts */}
            <section id="conflicts" className="sec">
              <div className="sec__head">
                <h2>Where the sources disagree</h2>
                <p>
                  Not open questions — places two documents in the project currently say different things. If your task
                  touches one, say which reading you took.
                </p>
              </div>

              <div className="stack-lg">
                {conflicts.map((c) => (
                  <article key={c.id} className="panel reveal">
                    <div className="panel__head">
                      <Chip tone="warn" dot>
                        conflict
                      </Chip>
                      <strong style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)" }}>{c.title}</strong>
                    </div>
                    <div className="panel__body">
                      <div className="grid grid--2">
                        <div>
                          <p className="label" style={{ marginBottom: "var(--space-2xs)" }}>
                            {c.a.source}
                          </p>
                          <p className="small">{c.a.says}</p>
                        </div>
                        <div>
                          <p className="label" style={{ marginBottom: "var(--space-2xs)" }}>
                            {c.b.source}
                          </p>
                          <p className="small">{c.b.says}</p>
                        </div>
                      </div>
                      <p className="note note--accent" style={{ marginTop: "var(--space-md)" }}>
                        <b>Until it is settled.</b> {c.guidance}
                      </p>
                      <Crosslinks links={c.links} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------- history */}
            <section id="history" className="sec">
              <div className="sec__head">
                <h2>Decision history</h2>
                <p>
                  What changed between the single-turn guidance and the multi-turn taxonomy, and why. Read it when a rule
                  surprises you — most of these are reversals of something that used to be true.
                </p>
              </div>

              <div className="filters">
                {areas.map((a) => (
                  <button key={a} className="toggle" aria-pressed={area === a} onClick={() => setArea((c) => (c === a ? null : a))}>
                    {a} · {history.filter((h) => h.area === a).length}
                  </button>
                ))}
                {area && (
                  <button className="toggle" onClick={() => setArea(null)}>
                    Clear
                  </button>
                )}
              </div>

              <div className="scroller">
                <table className="spec">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "9rem" }}>Area</th>
                      <th style={{ minWidth: "22rem" }}>What changed</th>
                      <th style={{ minWidth: "22rem" }}>Why</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shownHistory.map((h) => (
                      <tr key={h.id}>
                        <td className="label">{h.area}</td>
                        <td style={{ color: "var(--color-ink)" }}>{h.change}</td>
                        <td>{h.why}</td>
                        <td>
                          <Chip tone={h.state === "flagged" ? "warn" : "ok"} dot>
                            {h.state === "flagged" ? "needs a decision" : "settled"}
                          </Chip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* --------------------------------------------------- todos */}
            <section id="todos" className="sec">
              <div className="sec__head">
                <h2>Outstanding on the rollout</h2>
              </div>
              <ul className="qlist">
                {todos.map((t) => (
                  <li key={t.n} className="check" style={{ gridTemplateColumns: "2.5rem minmax(0, 1fr)" }}>
                    <span className="check__id tnum" style={{ paddingTop: "0.15rem" }}>
                      {String(t.n).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="chiprow" style={{ marginBottom: "var(--space-xs)" }}>
                        <Chip tone={t.status === "in progress" ? "accent" : "plain"} dot>
                          {t.status}
                        </Chip>
                        {t.dependsOn && <Chip>depends on {t.dependsOn}</Chip>}
                      </div>
                      <p className="check__q">{t.title}</p>
                      <p className="check__f">{t.detail}</p>
                      <Crosslinks links={t.links} />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="btnrow" style={{ marginTop: "var(--space-xl)" }}>
                <Link className="btn btn--primary" to="/golden-tasks/vendor-closeout">
                  Open the golden task <IconArrow size={12} />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
