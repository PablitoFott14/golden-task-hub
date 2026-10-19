import { asset } from "./util";
import { attachDownloads, DOWNLOAD_CSS, type DownloadInfo } from "./universeDownloads";

/**
 * Runs a persona's own viewer program inside the hub.
 *
 * Each universe under `public/universes/<slug>/` is the original viewer page
 * taken apart by `scripts/universes.py`: its engine (the page's script, with
 * its data lines turned into reads of `__UV`), its stylesheet, its body markup,
 * its constants, its seed and its files. Nothing here reimplements the viewer.
 * This module puts the same program back together in the hub, in a shadow root
 * so neither stylesheet reaches the other, and gives it the environment it was
 * written for:
 *
 * - **`document`** is the shadow root. Lookups, `body` and `activeElement`
 *   resolve inside it; anything else is the real document.
 * - **Global functions.** The engine's top-level functions are globals in the
 *   original page, and its inline `onclick` handlers call them by name, so
 *   they go on `window` while the universe is mounted and come off after. The
 *   one inline handler that calls `document.getElementById` is covered by a
 *   fallback into the shadow root.
 * - **Keyboard.** Document level key listeners hear a key only when focus is
 *   in the universe or nowhere at all, which is what an iframe gave them, and
 *   see the real target rather than the shadow host.
 * - **The address bar.** The newer engine keeps `#pane=…` deep links in the
 *   hash. The hub's router owns the hash, so the engine reads and writes a pane
 *   string the page keeps in the route's query instead.
 * - **The viewport.** `vh` and `vw` become container units on the stage, and
 *   the stage contains fixed position overlays, so the viewer is laid out
 *   against the stage exactly as it was against its own window.
 *
 * The stored seed holds blobs as `{"_extracted_to": "files/..."}` refs, the
 * export ZIP's format. They are fetched and turned back into the base64 or text
 * the engine expects, by the same rule the sync script verified against the
 * original page.
 *
 * Downloads get a layer of their own on top of the engine's markup, in
 * `universeDownloads.ts`.
 */

export interface UniversePage {
  format: number;
  slug: string;
  title: string;
  /** The original page up to its stylesheet: doctype, head, CSP, title. */
  pre: string;
  seed: string[];
  skin: string[];
  markdown: Record<string, string | null> | null;
  exports: string[];
  /** The Files previews stored, as `files/filesystem/<path>`. */
  externals: string[];
  renderedPrefix: string;
  pageSha256: string;
  loadBytes: number;
}

export interface LoadedUniverse {
  slug: string;
  page: UniversePage;
  engine: string;
  css: string;
  body: string;
  /** What the engine reads as `__UV`. */
  data: {
    seed: Record<string, unknown>;
    skin: Record<string, unknown>;
    c: Record<string, unknown>;
    markdown: Record<string, string>;
  };
  downloads: DownloadInfo;
}

export interface MountOptions {
  /** The pane string, `#pane=…`, or `""`. */
  getPane: () => string;
  /** The engine moved to another pane. */
  setPane: (hash: string) => void;
}

export interface MountedUniverse {
  /** Keyboard and globals on or off, for a universe kept loaded but hidden. */
  setActive(active: boolean): void;
  /** The route's pane string changed under the engine. */
  paneChanged(): void;
  destroy(): void;
}

type Ref = { _extracted_to: string };
const isRef = (v: unknown): v is Ref =>
  !!v &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.keys(v as object).length === 1 &&
  typeof (v as Ref)._extracted_to === "string";

/** A ref under `content` of a record that is not base64 encoded holds text. */
function refIsText(parent: unknown, key: string | number): boolean {
  if (key !== "content" || !parent || typeof parent !== "object" || Array.isArray(parent)) return false;
  const enc = String((parent as Record<string, unknown>).encoding ?? "").toLowerCase();
  return enc !== "base64";
}

/** Every ref, and whether any place it is used reads it as text. */
function collectRefs(v: unknown, out: Map<string, boolean>, parent: unknown = null, key: string | number = "") {
  if (isRef(v)) out.set(v._extracted_to, (out.get(v._extracted_to) ?? false) || refIsText(parent, key));
  else if (Array.isArray(v)) v.forEach((x, i) => collectRefs(x, out, v, i));
  else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => collectRefs(x, out, v, k));
}

