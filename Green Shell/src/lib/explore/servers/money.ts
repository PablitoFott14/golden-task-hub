import { titleCase, type Claim, type Registry } from "../people";
import { GROUP_DAY, GROUP_MONTH, MONTH_FACET, SORT_NEW, SORT_OLD, WEEKDAY_FACET, arr, groupFacet, money, num, pretty, str, type Ctx, type Rec, type ServerDef } from "../ctx";
import type { Column, Item, RangeDef, Sort } from "../types";

/**
 * Plaid, Fintrack and Duffel. Money is stored the persona's way round in
 * Explore: negative is money out, positive is money in. Plaid states an
 * outflow as a positive amount and Fintrack as a negative one, so Plaid's sign
 * is flipped and Fintrack's kept, and the two read the same.
 */

/** A payment to or from a person: "Zelle to Hazel Marsh", "ZELLE PMT TO EFUA MENSAH 05/01". */
export function payeeOf(merchant: string): string | null {
  const m = /^(?:zelle|venmo|cash\s*app|paypal|apple\s*cash)\b[^a-z]*(?:pmt|payment|transfer|sent|received)?\s*(?:to|from)\s+(.+?)(?:\s+\d{1,2}\/\d{1,2})?$/i.exec(merchant.trim());
  if (!m) return null;
  const name = m[1].replace(/[^A-Za-z' -]/g, " ").replace(/\s+/g, " ").trim();
  return /\s/.test(name) ? titleCase(name) : null;
}

function claimMerchant(reg: Registry, merchant: string, raw = "") {
  if (!merchant) return;
  const payee = payeeOf(merchant) ?? payeeOf(raw);
  if (payee) reg.claim({ names: [payee], kind: "person", strength: 0.5 });
  else reg.claim({ names: [merchant], org: true, kind: "org", strength: 0.5 });
}

function merchantEntity(ctx: Ctx, merchant: string, raw = ""): { e: number; payee: boolean } | null {
  if (!merchant) return null;
  const payee = payeeOf(merchant) ?? payeeOf(raw);
  if (payee) return { e: ctx.person({ names: [payee] }), payee: true };
  return { e: ctx.person({ names: [merchant], org: true }), payee: false };
}

const AMOUNT_RANGE: RangeDef = { id: "amount", label: "Amount", get: (it) => (it.amount === null ? null : Math.abs(it.amount)), money: true };
const SORT_OUT: Sort = { id: "out", label: "Largest money out", key: (it) => (it.amount !== null && it.amount < 0 ? -it.amount : null), dir: -1 };
const SORT_IN: Sort = { id: "in", label: "Largest money in", key: (it) => (it.amount !== null && it.amount > 0 ? it.amount : null), dir: -1 };
const SORT_ABS: Sort = { id: "abs", label: "Largest amount", key: (it) => (it.amount === null ? null : Math.abs(it.amount)), dir: -1 };

const flowOf = (amount: number) => (amount < 0 ? "Money out" : amount > 0 ? "Money in" : "Zero");

/* ------------------------------------------------------------------ plaid */

export const plaid: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.users)) reg.claim({ self: true, emails: [str(u.email)] });
    for (const t of arr(seed.transactions)) claimMerchant(reg, str(t.merchant_name) || str(t.name), str(t.name));
    for (const s of arr(seed.recurring_streams)) claimMerchant(reg, str(s.merchant_name) || str(s.description), str(s.description));
  },
  build(seed, ctx, server) {
    const items = new Map(arr(seed.items).map((i) => [str(i.id), i]));
    const accounts = new Map(arr(seed.accounts).map((a) => [str(a.id), a]));
    const acctLabel = (id: string) => {
      const a = accounts.get(id);
      return a ? `${str(a.name) || str(a.official_name)} ••${str(a.mask)}` : id;
    };
    const streamOf = new Map<string, Rec>();
    for (const s of arr(seed.recurring_streams)) for (const t of Array.isArray(s.transaction_ids) ? s.transaction_ids : []) streamOf.set(str(t), s);

    const accountsDs = ctx.dataset(server, {
      id: "accounts",
      label: "Accounts",
      noun: "accounts",
      row: "account",
      facets: [
        { id: "institution", label: "Bank", primary: true },
        { id: "type", label: "Type" },
        { id: "holder", label: "Holder" },
      ],
      sorts: [{ id: "balance", label: "Largest balance", key: (it) => (it.amount === null ? null : Math.abs(it.amount)), dir: -1 }],
      groups: [groupFacet("institution", "Bank")],
      defaultSort: "balance",
      defaultGroup: "institution",
      note: "Open an account to filter its transactions.",
    });
    for (const a of arr(seed.accounts)) {
      const bal = (a.balances ?? {}) as Rec;
      const owed = /credit|loan/.test(str(a.type));
      const current = num(bal.current) ?? 0;
      ctx.add(accountsDs, {
        id: str(a.id),
        title: acctLabel(str(a.id)),
        sub: str(a.official_name),
        amount: owed ? -Math.abs(current) : current,
        f: { institution: str(items.get(str(a.item_id))?.institution_name) || "Bank", type: pretty(a.subtype || a.type), holder: pretty(a.holder_category) },
        n: { available: num(bal.available) ?? NaN, limit: num(bal.limit) ?? NaN },
        raw: a,
      });
    }

    const txns = ctx.dataset(server, {
      id: "transactions",
      label: "Transactions",
      noun: "transactions",
      row: "txn",
      facets: [
        { id: "account", label: "Account", primary: true },
        { id: "flow", label: "Direction", order: "given", given: ["Money out", "Money in", "Zero"], primary: true },
        { id: "category", label: "Category", primary: true, top: 10 },
        { id: "detail", label: "Subcategory", top: 10 },
        { id: "merchant", label: "Merchant or payee", entity: true, top: 12 },
        { id: "channel", label: "Channel" },
        { id: "code", label: "Type" },
        { id: "recurring", label: "Recurring", top: 8 },
        { id: "pending", label: "Status", order: "given", given: ["Posted", "Pending"] },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD, SORT_OUT, SORT_IN, SORT_ABS],
      groups: [
        { id: "merchant", label: "Merchant", key: (it) => it.f.merchant, entity: true, order: "count", sum: true },
        { ...groupFacet("category", "Category"), sum: true },
        { ...groupFacet("account", "Account"), sum: true },
        { ...GROUP_MONTH, sum: true },
        { ...GROUP_DAY, sum: true },
      ],
      defaultSort: "new",
      ranges: [AMOUNT_RANGE],
      chart: "money",
    });
    for (const t of arr(seed.transactions)) {
      const merchant = str(t.merchant_name) || str(t.name);
      const who = merchantEntity(ctx, merchant, str(t.name));
      const pfc = (t.personal_finance_category ?? {}) as Rec;
      const primary = str(pfc.primary);
      const amount = -(num(t.amount) ?? 0);
      const stream = streamOf.get(str(t.id));
      ctx.add(txns, {
        id: str(t.id),
        title: merchant || "Transaction",
        sub: `${acctLabel(str(t.account_id))} · ${pretty(primary) || "Uncategorised"}`,
        text: str(t.name),
        when: t.datetime ?? t.authorized_datetime ?? t.date,
        amount,
        people: who ? [ctx.ref(who.e, who.payee ? "payee" : "merchant")] : [],
        f: {
          account: acctLabel(str(t.account_id)),
          flow: flowOf(amount),
          category: pretty(primary) || "Uncategorised",
          detail: pretty(str(pfc.detailed).replace(new RegExp("^" + primary + "_?"), "")) || pretty(primary) || "Uncategorised",
          merchant: who ? [ctx.ekey(who.e)!] : [],
          channel: pretty(t.payment_channel) || "Other",
          code: pretty(t.transaction_code) || "Other",
          recurring: stream ? str(stream.merchant_name) || str(stream.description) : "Not recurring",
          pending: t.pending ? "Pending" : "Posted",
        },
        n: { mask: Number(accounts.get(str(t.account_id))?.mask) || NaN },
        raw: t,
      });
    }

    const streams = arr(seed.recurring_streams);
    if (streams.length) {
      const ds = ctx.dataset(server, {
        id: "recurring",
        label: "Recurring",
        noun: "recurring series",
        row: "txn",
        facets: [
          { id: "flow", label: "Direction", order: "given", given: ["Money out", "Money in"] },
          { id: "frequency", label: "Frequency" },
          { id: "status", label: "Status" },
          { id: "active", label: "Active", order: "given", given: ["Active", "Ended"] },
          { id: "account", label: "Account" },
        ],
        sorts: [{ ...SORT_ABS, label: "Largest average" }, { ...SORT_NEW, label: "Latest charge first" }],
        groups: [groupFacet("frequency", "Frequency")],
        defaultSort: "abs",
        note: "Series Plaid found, each with the transactions in it.",
      });
      for (const s of streams) {
        const merchant = str(s.merchant_name) || str(s.description);
        const who = merchantEntity(ctx, merchant, str(s.description));
        const avg = num(s.average_amount) ?? 0;
        const inflow = str(s.flow) === "inflow";
        const amount = inflow ? Math.abs(avg) : -Math.abs(avg);
        ctx.add(ds, {
          id: str(s.id),
          title: merchant,
          sub: `${pretty(s.frequency)} · average ${money(Math.abs(avg))}${s.predicted_next_date ? ` · next ${str(s.predicted_next_date)}` : ""}`,
          text: str(s.description),
          when: s.last_date,
          amount,
          people: who ? [ctx.ref(who.e, who.payee ? "payee" : "merchant")] : [],
          f: {
            flow: inflow ? "Money in" : "Money out",
            frequency: pretty(s.frequency),
            status: pretty(s.status),
            active: s.is_active === false ? "Ended" : "Active",
            account: acctLabel(str(s.account_id)),
          },
          n: { last: Math.abs(num(s.last_amount) ?? 0), count: Array.isArray(s.transaction_ids) ? s.transaction_ids.length : 0 },
          links: (Array.isArray(s.transaction_ids) ? s.transaction_ids : []).map((id: unknown) => ({ key: `${server}/transactions/${str(id)}`, why: "In this series", back: "Part of a recurring series" })),
          raw: s,
        });
      }
    }

    const liab = [
      ...arr(seed.credit_liabilities).map((l) => ["Credit card", l] as const),
      ...arr(seed.mortgage_liabilities).map((l) => ["Mortgage", l] as const),
      ...arr(seed.student_liabilities).map((l) => ["Student loan", l] as const),
    ];
    if (liab.length) {
      const ds = ctx.dataset(server, { id: "liabilities", label: "Liabilities", noun: "liabilities", row: "account", facets: [{ id: "kind", label: "Kind" }], sorts: [SORT_NEW], groups: [], defaultSort: "new" });
      for (const [kind, l] of liab) {
        ctx.add(ds, {
          id: str(l.id) || str(l.account_id),
          title: `${kind}, ${acctLabel(str(l.account_id))}`,
          sub: [l.next_payment_due_date ? `next due ${str(l.next_payment_due_date)}` : "", l.minimum_payment_amount ? `minimum ${money(Number(l.minimum_payment_amount))}` : "", l.next_monthly_payment ? `monthly ${money(Number(l.next_monthly_payment))}` : ""].filter(Boolean).join(" · "),
          when: l.next_payment_due_date ?? l.last_payment_date,
          f: { kind },
          links: [{ key: `${server}/accounts/${str(l.account_id)}`, why: "Account", back: "Liability" }],
          raw: l,
        });
      }
    }
    generic(ctx, server, seed, ["users", "items", "accounts", "transactions", "recurring_streams", "credit_liabilities", "mortgage_liabilities", "student_liabilities"]);
  },
};

