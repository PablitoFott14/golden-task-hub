import type { FaqItem } from "./types";

const GT = "/golden-tasks/vendor-closeout";

/**
 * Transcribed from `F&Q.md` in this repo, with grammar and wording cleaned up
 * and the meaning left exactly as it was. Cross-links are added here, not in
 * the source file.
 */
export const faq: FaqItem[] = [
  {
    n: 1,
    id: "memory-md",
    topic: "Conversation",
    q: "Is MEMORY.md mandatory in every single task?",
    a: [
      "No. MEMORY.md is optional, and there is no requirement to use it.",
      "The only rule is that when you do use it, it has to arrive naturally, the way an actual user would ask for it. Someone planning to come back to the conversation later has a real reason to keep decisions somewhere. Someone who does not, does not.",
    ],
    links: [
      { to: "/#draft-history", tag: "M4", label: "Say why the agent is there, not what to type" },
      { to: `${GT}#turns`, tag: "GT", label: "MEMORY.md asked for in turn 1, with a reason" },
    ],
  },
  {
    n: 2,
    id: "milestone-atomicity",
    topic: "Milestones",
    q: "Do milestones need to be atomic, or can a single milestone cover several related outcomes?",
    a: [
      "Atomic. Each intent in each prompt gets its own milestone.",
      "A follow up carrying three requirements produces three milestones, not one. A single milestone holding four asks that do not collapse into each other is a paraphrase of the prompt rather than an intent spec.",
    ],
    links: [
      { to: "/#milestones", tag: "M7", label: "One intent, one milestone" },
      { to: "/spec#milestones", tag: "QC", label: "Milestones, Intent-Level Abstraction" },
    ],
  },
  {
    n: 3,
    id: "zip-vs-folder",
    topic: "Inputs",
    q: "What is the difference between inputs.zip and the inputs folder?",
    a: [
      "inputs.zip is uploaded in the Draft History section and the model never interacts with it. It holds every multimodal input planned for the whole conversation, deferred assets included.",
      "The inputs folder is what you send when setting up the run, and the model is expected to interact with it from the first turn. It holds only the initial inputs the opening prompt needs.",
    ],
    links: [{ to: "/#inputs", tag: "M2", label: "Attach what the person would actually have" }],
  },
  {
    n: 4,
    id: "model-b-prompts",
    topic: "Conversation",
    q: "If I used three prompts in Model A, do I need to enter all three in Model B before correcting anything, or can I add and correct them one at a time?",
    a: [
      "One at a time. In Model B you are the user simulator: your job is to reach the milestones and to hint when the model does not.",
      "The same three intents will all show up in Model B, but as the conversation flows rather than in a fixed order. You send what the conversation needs next in order to reach the golden solution.",
    ],
    links: [
      { to: "/#golden", tag: "M8", label: "Point at the intent, never at the answer" },
      { to: `${GT}#golden`, tag: "GT", label: "How the $50,000 figure was recovered without leaking it" },
    ],
  },
  {
    n: 5,
    id: "universe-every-prompt",
    topic: "Universe",
    q: "Do I need to use the universe in every prompt, or is it enough for the overall task to be grounded in it?",
    a: [
      "You do not need it in every prompt. What matters is that a meaningful interaction happens at some point, ideally in turn 1.",
      "A single server check or a single server write is not enough. Multiple servers are expected to be involved, and the universe dependence and the multimodal inputs are expected to relate to each other rather than run in parallel.",
    ],
    links: [
      { to: "/#universe", tag: "M1", label: "Go find the story, do not invent one" },
      { to: `${GT}#universe`, tag: "GT", label: "Two channels, and neither modality decorative" },
    ],
  },
  {
    n: 6,
    id: "ending-the-conversation",
    topic: "Conversation",
    q: "Do I need to explicitly tell the model when the conversation is ending?",
    a: [
      "Not necessary. If the conversation is planned to end, it is natural to signal it inside the final prompt the way anyone does with an agent: “Finally…”, “one last thing…”.",
      "What we do not want is a last turn that announces the conversation is over, or that forces the agent to know it was the end.",
    ],
    links: [{ to: `${GT}#turns`, tag: "GT", label: "Turn 4 closes the arc without announcing it" }],
  },
  {
    n: 7,
    id: "one-app-universe",
    topic: "Universe",
    q: "Can my task live entirely inside one app from the universe, such as FinTrack, as long as I use different parts or tables of it?",
    a: [
      "Better to avoid it. Require the model to touch at least two servers meaningfully.",
      "If only one server ends up in play, it should at least be used at different granularities rather than repeating the same kind of lookup.",
    ],
    links: [
      { to: "/checklist#s2", tag: "B1", label: "One fact that lives only in a connected service" },
      { to: "/spec#trajectory", tag: "QC", label: "Architectural Depth and Friction Exposure" },
    ],
  },
];

export const faqTopics = ["All", "Universe", "Inputs", "Milestones", "Conversation"] as const;
