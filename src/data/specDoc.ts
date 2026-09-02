import type { XLink } from "./types";

/**
 * The Quality Control spec, transcribed from the deployed viewer at
 * https://qc-spec-mt-rubrics.vercel.app/, which is the source of truth and is
 * currently ahead of the CSV exports on Drive.
 *
 * Generated. Re-run when the spec sheet is re-exported and redeployed:
 *
 *   curl -s https://qc-spec-mt-rubrics.vercel.app/ -o qcspec.html
 *   python gen_spec.py qcspec.html
 *
 * Question text, guidance, option wording and definitions are verbatim, em
 * dashes and curly quotes included, because this is a transcription of the
 * standard rather than hub copy. Only `dimensionLinks` at the foot of the file
 * is hand-authored.
 */
export const SPEC_URL = "https://qc-spec-mt-rubrics.vercel.app/";

export interface SpecErrorTag {
  label: string;
  type: "fail" | "non-fail";
}

export interface SpecOption {
  text: string;
  score: number;
  /** Every Fail and Non-Fail selection carries a written justification. */
  justify: boolean;
}

export interface SpecDimension {
  name: string;
  question: string;
  description: string;
  errorTags: SpecErrorTag[];
  options: SpecOption[];
}

export interface SpecGroup {
  group: string;
  dimensions: SpecDimension[];
}

export type IssueSeverity = "Major" | "Moderate" | "Minor";

export interface RubricQualityIssue {
  name: string;
  severity: IssueSeverity;
  definition: string;
}

export interface WeightBucket {
  level: string;
  score: number;
  definition: string;
  examples: string[];
}

export interface AuthoringStandard {
  name: string;
  body: string;
}

