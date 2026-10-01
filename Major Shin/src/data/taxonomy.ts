import type { TaxonomyGroup } from "./types";

/**
 * The Hatch use case taxonomy, 11 use cases (L1) and 68 subcategories (L2),
 * transcribed from section 1.1.1 of the guidelines.
 *
 * `l1`, `scope` and `covers` are the standard's own wording and are stored
 * verbatim. `scenarios` are not: they are hub copy, three per subcategory.
 *
 * Every scenario is written against the complexity bar rather than against the
 * label alone, so each one names three things: the multimodal evidence the
 * agent has to read, the reconciliation it cannot shortcut, and a deliverable
 * that clears the bar for its type. They lean on the P0 deliverables, the
 * dashboard, the interactive page and the explainer video, because those are
 * the ones the client prioritises and the ones that leave room for the
 * subjective block. A scenario whose artifact is a plain document is a scenario
 * that will struggle to clear the bar, so almost none of these end in one.
 *
 * They are examples, never a menu. The assigned pair is fixed and the scenario
 * has to be the natural home of it, so these exist to show the shape of a
 * correct fit at the right level of difficulty.
 *
 * The four lower traffic use cases after Learning and emotional wellbeing
 * support are out of scope, so they are not here. Health and Fitness is not a
 * catch all for them.
 */
