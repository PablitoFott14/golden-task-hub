import { Fragment } from "react";
import { cx } from "../lib/util";

/**
 * The small markdown renderer the hub shares. Two things are rendered from
 * markdown here: the excerpts a subjective criterion is rated on, and the
 * golden conversation. Both are read the way their reader read them, so no
 * `##` and no `**` may ever reach the screen.
 */

/** `**bold**`, `*italic*` and `` `mono` ``, which is all any of it uses. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <strong key={i} className="font-semibold text-ink-900">
              {p.slice(2, -2)}
            </strong>
          );
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2)
          return (
            <em key={i} className="text-ink-500">
              {p.slice(1, -1)}
            </em>
          );
        if (p.startsWith("`") && p.endsWith("`"))
          return (
            <code key={i} className="font-mono text-[0.92em] text-ink-800">
              {p.slice(1, -1)}
            </code>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

const cells = (row: string) =>
  row
    .split("|")
    .slice(1, -1)
    .map((c) => c.trim());

/**
 * Markdown lines as formatted text. `mark` frames the lines the surrounding
 * component is pointing at, which is how a subjective criterion says which
 * part of a document it is about.
 */
export function MdLines({ lines, mark = [] }: { lines: string[]; mark?: number[] }) {
  const marked = new Set(mark);

  return (
    <>
      {lines.map((line, i) => {
        const hit = marked.has(i);
        const frame = hit
          ? "-mx-1.5 rounded bg-gold-300/25 px-1.5 ring-1 ring-gold-500/40 dark:bg-gold-500/15"
          : "";

        // A table renders once, at its header row; the rest of it is skipped.
        if (line.trim().startsWith("|")) {
          const isHead = i === 0 || !lines[i - 1]?.trim().startsWith("|");
          if (!isHead) return null;
          const rows: string[] = [];
          for (let j = i; j < lines.length && lines[j].trim().startsWith("|"); j++)
            rows.push(lines[j]);
          const body = rows.filter((r) => !/^\|[\s|:-]+\|$/.test(r.trim()));
          return (
            <div key={i} className={cx("overflow-x-auto", frame)}>
              <table className="w-full border-collapse text-[11.5px]">
                <tbody>
                  {body.map((r, ri) => (
                    <tr key={ri} className="border-b border-ink-200/60 last:border-0">
                      {cells(r).map((c, ci) => (
                        <td
                          key={ci}
                          className={cx(
                            "py-1 pr-3 align-top",
                            ri === 0 ? "font-semibold text-ink-800" : "text-ink-600"
                          )}
                        >
                          <Inline text={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (line.startsWith("### "))
          return (
            <p key={i} className={cx("font-display text-[13px] font-bold text-ink-900", frame)}>
              <Inline text={line.slice(4)} />
            </p>
          );
        if (line.startsWith("## "))
          return (
            <p key={i} className={cx("font-display text-[14px] font-bold text-ink-900", frame)}>
              <Inline text={line.slice(3)} />
            </p>
          );
        if (line.startsWith("> "))
          return (
            <p key={i} className={cx("border-l-2 border-ink-300 pl-2.5 text-ink-500", frame)}>
              <Inline text={line.slice(2)} />
            </p>
          );
        if (line.startsWith("- "))
          return (
            <p key={i} className={cx("flex gap-2", frame)}>
              <span aria-hidden className="select-none text-ink-400">
                &bull;
              </span>
              <span className="min-w-0 flex-1">
                <Inline text={line.slice(2)} />
              </span>
            </p>
          );
        return (
          <p key={i} className={frame}>
            <Inline text={line} />
          </p>
        );
      })}
    </>
  );
}
