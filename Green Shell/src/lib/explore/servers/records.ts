import { orgName, type Claim } from "../people";
import { GROUP_MONTH, GROUP_WEEK, GROUP_WEEKDAY, KIND_LABEL, MONTH_FACET, SORT_NEW, SORT_OLD, SORT_TITLE, WEEKDAY_FACET, arr, dirname, firstLine, groupFacet, isRef, leaf, mediaKind, mimeOf, num, pretty, sortNum, str, type Rec, type ServerDef } from "../ctx";
import type { Column, Facet, Group, Item, Media, Sort } from "../types";
import { generic } from "./money";

/* --------------------------------------------------------------- calendar */

export const calendar: ServerDef = {
  claims(seed, reg) {
    for (const ev of arr(seed.events)) for (const a of strings(ev.attendees)) reg.claim({ names: [a], kind: "person", strength: 0.8 });
  },
  build(seed, ctx, server) {
    const events = arr(seed.events);
    const titles = new Map<string, number>();
    for (const ev of events) titles.set(str(ev.title), (titles.get(str(ev.title)) ?? 0) + 1);
    const only = `Only ${ctx.first}`;
    const ds = ctx.dataset(server, {
      id: "events",
      label: "Events",
      noun: "events",
      row: "event",
      facets: [
        { id: "when", label: "When", order: "given", given: ["Past", "Upcoming"], primary: true },
        { id: "tag", label: "Tag", primary: true },
        { id: "with", label: "With", entity: true, top: 10, primary: true },
        { id: "company", label: "Attendees", order: "given", given: [only, "With others"] },
        { id: "series", label: "Repeats", top: 10 },
        { id: "location", label: "Location", top: 10 },
        { id: "allday", label: "Length", order: "given", given: ["All day", "Timed"] },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [{ id: "soon", label: "Soonest first", key: (it) => it.at, dir: 1 }, { ...SORT_NEW, label: "Latest first" }, sortNum("duration", "Longest", "duration")],
      groups: [GROUP_WEEK, GROUP_MONTH, groupFacet("series", "Series"), groupFacet("location", "Location"), groupFacet("tag", "Tag"), GROUP_WEEKDAY],
      defaultSort: "soon",
      defaultGroup: "week",
    });
    for (const ev of events) {
      const att = strings(ev.attendees).map((a) => ctx.person({ names: [a] }));
      const others = att.filter((e) => e !== ctx.self);
      const start = ctx.clock.parse(ev.start_datetime);
      const end = ctx.clock.parse(ev.end_datetime);
      // An event from local midnight lasting a whole day is an all day one.
      const allDay = ev.all_day === true || (!!start && !!end && (start.dateOnly || (ctx.clock.minute(start.ms) === 0 && end.ms - start.ms >= 86_340_000)));
      const title = str(ev.title);
      ctx.add(ds, {
        id: str(ev.event_id),
        title: title || "Event",
        sub: str(ev.location),
        text: str(ev.description),
        when: ev.start_datetime,
        end: ev.end_datetime,
        allDay,
        people: att.map((e) => ctx.ref(e, "with")),
        f: {
          when: start && start.ms < ctx.nowMs ? "Past" : "Upcoming",
          tag: pretty(ev.tag) || "No tag",
          with: others.map((e) => ctx.ekey(e)!),
          company: others.length ? "With others" : only,
          series: (titles.get(title) ?? 0) > 1 ? title : "One time",
          location: str(ev.location) || "No location",
          allday: allDay ? "All day" : "Timed",
        },
        n: { duration: start && end ? Math.round((end.ms - start.ms) / 60000) : NaN },
        raw: ev,
      });
    }
  },
};

const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && !!x.trim()) : []);

/* --------------------------------------------------------------- contacts */

