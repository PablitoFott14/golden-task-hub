/**
 * The Explore test: every universe's Explore view, checked against the index
 * the same code builds from the stored files.
 *
 * It runs from the build mirror, where playwright-core and esbuild are installed:
 *
 *   npx vite preview --port 4173 &
 *   node universes_explore.mjs --hub http://localhost:4173/ [--store public/universes] [--src src] [slug ...]
 *
 * In Node, for each universe, it bundles src/lib/explore and builds the index
 * from public/universes/<slug>/, then checks that nothing stored is left out:
 * every record of every collection is held by an item or listed with its
 * server as an other stored record. In Chrome it opens the universe's Explore
 * and checks, against that index:
 *
 * - every dataset opens and lists exactly its records;
 * - a filter in every dataset leaves exactly the records its count says;
 * - clicking a filter value, and opening a row, show the right record;
 * - a search across every server, a person, a day and a shared reference
 *   each list what the index holds for them;
 * - "Show in viewer" opens that server in the persona's own viewer, the older
 *   engines included, and the switch back finds Explore where it was left;
 * - a pinned record is listed and cleared;
 * - typing in the largest dataset's search updates the list quickly.
 *
 * Exit 0 when every check passes and the page logged no error.
 */
import { chromium } from "playwright-core";
import { build } from "esbuild";
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const opt = (k, d) => {
  const i = argv.indexOf(k);
  if (i < 0) return d;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
};
const HUB = opt("--hub", "http://localhost:4173/");
const STORE = resolve(opt("--store", "public/universes"));
const SRC = resolve(opt("--src", "src"));
const slugs = argv.length ? argv : readdirSync(STORE).filter((d) => existsSync(join(STORE, d, "viewer", "page.json")));

let failures = 0;
const fail = (msg) => {
  failures++;
  console.log("FAIL " + msg);
};
const ok = (msg) => console.log("ok   " + msg);

/* ------------------------------------------------- the index, in Node */

const entry = join(tmpdir(), `uv-explore-entry-${process.pid}.ts`);
const bundle = join(tmpdir(), `uv-explore-${process.pid}.mjs`);
const fwd = (p) => p.replace(/\\/g, "/");
writeFileSync(entry, `export { buildIndex } from "${fwd(join(SRC, "lib/explore/build"))}";\nexport { searchAll, runQuery, emptyState } from "${fwd(join(SRC, "lib/explore/query"))}";\n`);
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "esm", outfile: bundle, logLevel: "warning" });
const { buildIndex, searchAll, runQuery, emptyState } = await import(pathToFileURL(bundle).href);
rmSync(entry, { force: true });

function source(slug) {
  const base = join(STORE, slug);
  const json = (p) => JSON.parse(readFileSync(join(base, p), "utf8"));
  const page = json("viewer/page.json");
  const data = json("viewer/data.json");
  const engine = readFileSync(join(base, "viewer/engine.js"), "utf8");
  const seed = {};
  for (const s of page.seed) seed[s] = json(`seed/${s}.json`);
  const docs = {};
  for (const [k, p] of Object.entries(page.markdown ?? {})) if (p) docs[k] = readFileSync(join(base, p), "utf8");
  const P = data.c.PERSONA ?? {};
  const range = Array.isArray(P.date_range) && P.date_range.length === 2 ? P.date_range.map(String) : null;
  return {
    slug,
    base: "/",
    tz: /\bconst TZ\s*=\s*["']([^"']+)["']/.exec(engine)?.[1] ?? "UTC",
    persona: { name: String(P.name ?? slug), subtitle: String(P.subtitle ?? ""), now: P.now ? String(P.now) : range ? range[1] : null, range },
    nav: data.c.DATA_NAV ?? [],
    emoji: data.c.VA_EMOJI?.codes ?? {},
    seed,
    docs,
    externals: new Set(page.externals ?? []),
    renderedPrefix: page.renderedPrefix ?? "",
    url: (p) => "/" + p,
  };
}

/* -------------------------------------------------------- the browser */

