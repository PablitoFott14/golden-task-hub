#!/usr/bin/env python3
"""
Keep the hub's persona universes in step with their sources.

The Universes tab runs each persona's own viewer program inside the hub. This
script is the only thing that writes what it runs, under
``public/universes/<slug>/``, and it stores every viewer as a *lossless*
decomposition of the original page:

    viewer/page.json    the page skeleton, the data slots and the engine's exports
    viewer/engine.js    the viewer's script, its data lines swapped for reads of __UV
    viewer/style.css    the viewer's stylesheet, verbatim
    viewer/body.html    the viewer's body markup, verbatim
    viewer/data.json    the derived constants (counts, nav, persona header) and skins
    seed/<service>.json the seed, in the export ZIP's own format, blobs as file refs
    docs/<doc>.md       memory, tensions, storylines, npcs
    files/...           every blob and every Files preview, by path

Reassembling those parts gives back the original page byte for byte, and
``verify`` checks exactly that against the SHA-256 recorded at import. That is
what "nothing lost" means here: not a resemblance, the same bytes.

Sources, in any mix, all on one command line:

    https://universe-viewers.vercel.app/          the viewer site (every persona on it)
    https://universe-viewers.vercel.app/<slug>/   one persona's viewer page
    <file>.html                                   a viewer page saved to disk
    <export>.zip | <folder>                       an export (SUMMARY.json, seed/, docs/, files/)

A viewer page is the authoritative source: it carries the engine and the
derived constants an export does not. An export identifies the persona, supplies
file bytes and is cross-checked against the viewer page named in its
SUMMARY.json, which is fetched unless --offline is given. Personas with no
source on the command line are still checked against the live site, so an
update published there is not missed.

Commands:

    status                  what the hub carries now
    check  <source>...      report what would change; exit 0 in sync, 1 changes, 2 problems
    apply  <source>...      apply the changes, regenerate the catalog, then verify
    verify                  prove every stored universe reassembles and is complete
    verify-zips <dir>       prove the <slug>.zip the build packed (universe-zips/) hold every stored file
    emit-reference <dir>    write the original pages and their files, for the parity test

Never overwrites newer content with older: a version the ledger has seen and
replaced, or a source older than the one in place, is refused. Nothing is
written when any universe has a problem, unless --only names the ones to apply.
"""

from __future__ import annotations

import argparse
import base64
import concurrent.futures as cf
import csv
import datetime as dt
import difflib
import email.utils
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable, Optional

ROOT = Path(__file__).resolve().parents[1]
UNIV = ROOT / "public" / "universes"
CATALOG_TS = ROOT / "src" / "data" / "universeCatalog.ts"
LEDGER = ROOT / "scripts" / "universes.lock.json"

LIVE_ROOT = "https://universe-viewers.vercel.app/"
FORMAT = 1

# The external Files previews sit under this folder beside each viewer page.
RENDERED_DIR = "seed_data_files_rendered/"
# Newer builds also keep media beside the page under this one (Instagram
# photos, PDF pages and image previews), each named by a literal path in the
# data. They are stored under files/ with the same name below it.
MEDIA_DIR = "viewer_previews/"

# How the viewer site's home grid names each app. Everything not listed keeps
# its DATA_NAV label. Checked against the site's own list on every sync.
APP_LABELS = {"filesystem": "Files", "messaging": "Messages", "reminder": "Reminders",
              "blackline": "BlackLine", "oracle_gl": "Oracle GL", "sap_subledger": "SAP Subledger"}

# GitHub refuses a file over 100 MB and warns over 50 MB.
MAX_FILE = 95 * 1024 * 1024
WARN_FILE = 50 * 1024 * 1024

WINDOWS_BAD = re.compile(r'[<>:"|?*\x00-\x1f]')


# ----------------------------------------------------------------- helpers


def sha(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def dump_store(v: Any) -> str:
    """The on-disk JSON format, the export ZIP's own: one space indent, UTF-8."""
    return json.dumps(v, indent=1, ensure_ascii=False)


def canon(v: Any) -> bytes:
    return json.dumps(v, ensure_ascii=False, separators=(",", ":"), sort_keys=False).encode()


def mb(n: int) -> str:
    return f"{n / 1_000_000:.1f} MB"


def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()


def long_path(p: Path) -> str:
    s = str(p)
    if os.name == "nt" and len(s) > 240 and not s.startswith("\\\\?\\"):
        return "\\\\?\\" + os.path.abspath(s)
    return s


def read_bytes(p: Path) -> bytes:
    with open(long_path(p), "rb") as f:
        return f.read()


def write_bytes(p: Path, b: bytes) -> None:
    os.makedirs(long_path(p.parent), exist_ok=True)
    with open(long_path(p), "wb") as f:
        f.write(b)


def http_get(url: str, tries: int = 3) -> tuple[bytes, Optional[str], str]:
    """(body, Last-Modified as ISO, content type). Raises on a final failure."""
    last: Exception | None = None
    for _ in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "universes-sync/1"})
            with urllib.request.urlopen(req, timeout=120) as r:
                body = r.read()
                lm = r.headers.get("Last-Modified")
                iso = None
                if lm:
                    try:
                        iso = email.utils.parsedate_to_datetime(lm).astimezone(dt.timezone.utc).isoformat()
                    except Exception:
                        iso = None
                return body, iso, r.headers.get("Content-Type", "")
        except urllib.error.HTTPError as e:
            if e.code == 404:
                raise
            last = e
        except Exception as e:  # network blips
            last = e
    raise last  # type: ignore[misc]


def quote_path(p: str) -> str:
    """Percent-encode a stored path the way a browser would request it."""
    return urllib.parse.quote(urllib.parse.unquote(p), safe="/")


# ------------------------------------------------------- the page, split


SEED_LINE = re.compile(r'^(SEED\[("(?:[^"\\]|\\.)*")\]\s*=\s*)(.*);$', re.S)
SKIN_LINE = re.compile(r'^(SKIN_HTML\[("(?:[^"\\]|\\.)*")\]\s*=\s*)(.*);$', re.S)
DECL_LINE = re.compile(r"^((?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*)(.*);\s*$", re.S)
SLOT_LINE = re.compile(r'^(.*?)__UV\.(seed|skin|c)\[("(?:[^"\\]|\\.)*")\];$|^(.*?)__UV\.markdown;$', re.S)
FUNC_DECL = re.compile(r"^(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)\s*\(", re.M)
DATA_MIN = 64
# The names universeHost.ts passes the engine as parameters.
RESERVED = ("__UV", "document", "window", "location", "history", "URL")


def dumps_slot(v: Any, compact: bool) -> str:
    """A data line's right side: Python's default form, or the compact one with
    literal Unicode that newer viewer builds write for some of their lines."""
    return json.dumps(v, ensure_ascii=False, separators=(",", ":")) if compact else json.dumps(v)


def json_slot(rhs: str) -> tuple[bool, Any, bool]:
    """A data line is one whose right side is JSON that serialises back exactly,
    in either form. The third value says which."""
    try:
        v = json.loads(rhs)
    except Exception:
        return False, None, False
    for compact in (False, True):
        if dumps_slot(v, compact) == rhs:
            return True, v, compact
    return False, None, False


@dataclass
class Page:
    """A viewer page, split into its parts. ``seed`` holds the inline values."""

    pre: str
    css: str
    mid: str
    body: str
    script_open: str
    tail: str
    lines: list[str]  # the engine, data lines replaced by slots
    seed: dict[str, Any]
    skin: dict[str, Any]
    consts: dict[str, Any]
    markdown: Optional[dict[str, str]]
    title: str
    sha256: str
    size: int
    # The slots written in the compact form ("seed:<name>", "c:<name>", "markdown").
    compact: list[str] = field(default_factory=list)

    @property
    def engine(self) -> str:
        return "\n".join(self.lines)

    def exports(self) -> list[str]:
        seen: list[str] = []
        for m in FUNC_DECL.finditer(self.engine):
            if m.group(1) not in seen:
                seen.append(m.group(1))
        return seen

    def persona_name(self) -> str:
        p = self.consts.get("PERSONA") or {}
        return str(p.get("name") or self.title)


