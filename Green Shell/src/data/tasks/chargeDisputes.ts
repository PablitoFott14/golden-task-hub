import type { GoldenTask } from "../types";

const A = "tasks/charge-disputes";

/**
 * ST-007, the single turn charge review.
 *
 * Transcribed from the task folder: `prompt.md`, `GTFA.md`, `draft_history.md`,
 * `rubrics.md`, `subjective_rubrics.md`, the two justification files and the
 * two runs. `GTFA.md` is the authority on the answer, because the folder's
 * earlier notes describe a design that was replaced before the task shipped.
 *
 * The page is a build, not a gallery: `stages` is one entry per method step, in
 * the order the work happened, and every other field below belongs to exactly
 * one of them.
 */
export const chargeDisputes: GoldenTask = {
  meta: {
    id: "charge-disputes",
    serviceId: "6ab82ece4b8df21cfe07addd",
    title: "Charge review and disputes",
    oneLiner:
      "Nine receipts kept however she happened to keep them, four months of bank records, and one page that has to say which charges hold up. Five of them do not, and no two are wrong in the same way.",
    useCase: "Personal finance",
    subcategory: "detecting_disputing_erroneous_charges",
    universe: "openclaw_mm_marisela_ybarra_commerce_product",
    persona: "Marisela Ybarra, regional merchandising manager, Wichita",
    deliverable: "disputes.html",
    modalities: ["Phone photos", "Web screenshot", "Word document", "Cropped scan", "Typed notes"],
    status: "Golden",
    sourcePath: "G:\\My Drive\\Red Shell\\Golden Task Hub\\Green Shell\\task 1 (6ab82ece4b8df21cfe07addd)",
  },

  premise:
    "Marisela knows her regular spending and has never once checked a one off payment. She has the receipts the way anyone has receipts: two slips photographed sideways on the kitchen table, a vet invoice photographed off a screen, a web receipt screenshotted, a clinic's Word document, a crop of a store slip. She wants one page that separates the charges that hold up from the ones she can dispute, with the emails written and left in drafts.",

  whyGolden: [
    "**Five disputes, and none of them is found the same way.** One is a duplicate in the statement. Two are errors inside a receipt whose total matches the bank to the penny. One is only visible in her calendar. One is in the tender lines under the total.",
    "**The media is load bearing.** Three of the five turn on lines that exist nowhere but on paper she photographed, and two of those photographs arrive rotated, folded and out of focus.",
    "**Twenty six objective criteria, and not one of them grades the trajectory.** Every criterion lands on the page, on a draft, or on the state of the mailbox.",
    "**Model A had the evidence and still lost 36 of the 69 positive weight.** It opened the receipt and found the sale email, then cleared the charge anyway.",
  ],

  /* ------------------------------------------------------------------ stages */

  stages: [
    {
      step: 1,
      id: "parameters",
      title: "Seven parameters arrive already decided",
      did: "The sheet fixes the pair before any design starts: Personal finance, detecting and disputing erroneous charges, with reconciling amounts as the primary capability and OCR, contradiction handling and computation behind it. The universe is named, and the output is one file called disputes.html.",
      why: "Every decision after this is checked back against the pair, and only the scenario has any give. A task that fits the neighbouring subcategory better is a category relevance failure even when the use case is right.",
      handoff: "A pair to design inside, and the scope check that says why the receipts belong to it.",
    },
    {
      step: 2,
      id: "universe",
      title: "The universe decides what the task can be",
      did: "Marisela's records were read with the pair already in view: the transactions, the order confirmations and written estimates in her mail, the calendar, and who her manager is. The question was not what would make a good scenario, but which wrong charges this universe can actually prove.",
      why: "A dispute the records cannot evidence is a dispute nobody can grade. Every amount, date, account number and transaction id on the finished page is read out of the universe rather than written into it.",
      handoff: "A set of charges that the records can settle, and the one service that settles the hardest of them.",
    },
    {
      step: 3,
      id: "gtfa",
      title: "The answer was resolved before the first run",
      did: "Twelve charges were worked out to the cent: five to dispute, four company purchases against a monthly allowance, three that are correct and have to be shown as correct. The Ground Truth Final Answer also fixes what must not happen and what counts as an acceptable variation.",
      why: "Grading is verification when the answer already exists, and reconstruction when it does not. The difficulty is designed here too, because complexity added after a run is friction rather than complexity.",
      handoff: "One total, $257.35, and twelve rows that each have to be reachable from something the agent will be given.",
    },
    {
      step: 4,
      id: "inputs",
      title: "The evidence the moment would really produce",
      did: "Nine files, in the formats a person who keeps receipts badly actually ends up with. Eight carry evidence and one carries the format of the page. Two of the photographs have to be straightened and cropped before anything on them can be read.",
      why: "Three is the floor and not the target. Each file here is required by a specific finding, and three of the five disputes cannot be reached from the universe alone.",
      handoff: "An input set where every file is necessary, and a layout spec that lives in an attachment rather than in the prompt.",
    },
    {
      step: 5,
      id: "prompt",
      title: "Everything the agent will ever be told",
      did: "One message, in her own voice, sent once. It names the output file, fixes the window, says the drafts are not to be sent, states the $50 monthly rule, and points at the layout notes without repeating them.",
      why: "The task is single turn. Anything expected of the agent has to be asked for here, out loud, or no criterion may grade it.",
      handoff: "The only context the graded run receives, and the wording every criterion has to be traceable to.",
    },
    {
      step: 6,
      id: "draft-history",
      title: "The same task, filed formally",
      did: "The Agent Objective says why Marisela needs help and what success looks like. The Desired Outcome states the end state in inspectable terms: the page, what is on each tab, the six drafts, and what stays off the page entirely.",
      why: "The agent is handed none of it. It is the record the rubrics and the golden are both measured against, which is why every item is checked back against the line of the prompt that asks for it.",
      handoff: "A filed end state, and the proof that nothing in it was invented after the prompt was written.",
    },
    {
      step: 7,
      id: "model-a",
      title: "The prompt goes out once",
      did: "Model A answered the prompt in one pass: 71 tool calls, nine and a half minutes, one page and three drafts. It found two of the five disputes and cleared the other three as correct.",
      why: "A task the model sails through is not ready. The failures have to be genuine, found rather than manufactured, and they have to matter to what the user asked for.",
      handoff: "A trajectory and a page to write criteria against, and a measured failure of 52% of the objective weight.",
    },
    {
      step: 8,
      id: "rubrics",
      title: "Twenty six criteria, none of them about process",
      did: "Every criterion was written against the downloaded page and the mailbox, with the value, the transaction id, the filename or the date copied in rather than described. Twenty land on the artifact and six on the state of the mailbox.",
      why: "At least 80% of a block grades completion, and zero process criteria is the preferred number. A criterion that only checks that something exists fails the task on its own.",
      handoff: "A block someone who was never in the room can rate, and the definition of what passing means.",
    },
    {
      step: 9,
      id: "golden",
      title: "The same prompt, steered to the ideal answer",
      did: "A new conversation on the identical prompt. The first reply reached the same two disputes Model A did. Four steers, all in Marisela's voice, took it to all five and to $257.35, and none of them named a merchant, an amount or a record.",
      why: "The criteria are only legitimate if the set is passable. Hinting is how you get there, and the no leak rule holds on every message you type, however late it is.",
      handoff: "The golden artifacts, and a second render of the same page to compare the first one against.",
    },
    {
      step: 10,
      id: "subjective",
      title: "What is left once the prompt is satisfied",
      did: "The two pages were put side by side and the real differences wrote the criteria: receipts you can read, arithmetic in a table, a total that follows the filter. Thirty candidates came out of the comparison and eleven survived.",
      why: "Everything the prompt and the layout notes demanded is already graded above. This block is the presentation, judged on the render alone, with no criterion that cannot be pointed at.",
      handoff: "A presentation block a reviewer can locate and score without opening a single file.",
    },
  ],

  /* ------------------------------------------------------------------ step 1 */

  parameters: [
    {
      label: "Use case",
      value: "Personal finance",
      binds: "Her own money. Business bookkeeping would be a different use case, and the company purchases are still hers because they went on her employee account.",
    },
    {
      label: "Subcategory",
      value: "detecting_disputing_erroneous_charges",
      literal: true,
      binds: "Double or unauthorised charge detection, and then the dispute. It is why the page has to end in drafts rather than in a summary.",
    },
    {
      label: "Primary capability",
      value: "reconcile_amounts",
      literal: true,
      binds: "The core work. Every finding is a printed line set against a posted line.",
    },
    {
      label: "Secondary capabilities",
      value: "ocr, manage_contradictions, compute_answer",
      literal: true,
      binds: "OCR reads the photographed paper. Contradiction handling is what a receipt that agrees with the bank and is still wrong needs. Computation is the $257.35 and the monthly allowance.",
    },
    {
      label: "Universe",
      value: "openclaw_mm_marisela_ybarra_commerce_product",
      literal: true,
      binds: "Marisela Ybarra's records. The loadout decided which wrong charges could be evidenced at all.",
    },
    {
      label: "Output artifact",
      value: "disputes.html",
      literal: true,
      binds: "One page. Spelled exactly this way in the prompt, because every criterion names the file.",
    },
    {
      label: "Scenario",
      value: "Receipts against the registers, the real duplicates separated from the charges that hold up, each dispute drafted and left unsent.",
      binds: "The assigned situation. Its nature and intent stayed as assigned; the complexity was raised inside it.",
    },
  ],

  scopeCheck: {
    body: "What fixes the pair is the user's intent. She is contesting charges she believes are wrong, and the receipts and the bank records are only how that intent is evidenced. Assigned by the inputs instead, the same files would have pointed somewhere else.",
    neighbour:
      "The neighbour inside the same use case is detecting and cancelling wasteful recurring charges, and that subcategory's own definition rules this out: it is subscription waste, not an erroneous charge. Nothing on this page is a subscription. Fitting the neighbour better is a category relevance failure even with the use case right.",
  },

  /* ------------------------------------------------------------------ step 2 */

  universeFacts: [
    { k: "Account holder", v: "Marisela Ybarra, 46, Wichita, Kansas" },
    { k: "Employer", v: "Hollenbeck Garden & Hardware, six stores. Her manager is Kenny Rutledge" },
    { k: "Today, in the universe", v: "Monday Aug 24, 2026" },
    { k: "Window the prompt sets", v: "May 1 to Jul 31, 2026" },
    { k: "Personal card", v: "INTRUST Visa ending 7742" },
    { k: "Employee account", v: "Hollenbeck credit ending 0117" },
  ],

  universeSources: [
    {
      service: "FinTrack",
      carries: "Every posted charge, with its own transaction id and the last four digits of the account.",
      decides:
        "The nine transaction ids the page prints, and the amount each receipt has to be matched to. It is also where the look alikes live: Carniceria Acapulco at $58.20 on the same day as Tillie's at $58.00.",
    },
    {
      service: "Gmail",
      carries: "Order confirmations, written estimates, invoices, and one note from a friend.",
      decides:
        "Tillie's order 26 3391 at $58.50 on May 8, which turns the May 9 charge into a duplicate. Iva Jean's email of May 26, which is the only record that the whole cotton wall was 40% off through the middle of June. And Kenny Rutledge as her manager, so the company email goes to him rather than to Bev or Margo.",
    },
    {
      service: "Calendar",
      offConnector: true,
      carries: "Where she actually was, day by day.",
      decides:
        "El Dorado. The receipt bills three nights from Jun 25 and the bank agrees with the receipt, so nothing in the two assigned connectors contradicts it. The calendar has her in Wichita on the 25th and at the vet at 9:00 on the morning of the 26th.",
    },
    {
      service: "Contacts",
      carries: "Who is who, and how each person prefers to be dealt with.",
      decides:
        "Not the claim, but how it lands. Kenny's note says anything that matters comes by email with the metric in the subject line, which is why the dollar figure belongs in the subject.",
    },
  ],

  /* ------------------------------------------------------------------ step 3 */

  answer: {
    total: "$257.35",
    basis:
      "Five card charges worth $151.95 back from the merchants, plus $105.40 of company purchases never credited against the $50 monthly allowance. Six Gmail drafts, none of them sent.",
    counts: [
      { label: "Charges to dispute", v: "5", tone: "no" },
      { label: "Company purchases", v: "4", tone: "warn" },
      { label: "Checked and correct", v: "3", tone: "ok" },
      { label: "Drafts, none sent", v: "6", tone: "accent" },
    ],
  },

  ledger: [
    {
      merchant: "Tillie's Flower Shop, E Central Ave",
      date: "May 9, 2026",
      charged: "$58.00",
      back: "$58.00",
      verdict: "dispute",
      txn: "1829403a7526c738f90a1b2c",
      account: "Visa 7742",
      input: "screenshot_2.png",
      evidence:
        "The order email of May 8 prices order 26 3391 at $48.00 plus $10.50 delivery, $58.50, and FinTrack carries that charge on May 8. The screenshot is the same order number charged again on May 9, with delivery at $10.00.",
      why: "One order, one arrangement, two charges. The May 9 charge is the duplicate and the May 8 charge is correct.",
      trap: "The 50 cent difference is what marks the second charge as a re-key of the same order rather than a second purchase. An exact duplicate would have been easier to find.",
    },
    {
      merchant: "Hobby Lobby",
      date: "Jun 13, 2026",
      charged: "$71.00",
      back: "$17.20",
      verdict: "dispute",
      txn: "39d5a70c164ef82b9507c3d1",
      account: "Visa 7742",
      input: "receipt.jpg",
      evidence:
        "All four items are cotton and all four print a 40% OFF line. The print quilt and the solid quilt take $10.79 and $6.60 off. The fat quarter bundle at $27.99 and the quilt panel at $11.99 both print 40% OFF 0.00. Iva Jean's email of May 26 puts the whole cotton wall at 40% off through the middle of June.",
      why: "$11.20 and $4.80 of discount were never applied, plus $1.20 of tax charged on top of them. The correct total was $53.80.",
      trap: "The receipt total matches the bank to the penny, and the receipt's own savings line of $17.39 covers only the two items that were discounted. Checking the total against the statement passes.",
    },
    {
      merchant: "Carlos O'Kelly's Mexican Cafe",
      date: "Jun 23, 2026",
      charged: "$18.74",
      back: "$4.75",
      verdict: "dispute",
      txn: "9c559ea2d094608295fbb0da",
      account: "Visa 7742",
      input: "IMG_163541.jpg",
      evidence:
        "The signed customer copy, check 2187, prints an amount of $8.74. The tip of $5.25 and the total of $13.99 are in her handwriting, and $8.74 plus $5.25 is $13.99.",
      why: "$18.74 settled, which is the printed base with a $10.00 tip keyed against it instead of the $5.25 she signed for.",
      trap: "The slip is upside down, at an angle and folded across the amount line in the photograph. Read once, the base looks like $18.74, which turns a $4.75 overcharge into an unpaid tip.",
    },
    {
      merchant: "El Dorado State Park",
      date: "Jun 27, 2026",
      charged: "$186.00",
      back: "$62.00",
      verdict: "dispute",
      txn: "b60e35c1d78f2a940b6e15c3",
      account: "Visa 7742",
      input: "IMG_163541.jpg",
      evidence:
        "Receipt 26-04173 bills Campsite 41, Loop C, arrive 06/25, depart 06/28, three nights at $62.00. Her calendar puts the trip at two nights, Friday evening Jun 26 to Sunday afternoon Jun 28, and has Frijol at Woodlawn in Wichita at 9:00 on that Friday morning.",
      why: "She stayed two nights and was billed for three.",
      trap: "Neither the bank nor the receipt disagrees with the other. The only record that contradicts the receipt sits in Calendar, which is not one of the assigned connectors.",
    },
    {
      merchant: "Kohl's, E Kellogg Dr",
      date: "Jul 11, 2026",
      charged: "$40.00",
      back: "$10.00",
      verdict: "dispute",
      txn: "a1b82c930ebf50c18293a4b5",
      account: "Visa 7742",
      input: "IMG_2026.jpg",
      evidence:
        "Transaction 6703 totals $37.21 plus $2.79 tax and settles it across two tenders: $10.00 on a Kohl's gift card ending 6093, run down to a zero balance, and $30.00 on the Visa. FinTrack shows the full $40.00 on the Visa.",
      why: "The $10.00 already paid by gift card was charged to the card as well.",
      trap: "The TOTAL line matches the bank. The error is only in the tender lines below it, and the gift card reads like something she bought rather than a payment.",
    },
    {
      merchant: "Hollenbeck Garden & Hardware, Derby",
      date: "May 2, 2026",
      charged: "$61.00",
      back: "$50.00 for May",
      verdict: "company",
      txn: "af238e10c96b47d5e802b163",
      account: "Employee account 0117",
      input: "none attached",
      evidence:
        "No receipt was attached for this one. May also carries $27.42 on the 31st, so the month comes to $88.42. There is no credit anywhere on account 0117 and no matching Hollenbeck deposit: the deposits are payroll, four mileage reimbursements and the Q2 bonus.",
      why: "The allowance covers up to $50.00 a month, so $50.00 of May is claimable and the $38.42 above the cap is hers.",
    },
    {
      merchant: "Hollenbeck Garden & Hardware",
      date: "May 31, 2026",
      charged: "$27.42",
      back: "nothing further",
      verdict: "company",
      txn: "f61d9b0a3c7e254801fb6d93",
      account: "Employee account 0117",
      input: "none attached",
      evidence: "May's $50.00 is already claimed in full against the May 2 charge.",
      why: "It is on the page because it is part of the $88.42 that puts the month over the cap, not because it adds anything to recover.",
    },
    {
      merchant: "Hollenbeck Garden & Hardware, Wichita East",
      date: "Jun 6, 2026",
      charged: "$46.00",
      back: "$46.00",
      verdict: "company",
      txn: "18c5d7a9204ef3b61c9d0e75",
      account: "Employee account 0117",
      input: "cropped_receipt.png",
      evidence:
        "The only company purchase with a receipt: tomato cages, garden twine, plant labels and a mechanical water timer held on will call #5127, $42.79 plus tax.",
      why: "June's whole $46.00 sits inside the allowance, and no credit was ever posted against it.",
    },
    {
      merchant: "Hollenbeck Garden & Hardware",
      date: "Jul 5, 2026",
      charged: "$9.40",
      back: "$9.40",
      verdict: "company",
      txn: "f21b89d46a03c7e51580b3d9",
      account: "Employee account 0117",
      input: "none attached",
      evidence: "July's only company purchase, with no credit against it.",
      why: "Inside the allowance in full.",
      trap: "A model may read it as the Jun 6 will call timer rung a second time at pickup. The money to recover is $105.40 either way, so the answer accepts that reading as long as the draft is consistent with it.",
    },
    {
      merchant: "Northrock Lanes",
      date: "May 7, 2026",
      charged: "$46.00",
      verdict: "correct",
      txn: "3d6081ca27f5be490713d2a6",
      account: "Visa 7742",
      input: "IMG_23.jpg",
      evidence:
        "Sheryl's email of Apr 23 says $46 a head. Her reply says one, just her, paid at the door on the 7th. Northrock's own email of Apr 30 repeats $46.00 a head paid at the desk, and the calendar carries the banquet.",
      why: "Charged once, at the quoted price, for one person.",
    },
    {
      merchant: "Wichita Foot & Ankle",
      date: "May 8, 2026",
      charged: "$385.00",
      verdict: "correct",
      txn: "72d9b0e438a15c6f9d024b7a",
      account: "Visa 7742",
      input: "wichita_receipt.docx",
      evidence:
        "The written estimate of Apr 24 puts the orthotics at $385.00 due at pickup and not covered by her plan. The May 6 email and the emailed receipt of May 8 agree, and so does the charge.",
      why: "Three records and the statement all say $385.00.",
      trap: "It posts on the same day as the correct Tillie's charge of $58.50. Matching by merchant string rather than by amount and date puts the two together.",
    },
    {
      merchant: "Woodlawn Animal Hospital",
      date: "Jun 26, 2026",
      charged: "$284.50",
      verdict: "correct",
      txn: "5c8b0a37e19f46d2b8c510ae",
      account: "Visa 7742",
      input: "receipt_2.jpg",
      evidence:
        "Invoice 41823 matches the Jun 26 invoice email line for line, and sits inside the written estimate of Jun 24, which quoted $266.00 to $300.00.",
      why: "Inside the estimate, itemised the same way, charged once.",
    },
  ],

  mustNot: [
    "Dispute Northrock Lanes, Wichita Foot & Ankle, Woodlawn Animal Hospital, or the original Tillie's charge of $58.50 on May 8.",
    "Dispute the whole Hobby Lobby charge of $71.00, or the two cotton lines that were discounted correctly.",
    "Dispute the whole Kohl's charge of $40.00, or read the gift card as something she bought. It is a payment.",
    "Confuse Tillie's May 9 at $58.00 with Carniceria Acapulco's May 9 at $58.20, or Tillie's May 8 with Wichita Foot & Ankle on the same day.",
    "Dispute regular spending: groceries, fuel, subscriptions, Amazon Fresh or the brake job at Christian Brothers.",
    "Include anything dated before May 1 or after Jul 31, such as the Hollenbeck charges of Mar 7 and Apr 4 on account 0117.",
    "Invent an email address for Hobby Lobby, Carlos O'Kelly's, El Dorado State Park or Kohl's. None of them has one in her records.",
    "Treat the minus $186.40 balance on account 0117 as proof of reimbursement. It matches no payment and no credit.",
    "Send anything.",
  ],

  variations: [
    "Any wording in the drafts and any page design, as long as every required item is present.",
    "Checking through to Aug 24, which is today in the universe, instead of stopping at Jul 31. Nothing dated in August changes the outcome.",
    "May's $50.00 split between the May 2 and May 31 charges in any way, as long as May totals $50.00.",
    "For the four merchants with no address on file: the recipient left blank, a placeholder, or a card dispute raised with INTRUST, which issues the Visa.",
    "Hobby Lobby at $17.19, if the 40% is taken on the two items together rather than separately.",
    "One draft to Kenny covering all four company charges, or one draft per charge.",
    "Reading the Jul 5 charge as the June will call timer rung again, as long as the draft is consistent with that.",
  ],

  traps: [
    {
      id: "total-matches",
      title: "Two receipts that agree with the bank and are still wrong",
      where: "Hobby Lobby, Jun 13 and Kohl's, Jul 11",
      body: "Both receipts total exactly what was charged. Hobby Lobby's error is two discount lines that printed 0.00, and the receipt's own savings line agrees with the wrong total. Kohl's error is in the tender lines under the total, where a gift card was taken to a zero balance and the card was charged the full amount anyway.",
      tests: "Whether the agent reconciles line by line, or stops once the total agrees with the statement.",
      step: 3,
    },
    {
      id: "off-connector",
      title: "The record that settles it is outside the assigned tools",
      where: "El Dorado State Park, Jun 27",
      body: "The receipt says three nights and the bank agrees with the receipt. Nothing in Finances or Gmail contradicts either. Only the calendar, and the vet appointment in Wichita on the morning of the 26th, show that she was there for two.",
      tests: "Whether the agent keeps looking when the two obvious sources agree with each other.",
      step: 2,
    },
    {
      id: "fold",
      title: "The deciding figure is folded, rotated and out of focus",
      where: "The Carlos O'Kelly's slip inside IMG_163541.jpg",
      body: "The printed base is $8.74. In the photograph the slip is upside down, at an angle, and the fold runs across the amount line. A single read gives $18.74, which matches the posted charge and makes the dispute disappear.",
      tests: "Whether the agent straightens and re-reads hard media, or commits to its first pass.",
      step: 4,
    },
    {
      id: "two-in-one",
      title: "One photograph, two receipts, two separate charges",
      where: "IMG_163541.jpg",
      body: "The Carlos O'Kelly's slip and the El Dorado camping receipt were photographed together. They are two unrelated charges three days apart, and one of them needs the calendar while the other needs the handwriting.",
      tests: "Whether a file is treated as a container of evidence rather than as one document.",
      step: 4,
    },
    {
      id: "same-day",
      title: "Two charges on the same day, one of them the one she is asking about",
      where: "May 8 and May 9 in FinTrack",
      body: "May 8 carries Tillie's at $58.50 and Wichita Foot & Ankle at $385.00. May 9 carries Tillie's at $58.00 and Carniceria Acapulco at $58.20. Matching by merchant string rather than by amount and date collapses the wrong pair together.",
      tests: "Whether receipts are matched on amount and date, which is what the verification condition asks for.",
      step: 3,
    },
    {
      id: "cap",
      title: "An allowance that is a cap, not a rate",
      where: "Account 0117, May to July",
      body: "May holds $61.00 and $27.42, which is $88.42. The company covers up to $50 a month, so $50.00 is claimable and $38.42 is hers. June at $46.00 and July at $9.40 fall under the cap entirely. Adding the months first and capping afterwards gives the wrong figure.",
      tests: "Whether a rule stated once in the prompt is applied per month, and whether 'up to' is read as a ceiling.",
      step: 3,
    },
    {
      id: "no-address",
      title: "Four of the six drafts have no recipient anywhere in her records",
      where: "Hobby Lobby, Carlos O'Kelly's, El Dorado State Park, Kohl's",
      body: "Tillie's and Kenny both have addresses in the universe. The other four do not, and the prompt asks for the email to go to whoever it needs to go to. The recipient line is hers to fill in, or the dispute can be raised with the card issuer.",
      tests: "Whether the agent leaves the line open, or writes a plausible address that does not exist.",
      step: 5,
      links: [{ to: "/golden-tasks/charge-disputes#rubrics", tag: "GT", label: "Criterion 26 grades exactly this" }],
    },
  ],

  /* ------------------------------------------------------------------ step 4 */

  inputs: [
    {
      file: "screenshot_2.png",
      src: `${A}/inputs/screenshot_2.png`,
      kind: "screenshot",
      shows:
        "Tillie's web receipt for order 26 3391, May 9, E Central Ave: a large spring mixed arrangement at $48.00 and delivery at $10.00.",
      carries:
        "The order number that ties it to the May 8 confirmation email, and the $10.00 delivery line that differs by 50 cents from the one she was first billed.",
      role: "decides",
      charges: ["Tillie's, May 9, $58.00"],
    },
    {
      file: "receipt.jpg",
      src: `${A}/inputs/receipt.jpg`,
      kind: "photo",
      shows: "The Hobby Lobby register receipt of Jun 13, TRN 6624, photographed flat.",
      carries:
        "Four cotton lines, each followed by its own 40% OFF line. Two of those read 0.00, and the receipt still totals exactly what the bank took.",
      role: "decides",
      charges: ["Hobby Lobby, Jun 13, $71.00"],
      straight: {
        src: `${A}/inputs/straight/hobbylobby.jpg`,
        note: "Deskewed for the page. The two 0.00 lines are the whole dispute, so they have to be legible beside the claim.",
      },
    },
    {
      file: "IMG_163541.jpg",
      src: `${A}/inputs/IMG_163541.jpg`,
      kind: "photo",
      shows:
        "Two slips lying on a tablecloth, both sideways: the signed Carlos O'Kelly's customer copy and the El Dorado State Park camping receipt.",
      carries:
        "A printed base of $8.74 under a handwritten tip of $5.25 and a handwritten total of $13.99, and a camping receipt billing three nights from Jun 25.",
      role: "decides",
      charges: ["Carlos O'Kelly's, Jun 23, $18.74", "El Dorado State Park, Jun 27, $186.00"],
      straight: {
        src: `${A}/inputs/straight/carlos.jpg`,
        note: "The golden cropped the photograph into two images and turned both upright. Only then does the printed base read $8.74 rather than $18.74.",
      },
    },
    {
      file: "IMG_2026.jpg",
      src: `${A}/inputs/IMG_2026.jpg`,
      kind: "photo",
      shows: "The Kohl's receipt of Jul 11, transaction 6703, photographed sideways on a table.",
      carries:
        "The tender lines under the total: a Kohl's gift card ending 6093 taken to a zero balance for $10.00, and the Visa for $30.00, under a TOTAL of $40.00.",
      role: "decides",
      charges: ["Kohl's, Jul 11, $40.00"],
      straight: {
        src: `${A}/inputs/straight/kohls.jpg`,
        note: "Rotated upright and cropped. The error is below the total, in lines a reader skips.",
      },
    },
    {
      file: "cropped_receipt.png",
      src: `${A}/inputs/cropped_receipt.png`,
      kind: "screenshot",
      shows: "A small crop of the Hollenbeck Wichita East receipt of Jun 6.",
      carries:
        "The only company purchase with a receipt: $42.79 of goods plus tax, $46.00 on the employee account, with a water timer held on will call #5127.",
      role: "decides",
      charges: ["Hollenbeck, Jun 6, $46.00"],
    },
    {
      file: "IMG_23.jpg",
      src: `${A}/inputs/IMG_23.jpg`,
      kind: "photo",
      shows: "The Northrock Lanes slip of May 7, photographed at an angle on a dark surface.",
      carries: "One head at $46.00 for the winter league banquet, no tax, total $46.00.",
      role: "clears",
      charges: ["Northrock Lanes, May 7, $46.00"],
      straight: {
        src: `${A}/inputs/straight/northrock.jpg`,
        note: "Cropped and enlarged about fivefold. It is still lying on its side, but the $46.00 total and the date now read at a glance.",
      },
    },
    {
      file: "wichita_receipt.docx",
      src: `${A}/inputs/wichita_receipt.docx`,
      kind: "doc",
      shows: "The Wichita Foot & Ankle patient receipt of May 8, as the clinic sent it.",
      carries: "$385.00 for one pair of custom functional orthotics, paid on the Visa, balance $0.00.",
      role: "clears",
      charges: ["Wichita Foot & Ankle, May 8, $385.00"],
      straight: {
        src: `${A}/inputs/straight/wichitafoot.jpg`,
        note: "A Word file holds no picture, so the golden rendered the document's own text runs and table structure rather than retyping it.",
      },
    },
    {
      file: "receipt_2.jpg",
      src: `${A}/inputs/receipt_2.jpg`,
      kind: "photo",
      shows: "Woodlawn Animal Hospital invoice 41823, photographed off a screen.",
      carries: "Four lines totalling $284.50 for Frijol on Jun 26, settled on the Visa.",
      role: "clears",
      charges: ["Woodlawn Animal Hospital, Jun 26, $284.50"],
      straight: {
        src: `${A}/inputs/straight/woodlawn.jpg`,
        note: "Cropped to the invoice and contrast corrected, so the four lines and the total can be checked against the estimate.",
      },
    },
    {
      file: "page.txt",
      src: `${A}/inputs/page.txt`,
      kind: "notes",
      shows: "Her own notes on how she wants the page laid out.",
      carries:
        "The shape of the deliverable: two tabs, the four fields every disputed row has to show, a date filter, a Dispute draft button per row, and what the second tab is for.",
      role: "spec",
      charges: [],
    },
  ],

  layoutNotes: {
    file: "page.txt",
    src: `${A}/inputs/page.txt`,
    body: `Okay so I want the page split into two tabs

First tab is for the disputed charges. For each one show the date, the transaction ID, the amount, and the last digits of the account I paid with

I'm planning to keep using this page to track other erroneous charges down the line, so throw in a date filter too

Each disputed charge needs its own "Dispute draft" button, and when I click it, it should show the body of the draft you wrote for that dispute

Second tab is basically a history of the charges I asked you to check that turned out to be correct, each one with its own receipt or visual evidence tied to it`,
  },

  /* ------------------------------------------------------------------ step 5 */

  prompt: {
    text: `I been going back through my spending and a few charges between may and july need to be checked, as I'm not that sure about all of them to be correct. I know my regular spending well, but I kinda just assume everything is fine with one-time payments and never really double-check. I want to start having some control there as well.

I'm attaching the receipts however I have them available, so I need you to go through them alongside any purchase evidence you can find on my registers and work out which charges are actually supported and which ones I have reason to dispute. Put everything in disputes.html so I can go through it all in one place, using the layout notes I attached as a guide. If there’s anything I should actually dispute, draft the email to whoever it needs to go to and include the order reference, item, price, and why I’m disputing it. Just leave it in drafts though, don’t send anything.

Also, while you at it, take a look at anything I bought from my company during that same period and check whether I was actually reimbursed properly. If something got charged to me and never got sorted, draft an email to my manager for that too so he can raise it as an erroneous charge. We are allowed up to $50 a month in company purchases and tbh, I never really paid much attention to it because I just assumed it was all being handled properly, but I was talking to Margo the other day and she said she had few issues with hers, so now I figured I should probably check mine as well.`,
    marks: [
      {
        id: "window",
        quote: "a few charges between may and july need to be checked",
        label: "The window",
        body: "Fixes the period to May, June and July 2026. It is also the boundary the answer is scored on.",
        cost: "A review that reaches back to March picks up two Hollenbeck charges that are out of scope.",
      },
      {
        id: "media",
        quote: "I'm attaching the receipts however I have them available",
        label: "The media is the record",
        body: "Says the attachments are the evidence, in whatever state she kept them. It is the only warning that some of them are hard to read, and it is said the way a person would say it.",
      },
      {
        id: "registers",
        quote: "alongside any purchase evidence you can find on my registers",
        label: "Into the universe, without naming a tool",
        body: "Her accounts, her mail and her calendar are all 'my registers'. Naming the connectors as calls would be a drift from how a real person asks.",
      },
      {
        id: "both",
        quote: "which charges are actually supported and which ones I have reason to dispute",
        label: "Both verdicts, asked for out loud",
        body: "The page has to carry the charges that hold up as well as the ones that do not. Without this line the second tab could not be graded at all.",
      },
      {
        id: "file",
        quote: "Put everything in disputes.html",
        label: "The output file, spelled exactly",
        body: "The one artifact, named the way it has to appear.",
        cost: "Every objective criterion but the six about the mailbox names this file.",
      },
      {
        id: "notes",
        quote: "using the layout notes I attached as a guide",
        label: "The format rule stays in the attachment",
        body: "The two tabs, the four fields, the filter and the buttons are all in page.txt. Finding them and following them is part of the work.",
      },
      {
        id: "draft",
        quote: "include the order reference, item, price, and why I’m disputing it",
        label: "What every draft has to carry",
        body: "Four things, stated once, applied to six drafts.",
      },
      {
        id: "unsent",
        quote: "Just leave it in drafts though, don’t send anything.",
        label: "A state change the grader can check",
        body: "Drafts are inspectable. Anything in Sent is a failure, and six criteria are written against the mailbox because of this line.",
      },
      {
        id: "company",
        quote: "check whether I was actually reimbursed properly",
        label: "The second half of the task",
        body: "A different kind of claim: not a merchant error, but money an employer never paid back. It is why the page needs two groups.",
      },
      {
        id: "rule",
        quote: "We are allowed up to $50 a month in company purchases",
        label: "The rule, stated once, in her own words",
        body: "A cap, not a rate. It decides all four company charges, and it is why May yields $50.00 rather than $88.42.",
      },
      {
        id: "manager",
        quote: "draft an email to my manager",
        label: "A recipient only the universe can supply",
        body: "Her manager is Kenny Rutledge. The prompt never names him, and Bev and Margo are both wrong.",
      },
    ],
    withheld: [
      {
        title: "Which charges are wrong",
        body: "No merchant and no amount appears in the prompt. Five of the attached receipts carry an error and the prompt says nothing about which, or how many.",
      },
      {
        title: "That a receipt can match the bank and still be wrong",
        body: "The idea the whole task turns on is never stated. It has to come out of reading the lines, which is what the primary capability is for.",
      },
      {
        title: "Who the company email goes to",
        body: "'my manager' is the whole of it. Kenny Rutledge is in the universe, and so are two people who look like plausible wrong answers.",
      },
      {
        title: "The shape of the page",
        body: "Two tabs, four fields per row, a date filter and a button per dispute are all in the attached notes. The prompt only says to use them.",
      },
    ],
  },

  /* ------------------------------------------------------------------ step 6 */

  draftHistory: {
    objective: [
      "Marisela Ybarra works for Hollenbeck Garden & Hardware in Wichita, Kansas. She keeps close track of her regular spending but has never double-checked her one-time payments, and she now wants to go through the ones she made between May and July 2026. She has attached the receipts in whatever form she kept them (phone photos of paper receipts, screenshots and a Word document), together with her own layout notes for the page she wants.",
      "She also buys from her employer on her Hollenbeck employee account, where company purchases are covered up to $50 a month. She never paid attention to it, but Margo told her she had issues with hers, so she wants to know whether she was reimbursed properly.",
      "The agent works for her from those attachments and the records in her accounts. Success is a single page, `disputes.html`, where she can see which charges hold up and which ones she has reason to dispute, with a draft email ready for every dispute, including one to her manager for any company purchase that was never sorted out. She reviews the drafts herself, so nothing is sent.",
    ],
    objectiveReads: [
      {
        title: "Who she is, and why now",
        body: "Enough context for a colleague to act on, and the reason the work is happening at all. It never says what to do first.",
      },
      {
        title: "The second thread, and where it came from",
        body: "The company account and the $50 rule, attributed to the conversation with Margo rather than handed down as a specification.",
      },
      {
        title: "What success looks like",
        body: "One page, a draft per dispute, nothing sent. Stated as an end state, not as a method.",
      },
    ],
    outcome: [
      {
        n: 1,
        summary: "The page, and what is on each tab",
        produces: ["disputes.html"],
        lines: [
          "A charge is supported when the receipt, her emails and calendar, and the bank amount agree on what she bought and what she paid. It is disputed when she was charged more than she agreed to pay, including when the receipt total matches the bank but the receipt itself is wrong (Hobby Lobby, Kohl's).",
          "**Tab 1, disputed charges.** One row per charge with the date, the FinTrack transaction ID, the amount and the last digits of the account (7742 or 0117). Each row has a \"Dispute draft\" button that shows that dispute's draft body, and the tab has a date filter. $257.35 to get back in total:",
          "- Tillie's Flower Shop, E Central Ave, May 9, $58.00 on 7742: dispute $58.00. It charges order 26 3391 a second time.",
          "- Hobby Lobby, Jun 13, $71.00 on 7742: dispute $17.20. The fat quarter bundle ($27.99) and the quilt panel ($11.99) show \"40% OFF 0.00\".",
          "- Carlos O'Kelly's, Jun 23, $18.74 on 7742: dispute $4.75. The signed slip is $8.74 plus a $5.25 tip, $13.99.",
          "- El Dorado State Park, Jun 27, $186.00 on 7742: dispute $62.00. Receipt 26-04173 bills 3 nights from Jun 25, but the calendar shows 2 nights.",
          "- Kohl's, E Kellogg Dr, Jul 11, $40.00 on 7742: dispute $10.00. The $40.00 total was paid $10.00 by gift card and $30.00 by Visa, but the Visa was charged $40.00.",
          "- Hollenbeck company purchases on 0117, one row each: May 2 $61.00, May 31 $27.42, Jun 6 $46.00, Jul 5 $9.40. At up to $50 a month, $105.40 is owed.",
          "**Tab 2, verified charges**, each with its receipt: Northrock Lanes, May 7, $46.00; Wichita Foot & Ankle, May 8, $385.00; Woodlawn Animal Hospital, Jun 26, $284.50.",
        ],
        askedFor: [
          "work out which charges are actually supported and which ones I have reason to dispute",
          "Put everything in disputes.html so I can go through it all in one place, using the layout notes I attached as a guide",
        ],
      },
      {
        n: 2,
        summary: "Six drafts, and the one recipient rule",
        produces: ["6 Gmail drafts"],
        lines: [
          "Six Gmail drafts, none sent, each with the reference, the item, the price and the reason for the dispute:",
          "- `orders@tilliesflowers.com`: order 26 3391 charged twice, refund $58.00.",
          "- Hobby Lobby: receipt TRN 6624, refund $17.20.",
          "- Carlos O'Kelly's: check 2187, refund $4.75.",
          "- El Dorado State Park: receipt 26-04173, Campsite 41, Loop C, refund $62.00.",
          "- Kohl's: transaction 6703, refund $10.00.",
          "- Her manager, Kenny Rutledge (`krutledge@hollenbeckgh.com`): the four company charges, the $50 monthly allowance and the $105.40 to raise as erroneous charges.",
          "Hobby Lobby, Carlos O'Kelly's, El Dorado State Park and Kohl's have no email address in her records, so the recipient is left for her to fill in, **never made up**.",
        ],
        askedFor: [
          "draft the email to whoever it needs to go to and include the order reference, item, price, and why I’m disputing it",
          "draft an email to my manager for that too so he can raise it as an erroneous charge",
          "Just leave it in drafts though, don’t send anything.",
        ],
      },
      {
        n: 3,
        summary: "What stays off the page",
        produces: ["the boundary"],
        lines: [
          "Nothing else is disputed: regular spending stays out, and so does anything dated before May 1 or after Jul 31.",
        ],
        askedFor: [
          "a few charges between may and july need to be checked",
          "I know my regular spending well",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ step 7 */

  run: {
    summary:
      "One prompt, one answer. Model A had every attachment open and every email it needed, and still cleared three of the five wrong charges as correct.",
    stats: [
      { k: "Tool calls", v: "71" },
      { k: "Run time", v: "9m 39s" },
      { k: "Drafts created", v: "3 of 6" },
      { k: "Rows on the dispute tab", v: "4 of 9" },
    ],
    kept: [
      "Tillie's: it found the duplicate, tied both charges to order 26 3391 and addressed the draft to the shop.",
      "Kohl's: it read the tender split and identified the $10.00 collected twice.",
      "The company arithmetic: its own draft to Kenny claims the correct $105.40, including the first $50.00 of May.",
      "The page was written to her files, follows the two tab shape, and the date filter works.",
    ],
    observations: [
      {
        title: "The receipt it had already opened",
        expected:
          "Hobby Lobby's four cotton lines checked against the 40% sale, which gives $17.20 back.",
        actual:
          "It opened receipt.jpg at tool call 3 and found Iva Jean's sale email at tool call 52, then cleared the charge on the second tab and described the items as 'all at 40% off, $17.39 saved', which is wrong for two of the four.",
        rubrics: [2, 10, 19],
      },
      {
        title: "A first read it never went back to",
        expected: "The printed base on the Carlos O'Kelly's slip read as $8.74 under a handwritten $13.99.",
        actual:
          "It cropped the slip at tool calls 36 and 37 and recorded 'Amount $18.74 + tip $5.25, total written $23.99', then concluded the restaurant never captured the tip and marked the charge 'Nothing owed'.",
        rubrics: [3, 11, 20],
      },
      {
        title: "The record it never looked at",
        expected: "The calendar checked against the three nights El Dorado billed.",
        actual:
          "Its calendar lookups never cover Jun 25 to 28 and it never searched for El Dorado. The receipt agreed with the bank, so it cleared the $186.00 as 'Matches'.",
        rubrics: [4, 12, 21],
      },
      {
        title: "A page that contradicts its own draft",
        expected: "All four company charges on the first tab, with May's $50.00 inside the total.",
        actual:
          "The first tab lists the Jun 6 and Jul 5 charges but not May 2 or May 31, and totals $123.40, while the draft it wrote to Kenny claims $105.40 including the first $50.00 of May.",
        rubrics: [7],
      },
      {
        title: "A tab that filled up with guesses",
        expected: "The second tab limited to the charges she asked about that turned out to be correct.",
        actual:
          "It counts 19 charges as cleared, adding ones she never asked about and gave no evidence for, including Dillons Marketplace at $310.00 under 'No receipt exists'.",
        rubrics: [25],
      },
      {
        title: "A dispute addressed to a mailbox that does not read mail",
        expected: "The Kohl's draft written to Kohl's.",
        actual:
          "It went to alerts@intrustbank.com, whose own mail says do not reply, and which Model A's page itself calls an unmonitored alerts box. The content was right; the recipient could not act on it.",
        rubrics: [22],
      },
    ],
    score: [
      { label: "Objective block", lost: "36", of: "69", pct: "52%" },
      { label: "Subjective block", lost: "23", of: "23", pct: "100%" },
      { label: "Both blocks together", lost: "59", of: "92", pct: "64%" },
    ],
    artifacts: [
      {
        file: "disputes.html",
        what: "The page as Model A wrote it: four rows on the first tab, nineteen charges cleared on the second, no receipt images beside any dispute.",
        src: `${A}/ot/disputes.html`,
        kind: "html",
      },
      {
        file: "3 Gmail drafts",
        what: "Tillie's, Kohl's addressed to the bank's alerts inbox, and Kenny. Nothing sent.",
        kind: "draft",
      },
    ],
  },

  /* ------------------------------------------------------------------ step 8 */

  rubricShape: [
    { label: "Criteria", value: "26", note: "23 positive and 3 negative." },
    {
      label: "Graded on completion",
      value: "26 of 26",
      note: "Twenty on the final artifact, six on the state of the mailbox.",
    },
    {
      label: "Graded on process",
      value: "0",
      note: "The cap is 20% of the block and zero is the preferred number. Nothing here targets the trajectory.",
    },
    {
      label: "Criteria at weight 5",
      value: "6",
      note: "One for each of the five card disputes, and one for the company charges the page has to find without a receipt.",
    },
  ],

  rubrics: [
    {
      n: 1,
      text: "'disputes.html' first tab references the Tillie's Flower Shop $58 receipt ('screenshot_2.png') as a duplicate charge to dispute, with the date 2026-05-09, transaction ID 1829403a7526c738f90a1b2c, amount $58.00, and last 4 account digits 7742.",
      weight: 5,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 2,
      text: "'disputes.html' first tab references the Hobby Lobby $71 receipt ('receipt.jpg') as a $17.20 overcharge to dispute (the receipt's 40% discount not applied to the fat quarter bundle and the quilt panel), with the date 2026-06-13, transaction ID 39d5a70c164ef82b9507c3d1, amount $71.00, and last 4 account digits 7742.",
      weight: 5,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed:
        "The second tab marks the charge as matching and says the items were 'all at 40% off, $17.39 saved'. The first tab has no Hobby Lobby row.",
    },
    {
      n: 3,
      text: "'disputes.html' first tab references the Carlos O'Kelly's $13.99 receipt ('IMG_163541.jpg') as a $4.75 overcharge to dispute (signed total of $13.99 with a $5.25 tip), with the date 2026-06-23, transaction ID 9c559ea2d094608295fbb0da, amount $18.74, and last 4 account digits 7742.",
      weight: 5,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed:
        "Read as 'Amount $18.74 + tip $5.25, total written $23.99' and filed under 'Nothing owed'. The printed base is $8.74 and the handwritten total is $13.99.",
    },
    {
      n: 4,
      text: "'disputes.html' first tab references the El Dorado State Park $186 receipt ('IMG_163541.jpg') as a $62.00 overcharge to dispute (3 nights billed for a 2-night stay), with the date 2026-06-27, transaction ID b60e35c1d78f2a940b6e15c3, amount $186.00, and last 4 account digits 7742.",
      weight: 5,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed:
        "Cleared as matching, citing 'Receipt total $186.00 (3 nights @ $62.00)'. The calendar for Jun 25 to 28 was never read.",
    },
    {
      n: 5,
      text: "'disputes.html' first tab references the Kohl's $40 receipt ('IMG_2026.jpg') as a $10.00 overcharge to dispute (the $10.00 gift card payment was also charged), with the date 2026-07-11, transaction ID a1b82c930ebf50c18293a4b5, amount $40.00, and last 4 account digits 7742.",
      weight: 5,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 6,
      text: "'disputes.html' first tab references the Hollenbeck Garden & Hardware $46 receipt ('cropped_receipt.png') as an unreimbursed company purchase to dispute (within the $50 monthly allowance), with the date 2026-06-06, transaction ID 18c5d7a9204ef3b61c9d0e75, amount $46.00, and last 4 account digits 0117.",
      weight: 3,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 7,
      text: "'disputes.html' first tab references the three additional Hollenbeck Garden & Hardware charges as unreimbursed company purchases to dispute, with $50.00 owed for May under the $50 monthly employee allowance and $9.40 owed for July (2026-05-02, transaction af238e10c96b47d5e802b163, $61.00; 2026-05-31, transaction f61d9b0a3c7e254801fb6d93, $27.42; 2026-07-05, transaction f21b89d46a03c7e51580b3d9, $9.40; all on account ending 0117).",
      weight: 5,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed:
        "The May 2 and May 31 charges are missing from the tab, and the page's $123.40 total leaves out May's $50.00 that its own draft claims.",
    },
    {
      n: 8,
      text: "'disputes.html' includes a date filter that correctly filters the first tab's disputed entries by date.",
      weight: 1,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 9,
      text: "'disputes.html' first tab has a \"Dispute draft\" button for the Tillie's Flower Shop dispute that opens the draft body, which cites order 26 3391 and the spring mixed arrangement (large), and states that the $58.00 charge is a duplicate of an order already charged.",
      weight: 3,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 10,
      text: "'disputes.html' first tab has a \"Dispute draft\" button for the Hobby Lobby dispute that opens the draft body, which cites receipt TRN 6624 and states that the fat quarter bundle and the quilt panel missed the 40% discount, a $17.20 overcharge (or $17.19 if the 40% is taken on both items together).",
      weight: 3,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed: "There is no Hobby Lobby row, so there is no button and no draft.",
    },
    {
      n: 11,
      text: "'disputes.html' first tab has a \"Dispute draft\" button for the Carlos O'Kelly's dispute that opens the draft body, which cites check 2187 and states that the bill was signed for $13.99 but charged $18.74, a $4.75 overcharge.",
      weight: 3,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed: "The charge sits on the second tab marked 'Nothing owed', with no row, button or draft.",
    },
    {
      n: 12,
      text: "'disputes.html' first tab has a \"Dispute draft\" button for the El Dorado State Park dispute that opens the draft body, which cites receipt 26-04173 and Campsite 41, Loop C, and states that 3 nights were billed for a 2-night stay, a $62.00 overcharge.",
      weight: 3,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed: "The charge sits on the second tab marked 'Matches', with no row, button or draft.",
    },
    {
      n: 13,
      text: "'disputes.html' first tab has a \"Dispute draft\" button for the Kohl's dispute that opens the draft body, which cites transaction 6703 and states that the $10.00 gift card payment was also charged.",
      weight: 3,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 14,
      text: "'disputes.html' first tab gives each Hollenbeck Garden & Hardware company-purchase entry its own \"Dispute draft\" button that opens the draft body, which states that the purchases were never reimbursed, covers all four amounts ($61.00, $27.42, $46.00, and $9.40), and claims $105.40 in total under the $50 monthly allowance.",
      weight: 3,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 15,
      text: "'disputes.html' second tab references the Northrock Lanes $46.00 charge from 2026-05-07 as correct, with the receipt image from 'IMG_23.jpg' shown on the page and tied to that entry.",
      weight: 3,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 16,
      text: "'disputes.html' second tab references the Wichita Foot & Ankle $385.00 charge from 2026-05-08 as correct, with an image of the 'wichita_receipt.docx' receipt shown on the page and tied to that entry.",
      weight: 3,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "not-present",
      observed:
        "The card cites the .docx but shows no image. Its evidence folder has a picture for every image input and none for the Word file.",
    },
    {
      n: 17,
      text: "'disputes.html' second tab references the Woodlawn Animal Hospital $284.50 charge from 2026-06-26 as correct, with the invoice image from 'receipt_2.jpg' shown on the page and tied to that entry.",
      weight: 3,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "positive",
      status: "present",
    },
    {
      n: 18,
      text: "A Gmail draft addressed to Tillie's Flower Shop (orders@tilliesflowers.com) disputing the $58.00 duplicate charge is left unsent, referencing order 26 3391 and the spring mixed arrangement (large).",
      weight: 1,
      category: "Task Completion",
      target: "State change",
      polarity: "positive",
      status: "present",
    },
    {
      n: 19,
      text: "A Gmail draft written to Hobby Lobby disputing the $17.20 (or $17.19 if discount is calculated from both items together) overcharge is left unsent, referencing receipt TRN 6624 and the 40% discount not applied to the fat quarter bundle and the quilt panel.",
      weight: 1,
      category: "Task Completion",
      target: "State change",
      polarity: "positive",
      status: "not-present",
      observed: "Three drafts exist. None of them is to Hobby Lobby, because the page cleared the charge.",
    },
    {
      n: 20,
      text: "A Gmail draft written to Carlos O'Kelly's disputing the $4.75 overcharge is left unsent, referencing check 2187 and the $13.99 signed total against the $18.74 charged.",
      weight: 1,
      category: "Task Completion",
      target: "State change",
      polarity: "positive",
      status: "not-present",
      observed: "No draft, because the page concluded nothing was owed.",
    },
    {
      n: 21,
      text: "A Gmail draft written to El Dorado State Park disputing the $62.00 overcharge is left unsent, referencing receipt 26-04173 and the 3 nights billed at Campsite 41, Loop C, for a 2-night stay.",
      weight: 1,
      category: "Task Completion",
      target: "State change",
      polarity: "positive",
      status: "not-present",
      observed: "No draft, because the page cleared the charge.",
    },
    {
      n: 22,
      text: "A Gmail draft written to Kohl's disputing the $10.00 overcharge is left unsent, referencing transaction 6703 and the gift card payment that was also charged.",
      weight: 1,
      category: "Task Completion",
      target: "State change",
      polarity: "positive",
      status: "not-present",
      observed:
        "The draft exists and the content is right, but it is addressed to the card issuer's automated alerts inbox rather than to Kohl's.",
    },
    {
      n: 23,
      text: "A Gmail draft addressed to the user's manager (krutledge@hollenbeckgh.com) is created and left unsent, asking him to raise the unreimbursed Hollenbeck Garden & Hardware purchases from 2026-05-02 ($61.00), 2026-05-31 ($27.42), 2026-06-06 ($46.00), and 2026-07-05 ($9.40) as erroneous charges and stating that $105.40 is due under the $50 monthly employee allowance.",
      weight: 3,
      category: "Task Completion",
      target: "State change",
      polarity: "positive",
      status: "present",
    },
    {
      n: 24,
      text: "'disputes.html' first tab references a non-disputable charge (e.g., the Christian Brothers Automotive $380.00 charge from 2026-05-23) as an erroneous charge to dispute, meaning any charge other than those supported by 'screenshot_2.png' (Tillie's Flower Shop), 'receipt.jpg' (Hobby Lobby), 'IMG_163541.jpg' (Carlos O'Kelly's and El Dorado State Park), 'IMG_2026.jpg' (Kohl's), or Hollenbeck Garden & Hardware company purchases that remain unreimbursed and are eligible under the $50 monthly employee allowance.",
      weight: -3,
      category: "Task Completion",
      target: "Final answer/artifact",
      polarity: "negative",
      status: "not-present",
    },
    {
      n: 25,
      text: "'disputes.html' second tab references as checked any charge for which no supporting evidence was provided, even though 'page.txt' limits that tab to charges the user explicitly asked to check and that were confirmed as correct ('the charges I asked you to check that turned out to be correct').",
      weight: -3,
      category: "Instruction Following",
      target: "Final answer/artifact",
      polarity: "negative",
      status: "present",
      observed:
        "Nineteen charges counted as cleared, including Dillons Marketplace at $310.00 with 'No receipt exists', and two more described as having no document behind them.",
    },
    {
      n: 26,
      text: "A Gmail dispute draft for Hobby Lobby, Carlos O'Kelly's, El Dorado State Park, or Kohl's is addressed to a made-up email address, found neither in the user's records nor in any lookup made during the run.",
      weight: -3,
      category: "Factuality & Hallucination",
      target: "State change",
      polarity: "negative",
      status: "not-present",
    },
  ],

  /* ------------------------------------------------------------------ step 9 */

  goldenRun: {
    opening:
      "The same prompt, word for word, in a new conversation. The first reply reached Tillie's and Kohl's, which is the same pair Leg A reached, and cleared three real disputes. Everything below is the user simulator closing that gap without ever naming a merchant, an amount or a record.",
    steers: [
      {
        n: 1,
        prompt:
          "Not fully convinced by this yet. A few things don't really line up with how I remember those purchases going. Can you go back through each receipt again and compare what's actually printed on it with what I got charged and with anything else I've got about it, like my emails or whatever I had going on that week? Just because a receipt matches the bank doesn't mean I paid the right amount. Also please stick to my layout notes: everything on the first tab should show what my notes ask for, and the date filter should work on all of it. Just show me what you found, I don't need the explanation of how you got there.",
        missed:
          "Three of the five disputes, and a first tab that did not carry the four fields her notes ask for.",
        does: [
          "Points at her own memory of the purchases, which is something this person would really have.",
          "Names the method rather than the answer: what is printed, against what was charged, against that week's records.",
          "Repeats a requirement that is already in the notes she attached.",
          "Asks for the findings rather than the working, which is a preference she is entitled to.",
        ],
        avoids: [
          "Any merchant, any amount, any date.",
          "That a sale, a calendar entry or a tender line exists.",
          "How many disputes there are.",
        ],
        recovered:
          "Hobby Lobby and El Dorado, and the company purchases moved onto the first tab in the required shape. Two earlier flags were withdrawn. Four card disputes, $147.20.",
      },
      {
        n: 2,
        prompt:
          "I went through the page against my notes again though, and the second tab still feels to have more than the charges I asked you to check that turned ot to be correct. Seeing stuff I never asked you to check for. I also want to be able to read every receipt right there on the page, the way I'd look at it on paper. I took some of those photos in a rush, so the small print, and anything I filled in myself, is worth a proper second look rather than going with the first read. The page also still reads like notes on what you checked and changed along the way. I just want the final picture, as if I'm seeing it for the first time. And the emails should just ask for what I'm owed with the right figures, not second-guess it.",
        missed: "Carlos O'Kelly's, which had been read off the photograph wrongly and cleared.",
        does: [
          "Points at the quality of her own photographs, which she took.",
          "Points at the parts she filled in by hand, which she knows she wrote.",
          "Says a first read of small print is worth repeating, which is a method, not a value.",
          "Scopes the second tab back using the words her own notes already use.",
        ],
        avoids: [
          "The slip, the restaurant, the fold, the figure.",
          "Any suggestion that a specific number was misread.",
          "The $4.75, and the total it changes.",
        ],
        recovered:
          "It re-read the slip, found the printed base was $8.74 rather than $18.74, and reached $257.35. Five disputes, and the second tab cut back to three.",
      },
      {
        n: 3,
        prompt:
          "Good improvement. For the second tab, I’d prefer the visual evidence to stay tied to the inputs I actually provided though. I don’t mind if you crop them, pull out the relevant section, or create a focused image from them, but I was expecting the evidence shown there to come directly from those original inputs, as covered in the layout notes.",
        missed:
          "One entry showed a hand-built facsimile rather than anything derived from a file she attached.",
        does: [
          "Restates a requirement her layout notes already carry.",
          "Says what is allowed: crop it, pull out a section, build a focused image from it.",
          "Leaves the agent to find which entry breaks the rule.",
        ],
        avoids: [
          "Naming the entry.",
          "Naming the file, or the fact that it is a Word document.",
          "Saying what to do about a format that holds no image.",
        ],
        recovered:
          "It rendered the receipt out of wichita_receipt.docx itself, reading the document's own text runs and table structure, so all nine images on the page trace back to an input.",
      },
      {
        n: 4,
        prompt:
          "Nearly there, just some last bits before I'm happy with it. In the email to my manager, not every figure you quote from my pay matches what actually went into my account, so check those against my records. Update the drafts themselves rather than adding new ones. You don't even to be mentioning deposits that are not even relevant to the dispute process there. Everything else looks good, so leave it as it is and don't add notes about what changed.",
        missed: "The draft to Kenny quoted a mileage figure that does not match the deposit.",
        does: [
          "Says a figure is wrong without saying which one.",
          "Points at her own account records as the thing to check it against.",
          "Says to edit in place rather than add, and to leave everything else alone.",
        ],
        avoids: ["The amount, the month, the kind of deposit.", "What it should be replaced with."],
        recovered:
          "It found that the $840.24 it had quoted as July mileage posts on Aug 10, and that Jul 10 carried $867.60. It cut the sentence rather than correcting it, because the deposits are not part of the claim.",
      },
    ],
    progress: [
      {
        label: "First reply",
        found: "2 of 5",
        total: "not totalled",
        note: "Tillie's and Kohl's, plus the company purchases at $105.40. Three drafts.",
      },
      {
        label: "After steer 1",
        found: "4 of 5",
        total: "$147.20 on the card",
        note: "Hobby Lobby and El Dorado found, two earlier flags withdrawn, the first tab reshaped.",
      },
      {
        label: "After steer 2",
        found: "5 of 5",
        total: "$257.35",
        note: "Carlos O'Kelly's came out of the small print. The second tab cut to three entries.",
      },
      {
        label: "After steer 3",
        found: "5 of 5",
        total: "$257.35",
        note: "Every image on the page now derives from a file she attached.",
      },
      {
        label: "After steer 4",
        found: "5 of 5",
        total: "$257.35",
        note: "The draft to Kenny corrected in place. Six drafts, nothing sent.",
      },
    ],
    artifacts: [
      {
        file: "disputes.html",
        what: "Nine entries under two labelled headings, every figure set out in a table, every receipt readable on the page.",
        src: `${A}/gt/disputes.html`,
        kind: "html",
      },
      {
        file: "receipts/",
        what: "Nine images, each one derived from a file she attached, straightened and cropped.",
        kind: "folder",
      },
      {
        file: "6 Gmail drafts",
        what: "Five merchants and one to her manager, each asking for a specific figure. Nothing sent.",
        kind: "draft",
      },
    ],
  },

  /* ----------------------------------------------------------------- step 10 */

  subjectiveNote:
    "Thirty candidates came out of putting the two pages side by side. Eleven survived. The rest went because they repeated each other, because the prompt or the layout notes had already required them, which makes them objective, or because no reviewer could locate the thing they named on the render.",

  subjective: [
    {
      n: 1,
      text: "'disputes.html' displays every correct receipt image in the second tab at a size and orientation at which its printed amounts can be read without enlarging it.",
      weight: 3,
      artifact: "disputes.html, second tab",
      asks: "Whether a receipt on the verified tab can be checked where it sits, the way she would check the paper in her hand.",
      status: "not-present",
      legA: {
        verdict:
          "Fixed at 230 pixels wide and not enlargeable. The Northrock slip is tilted and upside down at 230 by 306, and the Woodlawn invoice shrinks to 230 by 202. Neither total can be read.",
        view: { src: `${A}/compare/ot-tab2-northrock.jpg`, canvas: { w: 1300, h: 475 } },
      },
      legB: {
        verdict:
          "The same slip cropped to fill the column at about five times the size, captioned as supplied and straightened. The $46.00 and the date read without enlarging, although it is still on its side.",
        view: { src: `${A}/compare/gt-tab2-northrock.jpg`, canvas: { w: 1300, h: 1287 } },
      },
      derived:
        "The difference is a visible property of the render, size and orientation, not a preference. Nothing in the prompt or the layout notes says how big a receipt has to be, which is what keeps it out of the objective block.",
    },
    {
      n: 2,
      text: "Each card-charge dispute on the first tab of 'disputes.html' makes its supporting receipt image viewable from within its own entry, either inline or behind a toggle.",
      weight: 3,
      artifact: "disputes.html, first tab",
      asks: "Whether the paper behind a claim can be seen without leaving the claim.",
      status: "not-present",
      legA: {
        verdict:
          "No receipt images on the first tab at all. The Kohl's receipt is a thumbnail on the other tab and a bare file link that takes her off the page.",
        view: { src: `${A}/compare/ot-kohls-row.jpg`, canvas: { w: 1300, h: 221 } },
      },
      legB: {
        verdict: "A View receipt button sits in the entry, beside the draft button and the recipient.",
        view: { src: `${A}/compare/gt-kohls-actions.jpg`, canvas: { w: 1300, h: 111 } },
      },
      derived:
        "Checking a dispute against its own paper is the step she repeats most. Filing that evidence under a different tab is a layout decision, and it is visible on the render.",
    },
    {
      n: 3,
      text: "Each card-charge dispute on the first tab of 'disputes.html' sets out the figures behind the amount owed back in a small table (for example charged, correct and difference) rather than only in running text.",
      weight: 3,
      artifact: "disputes.html, first tab",
      asks: "Whether the arithmetic she is about to claim can be checked at a glance.",
      status: "not-present",
      legA: {
        verdict:
          "The Kohl's entry explains the two tenders in a paragraph, so three figures have to be pulled out of prose before the $10.00 makes sense.",
        view: { src: `${A}/compare/ot-kohls-row.jpg`, canvas: { w: 1300, h: 221 } },
      },
      legB: {
        verdict: "A tender table: the gift card line, the Visa line, what posted, and what is owed back.",
        view: { src: `${A}/compare/gt-kohls-why.jpg`, canvas: { w: 1300, h: 367 } },
      },
      derived:
        "Every dispute here comes down to a short calculation. Whether it is laid out or written out is a presentation choice with a real effect on how long checking takes.",
    },
    {
      n: 4,
      text: "Every card on the second tab of 'disputes.html' presents its details in the same fields and in the same order (for example date, transaction ID, amount, account).",
      weight: 3,
      artifact: "disputes.html, second tab",
      asks: "Whether the verified tab can be scanned, or has to be read card by card.",
      status: "not-present",
      legA: {
        verdict:
          "The fields change from card to card: receipt total, posted, item and auth on one; invoice total, posted, patient and lines on the next. No card carries a transaction id.",
        view: { src: `${A}/compare/ot-tab2-two.jpg`, canvas: { w: 1300, h: 1082 } },
      },
      legB: {
        verdict: "The same labelled rows in the same order on every entry, transaction id included.",
        view: { src: `${A}/compare/gt-tab2-two.jpg`, canvas: { w: 646, h: 1300 } },
      },
      derived:
        "Consistency across entries is visible without reading a word of the content, and it is what lets her match a verified charge back to her statement the way she can a disputed one.",
    },
    {
      n: 5,
      text: "The first tab of 'disputes.html' places the merchant card disputes and the company-account purchases under separate section headings.",
      weight: 1,
      artifact: "disputes.html, first tab",
      asks: "Whether the two kinds of claim, which go to different people, are told apart before any detail is read.",
      status: "not-present",
      legA: {
        verdict:
          "One table, no headings. Small coloured labels reading Duplicate, Overcharged and Not reimbursed are the only thing separating a merchant claim from an employer one.",
        view: { src: `${A}/compare/ot-table.jpg`, canvas: { w: 1300, h: 836 } },
      },
      legB: {
        verdict:
          "Two headings that each say who the money comes back from, with the entries grouped under them.",
        view: { src: `${A}/compare/gt-sections.jpg`, canvas: { w: 1300, h: 414 } },
      },
      derived:
        "A card refund and an employer credit are different conversations. Grouping them is a layout decision, and the heading is a visible element with a visible property.",
    },
    {
      n: 6,
      text: "'disputes.html' lists the disputed entries on the first tab in date order within each labelled section, or across the whole list when there are no sections.",
      weight: 1,
      artifact: "disputes.html, first tab",
      asks: "Whether the list reads as a timeline, which is also what keeps it predictable once it is filtered.",
      status: "not-present",
      legA: {
        verdict: "One list, no sections, running 9 May, 11 Jul, 6 Jun, 5 Jul. It jumps forward and back.",
        view: { src: `${A}/compare/ot-table.jpg`, canvas: { w: 1300, h: 836 } },
      },
      legB: {
        verdict:
          "The company group covers the same four months in order: May 2, May 31, Jun 6, Jul 5. The card group above it runs May 9 to Jul 11.",
        view: { src: `${A}/compare/gt-company.jpg`, canvas: { w: 852, h: 1300 } },
      },
      derived:
        "Order is a property of the rendered list and nothing in the notes asks for it. It matters more as the page fills up, which is exactly what she says she will do with it.",
    },
    {
      n: 7,
      text: "'disputes.html' names the account alongside its last four digits in each disputed entry (for example 'INTRUST Visa ending 7742' or 'Hollenbeck employee account ending 0117') rather than showing the digits alone.",
      weight: 1,
      artifact: "disputes.html, first tab",
      asks: "Whether she can tell which statement a charge sits on without decoding four digits.",
      status: "not-present",
      legA: {
        verdict: "The account column reads only the dots and the digits.",
        view: { src: `${A}/compare/ot-tillies-row.jpg`, canvas: { w: 1300, h: 246 } },
      },
      legB: {
        verdict: "The account row names the card and then the digits.",
        view: { src: `${A}/compare/gt-tillies-head.jpg`, canvas: { w: 1300, h: 367 } },
      },
      derived:
        "The layout notes ask for the last digits and stop there, so naming the account is an addition rather than a requirement, which is what makes it subjective.",
    },
    {
      n: 8,
      text: "'disputes.html' shows beside each 'Dispute draft' button who that draft goes to, or who it should go to when no address is on file, without the draft having to be opened.",
      weight: 1,
      artifact: "disputes.html, first tab",
      asks: "Whether the list of disputes doubles as a list of next steps.",
      status: "not-present",
      legA: {
        verdict:
          "The buttons stand alone in the last column. Where each draft goes, including the one addressed to an unmonitored alerts inbox, is only visible once it is open.",
        view: { src: `${A}/compare/ot-tillies-row.jpg`, canvas: { w: 1300, h: 246 } },
      },
      legB: {
        verdict:
          "The recipient sits beside the button, and where there is none it says what to put there instead.",
        view: { src: `${A}/compare/gt-hl-actions.jpg`, canvas: { w: 1300, h: 111 } },
      },
      derived:
        "Four of the six drafts have no recipient on file, so what the page says next to the button is the difference between a list and a plan.",
    },
    {
      n: 9,
      text: "The first tab of 'disputes.html' splits the total owed back into the amount to claim from merchants on the card charges and the amount to raise with her employer for the company purchases on account 0117, instead of giving a single combined figure.",
      weight: 3,
      artifact: "disputes.html, first tab",
      asks: "Whether she can see how much rides on each of the two conversations.",
      status: "not-present",
      legA: {
        verdict: "One figure, $123.40, labelled At issue, with neither part shown anywhere.",
        view: { src: `${A}/compare/ot-totals.jpg`, canvas: { w: 1300, h: 112 } },
      },
      legB: {
        verdict: "$257.35 in range, then $151.95 from merchants and $105.40 uncredited, on the same line.",
        view: { src: `${A}/compare/gt-totals.jpg`, canvas: { w: 1300, h: 221 } },
      },
      derived:
        "The money comes back through two different channels. Splitting the total is a presentation decision that changes which conversation she starts with.",
    },
    {
      n: 10,
      text: "The total owed back shown in 'disputes.html' recalculates when the date filter on the first tab is applied, so it always matches the entries left on screen.",
      weight: 3,
      artifact: "disputes.html, first tab",
      asks: "Whether the figure on screen describes the rows on screen.",
      status: "not-present",
      legA: {
        verdict:
          "Filtered to June, the table drops to one row and the count says so, while the At issue card still reads $123.40, the total for all four.",
        view: { src: `${A}/compare/ot-filtered.jpg`, canvas: { w: 1300, h: 564 } },
      },
      legB: {
        verdict:
          "The same filter leaves four of nine entries and the line rewrites itself to $129.95, split $83.95 and $46.00.",
        view: { src: `${A}/compare/gt-filtered.jpg`, canvas: { w: 1300, h: 221 } },
      },
      derived:
        "The notes ask for a filter and say nothing about the total, so the two disagreeing is a presentation failure rather than a missing requirement. It is also the clearest case in the block: the page contradicts itself on screen.",
    },
    {
      n: 11,
      text: "Each disputed card charge on the first tab of 'disputes.html' shows the item or items charged as labelled fields on the entry itself, so the user can see what is being disputed without opening the draft.",
      weight: 1,
      artifact: "disputes.html, first tab",
      asks: "Whether an entry says what the purchase actually was.",
      status: "not-present",
      legA: {
        verdict: "The Tillie's entry names order 26 3391 and never says what was in it.",
        view: { src: `${A}/compare/ot-tillies-row.jpg`, canvas: { w: 1300, h: 246 } },
      },
      legB: {
        verdict: "An Items row: the large spring mixed arrangement and the delivery.",
        view: { src: `${A}/compare/gt-tillies-head.jpg`, canvas: { w: 1300, h: 367 } },
      },
      derived:
        "The layout notes list four fields and the items are not one of them, so showing them is an addition. It gets weight 1 because it costs her one click, not a wrong claim.",
    },
  ],
};
