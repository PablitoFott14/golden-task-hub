import type { FaqItem } from "./types";

const GT = "/golden-tasks/charge-disputes";

/**
 * Transcribed from `F&Q.md` in this repo, with grammar and wording cleaned up
 * and the meaning left exactly as it was. Cross-links are added here, not in
 * the source file.
 *
 * Grouped by topic, in the order of `faqTopics`, so related questions sit
 * together. `refs` cite the Green Shell guidelines' own section numbers. The
 * War Room entry carries none, because no section of the guidelines covers
 * support hours, and the renderers leave the references out when it is empty.
 * Every other entry needs at least one.
 *
 * Oct 19, 2026: the multi-turn entries were brought over to single turn. The
 * milestone and conversation ending questions went, since Green Shell has no
 * milestones and no follow ups; inputs.zip, Leg B and the universe question
 * were rewritten for one prompt. Five clarifications from contributors' own
 * questions were added: assigned tools, assigned capabilities, the Text
 * modality against the three input minimum, missing preseeded images, and War
 * Room hours.
 */
export const faq: FaqItem[] = [
  {
    n: 1,
    id: "assigned-tools",
    topic: "Parameters",
    q: "Do I need to use every assigned tool?",
    a: [
      "Ideally, yes. Assigned tools are the services the agent works with, and the task should stay as close to its assigned parameters as it can.",
      "You should not have to force them. Build the task around its primary and secondary capabilities, and the calls to the assigned tools follow naturally from that work.",
      "Avoid both extremes: calling a tool only to tick it off, and leaving an assigned tool out without a reason. Deviate only when it is genuinely necessary, for example when an assigned tool does not exist in your universe.",
    ],
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.1.2", title: "Rest of the Parameters" },
    ],
    links: [
      { to: "/#parameters", tag: "M1", label: "Fourteen are assigned, and none of them is a suggestion" },
      { to: "/reference#assigned-capabilities", tag: "FAQ", label: "Tools are not capabilities" },
    ],
  },
  {
    n: 2,
    id: "assigned-capabilities",
    topic: "Parameters",
    q: "Do I need to test every primary and secondary capability I was assigned?",
    a: [
      "Yes. Capabilities are what the task tests, a different list from the tools it uses, and the task is expected to cover every one it was assigned.",
      "Exercise each capability through meaningful interaction with the universe, so it shapes the work and the result rather than only appearing in the prompt.",
      "Deviate only when a real limitation of the universe stops the assigned behaviour from happening. Universe interaction and sticking to the assigned parameters are especially important here.",
    ],
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.1.2", title: "Rest of the Parameters" },
    ],
    links: [
      { to: "/#parameters", tag: "M1", label: "Fourteen are assigned, and none of them is a suggestion" },
      { to: "/#universe", tag: "M2", label: "Go find the story, do not invent one" },
    ],
  },
  {
    n: 3,
    id: "universe-every-prompt",
    topic: "Universe",
    q: "How much does my task need to use the universe?",
    a: [
      "More than a single lookup. One server check or one write is not enough: several servers are expected to be involved, and the agent has to read the universe, not only write to it.",
      "The universe and the multimodal inputs are expected to depend on each other rather than run in parallel. A value read off an image, for example, is what lets the agent find the matching record in the universe.",
    ],
    refs: [
      { section: "1.2.1", title: "Start With the Universe" },
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
    ],
    links: [
      { to: "/#universe", tag: "M2", label: "Go find the story, do not invent one" },
      { to: `${GT}#universe`, tag: "GT", label: "Four services, and neither modality decorative" },
    ],
  },
  {
    n: 4,
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
      { to: "/reference#s2", tag: "B1", label: "One fact that lives only in a connected service" },
      { to: "/spec#trajectory", tag: "QC", label: "Architectural Depth and Friction Exposure" },
    ],
  },
  {
    n: 5,
    id: "text-modality-inputs",
    topic: "Inputs",
    q: "My assigned input modality is Text. Do I still need three multimodal inputs, and do they have to be text files?",
    a: [
      "You still need at least three multimodal inputs. They do not have to be three .txt or .md files.",
      "An input modality is the kind of information the model has to process, not a file format. Text can reach the model through an image, a video, a document or another format, as long as the model genuinely has to process that text and reconcile it with the universe. Other media can be part of the set when they naturally support the task, and natural distractors are fine when they have a purpose.",
      "Three is only the minimum. Genuinely challenging the model often takes more complex multimodal interaction than that.",
    ],
    refs: [
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
      { section: "1.1.2", title: "Rest of the Parameters" },
    ],
    links: [
      { to: "/#inputs", tag: "M4", label: "Three is the floor, not the target" },
      { to: "/reference#input-noise", tag: "FAQ", label: "Noise and distractor files" },
    ],
  },
  {
    n: 6,
    id: "preseeded-images",
    topic: "Inputs",
    q: "My preseeded image is missing or shows Page Not Found. What do I do?",
    a: [
      "Keep building. Preseeded images are optional reference material, not a required input, so a missing one should not hold the task up.",
      "You can use the images provided, make your own, or combine both. If an image is missing or will not open, create suitable multimodal context yourself.",
    ],
    refs: [{ section: "1.2.2", title: "Select the Multimodal Inputs" }],
    links: [{ to: "/#inputs", tag: "M4", label: "Attach what the person would actually have" }],
  },
  {
    n: 7,
    id: "zip-vs-folder",
    topic: "Inputs",
    q: "What is the difference between inputs.zip and the inputs folder?",
    a: [
      "inputs.zip goes in the Draft History, and the model never interacts with it. It carries every file the prompt refers to, including at least three multimodal inputs covering every assigned input modality.",
      "The inputs folder is uploaded when you set up the run, as a normal folder rather than a ZIP, and Create Universe turns it into the files the agent works with during the run. The task is single turn, so nothing is held back for later.",
    ],
    refs: [
      { section: "1.3", title: "Defining the Draft History" },
      { section: "2.2", title: "Upload Folders" },
    ],
    links: [{ to: "/#inputs", tag: "M4", label: "Attach what the person would actually have" }],
  },
  {
    n: 8,
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
      { to: "/#inputs", tag: "M4", label: "Attach what the person would actually have" },
      { to: "/reference#s2", tag: "B2", label: "Take the attachments away" },
      { to: `${GT}#inputs`, tag: "GT", label: "Nine files, and the fact each one carries" },
    ],
  },
  {
    n: 9,
    id: "memory-md",
    topic: "Conversation",
    q: "Is MEMORY.md mandatory in every single task?",
    a: [
      "No. MEMORY.md is optional, and there is no requirement to use it.",
      "The only rule is that when you do use it, it has to arrive naturally, the way an actual user would ask for it. Someone planning to come back to the conversation later has a real reason to keep decisions somewhere. Someone who does not, does not.",
    ],
    refs: [{ section: "1.2.3", title: "Create the Prompt" }],
    links: [
      { to: "/#prompt", tag: "M5", label: "One prompt, and everything the task needs is in it" },
      { to: `${GT}#prompt`, tag: "GT", label: "disputes.html asked for by name, with a reason" },
    ],
  },
  {
    n: 10,
    id: "model-b-prompts",
    topic: "Conversation",
    q: "How do I correct the model in Leg B?",
    a: [
      "Leg B opens a new conversation on the same prompt, word for word. From there you are the user simulator: you send what the conversation needs next to reach the golden solution.",
      "Correct the model with hints, as many as it takes, each saying what is still missing from the user's point of view. Never tell it what to write, name the answer, or step outside the persona.",
    ],
    refs: [
      { section: "6.1", title: "What Changes from Leg A" },
      { section: "6.2", title: "Steering the Run & Hinting" },
    ],
    links: [
      { to: "/#golden", tag: "M9", label: "Point at the intent, never at the answer" },
      { to: `${GT}#golden`, tag: "GT", label: "How a misread $8.74 was recovered without naming it" },
    ],
  },
  {
    n: 11,
    id: "subjective-negative",
    topic: "Rubrics",
    q: "Can a subjective rubric be negative, or does the block have to be positive criteria?",
    a: [
      "Negatives are expected. You write one whenever the side by side surfaces something that genuinely hurts the reader's experience of the artifact, and a block that only ever praises is a block that stopped looking.",
      "The weight set is the objective block's, −5, −3, −1, +1, +3, +5, and any value outside it fails Rubric Structure on its own. What changes is the meaning. A positive weight is the benefit when the property is there, a negative weight is the damage when the flaw is there, and neither is scaled by how hard the property was to achieve.",
      "Write the flaw the way you write a property: one named element, one thing a reader can see. Text overflowing the slide frame, two body sizes across one document, a placeholder caption left under a photograph.",
    ],
    refs: [
      { section: "7.1", title: "Writing Subjective Rubrics" },
      { section: "7.2", title: "Subjective Rubric Weights" },
    ],
    links: [
      { to: "/#subjective", tag: "M10", label: "Judge the render, nothing the prompt asked for" },
      { to: "/reference#s7", tag: "G2", label: "Weights measure impact, not difficulty" },
    ],
  },
  {
    n: 12,
    id: "subjective-presence",
    topic: "Rubrics",
    q: "Does every subjective criterion have to be Not Present for Model A?",
    a: [
      "No. There is no Present or Not Present requirement on either model. The criteria come out of comparing the two final artifacts, so positives naturally end up tied to the golden and negatives to the weaker run, because those are the runs that earned them. That is a tendency, not a rule.",
      "A positive can be Present in Model A, and a negative can be Not Present in both. Neither is a fault in the set. A criterion the observed run already satisfies stays in the block, because it is still a property the artifact needs.",
      "One outcome is not intended: a negative Present in the golden. The golden is the best available solution, so nothing that damages the reader's experience can survive in it. If a negative does come out Present for Model B, the artifact is what needs fixing, not the criterion.",
    ],
    refs: [
      { section: "7.1", title: "Writing Subjective Rubrics" },
      { section: "7.5", title: "Rating Against both Models and Justifications" },
    ],
    links: [
      { to: "/reference#s7", tag: "G3", label: "Rate every criterion against both models yourself" },
      { to: `${GT}#subjective`, tag: "GT", label: "Eleven criteria, each on the two renders" },
    ],
  },
  {
    n: 13,
    id: "war-room",
    topic: "Support",
    q: "Is War Room support available on weekdays?",
    a: [
      "Yes, weekday War Room support is expected, although availability can vary.",
      "Pablo generally covers 7 AM to 11 AM PDT, and support may be available outside those hours too. Reach out whenever you need clarification, and support will join when available.",
    ],
    refs: [],
  },
];

export const guidelinesTitle =
  "[External] Green Shell, Guidelines v1";

export const faqTopics = [
  "All",
  "Parameters",
  "Universe",
  "Inputs",
  "Conversation",
  "Rubrics",
  "Support",
] as const;