def split_page(text: str) -> Page:
    if "__UV" in text:
        raise ValueError("the page already uses the name __UV, which the hub reserves")
    s0 = text.index("<style>")
    s1 = text.index("</style>", s0)
    b0 = text.index("<body", s1)
    b1 = text.index(">", b0) + 1
    j0 = text.index("<script", b1)
    j1 = text.index(">", j0) + 1
    j2 = text.rindex("</script>")
    pre, css, mid = text[: s0 + 7], text[s0 + 7 : s1], text[s1:b1]
    body, script_open, script, tail = text[b1:j0], text[j0:j1], text[j1:j2], text[j2:]
    tm = re.search(r"<title>(.*?)</title>", pre, re.S)
    lines = script.split("\n")
    seed: dict[str, Any] = {}
    skin: dict[str, Any] = {}
    consts: dict[str, Any] = {}
    markdown: Optional[dict[str, str]] = None
    compact: list[str] = []
    out: list[str] = []
    for line in lines:
        m = SEED_LINE.match(line)
        if m:
            ok, v, cp = json_slot(m.group(3))
            if ok:
                name = json.loads(m.group(2))
                seed[name] = v
                if cp:
                    compact.append(f"seed:{name}")
                out.append(f"{m.group(1)}__UV.seed[{json.dumps(name)}];")
                continue
        m = SKIN_LINE.match(line)
        if m:
            ok, v, cp = json_slot(m.group(3))
            if ok:
                name = json.loads(m.group(2))
                skin[name] = v
                if cp:
                    compact.append(f"skin:{name}")
                out.append(f"{m.group(1)}__UV.skin[{json.dumps(name)}];")
                continue
        m = DECL_LINE.match(line)
        # Only a long literal is data. Short ones (`let _curServer = null;`,
        # `const TZ = "America/Detroit";`) are the engine's own state and stay
        # in the engine, which is just as lossless and keeps state out of data.
        if m and line.rstrip() == line and len(m.group(3)) >= DATA_MIN:
            ok, v, cp = json_slot(m.group(3))
            if ok:
                name = m.group(2)
                if name == "MARKDOWN" and isinstance(v, dict) and all(isinstance(x, str) for x in v.values()):
                    markdown = v
                    if cp:
                        compact.append("markdown")
                    out.append(f"{m.group(1)}__UV.markdown;")
                else:
                    consts[name] = v
                    if cp:
                        compact.append(f"c:{name}")
                    out.append(f"{m.group(1)}__UV.c[{json.dumps(name)}];")
                continue
        out.append(line)
    raw = text.encode()
    page = Page(pre, css, mid, body, script_open, tail, out, seed, skin, consts, markdown,
                (tm.group(1).strip() if tm else ""), sha(raw), len(raw), compact)
    if assemble(page) != text:
        raise ValueError("the page does not reassemble from its parts")
    return page


def assemble(page: Page) -> str:
    lines = []
    for line in page.lines:
        m = SLOT_LINE.match(line)
        if not m:
            lines.append(line)
        elif m.group(2) is None:
            lines.append(f"{m.group(4)}{dumps_slot(page.markdown, 'markdown' in page.compact)};")
        else:
            bucket, name = m.group(2), json.loads(m.group(3))
            src = {"seed": page.seed, "skin": page.skin, "c": page.consts}[bucket]
            lines.append(f"{m.group(1)}{dumps_slot(src[name], f'{bucket}:{name}' in page.compact)};")
    return page.pre + page.css + page.mid + page.body + page.script_open + "\n".join(lines) + page.tail


# ------------------------------------------------------------ blobs in seed


def is_ref(x: Any) -> bool:
    return isinstance(x, dict) and len(x) == 1 and isinstance(x.get("_extracted_to"), str)


def as_text(parent: Any, key: Any) -> bool:
    """A ref under ``content`` of a record that is not base64 encoded holds text."""
    return key == "content" and isinstance(parent, dict) and str(parent.get("encoding") or "").lower() != "base64"


def rehydrate(v: Any, get: Callable[[str], bytes], parent: Any = None, key: Any = None) -> Any:
    if is_ref(v):
        b = get(v["_extracted_to"])
        return b.decode("utf-8") if as_text(parent, key) else base64.b64encode(b).decode("ascii")
    if isinstance(v, dict):
        return {k: rehydrate(x, get, v, k) for k, x in v.items()}
    if isinstance(v, list):
        return [rehydrate(x, get, v, i) for i, x in enumerate(v)]
    return v


def refs_in(v: Any, out: Optional[list[str]] = None) -> list[str]:
    out = [] if out is None else out
    if is_ref(v):
        out.append(v["_extracted_to"])
    elif isinstance(v, dict):
        for x in v.values():
            refs_in(x, out)
    elif isinstance(v, list):
        for x in v:
            refs_in(x, out)
    return out


B64 = re.compile(r"^[A-Za-z0-9+/]+={0,2}$")
HEX = re.compile(r"^[0-9a-fA-F]+$")
MIME_EXT = {"image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif", "image/webp": ".webp",
            "application/pdf": ".pdf", "video/mp4": ".mp4", "video/quicktime": ".mov"}


def sniff_ext(b: bytes) -> str:
    if b[:3] == b"\xff\xd8\xff":
        return ".jpg"
    if b[:8] == b"\x89PNG\r\n\x1a\n":
        return ".png"
    if b[:4] == b"%PDF":
        return ".pdf"
    if b[:4] == b"GIF8":
        return ".gif"
    if b[4:8] == b"ftyp":
        return ".mp4"
    if b[:2] == b"PK":
        return ".zip"
    return ".bin"


def safe_name(s: str) -> str:
    s = re.sub(r'[<>:"|?*\\/\x00-\x1f]+', "_", s).strip(". ")
    return s or "file"


def externalize(service: str, value: Any, prior: dict[str, str], prior_bytes: Callable[[str], Optional[bytes]]) -> tuple[Any, dict[str, bytes]]:
    """Inline blobs -> refs, for a seed that came from a page. A blob at a
    position that held the same bytes before keeps its old file name, so a
    re-import does not rename anything. ``prior`` maps a JSON path to a ref."""
    files: dict[str, bytes] = {}

    def place(want: str, b: bytes) -> str:
        path = want
        n = 1
        while path in files and files[path] != b:
            stem, ext = os.path.splitext(want)
            path = f"{stem}__{sha(b)[:8]}{ext}" if n == 1 else f"{stem}__{sha(b)[:8]}_{n}{ext}"
            n += 1
        files[path] = b
        return path

    def name_for(jpath: str, parent: Any, key: Any, b: bytes) -> str:
        old = prior.get(jpath)
        if old and prior_bytes(old) == b:
            return old
        if service == "filesystem" and isinstance(parent, dict) and parent.get("path"):
            return "files/filesystem/" + str(parent["path"]).lstrip("/")
        if re.search(r"\.attachments$", jpath.rsplit("[", 1)[0]) or ".attachments." in jpath:
            return f"files/email_attachments/{service}/{safe_name(str(key))}"
        if isinstance(parent, dict) and (parent.get("id") or parent.get("asset_id")):
            ident = str(parent.get("id") or parent.get("asset_id"))
            rel = str(parent.get("rel_path") or parent.get("path") or parent.get("filename") or "")
            base = os.path.basename(rel)
            ext = os.path.splitext(base)[1] or MIME_EXT.get(str(parent.get("mime_type") or ""), "") or sniff_ext(b)
            nm = f"{ident}__{os.path.splitext(base)[0]}{ext}" if base else f"{ident}{ext}"
            return f"files/{service}_media/{safe_name(nm)}"
        return f"files/blobs/{sha(b)[:16]}{sniff_ext(b)}"

    def blob_key(parent: Any, key: Any, jpath: str) -> bool:
        k = str(key).lower()
        if "base64" in k or "b64" in k:
            return True
        if k == "content" and isinstance(parent, dict) and str(parent.get("encoding") or "").lower() == "base64":
            return True
        return bool(re.search(r"\.attachments\.[^.\[]+$", jpath) or re.search(r"\.attachments\.", jpath))

    def walk(v: Any, jpath: str, parent: Any, key: Any) -> Any:
        if isinstance(v, str) and len(v) >= 64:
            if as_text(parent, key) and service == "filesystem" and isinstance(parent, dict) and parent.get("path"):
                b = v.encode("utf-8")
                return {"_extracted_to": place(name_for(jpath, parent, key, b), b)}
            if (len(v) % 4 == 0 and B64.match(v) and not as_text(parent, key) and not HEX.match(v)
                    and (blob_key(parent, key, jpath) or len(v) >= 16384)):
                try:
                    b = base64.b64decode(v, validate=True)
                except Exception:
                    return v
                if base64.b64encode(b).decode("ascii") == v:
                    return {"_extracted_to": place(name_for(jpath, parent, key, b), b)}
            return v
        if isinstance(v, dict):
            return {k: walk(x, f"{jpath}.{k}", v, k) for k, x in v.items()}
        if isinstance(v, list):
            return [walk(x, f"{jpath}[{i}]", v, i) for i, x in enumerate(v)]
        return v

    return walk(value, service, None, None), files


def media_paths(page: Page) -> list[str]:
    """The files under viewer_previews/ that the page's seed and constants name."""
    out: dict[str, None] = {}

    def walk(v: Any) -> None:
        if isinstance(v, str):
            if v.startswith(MEDIA_DIR):
                out[v[len(MEDIA_DIR):]] = None
        elif isinstance(v, dict):
            for x in v.values():
                walk(x)
        elif isinstance(v, list):
            for x in v:
                walk(x)

    walk(page.seed)
    walk(page.consts)
    return list(out)


def ref_positions(v: Any, jpath: str, out: dict[str, str]) -> dict[str, str]:
    if is_ref(v):
        out[jpath] = v["_extracted_to"]
    elif isinstance(v, dict):
        for k, x in v.items():
            ref_positions(x, f"{jpath}.{k}", out)
    elif isinstance(v, list):
        for i, x in enumerate(v):
            ref_positions(x, f"{jpath}[{i}]", out)
    return out


# ------------------------------------------------------------- a universe


