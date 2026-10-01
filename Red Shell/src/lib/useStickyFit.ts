import { useEffect, useRef, useState } from "react";

/**
 * Caps a sticky rail to the space actually left below it, and lets it scroll
 * inside itself when it does not fit.
 *
 * A sticky element only reaches its `top` offset once the page has scrolled far
 * enough to push it there. Until then it sits wherever the flow put it, which on
 * a page with a tall hero is several hundred pixels down. A rail with a dozen
 * items then runs off the bottom of the window, and its lower items cannot be
 * clicked at all because they are not on screen. CSS cannot express "whichever
 * of the two positions applies right now", so the top is measured instead.
 *
 * `gap` is the breathing room left under the rail. `minWidth` is the breakpoint
 * the rail actually becomes sticky at: below it the rail sits in the flow above
 * the content, where capping its height would crop it instead of saving it, so
 * no cap is returned.
 */
export function useStickyFit<T extends HTMLElement>(gap = 24, minWidth = 1024) {
  const ref = useRef<T>(null);
  const [maxHeight, setMaxHeight] = useState<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      if (window.innerWidth < minWidth) {
        setMaxHeight(undefined);
        return;
      }
      const top = el.getBoundingClientRect().top;
      // No floor. A rail allowed to exceed the room it has is the bug itself:
      // whatever hangs below the fold cannot be clicked. Short is fine, it
      // scrolls, and it grows back as soon as the rail sticks.
      setMaxHeight(Math.max(0, Math.round(window.innerHeight - top - gap)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [gap, minWidth]);

  return { ref, maxHeight };
}

/**
 * Keeps the active row visible inside a rail that is scrolling internally.
 * Moves the rail's own `scrollTop` only, never the window, so following the
 * page never yanks the reader somewhere they did not ask to go.
 */
export function useRailFollow(container: React.RefObject<HTMLElement>, active: string) {
  useEffect(() => {
    const nav = container.current;
    if (!nav || nav.scrollHeight <= nav.clientHeight) return;

    const row = nav.querySelector<HTMLElement>(`[data-rail="${CSS.escape(active)}"]`);
    if (!row) return;

    const navBox = nav.getBoundingClientRect();
    const rowBox = row.getBoundingClientRect();
    if (rowBox.top < navBox.top) nav.scrollTop -= navBox.top - rowBox.top + 8;
    else if (rowBox.bottom > navBox.bottom) nav.scrollTop += rowBox.bottom - navBox.bottom + 8;
  }, [container, active]);
}
