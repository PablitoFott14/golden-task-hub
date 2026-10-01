# The method, Major Shin

Ten steps, in the order they actually happen. This file is the review copy of
`src/data/method.ts` and `src/data/taxonomy.ts`, generated from them so the two cannot drift.
Edit here, tell me, and I will carry the edits back into the data.

The order is the argument. Step 1 is the assigned pair, because every later decision is checked
back against it. Step 2 is the universe, because the loadout decides which scenarios that pair
can support. Steps 3 and 4 are where the two meet and produce the scenario and the evidence it
needs.

---

## The ten steps

### 1. Task parameters

**Seven are assigned. None of them is a suggestion.**

*Phase: Design*

A task arrives with its parameters already decided: category, subcategory, universe, scenario, output artifact, primary capabilities and secondary capabilities. They are binding client requirements. Only the scenario has any give, and only as far as reaching the complexity bar while its core nature and intent stay as assigned.

**Moves**

- Read your subcategory definition and its scope check before anything else, and assign by the user's intent rather than by what the input files are about.
- Check the neighbouring subcategory inside the same use case. Fitting one of those better is a category relevance failure even though the use case is right.
- Confirm the assigned tools. Where the scenario names them, the correct final state has to depend on them.
- Keep the pair in front of you. The universe, the scenario, the inputs and the prompt are each checked back against it.

**Produces.** An assigned pair you can defend, and the scope check that proves the fit.

> **Drift from any assigned parameter is an automatic rejection**
> Omitting or substituting one makes the task invalid, however good the rest of it is. The 6 categories and 16 subcategories are retired: the taxonomy is now 11 use cases and 68 subcategories.

**In a real task.** A receipts and disputes task sits in Personal finance, under detecting and disputing erroneous charges. What fixes the pair is the user's intent, contesting charges she believes are wrong. The receipts and the bank records are only how that intent is evidenced, and they would have pointed at a different subcategory on their own.
  
  No link yet: the published Golden Task cannot demonstrate this step under the current standard.

---

### 2. Universe interaction

**Go find the story. Do not invent one.**

*Phase: Design*

Open the universe holding the assigned pair in view. The loadout decides what the task can be, so read the services, the people and the workflows until a situation shows up that the data already supports. The scenario you pick has to be one the universe can prove.

**Moves**

- Confirm what is actually loaded in the Universe Explorer before designing anything around a service.
- Interact with the AI agent in the Database tab. Inspecting by hand is what leads people to conclude there is no connection when there is one.
- Use SQL for the tables, relationships and edge cases the visualizers never surface.
- Anchor to dates you have actually seen. Universe calendars are fixed, so next Tuesday can land on a week that holds nothing.

**Produces.** A grounded situation, with the records that prove it.

> **A thin loadout is an environment defect, not a model failure**
> If only a few servers are loaded the universe loaded wrong, and it has to be reloaded before you continue. Add the Service Universe Artifact ID before you deploy, whatever the Universe Creator calls it.

**In the Golden Task.** Harmony Games is a studio with a full lifecycle in its data, so the task took the shutdown phase. Two channels carried it, and both were pulled through SQL before a single prompt was written.
  
  Links to: `/golden-tasks/vendor-closeout#universe` (The two channels the task is built on)

---

### 3. The scenario and the GTFA

**Solve it yourself before you ask anyone else to.**

*Phase: Design*

The scenario is where the assigned pair and the universe meet. Build it so the pair is its natural home, then resolve the answer completely. The Ground Truth Final Answer is the end state you grade everything against, so it exists before the first run, not after it.

**Moves**

- Settle the deliverable first. It clears the complexity bar for its type or the scenario is not finished.
- Keep the thresholds and rules in the inputs, so finding them is part of the work.
- Build friction that the situation would really produce, never constraints bolted on to look hard.
- Resolve the GTFA down to the values: the totals, the dates, the classifications, the edge cases.

**Produces.** A scenario the pair explains, and the one answer it has to reach.

> **Complexity is planned, never patched in**
> Do not improvise and do not wait for the model to fail before adding difficulty. Expect to spend at least two hours understanding the scenario and grounding it before the task is ready.

**In the Golden Task.** One rule stated once decides all twenty vendors, and the GTFA resolved every one of them before the run started: four receipts, four unconfirmed, twelve not cancelled, one out of pool.
  
  Links to: `/golden-tasks/vendor-closeout#answer` (The resolved answer, vendor by vendor)

---

### 4. Multimodal inputs

**Three is the floor. It is not the target.**

*Phase: Design*

Pick evidence that belongs to the moment the scenario describes, in the formats that moment would produce. A handwritten total belongs on paper, a confirmation belongs in a screenshot, a rule with thresholds belongs in a document. Realistic noise stays in.

