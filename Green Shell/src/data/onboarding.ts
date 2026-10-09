import type { OnboardingItem } from "./types";

/**
 * The two onboardings.
 *
 * **They are linked, not embedded, and that is deliberate.** Both are complete
 * applications with their own navigation, deployed from their own repositories
 * and updated independently of the hub:
 *
 * - The Common Errors viewer is a single page app with its own tab bar, its own
 *   deep links and copy to clipboard actions. Putting it in an iframe nests a
 *   tab bar inside a tab bar, and the hub's sticky header fights its chrome.
 * - The intro deck runs 1920 by 1080 slides on keyboard navigation. In an iframe
 *   at hub width it letterboxes, and the arrow keys are swallowed by whichever
 *   frame has focus.
 *
 * Linking also means neither can go stale here: they are rebuilt and
 * redeployed from their own repos, and the hub always points at the current
 * one. What the hub owes them is discovery, so the cards carry the real cover
 * slide, the real counts and what is actually inside, rather than a bare link.
 *
 * `cover` is the deck's own first slide, downscaled into `public/onboarding/`.
 * Re-cut it from the source deck when one is rebuilt.
 */
export const onboardingItems: OnboardingItem[] = [
  {
    id: "intro",
    n: 1,
    title: "Intro Onboarding",
    tagline: "Start here on your first day.",
    blurb:
      "The single turn project in one pass: what changed from Red Shell, how a task works, and every step from your task parameters to the subjective block. Each slide names the guidelines sections it comes from.",
    cover: "onboarding/intro-cover.png",
    url: "https://pablitofott14.github.io/MM-Rubrics-Multimodal-Slides-Green-Shell/",
    stats: [
      { k: "15", v: "slides" },
      { k: "7", v: "sections" },
    ],
    covers: [
      "What changed from Red Shell, row by row",
      "One prompt, two legs and the three things you hand in",
      "Planning: task parameters, the universe, multimodal inputs, the GTFA and the prompt",
      "Leg A and the 30% failure bar",
      "Objective rubrics, the golden solution and the subjective block",
    ],
    cta: "Open the onboarding",
    tone: "brand",
  },
  {
    id: "common-errors",
    n: 2,
    title: "Common Errors",
    tagline: "The mistakes that are costing people their tasks.",
    blurb:
      "Seventeen errors from the Red Shell audit record that are still errors under Green Shell, each restated against the Green Shell rules. Every example number opens the real Red Shell task on the exact spot.",
    cover: "onboarding/errors-cover.png",
    url: "https://pablitofott14.github.io/green-shell-common-errors/",
    stats: [
      { k: "17", v: "errors" },
      { k: "26", v: "examples" },
    ],
    covers: [
      "The rule each error breaks, quoted from the Green Shell guidelines and spec",
      "The 30% failure floor, taught as a rule",
      "Real Red Shell examples, with the mistake marked and the fix under it",
      "How to catch the same thing in your own task",
    ],
    cta: "Open the onboarding",
    tone: "rose",
  },
];
