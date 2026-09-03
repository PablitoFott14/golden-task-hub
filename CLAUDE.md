# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static React site, the practical reference for contributors (CBs) on the Red Shell / OpenClaw MM
Rubrics multi-turn project. Six routes:

| Route | Page | What it holds |
| --- | --- | --- |
| `/` | [Method.tsx](src/pages/Method.tsx) | The landing page. Nine method cards, the mindset, the FAQ CTA, the hard requirements. |
| `/golden-tasks` | [GoldenTasks.tsx](src/pages/GoldenTasks.tsx) | The reference-only disclaimer, then one card per worked task. |
| `/golden-tasks/:id` | [TaskDetail.tsx](src/pages/TaskDetail.tsx) | The walkthrough, twelve sections, numbered rail on the left. |
| `/checklist` | [PreSubmit.tsx](src/pages/PreSubmit.tsx) | The pre-submit gate, 28 checks in dense rows, progress sidebar with persisted ticks. |
| `/spec` | [SpecDoc.tsx](src/pages/SpecDoc.tsx) | The QC spec in full: sidebar of dimensions and appendix, search, scored options. |
| `/faq` | [Faq.tsx](src/pages/Faq.tsx) | The seven questions, answers always open, each with its guidelines references. |

Deployed to GitHub Pages from `main` by [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## The Google Drive constraint, read this first

The working tree lives at `G:\My Drive\Red Shell\Golden Task Hub`. Drive's sync layer **cannot host
`node_modules` or a `.git` directory**:

- `npm install` in the Drive folder dies with `EBADF` / `EPERM` and leaves a corrupt `node_modules`.
- `git init` in the Drive folder leaves a `.git` directory that becomes unreadable and undeletable
  until Drive releases it.

The repo works around the second: it is set up with `git init --separate-git-dir`, so `.git` is a
one-line *file* pointing at `C:\Users\PABLO\repos\golden-task-hub-drive.git`. **Git commands work
normally from the Drive folder**, so commit and push there.

**npm does not.** To build or run locally, mirror the source to a local path first:

```bash
SP=/c/Users/PABLO/AppData/Local/Temp/claude/<session>/scratchpad/build
mkdir -p "$SP" && cd "/g/My Drive/Red Shell/Golden Task Hub"
cp -r src public index.html package.json postcss.config.js tailwind.config.js \
      tsconfig.json vite.config.ts "$SP/"
cd "$SP" && npm install --no-audit --no-fund
```

Never commit a mirror back wholesale. Edit in the Drive tree, re-copy `src/` to the mirror to
verify.

## Commands

```bash
npm run dev        # vite dev server on :5173
npm run build      # tsc --noEmit && vite build  → dist/
npm run typecheck  # tsc --noEmit alone
```

**There is no test runner and no linter.** `npm run build` is the only automated correctness check.
`tsconfig.json` runs `strict` plus `noUnusedLocals` / `noUnusedParameters`.

### Verifying without a browser

Data-driven render crashes (a missing key in a lookup map, a `.map` on an absent field) type-check
fine and only blow up at runtime. Server-render every route:

```bash
# in the local mirror, alongside src/
cat > src/ssr-smoke.tsx <<'EOF'
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
const routes = ["/", "/golden-tasks", "/golden-tasks/vendor-closeout", "/checklist", "/spec", "/faq", "/nope"];
let fail = 0;
for (const r of routes) {
  try { console.log(`OK   ${r} ${renderToString(<StaticRouter location={r}><App /></StaticRouter>).length}`); }
  catch (e) { fail++; console.log(`FAIL ${r}\n  ${(e as Error).message}`); }
}
if (fail) process.exit(1);
EOF
cat > vite.ssr.config.ts <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()], build: { ssr: "src/ssr-smoke.tsx", outDir: "ssr-dist" } });
EOF
npx vite build --config vite.ssr.config.ts && node ssr-dist/ssr-smoke.js
```

`useEffect` never fires under SSR, so this catches render-time crashes only, not the scroll spy,
the theme toggle or `localStorage`. Delete both files before copying anything back.

For interaction and visual checks, Playwright browsers are installed on this machine. Install
`playwright-core` in the mirror, run `npx vite preview`, and drive Chrome with
`chromium.launch({ channel: "chrome" })`. The scroll spy, the sticky rail, the ⌘K palette,
checklist persistence and every cross-link were verified that way.

## Architecture

### Content is typed data, not parsed documents

Every word in the hub is transcribed into TypeScript under [src/data/](src/data/) and validated by
the shapes in [src/data/types.ts](src/data/types.ts). Nothing is read from disk at build time and
there is no CMS. Pages iterate data and lay it out.

The consequence is the load-bearing contract: **editing a source document is only half the change.**

| Source document | Data file here |
| --- | --- |
| `task 1 (…)/6a7965b63b7d368e70c7de4a/rationale.md` | [src/data/method.ts](src/data/method.ts) |
| `Coruses & Screenings/Guidelines/checklist.md` → `presubmit-gate.pdf` | [src/data/checklist.ts](src/data/checklist.ts) |
| <https://qc-spec-mt-rubrics.vercel.app/> (generated, see below) | [src/data/specDoc.ts](src/data/specDoc.ts) |
| `F&Q.md` in this repo | [src/data/faq.ts](src/data/faq.ts) |
| `Tasks/6a7965b63b7d368e70c7de4a` | [src/data/tasks/vendorCloseout.ts](src/data/tasks/vendorCloseout.ts) + `public/tasks/vendor-closeout/` |

`[External] OpenClaw MM Rubrics MULTI TURN – Guidelines - v2.md` sits beside this file on Drive
and is the source of truth for everything. The hub is a companion to it and must never become a
copy of it.

The pre-submit PDF is generated from `checklist.md`; read that rather than the PDF when
re-transcribing checks, and re-copy the regenerated PDF into `public/docs/`.

### `specDoc.ts` is generated, not hand-written

Everything above `dimensionLinks` in [src/data/specDoc.ts](src/data/specDoc.ts) comes out of
[scripts/gen_spec.py](scripts/gen_spec.py), which parses the deployed QC spec viewer. When the spec
sheet is re-exported and redeployed:

```bash
curl -s https://qc-spec-mt-rubrics.vercel.app/ -o qcspec.html
python scripts/gen_spec.py qcspec.html
```

The UI never links out to that URL. The spec lives inside the hub, so `SPEC_URL` stays in the data
as provenance for the generator and is not rendered anywhere.

Parse the deployed page, not the CSVs sitting on Drive. Those exports are currently a revision
behind and are missing `Milestones - Milestone Annotations`. Question text, guidance, option
wording and appendix definitions are stored **verbatim**, em dashes and curly quotes included,
because that block is a transcription of the standard rather than hub copy. Only `dimensionLinks`
at the foot of the file is hand-authored, so update it there when a dimension is added or renamed.

### The method is the spine

`methodSteps` in [src/data/method.ts](src/data/method.ts) is nine steps derived from `rationale.md`.
Each step carries `slogan` / `means` / `moves` / `produces` / `rule` / `inTask`, and `inTask.link`
points at the Golden Task section where the principle landed. That relationship,
**principle → decision → implementation**, is rendered in two places and must stay consistent:

1. The method cards and detail panel on `/`. The card shows `title` then `slogan` only, and the
   panel below it carries `means`, `moves`, `rule` and `inTask`.
2. The `SECTIONS` array in [TaskDetail.tsx](src/pages/TaskDetail.tsx), where each section carries a
   `step` number and renders a badge linking back to `/#<step-id>`.

Adding a method step means adding it to `methodSteps` and deciding which task section it points at.
Adding a task section means adding it to `SECTIONS` with its `step`.

### The spec and the checklist follow the Golden Task Viewer's layout

Both pages deliberately reproduce the structure of
<https://pablitofott14.github.io/golden-task-viewer/>, because that is the pattern the project
already reads well:

- **`/spec`** is tabbed, not scrolled. A left rail lists the eight dimension groups and the three
  appendix sections with counts, one pane renders at a time, and the first group is what you land
  on. A search box above the rail (focused with `/`, cleared with `Escape`) replaces the panes with
  matches across dimensions, rubric quality issues, weights and authoring standards, with hits
  wrapped in `<mark>`. Inbound `/spec#<group-slug>` links select the tab through the `hash` effect
  at the top of the component, which is why the slugs must keep matching the group names.
- **`/checklist`** keeps every section on the page and puts progress in a sticky sidebar: the
  counter and bar, `Submit & reset`, a `Show guidance` density toggle, and a jump nav driven by the
  scroll spy. Section cards carry a `Check all` toggle, and a ticked item strikes through. Rows are
  deliberately dense, one line each: the footnote and the cross-links appear only when guidance is
  on, stored under `rsh.presubmit.detail.v1`. Twenty eight checks have to be runnable without
  scrolling through oversized cards, so keep any addition to this page inside a row.

### Cross-linking is the product

Any entity can carry `links?: XLink[]` (`{ to, tag, label }`), rendered by `<Crosslinks />`. Links
are authored **in both directions**: a pre-submit check points at the golden-task section that
demonstrates it, and that section points back at the check.

An `XLink.to` targets `/<route>#<section-id>`, or an absolute URL (rendered with an external
arrow). Section ids are hardcoded in a `SECTIONS` array at the top of
[TaskDetail.tsx](src/pages/TaskDetail.tsx), [PreSubmit.tsx](src/pages/PreSubmit.tsx) and
[SpecDoc.tsx](src/pages/SpecDoc.tsx), and drive both the sticky rail and the scroll spy. **Adding or
renaming a section means updating that array and every `XLink` aimed at it.** Nothing validates
this, so grep the old anchor before renaming.

### The FAQ answers name their guidelines section

Every `FaqItem` carries `refs: GuidelineRef[]`, `{ section, title }` pairs pointing at the numbered
section of `[External] OpenClaw MM Rubrics MULTI TURN – Guidelines - v2.md` that governs the answer.
They render as the References panel beside each answer, and they are folded into the ⌘K terms.
The field is required, so a new question needs at least one ref. Answers are never collapsed:
question and answer are always on screen together.

### The ⌘K index is hand-derived

`searchIndex` in [src/data/index.ts](src/data/index.ts) flattens every content type into
`SearchEntry` rows. It is written per type, not generated, so a new content shape is invisible to
search until you add a mapping there. `terms` is folded into the match but never displayed, which
is how a search for a vendor name finds the evidence ledger.

### Adding a golden task

1. `src/data/tasks/<id>.ts` exporting a `GoldenTask`.
2. Real artifacts under `public/tasks/<id>/`, in `inputs/`, `gt/`, `ot/`.
3. Add it to the `tasks` array in `src/data/index.ts`.

It appears on `/golden-tasks`, gets a walkthrough page, joins the ⌘K index, and resolves any
`XLink` pointing at it. `TaskDetail`'s `SECTIONS` array assumes the full `GoldenTask` shape; a task
missing a field renders an empty section rather than failing, so fill every field or trim the array.

The card on `/golden-tasks` builds its image strip from the first four `inputs` that are not a
`pdf` or a `doc`, so ship at least one real image or the card falls back to a placeholder. The card
shows title, one-liner, category and subcategory, and never a difficulty. **The index page is built
for many tasks**: keep it a grid of equal cards, and keep the reference-only disclaimer above it.

## Conventions that bite

- **Hash routing.** `main.tsx` uses `HashRouter` so deep links survive a static host with no SPA
  rewrite. A raw `<a href="#section">` therefore **replaces the whole hash and destroys the route**.
  Always use `<Link to={{ hash: "#section" }} />`, which resolves against the current pathname.
  `Layout.tsx` owns the scroll-to-hash effect.
- **`asset()` in [src/lib/util.ts](src/lib/util.ts)** resolves `public/` paths against
  `import.meta.env.BASE_URL` and percent-encodes each segment. Input filenames contain spaces
  (`Screenshot 2026-02-10 143217.png`), so never build those URLs by hand.
- **Checklist ticks are a per-device convenience only**, stored under `rsh.presubmit.checks.v1`,
  wrapped in try/catch for private windows, and never a record of anything.
- **`SectionRail` is the walkthrough rail**, numbered in reading order and rendered as the first
  grid child so it sits on the left. Its `title` defaults to `Walkthrough`.
- **A sticky element that is a direct grid child needs `self-start`**, otherwise it stretches to
  the full row height and sticky does nothing. `SectionRail` carries it.
- **`Reveal` needs `className="h-full"`** when it wraps a card in a stretch grid, or the card stops
  filling its row.

## Design system

Tailwind, not a hand-rolled token file. The earlier Hallmark build was replaced wholesale; do not
reintroduce `tokens.css` / `app.css`.

- **One neutral ramp.** `ink-50` through `ink-950` are CSS variables in
  [src/index.css](src/index.css) that **invert** under `html.dark`, so `text-ink-900` is dark text
  in light mode and light text in dark mode without a `dark:` variant. `surface` is a card ground,
  `raised` a panel inside a card. Use these rather than Tailwind's own `slate` / `gray`.
- `brand` is the indigo action colour, `gold` the Golden Task accent. Status colours
  (`emerald` / `amber` / `rose` / `sky` / `violet`) are used at low opacity for chips and always
  ship alongside a text label, never colour alone.
- **Fonts:** Space Grotesk display (`font-display`), Inter body (default), JetBrains Mono
  (`font-mono`) for the machine-readout register: filenames, ids, labels, code, numerals. The
  `.mono-label` component class is that register's small-caps form.
- Component classes live in the `@layer components` block of `index.css`: `.card`, `.card-hover`,
  `.chip`, `.btn` / `.btn-primary` / `.btn-ghost`, `.mono-label`, `.wrap`.
- Animate `transform` and `opacity` only, easing `[0.22, 1, 0.36, 1]`. `Reveal` in
  [ui.tsx](src/components/ui.tsx) is the on-scroll entrance; framer-motion `AnimatePresence` drives
  the method panel, the mobile nav and the palette.
- **Both themes are load-bearing.** Check any visual change in dark mode before shipping it.

## Copy rules

- **No em dashes, and no hyphen used as a dash.** Use commas, periods or "and". Hyphens survive
  only inside established compounds (`multi-turn`, `cross-modal`, `pre-submit`). The one exception
  is generated `specDoc.ts`, which is verbatim source text.
- Short sentences. The hub is a practical reference, not a second copy of the guidelines. If a
  section is growing into documentation, cut it and link to the guidelines instead.
- **Keep the internals out of the copy.** No page says which document a rationale came from, which
  file was transcribed, or where a folder sits on Drive. That is provenance for whoever maintains
  the hub, so it lives in this file and in code comments, never on screen.
- **Do not invent statuses or answers.** Everything in `src/data/` is what a source document
  actually says. Where the evidence is genuinely ambiguous, the data says so.

## Other agent configs

An OpenAI Codex config exists at `~/.codex/config.toml`. If you want its MCP servers, commands or
instructions available here, reply `/import` to see what's importable, then
`/import --yes=<digest>` to apply. (If `/import` isn't available on this surface, run
`claude import` from a terminal.)
