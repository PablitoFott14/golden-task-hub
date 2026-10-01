# The method, Major Shin

Review copy of `src/data/method.ts`, `src/data/taxonomy.ts` and `src/data/changes.ts`,
generated from them so the two cannot drift. Edit here, tell me, and I will carry it back.

Guidelines Major Shin v1, Sep 27, 2026.

The order is the argument, and every step states what it inherits from the one before. Step 1
fixes the assigned pair. Step 2 explores the universe inside that pair. Step 3 is the one
situation where both are true. Step 4 is the evidence that situation would really produce.

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

**From step 1.** Step 1 handed you a fixed pair and the scope check that proves it. You are no longer looking for a good situation, only for the one this universe can evidence inside that pair.

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

**From step 2.** The pair says what the task has to be about. The universe says what can actually be proved. The scenario is the one situation where both are true at once, which is why it comes third and not first.

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

**From step 3.** The scenario fixes the moment and the deliverable. That decides the evidence: what this person would really be holding, and how much of it the deliverable forces the agent to reconcile.

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

**From step 4.** Pair, universe, scenario, GTFA and inputs are all settled. The prompt is where every one of them becomes the only thing the agent will ever see.

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

**From step 5.** The prompt is written. Draft History records the same scenario formally, and each field has to agree with it: the category and subcategory from step 1, the outcome from step 3, the files from step 4.

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

**From step 6.** Design is finished and the prompt goes out once. What comes back is measured against the GTFA you resolved in step 3, not against what looks reasonable.

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

**From step 7.** The run handed you a trajectory and a set of artifacts. The criteria are written against those, and against the GTFA that already said what should have been in them.

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

**From step 8.** The criteria define what passing means. Leg B has to prove the set is actually passable, on the same prompt, word for word.

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

**From step 9.** Leg A produced one render and Leg B produced the better one. Everything the prompt demanded is already graded above, so what is left between the two renders is this block.

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

# What is new in Major Shin

9 changes, on the `/whats-new` tab.

## Tasks are single turn, so milestones are gone

*Hard rule · Sep 27, 2026 · Major Shin v1*

**In Red Shell.** Red Shell ran 3 to 5 turns, with a milestone set per turn, a revision turn, and a milestone check deciding whether the next prompt was a turn or a hint.

The task type is always single turn. One initial prompt goes in, it is sent automatically when you submit, and the agent answers it once. There are no further turns, so there is no milestone set to write. Leg B still runs that same prompt word for word, steered at intent level until the model reaches the ideal response.

**What you do now.** Put every requirement into the one prompt. Anything it does not ask for cannot be graded, whatever the Draft History records.

**What this removes from the old workflow**

- No milestone set, and no milestone check between turns.
- No revision turn, and no deferred asset arriving later in the conversation.
- No turn structure or dependency to design, so difficulty has to come from the scenario instead.
- Hinting survives, but only inside Leg B, where you steer the same prompt toward the ideal response.

**In the guidelines:** 1.1 Task Parameters & Execution Rules · 2.1 Sending the Prompt · 6 Golden Solution, Leg B

---

## A new use case taxonomy, 11 use cases and 68 subcategories

*Hard rule · Sep 27, 2026 · Major Shin v1*

**In Red Shell.** Red Shell assigned one of 6 categories and 16 subcategories. Those labels are retired and are not valid values any more.

Every task is assigned one use case (L1) and one subcategory (L2) from the Hatch taxonomy. The pair is fixed, and the scenario, the prompt and the deliverable all have to be its natural home. Assign by the user's intent, never by what the input files happen to be about.

**What you do now.** Read your L2 definition and its scope check before you design anything, then check the neighbouring L2 in the same use case. Fitting that one better is a category relevance failure even when the use case is right.

**Reading the taxonomy**

- The scope check is the tie breaker. SMB needs a small business context, Shopping needs the user to be buying, Research loses to any use case that owns the topic.
- Four lower traffic use cases after Learning, and emotional wellbeing support, are out of scope. Health and Fitness is not a catch all for them.
- Every scenario below clears the complexity bar for its deliverable. A pair that only supports a plain document is a pair you have not finished designing against.

**In the guidelines:** 1.1 Task Parameters & Execution Rules · 1.1.1 Use-Case Taxonomy (L1 & L2) · 1.2.5 Common Scenario Issues Getting Tasks Rejected

*The full taxonomy below renders under this entry on the page.*

---

## All seven assigned parameters are binding

*Hard rule · Sep 27, 2026 · Major Shin v1*

**In Red Shell.** Red Shell assigned four: task type, category, subcategory and universe. The rest of the brief was treated as guidance.

Category, subcategory, universe, scenario, output artifact, primary capabilities and secondary capabilities are all assigned, and all of them have to be implemented and visible in the finished task. Omitting, substituting or drifting from any one makes the task invalid.

**What you do now.** Check the finished task against every assigned parameter before you submit, not just the category pair. The scenario is the only one you may adjust, and only to reach the complexity bar.

**What counts as drift**

- Producing a different artifact than the one assigned, even a better one.
- Exercising a capability the brief did not name, in place of one it did.
- Reworking the scenario into a different kind of situation. Adjusting it for complexity is allowed, changing its core nature and intent is not.

