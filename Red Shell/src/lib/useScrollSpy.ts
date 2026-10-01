import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently nearest the top of the viewport.
 * Re-queries on every scroll frame, so it survives sections that mount late.
 * `offset` is the spy line, set below the sticky header so a section that has
 * just been scrolled to by a deep link reads as the active one.
 */
export function useScrollSpy(ids: string[], offset = 170): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
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
  }, [ids, offset]);

  return active;
}