/* --------------------------------------------------------------- fintrack */

export const fintrack: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.users)) reg.claim({ self: true, emails: [str(u.email)], phones: [str(u.phone)] });
    for (const t of arr(seed.transactions)) claimMerchant(reg, str(t.merchant));
  },
  build(seed, ctx, server) {
    const byLast4 = new Map(arr(seed.accounts).map((a) => [str(a.last_four), a]));
    const acctLabel = (last4: string) => {
      const a = byLast4.get(last4);
      return a ? `${str(a.institution_name)} ${pretty(a.account_type).toLowerCase()} ••${last4}` : `••${last4}`;
    };
    const accountsDs = ctx.dataset(server, {
      id: "accounts",
      label: "Accounts",
      noun: "accounts",
      row: "account",
      facets: [{ id: "institution", label: "Bank" }, { id: "type", label: "Type" }],
      sorts: [{ id: "balance", label: "Largest balance", key: (it) => (it.amount === null ? null : Math.abs(it.amount)), dir: -1 }],
      groups: [],
      defaultSort: "balance",
      note: "Open an account to filter its transactions.",
    });
    for (const a of arr(seed.accounts)) {
      ctx.add(accountsDs, {
        id: str(a.account_id),
        title: acctLabel(str(a.last_four)),
        sub: pretty(a.status),
        amount: num(a.balance),
        f: { institution: str(a.institution_name), type: pretty(a.account_type) },
        raw: a,
      });
    }
    const txns = ctx.dataset(server, {
      id: "transactions",
      label: "Transactions",
      noun: "transactions",
      row: "txn",
      facets: [
        { id: "account", label: "Account", primary: true },
        { id: "flow", label: "Direction", order: "given", given: ["Money out", "Money in", "Zero"], primary: true },
        { id: "category", label: "Category", primary: true, top: 12 },
        { id: "merchant", label: "Merchant or payee", entity: true, top: 12 },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD, SORT_OUT, SORT_IN, SORT_ABS],
      groups: [
        { id: "merchant", label: "Merchant", key: (it) => it.f.merchant, entity: true, order: "count", sum: true },
        { ...groupFacet("category", "Category"), sum: true },
        { ...groupFacet("account", "Account"), sum: true },
        { ...GROUP_MONTH, sum: true },
        { ...GROUP_DAY, sum: true },
      ],
      defaultSort: "new",
      ranges: [AMOUNT_RANGE],
      chart: "money",
    });
    for (const t of arr(seed.transactions)) {
      const merchant = str(t.merchant);
      const who = merchantEntity(ctx, merchant);
      const amount = num(t.amount) ?? 0;
      ctx.add(txns, {
        id: str(t.transaction_id),
        title: merchant || "Transaction",
        sub: `${acctLabel(str(t.account_last_four))} · ${pretty(t.category) || "Uncategorised"}`,
        when: t.timestamp ?? t.date,
        amount,
        people: who ? [ctx.ref(who.e, who.payee ? "payee" : "merchant")] : [],
        f: {
          account: acctLabel(str(t.account_last_four)),
          flow: flowOf(amount),
          category: pretty(t.category) || "Uncategorised",
          merchant: who ? [ctx.ekey(who.e)!] : [],
        },
        n: { mask: Number(t.account_last_four) || NaN },
        raw: t,
      });
    }
    const subs = arr(seed.subscriptions);
    if (subs.length) {
      const ds = ctx.dataset(server, {
        id: "subscriptions",
        label: "Subscriptions",
        noun: "subscriptions",
        row: "txn",
        facets: [{ id: "frequency", label: "Billing" }, { id: "status", label: "Status" }],
        sorts: [{ ...SORT_ABS, label: "Most expensive" }, { id: "next", label: "Next billed first", key: (it) => it.at, dir: 1 }],
        groups: [],
        defaultSort: "next",
      });
      for (const s of subs) {
        ctx.add(ds, {
          id: str(s.subscription_id),
          title: str(s.service_name),
          sub: `${money(num(s.amount) ?? 0)} ${pretty(s.billing_frequency).toLowerCase()} · next ${str(s.next_billing_date)}`,
          when: s.next_billing_date,
          amount: -(num(s.amount) ?? 0),
          people: [ctx.ref(ctx.person({ names: [str(s.service_name)], org: true }), "merchant")],
          f: { frequency: pretty(s.billing_frequency), status: pretty(s.status) },
          raw: s,
        });
      }
    }
    generic(ctx, server, seed, ["users", "accounts", "transactions", "subscriptions"]);
  },
};