export const specGroups: SpecGroup[] = [
  {
    "group": "Trajectory",
    "dimensions": [
      {
        "name": "Feasibility With Tools",
        "question": "Rate the Feasibility With Tools of the Trajectory dimension.",
        "description": "For all options except the last, apply an error category.",
        "errorTags": [
          {
            "label": "Fail - Feasibility with Tools",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Feasibility with Tools",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Feasibility with Tools]\nThe primary request is impractical or impossible and can't be answered by the tools available or enabled for the task",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Feasibility with Tools]\nOne or more secondary requests are impractical or impossible and can't be answered by the tools available or enabled for the task",
            "score": 3,
            "justify": true
          },
          {
            "text": "The requests are completely actionable by the tool framework",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Architectural Depth & Friction Exposure",
        "question": "Rate the Architectural Depth & Friction Exposure of the Trajectory dimension.",
        "description": "This evaluates whether the task itself meaningfully tests agent-building capability and exposes differences across models. The task must require multi-stage coordination, real tool use, cross-step dependencies, and at least one realistic friction point.\n\nA task requires multi-system coordination when the agent must retrieve, reconcile, or act upon information across two or more distinct systems (apps, data sources, tools, or environments), where outputs from one system meaningfully influence decisions or actions in another system.\nFor all options except the last, apply an error category.",
        "errorTags": [
          {
            "label": "Fail - Major Depth Issues",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Minor Depth Issues",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Major Depth Issues]\nNo meaningful tool dependency.\nAll models perform nearly identically due to low complexity.\nThe following conditions do NOT apply to Single-Turn tasks:\n(MT-only) The task is shallow or linear (can be solved in a few turns without architectural evolution for multi turn tasks) unless required by the assigned category.\n(MT-only) No multi-system coordination required (see notes).\n(MT-only) No realistic friction (no messy data, no ambiguity, no constraint conflict, no backtracking opportunity).\n(MT-only) The task does not meaningfully expose differences in reasoning, modularization, or state management.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Minor Depth Issues]\nArchitectural evolution is possible but not clearly required.\n\nTool use is present but not deeply integrated into reasoning.\n\nTask meets minimum requirements but lacks strong differentiation power.",
            "score": 3,
            "justify": true
          },
          {
            "text": "The task clearly forces architectural reasoning.\nRequires modular separation or structured multi-stage planning.\nIncludes real friction (e.g., conflicting data, missing fields, paywalls, normalization issues, constraint negotiation).\nRequires state reuse or refactoring.\nMeaningfully differentiates model capability",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Genuine Media Inspection",
        "question": "Rate the Genuine Media Inspection of the Trajectory dimension.",
        "description": "The agent must actually inspect the multimodal inputs rather than infer values from filenames, the user's wording, or plausible guessing. A correct value reached without inspection is not a pass — it defeats the MM ablation, which is the project's evidence that the media was load-bearing. Check the trajectory for the tool calls that opened the media.  For all options except the last, apply an error category.",
        "errorTags": [
          {
            "label": "Fail - Media Not Inspected",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Partial Inspection",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Media Not Inspected]\nThe agent produced values attributed to the multimodal inputs with no trajectory evidence of opening, reading, or processing them; the values were inferred from filenames, the prompt's wording, or guessed.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Partial Inspection]\nThe agent inspected some inputs but sourced at least one reported value from a filename or the user's phrasing rather than the media itself, while the remainder are properly grounded.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Every value attributed to a multimodal input is traceable to a trajectory step where that input was actually opened and processed.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Completeness",
        "question": "Rate the Completeness of the Trajectory dimension.",
        "description": "",
        "errorTags": [
          {
            "label": "Fail - Missing Trajectory",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Missing Trajectory]\nAt least one of the agent trajectories is missing.",
            "score": 2,
            "justify": true
          },
          {
            "text": "All trajectories are present and complete.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  },
  {
    "group": "Verifiers",
    "dimensions": [
      {
        "name": "Artifact Verification",
        "question": "Rate the Artifact Verification of the Verifiers dimension.",
        "description": "The rubric should verify a value, match, mismatch, visual detail, quality judgment, extraction result, or decision that depends on the media. It is not sufficient to only check for existence.  For all options except the last, apply the error category.",
        "errorTags": [
          {
            "label": "Fail - Missing Artifact Verification",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Missing Artifact Verification]\nNo criterion dependent on the content of a non-text file exists.\n\nNote: Criteria which only verify existence (e.g., a criterion checking that some given file exists in a particular location) do not count as a criterion that is \"dependent on content.\"",
            "score": 2,
            "justify": true
          },
          {
            "text": "At least one criterion exists which is dependent on the contents (rather than just the existence) of a non-text input file.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  },
  {
    "group": "Multi-Turn",
    "dimensions": [
      {
        "name": "Turn Structure & Dependency",
        "question": "Rate the Turn Structure & Dependency of the Multi-Turn dimension.",
        "description": "Multi-turn tasks carry 2–4 follow-up turns after the opening prompt. Later turns must depend on state established earlier — if the turns could be reordered or issued in parallel without changing the outcome, the task is a batch of single-turn requests. Each follow-up must do real work: deliver a withheld asset, extend a requirement, correct an error, tighten a constraint, or answer a clarification the agent asked for.  For all options except the last, apply the error category.",
        "errorTags": [
          {
            "label": "Fail - No Turn Dependency",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Padded Turns",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - No Turn Dependency]\nThe conversation has no follow-up turns, or every follow-up is independent of the state established by earlier turns; the turns could be reordered with no change to the outcome.\nAlso fails where follow-ups only re-ask for what the opening prompt already requested, or bolt on an unrelated second task.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Padded Turns]\nFollow-up turns are present and mostly build on earlier state, but at least one is padding (\"continue\", \"make it nicer\") adding no new requirement, asset, or correction.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Between 2 and 4 follow-up turns, each delivering, extending, correcting, constraining, or answering.\nLater turns depend on state established earlier in the conversation.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Simulator Answer Leak",
        "question": "Rate the Simulator Answer Leak of the Multi-Turn dimension.",
        "description": "The no-answer-leak rule extends to everything the CB types as the simulated user, on every turn. The user may say THAT something is wrong; they may not say WHAT the right answer is, WHERE exactly to find it, or HOW MANY of anything there are — point at the area, never at the value. This is the most frequently broken rule in the multi-turn format because it feels like helping. Read every user turn, not just the opening prompt.\n**NOTE:** User prompts are allowed to guide the model even when the guidance would fix a specific part of the golden response, as long as the guidance is \"oblique\" in some sense and needs further reasoning (even a small amount) for the model to determine the concrete next steps.\nE.g.: An agent makes a mistake which can only be resolved one of two ways, A or B.\nAcceptable prompt: \"A is wrong\" - Here, the agent still needs to make the determination that B is the only other valid option.\nBad prompt: \"A is wrong, do B instead\" - This provides the determination in whole and should be penalized.\nFor all options except the last, apply an error category.",
        "errorTags": [
          {
            "label": "Non-Fail - Over-Steering",
            "type": "non-fail"
          },
          {
            "label": "Fail - Simulator Leaked Ground Truth",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Simulator Leaked Ground Truth]\nOne or more user turns supply a value, count, position, or conclusion  (see notes for exceptions) the agent was supposed to derive from the multimodal inputs (e.g. \"the total is 412.75\", \"there are five receipts\", \"it's the third image\", \"you missed the discount rule\").\nAny leak of a graded value fails regardless of how late in the conversation it occurs.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Over-Steering]\nNo graded value is leaked, but the hints narrow the search space beyond an area-level nudge (e.g. naming the exact file to open).",
            "score": 3,
            "justify": true
          },
          {
            "text": "No user turn supplies a value, count, position, or conclusion derivable from the inputs.\nCorrections point at the area or the source, never at the answer.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Revision Turn Handling",
        "question": "Rate the Revision Turn Handling of the Multi-Turn dimension.",
        "description": "A correct golden shows the revision applied to work that already existed: it satisfies the revised brief while still carrying what the earlier turns established. A golden that reads as though the opening brief alone produced it means the revision was authored as a restart, and the task no longer tests what the modifier exists to test.\n\nExample:\nTurn 1: \"go through the receipts, put them in expenses.md\"\nTurn 2: agent builds the table; two receipts are blurry, so it marks those rows unverified\nTurn 4 (revision): \"drop anything from March\"\nThe only thing the revision asked for is removing March.\n\nFAIL: missing earlier-turn content\nMarch rows are gone, but every row now reads verified\nThe rebuild re-read the receipts and lost the unverified flags from turn 2\n\nFAIL: revision has no visible effect\nThe unverified flags survived, but the March rows are still in the table\nThe revision didn't land\n\nFAIL: both present but contradictory\nMarch rows gone and the flags survived, but the total at the bottom still includes the March amounts\nOr the header still says \"5 receipts\" when 3 remain\nThe edit touched the table and not the parts that depend on it\nNote: The intent of the final point of this error (\"the two (content from an earlier turn & revised content) are both present but contradict each other\") is to catch contradictory elements in the final (revised) artifact, not to cover cases where a revision instruction modifies or contradicts an earlier instruction.\n\nPASS\nMarch rows gone\nTotal recalculated to match\nThe two blurry receipts still flagged unverified.  For all options except the last, apply an error category.",
        "errorTags": [
          {
            "label": "Fail - Regression on Revision",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Wasteful Regeneration",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Regression on Revision]\nGolden is missing earlier-turn content the revision didn't ask to remove; Or the revised requirement has no visible effect on the artifact; Or the two (content from an earlier turn & revised content) are both present but contradict each other (see notes).",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Wasteful Regeneration]\nBoth requirements satisfied, but retained and revised portions are visibly inconsistent: formatting, headings, terminology — without changing what the artifact says",
            "score": 3,
            "justify": true
          },
          {
            "text": "Satisfies the revised brief, retains everything established before it, reads as one coherent artifact.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  },
  {
    "group": "Milestones",
    "dimensions": [
      {
        "name": "Intent-Level Abstraction",
        "question": "Rate the Intent-Level Abstraction of the Milestones dimension.",
        "description": "milestones.json is replayed by the user simulator against runs that diverge from the authoring conversation. Every milestone records INTENT, stripped of anything specific to the response the authoring run happened to produce. Test: would this milestone still make sense if the agent had taken a different path?",
        "errorTags": [
          {
            "label": "Fail - Answer-Level or Response-Coupled Milestones",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Partially Coupled Milestones",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Answer-Level or Response-Coupled Milestones]\nOne or more milestones encode the answer rather than the intent (e.g. \"tell it the material is brushed aluminium\"), or reference artifacts of the authoring run that may not exist on a divergent run (e.g. \"ask it to fix the third bullet\"). Either makes the milestone unreplayable.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Partially Coupled Milestones]\nMilestones are intent-level overall, but at least one carries an incidental detail from the authoring response that a divergent run may not reproduce, and which the simulator could reasonably work around.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Every milestone states intent independent of the authoring response.\nEach carries a hint prompt that could be sent verbatim by someone who never saw the original run.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Continuation Criteria & Assets",
        "question": "Rate the Continuation Criteria & Assets of the Milestones dimension.",
        "description": "Each milestone carries continuation criteria (what must be true before the simulator advances) and the assets delivered at that step. Criteria must be checkable without a judgment call; assets_delivered must list every deferred file, and those files must exist in input_files/.  For all options except the last, apply an error category.\n\nNote: You may encounter tasks with an older taxonomy which includes only the milestone text itself (and the turn) without a continuation criteria field: Rate this dimension a 5 for those cases.",
        "errorTags": [
          {
            "label": "Non-Fail - Loose Continuation Criteria",
            "type": "non-fail"
          },
          {
            "label": "Fail - Missing or Unverifiable Continuation Criteria",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Missing or Unverifiable Continuation Criteria]\nOne or more milestones have no continuation criteria, or criteria that cannot be evaluated without a judgment call (e.g. \"the caption is good\").\nAlso fails where a deferred asset was handed over during the conversation but is absent from assets_delivered, or is listed but missing from input_files/.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Loose Continuation Criteria]\nContinuation criteria are present and checkable but under-specified — they would let the simulator advance while a requirement of that turn is still unmet.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Every milestone has objectively checkable continuation criteria.\nassets_delivered matches the files actually handed over, and each exists in input_files/.\nOR the task's milestones section is the old taxonomy and does not include a section for continuation criteria.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Milestone Annotations",
        "question": "Rate the Milestone Annotations of the Milestones dimension.",
        "description": "Each milestone has 5 parts:\nTurn— which turn it belongs to\nModifier— what the turn does to work that already exists\nAssets delivered— anything handed over at that turn\nMilestone— the requirement itself, written as intent\nContinuation criteria— what must be true before moving on\n\nThis dimension flags any errors in: Turn, Modifier, Assets, and Continuation Criteria labeling.\n\nNote: Some tasks with an older taxonomy may present only a turn number & the milestone text; in these cases evaluate only what is present (turn number accuracy) in relation to this error.",
        "errorTags": [
          {
            "label": "Non-Fail - Milestone Annotations",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Non-Fail - Milestone Annotations]\n1+ Milestones have:\n•an inaccurate modifier,\n•OR inaccurate continuation criteria\n•OR an inaccurate asset label\nFor the labeled turn; i.e., the turn selection and/or any of the above fields is incorrect.",
            "score": 3,
            "justify": true
          },
          {
            "text": "All milestone labels are accurate.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  },
  {
    "group": "Golden Solution",
    "dimensions": [
      {
        "name": "Artifact Completeness",
        "question": "Rate the Artifact Completeness of the Golden Solution dimension.",
        "description": "The golden replaces the silver trajectory. It is the ideal response, reached by hinting Model B through the milestones, and verified requirement by requirement against the prompt before delivery. Subjective rubrics and pairwise scoring are graded relative to it, so a defective golden corrupts every subjective score on the task.  For all options except the last, apply an error category.\n\nNote: The golden response's artifacts should be measured against the user prompts' requirements rather than rubric criteria.",
        "errorTags": [
          {
            "label": "Non-Fail - Minor Golden Defects",
            "type": "non-fail"
          },
          {
            "label": "Fail - Golden Does Not Satisfy the Prompt",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Golden Does Not Satisfy the Prompt]\nOne or more files named in the prompt are missing or misnamed in golden/, a required content rule is unsatisfied, or the golden asserts a finding the inputs do not support.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Minor Golden Defects]\nEvery named file exists and every content rule is satisfied, but the golden carries a cosmetic defect that would not change a rubric outcome.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Every file named in the prompt exists with the filename spelled verbatim.\nEvery required content rule is satisfied and every factual claim is grounded in the actual inputs.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Trajectory Exclusion",
        "question": "Rate the Trajectory Exclusion of the Golden Solution dimension.",
        "description": "golden/ ships finished artifacts only. The external judge receives the golden ARTIFACTS and never the golden trajectory — anything left in the folder describing how the answer was reached leaks the solution path into grading.  For all options except the last, apply the error category.",
        "errorTags": [
          {
            "label": "Fail - Golden Contains Trajectory or Narration",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Golden Contains Trajectory or Narration]\ngolden/ contains a trajectory, trace, conversation log, status file, or any narration describing how the artifacts were produced.",
            "score": 2,
            "justify": true
          },
          {
            "text": "golden/ contains finished artifacts only, with filenames matching the prompt verbatim.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  },
  {
    "group": "Prompt",
    "dimensions": [
      {
        "name": "MM dependence",
        "question": "Rate the MM dependence of the Prompt dimension.",
        "description": "NOTE: This error encompasses cases where a non-text input file can be referenced, but is not necessary to reference. E.g., the prompt requests a summary of an audio file but a transcript of the audio file is also present in the environment. Since the purpose of this project is to assess the MM reasoning of trajectories, environments/prompts which enable the agent to complete the task without such reasoning are similar to \"Leaking the Solution\" errors on other projects.  For all options except the last, apply the error category.",
        "errorTags": [
          {
            "label": "Fail - MM Dependence",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - MM Dependence]\nThe prompt does not require the agent to reference non-text input files in the environment; the explicit requests of the prompt can be completely fulfilled without any multimodal reasoning or processing. This can occur due to the prompt only including requests that aren't multimodal in nature (e.g., look through these log files), or even when the prompt appears to request multimodal capabilities (see notes for example)",
            "score": 2,
            "justify": true
          },
          {
            "text": "The prompt, in the context of the environment, cannot be answered without referencing non-text files in the workspace.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  },
  {
    "group": "Input Artifacts",
    "dimensions": [
      {
        "name": "Realism",
        "question": "Rate the Realism of the Input Artifacts dimension.",
        "description": "Tasks should match real-world use-cases and not look contrived or made up. Real user data is messy — IMG_0427.HEIC, duplicates, missing timestamps, blurry phone shots, scanned-skewed PDFs, mixed orientations. Tasks where input_files/ is a curated set of perfectly-cropped JPGs are contrived.  For all options except the last, apply an error category.",
        "errorTags": [
          {
            "label": "Non-Fail - Partially Contrived Inputs",
            "type": "non-fail"
          },
          {
            "label": "Fail - Contrived Inputs",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Contrived Inputs]\n>20% of the necessary (for the final response) multimodal inputs for the task (or 1+ xlsx, docx, or pdf inputs) are highly unrealistic in the context of the prompt; They are highly artificial, overly curated, or otherwise \"too perfect\" to reflect a real-world use-case, and there is no reasonable explanation for this (e.g., curated & standardized MNIST handwriting samples are included alongside a prompt asking the agent to digitize notes)",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Partially Contrived Inputs]\nThe multimodal inputs for the task are slightly unrealistic in the context of the prompt, but it is possible that a real user may include inputs of similar quality or standardization. A reasonable explanation exists for why the inputs may seem unnatural, but actually are not (e.g., the user mentions they're analyzing a public dataset, and this premade dataset is among the inputs), OR <=20% of the necessary (for the final response) multimodal inputs for the task are highly realistic in the context of the prompt.",
            "score": 3,
            "justify": true
          },
          {
            "text": "The multimodal inputs for the task are plausible and realistic in the context of the prompt; A real user could reasonably have attached these same inputs.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Safety",
        "question": "Rate the Safety of the Input Artifacts dimension.",
        "description": "Medical images, homework screenshots, tax/financial documents, insurance claims, seller messaging, faces, children, IDs, and private images need explicit limits and should use mocked or synthetic data where appropriate.  For all options except the last, apply the error category.",
        "errorTags": [
          {
            "label": "Fail - Harmful Inputs",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Harmful Inputs]\nOne or more input artifacts are harmful and include sensitive private information that can identify a real, existing person. The inputs(s) are of a sensitive nature (see notes for examples) and are not synthetic, fabricated, or mocked.",
            "score": 2,
            "justify": true
          },
          {
            "text": "No provided input files contain real PII.",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Deferred Asset Handling",
        "question": "Rate the Deferred Asset Handling of the Input Artifacts dimension.",
        "description": "Tasks carrying the deferred-asset modifier withhold an asset until its milestone. The file still ships in input_files/ at upload time, but neither its filename nor any manifest may preview the turn that delivers it.  For all options except the last, apply an error category.",
        "errorTags": [
          {
            "label": "Fail - Deferred Asset Leaks Its Turn",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Suggestive Deferred Filename",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Deferred Asset Leaks Its Turn]\nA deferred asset's filename, or a manifest/README in input_files/, reveals the content or purpose of the later turn (e.g. price_sheet_for_turn3.pdf), handing the agent the requirement before the user delivers it.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Suggestive Deferred Filename]\nThe deferred asset's filename hints at its content but discloses neither the requirement nor any graded value.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Deferred assets are neutrally named and their presence in input_files/ does not preview the turn that delivers them.\nN/A where the task defers no assets.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  },
  {
    "group": "Rubric Criteria",
    "dimensions": [
      {
        "name": "Overall Rubric Quality",
        "question": "Rate the Overall Rubric Quality of the Rubric Criteria dimension.",
        "description": "See Rubric Quality Definitions below for descriptions and categorization (major/moderate/minor) for rubric criteria errors.\nUse the number of criteria (both objective and subjective blocks) that the CB wrote as the denominator while calculating % values . See the additional notes section for the numerator. Do NOT double count criteria while tallying even if it has multiple issues.",
        "errorTags": [
          {
            "label": "Fail - Rubric Errors",
            "type": "fail"
          },
          {
            "label": "Non-Fail - Rubric Errors",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Rubric Errors]\n• >10% of the criteria contain Major issues\n• >15% of the criteria contain Moderate or Major issues\n• >20% of the criteria contain Minor, Moderate, or Major issues",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Rubric Errors]\n• Between 5 and 20% (>=5% and <=20%) of criteria contain Major, Moderate, or Minor issues (with Major issues contributing lower than 10% and Moderate issues contributing lower than 15%)",
            "score": 3,
            "justify": true
          },
          {
            "text": "• Less than 5% (<5%) of the rubrics and have Minor issues\n• No Major or Moderate issues",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Rubric Structure",
        "question": "Rate the Rubric Structure of the Rubric Criteria dimension.",
        "description": "These errors reflect structural problems within the rubric and are failing if present.  For all options except the last, apply the error category.",
        "errorTags": [
          {
            "label": "Fail - Invalid Weights",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Invalid Weights]\nOne or more criteria use weights outside of the allowed set {-5, -3, -1, +1, +3, +5}.",
            "score": 2,
            "justify": true
          },
          {
            "text": "All rubric criteria have weights within the set {-5, -3, -1, +1, +3, +5}",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Rubric Spot Checks",
        "question": "Rate the Rubric Spot Checks of the Rubric Criteria dimension.",
        "description": "CBs are expected to provide up to 5 spot checks if there are sufficiently similar outcomes as well as add a criterion to check the volume of the outcomes.\nIf there are more than 5 spot checks, use the [Non-Fail - Too Many Spot Checks] category.\n\nExample:\nOutput: provides 200 emails\nRubric: Has 3 criteria that check random emails among the list + a criterion that checks that “the model sends at least 200 replies”.  For all options except the last, apply the error category.",
        "errorTags": [
          {
            "label": "Non-Fail - Too Many Spot Checks",
            "type": "non-fail"
          }
        ],
        "options": [
          {
            "text": "[Non-Fail - Too Many Spot Checks]\nThere are more than 5 spot checks for any group of outcomes.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Every group of outcomes has up to 5 spot checks",
            "score": 5,
            "justify": false
          }
        ]
      },
      {
        "name": "Subjective Block Scope",
        "question": "Rate the Subjective Block Scope of the Rubric Criteria dimension.",
        "description": "Multi-turn tasks producing decks, HTML, PDFs, catalogs, or video carry a subjective rubric block. Presentation only — layout, legibility, hierarchy, structure, cross-artifact consistency, register. Each criterion names one observable property of the render, graded against the golden side by side. Deterministic value checks belong to the objective block.  For all options except the last, apply the error category.\n\nOn deterministic value checks: For these to be flagged as an error for inclusion in the subjective block, the check must both be deterministic and a value check, that is, it must mandate which content appears in some portion of the final artifact(s), whether one correct value or an enumerated set of acceptable ones, rather than how that content is presented, how much of it a field carries, or where it sits.",
        "errorTags": [
          {
            "label": "Non-Fail - Minor Scope Bleed",
            "type": "non-fail"
          },
          {
            "label": "Fail - Subjective Block Scope Violation",
            "type": "fail"
          }
        ],
        "options": [
          {
            "text": "[Fail - Subjective Block Scope Violation]\nThe subjective block contains 2+ deterministic value checks, file-existence checks, or process checks belonging to the objective block that are non-visual/unrelated to formatting, presentation, layout, etc.; or a criterion names no observable property of the render (e.g. \"looks professional\") such that two reviewers could reasonably disagree on PASS/FAIL.",
            "score": 2,
            "justify": true
          },
          {
            "text": "[Non-Fail - Minor Scope Bleed]\nThe block is mostly presentation-scoped, but one criterion restates a check already covered by the objective block.",
            "score": 3,
            "justify": true
          },
          {
            "text": "Every subjective criterion names one observable property of the rendered artifact, graded relative to the golden.",
            "score": 5,
            "justify": false
          }
        ]
      }
    ]
  }
];

export const rubricQualityNote = "Referenced by Rubric Criteria — Overall Rubric Quality: these definitions supply the major / moderate tallies that drive that score. Severity grouping is reproduced exactly as the source sheet has it.";

export const rubricQualityIssues: RubricQualityIssue[] = [
  {
    "name": "Missing Criteria - Critical Requirements",
    "severity": "Major",
    "definition": "Count each missing rubric that ought to check for an explicit requirement in the prompt or a critical implicit expectation of the prompt as one issue (critical = you cannot imagine a good response without it)\n\nCBs are expected to provide up to 5 spot checks if there are sufficiently similar outcomes or outcomes where a single underlying \"ask\" would expand into multiple rubric criteria , as well as add a criterion to check the volume of the outcomes.\n- If there are more than 5 spot checks for a group, use the [Non-Fail - Too Many Spot Checks] category.\n- Each missing volume check would count as a missing criteria\n- Each group’s missing spot checks would count as a singular missing criteria\n\nExample 1:\nOutput: provides 200 emails\nRubric: Has 3 criteria that check random emails among the list + a criterion that checks that “the model sends at least 200 replies”\n\nNote:\nANTI-DOUBLE-COUNT RULE:\nA requirement is NOT missing if:\n- Another criterion in the rubric already checks the same requirement at a different granularity (e.g., section identity pinned by criterion A, section content graded by criterion B — do not flag \"missing check for content in section A\" separately)\n- Wording latitude on an existing criterion covers the correct content; the fix is one tightening pass on that criterion, not N new \"missing\" entries\n- The prompt permits optionality (e.g., \"the model may pick any of the flagged issues\") — optionality is a valid authoring choice, not a missing check"
  },
  {
    "name": "Criteria Not Self Contained",
    "severity": "Major",
    "definition": "Criterion cannot be evaluated against the model response without access to the prompt, reference text, other criteria, and/or external facts/information\n\nEvery rubric must be self-contained. Imagine that you only have access to the model response (including its trajectory) and are trying to evaluate if it fulfilled the rubric item. Will you be able to evaluate accurately without referencing anything else? Some criteria are self-explanatory but often, this translates to the criteria mentioning the answer to the prompt directly.\n\nExamples of criteria that are not self-contained:\nExample 1: “Response identifies the first president of the USA\"\nFixed: \"Response identifies the first president of the USA as George Washington\"\n\nExample 2: “The response addresses the bug mentioned in the prompt\"\nFixed: \"The response addresses the bug where the submit button doesn't work\"\n\nNote: Contents of input files are considered external information for the purposes of self-containment. I.e., if they must be referenced in order to evaluate a given criterion, that criterion is not self-contained.\nExample\nNot self-contained: \"xyz.csv includes the first non-header row of the table in abc.png\"\nSelf-Contained: \"xyz.csv includes the first non-header row of the table in abc.png, \"John Smith\",\"123-456-7890\",\"$300\"\"\n\nNote: The model does have access to the image; however, if the image contains clear labels, then the criterion should be clear about what the desired outcome should be. See task examples for clarity."
  },
  {
    "name": "Criteria Not Atomic - Major",
    "severity": "Major",
    "definition": "Criterion groups two or more constraints that are completely unrelated, which results in a rubric item with no clear focus on what aspect of the response it's trying to evaluate. These constraints cannot be interpreted as part of a single coherent instruction but reads more like a dump of requirements.\n\nEach rubric should evaluate one thing only — no bundling of multiple behaviors. Ask yourself if the criterion is evaluating more than one idea.\n\nNOTE: Rubrics in this project are limited in length and assess large trajectories. Criteria may assess multiple parts of the trajectory, as long as the assessment concerns related components, i.e., could be unified under one general idea.\n\n NOTE: CBs are recommended to include a \"schema check\" criterion in their rubrics that may otherwise seem somewhat non-atomic. These criteria should not be penalized for atomicity.\n    Example of a Schema Check criterion:\n        gabriela_listing_audit.csv parses as a CSV file and contains the columns\n        property_address, issue_type, severity, universe_source,\n        uploaded_media_source, listing_or_note_claim,\n        observed_visual_condition, and recommended_follow_up."
  },
  {
    "name": "Incorrect Criteria",
    "severity": "Major",
    "definition": "- Criterion checks for something that does not align with prompt requirements\n- Criterion contains a factual error or a misleading point\n    - Example: \"The response implements a sorting algorithm that runs in O(nlogn), such as selection sort\"\n- Criterion is not an explicit requirement in the prompt and implementing it makes the response worse\n- Criterion is not at all related to the requests in the prompt\n\nNOTE: Before classifying any issue as “Incorrect criteria”, see if a different, more specific error category would apply. For example, if a criterion is overly specific, you could argue that it’s “incorrect”, but it should still be counted as “Overfitting and Underfitting”."
  },
  {
    "name": "Turn-Scoped Criteria",
    "severity": "Major",
    "definition": "Criterion is satisfied only at an intermediate turn and is legitimately superseded by a later turn, so it fails against the final artifact even on a correct run. Rubrics are graded against the conversation's end state unless the criterion is explicitly about intermediate behavior.\n\nCount each criterion that a correct run would fail purely because of when it was evaluated."
  },
  {
    "name": "Cross-Turn State Not Covered",
    "severity": "Major",
    "definition": "The task carries a revision turn or a deferred asset, but no criterion checks that content established in earlier turns survived it. The highest-signal behavior in the multi-turn format — whether the agent revises in place or regenerates and loses prior work — goes ungraded.\n\nCount once per task where the modifier is present and unchecked."
  },
  {
    "name": "Missing Criteria — Non-critical Requirements",
    "severity": "Moderate",
    "definition": "Count each missing rubric that ought to check for an explicit requirement in the prompt or a critical implicit expectation of the prompt as one issue (critical = you cannot imagine a good response without it)\n\nCBs are expected to provide up to 5 spot checks if there are sufficiently similar outcomes or outcomes where a single underlying \"ask\" would expand into multiple rubric criteria , as well as add a criterion to check the volume of the outcomes.\n- If there are more than 5 spot checks for a group, use the [Non-Fail - Too Many Spot Checks] category.\n- Each missing volume check would count as a missing criteria\n- Each group’s missing spot checks would count as a singular missing criteria\n\nExample 1:\nOutput: provides 200 emails\nRubric: Has 3 criteria that check random emails among the list + a criterion that checks that “the model sends at least 200 replies”\n\nNote:\nANTI-DOUBLE-COUNT RULE:\nA requirement is NOT missing if:\n- Another criterion in the rubric already checks the same requirement at a different granularity (e.g., section identity pinned by criterion A, section content graded by criterion B — do not flag \"missing check for content in section A\" separately)\n- Wording latitude on an existing criterion covers the correct content; the fix is one tightening pass on that criterion, not N new \"missing\" entries\n- The prompt permits optionality (e.g., \"the model may pick any of the flagged issues\") — optionality is a valid authoring choice, not a missing check"
  },
  {
    "name": "Overlapping/Redundant Criteria",
    "severity": "Moderate",
    "definition": "Criterion that is either completely redundant because other criteria completely encompass the former or multiple criteria that check for the same thing partly\nThis can also apply to criteria which have direct semantic overlap with oppositely weighted criteria.\nE.g., “The agent only references information obtained from tool calls” (positive) and “The agent references information external to tool call outputs” (negative)\nThese criteria are essentially evaluating the same aspect—just with different weight polarities.\n\nCount each completely redundant criteria as one moderate issue or count multiple overlapping criteria as one moderate issue\n\nRedundant Scenario:\nCriteria 1: Response does a, b, c\nCriteria 2: Response does a, b\n\nOverlap Scenario:\nCriteria 1: Response does a, b, c\nCriteria 2: Response does b, c, d\n\nNote that this applies to cases where two criteria independently assess the same elements, not when a single criterion introduces and specifies related requirements. (\"The response follows best code practices by ensuring that each line is under 79 characters\" is acceptable.)\n\nNOTE: For criteria pertaining to the Desired Outcome, see “Overlapping or Redundant Criteria - Desired Outcome” (major issue, above) instead."
  },
  {
    "name": "Overfitting and Underfitting",
    "severity": "Moderate",
    "definition": "Overfitting: Criteria that are overly specific, inflexible or too rigid - they incorrectly reject a subset of valid implementations\nUnderfitting: Criteria that are overly broad, permissive or loose - they accept valid implementations, but also incorrectly accept invalid implementations too\n\nCriteria must be flexible enough to accept different valid implementations. Note that criteria can mention specific answers as long as they are provided as examples in any way. i.e. within parentheses, or along with “for example” wording, or any other form of not limiting the answer.\n\nConversely, criteria must not be too permissive or overly broad, such that they would also accept invalid implementations along with valid implementations.\n\nNotes:\nA criterion is NOT OVERFIT if:\n- The prompt / audio / memo explicitly requires the check (verbatim, paraphrased, or by clear implication)\n- The check reproduces content already named or quoted in the source (e.g., prompt says \"include example wording from the emails\" → criterion checks the real flagged phrase, this is not overfitting, it's the standard way to verify the requirement)\n- The check is a \"one representative per group\" pattern where the source requested representatives (e.g., one example quote per section)\n\nA criterion is NOT underfit when:\n- The source says \"capture the content\" / \"include the information\" / \"reflect the section\" — semantic space is intentional here.\n- The section identity or structural anchor is pinned by ANOTHER criterion in the rubric (e.g., criterion A checks the section title verbatim; criterion B may check the section's content with wording latitude, since A already locks the identity).\n- The wording latitude is bounded by other criteria in the set (e.g., a schema-check criterion pins column names; the value-check criterion can allow value latitude).\n- It checks that the agent produces the correct value or information without specifying which file or artifact it should appear in. As long as a separate criterion verifies that the required artifact(s) exist, individual criteria can focus purely on content accuracy without repeating the target location.\n\nWHEN FLAGGING AS OVERFITTING:\n- Cite the specific line/section of the prompt / audio / memo the criterion goes beyond. If you can't cite it, the flag can't stand.\n\nUNDERFITTING vs. WORDING LATITUDE:\n- Wording latitude in a criterion is only underfitting if the source explicitly says \"exactly as written\" / \"verbatim\" / \"word for word\".\n- If the source says \"capture the content\" or \"include an example\", the criterion may allow semantic space without being underfit.\n\nNote:\nA criterion is NOT underfit when:\nIt verifies the value correctness but doesn't specify a targetted response/artifact. There should still be a criterion that checks to see if the final artifact(s) are present; however, not every criteria needs to specfically state the target."
  },
  {
    "name": "Subjective Criteria",
    "severity": "Moderate",
    "definition": "Criteria that are subjective, vague or immeasurable (e.g., “the response should have good formatting” or “code must be optimal”)\n\nA criterion should be evaluated based on whether its primary requirement is measurable, even if it includes additional context or reasoning that's less precise\nUsing vague or subjective qualifiers like “appropriate”, “properly”, “best practices”, “reasonable” etc without attaching explicit definitions makes criteria unmeasurable and should be flagged here.\n\nSubjectivity with certain details should be acceptable when the prompt is intentionally ambiguous and open-ended\nFor example, for a prompt \"Create an artistic website to showcase my sculptures, featuring an animated background that looks like shifting, fluid marble\", the following rubric is acceptable: \"The website has a refined modern look so it could be launched as a product by a reputable company.\"\n\nNOTE: This does not apply to the subjective criteria section"
  },
  {
    "name": "Incorrect Weights - Major",
    "severity": "Moderate",
    "definition": "Criteria that are objectively incorrectly weighted by two levels, e.g., 1 is selected when 5 is appropriate or vice versa\n\nCriteria are categorized into one of 6 weight buckets: 5/3/1/-1/-3/-5, see the table below for descriptions and examples of each weight category.\n\n NOTE: Weights should reflect the difficulty of the thing the verifier is testing, NOT importance to responding to the prompt."
  },
  {
    "name": "Criteria Not Atomic - Minor",
    "severity": "Moderate",
    "definition": "Criterion groups two or more constraints that are only partially related. You can think of all of these constraints as part of one coherent instruction.\n\nEach rubric should evaluate one thing only — no bundling of multiple behaviors. Ask yourself if the criterion is evaluating more than one idea.\n\nNOTE: Rubrics in this project are limited in length and assess large trajectories. Criteria may assess multiple parts of the trajectory, as long as the assessment concerns related components, i.e., could be unified under one general idea.\n\n NOTE: CBs are recommended to include a \"schema check\" criterion in their rubrics that may otherwise seem somewhat non-atomic. These criteria should not be penalized for atomicity.\n    Example of a Schema Check criterion:\n        gabriela_listing_audit.csv parses as a CSV file and contains the columns\n        property_address, issue_type, severity, universe_source,\n        uploaded_media_source, listing_or_note_claim,\n        observed_visual_condition, and recommended_follow_up."
  },
  {
    "name": "Double Negative",
    "severity": "Moderate",
    "definition": "A negative criteria penalizes something absent from the response instead of rewarding an equivalent thing being present\n\nExample: “The response does not do ABC” weighted as -1, -3, or -5."
  },
  {
    "name": "Block Bleed",
    "severity": "Moderate",
    "definition": "A deterministic value check placed in the subjective block, or a presentation judgment placed in the objective block. Distinct from Miscategorized Criteria, which concerns the category tag rather than which block the criterion belongs to.\n\nCount each misplaced criterion. The fix is to move it, never to duplicate it across both blocks."
  },
  {
    "name": "Simulator-Dependent Criteria",
    "severity": "Moderate",
    "definition": "Criterion can only be evaluated by knowing what the simulated user said, rather than what the agent produced. The simulator reproduces intent and may word the same intent differently on each run, so a criterion resting on the user's phrasing is not reproducible across rollouts.\n\nExample: \"the agent correctly interprets the user's request to lead with the material\" — grade the artifact, not the exchange."
  },
  {
    "name": "Miscategorized Criteria",
    "severity": "Moderate",
    "definition": "Criteria are objectively tagged with the wrong category only when there is a clearly better one available and the chosen category has no observable link to what the criterion is actually checking — no signal, no keyword, and no dimension of that category's definition (below) can be tied to the criterion. When more than one category could fit, any of the applicable categories is acceptable. CBs are allowed to select the closest category if none of the available ones perfectly apply.\n\nNOTE: A miscategorization only counts as a minor issue only when it meets the bar above.\n\nList of Categories and defnitions\nTask Completion: Was the core goal achieved?\n\nAsk: \"If this item fails, did the agent fail the main thing the user wanted?\" If yes → Task Completion.\nThe deliverable itself: a file that should exist, a record that should be created, content that should be produced.\nvs Instruction Following: Task Completion is the what they came for; Instruction Following is a constraint on how. \"Produced the expense report\" = Completion. \"Report is in .xlsx not .csv\" = Instruction Following.\nvs Tool Use: Completion is the result; Tool Use is the method. \"The 3 reservations are cancelled\" = Completion. \"Used the booking system to do it\" = Tool Use.\n\nInstruction Following: Was an explicit constraint from the prompt obeyed?\n\nAsk: \"Is this item only here because the user specifically said so?\" If the requirement came from the prompt's wording (format, count, scope, exclusion, deadline) rather than the task's nature → Instruction Following.\nTest: remove the user's stated constraint — does the item still matter? If no, it's Instruction Following, not Completion.\nThese are typically the most \"arbitrary\"-looking items, because they encode user preference, not task logic.\n\nFactuality & Hallucination: Did the agent invent something unsupported?\n\nAsk: \"Is this item about content that has no basis in the tools, inputs, or service state?\" If it's catching fabrication → here.\n\nNOTE: Checking that something the response states is correct against a known source may reasonably be Task Completion or Factuality. Either is acceptable, do not flag the choice. If checking that nothing was conjured from nowhere, that's Factuality.\n\nTool Use: Did the agent draw on the right capability?\n\nAsk: \"Is this item about the agent reaching for a real tool/skill rather than guessing or text-generating?\" If yes → Tool Use.\nPhrase as intent, never a named call. \"Grounds the answer in the system of record\" ✓ / \"Calls buildium_get_unit\" ✗.\nTie-breaker vs Agent Behavior: Tool Use is that it used a tool at all / the right kind; Agent Behavior is whether the sequence and choices were sensible.\n\nAgent Behavior: Was the reasoning path sound?\n\nAsk: \"Is this item about how the agent went about it — order, efficiency, restraint, judgment?\" If yes → Agent Behavior.\nSequencing (\"checks pricing before quoting\"), escalation (\"hands off rather than acting alone\"), restraint (\"doesn't loop,\" \"doesn't query other users' records\"), efficiency (\"no redundant steps\").\nTie-breaker vs Safety: Agent Behavior is good process; Safety is specifically irreversibility and disclosure. \"Verified before responding\" = Behavior. \"Confirmed before deleting\" = Safety.\n\nSafety & Boundaries (when applicable): Did the agent respect irreversibility and minimal disclosure?\n\nAsk: \"Could the wrong move here cause irreversible harm or leak sensitive info?\" If that's the stakes → Safety.\nThree signatures: confirmation before destructive actions; asking for the minimum info needed (over-18 vs exact birth date); not over-sharing sensitive data (account numbers, PII).\nTie-breaker: if the concern would exist even with no risk of harm, it's probably Agent Behavior; Safety is reserved for items where the risk is the point."
  },
  {
    "name": "Turn-Count Criteria",
    "severity": "Moderate",
    "definition": "Criterion checks how many turns were taken rather than what was achieved (e.g. \"the agent completes the task within three turns\"). Turn count is a property of the scenario and the simulator, not of the model's output quality."
  }
];

export const weightsNote = "Weight reflects the difficulty of what the criterion tests, not its importance to the prompt. Allowed set: {-5, -3, -1, +1, +3, +5}.";

export const difficultyDimensions: string[] = [
  "Tool/source coordination: 3+ sources reconciled OR multiple tools chained",
  "Reasoning depth: multi-step inference, conditional logic, or non-trivial calculation",
  "Modality: cross-modal (e.g., image + structured data + text)",
  "Discovery effort: information requires SQL queries, hidden field lookup, or cross-document tracing"
];

export const weightBuckets: WeightBucket[] = [
  {
    "level": "High Difficulty",
    "score": 5,
    "definition": "The model cannot satisfy the criterion through direct lookup or single-tool execution — it must integrate evidence across modalities, sources, or reasoning steps.\n\nHeuristic: 3+ dimensions exercised\n\nApplies when:\n- Image evidence must be reconciled against tool output AND policy file\n- Conditional logic depends on a value derived from one tool call AND a value from an image\n- Multi-source reconciliation requires interpretation of mismatches\n\nDoes NOT apply when:\n- The check requires only direct extraction from a single source (use 1)\n- The check requires one dimension only (use 3)",
    "examples": [
      "Reconcile a receipt image against FinTrack transactions AND apply policy rules from a separate PDF",
      "Identify a chart anomaly that requires recognizing both the visual pattern and the contextual numeric thresholds",
      "Apply a conditional based on a value derived from a tool call AND a value from an image",
      "Compute a metric that aggregates evidence from email + calendar + handwritten note"
    ]
  },
  {
    "level": "High Difficulty — cross-turn",
    "score": 5,
    "definition": "The criterion requires integrating state established in an earlier turn with information delivered in a later one. It cannot be satisfied by reading any single turn in isolation.\n\nThis is the multi-turn analogue of cross-modal coordination: the difficulty comes from carrying and reconciling context across the conversation.",
    "examples": [
      "Caption still names the label-derived material after the pricing turn rewrote it",
      "The revision preserves the exclusion list agreed at turn 2",
      "A deferred asset is reconciled against work already delivered, not treated as a fresh start"
    ]
  },
  {
    "level": "Medium Difficulty",
    "score": 3,
    "definition": "The model must do MORE than direct extraction but does not need full cross-modal coordination.\n\nHeuristic: exactly 2 dimensions exercised\n\nApplies when:\n- Cross-modal interpretation is required from a single image (e.g., reading and reasoning about a chart)\n- Multi-step reasoning is required from a single text source\n- One reconciliation step between two sources\n- One conditional or calculation derived from a single source\n\nDoes NOT apply when:\n- The check is a direct copy/lookup (use 1)\n- The check chains multiple dimensions (use 5)",
    "examples": [
      "Compare two text sources and surface a single mismatch",
      "Extract a value from an image and report it correctly",
      "Apply a single policy rule from an input file",
      "Compute a derived field from one direct source",
      "Identify which tool to use given a single conditional in the prompt"
    ]
  },
  {
    "level": "Medium Difficulty — cross-turn",
    "score": 3,
    "definition": "The criterion requires carrying one value or constraint forward across turns, without reconciling it against a second source.\n\nMore than a single-turn lookup, but no integration is involved.",
    "examples": [
      "The filename established at turn 1 is still the one written at turn 4",
      "A constraint stated once is respected in a later artifact"
    ]
  },
  {
    "level": "Low Difficulty",
    "score": 1,
    "definition": "A criterion that verifies a mechanical, single-source check. The model only has to find a piece of information and report it correctly.\n\nHeuristic: 0–1 dimensions exercised\n\nApplies when:\n- Direct value copy from the prompt or a single input file\n   - Note: Since extraction could lead to reasoning reporting steps, don't flag for this if it's the only factor in when considering \"wrong\" criteria weights.\n- Literal verification against a source the criterion already references\n- Format validation of a single field (e.g., date is YYYY-MM-DD)\n\nDoes NOT apply when:\n- Any reasoning step is required (use 3)\n- Cross-modal or cross-source coordination is required (use 3 or 5)\n\nNote:\nCLARIFICATION — \"Literal verification against a source\" means:\n- The value was AUTHORED verbatim by a human (in the prompt, in a source\n  document, in a raw data file) and the model must copy it as-is.\nIt does NOT mean:\n- The value happens to appear in another output file (MEMORY.md, a\n  summary artifact, a log) that was ITSELF produced via calc / verdict /\n  margin. In that case, the model has to reproduce the underlying\n  reasoning to write the value",
    "examples": [
      "Confirm a specific column exists in the output CSV",
      "Report a value that's directly stated in the prompt input",
      "Verify a literal value matches the source it came from",
      "Confirm a specific filename was created",
      "Confirm a tool was called with the correct argument"
    ]
  },
  {
    "level": "Common failure mode",
    "score": -5,
    "definition": "A negative criterion targeting a failure the model is STRONGLY TEMPTED to commit because the task setup naturally pulls toward it. Avoiding the failure requires sustained discipline across multiple steps.\n\nHeuristic: model defaults wrong without explicit guardrails\n\nApplies when:\n- A filename strongly suggests content the image does not actually contain — model is tempted to trust the filename\n- A 'default' tool exists but the right tool is harder to discover\n\nDoes NOT apply when:\n- The failure is rare in this universe (use -1)\n- The failure is plausible but the model has signal pointing the right way (use -3)",
    "examples": [
      "Drafts the account-support email even when the conditional says don't",
      "Trusts filename 'parking_pothole.jpg' instead of inspecting the actual oil-stain image",
      "Uses the messaging tool when the prompt clearly directs to email but messaging is the default",
      "Repeats hallucinated data from a tool output when the task setup invites it"
    ]
  },
  {
    "level": "Common failure mode — multi-turn",
    "score": -5,
    "definition": "A negative criterion targeting a failure the model is STRONGLY TEMPTED to commit because the multi-turn setup nudges toward it. Regenerating an artifact is consistently easier for the model than editing one in place, so any revision turn invites this.",
    "examples": [
      "Rewrites report.md from scratch on the revision turn, dropping the turn-2 findings",
      "Restates the whole deliverable instead of applying the one change requested",
      "Loses a value established earlier once a new asset arrives"
    ]
  },
  {
    "level": "Moderately Hard to Avoid",
    "score": -3,
    "definition": "A negative criterion targeting a failure that is a plausible default but the model has some signal pointing the right way. Avoiding the failure requires reading the prompt carefully.\n\nHeuristic: model defaults wrong about half the time\n\nApplies when:\n- Wrong behavior is a plausible default given context\n- The prompt provides enough signal that a careful model can avoid it\n- The failure is common but not inevitable\n\nDoes NOT apply when:\n- The task setup strongly pulls toward the failure (use -5)\n- The failure is rare in this universe (use -1)",
    "examples": [
      "Includes an extra metric not asked for",
      "Over-formats the output beyond what the prompt specifies",
      "Fabricates a column header when the schema is partly underspecified",
      "Adds an unrequested verification step that bloats the output",
      "Mentions a conditional branch that doesn't apply"
    ]
  },
  {
    "level": "Moderately Hard to Avoid — multi-turn",
    "score": -3,
    "definition": "A negative criterion targeting a plausible default the model has some signal pointing away from. Acting on material the user has not yet delivered is the common case: the file is visible in the workspace, but nothing in the conversation has asked for it.",
    "examples": [
      "Reads and uses the deferred price sheet at turn 1 because it is present in input_files/",
      "Pre-empts a requirement the user has not stated yet",
      "Answers a clarification-gated decision by guessing instead of asking"
    ]
  },
  {
    "level": "Rare failure mode",
    "score": -1,
    "definition": "A negative criterion targeting a failure the model almost never commits unprompted. The difficulty of avoidance is low.\n\nHeuristic: model rarely does this anyway\n\nApplies when:\n- The wrong behavior is uncharacteristic for the model\n- The failure is theoretically possible but uncommon\n- A penalty exists mainly for completeness rather than active avoidance\n\nIMPORTANT: If a failure is RARE but DAMAGING (e.g., the model leaking a password), do NOT inflate to -5. Encode the damaging failure as a unit test (mechanical pass/fail) instead. The negative-weight slot is reserved for ATTRACTIVE wrong paths the model has to resist.\n\nDoes NOT apply when:\n- The failure is plausibly tempting in this task setup (use -3)\n- The task setup strongly invites the failure (use -5)",
    "examples": [
      "Invents a brand-new tool that doesn't exist in the loadout",
      "Writes the output in a completely wrong format (e.g., XML when CSV was asked)",
      "Fabricates a person's name out of thin air",
      "Produces a deliverable in the wrong language entirely",
      "Calls a tool that has no relation to the task"
    ]
  }
];

export const standardsNote = "What the Milestones and Subjective Block Scope questions above are graded against.";

export const authoringStandards: AuthoringStandard[] = [
  {
    "name": "Writing Milestones",
    "body": "One milestone per follow-up turn. Each records INTENT — what the user wants at that point, stripped of anything specific to the response the authoring run happened to produce.\n- intent: the want, not the answer. Never a value the agent must derive from the media\n- hint_prompt: how to express that intent to a run that produced something different\n- continuation_criteria: what must be true in the output before advancing. Checkable without a judgment call\n- next_prompt_checklist: what the simulator confirms before sending the next hint\n- assets_delivered: files handed over at this step, or empty. Must exist in input_files/\n\nTEST: if a milestone only makes sense against the exact wording the first model produced, it is written wrong. Rewrite it so it still lands on a run that took another path.\n\nCommon failures: answer-level intent (\"tell it the material is brushed aluminium\"); response-coupled reference (\"fix the third bullet\" — there may be no third bullet on run two); unverifiable criteria (\"the caption is good\"); several asks bundled into one milestone; a delivered asset missing from assets_delivered."
  },
  {
    "name": "Writing Subjective Rubrics",
    "body": "Presentation only — how the artifact reads and looks, never whether its values are right. Deterministic value checks belong to the objective block; do not restate them here.\n- Name ONE observable property of the RENDERED artifact. The judge sees the render, not the intent behind it\n- Graded relative to the golden artifact, presented side by side\n- Same weight set {-5, -3, -1, +1, +3, +5}; block capped at 30% of total task weight\n- Dimensions worth covering: layout and composition, legibility, visual hierarchy, structure and narrative, cross-artifact consistency, register for the stated audience\n\nTEST: if two careful reviewers looking at the same render would disagree on PASS/FAIL, the criterion is not specific enough. Name the property.\n\nOut of scope: value checks; file existence (pytest's job); process checks (which tool, in what order); near-miss thresholds standing in for a judgment (\"at least 3 sections\" for \"well organised\"); vague impressions (\"looks professional\", \"well designed\", \"high quality\")."
  }
];

/**
 * Cross-links from a dimension into the rest of the hub, keyed by dimension
 * name. Hand-authored, and mirrored by links pointing back at
 * `/spec#<group-slug>` from the method, the checklist and the golden task.
 */
export const dimensionLinks: Record<string, XLink[]> = {
  "Architectural Depth & Friction Exposure": [
    { to: "/#failure", tag: "M5", label: "If the model sails through, the task is not ready" },
    { to: "/golden-tasks/vendor-closeout#traps", tag: "GT", label: "Seven designed friction points" },
  ],
  "Feasibility With Tools": [
    { to: "/checklist#s1", tag: "A2", label: "Confirm the loadout before you design" },
  ],
  "Genuine Media Inspection": [
    { to: "/#inputs", tag: "M2", label: "Take the attachments away" },
    { to: "/golden-tasks/vendor-closeout#inputs", tag: "GT", label: "Every input and the fact it carries" },
  ],
  Completeness: [
    { to: "/checklist#s7", tag: "G3", label: "Download the trajectories, star the preferred run" },
  ],
  "Artifact Verification": [
    { to: "/#rubrics", tag: "M6", label: "A grader with the prompt closed can still rate it" },
  ],
  "Turn Structure & Dependency": [
    { to: "/checklist#s3", tag: "C3", label: "Every follow up consumes the turn before it" },
    { to: "/golden-tasks/vendor-closeout#turns", tag: "GT", label: "What each of the four turns consumes" },
  ],
  "Simulator Answer Leak": [
    { to: "/#golden", tag: "M8", label: "Point at the intent, never at the answer" },
    { to: "/checklist#s3", tag: "C5", label: "Never flag the miss" },
  ],
  "Revision Turn Handling": [
    { to: "/checklist#s3", tag: "C4", label: "One turn changes the brief after delivery" },
    { to: "/golden-tasks/vendor-closeout#turns", tag: "GT", label: "Turn 4 is the revision turn" },
  ],
  "Intent-Level Abstraction": [
    { to: "/#milestones", tag: "M7", label: "One intent, one milestone" },
  ],
  "Artifact Completeness": [
    { to: "/checklist#s7", tag: "G2", label: "The golden passes the complete objective set" },
    { to: "/golden-tasks/vendor-closeout#golden", tag: "GT", label: "The golden deliverables" },
  ],
  "MM dependence": [
    { to: "/checklist#s2", tag: "B2", label: "Take the attachments away" },
    { to: "/#inputs", tag: "M2", label: "Attach what the person would actually have" },
  ],
  Realism: [
    { to: "/golden-tasks/vendor-closeout#inputs", tag: "GT", label: "Eleven files recovered in a rush" },
  ],
  Safety: [
    { to: "/checklist#s2", tag: "B3", label: "The hard rules for inputs" },
  ],
  "Deferred Asset Handling": [
    { to: "/checklist#s3", tag: "C4", label: "Name the deferred asset on the turn it enters scope" },
  ],
  "Overall Rubric Quality": [
    { to: "/checklist#s5", tag: "E1", label: "Walk the prompt once per turn" },
    { to: "/golden-tasks/vendor-closeout#rubrics", tag: "GT", label: "21 criteria that each pin their own value" },
  ],
  "Rubric Structure": [
    { to: "/checklist#s5", tag: "E6", label: "Every weight in the allowed set" },
  ],
  "Rubric Spot Checks": [
    { to: "/checklist#s5", tag: "E8", label: "One completeness criterion plus five spot checks" },
  ],
  "Subjective Block Scope": [
    { to: "/#subjective", tag: "M9", label: "Judge the render, nothing the prompt asked for" },
    { to: "/golden-tasks/vendor-closeout#subjective", tag: "GT", label: "Ten criteria from one comparison" },
  ],
};
