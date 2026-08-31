import type { ChecklistSection } from "./types";

/**
 * Transcribed from `presubmit-gate.pdf`
 * (G:\My Drive\Red Shell\Coruses & Screenings\Guidelines\presubmit-gate.pdf).
 *
 * Section refs point into [External] OpenClaw MM Rubrics MULTI TURN – Guidelines,
 * which stays the source of truth. The PDF ships alongside this page for printing.
 */

export const checklist: ChecklistSection[] = [
  {
    n: 1,
    id: "s1",
    title: "Parameters and scenario shape",
    prompt: "Is this the task you were assigned, and is it hard enough to be worth grading?",
    context: [
      {
        lead: "Four parameters are assigned and cannot change",
        body: "Task type, category, subcategory, universe. Drift from any one of them is rejected at QC, however good the task is.",
        tone: "warn",
      },
      {
        lead: "Universe dates are static",
        examples: [
          { ok: false, text: "“next Tuesday” — can land on a week that holds nothing" },
          { ok: true, text: "“the week of 12 May” — a range you actually saw" },
        ],
      },
    ],
    checks: [
      {
        id: "A1",
        q: "Does the scenario sit naturally inside the assigned category, subcategory and universe, rather than having been bent to fit them?",
        f: "If not, re-read the subcategory definition and adjust until the pair is the scenario’s obvious home.",
        ref: "§1.1 · 1.2.5",
        links: [
          {
            to: "/golden-tasks/vendor-closeout",
            tag: "GT",
            label: "Operations & QA · Document/Receipt Processing, in a wound-down studio",
          },
          { to: "/spec#c-1", tag: "#1", label: "How far can a follow-up drift?" },
        ],
      },
      {
        id: "A2",
        q: "Did you confirm the loadout in the Universe Explorer, add the Service Universe Artifact ID, and anchor every date to a window you actually saw in the data?",
        f: "Without the Artifact ID the artifacts come back empty. Designing against a server that is not loaded is an environment defect, not a model failure.",
        ref: "§1.1 · 1.2.1",
      },
      {
        id: "A3",
        q: "Does the task genuinely need three stages and two or more systems, with one real friction point?",
        f: "If it can be completed in a short linear exchange it is too simple. Add a cross-system handoff, not more asks.",
        ref: "§Hard Client Requirements",
        links: [
          { to: "/golden-tasks/vendor-closeout#traps", tag: "GT", label: "Seven designed friction points" },
        ],
      },
      {
        id: "A4",
        q: "Did Model A actually fail at least 50% of the final rubric score, with failures that materially affect task completion?",
        f: "If the run sailed through, the scenario needs more difficulty. Do not close the gap by adding criteria the model happens to miss.",
        ref: "§Hard Client Requirements",
        links: [
          { to: "/golden-tasks/vendor-closeout#model-a", tag: "GT", label: "19 of 21 criteria failed" },
        ],
      },
    ],
  },
  {
    n: 2,
    id: "s2",
    title: "Universe and evidence",
    prompt: "Is the media load-bearing, and is the universe doing real work?",
    context: [
      {
        lead: "Four ways this goes wrong",
        body: "Write only — every figure comes from the attachments and the universe is only written to. Universe dropped — the media settles everything. Pictures of the universe — the input duplicates what the universe holds. And a cross-check nobody could perform.",
      },
      {
        lead: "Observed in a real run",
        body: "282 service tools loaded across 14 servers. The agent called none of them, even with the prompt naming the Slack channel twice. Connected does not mean used.",
        tone: "warn",
      },
      {
        lead: "Messy is required, illegible is a defect",
        examples: [
          { ok: true, text: "Blurry phone shots, skewed scans, IMG_0427.jpg" },
          { ok: false, text: "A value no person could read → feasibility failure" },
        ],
      },
    ],
    checks: [
      {
        id: "B1",
        q: "Is there at least one fact the task cannot be completed without that lives only in a connected service, and does the agent have to read the universe rather than only write to it?",
        f: "Notes, drafts and calendar entries the agent creates are outputs, not universe interaction.",
        ref: "§1.2.2 · 9.2",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#traps",
            tag: "GT",
            label: "The $50,000 benchmark exists only in #executives",
          },
        ],
      },
      {
        id: "B2",
        q: "Take the attachments away — does the task become unsolvable?",
        f: "If any required value also exists as text somewhere in the environment, MM dependence fails and the media reads as decorative.",
        ref: "§1.2.2",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#inputs",
            tag: "GT",
            label: "$192.00 exists only in a photographed handwritten note",
          },
        ],
      },
      {
        id: "B3",
        q: "Does every attached file carry at least one needed fact, and could a person read every load-bearing value at full size?",
        f: "A file that can be left unopened is junk and can get the task rejected.",
        ref: "§1.2.2 · 4",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#inputs",
            tag: "GT",
            label: "Eleven files, ten of them load-bearing, one deliberate distractor",
          },
        ],
      },
      {
        id: "B4",
        q: "Do the inputs clear the hard rules — downsampled, no .heic, no LLM-generated .pdf/.docx/.xlsx, under the 20% LLM cap, no junk or system files, CC0 or CC BY, synthetic personas only?",
        f: "Then check the names: no filename, manifest or helper doc may reveal an answer or signal which turn a deferred asset belongs to.",
        ref: "§1.2.2",
      },
    ],
  },
  {
    n: 3,
    id: "s3",
    title: "Prompt and turns",
    prompt: "Does the conversation actually ask for what you are about to grade?",
    context: [
      {
        lead: "Name every output file, in the prompt",
        examples: [
          { ok: false, text: "“generate a report with your findings”" },
          { ok: true, text: "“write your findings in final_report.md”" },
        ],
      },
      {
        lead: "3 to 5 turns",
        body: "Opening prompt plus 2 to 4 follow-ups. Fewer than 3 is automatically rejected. Each follow-up must consume the state the one before it produced.",
        tone: "accent",
      },
      {
        lead: "Never flag the miss",
        body: "Not in the Leg A follow-ups, not in the Leg B hints. The test: if the model could copy your hint straight into the artifact, you gave away the answer.",
        tone: "warn",
      },
    ],
    checks: [
      {
        id: "C1",
        q: "Is every expected output file named explicitly in the prompt itself, spelled exactly as it must appear?",
        f: "A filename that appears only in an input file, the Agent Objective or the Desired Outcome was never asked for.",
        ref: "§1.2.3 · 1.3",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#conversation",
            tag: "GT",
            label: "All four deliverables named in the turns that ask for them",
          },
        ],
      },
      {
        id: "C2",
        q: "Do the thresholds, rules and policies the agent must apply live in the input files rather than being stated in the prompt?",
        f: "Stating the policy in the prompt removes the work you intended to grade.",
        ref: "§1.2.3",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#format",
            tag: "GT",
            label: "receipt_format.md carries the field rules, including the PST clause",
          },
        ],
      },
      {
        id: "C3",
        q: "Does the conversation run 3 to 5 turns, with every follow-up consuming the state the turn before it produced?",
        f: "A follow-up that would work as an independent opening prompt fails Turn Structure.",
        ref: "§1.1 · 1.2.3 · 3",
        links: [
          { to: "/golden-tasks/vendor-closeout#conversation", tag: "GT", label: "Four turns, each consuming the last" },
          { to: "/spec#c-1", tag: "#1", label: "How far can a follow-up drift?" },
        ],
      },
      {
        id: "C4",
        q: "Is there at least one turn that changes the brief after something was already delivered, and is any deferred asset named explicitly on the turn it enters scope?",
        f: "A revision is a targeted edit to what exists. “I found another file” does not name the asset.",
        ref: "§Hard Client Requirements · 6.3",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#conversation",
            tag: "GT",
            label: "Turn 4 edits a draft already delivered",
          },
        ],
      },
      {
        id: "C5",
        q: "Did you avoid flagging the miss anywhere — in the Leg A follow-ups and in your Leg B hints?",
        f: "Pointing at the failure compromises the 50% threshold.",
        ref: "§1.2.3 · 7.2",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#model-a",
            tag: "GT",
            label: "Model A was never told what it missed",
          },
        ],
      },
    ],
  },
  {
    n: 4,
    id: "s4",
    title: "Draft History alignment",
    prompt: "Nothing the agent never saw can be graded.",
    context: [
      {
        lead: "The agent sees only your prompts and attachments",
        body: "The Draft History, Agent Objective, Desired Outcome, rubrics and milestones are invisible to it — the most common invalid assumption in task design. The Desired Outcome names each artifact, its contents and the decision logic, and never the values the agent has to derive.",
        tone: "warn",
      },
    ],
    checks: [
      {
        id: "D1",
        q: "Is every requirement you intend to grade actually stated in a prompt the agent received?",
        f: "A requirement living only in the Draft History was never asked for, so it cannot be graded.",
        ref: "§1.3 · 4",
        links: [{ to: "/spec#c-2", tag: "#2", label: "Draft History — first turn or final state?" }],
      },
      {
        id: "D2",
        q: "Does the Desired Outcome describe the shape of the end state without pre-filling the answers, and does it match the GTFA you resolved?",
        f: "If you cannot state the one correct answer yourself, the scenario was never ready to write up.",
        ref: "§1.2.4 · 1.3",
        links: [
          { to: "/golden-tasks/vendor-closeout#answer", tag: "GT", label: "The answer, resolved before the build" },
          { to: "/spec#c-2", tag: "#2", label: "Draft History — first turn or final state?" },
        ],
      },
    ],
  },
  {
    n: 5,
    id: "s5",
    title: "Objective rubrics",
    prompt: "Every criterion has to be ratable, correct at runtime, and grounded in something the prompt said.",
    context: [
      {
        lead: "Severity thresholds — any one of these fails the task",
        body: "MAJOR above 10% of the set · MODERATE above 15% · MINOR above 20%. Two to four issues is often enough.",
        tone: "warn",
      },
      {
        lead: "Self-containment",
        examples: [
          { ok: false, text: "maintenance_summary.xlsx contains the correct inspection date for unit 7C" },
          { ok: true, text: "maintenance_summary.xlsx records 2026-03-14 as the inspection date for unit 7C" },
        ],
      },
      {
        lead: "Values that drift by runtime",
        body: "These are rubric defects, not model failures.",
        examples: [
          { ok: false, text: "$25.00 in the rubric, $35.00 from the tool" },
          { ok: false, text: "“Ikenna” in the rubric, “Ifeanyi” from the calendar" },
          { ok: false, text: "1080p in the rubric, 1920x1080 from the file" },
        ],
      },
      {
        lead: "Format over-specification",
        examples: [
          { ok: false, text: "“exactly 11 ## headings in this order” when the prompt said “include these sections”" },
          { ok: false, text: "“heading must be ## Summary” when the prompt said “wrap up with a summary”" },
        ],
      },
      {
        lead: "Two rules people get wrong",
        body: "Weight is difficulty, never importance — a criterion can be critical and still be +1. Agent Behavior is always Trajectory.",
        tone: "accent",
      },
    ],
    checks: [
      {
        id: "E1",
        q: "Walking the prompt once per turn, is every ask covered by a criterion — including intents introduced in the middle turns, not just the final state?",
        f: "Missing Criteria and Turn Scoped are both Major issues.",
        ref: "§5.1 · 5.6 · 5.7",
        links: [
          { to: "/golden-tasks/vendor-closeout#rubrics", tag: "GT", label: "21 criteria across four turns" },
          { to: "/spec#c-8", tag: "#8", label: "One milestone per turn, or per requirement?" },
        ],
      },
      {
        id: "E2",
        q: "Read with the prompt closed: can a grader rate every criterion Present or Not Present from the criterion and its evaluation target alone?",
        f: "Embed the exact value, filename, date or classification. Anchor “the photo” to the actual filename.",
        ref: "§5.1",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#rubrics",
            tag: "GT",
            label: "Every amount, filename and timestamp pinned in the criterion",
          },
        ],
      },
      {
        id: "E3",
        q: "Is every value asserted in a criterion the one the tool, file or universe actually returns at runtime?",
        f: "Verify by making the call yourself rather than trusting the note you took while authoring.",
        ref: "§5.1 · 5.5",
      },
      {
        id: "E4",
        q: "Does every literal format requirement trace back to a line you can quote from the prompt?",
        f: "Exact heading names, ordering, casing and phrasing are Instruction Following only when the user stated them. If you cannot cite the line, cut it.",
        ref: "§5.1 · 5.4",
        links: [{ to: "/spec#c-4", tag: "#4", label: "Negative rubric or subjective rubric?" }],
      },
      {
        id: "E5",
        q: "Is each criterion atomic, and do no two criteria demand mutually exclusive outcomes or check the same thing twice with opposite polarity?",
        f: "Three entities means three criteria. Check polarity first: a positive on X and a negative on Y are complementary, not contradictory.",
        ref: "§5.1 · 5.6",
      },
      {
        id: "E6",
        q: "Is every weight in {−5, −3, −1, +1, +3, +5}, and does each answer how hard the criterion was to satisfy rather than how much it matters?",
        f: "Any value outside the set fails Rubric Structure on its own.",
        ref: "§5.2 · 5.7",
      },
      {
        id: "E7",
        q: "Is every criterion in the category and evaluation target it would actually be graded under?",
        f: "If you wrote Agent Behavior against an artifact, a state change or the final message, you are grading the deliverable and the category is wrong.",
        ref: "§5.4",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#rubrics",
            tag: "GT",
            label: "Rubric 18 ships with neither field — the counter-example",
          },
          { to: "/spec#c-5", tag: "#5", label: "Do subjective rubrics use the six categories?" },
        ],
      },
      {
        id: "E8",
        q: "Are negatives around a quarter of the block and under 30%, and does any group of more than eight similar outcomes use one completeness criterion plus at most five spot checks?",
        f: "Each negative must name a failure the setup genuinely invites, not mirror every “don’t” in the prompt.",
        ref: "§5.1.1 · 5.3",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#rubrics",
            tag: "GT",
            label: "Two negatives, both naming failures the run actually made",
          },
          { to: "/spec#history", tag: "log", label: "The negative quota was removed in the taxonomy draft" },
        ],
      },
    ],
  },
  {
    n: 6,
    id: "s6",
    title: "Subjective block",
    prompt: "Presentation only, judged on the render.",
    context: [
      {
        lead: "One element, one visible property",
        examples: [
          { ok: false, text: "island_ferry_times.pdf has an appropriate and professional look" },
          {
            ok: true,
            text: "In island_ferry_times.pdf, every departure time is aligned on its colon in a single column",
          },
        ],
      },
      {
        lead: "Scope",
        body: "Task Completion is the only valid category, Final Answer Artifact the target. Anything about the render that the prompt asked for is objective only. Weights measure user-experience impact, never difficulty.",
        tone: "accent",
      },
    ],
    checks: [
      {
        id: "F1",
        q: "Does the block hold 10 or more criteria, each anchored to one identifiable element and one visible property the prompt never asked for?",
        f: "No “looks professional”, “well designed” or “high quality” — name the property a reviewer can locate and score.",
        ref: "§8.1",
        links: [
          { to: "/golden-tasks/vendor-closeout#subjective", tag: "GT", label: "Ten criteria worth copying the shape of" },
          { to: "/spec#c-3", tag: "#3", label: "Grading content nobody asked for" },
        ],
      },
      {
        id: "F2",
        q: "Do the weights measure impact on the user’s experience rather than difficulty, and does every criterion grade something the format can actually show?",
        f: "A PDF cannot respond to hover and a static graphic cannot play audio.",
        ref: "§8.1 · 8.2",
        links: [{ to: "/spec#c-6", tag: "#6", label: "What does a subjective weight measure?" }],
      },
      {
        id: "F3",
        q: "Did you rate every subjective criterion Present or Not Present against both models yourself, and are the justifications written at the user-experience level?",
        f: "Pre-filled selections are not to be trusted, and the Model B set is entirely yours to determine.",
        ref: "§8.4 · 8.5",
        links: [
          {
            to: "/golden-tasks/vendor-closeout#subjective",
            tag: "GT",
            label: "Model A’s four presentation failures, written out",
          },
        ],
      },
    ],
  },
  {
    n: 7,
    id: "s7",
    title: "Dynamic values and final state",
    prompt: "The last things that break a task after everything else is right.",
    context: [
      {
        lead: "Live web values",
        examples: [
          { ok: false, text: "reports $129.99 as StrideHub’s current price" },
          {
            ok: true,
            text: "reports StrideHub’s current price based on information retrieved during the run (e.g. $129.99)",
          },
        ],
      },
      {
        lead: "The Trajectory button",
        body: "It only downloads the most recent trajectory. Click it once per turn, or you will not have the evidence to grade trace-based criteria.",
        tone: "warn",
      },
    ],
    checks: [
      {
        id: "G1",
        q: "If the scenario touches the public internet, is no criterion pinned to a value that can change between runs — and is nothing in the task simply lookup-able online?",
        f: "Grade the retrieval and the relationship, with the value as an example. Anything answerable online gets fetched instead of worked out.",
        ref: "§9.3.1",
      },
      {
        id: "G2",
        q: "Does the golden pass the complete objective rubric set, with every named file present and every factual claim grounded in an input that was actually opened?",
        f: "Anything the golden fails is a broken criterion, not a broken golden.",
        ref: "§5.7 · 7",
        links: [
          { to: "/golden-tasks/vendor-closeout#ledger", tag: "GT", label: "Every decision traced to a message or a file" },
        ],
      },
      {
        id: "G3",
        q: "Are the trajectories and final artifacts downloaded for every turn, the preferred run starred, and does every failed criterion carry all three justification parts?",
        f: "Add by hand any justification the taxonomy did not pull automatically.",
        ref: "§3 · 5.5",
        links: [
          { to: "/golden-tasks/vendor-closeout#model-a", tag: "GT", label: "Model A’s real artifacts, kept per turn" },
        ],
      },
    ],
  },
];

export const verdict = {
  go: {
    title: "Ready to submit",
    body: "All 29 boxes ticked, and each one because you looked rather than assumed. If a check felt uncertain rather than clean, it is not ticked — go back to the section it names.",
  },
  no: {
    title: "Fix before submitting",
    body: "Any box left empty. Fix the item, then re-run the section it sits in — changing a rule in the prompt or the inputs usually moves something in the rubric block too.",
  },
};

export const totalChecks = checklist.reduce((n, s) => n + s.checks.length, 0);
