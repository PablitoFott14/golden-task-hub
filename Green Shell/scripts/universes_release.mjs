/**
 * Publish the universe ZIPs as the assets of the GitHub release `universes`,
 * which the Universes tab's download buttons link to.
 *
 *   node scripts/universes_release.mjs <dir> [--dry-run]
 *
 * <dir> is what the build wrote to universe-zips/: <slug>.zip per universe and
 * universes.json, which records each ZIP's `contents`, the SHA-256 of its
 * MANIFEST.csv. The release keeps its own copy of that index, so a run uploads
 * only the ZIPs whose contents changed or that the release lacks, and a deploy
 * that touched no universe uploads nothing. A ZIP of a universe the hub no
 * longer carries is removed. The index goes up last, so a run cut short is
 * finished by the next one, and every asset is then checked at its size.
 *
 * The deploy workflow's release job runs it with the gh CLI, GH_TOKEN and
 * GH_REPO set. --dry-run reads the release and says what it would do.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TAG = "universes";
const NOTES =
  "The three persona universes of the Golden Task Hub's Universes tab, one ZIP each, in the layout of the export ZIPs: " +
  "SUMMARY.json, MANIFEST.csv, seed/, docs/ and files/. The hub's deploy uploads a universe's ZIP whenever its contents " +
  "change; universes.json records which version each one holds.";

const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const dir = args.find((a) => !a.startsWith("--"));
if (!dir) {
  console.error("usage: node scripts/universes_release.mjs <dir> [--dry-run]");
  process.exit(2);
}

const gh = (...a) => execFileSync("gh", a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 << 20 });
const act = (what, ...a) => {
  console.log(`${dry ? "would " : ""}${what}`);
  if (!dry) gh(...a);
};
const mb = (n) => `${(n / 1e6).toFixed(1)} MB`;

const local = JSON.parse(fs.readFileSync(path.join(dir, "universes.json"), "utf8"));
for (const z of Object.values(local)) {
  const p = path.join(dir, z.file);
  if (!fs.existsSync(p) || fs.statSync(p).size !== z.bytes) throw new Error(`${p} is missing, or not the size universes.json records`);
}

let release = null;
try {
  release = JSON.parse(gh("release", "view", TAG, "--json", "assets,url"));
} catch (e) {
  if (!/not found/i.test(String(e.stderr ?? e.message))) throw e;
}
if (!release) {
  act(`create the release ${TAG}`, "release", "create", TAG, "--title", "Universe downloads", "--notes", NOTES, "--latest=false");
  release = { assets: [] };
}
const assets = new Map(release.assets.map((a) => [a.name, a]));
const remote = assets.has("universes.json") ? JSON.parse(gh("release", "download", TAG, "--pattern", "universes.json", "--output", "-")) : {};

// What the release will hold once this run is done.
const published = {};
let changed = 0;
for (const [slug, z] of Object.entries(local)) {
  const have = assets.get(z.file);
  const was = remote[slug];
  if (have && was && was.contents === z.contents && have.size === was.bytes) {
    console.log(`kept ${z.file}: its contents are unchanged since ${was.synced_at ?? "the last upload"}`);
    published[slug] = was;
    continue;
  }
  act(`upload ${z.file}, ${mb(z.bytes)}${have ? ", in place of the one there" : ""}`, "release", "upload", TAG, path.join(dir, z.file), "--clobber");
  published[slug] = z;
  changed++;
}
const wanted = new Set(Object.values(local).map((z) => z.file));
for (const name of assets.keys()) {
  if (name.endsWith(".zip") && !wanted.has(name)) {
    act(`remove ${name}: the hub no longer carries that universe`, "release", "delete-asset", TAG, name, "--yes");
    changed++;
  }
}
if (changed || !assets.has("universes.json")) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "uvr-"));
  const index = path.join(tmp, "universes.json");
  fs.writeFileSync(index, JSON.stringify(published, null, 1) + "\n");
  act("upload universes.json", "release", "upload", TAG, index, "--clobber");
}

if (!dry) {
  const after = new Map(JSON.parse(gh("release", "view", TAG, "--json", "assets")).assets.map((a) => [a.name, a]));
  for (const z of Object.values(published)) {
    const got = after.get(z.file)?.size;
    if (got !== z.bytes) throw new Error(`${z.file} on the release is ${got ?? "missing"}, expected ${z.bytes} bytes`);
  }
  if (!after.has("universes.json")) throw new Error("universes.json is missing from the release");
}
console.log(
  `${dry ? "dry run: " : ""}${changed ? `${changed} change${changed === 1 ? "" : "s"} to` : "nothing to change on"} the release ${TAG}; it ${dry ? "would hold" : "holds"} ` +
    Object.values(published).map((z) => `${z.file} (${mb(z.bytes)})`).join(", ")
);
