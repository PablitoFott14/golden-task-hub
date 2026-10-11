# Golden Task Hub · Green Shell

The practical reference for contributors (CBs) building **single turn multimodal rubric tasks** on
the Green Shell / OpenClaw MM Rubrics project. Live at
<https://pablitofott14.github.io/golden-task-hub/>.

It answers the questions a contributor has while building a task, and then gets out of the way:

- **How do I design a task that holds up?** → The Method
- **What does that look like in a real task?** → Golden Tasks
- **How does the model actually fail, and how do I make it fail for real?** → Failure Approach
- **What will a reviewer score me against?** → Spec Doc
- **What changed, what do I check before submitting, what does everyone ask?** → Reference

Press <kbd>⌘K</kbd> (or <kbd>Ctrl</kbd>+<kbd>K</kbd>) anywhere to search every method step, task
section, failure pattern and case, pre-submit check, spec dimension, project update and FAQ answer
at once.

The guidelines document stays the source of truth. The hub is a companion to it, never a copy of
it, and where the two disagree the guidelines win.

---

## The tabs

| Tab | Route | What is in it |
| --- | --- | --- |
| **The Method** | `/` | The project update notice, the universe interaction videos, the ten method steps in the order they happen (each with its principle, the moves it takes, its rule and where it landed in the Golden Task), the quick answers, the hard requirements and the way into the rest of the hub. |
| **Golden Tasks** | `/golden-tasks` | One card per worked task, and a walkthrough behind each one, one section per method step: the assigned parameters, the universe, the resolved answer, the inputs, the prompt, the Draft History, the Model A run, the objective and subjective rubrics, and the golden run. Reference only, never something to copy. |
| **Failure Approach** | `/failure-approach` | Real cases of how Opus fails as an agent and how to build the same pressure into a Leg A, which runs Opus 5. Where the cases come from first, then seven failure types in the order a run breaks, twenty eight patterns, and eighty nine graded runs behind them, each with why it failed. A "Model A passed?" view diagnoses a Leg A that passed. See below. |
| **Spec Doc** | `/spec` | The QC spec the task is scored against: 33 dimensions in 7 groups, the appendix (rubric quality issues, weights, authoring standards) and the change log, one pane at a time, under one search. |
| **Reference** | `/reference` | Onboarding, the 29 check pre-submit gate written for single turn (with its printable PDF, generated from the same data), Must Read: Project Updates, and the FAQ, one pane at a time. |

A sixth tab, **Complexity** (the Increase Complexity Proposals tool), is **parked**: off the site,
its route redirects to `/`, and its source is kept so it can come back. `/grading`, `/checklist`,
`/onboarding`, `/whats-new` and `/faq` are kept as redirects that carry the hash across.

Every resource is cross-linked in both directions. A pre-submit check points at the part of the
Golden Task that demonstrates it, and that section points back at the check, the spec dimension and
the method step behind it. Each of the Golden Task's Model A misses links to the failure pattern it
is a case of, and the pattern links back to the run.

### The Failure Approach

Built for the contributor who is struggling to make Model A fail: open the tab, find the failures
that fit the task in front of you, see why they happened in real runs, and leave with a concrete way
to build one.

- **Where the cases come from**, first: the two studies of graded Opus runs (68,280 failed criteria
  in 8,626 tasks), OpenClaw MM, the project closest to Green Shell, and the Leg A run of the hub's
  Golden Task, with how to read a case. Every case names its Opus version, and the ones on Opus 5,
  the model Leg A runs, are marked.
- **Seven failure types**, as cards, in the order an agent's run breaks: stops looking too soon,
  misreads the media, trusts the wrong source, applies its own version of the rule, never works out
  the deciding number or match, makes calls the evidence does not support, does not finish the job.
- **A type** opens its patterns, with the share or the repeat rate that says why it matters and the
  lever that turns it into a failure point.
- **A pattern** opens with its real cases, each one a graded run: what was asked, what the model
  did, the right answer beside the one it wrote, and why it failed, the trigger in the task you can
  build yourself. Then the ways to build it into a Green Shell Leg A, each naming the cases it is
  drawn from (a click opens that case), the test that keeps it a real failure, and what it looks
  like in the trajectory.
- **Start from what your task has**: pick your inputs, services and asks, and the patterns that can
  be built on them are listed, the ones that repeat most first.
- **Model A passed?** reads why each planned failure point passed and what to change, how to raise
  the odds, and what rarely makes the model fail.