**Moves**

- Use as many inputs as the scenario naturally needs. Most tasks need substantially more than three to clear the complexity bar.
- Give every file a purpose. Required signal or a deliberate distractor, never decoration.
- Spread the evidence across modalities, so no single source carries the whole answer.
- Keep health inputs mocked or synthetic, and keep the answer out of every filename.

**Produces.** An input set where each file earns its place.

> **At least three multimodal inputs in the Model A conversation**
> Three is the minimum requirement rather than the goal, and trimming a task down to three or slightly more is the mistake the rule exists to stop.

**In the Golden Task.** Eleven files, and not one of them is decoration. The screenshots confirm cancellations, the phone photos carry amounts no record holds, and the invoices that belong to vendors outside the pool are there to be left alone.
  
  Links to: `/golden-tasks/vendor-closeout#inputs` (Eleven files, and the fact each one carries)

---

### 5. The initial prompt

**One prompt. Everything the task needs is in it.**

*Phase: Design*

The task is single turn. One prompt is sent automatically when you submit, and the agent answers it once. Anything you expect the agent to produce has to be requested here, in the user's own voice, or it cannot be graded at all.

**Moves**

- Name every expected output file, spelled exactly as it has to appear.
- Open with a realistic goal and close with a clear call to action, in language a real person would use.
- Require action inside the assigned universe, subcategory and tools, without naming the tools as calls.
- Leave room for subjectivity. State the visual requirements you want graded objectively, and no more.

**Produces.** The one prompt the whole task is built on.

> **The Draft History is not embedded in the agent**
> The prompt and the multimodal context are the only context the agent has. A requirement that lives only in the Desired Outcome was never asked for, so no criterion may grade it.

**In a real task.** In the disputes task the one prompt names the page to produce, says the drafts are not to be sent, and fixes the window to the charges between May and July. The rules that decide which charges hold up are left in the attachments, where the agent has to go and find them.
  
  No link yet: the published Golden Task cannot demonstrate this step under the current standard.

---

### 6. Draft History

**Say why the agent is there, not what to type.**

*Phase: Design*

The Agent Objective explains why this person needs help and what success looks like, without revealing the steps. The Desired Outcome states the end state in inspectable terms: each artifact named, what has to be inside it, and the logic that produces it.

**Moves**

- Write the objective at a level a colleague could act on without being told the method.
- Write the outcome as observable results, never as statements of intent.
- Confirm the category and subcategory fields against the universe you actually built on.
- Check that every requirement you plan to grade also appears in the prompt the agent receives.

**Produces.** The formal record the rubrics and the golden are both measured against.

> **A format rule that lives only here cannot be graded**
> The Desired Outcome is internal to you. If a rule has to hold in the deliverable, it has to appear in the prompt as well.

**In the Golden Task.** Every output the rubrics check is named in the prompt: the folder, the receipt filenames, MEMORY.md, emails_draft.md, the subject line, the SVG. Nothing is graded that the agent was not asked for.
  
  Links to: `/golden-tasks/vendor-closeout#draft-history` (The objective and the outcome, item by item)

---

### 7. Model failure

**If the model sails through, the task is not ready.**

*Phase: Leg A*

The prompt goes out and the agent answers it once. Measure that answer against the GTFA. You are looking for genuine failure across at least half the rubric weight, on failures that materially affect what the user asked for. Failures are found, never manufactured.

**Moves**

- Score the run against the GTFA before writing a single criterion.
- Restructure the task if the run captures the whole intent, or if what it missed is cosmetic.
- Separate a real failure from a broken run. A session abort or a forbidden input format is your defect, not a weakness you found.
- Keep the trajectory and the artifacts. They are what the objective block is written against.

**Produces.** A trajectory that fails honestly, on things that matter.

> **Not every failure is yours to keep**
> A requirement the model never saw, an undecided source conflict, or media no person could read either are task defects. A legible value misread, or an accessible tool left unused, is a real finding.

**In the Golden Task.** Model A never called a Slack tool at all. It worked from the attachments alone and failed 18 of 20 objective criteria, and the two it passed were the two that needed no reasoning.
  
  Links to: `/golden-tasks/vendor-closeout#model-a` (Where the run actually broke)

---

### 8. Objective rubrics

**Grade what was delivered, not how it got there.**

*Phase: Grade*

Write the criteria against the downloaded trajectory and artifacts. At least 80% of them grade completion, which is the artifact, the state change or the final message. At most 20% grade process, and zero is the preferred number.

**Moves**

- Write the completion version of every criterion first. A reasoning decision is graded where it lands in the deliverable.
- Embed the exact value, filename, date or classification, copied from the source rather than typed from memory.
- Keep a process criterion only where no deliverable can show the failure.
- Give a group of more than eight similar outcomes one completeness criterion and at most five spot checks.