**In the guidelines:** Hard Client Requirements Task parameters are mandatory · 1.1 Task Parameters & Execution Rules

---

## Assigned tools are mandatory, and tool drift is rejected

*Hard rule · Sep 27, 2026 · Major Shin v1*

Where a scenario comes with specific tools or connectors, the task has to be built on them. The correct final state must depend on those tools, and a task that reaches its outcome through a different service is rejected at QC. The loadout documented in the appendix is background only and never justifies substituting one.

**What you do now.** Build the scenario on the assigned tools rather than on whichever service is easiest to reach, and make sure the deliverable genuinely cannot be produced without them.

**In the guidelines:** 1.1 Task Parameters & Execution Rules · 1.2.3 Create the Prompt · 1.2.5 Common Scenario Issues Getting Tasks Rejected · 8.3 The Services in the Universe

---

## Three multimodal inputs is the floor, not the target

*Hard rule · Sep 27, 2026 · Major Shin v1*

**In Red Shell.** Red Shell set the same minimum of three, and in practice it was read as the number to hit.

The Model A conversation needs a minimum of three multimodal inputs. Three is the requirement, not the goal, and many tasks need substantially more than that to meet the complexity bar the client expects.

**What you do now.** Use as many inputs as the scenario naturally needs, and never trim a task down to three or slightly more.

**In the guidelines:** 1.2.2 Select the Multimodal Inputs

---

## 80/20: grade the outcome, not the route

*Hard rule · Sep 27, 2026 · Major Shin v1*

**In Red Shell.** Red Shell capped Trajectory criteria at five and treated them as ordinary coverage. That cap is gone and the 80/20 rule replaces it.

At least 80% of your objective criteria have to grade completion: the artifact, the state change, the final message. At most 20% may grade process, which is Tool Use, Agent Behavior, any Trajectory target and narration of the model's own work, and zero is preferred. Above the cap the task fails automatically as Process Over Cap.

**What you do now.** Write the completion version first. Grade a reasoning decision where it lands in the deliverable, and grade a lookup the model skipped by what its absence costs the artifact. Keep a process criterion only where no deliverable can show the failure.

**Counting it, and the rewrite it forces**

- Count the objective block only, positives and negatives alike, and round down. 12 criteria allow 2 process criteria, 20 allow 4.
- The test: could the deliverable be perfect and this criterion still fail? Then it is process.
- Process: the model opens klin.png before writing report.md. Completion: report.md records the 48 spaces per rack shown in klin.png. The second catches the same failure, because a model that never looked cannot know the value.
- A missing lookup is graded by what it costs the deliverable, not by evidence that the model tried.

**In the guidelines:** 5 Objective Rubrics · 5.1 Rubric Fundamentals · 5.4 Category & Evaluation Target · 5.6 How the Client Defines Rubric Issue Severity · 5.7 Final Rubric Checklist · 8.2 What the Model Actually Does

---

## Every literal has to match its source exactly

*Hard rule · Sep 27, 2026 · Major Shin v1*

Every filename, ID, value, date or string a criterion references must match the source exactly. A literal the source does not actually carry cannot be satisfied by any run, and it counts as an Incorrect Criteria issue, which is Major. This applies just as rigorously to the subjective block.

**What you do now.** Copy each literal straight from the attachment, the universe record or the GTFA. Open the source and check every one of them before you submit.

**In the guidelines:** 5.1 Rubric Fundamentals · 5.7 Final Rubric Checklist

---

## A criterion that only checks existence is never valid

*Hard rule · Sep 27, 2026 · Major Shin v1*

Do not write a criterion that only verifies a file, section, column or record is there. Existence is already implied by any criterion that grades content. No weight makes one of these acceptable, and it fails the task automatically as an Existence Check.

**What you do now.** Grade what the file records instead. A criterion on the value inside it already proves the file exists.

**The rewrite**

- Not valid: array_survey.csv contains the columns string_id, output_w and variance_pct.
- Valid: array_survey.csv records a variance_pct of −12.4 for string S-07, the string whose output is read off the inverter photo.
- Naming the specific files inside a folder does not save it. If nothing in the criterion grades content, it is still an existence check.

**In the guidelines:** 5.1 Rubric Fundamentals · 5.2 Rubric Weights · 5.6 How the Client Defines Rubric Issue Severity · 5.7 Final Rubric Checklist

---

## Complexity is planned, never patched in

*Changes the shape · Sep 27, 2026 · Major Shin v1*

Complexity has to come from a natural, well planned scenario rather than from artificial friction, extra constraints or contrived inputs. Do not improvise the task as you go, and do not wait for the model to fail before deciding to add difficulty. The guidelines set the expectation at a minimum of two hours on planning before a task is ready.

**What you do now.** Settle the deliverable, the dependencies, the inputs and the intended workflow before you build anything, and check the deliverable against the complexity bar for its type while the scenario is still on paper.

**The floor each deliverable has to clear**

