import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { cx } from "../../lib/util";

/**
 * A list that draws only the rows in view, so six thousand accounts scroll as
 * smoothly as sixty. Rows have known heights; `focus` keeps a row in view
 * when the keyboard moves to it.
 */
export function VirtualList<T>({
  rows,
  height,
  render,
  focus,
  className,
  scrollRef,
  overscan = 8,
  resetKey,
  header,
  headerHeight = 0,
  minWidth,
}: {
  rows: T[];
  height: (row: T) => number;
  render: (row: T, index: number) => ReactNode;
  focus?: number;
  className?: string;
  scrollRef?: RefObject<HTMLDivElement>;
  overscan?: number;
  /** Scroll back to the top when this changes: a new filter, a new sort. */
  resetKey?: string;
  /** A row that stays at the top, a table's column heads. */
  header?: ReactNode;
  headerHeight?: number;
  /** Wider than the pane: the list scrolls sideways, header and all. */
  minWidth?: number;
}) {
  const own = useRef<HTMLDivElement>(null);
  const ref = scrollRef ?? own;
  const [top, setTop] = useState(0);
  const [view, setView] = useState(800);
  const offsets = useMemo(() => {
    const o = new Array<number>(rows.length + 1);
    o[0] = 0;
    for (let i = 0; i < rows.length; i++) o[i + 1] = o[i] + height(rows[i]);
    return o;
  }, [rows, height]);
  const total = offsets[rows.length];

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setView(el.clientHeight || 800);
    const ro = new ResizeObserver(() => setView(el.clientHeight || 800));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  useEffect(() => {
    if (resetKey === undefined || !ref.current) return;
    ref.current.scrollTop = 0;
    setTop(0);
  }, [resetKey, ref]);

  useEffect(() => {
    const el = ref.current;
    if (focus === undefined || focus < 0 || focus >= rows.length || !el) return;
    const a = offsets[focus] + headerHeight;
    const b = offsets[focus + 1] + headerHeight;
    if (a - headerHeight < el.scrollTop) el.scrollTop = a - headerHeight - 8;
    else if (b > el.scrollTop + el.clientHeight) el.scrollTop = b - el.clientHeight + 8;
  }, [focus, offsets, rows.length, ref, headerHeight]);

  // The first row in view, by binary search over the offsets.
  let lo = 0;
  let hi = rows.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (offsets[mid + 1] <= top) lo = mid + 1;
    else hi = mid;
  }
  const start = Math.max(0, lo - overscan);
  let end = lo;
  while (end < rows.length && offsets[end] < top + view) end++;
  end = Math.min(rows.length, end + overscan);

  const out: ReactNode[] = [];
  for (let i = start; i < end; i++) {
    out.push(
      <div key={i} style={{ position: "absolute", top: offsets[i], left: 0, right: 0, height: offsets[i + 1] - offsets[i] }}>
        {render(rows[i], i)}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      tabIndex={0}
      className={cx("relative min-h-0 overscroll-contain", minWidth ? "overflow-auto" : "overflow-y-auto overflow-x-hidden", className)}
      onScroll={(e) => setTop(Math.max(0, (e.target as HTMLDivElement).scrollTop - headerHeight))}
    >
      <div style={minWidth ? { minWidth } : undefined}>
        {header && (
          <div className="sticky top-0 z-[2]" style={{ height: headerHeight }}>
            {header}
          </div>
        )}
        <div style={{ height: total, position: "relative" }}>{out}</div>
      </div>
    </div>
  );
}