**Produces.** A block that can be rated without you in the room.

> **Two issues fail the task on their own**
> Process over the 20% cap, and any criterion that only checks a file, section, column or record exists. Both are automatic fails whatever the severity percentages say.

**In the Golden Task.** Twenty criteria, each pinning its own amount, filename, date and person. It is also a counter example now: five of them target the Trajectory, which is 25% process against a cap of 20%, and the first one only checks that a folder and four files exist.
  
  Links to: `/golden-tasks/vendor-closeout#rubrics` (All 20 criteria and how Model A rated)

---

### 9. Golden solution

**Point at the intent. Never at the answer.**

*Phase: Leg B*

A new conversation on the same prompt, word for word, against a different model. You act as the user simulator and steer until the model produces the ideal response to that prompt. Hinting is the method for getting there, not an optional extra.

**Moves**

- Keep the original intent, context and persona consistent from the first message to the last.
- Hint by pointing back at context the user would plausibly remember, never at the value.
- Keep the no leak rule on every turn you type, however late in the conversation it is.
- Ship finished artifacts only. Nothing in the golden folder may describe how the answer was reached.

**Produces.** The golden artifacts, and a run that proves the rubric set is passable.

> **The golden passes its own block**
> Anything the golden fails is a broken criterion, not a broken golden. Reaching it once by accident proves nothing: you have to be able to steer the model there deliberately.

**In the Golden Task.** The model first confused the roughly $15,000 Sunset fee with the $50,000 all in estimate. The correction stayed in the user's voice and pointed back at an early December conversation, so the model found the figure itself.
  
  Links to: `/golden-tasks/vendor-closeout#hinting` (The steer, and what it pointed at)

---

### 10. Subjective rubrics

**Judge the render. Nothing the prompt asked for.**

*Phase: Grade*

Put the golden artifact and the Model A artifact side by side and let the real differences write the criteria. A presentation choice that helps the reader becomes a positive, one that hurts becomes a negative. Anything the prompt explicitly required belongs in the objective block instead.

**Moves**

- Name one identifiable element and one visible property per criterion.
- Weight by impact on the reader's experience, not by difficulty.
- Grade only what the format can actually show. A PDF cannot respond to hover.
- Check every literal here too. Literal matching applies to this block just as rigorously.

**Produces.** A presentation block a reviewer can locate and score on the render alone.

> **Ten or more, and no filler**
> No looks professional, no well designed, no high quality. Name the property, or cut the criterion.

**In the Golden Task.** Ten criteria came out of one comparison of the two rendered SVGs. Model A's percentage slot reads needs estimate at headline weight, which is an artifact handed over asking its reader to finish it.
  
  Links to: `/golden-tasks/vendor-closeout#subjective` (The ten criteria and what they caught)

---

## The mindset

- **Step into the user's shoes.** The scenario should be one a real person in that universe would actually be living through, not a benchmark dressed up as a story.
- **Let the evidence lead.** Difficulty comes from sources that have to agree, not from asking for more things. Two sources that disagree beat five that repeat each other.
- **Plan before you run.** The pair, the scenario, the prompt and the answer are settled while the scenario is still in front of you. Everything after that inherits whatever you decided here.

## Hard client requirements

- **Complex.** Planning, recovery, and work across several artifacts, tools or sources.
- **Parameters followed.** All seven assigned parameters implemented, with no drift.
- **Multimodal.** Media required for a core requirement, enforced by the ablation.
- **Cross-modal.** One step's output becomes the next step's necessary input.
- **Objective.** Every output grounded in a rule or source stated in the prompt.
- **Subjective quality.** A rendered artifact whose presentation can be judged.
- **Model A fails.** At least 50% of the final rubric score, on failures that matter.

---

## Use case taxonomy, 11 use cases and 68 subcategories

`name`, `covers` and the scope check are the guidelines' own wording, stored verbatim. The three
scenarios under each subcategory are hub copy and are the part most likely to need your edits.
Each one names the evidence the agent has to read, the reconciliation it has to make and the
thing it has to produce.

On the page this is collapsed: one use case opens at a time.

### SMB  ·  8 subcategories

*Scope check: confirm a small-business context. Business records, listings or marketing content alone do not make a task SMB.*

**Managing ad campaigns**  
Set up, optimize, scale and automate ad campaigns: budgets, rules, bids, ROAS, conversions.

  - A screenshot of the ROAS board and a budget rules PDF: decide what to scale, what to pause, and write the new schedule.
  - A voice note capping monthly spend, read against live campaign records, to rebalance bids without breaching the cap.
  - Three creative previews and the spend behind each: pull the worst performer and reallocate its budget across the rest.

