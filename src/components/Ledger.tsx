import { useMemo, useState } from "react";
import type { LedgerRow, Verdict } from "../data/types";
import { cx } from "../lib/hooks";
import { Chip, IconSearch } from "./ui";

const VERDICTS: { key: Verdict; label: string; tone: "ok" | "warn" | "plain" | "no" }[] = [
  { key: "receipt", label: "Receipt issued", tone: "ok" },
  { key: "unconfirmed", label: "Unconfirmed", tone: "warn" },
  { key: "not-cancelled", label: "Not cancelled", tone: "plain" },
  { key: "out-of-pool", label: "Out of pool", tone: "no" },
  { key: "skipped", label: "Skipped", tone: "no" },
];

const toneOf = (v: Verdict) => VERDICTS.find((x) => x.key === v)?.tone ?? "plain";
const labelOf = (v: Verdict) => VERDICTS.find((x) => x.key === v)?.label ?? v;

export default function Ledger({ rows }: { rows: LedgerRow[] }) {
  const [q, setQ] = useState("");
  const [only, setOnly] = useState<Verdict | null>(null);

  const counts = useMemo(() => {
    const m = new Map<Verdict, number>();
    for (const r of rows) m.set(r.verdict, (m.get(r.verdict) ?? 0) + 1);
    return m;
  }, [rows]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (only && r.verdict !== only) return false;
      if (!needle) return true;
      return `${r.vendor} ${r.universe} ${r.attachment} ${r.why} ${r.amount ?? ""}`.toLowerCase().includes(needle);
    });
  }, [rows, q, only]);

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
            placeholder="Filter — a vendor, an amount, a filename"
            aria-label="Filter the ledger"
          />
        </label>
        {VERDICTS.filter((v) => counts.get(v.key)).map((v) => (
          <button
            key={v.key}
            className="toggle"
            aria-pressed={only === v.key}
            onClick={() => setOnly((cur) => (cur === v.key ? null : v.key))}
          >
            {v.label} · {counts.get(v.key)}
          </button>
        ))}
        {(only || q) && (
          <button className="toggle" onClick={() => { setOnly(null); setQ(""); }}>
            Clear
          </button>
        )}
      </div>

      <div className="scroller">
        <table className="spec">
          <thead>
            <tr>
              <th style={{ minWidth: "10rem" }}>Vendor</th>
              <th style={{ minWidth: "8.5rem" }}>Verdict</th>
              <th style={{ minWidth: "18rem" }}>In the channel</th>
              <th style={{ minWidth: "18rem" }}>In the attachments</th>
              <th style={{ minWidth: "20rem" }}>Why it lands there</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.vendor}>
                <td>
                  <strong className="mono" style={{ color: "var(--color-ink)" }}>
                    {r.vendor}
                  </strong>
                  {typeof r.mentions === "number" && (
                    <div className="label" style={{ marginTop: "0.2rem" }}>
                      {r.mentions} {r.mentions === 1 ? "mention" : "mentions"}
                    </div>
                  )}
                </td>
                <td>
                  <Chip tone={toneOf(r.verdict)} dot>
                    {labelOf(r.verdict)}
                  </Chip>
                  {r.amount && (
                    <div className={cx("mono", "tnum")} style={{ marginTop: "0.35rem", color: "var(--color-ink)" }}>
                      {r.amount}
                    </div>
                  )}
                </td>
                <td>{r.universe}</td>
                <td className={r.attachment === "None." ? "dim" : undefined}>{r.attachment}</td>
                <td>{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {shown.length === 0 && <p className="cmdk__empty">No vendor matches that filter.</p>}
    </>
  );
}
