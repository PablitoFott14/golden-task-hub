import { useMemo, useState } from "react";
import type { Rubric } from "../data/types";
import { cx } from "../lib/hooks";
import { Chip, IconSearch } from "./ui";

type Filter = "all" | "failed" | "satisfied" | "negative" | "trajectory";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "failed", label: "Model A failed" },
  { key: "satisfied", label: "Model A satisfied" },
  { key: "negative", label: "Negative" },
  { key: "trajectory", label: "Trajectory" },
];

/** A negative criterion marked Present is a failure; a positive one is a pass. */
function failed(r: Rubric): boolean {
  return r.polarity === "negative" ? r.status === "present" : r.status === "not-present";
}

export default function Rubrics({ rubrics }: { rubrics: Rubric[] }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState<Filter>("all");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rubrics.filter((r) => {
      if (f === "failed" && !failed(r)) return false;
      if (f === "satisfied" && failed(r)) return false;
      if (f === "negative" && r.polarity !== "negative") return false;
      if (f === "trajectory" && !r.target.includes("Trajectory")) return false;
      if (!needle) return true;
      return `${r.n} ${r.text} ${r.category} ${r.observed ?? ""}`.toLowerCase().includes(needle);
    });
  }, [rubrics, q, f]);

  const nFailed = rubrics.filter(failed).length;

  return (
    <>
      <div className="filters">
        <label className="field">
          <span className="dim" aria-hidden="true">
            <IconSearch />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter — a vendor, a filename, a category"
            aria-label="Filter the rubric set"
          />
        </label>
        {FILTERS.map((x) => (
          <button key={x.key} className="toggle" aria-pressed={f === x.key} onClick={() => setF(x.key)}>
            {x.label}
            {x.key === "failed" && ` · ${nFailed}`}
            {x.key === "all" && ` · ${rubrics.length}`}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none" }}>
        {shown.map((r) => {
          const bad = failed(r);
          return (
            <li key={r.n} className="check" style={{ gridTemplateColumns: "2.5rem minmax(0, 1fr)" }}>
              <span className="check__id tnum" style={{ paddingTop: "0.15rem" }}>
                {String(r.n).padStart(2, "0")}
              </span>
              <div>
                <div className="chiprow" style={{ marginBottom: "var(--space-xs)" }}>
                  <Chip tone={bad ? "no" : "ok"} dot>
                    {bad ? "Model A failed" : "Model A satisfied"}
                  </Chip>
                  {r.polarity === "negative" && <Chip tone="warn">negative</Chip>}
                  <Chip>{r.category}</Chip>
                  <Chip>{r.target}</Chip>
                </div>
                <p className="check__q">{r.text}</p>
                {r.observed && (
                  <p className={cx("check__f")}>
                    <span className="label" style={{ marginRight: "0.5rem" }}>
                      What happened
                    </span>
                    {r.observed}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {shown.length === 0 && <p className="cmdk__empty">No criterion matches that filter.</p>}
    </>
  );
}
