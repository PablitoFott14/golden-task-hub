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
      "The whole project in one pass: what you produce, the vocabulary everything else assumes, the workflow end to end, and the standard each deliverable is held to. Reference material, no quizzes.",
    cover: "onboarding/intro-cover.png",
    url: "https://pablitofott14.github.io/MM-Rurics-Multimodal-Slides/",
    stats: [
      { k: "33", v: "slides" },
      { k: "14", v: "sections" },
    ],
    covers: [
      "Your role, and the terms the rest of the project assumes",
      "The workflow, the hard rules and the task package",
      "Building the idea: universe first, then the scenario",
      "The prompt, the two legs and the 50% failure gate",
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
      "Twenty three errors taken from the audit record, each with the rule it breaks and a real task showing it happen. Every section carries its own slides and the guidance that would have caught it.",
    cover: "onboarding/errors-cover.png",
    url: "https://pablitofott14.github.io/red-shell-common-errors/",
    stats: [
      { k: "23", v: "errors" },
      { k: "7", v: "sections" },
    ],
    covers: [
      "What each error costs: the task, a client standard, or points",
      "The sections of the guidelines that already answer it",
      "Real examples pulled apart, with the task they came from",
      "How to catch the same thing in your own task",
    ],
    cta: "Open the onboarding",
    tone: "rose",
  },
];
