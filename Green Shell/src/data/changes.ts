import type { GuidelineChange } from "./types";

/**
 * What a contributor has to do differently, and why. Two sources feed it:
 * the Version History table and the [NEW] callouts of
 * `[External] Green Shell – Guidelines .md`, which is the source of truth for
 * everything Green Shell changed against the Red Shell project it replaced;
 * and anything the client flags afterwards, which arrives as a note to the
 * team rather than as a guidelines revision.
 *
 * A client flag carries `version: "Client flag"` in place of a guidelines
 * version, because the guidelines have not moved, and it leaves `before`
 * unset: the renderer labels that field "In Red Shell", which is wrong for a
 * rule about how Green Shell tasks are being built right now. Its `refs` still
 * name the sections the rule applies in, so the reader can check us.
 *
 * This is not the version history. An entry earns its place only by changing
 * what a contributor does, which is why every one carries `does`. `before`
 * names the Red Shell rule being replaced, because most readers of this page
 * are arriving with the old one in their head.
 *
 * `refs` lists every section the rule touches rather than one, so a reader can
 * open the guidelines at the right place instead of searching. The section
 * numbers come from the Version History row, which maps each update to the
 * sections it was applied in.
 *
 * `detail` is supporting context and is optional on purpose. It is there where
 * the rule is easy to misread, and absent where the rule explains itself.
 *
 * `example` is the mistake as it showed up, and every client flag carries one:
 * a flag is a pattern the client found in delivered tasks, and a contributor
 * recognises it in their own task from the case faster than from the rule. It
 * is written as a generic case and never names a task, a task id or a persona.
 *
 * The Oct 27 flags come from the client's review of the Oct 26 single turn
 * delivery: golden against rubric, link code, dates and thresholds, all
 * `hard`. The review's fifth flag, graded files missing from the task inputs,
 * is left out: it was a mistake in bundling the delivery, not in the
 * contributors' work, so there is nothing for a contributor to do about it.
 * The client's single turn task design recommendations of the same day are
 * left out on purpose too: they are not in effect yet, and several run against
 * the guidelines as they stand.
 *
 * The Nov 1 flag is the client's rejection of 44 tasks, 30% of the total
 * delivery, for complexity that came from a stretched rubric rather than the
 * scenario. Its rule is already the Complexity Bar section of the guidelines.
 *
 * The Nov 2 flags are two. Dates a live server is searched on, such as a
 * Duffel flight, need at least a month of room, or the task can no longer run
 * when the client reviews it. And a criterion never requires a live price, rate
 * or availability as a fixed figure: that one is the guidelines' own dynamic
 * values rule (5.1, 8.3.1), restated as a flag to reinforce it, not a new rule,
 * and the `dynamic-values` entry below stays as the record of it.
 *
 * The Nov 11 entries are the v3 revision of the guidelines, which put the
 * task in the platform's order: the golden runs first, 8 pass@k runs follow on
 * their own and replace Leg A, all 8 are graded against the rubrics (average
 * between 0.3 and 0.7), and ratings are verified on the first valid Opus run.
 * They leave `before` unset for the same reason the flags do: the rule they
 * replace was Green Shell's own, not Red Shell's. `failure-threshold` keeps its
 * id and now carries the pass@k range, because the Oct 8 notice links to it
 * and the 30% rule it used to state is gone.
 *
 * Newest first.
 */
export const guidelinesVersion = { version: "Green Shell v3", updated: "Nov 11, 2026" };

/**
 * The `version` a client flag carries, in place of a guidelines version. Read
 * rather than typed, because anything counting the guidelines rule set on its
 * own has to exclude these and a second copy of the string would drift.
 */
export const clientFlagVersion = "Client flag";

