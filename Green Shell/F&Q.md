## Parameters

1. **Q: Do I need to use every assigned tool?**
A: Ideally, all assigned tools should be used. When the task is properly built around its primary and secondary capabilities, the relevant tool interactions should follow naturally. The goal is to remain as close as possible to the assigned parameters, and deviations should only occur when genuinely necessary. Avoid artificial tool usage simply to tick boxes, but do not ignore assigned tools without justification.

2. **Q: Do I need to test every item listed under my assigned primary and secondary capabilities?**
A: Yes, the expectation is to cover the assigned capabilities. Tasks should be designed to exercise these capabilities through meaningful interactions with the universe. Deviations should only be considered when an actual universe limitation prevents the assigned behavior. Universe interaction and adherence to assigned parameters are particularly important.

## Universe

3. **Q: How much does my task need to use the universe?**
A: Some meaningful interaction has to happen. More than a single server check or a single server write is needed: multiple servers are expected to be involved, and universe dependence and multimodal inputs are expected to be related.

4. **Q: Can my task be based entirely on one app from the universe, such as FinTrack, as long as I use different parts or tables within it? Or do I need to use multiple apps?**
A: Better to avoid this, and require the model to at least meaningfully touch two servers. At the very least, if only one server is used, it should be used at different granularities.

## Inputs

5. **Q: If my assigned input modality is "Text", does the minimum requirement of three multimodal inputs still apply? Do I need three text files? Can I use images or videos?**
A: The minimum of three multimodal inputs still applies. "Text" refers to the type of information the model must process, not necessarily the file format. Text can be presented through images, videos, documents, or other formats, provided the model must genuinely process that textual information and reconcile it with the universe. Three .txt or .md files are not necessarily required, and other media formats can be included when they naturally support the task. Natural distractors are acceptable when purposeful. Three inputs are only the minimum: more complex multimodal interactions are often necessary to genuinely challenge the model.

6. **Q: What should I do if my preseeded image is missing or returns a "Page Not Found" error?**
A: Preseeded images are optional reference materials, not mandatory task inputs. You can use the provided images, create your own, or combine both. If the image is missing or inaccessible, create suitable multimodal context yourself. A missing preseeded image should not prevent task development.

7. **Q: What's the difference between inputs.zip and inputs_folder?**
A: inputs.zip gets sent in the Draft History section and has no interaction with the model. It carries every file the prompt refers to, including at least three multimodal inputs covering every assigned input modality. inputs_folder gets uploaded as a normal folder when setting up the run, and Create Universe makes it what the agent works with. The task is single turn, so nothing is held back for later.

8. **Q: Can noise be included as part of the multimodal inputs?**
A: Yes, noise and distractor files are encouraged, as long as they feel naturally messy in the environment we are creating. Section 1.2.2 governs it: every file has to be intentional, either contributing required signal or serving a meaningful distractor or noise role. No junk files, no filename, manifest or helper document revealing the answer, and every input still has to be gradable by a human reviewer.

## Conversation

9. **Q: Is the use of MEMORY.md mandatory in every single task?**
A: No, MEMORY.md can or can't be used, but its use is not mandatory. Its only requirement is that when used, it needs to be made in a NATURAL way, the way an actual user would require MEMORY.md (planning to come back to the conversation later).

10. **Q: How do I correct the model in Leg B?**
A: Leg B starts a new conversation on the same prompt, word for word. You are the user simulator: you send what the conversation needs next to reach the golden solution, and hint when the model does not get there. Hints stay at the intent level, from the user's point of view, and never leak the answer.

## Rubrics

11. **Q: Can a subjective rubric be negative, or does the block have to be positive criteria?**
A: Negatives are expected. One gets written whenever something negatively impacting the UX is spotted in the comparison. The weight set is the same as the objective block, −5, −3, −1, +1, +3, +5, and the meaning is the impact on the user experience: a positive weight is the benefit when the property is there, a negative weight is the damage when the flaw is there, never how hard it was to achieve.

12. **Q: Does every subjective criterion have to be not present in Model A?**
A: No, no present / not present requirement exists on either model. Subjective rubrics are created by comparing the Model A and Model B outputs, so positives naturally end up more tied to Model B and negatives to Model A, as those are the runs performing better and worse respectively. That is a tendency, not a rule: a positive can be present in Model A, and a negative can be not present in both. What is not intended is a negative being present in the golden solution, as that is the best possible solution and nothing negatively impacting the user can exist in it.

## Support

13. **Q: Are support War Rooms available on weekdays?**
A: Weekday War Room support is expected, although availability may vary. Pablo generally covers 7 AM to 11 AM PDT, and additional support may be available outside those hours. Contributors can reach out when they need clarification, and support can join when available.
