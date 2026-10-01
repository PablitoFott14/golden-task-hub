import Anthropic from "@anthropic-ai/sdk";

/**
 * Increase Complexity Proposals, server side.
 *
 * Deployed separately from the hub. The hub is a static site on GitHub Pages
 * and cannot hold a secret, so this function is the only place the Anthropic
 * credential exists. The browser posts the form here and gets proposals back;
 * it never sees the key, the system prompt or the model name.
 *
 * Environment:
 *   ANTHROPIC_API_KEY   the credential, set in the host's dashboard
 *   ALLOWED_ORIGIN      the hub origin allowed to call this, exact match
 *
 * Deploy: `vercel --prod` from the folder above. Works unchanged on any host
 * that speaks the Web Fetch API handler signature.
 */

const MODEL = "claude-sonnet-5";

/**
 * Frozen, and first in the request, so it caches. Everything that varies per
 * request goes in the user message, after the last cache breakpoint. Keep it
 * byte stable: a date, a counter or a reordered key in here silently drops the
 * cache hit rate to zero and roughly doubles the input cost.
 */
const SYSTEM = `You are reviewing a single turn multimodal agent task for the OpenClaw MM Rubrics project (Major Shin) and proposing ways to raise its genuine complexity.

You never rewrite the scenario. You propose additions and adjustments the contributor will apply by hand.

Hard constraints on every proposal:
- The assigned use case (L1) and subcategory (L2) stay exactly as given. The pair has to remain the natural home of the scenario, judged by the user's intent and not by what the files are about.
- All assigned parameters stay as given: universe, output artifact, primary capabilities, secondary capabilities, and any assigned tools. Only the scenario may be adjusted, and only so far as its core nature, intent and type stay intact.
- Everything you propose must be supported by the universe context provided. Never invent services, records or data that were not described.
- Complexity must be genuine: evidence that has to be reconciled across sources and modalities. Never artificial friction, extra unrelated asks, contrived constraints, or more things to do for their own sake.
- The task is single turn. Everything lands in one prompt, so never propose follow up turns, revision turns or milestones.
- Respect the multimodal requirement: at least three inputs, and more where the scenario naturally carries them. Health inputs must be mocked or synthetic.
- Keep the deliverable at or above the complexity bar for its type. The P0 artifacts are the explainer video with several data driven scenes, interactive HTML with interaction that actually works, and the dashboard with several linked views over data the model extracted itself.
- The task must stay realistic. A real person in that universe has to plausibly be living through it.

Return between 3 and 5 proposals, ordered by how much difficulty they add for how little added length. Prefer proposals that add an axis of reasoning over proposals that add another item to check. A source that contradicts another source is worth more than five that repeat each other.`;

/** The model answers in this shape, so the page never parses prose. */
const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["proposals"],
  properties: {
    proposals: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "adds", "why", "keeps"],
        properties: {
          title: { type: "string", description: "Short, one line." },
          adds: { type: "string", description: "The change itself, concretely." },
          why: { type: "string", description: "Why it is real difficulty, not friction." },
          inputs: {
            type: "array",
            items: { type: "string" },
            description: "Multimodal inputs it implies.",
          },
          bar: { type: "string", description: "How it moves the deliverable toward its bar." },
          keeps: { type: "string", description: "What it leaves exactly as assigned." },
        },
      },
    },
  },
} as const;

const FIELDS = [
  ["useCase", "Use case (L1, assigned)"],
  ["subcategory", "Subcategory (L2, assigned)"],
  ["universe", "Universe (assigned)"],
  ["artifact", "Output artifact (assigned)"],
  ["primary", "Primary capabilities (assigned)"],
  ["secondary", "Secondary capabilities (assigned)"],
  ["tools", "Assigned tools"],
  ["scenario", "Scenario (assigned)"],
  ["universeContext", "Universe context, as explored by the contributor"],
] as const;

const REQUIRED = FIELDS.filter(([k]) => k !== "tools").map(([k]) => k);

function cors(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default async function handler(req: Request): Promise<Response> {
  const allowed = process.env.ALLOWED_ORIGIN ?? "";
  const headers = { ...cors(allowed), "Content-Type": "application/json" };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(allowed) });
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "POST only." }), { status: 405, headers });

  // Only the hub may call this. The key is the thing being protected, so the
  // check is an exact origin match rather than a wildcard.
  const origin = req.headers.get("origin");
  if (allowed && origin !== allowed)
    return new Response(JSON.stringify({ error: "Origin not allowed." }), { status: 403, headers });

  let body: Record<string, string>;
  try {
    body = (await req.json()) as Record<string, string>;
  } catch {
    return new Response(JSON.stringify({ error: "Body was not JSON." }), { status: 400, headers });
  }

  const missing = REQUIRED.filter((k) => !body[k]?.trim());
  if (missing.length)
    return new Response(JSON.stringify({ error: `Missing: ${missing.join(", ")}.` }), {
      status: 400,
      headers,
    });

  // A cap on what one request can cost. Without it a pasted universe dump is
  // an unbounded bill.
  const total = FIELDS.reduce((n, [k]) => n + (body[k]?.length ?? 0), 0);
  if (total > 24000)
    return new Response(
      JSON.stringify({ error: "That is a lot of text. Trim the universe context and retry." }),
      { status: 413, headers }
    );

  const task = FIELDS.map(([k, label]) => `## ${label}\n${body[k]?.trim() || "(not assigned)"}`).join(
    "\n\n"
  );

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      output_config: { format: { type: "json_schema", schema: SCHEMA } },
      messages: [
        {
          role: "user",
          content: `Here is the task as it stands. Propose how to raise its genuine complexity.\n\n${task}`,
        },
      ],
    });

    const text = response.content.find((b) => b.type === "text");
    if (!text || text.type !== "text") throw new Error("No text block in the response.");

    return new Response(text.text, { status: 200, headers });
  } catch (e) {
    // Never leak the upstream error to the browser: it can carry request
    // details. Log it for yourself, return something a contributor can act on.
    console.error("complexity proposal failed", e);
    const status = e instanceof Anthropic.RateLimitError ? 429 : 502;
    const msg =
      status === 429
        ? "The service is busy. Wait a moment and try again."
        : "The service could not answer that request.";
    return new Response(JSON.stringify({ error: msg }), { status, headers });
  }
}