- P0, explainer video: several scenes driven by the data or the documents, not one static frame with narration.
- P0, interactive HTML: interaction that actually works, controls that respond, state that changes. A styled static page does not qualify.
- P0, dashboard: several linked views over data the model extracted itself. One chart is not a dashboard.
- P1 covers presentations of 10 to 15 slides, multi page designed PDFs and multi row structured data. A plain document or report is P2.

**In the guidelines:** Complexity Bar Genuine complexity is not negotiable · 1 Planning the Agent Task · 1.2 Building the Idea

---

# Use case taxonomy, 11 use cases and 68 subcategories

`name`, `covers` and the scope check are the guidelines' own wording, verbatim. The three
scenarios under each subcategory are hub copy and are the part most likely to need your edits.
Each is written against the complexity bar and leans on the P0 deliverables: the dashboard, the
interactive page and the explainer video.

## SMB  ·  8 subcategories

*Scope check: confirm a small-business context. Business records, listings or marketing content alone do not make a task SMB.*

**Managing ad campaigns**  
Set up, optimize, scale and automate ad campaigns: budgets, rules, bids, ROAS, conversions.

  - Screenshots of the ROAS board, a budget rules PDF and a voice note capping monthly spend, reconciled into a dashboard whose linked views show what to scale, what to pause and what each change costs.
  - Three creative previews and the spend behind each, checked against the live campaign records, into an interactive page that filters by placement and holds the reallocated budgets.
  - A photographed approval sheet and the bid history, worked into a dashboard that links every rule change to the conversions it moved.

**Analyzing & reporting on ads**  
Ad performance review or audit, creative readouts, multi-account reporting, executive dashboards and decks.

  - Two ad accounts exported as images against the finance records, built into a dashboard that filters by account and reconciles reported spend with what was actually billed.
  - A recorded client call naming the metrics that matter, applied to the campaign data, into an executive dashboard with a linked view per metric named.
  - Creative thumbnails and their performance rows, turned into an explainer video whose scenes walk the quarter creative by creative.

**Gathering competitor & market intel**  
Competitor ad intelligence; competitor, price and site monitoring across the web and social.

  - Screenshots of four rival listings and a photo of an in store promo, checked against the internal price table, into an interactive page that filters to where the shop is undercut.
  - A monitoring alert and the archived page it points at, reconciled into a dashboard with linked views for what changed, when, and what it costs to match.
  - Photographed shelf tags from three competitors, worked against the catalogue into a page where each product expands to the evidence behind its position.

**Planning & auditing social content**  
Analyze the account to decide the next content; audit, diagnose and benchmark it; weekly content planning.

  - A grid screenshot, the post level numbers and a voice memo on brand direction, worked into a dashboard that links reach to format and carries the next week's plan.
  - Two competitor profiles captured as images, benchmarked against the shop's own cadence, into an interactive audit that filters the gaps by effort.
  - A photographed content calendar and the engagement records, reconciled into a planner where each slot expands to why that format was chosen.

**Creating & publishing content**  
Create content and ad-creative assets (posts, carousels, Reels, captions, ad copy), then publish or schedule them.

  - Product photos, a brand rules PDF and a supplier spec sheet on paper, turned into an explainer video whose scenes carry only the claims the sheet actually supports.
  - A voice note describing the launch and the shot list, built into an interactive schedule where each post previews against the brand palette it has to respect.
  - Photographed packaging and the catalogue records, reconciled into a carousel builder page that holds the approved copy per product.

**Growing audience & monetization**  
Turn attention into revenue: brand deals, creator marketplaces, lead and partner sourcing, monetization tracking.

  - A scanned brand deal contract and the payout records, reconciled into a dashboard that links each deliverable to what was actually paid and flags the shortfalls.
  - Screenshots of inbound partner messages triaged against the CRM, into an interactive lead board that filters by fit and holds the reasoning per lead.
  - A media kit image and the real engagement numbers, worked into a corrected kit page whose figures each link to the record behind them.

**Building & monitoring product**  
Ship product or features end to end, technical research-to-plan, code and service monitoring.

  - A whiteboard photo of the feature sketch, an alert screenshot and the service metrics, built into an interactive plan where each item expands to the evidence behind its priority.
  - An incident screenshot and the logs behind it, reconciled into a dashboard with linked views for what broke, when, and what it touched.
  - A design mock and the issue tracker, worked into a page that filters the remaining work by whether the mock actually requires it.

**Running business operations**  
Sales and CRM, invoicing and business finance, store, catalog and inventory, recurring business reporting.

  - Photographed delivery notes, a supplier invoice scan and the inventory records, reconciled into a dashboard with linked views for billed, received and still owed.
  - A handwritten stock count against the catalogue export, into an interactive reorder page that filters by what the count actually contradicts.
  - Scanned invoices and the payment records, worked into a page where each invoice expands to the evidence that it is safe to pay.

---

## Shopping  ·  8 subcategories

*Scope check: the user is buying something. Managing a business listing or auditing a brand does not belong here.*

**Hunting best deals & bargaining**  
Price hunting and haggling, including secondhand marketplaces.

  - Photos of a secondhand listing and its damage, checked against comparable sales and a loyalty rules PDF, into an interactive page that holds the offer and the walk away number.
  - Screenshots of three retailer prices and a voice note from the seller, reconciled into a dashboard comparing what the item really costs at each.
  - A photographed price tag and the account's reward balance, worked into a page that filters the options by true cost after points.

