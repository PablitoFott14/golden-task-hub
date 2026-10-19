import { useMemo, useRef, useState } from "react";
import { addDays, dayNum, fmtDay, fmtShortDay, numDay, weekOf } from "../../lib/explore/time";
import type { ExploreIndex } from "../../lib/explore/types";

/**
 * The records of a dataset over time: one bar per day (per week over long
 * spans), the whole dataset faint behind what the filters leave. Drag across
 * it to filter to a stretch of days, click a bar for that day alone.
 */
export function TimeStrip({
  ix,
  all,
  rows,
  from,
  to,
  onRange,
  height = 56,
  nowDay,
}: {
  ix: ExploreIndex;
  all: number[];
  rows: number[];
  from: string | null;
  to: string | null;
  onRange: (from: string | null, to: string | null) => void;
  height?: number;
  nowDay?: string | null;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<{ a: number; b: number } | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const model = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const i of all) {
      const d = ix.items[i].day;
      if (!d) continue;
      const n = dayNum(d);
      if (n < min) min = n;
      if (n > max) max = n;
    }
    if (!Number.isFinite(min)) return null;
    const weekly = max - min > 400;
    const startDay = weekly ? weekOf(numDay(min)) : numDay(min);
    const step = weekly ? 7 : 1;
    const bins = Math.floor((max - dayNum(startDay)) / step) + 1;
    const binOf = (d: string) => Math.floor((dayNum(d) - dayNum(startDay)) / step);
    const allC = new Array<number>(bins).fill(0);
    for (const i of all) {
      const d = ix.items[i].day;
      if (d) allC[binOf(d)]++;
    }
    return { startDay, step, bins, binOf, allC, weekly };
  }, [ix, all]);

  const rowC = useMemo(() => {
    if (!model) return [];
    const c = new Array<number>(model.bins).fill(0);
    for (const i of rows) {
      const d = ix.items[i].day;
      if (d) c[model.binOf(d)]++;
    }
    return c;
  }, [ix, rows, model]);

  if (!model || model.bins < 2) return null;
  const { bins, allC, step, startDay } = model;
  const peak = Math.max(1, ...allC);
  const W = 1000;
  const bw = W / bins;
  const dayOfBin = (b: number) => addDays(startDay, b * step);
  const lastOfBin = (b: number) => addDays(startDay, b * step + step - 1);
  const binAt = (clientX: number) => {
    const r = svg.current!.getBoundingClientRect();
    return Math.max(0, Math.min(bins - 1, Math.floor(((clientX - r.left) / r.width) * bins)));
  };
  const sel = drag ? [Math.min(drag.a, drag.b), Math.max(drag.a, drag.b)] : from || to ? [from ? model.binOf(from) : 0, to ? model.binOf(to) : bins - 1] : null;
  const months: { x: number; label: string }[] = [];
  for (let b = 0; b < bins; b++) {
    const d = dayOfBin(b);
    const prev = b ? dayOfBin(b - 1) : "";
    if (!b || d.slice(0, 7) !== prev.slice(0, 7)) months.push({ x: b * bw, label: new Date(dayNum(d) * 86_400_000).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) + (d.slice(5, 7) === "01" || !b ? ` ${d.slice(0, 4)}` : "") });
  }
  const nowBin = nowDay ? model.binOf(nowDay) : -1;
  const tip = hover !== null ? `${model.weekly ? `Week of ${fmtShortDay(dayOfBin(hover))}` : fmtDay(dayOfBin(hover))}: ${rowC[hover] ?? 0} of ${allC[hover]}` : "";

  return (
    <div className="select-none">
      <div className="mb-1 flex h-4 items-center justify-between gap-3 text-[11.5px] text-ink-500">
        <span className="truncate">{tip || (sel ? `${fmtShortDay(dayOfBin(sel[0]))} to ${fmtShortDay(lastOfBin(sel[1]))}` : "Drag across the bars to pick dates")}</span>
        {(from || to) && (
          <button type="button" onClick={() => onRange(null, null)} className="shrink-0 font-semibold text-brand-600 hover:underline dark:text-brand-300">
            All dates
          </button>
        )}
      </div>
      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        className="block w-full cursor-crosshair touch-none"
        style={{ height }}
        role="img"
        aria-label="Records per day; drag to filter by date"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          const b = binAt(e.clientX);
          setDrag({ a: b, b });
        }}
        onPointerMove={(e) => {
          const b = binAt(e.clientX);
          setHover(b);
          if (drag) setDrag({ ...drag, b });
        }}
        onPointerLeave={() => setHover(null)}
        onPointerUp={() => {
          if (!drag) return;
          const a = Math.min(drag.a, drag.b);
          const b = Math.max(drag.a, drag.b);
          setDrag(null);
          onRange(dayOfBin(a), lastOfBin(b));
        }}
      >
        {sel && <rect x={sel[0] * bw} y={0} width={(sel[1] - sel[0] + 1) * bw} height={height} className="fill-brand-500/10" />}
        {allC.map((c, b) =>
          c ? <rect key={"a" + b} x={b * bw + bw * 0.12} width={Math.max(1, bw * 0.76)} y={height - (c / peak) * (height - 4)} height={(c / peak) * (height - 4)} className="fill-ink-200 dark:fill-ink-300/60" /> : null
        )}
        {rowC.map((c, b) =>
          c ? <rect key={"r" + b} x={b * bw + bw * 0.12} width={Math.max(1, bw * 0.76)} y={height - (c / peak) * (height - 4)} height={(c / peak) * (height - 4)} className="fill-[oklch(0.58_0.15_var(--h))] dark:fill-[oklch(0.72_0.13_var(--h))]" /> : null
        )}
        {nowBin >= 0 && nowBin < bins && <rect x={nowBin * bw + bw / 2 - 1} width={2} y={0} height={height} className="fill-rose-500/70" />}
        {hover !== null && <rect x={hover * bw} width={bw} y={0} height={height} className="fill-ink-900/5 dark:fill-white/5" />}
      </svg>
      <div className="relative mt-1 h-4 text-[11px] text-ink-400">
        {months.map((m) => (
          <span key={m.x} className="absolute top-0 whitespace-nowrap" style={{ left: `${(m.x / W) * 100}%` }}>
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
