# Pre-Submit Gate

<!--
  The editable copy of the pre-submit gate.

  Edit this file, then run, from `Green Shell/`:
      python scripts/gate_md.py sync            # write it into src/data/checklist.ts
      python scripts/build_presubmit_gate.py    # reprint public/docs/presubmit-gate.pdf

  `python scripts/gate_md.py check` fails if this file and checklist.ts disagree,
  and `export` regenerates this file from checklist.ts if the code moved first.

  The headings and the **Field:** names are the format. Change the text after
  them, add or remove `###` checks and `##` sections, reorder them freely. Do not
  renumber by hand: section numbers and check ids are recomputed from the order
  on sync, and sync prints anything that moved so the links elsewhere in the hub
  can follow it. A value may wrap over as many lines as you like.
-->

## Masthead

**Subtitle:** Run it once when the task is finished and you are deciding whether to submit.

**Estimate:** ~5 min

**Warning:** Rubrics are the biggest source of rejections. Process over the 20% cap and an existence check fail a task on their own, and Major issues fail it above 10% of the criteria set.

**Banner:** Tick a box only when you have actually looked, not when you assume.

**PDF:** docs/presubmit-gate.pdf

**Ready title:** Ready to submit

**Ready body:** Every box ticked, and each one because you looked rather than assumed. If a check felt uncertain rather than clean, it is not ticked, so go back to the section it names.

**Fix title:** Fix before submitting

**Fix body:** Any box left empty. Fix the item, then re-run the section it sits in. Changing a rule in the prompt or the inputs usually moves something in the rubric block too.

## 1. Parameters and scenario

**Prompt:** Is this the task you were assigned, and is it hard enough to be worth grading?

### A1

**Q:** Does the finished task implement all fourteen assigned parameters exactly, with any deviation limited to what the universe or the failure threshold genuinely forced?

**Fix:** Go down the parameter sheet line by line, not just the category pair. Drift from any one of them is an automatic rejection.

**Ref:** §Hard Client Requirements · 1.1 · 1.1.2

**Links:**
- `M1` Fourteen are assigned. None of them is a suggestion -> /#parameters
- `WN` All fourteen are binding, and what counts as drift -> /reference#binding-parameters

### A2

**Q:** Does the scenario sit naturally inside the assigned use case and subcategory, read by the user's intent, rather than having been bent to fit them?

**Fix:** A neighbouring subcategory that fits better is a category relevance failure, even when the use case is right. Re-read the definition and its scope check.

**Ref:** §1.1.1 · 1.2.5

**Links:**
- `GT` Why the intent fixes the pair, not the inputs -> /golden-tasks/charge-disputes#parameters
- `WN` 11 use cases and 68 subcategories -> /reference#use-case-and-tools

### A3

**Q:** Did you ground the scenario by exploring the universe through the AI agent in the Database tab, confirm the loadout in the Universe Explorer, and anchor every date to a window you actually saw in the data?

**Fix:** Inspecting by hand is how people conclude a scenario has no anchor. A thin loadout is an environment defect, and claiming the universe cannot support a scenario it can fails the task automatically.

**Ref:** §1.1 · 1.2.1

**Links:**
- `M2` Go find the story, do not invent one -> /#universe
- `VIDEO` Loading and exploring the universe, on screen -> /#universe-videos
- `QC` Feasibility with tools -> /spec#trajectory

### A4

**Q:** Does the output artifact clear the complexity bar for its type, with work across all three stages that a short linear exchange could not finish?

**Fix:** Plan the complexity before the run, never patch it in after. Add a cross-system handoff, not more asks.

**Ref:** §Hard Client Requirements · Complexity Bar · 1

**Links:**
- `M3` Complexity is planned, never patched in -> /#scenario
- `WN` The floor each deliverable has to clear -> /reference#planned-complexity
- `GT` Seven designed friction points -> /golden-tasks/charge-disputes#gtfa