**Discovering products (style-aware, cross-retailer)**  
Deciding what to buy through style-aware discovery across retailers.

  - A photo of an outfit the user liked, a size chart and the order history, reconciled into an interactive shortlist that filters by what has actually fitted before.
  - A room photo with a measurements note, worked into a page where each candidate piece shows whether it fits the space and the stated style.
  - A saved inspiration board and retailer records, built into a dashboard linking style, price and availability across shops.

**Buying a gift**  
Gift discovery and purchase for someone else.

  - A screenshot of the recipient's wishlist, photos of past gifts and a voice note on the budget, into an interactive shortlist that filters out anything already given.
  - A group chat export agreeing a shared budget, reconciled against the records, into a page holding one gift, the split per person and who has paid.
  - Photographed hints from a conversation and the calendar, worked into a dashboard linking each candidate to the evidence it would land well.

**Handling returns, refunds & CS resolution**  
Initiate returns, exchanges or refunds and resolve disputes with customer service, including chasing a late refund.

  - Photos of the damaged item, the receipt and the returns policy PDF, reconciled against the order dates into an interactive page that filters by what is still in window.
  - Screenshots of a refund promised weeks ago and the account records, worked into a tracker where each claim expands to its evidence and its drafted chase.
  - A photographed packing slip against the order confirmation, into a page holding every mismatch and the return it justifies.

**Recurring purchases & auto-replenishment**  
Reorder staples or set up auto-replenishment.

  - A pantry photo, label photos of what is in use and the last three orders, reconciled into a dashboard linking consumption rate to reorder date.
  - A handwritten shopping list checked against the subscription records, into an interactive plan that filters out whatever is already arriving.
  - Photographed expiry dates and the purchase history, worked into a replenishment page where each item carries the cadence it earned.

**Researching & negotiating large purchases**  
Cars, TVs, appliances: deep research and negotiation support.

  - A dealer quote photographed on paper, the spec sheet and the finance offer, reconciled into an interactive page that filters the quote line by line for what was added quietly.
  - Photos of two appliances in the showroom and the running cost table, built into a dashboard linking purchase price to cost over five years.
  - A scanned trade in valuation and the household budget, worked into a page holding the counter offer and the point to walk away.

**Finding & hiring services**  
Find, compare and book a contractor, tutor, cleaner, trainer, etc.

  - Three quotes photographed on paper, the job photos and a voice note describing the work, into an interactive comparison that filters by what each quote actually includes.
  - Screenshots of availability against the household calendar, reconciled into a page holding the only slots that genuinely work.
  - A photographed certification and the records behind it, worked into a dashboard linking each trade to what is verified and what is claimed.

**Executing purchases**  
Complete a checkout or purchase flow.

  - A cart screenshot, the voucher rules document and the account balance, reconciled into an interactive checkout page showing which discounts genuinely stack.
  - A photo of the item and its size label matched to the right variant, into a page that holds the order and the evidence for every choice in it.
  - Photographed terms at the till and the saved basket, worked into a page filtering out anything the terms exclude before purchase.

---

## Personal productivity  ·  7 subcategories

*Scope check: a personal goal. Housing and home-project tasks placed here are provisional; confirm the intent.*

**Surfacing where to focus my attention**  
A cross-domain daily-priorities digest. Use only when the request spans several priorities.

  - Inbox, calendar and a photographed to do list, reconciled into a dashboard with linked views for today, this week and what quietly slipped.
  - A voice memo listing worries checked against deadlines across accounts, into an interactive digest that filters by what is genuinely blocking.
  - Screenshots of three apps the user lives in, merged into a page where every conflict expands to the two commitments behind it.

**Running the family operations hub**  
School and family email triage, action execution, logistics and a weekly brief.

  - School letters photographed at the kitchen table, a permission slip scan and the shared calendar, into an interactive week view that flags every clash and what it costs.
  - A voice note from one parent and the school emails, reconciled into a dashboard linking each action to its deadline and its owner.
  - Photographed timetables against the family records, worked into a logistics page that filters by who has to be where.

**Auditing & bulk-unsubscribing email lists**  
Rank senders by volume or engagement and bulk-unsubscribe.

  - A screenshot of the overloaded inbox, a stated keep list and the mail records, into a dashboard ranking senders by volume against what was ever opened.
  - Promotional headers captured as images grouped by sender, reconciled into an interactive page that filters the unsubscribe plan by what it actually saves.
  - A photographed list of wanted newsletters checked against sender history, into a page where each sender expands to its evidence before anything is cancelled.

**Inventorying rewards & perks**  
Loyalty points and perks inventory with expiration alerts (distinct from statement rewards in Personal finance).

  - Photos of loyalty cards, a benefits booklet scan and the account records, reconciled into a dashboard linking each perk to its expiry and its value.
  - Screenshots of three points balances merged into an interactive inventory that filters by what expires first.
  - A photographed membership statement against the memberships held, worked into a page surfacing the perks never once used.