@dataclass
class Universe:
    """Everything the hub stores for one persona, in memory."""

    slug: str
    page: Page  # with inline seed and markdown, so it reassembles
    stored_seed: dict[str, Any]  # with refs
    files: dict[str, bytes]  # files/... blobs and previews, by path
    source: dict[str, Any] = field(default_factory=dict)
    notes: list[str] = field(default_factory=list)

    # External previews: the Files records whose bytes sit beside the page.
    def externals(self) -> list[dict[str, Any]]:
        fs = self.page.seed.get("filesystem") or {}
        return [f for f in (fs.get("files") or []) if isinstance(f, dict) and f.get("viewer_external") and f.get("viewer_uri")]

    def rendered(self) -> Optional[dict[str, Any]]:
        v = self.page.consts.get("VA_RENDERED")
        return v if isinstance(v, dict) else None

    def needed_externals(self) -> list[dict[str, Any]]:
        r = self.rendered()
        return [f for f in self.externals() if r is None or r.get(str(f.get("path") or ""))]

    def media(self) -> list[str]:
        """The viewer_previews/ files the page needs, as stored paths."""
        return ["files/" + MEDIA_DIR + p for p in media_paths(self.page)]

    def asset_digest(self) -> str:
        items = sorted((p, sha(b)) for p, b in self.files.items())
        return sha("\n".join(f"{p} {h}" for p, h in items).encode())

    def fingerprint(self) -> str:
        return sha(f"{self.page.sha256}\n{self.asset_digest()}".encode())

    def payload(self) -> dict[str, bytes]:
        """Every file under public/universes/<slug>/, path -> bytes."""
        p = self.page
        md_files: dict[str, Optional[str]] = {}
        out: dict[str, bytes] = {}
        if p.markdown is not None:
            for k, v in p.markdown.items():
                if v:
                    out[f"docs/{safe_name(k)}.md"] = v.encode("utf-8")
                    md_files[k] = f"docs/{safe_name(k)}.md"
                else:
                    md_files[k] = None
        for svc, v in self.stored_seed.items():
            out[f"seed/{safe_name(svc)}.json"] = dump_store(v).encode("utf-8")
        for path, b in self.files.items():
            out[path] = b
        refs = sorted(set(r for v in self.stored_seed.values() for r in refs_in(v)))
        ext_paths = sorted(set("files/filesystem/" + str(f["path"]).lstrip("/") for f in self.needed_externals()))
        load_bytes = sum(len(out[x]) for x in out if x.startswith(("seed/", "docs/"))) + sum(len(self.files[r]) for r in refs if r in self.files)
        out["viewer/engine.js"] = p.engine.encode("utf-8")
        out["viewer/style.css"] = p.css.encode("utf-8")
        out["viewer/body.html"] = p.body.encode("utf-8")
        out["viewer/data.json"] = dump_store({"c": p.consts, "skin": p.skin}).encode("utf-8")
        meta = {
            "format": FORMAT,
            "slug": self.slug,
            "title": p.title,
            "pre": p.pre,
            "mid": p.mid,
            "scriptOpen": p.script_open,
            "tail": p.tail,
            "seed": list(p.seed.keys()),
            "skin": list(p.skin.keys()),
            "markdown": md_files if p.markdown is not None else None,
            **({"compact": p.compact} if p.compact else {}),
            "exports": p.exports(),
            "externals": ext_paths,
            "renderedPrefix": RENDERED_DIR,
            "pageSha256": p.sha256,
            "pageBytes": p.size,
        }
        viewer_bytes = sum(len(out[k]) for k in ("viewer/engine.js", "viewer/style.css", "viewer/body.html", "viewer/data.json"))
        meta["loadBytes"] = load_bytes + viewer_bytes
        out["viewer/page.json"] = dump_store(meta).encode("utf-8")
        return out


def load_current(slug: str) -> Optional[Universe]:
    d = UNIV / slug
    pj = d / "viewer" / "page.json"
    if not os.path.exists(long_path(pj)):
        return None
    meta = json.loads(read_bytes(pj))
    data = json.loads(read_bytes(d / "viewer" / "data.json"))
    stored = {svc: json.loads(read_bytes(d / "seed" / f"{safe_name(svc)}.json")) for svc in meta["seed"]}
    files: dict[str, bytes] = {}
    fdir = d / "files"
    if os.path.isdir(long_path(fdir)):
        for root, _, names in os.walk(long_path(fdir)):
            for n in names:
                full = Path(root) / n
                rel = os.path.relpath(str(full), long_path(d)).replace("\\", "/")
                files[rel] = read_bytes(full)
    md = None
    if meta.get("markdown") is not None:
        md = {k: (read_bytes(d / v).decode("utf-8") if v else "") for k, v in meta["markdown"].items()}

    def get(p: str) -> bytes:
        if p not in files:
            raise FileNotFoundError(f"{slug}: {p} is referenced by the seed and missing")
        return files[p]

    seed = {svc: rehydrate(v, get) for svc, v in stored.items()}
    engine = read_bytes(d / "viewer" / "engine.js").decode("utf-8")
    page = Page(meta["pre"], read_bytes(d / "viewer" / "style.css").decode("utf-8"), meta["mid"],
                read_bytes(d / "viewer" / "body.html").decode("utf-8"), meta["scriptOpen"], meta["tail"],
                engine.split("\n"), seed, data["skin"], data["c"], md, meta.get("title", ""), "", 0,
                list(meta.get("compact") or []))
    text = assemble(page).encode()
    page.sha256, page.size = sha(text), len(text)
    u = Universe(slug, page, stored, files)
    return u


# ------------------------------------------------------------- the sources


@dataclass
class Export:
    slug: str
    summary: dict[str, Any]
    seed: dict[str, Any]  # stored form, with refs
    docs: dict[str, str]
    files: dict[str, bytes]
    origin: str
    time: Optional[str]


@dataclass
class PageSource:
    slug: str
    page: Page
    origin: str  # a URL or a file name
    base_url: Optional[str]  # where seed_data_files_rendered/ lives, for a URL
    base_dir: Optional[Path]  # the same, for a file on disk
    time: Optional[str]
    live: bool = False


def slug_of(name: str) -> str:
    first = re.split(r",|\(", name)[0].strip()
    return re.sub(r"[^a-z0-9]+", "-", first.lower()).strip("-")


def read_export_tree(get: Callable[[str], Optional[bytes]], names: list[str], prefix: str, origin: str, time: Optional[str]) -> Export:
    summary = json.loads(get(prefix + "SUMMARY.json") or b"{}")
    slug = str(summary.get("persona") or prefix.rstrip("/").split("/")[-1])
    seed = {}
    docs = {}
    files = {}
    for n in names:
        if not n.startswith(prefix) or n.endswith("/"):
            continue
        rel = n[len(prefix):]
        if rel.startswith("seed/") and rel.endswith(".json") and rel.count("/") == 1:
            seed[rel[5:-5]] = json.loads(get(n) or b"null")
        elif rel.startswith("docs/") and rel.endswith(".md") and rel.count("/") == 1:
            docs[rel[5:-3]] = (get(n) or b"").decode("utf-8")
        elif rel.startswith("files/"):
            b = get(n)
            if b is not None:
                files[rel] = b
    return Export(slug, summary, seed, docs, files, origin, time)


def exports_from_zip(path: Path) -> tuple[list[Export], list[PageSource]]:
    z = zipfile.ZipFile(long_path(path))
    names = z.namelist()
    roots = [n[: -len("SUMMARY.json")] for n in names if n.endswith("SUMMARY.json")]
    times = [dt.datetime(*i.date_time).astimezone(dt.timezone.utc) for i in z.infolist() if not i.is_dir()]
    t = max(times).isoformat() if times else None

    def get(n: str) -> Optional[bytes]:
        try:
            return z.read(n)
        except KeyError:
            return None

    exps = [read_export_tree(get, names, r, path.name, t) for r in roots]
    pages = []
    for n in names:
        if n.endswith(".html"):
            b = z.read(n)
            if b"const SEED = {}" in b:
                pg = split_page(b.decode("utf-8"))
                pages.append(PageSource(slug_of(pg.persona_name()), pg, f"{path.name}:{n}", None, None, t))
    return exps, pages


def exports_from_dir(path: Path) -> tuple[list[Export], list[PageSource]]:
    exps, pages = [], []
    for root, dirs, names in os.walk(long_path(path)):
        rp = Path(root)
        if "SUMMARY.json" in names:
            files = []
            for r2, _, n2 in os.walk(root):
                for n in n2:
                    files.append(os.path.relpath(os.path.join(r2, n), root).replace("\\", "/"))
            mt = max(os.path.getmtime(os.path.join(root, f)) for f in files)
            t = dt.datetime.fromtimestamp(mt, dt.timezone.utc).isoformat()

            def get(n: str, base: str = root) -> Optional[bytes]:
                p = os.path.join(base, n)
                return read_bytes(Path(p)) if os.path.exists(p) else None

            exps.append(read_export_tree(get, files, "", rp.name, t))
            dirs[:] = []
            continue
        for n in names:
            if n.endswith(".html"):
                b = read_bytes(rp / n)
                if b"const SEED = {}" in b:
                    pg = split_page(b.decode("utf-8"))
                    t = dt.datetime.fromtimestamp(os.path.getmtime(rp / n), dt.timezone.utc).isoformat()
                    pages.append(PageSource(slug_of(pg.persona_name()), pg, n, None, rp, t))
    return exps, pages


SHELL_P = re.compile(r"const P = (\[.*?\]);", re.S)


def fetch_live(url: str, slug_hint: Optional[str] = None) -> tuple[list[PageSource], Optional[list[dict[str, Any]]]]:
    body, lm, _ = http_get(url)
    text = body.decode("utf-8")
    m = SHELL_P.search(text)
    if m and "const SEED = {}" not in text:
        personas = json.loads(m.group(1))
        out = []
        for p in personas:
            purl = urllib.parse.urljoin(url, p["slug"] + "/")
            out.extend(fetch_live(purl, p["slug"])[0])
        return out, personas
    pg = split_page(text)
    slug = slug_hint or url.rstrip("/").split("/")[-1] or slug_of(pg.persona_name())
    base = url if url.endswith("/") else url.rsplit("/", 1)[0] + "/"
    return [PageSource(slug, pg, url, base, None, lm, live=True)], None