/** Plaid and Fintrack hold the same bank accounts: a transaction of the same
 *  amount on the same account a day apart at most is the same transaction. */
export function linkLedgers(items: Item[], link: (a: Item, b: Item, why: string, back: string) => void) {
  const fin = items.filter((it) => it.ds === "fintrack/transactions" && it.amount !== null && it.day);
  const pl = items.filter((it) => it.ds === "plaid/transactions" && it.amount !== null && it.day);
  if (!fin.length || !pl.length) return;
  const idx = new Map<string, Item[]>();
  for (const p of pl) {
    const k = `${Math.round(p.amount! * 100)}|${p.n.mask}`;
    if (!idx.has(k)) idx.set(k, []);
    idx.get(k)!.push(p);
  }
  const used = new Set<number>();
  for (const f of fin) {
    const cands = idx.get(`${Math.round(f.amount! * 100)}|${f.n.mask}`) ?? [];
    const best = cands
      .filter((p) => !used.has(p.i) && Math.abs((p.at ?? 0) - (f.at ?? 0)) <= 1.5 * 86_400_000)
      .sort((a, b) => Math.abs((a.at ?? 0) - (f.at ?? 0)) - Math.abs((b.at ?? 0) - (f.at ?? 0)))[0];
    if (!best) continue;
    used.add(best.i);
    link(f, best, "The same transaction in Plaid", "The same transaction in Fintrack");
  }
}

