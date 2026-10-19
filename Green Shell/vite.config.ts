import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

export default defineConfig({
  plugins: [react(), universeZips()],
  base: "./",
  build: { outDir: "dist", assetsInlineLimit: 0 },
});

/* ------------------------------------------------------- universe ZIPs
 *
 * Each universe under public/universes/<slug>/ is also offered whole, as
 * <slug>.zip, in the layout of the export ZIPs the hub syncs from:
 *
 *   <slug>/SUMMARY.json        what the universe is and which version this is
 *   <slug>/MANIFEST.csv        every file, its size and its SHA-256
 *   <slug>/MISSING_FILES.txt   only when a Files record has no preview stored
 *   <slug>/seed/, docs/, files/  exactly as stored, the folder tree intact
 *
 * The ZIPs are packed here, at build time, from the same files the build
 * publishes, so a ZIP can never describe a version other than the one the hub
 * serves. viewer/ is the hub's own copy of the viewer program, not part of the
 * universe, and is left out.
 *
 * They are not part of the site. They go to universe-zips/, beside dist/, with
 * universes.json, and the deploy workflow attaches them to the GitHub release
 * `universes`, uploading a ZIP only when its contents changed
 * (scripts/universes_release.mjs). The buttons link there. The sizes go into
 * the bundle as import.meta.env.UNIVERSE_ZIPS for their labels.
 * `python scripts/universes.py verify-zips universe-zips` checks every ZIP
 * against the stored universe, file by file.
 */

const UNIVERSES = "public/universes";
const LEDGER = "scripts/universes.lock.json";
const OUT = "universe-zips";
/** Already compressed: stored as they are, which saves the build the trial. */
const STORE = /\.(jpe?g|png|gif|webp|avif|heic|mp4|mov|m4a|mp3|zip|gz)$/i;

const sha256 = (b: Buffer) => createHash("sha256").update(b).digest("hex");

function universeSlugs(root: string): string[] {
  const dir = path.join(root, UNIVERSES);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((d) => fs.existsSync(path.join(dir, d, "viewer", "page.json")))
    .sort();
}

/** Every file under `dir`, as sorted POSIX paths relative to it. */
function walk(dir: string, rel = ""): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
    const p = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(dir, p));
    else if (e.isFile()) out.push(p);
  }
  return out.sort();
}

const csvField = (s: string) => (/[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);

/** The universe's files, keyed by their path inside `<slug>/`. */
function universeTree(root: string, slug: string): Map<string, Buffer> {
  const dir = path.join(root, UNIVERSES, slug);
  const read = (p: string) => fs.readFileSync(path.join(dir, p));
  const files = new Map<string, Buffer>();
  for (const p of walk(dir)) if (!p.startsWith("viewer/")) files.set(p, read(p));

  const page = JSON.parse(read("viewer/page.json").toString("utf8"));
  const data = JSON.parse(read("viewer/data.json").toString("utf8"));
  const ledgerPath = path.join(root, LEDGER);
  const entry = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, "utf8")).universes?.[slug] : undefined;

  // A Files record with no preview stored: the original site never had one.
  // A byte-identical copy elsewhere in the universe is named, by SHA-256.
  const fsSeed = files.has("seed/filesystem.json") ? JSON.parse(files.get("seed/filesystem.json")!.toString("utf8")) : null;
  const missing: string[] = [];
  const elsewhere: Record<string, string> = {};
  for (const f of fsSeed?.files ?? []) {
    if (!f?.viewer_external || !f.viewer_uri || typeof f.path !== "string") continue;
    const p = f.path.replace(/^\/+/, "");
    if (files.has(`files/filesystem/${p}`)) continue;
    const leaf = p.split("/").pop();
    const copy = f.sha256 ? [...files].find(([q, b]) => q.split("/").pop() === leaf && sha256(b) === f.sha256)?.[0] : undefined;
    if (copy) elsewhere[p] = copy;
    else missing.push(p);
  }

  const byFolder: Record<string, number> = {};
  let bytes = 0;
  for (const [p, b] of files) {
    const parts = p.split("/");
    const folder = parts[0] === "files" && parts.length > 2 ? `files/${parts[1]}` : parts.length > 1 ? parts[0] : ".";
    byFolder[folder] = (byFolder[folder] ?? 0) + 1;
    bytes += b.length;
  }
  const summary = {
    persona: slug,
    name: String(data.c?.PERSONA?.name ?? page.title).split(/,|\(/)[0].trim(),
    source: entry?.source?.origin,
    synced_at: entry?.synced_at,
    exported_from: "Golden Task Hub, Universes tab",
    page_sha256: page.pageSha256,
    fingerprint: entry?.fingerprint,
    apps: page.seed,
    docs: Object.keys(page.markdown ?? {}).filter((k) => page.markdown[k]),
    files_written: files.size,
    bytes,
    by_folder: byFolder,
    missing_files: missing,
    stored_elsewhere: elsewhere,
  };

  const out = new Map<string, Buffer>();
  out.set("SUMMARY.json", Buffer.from(JSON.stringify(summary, null, 1) + "\n"));
  if (missing.length || Object.keys(elsewhere).length) {
    const lines = ["These Files records are listed in the seed, but no preview of them is stored, as on the original viewer site.", ""];
    for (const [p, q] of Object.entries(elsewhere)) lines.push(p, `    a byte-identical copy (its SHA-256 matches the record) is at ${q}`);
    for (const p of missing) lines.push(p, "    no copy of this file is anywhere in the universe");
    out.set("MISSING_FILES.txt", Buffer.from(lines.join("\n") + "\n"));
  }
  for (const [p, b] of files) out.set(p, b);
  const manifest = ["path,bytes,sha256", ...[...out].map(([p, b]) => `${csvField(p)},${b.length},${sha256(b)}`)];
  return new Map([["MANIFEST.csv", Buffer.from(manifest.join("\n") + "\n")], ...out]);
}