# ---------------------------------------------------------------- reports


def id_key(rows: list[Any]) -> Optional[str]:
    if not rows or not all(isinstance(r, dict) for r in rows):
        return None
    keys = [k for k in rows[0].keys() if k == "id" or k.endswith("_id")]
    keys.sort(key=lambda k: (k != "id", list(rows[0].keys()).index(k)))
    for k in keys:
        vals = [r.get(k) for r in rows]
        if all(isinstance(v, (str, int)) for v in vals) and len(set(vals)) == len(vals):
            return k
    return None


def diff_service(old: Any, new: Any) -> list[str]:
    out = []
    if not isinstance(old, dict) or not isinstance(new, dict):
        return ["replaced"] if canon(old) != canon(new) else []
    for k in list(dict.fromkeys(list(old.keys()) + list(new.keys()))):
        if k not in new:
            out.append(f"{k}: collection removed")
            continue
        if k not in old:
            n = len(new[k]) if isinstance(new[k], list) else 1
            out.append(f"{k}: collection added ({n})")
            continue
        a, b = old[k], new[k]
        if canon(a) == canon(b):
            continue
        if isinstance(a, list) and isinstance(b, list):
            key = id_key(a) if id_key(a) == id_key(b) else None
            if key:
                ma = {r[key]: r for r in a}
                mb_ = {r[key]: r for r in b}
                add = [x for x in mb_ if x not in ma]
                rem = [x for x in ma if x not in mb_]
                chg = [x for x in mb_ if x in ma and canon(ma[x]) != canon(mb_[x])]
                order = not add and not rem and not chg
                bits = []
                if add:
                    bits.append(f"+{len(add)} added")
                if chg:
                    bits.append(f"~{len(chg)} changed")
                if rem:
                    bits.append(f"-{len(rem)} removed")
                if order:
                    bits.append("reordered")
                out.append(f"{k}: " + ", ".join(bits) + f" ({len(a)} -> {len(b)})")
            else:
                ha = [sha(canon(x)) for x in a]
                hb = [sha(canon(x)) for x in b]
                add = len([h for h in hb if h not in set(ha)])
                rem = len([h for h in ha if h not in set(hb)])
                out.append(f"{k}: {add} rows new, {rem} rows gone ({len(a)} -> {len(b)})")
        else:
            out.append(f"{k}: changed")
    return out


def diff_text(a: str, b: str) -> str:
    sm = difflib.SequenceMatcher(None, a.split("\n"), b.split("\n"), autojunk=False)
    plus = minus = 0
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag in ("replace", "delete"):
            minus += i2 - i1
        if tag in ("replace", "insert"):
            plus += j2 - j1
    return f"+{plus}/-{minus} lines"


def report(old: Optional[Universe], new: Universe) -> list[str]:
    if old is None:
        p = new.page
        return [f"new universe: {len(p.seed)} services, {len(p.markdown or {})} docs, {len(new.files)} files"]
    out: list[str] = []
    for svc in dict.fromkeys(list(old.page.seed) + list(new.page.seed)):
        if svc not in new.page.seed:
            out.append(f"service {svc}: removed")
        elif svc not in old.page.seed:
            out.append(f"service {svc}: added")
        else:
            for line in diff_service(old.page.seed[svc], new.page.seed[svc]):
                out.append(f"{svc}.{line}")
    om, nm = old.page.markdown or {}, new.page.markdown or {}
    for k in dict.fromkeys(list(om) + list(nm)):
        if om.get(k, "") != nm.get(k, ""):
            out.append(f"doc {k}: " + ("added" if not om.get(k) else "emptied" if not nm.get(k) else diff_text(om[k], nm[k])))
    of, nf = old.files, new.files
    add = sorted(set(nf) - set(of))
    rem = sorted(set(of) - set(nf))
    chg = sorted(p for p in set(nf) & set(of) if of[p] != nf[p])
    for label, items in (("added", add), ("changed", chg), ("removed", rem)):
        if items:
            shown = ", ".join(x.split("/", 1)[-1] for x in items[:6]) + (f" and {len(items) - 6} more" if len(items) > 6 else "")
            out.append(f"files {label}: {len(items)} ({shown})")
    if old.page.engine != new.page.engine:
        out.append(f"viewer engine: {diff_text(old.page.engine, new.page.engine)}")
    if old.page.css != new.page.css:
        out.append(f"viewer stylesheet: {diff_text(old.page.css, new.page.css)}")
    if old.page.body != new.page.body:
        out.append(f"viewer markup: {diff_text(old.page.body, new.page.body)}")
    if (old.page.pre, old.page.mid, old.page.tail) != (new.page.pre, new.page.mid, new.page.tail):
        out.append("viewer page head changed")
    for k in dict.fromkeys(list(old.page.consts) + list(new.page.consts)):
        a, b = old.page.consts.get(k), new.page.consts.get(k)
        if canon(a) != canon(b):
            if k == "COUNTS" and isinstance(a, dict) and isinstance(b, dict):
                moved = [f"{s} {a.get(s)}->{b.get(s)}" for s in dict.fromkeys(list(a) + list(b)) if a.get(s) != b.get(s)]
                out.append("counts: " + ", ".join(moved[:8]))
            elif k not in ("DATA_NAV",):
                out.append(f"constant {k}: {'added' if a is None else 'removed' if b is None else 'changed'}")
    for k in dict.fromkeys(list(old.page.skin) + list(new.page.skin)):
        if old.page.skin.get(k) != new.page.skin.get(k):
            out.append(f"skin {k}: changed")
    return out or ["no visible change (re-encoded only)"]


# ------------------------------------------------------------ resolution


class Problem(Exception):
    pass


def build_from_page(src: PageSource, export: Optional[Export], current: Optional[Universe],
                    fetch_assets: bool) -> Universe:
    """The universe a viewer page describes, with the export's storage where
    the two agree and every Files preview the page needs."""
    page = src.page
    files: dict[str, bytes] = {}
    stored: dict[str, Any] = {}
    exp_ok = False
    if export is not None:
        exp_md = {k: export.docs.get(k, "") for k in (page.markdown or {})}
        try:
            exp_seed = {svc: rehydrate(v, lambda p: export.files[p]) for svc, v in export.seed.items()}
        except KeyError as e:
            raise Problem(f"export {export.origin} references {e} and does not carry it")
        # An export lists its services in archive order and the page in its
        # own, so the services are compared as a set and stored in page order.
        same_seed = set(exp_seed) == set(page.seed) and all(json.dumps(exp_seed[s]) == json.dumps(page.seed[s]) for s in page.seed)
        same_docs = page.markdown is None or exp_md == page.markdown
        exp_ok = same_seed and same_docs
    if exp_ok and export is not None:
        stored = {svc: export.seed[svc] for svc in page.seed}
        for svc, v in stored.items():
            for r in refs_in(v):
                files[r] = export.files[r]
    else:
        prior: dict[str, str] = {}
        if current is not None:
            for svc, v in current.stored_seed.items():
                ref_positions(v, svc, prior)
        cur_files = current.files if current else {}
        for svc, v in page.seed.items():
            st, fb = externalize(svc, v, prior, lambda p: cur_files.get(p))
            stored[svc] = st
            for p_, b in fb.items():
                if p_ in files and files[p_] != b:
                    raise Problem(f"two services want to store different bytes at {p_}")
                files[p_] = b
    # The Files previews served beside the page.
    rendered = page.consts.get("VA_RENDERED")
    fs_rows = [f for f in ((page.seed.get("filesystem") or {}).get("files") or [])
               if isinstance(f, dict) and f.get("viewer_external") and f.get("viewer_uri")]
    need = [f for f in fs_rows if not isinstance(rendered, dict) or rendered.get(str(f.get("path") or ""))]
    missing: list[str] = []
    pending: list[tuple[dict[str, Any], str]] = []
    for f in need:
        path = "files/filesystem/" + str(f["path"]).lstrip("/")
        want = f.get("sha256")
        want_size = f.get("size_bytes") or f.get("size")

        def good(b: Optional[bytes]) -> bool:
            if b is None:
                return False
            if want:
                return sha(b) == want
            return want_size is None or len(b) == int(want_size)

        got = None
        for cand in ((export.files.get(path) if export else None),
                     (current.files.get(path) if current else None),
                     (read_bytes(src.base_dir / RENDERED_DIR / str(f["path"])) if src.base_dir and os.path.exists(long_path(src.base_dir / RENDERED_DIR / str(f["path"]))) else None)):
            if good(cand):
                got = cand
                break
        if got is not None:
            files[path] = got
        elif src.base_url and fetch_assets:
            pending.append((f, path))
        else:
            missing.append(str(f["path"]))
    if pending:
        def pull(item: tuple[dict[str, Any], str]) -> tuple[str, Optional[bytes], dict[str, Any]]:
            f, path = item
            url = urllib.parse.urljoin(src.base_url or "", quote_path(str(f["viewer_uri"])))
            try:
                b, _, _ = http_get(url)
            except Exception:
                return path, None, f
            return path, b, f

        with cf.ThreadPoolExecutor(12) as ex:
            for path, b, f in ex.map(pull, pending):
                want = f.get("sha256")
                if b is not None and (not want or sha(b) == want):
                    files[path] = b
                else:
                    missing.append(str(f["path"]))
    if missing:
        raise Problem(f"{len(missing)} Files previews the page needs could not be found or failed their checksum: "
                      + ", ".join(missing[:5]) + (" ..." if len(missing) > 5 else ""))
    # The media beside the page. The data names them but gives no checksum, so
    # the live site is read again rather than trusting a copy already here.
    media_missing: list[str] = []
    pending_media: list[tuple[str, str]] = []
    for rest in media_paths(page):
        path = "files/" + MEDIA_DIR + rest
        local = src.base_dir / MEDIA_DIR / rest if src.base_dir else None
        got = (export.files.get(path) if export else None) or (
            read_bytes(local) if local and os.path.exists(long_path(local)) else None)
        if got is None and not (src.base_url and fetch_assets) and current is not None:
            got = current.files.get(path)
        if got is not None:
            files[path] = got
        elif src.base_url and fetch_assets:
            pending_media.append((rest, path))
        else:
            media_missing.append(rest)
    if pending_media:
        def pull_media(item: tuple[str, str]) -> tuple[str, str, Optional[bytes]]:
            rest, path = item
            try:
                b, _, ct = http_get(urllib.parse.urljoin(src.base_url or "", quote_path(MEDIA_DIR + rest)))
            except Exception:
                return rest, path, None
            return rest, path, (None if "text/html" in ct else b)

        with cf.ThreadPoolExecutor(12) as ex:
            for rest, path, b in ex.map(pull_media, pending_media):
                if b is not None:
                    files[path] = b
                else:
                    media_missing.append(rest)
    if media_missing:
        raise Problem(f"{len(media_missing)} files the page names under {MEDIA_DIR} could not be found: "
                      + ", ".join(media_missing[:5]) + (" ..." if len(media_missing) > 5 else ""))
    u = Universe(src.slug, page, stored, files)
    u.source = {"kind": "viewer page", "origin": src.origin, "time": src.time}
    if export is not None:
        u.source["export"] = {"origin": export.origin, "time": export.time, "matches_page": exp_ok}
    return u