export const guidelineChanges: GuidelineChange[] = [
  {
    id: "golden-first",
    date: "Nov 11, 2026",
    version: "Green Shell v3",
    title: "The golden runs first, and both rubric blocks are built from it",
    body: "The golden is now the first run of the task, before the pass@k runs and before any rubric exists. When it came last, many goldens failed their own rubrics: the rubric was already written, and feasibility limits kept the expected solution out of reach. Building it first proves what the task can achieve in this universe, with these inputs, and every criterion is then built from that validated golden.",
    does: "Run the golden as soon as the setup is done: steer with intent-level hints until the model reaches the ideal response, and check every output against your GTFA before you complete the conversation. Where they differ, fix whichever side is wrong, and if the universe cannot deliver what the prompt asks, fix the task and restart the golden. Download its trajectory and final artifacts, then build both rubric blocks from it. A criterion the golden could not satisfy is a broken criterion, not a harder task.",
    refs: [
      { section: "Project Overview", title: "The golden comes first" },
      { section: "Task Workflow", title: "The workflow has a new order" },
      { section: "3", title: "Golden Solution" },
      { section: "3.1", title: "Why the Golden Comes First" },
      { section: "3.5", title: "Before You Wrap the Golden Up" },
      { section: "5.6", title: "Final Rubric Checklist" },
    ],
    impact: "hard",
    links: [
      { to: "/#golden", tag: "M7", label: "Point at the intent. Never at the answer" },
      { to: "/#rubrics", tag: "M9", label: "Criteria built from the golden and the GTFA" },
    ],
  },
  {
    id: "pass-at-k-runs",
    date: "Nov 11, 2026",
    version: "Green Shell v3",
    title: "Leg A is gone: 8 pass@k runs follow the golden on their own",
    body: "Once the golden is complete, 8 pass@k runs launch automatically on the same prompt, word for word: 4 on Claude Opus 5.5 and 4 on Muse Wonder 1.1, each answering once with no follow-ups. They replace the single Leg A run. Nothing is needed from you while they run, which usually takes 15 to 20 minutes. The first valid Opus run, the first of the four Opus runs to complete without errors, is the reference run: where the platform says Model A, it means this run.",
    does: "Use the 15 to 20 minutes to plan the rubric from the golden and your GTFA, walking the prompt for every ask that needs a criterion. Once the first valid Opus run finishes, download its trajectory and final artifacts. Retry or replace any run that fails or ends with an error: a broken run is never a model failure.",
    refs: [
      { section: "Task Workflow", title: "The workflow has a new order" },
      { section: "4", title: "Pass@k Generation" },
      { section: "4.1", title: "The Reference Run" },
      { section: "4.2", title: "Valid vs. Invalid Model Failures" },
    ],
    impact: "hard",
    links: [
      { to: "/#passk", tag: "M8", label: "Eight runs start on their own" },
    ],
  },
  {
    id: "failure-threshold",
    date: "Nov 11, 2026",
    version: "Green Shell v3",
    title: "The average score of all 8 runs falls between 0.3 and 0.7",
    body: "Once both rubric blocks are built, Grade runs grades all 8 pass@k runs against them. The average score across the 8 has to fall between 0.3 and 0.7, as the client expects. It replaces the old rule that Model A fail at least 30% of the objective weight. The score has to come from genuine, meaningful rubrics aligned with the golden: no rubric stretching, no artificial criteria and no other manipulation to reach the range.",
    does: "Grade the runs once the rubric is final and check the average yourself: the panel is shown for information and does not block submission. Above 0.7, the task is too easy, so revisit the scenario's complexity, never the rubric set. Below 0.3, check first that every criterion accepts every valid answer and that no run broke, then revisit the scenario. Change a criterion only to fix a genuine defect, and grade the 8 runs again after any change.",
    refs: [
      { section: "Hard Client Requirements", title: "Pass@k score in range" },
      { section: "Complexity Bar", title: "The pass@k range is part of the bar" },
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "7.1", title: "Grading All 8 Runs" },
    ],
    impact: "hard",
    detail: {
      label: "Reading the score",
      items: [
        "Grading results shows the average as the mean score, as a percentage: 66% is 0.66. To check it, add the eight run scores and divide by 8. With four graded runs per model, that is the midpoint of the two means: an Opus mean of 0.74 and a Muse mean of 0.52 give 0.63, inside the range.",
        "Selecting a preferred run has no impact. All 8 runs are generated and all 8 are graded, whichever run is marked as preferred.",
        "A criterion added, dropped, reworded or reweighted only to move the average into range is manipulation, whichever way it moves the score.",
        "Where the assigned scenario is too simple to bring the average down to 0.7 or below, its complexity may be raised, and only as far as needed, while every other parameter stays as assigned.",
        "A change to the prompt or the inputs means a new golden and new pass@k runs, because every run uses the same prompt word for word.",
      ],
    },
    links: [
      { to: "/#failure", tag: "M11", label: "Read the score. Never tune the rubric to it" },
      { to: "/failure-approach", tag: "FA", label: "How Opus actually fails, case by case" },
    ],
  },
  {
    id: "reference-run-ratings",
    date: "Nov 11, 2026",
    version: "Green Shell v3",
    title: "Ratings are made on the first valid Opus run, and prefilled ones are never trusted",
    body: "Present and Not Present are rated against the first valid Opus run, the reference run, in both rubric blocks. Never rate the golden, or whichever run is marked as preferred, in its place. The rating steps arrive prefilled with the agentic judge's verdicts on that run, and those values are a starting point only: validating each one is your responsibility.",
    does: "Download the first valid Opus run, its trajectory and its final artifacts, and review its outcomes. Verify every prefilled rating against them: for each Not Present, find the line, value or state change that fails it, and for each Present, the evidence that satisfies it. Correct every inaccurate or unsupported rating, and justify every failure in three parts. If the judge misread a criterion because it can be read two ways, fix the criterion and grade the 8 runs again.",
    refs: [
      { section: "4.1", title: "The Reference Run" },
      { section: "7.2", title: "Rating the Reference Run and Justifying the Failures" },
      { section: "7.3", title: "Rating the Subjective Block and Justifications" },
    ],
    impact: "hard",
    detail: {
      label: "On the platform",
      items: [
        "Present - Green is a present positive criterion, Present - Red a present negative one, and Not Present - Grey a criterion of either kind that is not present.",
        "The subjective block is rated on the same reference run, looking at its rendered artifact. There is no second set to rate for the golden.",
      ],
    },
    links: [
      { to: "/#failure", tag: "M11", label: "Verify every prefilled rating" },
    ],
  },
  {
    id: "validators",
    date: "Nov 11, 2026",
    version: "Green Shell v3",
    title: "Validators flag, you decide",
    body: "The Multimodal Checklist comes right after the inputs upload, while anything it flags is still cheap to fix. The Prompt, Trajectory, Objective Rubric and Subjective Rubric validators then flag possible issues along the way. A flag is a review signal, not a conclusion, and the same goes for the Auto-Generated Summary and the Rubric Generator Preview: they are starting points, never ground truth.",
    does: "Answer the checklist as soon as the upload is done. Check every validator flag against the task, the inputs and the Guidelines, and change only what is genuinely wrong. Check every value in a generated summary or preview against your GTFA and the inputs before you keep it.",
    refs: [
      { section: "Task Workflow", title: "Validators flag, you decide" },
      { section: "2.2", title: "Upload Folders" },
    ],
    impact: "shape",
    links: [
      { to: "/#passk", tag: "M8", label: "Read the validators' flags as signals" },
    ],
  },
  {
    id: "flag-live-dates",
    date: "Nov 2, 2026",
    version: clientFlagVersion,
    title: "Dates searched on a live server need at least a month of room",
    body: "Some services answer from a live server, not from stored universe records, and Duffel is the clearest case: flight offers expire, and a flight whose date has passed can no longer be searched. A scenario set on a date in the past, or only days ahead, works the day it is written and is impossible to run by the time the client reviews it. Stating the date does not help here, because the server itself no longer answers for it. New in this review.",
    example: [
      "The task is written on Oct 20. The user asks for a direct flight to Lisbon on Friday, Oct 30, landing before 6 pm, and the criteria grade the flight the run picks against those rules.",
      "On Oct 20 Duffel still returns offers for Oct 30, and the golden passes.",
      "The client reviews the task in mid November. Oct 30 has passed, Duffel no longer returns flights for it, and no run can meet the criteria, however good it is.",
    ],
    does: "While you design the scenario, find which of the services it depends on answer from a live server, such as Duffel for flights. Put every date the agent has to search or book on them at least a month after the day you write the task: the flight, the stay, the booking. Avoid dates in the past and dates only days or weeks ahead, which may still work on the day you write the task but not when the client reviews it. State that date in the prompt as usual, and grade the rules the choice has to meet rather than one offer, because offers expire.",
    refs: [
      { section: "1.2.1", title: "Start With the Universe" },
      { section: "1.2.5", title: "Common Scenario Issues Getting Tasks Rejected" },
      { section: "8.3", title: "The Services in the Universe" },
    ],
    impact: "hard",
    links: [
      { to: "/#scenario", tag: "M3", label: "Dates on a live server sit at least a month ahead" },
      { to: "/alignments#flag-dates", tag: "UA", label: "Anchor the prompt and the rubric to a stated date" },
    ],
  },
  {
    id: "flag-dynamic-values",
    date: "Nov 2, 2026",
    version: clientFlagVersion,
    title: "A live value is graded as retrieved, never as a fixed figure",
    body: "Rubrics required fixed values for information that changes on its own, such as live prices, rates and availability. A model that fetches the correct, current value then fails a criterion that still expects the figure from the day the task was written. This is not a new rule: it has been in the Guidelines from the start, and it is reinforced here because a correct, up to date answer must never fail.",
    example: [
      "The prompt asks to convert a €1,240 invoice into dollars at today's exchange rate, and a criterion requires the total to be $1,345.40, the figure the rate gave the day the task was written.",
      "A week later the rate has moved. A run that fetches the current rate correctly reports $1,359.04 and fails the criterion.",
      "The model did exactly what the prompt asked, with up to date information, and the rubric marked it wrong for not repeating an outdated value.",
    ],
    does: "Go through every criterion that names a value the model has to fetch live, from the web or from a live server: a price, a rate, a fare, a seat or room count. Grade the retrieval and what the model does with it, never the frozen figure: “invoice_summary.md converts the €1,240 invoice at the EUR to USD rate retrieved during the run (e.g., 1.085, giving $1,345.40)”. Your figure goes in parentheses as an example, and the file, the item and the source stay named so the criterion can still be rated with the prompt closed. Fixed values stay fixed: anything from an attachment, a universe record or the GTFA still has to match its source exactly.",
    refs: [
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.6", title: "Final Rubric Checklist" },
      { section: "8.3.1", title: "The Built-in Tools" },
    ],
    impact: "hard",
    links: [
      { to: "/#rubrics", tag: "M9", label: "Grade the retrieval, not the figure" },
      { to: "/reference#dynamic-values", tag: "WN", label: "The rule as the Guidelines have set it from the start" },
      { to: "/reference#s6", tag: "F9", label: "No criterion pinned to a value that can change" },
      { to: "/spec#rubric-quality", tag: "QC", label: "Overfitting and Underfitting" },
    ],
  },
  {
    id: "flag-genuine-complexity",
    date: "Nov 1, 2026",
    version: clientFlagVersion,
    title: "Complexity has to come from the scenario, not from a stretched rubric",
    body: "The client rejected 44 tasks, 30% of the total delivery, because they were not genuinely complex. The scenarios were simple enough for the model to handle, and the rubrics were stretched until it failed: criteria graded things the user never asked for, or accepted one answer where several were right. The model failed the rubric, not the task, and the client does not count those as failures. New in this review.",
    example: [
      "The scenario is a simple lookup: find the dentist appointment in this week's emails and put it on the calendar. The run does it correctly.",
      "To make it fail, criteria then grade what the user never asked for: the event title in one exact wording, a reminder exactly 30 minutes before, the clinic's phone number in the notes.",
      "The criteria the run passed are left out, so its misses weigh more. The score looks hard enough, and the task is still a simple lookup.",
    ],
    does: "Build the complexity into the scenario itself, while you design it, before the first run. Give it a situation that is hard because of what the agent has to find, read and reconcile: a later email that corrects an earlier one, a rule kept in a document rather than the prompt, a detail that only shows in a photo. Then write criteria only for what the prompt, its inputs and the universe require, build them from the golden and your GTFA, cover what the runs get right as well as what they miss, and check that each one passes every valid answer. If honest criteria still put the average of the 8 pass@k runs above 0.7, make the scenario harder, never the rubric.",
    refs: [
      { section: "Complexity Bar", title: "Genuine complexity and the pass@k range" },
      { section: "Hard Client Requirements", title: "Pass@k score in range" },
      { section: "1.2", title: "Building the Idea" },
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "7.1", title: "Grading All 8 Runs" },
      { section: "7.2", title: "Rating the Reference Run and Justifying the Failures" },
    ],
    impact: "hard",
    links: [
      { to: "/#scenario", tag: "M3", label: "Complexity is planned, never patched in" },
      { to: "/#rubrics", tag: "M9", label: "Criteria only for what the request requires" },
      { to: "/failure-approach", tag: "FA", label: "Real Opus failures to build the scenario around" },
    ],
  },
  {
    id: "flag-golden-agrees",
    date: "Oct 27, 2026",
    version: clientFlagVersion,
    title: "The golden has to pass its own rubric",
    body: "The golden is meant to be an answer that passes every criterion. When it contradicts one, either the rubric or the golden is wrong, and the client cannot tell which side to trust. This was flagged in an earlier report, and it came back.",
    example: [
      "The prompt asks which of two shipping options to go with, and a criterion requires the answer to end with one recommended option.",
      "The golden says not to commit to either option yet.",
      "Another criterion expects Saturday evening drop-off hours, and the golden's table only lists Sunday hours.",
    ],
    does: "Build every criterion from the golden and your GTFA, and point at the place in the golden where it passes each one. Where it fails one, decide which side is wrong and fix that side: rewrite the criterion if it misreads the prompt, the inputs or the data, and steer again if the golden missed a valid requirement. After any fix to the prompt, the rubric or the golden, rate the golden against every criterion again.",
    refs: [
      { section: "5.6", title: "Final Rubric Checklist" },
      { section: "3.5", title: "Before You Wrap the Golden Up" },
    ],
    impact: "hard",
    links: [
      { to: "/#golden", tag: "M7", label: "The golden and the GTFA agree" },
      { to: "/reference#s5", tag: "E1", label: "The golden passes the complete set" },
    ],
  },
  {
    id: "flag-link-code",
    date: "Oct 27, 2026",
    version: clientFlagVersion,
    title: "No link code in the prompt or the criteria",
    body: "Some editors turn file names and website names into markdown links as you paste. The prompt or the criterion then carries link code instead of the plain name, so the agent reads a garbled request and a criterion no longer matches the real file name. Website names were flagged in an earlier report, and file names came back.",
    example: [
      "Written: please tidy up drafts.md",
      "Delivered: please tidy up [drafts.md](http://drafts.md)",
      "In a criterion, trip_notes.md came out as trip\\_[notes.md](http://notes.md). File names ending in .md are especially prone to it, because many editors read them as web addresses.",
    ],
    does: "Before you submit, search the prompt and every criterion for ](http and for \\_, and replace each match with the plain text. Check the prompt as the platform shows it, not only your own draft, because the conversion often happens when you paste it in.",
    refs: [
      { section: "1.2.3", title: "Create the Prompt" },
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.6", title: "Final Rubric Checklist" },
    ],
    impact: "hard",
    links: [
      { to: "/#rubrics", tag: "M9", label: "Search for link code before you submit" },
      { to: "/reference#literal-matching", tag: "WN", label: "Every literal has to match its source exactly" },
    ],
  },
  {
    id: "flag-dates",
    date: "Oct 27, 2026",
    version: clientFlagVersion,
    title: "Anchor the prompt and the rubric to a stated date",
    body: "Two problems, both new. A rubric assumed a today the prompt never stated: tonight, tomorrow or in time have one right answer only if the agent knows what day it is, and otherwise it goes by the day the task actually runs. And criteria graded records that expire, so once the date passed a correct run could no longer use them.",
    example: [
      "The prompt asks which gifts will arrive in time for book club tonight. A criterion checks delivery against Saturday, Oct 24, and nothing in the prompt says today is Saturday, Oct 24.",
      "Two criteria grade flight offers whose data says they expire on Oct 21. Every run after that date is graded on offers that have already expired.",
    ],
    does: "State today's date in the prompt, in the user's voice, matching the date the universe calendar and records assume: “it's saturday the 24th and book club is tonight at 7”. Write criteria with fixed dates, “arrives by Saturday, Oct 24”, never relative ones. If a criterion depends on anything that can expire, such as an offer, a quote, a hold or availability, open the data and check the expiry date. If it lapses before or soon after delivery, pick a record that stays valid or rework the criterion.",
    refs: [
      { section: "1.2.1", title: "Start With the Universe" },
      { section: "1.2.3", title: "Create the Prompt" },
      { section: "5.1", title: "Rubric Fundamentals" },
    ],
    impact: "hard",
    links: [
      { to: "/#prompt", tag: "M5", label: "State today's date in the prompt" },
      { to: "/#universe", tag: "M2", label: "Anchor to dates you have actually seen" },
    ],
  },
  {
    id: "flag-thresholds",
    date: "Oct 27, 2026",
    version: clientFlagVersion,
    title: "A correct answer must never fail a criterion",
    body: "A task set its rule one way and the rubric counted it another, with a value sitting exactly on the line. More than one answer was then correct, and the criterion accepted only one. New in the last delivery.",
    example: [
      "The user's message sets the rule “only if it stays below 40 degrees out there”, and a criterion expects 23 of 30 daily highs above 40.",
      "One day's high is exactly 40. It is not below 40, so by the user's own rule it belongs with the days above, but the criterion's above 40 leaves it out.",
      "A run that follows the user's rule answers 24, which is just as right, and fails.",
    ],
    does: "Use the same boundary in the prompt, the inputs and the rubric: a rule of below 40 is counted as 40 or above, not above 40. Look in the data for values sitting exactly on a threshold, and either settle how they count or accept both answers. Then test the criterion both ways: two valid answers pass and a wrong one fails.",
    refs: [
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.1.2", title: "Stacked Rubrics (OR Logic)" },
      { section: "5.6", title: "Final Rubric Checklist" },
    ],
    impact: "hard",
    links: [
      { to: "/#rubrics", tag: "M9", label: "Use the user's own boundary" },
      { to: "/spec#rubric-quality", tag: "QC", label: "Overfitting and Underfitting" },
    ],
  },
  {
    id: "binding-parameters",
    date: "Oct 8, 2026",
    version: "Green Shell v1",
    title: "All fourteen assigned parameters are binding",
    before:
      "Red Shell assigned four: task type, category, subcategory and universe. The rest of the brief was treated as guidance.",
    body: "Fourteen parameters are assigned with every task: the task type, the use case and subcategory, the universe, the scenario, the assigned tools, the output artifact, the primary and secondary capabilities, the input and output modalities, the execution target, the verification condition, and the access the scenario assumes. All of them have to be followed exactly and visible in the finished task. Omitting, substituting or drifting from any one makes the task invalid.",
    does: "Plan from the parameter sheet, and check the finished task against every line of it before you submit, not just the category pair. Deviate only where the universe genuinely cannot support a parameter or the scenario is too simple to bring the average pass@k score down to 0.7 or below, and only as far as that strictly needs.",
    refs: [
      { section: "Hard Client Requirements", title: "Task parameters are mandatory" },
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.1.2", title: "Rest of the Parameters" },
    ],
    impact: "hard",
    detail: {
      label: "What counts as drift",
      items: [
        "Producing a different artifact than the one assigned, even a better one.",
        "Exercising a capability the brief did not name, in place of one it did.",
        "Reworking the scenario into a different kind of situation. Adjusting it for complexity is allowed, changing its core nature and intent is not.",
        "Leaving an assigned input modality out, or asking for output outside the output modalities: audio when only text is listed is drift.",
        "Depending on a write to a service the scenario only assumes read access to.",
        "Drifting because the universe seemed unable to support the scenario, when exploring it would have shown it could. That fails the task automatically.",
      ],
    },
    links: [
      { to: "/#parameters", tag: "M1", label: "Fourteen are assigned. None of them is a suggestion" },
      { to: "/reference#pre-submit", tag: "GATE", label: "A1 checks every one of them" },
    ],
  },
  {
    id: "input-diversity",
    date: "Oct 8, 2026",
    version: "Green Shell v1",
    title: "Images have to be worth looking at, not only worth reading",
    body: "The client went through the image inputs across the project and found roughly 95% of them were text in picture form: screenshots of documents, emails and threads. The guidelines now ask for most images to need genuine visual interpretation, and for the inputs to cover every assigned input modality. This bites hardest where the assigned input modalities include images, which is where a reviewer looks first.",
    does: "Before attaching an image, ask what the model has to do with it. If the answer is read the words, it is a document, so make it one and spend the image slot on something that has to be looked at.",
    refs: [
      { section: "Hard Client Requirements", title: "Multimodal" },
      { section: "1.1.2", title: "Rest of the Parameters" },
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
    ],
    impact: "shape",
    detail: {
      label: "Images that carry visual information",
      items: [
        "Photos of physical objects, products, receipts and real environments, where the state of the thing is the fact.",
        "Charts, graphs, diagrams, maps and visual layouts, where the reading comes from the shape rather than from a label.",
        "Images the model has to identify, compare, measure or reason about, instead of lifting a string out of.",
        "A screenshot is still right where the document itself is the evidence. What the client flagged is an image set made of nothing else.",
        "Diversity is not a quota. An interpretive image that carries no part of the answer is decoration, and every file still has to earn its place.",
      ],
    },
    links: [
      { to: "/#inputs", tag: "M4", label: "An input set where each file earns its place" },
      { to: "/reference#input-floor", tag: "WN", label: "Three inputs is a floor, and it is enforced" },
      { to: "/spec#input-artifacts", tag: "QC", label: "Realism, safety and the input floor" },
    ],
  },
  {
    id: "planned-complexity",
    date: "Oct 8, 2026",
    version: "Green Shell v1",
    title: "Complexity is planned, never patched in",
    body: "Complexity has to come from a natural, well planned scenario rather than from artificial friction, extra constraints or contrived inputs. Do not improvise the task as you go, and do not wait for the model to fail before deciding to add difficulty. The guidelines set the expectation at a minimum of two hours on planning before a task is ready.",
    does: "Settle the deliverable, the dependencies, the inputs and the intended workflow before you build anything, and check the deliverable against the complexity bar for its type while the scenario is still on paper.",
    refs: [
      { section: "Complexity Bar", title: "Genuine complexity is not negotiable" },
      { section: "1", title: "Planning the Agent Task" },
      { section: "1.2", title: "Building the Idea" },
    ],
    impact: "shape",
    detail: {
      label: "The floor each deliverable has to clear",
      items: [
        "P0, explainer video: several scenes driven by the data or the documents, not one static frame with narration.",
        "P0, interactive HTML: interaction that actually works, controls that respond, state that changes. A styled static page does not qualify.",
        "P0, dashboard: several linked views over data the model extracted itself. One chart is not a dashboard.",
        "P1 covers presentations of 10 to 15 slides, multi page designed PDFs and multi row structured data. A plain document or report is P2.",
      ],
    },
  },
  {
    id: "assigned-tool-use",
    date: "Oct 8, 2026",
    version: clientFlagVersion,
    title: "Assigned tools have to be used, not just assigned",
    body: "Carrying the right connectors is not the same as building on them. The client asked for genuine tool use driven by the scenario, and named browsing and image generation specifically. Tools are assigned under hatch_connectors on the parameter sheet and surface as assigned tools once tasking moves to the dash.",
    does: "Name the step in your scenario that each assigned tool is necessary for, and check the deliverable could not be produced without it. If you cannot name that step, the task is not using the tool and is not finished. Never bolt on a call just to show one happened.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.2.3", title: "Create the Prompt" },
      { section: "8.3", title: "The Services in the Universe" },
      { section: "8.3.1", title: "The Built-in Tools" },
    ],
    impact: "hard",
    detail: {
      label: "What meaningful use looks like",
      items: [
        "Browser: external research, cross referencing several sites, verifying a source, or a value that is only correct at run time.",
        "Image generation (muse-image-1.0): a visual asset the model produces or edits and then places inside the assigned output artifact.",
        "Web values move between runs, so grade the retrieval and the relationship the model has to establish, not the figure you saw while writing the rubric.",
        "Google Drive is working again. If it still fails on your task, drop that one connector and hold every other parameter exactly as assigned.",
        "Social media interactions are wanted too. The universes that support them are still being built, so this lands once those tools exist.",
      ],
    },
    links: [
      { to: "/reference#assigned-tools", tag: "WN", label: "Assigned tools are mandatory, and drift is rejected" },
      { to: "/#parameters", tag: "M1", label: "Name the step each assigned tool is needed for" },
      { to: "/spec#trajectory", tag: "QC", label: "Feasibility with tools" },
    ],
  },
  {
    id: "dynamic-values",
    date: "Oct 8, 2026",
    version: "Green Shell v1",
    title: "Dynamic values: grade the retrieval, not the figure",
    before:
      "Red Shell carried the same note once, in the appendix at 9.3.1. The rubric sections said nothing about dynamic values, so it read as background on the built in tools rather than as a rule about writing a criterion.",
    body: "Browsing is now an expected part of a task, so more rubric sets are being written against values the model has to fetch. Those values are live: a price, a ranking or an availability can legitimately be different the next time the task is run. A criterion that states the figure you saw as the required answer fails the run that retrieved the newer, correct one, which is the model doing exactly what the prompt asked.",
    does: "Go through every criterion that names a value the model has to fetch, and rewrite the ones that state it as the answer. Phrase it as the current value retrieved during the run, put your figure in parentheses after it, and keep the file, the product and the source named so a grader can still rate it with the prompt closed.",
    refs: [
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.6", title: "Final Rubric Checklist" },
      { section: "8.3.1", title: "The Built-in Tools" },
    ],
    impact: "hard",
    detail: {
      label: "The rewrite, and how to check it",
      items: [
        "Not valid: the model reports $129.99 as StrideHub's current price for the AeroRun Velocity 4. It was correct the day it was written, and a run that finds the new price is marked down for getting it right.",
        "Valid: the model reports StrideHub's current price for the AeroRun Velocity 4 based on information retrieved during the run (e.g., $129.99). The figure is an example, so what is graded is whether the agent found and reported the correct current value.",
        "Dropping the value instead is the opposite mistake, and the brackets are what answer both. Not valid: the page references the Spiderman XTR listing with its current price, which names no file and no figure and cannot be rated. Valid: product_listing.html includes Spiderman XTR with its current Amazon price (e.g., $99.99).",
        "Dynamic covers prices, availability, rankings, schedules, product specifications, company information and anything else live on the web.",
        "Fixed values are still fixed. Anything from an attachment, a universe record or the GTFA is a literal and has to match its source exactly.",
        "Verify it against your own golden, which has to pass the complete set. A criterion the golden would fail on a rerun because the number moved is a broken criterion, not a broken golden.",
        "This is scored, not a style note. An overly specific criterion is Overfitting, a Moderate issue, and more than 15% of the set carrying moderate issues fails Overall Rubric Quality. One frozen price per product reaches that quickly.",
      ],
    },
    links: [
      { to: "/#rubrics", tag: "M9", label: "Grade what was delivered, not how it got there" },
      { to: "/reference#assigned-tool-use", tag: "WN", label: "Assigned tools have to be used, not just assigned" },
      { to: "/reference#literal-matching", tag: "WN", label: "Every literal has to match its source exactly" },
      { to: "/spec#rubric-quality", tag: "QC", label: "Overfitting and Underfitting" },
      { to: "/alignments#flag-dynamic-values", tag: "UA", label: "Reinforced in Urgent Alignments" },
    ],
  },
  {
    id: "single-turn",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Tasks are single turn, so milestones are gone",
    before:
      "Red Shell ran 3 to 5 turns, with a milestone set per turn, a revision turn, and a milestone check deciding whether the next prompt was a turn or a hint.",
    body: "The task type is always single turn. One initial prompt goes in and it is sent automatically when you submit. There are no further turns, so there is no milestone set to write. The golden is steered from that prompt at intent level until the model reaches the ideal response, and each of the 8 pass@k runs answers the same prompt, word for word, once.",
    does: "Put every requirement into the one prompt. Anything it does not ask for cannot be graded, whatever the Draft History records.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "2.1", title: "Sending the Prompt" },
      { section: "3", title: "Golden Solution" },
    ],
    impact: "hard",
    detail: {
      label: "What this removes from the old workflow",
      items: [
        "No milestone set, and no milestone check between turns.",
        "No revision turn, and no deferred asset arriving later in the conversation.",
        "No turn structure or dependency to design, so difficulty has to come from the scenario instead.",
        "Hinting survives, but only inside the golden, where you steer the same prompt toward the ideal response. The pass@k runs get no follow-ups.",
      ],
    },
  },
  {
    id: "use-case-and-tools",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "A new use case taxonomy, 11 use cases and 68 subcategories",
    before:
      "Red Shell assigned one of 6 categories and 16 subcategories. Those labels are retired and are not valid values any more.",
    body: "Every task is assigned one use case (L1) and one subcategory (L2) from the Hatch taxonomy. The pair is fixed, and the scenario, the prompt and the deliverable all have to be its natural home. Assign by the user's intent, never by what the input files happen to be about.",
    does: "Read your L2 definition and its scope check before you design anything, then check the neighbouring L2 in the same use case. Fitting that one better is a category relevance failure even when the use case is right.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.1.1", title: "Categories and Subcategories (L1 & L2)" },
      { section: "1.2.3", title: "Create the Prompt" },
      { section: "1.2.5", title: "Common Scenario Issues Getting Tasks Rejected" },
    ],
    impact: "hard",
    embed: "taxonomy",
    detail: {
      label: "Reading the taxonomy",
      items: [
        "The scope check is the tie breaker. SMB needs a small business context, Shopping needs the user to be buying, Research loses to any use case that owns the topic.",
        "Health and Fitness needs every health input mocked or synthetic, and emotional support is out of its scope.",
        "Every scenario below clears the complexity bar for its deliverable. A pair that only supports a plain document is a pair you have not finished designing against.",
      ],
    },
  },
  {
    id: "assigned-tools",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Assigned tools are mandatory, and tool drift is rejected",
    body: "Where a scenario comes with specific tools or connectors, the task has to be built on them. The correct final state must depend on those tools, and a task that reaches its outcome through a different service is rejected at QC. The loadout documented in the appendix is background only and never justifies substituting one.",
    does: "Build the scenario on the assigned tools rather than on whichever service is easiest to reach, and make sure the deliverable genuinely cannot be produced without them.",
    refs: [
      { section: "1.1", title: "Task Parameters & Execution Rules" },
      { section: "1.2.3", title: "Create the Prompt" },
      { section: "1.2.5", title: "Common Scenario Issues Getting Tasks Rejected" },
      { section: "8.3", title: "The Services in the Universe" },
    ],
    impact: "hard",
  },
  {
    id: "input-floor",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Three multimodal inputs is the floor, not the target",
    before:
      "Red Shell set the same minimum of three, and in practice it was read as the number to hit.",
    body: "Every task needs a minimum of three multimodal inputs, and together they have to cover every assigned input modality. Three is the requirement, not the goal, and many tasks need substantially more than that to meet the complexity bar the client expects.",
    does: "Use as many inputs as the scenario naturally needs, and never trim a task down to three or slightly more.",
    refs: [
      { section: "1.1.2", title: "Rest of the Parameters" },
      { section: "1.2.2", title: "Select the Multimodal Inputs" },
      { section: "1.3", title: "Defining the Draft History" },
    ],
    impact: "hard",
  },
  {
    id: "outcome-over-process",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "80/20: grade the outcome, not the route",
    before:
      "Red Shell capped Trajectory criteria at five and treated them as ordinary coverage. That cap is gone and the 80/20 rule replaces it.",
    body: "At least 80% of your objective criteria have to grade completion: the artifact, the state change, the final message. At most 20% may grade process, which is Tool Use, Agent Behavior, any Trajectory target and narration of the model's own work, and zero is preferred. Above the cap the task fails automatically as Process Over Cap.",
    does: "Write the completion version first. Grade a reasoning decision where it lands in the deliverable, and grade a lookup the model skipped by what its absence costs the artifact. Keep a process criterion only where no deliverable can show the failure.",
    refs: [
      { section: "5", title: "Objective Rubrics" },
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.2", title: "Rubric Weights" },
      { section: "5.4", title: "Category & Evaluation Target" },
      { section: "5.5", title: "How the Client Defines Rubric Issue Severity" },
      { section: "5.6", title: "Final Rubric Checklist" },
      { section: "6.4", title: "Categories and Evaluation Targets for Subjective Rubrics" },
      { section: "8.2", title: "What the Model Actually Does" },
    ],
    impact: "hard",
    detail: {
      label: "Counting it, and the rewrite it forces",
      items: [
        "Count the objective block only, positives and negatives alike, and round down. 12 criteria allow 2 process criteria, 20 allow 4.",
        "The test: could the deliverable be perfect and this criterion still fail? Then it is process.",
        "Process: the model opens klin.png before writing report.md. Completion: report.md records the 48 spaces per rack shown in klin.png. The second catches the same failure, because a model that never looked cannot know the value.",
        "A missing lookup is graded by what it costs the deliverable, not by evidence that the model tried.",
      ],
    },
  },
  {
    id: "literal-matching",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "Every literal has to match its source exactly",
    body: "Every filename, ID, value, date or string a criterion references must match the source exactly. A literal the source does not actually carry cannot be satisfied by any run, and it counts as an Incorrect Criteria issue, which is Major. This applies just as rigorously to the subjective block.",
    does: "Copy each literal straight from the attachment, the universe record or the GTFA. Open the source and check every one of them before you submit.",
    refs: [
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.6", title: "Final Rubric Checklist" },
    ],
    impact: "hard",
  },
  {
    id: "no-existence-checks",
    date: "Sep 27, 2026",
    version: "Green Shell v1",
    title: "A criterion that only checks existence is never valid",
    body: "Do not write a criterion that only verifies a file, section, column or record is there. Existence is already implied by any criterion that grades content. No weight makes one of these acceptable, and it fails the task automatically as an Existence Check.",
    does: "Grade what the file records instead. A criterion on the value inside it already proves the file exists.",
    refs: [
      { section: "5.1", title: "Rubric Fundamentals" },
      { section: "5.2", title: "Rubric Weights" },
      { section: "5.5", title: "How the Client Defines Rubric Issue Severity" },
      { section: "5.6", title: "Final Rubric Checklist" },
    ],
    impact: "hard",
    detail: {
      label: "The rewrite",
      items: [
        "Not valid: array_survey.csv contains the columns string_id, output_w and variance_pct.",
        "Valid: array_survey.csv records a variance_pct of −12.4 for string S-07, the string whose output is read off the inverter photo.",
        "Naming the specific files inside a folder does not save it. If nothing in the criterion grades content, it is still an existence check.",
      ],
    },
  },
];

/**
 * The Red Shell to Green Shell rule set on its own, without the client flags
 * layered on since. Anything that says how many rules changed coming from Red
 * Shell counts this, not `guidelineChanges`, which also holds the flags.
 */
export const guidelinesOnlyChanges = guidelineChanges.filter(
  (c) => c.version !== clientFlagVersion
);
