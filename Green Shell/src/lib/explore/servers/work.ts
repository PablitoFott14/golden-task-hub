import { GROUP_MONTH, MONTH_FACET, SORT_NEW, SORT_OLD, SORT_TITLE, arr, firstLine, groupFacet, money, num, pretty, sortNum, str, type Rec, type ServerDef } from "../ctx";
import type { Column, Item, RangeDef } from "../types";
import { generic } from "./money";

/**
 * The work systems of a finance persona: Oracle GL (the ledger), SAP Subledger
 * (AP invoices, fixed assets, prepaid schedules and what they post to the
 * ledger), BlackLine (account reconciliations and their review notes) and
 * Linear (the finance systems team's issues). Their money is the company's, so
 * it sits in `n` and the columns, never in `amount`, which is the persona's
 * own; a figure in `n` still ties together the records that state it. Every
 * record that names a GL account links to that account in Oracle GL.
 */

const moneyCol = (id: string, label: string): Column => ({ id, label, num: true, money: true, get: (it: Item) => it.n[id] ?? null });
const moneyRange = (id: string, label: string): RangeDef => ({ id, label, money: true, get: (it) => it.n[id] ?? null });
const glLink = (number: unknown, back: string) => (str(number) ? [{ key: `oracle_gl/accounts/${str(number)}`, why: "GL account", back }] : []);
const fileNames = (v: unknown) => arr(v).map((a) => str(a.file_name) || str(a.filename) || str(a.name)).filter(Boolean);
const lineText = (lines: Rec[], account: string, amount: (l: Rec) => string) =>
  lines.map((l) => [str(l.line_number), str(l[account]), str(l.account_name), amount(l), str(l.memo)].filter(Boolean).join("  ")).join("\n");

/* -------------------------------------------------------------- oracle gl */