export const contacts: ServerDef = {
  claims(seed, reg) {
    for (const c of arr(seed.contacts)) reg.claim(contactClaim(c));
  },
  build(seed, ctx, server) {
    const rows = arr(seed.contacts);
    const ds = ctx.dataset(server, {
      id: "contacts",
      label: "Contacts",
      noun: "contacts",
      row: "contact",
      facets: [
        { id: "type", label: "Kind", order: "given", given: ["Person", "Organization"], primary: true },
        { id: "servers", label: "Also appears in", primary: true },
        { id: "reach", label: "Reach", order: "given", given: ["Only here", "1 other server", "2 to 4 other servers", "5 or more other servers"] },
        { id: "city", label: "City" },
        { id: "status", label: "Status" },
        { id: "has", label: "Has", order: "given", given: ["Email", "Work email", "Phone", "Address"] },
        ...(new Set(rows.map((r) => str(r.nationality)).filter(Boolean)).size > 1 ? [{ id: "nationality", label: "Nationality" } as Facet] : []),
      ],
      sorts: [
        { ...SORT_TITLE, label: "Name" },
        sortNum("reach", "Most servers", "reach"),
        sortNum("activity", "Most records", "activity"),
        { id: "recent", label: "Most recently active", key: (it) => it.n.last ?? null, dir: -1 },
      ],
      groups: [groupFacet("type", "Kind"), groupFacet("city", "City"), groupFacet("reach", "Reach", { order: "given", given: ["5 or more other servers", "2 to 4 other servers", "1 other server", "Only here"] })],
      defaultSort: "reach",
      note: "Each contact with everything they appear in across the universe.",
    });
    const added: { it: Item; e: number }[] = [];
    for (const c of rows) {
      const e = ctx.person(contactClaim(c));
      const name = [str(c.first_name), str(c.last_name)].filter(Boolean).join(" ");
      const it = ctx.add(ds, {
        id: str(c.contact_id),
        title: name || str(c.email) || "Contact",
        sub: str(c.job) || str(c.description),
        text: [str(c.description), str(c.address), str(c.email), str(c.work_email), str(c.phone)].filter(Boolean).join("\n"),
        people: [ctx.ref(e, "contact")],
        f: {
          type: str(c.gender) === "organization" || (!/^(male|female)$/.test(str(c.gender)) && orgName(name)) ? "Organization" : "Person",
          city: str(c.city_living) || "No city",
          status: pretty(c.status) || "No status",
          has: [c.email && "Email", c.work_email && "Work email", c.phone && "Phone", c.address && "Address"].filter(Boolean) as string[],
          nationality: str(c.nationality) || "Not stated",
        },
        raw: c,
      });
      added.push({ it, e });
    }
    ctx.post(() => {
      for (const { it, e } of added) {
        const ent = ctx.reg.entities[e];
        const others = Object.keys(ent.servers).filter((s) => s !== server);
        it.f.servers = others.length ? others.map((s) => ctx.src.nav.find((n) => n.id === s)?.label ?? pretty(s)) : ["Nowhere else"];
        it.f.reach = others.length === 0 ? "Only here" : others.length === 1 ? "1 other server" : others.length < 5 ? "2 to 4 other servers" : "5 or more other servers";
        it.n.reach = others.length;
        it.n.activity = ent.items.length;
        if (ent.last !== null) it.n.last = ent.last;
      }
    });
  },
};

function contactClaim(c: Rec): Claim {
  const name = [str(c.first_name), str(c.last_name)].filter(Boolean).join(" ");
  const gender = str(c.gender);
  const org = gender === "organization" || (!/^(male|female)$/.test(gender) && orgName(name));
  return {
    ids: ["contacts:" + str(c.contact_id)],
    names: [name],
    emails: [str(c.email), str(c.work_email)],
    phones: [str(c.phone)],
    kind: org ? "org" : /^(male|female)$/.test(gender) ? "person" : undefined,
    org,
    inContacts: true,
    strength: 3,
    self: c.is_user === true || undefined,
    job: str(c.job),
    city: str(c.city_living),
    note: str(c.description),
    address: str(c.address),
  };
}

/* --------------------------------------------------------------- reminder */

