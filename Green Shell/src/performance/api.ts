import type { Bundle } from "./card/types";

/**
 * The My Performance tab's one call: a contributor's own card, from Green Shell Insights' /api/card. That
 * endpoint answers a CB ID only with the personal key from that contributor's own link, an HMAC of the ID
 * on the server, so a key opens one card and typing someone else's ID gets the same refusal as an ID that
 * does not exist. This site is static and its repo is public, so nothing here holds a card, a list of
 * contributors or a secret: the card arrives after the check, for that one contributor, and is kept in
 * this tab's memory only. VITE_CARDS_API points a local preview at another host.
 */
const API = ((import.meta.env.VITE_CARDS_API as string | undefined) || "https://green-shell-insights.vercel.app").replace(/\/$/, "");

export const CB_ID = /^[0-9a-f]{24}$/;
/** The personal key a link carries (`?k=`): 22 characters of base64url. */
export const KEY = /^[A-Za-z0-9_-]{22}$/;

export type CardFailure = "not-found" | "bad-key" | "inactive" | "rate" | "unavailable" | "network";
export type CardResult = { ok: true; bundle: Bundle } | { ok: false; reason: CardFailure };

export async function loadCard(id: string, key: string): Promise<CardResult> {
  try {
    const r = await fetch(`${API}/api/card`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, key }),
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });
    if (r.ok) {
      const bundle = (await r.json()) as Bundle;
      return bundle?.cbId === id ? { ok: true, bundle } : { ok: false, reason: "network" };
    }
    if (r.status === 403) {
      const body = (await r.json().catch(() => ({}))) as { error?: string };
      return { ok: false, reason: body.error === "inactive" ? "inactive" : "bad-key" };
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
 * The key and the CB ID are held for this tab only (sessionStorage): a reload keeps the card open, and
 * closing the tab forgets both. Nothing about the contributor is stored on the device beyond that.
 */
const SESSION = "gsh.performance.v1";

export function recall(): { key: string | null; id: string | null } {
  try {
    const v = JSON.parse(sessionStorage.getItem(SESSION) ?? "{}") as { key?: unknown; id?: unknown };
    return {
      key: typeof v.key === "string" && KEY.test(v.key) ? v.key : null,
      id: typeof v.id === "string" && CB_ID.test(v.id) ? v.id : null,
    };
  } catch {
    return { key: null, id: null };
  }
}

export function remember(v: { key: string | null; id: string | null }) {
  try {
    if (v.key || v.id) sessionStorage.setItem(SESSION, JSON.stringify(v));
    else sessionStorage.removeItem(SESSION);
  } catch {
    /* a private window: the card still opens, it just does not survive a reload */
  }
}