**Scheduling & managing calendar**  
Create and manage events, find time, resolve conflicts.

  - A photographed invitation, a voice note on the week's commitments and the live calendar, into an interactive week view where each clash expands to the fix.
  - Screenshots of two shared calendars reconciled into a page that filters to the only slots that work for everyone.
  - A scanned schedule from a club against the family records, worked into a dashboard linking every recurring commitment to what it displaces.

**Retrieving & summarizing messages**  
Cross-channel "catch me up" retrieval and summaries.

  - A week away with chat, mail and a voice message, reconciled into an interactive catch up that filters by what actually needs an answer.
  - A recorded meeting and the messages that followed it, worked into a dashboard linking each decision to where it was made.
  - Screenshots of a long thread and the records behind it, into a page where every open action expands to its evidence.

**Prepping for events & activities**  
Assemble briefs and logistics ahead of an event or activity.

  - A venue confirmation photo, the guest list and a voice note on what the day needs, into an interactive run sheet that flags everything still missing.
  - Ticket screenshots and a travel plan reconciled into a dashboard linking each timing to the booking that fixes it.
  - A photographed supplier quote against the budget records, worked into a page filtering the plan by what is actually paid for.

---

## Creativity  ·  5 subcategories

*Scope check: personal creative output. Publishing for a business or brand belongs in SMB.*

**Generating images & visuals**  
Image generation, visual art and design output.

  - A sketch photographed in a notebook, a palette reference and a written brief, worked into an interactive page where each variant holds the constraint it satisfies.
  - Reference images and the stated dimensions, reconciled into a dashboard comparing the options against every rule the brief set.
  - A mood board and the project records, built into a page that filters the output by which reference it came from.

**Creating audio & video**  
Media production: audio, video, podcasts, music.

  - Raw clips, a voice note describing the cut and the shot list, assembled into an explainer video whose scenes follow the structure the note asked for.
  - An interview recording and the transcript records, reconciled into a multi scene video that carries only what was actually said.
  - A photo set and a music reference, worked into a video whose pacing is driven by the documents in the task.

**Writing creatively**  
Stories, songs, scripts, poems, creative prose.

  - Handwritten journal pages photographed, earlier drafts and a voice memo of the idea, into an interactive page where each scene links to the note it came from.
  - Character sketches as images and a plot outline, reconciled into a page that filters the draft by which thread it advances.
  - A recorded reading and the written draft, worked into a page surfacing every line where the two diverge.

**Designing & crafting**  
Arts, crafts and design projects.

  - A pattern photographed on paper, the materials to hand and a measurements note, into an interactive cut list that flags what cannot be made.
  - Photos of work in progress against the instructions, reconciled into an explainer video whose scenes show where the build went wrong.
  - A reference image and the supplies records, worked into a dashboard linking each step to what it consumes.

**Publishing creative content**  
Publishing or posting the user's own creative output (personal, not business).

  - Finished pieces as images, the platform rules and a voice note on what to say, into an interactive schedule that flags anything breaching a stated limit.
  - A portfolio screenshot and the new work, reconciled into a page that filters the published set by medium and date.
  - Photographed exhibition notes against the catalogue records, worked into a page holding each piece and its published caption.

---

## Personal finance  ·  8 subcategories

*Scope check: the user's own money. Business bookkeeping belongs in SMB.*

**Detecting & cancelling wasteful recurring charges**  
Recurring-charge detection, usage-based waste scoring, cancellation assistance.

  - Statement photos, a renewal notice screenshot and the app usage records, reconciled into a dashboard scoring each subscription by what it costs against how often it is opened.
  - A voice note on what the user thinks they pay checked against what they actually pay, into an interactive page filtering the cancellation list by saving.
  - Photographed terms from a contract and the payment history, worked into a page where each charge expands to its notice period and its exit.

**Categorizing spending & flagging anomalies**  
Auto-categorize spend, month-over-month trends, anomaly flags.

  - Receipt photos, a handwritten budget and the transaction records, reconciled into a dashboard with linked views for category, month and what drifted.
  - Three months of statements as images, worked into an interactive page that filters to the categories that quietly doubled.
  - A photographed cash log against the account records, into a page where every anomaly expands to the evidence that flagged it.

**Projecting savings goals & modeling scenarios**  
Savings-goal projection and scenario modeling against upcoming expenses.

  - A photographed quote for an upcoming cost, a voice note stating the target date and the account history, into a dashboard modelling the goal against standing payments.
  - Screenshots of two savings options and the stated plans, reconciled into an interactive page where each scenario recalculates the monthly figure needed.
  - A scanned renewal letter against the spending records, worked into a page filtering the plan by which costs are actually fixed.

**Detecting & disputing erroneous charges**  
Double or unauthorized charge detection, then the dispute (not subscription waste).

  - Two paper receipts, one faded, against sixty days of transactions and a promotion email, into an interactive page that separates a real duplicate from a hold and a settlement and drafts each dispute.
  - A signed card slip photographed at the table and the amount actually taken, reconciled into a page where every disputed charge expands to its evidence and its draft.
  - Photographed till receipts against the statement records, worked into a dashboard linking each overcharge to the rule it broke and the sum owed.

