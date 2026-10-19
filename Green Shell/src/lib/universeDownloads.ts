/**
 * Downloads inside a mounted universe: easy to find, and dependable.
 *
 * A viewer offers a file in two places, and the engine draws neither well. In
 * the Files app every file ends its header row with a bare "Download" link,
 * which the viewer's dark theme leaves as dark blue text at the far edge of the
 * row. An attachment card carries a Download button only when the file cannot
 * be previewed, so a PDF offers Preview and Open but no download, and the image
 * viewer offers only "Open original". This layer works on the engine's markup
 * from outside, so the stored engines stay byte for byte what they were:
 *
 * - **One button for every download**: the download glyph, the label and the
 *   viewer's own accent, with the file's name in its tooltip.
 * - **A Download beside every Open**: a PDF attachment and an attachment in the
 *   image viewer get one, wired to the engine's own `vaAttHref`, so it saves the
 *   same bytes Open shows, under the attachment's own name.
 * - **No broken saves.** A Files record whose preview the universe does not
 *   carry saves its byte-identical copy from elsewhere in the universe when
 *   there is one (`aliases`, matched by SHA-256 at load), and otherwise says
 *   the file is not included rather than saving an error page. A file the
 *   engine holds inline, as a `data:` URL, is saved through a Blob URL, which
 *   has none of the length limits browsers put on a `data:` download.
 *
 * The parity crawl compares the engine with its original page, so it runs the
 * hub with this layer off (`window.__uvPlain`, see `universeHost.ts`).
 */

export interface DownloadInfo {
  /** A Files preview URL the universe has no bytes at, and the URL of a
   *  byte-identical copy that it does have. */
  aliases: Map<string, string>;
  /** Files preview URLs with no bytes anywhere in the universe. */
  unavailable: Set<string>;
}

/** Lucide's download glyph, drawn as a mask so it takes the button's colour. */
const GLYPH =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3v12'/%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3Cpath d='M5 21h14'/%3E%3C/svg%3E\")";

/** Appended after the viewer's own stylesheet. `!important` is there to beat
 *  the inline style the Files app writes on its link. Colours are the viewer's
 *  own variables, so a button reads as part of the viewer it sits in. */
export const DOWNLOAD_CSS = `
.uv-root{--uv-dl-glyph:${GLYPH};}
.uv-root a[download]{display:inline-flex !important;align-items:center;gap:5px;cursor:pointer;white-space:nowrap;text-decoration:none !important;color:var(--accent) !important;border:1px solid color-mix(in srgb,var(--accent) 55%,transparent) !important;background:color-mix(in srgb,var(--accent) 12%,transparent) !important;}
.uv-root a[download]:hover{background:color-mix(in srgb,var(--accent) 22%,transparent) !important;border-color:var(--accent) !important;}
.uv-root a[download]:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
.uv-root a[download]::before{content:"";flex:none;width:1.15em;height:1.15em;background:currentColor;-webkit-mask:var(--uv-dl-glyph) center/contain no-repeat;mask:var(--uv-dl-glyph) center/contain no-repeat;}
.uv-root a[download]:not(.va-att-btn){padding:5px 11px 5px 9px !important;border-radius:6px;font-size:12px !important;font-weight:600;line-height:1.25;}
.uv-root a[download].uv-dl-off{cursor:not-allowed;color:var(--muted) !important;border-color:var(--border-strong) !important;background:transparent !important;}
.uv-root a[download].uv-dl-off::before{opacity:.55;}
`;

const DONE = "data-uv-dl";

const baseName = (s: string) => s.split(/[\\/]/).pop() || s;

