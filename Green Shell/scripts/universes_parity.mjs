/**
 * Parity test for the Universes tab: the hub against the original viewer pages.
 *
 * Opens each persona twice, once as its original page (written by
 * `python scripts/universes.py emit-reference <dir>` and served from <dir>) and
 * once inside the hub, drives both through the same interactions, and compares
 * what each one shows after every step: the text of the main pane, every open
 * overlay, the active nav entry, and the box of every element in the active
 * panel. The original page runs in a window the size of the hub's stage, so
 * their viewport units agree.
 *
 * It runs from the build mirror, where playwright-core is installed:
 *
 *   python scripts/universes.py emit-reference C:/uvw/ref
 *   (cd C:/uvw/ref && python -m http.server 8765) &
 *   npx vite preview --port 4173 &
 *   node scripts/universes_parity.mjs --hub http://localhost:4173/ --ref http://localhost:8765/ [slug ...]
 *
 * Exit 0 when every state matches and the hub logged no error the original did
 * not, 1 otherwise. A mismatch prints the step, what differs, and both values.
 *
 * The hub runs with its download layer off (`window.__uvPlain`), so what is
 * compared is the engine alone. The layer changes on purpose how downloads
 * look and adds a Download where the original had none; universes_downloads.mjs
 * tests it.
 */
import { chromium } from "playwright-core";

const argv = process.argv.slice(2);
const opt = (k, d) => {
  const i = argv.indexOf(k);
  if (i < 0) return d;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
};
const HUB = opt("--hub", "http://localhost:4173/");
const REF = opt("--ref", "http://localhost:8765/");
const WIDTH = Number(opt("--width", "1440"));
const HEIGHT = Number(opt("--height", "900"));
const MAX_TABS = Number(opt("--tabs", "6"));
const slugs = argv.length ? argv : ["kofi-mensah", "elena-marsh", "ray-castillo"];

/* Both pages get the same helpers. `R()` is the viewer's root: the document in
   the original, the shadow root in the hub. */
const HELPERS = (slug) => {
  window.__R = () => {
    const host = document.querySelector(`[data-universe="${slug}"]`);
    return host ? host.shadowRoot : document;
  };
  window.__snap = () => {
    const R = window.__R();
    const app = R.querySelector(".app");
    const o = app.getBoundingClientRect();
    const txt = (el) => (el ? el.innerText.replace(/\s+/g, " ").trim() : "");
    const shown = (el) => {
      const cs = getComputedStyle(el);
      return cs.display !== "none" && cs.visibility !== "hidden" && el.getClientRects().length > 0;
    };
    const panel = R.querySelector(".panel.active");
    const geo = panel
      ? [...panel.querySelectorAll("*")].slice(0, 700).map((e) => {
          const r = e.getBoundingClientRect();
          const tag = `${e.tagName}${e.className && typeof e.className === "string" ? "." + e.className.split(/\s+/)[0] : ""}`;
          // A box that is not rendered sits at the window's origin, which is
          // not the viewer's origin in the hub, so it is compared as hidden.
          if (!e.getClientRects().length) return `${tag} hidden`;
          return `${tag} ${Math.round(r.x - o.x)},${Math.round(r.y - o.y)},${Math.round(r.width)}x${Math.round(r.height)}`;
        })
      : [];
    const overlays = [...R.querySelectorAll(".overlay, .kbd-help-overlay, .va-modal, .va-lb, [class*='search-panel'], #search-content")]
      .filter(shown)
      .map((e) => `${e.id || e.className}: ${txt(e).slice(0, 4000)}`);
    const main = R.querySelector(".main");
    return {
      nav: R.querySelector(".nav-item.active")?.textContent.replace(/\s+/g, " ").trim() ?? "",
      panel: panel?.id ?? "",
      text: txt(main),
      overlays,
      geo,
      scroll: main ? Math.round(main.scrollTop) : 0,
    };
  };
  window.__click = (sel, i = 0) => {
    const el = window.__R().querySelectorAll(sel)[i];
    if (!el) return false;
    el.click();
    return true;
  };
  window.__count = (sel) => window.__R().querySelectorAll(sel).length;
  window.__attr = (sel, i, a) => window.__R().querySelectorAll(sel)[i]?.getAttribute(a) ?? null;
};

async function open(browser, url, slug, size, plain = false) {
  const page = await browser.newPage({ viewport: size });
  if (plain) await page.addInitScript(() => (window.__uvPlain = true));
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url);
  await page.waitForFunction(
    (s) => {
      const host = document.querySelector(`[data-universe="${s}"]`);
      const R = host ? host.shadowRoot : document;
      return !!R && R.querySelector("#ov-content")?.children.length > 0;
    },
    slug,
    { timeout: 180000 }
  );
  await page.evaluate(HELPERS, slug);
  return { page, errors };
}