**Analyzing & reporting on ads**  
Ad performance review or audit, creative readouts, multi-account reporting, executive dashboards and decks.

  - Two ad accounts exported as images plus the finance sheet: reconcile the spend figures and build the quarterly readout.
  - A recorded client call naming the metrics that matter, turned into a dashboard over the campaign data behind it.
  - Creative thumbnails and their performance rows: explain which creative carried the quarter and deck the finding.

**Gathering competitor & market intel**  
Competitor ad intelligence; competitor, price and site monitoring across the web and social.

  - Screenshots of four rival listings against the internal price table: find where the shop is undercut and report it.
  - A photo of a competitor's in-store promo and the web price for the same item, reconciled into a positioning brief.
  - A monitoring alert and the archived page it points at: confirm what actually changed and log the move.

**Planning & auditing social content**  
Analyze the account to decide the next content; audit, diagnose and benchmark it; weekly content planning.

  - A grid screenshot and the post level numbers behind it: diagnose what the account is actually rewarded for, then plan the week.
  - A voice memo from the owner on brand direction, benchmarked against the last month of posts, into a content calendar.
  - Two competitor profiles captured as images, audited against the shop's own cadence, to produce the gap list.

**Creating & publishing content**  
Create content and ad-creative assets (posts, carousels, Reels, captions, ad copy), then publish or schedule them.

  - Product photos and a brand rules PDF: build the carousel that respects the stated palette and schedule it.
  - A supplier's spec sheet photographed on paper, turned into ad copy that states only claims the sheet supports.
  - A voice note describing the launch, plus the shot list, assembled into scheduled posts for the launch week.

**Growing audience & monetization**  
Turn attention into revenue: brand deals, creator marketplaces, lead and partner sourcing, monetization tracking.

  - A brand deal contract as a scan and the payout records: check what was actually paid against what was agreed.
  - Screenshots of inbound partner messages, triaged against the CRM, into a sourced and ranked lead list.
  - A media kit image and the real engagement numbers, reconciled into a corrected kit the owner can send.

**Building & monitoring product**  
Ship product or features end to end, technical research-to-plan, code and service monitoring.

  - A whiteboard photo of the feature sketch and the current service metrics, turned into a sequenced build plan.
  - An alert screenshot and the logs behind it: establish whether the incident is real and write the postmortem.
  - A design mock plus the issue tracker, reconciled into the work that is genuinely left before launch.

**Running business operations**  
Sales and CRM, invoicing and business finance, store, catalog and inventory, recurring business reporting.

  - Photographed delivery notes against the inventory table: find the stock that was billed but never received.
  - A supplier invoice scan and the purchase records, reconciled to decide which invoices are safe to pay.
  - A handwritten stock count and the catalog export, turned into the reorder list and the monthly report.

---

### Shopping  ·  8 subcategories

*Scope check: the user is buying something. Managing a business listing or auditing a brand does not belong here.*

**Hunting best deals & bargaining**  
Price hunting and haggling, including secondhand marketplaces.

  - Photos of a secondhand listing and its condition, priced against comparable sales, into an offer message.
  - Screenshots of three retailer prices and a loyalty rules PDF: work out what the item really costs at each.
  - A seller's voice note on the lowest they will go, checked against market rates, to decide whether to take it.

**Discovering products (style-aware, cross-retailer)**  
Deciding what to buy through style-aware discovery across retailers.

  - A photo of an outfit the user liked plus a size chart: find matching pieces across retailers and build the shortlist.
  - A saved inspiration board and the sizing notes in a document, reconciled into options that actually fit.
  - A room photo and a measurements note: shortlist furniture that fits the space and the stated style.

**Buying a gift**  
Gift discovery and purchase for someone else.

  - A screenshot of the recipient's wishlist and a voice note on the budget, turned into a ranked gift shortlist.
  - Photos of what the user already gave last year, checked against the calendar, so nothing repeats.
  - A group chat export agreeing a shared budget, reconciled into one gift and the split per person.

**Handling returns, refunds & CS resolution**  
Initiate returns, exchanges or refunds and resolve disputes with customer service, including chasing a late refund.

  - A photo of the damaged item and the delivery confirmation: establish the claim and draft the return request.
  - A receipt and the returns policy PDF, reconciled against the order date to see what is still in window.
  - Screenshots of a refund promised weeks ago, checked against the account records, into the chase message.

**Recurring purchases & auto-replenishment**  
Reorder staples or set up auto-replenishment.

  - A pantry photo and the last three orders: work out what actually runs out and set the reorder cadence.
  - A handwritten shopping list against the subscription records, to stop ordering what is already arriving.
  - Label photos of the products in use, matched to catalogue entries, into a standing replenishment plan.

