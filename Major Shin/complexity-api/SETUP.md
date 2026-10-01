# Setting up Increase Complexity Proposals

Everything you need to configure for the Complexity tab to go from *showing* proposals to
*generating* them. Written for whoever owns the accounts — the hub side needs no code changes.

The page works before any of this is done. The button sits disabled, a notice explains why, and
**Load an example** renders four real proposals so the output is reviewable. Nothing below is urgent;
nothing below can break the site.

---

## Before you start: the subscription will not work for this

A Claude Pro or Max subscription covers claude.ai and Claude Code. The Messages API this function
calls is a **separate product on a separate account**, billed per token, and the 5-hour usage windows
do not apply to it. You need an API account at <https://console.anthropic.com>.

At 100 proposals a day the bill is roughly **$39–51/month** — see [Cost](#cost) at the foot.

---

## 1. Get an API key and cap the spend

1. Go to <https://console.anthropic.com> and sign in.
2. **Billing** → add a payment method and a starting balance.
3. **Limits** → set a monthly spend limit. $75 is comfortable headroom for 100 calls a day.
   Do this now rather than later: it is the backstop for everything else on this page.
4. **API keys** → *Create key*. Copy it once; the console will not show it again.

## 2. Deploy the function

From this folder (`Major Shin/complexity-api/`):

```bash
npm install
npx vercel --prod
```

Accept the defaults. Vercel prints a production URL. The endpoint is that URL plus the route:

```
https://<your-project>.vercel.app/api/complexity
```

Keep it. Step 4 needs it.

> Any host that passes a standard `Request` to a default-exported handler works unchanged —
> Cloudflare Workers, Netlify Functions, Deno Deploy. Vercel is the default only because the QC spec
> viewer already lives there.

## 3. Set the function's environment variables

In the Vercel dashboard, **Project → Settings → Environment Variables**:

| Name | Value | Required |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | the key from step 1 | **Yes** |
| `ALLOWED_ORIGIN` | `https://pablitofott14.github.io` | **Yes** |
| `ACCESS_CODE` | any string you choose | No — see [Locking it down](#locking-it-down) |

Set all three for **Production**. Then redeploy (`npx vercel --prod`) so they take effect — Vercel
does not apply new variables to an existing deployment.

`ALLOWED_ORIGIN` must be the origin only: scheme and host, no path, no trailing slash. The hub is
served from `https://pablitofott14.github.io/golden-task-hub/`, so the origin is
`https://pablitofott14.github.io`.

## 4. Point the hub at the function

The build already passes the endpoint through, so this is one setting, not a code change.

In GitHub: **repo → Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
| --- | --- |
| `COMPLEXITY_API_URL` | the full endpoint from step 2, including `/api/complexity` |
| `COMPLEXITY_ACCESS_CODE` | only if you set `ACCESS_CODE` in step 3 |

Then trigger a deploy: **Actions → Deploy to GitHub Pages → Run workflow**, or just push anything to
`main`. The secret is read at build time, so **the hub has to be rebuilt for a change to take
effect** — editing it in GitHub is not enough on its own.

## 5. Check it

1. Open <https://pablitofott14.github.io/golden-task-hub/#/complexity>.
2. The amber *No service connected yet* notice should be gone.
3. **Load from the claim sheet** → `ST-007`. Every field fills in.
4. Press **Increase complexity proposals**. Three to five proposals in 15–40 seconds.
5. In the Vercel dashboard, **Logs** shows the invocation. In the Anthropic console, **Usage** shows
   the tokens. Compare the first day's real token counts against the estimate below.

If it fails, the page keeps your form filled in and says what happened. See
[Troubleshooting](#troubleshooting).

---

## Locking it down

The function checks the `Origin` header, which is enough to stop a web page elsewhere calling it, but
an `Origin` header is trivially forged by a script. For an internal tool on a public site that is
usually fine **because the spend cap is the real limit** — the worst case is a wasted $75, not a
leaked key. The key itself never leaves the function's environment.

If you would rather not rely on that:

1. Set `ACCESS_CODE` on the function (step 3) and redeploy.
2. Set `COMPLEXITY_ACCESS_CODE` to the same value in GitHub (step 4) and rebuild.

Requests without the header are then rejected with a 401 before any model call is made, so a rejected
request costs nothing. Be clear-eyed about what this buys: the code is compiled into the page's
JavaScript and anyone can read it out. It keeps the endpoint off casual crawlers and scanners. It is
not a secret.

Two things make abuse unattractive even without it. The function rejects any value that is not in the
project's own lists — use case, subcategory, universe, artifact, capabilities, tools — so this cannot
be used as a general-purpose model proxy. And the only free text a request can carry is the scenario,
capped at 6,000 characters, which the system prompt tells the model to treat as the thing being
analysed rather than as instructions.

## Maintenance

**When a universe is added, removed or reloaded** — re-run the generator and redeploy both sides:

```bash
cd "Major Shin"
python scripts/gen_universes.py     # writes src/data/universes.ts and complexity-api/universes.ts
```

Commit, push (the hub redeploys itself), then `npx vercel --prod` from `complexity-api/` so the
function gets the new summaries. The dropdown and the context the model sees come from the same run,
so they cannot drift apart.

**When the claim sheet changes** — update
[`src/data/claimSheet.ts`](../src/data/claimSheet.ts), and if a *new capability, artifact or
connector value* appears, add it to the matching `Set` in
[`api/complexity.ts`](api/complexity.ts) too. The function deploys separately and cannot import from
the site, so those two lists are duplicated on purpose. **A value in one and not the other means the
form offers something the function rejects.**

**When the system prompt changes** — it exists twice: the authoritative copy in
[`api/complexity.ts`](api/complexity.ts) and `complexitySystemPrompt` in
[`src/data/complexity.ts`](../src/data/complexity.ts) as the reviewable one. Edit both. Keep the
function's copy byte-stable otherwise: it is sent first with `cache_control` so it caches, and any
churn in it drops the cache hit rate to zero and roughly doubles the input cost.

## Cost

Sonnet 5 is **$2.00 per million input tokens and $10.00 per million output**.

Per call: about 2,000 tokens of system prompt, 1,200 of parameters and derived universe context, and
1,000 of output.

| | Per call | 100/day | Per month |
| --- | --- | --- | --- |
| First call, or after a cache miss | ~$0.016 | — | — |
| With the system prompt cached | ~$0.012 | ~$1.30 | **~$39** |
| No caching at all | ~$0.017 | ~$1.70 | **~$51** |

Caching is already implemented and needs no configuration. Deriving the universe context server-side
rather than accepting a pasted one also helps: the summaries are a kilobyte each, where a pasted dump
could be ten times that and was unbounded in practice.

Haiku 4.5 would roughly halve this if volume ever makes that worth doing. Change `MODEL` in
`api/complexity.ts` and redeploy — nothing else depends on which model answers.

## Troubleshooting

| What you see | What it is |
| --- | --- |
| Amber *No service connected yet*, button disabled | `COMPLEXITY_API_URL` is unset, or the hub has not been rebuilt since you set it |
| *The service answered 403* | `ALLOWED_ORIGIN` does not match. It is scheme + host only, no path, no trailing slash |
| *The service answered 401* | `ACCESS_CODE` is set on the function but `COMPLEXITY_ACCESS_CODE` is missing or stale in the hub build |
| *The service answered 400* with "Unknown …" | The form offered a value the function's list does not have. See **When the claim sheet changes** |
| *The service answered 502* | The model call failed. The real error is in the Vercel function logs — it is deliberately not returned to the browser, because upstream errors can carry request detail |
| *The service is busy* (429) | Rate limited upstream. Retrying works; the form stays filled in |
| Works locally, 403 in production | `ALLOWED_ORIGIN` is set for Preview but not Production, or the variable was added without a redeploy |
