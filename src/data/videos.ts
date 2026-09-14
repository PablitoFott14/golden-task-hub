import type { VideoGuide, XLink } from "./types";

/**
 * The Universe Interaction recordings, one per step of the loop: load it,
 * explore it, redeploy it when it came up wrong. They are screen recordings of
 * the real thing, so each one carries the mistake it answers and the move that
 * replaces it, and both are read beside the player rather than on the landing
 * page.
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
];

/** Where the set points once it has been watched. */
export const universeVideoLinks: XLink[] = [
  { to: "/#universe", tag: "M1", label: "Go find the story, do not invent one" },
  { to: "/checklist#s2", tag: "B1", label: "Is the universe doing real work?" },
  { to: "/faq#universe-every-prompt", tag: "FAQ", label: "Does every prompt have to use it?" },
];

/** Total running time of the set, as m:ss. */
export const universeVideoRuntime = (() => {
  const total = universeVideos.reduce((n, v) => n + v.seconds, 0);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
})();