**Researching & negotiating large purchases**  
Cars, TVs, appliances: deep research and negotiation support.

  - A dealer quote photographed on paper and the spec sheet, checked line by line for what was added quietly.
  - Photos of two appliances in the showroom plus the running cost table, reconciled into the real cost of each.
  - A finance offer scan and the household budget, turned into the counter offer and the walk away number.

**Finding & hiring services**  
Find, compare and book a contractor, tutor, cleaner, trainer, etc.

  - Three quotes photographed on paper and the job photos, compared on what each one actually includes.
  - A voice note describing the job plus the site pictures, turned into a brief and a shortlist of trades.
  - Screenshots of availability against the household calendar, to book the slot that genuinely works.

**Executing purchases**  
Complete a checkout or purchase flow.

  - A cart screenshot and the voucher rules document: apply what genuinely stacks and complete the order.
  - A photo of the item and its size label, matched to the right variant before the purchase goes through.
  - A saved basket checked against the account balance and the stated budget before checkout.

---

### Personal productivity  ·  7 subcategories

*Scope check: a personal goal. Housing and home-project tasks placed here are provisional; confirm the intent.*

**Surfacing where to focus my attention**  
A cross-domain daily-priorities digest. Use only when the request spans several priorities.

  - Inbox, calendar and a photographed to do list, reconciled into what genuinely has to happen today.
  - A voice memo listing worries, checked against deadlines across accounts, into a ranked daily brief.
  - Screenshots of three apps the user lives in, merged into one digest with the conflicts called out.

**Running the family operations hub**  
School and family email triage, action execution, logistics and a weekly brief.

  - School letters photographed at the kitchen table, triaged against the family calendar into the week's brief.
  - A permission slip scan and the shared calendar, reconciled so nothing is double booked or missed.
  - A voice note from one parent plus the school emails, turned into the logistics plan and the actions taken.

**Auditing & bulk-unsubscribing email lists**  
Rank senders by volume or engagement and bulk-unsubscribe.

  - A screenshot of the overloaded inbox and the mail records, ranked by what the user has never once opened.
  - A stated keep list in a document, reconciled against sender volume, before anything is unsubscribed.
  - Promotional headers captured as images, grouped by sender, into the unsubscribe plan and what it saves.

**Inventorying rewards & perks**  
Loyalty points and perks inventory with expiration alerts (distinct from statement rewards in Personal finance).

  - Photos of loyalty cards and the account records, reconciled into what is expiring and when.
  - A benefits booklet scan against the memberships held, to find the perks never once used.
  - Screenshots of three points balances, merged into one inventory with the expiry alerts set.

**Scheduling & managing calendar**  
Create and manage events, find time, resolve conflicts.

  - A photographed invitation and the live calendar, reconciled to find the clash and propose the fix.
  - A voice note listing the week's commitments, checked against existing events, into the booked schedule.
  - Screenshots of two shared calendars, merged to find the only slot that works for everyone.

**Retrieving & summarizing messages**  
Cross-channel "catch me up" retrieval and summaries.

  - A week away, with chat, mail and a voice message, condensed into what actually needs an answer.
  - Screenshots of a long thread plus the records behind it, reconciled into the decision that was reached.
  - A recorded meeting and the messages that followed it, merged into the catch up and the open actions.

**Prepping for events & activities**  
Assemble briefs and logistics ahead of an event or activity.

  - A venue confirmation photo and the guest list, reconciled into the run sheet and what is still missing.
  - A voice note on what the day needs plus the calendar, turned into the brief and the timings.
  - Ticket screenshots and a travel plan, checked against each other so the logistics actually hold.

---

### Creativity  ·  5 subcategories

*Scope check: personal creative output. Publishing for a business or brand belongs in SMB.*

**Generating images & visuals**  
Image generation, visual art and design output.

  - A sketch photographed in a notebook and a palette reference, turned into the finished visual the user described.
  - Reference images plus a written style brief, reconciled into a piece that holds every stated constraint.
  - A mood board and the stated dimensions, worked into the visual and the reasoning behind each choice.

**Creating audio & video**  
Media production: audio, video, podcasts, music.

  - Raw clips and a voice note describing the cut, assembled into the edit the user asked for.
  - An interview recording and the shot list, reconciled into the episode and its published description.
  - A photo set and a music reference, turned into the sequenced video with the stated pacing.

**Writing creatively**  
Stories, songs, scripts, poems, creative prose.

  - Handwritten notes photographed from a journal, worked into the piece without losing what they actually said.
  - A voice memo of a half remembered idea plus earlier drafts, reconciled into the next version.
  - Character sketches as images and a plot outline, turned into the scene the outline calls for.