def build_data_only(export: Export, current: Universe) -> Universe:
    """An export applied over the viewer build in place: the engine, the
    stylesheet, the counts and the persona header stay as they are. Only for
    --data-only, because those numbers then describe the previous build."""
    cp = current.page
    # The services keep the viewer's order; a new one goes at the end.
    order = [s for s in cp.seed if s in export.seed] + [s for s in export.seed if s not in cp.seed]
    try:
        seed = {svc: rehydrate(export.seed[svc], lambda p: export.files[p]) for svc in order}
    except KeyError as e:
        raise Problem(f"export {export.origin} references {e} and does not carry it")
    doc_order = list((export.summary.get("docs") or list((cp.markdown or {}).keys())))
    md = {k: export.docs.get(k, "") for k in (cp.markdown or {})} if cp.markdown is not None else None
    for k in doc_order:
        if md is not None and k not in md:
            md[k] = export.docs.get(k, "")
    consts = json.loads(json.dumps(cp.consts))
    files: dict[str, bytes] = {}
    for v in export.seed.values():
        for r in refs_in(v):
            files[r] = export.files[r]
    # The previous build decided which Files previews it renders. That stands
    # for every record it already had; a record new in this export is rendered
    # when its bytes are here. So a preview the original never served stays
    # unserved, rather than appearing because the export happened to carry it.
    ext = [f for f in ((seed.get("filesystem") or {}).get("files") or []) if isinstance(f, dict) and f.get("viewer_external") and f.get("viewer_uri")]
    before = {str(f.get("path")) for f in ((cp.seed.get("filesystem") or {}).get("files") or []) if isinstance(f, dict)}
    prev = cp.consts.get("VA_RENDERED")
    rendered = {}
    for f in ext:
        p = str(f["path"])
        path = "files/filesystem/" + p.lstrip("/")
        b = export.files.get(path) or current.files.get(path)
        ok = b is not None and (not f.get("sha256") or sha(b) == f["sha256"])
        wanted = (not isinstance(prev, dict)) or (prev.get(p) if p in before else True)
        if ok and wanted:
            files[path] = b
            rendered[p] = 1
        elif wanted and isinstance(prev, dict) and prev.get(p):
            raise Problem(f"the Files preview {p} is rendered in the build in place, and its bytes are not in the export or the hub")
    if isinstance(prev, dict):
        # In the previous build's order, new records after it.
        consts["VA_RENDERED"] = {**{k: 1 for k in prev if k in rendered}, **{k: 1 for k in rendered if k not in prev}}
    # Seed slots follow the export's services, in place of the old ones.
    first = next((i for i, ln in enumerate(cp.lines) if SLOT_LINE.match(ln) and SLOT_LINE.match(ln).group(2) == "seed"), None)
    if first is None:
        raise Problem("the viewer in place has no seed slots to fill")
    slots = [f'SEED[{json.dumps(s)}] = __UV.seed[{json.dumps(s)}];' for s in seed]
    lines = cp.lines[:first] + slots + [ln for ln in cp.lines[first:] if not (SLOT_LINE.match(ln) and SLOT_LINE.match(ln).group(2) == "seed")]
    page = Page(cp.pre, cp.css, cp.mid, cp.body, cp.script_open, cp.tail, lines, seed, cp.skin, consts, md, cp.title, "", 0,
                cp.compact)
    text = assemble(page).encode()
    page.sha256, page.size = sha(text), len(text)
    u = Universe(export.slug, page, {s: export.seed[s] for s in order}, files)
    u.source = {"kind": "export over the previous viewer build", "origin": export.origin, "time": export.time}
    u.notes.append("data only: the nav counts, the overview figures and the persona header still come from the previous viewer build")
    return u


def later(a: Optional[str], b: Optional[str]) -> Optional[bool]:
    """True if a is later than b, None if either is unknown."""
    if not a or not b:
        return None
    return dt.datetime.fromisoformat(a) > dt.datetime.fromisoformat(b)


@dataclass
class Plan:
    slug: str
    status: str  # unchanged | update | new | refused | no-source
    current: Optional[Universe]
    target: Optional[Universe]
    lines: list[str] = field(default_factory=list)
    problems: list[str] = field(default_factory=list)


def plan_all(args: argparse.Namespace) -> tuple[list[Plan], Optional[list[dict[str, Any]]], dict[str, Any]]:
    ledger = load_ledger()
    exports: list[Export] = []
    pages: list[PageSource] = []
    shell: Optional[list[dict[str, Any]]] = None
    notes: list[str] = []
    for s in args.sources:
        if re.match(r"^https?://", s):
            got, sh = fetch_live(s)
            pages.extend(got)
            shell = sh or shell
            continue
        p = Path(s)
        if not os.path.exists(long_path(p)):
            raise SystemExit(f"error: {s} does not exist")
        if p.suffix.lower() == ".zip":
            e, pg = exports_from_zip(p)
        elif p.is_dir():
            e, pg = exports_from_dir(p)
        elif p.suffix.lower() in (".html", ".htm"):
            pgobj = split_page(read_bytes(p).decode("utf-8"))
            t = dt.datetime.fromtimestamp(os.path.getmtime(p), dt.timezone.utc).isoformat()
            e, pg = [], [PageSource(slug_of(pgobj.persona_name()), pgobj, p.name, None, p.parent, t)]
        else:
            raise SystemExit(f"error: {s} is not a ZIP, a folder, a viewer page or a URL")
        if not e and not pg:
            raise SystemExit(f"error: {s} holds no universe export and no viewer page")
        exports.extend(e)
        pages.extend(pg)

    stored = [d.name for d in sorted(UNIV.iterdir()) if (d / "viewer" / "page.json").exists()] if UNIV.exists() else []
    known = list(dict.fromkeys(list(ledger.get("universes", {}).keys()) + stored))
    named = list(dict.fromkeys([e.slug for e in exports] + [p.slug for p in pages]))
    unknown = [s for s in named if s not in known]
    if unknown and not args.add and known:
        raise SystemExit("error: no universe in the hub is called " + ", ".join(unknown)
                         + ". Pass --add to add it as a new universe.")
    slugs = list(dict.fromkeys(known + named))

    # The live site is the authority for every persona the sources do not settle.
    live_pages: dict[str, PageSource] = {}
    if not args.offline:
        want = [s for s in slugs if not any(p.slug == s and p.live for p in pages)]
        if want:
            try:
                got, sh = fetch_live(LIVE_ROOT)
                shell = shell or sh
                for p in got:
                    live_pages[p.slug] = p
            except Exception as e:
                notes.append(f"the live viewer site could not be read ({e}); only the sources given were used")
            for e in exports:
                srcurl = str(e.summary.get("source") or "")
                if srcurl and e.slug not in live_pages and srcurl.startswith("http"):
                    try:
                        live_pages[e.slug] = fetch_live(srcurl, e.slug)[0][0]
                    except Exception as ex:
                        notes.append(f"{e.slug}: {srcurl} could not be read ({ex})")

    plans = []
    for slug in slugs:
        cur = load_current(slug)
        exp = next((e for e in exports if e.slug == slug), None)
        given = [p for p in pages if p.slug == slug]
        live = next((p for p in given if p.live), None) or live_pages.get(slug)
        local = next((p for p in given if not p.live), None)
        plan = Plan(slug, "unchanged", cur, None)
        try:
            src = local or live
            if local and live and local.page.sha256 != live.page.sha256:
                if later(local.time, live.time) is False:
                    raise Problem(f"the live viewer ({live.time}) is newer than {local.origin} ({local.time}); "
                                  "use the live one, or pass a newer page")
                plan.lines.append(f"used {local.origin}, which differs from the live viewer")
            if exp and src:
                target = build_from_page(src, exp, cur, not args.offline)
                if not target.source.get("export", {}).get("matches_page"):
                    newer = later(exp.time, src.time)
                    if newer and args.data_only and cur is not None:
                        target = build_data_only(exp, cur)
                    elif newer:
                        raise Problem(
                            f"{exp.origin} carries data that differs from the viewer page {src.origin}, and it is the newer "
                            "of the two. The hub mirrors viewer builds exactly, so give it the rebuilt viewer page (or wait "
                            "for the live site to redeploy). --data-only applies the export over the current build instead.")
                    else:
                        plan.lines.append(f"{exp.origin} is older than {src.origin} and differs from it; the viewer page was used")
            elif src:
                target = build_from_page(src, None, cur, not args.offline)
            elif exp:
                if args.data_only and cur is not None:
                    target = build_data_only(exp, cur)
                else:
                    raise Problem(f"{exp.origin} is an export with no viewer page to go with it (the live site was not "
                                  "reachable or not consulted). Give the viewer page too, or pass --data-only.")
            else:
                plan.status = "no-source"
                plans.append(plan)
                continue
            plan.target = target
            entry = ledger.get("universes", {}).get(slug, {})
            fp = target.fingerprint()
            if cur is not None and fp == cur.fingerprint():
                plan.status = "unchanged"
            elif fp in [h.get("fingerprint") for h in entry.get("history", [])]:
                raise Problem("this is a version the hub already carried and replaced with a newer one")
            elif cur is not None and later(entry.get("source", {}).get("time"), target.source.get("time")) and not args.allow_older:
                raise Problem(f"the source is dated {target.source.get('time')}, older than the version in place "
                              f"({entry['source']['time']}). Pass --allow-older if that is really wanted.")
            else:
                plan.status = "new" if cur is None else "update"
                plan.lines = plan.lines + report(cur, target)
            plan.lines.extend(target.notes)
        except Problem as e:
            plan.status = "refused"
            plan.problems.append(str(e))
        except urllib.error.URLError as e:
            plan.status = "refused"
            plan.problems.append(f"network: {e}")
        plans.append(plan)
    return plans, shell, {"notes": notes}


