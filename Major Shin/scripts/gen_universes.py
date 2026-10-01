"""
Regenerate src/data/universes.ts from the universe exports on Drive.

    python scripts/gen_universes.py

The exports live at `G:\\My Drive\\Red Shell\\Evals\\Universes`, one zip per
universe, each holding `services/<name>/<name>.json`. They are the source of
truth for which universes exist and what is actually loaded in each one: the
Complexity tool's universe dropdown is this list, and the context it sends the
model is this summary.

**Only the summary is generated, never the records.** One export is about 2.5 MB
uncompressed and there are two dozen of them, so the site could not carry them
and the model could not be sent them. What a complexity proposal actually needs
is what a contributor learns in step 2 of the method: which services hold data,
how much of it, and the window it falls in. That is a kilobyte per universe, and
it is what this writes.

Re-run it whenever a universe is added, removed or reloaded. Nothing in the
generated file is hand-authored, so it can be overwritten wholesale.
"""

import datetime
import json
import os
import re
import zipfile

SRC = r"G:\My Drive\Red Shell\Evals\Universes"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "data", "universes.ts")
# The same summaries, for the backend. The function derives the universe context
# from the id itself rather than trusting what the browser posts, so it needs its
# own copy: it is deployed separately and cannot import from `src`.
OUT_API = os.path.join(ROOT, "complexity-api", "universes.ts")

# Epoch seconds inside this window are a date; anything else numeric is an id,
# an amount or a count. 2020-01-01 to 2030-01-01.
EPOCH_LO, EPOCH_HI = 1577836800, 1893456000
ISO = re.compile(r"^(\d{4})-(\d{2})-(\d{2})")
DATEISH = re.compile(r"(^|_)(date|timestamp|time|at|datetime|created|updated|start|end)($|_)")
# A date of birth is a date and tells you nothing about the window the records
# fall in. Contacts and the health profile both carry one.
NOT_A_WINDOW = re.compile(r"birth|dob|born|anniversar", re.I)

# A service with none of these is listed by name alone. Keeps the summary to the
# collections that carry evidence rather than every empty table in the export.
MIN_RECORDS = 1


def title(part: str) -> str:
    return " ".join(w.capitalize() for w in part.split("_") if w)


def label_for(uid: str) -> str:
    """A person's name out of the universe id, and the flavour where one is stated."""
    m = re.match(r"^openclaw-openclaw_mm_(.+?)_\d{8}-universe$", uid)
    if m:
        return title(m.group(1))
    m = re.match(r"^openclaw_mm_(.+)$", uid)
    if m:
        rest = m.group(1)
        # Trailing flavour, where the export carries one: ..._commerce_product.
        for flavour in ("commerce_product", "visual_learning", "creative_media",
                        "operations_qa", "small_business_personal_docs", "research"):
            if rest.endswith("_" + flavour):
                return "%s — %s" % (title(rest[: -len(flavour) - 1]), flavour.replace("_", " "))
        return title(rest)
    m = re.match(r"^openclaw-(.+?)-universe-[0-9a-f]+$", uid)
    if m:
        return title(m.group(1))
    return uid


def dates_in(obj, found, depth=0):
    """Every date this record tree states, as epoch seconds."""
    if depth > 4:
        return
    if isinstance(obj, dict):
        for k, v in obj.items():
            dated = DATEISH.search(k) and not NOT_A_WINDOW.search(k)
            if isinstance(v, (int, float)) and not isinstance(v, bool):
                if dated and EPOCH_LO <= v <= EPOCH_HI:
                    found.append(float(v))
            elif isinstance(v, str):
                m = ISO.match(v)
                if m and dated:
                    try:
                        t = datetime.datetime(*map(int, m.groups()), tzinfo=datetime.timezone.utc).timestamp()
                    except ValueError:
                        continue
                    if EPOCH_LO <= t <= EPOCH_HI:
                        found.append(t)
            else:
                dates_in(v, found, depth + 1)
    elif isinstance(obj, list):
        for v in obj[:200]:  # a window is a window; the whole list is not needed
            dates_in(v, found, depth + 1)