Everything is hash routed: `/failure-approach#<type>`, `#<pattern>` and `#keeps-passing` deep link
to a view, and the back button walks back through them. The cases come from the hub's Golden Task
and two studies of graded Opus failures, and nothing else: a summary of a run with no ask and no
right answer is not a case. The studies and the notes written from them sit in `failure approach/`,
which is gitignored: they are internal and this repository is public.

The tab carries no planning sequence, rating guidance or Leg B hints of its own. The method, the
Golden Task and the spec own those, and the tab links to them instead.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run typecheck
python scripts/build_presubmit_gate.py   # reprint the gate PDF from src/data/checklist.ts
```

The gate script needs Node 22.18 or later on the PATH (it loads the TypeScript directly, no
`node_modules`), Google Chrome, and PyMuPDF. It prints one Letter page, stepping the type down until
the gate fits and refusing to go below 80%, so a new rule goes into an existing check's wording.

There is no test runner and no linter: `npm run build` (strict TypeScript plus the Vite build) is
the only automated check. [CLAUDE.md](CLAUDE.md) describes the server render smoke test and the
browser checks used to verify a change.

> **Working from Google Drive.** Drive's sync layer cannot host `node_modules` (`npm install` dies
> with `EBADF` / `EPERM`) and cannot host a `.git` directory. The repo is set up with
> `git init --separate-git-dir`: the working tree is `G:\My Drive\Red Shell\Golden Task Hub`, this
> project is `Green Shell/`, and a one-line `.git` *file* points at the real git store. Commit and
> push from the Drive folder as normal, but run `npm` in a local mirror of the project.

Deployed to GitHub Pages by [`../.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) on
every push to `main`. Routing is hash based, so deep links survive a static host with no rewrite.

## Where the content comes from

Every word is transcribed into typed data under [`src/data/`](src/data/), validated by the shapes in
[`src/data/types.ts`](src/data/types.ts). Nothing is parsed at build time, so editing a source
document is only half the change: update the matching data file too. The source documents sit
beside this project on Drive and are gitignored.

| Source | Feeds |
| --- | --- |
| `[External] Green Shell – Guidelines` | Everything. The method ([`method.ts`](src/data/method.ts)), the project updates ([`changes.ts`](src/data/changes.ts)), the use case taxonomy ([`taxonomy.ts`](src/data/taxonomy.ts)) and every section ref |
| The QA rubric and appendix exports (`*-rubric.csv`, `appendix.csv`) | The Spec Doc, generated into [`specDoc.ts`](src/data/specDoc.ts) by [`scripts/gen_spec.py`](scripts/gen_spec.py). Re-run it after a re-export |
| The guidelines, as a gate | The pre-submit gate ([`checklist.ts`](src/data/checklist.ts)), and `public/docs/presubmit-gate.pdf`, printed from that same file by [`scripts/build_presubmit_gate.py`](scripts/build_presubmit_gate.py). Re-run it after any change to the gate |
| `F&Q.md` | The FAQ ([`faq.ts`](src/data/faq.ts)), also rendered as the quick answers on `/` |
| `task 1 (…)/` | The charge disputes Golden Task ([`tasks/chargeDisputes.ts`](src/data/tasks/chargeDisputes.ts)) and its real artifacts under `public/tasks/charge-disputes/` |
| `failure approach/` | The Failure Approach ([`failureApproach.ts`](src/data/failureApproach.ts)): the studies' graded runs, cross-checked against the guidelines and the Golden Task |
| The universe recordings | The video strip ([`videos.ts`](src/data/videos.ts)) and `public/videos/universe/` |

[CLAUDE.md](CLAUDE.md) carries the full mapping, the generators and the conventions each data file
follows.

## Adding the next golden task

1. Add `src/data/tasks/<id>.ts` exporting a `GoldenTask`, including all ten `stages`.
2. Put the real artifacts under `public/tasks/<id>/`: `inputs/`, `gt/`, `ot/`, and `compare/` for
   the subjective clips.
3. Register it in the `tasks` array in [`src/data/index.ts`](src/data/index.ts).

The task then appears on Golden Tasks, gets a walkthrough, joins the ⌘K index, and any link pointing
at it resolves.

## Design

Tailwind, with one neutral ramp (`ink-50` … `ink-950`) backed by CSS variables that invert under
`html.dark`, so light and dark are one set of utilities. `brand` is the indigo action colour, `gold`
the Golden Task and Green Shell accent. Space Grotesk display, Inter body, JetBrains Mono for the
machine-readout register: filenames, ids, labels, numerals. Component classes live in the
`@layer components` block of [`src/index.css`](src/index.css). Both themes are checked before a
change ships.
