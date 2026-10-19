/**
 * The Universe Viewers, where a contributor opens a universe and explores it
 * in the browser.
 *
 * The card on the landing page and the update notice both open the Universes
 * tab, where the hub runs the three persona viewers itself; they used to be a
 * separate deployment the card left the site for. `body` and `note` say only
 * what the viewers themselves say: one persona's apps, files and messages per
 * viewer, and a slow first open. `url` is a hub route, so it opens in place.
 */
export const universeViewers = {
  url: "/universes",
  label: "Essential resource",
  title: "Explore Universe Viewers",
  body: "Access your universe and explore it in the browser. Each viewer holds one persona's apps, files and messages, so you know what the data holds before you build a task on it.",
  cta: "Open Universe Viewers",
  note: "The first open of each universe takes a few seconds.",
};