**Designing & crafting**  
Arts, crafts and design projects.

  - A pattern photographed on paper and the materials to hand, reconciled into what can actually be made.
  - Photos of work in progress and the instructions, checked to find where the build went wrong.
  - A measurements note and a reference image, turned into the cut list and the build order.

**Publishing creative content**  
Publishing or posting the user's own creative output (personal, not business).

  - Finished pieces as images plus the platform rules, reconciled into posts that meet every stated limit.
  - A voice note on what to say about the work, turned into the published captions and the schedule.
  - A portfolio screenshot and the new work, merged so the published set stays coherent.

---

### Personal finance  ·  8 subcategories

*Scope check: the user's own money. Business bookkeeping belongs in SMB.*

**Detecting & cancelling wasteful recurring charges**  
Recurring-charge detection, usage-based waste scoring, cancellation assistance.

  - Statement photos and the app usage records, reconciled to find the subscriptions paid for but never opened.
  - A screenshot of a renewal notice against the account history, to decide what is worth keeping.
  - A voice note on what the user thinks they pay, checked against what they actually pay, into the cancellation list.

**Categorizing spending & flagging anomalies**  
Auto-categorize spend, month-over-month trends, anomaly flags.

  - Receipt photos and the transaction records, categorized together so the month actually reconciles.
  - A handwritten budget against the real spend, to find where the two have drifted apart.
  - Three months of statements as images, compared to flag the category that quietly doubled.

**Projecting savings goals & modeling scenarios**  
Savings-goal projection and scenario modeling against upcoming expenses.

  - A photographed quote for an upcoming cost plus the account history, modelled into whether the goal still holds.
  - A voice note stating the target date, reconciled against standing payments, into the monthly figure needed.
  - Screenshots of two savings options and the stated plans, compared on what each one actually returns.

**Detecting & disputing erroneous charges**  
Double or unauthorized charge detection, then the dispute (not subscription waste).

  - Two paper receipts, one faded, against sixty days of transactions: is it a duplicate or a hold and a settlement?
  - A signed card slip photographed at the table, checked against the amount actually taken, into the dispute draft.
  - A promotion email and the receipt that ignored it, reconciled into what was overcharged and the claim for it.

**Monitoring stocks & planning investments**  
Portfolio, stock or crypto monitoring and planning.

  - A handwritten note of holdings photographed from a desk, reconciled against the live portfolio records.
  - Screenshots of two broker positions, merged to find what the user actually owns across both.
  - A voice note stating the risk the user will accept, checked against the current allocation.

**Monitoring statements, bills & rewards**  
Passive scan of statements, bill due dates and rates.

  - Statement scans and the calendar, reconciled into which bills are due before the next pay date.
  - A photographed rate change letter, checked against the account, to see what it actually costs.
  - Reward balance screenshots against the statement records, to find the credits never applied.

**Preparing taxes & financial documents**  
Tax prep, deductions, document handling.

  - Receipt photos and the expense records, reconciled into what is genuinely deductible and what is not.
  - A scanned statement set plus the rules document, assembled into the filing pack with every figure sourced.
  - A voice note listing claimed expenses, checked against the evidence held, into the corrected schedule.

**Paying bills & moving money**  
Execute payments, transfers and redemptions.

  - A photographed invoice and the account balance, reconciled before the payment is made.
  - A due date letter scanned, checked against standing transfers, so nothing is paid twice.
  - Screenshots of a redemption offer and the points held, to decide whether it is worth taking.

---

### Work productivity  ·  4 subcategories

*Scope check: the user's job, not running their own business (that is SMB).*

**Managing career & job search**  
Job applications, resume, interview prep, career advice.

  - A job advert screenshot and the current resume, reconciled into the version that answers what is asked.
  - An interview recording plus the role brief, worked into the prep notes and the gaps to close.
  - Photos of a handwritten career plan, checked against the applications actually sent.

**Producing work deliverables**  
Business docs, decks (doc to slides), reports, spreadsheets, professional writing.

  - A whiteboard photo and the underlying data, turned into the deck that carries the argument.
  - A recorded briefing plus the source document, reconciled into the report with every figure checked.
  - Scanned notes and the spreadsheet behind them, assembled into the deliverable the brief asked for.

**Conducting professional research & briefings**  
Decision-ready professional or market research and briefings for work.

  - Conference slides photographed from the room plus the market records, reconciled into the decision brief.
  - A voice note framing the question, worked across sources into a briefing that answers it.
  - Screenshots of two vendor claims, checked against the evidence, into the recommendation.

**Managing work communications**  
Work email and chat triage, action-item capture, work meeting scheduling.

  - A meeting recording and the thread that followed, reconciled into the actions and who owns each.
  - Inbox screenshots triaged against the calendar, into what to answer now and what to schedule.
  - A photographed note from a call, checked against the written record, into the follow ups sent.