export const taxonomy: TaxonomyGroup[] = [
  {
    id: "smb",
    l1: "SMB",
    scope:
      "confirm a small-business context. Business records, listings or marketing content alone do not make a task SMB.",
    subs: [
      {
        id: "managing-ad-campaigns",
        name: "Managing ad campaigns",
        covers:
          "Set up, optimize, scale and automate ad campaigns: budgets, rules, bids, ROAS, conversions.",
        scenarios: [
          "Screenshots of the ROAS board, a budget rules PDF and a voice note capping monthly spend, reconciled into a dashboard whose linked views show what to scale, what to pause and what each change costs.",
          "Three creative previews and the spend behind each, checked against the live campaign records, into an interactive page that filters by placement and holds the reallocated budgets.",
          "A photographed approval sheet and the bid history, worked into a dashboard that links every rule change to the conversions it moved.",
        ],
      },
      {
        id: "analyzing-reporting-ads",
        name: "Analyzing & reporting on ads",
        covers:
          "Ad performance review or audit, creative readouts, multi-account reporting, executive dashboards and decks.",
        scenarios: [
          "Two ad accounts exported as images against the finance records, built into a dashboard that filters by account and reconciles reported spend with what was actually billed.",
          "A recorded client call naming the metrics that matter, applied to the campaign data, into an executive dashboard with a linked view per metric named.",
          "Creative thumbnails and their performance rows, turned into an explainer video whose scenes walk the quarter creative by creative.",
        ],
      },
      {
        id: "competitor-market-intel",
        name: "Gathering competitor & market intel",
        covers:
          "Competitor ad intelligence; competitor, price and site monitoring across the web and social.",
        scenarios: [
          "Screenshots of four rival listings and a photo of an in store promo, checked against the internal price table, into an interactive page that filters to where the shop is undercut.",
          "A monitoring alert and the archived page it points at, reconciled into a dashboard with linked views for what changed, when, and what it costs to match.",
          "Photographed shelf tags from three competitors, worked against the catalogue into a page where each product expands to the evidence behind its position.",
        ],
      },
      {
        id: "planning-auditing-social",
        name: "Planning & auditing social content",
        covers:
          "Analyze the account to decide the next content; audit, diagnose and benchmark it; weekly content planning.",
        scenarios: [
          "A grid screenshot, the post level numbers and a voice memo on brand direction, worked into a dashboard that links reach to format and carries the next week's plan.",
          "Two competitor profiles captured as images, benchmarked against the shop's own cadence, into an interactive audit that filters the gaps by effort.",
          "A photographed content calendar and the engagement records, reconciled into a planner where each slot expands to why that format was chosen.",
        ],
      },
      {
        id: "creating-publishing-content",
        name: "Creating & publishing content",
        covers:
          "Create content and ad-creative assets (posts, carousels, Reels, captions, ad copy), then publish or schedule them.",
        scenarios: [
          "Product photos, a brand rules PDF and a supplier spec sheet on paper, turned into an explainer video whose scenes carry only the claims the sheet actually supports.",
          "A voice note describing the launch and the shot list, built into an interactive schedule where each post previews against the brand palette it has to respect.",
          "Photographed packaging and the catalogue records, reconciled into a carousel builder page that holds the approved copy per product.",
        ],
      },
      {
        id: "audience-monetization",
        name: "Growing audience & monetization",
        covers:
          "Turn attention into revenue: brand deals, creator marketplaces, lead and partner sourcing, monetization tracking.",
        scenarios: [
          "A scanned brand deal contract and the payout records, reconciled into a dashboard that links each deliverable to what was actually paid and flags the shortfalls.",
          "Screenshots of inbound partner messages triaged against the CRM, into an interactive lead board that filters by fit and holds the reasoning per lead.",
          "A media kit image and the real engagement numbers, worked into a corrected kit page whose figures each link to the record behind them.",
        ],
      },
      {
        id: "building-monitoring-product",
        name: "Building & monitoring product",
        covers:
          "Ship product or features end to end, technical research-to-plan, code and service monitoring.",
        scenarios: [
          "A whiteboard photo of the feature sketch, an alert screenshot and the service metrics, built into an interactive plan where each item expands to the evidence behind its priority.",
          "An incident screenshot and the logs behind it, reconciled into a dashboard with linked views for what broke, when, and what it touched.",
          "A design mock and the issue tracker, worked into a page that filters the remaining work by whether the mock actually requires it.",
        ],
      },
      {
        id: "running-business-operations",
        name: "Running business operations",
        covers:
          "Sales and CRM, invoicing and business finance, store, catalog and inventory, recurring business reporting.",
        scenarios: [
          "Photographed delivery notes, a supplier invoice scan and the inventory records, reconciled into a dashboard with linked views for billed, received and still owed.",
          "A handwritten stock count against the catalogue export, into an interactive reorder page that filters by what the count actually contradicts.",
          "Scanned invoices and the payment records, worked into a page where each invoice expands to the evidence that it is safe to pay.",
        ],
      },
    ],
  },
  {
    id: "shopping",
    l1: "Shopping",
    scope:
      "the user is buying something. Managing a business listing or auditing a brand does not belong here.",
    subs: [
      {
        id: "hunting-deals-bargaining",
        name: "Hunting best deals & bargaining",
        covers: "Price hunting and haggling, including secondhand marketplaces.",
        scenarios: [
          "Photos of a secondhand listing and its damage, checked against comparable sales and a loyalty rules PDF, into an interactive page that holds the offer and the walk away number.",
          "Screenshots of three retailer prices and a voice note from the seller, reconciled into a dashboard comparing what the item really costs at each.",
          "A photographed price tag and the account's reward balance, worked into a page that filters the options by true cost after points.",
        ],
      },
      {
        id: "discovering-products",
        name: "Discovering products (style-aware, cross-retailer)",
        covers: "Deciding what to buy through style-aware discovery across retailers.",
        scenarios: [
          "A photo of an outfit the user liked, a size chart and the order history, reconciled into an interactive shortlist that filters by what has actually fitted before.",
          "A room photo with a measurements note, worked into a page where each candidate piece shows whether it fits the space and the stated style.",
          "A saved inspiration board and retailer records, built into a dashboard linking style, price and availability across shops.",
        ],
      },
      {
        id: "buying-a-gift",
        name: "Buying a gift",
        covers: "Gift discovery and purchase for someone else.",
        scenarios: [
          "A screenshot of the recipient's wishlist, photos of past gifts and a voice note on the budget, into an interactive shortlist that filters out anything already given.",
          "A group chat export agreeing a shared budget, reconciled against the records, into a page holding one gift, the split per person and who has paid.",
          "Photographed hints from a conversation and the calendar, worked into a dashboard linking each candidate to the evidence it would land well.",
        ],
      },
      {
        id: "returns-refunds-cs",
        name: "Handling returns, refunds & CS resolution",
        covers:
          "Initiate returns, exchanges or refunds and resolve disputes with customer service, including chasing a late refund.",
        scenarios: [
          "Photos of the damaged item, the receipt and the returns policy PDF, reconciled against the order dates into an interactive page that filters by what is still in window.",
          "Screenshots of a refund promised weeks ago and the account records, worked into a tracker where each claim expands to its evidence and its drafted chase.",
          "A photographed packing slip against the order confirmation, into a page holding every mismatch and the return it justifies.",
        ],
      },
      {
        id: "recurring-purchases",
        name: "Recurring purchases & auto-replenishment",
        covers: "Reorder staples or set up auto-replenishment.",
        scenarios: [
          "A pantry photo, label photos of what is in use and the last three orders, reconciled into a dashboard linking consumption rate to reorder date.",
          "A handwritten shopping list checked against the subscription records, into an interactive plan that filters out whatever is already arriving.",
          "Photographed expiry dates and the purchase history, worked into a replenishment page where each item carries the cadence it earned.",
        ],
      },
      {
        id: "large-purchases",
        name: "Researching & negotiating large purchases",
        covers: "Cars, TVs, appliances: deep research and negotiation support.",
        scenarios: [
          "A dealer quote photographed on paper, the spec sheet and the finance offer, reconciled into an interactive page that filters the quote line by line for what was added quietly.",
          "Photos of two appliances in the showroom and the running cost table, built into a dashboard linking purchase price to cost over five years.",
          "A scanned trade in valuation and the household budget, worked into a page holding the counter offer and the point to walk away.",
        ],
      },
      {
        id: "finding-hiring-services",
        name: "Finding & hiring services",
        covers: "Find, compare and book a contractor, tutor, cleaner, trainer, etc.",
        scenarios: [
          "Three quotes photographed on paper, the job photos and a voice note describing the work, into an interactive comparison that filters by what each quote actually includes.",
          "Screenshots of availability against the household calendar, reconciled into a page holding the only slots that genuinely work.",
          "A photographed certification and the records behind it, worked into a dashboard linking each trade to what is verified and what is claimed.",
        ],
      },
      {
        id: "executing-purchases",
        name: "Executing purchases",
        covers: "Complete a checkout or purchase flow.",
        scenarios: [
          "A cart screenshot, the voucher rules document and the account balance, reconciled into an interactive checkout page showing which discounts genuinely stack.",
          "A photo of the item and its size label matched to the right variant, into a page that holds the order and the evidence for every choice in it.",
          "Photographed terms at the till and the saved basket, worked into a page filtering out anything the terms exclude before purchase.",
        ],
      },
    ],
  },
  {
    id: "personal-productivity",
    l1: "Personal productivity",
    scope:
      "a personal goal. Housing and home-project tasks placed here are provisional; confirm the intent.",
    subs: [
      {
        id: "where-to-focus",
        name: "Surfacing where to focus my attention",
        covers:
          "A cross-domain daily-priorities digest. Use only when the request spans several priorities.",
        scenarios: [
          "Inbox, calendar and a photographed to do list, reconciled into a dashboard with linked views for today, this week and what quietly slipped.",
          "A voice memo listing worries checked against deadlines across accounts, into an interactive digest that filters by what is genuinely blocking.",
          "Screenshots of three apps the user lives in, merged into a page where every conflict expands to the two commitments behind it.",
        ],
      },
      {
        id: "family-operations",
        name: "Running the family operations hub",
        covers:
          "School and family email triage, action execution, logistics and a weekly brief.",
        scenarios: [
          "School letters photographed at the kitchen table, a permission slip scan and the shared calendar, into an interactive week view that flags every clash and what it costs.",
          "A voice note from one parent and the school emails, reconciled into a dashboard linking each action to its deadline and its owner.",
          "Photographed timetables against the family records, worked into a logistics page that filters by who has to be where.",
        ],
      },
      {
        id: "auditing-email-lists",
        name: "Auditing & bulk-unsubscribing email lists",
        covers: "Rank senders by volume or engagement and bulk-unsubscribe.",
        scenarios: [
          "A screenshot of the overloaded inbox, a stated keep list and the mail records, into a dashboard ranking senders by volume against what was ever opened.",
          "Promotional headers captured as images grouped by sender, reconciled into an interactive page that filters the unsubscribe plan by what it actually saves.",
          "A photographed list of wanted newsletters checked against sender history, into a page where each sender expands to its evidence before anything is cancelled.",
        ],
      },
      {
        id: "rewards-perks",
        name: "Inventorying rewards & perks",
        covers:
          "Loyalty points and perks inventory with expiration alerts (distinct from statement rewards in Personal finance).",
        scenarios: [
          "Photos of loyalty cards, a benefits booklet scan and the account records, reconciled into a dashboard linking each perk to its expiry and its value.",
          "Screenshots of three points balances merged into an interactive inventory that filters by what expires first.",
          "A photographed membership statement against the memberships held, worked into a page surfacing the perks never once used.",
        ],
      },
      {
        id: "scheduling-calendar",
        name: "Scheduling & managing calendar",
        covers: "Create and manage events, find time, resolve conflicts.",
        scenarios: [
          "A photographed invitation, a voice note on the week's commitments and the live calendar, into an interactive week view where each clash expands to the fix.",
          "Screenshots of two shared calendars reconciled into a page that filters to the only slots that work for everyone.",
          "A scanned schedule from a club against the family records, worked into a dashboard linking every recurring commitment to what it displaces.",
        ],
      },
      {
        id: "retrieving-messages",
        name: "Retrieving & summarizing messages",
        covers: "Cross-channel \"catch me up\" retrieval and summaries.",
        scenarios: [
          "A week away with chat, mail and a voice message, reconciled into an interactive catch up that filters by what actually needs an answer.",
          "A recorded meeting and the messages that followed it, worked into a dashboard linking each decision to where it was made.",
          "Screenshots of a long thread and the records behind it, into a page where every open action expands to its evidence.",
        ],
      },
      {
        id: "prepping-events",
        name: "Prepping for events & activities",
        covers: "Assemble briefs and logistics ahead of an event or activity.",
        scenarios: [
          "A venue confirmation photo, the guest list and a voice note on what the day needs, into an interactive run sheet that flags everything still missing.",
          "Ticket screenshots and a travel plan reconciled into a dashboard linking each timing to the booking that fixes it.",
          "A photographed supplier quote against the budget records, worked into a page filtering the plan by what is actually paid for.",
        ],
      },
    ],
  },
  {
    id: "creativity",
    l1: "Creativity",
    scope: "personal creative output. Publishing for a business or brand belongs in SMB.",
    subs: [
      {
        id: "generating-images",
        name: "Generating images & visuals",
        covers: "Image generation, visual art and design output.",
        scenarios: [
          "A sketch photographed in a notebook, a palette reference and a written brief, worked into an interactive page where each variant holds the constraint it satisfies.",
          "Reference images and the stated dimensions, reconciled into a dashboard comparing the options against every rule the brief set.",
          "A mood board and the project records, built into a page that filters the output by which reference it came from.",
        ],
      },
      {
        id: "creating-audio-video",
        name: "Creating audio & video",
        covers: "Media production: audio, video, podcasts, music.",
        scenarios: [
          "Raw clips, a voice note describing the cut and the shot list, assembled into an explainer video whose scenes follow the structure the note asked for.",
          "An interview recording and the transcript records, reconciled into a multi scene video that carries only what was actually said.",
          "A photo set and a music reference, worked into a video whose pacing is driven by the documents in the task.",
        ],
      },
      {
        id: "writing-creatively",
        name: "Writing creatively",
        covers: "Stories, songs, scripts, poems, creative prose.",
        scenarios: [
          "Handwritten journal pages photographed, earlier drafts and a voice memo of the idea, into an interactive page where each scene links to the note it came from.",
          "Character sketches as images and a plot outline, reconciled into a page that filters the draft by which thread it advances.",
          "A recorded reading and the written draft, worked into a page surfacing every line where the two diverge.",
        ],
      },
      {
        id: "designing-crafting",
        name: "Designing & crafting",
        covers: "Arts, crafts and design projects.",
        scenarios: [
          "A pattern photographed on paper, the materials to hand and a measurements note, into an interactive cut list that flags what cannot be made.",
          "Photos of work in progress against the instructions, reconciled into an explainer video whose scenes show where the build went wrong.",
          "A reference image and the supplies records, worked into a dashboard linking each step to what it consumes.",
        ],
      },
      {
        id: "publishing-creative",
        name: "Publishing creative content",
        covers: "Publishing or posting the user's own creative output (personal, not business).",
        scenarios: [
          "Finished pieces as images, the platform rules and a voice note on what to say, into an interactive schedule that flags anything breaching a stated limit.",
          "A portfolio screenshot and the new work, reconciled into a page that filters the published set by medium and date.",
          "Photographed exhibition notes against the catalogue records, worked into a page holding each piece and its published caption.",
        ],
      },
    ],
  },
  {
    id: "personal-finance",
    l1: "Personal finance",
    scope: "the user's own money. Business bookkeeping belongs in SMB.",
    subs: [
      {
        id: "wasteful-recurring-charges",
        name: "Detecting & cancelling wasteful recurring charges",
        covers:
          "Recurring-charge detection, usage-based waste scoring, cancellation assistance.",
        scenarios: [
          "Statement photos, a renewal notice screenshot and the app usage records, reconciled into a dashboard scoring each subscription by what it costs against how often it is opened.",
          "A voice note on what the user thinks they pay checked against what they actually pay, into an interactive page filtering the cancellation list by saving.",
          "Photographed terms from a contract and the payment history, worked into a page where each charge expands to its notice period and its exit.",
        ],
      },
      {
        id: "categorizing-spending",
        name: "Categorizing spending & flagging anomalies",
        covers: "Auto-categorize spend, month-over-month trends, anomaly flags.",
        scenarios: [
          "Receipt photos, a handwritten budget and the transaction records, reconciled into a dashboard with linked views for category, month and what drifted.",
          "Three months of statements as images, worked into an interactive page that filters to the categories that quietly doubled.",
          "A photographed cash log against the account records, into a page where every anomaly expands to the evidence that flagged it.",
        ],
      },
      {
        id: "savings-goals",
        name: "Projecting savings goals & modeling scenarios",
        covers: "Savings-goal projection and scenario modeling against upcoming expenses.",
        scenarios: [
          "A photographed quote for an upcoming cost, a voice note stating the target date and the account history, into a dashboard modelling the goal against standing payments.",
          "Screenshots of two savings options and the stated plans, reconciled into an interactive page where each scenario recalculates the monthly figure needed.",
          "A scanned renewal letter against the spending records, worked into a page filtering the plan by which costs are actually fixed.",
        ],
      },
      {
        id: "disputing-erroneous-charges",
        name: "Detecting & disputing erroneous charges",
        covers:
          "Double or unauthorized charge detection, then the dispute (not subscription waste).",
        scenarios: [
          "Two paper receipts, one faded, against sixty days of transactions and a promotion email, into an interactive page that separates a real duplicate from a hold and a settlement and drafts each dispute.",
          "A signed card slip photographed at the table and the amount actually taken, reconciled into a page where every disputed charge expands to its evidence and its draft.",
          "Photographed till receipts against the statement records, worked into a dashboard linking each overcharge to the rule it broke and the sum owed.",
        ],
      },
      {
        id: "stocks-investments",
        name: "Monitoring stocks & planning investments",
        covers: "Portfolio, stock or crypto monitoring and planning.",
        scenarios: [
          "A handwritten note of holdings photographed, screenshots of two broker positions and the live records, into a dashboard with linked views for allocation, cost and exposure.",
          "A voice note stating the risk the user will accept, reconciled against the current allocation, into an interactive page that filters holdings by whether they fit it.",
          "A scanned statement against the portfolio records, worked into a page where each discrepancy expands to the two sources behind it.",
        ],
      },
      {
        id: "statements-bills-rewards",
        name: "Monitoring statements, bills & rewards",
        covers: "Passive scan of statements, bill due dates and rates.",
        scenarios: [
          "Statement scans, a rate change letter photographed and the calendar, reconciled into a dashboard linking every bill to its due date and its new cost.",
          "Reward balance screenshots against the statement records, into an interactive page filtering to credits that were never applied.",
          "A photographed tariff sheet and the payment history, worked into a page where each bill expands to whether the rate charged matches the rate agreed.",
        ],
      },
      {
        id: "taxes-financial-documents",
        name: "Preparing taxes & financial documents",
        covers: "Tax prep, deductions, document handling.",
        scenarios: [
          "Receipt photos, a rules document and the expense records, reconciled into an interactive page that filters claims by whether the evidence supports them.",
          "A scanned statement set and a voice note listing claimed expenses, worked into a dashboard linking each deduction to its document.",
          "Photographed mileage logs against the calendar records, into a page where every claim expands to the journey behind it.",
        ],
      },
      {
        id: "paying-bills",
        name: "Paying bills & moving money",
        covers: "Execute payments, transfers and redemptions.",
        scenarios: [
          "A photographed invoice, a due date letter scanned and the account balance, reconciled into an interactive page that flags anything about to be paid twice.",
          "Screenshots of a redemption offer and the points held, worked into a dashboard comparing what each redemption is actually worth.",
          "A scanned standing order mandate against the payment records, into a page filtering transfers by whether they are still authorised.",
        ],
      },
    ],
  },
  {
    id: "work-productivity",
    l1: "Work productivity",
    scope: "the user's job, not running their own business (that is SMB).",
    subs: [
      {
        id: "career-job-search",
        name: "Managing career & job search",
        covers: "Job applications, resume, interview prep, career advice.",
        scenarios: [
          "A job advert screenshot, the current resume and an interview recording, reconciled into an interactive page that filters the gaps by what the advert actually asks for.",
          "Photos of a handwritten career plan against the applications sent, worked into a dashboard linking each role to its stage and its evidence.",
          "A scanned reference and the record of the work it describes, into a page where each claim expands to what supports it.",
        ],
      },
      {
        id: "work-deliverables",
        name: "Producing work deliverables",
        covers:
          "Business docs, decks (doc to slides), reports, spreadsheets, professional writing.",
        scenarios: [
          "A whiteboard photo, a recorded briefing and the underlying data, worked into a dashboard whose linked views carry the argument the briefing asked for.",
          "Scanned notes and the source spreadsheet, reconciled into an interactive page where every figure links to the record it came from.",
          "A photographed draft with markup and the data behind it, built into a presentation of 10 to 15 slides carrying the structured narrative.",
        ],
      },
      {
        id: "professional-research",
        name: "Conducting professional research & briefings",
        covers: "Decision-ready professional or market research and briefings for work.",
        scenarios: [
          "Conference slides photographed from the room, a voice note framing the question and the market records, into an interactive brief that filters findings by the decision they serve.",
          "Screenshots of two vendor claims reconciled against the evidence, worked into a dashboard linking each claim to whether it holds.",
          "A scanned report and the dataset behind it, into a page where every recommendation expands to its source.",
        ],
      },
      {
        id: "work-communications",
        name: "Managing work communications",
        covers:
          "Work email and chat triage, action-item capture, work meeting scheduling.",
        scenarios: [
          "A meeting recording, the thread that followed and the calendar, reconciled into an interactive action board that filters by owner and deadline.",
          "Inbox screenshots triaged against the records, worked into a dashboard linking what to answer now to what it blocks.",
          "A photographed note from a call checked against the written record, into a page surfacing every commitment only one side captured.",
        ],
      },
    ],
  },
  {
    id: "research",
    l1: "Research",
    scope:
      "a subject label is not enough. If the topic is owned by another use case (Shopping, Travel, etc.), use that one.",
    subs: [
      {
        id: "factual-questions",
        name: "Answering factual questions",
        covers: "Quick lookups, fact-checking, definitions.",
        scenarios: [
          "A claim photographed from a printed page, a screenshot of a disputed figure and the records that settle both, into an interactive page where each answer expands to its source.",
          "A voice note asking three related questions, reconciled against the evidence, into a page that filters answers by how well sourced they are.",
          "A scanned infographic against the underlying data, worked into a dashboard showing where the graphic overstates it.",
        ],
      },
      {
        id: "researching-in-depth",
        name: "Researching a topic in depth",
        covers: "Multi-source synthesis or deep research on a topic.",
        scenarios: [
          "A document set, a recorded briefing and a chart image, synthesised into a dashboard with linked views for what is agreed, disputed and unsupported.",
          "Photographed pages from two references reconciled into an interactive page that filters claims by which source backs them.",
          "A scanned study and the dataset behind it, worked into an explainer video whose scenes walk the finding and its limits.",
        ],
      },
      {
        id: "monitoring-news",
        name: "Monitoring news & topics",
        covers: "News briefings, ongoing topic or trend monitoring, weather.",
        scenarios: [
          "Headline screenshots across a week, a clipped article photographed from print and the records, into a dashboard linking each development to what actually moved.",
          "A voice note naming the topics to watch, reconciled against the coverage, into an interactive brief that filters by topic and date.",
          "A photographed forecast against the recorded conditions, worked into a page where each divergence expands to both sources.",
        ],
      },
      {
        id: "comparing-options",
        name: "Comparing & evaluating options",
        covers:
          "Structured comparison of options when the topic is not Shopping or another named use case.",
        scenarios: [
          "Two proposal scans, a criteria document and a recorded discussion of priorities, into an interactive comparison that reweights as the criteria are toggled.",
          "Photographed spec sheets reconciled against the records, worked into a dashboard linking each option to the differences that matter.",
          "A scanned tender and the evaluation notes, into a page where every score expands to the evidence behind it.",
        ],
      },
      {
        id: "summarizing-material",
        name: "Summarizing & analyzing provided material",
        covers:
          "Condense or analyze user-provided documents or data for information (not a work deliverable).",
        scenarios: [
          "A long scanned report, a recording about it and the dataset it refers to, reconciled into an interactive page that filters findings by section.",
          "Photographed pages and the data behind them, worked into a dashboard with linked views for claim, evidence and gap.",
          "Screenshots of a dense thread, into an explainer video whose scenes carry the argument and what supports it.",
        ],
      },
    ],
  },
  {
    id: "entertainment",
    l1: "Entertainment",
    scope: "amusement or leisure. Creating media alone does not establish entertainment intent.",
    subs: [
      {
        id: "playing-games",
        name: "Playing games & interactive fun",
        covers: "Games, trivia, roleplay, interactive fiction.",
        scenarios: [
          "A board state photographed mid game, the rules PDF and a voice note on the house rules, into an interactive page that resolves the position and explains the legal moves.",
          "A scanned rule book and a disputed play reconciled against the records, worked into a page where each ruling expands to the clause behind it.",
          "Photographed score sheets across a season, into a dashboard linking every player to their record.",
        ],
      },
      {
        id: "discovering-media",
        name: "Discovering & discussing media",
        covers:
          "Movies, TV, music and books: discovery and discussion (consuming, not creating).",
        scenarios: [
          "A photographed bookshelf, screenshots of three recommendations and the watch history, reconciled into an interactive shortlist that filters out anything already finished.",
          "A voice note on what the user liked and why, worked into a dashboard linking each suggestion to the reason it fits.",
          "A scanned review clipping against the records, into a page where each title expands to what was actually said about it.",
        ],
      },
      {
        id: "sports-fandom",
        name: "Following sports & fandom",
        covers: "Following sports, scores, fandom, sports analytics for fun.",
        scenarios: [
          "A photographed fixture list, a scoreboard screenshot and the results record, into a dashboard with linked views for form, table and what is still possible.",
          "A voice note predicting the table reconciled against the standings, worked into an interactive page that scores the prediction week by week.",
          "Photographed ticket stubs against the attendance records, into a page filtering matches by what the user actually saw.",
        ],
      },
      {
        id: "hobbies-projects",
        name: "Pursuing hobbies & projects",
        covers:
          "Hobby tracking and personal leisure projects (gardening, crafts for fun, DIY).",
        scenarios: [
          "Photos of the plot across the season, the planting notes and a voice note on where it stalled, into a dashboard linking each bed to what it produced.",
          "A handwritten project log and the receipts, reconciled into an interactive page that filters spend by stage of the build.",
          "Photographed instructions against the progress pictures, worked into an explainer video whose scenes show the step that went wrong.",
        ],
      },
      {
        id: "finding-things-to-do",
        name: "Finding things to do",
        covers: "Local activities, outings and events for leisure.",
        scenarios: [
          "A poster photographed in the street, screenshots of three listings and the calendar, into an interactive page that filters outings by cost and travel time.",
          "A voice note on what the group enjoys reconciled against the records, worked into a dashboard linking each option to who it suits.",
          "A scanned programme against the diary, into a page where every clash expands to both commitments.",
        ],
      },
    ],
  },
  {
    id: "travel",
    l1: "Travel",
    scope: "a trip. Local leisure without a travel context belongs in Entertainment.",
    subs: [
      {
        id: "planning-trips",
        name: "Planning trips",
        covers:
          "Multi-component itinerary planning (two or more of lodging, transport, activities).",
        scenarios: [
          "Booking confirmations as screenshots, a photographed map with marks on it and a voice note on the plan, into an interactive itinerary that flags every impossible connection.",
          "Two draft plans and the budget document, reconciled into a dashboard comparing cost, travel time and what each one cuts.",
          "A scanned reservation against the calendar records, worked into a day by day page where each leg expands to its evidence.",
        ],
      },
      {
        id: "booking-transport",
        name: "Booking transport",
        covers: "Flights, trains, car or navigation for a trip.",
        scenarios: [
          "A confirmation screenshot, a photographed timetable and the booked lodging, reconciled into an interactive page that flags connections that cannot be made.",
          "A voice note on arrival constraints applied to the options, worked into a dashboard linking each route to its cost and its risk.",
          "A scanned ticket against the booking records, into a page where every leg expands to what it depends on.",
        ],
      },
      {
        id: "booking-accommodation",
        name: "Booking accommodation",
        covers: "Hotels, rentals, lodging.",
        scenarios: [
          "Listing photos, a screenshot of the cancellation terms and the stated requirements, into an interactive shortlist that filters by what genuinely meets them.",
          "A voice note on who is travelling reconciled against the room options, worked into a dashboard linking each stay to cost per person.",
          "A photographed confirmation against the trip dates, into a page flagging every night that is not actually covered.",
        ],
      },
      {
        id: "discovering-activities-dining",
        name: "Discovering activities & dining",
        covers: "Things to do and restaurants while traveling.",
        scenarios: [
          "A photographed menu, a dietary note and screenshots of opening hours, reconciled into an interactive day plan that filters by what is reachable and edible.",
          "A voice note on the pace they want, worked into a dashboard linking each activity to its travel time and cost.",
          "A scanned guide against the itinerary records, into a page where each suggestion expands to why it fits that day.",
        ],
      },
      {
        id: "in-trip-assistance",
        name: "Assisting in-trip in real time",
        covers: "Delays, directions, rebooking during the trip.",
        scenarios: [
          "A delay notice photographed at the gate, a screenshot of the lodging terms and the onward booking, into an interactive page holding each rebooking option and what it costs.",
          "A voice note from the road reconciled against the live records, worked into a revised itinerary where every change expands to its reason.",
          "A photographed disruption notice against the ticket conditions, into a dashboard linking each entitlement to the evidence for it.",
        ],
      },
    ],
  },
  {
    id: "health-fitness",
    l1: "Health / Fitness",
    scope:
      "all health inputs must be mocked or synthetic (section 1.2.2). Emotional support is out of scope.",
    subs: [
      {
        id: "generally-healthier",
        name: "Becoming generally healthier",
        covers:
          "Open-ended \"get healthier\" with no specific target: habits, nudges, a holistic plan.",
        scenarios: [
          "A synthetic activity export, a photographed habit tracker and a voice note on what keeps failing, into a dashboard linking each habit to the week it actually held.",
          "Screenshots of three trackers merged into an interactive page that filters the plan by effort against effect.",
          "A photographed routine against the recorded data, worked into a page where each nudge expands to the evidence behind it.",
        ],
      },
      {
        id: "losing-weight",
        name: "Losing weight",
        covers: "Weight-loss program: targets, tracking, adjustment over time.",
        scenarios: [
          "A photographed food diary, meal photos and the synthetic weight log, reconciled into a dashboard linking intake to the trend and showing where the log is incomplete.",
          "A voice note stating the target checked against the trend, into an interactive page that recalculates the plan as the target moves.",
          "Photographed portion sizes against the logged intake, worked into a page surfacing every day the two disagree.",
        ],
      },
      {
        id: "optimizing-sleep",
        name: "Optimizing sleep",
        covers: "Sleep, HRV and readiness analysis and optimization.",
        scenarios: [
          "A synthetic sleep export, a photographed evening routine and the calendar, into a dashboard with linked views for duration, readiness and what the bad nights share.",
          "Screenshots of readiness scores reconciled against the diary, worked into an interactive page filtering nights by what preceded them.",
          "A voice note describing the nights against the recorded data, into a page where each discrepancy expands to both sources.",
        ],
      },
      {
        id: "planning-workouts",
        name: "Planning & critiquing workouts",
        covers: "Workout plans, video form analysis, RPE/1RM, scheduling.",
        scenarios: [
          "A lift video, a photographed programme and the training log, reconciled into an explainer video whose scenes show the form fault and the correction.",
          "A voice note on how the week felt applied to the synthetic session data, into an interactive plan that reschedules as load is adjusted.",
          "Photographed session notes against the records, worked into a dashboard linking volume to the sessions actually completed.",
        ],
      },
      {
        id: "planning-nutrition",
        name: "Planning nutrition & meals",
        covers: "Macro targets, calendar-aware and allergy-aware meal plans.",
        scenarios: [
          "A fridge photo, a photographed label and a stated allergy list, reconciled against the calendar into an interactive meal plan that filters out anything unsafe.",
          "A voice note on the week ahead worked into a dashboard linking each meal to its macros and its shopping.",
          "Photographed packaging against the macro targets, into a page where every product expands to whether it fits.",
        ],
      },
      {
        id: "wearables-vitals",
        name: "Monitoring wearables & vitals",
        covers: "Device data review, anomaly detection (not sleep or a named condition).",
        scenarios: [
          "A synthetic device export, a photographed log and screenshots of a second device, reconciled into a dashboard surfacing every day the two disagree.",
          "A voice note on what the user noticed compared against the measured data, into an interactive page filtering anomalies by confidence.",
          "Photographed readings against the recorded series, worked into a page where each flag expands to its evidence.",
        ],
      },
      {
        id: "chronic-conditions",
        name: "Managing chronic conditions & medication",
        covers:
          "Condition trends, threshold alerts, medication and refill reminders.",
        scenarios: [
          "Photographed medication labels, a scanned care plan with thresholds and the synthetic readings, into a dashboard linking each threshold breach to the dose around it.",
          "A voice note on missed doses reconciled against the record, worked into an interactive schedule that flags every gap and its refill.",
          "Photographed packaging against the prescription records, into a page where each discrepancy expands to both sources.",
        ],
      },
      {
        id: "navigating-medical-care",
        name: "Navigating medical care",
        covers:
          "Insurance and coverage, claims, prior authorization, appointments, understanding medical information.",
        scenarios: [
          "A synthetic claim letter scanned, a benefits booklet and a denial notice, reconciled into an interactive page that filters each charge by whether cover applies.",
          "A photographed appointment card against the calendar, worked into a dashboard linking every appointment to its prep and its authorisation.",
          "A scanned statement of benefits against the claim records, into a page where each disputed amount expands to the clause behind it.",
        ],
      },
    ],
  },
  {
    id: "learning",
    l1: "Learning",
    scope:
      "broader than visual learning; the task still has to meet the multimodal requirement.",
    subs: [
      {
        id: "explaining-concepts",
        name: "Explaining concepts & how-to",
        covers: "Explain how something works or how to do it, step by step.",
        scenarios: [
          "A diagram photographed from a manual, a recorded demonstration and the written steps, reconciled into an explainer video whose scenes follow what both actually show.",
          "Screenshots of a process that failed worked into an interactive page where each step expands to what went wrong there.",
          "A scanned schematic against the records, into a dashboard linking each component to its function.",
        ],
      },
      {
        id: "tutoring-coursework",
        name: "Tutoring & coursework",
        covers: "Homework help, coursework, subject tutoring.",
        scenarios: [
          "A photographed worked answer, the marking scheme and the assignment brief, reconciled into an interactive page that filters the lost marks by topic.",
          "A voice note on what the student finds hard applied to the coursework, worked into a dashboard linking each weakness to its evidence.",
          "Scanned feedback against the submitted draft, into an explainer video whose scenes walk the correction.",
        ],
      },
      {
        id: "tests-studying",
        name: "Preparing for tests & studying",
        covers: "Exam prep, study plans, flashcards, practice questions.",
        scenarios: [
          "A photographed syllabus, scanned past papers and the results record, into an interactive study plan that reweights as topics are marked confident.",
          "Handwritten notes photographed from a pad, reconciled into a dashboard linking each topic to its practice questions and its score.",
          "A scanned timetable against the calendar records, worked into a page filtering revision by what fits before the exam.",
        ],
      },
      {
        id: "learning-language",
        name: "Learning a language",
        covers: "Language practice, vocabulary, grammar, conversational drills.",
        scenarios: [
          "A recorded attempt at speaking, a photographed textbook page and the vocabulary records, into an interactive drill set that filters by the errors actually made.",
          "Screenshots of a progress record reconciled against the recordings, worked into a dashboard linking each weakness to its exercise.",
          "Photographed flashcards against the covered material, into a page surfacing every word drilled before it was taught.",
        ],
      },
      {
        id: "building-skills",
        name: "Building skills & practice",
        covers: "Guided practice to build a non-academic skill.",
        scenarios: [
          "A video of an attempt, the technique reference and a photographed practice log, reconciled into an explainer video whose scenes show the correction and the next drill.",
          "A voice note on where the user is stuck applied to the record, into an interactive plan that adapts as sessions are logged.",
          "Photographed session notes against the goal, worked into a dashboard linking practice time to measured progress.",
        ],
      },
    ],
  },
];

/** 11 use cases. Read off the data so it cannot drift. */
export const useCaseCount = () => taxonomy.length;

/** 68 subcategories. Same reason. */
export const subcategoryCount = () =>
  taxonomy.reduce((n, g) => n + g.subs.length, 0);