# --------------------------------------------------------------- outputs


def load_ledger() -> dict[str, Any]:
    if LEDGER.exists():
        return json.loads(LEDGER.read_text(encoding="utf-8"))
    return {"format": FORMAT, "universes": {}}


def persona_meta(u: Universe, shell: Optional[list[dict[str, Any]]], prev: Optional[dict[str, Any]]) -> dict[str, Any]:
    p = u.page.consts.get("PERSONA") or {}
    nav = u.page.consts.get("DATA_NAV") or []
    apps = sorted(APP_LABELS.get(x.get("id"), x.get("label") or x.get("id")) for x in nav if isinstance(x, dict))
    fs = (u.page.seed.get("filesystem") or {}).get("files") or []
    sh = next((x for x in (shell or []) if x.get("slug") == u.slug), None)
    base = dict(prev or {})
    if sh:
        base.update({k: sh[k] for k in ("hue", "name", "age", "role", "city") if k in sh})
    if not base.get("name"):
        raw = str(p.get("name") or u.page.title)
        base["name"] = re.split(r",|\(", raw)[0].strip()
        m = re.search(r",\s*(\d{1,3})\b", raw)
        base["age"] = m.group(1) if m else ""
        base["role"] = str(p.get("subtitle") or "").split(" · ")[0]
        home = next((x["value"] for x in p.get("identity") or [] if str(x.get("key", "")).lower().startswith("home")), "")
        cm = re.search(r",\s*([A-Z][A-Za-z .'-]+),\s*([A-Z]{2})\b", home)
        base["city"] = f"{cm.group(1)}, {cm.group(2)}" if cm else ""
        base["hue"] = int(sha(u.slug.encode())[:4], 16) % 360
    meta = json.loads(u.payload()["viewer/page.json"])
    return {
        "slug": u.slug,
        "name": base["name"],
        "age": str(base.get("age", "")),
        "role": base.get("role", ""),
        "city": base.get("city", ""),
        "hue": int(base.get("hue", 0)),
        "apps": apps,
        "files": len(fs),
        "loadBytes": meta["loadBytes"],
        "services": [x.get("id") for x in nav if isinstance(x, dict)],
        "shellApps": sh.get("apps") if sh else None,
    }


def write_catalog(entries: list[dict[str, Any]]) -> str:
    rows = []
    for e in entries:
        rows.append("  {\n" + "\n".join(f"    {k}: {json.dumps(e[k], ensure_ascii=False)}," for k in
                                        ("slug", "name", "age", "role", "city", "hue", "apps", "files", "loadBytes", "services")) + "\n  },")
    return (
        "/**\n"
        " * The universes the Universes tab carries, one entry per persona.\n"
        " *\n"
        " * GENERATED by scripts/universes.py from public/universes/. Do not edit by\n"
        " * hand: run `python scripts/universes.py apply <source>` and this file is\n"
        " * rewritten. `hue`, `name`, `age`, `role` and `city` are the viewer site's own\n"
        " * labels for its home grid; `apps`, `files` and `loadBytes` are read off the\n"
        " * stored data, `loadBytes` being what opening the universe downloads.\n"
        " */\n\n"
        "export interface UniverseEntry {\n"
        "  slug: string;\n  name: string;\n  age: string;\n  role: string;\n  city: string;\n"
        "  /** The persona's accent, an OKLCH hue angle. */\n  hue: number;\n"
        "  apps: string[];\n  /** Files in the persona's Files app. */\n  files: number;\n"
        "  /** Bytes fetched to open the viewer, previews loaded on demand excluded. */\n  loadBytes: number;\n"
        "  /** The data services, in the viewer's nav order. */\n  services: string[];\n"
        "}\n\n"
        "export const universeCatalog: UniverseEntry[] = [\n" + "\n".join(rows) + "\n];\n"
    )


def catalog_entries(universes: dict[str, Universe], shell: Optional[list[dict[str, Any]]]) -> list[dict[str, Any]]:
    prev = {}
    if CATALOG_TS.exists():
        m = re.search(r"universeCatalog: UniverseEntry\[\] = (\[.*\]);", CATALOG_TS.read_text(encoding="utf-8"), re.S)
        if m:
            js = re.sub(r"(\n\s+)([a-zA-Z]+):", r'\1"\2":', m.group(1))
            js = re.sub(r",(\s*[}\]])", r"\1", js)
            try:
                prev = {e["slug"]: e for e in json.loads(js)}
            except Exception:
                prev = {}
    order = [x["slug"] for x in (shell or [])] + list(prev) + list(universes)
    out = []
    for slug in dict.fromkeys(order):
        if slug in universes:
            out.append(persona_meta(universes[slug], shell, prev.get(slug)))
    return out


def git_ignored(paths: list[str]) -> list[str]:
    if not paths:
        return []
    try:
        r = subprocess.run(["git", "-C", str(ROOT), "check-ignore", "--stdin"], input="\n".join(paths),
                           capture_output=True, text=True, encoding="utf-8")
        return [x for x in r.stdout.splitlines() if x.strip()]
    except FileNotFoundError:
        return []


def write_universe(u: Universe) -> tuple[int, int, int]:
    d = UNIV / u.slug
    want = u.payload()
    have: dict[str, Path] = {}
    if os.path.isdir(long_path(d)):
        for root, _, names in os.walk(long_path(d)):
            for n in names:
                full = Path(root) / n
                rel = os.path.relpath(str(full), long_path(d)).replace("\\", "/")
                have[rel] = full
    wrote = removed = kept = 0
    for rel, b in want.items():
        p = d / rel
        if rel in have and read_bytes(have[rel]) == b:
            kept += 1
            continue
        write_bytes(p, b)
        wrote += 1
    for rel, full in have.items():
        if rel not in want:
            os.remove(long_path(full))
            removed += 1
    # Prune folders a removal emptied.
    for root, dirs, names in sorted(os.walk(long_path(d)), key=lambda x: -len(x[0])):
        if not dirs and not names and root != long_path(d):
            os.rmdir(root)
    return wrote, kept, removed


def problems_for(u: Universe) -> list[str]:
    """What would make a universe unsafe to publish."""
    out = []
    payload = u.payload()
    for rel, b in payload.items():
        if WINDOWS_BAD.search(rel.replace("/", "")):
            out.append(f"{rel}: the name has characters Windows cannot store")
        if len(b) > MAX_FILE:
            out.append(f"{rel}: {mb(len(b))} is over GitHub's file limit")
    for svc, v in u.stored_seed.items():
        for r in refs_in(v):
            if r not in u.files:
                out.append(f"seed/{svc}.json references {r}, which is not stored")
    for f in u.needed_externals():
        path = "files/filesystem/" + str(f["path"]).lstrip("/")
        b = u.files.get(path)
        if b is None:
            out.append(f"Files preview {f['path']} is missing")
        elif f.get("sha256") and sha(b) != f["sha256"]:
            out.append(f"Files preview {f['path']} fails its checksum")
    for p in u.media():
        if p not in u.files:
            out.append(f"{p[len('files/'):]} is named by the page and missing")
    # The hub runs the engine with these as parameters, so a top-level
    # declaration of one would be a syntax error there.
    declared = set(re.findall(r"^(?:async\s+)?(?:function\s*\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)", u.page.engine, re.M))
    for bad in RESERVED:
        if bad in declared:
            out.append(f"the engine declares {bad} at its top level, which the hub reserves")
    return out