---

### Research  ·  5 subcategories

*Scope check: a subject label is not enough. If the topic is owned by another use case (Shopping, Travel, etc.), use that one.*

**Answering factual questions**  
Quick lookups, fact-checking, definitions.

  - A claim photographed from a printed page, checked against the record that would settle it.
  - A screenshot of a disputed figure, traced back to the source it actually came from.
  - A voice note asking three related questions, answered with each one sourced separately.

**Researching a topic in depth**  
Multi-source synthesis or deep research on a topic.

  - A document set and a recorded briefing, synthesised into one account that names where sources disagree.
  - Photographed pages from two references, reconciled into the position each one actually supports.
  - A chart image plus the data behind it, worked into the deeper reading of what it shows.

**Monitoring news & topics**  
News briefings, ongoing topic or trend monitoring, weather.

  - Headline screenshots across a week, reconciled against the record into what actually moved.
  - A clipped article photographed from print, checked against the ongoing coverage.
  - A voice note naming the topics to watch, turned into the recurring brief.

**Comparing & evaluating options**  
Structured comparison of options when the topic is not Shopping or another named use case.

  - Two proposal scans and the criteria document, compared on the terms the criteria actually name.
  - Photographed spec sheets, reconciled into the comparison with the differences that matter called out.
  - A recorded discussion of priorities, applied to the options into a ranked evaluation.

**Summarizing & analyzing provided material**  
Condense or analyze user-provided documents or data for information (not a work deliverable).

  - A long scanned report plus a recording about it, condensed into what the user actually needs to know.
  - Photographed pages and the dataset they refer to, analysed together rather than separately.
  - Screenshots of a dense thread, reduced to the argument and the evidence behind it.

---

### Entertainment  ·  5 subcategories

*Scope check: amusement or leisure. Creating media alone does not establish entertainment intent.*

**Playing games & interactive fun**  
Games, trivia, roleplay, interactive fiction.

  - A board state photographed mid game plus the rules PDF, resolved into the legal move.
  - A scanned rule book and a disputed play, reconciled into who was actually right.
  - A voice note setting the house rules, applied to the game into the interactive round.

**Discovering & discussing media**  
Movies, TV, music and books: discovery and discussion (consuming, not creating).

  - A photographed bookshelf and the watch history, reconciled into what to read or watch next.
  - Screenshots of three recommendations, checked against what the user already finished.
  - A voice note on what they liked and why, turned into a shortlist that holds that reasoning.

**Following sports & fandom**  
Following sports, scores, fandom, sports analytics for fun.

  - A photographed fixture list and the results record, reconciled into where the season actually stands.
  - A scoreboard screenshot and the stats behind it, worked into the readout for the group chat.
  - A voice note predicting the table, checked against the real standings.

**Pursuing hobbies & projects**  
Hobby tracking and personal leisure projects (gardening, crafts for fun, DIY).

  - Photos of the plot across the season plus the planting notes, reconciled into what to do next.
  - A handwritten project log and the receipts, checked to see what the build has really cost.
  - A voice note on where the project stalled, worked against the photos into the next steps.

**Finding things to do**  
Local activities, outings and events for leisure.

  - A poster photographed in the street and the calendar, reconciled into what is actually free to attend.
  - Screenshots of three listings, checked against the stated budget and travel time.
  - A voice note on what the group enjoys, turned into the shortlist of outings.

---

### Travel  ·  5 subcategories

*Scope check: a trip. Local leisure without a travel context belongs in Entertainment.*

**Planning trips**  
Multi-component itinerary planning (two or more of lodging, transport, activities).

  - Booking confirmations as screenshots and a voice note on the plan, reconciled into the itinerary that holds.
  - A photographed map with marks on it plus the dates, worked into the sequenced trip.
  - Two draft plans and the budget document, compared into the one that actually fits.

**Booking transport**  
Flights, trains, car or navigation for a trip.

  - A confirmation screenshot and the calendar, checked so the connection is genuinely makeable.
  - A photographed timetable against the booked lodging, reconciled into the travel that works.
  - A voice note on arrival constraints, applied to the options into the booking made.

**Booking accommodation**  
Hotels, rentals, lodging.

  - Listing photos and the stated requirements, reconciled into what actually meets them.
  - A screenshot of the cancellation terms, checked against the trip dates before booking.
  - A voice note on who is travelling, applied to the room options into the reservation.

**Discovering activities & dining**  
Things to do and restaurants while traveling.

  - A photographed menu and the dietary note, reconciled into where the group can actually eat.
  - Screenshots of opening hours against the itinerary, to find what is reachable on which day.
  - A voice note on the pace they want, turned into the day plan.

