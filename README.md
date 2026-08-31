# Golden Task Hub

The central reference point for contributors building **multi-turn multimodal rubric tasks** on the
Red Shell / OpenClaw MM Rubrics project.

It exists to answer four questions quickly, and then get out of the way:

- **What does a strong completed task actually look like?** → Golden tasks
- **What are the latest project clarifications, and has this grey area already been addressed?** → Spec doc
- **What should I check before submitting?** → Pre-submit
- **What is the expected process, step by step?** → the nine steps on the home page

Press <kbd>⌘K</kbd> (or <kbd>Ctrl</kbd>+<kbd>K</kbd>) anywhere to search every task section, clarification,
pre-submit check, process step and change-log entry at once.

---

## The four tabs

| Tab | What is in it |
| --- | --- |
| **Start here** | An index of the questions people actually arrive with, the nine-step workflow, and everything currently open or unresolved. |
| **Golden tasks** | One worked task per page: the conversation as the agent received it, the input pack, the evidence ledger behind every decision, the objective and subjective rubric sets, and what the failing run actually did. |
| **Spec doc** | The eight clarifications with the proposal drafted against each, the places two source documents currently disagree, the decision history, and the outstanding rollout items. |
| **Pre-submit** | The 29-check gate, ticked per check with progress kept in the browser. The printable PDF is one click away. |

Resources are cross-linked in both directions. A pre-submit check points at the part of the golden
task that demonstrates it; a section of the golden task points back at the checks and the
clarifications that govern it.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run typecheck
```

> **Note.** `npm install` fails inside the Google Drive mirror (`EBADF` / `EPERM` on
> `node_modules`). Develop from a local checkout of the repo, not from the Drive folder.

Deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every
push to `main`. Routing is hash-based so deep links survive a static host with no SPA rewrite.

## Adding the next golden task

1. Add `src/data/tasks/<id>.ts` exporting a `GoldenTask` (the shape is in
   [`src/data/types.ts`](src/data/types.ts)).
2. Drop the real artifacts under `public/tasks/<id>/` — `inputs/`, `gt/`, `ot/`.
3. Register it in the `tasks` array in [`src/data/index.ts`](src/data/index.ts).

That is the whole change. The task appears on the Golden tasks tab, is indexed in ⌘K, and any
`XLink` pointing at it resolves — no page edits.

## Where the content came from

This app is a working surface over documents that live elsewhere. When they disagree, the
guidelines win.

| Source | Feeds |
| --- | --- |
| `[External] OpenClaw MM Rubrics MULTI TURN – Guidelines` | The source of truth every section ref points into |
| `Coruses & Screenings/Guidelines/presubmit-gate.pdf` | The pre-submit tab, and the PDF shipped in `public/docs/` |
| `Project clarifications - outstanding to do's/clarifications.md` | The eight clarifications |
| `…/purposed_solution.md` | The proposal on each clarification |
| `…/taxonomy_updates.md` | The decision history and the flagged decisions |
| `…/outstanding_todo's.md` | The rollout to-do list |
| `Tasks/6a7965b63b7d368e70c7de4a` | The vendor closeout golden task, including its real artifacts |

Content is transcribed into typed data files rather than parsed at build time, so the hub does not
go stale silently when a source document moves — but it does mean **editing a source document is
only half the change**. Update the matching entry here and redeploy.

## Design

Built with the Hallmark design system: modern-minimal genre, Cobalt theme, Index-First
macrostructure. Space Grotesk display, IBM Plex Sans body, JetBrains Mono for the machine-readout
register (filenames, ids, labels, code, numerals). Tokens live in
[`src/tokens.css`](src/tokens.css); nothing outside that file declares a colour or a font.