let crcTable: Uint32Array | null = null;
function crc32(b: Buffer): number {
  const native = (zlib as unknown as { crc32?: (d: Buffer) => number }).crc32;
  if (native) return native(b) >>> 0;
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c >>> 0;
    }
  }
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** A plain ZIP: UTF-8 names, a folder entry for every folder, each file
 *  deflated when that saves at least 3% and stored otherwise. */
function zipOf(prefix: string, tree: Map<string, Buffer>, when: Date): Buffer {
  const y = Math.min(2107, Math.max(1980, when.getUTCFullYear()));
  const dosTime = (when.getUTCHours() << 11) | (when.getUTCMinutes() << 5) | (when.getUTCSeconds() >> 1);
  const dosDate = ((y - 1980) << 9) | ((when.getUTCMonth() + 1) << 5) | when.getUTCDate();

  const entries: { name: string; data: Buffer | null }[] = [{ name: `${prefix}/`, data: null }];
  const seen = new Set<string>();
  for (const [p, data] of tree) {
    const parts = p.split("/");
    for (let i = 1; i < parts.length; i++) {
      const d = `${prefix}/${parts.slice(0, i).join("/")}/`;
      if (!seen.has(d)) {
        seen.add(d);
        entries.push({ name: d, data: null });
      }
    }
    entries.push({ name: `${prefix}/${p}`, data });
  }
  if (entries.length > 0xffff) throw new Error(`${prefix}.zip: too many entries for a ZIP without ZIP64`);

  const chunks: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const e of entries) {
    const name = Buffer.from(e.name, "utf8");
    const raw = e.data ?? Buffer.alloc(0);
    let method = 0;
    let body = raw;
    if (e.data && raw.length && !STORE.test(e.name)) {
      const d = zlib.deflateRawSync(raw, { level: 9 });
      if (d.length < raw.length * 0.97) {
        method = 8;
        body = d;
      }
    }
    const crc = e.data ? crc32(raw) : 0;
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed: 2.0
    local.writeUInt16LE(0x0800, 6); // the name is UTF-8
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0);
    cen.writeUInt16LE(0x0314, 4); // made by Unix, spec 2.0, so the modes below apply
    cen.writeUInt16LE(20, 6);
    cen.writeUInt16LE(0x0800, 8);
    cen.writeUInt16LE(method, 10);
    cen.writeUInt16LE(dosTime, 12);
    cen.writeUInt16LE(dosDate, 14);
    cen.writeUInt32LE(crc, 16);
    cen.writeUInt32LE(body.length, 20);
    cen.writeUInt32LE(raw.length, 24);
    cen.writeUInt16LE(name.length, 28);
    // extra, comment, disk, internal attributes: all zero
    cen.writeUInt32LE((e.data ? 0o100644 << 16 : (0o40755 << 16) | 0x10) >>> 0, 38);
    cen.writeUInt32LE(offset, 42);
    chunks.push(local, name, body);
    central.push(cen, name);
    offset += local.length + name.length + body.length;
    if (offset > 0xffffffff) throw new Error(`${prefix}.zip: over 4 GB, which needs ZIP64`);
  }
  const dir = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dir.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...chunks, dir, end]);
}

/** The ZIP, and what the release needs to know about it. `contents` is the
 *  SHA-256 of its MANIFEST.csv, which names every file's SHA-256, SUMMARY.json
 *  (and so the sync date) included: it moves exactly when what is inside
 *  moves, whatever the compressor does with the bytes. */
function universeZip(root: string, slug: string) {
  const tree = universeTree(root, slug);
  const summary = JSON.parse(tree.get("SUMMARY.json")!.toString("utf8"));
  const parsed = summary.synced_at ? new Date(summary.synced_at) : null;
  const when = parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date(Date.UTC(1980, 0, 1));
  const zip = zipOf(slug, tree, when);
  const info = {
    file: `${slug}.zip`,
    bytes: zip.length,
    sha256: sha256(zip),
    contents: sha256(tree.get("MANIFEST.csv")!),
    page_sha256: summary.page_sha256,
    fingerprint: summary.fingerprint,
    synced_at: summary.synced_at,
  };
  return { zip, info };
}

function universeZips(): Plugin {
  let root = process.cwd();
  let built: Map<string, ReturnType<typeof universeZip>> | null = null;
  return {
    name: "universe-zips",
    config(cfg, env) {
      root = path.resolve(cfg.root ?? process.cwd());
      if (env.command !== "build" || cfg.build?.ssr) return;
      built = new Map(universeSlugs(root).map((s) => [s, universeZip(root, s)]));
      const sizes = Object.fromEntries([...built].map(([s, b]) => [s, b.info.bytes]));
      return { define: { "import.meta.env.UNIVERSE_ZIPS": JSON.stringify(sizes) } };
    },
    writeBundle() {
      if (!built) return;
      const dir = path.join(root, OUT);
      fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });
      for (const { zip, info } of built.values()) fs.writeFileSync(path.join(dir, info.file), zip);
      const index = Object.fromEntries([...built].map(([s, b]) => [s, b.info]));
      fs.writeFileSync(path.join(dir, "universes.json"), JSON.stringify(index, null, 1) + "\n");
    },
  };
}
