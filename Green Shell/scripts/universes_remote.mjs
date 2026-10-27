/**
 * Has a universe changed on agent-env-hub? For every folder in Universes/, the
 * Last Modified date on the universe's page there against the one the folder's
 * last_modified.md records.
 *
 *   node universes_remote.mjs [--dir ../Universes] [artifact-id ...]
 *   node universes_remote.mjs --login
 *
 * A universe's page is https://agent-env-hub.outlier.ai/universes/<id>, <id>
 * being its folder's name. agent-env-hub is behind the Outlier login, so the
 * pages are read in headless Chrome with a profile of its own (--profile,
 * C:\uvw-sync\outlier-profile), outside Drive and git. --login opens that
 * profile in an ordinary Chrome window, since Google will not sign in to a
 * browser a script drives: sign in there and close the window, and the check
 * reuses the session until it expires.
 *
 * Per universe: unchanged, MODIFIED (both dates), or PROBLEM. Each line also
 * says whether the page offers its Download Universe button, which is looked
 * for and never pressed: nothing is downloaded or written.
 *
 * Exit 0 when every universe is unchanged, 1 when one or more is modified, 2 on
 * a problem (not signed in, no date on the page or in the file).
 */
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const opt = (k, d) => {
  const i = argv.indexOf(k);
  if (i < 0) return d;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
};
const DIR = opt("--dir", "../Universes");
const PROFILE = opt("--profile", "C:\\uvw-sync\\outlier-profile");
const BASE = opt("--base", "https://agent-env-hub.outlier.ai/universes/");
const LOGIN = argv.includes("--login");
if (LOGIN) argv.splice(argv.indexOf("--login"), 1);
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// The Last Modified date as the page shows it, and as it is copied into
// last_modified.md: 10/15/2026, 1:57:25 PM PDT. The zone is capitals only, so a
// word after a date with none is not taken for one.
const STAMP = /(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])(?:\s+([A-Z]{2,5})\b)?/;
function stamp(text) {
  const m = STAMP.exec(text);
  if (!m) return null;
  const [all, mo, d, y, h, mi, s = "0", ap, tz = ""] = m;
  const hour = (+h % 12) + (/p/i.test(ap) ? 12 : 0);
  return { at: [+y, +mo, +d, hour, +mi, +s].join(" "), tz, text: all.replace(/\s+/g, " ") };
}
// The same moment; a zone only one of the two names is no difference.
const same = (a, b) => a.at === b.at && (!a.tz || !b.tz || a.tz === b.tz);
// The first date after the label, which a stylesheet may set in capitals.
function pageStamp(text) {
  const i = text.search(/last modified/i);
  return i < 0 ? null : stamp(text.slice(i, i + 120));
}

/** What a folder's last_modified.md records: { stamp }, { pending } or { problem }. */
function recorded(dir) {
  const p = path.join(dir, "last_modified.md");
  if (!fs.existsSync(p)) return { problem: "last_modified.md is missing" };
  const label = /^[\s#>-]*last modified\s*:\s*/i;
  const line = fs.readFileSync(p, "utf8").replace(/[*_`]/g, "").split(/\r?\n/).find((l) => label.test(l));
  if (!line) return { problem: 'last_modified.md has no "Last Modified:" line' };
  const v = line.replace(label, "").trim();
  if (/^pending$/i.test(v)) return { pending: true };
  const s = stamp(v);
  return s ? { stamp: s } : { problem: `last_modified.md gives "${v}", not a date as the page shows it` };
}

if (LOGIN) {
  fs.mkdirSync(PROFILE, { recursive: true });
  console.log("Sign in to Outlier in the Chrome window that opens, then close the window.");
  const chrome = spawn(CHROME, [`--user-data-dir=${PROFILE}`, "--no-first-run", "--no-default-browser-check", BASE], { stdio: "ignore" });
  chrome.on("error", (e) => {
    console.log(`Chrome did not start: ${e.message}`);
    process.exit(2);
  });
  chrome.on("exit", () => {
    console.log("The window is closed. Run the check now.");
    process.exit(0);
  });
} else {
  if (!fs.existsSync(DIR)) {
    console.log(`PROBLEM    there is no folder ${DIR}`);
    process.exit(2);
  }
  const ids = fs.readdirSync(DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && (!argv.length || argv.includes(e.name)))
    .map((e) => e.name)
    .sort();
  let ctx;
  try {
    // The page's own zone and language, so its dates read as they were copied.
    ctx = await chromium.launchPersistentContext(PROFILE, { channel: "chrome", headless: true, locale: "en-US", timezoneId: "America/Los_Angeles" });
  } catch (e) {
    console.log(`PROBLEM    Chrome would not open ${PROFILE}; close the window --login opened and run again.\n           ${e.message.split("\n")[0]}`);
    process.exit(2);
  }
  const host = new URL(BASE).host;
  const counts = { unchanged: 0, modified: 0, problem: 0 };
  const say = (tag, id, what) => {
    counts[tag.toLowerCase()]++;
    console.log(`${tag.padEnd(10)} ${id.padEnd(48)} ${what}`);
  };
  for (const id of ids) {
    const rec = recorded(path.join(DIR, id));
    const page = await ctx.newPage();
    let text = "";
    let failed = null;
    try {
      await page.goto(BASE + encodeURIComponent(id), { waitUntil: "domcontentloaded", timeout: 60_000 });
      // The sign-in passes through redirects, some made by script, and the date
      // may arrive after the page: wait for it on the hub's own host.
      for (const until = Date.now() + 30_000; Date.now() < until; await page.waitForTimeout(500)) {
        text = new URL(page.url()).host === host ? await page.evaluate(() => document.body?.innerText ?? "").catch(() => "") : "";
        if (pageStamp(text)) break;
      }
    } catch (e) {
      failed = e.message.split("\n")[0];
    }
    const at = new URL(page.url()).host;
    if (failed) {
      say("PROBLEM", id, `the page did not load: ${failed}`);
    } else if (at !== host) {
      // Signed out, so every other page would say the same.
      say("PROBLEM", id, `not signed in to Outlier (the page went to ${at}). Run node universes_remote.mjs --login, sign in, close the window, and run this again.`);
      break;
    } else {
      const button = page.getByRole("button", { name: /download universe/i }).or(page.getByRole("link", { name: /download universe/i })).first();
      const offer = !(await button.isVisible().catch(() => false)) ? "no Download Universe button"
        : (await button.isEnabled().catch(() => false)) ? "Download Universe offered" : "Download Universe disabled";
      const found = pageStamp(text);
      if (!found) say("PROBLEM", id, `the page shows no Last Modified date · ${offer}`);
      else if (rec.problem) say("PROBLEM", id, `${rec.problem}; the page says ${found.text} · ${offer}`);
      else if (rec.pending || !same(found, rec.stamp)) {
        say("MODIFIED", id, `the page says ${found.text}, last_modified.md ${rec.pending ? "pending" : rec.stamp.text} · ${offer}`);
      } else say("unchanged", id, `${found.text} · ${offer}`);
    }
    await page.close();
  }
  await ctx.close();
  const left = ids.length - counts.unchanged - counts.modified - counts.problem;
  console.log(`${counts.unchanged} unchanged, ${counts.modified} modified, ${counts.problem} with a problem` + (left ? `, ${left} not checked` : ""));
  process.exit(counts.problem ? 2 : counts.modified ? 1 : 0);
}