def summarise(path: str):
    z = zipfile.ZipFile(path)
    services, found = [], []
    for info in sorted(z.infolist(), key=lambda i: i.filename):
        parts = info.filename.split("/")
        if not info.filename.endswith(".json") or len(parts) < 3:
            continue  # metadata.json and the manifests sit at the root
        name = parts[-2]
        try:
            data = json.loads(z.read(info.filename))
        except (ValueError, KeyError):
            continue
        if not isinstance(data, dict):
            data = {"records": data}
        held = [(k, len(v)) for k, v in data.items() if isinstance(v, list) and len(v) >= MIN_RECORDS]
        if not held:
            continue
        held.sort(key=lambda kv: -kv[1])
        services.append({"name": name, "records": " · ".join("%s %d" % (k, n) for k, n in held)})
        for k, v in data.items():
            if isinstance(v, list):
                dates_in(v, found)
    # Where the records actually sit, not the outer bound. A subscription that
    # started in 2021 and a calendar event two years out are both real dates and
    # both useless as a window, so the tails are trimmed.
    span = ""
    if found:
        found.sort()
        lo = found[int(len(found) * 0.05)]
        hi = found[min(len(found) - 1, int(len(found) * 0.95))]
        fmt = lambda t: datetime.datetime.fromtimestamp(t, datetime.timezone.utc).strftime("%b %Y")
        span = fmt(lo) if fmt(lo) == fmt(hi) else "%s – %s" % (fmt(lo), fmt(hi))
    return services, span


def ts(s: str) -> str:
    return '"%s"' % s.replace("\\", "\\\\").replace('"', '\\"')


def main():
    zips = sorted(f for f in os.listdir(SRC) if f.endswith(".zip"))
    rows = []
    for f in zips:
        uid = f[:-4]
        services, span = summarise(os.path.join(SRC, f))
        if not services:
            print("  skipped %s: no service data" % uid)
            continue
        rows.append({"id": uid, "label": label_for(uid), "span": span, "services": services})
        print("  %-62s %2d services  %s" % (uid, len(services), span))

    out = ['import type { UniverseSummary } from "./types";', "", "/**",
           " * Every universe the project has an export for, and what is loaded in each.",
           " *",
           " * GENERATED by scripts/gen_universes.py from the exports at",
           r" * `G:\My Drive\Red Shell\Evals\Universes`. Do not edit by hand: re-run the",
           " * generator when a universe is added, removed or reloaded.",
           " *",
           " * This is the Complexity tool's universe dropdown, and the context it sends",
           " * the model. It is a summary by design — which services hold data, how much,",
           " * and the window it falls in — because that is what a proposal needs and what",
           " * a request can carry. The records themselves stay in the export.",
           " */",
           "export const universes: UniverseSummary[] = ["]
    for r in rows:
        out.append("  {")
        out.append("    id: %s," % ts(r["id"]))
        out.append("    label: %s," % ts(r["label"]))
        if r["span"]:
            out.append("    span: %s," % ts(r["span"]))
        out.append("    services: [")
        for s in r["services"]:
            out.append("      { name: %s, records: %s }," % (ts(s["name"]), ts(s["records"])))
        out.append("    ],")
        out.append("  },")
    out += ["];", "",
            "/** The id a contributor picked, as the dropdown submits it. */",
            "export const universeById = (id: string) => universes.find((u) => u.id === id);", "",
            "/**",
            " * The universe context the request carries: what step 2 of the method has the",
            " * contributor read off the Database tab, in the words the model needs it in.",
            " */",
            "export function universeContext(id: string): string {",
            "  const u = universeById(id);",
            "  if (!u) return \"\";",
            "  const head = `${u.label} (${u.id})${u.span ? `, records spanning ${u.span}` : \"\"}`;",
            "  return [head, ...u.services.map((s) => `- ${s.name}: ${s.records}`)].join(\"\\n\");",
            "}", ""]
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out))
    print("\nwrote %s — %d universes, %.1f KB" % (OUT, len(rows), os.path.getsize(OUT) / 1024))

    # Keep this in the same words the page builds, so what a contributor is shown
    # is what the model is sent.
    api = ["/**",
           " * The universe context a proposal request carries, by universe id.",
           " *",
           " * GENERATED by ../scripts/gen_universes.py. A module rather than JSON so the",
           " * function imports it with no loader flags and no filesystem read.",
           " *",
           " * The function builds the context from the id the browser selected and ignores",
           " * anything the browser claims the context is. The request then cannot be used",
           " * to put arbitrary text in front of the model, and it stays small.",
           " */",
           "export const universeContexts: Record<string, string> = {"]
    for r in rows:
        head = "%s (%s)%s" % (r["label"], r["id"], ", records spanning %s" % r["span"] if r["span"] else "")
        body = "\n".join([head] + ["- %s: %s" % (s["name"], s["records"]) for s in r["services"]])
        api.append("  %s: %s," % (ts(r["id"]), json.dumps(body, ensure_ascii=False)))
    api += ["};", ""]
    with open(OUT_API, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(api))
    print("wrote %s — %.1f KB" % (OUT_API, os.path.getsize(OUT_API) / 1024))


if __name__ == "__main__":
    main()