/* ----------------------------------------------------------------- duffel */

export const duffel: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.users)) reg.claim({ self: true, emails: [str(u.email)] });
    const people: Claim[] = [];
    for (const o of arr(seed.orders)) for (const p of arr(o.passengers)) people.push({ names: [[str(p.given_name), str(p.family_name)].join(" ").trim()], emails: [str(p.email)], phones: [str(p.phone_number)], kind: "person" });
    for (const b of arr(seed.bookings)) for (const g of arr(b.guests)) people.push({ names: [[str(g.given_name), str(g.family_name)].join(" ").trim()], kind: "person" });
    for (const p of people) if ((p.names ?? []).some((n) => n && /\s/.test(n))) reg.claim(p);
  },
  build(seed, ctx, server) {
    const slicesOf = (o: Rec) => arr(o.slices);
    const route = (o: Rec) => {
      const s = slicesOf(o);
      if (!s.length) return "";
      const cities = [str(s[0].origin?.city_name) || str(s[0].origin?.iata_code), ...s.map((x) => str(x.destination?.city_name) || str(x.destination?.iata_code))];
      return cities.filter((c, i) => i === 0 || c !== cities[i - 1]).join(" → ");
    };
    const firstSeg = (o: Rec) => arr(slicesOf(o)[0]?.segments)[0];
    const lastSeg = (o: Rec) => {
      const s = slicesOf(o);
      const segs = arr(s[s.length - 1]?.segments);
      return segs[segs.length - 1];
    };
    const flights = ctx.dataset(server, {
      id: "flights",
      label: "Flights",
      noun: "flight offers and orders",
      row: "trip",
      facets: [
        { id: "type", label: "Stage", order: "given", given: ["Booked", "Offer"], primary: true },
        { id: "carrier", label: "Airline" },
        { id: "route", label: "Route" },
        { id: "fare", label: "Fare" },
      ],
      sorts: [{ id: "depart", label: "Departure, soonest", key: (it) => it.at, dir: 1 }, { id: "price", label: "Cheapest", key: (it) => it.n.total ?? null, dir: 1 }, { ...SORT_NEW, label: "Departure, latest" }],
      groups: [groupFacet("route", "Route"), groupFacet("type", "Stage")],
      defaultSort: "depart",
      defaultGroup: "route",
      note: "Offers the persona looked at, and the ones booked.",
    });
    const flight = (o: Rec, booked: boolean) => {
      const seg = firstSeg(o);
      const end = lastSeg(o);
      const fares = [...new Set(slicesOf(o).map((s) => str(s.fare_brand_name)).filter(Boolean))];
      const pax = arr(o.passengers).filter((p) => p.given_name || p.family_name);
      ctx.add(flights, {
        id: str(o.id),
        title: `${route(o)}${o.owner?.name ? ` · ${str(o.owner.name)}` : ""}`,
        sub: `${booked ? `Booked, reference ${str(o.booking_reference)}` : "Offer"} · ${money(num(o.total_amount) ?? 0)}`,
        when: seg?.departing_at,
        whenTz: str(seg?.origin?.time_zone) || undefined,
        end: end?.arriving_at,
        f: { type: booked ? "Booked" : "Offer", carrier: str(o.owner?.name), route: route(o), fare: fares },
        n: { total: num(o.total_amount) ?? NaN },
        people: pax.map((p) => ctx.ref(ctx.person({ names: [[str(p.given_name), str(p.family_name)].join(" ").trim()], emails: [str(p.email)] }), "passenger")),
        links: booked && o.offer_id ? [{ key: `${server}/flights/${str(o.offer_id)}`, why: "Booked from this offer", back: "Booked as an order" }] : [],
        refs: booked ? [str(o.booking_reference)] : [],
        raw: o,
      });
    };
    for (const o of arr(seed.offers)) flight(o, false);
    for (const o of arr(seed.orders)) flight(o, true);

    const accs = new Map(arr(seed.accommodations).map((a) => [str(a.id), a]));
    const rooms = new Map(arr(seed.rooms).map((r) => [str(r.id), r]));
    const rates = new Map(arr(seed.rates).map((r) => [str(r.id), r]));
    const propOfRate = (rateId: string) => {
      const room = rooms.get(str(rates.get(rateId)?.room_id));
      return { room, acc: accs.get(str(room?.accommodation_id)) };
    };
    const stays = ctx.dataset(server, {
      id: "stays",
      label: "Stays",
      noun: "stay records",
      row: "trip",
      facets: [
        { id: "type", label: "Stage", order: "given", given: ["Booking", "Quote", "Rate", "Room", "Property"], primary: true },
        { id: "property", label: "Property" },
        { id: "board", label: "Board" },
        { id: "payment", label: "Payment" },
      ],
      sorts: [{ id: "checkin", label: "Check in, soonest", key: (it) => it.at, dir: 1 }, { id: "price", label: "Cheapest", key: (it) => it.n.total ?? null, dir: 1 }],
      groups: [groupFacet("property", "Property"), groupFacet("type", "Stage")],
      defaultSort: "checkin",
      defaultGroup: "property",
      note: "Hotels, their rooms and rates, and what was quoted and booked.",
    });
    for (const a of arr(seed.accommodations)) {
      const addr = (a.location?.address ?? {}) as Rec;
      ctx.add(stays, {
        id: str(a.id),
        title: str(a.name),
        sub: [str(addr.line_one), str(addr.city_name)].filter(Boolean).join(", ") || "Property",
        text: str(a.description),
        f: { type: "Property", property: str(a.name) },
        n: { rating: num(a.rating) ?? NaN, score: num(a.review_score) ?? NaN },
        raw: a,
      });
    }
    for (const r of arr(seed.rooms)) {
      const acc = accs.get(str(r.accommodation_id));
      ctx.add(stays, {
        id: str(r.id),
        title: `${str(r.name)}, ${str(acc?.name)}`,
        sub: arr(r.beds).map((b) => `${str(b.count)} ${str(b.type)}`).join(", "),
        f: { type: "Room", property: str(acc?.name) },
        links: [{ key: `${server}/stays/${str(r.accommodation_id)}`, why: "At this property", back: "Room" }],
        raw: r,
      });
    }
    for (const r of arr(seed.rates)) {
      const { room, acc } = propOfRate(str(r.id));
      ctx.add(stays, {
        id: str(r.id),
        title: `${str(acc?.name)}, ${str(room?.name)}`,
        sub: `${str(r.check_in_date)} to ${str(r.check_out_date)} · ${money(num(r.total_amount) ?? 0)}`,
        when: r.check_in_date,
        end: r.check_out_date,
        allDay: true,
        f: { type: "Rate", property: str(acc?.name), board: pretty(r.board_type), payment: pretty(r.payment_type) },
        n: { total: num(r.total_amount) ?? NaN },
        links: [{ key: `${server}/stays/${str(r.room_id)}`, why: "For this room", back: "Rate" }],
        raw: r,
      });
    }
    for (const q of arr(seed.quotes)) {
      const { acc } = propOfRate(str(q.rate_id));
      ctx.add(stays, {
        id: str(q.id),
        title: `Quote, ${str(acc?.name)}`,
        sub: `${str(q.check_in_date)} to ${str(q.check_out_date)} · ${money(num(q.total_amount) ?? 0)}`,
        when: q.check_in_date,
        end: q.check_out_date,
        allDay: true,
        f: { type: "Quote", property: str(acc?.name) },
        n: { total: num(q.total_amount) ?? NaN },
        links: [{ key: `${server}/stays/${str(q.rate_id)}`, why: "For this rate", back: "Quoted" }],
        raw: q,
      });
    }
    for (const b of arr(seed.bookings)) {
      const { acc } = propOfRate(str(b.rate_id));
      ctx.add(stays, {
        id: str(b.id),
        title: `Booking, ${str(acc?.name)}`,
        sub: `${pretty(b.status)} · reference ${str(b.reference)} · ${money(num(b.total_amount) ?? 0)}`,
        when: b.check_in_date,
        end: b.check_out_date,
        allDay: true,
        f: { type: "Booking", property: str(acc?.name) },
        n: { total: num(b.total_amount) ?? NaN },
        people: arr(b.guests).map((g) => ctx.ref(ctx.person({ names: [[str(g.given_name), str(g.family_name)].join(" ").trim()] }), "passenger")),
        links: [
          ...(b.quote_id ? [{ key: `${server}/stays/${str(b.quote_id)}`, why: "From this quote", back: "Booked" }] : []),
          ...(b.rate_id ? [{ key: `${server}/stays/${str(b.rate_id)}`, why: "At this rate", back: "Booked" }] : []),
        ],
        refs: [str(b.reference)],
        raw: b,
      });
    }

    const seats = arr(seed.seat_map_elements);
    if (seats.length) {
      const ds = ctx.dataset(server, {
        id: "seats",
        label: "Seats",
        noun: "seats",
        row: "record",
        facets: [
          { id: "available", label: "Available", order: "given", given: ["Available", "Taken"] },
          { id: "position", label: "Seat" },
          { id: "price", label: "Price", order: "given", given: ["Free", "Paid"] },
          { id: "route", label: "Flight" },
        ],
        sorts: [{ id: "row", label: "Row", key: (it) => it.n.row ?? null, dir: 1 }],
        groups: [groupFacet("route", "Flight")],
        defaultSort: "row",
        defaultGroup: "route",
      });
      const offerRoute = new Map(arr(seed.offers).map((o) => [str(o.id), route(o)]));
      for (const s of seats) {
        const price = num(s.total_amount) ?? 0;
        ctx.add(ds, {
          id: str(s.id),
          title: `Seat ${str(s.designator)}, ${pretty(s.name)}`,
          sub: `${offerRoute.get(str(s.offer_id)) ?? "Flight"} · ${price ? money(price) : "free"} · ${s.available ? "available" : "taken"}`,
          f: { available: s.available ? "Available" : "Taken", position: pretty(s.name), price: price ? "Paid" : "Free", route: offerRoute.get(str(s.offer_id)) ?? "Flight" },
          n: { row: num(s.row) ?? NaN, total: price },
          links: [{ key: `${server}/flights/${str(s.offer_id)}`, why: "On this offer", back: "Seat map" }],
          raw: s,
        });
      }
    }
    generic(ctx, server, seed, ["users", "offers", "orders", "accommodations", "rooms", "rates", "quotes", "bookings", "seat_map_elements"]);
  },
};