/* Let the step's work finish: timers, then every image in the open panel.
   Lazy images load in an order that depends on timing, and each one that
   lands moves the rest, so a pane full of previews only has one layout once
   all of them are in. Both pages get the same nudge to load them all, which
   also means every preview has to load, in both. */
const settle = async (p) => {
  await p.waitForTimeout(120);
  await p.evaluate(() => {
    const panel = window.__R().querySelector(".panel.active");
    panel?.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));
  });
  await p
    .waitForFunction(
      () => {
        const panel = window.__R().querySelector(".panel.active");
        const imgs = [...window.__R().querySelectorAll("img")].filter((i) => panel?.contains(i) || i.getClientRects().length);
        return imgs.every((i) => i.complete);
      },
      null,
      { timeout: 45000 }
    )
    .catch(() => {});
  await p.waitForTimeout(80);
};

function compare(step, a, b, out) {
  const bad = [];
  if (a.nav !== b.nav) bad.push(["active nav", a.nav, b.nav]);
  if (a.panel !== b.panel) bad.push(["panel", a.panel, b.panel]);
  if (a.text !== b.text) {
    let i = 0;
    while (i < a.text.length && a.text[i] === b.text[i]) i++;
    bad.push(["main text", a.text.slice(Math.max(0, i - 60), i + 120), b.text.slice(Math.max(0, i - 60), i + 120)]);
  }
  if (a.overlays.join("\n") !== b.overlays.join("\n")) bad.push(["overlays", a.overlays.join(" | ").slice(0, 300), b.overlays.join(" | ").slice(0, 300)]);
  if (a.scroll !== b.scroll) bad.push(["scroll", a.scroll, b.scroll]);
  const n = Math.max(a.geo.length, b.geo.length);
  let geoBad = 0;
  let first = null;
  for (let i = 0; i < n; i++) {
    if (a.geo[i] !== b.geo[i]) {
      geoBad++;
      if (!first) first = [i, a.geo[i], b.geo[i]];
    }
  }
  if (geoBad) bad.push([`layout (${geoBad} of ${n} boxes)`, `#${first[0]} ${first[1]}`, `#${first[0]} ${first[2]}`]);
  out.push({ step, ok: !bad.length, bad });
}

async function both(ref, hub, step, fn, out) {
  await fn(ref.page);
  await fn(hub.page);
  await settle(ref.page);
  await settle(hub.page);
  const [a, b] = await Promise.all([ref.page.evaluate(() => window.__snap()), hub.page.evaluate(() => window.__snap())]);
  compare(step, a, b, out);
}

