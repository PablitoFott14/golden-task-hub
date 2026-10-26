/**
 * Download test for the Universes tab: every download it offers saves the
 * right bytes under the right name, in a real browser.
 *
 *   node universes_downloads.mjs --hub http://localhost:4173/ --store public/universes --zips universe-zips [--live] [slug ...]
 *
 * Per persona:
 *
 * 1. **The ZIP.** The button on the persona's card and the one on the persona
 *    bar both link to `<slug>.zip` on the GitHub release `universes` and save
 *    it. Against a local build the release URL is answered with the ZIP the
 *    build wrote to --zips, as GitHub answers it (an attachment), so what is
 *    tested is that build. With --live the download really goes to GitHub, and
 *    --zips holds the release's own copies to compare with.
 * 2. **The Files app.** Every file's Download is drawn as the download button
 *    and saves exactly the stored file, or the byte-identical copy the record's
 *    SHA-256 names. A file the universe does not include says so and has
 *    nothing to save.
 * 3. **Attachments.** In every email that has them, every attachment offers a
 *    Download, and each one saves, under the attachment's name, bytes the
 *    universe stores. The first image opened in the image viewer saves the same
 *    way from there.
 *
 * Exit 0 when everything passes and the hub logged no error beyond the 404s of
 * the previews the original site never had either.
 */
import { chromium } from "playwright-core";
import { createHash } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const argv = process.argv.slice(2);
const opt = (k, d) => {
  const i = argv.indexOf(k);
  if (i < 0) return d;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
};
const HUB = opt("--hub", "http://localhost:4173/");
const STORE = opt("--store", "public/universes");
const ZIPS = opt("--zips", "universe-zips");
const LIVE = argv.includes("--live");
if (LIVE) argv.splice(argv.indexOf("--live"), 1);
const slugs = argv.length ? argv : fs.readdirSync(STORE).filter((d) => fs.existsSync(path.join(STORE, d, "viewer", "page.json")));
const RELEASE = /^https:\/\/github\.com\/[^/]+\/[^/]+\/releases\/download\/universes\/([a-z0-9-]+\.zip)$/;

const sha = (b) => createHash("sha256").update(b).digest("hex");

/** path -> sha256 of every file stored for a universe. */
function stored(slug) {
  const root = path.join(STORE, slug);
  const out = new Map();
  const walk = (rel) => {
    for (const e of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
      const p = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) walk(p);
      else out.set(p, sha(fs.readFileSync(path.join(root, p))));
    }
  };
  walk("");
  return out;
}

// A response handed to the browser through the route travels base64 in one
// protocol message, and Chrome closes the page on a message over 100 MB, which
// a ZIP over about 78 MB already makes. So the release URL is redirected to
// this server, which sends the build's ZIP as GitHub does, as an attachment.
const zipServer = LIVE
  ? null
  : http.createServer((req, res) => {
      const name = path.basename(decodeURIComponent(req.url ?? ""));
      const file = path.join(ZIPS, name);
      if (!name.endsWith(".zip") || !fs.existsSync(file)) return res.writeHead(404).end("Not Found");
      res.writeHead(200, { "content-type": "application/octet-stream", "content-disposition": `attachment; filename=${name}`, "content-length": fs.statSync(file).size });
      fs.createReadStream(file).pipe(res);
    });
if (zipServer) await new Promise((resolve) => zipServer.listen(0, "127.0.0.1", resolve));

const browser = await chromium.launch({ channel: "chrome" });
let failed = 0;

// Chrome drops, silently, any download a page starts after its tenth within
// one second. A reader never clicks that fast; this test would, so it paces
// itself under the limit.
let lastStart = 0;
async function save(page, click, timeout = 30000) {
  await page.waitForTimeout(Math.max(0, lastStart + 150 - Date.now()));
  lastStart = Date.now();
  const [dl] = await Promise.all([page.waitForEvent("download", { timeout }), click()]);
  const file = await dl.path();
  const failure = await dl.failure();
  if (failure) throw new Error(`the download failed: ${failure}`);
  return { name: dl.suggestedFilename(), sha: sha(fs.readFileSync(file)), bytes: fs.statSync(file).size };
}