### A5

**Q:** Did Model A genuinely fail at least 30% of the final rubric score, ideally 50% or more, with failures that materially affect task completion?

**Fix:** If the run sailed through, redesign inside your parameters and run Leg A again. Never force a failure, add an ask after the run or inflate a weight to reach the bar.

**Ref:** §Hard Client Requirements · 1.2 · 4

**Links:**
- `M7` If the model sails through, the task is not ready -> /#failure
- `GT` 52% of the objective weight lost -> /golden-tasks/charge-disputes#model-a
- `FA` Model A passed? Find out why -> /failure-approach#keeps-passing

## 2. Universe and evidence

**Prompt:** Is the media load-bearing, and is the universe doing real work?

### B1

**Q:** Is there at least one fact the task cannot be completed without that lives only in the universe, and does the agent have to read the universe, not only write to it?

**Fix:** Notes, calendar entries and drafts the agent creates are outputs, not universe interaction. The correct final state has to depend on the assigned tools, not on whichever service is easiest to reach.

**Ref:** §1.2.2 · 1.2.5 · 8.3

**Links:**
- `GT` One dispute that only the calendar settles -> /golden-tasks/charge-disputes#universe
- `WN` Assigned tools have to be used -> /reference#assigned-tool-use

### B2

**Q:** Take the attachments away. Does the task become unsolvable? If not, it does not require the multimodal reasoning expected.

**Fix:** Not every input has to be essential: realistic noise and distractor files are encouraged, as long as recovering the facts the task needs still takes multimodal reasoning.

**Ref:** §Hard Client Requirements · 1.2.2

**Links:**
- `M4` Attach what the person would actually have -> /#inputs
- `GT` Three disputes that exist only on paper -> /golden-tasks/charge-disputes#inputs

### B3

**Q:** Do the inputs cover every assigned input modality, with at least three of them in the Model A conversation and most images needing real visual interpretation rather than being screenshots of text?

**Fix:** A page of text in picture form is a document, not an image. Three is the floor, and many tasks need substantially more.

**Ref:** §Hard Client Requirements · 1.1.2 · 1.2.2 · 1.3

**Links:**
- `WN` Images worth looking at, not only reading -> /reference#input-diversity
- `WN` Three inputs is the floor, not the target -> /reference#input-floor
- `GT` Nine files, and the fact each one carries -> /golden-tasks/charge-disputes#inputs

### B4

**Q:** Do the inputs clear the hard rules: downsampled, no .heic, no LLM-generated .pdf/.docx/.xlsx, under the 20% LLM cap, no junk or system files, CC0 or CC BY, synthetic personas only?

**Fix:** Then check the names: no filename, manifest or helper document may reveal the expected answer. Handwriting legible, images sharp, audio clear and short.

**Ref:** §1.2.2

**Links:**
- `QC` Realism, safety and the input floor -> /spec#input-artifacts

## 3. The prompt

**Prompt:** Does the one prompt actually ask for what you are about to grade?

### C1

**Q:** Is every expected output file named explicitly in the prompt itself, spelled exactly as it must appear?

**Fix:** A filename that appears only in an input file, the Agent Objective or the Desired Outcome was never asked for, even when the assigned scenario names none.

**Ref:** §1.2.3 · 1.3

**Links:**
- `GT` The output file, spelled exactly -> /golden-tasks/charge-disputes#prompt

### C2

**Q:** Is the prompt built from the assigned scenario, in the user's own voice, with everything the agent needs in it, its inputs or the universe, and a call to action it can finish in a single turn?

**Fix:** Model A gets the initial prompt and no follow-ups. Leave room for subjectivity: a visual requirement the prompt states becomes objective.

**Ref:** §1.1.2 · 1.2.3 · 3

**Links:**
- `M5` One prompt, and everything in it -> /#prompt
- `WN` Tasks are single turn -> /reference#single-turn

### C3