**Assisting in-trip in real time**  
Delays, directions, rebooking during the trip.

  - A delay notice photographed at the gate, reconciled against the onward booking into the rebooking.
  - A screenshot of the disruption plus the lodging terms, worked into what the traveller should do now.
  - A voice note from the road and the live records, turned into the revised plan.

---

### Health / Fitness  ·  8 subcategories

*Scope check: all health inputs must be mocked or synthetic (section 1.2.2). Emotional support is out of scope.*

**Becoming generally healthier**  
Open-ended "get healthier" with no specific target: habits, nudges, a holistic plan.

  - A synthetic activity export and a photographed habit tracker, reconciled into the plan that fits the week.
  - A voice note on what keeps failing, checked against the record, into the adjusted habits.
  - Screenshots of three trackers, merged into one picture of where the user actually is.

**Losing weight**  
Weight-loss program: targets, tracking, adjustment over time.

  - A photographed food diary and the synthetic weight log, reconciled into why progress stalled.
  - A voice note stating the target, checked against the trend, into the revised plan.
  - Meal photos and the logged intake, compared to find what the log is missing.

**Optimizing sleep**  
Sleep, HRV and readiness analysis and optimization.

  - A synthetic sleep export and a photographed evening routine, reconciled into what is costing the user rest.
  - Screenshots of readiness scores against the calendar, to find what the bad nights share.
  - A voice note describing the nights, checked against the recorded data.

**Planning & critiquing workouts**  
Workout plans, video form analysis, RPE/1RM, scheduling.

  - A lift video and the training log, reconciled into the form note and the next session.
  - A photographed programme plus the synthetic session data, checked for where the load drifted.
  - A voice note on how the week felt, applied to the plan into the adjusted schedule.

**Planning nutrition & meals**  
Macro targets, calendar-aware and allergy-aware meal plans.

  - A fridge photo and a stated allergy list, reconciled into the week of meals that is actually safe.
  - A photographed label and the macro targets, checked to see whether the product fits.
  - A voice note on the week ahead, applied against the calendar into the meal plan.

**Monitoring wearables & vitals**  
Device data review, anomaly detection (not sleep or a named condition).

  - A synthetic device export and a photographed log, reconciled into the days that do not match.
  - Screenshots of two devices disagreeing, checked against the record to resolve which to trust.
  - A voice note on what the user noticed, compared against the measured data.

**Managing chronic conditions & medication**  
Condition trends, threshold alerts, medication and refill reminders.

  - Photographed medication labels and the synthetic readings, reconciled into the refill and alert schedule.
  - A scanned care plan with thresholds, checked against the logged trend.
  - A voice note on missed doses, applied to the record into the corrected routine.

**Navigating medical care**  
Insurance and coverage, claims, prior authorization, appointments, understanding medical information.

  - A synthetic claim letter scanned and the coverage document, reconciled into what is actually owed.
  - A photographed appointment card against the calendar, worked into the scheduling and the prep.
  - A benefits booklet and a denial notice, compared into the grounds for the appeal.

---

### Learning  ·  5 subcategories

*Scope check: broader than visual learning; the task still has to meet the multimodal requirement.*

**Explaining concepts & how-to**  
Explain how something works or how to do it, step by step.

  - A diagram photographed from a manual, worked into the explanation of what it is actually showing.
  - A recorded demonstration plus the written steps, reconciled into the guide that matches both.
  - Screenshots of a process that failed, turned into the explanation of where it went wrong.

**Tutoring & coursework**  
Homework help, coursework, subject tutoring.

  - A photographed worked answer and the marking scheme, reconciled into where the marks were lost.
  - A scanned assignment brief plus the draft, checked against what was actually asked.
  - A voice note on what the student finds hard, applied to the coursework into the session plan.

**Preparing for tests & studying**  
Exam prep, study plans, flashcards, practice questions.

  - A photographed syllabus and past results, reconciled into the study plan that targets the weak areas.
  - Scanned past papers plus the calendar, worked into a schedule that fits before the exam.
  - Handwritten notes photographed from a pad, turned into practice questions that test them.

**Learning a language**  
Language practice, vocabulary, grammar, conversational drills.

  - A recorded attempt at speaking plus the vocabulary list, reconciled into the drill that fixes the errors.
  - A photographed textbook page, worked into practice that uses only what has been covered.
  - Screenshots of a progress record, checked to build the next set of drills.

**Building skills & practice**  
Guided practice to build a non-academic skill.

  - A video of an attempt and the technique reference, reconciled into the correction and the next drill.
  - A photographed practice log, checked against the goal to see whether the routine is working.
  - A voice note on where the user is stuck, applied to the record into the guided plan.

---