const browser = await chromium.launch({ channel: "chrome" });
try {
  for (const slug of slugs) {
    console.log(`\n== ${slug}`);
    const src = source(slug);
    const t0 = performance.now();
    const ix = buildIndex(src);
    ok(`index: ${ix.items.length} records in ${ix.datasets.size} datasets, ${ix.entities.length} people and organizations, ${ix.idents.length} shared references, built in ${Math.round(performance.now() - t0)} ms`);

    // Nothing stored is left out.
    const held = new Set();
    for (const it of ix.items) {
      held.add(it.raw);
      for (const v of Object.values(it.raw)) if (Array.isArray(v)) for (const r of v) held.add(r);
      for (const a of it.also) held.add(a.rec);
    }
    let stored = 0;
    let missing = 0;
    let listed = 0;
    for (const [s, sd] of Object.entries(src.seed)) {
      const extra = new Set((ix.extras.get(s) ?? []).flatMap((x) => x.rows));
      for (const rows of Object.values(sd)) {
        if (!Array.isArray(rows)) continue;
        for (const r of rows) {
          if (!r || typeof r !== "object") continue;
          stored++;
          if (!held.has(r) && !extra.has(r)) missing++;
          else if (!held.has(r)) listed++;
        }
      }
    }
    if (missing) fail(`${missing} of ${stored} stored records are neither an item nor listed with their server`);
    else ok(`every one of ${stored} stored records is reachable: ${stored - listed} through records, ${listed} listed with their server`);
    const keys = new Set(ix.items.map((it) => it.key));
    if (keys.size !== ix.items.length) fail(`${ix.items.length - keys.size} records share a key`);

    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && !/404|Failed to load resource/.test(m.text()) && errors.push(m.text()));
    const go = async (q) => {
      await page.evaluate(([s, qq]) => (location.hash = `#/universes/${s}/explore${qq ? "?" + qq : ""}`), [slug, q]);
    };
    const countIs = async (n, what, scope = "") => {
      try {
        await page.waitForFunction(
          ([want, sc]) => {
            const el = document.querySelector(`${sc} [data-count]`);
            return el && el.getAttribute("data-count") === String(want);
          },
          [n, scope],
          { timeout: 8000 }
        );
        return true;
      } catch {
        const got = await page.evaluate((sc) => document.querySelector(`${sc} [data-count]`)?.getAttribute("data-count"), scope);
        fail(`${what}: shows ${got}, the index holds ${n}`);
        return false;
      }
    };

    await page.goto(`${HUB}#/universes/${slug}/explore`);
    await page.waitForSelector("text=Present day", { timeout: 60000 });
    const home = await page.evaluate(() => document.querySelector("main")?.innerText ?? "");
    if (!home.includes(`${ix.items.length.toLocaleString("en-US")} records`)) fail("the overview does not give the record count");
    else ok("overview");

    // Every dataset: its records, a filter, a record opened.
    let datasets = 0;
    let filters = 0;
    for (const ds of ix.datasets.values()) {
      await go(`s=${encodeURIComponent(ds.server)}&ds=${encodeURIComponent(ds.id)}`);
      if (!(await countIs(ds.items.length, `${ds.key} lists`))) continue;
      datasets++;
      const facet = ds.facets.find((f) => new Set(ds.items.flatMap((i) => [ix.items[i].f[f.id]].flat().filter((x) => x !== undefined))).size > 1);
      if (facet) {
        const st = emptyState(ds);
        const res = runQuery(ix, ds, st);
        const [value, n] = [...res.counts.get(facet.id)].sort((a, b) => b[1] - a[1])[0];
        await go(`s=${encodeURIComponent(ds.server)}&ds=${encodeURIComponent(ds.id)}&f.${encodeURIComponent(facet.id)}=${encodeURIComponent(value)}`);
        if (await countIs(n, `${ds.key} filtered to ${facet.label} = ${value}`)) filters++;
      }
      // Open the first row; the record shown is the row's own.
      await go(`s=${encodeURIComponent(ds.server)}&ds=${encodeURIComponent(ds.id)}`);
      await countIs(ds.items.length, `${ds.key} lists again`);
      const row = page.locator("main [data-item]").first();
      const key = await row.getAttribute("data-item");
      await row.click();
      const want = ix.items[ix.byKey.get(key)]?.title;
      try {
        await page.waitForFunction((t) => document.querySelector('aside[aria-label="Record"] h2')?.textContent === t, want, { timeout: 5000 });
      } catch {
        fail(`${ds.key}: opening ${key} did not show "${want}"`);
      }
      await page.keyboard.press("Escape");
    }
    ok(`${datasets} of ${ix.datasets.size} datasets list exactly their records; ${filters} filters leave exactly their count; every first row opens`);

    // A filter clicked, not typed into the address.
    {
      const ds = [...ix.datasets.values()].find((d) => d.server === "email") ?? [...ix.datasets.values()][0];
      const facet = ds.facets.find((f) => f.primary && !f.entity && !f.tree) ?? ds.facets[0];
      const res = runQuery(ix, ds, emptyState(ds));
      const [value, n] = [...res.counts.get(facet.id)].sort((a, b) => b[1] - a[1])[0];
      await go(`s=${encodeURIComponent(ds.server)}&ds=${encodeURIComponent(ds.id)}`);
      await countIs(ds.items.length, `${ds.key} before the click`);
      const label = facet.fmt ? facet.fmt(value) : value;
      await page.locator(`main aside button[aria-pressed][title="${label.replace(/"/g, '\\"')}"]`).first().click();
      if (await countIs(n, `${ds.key}: clicking ${facet.label} = ${label}`)) ok(`clicking ${facet.label}: ${label} leaves ${n}`);
      const url = await page.evaluate(() => location.hash);
      if (!url.includes(`f.${facet.id}=`)) fail("the clicked filter is not in the address");
    }

    // Across servers: a search, a person, a day, a reference.
    const ident = [...ix.idents].sort((a, b) => b.servers.length - a.servers.length || b.items.length - a.items.length)[0];
    if (ident) {
      const total = searchAll(ix, ident.label).hits.reduce((a, h) => a + h.rows.length, 0);
      await go(`v=search&q=${encodeURIComponent(ident.label)}`);
      if (await countIs(total, `search for ${ident.label}`)) ok(`search "${ident.label}": ${total} records`);
      await go(`x=${encodeURIComponent(ident.key)}`);
      if (await countIs(ident.items.length, `reference ${ident.label}`)) ok(`reference ${ident.label}: ${ident.items.length} records in ${ident.servers.length} servers`);
    }
    const person = ix.entities.filter((e) => e.i !== ix.self).sort((a, b) => Object.keys(b.servers).length - Object.keys(a.servers).length || b.items.length - a.items.length)[0];
    await go(`p=${encodeURIComponent(person.key)}`);
    if (await countIs(person.items.length, `${person.name}'s page`)) ok(`${person.name}: ${person.items.length} records in ${Object.keys(person.servers).length} servers`);
    const [day, ids] = [...ix.days].sort((a, b) => b[1].length - a[1].length)[0];
    await go(`d=${day}`);
    if (await countIs(ids.length, `day ${day}`)) ok(`${day}: ${ids.length} records`);

    // Pin a record, see it listed, clear it.
    {
      const ds = [...ix.datasets.values()][0];
      await go(`s=${encodeURIComponent(ds.server)}&ds=${encodeURIComponent(ds.id)}&r=${encodeURIComponent(ix.items[ds.items[0]].key)}`);
      await page.locator('aside[aria-label="Record"] button[aria-pressed]').first().click();
      await go("v=pinned");
      const n = await page.locator("main [data-item]").count();
      if (n !== 1) fail(`pinned one record, the list shows ${n}`);
      await page.getByRole("button", { name: "Clear" }).click();
      const after = await page.locator("main [data-item]").count();
      if (after !== 0) fail(`cleared the pins, ${after} still listed`);
      else ok("pin, list, clear");
    }

    // Speed: typing in the largest dataset's search.
    {
      const ds = [...ix.datasets.values()].sort((a, b) => b.items.length - a.items.length)[0];
      await go(`s=${encodeURIComponent(ds.server)}&ds=${encodeURIComponent(ds.id)}`);
      await countIs(ds.items.length, `${ds.key} before typing`);
      // A word from a record in the middle of the list: it matches some rows, not all.
      const mid = ix.items[ds.items[Math.floor(ds.items.length / 2)]];
      const term = (mid.title.toLowerCase().match(/[a-z]{3,}/) ?? ["a"])[0];
      const want = runQuery(ix, ds, { ...emptyState(ds), q: term }).rows.length;
      const t = Date.now();
      await page.locator(`main input[aria-label="Search ${ds.noun}"]`).fill(term);
      await countIs(want, `${ds.key} searched for "${term}"`);
      const ms = Date.now() - t;
      if (ms > 1500) fail(`searching ${ds.items.length} ${ds.noun} took ${ms} ms`);
      else ok(`searching ${ds.items.length} ${ds.noun}: ${ms} ms to ${want}`);
    }

    // Show in viewer, then back: the viewer opens that server, Explore is where it was.
    {
      const server = ix.servers.find((s) => s.id === "email")?.id ?? ix.servers[0].id;
      const label = src.nav.find((n) => n.id === server)?.label ?? server;
      await go(`s=${server}`);
      await countIs(ix.datasets.get(ix.servers.find((s) => s.id === server).datasets[0]).items.length, `${server} before Show in viewer`);
      await page.locator("main header a", { hasText: "Show in viewer" }).first().click();
      try {
        await page.waitForFunction(
          ([s, want]) => {
            const R = document.querySelector(`[data-universe="${s}"]`)?.shadowRoot;
            return R && (R.querySelector(".nav-item.active")?.textContent ?? "").includes(want);
          },
          [slug, label],
          { timeout: 90000 }
        );
        ok(`Show in viewer opens ${label} in the viewer`);
      } catch {
        fail(`Show in viewer did not open ${label}`);
      }
      await page.locator('[role="group"][aria-label="View"] a', { hasText: "Explore" }).click();
      const back = await page.evaluate(() => location.hash);
      if (!back.includes(`s=${server}`)) fail(`back in Explore at ${back}, not where it was left`);
      else ok("the switch back finds Explore where it was");
    }

    if (errors.length) fail(`${slug} logged ${errors.length} errors:\n  ` + errors.slice(0, 8).join("\n  "));
    else ok("no errors logged");
    await ctx.close();
  }
} finally {
  await browser.close();
  rmSync(bundle, { force: true });
}
console.log(failures ? `\n${failures} failed` : "\nall Explore checks passed");
process.exit(failures ? 1 : 0);