function rehydrate(
  v: unknown,
  blobs: Map<string, { b64: string; text: string | null }>,
  parent: unknown = null,
  key: string | number = ""
): unknown {
  if (isRef(v)) {
    const got = blobs.get(v._extracted_to);
    if (!got) throw new Error(`missing file ${v._extracted_to}`);
    if (refIsText(parent, key)) {
      if (got.text === null) throw new Error(`${v._extracted_to} is not text`);
      return got.text;
    }
    return got.b64;
  }
  if (Array.isArray(v)) return v.map((x, i) => rehydrate(x, blobs, v, i));
  if (v && typeof v === "object") {
    const o: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) o[k] = rehydrate(x, blobs, v, k);
    return o;
  }
  return v;
}

function blobToBase64(b: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const s = String(r.result);
      resolve(s.slice(s.indexOf(",") + 1));
    };
    r.onerror = () => reject(r.error);
    r.readAsDataURL(b);
  });
}

/** Run `jobs` with at most `limit` in flight. */
async function pool<T>(items: T[], limit: number, job: (t: T) => Promise<void>) {
  let next = 0;
  const run = async () => {
    while (next < items.length) {
      const i = next++;
      await job(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
}

export function universeBase(slug: string): string {
  return asset(`universes/${slug}`) + "/";
}

/** A stored path as a URL path any static server maps back to the file.
 *  `encodeURIComponent` turns a comma into %2C, which a server decoding with
 *  `decodeURI` (Vite's does) leaves encoded and then misses, so the separators
 *  that are legal in a path stay literal and only the rest is escaped. */
const urlPath = (p: string) =>
  p
    .split("/")
    .map((s) => encodeURIComponent(s).replace(/%(2C|26|2B|3D|40|24|3B|3A)/gi, (m) => decodeURIComponent(m)))
    .join("/");

export async function loadUniverse(
  slug: string,
  onProgress?: (done: number, total: number) => void,
  signal?: AbortSignal
): Promise<LoadedUniverse> {
  const base = universeBase(slug);
  const url = (p: string) => base + urlPath(p);
  const get = async (p: string) => {
    const r = await fetch(url(p), { signal });
    if (!r.ok) throw new Error(`${p}: ${r.status}`);
    // A server with an SPA fallback answers a missing file with the app's own
    // page and a 200. Read as a blob that would be silently wrong data.
    if (!/\.html?$/i.test(p) && (r.headers.get("content-type") ?? "").includes("text/html")) {
      throw new Error(`${p}: not found (the server sent a page instead)`);
    }
    return r;
  };
  const page = (await (await get("viewer/page.json")).json()) as UniversePage;
  const docs = Object.entries(page.markdown ?? {}).filter((e): e is [string, string] => !!e[1]);
  const fixed = 5 + page.seed.length + docs.length;
  let done = 0;
  let total = fixed;
  const tick = () => onProgress?.(++done, total);
  tick();

  const [data, engine, css, body, seeds, mdTexts] = await Promise.all([
    get("viewer/data.json").then((r) => r.json()).finally(tick) as Promise<{ c: Record<string, unknown>; skin: Record<string, unknown> }>,
    get("viewer/engine.js").then((r) => r.text()).finally(tick),
    get("viewer/style.css").then((r) => r.text()).finally(tick),
    get("viewer/body.html").then((r) => r.text()).finally(tick),
    Promise.all(page.seed.map((s) => get(`seed/${s}.json`).then((r) => r.json()).finally(tick))),
    Promise.all(docs.map(([, p]) => get(p).then((r) => r.text()).finally(tick))),
  ]);

  // Files records whose preview is not stored: the original site never served
  // them either. One may still have its bytes elsewhere in the universe (the
  // same file attached to an email), and when the SHA-256 the record states
  // matches, its Download saves that copy. See universeDownloads.ts.
  const previews = Array.isArray(page.externals) ? new Set(page.externals) : null;
  const fsStored = seeds[page.seed.indexOf("filesystem")] as { files?: Record<string, unknown>[] } | undefined;
  const absent = new Map<string, { sha: string; size: number }>();
  for (const f of previews ? (fsStored?.files ?? []) : []) {
    const p = typeof f?.path === "string" ? f.path.replace(/^\/+/, "") : "";
    const u = f?.viewer_uri;
    if (f?.viewer_external && typeof u === "string" && u.startsWith(page.renderedPrefix) && p && !previews?.has("files/filesystem/" + p)) {
      absent.set(p, { sha: String(f.sha256 ?? "").toLowerCase(), size: Number(f.size_bytes ?? f.size ?? -1) });
    }
  }
  const leaf = (p: string) => p.slice(p.lastIndexOf("/") + 1);
  const absentNames = new Set([...absent.keys()].map(leaf));
  const candidates = new Map<string, Blob>();

  const refs = new Map<string, boolean>();
  seeds.forEach((s) => collectRefs(s, refs));
  total += refs.size;
  const blobs = new Map<string, { b64: string; text: string | null }>();
  await pool([...refs], 12, async ([p, wantText]) => {
    const blob = await (await get(p)).blob();
    const [b64, text] = await Promise.all([blobToBase64(blob), wantText ? blob.text() : Promise.resolve(null)]);
    blobs.set(p, { b64, text });
    if (absentNames.has(leaf(p))) candidates.set(p, blob);
    tick();
  });

  const copies = new Map<string, string>();
  for (const [p, want] of absent) {
    if (!want.sha || !globalThis.crypto?.subtle) continue;
    for (const [q, blob] of candidates) {
      if (leaf(q) !== leaf(p) || (want.size >= 0 && blob.size !== want.size)) continue;
      if ((await sha256Hex(blob)) === want.sha) {
        copies.set(p, q);
        break;
      }
    }
  }
  const downloads: DownloadInfo = { aliases: new Map(), unavailable: new Set() };

  const seed: Record<string, unknown> = {};
  page.seed.forEach((name, i) => (seed[name] = rehydrate(seeds[i], blobs)));

  // A Files preview sits beside the original page under `renderedPrefix`, at
  // the record's own path, written encoded by one generator and raw by
  // another. Here it sits in this universe's files/, so it is rebased there.
  const fs = seed.filesystem as { files?: Record<string, unknown>[] } | undefined;
  for (const f of fs?.files ?? []) {
    const u = f.viewer_uri;
    if (typeof u !== "string" || !u.startsWith(page.renderedPrefix)) continue;
    const rest = u.slice(page.renderedPrefix.length);
    const path = typeof f.path === "string" ? f.path.replace(/^\/+/, "") : "";
    let decoded = rest;
    try {
      decoded = decodeURIComponent(rest);
    } catch {
      /* raw already */
    }
    const rebased = base + "files/filesystem/" + (path && (rest === path || decoded === path) ? urlPath(path) : rest);
    f.viewer_uri = rebased;
    if (absent.has(path)) {
      const copy = copies.get(path);
      if (copy) downloads.aliases.set(rebased, url(copy));
      else downloads.unavailable.add(rebased);
    }
  }

  const markdown: Record<string, string> = {};
  let di = 0;
  for (const [k, p] of Object.entries(page.markdown ?? {})) markdown[k] = p ? mdTexts[di++] : "";

  return { slug, page, engine, css, body, data: { seed, skin: data.skin, c: data.c, markdown }, downloads };
}

async function sha256Hex(b: Blob): Promise<string> {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", await b.arrayBuffer()));
  return Array.from(d, (x) => x.toString(16).padStart(2, "0")).join("");
}

/* ------------------------------------------------------------ the stylesheet */

/** The webfonts the hub itself loads. A viewer naming one would pick up the
 *  hub's copy, which its own page never had (its CSP blocks every webfont), so
 *  the name is mapped to a face that only ever resolves to an installed font. */
const HUB_FONTS = ["JetBrains Mono", "Inter", "Space Grotesk"];
const fontAlias = (f: string) => `UV ${f}`;

let fontFacesAdded = false;
function addLocalFontFaces() {
  if (fontFacesAdded || typeof document === "undefined") return;
  fontFacesAdded = true;
  const css = HUB_FONTS.flatMap((f) =>
    ["400", "700"].map(
      (w) =>
        `@font-face{font-family:"${fontAlias(f)}";font-weight:${w};src:local("${f}"),local("${f} ${w === "700" ? "Bold" : "Regular"}"),local("${f.replace(/ /g, "")}-${w === "700" ? "Bold" : "Regular"}");}`
    )
  ).join("\n");
  const el = document.createElement("style");
  el.dataset.universeFonts = "";
  el.textContent = css;
  document.head.appendChild(el);
}

/** A number with a viewport unit, never the tail of an identifier. */
const UNITS = /(?<![\w$.])(\d+(?:\.\d+)?|\.\d+)(vh|vw|vmin|vmax)\b/g;
const CQ: Record<string, string> = { vh: "cqh", vw: "cqw", vmin: "cqmin", vmax: "cqmax" };
const unitsToContainer = (s: string) => s.replace(UNITS, (_m, n: string, u: string) => n + CQ[u]);
const aliasFonts = (s: string) =>
  HUB_FONTS.reduce((t, f) => t.replace(new RegExp(`(['"])${f}\\1`, "g"), `$1${fontAlias(f)}$1`), s);

/** Markup the engine writes at run time carries the same CSS the stylesheet
 *  does: inline `calc(100vh - 90px)` styles, and the app skins' own style
 *  blocks. It gets the same two rewrites. */
const adaptMarkup = (s: string) => aliasFonts(unitsToContainer(s));

/** The page's selectors for its own root, rewritten for a shadow root:
 *  `:root` is the host, and `html` and `body` are the one wrapper that stands
 *  in for both. */
function rewriteSelector(sel: string): string {
  return sel
    .split(",")
    .map((part) => {
      let s = part.replace(/:root\b/g, ":host");
      s = s.replace(/(^|[\s>+~(])(html|body)(?![\w-])/g, "$1.uv-root");
      s = s.replace(/\.uv-root(\s*>?\s*\.uv-root)+/g, ".uv-root");
      return s;
    })
    .join(",");
}

/** A small CSS walk: selectors are rewritten, declarations get container
 *  units and the font aliases, comments and strings pass through untouched. */
export function adaptCss(css: string): string {
  let out = "";
  let buf = "";
  const stack: ("rules" | "decls")[] = ["rules"];
  let i = 0;
  const flushDecls = adaptMarkup;
  while (i < css.length) {
    const ch = css[i];
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      const stop = end < 0 ? css.length : end + 2;
      buf += css.slice(i, stop);
      i = stop;
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== ch) j += css[j] === "\\" ? 2 : 1;
      buf += css.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    const ctx = stack[stack.length - 1];
    if (ch === "{") {
      if (ctx === "rules") {
        const prelude = buf.trim();
        if (prelude.startsWith("@")) {
          out += buf + "{";
          stack.push(/^@(media|supports|container|layer|document)\b/.test(prelude) ? "rules" : /^@(-\w+-)?keyframes\b/.test(prelude) ? "rules" : "decls");
        } else {
          // Keep the comment and whitespace before the selector as it was.
          const lead = buf.slice(0, buf.length - buf.trimStart().length);
          out += lead + rewriteSelector(buf.trimStart()) + "{";
          stack.push("decls");
        }
      } else {
        out += flushDecls(buf) + "{";
        stack.push("decls");
      }
      buf = "";
      i++;
      continue;
    }
    if (ch === "}") {
      out += (ctx === "decls" ? flushDecls(buf) : buf) + "}";
      buf = "";
      if (stack.length > 1) stack.pop();
      i++;
      continue;
    }
    buf += ch;
    i++;
  }
  return out + buf;
}

/** What the shadow root carries ahead of the viewer's own stylesheet. */
const HOST_CSS = `:host{all:initial;display:block;position:absolute;inset:0;}
.uv-root{position:absolute;inset:0;container-type:size;}
`;

/* ------------------------------------------------------------- the program */

type Listener = EventListenerOrEventListenerObject;
interface Tracked {
  target: EventTarget;
  type: string;
  original: Listener;
  wrapped: EventListener;
  options?: boolean | AddEventListenerOptions;
}

/** One universe at a time owns the globals and the lookup fallback. */
let owner: { root: ShadowRoot } | null = null;
let realGetById: ((id: string) => HTMLElement | null) | null = null;

function installLookupFallback(root: ShadowRoot) {
  owner = { root };
  if (realGetById) return;
  const orig = Document.prototype.getElementById;
  realGetById = (id: string) => orig.call(document, id);
  Object.defineProperty(document, "getElementById", {
    configurable: true,
    writable: true,
    value: (id: string) => orig.call(document, id) ?? owner?.root.getElementById(id) ?? null,
  });
}

function removeLookupFallback(root: ShadowRoot) {
  if (owner?.root !== root) return;
  owner = null;
  if (realGetById) {
    delete (document as unknown as Record<string, unknown>).getElementById;
    realGetById = null;
  }
}

export function mountUniverse(container: HTMLElement, u: LoadedUniverse, opts: MountOptions): MountedUniverse {
  addLocalFontFaces();
  const host = document.createElement("div");
  host.dataset.universe = u.slug;
  container.appendChild(host);
  const root = host.attachShadow({ mode: "open" });
  // `all: initial` on the host also drops the locale the page's own <html lang>
  // gave it, and the locale picks fallback glyphs, so the wrapper carries it.
  const lang = /<html[^>]*\blang="([^"]+)"/.exec(u.page.pre ?? "")?.[1] ?? "en";
  // The parity crawl sets this before the hub loads, to compare the engine
  // with its original page without the download layer on top.
  const plain = (window as { __uvPlain?: boolean }).__uvPlain === true;
  root.innerHTML = `<style>${HOST_CSS}${adaptCss(u.css)}${plain ? "" : DOWNLOAD_CSS}</style><div class="uv-root" lang="${lang.replace(/[^\w-]/g, "")}">${u.body}</div>`;
  const uvRoot = root.querySelector(".uv-root") as HTMLElement;
  const detachDownloads = plain ? () => {} : attachDownloads(root, uvRoot, u.downloads);

  let active = true;
  let alive = true;
  const tracked: Tracked[] = [];
  const hashListeners: Listener[] = [];
  const objectUrls: string[] = [];
  const exportsMap = new Map<string, unknown>();
  const saved = new Map<string, PropertyDescriptor | undefined>();

  /** Would an iframe holding this universe have received this event? */
  const reaches = (e: Event): EventTarget | null => {
    const path = e.composedPath();
    const t = path[0] ?? e.target;
    if (path.includes(root)) return t;
    if (t === document || t === document.body || t === document.documentElement || t === window) return t;
    return null;
  };

  const retarget = (e: Event, target: EventTarget): Event =>
    target === e.target
      ? e
      : new Proxy(e, {
          get(obj, prop) {
            if (prop === "target") return target;
            const v = Reflect.get(obj, prop, obj);
            return typeof v === "function" ? v.bind(obj) : v;
          },
        });

  const listen = (target: EventTarget, type: string, original: Listener, options?: boolean | AddEventListenerOptions) => {
    if (!original) return;
    const wrapped: EventListener = (e) => {
      if (!alive || !active) return;
      const t = reaches(e);
      if (t === null) return;
      const ev = retarget(e, t);
      if (typeof original === "function") original.call(target, ev);
      else original.handleEvent(ev);
    };
    tracked.push({ target, type, original, wrapped, options });
    target.addEventListener(type, wrapped, options);
  };
  const unlisten = (target: EventTarget, type: string, original: Listener) => {
    const i = tracked.findIndex((t) => t.target === target && t.type === type && t.original === original);
    if (i < 0) return;
    target.removeEventListener(type, tracked[i].wrapped, tracked[i].options);
    tracked.splice(i, 1);
  };

  const doc = new Proxy(document, {
    get(target, prop) {
      switch (prop) {
        case "getElementById":
          return (id: string) => root.getElementById(id);
        case "querySelector":
          return (s: string) => root.querySelector(s);
        case "querySelectorAll":
          return (s: string) => root.querySelectorAll(s);
        case "getElementsByClassName":
          return (s: string) => uvRoot.getElementsByClassName(s);
        case "getElementsByTagName":
          return (s: string) => uvRoot.getElementsByTagName(s);
        case "body":
        case "documentElement":
          return uvRoot;
        case "head":
          return root;
        case "activeElement":
          return root.activeElement ?? target.activeElement;
        case "addEventListener":
          return (type: string, l: Listener, o?: boolean | AddEventListenerOptions) => listen(document, type, l, o);
        case "removeEventListener":
          return (type: string, l: Listener) => unlisten(document, type, l);
      }
      const v = Reflect.get(target, prop, target);
      return typeof v === "function" ? v.bind(target) : v;
    },
    set(target, prop, value) {
      if (prop === "title") return true;
      return Reflect.set(target, prop, value, target);
    },
  });

  const loc = {
    get hash() {
      return opts.getPane();
    },
    set hash(v: string) {
      const h = String(v);
      opts.setPane(h.startsWith("#") || !h ? h : "#" + h);
      queueMicrotask(firePane);
    },
    get href() {
      return window.location.href;
    },
    get origin() {
      return window.location.origin;
    },
    get pathname() {
      return window.location.pathname;
    },
    get search() {
      return "";
    },
    toString() {
      return window.location.href;
    },
  };

  const hist = {
    replaceState(_s: unknown, _t: string, url?: string | URL | null) {
      if (typeof url === "string" && url.startsWith("#")) opts.setPane(url);
    },
    pushState(_s: unknown, _t: string, url?: string | URL | null) {
      if (typeof url === "string" && url.startsWith("#")) opts.setPane(url);
    },
    get state() {
      return window.history.state;
    },
    get length() {
      return window.history.length;
    },
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    go: (n?: number) => window.history.go(n),
  };

  const putGlobal = (name: string, value: unknown) => {
    exportsMap.set(name, value);
    if (!active) return;
    if (!saved.has(name)) saved.set(name, Object.getOwnPropertyDescriptor(window, name));
    try {
      Object.defineProperty(window, name, { configurable: true, writable: true, enumerable: true, value });
    } catch {
      /* a property the window will not give up, which the original page could not redefine either */
    }
  };

  const win = new Proxy(window, {
    get(target, prop) {
      if (prop === "document") return doc;
      if (prop === "location") return loc;
      if (prop === "history") return hist;
      if (prop === "addEventListener")
        return (type: string, l: Listener, o?: boolean | AddEventListenerOptions) =>
          type === "hashchange" ? hashListeners.push(l) : listen(window, type, l, o);
      if (prop === "removeEventListener")
        return (type: string, l: Listener) => {
          if (type === "hashchange") {
            const i = hashListeners.indexOf(l);
            if (i >= 0) hashListeners.splice(i, 1);
          } else unlisten(window, type, l);
        };
      if (typeof prop === "string" && exportsMap.has(prop)) return exportsMap.get(prop);
      const v = Reflect.get(target, prop);
      return typeof v === "function" && typeof prop === "string" && !/^[A-Z]/.test(prop) ? v.bind(target) : v;
    },
    set(_target, prop, value) {
      if (typeof prop === "string") putGlobal(prop, value);
      return true;
    },
  });

  const TrackedURL = function (this: unknown, ...a: ConstructorParameters<typeof URL>) {
    return new URL(...a);
  } as unknown as typeof URL;
  Object.assign(TrackedURL, {
    createObjectURL: (o: Blob | MediaSource) => {
      const s = URL.createObjectURL(o);
      objectUrls.push(s);
      return s;
    },
    revokeObjectURL: (s: string) => URL.revokeObjectURL(s),
    canParse: (URL as unknown as { canParse?: unknown }).canParse,
  });
  (TrackedURL as unknown as { prototype: URL }).prototype = URL.prototype;

  function firePane() {
    if (!alive) return;
    const ev = new HashChangeEvent("hashchange");
    for (const l of [...hashListeners]) {
      try {
        if (typeof l === "function") l.call(win, ev);
        else l.handleEvent(ev);
      } catch (e) {
        console.error(e);
      }
    }
  }

  // Hoisted function declarations are reachable from the first line, so they
  // are published before the rest of the program runs.
  const publish = `__UV.__publish({${u.page.exports
    .map((n) => `${JSON.stringify(n)}:typeof ${n}==="function"?${n}:undefined`)
    .join(",")}});\n`;
  const code = publish + adaptMarkup(u.engine) + `\n//# sourceURL=universes/${u.slug}/viewer/engine.js`;
  const skin: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(u.data.skin)) skin[k] = typeof v === "string" ? adaptMarkup(v) : v;
  const env = {
    ...u.data,
    skin,
    __publish(fns: Record<string, unknown>) {
      for (const [k, v] of Object.entries(fns)) if (v !== undefined) putGlobal(k, v);
    },
  };

  installLookupFallback(root);
  try {
    // The engine is a classic script written for the global scope; these five
    // names are the ones it reaches the outside world through.
    const run = new Function("__UV", "document", "window", "location", "history", "URL", code);
    run.call(win, env, doc, win, loc, hist, TrackedURL);
  } catch (e) {
    destroy();
    throw e;
  }

  function withdrawGlobals() {
    for (const [name, desc] of saved) {
      try {
        if (desc) Object.defineProperty(window, name, desc);
        else delete (window as unknown as Record<string, unknown>)[name];
      } catch {
        /* ignore */
      }
    }
    saved.clear();
  }

  function destroy() {
    if (!alive) return;
    alive = false;
    for (const t of tracked.splice(0)) t.target.removeEventListener(t.type, t.wrapped, t.options);
    hashListeners.length = 0;
    detachDownloads();
    withdrawGlobals();
    removeLookupFallback(root);
    objectUrls.splice(0).forEach((s) => URL.revokeObjectURL(s));
    host.remove();
  }

  return {
    setActive(next: boolean) {
      if (next === active || !alive) return;
      active = next;
      if (next) {
        for (const [k, v] of exportsMap) putGlobal(k, v);
        installLookupFallback(root);
      } else {
        withdrawGlobals();
        removeLookupFallback(root);
      }
    },
    paneChanged: firePane,
    destroy,
  };
}