export const oracle_gl: ServerDef = {
  build(seed, ctx, server) {
    const accounts = ctx.dataset(server, {
      id: "accounts",
      label: "Accounts",
      noun: "accounts",
      row: "record",
      facets: [{ id: "type", label: "Type", primary: true }, { id: "normal", label: "Normal balance" }, { id: "status", label: "Status" }, { id: "restricted", label: "Access", order: "given", given: ["Restricted", "Open"] }],
      sorts: [{ id: "number", label: "Account number", key: (it) => str(it.raw.number), dir: 1 }, sortNum("balance", "Largest balance", "abs")],
      groups: [groupFacet("type", "Type")],
      defaultSort: "number",
      columns: [{ id: "number", label: "Number", get: (it) => str(it.raw.number) }, { id: "name", label: "Name", get: (it) => str(it.raw.name), wrap: true }, { id: "type", label: "Type", get: (it) => pretty(it.raw.type) }, moneyCol("balance", "Balance")],
      note: "Open an account to see every record that posts to it or reconciles it.",
    });
    for (const a of arr(seed.accounts)) {
      const bal = num(a.current_balance);
      ctx.add(accounts, {
        id: str(a.number),
        title: `${str(a.number)} ${str(a.name)}`,
        sub: [pretty(a.type), bal !== null ? money(bal) : ""].filter(Boolean).join(" · "),
        text: str(a.description),
        f: { type: pretty(a.type), normal: pretty(a.normal_balance), status: pretty(a.status), restricted: a.restricted ? "Restricted" : "Open" },
        n: { balance: bal ?? NaN, abs: bal === null ? NaN : Math.abs(bal) },
        raw: a,
      });
    }

    const entries = ctx.dataset(server, {
      id: "journal_entries",
      label: "Journal entries",
      noun: "entries",
      row: "record",
      facets: [{ id: "status", label: "Status", primary: true }, { id: "period", label: "Period", primary: true }, { id: "type", label: "Entry type" }, { id: "source", label: "Source" }, { id: "preparer", label: "Prepared by" }, { id: "approver", label: "Approved by" }, MONTH_FACET],
      sorts: [SORT_NEW, SORT_OLD, sortNum("total", "Largest", "total")],
      groups: [groupFacet("period", "Period"), groupFacet("status", "Status"), GROUP_MONTH],
      defaultSort: "new",
      columns: [{ id: "entry", label: "Entry", get: (it) => str(it.raw.entry_number) }, { id: "desc", label: "Description", get: (it) => str(it.raw.description), wrap: true }, { id: "status", label: "Status", get: (it) => pretty(it.raw.status) }, moneyCol("total", "Debits")],
      ranges: [moneyRange("total", "Amount")],
    });
    for (const j of arr(seed.journal_entries)) {
      const lines = arr(j.lines);
      ctx.add(entries, {
        id: str(j.id),
        title: str(j.description) || str(j.entry_number),
        sub: [str(j.entry_number), str(j.period_id), pretty(j.status), num(j.total_debit) !== null ? money(Number(j.total_debit)) : ""].filter(Boolean).join(" · "),
        text: [str(j.business_justification), lineText(lines, "account_number", (l) => (num(l.debit) ? `Dr ${money(Number(l.debit))}` : `Cr ${money(num(l.credit) ?? 0)}`)), str(j.rejection_reason)].filter(Boolean).join("\n\n"),
        when: j.posting_date,
        f: { status: pretty(j.status), period: str(j.period_id), type: pretty(j.entry_type), source: pretty(j.source_module), preparer: str(j.prepared_by), approver: str(j.approved_by) },
        n: { total: num(j.total_debit) ?? NaN },
        links: [
          ...lines.flatMap((l) => glLink(l.account_number, "Journal entry")),
          ...(str(j.reverses_entry_id) ? [{ key: `${server}/journal_entries/${str(j.reverses_entry_id)}`, why: "Reverses", back: "Reversed by" }] : []),
        ],
        refs: [str(j.entry_number), ...fileNames(j.attachments)],
        raw: j,
      });
    }

    const feeds = new Map(arr(seed.subledger_feeds).map((f) => [str(f.id), f]));
    const runs = arr(seed.subledger_feed_runs);
    if (runs.length) {
      const ds = ctx.dataset(server, {
        id: "feed_runs",
        label: "Feed runs",
        noun: "runs",
        row: "record",
        facets: [{ id: "status", label: "Status", primary: true }, { id: "feed", label: "Feed", primary: true }, { id: "period", label: "Period" }],
        sorts: [SORT_NEW, SORT_OLD, sortNum("rejected", "Most rows rejected", "rejected")],
        groups: [groupFacet("feed", "Feed")],
        defaultSort: "new",
        note: "Each run of a subledger feed into the ledger, with the feed it belongs to.",
      });
      for (const r of runs) {
        const feed = feeds.get(str(r.feed_id));
        ctx.add(ds, {
          id: str(r.id),
          title: `${str(r.feed_id)} ${pretty(r.status).toLowerCase()}`,
          sub: [`${str(r.rows_posted) || 0} of ${str(r.rows_in) || 0} rows posted`, num(r.rows_rejected) ? `${str(r.rows_rejected)} rejected` : "", str(r.period_id)].filter(Boolean).join(" · "),
          text: str(r.error_summary),
          when: r.started_at,
          end: r.finished_at,
          f: { status: pretty(r.status), feed: str(r.feed_id), period: str(r.period_id) },
          n: { rejected: num(r.rows_rejected) ?? NaN },
          refs: [str(r.related_servicenow_ticket_id)],
          raw: r,
          also: feed ? [{ label: "Feed", rec: feed }] : [],
        });
      }
    }
    generic(ctx, server, seed, ["accounts", "journal_entries", "subledger_feeds", "subledger_feed_runs"]);
  },
};

/* ---------------------------------------------------------- sap subledger */

