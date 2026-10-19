import { universeBase, urlPath } from "../universeHost";

/**
 * What Explore reads of a stored universe: the seed exactly as stored (blobs
 * stay `{"_extracted_to": ...}` refs, and become links rather than bytes), the
 * persona's docs, the viewer's nav labels and persona header, and the time
 * zone the engine formats its dates in. That is a few MB where opening the
 * viewer is 23 to 34, so Explore opens without the viewer's download.
 */

export interface NavEntry {
  id: string;
  label: string;
  emoji: string;
  count: number;
}

export interface ExploreSource {
  slug: string;
  base: string;
  tz: string;
  persona: { name: string; subtitle: string; now: string | null; range: [string, string] | null };
  nav: NavEntry[];
  /** The viewer's own emoji names, for Slack reactions. */
  emoji: Record<string, string>;
  seed: Record<string, unknown>;
  docs: Record<string, string>;
  /** Files previews the universe carries, as `files/filesystem/<path>`. */
  externals: Set<string>;
  renderedPrefix: string;
  /** A stored path as a URL. */
  url: (path: string) => string;
}

interface PageJson {
  seed: string[];
  markdown: Record<string, string | null> | null;
  externals?: string[];
  renderedPrefix?: string;
}

interface DataJson {
  c: {
    DATA_NAV?: NavEntry[];
    PERSONA?: { name?: string; subtitle?: string; now?: string; date_range?: [string, string] };
    VA_EMOJI?: { codes?: Record<string, string> };
  };
}

export async function loadExploreSource(
  slug: string,
  onProgress?: (done: number, total: number) => void,
  signal?: AbortSignal
): Promise<ExploreSource> {
  const base = universeBase(slug);
  const url = (p: string) => base + urlPath(p);
  const get = async (p: string) => {
    const r = await fetch(url(p), { signal });
    if (!r.ok) throw new Error(`${p}: ${r.status}`);
    if ((r.headers.get("content-type") ?? "").includes("text/html")) {
      throw new Error(`${p}: not found (the server sent a page instead)`);
    }
    return r;
  };
  const page = (await (await get("viewer/page.json")).json()) as PageJson;
  const docs = Object.entries(page.markdown ?? {}).filter((e): e is [string, string] => !!e[1]);
  const total = 3 + page.seed.length + docs.length;
  let done = 1;
  const tick = () => onProgress?.(++done, total);
  onProgress?.(done, total);

  const [data, engine, seeds, texts] = await Promise.all([
    get("viewer/data.json").then((r) => r.json()).finally(tick) as Promise<DataJson>,
    // Only for its TZ constant: the zone every date in the viewer is shown in.
    get("viewer/engine.js").then((r) => r.text()).finally(tick),
    Promise.all(page.seed.map((s) => get(`seed/${s}.json`).then((r) => r.json()).finally(tick))),
    Promise.all(docs.map(([, p]) => get(p).then((r) => r.text()).finally(tick))),
  ]);

  const seed: Record<string, unknown> = {};
  page.seed.forEach((s, i) => (seed[s] = seeds[i]));
  const docText: Record<string, string> = {};
  docs.forEach(([k], i) => (docText[k] = texts[i]));
  const p = data.c.PERSONA ?? {};
  const range = Array.isArray(p.date_range) && p.date_range.length === 2 ? ([String(p.date_range[0]), String(p.date_range[1])] as [string, string]) : null;

  return {
    slug,
    base,
    tz: /\bconst TZ\s*=\s*["']([^"']+)["']/.exec(engine)?.[1] ?? zoneFromSeed(seed) ?? "UTC",
    persona: {
      name: String(p.name ?? slug),
      subtitle: String(p.subtitle ?? ""),
      now: p.now ? String(p.now) : range ? range[1] : null,
      range,
    },
    nav: Array.isArray(data.c.DATA_NAV) ? data.c.DATA_NAV : [],
    emoji: data.c.VA_EMOJI?.codes ?? {},
    seed,
    docs: docText,
    externals: new Set(page.externals ?? []),
    renderedPrefix: page.renderedPrefix ?? "",
    url,
  };
}

/** An engine without a TZ constant: the zone a seed states for the persona. */
function zoneFromSeed(seed: Record<string, unknown>): string | null {
  const found = JSON.stringify(seed).match(/"(?:timezone|time_zone)"\s*:\s*"(?:\([^)]*\)\s*)?([A-Z][A-Za-z_]+\/[A-Za-z_]+)"/);
  return found?.[1] ?? null;
}
