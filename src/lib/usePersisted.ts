import { useCallback, useEffect, useState } from "react";

/**
 * A per-device convenience only. Checklist ticks live here so a page reload
 * does not lose them. It is never a record of anything, and it is wrapped in
 * try/catch because private windows throw on access.
 */
export function usePersisted<T>(key: string, initial: T): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private window */
    }
  }, [key, value]);

  const set = useCallback((next: T) => setValue(next), []);
  return [value, set];
}