**Monitoring stocks & planning investments**  
Portfolio, stock or crypto monitoring and planning.

  - A handwritten note of holdings photographed, screenshots of two broker positions and the live records, into a dashboard with linked views for allocation, cost and exposure.
  - A voice note stating the risk the user will accept, reconciled against the current allocation, into an interactive page that filters holdings by whether they fit it.
  - A scanned statement against the portfolio records, worked into a page where each discrepancy expands to the two sources behind it.

**Monitoring statements, bills & rewards**  
Passive scan of statements, bill due dates and rates.

  - Statement scans, a rate change letter photographed and the calendar, reconciled into a dashboard linking every bill to its due date and its new cost.
  - Reward balance screenshots against the statement records, into an interactive page filtering to credits that were never applied.
  - A photographed tariff sheet and the payment history, worked into a page where each bill expands to whether the rate charged matches the rate agreed.

**Preparing taxes & financial documents**  
Tax prep, deductions, document handling.

  - Receipt photos, a rules document and the expense records, reconciled into an interactive page that filters claims by whether the evidence supports them.
  - A scanned statement set and a voice note listing claimed expenses, worked into a dashboard linking each deduction to its document.
  - Photographed mileage logs against the calendar records, into a page where every claim expands to the journey behind it.

**Paying bills & moving money**  
Execute payments, transfers and redemptions.

  - A photographed invoice, a due date letter scanned and the account balance, reconciled into an interactive page that flags anything about to be paid twice.
  - Screenshots of a redemption offer and the points held, worked into a dashboard comparing what each redemption is actually worth.
  - A scanned standing order mandate against the payment records, into a page filtering transfers by whether they are still authorised.

---

## Work productivity  ·  4 subcategories

*Scope check: the user's job, not running their own business (that is SMB).*

**Managing career & job search**  
Job applications, resume, interview prep, career advice.

  - A job advert screenshot, the current resume and an interview recording, reconciled into an interactive page that filters the gaps by what the advert actually asks for.
  - Photos of a handwritten career plan against the applications sent, worked into a dashboard linking each role to its stage and its evidence.
  - A scanned reference and the record of the work it describes, into a page where each claim expands to what supports it.

**Producing work deliverables**  
Business docs, decks (doc to slides), reports, spreadsheets, professional writing.

  - A whiteboard photo, a recorded briefing and the underlying data, worked into a dashboard whose linked views carry the argument the briefing asked for.
  - Scanned notes and the source spreadsheet, reconciled into an interactive page where every figure links to the record it came from.
  - A photographed draft with markup and the data behind it, built into a presentation of 10 to 15 slides carrying the structured narrative.

**Conducting professional research & briefings**  
Decision-ready professional or market research and briefings for work.

  - Conference slides photographed from the room, a voice note framing the question and the market records, into an interactive brief that filters findings by the decision they serve.
  - Screenshots of two vendor claims reconciled against the evidence, worked into a dashboard linking each claim to whether it holds.
  - A scanned report and the dataset behind it, into a page where every recommendation expands to its source.

**Managing work communications**  
Work email and chat triage, action-item capture, work meeting scheduling.

  - A meeting recording, the thread that followed and the calendar, reconciled into an interactive action board that filters by owner and deadline.
  - Inbox screenshots triaged against the records, worked into a dashboard linking what to answer now to what it blocks.
  - A photographed note from a call checked against the written record, into a page surfacing every commitment only one side captured.

---

## Research  ·  5 subcategories

*Scope check: a subject label is not enough. If the topic is owned by another use case (Shopping, Travel, etc.), use that one.*

**Answering factual questions**  
Quick lookups, fact-checking, definitions.

  - A claim photographed from a printed page, a screenshot of a disputed figure and the records that settle both, into an interactive page where each answer expands to its source.
  - A voice note asking three related questions, reconciled against the evidence, into a page that filters answers by how well sourced they are.
  - A scanned infographic against the underlying data, worked into a dashboard showing where the graphic overstates it.

**Researching a topic in depth**  
Multi-source synthesis or deep research on a topic.

  - A document set, a recorded briefing and a chart image, synthesised into a dashboard with linked views for what is agreed, disputed and unsupported.
  - Photographed pages from two references reconciled into an interactive page that filters claims by which source backs them.
  - A scanned study and the dataset behind it, worked into an explainer video whose scenes walk the finding and its limits.

**Monitoring news & topics**  
News briefings, ongoing topic or trend monitoring, weather.

  - Headline screenshots across a week, a clipped article photographed from print and the records, into a dashboard linking each development to what actually moved.
  - A voice note naming the topics to watch, reconciled against the coverage, into an interactive brief that filters by topic and date.
  - A photographed forecast against the recorded conditions, worked into a page where each divergence expands to both sources.

**Comparing & evaluating options**  
Structured comparison of options when the topic is not Shopping or another named use case.

  - Two proposal scans, a criteria document and a recorded discussion of priorities, into an interactive comparison that reweights as the criteria are toggled.
  - Photographed spec sheets reconciled against the records, worked into a dashboard linking each option to the differences that matter.
  - A scanned tender and the evaluation notes, into a page where every score expands to the evidence behind it.

