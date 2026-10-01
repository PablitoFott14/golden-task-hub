# Golden Task Hub

Two independent static React sites, one repo.

| Folder | Project | Status |
| --- | --- | --- |
| [Major Shin/](Major%20Shin/) | Major Shin | **Live** at <https://pablitofott14.github.io/golden-task-hub/> |
| [Red Shell/](Red%20Shell/) | Red Shell | Preserved and buildable, not deployed |

Major Shin was created on Oct 1, 2026 as a complete duplicate of Red Shell, and the two diverge
from there. All new work targets Major Shin. Red Shell is kept exactly as it was at the split so it
stays independently recoverable.

Each project is self contained, with its own `src/`, `public/`, `scripts/`, `package.json` and
config. Neither imports from the other. Each carries its own `README.md` describing the site, and
its own `CLAUDE.md` with the architecture and conventions.

## Running one

```bash
cd "Major Shin"      # or "Red Shell"
npm install
npm run dev          # vite on :5173
npm run build        # tsc --noEmit && vite build  ->  dist/
```

On the Google Drive working tree `npm` cannot run in place. See [CLAUDE.md](CLAUDE.md) for the
mirror step and the rest of the repo layout.

## Deployment

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds `Major Shin/` on every push to
`main` and publishes it to GitHub Pages. Pages serves one site per repo, which is why only one
project is live. To publish Red Shell instead, swap the two paths in that workflow.