export const sap_subledger: ServerDef = {
  claims(seed, reg) {
    for (const v of arr(seed.ap_invoices)) if (str(v.vendor_name)) reg.claim({ names: [str(v.vendor_name)], org: true, kind: "org", strength: 1 });
  },
  build(seed, ctx, server) {
    const invoices = arr(seed.ap_invoices);
    if (invoices.length) {
      const ds = ctx.dataset(server, {
        id: "ap_invoices",
        label: "AP invoices",
        noun: "invoices",
        row: "record",
        facets: [{ id: "status", label: "Status", primary: true }, { id: "vendor", label: "Vendor", entity: true, primary: true }, { id: "gl", label: "GL account" }, { id: "center", label: "Cost center" }, { id: "method", label: "Paid by" }, MONTH_FACET],
        sorts: [SORT_NEW, SORT_OLD, sortNum("amount", "Largest", "amount")],
        groups: [{ id: "vendor", label: "Vendor", key: (it) => it.f.vendor, entity: true, order: "count" }, groupFacet("status", "Status"), GROUP_MONTH],
        defaultSort: "new",
        columns: [{ id: "invoice", label: "Invoice", get: (it) => str(it.raw.invoice_number) }, { id: "vendor", label: "Vendor", get: (it) => str(it.raw.vendor_name) }, { id: "due", label: "Due", get: (it) => str(it.raw.due_date) }, { id: "status", label: "Status", get: (it) => pretty(it.raw.status) }, moneyCol("amount", "Amount")],
        ranges: [moneyRange("amount", "Amount")],
      });
      for (const v of invoices) {
        const vendor = str(v.vendor_name) ? ctx.person({ names: [str(v.vendor_name)], org: true }) : null;
        const lines = arr(v.lines);
        ctx.add(ds, {
          id: str(v.id),
          title: `${str(v.vendor_name)} ${str(v.invoice_number)}`.trim(),
          sub: [num(v.amount) !== null ? money(Number(v.amount)) : "", pretty(v.status), str(v.due_date) ? `due ${str(v.due_date)}` : ""].filter(Boolean).join(" · "),
          text: [lineText(lines, "gl_account_number", (l) => money(num(l.amount) ?? 0)), str(v.void_reason)].filter(Boolean).join("\n\n"),
          when: v.invoice_date,
          people: [ctx.ref(vendor, "merchant")],
          f: { status: pretty(v.status), vendor: vendor !== null ? [ctx.ekey(vendor)!] : [], gl: str(v.gl_account_number), center: str(v.cost_center), method: str(v.payment_method) || "Not paid" },
          n: { amount: num(v.amount) ?? NaN },
          links: [...glLink(v.gl_account_number, "AP invoice"), ...lines.flatMap((l) => glLink(l.gl_account_number, "AP invoice line"))],
          refs: [str(v.invoice_number), str(v.sap_document_number), str(v.payment_reference), ...(Array.isArray(v.source_doc_ids) ? v.source_doc_ids.map(str) : [])],
          raw: v,
        });
      }
    }

    const assets = arr(seed.fixed_assets);
    if (assets.length) {
      const ds = ctx.dataset(server, {
        id: "fixed_assets",
        label: "Fixed assets",
        noun: "assets",
        row: "record",
        facets: [{ id: "status", label: "Status", primary: true }, { id: "center", label: "Cost center" }, { id: "method", label: "Depreciation" }],
        sorts: [sortNum("cost", "Highest cost", "cost"), sortNum("netBook", "Highest book value", "netBook"), SORT_NEW, SORT_OLD],
        groups: [groupFacet("center", "Cost center")],
        defaultSort: "cost",
        columns: [{ id: "asset", label: "Asset", get: (it) => str(it.raw.sap_asset_number) }, { id: "desc", label: "Description", get: (it) => str(it.raw.description), wrap: true }, { id: "since", label: "In service", get: (it) => str(it.raw.in_service_date) }, moneyCol("cost", "Cost"), moneyCol("netBook", "Book value")],
      });
      for (const a of assets) {
        ctx.add(ds, {
          id: str(a.id),
          title: str(a.description) || `Asset ${str(a.sap_asset_number)}`,
          sub: [`Asset ${str(a.sap_asset_number)}`, num(a.net_book_value) !== null ? `book value ${money(Number(a.net_book_value))}` : "", pretty(a.status)].filter(Boolean).join(" · "),
          text: arr(a.depreciation_schedule).map((p) => `${str(p.period_id)}  ${money(num(p.depreciation_amount) ?? 0)}  to date ${money(num(p.accumulated_to_date) ?? 0)}`).join("\n"),
          when: a.in_service_date,
          f: { status: pretty(a.status), center: str(a.cost_center), method: pretty(a.depreciation_method) },
          n: { cost: num(a.cost) ?? NaN, netBook: num(a.net_book_value) ?? NaN, accumulated: num(a.accumulated_depreciation) ?? NaN },
          links: [...glLink(a.gl_account_number, "Fixed asset"), ...glLink(a.accum_dep_account_number, "Fixed asset, depreciation")],
          refs: [str(a.sap_asset_number)],
          raw: a,
        });
      }
    }

    const prepaid = arr(seed.prepaid_amortization_schedules);
    if (prepaid.length) {
      const ds = ctx.dataset(server, {
        id: "prepaid",
        label: "Prepaid schedules",
        noun: "schedules",
        row: "record",
        facets: [{ id: "method", label: "Method" }],
        sorts: [sortNum("total", "Largest", "total"), SORT_NEW],
        groups: [],
        defaultSort: "total",
        columns: [{ id: "id", label: "Schedule", get: (it) => str(it.raw.id) }, { id: "contract", label: "Contract", get: (it) => str(it.raw.contract_reference), wrap: true }, { id: "span", label: "Runs", get: (it) => `${str(it.raw.start_date)} to ${str(it.raw.end_date)}` }, moneyCol("total", "Original amount")],
      });
      for (const p of prepaid) {
        ctx.add(ds, {
          id: str(p.id),
          title: `${str(p.id)} ${str(p.contract_reference)}`.trim(),
          sub: [num(p.original_amount) !== null ? money(Number(p.original_amount)) : "", `${str(p.start_date)} to ${str(p.end_date)}`].filter(Boolean).join(" · "),
          text: arr(p.periods).map((x) => `${str(x.period_id)}  ${money(num(x.amortization_amount) ?? 0)}  remaining ${money(num(x.remaining_balance) ?? 0)}`).join("\n"),
          when: p.start_date,
          end: p.end_date,
          f: { method: pretty(p.amortization_method) },
          n: { total: num(p.original_amount) ?? NaN },
          links: glLink(p.account_number, "Prepaid schedule"),
          refs: [str(p.id)],
          raw: p,
        });
      }
    }

    const postings = arr(seed.subledger_transactions);
    if (postings.length) {
      const ds = ctx.dataset(server, {
        id: "postings",
        label: "Postings to the ledger",
        noun: "postings",
        row: "record",
        facets: [{ id: "module", label: "Module", primary: true }, { id: "gl", label: "GL account" }, { id: "side", label: "Side", order: "given", given: ["Debit", "Credit"] }, MONTH_FACET],
        sorts: [SORT_NEW, SORT_OLD, sortNum("amount", "Largest", "amount")],
        groups: [groupFacet("module", "Module"), groupFacet("gl", "GL account")],
        defaultSort: "new",
        columns: [{ id: "doc", label: "SAP document", get: (it) => str(it.raw.sap_document_number) }, { id: "desc", label: "Description", get: (it) => str(it.raw.description), wrap: true }, { id: "gl", label: "GL account", get: (it) => str(it.raw.gl_account_number) }, moneyCol("debit", "Debit"), moneyCol("credit", "Credit")],
        ranges: [moneyRange("amount", "Amount")],
      });
      for (const t of postings) {
        const dr = num(t.debit) ?? 0;
        const cr = num(t.credit) ?? 0;
        ctx.add(ds, {
          id: str(t.id),
          title: str(t.description) || str(t.sap_document_number),
          sub: [pretty(t.sap_module), `GL ${str(t.gl_account_number)}`, dr ? `Dr ${money(dr)}` : `Cr ${money(cr)}`].join(" · "),
          when: t.posting_date,
          f: { module: pretty(t.sap_module), gl: str(t.gl_account_number), side: dr ? "Debit" : "Credit" },
          n: { debit: dr, credit: cr, amount: dr || cr },
          links: [
            ...glLink(t.gl_account_number, "SAP posting"),
            ...(str(t.related_oracle_je_line_id) ? [{ key: `oracle_gl/journal_entries/${str(t.related_oracle_je_line_id)}`, why: "Journal entry", back: "SAP posting" }] : []),
          ],
          refs: [str(t.sap_document_number)],
          raw: t,
        });
      }
    }
    generic(ctx, server, seed, ["ap_invoices", "fixed_assets", "prepaid_amortization_schedules", "subledger_transactions"]);
  },
};