**Q:** Do the thresholds, rules and policies the agent must apply live in the inputs, where it has to find them, unless the assigned scenario already states them?

**Fix:** Stating the policy in the prompt removes the work you meant to grade.

**Ref:** §1.2.3

**Links:**
- `GT` The page format lives in an attachment -> /golden-tasks/charge-disputes#inputs

### C4

**Q:** Does the prompt state the assigned execution target and any limit on the run, such as nothing sent, and keep the verification condition's answers out of it?

**Fix:** A target the prompt never states cannot be graded. No shortcut, clue or filename may give the answer away.

**Ref:** §1.1.2 · 1.2.3

**Links:**
- `GT` Every span of the prompt that is doing work -> /golden-tasks/charge-disputes#prompt

## 4. Draft History alignment

**Prompt:** Nothing the agent never saw can be graded.

### D1

**Q:** Is every requirement you intend to grade actually stated in the prompt the agent received?

**Fix:** The Draft History is not embedded in the agent. A requirement living only there was never asked for, so it cannot be graded.

**Ref:** §1.3

**Links:**
- `M6` Say why the agent is there, not what to type -> /#draft-history
- `GT` Each outcome item, next to the line that asks for it -> /golden-tasks/charge-disputes#draft-history

### D2

**Q:** Does the Desired Outcome describe the shape of the end state without pre-filling the answers, and does it match the GTFA you resolved?

**Fix:** If you cannot state the one correct answer yourself, the scenario was never ready to write up.

**Ref:** §1.2.4 · 1.3

**Links:**
- `M3` Solve it yourself first -> /#scenario
- `GT` The resolved answer, charge by charge -> /golden-tasks/charge-disputes#gtfa

## 5. Objective rubrics

**Prompt:** Every criterion has to be ratable, correct at runtime, and grounded in something the prompt said.

### E1

**Q:** Walking the prompt, is every ask covered by a criterion, with each core decision graded where it lands in the deliverable?

**Fix:** Missing Criteria is a Major issue. No target count: thorough coverage usually lands around 15 to 30.

**Ref:** §5 · 5.1 · 5.7

**Links:**
- `QC` The rubric error catalogue -> /spec#rubric-criteria

### E2

**Q:** Do at least 80% of the objective criteria grade completion, and is every process criterion one that no deliverable could show?

**Fix:** Tool Use, Agent Behavior, any Trajectory target and narration of the model's own work are process. Over 20% fails the task automatically, and zero is preferred.

**Ref:** §5.1 · 5.4 · 5.6

**Links:**
- `M8` Grade what was delivered, not how it got there -> /#rubrics
- `WN` 80/20: grade the outcome, not the route -> /reference#outcome-over-process
- `GT` Zero Trajectory criteria, which is the target -> /golden-tasks/charge-disputes#rubrics

### E3

**Q:** Does every criterion grade content, and none only that a file, section, column or record exists?

**Fix:** An existence check fails the task automatically at any weight. A criterion on the value inside the file already proves the file exists.

**Ref:** §5.1 · 5.6

**Links:**
- `WN` Existence is never a criterion -> /reference#no-existence-checks

### E4

**Q:** Read with the prompt closed: can a grader rate every criterion Present or Not Present from the criterion and its evaluation target alone, and does every literal in it match its source exactly?

**Fix:** Embed the exact value, filename, date or classification, copied from the source, never typed from memory. A literal the source does not carry is an Incorrect Criteria issue.

**Ref:** §5.1 · 5.5 · 5.7

**Links:**
- `M8` A grader with the prompt closed can still rate it -> /#rubrics
- `WN` Every literal matches its source -> /reference#literal-matching
- `GT` 26 criteria that each pin their own value -> /golden-tasks/charge-disputes#rubrics

### E5

**Q:** Is each criterion atomic and positively phrased, with no two checking the same thing or demanding outcomes that cannot both hold?