const browser = await chromium.launch({ channel: "chrome" });
let failed = 0;
for (const slug of slugs) {
  const hubSize = { width: WIDTH, height: HEIGHT };
  const hub = await open(browser, `${HUB}#/universes/${slug}`, slug, hubSize, true);
  const stage = await hub.page.evaluate((s) => {
    const r = document.querySelector(`[data-universe="${s}"]`).getBoundingClientRect();
    return { width: Math.round(r.width), height: Math.round(r.height) };
  }, slug);
  const ref = await open(browser, `${REF}${slug}/`, slug, stage);
  const out = [];
  await both(ref, hub, "overview", async () => {}, out);

  const navCount = await ref.page.evaluate(() => window.__count(".nav-item[data-nav]"));
  for (let i = 0; i < navCount; i++) {
    const id = await ref.page.evaluate((i) => window.__attr(".nav-item[data-nav]", i, "data-nav"), i);
    const hidden = await ref.page.evaluate((i) => getComputedStyle(window.__R().querySelectorAll(".nav-item[data-nav]")[i]).display === "none", i);
    if (hidden) continue;
    await both(ref, hub, `nav ${id}`, (p) => p.evaluate((i) => window.__click(".nav-item[data-nav]", i), i), out);
    // The tabs inside a pane (marketplace, groups, inbox folders...).
    const tabs = await ref.page.evaluate(() => {
      const panel = window.__R().querySelector(".panel.active");
      return panel ? panel.querySelectorAll(".va-tab[data-va-tab], .af-tab, .tab-btn").length : 0;
    });
    for (let t = 0; t < Math.min(tabs, MAX_TABS); t++) {
      await both(
        ref,
        hub,
        `nav ${id} tab ${t}`,
        (p) =>
          p.evaluate((t) => {
            const panel = window.__R().querySelector(".panel.active");
            panel?.querySelectorAll(".va-tab[data-va-tab], .af-tab, .tab-btn")[t]?.click();
          }, t),
        out
      );
    }
    // Open the first row that opens something, where the pane has one.
    for (const sel of [".email-row", ".em-item", ".contact-card", ".conv-item", ".msg-conv", ".ev-card", ".gen-rec[onclick]", "[onclick^='showContact']", "[onclick^='showEmailThread']", "[onclick^='showConv']", "[onclick^='vaIgOpen']"]) {
      const has = await ref.page.evaluate((sel) => {
        const panel = window.__R().querySelector(".panel.active");
        return panel ? panel.querySelectorAll(sel).length : 0;
      }, sel);
      if (!has) continue;
      await both(
        ref,
        hub,
        `nav ${id} open ${sel}`,
        (p) =>
          p.evaluate((sel) => {
            const panel = window.__R().querySelector(".panel.active");
            panel.querySelectorAll(sel)[0].click();
          }, sel),
        out
      );
      await both(ref, hub, `nav ${id} close`, (p) => p.keyboard.press("Escape").then(() => p.evaluate(() => {
        const ov = window.__R().querySelector(".overlay");
        if (ov && getComputedStyle(ov).display !== "none") window.closeModal?.();
        window.vaIgClose?.();
        window.vaLightboxClose?.();
      })), out);
      break;
    }
  }

  // Search, through the keyboard as a reader would use it.
  const first = slug.split("-")[0];
  for (const q of [first, "invoice", "refund"]) {
    await both(
      ref,
      hub,
      `search "${q}"`,
      async (p) => {
        await p.evaluate(() => window.__R().querySelector("#sb-search")?.blur());
        await p.keyboard.press("Control+K");
        await p.keyboard.type(q, { delay: 10 });
        await p.waitForTimeout(450);
      },
      out
    );
    await both(ref, hub, `search "${q}" open first`, async (p) => {
      await p.keyboard.press("ArrowDown");
      await p.keyboard.press("Enter");
    }, out);
    await both(ref, hub, "clear search", async (p) => {
      await p.evaluate(() => {
        const input = window.__R().querySelector("#sb-search");
        input.focus();
      });
      await p.keyboard.press("Escape");
      await p.evaluate(() => window.__R().querySelector("#sb-search")?.blur());
    }, out);
  }

  // Keyboard shortcuts with nothing focused.
  const blur = (p) => p.evaluate(() => { document.activeElement?.blur?.(); window.__R().activeElement?.blur?.(); });
  await both(ref, hub, "key ?", async (p) => { await blur(p); await p.keyboard.press("Shift+Slash"); }, out);
  await both(ref, hub, "key Escape", (p) => p.keyboard.press("Escape"), out);
  await both(ref, hub, "keys g 3", async (p) => { await blur(p); await p.keyboard.press("g"); await p.keyboard.press("3"); }, out);
  await both(ref, hub, "keys g o", async (p) => { await blur(p); await p.keyboard.press("g"); await p.keyboard.press("o"); }, out);
  await both(ref, hub, "key /", async (p) => { await blur(p); await p.keyboard.press("/"); await p.keyboard.type(first.slice(0, 3)); await p.waitForTimeout(450); }, out);

  const bad = out.filter((s) => !s.ok);
  // Servers word a 404 differently ("File not found", "Not Found"); the status is what counts.
  const norm = (e) => e.replace(/(status of \d{3}) \([^)]*\)/, "$1");
  const refErr = new Set(ref.errors.map(norm));
  const extraErrors = hub.errors.filter((e) => !refErr.has(norm(e)));
  console.log(`${bad.length || extraErrors.length ? "FAIL" : "OK  "} ${slug}: ${out.length - bad.length} of ${out.length} states match, stage ${stage.width}x${stage.height}, errors original ${ref.errors.length} / hub ${hub.errors.length}`);
  for (const s of bad.slice(0, 25)) {
    console.log(`     step "${s.step}"`);
    for (const [what, a, b] of s.bad) console.log(`       ${what}\n         original: ${a}\n         hub:      ${b}`);
  }
  for (const e of extraErrors.slice(0, 10)) console.log(`     hub error not in the original: ${e}`);
  for (const e of ref.errors.slice(0, 5)) console.log(`     (the original logs this too: ${e.slice(0, 160)})`);
  if (bad.length || extraErrors.length) failed++;
  await hub.page.close();
  await ref.page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
