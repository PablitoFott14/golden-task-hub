import type { GoldenTask } from "../types";

const A = "tasks/vendor-closeout";

export const vendorCloseout: GoldenTask = {
  meta: {
    id: "vendor-closeout",
    serviceId: "6a7965b63b7d368e70c7de4a",
    title: "Vendor closeout pack",
    oneLiner:
      "A wound-down games studio needs a creditor file. The agent has to reconcile a Slack shutdown channel against a folder of screenshots, phone photos and invoices, and issue a receipt only where both agree.",
    category: "Operations & QA",
    subcategory: "Document / Receipt Processing",
    universe: "Harmony Games, Inc., a mobile game studio wound down in early 2026",
    persona: "Leonard Hayes, co-founder and board member",
    turns: 4,
    deliverables: ["VENDORS CANCELLED/", "MEMORY.md", "emails_draft.md", "vendor_cancellation.svg"],
    modalities: ["Screenshots", "Phone photos", "Handwriting", "PDF invoices", "Slack (MCP)"],
    status: "Golden",
    sourcePath: "G:\\My Drive\\Red Shell\\Tasks\\6a7965b63b7d368e70c7de4a",
  },

  premise:
    "Sunset needs the creditor file before it can file, and Fondo is waiting on the same details. Leonard has one folder of whatever he could recover from the week the founders cancelled everything, and a Slack channel where the decisions actually happened. Neither source is sufficient alone, and that is the task.",

  whyGolden: [
    "The rule is stated once, in the user’s own words, and every one of the twenty vendors has to be run through it: Slack confirmation **and** attachment evidence, or it does not get a receipt.",
    "Twelve of the twenty pool vendors have no attachment at all. The media alone gets you four receipts; only the universe gets you the other sixteen rows. Neither modality is decorative.",
    "Every later turn consumes the state the one before it produced, a total across the receipts, a percentage against a figure that is not linked anywhere, then a graphic that has to agree with both.",
    "Model A failed 19 of the 21 objective criteria without the task ever telling it what it missed.",
  ],

  turns: [
    {
      n: 1,
      text: `Leonard here. Sunset needs our creditor file before they can file, and Fondo is waiting on the same stuff for the final fillings. Every vendor we terminated needs to have created a proper closeout record, and we, as board members, are on charge of this. When we cancelled everything back on Feb 2nd week, we were moving fast and we kept track of everything as we went, so I'll be attaching here all I was able to get from that period. Based on what we agreed in the last meeting and given this mess we had during the cancellation process, we are going to start considering cancelled anythinng that can be confirmed through the slack shutdown channel and the existing files evidence.

I'm expecting you to create a "VENDORS CANCELLED" folder with a .pdf cancellation receipt for every vendor whose cancellation can be confirmed. Each file should be named as vendor_name_cancellation_receipt.pdf. For everything else, add the vendor to MEMORY.md under the categories "UNCONFIRMED" (we/they decided to cancel, but we don't have both the Slack confirmation and something in the attachments to back it up) or "NOT CANCELLED" (anything showing the vendor was kept or transferred instead). The vendor pool should be limited to those appearing in the relevant slack channel. Skip anything where the vendor name din't come through properly in the export.`,
      adds: "The classification rule, the two output shapes, and the pool boundary.",
      consumes: "Nothing, this is the opening brief.",
      produces: ["VENDORS CANCELLED/", "MEMORY.md"],
      notes: [
        {
          title: "The rule is a conjunction, and it is stated once",
          body: "“confirmed through the slack shutdown channel and the existing files evidence.” An earlier draft read either/or, which let coderabbit earn a receipt on a Slack line alone. The single word carries four vendors.",
          tone: "accent",
        },
        {
          title: "The pool boundary is what kills the distractor",
          body: "“limited to those appearing in the relevant slack channel.” Datadog has an invoice in the pack and zero mentions in the channel, so it gets no receipt and no MEMORY row.",
          tone: "accent",
        },
        {
          title: "The export clause prevents twenty junk rows",
          body: "“Skip anything where the vendor name didn’t come through properly.” The channel carries 17 redacted PERSON_NAME tokens. An agent that name-extracts without judgement writes all of them into MEMORY.md.",
          tone: "warn",
        },
      ],
    },
    {
      n: 2,
      text: `Now, add up the total amount we still owe across those receipts and create an emails_draft.md. I'll email Robert and Arthur with this, so we all know where we stand.`,
      adds: "A derived figure and a second artifact addressed to named people.",
      consumes: "The four receipts written in turn 1, the sum is scoped to them.",
      produces: ["emails_draft.md"],
      notes: [
        {
          title: "“across those receipts” is the whole scope",
          body: "Singular’s $7,200.00 and Unity’s $6,336.00 are real debts sitting in the attachments, and both are out by construction. A total of $11,232.00 means the agent summed every number it found.",
          tone: "accent",
        },
      ],
    },
    {
      n: 3,
      text: `Include the % this amount represents against the shutdown cost estimation I posted in our executives channel. Can't find it myself, but want it to be referenced in the email as well. Use the subject "vendor closeout - where we stand".`,
      adds: "A second, unlinked source and a literal subject line.",
      consumes: "The $4,032.00 total from turn 2.",
      produces: ["emails_draft.md (updated)"],
      notes: [
        {
          title: "The benchmark is deliberately not linked",
          body: "“Can’t find it myself.” The $50,000 figure sits in #executives on 2025-12-03, months outside the shutdown week and in a different channel. The agent has to go and get it.",
          tone: "accent",
        },
        {
          title: "It is stored as a top-level message, not a thread reply",
          body: "The parent claims reply_count: 1 but the pasted breakdown has a null thread_parent_id. An agent that queries for thread replies finds nothing and has to read the next message in the channel.",
          tone: "warn",
        },
      ],
    },
    {
      n: 4,
      text: `You should have, as I perfectly remember a channel called "executives" and asking chatgpt about this early on December. Anyway, just realized that this information may be easier for Robert and Arthur to understand if I just send an infographic with the insights. Create a vendor_cancellation.svg with the three groups we ended up with and the vendors sitting in each one. Keep the total we owe and the % against the estimate at the top, that's the part they care about. Then mention in the draft that the file will be attached to the email.`,
      adds: "A rendered deliverable and an edit back into an artifact already delivered.",
      consumes: "The classification from turn 1, the total from turn 2, the percentage from turn 3.",
      produces: ["vendor_cancellation.svg", "emails_draft.md (attachment line)"],
      notes: [
        {
          title: "This is the revision turn",
          body: "It changes the brief after something was already delivered, and it names the new asset explicitly, both of which the pre-submit gate asks for at C4.",
          tone: "accent",
        },
        {
          title: "No new reasoning, only agreement",
          body: "The SVG re-presents what turns 1 to 3 produced. The failure to watch for is numbers that drift from the receipts and the email.",
        },
      ],
    },
  ],

  inputs: [
    {
      file: "Screenshot 2026-02-10 143217.png",
      src: `${A}/inputs/Screenshot 2026-02-10 143217.png`,
      kind: "image",
      shows: "Helpshift closure email. Status: Closed, “early mutual termination of your Order Form”.",
      carries: "Final amount due $1,500.00, and the cancellation date as 10 February 2026.",
      vendors: ["Helpshift"],
      role: "evidence",
    },
    {
      file: "pandadoc_export_final.pdf",
      src: `${A}/inputs/pandadoc_export_final.pdf`,
      kind: "pdf",
      shows: "Invoice HS-2026-0455, one line, “Support seats, February 2026”, qty 10.",
      carries: "Total due $1,500.00. Corroborates the closure email and the Slack line “$150*10”.",
      vendors: ["Helpshift"],
      role: "evidence",
    },
    {
      file: "Screenshot 2026-02-11 112340.png",
      src: `${A}/inputs/Screenshot 2026-02-11 112340.png`,
      kind: "image",
      shows: "Reply from support@layer.ai, “I’ve cancelled the harmonygames workspace this morning”.",
      carries: "$2,340.00, sitting mid-sentence rather than in a labelled field.",
      vendors: ["layer"],
      role: "evidence",
    },
    {
      file: "IMG_20260811_133419.jpg",
      src: `${A}/inputs/IMG_20260811_133419.jpg`,
      kind: "photo",
      shows: "Phone photo of a monitor. Soundly Pro with a Canceled badge, canceled 11 February 2026.",
      carries: "Amount due: None, paid through current period. The one row where zero is stated, not inferred.",
      vendors: ["Soundly"],
      role: "evidence",
    },
    {
      file: "IMG_20260811_134605.jpg",
      src: `${A}/inputs/IMG_20260811_134605.jpg`,
      kind: "handwriting",
      shows: "Handwritten notes, “Cursor -> 192 due, Cancelled - 12th feb -> access till 28th”, the 28th written over a struck-out 26.",
      carries: "The $192.00 cursor figure, which exists nowhere else. Also “Singular -> Due 7,200”.",
      vendors: ["cursor", "Singular"],
      role: "evidence",
    },
    {
      file: "Screenshot 2026-02-12 214431.png",
      src: `${A}/inputs/Screenshot 2026-02-12 214431.png`,
      kind: "image",
      shows: "Singular account statement, three open invoices, one marked Deferred (due 1 Apr 2026).",
      carries: "$7,200.00 outstanding. Says nothing about a cancellation.",
      vendors: ["Singular"],
      role: "evidence",
    },
    {
      file: "IMG_348743.jpg",
      src: `${A}/inputs/IMG_348743.jpg`,
      kind: "image",
      shows: "Unity Pro subscription page. Active, 3 seats, renews 1 April 2026.",
      carries: "$6,336.00/yr, and an active status that actively contradicts the drafted termination note.",
      vendors: ["Unity"],
      role: "contradicts",
    },
    {
      file: "IMG_20260811_141216.jpg",
      src: `${A}/inputs/IMG_20260811_141216.jpg`,
      kind: "photo",
      shows: "Printed GitHub receipt #1147, account harmonygames-Games.",
      carries: "$84.00 billed to KubLLC, proof of a transfer, not a cancellation.",
      vendors: ["GitHub"],
      role: "evidence",
    },
    {
      file: "carta_renewal.png",
      src: `${A}/inputs/carta_renewal.png`,
      kind: "image",
      shows: "Carta renewal notice. Status: Active, next renewal 26 Nov 2026, “No action required.”",
      carries: "Confirms Carta was left in place. The “Carta terminations” in Slack are contractor equity access, not the subscription.",
      vendors: ["Carta"],
      role: "evidence",
    },
    {
      file: "dtdg_invoice.pdf",
      src: `${A}/inputs/dtdg_invoice.pdf`,
      kind: "pdf",
      shows: "Datadog invoice, $310.00, subscription active, billed to Harmony Games.",
      carries: "Nothing. Datadog appears zero times in #winddown, so it is outside the pool the prompt defined.",
      vendors: ["Datadog"],
      role: "distractor",
    },
    {
      file: "receipt_format.md",
      src: `${A}/inputs/receipt_format.md`,
      kind: "doc",
      shows: "The receipt template and its five field rules.",
      carries: "The format the four PDFs must follow, including the PST clause that settles the Helpshift date.",
      vendors: [],
      role: "spec",
    },
  ],

  format: {
    file: "receipt_format.md",
    src: `${A}/inputs/receipt_format.md`,
    body: `VENDOR CLOSEOUT RECEIPT
Harmony Games, Inc.

Vendor:              <vendor name>
Service:             <what the vendor provided, one line>
Cancellation date:   <YYYY-MM-DD>
Confirmed by:        <name of the person who confirmed it>
Final amount due:    <amount, or "None outstanding">`,
  },

  universeNotes: [
    {
      title: "#winddown is the pool",
      body: "212 messages, February 2026 only. Twenty vendor names appear in it; four more names are in the channel but are not vendors. SVB and Chase are banks, and two more did not survive the export. Nothing outside this channel is in scope.",
    },
    {
      title: "#executives holds the benchmark",
      body: "2025-12-03, 12:19, “chatgpt says we need $30K-$50K to shut down the company”, then a pasted breakdown recommending “50k all-in as a defensible budget”. Both routes converge on $50,000.",
    },
    {
      title: "Confirmed by resolves to the latest message",
      body: "That is what makes Robert (not Leonard, who asked him) correct for Soundly, and Arthur Blake (not Leonard, who assigned him) correct for cursor. Both need a Slack ID resolved to a name. Robert has no surname anywhere in the universe, accept the bare first name and treat any surname as fabricated.",
    },
    {
      title: "Mentions and difficulty are unrelated",
      body: "layer, Zapier, Deel, Linear, dbt and AWS are each settled by a single message in the whole channel. For layer that message is five words, “I just canceled layer”, and it is the sole Slack basis for a $2,340.00 receipt.",
    },
  ],

  answer: {
    total: "$4,032.00",
    percent: "8.1%",
    basis: "$1,500.00 + $2,340.00 + $0.00 + $192.00 = $4,032.00 · $4,032.00 ÷ $50,000 = 8.06%",
    counts: [
      { label: "receipted", n: 4, tone: "ok" },
      { label: "unconfirmed", n: 4, tone: "warn" },
      { label: "not cancelled", n: 12, tone: "plain" },
    ],
  },

  deliverables: [
    {
      file: "VENDORS CANCELLED/helpshift_cancellation_receipt.pdf",
      what: "Helpshift · 2026-02-10 · Leonard Hayes · $1,500.00",
      src: `${A}/gt/helpshift_cancellation_receipt.pdf`,
      kind: "pdf",
    },
    {
      file: "VENDORS CANCELLED/layer_cancellation_receipt.pdf",
      what: "layer · 2026-02-11 · Leonard Hayes · $2,340.00",
      src: `${A}/gt/layer_cancellation_receipt.pdf`,
      kind: "pdf",
    },
    {
      file: "VENDORS CANCELLED/soundly_cancellation_receipt.pdf",
      what: "Soundly · 2026-02-11 · Robert · None outstanding",
      src: `${A}/gt/soundly_cancellation_receipt.pdf`,
      kind: "pdf",
    },
    {
      file: "VENDORS CANCELLED/cursor_cancellation_receipt.pdf",
      what: "cursor · 2026-02-12 · Arthur Blake · $192.00",
      src: `${A}/gt/cursor_cancellation_receipt.pdf`,
      kind: "pdf",
    },
    {
      file: "MEMORY.md",
      what: "Sixteen rows. 4 UNCONFIRMED, 12 NOT CANCELLED. No entry for any vendor that got a receipt.",
      kind: "md",
    },
    {
      file: "emails_draft.md",
      what: "Subject “vendor closeout - where we stand”, the $4,032.00 total, the 8.1%, and a line saying the SVG travels with it.",
      kind: "md",
    },
    {
      file: "vendor_cancellation.svg",
      what: "Total and percentage at the top, then the three groups with all twenty names. A reference build, not a format to match.",
      src: `${A}/gt/vendor_cancellation.svg`,
      kind: "svg",
    },
  ],

  ledger: [
    {
      vendor: "Helpshift",
      verdict: "receipt",
      amount: "$1,500.00",
      mentions: 7,
      universe: "10 Feb 21:58, “Looks like Helpshift is gonna cancel our subscription… One down 2 more to go.” Plus 9 Feb: “we owe Helpshift $150*10 = $1500”.",
      attachment: "Screenshot 2026-02-10 143217.png. Status: Closed, final amount due $1,500.00. Corroborated by pandadoc_export_final.pdf.",
      why: "Slack, the closure email and the invoice all land on $1,500.00. The confirmation is stored as 2026-02-11T05:58:54Z, but receipt_format.md asks for PST. Converted, Leonard posted at 2026-02-10 21:58.",
    },
    {
      vendor: "layer",
      verdict: "receipt",
      amount: "$2,340.00",
      mentions: 1,
      universe: "11 Feb 11:23, “I just canceled layer.” Leonard, first person. The only mention in the channel.",
      attachment: "Screenshot 2026-02-11 112340.png, support@layer.ai confirms the workspace is cancelled and the final invoice “comes to $2,340.00”.",
      why: "Both sources present. The amount sits mid-sentence rather than in a labelled field, which is what makes reading it work rather than lookup.",
    },
    {
      vendor: "Soundly",
      verdict: "receipt",
      amount: "None outstanding",
      mentions: 2,
      universe: "11 Feb 11:22 Leonard asks Robert to cancel; 11:48 Robert replies “Soundly canceled”.",
      attachment: "IMG_20260811_133419.jpg. Soundly Pro, Canceled badge, “Amount due: None, paid through current period”.",
      why: "Confirmed by resolves to Robert, the latest message. Zero counts as zero in the total, not as missing data.",
    },
    {
      vendor: "cursor",
      verdict: "receipt",
      amount: "$192.00",
      mentions: 3,
      universe: "12 Feb 14:59, Arthur: “cursor and […] cancelled”.",
      attachment: "IMG_20260811_134605.jpg, handwritten, “Cursor -> 192 due, Cancelled - 12th feb”.",
      why: "The only amount in the whole pool that exists exclusively in handwriting.",
    },
    {
      vendor: "coderabbit",
      verdict: "unconfirmed",
      mentions: 3,
      universe: "12 Feb 14:50, Arthur: “coderabbit is cancelled”. As clean a confirmation as any in the channel.",
      attachment: "None.",
      why: "The sharpest test in the task. A convincing sentence with nothing behind it. The prompt requires both sources, so this is UNCONFIRMED.",
    },
    {
      vendor: "Singular",
      verdict: "unconfirmed",
      mentions: 12,
      universe: "12 Feb 13:41 Leonard drafts the termination note; the Gmail thread ends 13:43 with no vendor reply.",
      attachment: "Screenshot 2026-02-12 214431.png, three open invoices totalling $7,200.00, one Deferred. Nothing states a cancellation.",
      why: "No confirmation, and the document shows debt rather than closure. The $7,200.00 must not enter the email total. Singular gets no receipt.",
    },
    {
      vendor: "Unity",
      verdict: "unconfirmed",
      mentions: 10,
      universe: "12 Feb 13:35, Leonard drafts a note for Arthur to send. No confirmation follows.",
      attachment: "IMG_348743.jpg. Unity Pro · Active, renews 1 April 2026, $6,336.00/yr.",
      why: "The attachment actively contradicts cancellation. Drafting a termination note is not terminating.",
    },
    {
      vendor: "Zapier",
      verdict: "unconfirmed",
      mentions: 1,
      universe: "11 Feb 11:55, “Zapier, […], cursor, coderabbit we should just cancel.” Never mentioned again.",
      attachment: "None.",
      why: "The only vendor with neither a confirmation nor a document. An intention, recorded once.",
    },
    {
      vendor: "Deel",
      verdict: "not-cancelled",
      mentions: 1,
      universe: "12 Feb 14:00, “let’s keep Deel, gusto, Intuit.”",
      attachment: "None.",
      why: "Kept running through the shutdown.",
    },
    {
      vendor: "gusto",
      verdict: "not-cancelled",
      mentions: 3,
      universe: "12 Feb 14:00, “let’s keep Deel, gusto, Intuit.”",
      attachment: "None.",
      why: "Kept because the team needed access to documents.",
    },
    {
      vendor: "Intuit",
      verdict: "not-cancelled",
      mentions: 2,
      universe: "11 Feb 11:54, “I’ll keep Intuit for now.”",
      attachment: "None.",
      why: "Kept running through the shutdown.",
    },
    {
      vendor: "Linear",
      verdict: "not-cancelled",
      mentions: 1,
      universe: "12 Feb 14:00, “linear we keep during transition.”",
      attachment: "None.",
      why: "Kept during the transition.",
    },
    {
      vendor: "Slack",
      verdict: "not-cancelled",
      mentions: 25,
      universe: "12 Feb 14:05, keep the accounts holding our data until it is extracted.",
      attachment: "None.",
      why: "A downgrade that ended in three retained paid seats. Mentioned constantly, mostly as the medium rather than the subject.",
    },
    {
      vendor: "google",
      verdict: "not-cancelled",
      mentions: 5,
      universe: "12 Feb 14:05, both “archive account on google after Feb 15” and “we keep accounts that has our data… until the data is extracted”.",
      attachment: "None.",
      why: "Kept until the data is extracted. The channel genuinely says two things here, grade this one loosely.",
    },
    {
      vendor: "GitHub",
      verdict: "not-cancelled",
      mentions: 2,
      universe: "12 Feb 15:00, Arthur: “I’ll be moving github, […], and Metabase to my KubLLC card”.",
      attachment: "IMG_20260811_141216.jpg, receipt #1147, $84.00, billed to KubLLC.",
      why: "Transferred, not cancelled. The attachment proves the transfer.",
    },
    {
      vendor: "Metabase",
      verdict: "not-cancelled",
      mentions: 2,
      universe: "12 Feb 14:05, keep Metabase and dbt another month or two; moved to the KubLLC card.",
      attachment: "None.",
      why: "Transferred to Arthur Blake’s KubLLC card.",
    },
    {
      vendor: "dbt",
      verdict: "not-cancelled",
      mentions: 1,
      universe: "12 Feb 14:05, kept alongside Metabase, roughly $300/mo for the pair.",
      attachment: "None.",
      why: "Kept another month or two.",
    },
    {
      vendor: "Carta",
      verdict: "not-cancelled",
      mentions: 8,
      universe: "12 Feb 13:47, “we have time for Carta renewal so I’m not gonna really touch that.”",
      attachment: "carta_renewal.png. Active, renews 26 Nov 2026, no action required.",
      why: "Left in place. The “Carta terminations” on 12 Feb are removing contractors’ equity access, not the subscription.",
    },
    {
      vendor: "Figma",
      verdict: "not-cancelled",
      mentions: 17,
      universe: "12 Feb 14:00, “Figma won’t be able to charge us”; 11 Feb 17:21 Robert, good until 11 Sep.",
      attachment: "None.",
      why: "Paid through September, expires on its own.",
    },
    {
      vendor: "AWS",
      verdict: "not-cancelled",
      mentions: 1,
      universe: "9 Feb 16:10, Arthur reduces the cost. No keep-or-cancel call is ever made.",
      attachment: "None.",
      why: "Cost reduced, not cancelled. NOT CANCELLED is the intended reading; UNCONFIRMED is arguable, grade loosely.",
    },
    {
      vendor: "Datadog",
      verdict: "out-of-pool",
      mentions: 0,
      universe: "Appears zero times in #winddown. The “DD” references are the Domino Delights game account, not Datadog.",
      attachment: "dtdg_invoice.pdf, $310.00, subscription active.",
      why: "A pure distractor. No receipt, no MEMORY line. The pool sentence in the prompt is what makes this unambiguous.",
    },
    {
      vendor: "[PERSON_NAME_20852] · ORG_NAME_0304 · SVC_0293",
      verdict: "skipped",
      universe: "Named in the channel, but the export broke the names.",
      attachment: "None.",
      why: "The prompt’s export clause skips them. Without that clause the channel’s 17 redacted tokens produce roughly twenty junk MEMORY rows.",
    },
  ],

  rubrics: [
    {
      n: 1,
      text: "The `VENDORS CANCELLED` folder exists with `Helpshift_cancellation_receipt.pdf`, `layer_cancellation_receipt.pdf`, `Soundly_cancellation_receipt.pdf`, and `cursor_cancellation_receipt.pdf`.",
      category: "Instruction Following",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "The folder exists, but holds receipts for Datadog, Singular and Soundly instead.",
    },
    {
      n: 2,
      text: "The model identifies `Helpshift` as a cancelled vendor by reconciling Leonard Hayes's `#winddown` message at timestamp `1770789534.434749` with `Screenshot 2026-02-10 143217.png`, which confirms the cancellation with a final due amount of `$1,500.00`.",
      category: "Agent Behavior",
      target: "Trajectory",
      polarity: "positive",
      status: "not-present",
      observed: "Read the screenshot, never retrieved the Slack message, filed Helpshift as unconfirmed.",
    },
    {
      n: 3,
      text: "The model identifies `layer` as a cancelled vendor by reconciling Leonard Hayes's `#winddown` message at timestamp `1770837793.168589` with `Screenshot 2026-02-11 112340.png`, which confirms the cancellation with a final invoice of `$2,340.00`.",
      category: "Agent Behavior",
      target: "Trajectory",
      polarity: "positive",
      status: "not-present",
      observed: "Read the screenshot but misidentified it as Singular evidence.",
    },
    {
      n: 4,
      text: "The model identifies `Soundly` as a cancelled vendor by reconciling Robert's `#winddown` message at timestamp `1770839322.836779` with `IMG_20260811_133419.jpg`, which confirms the cancellation with no due amount.",
      category: "Agent Behavior",
      target: "Trajectory",
      polarity: "positive",
      status: "not-present",
      observed: "Produced a Soundly receipt, but never retrieved or reconciled Robert’s confirmation.",
    },
    {
      n: 5,
      text: "The model identifies `cursor` as a cancelled vendor by reconciling Arthur Blake's `#winddown` message at timestamp `1770937188.477219` with the handwritten evidence in `IMG_20260811_134605.jpg`, which confirms the cancellation with a due amount of `$192.00`.",
      category: "Agent Behavior",
      target: "Trajectory",
      polarity: "positive",
      status: "not-present",
      observed: "Retrieved neither Arthur’s message nor the cursor line in the handwritten note.",
    },
    {
      n: 6,
      text: "The model identifies the complete `#winddown` vendor pool as exactly these 20 vendors: Helpshift, layer, Soundly, cursor, coderabbit, Singular, Unity, Zapier, Deel, gusto, Intuit, Linear, Slack, google, GitHub, Metabase, dbt, Carta, Figma and AWS.",
      category: "Agent Behavior",
      target: "Trajectory",
      polarity: "positive",
      status: "not-present",
      observed: "Never read the channel; reduced the pool to the names it could pull off the attachments.",
    },
    {
      n: 7,
      text: "The model uses the Slack MCP server to retrieve Leonard Hayes's message at timestamp `1764793154.009679`, which contains the `$50,000` shutdown cost estimate.",
      category: "Agent Behavior",
      target: "Trajectory",
      polarity: "positive",
      status: "not-present",
      observed: "No Slack MCP call in turn 3 or turn 4.",
    },
    {
      n: 8,
      text: "Following `receipt_format.md`, `Helpshift_cancellation_receipt.pdf` contains the headers `VENDOR CLOSEOUT RECEIPT` and `Harmony Games, Inc.`, plus Vendor: Helpshift, Cancellation date: 2026-02-10 (PST), Confirmed by: Leonard Hayes, Final amount due: $1,500.00, and a Service description of no more than 30 words.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "The file was never created.",
    },
    {
      n: 9,
      text: "Following `receipt_format.md`, `layer_cancellation_receipt.pdf` contains the required headers plus Vendor: layer, Cancellation date: 2026-02-11 (PST), Confirmed by: Leonard Hayes, Final amount due: $2,340.00, and a Service description of no more than 30 words.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "The file was never created.",
    },
    {
      n: 10,
      text: "Following `receipt_format.md`, `Soundly_cancellation_receipt.pdf` contains the required headers plus Vendor: Soundly, Cancellation date: 2026-02-11 (PST), Confirmed by: Robert, Final amount due: None outstanding, and a Service description of no more than 30 words.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "A Soundly receipt exists but does not carry Confirmed by: Robert.",
    },
    {
      n: 11,
      text: "Following `receipt_format.md`, `cursor_cancellation_receipt.pdf` contains the required headers plus Vendor: cursor, Cancellation date: 2026-02-12 (PST), Confirmed by: Arthur Blake, Final amount due: $192.00, and a Service description of no more than 30 words.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "The file was never created.",
    },
    {
      n: 12,
      text: "`MEMORY.md` contains an `UNCONFIRMED` section listing coderabbit, Singular, Unity and Zapier.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "UNCONFIRMED holds only Helpshift; all four required vendors are missing.",
    },
    {
      n: 13,
      text: "`MEMORY.md` contains a `NOT CANCELLED` section listing Deel, gusto, Intuit, Linear, Slack, google, GitHub, Metabase, dbt, Carta, Figma and AWS.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "NOT CANCELLED holds only Carta; the other eleven are missing.",
    },
    {
      n: 14,
      text: "`emails_draft.md` states the total amount owed across the four receipts as `$4,032.00`.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "Reports $2,650.00, summed from its own wrong receipt set.",
    },
    {
      n: 15,
      text: "`emails_draft.md` states that the `$4,032.00` outstanding balance represents `8.1%` (or an approximated rounded value) of the `$50,000` shutdown cost estimate.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "Neither figure. Ships a placeholder asking the user for the estimate.",
    },
    {
      n: 16,
      text: "`vendor_cancellation.svg` displays the `$4,032.00` total owed and the `8.1%` figure at the top of the graphic.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "Shows $2,650.00 and “(needs estimate)” at headline weight.",
    },
    {
      n: 17,
      text: "`vendor_cancellation.svg` presents the three groups with their vendors, four receipted, four UNCONFIRMED, twelve NOT CANCELLED.",
      category: "Task Completion",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "not-present",
      observed: "Three confirmed (Datadog, Singular, Soundly), Helpshift unconfirmed, Carta not cancelled.",
    },
    {
      n: 18,
      text: "`emails_draft.md` mentions the subject `vendor closeout - where we stand`.",
      category: ", not labelled in rubrics.md",
      target: ", not labelled in rubrics.md",
      polarity: "positive",
      status: "present",
      observed: "The subject line is verbatim. Note that this criterion carries no category and no evaluation target in the source file. E7 in the pre-submit gate catches exactly this.",
    },
    {
      n: 19,
      text: "`emails_draft.md` mentions that `vendor_cancellation.svg` will be attached to the email.",
      category: "Instruction Following",
      target: "Final Answer Artifact",
      polarity: "positive",
      status: "present",
      observed: "The draft names the SVG as an attachment.",
    },
    {
      n: 20,
      text: "The model states that Slack access is unavailable, or asks the user to provide the shutdown cost expected from the `#executives` channel, without first invoking any of the available Slack tools.",
      category: "Agent Behavior",
      target: "Trajectory",
      polarity: "negative",
      status: "present",
      observed: "Repeatedly says it cannot access #executives and asks the user for the estimate, with no Slack call made.",
    },
    {
      n: 21,
      text: "The model links `Screenshot 2026-02-10 143217.png` to `dtdg_invoice.pdf`, recording `Datadog, Inc.` as a confirmed cancellation despite the screenshot identifying Helpshift, the Datadog invoice showing an active subscription, and Datadog never appearing in `#winddown`.",
      category: "Factuality & Hallucination",
      target: "Final Answer Artifact",
      polarity: "negative",
      status: "present",
      observed: "MEMORY.md and the Datadog receipt make exactly this unsupported link.",
    },
  ],

  /**
   * Every subjective criterion came out of one move: put the same artifact from
   * the OT and the GT side by side, look at the two renders, and write down the
   * difference. Leg A is the observed run, Leg B the golden. The boxes below are
   * in each artifact's own coordinates, and they point at the thing being rated.
   *
   * These criteria are judged on the render. Nothing here quotes source.
   */
  subjective: [
    {
      n: 1,
      text: "Vendor entries for the cancelled vendors in `vendor_cancellation.svg` are set on a two-column axis with the name on the left and the amount owed on the right.",
      artifact: "vendor_cancellation.svg",
      asks: "Can a reader pair a cancelled vendor with its balance without leaving the group block?",
      status: "not-present",
      legA: {
        verdict:
          "The names are a bulleted list with nothing beside them. The money is up in the headline card, a third of the canvas away.",
        view: {
          kind: "render",
          src: `${A}/ot/vendor_cancellation.svg`,
          canvas: { w: 1200, h: 780 },
          focus: { x: 40, y: 125, w: 575, h: 475 },
          marks: [
            { box: { x: 78, y: 440, w: 200, h: 115 }, label: "names only, one column" },
            { box: { x: 80, y: 250, w: 476, h: 26 }, label: "the amounts, up here instead", place: "below" },
          ],
        },
      },
      legB: {
        verdict: "Name on the left, amount on the right, every row on the same pair of edges.",
        view: {
          kind: "render",
          src: `${A}/gt/vendor_cancellation.svg`,
          canvas: { w: 1000, h: 760 },
          focus: { x: 46, y: 208, w: 312, h: 300 },
          marks: [{ box: { x: 74, y: 296, w: 250, h: 154 }, label: "name left, amount right" }],
        },
      },
      derived:
        "Put the two blocks next to each other and the criterion writes itself. One of them answers what does Soundly owe in the place you are already looking, the other sends you back to the headline. That is a property of the render, so it can be rated by someone who never saw the file.",
    },
    {
      n: 2,
      text: "The group holding the outstanding balances closes with a subtotal row, separated by a rule, that reconciles to the headline total at the top of the graphic.",
      artifact: "vendor_cancellation.svg",
      asks: "Can the headline total be checked against the entries that compose it, in the same block?",
      status: "not-present",
      legA: {
        verdict:
          "The list stops at its last vendor and the card just ends. The arithmetic is a small note under the headline instead.",
        view: {
          kind: "render",
          src: `${A}/ot/vendor_cancellation.svg`,
          canvas: { w: 1200, h: 780 },
          focus: { x: 40, y: 125, w: 575, h: 590 },
          marks: [
            { box: { x: 78, y: 552, w: 320, h: 140 }, label: "group ends, no subtotal" },
            { box: { x: 80, y: 250, w: 476, h: 26 }, label: "the sum, in a note", place: "below" },
          ],
        },
      },
      legB: {
        verdict: "A rule closes the group and a subtotal sits under it, carrying the same figure as the headline.",
        view: {
          kind: "render",
          src: `${A}/gt/vendor_cancellation.svg`,
          canvas: { w: 1000, h: 760 },
          focus: { x: 24, y: 82, w: 424, h: 452 },
          marks: [
            { box: { x: 150, y: 138, w: 240, h: 52 }, label: "headline", place: "below" },
            {
              box: { x: 74, y: 452, w: 250, h: 56 },
              label: "subtotal under a rule, same figure",
              place: "below",
            },
          ],
        },
      },
      derived:
        "Both graphics state a total. Only one lets you check it where you are standing. The criterion names the closing row and the rule, not the number, because the number is already the objective set's job.",
    },
    {
      n: 3,
      text: "Each group block's heading is horizontally centred on that block rather than aligned to one of its edges.",
      artifact: "vendor_cancellation.svg",
      asks: "Does each heading read as the title of its container, or as the first line of its list?",
      status: "not-present",
      legA: {
        verdict: "All three headings sit on the same left inset as the list beneath them.",
        view: {
          kind: "render",
          src: `${A}/ot/vendor_cancellation.svg`,
          canvas: { w: 1200, h: 780 },
          focus: { x: 40, y: 318, w: 1120, h: 190 },
          marks: [
            { box: { x: 86, y: 360, w: 198, h: 40 }, label: "flush left, like the list", place: "below" },
            { box: { x: 816, y: 360, w: 238, h: 40 }, label: "" },
          ],
        },
      },
      legB: {
        verdict: "Each heading is centred on its own card, so the card reads as a container.",
        view: {
          kind: "render",
          src: `${A}/gt/vendor_cancellation.svg`,
          canvas: { w: 1000, h: 760 },
          focus: { x: 40, y: 206, w: 920, h: 156 },
          marks: [
            { box: { x: 128, y: 226, w: 144, h: 32 }, label: "centred on the card", place: "below" },
            { box: { x: 726, y: 226, w: 148, h: 32 }, label: "" },
          ],
        },
      },
      derived:
        "Nothing here is about correctness. Scan the two side by side and one set of cards reads as three peer categories while the other reads as three lists that happen to start with a word in a pill. That is the whole criterion.",
    },
    {
      n: 4,
      text: "The total owed and the percentage are set at a larger type size than the vendor entries listed beneath them.",
      artifact: "vendor_cancellation.svg",
      asks: "Do the two headline figures dominate the vendor rows?",
      status: "present",
      legA: {
        verdict: "Clears it. The headline figure towers over the vendor list.",
        view: {
          kind: "render",
          src: `${A}/ot/vendor_cancellation.svg`,
          canvas: { w: 1200, h: 780 },
          focus: { x: 40, y: 125, w: 575, h: 475 },
          marks: [
            { box: { x: 82, y: 198, w: 250, h: 52 }, label: "headline", place: "below" },
            { box: { x: 78, y: 440, w: 200, h: 115 }, label: "entries, much smaller" },
          ],
        },
      },
      legB: {
        verdict: "Clears it too, by a similar margin.",
        view: {
          kind: "render",
          src: `${A}/gt/vendor_cancellation.svg`,
          canvas: { w: 1000, h: 760 },
          focus: { x: 24, y: 82, w: 424, h: 400 },
          marks: [
            { box: { x: 160, y: 138, w: 220, h: 52 }, label: "headline", place: "below" },
            { box: { x: 74, y: 296, w: 250, h: 154 }, label: "entries, much smaller" },
          ],
        },
      },
      derived:
        "Both legs pass, and the criterion stays. It is a quality floor: it separates a competent render from a broken one, not these two runs from each other. A block built only from what the OT got wrong would score a broken graphic and a merely different one the same way.",
    },
    {
      n: 5,
      text: "`MEMORY.md` prioritises the requested UNCONFIRMED and NOT CANCELLED information without unrelated sections disrupting the document's structure.",
      artifact: "MEMORY.md",
      asks: "Do the two categories the prompt asked for lead the document?",
      status: "present",
      legA: {
        verdict:
          "The two requested headings lead, in order, each restating its rule. A third heading follows them.",
        view: {
          kind: "doc",
          src: `${A}/ot/MEMORY.md`,
          lines: [
            "## UNCONFIRMED",
            "> Rule: we/they decided to cancel, but we **don't have both** (a) Slack shutdown-channel confirmation and (b) an attachment/evidence item.",
            "- Helpshift",
            "## NOT CANCELLED",
            "> Rule: anything showing the vendor was kept or transferred instead.",
            "- Carta",
            "## CONFIRMED (receipts generated)",
          ],
          mark: [0, 3, 6],
        },
      },
      legB: {
        verdict: "The same two headings, in the same order, then the skipped names the prompt asked for.",
        view: {
          kind: "doc",
          src: `${A}/gt/MEMORY.md`,
          lines: [
            "## UNCONFIRMED",
            "*(Decided to cancel, but we do NOT have BOTH a Slack cancellation confirmation AND an attachment backing it up.)*",
            "- **Singular** — Termination email prepared/sent 2026-02-12. No Slack message confirms the account was actually cancelled.",
            "- **Unity** — Termination email drafted for Arthur to send 2026-02-12. Evidence points to still active, not cancelled.",
            "## NOT CANCELLED",
            "*(Evidence shows the vendor was kept or transferred instead.)*",
            "- **Deel** — Explicitly kept during shutdown (\"keep Deel, gusto, Intuit\").",
            "## SKIPPED — vendor name did not come through in the export",
          ],
          mark: [0, 4, 7],
        },
      },
      derived:
        "The structural property holds on both sides, so this one is rated present. What actually went wrong in Leg A is that those sections hold two rows instead of sixteen, and a missing row is a content failure the objective criteria already grade. Keeping that line clean is the point: presentation here, correctness there.",
    },
    {
      n: 6,
      text: "Within the cancellation receipts, the title `VENDOR CLOSEOUT RECEIPT` is visually differentiated from the field labels, larger type, capitalisation, or uppercase lettering.",
      artifact: "VENDORS CANCELLED/soundly_cancellation_receipt.pdf",
      asks: "Is the receipt title set apart from the field labels by any of the three named means?",
      status: "present",
      legA: {
        verdict:
          "Uppercase, but the same size and weight as every label under it. It clears the criterion on the uppercase clause alone.",
        view: {
          kind: "render",
          src: `${A}/ot/soundly_receipt_render.png`,
          canvas: { w: 1322, h: 708 },
          focus: { x: 8, y: 8, w: 1306, h: 400 },
          marks: [
            { box: { x: 22, y: 22, w: 256, h: 30 }, label: "the title", place: "below" },
            { box: { x: 22, y: 333, w: 94, h: 32 }, label: "no bigger than the labels" },
          ],
        },
      },
      legB: {
        verdict: "Uppercase, and set noticeably larger and bolder than the labels. Differentiated twice over.",
        view: {
          kind: "render",
          src: `${A}/gt/soundly_receipt_render.png`,
          canvas: { w: 1322, h: 708 },
          focus: { x: 8, y: 8, w: 1306, h: 400 },
          marks: [
            { box: { x: 30, y: 22, w: 570, h: 44 }, label: "the title, set larger", place: "below" },
            { box: { x: 30, y: 208, w: 112, h: 40 }, label: "labels, visibly smaller", place: "below" },
          ],
        },
      },
      derived:
        "Worth reading as a lesson in wording. The criterion offers three alternative means, so a run that only uppercases still clears it. If the size relationship was the intent, the or list had to go. Write the alternatives you actually accept, then rate against them.",
    },
    {
      n: 7,
      text: "The receipts visually separate the header block from the receipt fields using a clear separator, such as a horizontal rule.",
      artifact: "VENDORS CANCELLED/soundly_cancellation_receipt.pdf",
      asks: "Is there a visible boundary between the document identity and the transaction fields?",
      status: "not-present",
      legA: {
        verdict: "Whitespace and nothing else. The header and the fields run into one another.",
        view: {
          kind: "render",
          src: `${A}/ot/soundly_receipt_render.png`,
          canvas: { w: 1322, h: 708 },
          focus: { x: 8, y: 8, w: 1306, h: 380 },
          marks: [
            {
              box: { x: 22, y: 162, w: 340, h: 168 },
              label: "no separator, just a gap",
              place: "inside",
            },
          ],
        },
      },
      legB: {
        verdict: "A rule runs the full width of the text column, directly under the header block.",
        view: {
          kind: "render",
          src: `${A}/gt/soundly_receipt_render.png`,
          canvas: { w: 1322, h: 708 },
          focus: { x: 8, y: 8, w: 1306, h: 380 },
          marks: [
            { box: { x: 24, y: 148, w: 1150, h: 24 }, label: "the separator", align: "right" },
          ],
        },
      },
      derived:
        "The cleanest criterion in the block, because you can see the answer from across the room. One rule, present or absent. All three of Leg A's receipts share the same undivided layout, so it holds across the folder rather than resting on one file.",
    },
    {
      n: 8,
      text: "The body of `emails_draft.md` is written in explanatory prose that tells the recipients where each figure came from and what it leaves out.",
      artifact: "emails_draft.md",
      asks: "Can Arthur and Robert read the figures without opening the attachments?",
      status: "not-present",
      legA: {
        verdict: "Two bare bullets. Neither figure is sourced and nothing says what has been left out.",
        view: {
          kind: "doc",
          src: `${A}/ot/emails_draft.md`,
          lines: [
            "Quick snapshot of where we stand on vendor closeouts based on the cancellation evidence we currently have on hand.",
            "- Total outstanding (confirmed receipts): **$2,650.00**",
            "- % of shutdown cost estimate: **(needs shutdown estimate amount to compute)**",
            "Ill attach an infographic for quick review:",
            "- vendor_cancellation.svg",
          ],
          mark: [1, 2],
        },
      },
      legB: {
        verdict:
          "Prose that names where the estimate came from, what the total is a sum of, and which vendor contributes nothing.",
        view: {
          kind: "doc",
          src: `${A}/gt/emails_draft.md`,
          lines: [
            "### **Total still owed across the issued receipts: $4,032.00**",
            "That's about **8.06%** of the ~$50K all-in shutdown cost estimate I posted in the `#executives` channel back on 2025-12-03 (the ChatGPT planning number, range $20K–$80K) — so these confirmed vendor closeouts are roughly 8% of the projected wind-down budget.",
            "(Soundly is paid through the current period — nothing outstanding there.)",
          ],
          mark: [1, 2],
        },
      },
      derived:
        "Same two numbers, two different jobs. One reader can act on the email alone. The other has to open three files to learn what the total covers. The criterion names the property, a self contained explanation, rather than a length or a shape.",
    },
    {
      n: 9,
      text: "The shutdown cost estimate and the percentage are presented together with enough context for their relationship to be immediately clear.",
      artifact: "vendor_cancellation.svg",
      asks: "Is the percentage a finished figure, and is the number it is a percentage of on the graphic?",
      status: "not-present",
      legA: {
        verdict:
          "The percentage slot holds a placeholder at full headline weight, with a line underneath asking the reader to supply the estimate.",
        view: {
          kind: "render",
          src: `${A}/ot/vendor_cancellation.svg`,
          canvas: { w: 1200, h: 780 },
          focus: { x: 596, y: 92, w: 568, h: 204 },
          marks: [
            {
              box: { x: 626, y: 146, w: 508, h: 128 },
              label: "a placeholder, and a line telling the reader to finish it",
            },
          ],
        },
      },
      legB: {
        verdict: "The estimate is named in the label and the finished percentage sits beside the total it divides.",
        view: {
          kind: "render",
          src: `${A}/gt/vendor_cancellation.svg`,
          canvas: { w: 1000, h: 760 },
          focus: { x: 486, y: 48, w: 476, h: 171 },
          marks: [
            {
              box: { x: 560, y: 108, w: 350, h: 86 },
              label: "the estimate named, the percentage resolved",
            },
          ],
        },
      },
      derived:
        "This is where a presentation criterion brushes against a retrieval failure without becoming one. Whether the $50,000 was ever found is graded objectively. This grades what the graphic does with it, and Leg A hands the arithmetic back to its reader at headline size.",
    },
    {
      n: 10,
      text: "The body of `emails_draft.md` separates confirmed cancellations from items still requiring follow-up, and gives each open item enough context to make the pending action clear.",
      artifact: "emails_draft.md",
      asks: "Can a recipient tell finished work from work that still needs a decision?",
      status: "not-present",
      legA: {
        verdict: "One undivided list. No open item is named, so nothing in the body asks anyone for anything.",
        view: {
          kind: "doc",
          src: `${A}/ot/emails_draft.md`,
          lines: [
            "Quick snapshot of where we stand on vendor closeouts based on the cancellation evidence we currently have on hand.",
            "- Total outstanding (confirmed receipts): **$2,650.00**",
            "- % of shutdown cost estimate: **(needs shutdown estimate amount to compute)**",
            "Details (receipts / logs) are in:",
            "- VENDORS CANCELLED/ (PDF closeout receipts)",
            "- MEMORY.md (UNCONFIRMED vs NOT CANCELLED)",
          ],
          mark: [0, 1, 2, 3, 4, 5],
        },
      },
      legB: {
        verdict:
          "Two headed sections. Every open item carries why it is open and, where it matters, who has to move on it.",
        view: {
          kind: "doc",
          src: `${A}/gt/emails_draft.md`,
          lines: [
            "## Cancelled vendors (receipts issued)",
            "| Vendor | Cancellation date | Confirmed by | Final amount due |",
            "|---|---|---|---|",
            "| Helpshift | 2026-02-10 | Leonard Hayes | $1,500.00 |",
            "| Soundly | 2026-02-11 | Robert | None outstanding |",
            "## Still open — needs a decision / follow-up",
            "- **Singular** — termination email sent, but no confirmation back yet; their statement still shows **$7,200.00** outstanding.",
            "- **Unity** — the account still shows **Active** (renews 2026-04-01). Arthur, can you confirm this actually went out and chase a written cancellation?",
          ],
          mark: [0, 5],
        },
      },
      derived:
        "The criterion is about actionability and it stays presentational: it grades the separation and the context on each open item, not which vendors belong in which group. Where a vendor belongs is objective criterion territory, and it is graded there.",
    },
  ],

  subjectiveNote:
    "Presentation only, judged on the render. Every criterion below came from putting the same artifact from both runs side by side, Leg A the observed run and Leg B the golden, and naming the visible difference. Open a criterion to see the two outcomes with the rated part boxed on each. Palette, canvas dimensions, responsiveness and SVG code structure were excluded as unbriefed. Criterion 2 rests on the phrase “with the insights” in turn 4; if that wording changes, revisit it.",

  run: {
    summary:
      "Model A never called a Slack tool. It worked entirely from the attachments, which is exactly the failure mode the task was built to catch: connected does not mean used.",
    score: "2 of 21 objective criteria satisfied, and both of those are the two that needed no reasoning.",
    observations: [
      {
        title: "Never opened the universe",
        expected: "Read #winddown, derive the twenty-vendor pool, resolve each confirmation to a person and a date.",
        actual: "Zero Slack MCP calls across all four turns. The pool became “whatever names are legible in the attachments”.",
        rubrics: [2, 3, 4, 5, 6, 7, 20],
      },
      {
        title: "Attached the Helpshift screenshot to the wrong vendor",
        expected: "Screenshot 2026-02-10 143217.png identifies Helpshift and confirms $1,500.00.",
        actual: "Linked it to dtdg_invoice.pdf and filed Datadog, Inc. as a confirmed cancellation, a vendor that appears zero times in the channel and whose invoice says active.",
        rubrics: [1, 21],
      },
      {
        title: "Issued a receipt for an unconfirmed vendor",
        expected: "Singular has a debt and no confirmation, so it belongs in UNCONFIRMED.",
        actual: "singular_cancellation_receipt.pdf was written, and its balance folded into the email total.",
        rubrics: [1, 12, 14],
      },
      {
        title: "MEMORY.md holds two rows instead of sixteen",
        expected: "Four UNCONFIRMED, twelve NOT CANCELLED, and no entry for any receipted vendor.",
        actual: "Helpshift under UNCONFIRMED, Carta under NOT CANCELLED, plus a CONFIRMED section the prompt never asked for.",
        rubrics: [12, 13],
      },
      {
        title: "Handed the percentage back to the user",
        expected: "Retrieve the $50,000 estimate from #executives and report 8.1%.",
        actual: "“% of shutdown cost estimate: (needs shutdown estimate amount to compute)”, shipped in both the draft and the SVG.",
        rubrics: [7, 15, 16, 20],
      },
    ],
    artifacts: [
      {
        file: "vendor_cancellation.svg",
        what: "Model A’s infographic, $2,650.00 and “(needs estimate)” at the top, three vendors in the confirmed group.",
        src: `${A}/ot/vendor_cancellation.svg`,
        kind: "svg",
      },
      {
        file: "VENDORS CANCELLED/datadog_inc_cancellation_receipt.pdf",
        what: "A receipt for a vendor that is not in the pool.",
        src: `${A}/ot/datadog_inc_cancellation_receipt.pdf`,
        kind: "pdf",
      },
      {
        file: "VENDORS CANCELLED/singular_cancellation_receipt.pdf",
        what: "A receipt for a vendor whose own statement shows three open invoices and no cancellation.",
        src: `${A}/ot/singular_cancellation_receipt.pdf`,
        kind: "pdf",
      },
      {
        file: "VENDORS CANCELLED/soundly_cancellation_receipt.pdf",
        what: "The one right vendor, missing Confirmed by: Robert.",
        src: `${A}/ot/soundly_cancellation_receipt.pdf`,
        kind: "pdf",
      },
    ],
  },

  traps: [
    {
      id: "two-source",
      step: 3,
      title: "A clean confirmation with nothing behind it",
      where: "coderabbit",
      body: "“coderabbit is cancelled” is as unambiguous as any sentence in the channel, and there is no file anywhere in the pack that supports it. The prompt requires both sources.",
      tests: "Whether the agent applied the rule to every vendor, or stopped at the first convincing sentence.",
      links: [{ to: "/checklist#s3", tag: "C2", label: "Thresholds live in the inputs, not the prompt" }],
    },
    {
      id: "distractor",
      step: 2,
      title: "A real invoice for a vendor that is out of scope",
      where: "dtdg_invoice.pdf",
      body: "Datadog is billed, active, and completely absent from #winddown. The scope sentence in turn 1 is the only thing that excludes it, and Model A filed a receipt for it anyway.",
      tests: "Whether the pool boundary was actually applied, or whether every legible vendor name became a candidate.",
      links: [{ to: "/checklist#s2", tag: "B3", label: "Every attached file carries a needed fact" }],
    },
    {
      id: "tz",
      step: 2,
      title: "One timezone conversion, and only one receipt shows it",
      where: "Helpshift",
      body: "The confirmation is stored as 2026-02-11T05:58:54Z. receipt_format.md asks for PST and every Slack profile in the universe is America/Los_Angeles, so the correct date is 2026-02-10. Helpshift is the only confirmation posted after 16:00 PST, so it is the only receipt where copying the UTC date is visible.",
      tests: "Whether the agent read the format spec, or only the template block at the top of it.",
    },
    {
      id: "handwriting",
      step: 2,
      title: "A figure that exists only in handwriting",
      where: "IMG_20260811_134605.jpg",
      body: "“Cursor -> 192 due” on a photographed page, with the access date written over a struck-out number. No other source in the task carries $192.00.",
      tests: "Genuine media dependence, take the photo away and the receipt cannot be written.",
      links: [{ to: "/checklist#s2", tag: "B2", label: "Take the attachments away, is it still solvable?" }],
    },
    {
      id: "scope-of-total",
      step: 3,
      title: "Two large debts that must not be added",
      where: "Singular $7,200.00 · Unity $6,336.00",
      body: "Both are real, both are in the attachments, and turn 2 scopes the sum to “across those receipts”. $11,232.00 or $8,832.00 means the agent summed every number it found.",
      tests: "Whether the agent read the scope of the instruction or the presence of the data.",
    },
    {
      id: "unlinked-benchmark",
      step: 1,
      title: "A benchmark in another channel, months earlier, never linked",
      where: "#executives · 2025-12-03",
      body: "Turn 3 asks for a percentage against a figure the user says he cannot find. It is also stored as a top-level message rather than a thread reply, so an agent that queries for replies comes back empty and has to read the next message in the channel.",
      tests: "Whether the agent goes to the universe when the prompt does not hand it the value.",
      links: [{ to: "/checklist#s2", tag: "B1", label: "One fact that lives only in a connected service" }],
    },
    {
      id: "latest-message",
      step: 1,
      title: "Confirmed by is the latest message, not the first",
      where: "Soundly · cursor",
      body: "Leonard asks Robert to cancel Soundly; Robert confirms. Leonard assigns cursor to Arthur; Arthur confirms. Both receipts name the person who confirmed, not the person who asked, and both require a Slack ID resolved to a name.",
      tests: "Whether the agent read the thread or the first hit.",
    },
  ],

  /**
   * The milestone set, one entry per requirement, grouped by turn. Written as
   * intent: no filename, no amount, no format anywhere in it, which is what
   * lets the simulator replay them against a run that went a different way.
   * Stored as the set is written, so the wording here is the wording graded.
   */
  milestones: [
    { turn: 1, text: "Every vendor discussed in the company's shutdown channel forms the vendor pool, and any vendor whose name did not come through the export intact is left out of it." },
    { turn: 1, text: "Each vendor in that pool is sorted into those whose cancellation is supported by both the channel and the attached evidence and those whose cancellation is not." },
    { turn: 1, text: "The supported cancelled vendors each receive their own formal cancellation record as a separate, appropriately named and filed document." },
    { turn: 1, text: "The non cacnelled vendors are recorded in the running notes file under the two categories the user named : those meant to be cancelled but unsupported and those kept or transferred instead." },
    { turn: 2, text: "The money still outstanding across the issued receipts is added up into a single figure." },
    { turn: 2, text: "The total money owed is placed in a draft message addressed to the other two board members." },
    { turn: 3, text: "The outstanding total is expressed as a proportion of the shutdown cost estimate the user posted in a different channel, and the draft references that proportion." },
    { turn: 3, text: "The draft carries the subject line the user specified." },
    { turn: 4, text: "The classification is rendered as a standalone svg for the two recipients, showing the three groups the vendors were sorted into and who sits in each." },
    { turn: 4, text: "The money figures appear at the top of that visual." },
    { turn: 4, text: "The draft is updated to say the svg will travel with the email." },
  ],

  /**
   * The golden run. The milestone check after each turn is the only thing that
   * decides what the next prompt is, so the checks and the conversation are
   * stored together: four turns, one steer, and the run reaching the answer the
   * GTFA had already resolved.
   *
   * The conversation is a transcript. It is stored as it was said, typos and
   * all, because the register of the steering prompts is half of what makes
   * them usable.
   */
  goldenRun: {
    checks: [
      {
        title: "After turn 1",
        turn: 1,
        met: true,
        body: "All four turn 1 milestones on the first reply. The pool is the shutdown channel, the names that did not survive the export are left out, four vendors clear both sources and each gets its own record, and every other vendor is filed under one of the two categories the user named.",
        next: "Nothing to steer, so nothing is said. The next prompt is turn 2.",
      },
      {
        title: "After turn 2",
        turn: 2,
        met: true,
        body: "Both turn 2 milestones. One figure, summed across the issued receipts only, sitting in a draft addressed to the other two board members.",
        next: "Continue to turn 3.",
      },
      {
        title: "After turn 3",
        turn: 3,
        met: false,
        body: "The subject line milestone was reached. The proportion milestone was not. The model benchmarked against a service fee posted in the executives channel during the shutdown week. That fits the words of the milestone and is not the estimate the user meant.",
        next: "Do not advance. Hint at the intent that is still open, then check the same milestone again.",
      },
      {
        title: "After the hint",
        turn: 3,
        met: true,
        body: "The model went back to the executives channel, found the early December post, and re-based the percentage on the all in estimate. The draft carries the corrected proportion and the quote it rests on.",
        next: "Turn 3 is closed. Continue to turn 4.",
      },
      {
        title: "After turn 4",
        turn: 4,
        met: true,
        body: "All three turn 4 milestones. The graphic is a standalone file, it carries the three groups and who sits in each, the money is at the top where the two readers will look first, and the draft says the file travels with the email.",
        next: "The run is complete, and what it produced is the golden.",
      },
    ],

    hint: {
      missed:
        "T3: The outstanding total is expressed as a proportion of the shutdown cost estimate the user posted in a different channel, and the draft references that proportion.",
      prompt:
        "I remember that amount was way higher than the 15k you got. Just can't find it myself, but ti should be an early December message. I remember asking ChatGPT about this.",
      does: [
        "Names the intent that is still open, a benchmark the user posted, and nothing beyond it.",
        "Stays in Leonard's register. A board member half remembering their own message is exactly what the first three turns sound like.",
        "Points at where to look, early December and a question put to ChatGPT, which is context the user would plausibly remember.",
      ],
      avoids: [
        "The value. $50,000 never appears, and neither does the corrected percentage.",
        "The diagnosis. It never says the $15,000 is the Sunset fee, or that the wrong message was read.",
        "The method. It does not say to search the channel by date, or to read the message after the one it found.",
      ],
      recovered:
        "The model found the 2025-12-03 post itself, re-based the percentage on the roughly $50,000 all in estimate, and recorded the quote and the range in the draft. The milestone was reached on the model's own work, which is the only way it counts.",
    },

    conversation: [
      {
        role: "user",
        turn: 1,
        lines: [
          "Leonard here. Sunset needs our creditor file before they can file, and Fondo is waiting on the same stuff for the final fillings. Every vendor we terminated needs to have created a proper closeout record, and we, as board members, are on charge of this. When we cancelled everything back on Feb 2nd week, we were moving fast and we kept track of everything as we went, so I'll be attaching here all I was able to get from that period. Based on what we agreed in the last meeting and given this mess we had during the cancellation process, we are going to start considering cancelled anythinng that can be confirmed through the slack shutdown channel and the existing files evidence.",
          "I'm expecting you to create a \"VENDORS CANCELLED\" folder with a .pdf cancellation receipt for every vendor whose cancellation can be confirmed. Each file should be named as vendor_name_cancellation_receipt.pdf. For everything else, add the vendor to MEMORY.md under the categories \"UNCONFIRMED\" (we/they decided to cancel, but we don't have both the Slack confirmation and something in the attachments to back it up) or \"NOT CANCELLED\" (anything showing the vendor was kept or transferred instead). The vendor pool should be limited to those appearing in the relevant slack channel. Skip anything where the vendor name din't come through properly in the export.",
        ],
      },
      {
        role: "agent",
        turn: 1,
        lines: [
          "Done. Here's what I produced and the reasoning behind it.",
          "## Method",
          "- **Vendor pool** = only vendors named in the `#winddown` Slack channel (the shutdown channel). I read its full history and resolved the participants (Leonard Hayes, Arthur Blake, Robert).",
          "- **Cancelled** = confirmed by **both** the Slack channel **and** an attachment. Those get a PDF. Everything else goes to `MEMORY.md`.",
          "- I cross-referenced every attachment against the channel.",
          "## `VENDORS CANCELLED/` — 4 receipts (Slack + file evidence both present)",
          "| Vendor | Date | Confirmed by | Final due | File evidence |",
          "|---|---|---|---|---|",
          "| **Helpshift** | 2026-02-10 | Leonard Hayes | $1,500.00 | Termination screenshot (Status: Closed) + invoice |",
          "| **Soundly** | 2026-02-11 | Robert | None outstanding | \"Soundly Pro — Canceled\" screenshot |",
          "| **Layer** | 2026-02-11 | Leonard Hayes | $2,340.00 | Nadia Feld (layer.ai) email confirming workspace cancelled |",
          "| **Cursor** | 2026-02-12 | Arthur Blake | $192.00 | Handwritten note \"Cursor → 192 due, Cancelled 12th Feb\" |",
          "## `MEMORY.md`",
          "- **UNCONFIRMED:** Singular (email sent, but attachment only shows $7,200 owed), Unity (attachment shows \"Active\"), Zapier (no confirmation), **coderabbit** (Slack says cancelled but *no* file evidence → fails the both-sources rule).",
          "- **NOT CANCELLED (kept/transferred):** Deel, gusto, Intuit, Figma, linear, Metabase, dbt, GitHub (→ KubLLC card, per receipt), Slack, Google, Carta (renewal notice \"Active\"), AWS.",
          "## Deliberate exclusions",
          "- **Skipped redacted names** (as instructed): `[PERSON_NAME_20852]`, `[ORG_NAME_0304]`, `[USERNAME_30019]`.",
          "- **Datadog** — an invoice exists in the attachments, but Datadog never appears in `#winddown`, so it's outside the pool (the \"DD\" mentions are the *Domino Delights* game/AWS account, not Datadog). Flagged in MEMORY.md.",
          "- Banks (SVB/Chase) and wind-down providers (Sunset/Fondo/data buyer) treated as out-of-scope, not cancellable service vendors.",
          "One judgment call worth flagging for you: **coderabbit** has a clear Slack \"cancelled\" from Arthur but no supporting file, so under your strict both-sources rule I put it in UNCONFIRMED rather than issuing a receipt. If you'd rather treat a clean Slack confirmation as sufficient on its own, I can promote it to a receipt.",
        ],
      },
      {
        role: "user",
        turn: 2,
        lines: [
          "Nice! Let's now create an emails_draft.md file including the total still owed across the issued receipts. I want Arthur and Robert to know where we stand.",
        ],
      },
      {
        role: "agent",
        turn: 2,
        lines: [
          "Created `/app/outputs/emails_draft.md` — a draft email from Leonard to Arthur and Robert.",
          "**The headline number: $4,032.00 still owed across the four issued receipts.**",
          "That's the sum of the *Final amount due* on the confirmed-cancelled vendors only:",
          "- Helpshift: $1,500.00",
          "- Layer: $2,340.00",
          "- Cursor: $192.00",
          "- Soundly: $0.00 (paid through current period → \"None outstanding\")",
          "The draft also gives them a quick status on the still-open items (Singular's $7,200 outstanding, Unity, Zapier, coderabbit), which I deliberately kept **out** of the $4,032 total since those aren't confirmed cancellations. I noted the exact math at the bottom under \"for our records\" so the number is auditable before it goes to Sunset/Fondo.",
          "It's marked **DRAFT (not sent)** — say the word if you want me to adjust the tone, trim the open-items section, or fold the Singular balance into a separate \"projected total liability\" line.",
        ],
      },
      {
        role: "user",
        turn: 3,
        lines: [
          "What's the % this total owed amount represents against the shutdown cost estimation I posted in our executives channel? Include this % in the email draft and record as well the email subject \"vendor closeout - where we stand\" I'll be using.",
        ],
      },
      {
        role: "agent",
        turn: 3,
        lines: [
          "Done. Updates to `/app/outputs/emails_draft.md`:",
          "**The percentage: 26.88%**",
          "- Total still owed across issued receipts: **$4,032.00**",
          "- Shutdown cost estimate (your `#executives` post, 2026-02-11): **~$15,000** — *\"the cost of Sunset is about ~$15K\"*",
          "- $4,032.00 ÷ $15,000 = **26.88%** (roughly a quarter of the wind-down budget)",
          "**Subject line** set to exactly: `vendor closeout - where we stand`",
          "Both the headline figure and the math (with the source quote) are now in the draft — the percentage appears right under the total in the email body, and the full basis is recorded in the \"for our records\" notes so it's auditable before you send.",
          "One flag: the $15K was posted as an approximate Sunset fee (*\"about ~$15K\"*), and Sunset was also described as charging *\"a percent of the wind down,\"* so the final number could shift. If a firmer estimate lands, the percentage would move with it — easy to update.",
        ],
      },
      {
        role: "user",
        turn: 3,
        hint: true,
        lines: [
          "I remember that amount was way higher than the 15k you got. Just can't find it myself, but ti should be an early December message. I remember asking ChatGPT about this.",
        ],
      },
      {
        role: "agent",
        turn: 3,
        lines: [
          "You were right — the $15K was the wrong benchmark. I found the one you meant.",
          "**The estimate:** In `#executives` on **2025-12-03**, you posted a ChatGPT-derived shutdown budget: *\"assume somewhere in the 20k–80k USD range... I would assume 50k all-in as a defensible budget.\"* So the single planning number is **~$50K** (range $20K–$80K).",
          "**The corrected percentage:**",
          "- $4,032.00 ÷ **$50,000** = **8.06%**",
          "- (Range check: ÷$20K = 20.16%, ÷$80K = 5.04%)",
          "I've updated `emails_draft.md`:",
          "- The body now reads **8.06%** of the ~$50K all-in estimate (Dec 3, with the $20K–$80K range noted).",
          "- The \"for our records\" note carries the full math, the source quote, and the range endpoints — plus a line flagging that the ~$15K (Sunset service fee) was *not* the all-in estimate, so it's no longer used.",
          "The subject line (`vendor closeout - where we stand`) and the $4,032.00 total are unchanged. Want me to lead with the $50K single number as I've done, or present it as the 20k–80k range with 8% as the midpoint-basis figure?",
        ],
      },
      {
        role: "user",
        turn: 4,
        lines: [
          "That sounds better! Finally, I believe this info may be easier for Robert and Arthur to understand if I just send an infographic with the insights. Create a vendor_cancellation.svg with the three groups we ended up and the vendors sitting in each one of them. I want the total owed and the % you just calculated at the top, as that's what they will care about the most. Mention this file will be attached in the email draft as well.",
        ],
      },
      {
        role: "agent",
        turn: 4,
        lines: [
          "Done. Created `/app/outputs/vendor_cancellation.svg` — a one-page infographic built for a quick read by Arthur and Robert.",
          "**Layout:**",
          "- **KPI banner at the top** (what they care about most): **$4,032.00 total owed** and **8.06% of the ~$50K shutdown estimate**.",
          "- **Three color-coded columns** matching the buckets we landed on:",
          "  - 🟢 **CANCELLED** (receipts issued) — Helpshift $1,500, Layer $2,340, Cursor $192, Soundly None → subtotal $4,032.00",
          "  - 🟠 **UNCONFIRMED** — Singular, Unity, Zapier, coderabbit (each tagged with why)",
          "  - ⚫ **NOT CANCELLED** — the 12 kept/transferred vendors (GitHub flagged →KubLLC)",
          "- Footnote records the vendor-pool rule and the $50K basis (with source and range), pointing to MEMORY.md.",
          "I verified it renders correctly and fixed two layout issues (a label/amount collision and a clipped footnote).",
          "**Email draft updated** (`emails_draft.md`):",
          "- Added an **Attachment** line in the header noting `vendor_cancellation.svg`.",
          "- Added an opening line telling Arthur and Robert the infographic is attached and is the fastest way to see where things stand.",
          "Final deliverables in `/app/outputs/`:",
          "- `VENDORS CANCELLED/` — 4 receipt PDFs",
          "- `MEMORY.md` — UNCONFIRMED / NOT CANCELLED (+ skipped/out-of-scope notes)",
          "- `emails_draft.md` — draft to Arthur & Robert, subject `vendor closeout - where we stand`",
          "- `vendor_cancellation.svg` — the infographic",
          "One note: SVG is a vector format — it'll open in any browser, but if their email client won't preview it inline, a PNG/PDF export would embed more reliably. Happy to add one of those if you'd like.",
        ],
      },
    ],
  },
};
