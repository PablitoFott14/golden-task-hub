# Email Draft — Vendor Cancellation Status

**Status:** DRAFT for review (not sent)
**From:** Leonard Hayes <leonard.hayes@harmonygames.co>
**To:** Arthur Blake <arthur.blake@harmonygames.co>, Robert <robert@harmonygames.co>
**Subject:** vendor closeout - where we stand
**Attachment:** vendor_cancellation.svg (one-page infographic of the three groups, with total owed + % at the top)

---

Hey Arthur, Robert,

I've attached a one-page infographic (**vendor_cancellation.svg**) that lays out the
three buckets at a glance, with the total owed and the % of our shutdown budget up top —
that's the quickest way to see where we stand. The details are below.

Quick update on where we stand with the vendor wind-down. I've filed a cancellation
receipt for every vendor whose cancellation we could confirm through **both** the
`#winddown` Slack channel **and** the supporting files. Here's the summary.

## Cancelled vendors (receipts issued)

| Vendor | Cancellation date | Confirmed by | Final amount due |
|---|---|---|---|
| Helpshift | 2026-02-10 | Leonard Hayes | $1,500.00 |
| Soundly | 2026-02-11 | Robert | None outstanding |
| Layer | 2026-02-11 | Leonard Hayes | $2,340.00 |
| Cursor | 2026-02-12 | Arthur Blake | $192.00 |

### **Total still owed across the issued receipts: $4,032.00**

That's about **8.06%** of the ~$50K all-in shutdown cost estimate I posted in the
`#executives` channel back on 2025-12-03 (the ChatGPT planning number, range
$20K–$80K) — so these confirmed vendor closeouts are roughly 8% of the projected
wind-down budget.

(Soundly is paid through the current period — nothing outstanding there.)

## Still open — needs a decision / follow-up

- **Singular** — termination email sent, but no confirmation back yet; their statement
  still shows **$7,200.00** outstanding. We need written confirmation before we can call
  this closed.
- **Unity** — termination email drafted; the account still shows **Active** (renews
  2026-04-01). Arthur, can you confirm this actually went out and chase a written
  cancellation?
- **Zapier** — flagged to cancel, no confirmation on record.
- **coderabbit** — Arthur noted it as cancelled in Slack, but we have no file to back it
  up. If you can grab a screenshot/receipt, I'll issue a proper closeout.

Everything we're keeping or moved to KubLLC (GitHub, Metabase, dbt, Deel, gusto, Intuit,
Figma, linear, Slack, Google, Carta, AWS) is captured in `MEMORY.md`.

Shout if any of the numbers look off before I pass the creditor file to Sunset and Fondo.

Thanks,
Leonard

---

### Notes for our records (not part of the email)
- "Total still owed" = sum of the **Final amount due** on the four issued cancellation
  receipts only: Helpshift $1,500.00 + Layer $2,340.00 + Cursor $192.00 + Soundly $0.00 =
  **$4,032.00**.
- Open items (Singular $7,200.00, Unity, Zapier, coderabbit) are **not** included in that
  total because they are not confirmed-cancelled and have no issued receipt.
- Percentage basis: $4,032.00 / $50,000.00 = **8.06%**. The ~$50K figure is the
  shutdown cost estimate Leonard posted in the `#executives` channel on 2025-12-03 (a
  ChatGPT planning estimate: "assume somewhere in the 20k–80k USD range... I would assume
  50k all-in as a defensible budget"). Using the range endpoints: $20K → 20.16%,
  $80K → 5.04%.
  - Note: the separate ~$15K figure mentioned later (2026-02-11) was only the Sunset
    service fee, not the all-in shutdown estimate, so it is not used here.