export const reminder: ServerDef = {
  build(seed, ctx, server) {
    const rows = arr(seed.reminders);
    const hasDone = rows.some((r) => typeof r.completed === "boolean");
    const ds = ctx.dataset(server, {
      id: "reminders",
      label: "Reminders",
      noun: "reminders",
      row: "reminder",
      facets: [
        ...(hasDone ? [{ id: "done", label: "Status", order: "given", given: ["Open", "Completed"], primary: true } as Facet] : []),
        { id: "when", label: "Due", order: "given", given: ["Past", "Upcoming"], primary: true },
        { id: "repeats", label: "Repeats" },
        { id: "notified", label: "Notification", order: "given", given: ["Notified", "Not notified"] },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [{ id: "due", label: "Due soonest", key: (it) => it.at, dir: 1 }, { ...SORT_NEW, label: "Due latest" }],
      groups: [GROUP_WEEK, GROUP_MONTH, groupFacet("repeats", "Repeats"), ...(hasDone ? [groupFacet("done", "Status")] : [])],
      defaultSort: "due",
      defaultGroup: "week",
    });
    for (const r of rows) {
      const due = ctx.clock.parse(r.due_datetime);
      const rep = str(r.repetition_unit) ? `Every ${Number(r.repetition_value) > 1 ? `${str(r.repetition_value)} ${str(r.repetition_unit)}s` : str(r.repetition_unit)}` : "One time";
      ctx.add(ds, {
        id: str(r.reminder_id),
        title: str(r.title) || "Reminder",
        sub: rep === "One time" ? "" : rep,
        text: str(r.description),
        when: r.due_datetime,
        f: {
          done: r.completed === true ? "Completed" : "Open",
          when: due && due.ms < ctx.nowMs ? "Past" : "Upcoming",
          repeats: rep,
          notified: r.time_notified ? "Notified" : "Not notified",
        },
        raw: r,
      });
    }
  },
};

/* ------------------------------------------------------------- filesystem */

export const filesystem: ServerDef = {
  build(seed, ctx, server) {
    const files = arr(seed.files);
    // Paths sit under Users/<name>/; that prefix is the same for every file.
    const homes = new Map<string, number>();
    for (const f of files) {
      const m = /^\/?(Users\/[^/]+\/)/.exec(str(f.path));
      if (m) homes.set(m[1], (homes.get(m[1]) ?? 0) + 1);
    }
    const home = [...homes].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
    const rel = (p: string) => {
      const clean = p.replace(/^\/+/, "");
      return home && clean.startsWith(home) ? clean.slice(home.length) : clean;
    };
    const bySha = new Map<string, number>();
    for (const f of files) if (str(f.sha256)) bySha.set(str(f.sha256), (bySha.get(str(f.sha256)) ?? 0) + 1);
    const ds = ctx.dataset(server, {
      id: "files",
      label: "Files",
      noun: "files",
      row: "file",
      facets: [
        { id: "folder", label: "Folder", tree: true, order: "alpha", primary: true },
        { id: "type", label: "Type", primary: true },
        { id: "copies", label: "Copies", order: "given", given: ["Has identical copies", "Only copy"] },
        { id: "elsewhere", label: "Elsewhere", order: "given", given: ["Also sent as an attachment", "Only in Files"] },
        { id: "stored", label: "Preview", order: "given", given: ["Stored", "Not included"] },
        MONTH_FACET,
      ],
      sorts: [
        { id: "path", label: "Folder and name", key: (it) => it.sub.toLowerCase() + "/" + it.title.toLowerCase(), dir: 1 },
        { ...SORT_NEW, label: "Modified, newest" },
        { ...SORT_OLD, label: "Modified, oldest" },
        sortNum("size", "Largest", "size"),
        { ...SORT_TITLE, label: "Name" },
      ],
      groups: [
        { id: "folder", label: "Folder", key: (it) => it.sub || "(top level)", order: "key" },
        groupFacet("type", "Type"),
        GROUP_MONTH,
      ],
      defaultSort: "path",
      defaultGroup: "folder",
      ranges: [{ id: "size", label: "Size", get: (it) => it.n.size ?? null, unit: "KB" }],
    });
    for (const f of files) {
      const path = str(f.path).replace(/^\/+/, "");
      const name = str(f.name) || str(f.filename) || leaf(path);
      const mime = mimeOf(name, str(f.mime_type));
      let stored: string | null = null;
      if (isRef(f.content_base64)) stored = f.content_base64._extracted_to;
      else if (isRef(f.content)) stored = f.content._extracted_to;
      else if (f.viewer_external && ctx.src.externals.has("files/filesystem/" + path)) stored = "files/filesystem/" + path;
      const media: Media = { ...ctx.media(name, stored, mime, num(f.size_bytes) ?? num(f.size) ?? undefined) };
      const folder = dirname(rel(path));
      const parts = folder ? folder.split("/") : [];
      ctx.add(ds, {
        id: path || str(f.file_id),
        title: name,
        sub: folder,
        when: f.modified,
        f: {
          folder: parts.length ? parts.map((_, i) => parts.slice(0, i + 1).join("/")) : ["(top level)"],
          type: KIND_LABEL[mediaKind(mime, name)],
          copies: (bySha.get(str(f.sha256)) ?? 0) > 1 ? "Has identical copies" : "Only copy",
          elsewhere: "Only in Files",
          stored: stored ? "Stored" : "Not included",
        },
        n: { size: Math.round((num(f.size_bytes) ?? num(f.size) ?? 0) / 1024) },
        media: [media],
        thread: str(f.sha256) ? "sha:" + str(f.sha256) : null,
        refs: [name],
        raw: f,
      });
    }
    generic(ctx, server, seed, ["files", "directories"]);
  },
};

/* --------------------------------------------------------------- airtable */

const NAME_FIELD = /supplier|customer|buyer|seller|vendor|counted by|client|payee|owner|assigned|contact|source/i;
const CODE_FIELD = /#|no\.|number|invoice|order|sku|tracking|reference|part/i;

export const airtable: ServerDef = {
  claims(seed, reg) {
    const tables = new Map(arr(seed.tables).map((t) => [str(t.id), t]));
    for (const r of arr(seed.records)) {
      const t = tables.get(str(r.table_id));
      for (const fld of arr(t?.fields)) {
        const name = str(fld.name);
        const v = (r.fields ?? {})[name];
        if (typeof v !== "string" || !v.trim() || !NAME_FIELD.test(name) || /source/i.test(name)) continue;
        // A party named in a record: a supplier is an organization.
        if (/supplier|vendor/i.test(name)) reg.claim({ names: [v], org: true, kind: "org", strength: 0.6 });
        else if (/\s/.test(v.trim()) && v.length < 60) reg.claim({ names: [v], strength: 0.6 });
      }
    }
  },
  build(seed, ctx, server) {
    const tables = arr(seed.tables);
    const base = str(arr(seed.bases)[0]?.name);
    for (const t of tables) {
      const fields = arr(t.fields);
      const recs = arr(seed.records).filter((r) => str(r.table_id) === str(t.id));
      if (!recs.length) continue;
      const val = (r: Rec, f: string) => (r.fields ?? {})[f];
      const filled = (f: string) => recs.filter((r) => val(r, f) !== undefined && val(r, f) !== null && val(r, f) !== "").length;
      const primary = str(fields[0]?.name);
      const dateField = fields.find((f) => /^date/.test(str(f.type)) && filled(str(f.name)) >= recs.length * 0.5);
      const facetFields = fields.filter((f) => {
        const type = str(f.type);
        const name = str(f.name);
        if (name === primary) return false;
        if (/singleSelect|multipleSelects|checkbox/.test(type)) return filled(name) > 0;
        if (type === "singleLineText") {
          const vals = recs.map((r) => val(r, name)).filter((x) => typeof x === "string" && x);
          const distinct = new Set(vals);
          return vals.length >= 3 && distinct.size >= 2 && distinct.size <= 15 && distinct.size < vals.length;
        }
        return false;
      });
      const numFields = fields.filter((f) => /number|currency|percent|rating|duration/.test(str(f.type)));
      const textFields = fields.filter((f) => /multilineText|richText/.test(str(f.type)));
      const columns: Column[] = fields.map((f) => {
        const name = str(f.name);
        const type = str(f.type);
        return {
          id: name,
          label: name,
          num: /number|currency|percent|rating|duration/.test(type),
          money: type === "currency",
          wrap: /multilineText|richText/.test(type),
          get: (it: Item) => cell((it.raw.fields as Rec | undefined)?.[name]),
        };
      });
      const sorts: Sort[] = [
        ...(dateField ? [{ id: "new", label: `${str(dateField.name)}, newest`, key: (it: Item) => it.at, dir: -1 as const }, { id: "old", label: `${str(dateField.name)}, oldest`, key: (it: Item) => it.at, dir: 1 as const }] : []),
        { ...SORT_TITLE, label: primary || "Name" },
        ...numFields.flatMap((f) => [sortNum("n:" + str(f.name), `${str(f.name)}, highest`, str(f.name)), sortNum("n:" + str(f.name) + ":asc", `${str(f.name)}, lowest`, str(f.name), 1)]),
        { id: "modified", label: "Last modified", key: (it: Item) => it.n.modified ?? null, dir: -1 },
      ];
      const groups: Group[] = [...facetFields.map((f) => groupFacet("fld:" + str(f.name), str(f.name))), ...(dateField ? [GROUP_MONTH, GROUP_WEEK] : [])];
      const ds = ctx.dataset(server, {
        id: str(t.id),
        label: str(t.name),
        noun: "records",
        row: "table",
        facets: [...facetFields.map((f, i): Facet => ({ id: "fld:" + str(f.name), label: str(f.name), primary: i < 3, top: 12 })), ...(dateField ? [MONTH_FACET] : [])],
        sorts,
        groups,
        defaultSort: dateField ? "new" : "az",
        columns,
        ranges: numFields.slice(0, 3).map((f) => ({ id: "n:" + str(f.name), label: str(f.name), get: (it: Item) => it.n[str(f.name)] ?? null, money: str(f.type) === "currency" })),
        note: base ? `${base}, ${str(t.name)} table.` : undefined,
      });
      for (const r of recs) {
        const fv = (r.fields ?? {}) as Rec;
        const f: Record<string, string | string[]> = {};
        for (const fld of facetFields) {
          const v = fv[str(fld.name)];
          f["fld:" + str(fld.name)] = Array.isArray(v) ? v.map(String) : v === undefined || v === null || v === "" ? "Empty" : typeof v === "boolean" ? (v ? "Yes" : "No") : String(v);
        }
        const n: Record<string, number> = {};
        for (const fld of numFields) {
          const x = num(fv[str(fld.name)]);
          if (x !== null) n[str(fld.name)] = x;
        }
        const modified = ctx.clock.parse(r.modified_time);
        if (modified) n.modified = modified.ms;
        // People and organizations a record names, by an exact name.
        const people = fields
          .filter((fld) => NAME_FIELD.test(str(fld.name)) && typeof fv[str(fld.name)] === "string")
          .map((fld) => {
            const v = String(fv[str(fld.name)]);
            const e = ctx.reg.lookup({ names: [v], org: /supplier|vendor/i.test(str(fld.name)) });
            return e !== null ? ctx.ref(e, "field") : null;
          });
        const attachments = fields
          .filter((fld) => str(fld.type) === "multipleAttachments")
          .flatMap((fld) => arr(fv[str(fld.name)]).map((a) => ctx.media(str(a.filename) || str(a.name), null, str(a.type))));
        const summary = facetFields
          .slice(0, 3)
          .map((fld) => fv[str(fld.name)])
          .filter((x) => typeof x === "string" && x)
          .join(" · ");
        ctx.add(ds, {
          id: str(r.id),
          title: cellText(fv[primary]) || `${str(t.name)} record`,
          sub: [str(t.name), dateField && fv[str(dateField.name)] ? String(fv[str(dateField.name)]) : "", summary].filter(Boolean).join(" · "),
          text: textFields.map((fld) => str(fv[str(fld.name)])).filter(Boolean).join("\n"),
          when: dateField ? fv[str(dateField.name)] ?? r.created_time : r.created_time,
          f,
          n,
          people,
          media: attachments,
          refs: [
            ...fields.filter((fld) => CODE_FIELD.test(str(fld.name)) && typeof fv[str(fld.name)] === "string").map((fld) => String(fv[str(fld.name)])),
            ...attachments.map((a) => a.name),
          ],
          raw: r,
          kind: "table",
        });
      }
    }
  },
};

const cell = (v: unknown): string | number | null =>
  v === null || v === undefined || v === "" ? null : typeof v === "number" ? v : typeof v === "boolean" ? (v ? "Yes" : "No") : Array.isArray(v) ? v.map((x) => (typeof x === "object" && x ? str((x as Rec).filename) || str((x as Rec).name) || JSON.stringify(x) : String(x))).join(", ") : typeof v === "object" ? JSON.stringify(v) : String(v);
const cellText = (v: unknown) => {
  const c = cell(v);
  return c === null ? "" : firstLine(String(c), 80);
};

