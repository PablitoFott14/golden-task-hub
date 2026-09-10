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
    refs: [
      { section: "1.2.3", title: "Create the Initial Prompt and the Follow-ups" },
      { section: "1.2.5", title: "Common Scenario Issues Getting Tasks Rejected" },
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
    refs: [
      { section: "6.1", title: "What a Milestone is Made of" },
      { section: "6.2", title: "Writing the Milestones" },
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
    refs: [
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
      { section: "2.2", title: "Upload Folders" },
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
    refs: [
      { section: "7.1", title: "What Changes from Leg A" },
      { section: "7.2", title: "Steering the Run and Hinting" },
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
    refs: [
      { section: "1.2.1", title: "Start With the Universe" },
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
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
    refs: [
      { section: "1.2.3", title: "Create the Initial Prompt and the Follow-ups" },
      { section: "6.3", title: "Modifiers" },
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
    refs: [
      { section: "1.2.1", title: "Start With the Universe" },
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
    ],
    links: [
      { to: "/checklist#s2", tag: "B1", label: "One fact that lives only in a connected service" },
      { to: "/spec#trajectory", tag: "QC", label: "Architectural Depth and Friction Exposure" },
    ],
  },
  {
    n: 8,
    id: "subjective-negative",
    topic: "Rubrics",
    q: "Can a subjective rubric be negative, or does the block have to be positive criteria?",
    a: [
      "Negatives are expected. You write one whenever the side by side surfaces something that genuinely hurts the reader's experience of the artifact, and a block that only ever praises is a block that stopped looking.",
      "The weight set is the objective block's, −5, −3, −1, +1, +3, +5, and any value outside it fails Rubric Structure on its own. What changes is the meaning. A positive weight is the benefit when the property is there, a negative weight is the damage when the flaw is there, and neither is scaled by how hard the property was to achieve.",
      "Write the flaw the way you write a property: one named element, one thing a reader can see. Text overflowing the slide frame, two body sizes across one document, a placeholder caption left under a photograph.",
    ],
    refs: [
      { section: "8.1", title: "Writing Subjective Rubrics" },
      { section: "8.2", title: "Subjective Rubric Weights" },
    ],
    links: [
      { to: "/#subjective", tag: "M9", label: "Judge the render, nothing the prompt asked for" },
      { to: "/checklist#s6", tag: "F2", label: "Weights measure impact, not difficulty" },
    ],
  },
  {
    n: 9,
    id: "subjective-presence",
    topic: "Rubrics",
    q: "Does every subjective criterion have to be Not Present for Model A?",
    a: [
      "No. There is no Present or Not Present requirement on either model. The criteria come out of comparing the two final artifacts, so positives naturally end up tied to the golden and negatives to the weaker run, because those are the runs that earned them. That is a tendency, not a rule.",
      "A positive can be Present in Model A, and a negative can be Not Present in both. Neither is a fault in the set. A criterion the observed run already satisfies stays in the block, because it is still a property the artifact needs.",
      "One outcome is not intended: a negative Present in the golden. The golden is the best available solution, so nothing that damages the reader's experience can survive in it. If a negative does come out Present for Model B, the artifact is what needs fixing, not the criterion.",
    ],
    refs: [
      { section: "8.1", title: "Writing Subjective Rubrics" },
      { section: "8.5", title: "Rating Against both Models and Justifications" },
    ],
    links: [
      { to: "/checklist#s6", tag: "F3", label: "Rate every criterion against both models yourself" },
      { to: `${GT}#subjective`, tag: "GT", label: "Ten criteria, each on the two renders" },
    ],
  },
  {
    n: 10,
    id: "input-noise",
    topic: "Inputs",
    q: "Can I add noise and distractor files to the multimodal inputs?",
    a: [
      "Yes, and they are encouraged. Real user data is never curated, so a folder with nothing surplus in it reads as staged. What matters is that the mess is the kind this environment would actually produce, rather than files dropped in to make the set look busy.",
      "The test is purpose, not necessity. Every file is there for a reason: it either carries something the task needs, or it makes the agent separate what is relevant from what is not. What the rules do cut out is junk, so no .env or leftover system files, and no filename, manifest or helper document that gives the answer away.",
      "Realism also lives in the state of the files. Duplicates, an awkward angle, a missing timestamp, a skewed scan, a filename like IMG_0427.jpg. Keep every one of them gradable though: a reviewer has to be able to read the handwriting and hear the audio, or the failure belongs to the task rather than to the model.",
    ],
    refs: [
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
      { section: "2.2", title: "Upload Folders" },
    ],
    links: [
      { to: "/#inputs", tag: "M2", label: "Attach what the person would actually have" },
      { to: "/checklist#s2", tag: "B2", label: "Take the attachments away" },
      { to: `${GT}#inputs`, tag: "GT", label: "Eleven files, and the fact each one carries" },
    ],
  },
];

export const guidelinesTitle =
  "[External] OpenClaw MM Rubrics MULTI TURN, Guidelines v2";

export const faqTopics = [
  "All",
  "Universe",
  "Inputs",
  "Rubrics",
  "Milestones",
  "Conversation",
] as const;
