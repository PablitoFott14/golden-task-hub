# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working anywhere in this repo.

## Two projects, one repo

This repo holds two independent static React sites. They are complete duplicates of each other as
of Oct 1, 2026, and they diverge from here.

| Folder | Project | Published | Edit it? |
| --- | --- | --- | --- |
| [Green Shell/](Major%20Shin/) | Green Shell | **Yes.** It is the Pages site at <https://pablitofott14.github.io/golden-task-hub/> | Yes. This is the active project. |
| [Red Shell/](Red%20Shell/) | Red Shell | No. Preserved and buildable, not deployed. | **No.** Frozen reference. |

**All new work targets Green Shell.** Red Shell is kept exactly as it was the day the split
happened, so it stays independently recoverable. Do not edit anything under `Red Shell/` unless the
user asks for Red Shell by name. A change meant for "the hub" means Green Shell.

Each project carries its own `CLAUDE.md` with the full architecture, conventions, design system and
copy rules for that site. Read the one inside the project you are working in:
[Green Shell/CLAUDE.md](Major%20Shin/CLAUDE.md), [Red Shell/CLAUDE.md](Red%20Shell/CLAUDE.md). They
are the detailed guidance; this file is only the layout.

### Why full duplication rather than a shared core

A shared component layer would be smaller, but it would break the one hard requirement: Red Shell
has to stay untouched. Any component Green Shell edits would be a component Red Shell silently
inherits. The two sites are also expected to diverge structurally rather than only in content, and
each is about 35 source files, so a workspace setup would cost more than it saves. Each project is
therefore self contained: its own `src/`, `public/`, `scripts/`, `package.json`, `index.html` and
config files, with no imports across the folder boundary. **Never import across it.**

## The two sites must not share browser state

Both are served from the same origin, so `localStorage` is shared between them. Every key is
namespaced per project, and the prefixes must stay distinct:

| What | Red Shell | Green Shell |
| --- | --- | --- |
| Checklist ticks | `rsh.presubmit.checks.v1` | `gsh.presubmit.checks.v1` |
| Checklist guidance toggle | `rsh.presubmit.detail.v1` | `gsh.presubmit.detail.v1` |
| Theme | `gth-theme` | `gsh-theme` |

The theme key appears twice in each project, in `src/lib/useTheme.ts` and in the inline no flash
script in `index.html`. **Change both together or the page flashes the wrong theme on load.** Any
new persisted key takes the project's prefix.

## Deployment

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds `Green Shell/` on every push to
`main` and publishes it. GitHub Pages serves one site per repo, which is why only one project is
live. To publish Red Shell instead, swap the two paths in that workflow, `working-directory` and
the artifact `path`. Nothing else in either project depends on which one is deployed: `base` is
`"./"` in both, so either builds correctly at the site root.

## The Google Drive constraint, read this first

The working tree lives at `G:\My Drive\Red Shell\Golden Task Hub`. Drive's sync layer **cannot host
`node_modules` or a `.git` directory**:

- `npm install` in the Drive folder dies with `EBADF` / `EPERM` and leaves a corrupt `node_modules`.
- `git init` in the Drive folder leaves a `.git` directory that becomes unreadable and undeletable
  until Drive releases it.

The repo works around the second: it is set up with `git init --separate-git-dir`, so `.git` is a
one-line *file* pointing at `C:\Users\PABLO\repos\golden-task-hub-drive.git`. **Git commands work
normally from the Drive folder**, so commit and push there.

**npm does not.** Mirror a project to a local path to build or run it. The folder names contain a
space, so quote every path:

```bash
SP=/c/Users/PABLO/AppData/Local/Temp/claude/<session>/scratchpad/build
mkdir -p "$SP" && cd "/g/My Drive/Red Shell/Golden Task Hub/Green Shell"
cp -r src public index.html package.json postcss.config.js tailwind.config.js \
      tsconfig.json vite.config.ts "$SP/"
cd "$SP" && npm install --no-audit --no-fund
```

Mirror the two projects into **separate** scratch directories. One mirror cannot serve both: they
have different `package.json` names and will diverge. Never commit a mirror back wholesale. Edit in
the Drive tree, re-copy `src/` to the mirror to verify.

## Source material lives inside its own project

The guidelines document, the task folders and the CSV exports sit **inside the project they belong
to**, not at the repo root, and are gitignored by the patterns at the foot of
[.gitignore](.gitignore). Red Shell carries the multi-turn guidelines and the vendor closeout task
source; Green Shell carries the Green Shell guidelines and its own task sources. They are what the
projects transcribe into `src/data/`, never site content, and a project reads only its own. Each
project's `CLAUDE.md` carries the table mapping a source document to the data file that holds it.

## Other agent configs

An OpenAI Codex config exists at `~/.codex/config.toml`. If you want its MCP servers, commands or
instructions available here, reply `/import` to see what's importable, then
`/import --yes=<digest>` to apply. (If `/import` isn't available on this surface, run
`claude import` from a terminal.)