**Summarizing & analyzing provided material**  
Condense or analyze user-provided documents or data for information (not a work deliverable).

  - A long scanned report, a recording about it and the dataset it refers to, reconciled into an interactive page that filters findings by section.
  - Photographed pages and the data behind them, worked into a dashboard with linked views for claim, evidence and gap.
  - Screenshots of a dense thread, into an explainer video whose scenes carry the argument and what supports it.

---

## Entertainment  ·  5 subcategories

*Scope check: amusement or leisure. Creating media alone does not establish entertainment intent.*

**Playing games & interactive fun**  
Games, trivia, roleplay, interactive fiction.

  - A board state photographed mid game, the rules PDF and a voice note on the house rules, into an interactive page that resolves the position and explains the legal moves.
  - A scanned rule book and a disputed play reconciled against the records, worked into a page where each ruling expands to the clause behind it.
  - Photographed score sheets across a season, into a dashboard linking every player to their record.

**Discovering & discussing media**  
Movies, TV, music and books: discovery and discussion (consuming, not creating).

  - A photographed bookshelf, screenshots of three recommendations and the watch history, reconciled into an interactive shortlist that filters out anything already finished.
  - A voice note on what the user liked and why, worked into a dashboard linking each suggestion to the reason it fits.
  - A scanned review clipping against the records, into a page where each title expands to what was actually said about it.

**Following sports & fandom**  
Following sports, scores, fandom, sports analytics for fun.

  - A photographed fixture list, a scoreboard screenshot and the results record, into a dashboard with linked views for form, table and what is still possible.
  - A voice note predicting the table reconciled against the standings, worked into an interactive page that scores the prediction week by week.
  - Photographed ticket stubs against the attendance records, into a page filtering matches by what the user actually saw.

**Pursuing hobbies & projects**  
Hobby tracking and personal leisure projects (gardening, crafts for fun, DIY).

  - Photos of the plot across the season, the planting notes and a voice note on where it stalled, into a dashboard linking each bed to what it produced.
  - A handwritten project log and the receipts, reconciled into an interactive page that filters spend by stage of the build.
  - Photographed instructions against the progress pictures, worked into an explainer video whose scenes show the step that went wrong.

**Finding things to do**  
Local activities, outings and events for leisure.

  - A poster photographed in the street, screenshots of three listings and the calendar, into an interactive page that filters outings by cost and travel time.
  - A voice note on what the group enjoys reconciled against the records, worked into a dashboard linking each option to who it suits.
  - A scanned programme against the diary, into a page where every clash expands to both commitments.

---

## Travel  ·  5 subcategories

*Scope check: a trip. Local leisure without a travel context belongs in Entertainment.*

**Planning trips**  
Multi-component itinerary planning (two or more of lodging, transport, activities).

  - Booking confirmations as screenshots, a photographed map with marks on it and a voice note on the plan, into an interactive itinerary that flags every impossible connection.
  - Two draft plans and the budget document, reconciled into a dashboard comparing cost, travel time and what each one cuts.
  - A scanned reservation against the calendar records, worked into a day by day page where each leg expands to its evidence.

**Booking transport**  
Flights, trains, car or navigation for a trip.

  - A confirmation screenshot, a photographed timetable and the booked lodging, reconciled into an interactive page that flags connections that cannot be made.
  - A voice note on arrival constraints applied to the options, worked into a dashboard linking each route to its cost and its risk.
  - A scanned ticket against the booking records, into a page where every leg expands to what it depends on.

**Booking accommodation**  
Hotels, rentals, lodging.

  - Listing photos, a screenshot of the cancellation terms and the stated requirements, into an interactive shortlist that filters by what genuinely meets them.
  - A voice note on who is travelling reconciled against the room options, worked into a dashboard linking each stay to cost per person.
  - A photographed confirmation against the trip dates, into a page flagging every night that is not actually covered.

**Discovering activities & dining**  
Things to do and restaurants while traveling.

  - A photographed menu, a dietary note and screenshots of opening hours, reconciled into an interactive day plan that filters by what is reachable and edible.
  - A voice note on the pace they want, worked into a dashboard linking each activity to its travel time and cost.
  - A scanned guide against the itinerary records, into a page where each suggestion expands to why it fits that day.

**Assisting in-trip in real time**  
Delays, directions, rebooking during the trip.

  - A delay notice photographed at the gate, a screenshot of the lodging terms and the onward booking, into an interactive page holding each rebooking option and what it costs.
  - A voice note from the road reconciled against the live records, worked into a revised itinerary where every change expands to its reason.
  - A photographed disruption notice against the ticket conditions, into a dashboard linking each entitlement to the evidence for it.

---

## Health / Fitness  ·  8 subcategories

*Scope check: all health inputs must be mocked or synthetic (section 1.2.2). Emotional support is out of scope.*

**Becoming generally healthier**  
Open-ended "get healthier" with no specific target: habits, nudges, a holistic plan.

  - A synthetic activity export, a photographed habit tracker and a voice note on what keeps failing, into a dashboard linking each habit to the week it actually held.
  - Screenshots of three trackers merged into an interactive page that filters the plan by effort against effect.
  - A photographed routine against the recorded data, worked into a page where each nudge expands to the evidence behind it.

