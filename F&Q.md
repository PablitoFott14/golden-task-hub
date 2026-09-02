1. **Q: Is the use of MEMORY.md mandatory in every single task?**

A: No, MEMORY.md can or can't be used, but its use is not mandatory. It's only requirement is that when used, needs to be made in a NATURAL way, in a way an actual user would be requirng MEMORY.md (planning to come back at the conversation time later,)

2. **Q: Do milestones need to be atomic, or can a single milestone cover multiple related outcomes?**

A: Yes, milestone must be atomic. Each inent of each prompt gets its own milestone.

3. **Q: What’s the difference between inputs.zip and inputs_folder?**
A: inputs.zip gets sent in the Draft History section and has no interaction with the model, while inputs_folder gets sent when setting up the run, and the model is expected to interact with in the first turn. Inputs.zip has all the multimodal inputs planned to use throughout the conversation, and unputs_folder has only the intial multimodal inputs required.

4.  **Q: If I used three prompts in Model A, do I need to enter all three in Model B before making corrections, or can I add and correct them one at a time?**
A: No. In model B you are the user simulator, and you have to be reaching milestones and hinting if the model does not. The same 3 prompts will at any point be reflected in model B, but as the conversation flows, not in any required order, just as the conversation requries while reaching the golden solution


5. **Q: Do I need to use the universe in every prompt, or is it enough for the overall task to be grounded in it?**
A: No, as long as at some point some meaningful interaction happens (ideally in turn 1). More than a single server check or a singel server write is need, multiple servers are expected to be involved and unvierse dependednce and multimodal inptus are expected to be related.

6. **Q: Do I need to explicitly tell the model when the conversation is ending?**
A: Not necessary. If we plan the converastion to end is always going to be natural to somwhow include it in the final prompt, just as done with a normal agent when you plan to send the last request (e.g., "Finally....", "one last thing..."). We don't want a last turn stating the conversation is ending or forecedly let the agent now it was the end


7. **Q: Can my task be based entirely on one app from the universe, such as FinTrack, as long as I use different parts or tables within it? Or do I need to use multiple apps?**
A: Better to avoid this, and requrie the model to at least nmeanninglfully touch two server. At its very last, if only one server is used, it shoould be used from different granuralities