for (const slug of slugs) {
  const files = stored(slug);
  const hashes = new Set(files.values());
  const zipSha = sha(fs.readFileSync(path.join(ZIPS, `${slug}.zip`)));
  const fsSeed = JSON.parse(fs.readFileSync(path.join(STORE, slug, "seed", "filesystem.json"), "utf8"));
  const recordSha = new Map((fsSeed.files ?? []).map((f) => [String(f.path).replace(/^\/+/, ""), f.sha256]));
  const problems = [];
  const counts = { zip: 0, files: 0, notIncluded: 0, viaCopy: 0, inline: 0, attachments: 0, added: 0, lightbox: 0 };

  const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(`${m.text()} ${m.location()?.url ?? ""}`));
  if (!LIVE) {
    await page.route(RELEASE, (route) => {
      const name = RELEASE.exec(route.request().url())[1];
      return route.fulfill({ status: 302, headers: { location: `http://127.0.0.1:${zipServer.address().port}/${name}` } });
    });
  }

  // 1. The ZIP, from the grid and from the bar.
  await page.goto(`${HUB}#/universes`);
  await page.waitForSelector(`a[download="${slug}.zip"]`);
  for (const where of ["card", "bar"]) {
    if (where === "bar") {
      await page.goto(`${HUB}#/universes/${slug}`);
      await page.waitForFunction((s) => document.querySelector(`[data-universe="${s}"]`)?.shadowRoot?.querySelector("#ov-content")?.children.length > 0, slug, { timeout: 180000 });
    }
    const link = page.locator(`a[download="${slug}.zip"]:visible`).first();
    const href = (await link.getAttribute("href")) ?? "";
    if (RELEASE.exec(href)?.[1] !== `${slug}.zip`) problems.push(`ZIP from the ${where} links to ${href}, not the release`);
    const got = await save(page, () => link.click(), 120000);
    if (!page.url().includes("#/universes")) problems.push(`ZIP from the ${where} navigated the page to ${page.url()}`);
    counts.zip++;
    if (got.name !== `${slug}.zip`) problems.push(`ZIP from the ${where} saves as ${got.name}`);
    if (got.sha !== zipSha) problems.push(`ZIP from the ${where} is not the ZIP the build wrote (${got.bytes} bytes)`);
  }

  // Everything below runs inside the universe's shadow root. Every download is
  // a real mouse click (Playwright's CSS reaches into an open shadow root), as
  // a reader's is: a click from script carries no user gesture, and Chrome
  // holds back a run of downloads started without one.
  const inRoot = (fn, arg) =>
    page.evaluate(([s, src, a]) => new Function("R", "a", src)(document.querySelector(`[data-universe="${s}"]`).shadowRoot, a), [slug, fn, arg]);
  const $ = (sel) => page.locator(`[data-universe="${slug}"] ${sel}`);

  // 2. The Files app: every file.
  await inRoot(`R.querySelector('.nav-item[data-nav="filesystem"]').click()`);
  await page.waitForTimeout(600);
  // Its previews load lazily, and each one that lands moves every row below
  // it, which can move a button between Playwright finding it and clicking
  // it. So all of them load first, as in the parity crawl.
  await inRoot(`R.querySelectorAll('.panel.active img[loading=lazy]').forEach((i) => (i.loading = 'eager'))`);
  await page
    .waitForFunction((s) => [...document.querySelector(`[data-universe="${s}"]`).shadowRoot.querySelectorAll(".panel.active img")].every((i) => i.complete), slug, { timeout: 90000 })
    .catch(() => {});
  const info = `
    const info = (a, i, row) => {
      const cs = getComputedStyle(a), before = getComputedStyle(a, '::before'), r = a.getBoundingClientRect();
      return {
        i, row, name: a.getAttribute('download'), href: a.getAttribute('href'), off: a.classList.contains('uv-dl-off'),
        disabled: a.getAttribute('aria-disabled'), text: a.textContent.trim(), title: a.title,
        display: cs.display, color: cs.color, border: cs.borderTopWidth, mask: before.maskImage || before.webkitMaskImage || '',
        w: Math.round(r.width), h: Math.round(r.height),
      };
    };`;
  // The older Files app lists every file with a Download of its own. The newer
  // one lists the files and shows one at a time, its Download in the preview,
  // so each file is opened from its row first.
  const rows = await inRoot(`return [...R.querySelectorAll('.panel.active #fs-list .fs-item')].map((el) => el.dataset.filePath.replace(/^\\/+/, ''))`);
  const links = rows.length
    ? rows.map((row, k) => ({ row, k }))
    : await inRoot(info + `return [...R.querySelectorAll('.panel.active a[download]')].map((a, i) => info(a, i, a.closest('.gen-rec')?.querySelector('b')?.textContent ?? ''))`);
  if (!links.length) problems.push("the Files app shows no downloads");
  for (const entry of links) {
    let l = entry;
    if (rows.length) {
      await $(".panel.active #fs-list .fs-item").nth(entry.k).click();
      await page.waitForTimeout(250);
      l = await inRoot(info + `const el = R.querySelector('.panel.active #fs-preview a[download]'); return el ? info(el, 0, a) : null`, entry.row);
      if (!l) {
        problems.push(`Files: ${entry.row}: no Download in the preview`);
        continue;
      }
    }
    const where = `Files: ${l.row}`;
    if (!/flex/.test(l.display) || !/svg/.test(l.mask) || l.border !== "1px" || l.h < 20) {
      problems.push(`${where}: not drawn as the download button (${l.display}, mask ${l.mask.slice(0, 20)}, ${l.w}x${l.h})`);
    }
    if (l.off) {
      counts.notIncluded++;
      if (l.href !== null || l.disabled !== "true" || l.text !== "Not included") problems.push(`${where}: shown as not included, but still a live link`);
      if (files.has(`files/filesystem/${l.row}`)) problems.push(`${where}: shown as not included, but it is stored`);
      continue;
    }
    if (l.text !== "Download" || !l.title.startsWith("Download ")) problems.push(`${where}: labelled "${l.text}", titled "${l.title}"`);
    const expect = files.get(`files/filesystem/${l.row}`) ?? recordSha.get(l.row);
    if (!files.has(`files/filesystem/${l.row}`)) counts.viaCopy++;
    if (l.href?.startsWith("data:")) counts.inline++;
    try {
      const got = await save(page, () => (rows.length ? $(".panel.active #fs-preview a[download]") : $(".panel.active a[download]").nth(l.i)).click());
      counts.files++;
      if (got.name !== l.row.split("/").pop()) problems.push(`${where}: saves as ${got.name}`);
      if (got.sha !== expect) problems.push(`${where}: the saved bytes are not the file (${got.bytes} bytes)`);
    } catch (e) {
      problems.push(`${where}: ${e.message.split("\n")[0]}`);
    }
  }

  // 3. Attachments, in every email thread that has them.
  await inRoot(`R.querySelector('.nav-item[data-nav="email"]').click()`);
  await page.waitForTimeout(400);
  // The threads marked with a paperclip. The newer engine draws no paperclip
  // and names an attachment under its message without offering it (its file
  // is in the Files app), so an engine with no paperclips is not held to any.
  const { clip, threads } = await inRoot(`
    const items = [...R.querySelectorAll('.panel.active .em-thread-item')];
    const clip = items.some((el) => el.querySelector('.em-thread-clip'));
    return { clip, threads: items.map((el, i) => (el.querySelector('.em-thread-clip') ? i : -1)).filter(i => i >= 0) };
  `);
  let lightboxDone = false;
  for (const t of threads) {
    await inRoot(`R.querySelectorAll('.panel.active .em-thread-item')[a].click()`, t);
    await page.waitForTimeout(80);
    const cards = await inRoot(`
      return [...R.querySelectorAll('#em-reader .va-att-doc')].map((c, i) => ({
        i, name: c.querySelector('.va-att-name')?.textContent.trim(),
        downloads: c.querySelectorAll('.va-att-acts a[download]').length,
        added: c.querySelectorAll('.va-att-acts a[download][data-uv-added]').length,
        opens: c.querySelectorAll('.va-att-acts [data-va-att]').length,
      }));
    `);
    for (const c of cards) {
      const where = `email thread ${t}: ${c.name}`;
      if (c.downloads !== 1) {
        problems.push(`${where}: ${c.downloads} Download buttons`);
        continue;
      }
      try {
        const got = await save(page, () => $("#em-reader .va-att-doc").nth(c.i).locator(".va-att-acts a[download]").click());
        counts.attachments++;
        if (c.added) counts.added++;
        if (got.name !== c.name) problems.push(`${where}: saves as ${got.name}`);
        if (!hashes.has(got.sha)) problems.push(`${where}: the saved bytes (${got.bytes}) are no file this universe stores`);
      } catch (e) {
        problems.push(`${where}: ${e.message.split("\n")[0]}`);
      }
    }
    // The image viewer, once: open a thumbnail, save from there.
    if (!lightboxDone && (await inRoot(`return R.querySelectorAll('#em-reader .va-att-fig').length`))) {
      lightboxDone = true;
      const fig = await inRoot(`return R.querySelector('#em-reader .va-att-fig img')?.alt ?? ''`);
      await $("#em-reader .va-att-fig").first().click();
      await page.waitForTimeout(150);
      const lb = await inRoot(`const b = R.querySelector('#va-lb.on .va-lb-bar'); return b ? { n: b.querySelectorAll('a[download]').length, open: !!b.querySelector('a[data-va-att]:not([download])') } : null`);
      if (!lb || lb.n !== 1 || !lb.open) problems.push(`image viewer on ${fig}: ${lb ? lb.n : "no"} Download beside Open original`);
      else {
        try {
          const got = await save(page, () => $("#va-lb .va-lb-bar a[download]").click());
          counts.lightbox++;
          if (got.name !== fig) problems.push(`image viewer: saves ${fig} as ${got.name}`);
          if (!hashes.has(got.sha)) problems.push(`image viewer: the saved bytes of ${fig} are no file this universe stores`);
        } catch (e) {
          problems.push(`image viewer: ${e.message.split("\n")[0]}`);
        }
      }
      await inRoot(`window.vaLightboxClose?.()`);
    }
  }
  if (clip && !counts.attachments) problems.push("no attachment downloads were found in the email app");

  // The previews the original never had are 404s in both; anything else is new.
  const extra = errors.filter((e) => !/status of 404/.test(e));
  for (const e of extra.slice(0, 8)) problems.push(`hub error: ${e.slice(0, 200)}`);

  const ok = !problems.length;
  if (!ok) failed++;
  console.log(
    `${ok ? "OK  " : "FAIL"} ${slug}: ZIP saved ${counts.zip}/2 identical; Files ${counts.files} downloads byte for byte` +
      ` (${counts.inline} held inline, ${counts.viaCopy} from a stored copy), ${counts.notIncluded} shown as not included;` +
      ` attachments ${counts.attachments} (${counts.added} on a PDF that had none); image viewer ${counts.lightbox}`
  );
  for (const p of problems.slice(0, 30)) console.log(`     ${p}`);
  await ctx.close();
}
await browser.close();
zipServer?.close();
process.exit(failed ? 1 : 0);