def warnings_for(u: Universe) -> list[str]:
    out = []
    for rel, b in u.payload().items():
        if len(b) > WARN_FILE:
            out.append(f"{rel} is {mb(len(b))}; GitHub warns on files over 50 MB")
    # The original page blocks every network request with its CSP; the hub
    # cannot, so remote references or live markup in the data are flagged.
    pat = re.compile(r"(src\s*=\s*[\"']?https?://|url\(\s*[\"']?https?://|<script\b|<iframe\b|<link\b|<[^>]*\son[a-z]+\s*=)", re.I)
    hits = 0

    def walk(v: Any) -> None:
        nonlocal hits
        if isinstance(v, str):
            if len(v) < 200_000 and pat.search(v):
                hits += 1
        elif isinstance(v, dict):
            for x in v.values():
                walk(x)
        elif isinstance(v, list):
            for x in v:
                walk(x)

    walk(u.page.seed)
    walk(u.page.markdown or {})
    if hits:
        out.append(f"{hits} strings in the data carry remote references or live markup, which the original page's CSP would block")
    return out


def verify_all(quiet: bool = False) -> int:
    ledger = load_ledger()
    bad = 0
    found = {}
    if not UNIV.exists():
        print("verify: no universes stored")
        return 1
    for d in sorted(UNIV.iterdir()):
        if not (d / "viewer" / "page.json").exists():
            continue
        slug = d.name
        try:
            u = load_current(slug)
        except Exception as e:
            print(f"FAIL {slug}: {e}")
            bad += 1
            continue
        assert u is not None
        found[slug] = u
        errs = problems_for(u)
        meta = json.loads(read_bytes(d / "viewer" / "page.json"))
        if u.page.sha256 != meta.get("pageSha256"):
            errs.append("the stored parts no longer reassemble into the page that was imported")
        entry = ledger.get("universes", {}).get(slug)
        if not entry:
            errs.append("the ledger has no entry for it")
        elif entry.get("fingerprint") != u.fingerprint():
            errs.append("the stored files differ from what the ledger recorded (edited by hand?)")
        disk = u.payload()
        on_disk = {}
        for root, _, names in os.walk(long_path(d)):
            for n in names:
                rel = os.path.relpath(os.path.join(root, n), long_path(d)).replace("\\", "/")
                on_disk[rel] = True
        extra = sorted(set(on_disk) - set(disk))
        if extra:
            errs.append(f"{len(extra)} stray files: {', '.join(extra[:4])}")
        for rel, b in disk.items():
            if rel.startswith("viewer/") or rel.startswith("seed/") or rel.startswith("docs/"):
                if read_bytes(d / rel) != b:
                    errs.append(f"{rel} is not in canonical form")
        ign = git_ignored([str((d / r).relative_to(ROOT)).replace("\\", "/") for r in disk])
        if ign:
            errs.append(f"{len(ign)} files are caught by .gitignore and would never deploy: {', '.join(ign[:3])}")
        if errs:
            bad += 1
            print(f"FAIL {slug}")
            for e in errs:
                print(f"     {e}")
        elif not quiet:
            print(f"OK   {slug}  page {u.page.sha256[:12]} reassembles byte for byte, {len(u.files)} files, "
                  f"{len(u.needed_externals())} previews present")
        for w in warnings_for(u):
            print(f"WARN {slug}: {w}")
    # The catalog must describe what is stored.
    want = write_catalog(catalog_entries(found, None))
    if not CATALOG_TS.exists() or CATALOG_TS.read_text(encoding="utf-8") != want:
        print("FAIL catalog: src/data/universeCatalog.ts does not match the stored universes (run apply)")
        bad += 1
    elif not quiet:
        print(f"OK   catalog lists {len(found)} universes")
    return 0 if not bad else 2


# ------------------------------------------------------------- the ZIPs


ZIP_REPORTS = ("SUMMARY.json", "MANIFEST.csv", "MISSING_FILES.txt")


def zip_missing(u: Universe) -> tuple[list[str], dict[str, str]]:
    """The Files records with no preview stored: those with a byte-identical
    copy elsewhere in the universe (path -> copy), and those with none. The
    same rule the build applies when it writes SUMMARY.json."""
    missing: list[str] = []
    elsewhere: dict[str, str] = {}
    stored = {p: b for p, b in u.payload().items() if not p.startswith("viewer/")}
    for f in (u.stored_seed.get("filesystem") or {}).get("files") or []:
        if not isinstance(f, dict) or not f.get("viewer_external") or not f.get("viewer_uri") or not isinstance(f.get("path"), str):
            continue
        p = f["path"].lstrip("/")
        if f"files/filesystem/{p}" in stored:
            continue
        leaf = p.split("/")[-1]
        copy = next((q for q, b in stored.items() if f.get("sha256") and q.split("/")[-1] == leaf and sha(b) == f["sha256"]), None)
        if copy:
            elsewhere[p] = copy
        else:
            missing.append(p)
    return missing, elsewhere


def extract_with(tool: str, zp: Path, out: Path) -> Optional[str]:
    """Unpack with an extractor other than this script's own. None when it
    worked, else what went wrong."""
    if tool == "tar":
        exe = os.path.join(os.environ.get("SystemRoot", r"C:\Windows"), "System32", "tar.exe")
        cmd = [exe, "-xf", str(zp), "-C", str(out)]
    else:
        cmd = ["powershell", "-NoProfile", "-NonInteractive", "-Command",
               f"Expand-Archive -LiteralPath '{zp}' -DestinationPath '{out}' -Force"]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    return None if r.returncode == 0 else (r.stderr or r.stdout).strip()[:300]


