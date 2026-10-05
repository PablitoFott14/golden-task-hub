# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static React site, the practical reference for contributors (CBs) on the Green Shell / OpenClaw MM
Rubrics single turn project. **Five tabs**, and the detail of why is in
[Five tabs, and where everything lives](#five-tabs-and-where-everything-lives).

| Tab | Route | Page | What it holds |
| --- | --- | --- | --- |
| The Method | `/` | [Method.tsx](src/pages/Method.tsx) | The landing page. The latest guideline changes, the universe videos, the ten method steps, the mindset, the quick answers block, the hard requirements, where to go next. |
| Golden Tasks | `/golden-tasks` | [GoldenTasks.tsx](src/pages/GoldenTasks.tsx) | The reference-only disclaimer, then one card per worked task. |
| | `/golden-tasks/:id` | [TaskDetail.tsx](src/pages/TaskDetail.tsx) | The walkthrough, its sections nested under the method steps, rail on the left. |
| Complexity | `/complexity` | [Complexity.tsx](src/pages/Complexity.tsx) | The Increase Complexity Proposals tool. Closed-list form, then proposals from the model. |
| Spec Doc | `/spec` | [SpecDoc.tsx](src/pages/SpecDoc.tsx) | The QC spec: the dimensions, the appendix and the change log, one pane at a time off a vertical rail, under one search. |
| Reference | `/reference` | [Reference.tsx](src/pages/Reference.tsx) | Onboarding, the pre-submit gate, the must-read project updates, and the FAQ, one pane at a time. Embeds [Onboarding.tsx](src/pages/Onboarding.tsx), [PreSubmit.tsx](src/pages/PreSubmit.tsx), [WhatsNew.tsx](src/pages/WhatsNew.tsx) and [Faq.tsx](src/pages/Faq.tsx). |

`/grading`, `/checklist`, `/onboarding`, `/whats-new` and `/faq` are kept as redirects that carry
the hash across.

**This is the published project.** The repo's Pages site is built from this folder by
[../.github/workflows/deploy.yml](../.github/workflows/deploy.yml), on every push to `main`.

## The Google Drive constraint, read this first

This project lives at `G:\My Drive\Red Shell\Golden Task Hub\Green Shell`, one of the two projects in
the repo. Drive's sync layer **cannot host
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
mkdir -p "$SP" && cd "/g/My Drive/Red Shell/Golden Task Hub/Green Shell"
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
const routes = ["/", "/golden-tasks", "/golden-tasks/vendor-closeout", "/complexity", "/spec", "/reference", "/nope"];
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

### Five tabs, and where everything lives

The hub was eight tabs and it had stopped being navigable. It is now five, one per thing someone is
actually doing.

| Tab | Route | Panes inside it | Was |
| --- | --- | --- | --- |
| The Method | `/` | one scrolling page: hero, universe videos, the 10 steps, hard requirements, quick answers, where to go next | unchanged |
| Golden Tasks | `/golden-tasks`, `/golden-tasks/:id` | index, then one walkthrough per task | unchanged |
| Complexity | `/complexity` | the proposals tool | unchanged |
| Spec Doc | `/spec` | **7 dimension groups** (default: Task Parameters) · 3 appendix sections · Change log | `/spec` |
| Reference | `/reference` | **Onboarding** (default) · Pre-Submit · Must Read: Project Updates · FAQ | `/onboarding` + `/checklist` + `/whats-new` + `/faq` |

**The spec doc is the destination, not a pane of something else.** It is the one piece of content
nothing else in the hub can stand in for: the exact rubric a reviewer scores against. The gate, the
FAQ and the onboarding are all written from it. So it holds a tab under its own name, and it opens
on the first group of dimensions rather than on anything that annotates or precedes them.

**Reference is the four things a contributor looks something up in** rather than works from. The
pre-submit gate is one of them: it is a tool you run once per task and a list you consult, not a
standard to read against. It keeps a signpost from the spec doc — a ghost link under the heading,
built off `checkCount()` — because that is where someone who has just read the standard goes next.

**The retired routes still work.** `Moved` in [src/App.tsx](src/App.tsx) redirects each one and
**carries the hash across**, because the hash is what makes an old link worth keeping:
`/spec#weights` has to land on the weights pane. A bare old URL with no hash names its pane
explicitly, so `/checklist` opens the gate rather than the onboarding that is now the default.
`/grading` is the exception and has its own component, `MovedFromGrading`: it held both the spec and
the gate, and they ended up in different tabs, so that one redirect reads the hash to know which was
wanted. These are for links that left the hub — a bookmark, a Slack message, a Speed Audit comment.
Every link inside the hub already points at the live route.

**Each tab resolves an inbound anchor to the pane that holds it**, and every resolver is built from
the data rather than listed by hand: `dimensionHome` in [SpecDoc.tsx](src/pages/SpecDoc.tsx),
`paneHome` in [Reference.tsx](src/pages/Reference.tsx), `gateAnchors` in
[App.tsx](src/App.tsx). Add a check, a dimension, a change or a question and its anchor works
without touching any of them.

**Two pane mechanisms, both already in the hub, chosen by size.** The spec doc keeps a vertical rail
because it has eleven entries. Reference uses a bar across the top because it has four, and three of
its panes carry a side rail of their own — a second vertical rail beside those is exactly the
layering this restructure removed. The absorbed pages take an `embedded` prop that drops their own
hero so the page keeps one `h1`; **nothing inside them changed**, so the gate keeps its progress bar,
its persisted ticks and its section rail, the FAQ keeps its search, its topic filter and its question
rail, and Must Read keeps its change rail and the taxonomy accordion.

**A sixth tab needs an argument for why it is not a pane of an existing one.** The note above
`links` in [Layout.tsx](src/components/Layout.tsx) is the record of that reasoning.

### They are onboardings, not courses

The word "course" appears nowhere in `src/`. The two are `onboardingItems` of type
`OnboardingItem`, the search kind is `Onboarding`, and the copy says onboarding. The only
survivor is `tutoring-coursework`, a subcategory id in [taxonomy.ts](src/data/taxonomy.ts) that
comes from the guidelines and is not ours to rename.

### Content is typed data, not parsed documents

Every word in the hub is transcribed into TypeScript under [src/data/](src/data/) and validated by
the shapes in [src/data/types.ts](src/data/types.ts). Nothing is read from disk at build time and
there is no CMS. Pages iterate data and lay it out.

The consequence is the load-bearing contract: **editing a source document is only half the change.**

| Source document | Data file here |
| --- | --- |
| Version History table and the `[NEW]` callouts in the guidelines | [src/data/changes.ts](src/data/changes.ts) |
| Nothing — hand-authored, one entry per guidelines or onboarding change | [src/data/hubLog.ts](src/data/hubLog.ts) |
| `task 1 (…)/6a7965b63b7d368e70c7de4a/rationale.md` | [src/data/method.ts](src/data/method.ts) |
| `Coruses & Screenings/Guidelines/checklist.md` → `presubmit-gate.pdf` | [src/data/checklist.ts](src/data/checklist.ts) |
| `*-rubric.csv` and `appendix.csv`, the spec exports (generated, see below) | [src/data/specDoc.ts](src/data/specDoc.ts) |
| `F&Q.md` in this repo | [src/data/faq.ts](src/data/faq.ts) |
| `Videos/Universe Dealing/finals/` on Drive, `universe_post.md` beside the recordings | [src/data/videos.ts](src/data/videos.ts) + `public/videos/universe/` |
| `Tasks/6a7965b63b7d368e70c7de4a` | [src/data/tasks/vendorCloseout.ts](src/data/tasks/vendorCloseout.ts) + `public/tasks/vendor-closeout/` |
| `task 1 (…)/6a7965b63b7d368e70c7de4a/draft_history.md` | `draftHistory` in [vendorCloseout.ts](src/data/tasks/vendorCloseout.ts), one entry per numbered item |
| `task 1 (…)/6a7965b63b7d368e70c7de4a/milestones.md` | `milestones` in [vendorCloseout.ts](src/data/tasks/vendorCloseout.ts), one entry per line |
| `task 1 (…)/6a7965b63b7d368e70c7de4a/golden_conversation.md` | `goldenRun.conversation` in the same file, one entry per message |
| `Evals/Universes/*.zip` on Drive (generated, see below) | [src/data/universes.ts](src/data/universes.ts) + `complexity-api/universes.ts` |
| `single_turn_quick_hits - Tasks.csv`, the claim sheet | [src/data/claimSheet.ts](src/data/claimSheet.ts) |

`[External] OpenClaw MM Rubrics MULTI TURN – Guidelines .md` sits beside this file on Drive
and is the source of truth for everything. The hub is a companion to it and must never become a
copy of it.

The pre-submit PDF is generated from `checklist.md`; read that rather than the PDF when
re-transcribing checks, and re-copy the regenerated PDF into `public/docs/`:

```bash
cd "g:/My Drive/Red Shell/Coruses & Screenings/Guidelines/_changes"
python build_presubmit_gate.py          # writes ../presubmit-gate.pdf
cp ../presubmit-gate.pdf "g:/My Drive/Red Shell/Golden Task Hub/Green Shell/public/docs/"
```

The gate is **one Letter page**, and the generator holds it there by stepping the type scale down
until the content fits, refusing to write below 80%. A check costs roughly two points of scale: 28
checks fitted at 90%, 29 at 86%, 30 at 84%. So a new rule goes into an existing check's wording
unless it genuinely needs its own tick box, and `checklist.ts` is transcribed from `checklist.md`
afterwards with the em dashes flattened to the hub's copy rules.

### `universes.ts` is generated, in two places

[src/data/universes.ts](src/data/universes.ts) and `complexity-api/universes.ts` both come out of
[scripts/gen_universes.py](scripts/gen_universes.py), which opens every export under
`G:\My Drive\Red Shell\Evals\Universes` and summarises it: the services that hold data, the
collections and their record counts, and the window the records fall in with the tails trimmed.
Neither file is hand-authored. Re-run it whenever a universe is added, removed or reloaded:

```bash
python scripts/gen_universes.py
```

It never copies records, only counts. An export is about 2.5 MB and there are two dozen, so the full
data could neither ship in the bundle nor fit in a request.

### `specDoc.ts` is generated, not hand-written

Everything above `dimensionLinks` in [src/data/specDoc.ts](src/data/specDoc.ts) comes out of
[scripts/gen_spec.py](scripts/gen_spec.py), which reads the two spec exports sitting beside the
project. Re-run it whenever either is re-exported:

```bash
python scripts/gen_spec.py
```

It takes the dimensions from `*-rubric.csv` (matched by glob, so the task id in the filename does
not matter) and every appendix section from `appendix.csv`. Nothing is fetched and nothing is
scraped.

**This is not Red Shell's generator.** Red Shell carries its own copy, which scrapes the deployed
multi-turn viewer at <https://qc-spec-mt-rubrics.vercel.app/>. That viewer serves the multi-turn
spec and says nothing about Green Shell. The two projects therefore keep **separate specs,
separate change logs and separate generators**, and neither can write over the other: Green Shell's
spec is 33 dimensions in 7 groups built for single turn, Red Shell's is 22 in 8 built for
multi-turn. A Green Shell re-export never touches `Red Shell/src/data/`.

The appendix carries four sections and all four are transcribed. One of them is a **superseded
weight scale** the sheet still keeps under its own heading; it lands in `deprecatedWeightBuckets`
and renders muted, behind the sheet's own `DEPRECATED` label, below the live scale. It is there so
the appendix is represented in full, not because anything grades against it.

Question text, guidance, option wording and appendix definitions are stored **verbatim**, em
dashes and curly quotes included, because that block is a transcription of the standard rather
than hub copy. `dimensionLinks` at the foot of the file is the one hand-authored block, and
**gen_spec.py is what writes it**, so an edit made in `specDoc.ts` alone is lost on the next
regeneration.

What moved between revisions lives in [src/data/specLog.ts](src/data/specLog.ts), hand-authored by
diffing the new export against the one the hub was carrying, and renders in two places. The
**Change Log** pane is a third rail group under Dimensions and Appendix, built the same way as the
rest of the page: one rail entry with a count, one pane at a time, cards grouped under the revision
date, and its entries fold into the page search with everything else.

**Green Shell's log starts at one entry with nothing under it.** The hub is carrying the first
Green Shell export, so there is no earlier Green Shell revision to diff against and `changes` is
empty. Three guards in [SpecDoc.tsx](src/pages/SpecDoc.tsx) keep that from reading as a broken
count: the rail badge is dropped, the section note says "1 revision" rather than "0 changes", and
the banner's drawer explains the state instead of opening on an empty list. They are all
`length === 0` checks, so the moment a second export lands and the log has entries, the page goes
back to the counts without any change here. The **update log banner**
sits above the rail, directly under the search box, because the pane is only found by a reader who
goes looking and someone arriving at the spec has no way of knowing the standard moved under them.
It heads the newest revision, opens to the same cards, and links through to the pane. An entry
earns its place only where the standard actually changed, so a revision that moves nothing adds
nothing.

**Every entry links to the dimension it changed.** Each dimension card carries a `dim-<name>`
anchor, `dimensionHome` in [SpecDoc.tsx](src/pages/SpecDoc.tsx) maps that anchor back to the pane
holding it, and the hash effect opens that pane so `/spec#dim-realism` works cold as well as from
inside the page. The anchor is derived from `SpecChange.dimension`, which has to match the name in
`specDoc.ts` character for character: **a renamed dimension silently turns every log link at it
into a dead one**, and nothing validates that, so rename in both files together.

### The method is the spine

`methodSteps` in [src/data/method.ts](src/data/method.ts) is ten steps, rewritten against the
Green Shell guidelines. **The order is the argument**: step 1 fixes the assigned pair, step 2
explores the universe inside that pair, step 3 is the one situation where both are true, step 4 is
the evidence that situation would produce. Every step after the first carries `inherits`, which
states what arrived from the step before and what this step does with it, and it renders in the
panel head. **A new step needs one**, or the method goes back to reading as ten independent checks.

`inTask.link` is optional. A step the published Golden Task cannot demonstrate under the current
standard carries the narrative without a link and says so, rather than pointing at a worked example
that teaches the superseded rule.
Each step carries `slogan` / `means` / `moves` / `produces` / `rule` / `inTask`, and `inTask.link`
points at the Golden Task section where the principle landed. That relationship,
**principle → decision → implementation**, is rendered in two places and must stay consistent:

1. The method cards and detail panel on `/`. The card shows `title` then `slogan` only, and the
   panel below it carries `means`, `moves`, `rule` and `inTask`. A step id in the hash selects the
   step and scrolls its panel into view, which is what every `/#<step-id>` link in the hub relies
   on. The steps carry no anchors of their own, so that effect in
   [Method.tsx](src/pages/Method.tsx) is the only thing making those links land.
2. The `WALKTHROUGH` array in [TaskDetail.tsx](src/pages/TaskDetail.tsx). It is the method, not a
   second flow: one entry per method step, in method order, with the page sections nested under the
   step that produced them. The rail renders it with the method's own numbering and titles, each
   section heading shows the step badge, and a step this task has no section for keeps its place
   and links to the method page rather than being dropped. Every step currently carries one, step 4
   included: the agent never sees the Draft History, but the task is still filed with one, and the
   `draft-history` section is where it is read.

Adding a method step means adding it to `methodSteps` and deciding which task section it points at.
Adding a task section means nesting it in `WALKTHROUGH` under the step it belongs to. **A section
that does not belong under a step does not belong on the page**, because a rail entry with no step
behind it is exactly the second flow this structure exists to prevent.

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
- **The Pre-Submit pane** keeps every section on the page and puts progress in a sticky sidebar: the
  counter and bar, `Submit & reset`, a `Show guidance` density toggle, and a jump nav driven by the
  scroll spy. Section cards carry a `Check all` toggle, and a ticked item strikes through. Rows are
  deliberately dense, one line each: the footnote and the cross-links appear only when guidance is
  on, stored under `rsh.presubmit.detail.v1`. Twenty nine checks have to be runnable without
  scrolling through oversized cards, so keep any addition to this page inside a row. Nothing on
  screen states the total as a literal: `checkCount()` in [checklist.ts](src/data/checklist.ts) is
  what the landing page reads, because a hardcoded number is the thing that drifts when a check is
  added.

### Cross-linking is the product

Any entity can carry `links?: XLink[]` (`{ to, tag, label }`), rendered by `<Crosslinks />`. Links
are authored **in both directions**: a pre-submit check points at the golden-task section that
demonstrates it, and that section points back at the check.

An `XLink.to` targets `/<route>#<section-id>`, or an absolute URL (rendered with an external
arrow). Section ids are hardcoded in `WALKTHROUGH` at the top of
[TaskDetail.tsx](src/pages/TaskDetail.tsx) and in a `SECTIONS` array at the top of
[PreSubmit.tsx](src/pages/PreSubmit.tsx) and [SpecDoc.tsx](src/pages/SpecDoc.tsx), and drive both
the sticky rail and the scroll spy. **Adding or
renaming a section means updating that array and every `XLink` aimed at it.** Nothing validates
this, so grep the old anchor before renaming.

### The FAQ answers name their guidelines section

Every `FaqItem` carries `refs: GuidelineRef[]`, `{ section, title }` pairs pointing at the numbered
section of `[External] OpenClaw MM Rubrics MULTI TURN – Guidelines - v2.md` that governs the answer.
They render as the References panel beside each answer, and they are folded into the ⌘K terms.
The field is required, so a new question needs at least one ref. Answers are never collapsed:
question and answer are always on screen together.

The FAQ is rendered twice from one array. The FAQ pane of `/reference` is the full list, and
[QuickAnswers.tsx](src/components/QuickAnswers.tsx) is the same `faq` data on the landing page
under `#answers`, one collapsed row per question with the answer, its crosslinks and its ref
numbers inside. **It is a second render, never a second copy**: a question added to `faq.ts` shows
up in both, and the row is labelled with `topic`, so a new topic also goes into `faqTopics`. The
list is capped at `PEEK` rows with the rest behind a toggle, and that cap is the only thing keeping
this block from growing into the page it links to. The hero links straight to it, because a
contributor who never opens the last tab is the reader the block exists for.

### Onboarding links out, it does not embed

`onboardingCourses` in [src/data/onboarding.ts](src/data/onboarding.ts) is the two courses, and
[Onboarding.tsx](src/pages/Onboarding.tsx) renders them as two large cards at `/onboarding`.

**Both courses are complete applications with their own navigation, deployed from their own
repositories.** The Common Errors viewer has its own tab bar, deep links and copy actions; the
intro deck runs 1920 by 1080 slides on keyboard navigation. An iframe nests a tab bar inside a tab
bar, letterboxes the deck, and swallows the arrow keys. Linking also means neither can go stale
here: they are redeployed from their own repos and the hub always points at the current build.

What the hub owes them is discovery, so the card carries the deck's **real cover slide**, the real
counts and what is actually inside. Re-cut the cover from the source deck into
`public/onboarding/` when a course is rebuilt:

```python
from PIL import Image
im = Image.open(<first slide>.png).convert("RGB")
im.resize((880, 495), Image.LANCZOS).save("public/onboarding/<id>-cover.png", optimize=True)
```

### The complexity tool keeps its credential off the client

[Complexity.tsx](src/pages/Complexity.tsx) collects the assigned parameters and the scenario and
posts them to the function in [complexity-api/](complexity-api/). **The hub is a static site and
cannot hold a secret**, so the key lives only in that function's environment, the function restricts
itself to one origin, and the browser never sees the key, the system prompt or the model name.

- The endpoint is `VITE_COMPLEXITY_API`. **With it unset the page still works**: the button is
  disabled, a notice says so, and `exampleProposals` in
  [src/data/complexity.ts](src/data/complexity.ts) renders the real output shape. Keep that
  example working, because it is what makes the page reviewable without a deployment.
- **Every parameter is a closed list, and the function enforces the same lists.** That is not
  politeness towards the contributor: free text fields would make this endpoint a general purpose
  model proxy for anyone who found the URL. The only free text a request can carry is the scenario,
  which is capped, and the system prompt tells the model to treat it as the subject rather than as
  instructions. Where each list comes from is documented in
  [src/data/claimSheet.ts](src/data/claimSheet.ts); the vocabularies are duplicated in the function
  because it deploys on its own, so **edit both together**.
- **Universe context is derived server side, never posted.** `gen_universes.py` writes the
  summaries twice, once for the dropdown and once for the function, and the function builds the
  context from the universe id it was given. The browser therefore cannot choose what context the
  model sees. The summary is services, record counts and the date window — the same thing step 2 of
  the method has a contributor read off the Database tab — because a full export is 2.5 MB and there
  are two dozen of them.
- **Nothing is applied automatically.** The model proposes, the contributor decides. Every proposal
  states what it adds, why that is real difficulty, and what it leaves exactly as assigned.
- The system prompt exists twice: the authoritative copy in the function, and `complexitySystemPrompt`
  in the data file as the reviewable one. **Edit both together.**
- The system prompt is frozen and sent first so it caches; the per request fields go in the user
  message. A date or counter in that prompt drops the cache hit rate to zero and roughly doubles
  the input cost.

### Three logs, and which is which

The hub carries three separate histories. They are easy to confuse and must not be merged: each
answers a different question, and each links to the other two rather than restating them.

| Log | Data | Where it renders | Answers |
| --- | --- | --- | --- |
| **The update notice** | [src/data/hubLog.ts](src/data/hubLog.ts) | [HubLog.tsx](src/components/HubLog.tsx), the `#updates` bar under the nav on `/` | What has changed that I have to act on before my next task |
| **Must Read: Project Updates** | [src/data/changes.ts](src/data/changes.ts) | [WhatsNew.tsx](src/pages/WhatsNew.tsx), the `whats-new` pane of `/reference` | What the *guidelines* changed going from Red Shell to Green Shell |
| **Spec Doc change log** | [src/data/specLog.ts](src/data/specLog.ts) | the `log` pane of `/spec` | Which *rubric dimension* moved between exports |

**The update notice is not a changelog of the site.** It carries two kinds and nothing else:
`guidelines` and `onboarding`. A tab moving or a tool shipping does not go in it — nobody has to act
on that, and a bar that fills with site housekeeping stops being read, which costs us the one place
a real guidelines change can be announced. The test for an entry: **would a contributor do something
differently because of it, before their next task?**

**Every entry carries a `to` that opens the thing it describes**, because an entry you cannot act on
is an announcement rather than a notice. Entries are historical and are not rewritten when the hub
moves on, so a count written into one describes what shipped that day and is correct to leave alone.

**It sits above the hero, not below it.** The hero is around 800px tall, so a band under it is below
the fold on a laptop and two screens down on a phone — useless for something read on the way in.
Collapsed the bar is one row showing `hubUpdates[0]` only; the chevron opens the rest. The headline
is a `Link` and the toggle is a `button` **side by side**, not nested, because an anchor inside a
button is invalid. The toggle's label stays visible at every width: `hidden sm:inline` on it left
the button with no accessible name on a phone, since `display: none` drops it out of the a11y tree.

It is rose, which is the hub's must-read signal everywhere else too — the Must Read pane, the hero
button on `/`, the palette chip. Amber marks an `onboarding` entry, the one kind here that is not
urgent. **It is deliberately not dismissible and not persisted:** a contributor who hid it once
would stop seeing guidelines changes for good, which is the thing it exists to prevent.

### Marking a section unfinished

Several sections are still being filled in, and a half-finished page that looks finished is worse
than no page: someone reads it as settled guidance and builds a task against it. Every unfinished
section therefore opens with `WipNotice` from [src/components/ui.tsx](src/components/ui.tsx).

| Section | File | Note |
| --- | --- | --- |
| Golden Tasks | [GoldenTasks.tsx](src/pages/GoldenTasks.tsx) | Default wording **plus** the line about the Green Shell reference task that is coming |
| Complexity | [Complexity.tsx](src/pages/Complexity.tsx) | Default |
| Onboarding | [Onboarding.tsx](src/pages/Onboarding.tsx) | Default, **and a `WIP` chip on each of the two cards** — both onboardings are unfinished, not just the pane |
| Pre-Submit | [PreSubmit.tsx](src/pages/PreSubmit.tsx) | Default |
| FAQ | [Faq.tsx](src/pages/Faq.tsx) | Default |

**One component and one sentence, so the status reads the same everywhere.** A section with
something extra to say passes children and keeps the label and the opening sentence; it does not
write its own. **The notice goes first in the section's content**, above the title where the title
lives in the content. That is what makes it unmissable, and on the pre-submit gate it is also what
keeps it clear of the amber warning that already sits under that heading — two amber blocks in a
row read as one.

**Amber, never rose.** Rose is the update notice and Must Read, and it means *read this before your
next task*. Amber means *this is not finished yet*. Those are different claims and must not look
alike. The dashed border is the same idiom the deprecated weight scale uses in the Spec Doc.

**Removing one is a one line delete**, plus the import. Nothing else depends on it, which is the
point: these come off as the sections land, not at some coordinated cleanup.

### Must Read is a tab, not a band

`guidelineChanges` in [src/data/changes.ts](src/data/changes.ts) is transcribed from the Version
History table and the `[NEW]` callouts of `[External] Green Shell – Guidelines .md`, and
[WhatsNew.tsx](src/pages/WhatsNew.tsx) renders it in the `whats-new` pane of `/reference`.

**It is labelled `Must Read: Project Updates`, not `What is new`.** A contributor who skips it fails
a task, and the old label did not say so. The pane id, the anchor and the `/whats-new` redirect all
still use `whats-new`, because they are URLs and the rename was copy — do not rename the id to match
the label. The search kind is `"Must read"` and is tinted rose, which is the hub's must-read signal
everywhere: the hero button on `/`, the `guidelines` row in the hub update log, the palette chip.

**It used to be a six card band under the hero and the cap was its height.** The Green Shell change
set outgrew that: 80/20 cannot be taught in a card, and the taxonomy needs 68 subcategories beside
it. So it is a page with a rail, one entry per change, and the cap is gone. `LatestChanges.tsx` was
deleted with the band.

**It is not the version history.** An entry earns its place only by changing what a contributor
does, which is why `does` is required: if you cannot write the move it forces, the entry does not
belong. `impact` is `hard` for a rule a task fails without and `shape` for everything else, and it
always ships beside a text label rather than as colour alone.

Three fields carry the rest:

- **`before`** is the Red Shell rule being replaced. The page is a comparison, and most readers
  arrive holding the old rule, so an entry that replaces something names it before stating the
  replacement. Absent where the rule is purely additive.
- **`refs`** is every guidelines section the rule touches, not one. The section numbers come from
  the Version History row, which maps each update to the sections it was applied in. They render as
  chips under each entry so a reader can open the document and check the hub rather than trust it.
- **`detail`** is supporting context: how to count the 80/20 split, the rewrite an existence check
  needs, the floor each deliverable has to clear. **Optional on purpose.** It is there where the
  rule is easy to misread and absent where the rule explains itself, so do not add one for the sake
  of symmetry.

`embed: "taxonomy"` renders [Taxonomy.tsx](src/components/Taxonomy.tsx) inside an entry. Only the
use case entry uses it, because the 68 subcategories are that change's supporting context rather
than a reference block of their own.

When a change lands, the tab is only half of it. The rule it names has to be applied to the Golden
Task as well, or the worked example teaches the superseded standard. `guidelinesVersion` in the
same file is what the guidelines header currently says, and it is rendered, so move it when the
document moves.

### The use case taxonomy is a reference, collapsed

`taxonomy` in [src/data/taxonomy.ts](src/data/taxonomy.ts) is the 11 use cases and 68 subcategories
of section 1.1.1. `l1`, `scope` and `covers` are the standard's wording and are stored **verbatim**.
`scenarios` are hub copy, three per subcategory, 204 in total.

**Every scenario is written against the complexity bar, not against the label.** Each names the
multimodal evidence the agent has to read, the reconciliation it cannot shortcut, and a deliverable
that clears the bar for its type. They lean on the P0 deliverables, the dashboard, the interactive
page and the explainer video, because those are what the client prioritises and what leaves room
for the subjective block. A scenario ending in a plain document is a scenario that will struggle to
clear the bar.

The block is **collapsed by default and opens one use case at a time**, which is the only thing
keeping it on a page with other content: opened flat it is several thousand words. The scope check
shows only when a use case is open, because it is what settles a wrong assignment and reads as
noise in a closed row. The `#taxonomy` anchor lives on the component rather than on a wrapper, so
it survives being rendered anywhere.

`useCaseCount()` and `subcategoryCount()` are read off the data. Never hardcode either.

### The Universe Interaction videos are a strip, not three players

`universeVideos` in [src/data/videos.ts](src/data/videos.ts) is the three recordings, and
[VideoStrip.tsx](src/components/VideoStrip.tsx) renders them as one row of cards directly under the
hero on `/`. **The player opens over the page and never sits in the strip**, which is the only
thing keeping three videos down to one row: three inline players would take the band from roughly
370px to well over two thousand. Keep any addition inside a card.

Each entry carries `seen` and `fix`, the mistake the recording answers and the move that replaces
it. Those are read beside the player, never on the landing page, so the band stays a slogan, a
line of copy and the row.

`universeVideoPitch` in the same file is that copy. The slogan is split the way the hero splits its
own, `slogan` in ink and `sloganAccent` in the accent, and `stakes` is the cost of skipping the set
stated once. **The consequence is stated plainly and only once**: it is the reason the band sits
where it does, and repeating it in the cards would turn a strip into a lecture.

The recordings are 1920 by 1140 rather than 16 by 9, so `FRAME` in the component is written from
their real size and the poster frames are cut at that ratio. Re-cut a poster with `ffmpeg -ss <t>
-i <file> -frames:v 1 -vf scale=960:-2` into `public/videos/universe/` when a recording is
replaced, and keep the `duration` and `seconds` fields in step with it: `seconds` is what totals
the set in the header.

Video chrome is black in **both** themes. The `ink` ramp inverts under `html.dark`, so
`bg-ink-950/75` is a light scrim in dark mode; the lightbox backdrop and the play overlay are
written as `bg-black/…` for that reason.

### The objective block is shaped by two caps

`rubrics` in [vendorCloseout.ts](src/data/tasks/vendorCloseout.ts) is twenty criteria, and the shape
is part of what the page teaches, so [Rubrics.tsx](src/components/Rubrics.tsx) makes both caps
countable: a `Trajectory` filter and a `role` chip on every criterion that plays a part in a spot
check group.

- **At most five criteria may target the Trajectory**, and none is a valid number. Here that is the
  four reconciliation spot checks and the one negative that lands on the final turn. When a
  Trajectory criterion has to go, its coverage moves onto an artifact rather than leaving with it:
  the vendor pool identification became criterion 6 against `MEMORY.md`, and the Slack retrieval of
  the shutdown estimate is carried by the two criteria that pin the figure and the percentage.
- **A group of more than eight outcomes with the same shape gets one completeness criterion and at
  most five spot checks**, never one criterion per element. `role` is `"completeness"` or
  `"spot-check"`, and it is what makes that pattern visible instead of described.

Both are guideline rules rather than hub preferences, so they belong to
[changes.ts](src/data/changes.ts) as well, and the two `Callout`s above the block on
[TaskDetail.tsx](src/pages/TaskDetail.tsx) link back to it. **Changing the criteria means
re-counting**: `whyGolden`, `run.score`, the `rubrics` arrays in `run.observations` and the GT link
labels in [checklist.ts](src/data/checklist.ts) and [method.ts](src/data/method.ts) all state the
totals in words, and nothing validates them.

### Every subjective rubric carries the two renders it came from

**Subjective criteria are judged on the render, never on source.** That is the rule the whole
section is built to hold. Each criterion shows the same artifact from both runs side by side, with
the rated part boxed on each: Leg A is the observed run, Leg B the golden.

`SubjectiveRubric` in [types.ts](src/data/types.ts) gives each leg a `verdict` and a `view`:

- `kind: "render"` is the artifact as a reader sees it, an SVG or a page image. `canvas` is its
  natural size and every `Box` below is written in those units, so the framing maths is identical
  for a 1200px SVG and a 1322px page render. `focus` frames the region the criterion is about and
  `marks` are the labelled boxes that point at it.
- `kind: "doc"` is a markdown deliverable, rendered as formatted text rather than as source, with
  `mark` naming the lines the criterion is about. `DocFrame` renders headings, bold, italics,
  blockquotes, bullets and tables. **No `##` or `**` may ever reach the screen**, because a reader
  rating a document does not see its markup.

Two rules for authoring one:

- **A mark label must land on empty pixels.** `place` (`above` / `below` / `inside`) and `align`
  exist only for that. A label covering the thing it points at is the single easiest way to ruin
  one of these, so screenshot every mark you add.
- **Both legs need the same framing.** Where the two artifacts have different page geometry, fix it
  at the source: the two receipts are re-rendered into one identical window at one scale
  (`WIN_W`/`WIN_H` in the generation snippet below), so the side by side is a fair comparison
  rather than two differently zoomed pictures.

[SubjectiveRubrics.tsx](src/components/SubjectiveRubrics.tsx) renders each criterion as one row
with the comparison behind a disclosure. **Collapsed is the default and has to stay that way.** Ten
open comparisons take the section from 1,400px to 6,800px, which is the reason the accordion exists.

`status` is the result against the observed run, and it comes from the task's own
`subjective_rubrics_justifications.md`. Criteria the run passed stay in the block: they are quality
floors, and the data says so rather than hiding them.

Page images are generated from the PDFs with PyMuPDF and Pillow, cropped to a shared window anchored
on each document's own ink origin, then written to `public/tasks/<id>/{ot,gt}/`. Re-run that when a
receipt changes, and re-measure the marks against the new pixels.

### The milestone set and the golden run are one section, deliberately

`milestones` and `goldenRun` in [vendorCloseout.ts](src/data/tasks/vendorCloseout.ts) are the two
halves of the same idea and are rendered as such: the set under step 7, the run under step 8.

- `milestones` is one entry per requirement, `{ turn, text }`, grouped by turn in the UI. Stored as
  the milestone set writes them, so nothing in the hub rewords a milestone.
- `goldenRun.checks` is the milestone check that runs after each turn. It is the whole point of the
  section: a check decides whether the next prompt is the next turn or a hint, so the checks carry
  `met` and `next` and are rendered as a sequence, including the re-check after the steer.
- `goldenRun.hint` is that steer, broken into `missed`, the verbatim `prompt`, `does`, `avoids` and
  `recovered`. It sits **outside** the transcript, because a reader has to be able to see what a
  legitimate hint points at without reading ten messages first.
- `goldenRun.conversation` is the transcript, `{ role, turn, hint?, lines }`, rendered inside a
  collapsed disclosure. **Collapsed is the default**: the argument is above it and the transcript is
  the evidence. The message flagged `hint: true` is the one message that is not a turn of the task,
  and it is marked as such on screen.

A turn whose milestones were reached and a turn whose milestones were missed both have to be visible
here, or the section explains hinting without demonstrating it. This task supplies both: turns 1, 2
and 4 landed, turn 3 did not.

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
`XLink` pointing at it. `TaskDetail`'s `WALKTHROUGH` array assumes the full `GoldenTask` shape; a
task missing a field renders an empty section rather than failing, so fill every field or trim the
array.

The card on `/golden-tasks` builds its image strip from the first four `inputs` that are not a
`pdf` or a `doc`, so ship at least one real image or the card falls back to a placeholder. The card
shows title, one-liner, category and subcategory, and never a difficulty. **The index page is built
for many tasks**: keep it a grid of equal cards, and keep the reference-only disclaimer above it.

## Conventions that bite

- **Hash routing.** `main.tsx` uses `HashRouter` so deep links survive a static host with no SPA
  rewrite. A raw `<a href="#section">` therefore **replaces the whole hash and destroys the route**.
  Always use `<Link to={{ hash: "#section" }} />`, which resolves against the current pathname.
  `Layout.tsx` owns the scroll-to-hash effect, and that effect watches `location.key` as well as
  `pathname` and `hash`. **Without the key it is a dead click**: navigating to the section you are
  already on leaves both strings unchanged, so the effect never re-runs and nothing scrolls. Clicking
  a rail item, scrolling away, then clicking it again is exactly that case.
- **`asset()` in [src/lib/util.ts](src/lib/util.ts)** resolves `public/` paths against
  `import.meta.env.BASE_URL` and percent-encodes each segment. Input filenames contain spaces
  (`Screenshot 2026-02-10 143217.png`), so never build those URLs by hand.
- **Checklist ticks are a per-device convenience only**, stored under `rsh.presubmit.checks.v1`,
  wrapped in try/catch for private windows, and never a record of anything.
- **`SectionRail` is the walkthrough rail**, and it takes method steps rather than a flat list:
  `RailGroup` is `{ n, id, title, sections }`, the number and title come from `methodSteps`, and the
  sections nest under it. A group with no sections renders muted and links to `/#<step-id>`. It is
  the first grid child so it sits on the left, and its `title` defaults to `Walkthrough`.
- **A sticky element that is a direct grid child needs `self-start`**, otherwise it stretches to
  the full row height and sticky does nothing. `SectionRail` carries it.
- **A sticky rail also has to be bounded**, with `useStickyFit` in
  [src/lib/useStickyFit.ts](src/lib/useStickyFit.ts). `sticky top-24` only lifts the rail once the
  page has scrolled far enough to push it there; until then it sits below the hero, and a rail with
  a dozen items runs off the bottom of the window where **its last items cannot be clicked at all**.
  CSS cannot express "whichever of the two positions applies right now", so the hook measures the
  top and caps the height, and the rail scrolls inside itself when it does not fit. It returns no
  cap below `lg`, where the rail is in the flow and a cap would crop it. Pair it with `useRailFollow`
  and a `data-rail={id}` on each row to keep the active one visible, and add both to any new rail.
- **`MdLines` in [Markdown.tsx](src/components/Markdown.tsx) is the only markdown renderer.** It
  handles `**bold**`, `*italic*`, `` `mono` ``, `##` headings, blockquotes, bullets and tables, and
  both the subjective excerpts and the golden conversation go through it. **No `##` and no `**` may
  ever reach the screen**, so route any new markdown content through it rather than printing the
  source.
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
  only inside established compounds (`multi-turn`, `cross-modal`, `pre-submit`). The exceptions are
  the blocks that are transcripts rather than hub copy: generated `specDoc.ts`, the turn prompts,
  the Draft History, the milestone set and the golden conversation. Those are stored exactly as
  written, typos and em dashes included, because the wording is the thing being studied.
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
