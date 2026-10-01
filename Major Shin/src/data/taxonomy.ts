import type { TaxonomyGroup } from "./types";

/**
 * The Hatch use case taxonomy, 11 use cases (L1) and 68 subcategories (L2),
 * transcribed from section 1.1.1 of the guidelines.
 *
 * `l1`, `scope` and `covers` are the standard's own wording and are stored
 * verbatim. `scenarios` are not: they are hub copy, three per subcategory,
 * written to show what that pair looks like as a task in this project. Each one
 * names the evidence the agent has to read, the reconciliation it has to make
 * and the thing it has to produce, because a scenario that does not carry all
 * three is not yet a task.
 *
 * They are examples, never a menu. The assigned pair is fixed and the scenario
 * has to be the natural home of it, so these exist to show the shape of a
 * correct fit, not to be picked off a list.
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
          "A screenshot of the ROAS board and a budget rules PDF: decide what to scale, what to pause, and write the new schedule.",
          "A voice note capping monthly spend, read against live campaign records, to rebalance bids without breaching the cap.",
          "Three creative previews and the spend behind each: pull the worst performer and reallocate its budget across the rest.",
        ],
      },
      {
        id: "analyzing-reporting-ads",
        name: "Analyzing & reporting on ads",
        covers:
          "Ad performance review or audit, creative readouts, multi-account reporting, executive dashboards and decks.",
        scenarios: [
          "Two ad accounts exported as images plus the finance sheet: reconcile the spend figures and build the quarterly readout.",
          "A recorded client call naming the metrics that matter, turned into a dashboard over the campaign data behind it.",
          "Creative thumbnails and their performance rows: explain which creative carried the quarter and deck the finding.",
        ],
      },
      {
        id: "competitor-market-intel",
        name: "Gathering competitor & market intel",
        covers:
          "Competitor ad intelligence; competitor, price and site monitoring across the web and social.",
        scenarios: [
          "Screenshots of four rival listings against the internal price table: find where the shop is undercut and report it.",
          "A photo of a competitor's in-store promo and the web price for the same item, reconciled into a positioning brief.",
          "A monitoring alert and the archived page it points at: confirm what actually changed and log the move.",
        ],
      },
      {
        id: "planning-auditing-social",
        name: "Planning & auditing social content",
        covers:
          "Analyze the account to decide the next content; audit, diagnose and benchmark it; weekly content planning.",
        scenarios: [
          "A grid screenshot and the post level numbers behind it: diagnose what the account is actually rewarded for, then plan the week.",
          "A voice memo from the owner on brand direction, benchmarked against the last month of posts, into a content calendar.",
          "Two competitor profiles captured as images, audited against the shop's own cadence, to produce the gap list.",
        ],
      },
      {
        id: "creating-publishing-content",
        name: "Creating & publishing content",
        covers:
          "Create content and ad-creative assets (posts, carousels, Reels, captions, ad copy), then publish or schedule them.",
        scenarios: [
          "Product photos and a brand rules PDF: build the carousel that respects the stated palette and schedule it.",
          "A supplier's spec sheet photographed on paper, turned into ad copy that states only claims the sheet supports.",
          "A voice note describing the launch, plus the shot list, assembled into scheduled posts for the launch week.",
        ],
      },
      {
        id: "audience-monetization",
        name: "Growing audience & monetization",
        covers:
          "Turn attention into revenue: brand deals, creator marketplaces, lead and partner sourcing, monetization tracking.",
        scenarios: [
          "A brand deal contract as a scan and the payout records: check what was actually paid against what was agreed.",
          "Screenshots of inbound partner messages, triaged against the CRM, into a sourced and ranked lead list.",
          "A media kit image and the real engagement numbers, reconciled into a corrected kit the owner can send.",
        ],
      },
      {
        id: "building-monitoring-product",
        name: "Building & monitoring product",
        covers:
          "Ship product or features end to end, technical research-to-plan, code and service monitoring.",
        scenarios: [
          "A whiteboard photo of the feature sketch and the current service metrics, turned into a sequenced build plan.",
          "An alert screenshot and the logs behind it: establish whether the incident is real and write the postmortem.",
          "A design mock plus the issue tracker, reconciled into the work that is genuinely left before launch.",
        ],
      },
      {
        id: "running-business-operations",
        name: "Running business operations",
        covers:
          "Sales and CRM, invoicing and business finance, store, catalog and inventory, recurring business reporting.",
        scenarios: [
          "Photographed delivery notes against the inventory table: find the stock that was billed but never received.",
          "A supplier invoice scan and the purchase records, reconciled to decide which invoices are safe to pay.",
          "A handwritten stock count and the catalog export, turned into the reorder list and the monthly report.",
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
          "Photos of a secondhand listing and its condition, priced against comparable sales, into an offer message.",
          "Screenshots of three retailer prices and a loyalty rules PDF: work out what the item really costs at each.",
          "A seller's voice note on the lowest they will go, checked against market rates, to decide whether to take it.",
        ],
      },
      {
        id: "discovering-products",
        name: "Discovering products (style-aware, cross-retailer)",
        covers: "Deciding what to buy through style-aware discovery across retailers.",
        scenarios: [
          "A photo of an outfit the user liked plus a size chart: find matching pieces across retailers and build the shortlist.",
          "A saved inspiration board and the sizing notes in a document, reconciled into options that actually fit.",
          "A room photo and a measurements note: shortlist furniture that fits the space and the stated style.",
        ],
      },
      {
        id: "buying-a-gift",
        name: "Buying a gift",
        covers: "Gift discovery and purchase for someone else.",
        scenarios: [
          "A screenshot of the recipient's wishlist and a voice note on the budget, turned into a ranked gift shortlist.",
          "Photos of what the user already gave last year, checked against the calendar, so nothing repeats.",
          "A group chat export agreeing a shared budget, reconciled into one gift and the split per person.",
        ],
      },
      {
        id: "returns-refunds-cs",
        name: "Handling returns, refunds & CS resolution",
        covers:
          "Initiate returns, exchanges or refunds and resolve disputes with customer service, including chasing a late refund.",
        scenarios: [
          "A photo of the damaged item and the delivery confirmation: establish the claim and draft the return request.",
          "A receipt and the returns policy PDF, reconciled against the order date to see what is still in window.",
          "Screenshots of a refund promised weeks ago, checked against the account records, into the chase message.",
        ],
      },
      {
        id: "recurring-purchases",
        name: "Recurring purchases & auto-replenishment",
        covers: "Reorder staples or set up auto-replenishment.",
        scenarios: [
          "A pantry photo and the last three orders: work out what actually runs out and set the reorder cadence.",
          "A handwritten shopping list against the subscription records, to stop ordering what is already arriving.",
          "Label photos of the products in use, matched to catalogue entries, into a standing replenishment plan.",
        ],
      },
      {
        id: "large-purchases",
        name: "Researching & negotiating large purchases",
        covers: "Cars, TVs, appliances: deep research and negotiation support.",
        scenarios: [
          "A dealer quote photographed on paper and the spec sheet, checked line by line for what was added quietly.",
          "Photos of two appliances in the showroom plus the running cost table, reconciled into the real cost of each.",
          "A finance offer scan and the household budget, turned into the counter offer and the walk away number.",
        ],
      },
      {
        id: "finding-hiring-services",
        name: "Finding & hiring services",
        covers: "Find, compare and book a contractor, tutor, cleaner, trainer, etc.",
        scenarios: [
          "Three quotes photographed on paper and the job photos, compared on what each one actually includes.",
          "A voice note describing the job plus the site pictures, turned into a brief and a shortlist of trades.",
          "Screenshots of availability against the household calendar, to book the slot that genuinely works.",
        ],
      },
      {
        id: "executing-purchases",
        name: "Executing purchases",
        covers: "Complete a checkout or purchase flow.",
        scenarios: [
          "A cart screenshot and the voucher rules document: apply what genuinely stacks and complete the order.",
          "A photo of the item and its size label, matched to the right variant before the purchase goes through.",
          "A saved basket checked against the account balance and the stated budget before checkout.",
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
          "Inbox, calendar and a photographed to do list, reconciled into what genuinely has to happen today.",
          "A voice memo listing worries, checked against deadlines across accounts, into a ranked daily brief.",
          "Screenshots of three apps the user lives in, merged into one digest with the conflicts called out.",
        ],
      },
      {
        id: "family-operations",
        name: "Running the family operations hub",
        covers:
          "School and family email triage, action execution, logistics and a weekly brief.",
        scenarios: [
          "School letters photographed at the kitchen table, triaged against the family calendar into the week's brief.",
          "A permission slip scan and the shared calendar, reconciled so nothing is double booked or missed.",
          "A voice note from one parent plus the school emails, turned into the logistics plan and the actions taken.",
        ],
      },
      {
        id: "auditing-email-lists",
        name: "Auditing & bulk-unsubscribing email lists",
        covers: "Rank senders by volume or engagement and bulk-unsubscribe.",
        scenarios: [
          "A screenshot of the overloaded inbox and the mail records, ranked by what the user has never once opened.",
          "A stated keep list in a document, reconciled against sender volume, before anything is unsubscribed.",
          "Promotional headers captured as images, grouped by sender, into the unsubscribe plan and what it saves.",
        ],
      },
      {
        id: "rewards-perks",
        name: "Inventorying rewards & perks",
        covers:
          "Loyalty points and perks inventory with expiration alerts (distinct from statement rewards in Personal finance).",
        scenarios: [
          "Photos of loyalty cards and the account records, reconciled into what is expiring and when.",
          "A benefits booklet scan against the memberships held, to find the perks never once used.",
          "Screenshots of three points balances, merged into one inventory with the expiry alerts set.",
        ],
      },
      {
        id: "scheduling-calendar",
        name: "Scheduling & managing calendar",
        covers: "Create and manage events, find time, resolve conflicts.",
        scenarios: [
          "A photographed invitation and the live calendar, reconciled to find the clash and propose the fix.",
          "A voice note listing the week's commitments, checked against existing events, into the booked schedule.",
          "Screenshots of two shared calendars, merged to find the only slot that works for everyone.",
        ],
      },
      {
        id: "retrieving-messages",
        name: "Retrieving & summarizing messages",
        covers: "Cross-channel \"catch me up\" retrieval and summaries.",
        scenarios: [
          "A week away, with chat, mail and a voice message, condensed into what actually needs an answer.",
          "Screenshots of a long thread plus the records behind it, reconciled into the decision that was reached.",
          "A recorded meeting and the messages that followed it, merged into the catch up and the open actions.",
        ],
      },
      {
        id: "prepping-events",
        name: "Prepping for events & activities",
        covers: "Assemble briefs and logistics ahead of an event or activity.",
        scenarios: [
          "A venue confirmation photo and the guest list, reconciled into the run sheet and what is still missing.",
          "A voice note on what the day needs plus the calendar, turned into the brief and the timings.",
          "Ticket screenshots and a travel plan, checked against each other so the logistics actually hold.",
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
          "A sketch photographed in a notebook and a palette reference, turned into the finished visual the user described.",
          "Reference images plus a written style brief, reconciled into a piece that holds every stated constraint.",
          "A mood board and the stated dimensions, worked into the visual and the reasoning behind each choice.",
        ],
      },
      {
        id: "creating-audio-video",
        name: "Creating audio & video",
        covers: "Media production: audio, video, podcasts, music.",
        scenarios: [
          "Raw clips and a voice note describing the cut, assembled into the edit the user asked for.",
          "An interview recording and the shot list, reconciled into the episode and its published description.",
          "A photo set and a music reference, turned into the sequenced video with the stated pacing.",
        ],
      },
      {
        id: "writing-creatively",
        name: "Writing creatively",
        covers: "Stories, songs, scripts, poems, creative prose.",
        scenarios: [
          "Handwritten notes photographed from a journal, worked into the piece without losing what they actually said.",
          "A voice memo of a half remembered idea plus earlier drafts, reconciled into the next version.",
          "Character sketches as images and a plot outline, turned into the scene the outline calls for.",
        ],
      },
      {
        id: "designing-crafting",
        name: "Designing & crafting",
        covers: "Arts, crafts and design projects.",
        scenarios: [
          "A pattern photographed on paper and the materials to hand, reconciled into what can actually be made.",
          "Photos of work in progress and the instructions, checked to find where the build went wrong.",
          "A measurements note and a reference image, turned into the cut list and the build order.",
        ],
      },
      {
        id: "publishing-creative",
        name: "Publishing creative content",
        covers: "Publishing or posting the user's own creative output (personal, not business).",
        scenarios: [
          "Finished pieces as images plus the platform rules, reconciled into posts that meet every stated limit.",
          "A voice note on what to say about the work, turned into the published captions and the schedule.",
          "A portfolio screenshot and the new work, merged so the published set stays coherent.",
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
          "Statement photos and the app usage records, reconciled to find the subscriptions paid for but never opened.",
          "A screenshot of a renewal notice against the account history, to decide what is worth keeping.",
          "A voice note on what the user thinks they pay, checked against what they actually pay, into the cancellation list.",
        ],
      },
      {
        id: "categorizing-spending",
        name: "Categorizing spending & flagging anomalies",
        covers: "Auto-categorize spend, month-over-month trends, anomaly flags.",
        scenarios: [
          "Receipt photos and the transaction records, categorized together so the month actually reconciles.",
          "A handwritten budget against the real spend, to find where the two have drifted apart.",
          "Three months of statements as images, compared to flag the category that quietly doubled.",
        ],
      },
      {
        id: "savings-goals",
        name: "Projecting savings goals & modeling scenarios",
        covers: "Savings-goal projection and scenario modeling against upcoming expenses.",
        scenarios: [
          "A photographed quote for an upcoming cost plus the account history, modelled into whether the goal still holds.",
          "A voice note stating the target date, reconciled against standing payments, into the monthly figure needed.",
          "Screenshots of two savings options and the stated plans, compared on what each one actually returns.",
        ],
      },
      {
        id: "disputing-erroneous-charges",
        name: "Detecting & disputing erroneous charges",
        covers:
          "Double or unauthorized charge detection, then the dispute (not subscription waste).",
        scenarios: [
          "Two paper receipts, one faded, against sixty days of transactions: is it a duplicate or a hold and a settlement?",
          "A signed card slip photographed at the table, checked against the amount actually taken, into the dispute draft.",
          "A promotion email and the receipt that ignored it, reconciled into what was overcharged and the claim for it.",
        ],
      },
      {
        id: "stocks-investments",
        name: "Monitoring stocks & planning investments",
        covers: "Portfolio, stock or crypto monitoring and planning.",
        scenarios: [
          "A handwritten note of holdings photographed from a desk, reconciled against the live portfolio records.",
          "Screenshots of two broker positions, merged to find what the user actually owns across both.",
          "A voice note stating the risk the user will accept, checked against the current allocation.",
        ],
      },
      {
        id: "statements-bills-rewards",
        name: "Monitoring statements, bills & rewards",
        covers: "Passive scan of statements, bill due dates and rates.",
        scenarios: [
          "Statement scans and the calendar, reconciled into which bills are due before the next pay date.",
          "A photographed rate change letter, checked against the account, to see what it actually costs.",
          "Reward balance screenshots against the statement records, to find the credits never applied.",
        ],
      },
      {
        id: "taxes-financial-documents",
        name: "Preparing taxes & financial documents",
        covers: "Tax prep, deductions, document handling.",
        scenarios: [
          "Receipt photos and the expense records, reconciled into what is genuinely deductible and what is not.",
          "A scanned statement set plus the rules document, assembled into the filing pack with every figure sourced.",
          "A voice note listing claimed expenses, checked against the evidence held, into the corrected schedule.",
        ],
      },
      {
        id: "paying-bills",
        name: "Paying bills & moving money",
        covers: "Execute payments, transfers and redemptions.",
        scenarios: [
          "A photographed invoice and the account balance, reconciled before the payment is made.",
          "A due date letter scanned, checked against standing transfers, so nothing is paid twice.",
          "Screenshots of a redemption offer and the points held, to decide whether it is worth taking.",
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
          "A job advert screenshot and the current resume, reconciled into the version that answers what is asked.",
          "An interview recording plus the role brief, worked into the prep notes and the gaps to close.",
          "Photos of a handwritten career plan, checked against the applications actually sent.",
        ],
      },
      {
        id: "work-deliverables",
        name: "Producing work deliverables",
        covers:
          "Business docs, decks (doc to slides), reports, spreadsheets, professional writing.",
        scenarios: [
          "A whiteboard photo and the underlying data, turned into the deck that carries the argument.",
          "A recorded briefing plus the source document, reconciled into the report with every figure checked.",
          "Scanned notes and the spreadsheet behind them, assembled into the deliverable the brief asked for.",
        ],
      },
      {
        id: "professional-research",
        name: "Conducting professional research & briefings",
        covers: "Decision-ready professional or market research and briefings for work.",
        scenarios: [
          "Conference slides photographed from the room plus the market records, reconciled into the decision brief.",
          "A voice note framing the question, worked across sources into a briefing that answers it.",
          "Screenshots of two vendor claims, checked against the evidence, into the recommendation.",
        ],
      },
      {
        id: "work-communications",
        name: "Managing work communications",
        covers:
          "Work email and chat triage, action-item capture, work meeting scheduling.",
        scenarios: [
          "A meeting recording and the thread that followed, reconciled into the actions and who owns each.",
          "Inbox screenshots triaged against the calendar, into what to answer now and what to schedule.",
          "A photographed note from a call, checked against the written record, into the follow ups sent.",
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
          "A claim photographed from a printed page, checked against the record that would settle it.",
          "A screenshot of a disputed figure, traced back to the source it actually came from.",
          "A voice note asking three related questions, answered with each one sourced separately.",
        ],
      },
      {
        id: "researching-in-depth",
        name: "Researching a topic in depth",
        covers: "Multi-source synthesis or deep research on a topic.",
        scenarios: [
          "A document set and a recorded briefing, synthesised into one account that names where sources disagree.",
          "Photographed pages from two references, reconciled into the position each one actually supports.",
          "A chart image plus the data behind it, worked into the deeper reading of what it shows.",
        ],
      },
      {
        id: "monitoring-news",
        name: "Monitoring news & topics",
        covers: "News briefings, ongoing topic or trend monitoring, weather.",
        scenarios: [
          "Headline screenshots across a week, reconciled against the record into what actually moved.",
          "A clipped article photographed from print, checked against the ongoing coverage.",
          "A voice note naming the topics to watch, turned into the recurring brief.",
        ],
      },
      {
        id: "comparing-options",
        name: "Comparing & evaluating options",
        covers:
          "Structured comparison of options when the topic is not Shopping or another named use case.",
        scenarios: [
          "Two proposal scans and the criteria document, compared on the terms the criteria actually name.",
          "Photographed spec sheets, reconciled into the comparison with the differences that matter called out.",
          "A recorded discussion of priorities, applied to the options into a ranked evaluation.",
        ],
      },
      {
        id: "summarizing-material",
        name: "Summarizing & analyzing provided material",
        covers:
          "Condense or analyze user-provided documents or data for information (not a work deliverable).",
        scenarios: [
          "A long scanned report plus a recording about it, condensed into what the user actually needs to know.",
          "Photographed pages and the dataset they refer to, analysed together rather than separately.",
          "Screenshots of a dense thread, reduced to the argument and the evidence behind it.",
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
          "A board state photographed mid game plus the rules PDF, resolved into the legal move.",
          "A scanned rule book and a disputed play, reconciled into who was actually right.",
          "A voice note setting the house rules, applied to the game into the interactive round.",
        ],
      },
      {
        id: "discovering-media",
        name: "Discovering & discussing media",
        covers:
          "Movies, TV, music and books: discovery and discussion (consuming, not creating).",
        scenarios: [
          "A photographed bookshelf and the watch history, reconciled into what to read or watch next.",
          "Screenshots of three recommendations, checked against what the user already finished.",
          "A voice note on what they liked and why, turned into a shortlist that holds that reasoning.",
        ],
      },
      {
        id: "sports-fandom",
        name: "Following sports & fandom",
        covers: "Following sports, scores, fandom, sports analytics for fun.",
        scenarios: [
          "A photographed fixture list and the results record, reconciled into where the season actually stands.",
          "A scoreboard screenshot and the stats behind it, worked into the readout for the group chat.",
          "A voice note predicting the table, checked against the real standings.",
        ],
      },
      {
        id: "hobbies-projects",
        name: "Pursuing hobbies & projects",
        covers:
          "Hobby tracking and personal leisure projects (gardening, crafts for fun, DIY).",
        scenarios: [
          "Photos of the plot across the season plus the planting notes, reconciled into what to do next.",
          "A handwritten project log and the receipts, checked to see what the build has really cost.",
          "A voice note on where the project stalled, worked against the photos into the next steps.",
        ],
      },
      {
        id: "finding-things-to-do",
        name: "Finding things to do",
        covers: "Local activities, outings and events for leisure.",
        scenarios: [
          "A poster photographed in the street and the calendar, reconciled into what is actually free to attend.",
          "Screenshots of three listings, checked against the stated budget and travel time.",
          "A voice note on what the group enjoys, turned into the shortlist of outings.",
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
          "Booking confirmations as screenshots and a voice note on the plan, reconciled into the itinerary that holds.",
          "A photographed map with marks on it plus the dates, worked into the sequenced trip.",
          "Two draft plans and the budget document, compared into the one that actually fits.",
        ],
      },
      {
        id: "booking-transport",
        name: "Booking transport",
        covers: "Flights, trains, car or navigation for a trip.",
        scenarios: [
          "A confirmation screenshot and the calendar, checked so the connection is genuinely makeable.",
          "A photographed timetable against the booked lodging, reconciled into the travel that works.",
          "A voice note on arrival constraints, applied to the options into the booking made.",
        ],
      },
      {
        id: "booking-accommodation",
        name: "Booking accommodation",
        covers: "Hotels, rentals, lodging.",
        scenarios: [
          "Listing photos and the stated requirements, reconciled into what actually meets them.",
          "A screenshot of the cancellation terms, checked against the trip dates before booking.",
          "A voice note on who is travelling, applied to the room options into the reservation.",
        ],
      },
      {
        id: "discovering-activities-dining",
        name: "Discovering activities & dining",
        covers: "Things to do and restaurants while traveling.",
        scenarios: [
          "A photographed menu and the dietary note, reconciled into where the group can actually eat.",
          "Screenshots of opening hours against the itinerary, to find what is reachable on which day.",
          "A voice note on the pace they want, turned into the day plan.",
        ],
      },
      {
        id: "in-trip-assistance",
        name: "Assisting in-trip in real time",
        covers: "Delays, directions, rebooking during the trip.",
        scenarios: [
          "A delay notice photographed at the gate, reconciled against the onward booking into the rebooking.",
          "A screenshot of the disruption plus the lodging terms, worked into what the traveller should do now.",
          "A voice note from the road and the live records, turned into the revised plan.",
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
          "A synthetic activity export and a photographed habit tracker, reconciled into the plan that fits the week.",
          "A voice note on what keeps failing, checked against the record, into the adjusted habits.",
          "Screenshots of three trackers, merged into one picture of where the user actually is.",
        ],
      },
      {
        id: "losing-weight",
        name: "Losing weight",
        covers: "Weight-loss program: targets, tracking, adjustment over time.",
        scenarios: [
          "A photographed food diary and the synthetic weight log, reconciled into why progress stalled.",
          "A voice note stating the target, checked against the trend, into the revised plan.",
          "Meal photos and the logged intake, compared to find what the log is missing.",
        ],
      },
      {
        id: "optimizing-sleep",
        name: "Optimizing sleep",
        covers: "Sleep, HRV and readiness analysis and optimization.",
        scenarios: [
          "A synthetic sleep export and a photographed evening routine, reconciled into what is costing the user rest.",
          "Screenshots of readiness scores against the calendar, to find what the bad nights share.",
          "A voice note describing the nights, checked against the recorded data.",
        ],
      },
      {
        id: "planning-workouts",
        name: "Planning & critiquing workouts",
        covers: "Workout plans, video form analysis, RPE/1RM, scheduling.",
        scenarios: [
          "A lift video and the training log, reconciled into the form note and the next session.",
          "A photographed programme plus the synthetic session data, checked for where the load drifted.",
          "A voice note on how the week felt, applied to the plan into the adjusted schedule.",
        ],
      },
      {
        id: "planning-nutrition",
        name: "Planning nutrition & meals",
        covers: "Macro targets, calendar-aware and allergy-aware meal plans.",
        scenarios: [
          "A fridge photo and a stated allergy list, reconciled into the week of meals that is actually safe.",
          "A photographed label and the macro targets, checked to see whether the product fits.",
          "A voice note on the week ahead, applied against the calendar into the meal plan.",
        ],
      },
      {
        id: "wearables-vitals",
        name: "Monitoring wearables & vitals",
        covers: "Device data review, anomaly detection (not sleep or a named condition).",
        scenarios: [
          "A synthetic device export and a photographed log, reconciled into the days that do not match.",
          "Screenshots of two devices disagreeing, checked against the record to resolve which to trust.",
          "A voice note on what the user noticed, compared against the measured data.",
        ],
      },
      {
        id: "chronic-conditions",
        name: "Managing chronic conditions & medication",
        covers:
          "Condition trends, threshold alerts, medication and refill reminders.",
        scenarios: [
          "Photographed medication labels and the synthetic readings, reconciled into the refill and alert schedule.",
          "A scanned care plan with thresholds, checked against the logged trend.",
          "A voice note on missed doses, applied to the record into the corrected routine.",
        ],
      },
      {
        id: "navigating-medical-care",
        name: "Navigating medical care",
        covers:
          "Insurance and coverage, claims, prior authorization, appointments, understanding medical information.",
        scenarios: [
          "A synthetic claim letter scanned and the coverage document, reconciled into what is actually owed.",
          "A photographed appointment card against the calendar, worked into the scheduling and the prep.",
          "A benefits booklet and a denial notice, compared into the grounds for the appeal.",
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
          "A diagram photographed from a manual, worked into the explanation of what it is actually showing.",
          "A recorded demonstration plus the written steps, reconciled into the guide that matches both.",
          "Screenshots of a process that failed, turned into the explanation of where it went wrong.",
        ],
      },
      {
        id: "tutoring-coursework",
        name: "Tutoring & coursework",
        covers: "Homework help, coursework, subject tutoring.",
        scenarios: [
          "A photographed worked answer and the marking scheme, reconciled into where the marks were lost.",
          "A scanned assignment brief plus the draft, checked against what was actually asked.",
          "A voice note on what the student finds hard, applied to the coursework into the session plan.",
        ],
      },
      {
        id: "tests-studying",
        name: "Preparing for tests & studying",
        covers: "Exam prep, study plans, flashcards, practice questions.",
        scenarios: [
          "A photographed syllabus and past results, reconciled into the study plan that targets the weak areas.",
          "Scanned past papers plus the calendar, worked into a schedule that fits before the exam.",
          "Handwritten notes photographed from a pad, turned into practice questions that test them.",
        ],
      },
      {
        id: "learning-language",
        name: "Learning a language",
        covers: "Language practice, vocabulary, grammar, conversational drills.",
        scenarios: [
          "A recorded attempt at speaking plus the vocabulary list, reconciled into the drill that fixes the errors.",
          "A photographed textbook page, worked into practice that uses only what has been covered.",
          "Screenshots of a progress record, checked to build the next set of drills.",
        ],
      },
      {
        id: "building-skills",
        name: "Building skills & practice",
        covers: "Guided practice to build a non-academic skill.",
        scenarios: [
          "A video of an attempt and the technique reference, reconciled into the correction and the next drill.",
          "A photographed practice log, checked against the goal to see whether the routine is working.",
          "A voice note on where the user is stuck, applied to the record into the guided plan.",
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