def verify_zips(where: Path) -> int:
    """Each <slug>.zip in `where` (the build's universe-zips/, or the release's
    assets downloaded to a folder) holds every stored file of the
    universe but viewer/, byte for byte, under <slug>/, with a folder entry for
    every folder, a MANIFEST.csv that matches, a SUMMARY.json that names the
    version in place, and nothing else. It is unpacked by Python and, on
    Windows, also by tar.exe and Expand-Archive, and the result compared."""
    zdir = where / "universes" if (where / "universes").is_dir() else where
    ledger = load_ledger()
    slugs = [d.name for d in sorted(UNIV.iterdir()) if (d / "viewer" / "page.json").exists()]
    bad = 0
    for slug in slugs:
        u = load_current(slug)
        assert u is not None
        zp = zdir / f"{slug}.zip"
        errs: list[str] = []
        if not zp.exists():
            print(f"FAIL {slug}: {zp} does not exist (was the hub built?)")
            bad += 1
            continue
        want = {p: b for p, b in u.payload().items() if not p.startswith("viewer/")}
        missing, elsewhere = zip_missing(u)
        files: dict[str, zipfile.ZipInfo] = {}
        dirs: set[str] = set()
        tools: list[str] = []
        try:
            with zipfile.ZipFile(zp) as z:
                crc = z.testzip()
                if crc is not None:
                    errs.append(f"{crc} fails its CRC check")
                infos = z.infolist()
                names = [i.filename for i in infos]
                if len(set(names)) != len(names):
                    errs.append("an entry appears twice")
                for n in names:
                    parts = n.rstrip("/").split("/")
                    if parts[0] != slug or "\\" in n or n.startswith("/") or any(x in ("", ".", "..") for x in parts) or re.match(r"^[A-Za-z]:", n):
                        errs.append(f"unsafe or misplaced entry {n!r}")
                for i in infos:
                    if not i.filename.isascii() and not i.flag_bits & 0x800:
                        errs.append(f"{i.filename}: a non-ASCII name not marked as UTF-8")
                files = {i.filename[len(slug) + 1:]: i for i in infos if not i.is_dir()}
                dirs = {i.filename[len(slug) + 1:] for i in infos if i.is_dir()}
                reports = {r for r in ZIP_REPORTS if r in files}
                gone = sorted(set(want) - set(files))
                extra = sorted(set(files) - set(want) - reports)
                if gone:
                    errs.append(f"{len(gone)} stored files are not in it: {', '.join(gone[:4])}")
                if extra:
                    errs.append(f"{len(extra)} entries are not stored files: {', '.join(extra[:4])}")
                changed = [p for p in want if p in files and z.read(files[p]) != want[p]]
                if changed:
                    errs.append(f"{len(changed)} files differ from the stored ones: {', '.join(changed[:4])}")
                need_dirs = {""} | {"/".join(p.split("/")[:k]) + "/" for p in files for k in range(1, p.count("/") + 1)}
                if dirs != need_dirs:
                    errs.append(f"folder entries: {len(need_dirs - dirs)} missing, {len(dirs - need_dirs)} without a file")
                for r in ("SUMMARY.json", "MANIFEST.csv"):
                    if r not in files:
                        errs.append(f"{r} is missing")
                if bool(missing or elsewhere) != ("MISSING_FILES.txt" in files):
                    errs.append("MISSING_FILES.txt should be there exactly when a Files record has no preview stored")
                if "MANIFEST.csv" in files:
                    rows = list(csv.DictReader(io.StringIO(z.read(files["MANIFEST.csv"]).decode("utf-8"))))
                    listed = {r["path"]: r for r in rows}
                    if set(listed) != set(files) - {"MANIFEST.csv"} or len(listed) != len(rows):
                        errs.append("MANIFEST.csv does not list exactly the other entries")
                    for p, r in listed.items():
                        if p in files:
                            b = z.read(files[p])
                            if int(r["bytes"]) != len(b) or r["sha256"] != sha(b):
                                errs.append(f"MANIFEST.csv is wrong about {p}")
                                break
                if "SUMMARY.json" in files:
                    s = json.loads(z.read(files["SUMMARY.json"]))
                    entry = ledger.get("universes", {}).get(slug, {})
                    expect = {
                        "persona": slug,
                        "page_sha256": u.page.sha256,
                        "apps": list(u.page.seed),
                        "docs": [k for k, v in (u.page.markdown or {}).items() if v],
                        "files_written": len(want),
                        "bytes": sum(len(b) for b in want.values()),
                        "missing_files": missing,
                        "stored_elsewhere": elsewhere,
                    }
                    if entry:
                        expect.update(fingerprint=entry.get("fingerprint"), source=entry.get("source", {}).get("origin"),
                                      synced_at=entry.get("synced_at"))
                    for k, v in expect.items():
                        if s.get(k) != v:
                            errs.append(f"SUMMARY.json says {k} is {str(s.get(k))[:80]}, the hub has {str(v)[:80]}")
                # Unpacked, by more than one extractor, it is the stored tree.
                tools = ["python"] + (["tar", "Expand-Archive"] if os.name == "nt" else [])
                for tool in tools:
                    tmp = Path(tempfile.mkdtemp(prefix="uvz-"))
                    try:
                        if tool == "python":
                            z.extractall(tmp)
                            err = None
                        else:
                            err = extract_with(tool, zp, tmp)
                        if err:
                            errs.append(f"{tool} could not unpack it: {err}")
                            continue
                        got = {}
                        for root, _, ns in os.walk(long_path(tmp / slug)):
                            for n in ns:
                                full = os.path.join(root, n)
                                got[os.path.relpath(full, long_path(tmp / slug)).replace("\\", "/")] = read_bytes(Path(full))
                        unpacked = {p: b for p, b in got.items() if p not in ZIP_REPORTS}
                        if unpacked != want:
                            diff = sorted(set(unpacked) ^ set(want)) or [p for p in want if unpacked.get(p) != want[p]]
                            errs.append(f"unpacked by {tool}, it is not the stored tree: {', '.join(diff[:4])}")
                    finally:
                        shutil.rmtree(long_path(tmp), ignore_errors=True)
        except (zipfile.BadZipFile, zipfile.LargeZipFile, OSError, EOFError, KeyError, ValueError) as e:
            # testzip() names the first damaged member; reading it again raises.
            errs.append(f"it cannot be read: {e}")
        if errs:
            bad += 1
            print(f"FAIL {slug}.zip")
            for e in errs:
                print(f"     {e}")
        else:
            kinds = ", ".join(f"{len([n for n in files if n.startswith(k)])} {k.rstrip('/')}" for k in ("seed/", "docs/", "files/"))
            print(f"OK   {slug}.zip  {mb(zp.stat().st_size)}, {len(files)} files ({kinds}) and {len(dirs)} folders, "
                  f"byte for byte the stored universe; unpacked cleanly by {', '.join(tools)}")
    return 0 if not bad else 2


# ------------------------------------------------------------------ main


def cmd_status() -> int:
    ledger = load_ledger()
    if not UNIV.exists():
        print("No universes stored yet.")
        return 0
    for d in sorted(UNIV.iterdir()):
        pj = d / "viewer" / "page.json"
        if not pj.exists():
            continue
        meta = json.loads(read_bytes(pj))
        e = ledger.get("universes", {}).get(d.name, {})
        src = e.get("source", {})
        print(f"{d.name:16} {meta['title'][:40]:42} synced {e.get('synced_at', '?')[:10]}  "
              f"page {meta['pageSha256'][:12]}  opens {mb(meta['loadBytes'])}  from {src.get('origin', '?')}")
    return 0


def print_plans(plans: list[Plan], extra: dict[str, Any]) -> None:
    for n in extra.get("notes", []):
        print(f"note: {n}")
    for p in plans:
        tag = {"unchanged": "IN SYNC", "update": "CHANGED", "new": "NEW", "refused": "PROBLEM", "no-source": "NO SOURCE"}[p.status]
        print(f"{tag:9} {p.slug}")
        for line in p.lines:
            print(f"          {line}")
        for prob in p.problems:
            print(f"          ! {prob}")


def main() -> int:
    ap = argparse.ArgumentParser(description="Keep the hub's universes in step with their sources.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("status")
    sub.add_parser("verify")
    vz = sub.add_parser("verify-zips")
    vz.add_argument("dist", help="a folder of <slug>.zip: the build's universe-zips/, or the release's assets")
    er = sub.add_parser("emit-reference")
    er.add_argument("dir")
    er.add_argument("slugs", nargs="*")
    for name in ("check", "apply"):
        sp = sub.add_parser(name)
        sp.add_argument("sources", nargs="*")
        sp.add_argument("--offline", action="store_true", help="do not consult the live viewer site")
        sp.add_argument("--only", nargs="*", default=None, help="apply these universes only")
        sp.add_argument("--add", action="store_true", help="allow a universe the hub does not carry yet")
        sp.add_argument("--allow-older", action="store_true", help="accept a source dated before the one in place")
        sp.add_argument("--data-only", action="store_true", help="apply an export over the current viewer build")
    args = ap.parse_args()

    if args.cmd == "status":
        return cmd_status()
    if args.cmd == "verify":
        return verify_all()
    if args.cmd == "verify-zips":
        return verify_zips(Path(args.dist))
    if args.cmd == "emit-reference":
        out = Path(args.dir)
        for d in sorted(UNIV.iterdir()):
            if not (d / "viewer" / "page.json").exists() or (args.slugs and d.name not in args.slugs):
                continue
            u = load_current(d.name)
            assert u is not None
            write_bytes(out / d.name / "index.html", assemble(u.page).encode())
            for f in u.needed_externals():
                b = u.files["files/filesystem/" + str(f["path"]).lstrip("/")]
                write_bytes(out / d.name / RENDERED_DIR.rstrip("/") / Path(str(f["path"])), b)
            for p in u.media():
                write_bytes(out / d.name / p[len("files/"):], u.files[p])
            print(f"wrote {d.name}: page {u.page.sha256[:12]}, {len(u.needed_externals())} previews, {len(u.media())} media")
        return 0

    if not UNIV.exists() and not args.sources:
        raise SystemExit("error: nothing is stored yet, so name at least one source")
    plans, shell, extra = plan_all(args)
    selected = [p for p in plans if args.only is None or p.slug in args.only]
    print_plans(plans, extra)
    problems = [p for p in selected if p.status == "refused"]
    changes = [p for p in selected if p.status in ("update", "new")]
    for p in changes:
        assert p.target is not None
        for e in problems_for(p.target):
            p.problems.append(e)
            print(f"          ! {p.slug}: {e}")
        for w in warnings_for(p.target):
            print(f"          warning: {p.slug}: {w}")
    blocked = problems + [p for p in changes if p.problems]
    if args.cmd == "check":
        if blocked:
            return 2
        return 1 if changes else 0
    if blocked:
        print("\nNothing was written: fix the problems above, or pass --only with the universes that are clean.")
        return 2
    if not changes:
        print("\nIn sync. Nothing to write.")
        return 0
    ledger = load_ledger()
    universes: dict[str, Universe] = {}
    for p in plans:
        if p.status in ("update", "new") and p in changes:
            assert p.target is not None
            universes[p.slug] = p.target
        elif p.current is not None:
            universes[p.slug] = p.current
    for p in changes:
        assert p.target is not None
        wrote, kept, removed = write_universe(p.target)
        old = ledger["universes"].get(p.slug)
        hist = (old.get("history", []) if old else [])
        if old:
            hist = hist + [{k: old[k] for k in ("fingerprint", "page_sha256", "source", "synced_at") if k in old}]
        ledger["universes"][p.slug] = {
            "fingerprint": p.target.fingerprint(),
            "page_sha256": p.target.page.sha256,
            "source": p.target.source,
            "synced_at": now_iso(),
            "notes": p.target.notes,
            "history": hist[-20:],
        }
        print(f"wrote {p.slug}: {wrote} files written, {kept} unchanged, {removed} removed")
    CATALOG_TS.write_text(write_catalog(catalog_entries(universes, shell)), encoding="utf-8", newline="\n")
    LEDGER.write_text(json.dumps(ledger, indent=1, ensure_ascii=False) + "\n", encoding="utf-8", newline="\n")
    for e in catalog_entries(universes, shell):
        if e.get("shellApps") and sorted(e["shellApps"]) != e["apps"]:
            print(f"warning: {e['slug']}: the viewer site lists its apps as {e['shellApps']}, the hub derives {e['apps']}")
    print("")
    return 3 if verify_all() else 1


if __name__ == "__main__":
    sys.exit(main())
