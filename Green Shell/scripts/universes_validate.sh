#!/usr/bin/env bash
# Validate the Universes tab end to end, from a local mirror of the project.
#
#   bash scripts/universes_validate.sh [slug ...]
#
# 1. `universes.py verify`: every stored universe reassembles into the page it
#    was imported from, byte for byte, and every file it needs is present.
# 2. A mirror of the project at a short local path (Drive cannot host
#    node_modules, and Elena's deepest file paths overflow MAX_PATH under the
#    temp folder), `npm install`, `npm run build`, which also packs the ZIPs
#    into universe-zips/ for the GitHub release, and none into the site.
# 3. `universes.py verify-zips`: each universe's ZIP is the stored universe,
#    file for file, and unpacks cleanly (Python, and on Windows tar.exe and
#    Expand-Archive too). Then the sync tool reads the ZIPs back as a source,
#    beside the original pages, and must find every universe in sync.
# 4. Server-render every route, the universes included, and fail on a crash.
# 5. The parity crawl: each original page against the hub, state by state,
#    with the hub's download layer off so the engine alone is compared.
# 6. The download test: every download the tab offers, clicked in a browser,
#    saves the right bytes under the right name.
#
# Exit 0 only when all six pass. MIRROR overrides the mirror folder.
set -euo pipefail

HERE="$(cd "$(dirname "$0")/.." && pwd)"
MIRROR="${MIRROR:-/c/uvw-sync}"
BUILD="$MIRROR/build"
REF="$MIRROR/ref"
HUB_PORT="${HUB_PORT:-4173}"
REF_PORT="${REF_PORT:-8765}"
PIDS=()
cleanup() { for p in "${PIDS[@]:-}"; do [ -n "$p" ] && kill "$p" 2>/dev/null || true; done; }
trap cleanup EXIT
py() { (cd "$HERE" && PYTHONIOENCODING=utf-8 python scripts/universes.py "$@"); }

echo "== 1/6 verify"
py verify

echo "== 2/6 build in $BUILD"
mkdir -p "$BUILD"
# Refresh everything but node_modules, so a rerun skips the install.
find "$BUILD" -mindepth 1 -maxdepth 1 ! -name node_modules -exec rm -rf {} +
(cd "$HERE" && cp -r src public index.html package.json postcss.config.js tailwind.config.js \
  tsconfig.json vite.config.ts "$BUILD/")
# The ledger, so each ZIP's SUMMARY.json names its source and sync date as CI's do.
mkdir -p "$BUILD/scripts" && cp "$HERE/scripts/universes.lock.json" "$BUILD/scripts/"
cp "$HERE/scripts/universes_parity.mjs" "$HERE/scripts/universes_downloads.mjs" "$BUILD/"
cd "$BUILD"
if [ ! -d node_modules/playwright-core ] || [ ! -d node_modules/vite ]; then
  npm install --no-audit --no-fund >/dev/null
  npm install --no-audit --no-fund --no-save playwright-core >/dev/null
fi
npm run build

echo "== 3/6 the universe ZIPs"
if ls "$BUILD"/dist/universes/*.zip >/dev/null 2>&1; then
  echo "FAIL a universe ZIP is in dist/, which would put it on the site"; exit 1
fi
py verify-zips "$BUILD/universe-zips"
rm -rf "$REF"
py emit-reference "$REF" "$@"
# Read back as a source with the original pages, a ZIP must change nothing.
# The slugs are passed through; with none, every universe is checked.
ZIPS=(); PAGES=()
for d in "$REF"/*/; do s="$(basename "$d")"; ZIPS+=("$BUILD/universe-zips/$s.zip"); PAGES+=("$d/index.html"); done
py check "${ZIPS[@]}" "${PAGES[@]}" --offline

echo "== 4/6 server-render every route"
cat > src/ssr-smoke.tsx <<'EOF'
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { universeCatalog } from "./data/universeCatalog";
const routes = ["/", "/universes", ...universeCatalog.flatMap((u) => [`/universes/${u.slug}`, `/universes/${u.slug}/full`, `/universes/${u.slug}?pane=email`]), "/universes/nope", "/golden-tasks", "/golden-tasks/charge-disputes", "/failure-approach", "/complexity", "/spec", "/self-evals", "/reference", "/nope"];
let fail = 0;
for (const r of routes) {
  try {
    const html = renderToString(<StaticRouter location={r}><App /></StaticRouter>);
    if (r.startsWith("/universes") && /undefined|NaN/.test(html.replace(/<[^>]+>/g, " "))) throw new Error("renders undefined or NaN");
    console.log(`OK   ${r} ${html.length}`);
  } catch (e) { fail++; console.log(`FAIL ${r}\n  ${(e as Error).message}`); }
}
if (fail) process.exit(1);
EOF
cat > vite.ssr.config.ts <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()], build: { ssr: "src/ssr-smoke.tsx", outDir: "ssr-dist" } });
EOF
# The self evals route only exists while that tab is in the tree.
[ -f src/pages/SelfEvals.tsx ] || sed -i 's#"/self-evals", ##' src/ssr-smoke.tsx
npx vite build --config vite.ssr.config.ts >/dev/null
node ssr-dist/ssr-smoke.js
rm -rf src/ssr-smoke.tsx vite.ssr.config.ts ssr-dist

echo "== 5/6 parity with the original pages"
(cd "$REF" && exec python -m http.server "$REF_PORT" >/dev/null 2>&1) & PIDS+=($!)
# Served as GitHub Pages serves it: a missing file is a 404, never the app's
# index.html, which Vite's default SPA fallback would hand to a broken preview.
cat > "$BUILD/vite.preview.config.ts" <<'EOF'
import base from "./vite.config";
export default { ...base, appType: "mpa" as const };
EOF
(cd "$BUILD" && exec node node_modules/vite/bin/vite.js preview --config vite.preview.config.ts --port "$HUB_PORT" --strictPort >/dev/null 2>&1) & PIDS+=($!)
for _ in $(seq 1 60); do
  curl -s -o /dev/null "http://localhost:$HUB_PORT/" && curl -s -o /dev/null "http://localhost:$REF_PORT/" && break
  sleep 1
done
node universes_parity.mjs --hub "http://localhost:$HUB_PORT/" --ref "http://localhost:$REF_PORT/" "$@"

echo "== 6/6 every download"
node universes_downloads.mjs --hub "http://localhost:$HUB_PORT/" --store public/universes --zips universe-zips "$@"
echo "== all checks passed"
