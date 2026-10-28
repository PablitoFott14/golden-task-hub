import type { Bundle } from "./card/types";

/**
 * The My Performance tab's one call: a contributor's own card, from Green Shell Insights' /api/card. That
 * endpoint answers a CB ID on the active contributors list with that contributor's card, and anything
 * else with one and the same refusal. The CB ID alone opens it (personal links were dropped on 28 Oct
 * 2026). This site is static and its repo is public, so nothing here holds a card, a list of
 * contributors or a secret: the card arrives for one CB ID at a time and is kept in this tab's memory
 * only. VITE_CARDS_API points a local preview at another host.
 */
const API = ((import.meta.env.VITE_CARDS_API as string | undefined) || "https://green-shell-insights.vercel.app").replace(/\/$/, "");

export const CB_ID = /^[0-9a-f]{24}$/;

export type CardFailure = "not-found" | "rate" | "unavailable" | "network";
export type CardResult = { ok: true; bundle: Bundle } | { ok: false; reason: CardFailure };

export async function loadCard(id: string): Promise<CardResult> {
  try {
    const r = await fetch(`${API}/api/card`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });
    if (r.ok) {
      const bundle = (await r.json()) as Bundle;
      return bundle?.cbId === id ? { ok: true, bundle } : { ok: false, reason: "network" };
    }
    if (r.status === 404) return { ok: false, reason: "not-found" };
    if (r.status === 429) return { ok: false, reason: "rate" };
    if (r.status === 503) return { ok: false, reason: "unavailable" };
    return { ok: false, reason: "network" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

/**
 * The CB ID is held for this tab only (sessionStorage): a reload keeps the card open, and closing the tab
 * forgets it. Nothing about the contributor is stored on the device beyond that.
 */
const SESSION = "gsh.performance.v1";

export function recall(): string | null {
  try {
    const v = JSON.parse(sessionStorage.getItem(SESSION) ?? "{}") as { id?: unknown };
    return typeof v.id === "string" && CB_ID.test(v.id) ? v.id : null;
  } catch {
    return null;
  }
}

export function remember(id: string | null) {
  try {
    if (id) sessionStorage.setItem(SESSION, JSON.stringify({ id }));
    else sessionStorage.removeItem(SESSION);
  } catch {
    /* a private window: the card still opens, it just does not survive a reload */
  }
}