/* ----------------------------------------------------------------- generic */

/** Any collection a builder does not shape itself still gets a dataset, so
 *  no stored record is out of reach. Its facets are the fields with a handful
 *  of repeated values. */
export function generic(ctx: Ctx, server: string, seed: Rec, skip: string[]) {
  for (const [name, v] of Object.entries(seed)) {
    if (skip.includes(name) || !Array.isArray(v)) continue;
    const rows = arr(v);
    // A handful of rows is a profile or a setting, listed with the server
    // rather than given a tab of its own.
    if (rows.length < 4) continue;
    const fields = autoFacetFields(rows);
    const columns: Column[] = Object.keys(rows[0])
      .filter((k) => rows.some((r) => r[k] !== null && r[k] !== undefined && typeof r[k] !== "object"))
      .slice(0, 8)
      .map((k) => ({ id: k, label: pretty(k), get: (it: Item) => scalar((it.raw as Rec)[k]), num: rows.every((r) => r[k] === null || typeof r[k] === "number") }));
    const ds = ctx.dataset(server, {
      id: name,
      label: pretty(name),
      noun: "records",
      row: "table",
      facets: fields.map((k) => ({ id: "fld:" + k, label: pretty(k) })),
      sorts: [SORT_NEW, SORT_OLD],
      groups: fields.map((k) => groupFacet("fld:" + k, pretty(k))),
      defaultSort: "new",
      columns,
    });
    rows.forEach((r, i) => {
      const title = TITLE_FIELDS.map((k) => str(r[k])).find(Boolean) || `${pretty(name)} ${i + 1}`;
      const f: Record<string, string> = {};
      for (const k of fields) f["fld:" + k] = scalar(r[k]) === null ? "Empty" : String(scalar(r[k]));
      ctx.add(ds, { id: str(r.id) || str(r[Object.keys(r)[0]]) || String(i), title, when: TIME_FIELDS.map((k) => r[k]).find((x) => x !== undefined && x !== null && x !== ""), f, raw: r });
    });
  }
}

const TITLE_FIELDS = ["title", "name", "display_name", "subject", "caption", "message", "text", "description", "metric", "id"];
export const TIME_FIELDS = ["timestamp", "start_datetime", "start_date", "start", "start_time", "created_at", "date", "due_datetime", "updated_at", "modified", "last_updated", "ts"];

const scalar = (v: unknown): string | number | null =>
  v === null || v === undefined ? null : typeof v === "number" ? v : typeof v === "boolean" ? (v ? "Yes" : "No") : typeof v === "string" ? v : null;

export function autoFacetFields(rows: Rec[]): string[] {
  if (rows.length < 4) return [];
  const out: string[] = [];
  for (const k of Object.keys(rows[0])) {
    const vals = rows.map((r) => r[k]).filter((x) => x !== null && x !== undefined && x !== "");
    if (vals.length < rows.length * 0.3 || vals.some((x) => typeof x === "object")) continue;
    const distinct = new Set(vals.map(String));
    if (distinct.size >= 2 && distinct.size <= 15 && distinct.size < vals.length) out.push(k);
  }
  return out.slice(0, 6);
}

