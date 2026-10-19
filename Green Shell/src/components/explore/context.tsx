import { createContext, useContext } from "react";
import type { Clock } from "../../lib/explore/time";
import type { ExploreIndex } from "../../lib/explore/types";

/**
 * What every part of Explore reaches for: the index, the persona's clock,
 * and the moves between views. The view lives in the address
 * (`/universes/<slug>/explore?...`), so every state can be linked to and the
 * browser's back button walks back through it.
 */

export interface ExploreApi {
  ix: ExploreIndex;
  clock: Clock;
  slug: string;
  sp: URLSearchParams;
  /** Change the address: `fresh` starts from an empty query, `push` adds a history entry. */
  go(mut: (p: URLSearchParams) => void, opts?: { push?: boolean; fresh?: boolean }): void;
  openItem(i: number): void;
  openEntity(e: number): void;
  openDay(day: string): void;
  openIdent(d: number): void;
  openServer(server: string, ds?: string, filters?: Record<string, string[]>): void;
  /** The same pane in the persona's own viewer. */
  viewerHref(server: string): string;
  label(server: string): string;
  /** Records set aside while building a task, by item key, on this device. */
  pins: string[];
  togglePin(key: string): void;
  clearPins(): void;
}

export const ExploreContext = createContext<ExploreApi | null>(null);

export function useExplore(): ExploreApi {
  const v = useContext(ExploreContext);
  if (!v) throw new Error("useExplore outside Explore");
  return v;
}