**Fix:** Split only where two halves could pass independently; several values serving one finding stay in one criterion. Use OR only for outcomes that are genuinely equivalent.

**Ref:** §5.1 · 5.1.2 · 5.6

### E6

**Q:** Is every weight in {−5, −3, −1, +1, +3, +5}, and does each answer how hard the criterion was to satisfy rather than how much it matters?

**Fix:** Any value outside the set fails Rubric Structure on its own. A value read off the media and reconciled against another source is usually +5.

**Ref:** §5.2 · 5.7

**Links:**
- `QC` Rubric structure -> /spec#rubric-criteria

### E7

**Q:** Is every criterion in the category and evaluation target it would actually be graded under?

**Fix:** Agent Behavior is always Trajectory: written against an artifact, a state change or the final message, it grades the deliverable. Instruction Following needs a line you can quote from the prompt.

**Ref:** §5.4

**Links:**
- `GT` Every criterion carries its own value -> /golden-tasks/charge-disputes#rubrics

### E8

**Q:** Are negatives around a quarter of the block and under 30%, and does any group of more than eight similar outcomes use one completeness criterion plus at most five spot checks?

**Fix:** Each negative names a failure the setup genuinely invites, not every “don't” in the prompt.

**Ref:** §5.1.1 · 5.3

**Links:**
- `GT` Nine charges, nine criteria, no group to collapse -> /golden-tasks/charge-disputes#gtfa

## 6. Golden, dynamic values and final state

**Prompt:** The last things that break a task after everything else is right.

### F1

**Q:** Did Leg B run the same prompt word for word, every hint at intent level and in the same persona, and does the golden pass the complete objective rubric set?

**Fix:** If the model could copy your hint straight into the artifact, you gave away the answer. Anything the golden fails is a broken criterion, not a broken golden.

**Ref:** §5.7 · 6.1 · 6.2

**Links:**
- `M9` Point at the intent, never at the answer -> /#golden
- `GT` The golden run, steer by steer -> /golden-tasks/charge-disputes#golden

### F2

**Q:** If the scenario touches the public internet or another dynamic type of information, essentially prices, is no criterion pinned to a value that can legitimately change between runs?

**Fix:** Grade the retrieval and the relationship the model has to establish, with the value given as an example rather than as the required answer.

**Ref:** §8.3.1

### F3

**Q:** Are the trajectories and final artifacts downloaded, the preferred run starred, and does every failed criterion carry all three justification parts?

**Fix:** A failure is a positive rated Not Present or a negative rated Present. Every one carries a justification; the golden needs none.

**Ref:** §3 · 5.5

**Links:**
- `QC` Trajectory completeness -> /spec#trajectory

## 7. Subjective block

**Prompt:** Presentation only, judged on the render.

### G1

**Q:** Does the block hold 10 or more natural criteria, each anchored to one identifiable element and one visible property the prompt never asked for?

**Fix:** Do not force extra criteria to hit the number. No “looks professional”, “well designed” or “high quality”: name the property a reviewer can locate and score.

**Ref:** §7.1

**Links:**
- `M10` Judge the render -> /#subjective
- `GT` Eleven criteria from one comparison -> /golden-tasks/charge-disputes#subjective

### G2

**Q:** Do the weights measure impact on the user's experience rather than difficulty, and does every criterion grade something the format can actually show?

**Fix:** A PDF cannot respond to hover and a static graphic cannot play audio. The category is Task Completion and the target the Final Answer Artifact, with User-Facing Message a rare exception.

**Ref:** §7.1 · 7.2 · 7.4

### G3

**Q:** Did you rate every subjective criterion Present or Not Present against both models yourself, with justifications written at the user-experience level?

**Fix:** Pre-filled selections are not to be trusted, and the Model B set is entirely yours to determine. Literal matching applies here as rigorously as in the objective block.

**Ref:** §5.1 · 7.5

**Links:**
- `QC` Subjective block scope -> /spec#rubric-criteria