**Losing weight**  
Weight-loss program: targets, tracking, adjustment over time.

  - A photographed food diary, meal photos and the synthetic weight log, reconciled into a dashboard linking intake to the trend and showing where the log is incomplete.
  - A voice note stating the target checked against the trend, into an interactive page that recalculates the plan as the target moves.
  - Photographed portion sizes against the logged intake, worked into a page surfacing every day the two disagree.

**Optimizing sleep**  
Sleep, HRV and readiness analysis and optimization.

  - A synthetic sleep export, a photographed evening routine and the calendar, into a dashboard with linked views for duration, readiness and what the bad nights share.
  - Screenshots of readiness scores reconciled against the diary, worked into an interactive page filtering nights by what preceded them.
  - A voice note describing the nights against the recorded data, into a page where each discrepancy expands to both sources.

**Planning & critiquing workouts**  
Workout plans, video form analysis, RPE/1RM, scheduling.

  - A lift video, a photographed programme and the training log, reconciled into an explainer video whose scenes show the form fault and the correction.
  - A voice note on how the week felt applied to the synthetic session data, into an interactive plan that reschedules as load is adjusted.
  - Photographed session notes against the records, worked into a dashboard linking volume to the sessions actually completed.

**Planning nutrition & meals**  
Macro targets, calendar-aware and allergy-aware meal plans.

  - A fridge photo, a photographed label and a stated allergy list, reconciled against the calendar into an interactive meal plan that filters out anything unsafe.
  - A voice note on the week ahead worked into a dashboard linking each meal to its macros and its shopping.
  - Photographed packaging against the macro targets, into a page where every product expands to whether it fits.

**Monitoring wearables & vitals**  
Device data review, anomaly detection (not sleep or a named condition).

  - A synthetic device export, a photographed log and screenshots of a second device, reconciled into a dashboard surfacing every day the two disagree.
  - A voice note on what the user noticed compared against the measured data, into an interactive page filtering anomalies by confidence.
  - Photographed readings against the recorded series, worked into a page where each flag expands to its evidence.

**Managing chronic conditions & medication**  
Condition trends, threshold alerts, medication and refill reminders.

  - Photographed medication labels, a scanned care plan with thresholds and the synthetic readings, into a dashboard linking each threshold breach to the dose around it.
  - A voice note on missed doses reconciled against the record, worked into an interactive schedule that flags every gap and its refill.
  - Photographed packaging against the prescription records, into a page where each discrepancy expands to both sources.

**Navigating medical care**  
Insurance and coverage, claims, prior authorization, appointments, understanding medical information.

  - A synthetic claim letter scanned, a benefits booklet and a denial notice, reconciled into an interactive page that filters each charge by whether cover applies.
  - A photographed appointment card against the calendar, worked into a dashboard linking every appointment to its prep and its authorisation.
  - A scanned statement of benefits against the claim records, into a page where each disputed amount expands to the clause behind it.

---

## Learning  ·  5 subcategories

*Scope check: broader than visual learning; the task still has to meet the multimodal requirement.*

**Explaining concepts & how-to**  
Explain how something works or how to do it, step by step.

  - A diagram photographed from a manual, a recorded demonstration and the written steps, reconciled into an explainer video whose scenes follow what both actually show.
  - Screenshots of a process that failed worked into an interactive page where each step expands to what went wrong there.
  - A scanned schematic against the records, into a dashboard linking each component to its function.

**Tutoring & coursework**  
Homework help, coursework, subject tutoring.

  - A photographed worked answer, the marking scheme and the assignment brief, reconciled into an interactive page that filters the lost marks by topic.
  - A voice note on what the student finds hard applied to the coursework, worked into a dashboard linking each weakness to its evidence.
  - Scanned feedback against the submitted draft, into an explainer video whose scenes walk the correction.

**Preparing for tests & studying**  
Exam prep, study plans, flashcards, practice questions.

  - A photographed syllabus, scanned past papers and the results record, into an interactive study plan that reweights as topics are marked confident.
  - Handwritten notes photographed from a pad, reconciled into a dashboard linking each topic to its practice questions and its score.
  - A scanned timetable against the calendar records, worked into a page filtering revision by what fits before the exam.

**Learning a language**  
Language practice, vocabulary, grammar, conversational drills.

  - A recorded attempt at speaking, a photographed textbook page and the vocabulary records, into an interactive drill set that filters by the errors actually made.
  - Screenshots of a progress record reconciled against the recordings, worked into a dashboard linking each weakness to its exercise.
  - Photographed flashcards against the covered material, into a page surfacing every word drilled before it was taught.

**Building skills & practice**  
Guided practice to build a non-academic skill.

  - A video of an attempt, the technique reference and a photographed practice log, reconciled into an explainer video whose scenes show the correction and the next drill.
  - A voice note on where the user is stuck applied to the record, into an interactive plan that adapts as sessions are logged.
  - Photographed session notes against the goal, worked into a dashboard linking practice time to measured progress.

---

