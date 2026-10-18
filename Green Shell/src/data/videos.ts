import type { VideoGuide, XLink } from "./types";

/**
 * The Universe Interaction recordings, one per step of the loop: load it,
 * explore it, redeploy it when it came up wrong, download it whole. They are
 * screen recordings of the real thing, so each one carries the mistake it
 * answers and the move that replaces it, and both are read beside the player
 * rather than on the landing page.
 *
 * The hub plays its own copies rather than linking the guidelines' host, so a
 * recording added to section 1.2.1 lands here as an entry rather than as a
 * crosslink under the strip.
 */
export const universeVideos: VideoGuide[] = [
  {
    n: 1,
    id: "load-the-universe",
    title: "Load the universe",
    covers: "Paste the artifact ID, snapshot and load, then count the servers.",
    seen: "The Service Universe Artifact ID left empty because the field says optional, or the run stopped at the bootstrap warning.",
    fix: "Paste the ID every time, click Snapshot and Load, then confirm you have 11 to 14 servers. Fewer means it did not load, so fix that before you start.",
    duration: "1:21",
    seconds: 81,
    src: "videos/universe/01-load-the-universe.mp4",
    poster: "videos/universe/01-load-the-universe.jpg",
  },
  {
    n: 2,
    id: "explore-the-universe",
    title: "Explore the universe",
    covers: "Interact through the Agent in the Database tab until you have evidence.",
    seen: "A scroll through the visualizer, then a conclusion that the scenario has no support in the data.",
    fix: "Explore through the Agent in the Database tab, and keep asking until you have real evidence. Looking is not interacting.",
    duration: "2:14",
    seconds: 134,
    src: "videos/universe/02-explore-the-universe.mp4",
    poster: "videos/universe/02-explore-the-universe.jpg",
  },
  {
    n: 3,
    id: "redeploy-the-universe",
    title: "Redeploy if it loaded wrong",
    covers: "Recover a universe that came up empty, before you review the task.",
    seen: "A review picked up on a task where the attempter loaded the universe incorrectly.",
    fix: "Redeploy with the artifact ID before you review, so you are reading the universe the task was built on.",
    duration: "0:39",
    seconds: 39,
    src: "videos/universe/03-redeploy-the-universe.mp4",
    poster: "videos/universe/03-redeploy-the-universe.jpg",
  },
  {
    n: 4,
    id: "download-the-universe",
    title: "Download the whole universe",
    covers: "Export the universe as a SQL dump and read it outside the chat.",
    seen: "A universe explored a question at a time through the chat panel, then a scenario built on whatever came back, or dropped because the data looked like it was not there.",
    fix: "Open the agentenv menu in the Database tab and choose Export SQL dump. Every table at once, so you can see what the universe actually holds instead of asking for it one query at a time.",
    duration: "0:04",
    seconds: 4,
    src: "videos/universe/04-download-the-universe.mp4",
    poster: "videos/universe/04-download-the-universe.jpg",
    // Shot at 1920 by 1200, unlike the first three.
    aspect: "1920 / 1200",
  },
];

/**
 * The pitch on the landing page. The slogan is split the way the hero splits
 * its own, lead in ink and the half that lands in the accent, and `stakes` is
 * the consequence stated once and plainly. Universe interaction is point 1 of
 * the guidelines, so the cost of skipping it is the reason the band is there.
 */
export const universeVideoPitch = {
  eyebrow: "Universe interaction",
  slogan: "Four minutes now,",
  sloganAccent: "or a rejected task later.",
  sub: "Point 1 of the guidelines, in four recordings. Each one carries the mistake it answers.",
  stakes:
    "A task without universe interaction is rejected automatically. It is the most common reason tasks fail right now, and a run of rejections is what puts your place on the project at risk.",
};

/** Where the set points once it has been watched. */
export const universeVideoLinks: XLink[] = [
  { to: "/#universe", tag: "M2", label: "Go find the story, do not invent one" },
  { to: "/reference#s2", tag: "B1", label: "Is the universe doing real work?" },
  { to: "/reference#universe-every-prompt", tag: "FAQ", label: "How much does the task have to use it?" },
];

/** Total running time of the set, as m:ss. */
export const universeVideoRuntime = (() => {
  const total = universeVideos.reduce((n, v) => n + v.seconds, 0);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
})();
