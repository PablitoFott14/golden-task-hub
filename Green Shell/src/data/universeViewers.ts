/**
 * The Universe Viewers, where a contributor opens a universe and explores it
 * in the browser.
 *
 * It is its own deployment, not anything the hub runs, so the card on the
 * landing page leaves the site and is marked as leaving it. `body` and `note`
 * say only what the viewers themselves say: one persona's apps, files and
 * messages per viewer, and a slow first open. If the site moves, this is the
 * only place that changes.
 */
export const universeViewers = {
  url: "https://universe-viewers.vercel.app/",
  label: "Essential resource",
  title: "Explore Universe Viewers",
  body: "Access your universe and explore it in the browser. Each viewer holds one persona's apps, files and messages, so you know what the data holds before you build a task on it.",
  cta: "Open Universe Viewers",
  note: "Opens in a new tab. The first open takes a few seconds.",
};