/** The name a link saves under: its `download` value, else its path's last part. */
function fileName(a: HTMLAnchorElement, href: string): string {
  const own = a.getAttribute("download");
  if (own) return own;
  try {
    return baseName(decodeURI(href.split(/[?#]/)[0])) || "file";
  } catch {
    return "file";
  }
}

/** The bytes of a `data:` URL, or null if it is not one this can read. */
function dataUrlBlob(href: string): Blob | null {
  const comma = href.indexOf(",");
  if (!href.startsWith("data:") || comma < 0) return null;
  const meta = href.slice(5, comma).split(";");
  const body = href.slice(comma + 1);
  const mime = meta[0] || "application/octet-stream";
  try {
    if (meta.includes("base64")) {
      const bin = atob(body);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new Blob([bytes], { type: mime });
    }
    // Text the engine percent-encoded; a Blob of the string is its UTF-8 bytes.
    return new Blob([decodeURIComponent(body)], { type: mime });
  } catch {
    return null;
  }
}

/**
 * Put the layer on a mounted universe. Returns the function that takes it off.
 * Start it before the engine runs, so the first pane is covered too.
 */
export function attachDownloads(root: ShadowRoot, uvRoot: HTMLElement, info: DownloadInfo): () => void {
  const objectUrls: string[] = [];

  /** Any download link, the engine's or this layer's. */
  const decorateLink = (a: HTMLAnchorElement) => {
    a.setAttribute(DONE, "");
    const href = a.getAttribute("href") ?? "";
    const name = fileName(a, href);
    const alias = info.aliases.get(href);
    if (alias) a.setAttribute("href", alias);
    if (info.unavailable.has(href)) {
      a.removeAttribute("href");
      a.classList.add("uv-dl-off");
      a.setAttribute("aria-disabled", "true");
      a.textContent = "Not included";
      a.title = `${name} is listed in this universe, but the file itself is not part of it`;
      return;
    }
    if (!a.title) a.title = `Download ${name}`;
    if (!a.hasAttribute("aria-label") && a.textContent?.trim() === "Download") a.setAttribute("aria-label", `Download ${name}`);
  };

  /** The same button the engine draws for a file it cannot preview. */
  const engineButton = (attId: string, name: string) => {
    const a = document.createElement("a");
    a.className = "va-att-btn";
    a.setAttribute("href", "#");
    a.setAttribute("download", name);
    a.setAttribute("data-va-att", attId);
    a.setAttribute("data-uv-added", "");
    a.setAttribute("onclick", "return vaAttHref(this,1)");
    a.textContent = "Download";
    return a;
  };

  /** An attachment card offering Preview or Open but no Download. */
  const completeCard = (acts: Element) => {
    acts.setAttribute(DONE, "");
    if (acts.querySelector("a[download]")) return;
    const id = acts.querySelector("[data-va-att]")?.getAttribute("data-va-att");
    if (!id) return;
    const name = acts.closest(".va-att-doc")?.querySelector(".va-att-name")?.textContent?.trim() || "attachment";
    acts.appendChild(engineButton(id, name));
  };

  /** The image viewer, opened on an attachment ("Open original" is there). */
  const completeLightbox = (bar: Element) => {
    bar.setAttribute(DONE, "");
    const open = bar.querySelector("a[data-va-att]");
    const id = open?.getAttribute("data-va-att");
    if (!open || !id || bar.querySelector("a[download]")) return;
    // The caption is "name · size"; vaAttHref names the saved file itself.
    const name = (bar.querySelector("span")?.textContent ?? "").split(" · ")[0].trim() || "image";
    open.after(engineButton(id, name));
  };

  const scan = (el: Element) => {
    const each = <T extends Element>(sel: string, fn: (x: T) => void) => {
      if (el.matches(sel)) fn(el as T);
      el.querySelectorAll<T>(sel).forEach(fn);
    };
    each(`.va-att-acts:not([${DONE}])`, completeCard);
    each(`.va-lb-bar:not([${DONE}])`, completeLightbox);
    each<HTMLAnchorElement>(`a[download]:not([${DONE}])`, decorateLink);
  };

  const observer = new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach((n) => n.nodeType === Node.ELEMENT_NODE && scan(n as Element));
  });
  observer.observe(uvRoot, { childList: true, subtree: true });
  // The engine appends its image viewer to `document.body`, which is uvRoot.
  scan(uvRoot);

  // Bubbling, so the engine's own onclick has filled the href (or cancelled).
  const onClick = (e: Event) => {
    if (e.defaultPrevented) return;
    const a = (e.target as Element | null)?.closest?.("a[download]");
    const href = a?.getAttribute("href") ?? "";
    if (!a || !href.startsWith("data:")) return;
    const blob = dataUrlBlob(href);
    if (!blob) return;
    e.preventDefault();
    const url = URL.createObjectURL(blob);
    objectUrls.push(url);
    const tmp = document.createElement("a");
    tmp.setAttribute(DONE, "");
    tmp.href = url;
    tmp.download = a.getAttribute("download") || "file";
    tmp.style.display = "none";
    uvRoot.appendChild(tmp);
    tmp.click();
    tmp.remove();
    // Long enough for the save to start; the rest go when the universe does.
    window.setTimeout(() => {
      const i = objectUrls.indexOf(url);
      if (i >= 0) objectUrls.splice(i, 1);
      URL.revokeObjectURL(url);
    }, 60_000);
  };
  root.addEventListener("click", onClick);

  return () => {
    observer.disconnect();
    root.removeEventListener("click", onClick);
    objectUrls.splice(0).forEach((u) => URL.revokeObjectURL(u));
  };
}