/* -------------------------------------------------------------- blackline */

export const blackline: ServerDef = {
  build(seed, ctx, server) {
    const who = (name: unknown) => (str(name) ? ctx.person({ names: [str(name)] }) : null);
    const recs = arr(seed.reconciliations);
    const ds = ctx.dataset(server, {
      id: "reconciliations",
      label: "Reconciliations",
      noun: "reconciliations",
      row: "record",
      facets: [
        { id: "state", label: "State", primary: true },
        { id: "period", label: "Period", primary: true },
        { id: "variance", label: "Variance", order: "given", given: ["No variance", "Within threshold", "Over threshold"], primary: true },
        { id: "preparer", label: "Preparer", entity: true },
        { id: "reviewer", label: "Reviewer", entity: true },
        { id: "evidence", label: "Evidence", order: "given", given: ["With attachments", "No attachments"] },
      ],
      sorts: [SORT_NEW, SORT_OLD, sortNum("variance", "Largest variance", "absVariance"), sortNum("balance", "Largest balance", "absBalance"), { ...SORT_TITLE, label: "Account number" }],
      groups: [groupFacet("period", "Period"), groupFacet("state", "State"), { id: "account", label: "Account", key: (it) => str(it.raw.account_id), order: "key" }],
      defaultSort: "new",
      columns: [{ id: "account", label: "Account", get: (it) => `${str(it.raw.account_id)} ${str(it.raw.account_name)}`, wrap: true }, { id: "period", label: "Period", get: (it) => str(it.raw.period_label) }, { id: "state", label: "State", get: (it) => pretty(it.raw.state) }, moneyCol("balance", "GL balance"), moneyCol("supportBalance", "Supporting"), moneyCol("variance", "Variance")],
      ranges: [moneyRange("variance", "Variance")],
    });
    for (const r of recs) {
      const variance = num(r.variance) ?? 0;
      const limit = num(r.variance_threshold);
      const bal = num(r.gl_balance);
      const atts = arr(r.attachments);
      const people = [ctx.ref(who(r.preparer), "author"), ctx.ref(who(r.reviewer), "participant"), ctx.ref(who(r.certifier), "participant")];
      ctx.add(ds, {
        id: str(r.id),
        title: `${str(r.account_id)} ${str(r.account_name)}`,
        sub: [str(r.period_label), pretty(r.state), variance ? `variance ${money(variance)}` : "no variance"].join(" · "),
        text: [
          ...arr(r.variance_explanations).map((v) => `${pretty(v.category)}: ${str(v.description)} ${num(v.amount) !== null ? money(Number(v.amount)) : ""}`.trim()),
          str(r.reviewer_comments),
        ].filter(Boolean).join("\n"),
        when: r.submitted_at ?? r.updated_at ?? r.created_at,
        people,
        f: {
          state: pretty(r.state),
          period: str(r.period_label) || str(r.period_id),
          variance: !variance ? "No variance" : limit !== null && Math.abs(variance) > limit ? "Over threshold" : "Within threshold",
          preparer: people[0] ? [ctx.ekey(people[0].e)!] : [],
          reviewer: people[1] ? [ctx.ekey(people[1].e)!] : [],
          evidence: atts.length ? "With attachments" : "No attachments",
        },
        n: { balance: bal ?? NaN, absBalance: bal === null ? NaN : Math.abs(bal), supportBalance: num(r.supporting_balance) ?? NaN, variance, absVariance: Math.abs(variance) },
        links: [
          ...glLink(r.account_id, "Reconciliation"),
          ...(str(r.prior_period_reconciliation_id) ? [{ key: `${server}/reconciliations/${str(r.prior_period_reconciliation_id)}`, why: "Prior period", back: "Next period" }] : []),
        ],
        refs: fileNames(atts),
        raw: r,
      });
    }

    const notes = arr(seed.review_notes);
    if (notes.length) {
      const nd = ctx.dataset(server, {
        id: "review_notes",
        label: "Review notes",
        noun: "notes",
        row: "comment",
        facets: [{ id: "state", label: "State", primary: true }, { id: "author", label: "Author", entity: true }],
        sorts: [SORT_NEW, SORT_OLD],
        groups: [groupFacet("state", "State")],
        defaultSort: "new",
      });
      for (const n of notes) {
        const author = who(n.author);
        ctx.add(nd, {
          id: str(n.id),
          title: firstLine(str(n.body)) || "Review note",
          sub: [`${pretty(n.target_kind)} ${str(n.target_id)}`.trim(), pretty(n.state)].filter(Boolean).join(" · "),
          text: [str(n.body), str(n.response) ? `Response: ${str(n.response)}` : ""].filter(Boolean).join("\n\n"),
          when: n.created_at,
          end: n.cleared_at,
          people: [ctx.ref(author, "author")],
          f: { state: pretty(n.state), author: author !== null ? [ctx.ekey(author)!] : [] },
          links: str(n.target_id) ? [{ key: `${server}/reconciliations/${str(n.target_id)}`, why: "Note on", back: "Review note" }] : [],
          raw: n,
        });
      }
    }
    generic(ctx, server, seed, ["reconciliations", "review_notes"]);
  },
};

/* ----------------------------------------------------------------- linear */

const PRIORITY = ["No priority", "Urgent", "High", "Medium", "Low"];

export const linear: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.users)) {
      reg.claim({ ids: ["linear:" + str(u.id)], names: [str(u.name)], emails: [str(u.email)], kind: "person", strength: 2, handle: { server: "linear", label: str(u.display_name) || str(u.name) }, self: str(u.id) === str(seed.current_user_id) || undefined });
    }
  },
  build(seed, ctx, server) {
    const users = new Map(arr(seed.users).map((u) => [str(u.id), u]));
    const who = (id: unknown) => (str(id) ? ctx.person({ ids: ["linear:" + str(id)], names: [str(users.get(str(id))?.name)] }) : null);
    const states = new Map(arr(seed.workflow_states).map((s) => [str(s.id), str(s.name)]));
    const prio = (v: unknown) => PRIORITY[num(v) ?? 0] ?? `Priority ${str(v)}`;
    const issues = ctx.dataset(server, {
      id: "issues",
      label: "Issues",
      noun: "issues",
      row: "record",
      facets: [
        { id: "state", label: "State", primary: true },
        { id: "assignee", label: "Assignee", entity: true, primary: true },
        { id: "priority", label: "Priority", order: "given", given: [...PRIORITY.slice(1), PRIORITY[0]] },
        { id: "label", label: "Label" },
      ],
      sorts: [SORT_NEW, SORT_OLD, { id: "priority", label: "Most urgent", key: (it) => (num(it.raw.priority) || 9), dir: 1 }],
      groups: [groupFacet("state", "State"), { id: "assignee", label: "Assignee", key: (it) => it.f.assignee, entity: true, order: "count" }],
      defaultSort: "new",
    });
    for (const i of arr(seed.issues)) {
      const assignee = who(i.assignee_id);
      const creator = who(i.creator_id);
      ctx.add(issues, {
        id: str(i.id),
        title: str(i.title),
        sub: [str(i.id), states.get(str(i.state_id)) ?? "", prio(i.priority), str(i.due_date) ? `due ${str(i.due_date)}` : ""].filter(Boolean).join(" · "),
        text: str(i.description),
        when: i.created_at,
        people: [ctx.ref(assignee, "member"), ctx.ref(creator, "author")],
        f: {
          state: states.get(str(i.state_id)) || "No state",
          assignee: assignee !== null ? [ctx.ekey(assignee)!] : [],
          priority: prio(i.priority),
          label: (Array.isArray(i.labels) ? i.labels : []).map((l: unknown) => (typeof l === "string" ? l : str((l as Rec)?.name))).filter(Boolean),
        },
        links: str(i.parent_id) ? [{ key: `${server}/issues/${str(i.parent_id)}`, why: "Parent issue", back: "Sub-issue" }] : [],
        refs: [str(i.id)],
        raw: i,
      });
    }
    const comments = arr(seed.comments);
    if (comments.length) {
      const ds = ctx.dataset(server, {
        id: "comments",
        label: "Comments",
        noun: "comments",
        row: "comment",
        facets: [{ id: "author", label: "Author", entity: true, primary: true }, { id: "issue", label: "Issue" }],
        sorts: [SORT_NEW, SORT_OLD],
        groups: [groupFacet("issue", "Issue")],
        defaultSort: "new",
      });
      for (const c of comments) {
        const author = who(c.author_id);
        ctx.add(ds, {
          id: str(c.id),
          title: firstLine(str(c.body)) || "Comment",
          sub: `on ${str(c.issue_id)}`,
          text: str(c.body),
          when: c.created_at,
          people: [ctx.ref(author, "commenter")],
          f: { author: author !== null ? [ctx.ekey(author)!] : [], issue: str(c.issue_id) },
          thread: str(c.issue_id) || null,
          links: [
            { key: `${server}/issues/${str(c.issue_id)}`, why: "On this issue", back: "Comment" },
            ...(str(c.parent_id) ? [{ key: `${server}/comments/${str(c.parent_id)}`, why: "Reply to", back: "Reply" }] : []),
          ],
          raw: c,
        });
      }
    }
    generic(ctx, server, seed, ["issues", "comments"]);
  },
};
