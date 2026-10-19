import { automatedAddress, parseAddress, titleCase, type Registry } from "../people";
import { GROUP_DAY, GROUP_MONTH, KIND_LABEL, SORT_NEW, SORT_OLD, arr, firstLine, groupFacet, isRef, leaf, pretty, sortNum, str, MONTH_FACET, WEEKDAY_FACET, type Ctx, type Rec, type ServerDef } from "../ctx";
import type { ExploreSource } from "../load";
import type { Media } from "../types";

/* ------------------------------------------------------------------ email */

export const email: ServerDef = {
  claims(seed, reg) {
    for (const m of arr(seed.emails)) {
      const from = parseAddress(str(m.sender));
      if (from.email) reg.claim({ names: [from.name], emails: [from.email], strength: 1, kind: automatedAddress(from.email) ? "org" : undefined });
      for (const r of [...arr2(m.recipients), ...arr2(m.cc)]) {
        const a = parseAddress(r);
        if (a.email) reg.claim({ names: [a.name], emails: [a.email], strength: 1 });
      }
    }
  },
  build(seed, ctx, server) {
    const mails = arr(seed.emails);
    // A thread is the chain of parent ids up to its first message, or the
    // thread id the newer seeds state outright.
    const parent = new Map(mails.map((m) => [str(m.email_id), str(m.parent_id)]));
    const rootOf = (id: string) => {
      let cur = id;
      for (let i = 0; i < 50; i++) {
        const p = parent.get(cur);
        if (!p || !parent.has(p)) return cur;
        cur = p;
      }
      return cur;
    };
    const threadOf = (m: Rec) => str(m.thread_id) || rootOf(str(m.email_id));
    const size = new Map<string, number>();
    for (const m of mails) size.set(threadOf(m), (size.get(threadOf(m)) ?? 0) + 1);
    const subjectOf = new Map<string, string>();
    for (const m of mails) if (str(m.email_id) === threadOf(m) || !subjectOf.has(threadOf(m))) subjectOf.set(threadOf(m), str(m.subject) || "(no subject)");

    const ds = ctx.dataset(server, {
      id: "emails",
      label: "Emails",
      noun: "emails",
      row: "email",
      facets: [
        { id: "folder", label: "Folder", primary: true },
        { id: "status", label: "Read", order: "given", given: ["Unread", "Read"] },
        { id: "from", label: "From", entity: true, top: 10, primary: true },
        { id: "to", label: "Sent to", entity: true, top: 8 },
        { id: "known", label: "Sender", order: "given", given: ["In contacts", "Not in contacts"] },
        { id: "attach", label: "Attachments", order: "given", given: ["PDF", "Image", "Document", "Video", "Other file", "None"] },
        { id: "thread", label: "Thread", order: "given", given: ["Part of a thread", "Single email"] },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD, sortNum("thread", "Longest threads", "thread")],
      groups: [
        { id: "thread", label: "Thread", key: (it) => it.thread, order: "time", fmt: (k) => subjectOf.get(k) ?? k },
        { id: "from", label: "Sender", key: (it) => (it.f.from as string[])[0] ?? null, order: "count", entity: true },
        GROUP_MONTH,
        GROUP_DAY,
      ],
      defaultSort: "new",
    });

    for (const m of mails) {
      const from = parseAddress(str(m.sender));
      const sender = from.email ? ctx.person({ names: [from.name], emails: [from.email] }) : null;
      const to = arr2(m.recipients).map((r) => ctx.person({ emails: [parseAddress(r).email || r] }));
      const cc = arr2(m.cc).map((r) => ctx.person({ emails: [parseAddress(r).email || r] }));
      const sent = /^sent$/i.test(str(m.folder)) || sender === ctx.self;
      const counterpart = sent ? [...to, ...cc] : sender !== null ? [sender] : [];
      const atts = Object.entries((m.attachments && typeof m.attachments === "object" ? m.attachments : {}) as Rec).map(([name, v]): Media =>
        ctx.media(name, isRef(v) ? v._extracted_to : null)
      );
      const t = threadOf(m);
      ctx.add(ds, {
        id: str(m.email_id),
        title: str(m.subject) || "(no subject)",
        sub: from.name || from.email || str(m.sender),
        text: str(m.content),
        when: m.timestamp,
        people: [ctx.ref(sender, "from"), ...to.map((e) => ctx.ref(e, "to")), ...cc.map((e) => ctx.ref(e, "cc"))],
        f: {
          folder: pretty(m.folder) || "Inbox",
          status: m.is_read === false ? "Unread" : "Read",
          from: sender !== null ? [ctx.ekey(sender)!] : [],
          to: sent ? to.filter((e) => e !== ctx.self).map((e) => ctx.ekey(e)!) : [],
          known: counterpart.some((e) => ctx.reg.entities[e]?.inContacts && e !== ctx.self) ? "In contacts" : "Not in contacts",
          attach: atts.length ? [...new Set(atts.map((a) => KIND_LABEL[a.kind]))] : ["None"],
          thread: (size.get(t) ?? 1) > 1 ? "Part of a thread" : "Single email",
        },
        n: { thread: size.get(t) ?? 1, attachments: atts.length },
        media: atts,
        thread: t,
        refs: atts.map((a) => a.name),
        raw: m,
      });
    }
  },
};

const arr2 = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && !!x.trim()) : []);

/* -------------------------------------------------------------- messaging */

/** Messaging names its people by contact id, or by a handle like `p_luis` or
 *  `p_luis_ortega` that the viewer matches to a contact's name. */
function messagingNames(src: ExploreSource): Map<string, string> {
  const m = new Map<string, string>();
  const contacts = arr((src.seed.contacts as Rec | undefined)?.contacts);
  for (const c of contacts) {
    const full = [str(c.first_name), str(c.last_name)].filter(Boolean).join(" ").trim();
    if (!full) continue;
    const f = str(c.first_name).toLowerCase();
    const l = str(c.last_name).toLowerCase();
    if (f && l) m.set(`p_${f}_${l}`, full);
    if (f && !m.has(`p_${f}`)) m.set(`p_${f}`, full);
    if (f && l && !m.has(`p_${f[0]}${l}`)) m.set(`p_${f[0]}${l}`, full);
    if (c.contact_id) m.set(str(c.contact_id), full);
  }
  return m;
}

const handleName = (id: string) =>
  titleCase(
    id
      .replace(/^p_/, "")
      .split(/[_.]/)
      .filter(Boolean)
      .join(" ")
  );
const isOpaque = (id: string) => /^[0-9a-f-]{12,}$/i.test(id) || (/^[A-Za-z0-9]{16,}$/.test(id) && /\d/.test(id));
const looksPhone = (s: string) => /^\+?[\d\s().-]{10,}$/.test(s.trim());

export const messaging: ServerDef = {
  claims(seed, reg, src) {
    const names = messagingNames(src);
    const self = str(seed.current_user_id);
    for (const conv of arr(seed.conversations)) {
      const parts = arr2(conv.participant_ids);
      for (const p of parts) claimParty(reg, p, parts, self, str(conv.title), names, str(conv.conversation_id));
    }
  },
  build(seed, ctx, server) {
    const names = messagingNames(ctx.src);
    const self = str(seed.current_user_id);
    const party = (p: string, parts: string[], convTitle: string, convId: string) => {
      const c = partyClaim(p, parts, self, convTitle, names, convId);
      return ctx.person(c);
    };
    const convs = arr(seed.conversations);
    const conversations = ctx.dataset(server, {
      id: "conversations",
      label: "Conversations",
      noun: "conversations",
      row: "conversation",
      facets: [
        { id: "size", label: "Kind", order: "given", given: ["One to one", "Group"] },
        { id: "with", label: "With", entity: true, top: 12, primary: true },
        MONTH_FACET,
      ],
      sorts: [{ ...SORT_NEW, label: "Latest message first" }, sortNum("count", "Most messages", "count"), SORT_OLD],
      groups: [groupFacet("size", "Kind")],
      defaultSort: "new",
      note: "Each conversation with every message in it.",
    });
    const messages = ctx.dataset(server, {
      id: "messages",
      label: "Messages",
      noun: "messages",
      row: "message",
      facets: [
        { id: "conversation", label: "Conversation", top: 12, primary: true },
        { id: "sender", label: "Sender", entity: true, top: 10, primary: true },
        { id: "direction", label: "Direction", order: "given", given: ["Sent", "Received"] },
        { id: "attachment", label: "Attachment", order: "given", given: ["With attachment", "Text only"] },
        { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD],
      groups: [groupFacet("conversation", "Conversation", { order: "count" }), { id: "sender", label: "Sender", key: (it) => it.f.sender, entity: true, order: "count" }, GROUP_DAY, GROUP_MONTH],
      defaultSort: "new",
    });
    for (const conv of convs) {
      const id = str(conv.conversation_id);
      const parts = arr2(conv.participant_ids);
      const title = str(conv.title);
      const people = parts.map((p) => party(p, parts, title, id));
      const others = people.filter((e) => e !== ctx.self);
      const msgs = arr(conv.messages);
      const last = msgs.reduce((a, m) => Math.max(a, Number(m.timestamp) || 0), 0) || conv.last_updated;
      ctx.add(conversations, {
        id,
        title: title || others.map((e) => ctx.reg.entities[e].name).join(", ") || "Conversation",
        sub: `${msgs.length} messages · ${others.length > 1 ? `${others.length + 1} people` : "one to one"}`,
        text: msgs.map((m) => str(m.content)).join("\n"),
        when: last,
        people: others.map((e) => ctx.ref(e, "participant")),
        f: { size: others.length > 1 ? "Group" : "One to one", with: others.map((e) => ctx.ekey(e)!) },
        n: { count: msgs.length },
        thread: `${server}:${id}`,
        raw: conv,
      });
      for (const m of msgs) {
        const sender = party(str(m.sender_id), parts, title, id);
        const att = str(m.attachment_name);
        const media = att ? [attachmentMedia(ctx, att)] : [];
        ctx.add(messages, {
          id: str(m.message_id),
          title: ctx.reg.entities[sender]?.name ?? "Unknown",
          sub: convSub(title, ctx.reg.entities[sender]?.name ?? "", sender === ctx.self),
          text: str(m.content),
          when: m.timestamp,
          people: [ctx.ref(sender, "from"), ...people.filter((e) => e !== sender).map((e) => ctx.ref(e, "participant"))],
          f: {
            conversation: title || id,
            sender: [ctx.ekey(sender)!],
            direction: sender === ctx.self ? "Sent" : "Received",
            attachment: att ? "With attachment" : "Text only",
          },
          media,
          thread: `${server}:${id}`,
          refs: att ? [leaf(att)] : [],
          raw: m,
        });
      }
    }
  },
};

function partyClaim(p: string, parts: string[], self: string, convTitle: string, names: Map<string, string>, convId: string) {
  if (p === self) return { self: true, ids: ["messaging:" + p] };
  const name = names.get(p);
  if (name) return { ids: ["messaging:" + p], names: [name], kind: "person" as const };
  // A one to one conversation titled with a number or a name, and a party the
  // viewer could not name: the title is who it is.
  const oneToOne = parts.length === 2 && parts.includes(self);
  if (/^p_unknown$|^unknown$/i.test(p) || isOpaque(p)) {
    if (oneToOne && convTitle) {
      return looksPhone(convTitle)
        ? { ids: [`messaging:${convId}:${p}`], names: [convTitle], phones: [convTitle], kind: "person" as const }
        : { ids: [`messaging:${convId}:${p}`], names: [convTitle], kind: "person" as const };
    }
    return { ids: [`messaging:${convId}:${p}`], names: ["Unknown contact"], kind: "unknown" as const };
  }
  return { ids: ["messaging:" + p], names: [handleName(p)], kind: "person" as const, strength: 0.5 };
}

function claimParty(reg: Registry, p: string, parts: string[], self: string, convTitle: string, names: Map<string, string>, convId: string) {
  const c = partyClaim(p, parts, self, convTitle, names, convId);
  // A contact id names the contact itself.
  reg.claim({ ...c, ids: [...(c.ids ?? []), "contacts:" + p] });
}

/** An attachment by name. Some seeds name a Files path, which the universe
 *  may carry as a preview. */
function attachmentMedia(ctx: Ctx, att: string): Media {
  const path = att.replace(/^\/+/, "");
  const stored = ctx.src.externals.has("files/filesystem/" + path) || filesystemHas(ctx, path);
  return ctx.media(leaf(att), stored ? "files/filesystem/" + path : null);
}
function filesystemHas(ctx: Ctx, path: string) {
  const fs = arr((ctx.src.seed.filesystem as Rec | undefined)?.files);
  return fs.some((f) => str(f.path).replace(/^\/+/, "") === path && (isRef(f.content) || isRef(f.content_base64)));
}

/** Under a message: the conversation it is in, unless that is only the sender's name. */
const convSub = (conv: string, sender: string, mine: boolean) => (mine ? `To ${conv}` : conv === sender ? "" : `In ${conv}`);

export const HOUR_BUCKETS = ["Night, 12 to 5 am", "Early morning, 5 to 8 am", "Morning, 8 am to 12 pm", "Afternoon, 12 to 5 pm", "Evening, 5 to 9 pm", "Late, 9 pm to 12 am"];
export const hourBucket = (minute: number) => {
  const h = minute / 60;
  return HOUR_BUCKETS[h < 5 ? 0 : h < 8 ? 1 : h < 12 ? 2 : h < 17 ? 3 : h < 21 ? 4 : 5];
};

/* -------------------------------------------------------------- messenger */

export const messenger: ServerDef = {
  claims(seed, reg) {
    const selfEmail = str(seed.current_user_email).toLowerCase();
    for (const u of arr(seed.users)) {
      const isSelf = !!selfEmail && str(u.email).toLowerCase() === selfEmail;
      reg.claim({ ids: ["messenger:" + str(u.id)], names: [str(u.name)], emails: [str(u.email)], kind: "person", strength: 2, self: isSelf || undefined });
    }
    if (selfEmail) reg.claim({ self: true, emails: [selfEmail] });
    const selfIds = messengerSelf(seed);
    const known = new Set(arr(seed.users).map((u) => str(u.id)));
    for (const t of arr(seed.threads))
      for (const p of arr2(t.participant_ids)) {
        if (selfIds.has(p)) reg.claim({ self: true, ids: ["messenger:" + p] });
        else if (!known.has(p)) reg.claim({ ids: ["messenger:" + p], names: [handleName(p.replace(/^(ms_user_|contact_)/, ""))], kind: "person", strength: 0.5 });
      }
  },
  build(seed, ctx, server) {
    const users = new Map(arr(seed.users).map((u) => [str(u.id), u]));
    const selfIds = messengerSelf(seed);
    const threads = arr(seed.threads);
    const who = (id: string) => (selfIds.has(id) ? ctx.self : ctx.person({ ids: ["messenger:" + id], names: [str(users.get(id)?.name) || handleName(id.replace(/^(ms_user_|contact_)/, ""))] }));
    const convs = ctx.dataset(server, {
      id: "threads",
      label: "Threads",
      noun: "threads",
      row: "conversation",
      facets: [{ id: "with", label: "With", entity: true, primary: true }, MONTH_FACET],
      sorts: [{ ...SORT_NEW, label: "Latest message first" }, sortNum("count", "Most messages", "count"), SORT_OLD],
      groups: [],
      defaultSort: "new",
      note: "Each thread with every message in it.",
    });
    const messages = ctx.dataset(server, {
      id: "messages",
      label: "Messages",
      noun: "messages",
      row: "message",
      facets: [
        { id: "conversation", label: "Thread", primary: true },
        { id: "sender", label: "Sender", entity: true, primary: true },
        { id: "direction", label: "Direction", order: "given", given: ["Sent", "Received"] },
        { id: "state", label: "State", order: "given", given: ["Unsent", "Sent normally"] },
        { id: "attachment", label: "Attachment", order: "given", given: ["With attachment", "Text only"] },
        { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS },
        MONTH_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD],
      groups: [groupFacet("conversation", "Thread"), { id: "sender", label: "Sender", key: (it) => it.f.sender, entity: true, order: "count" }, GROUP_DAY],
      defaultSort: "new",
    });
    const byThread = new Map<string, Rec[]>();
    for (const m of arr(seed.messages)) {
      const t = str(m.thread_id);
      if (!byThread.has(t)) byThread.set(t, []);
      byThread.get(t)!.push(m);
    }
    const titleOf = new Map<string, string>();
    for (const t of threads) {
      const id = str(t.id);
      const others = arr2(t.participant_ids).map(who).filter((e) => e !== ctx.self);
      const msgs = byThread.get(id) ?? [];
      const title = str(t.title) || others.map((e) => ctx.reg.entities[e].name).join(", ");
      titleOf.set(id, title);
      ctx.add(convs, {
        id,
        title,
        sub: `${msgs.length} messages`,
        text: msgs.map((m) => str(m.text)).join("\n"),
        when: t.updated_at ?? t.created_at,
        people: others.map((e) => ctx.ref(e, "participant")),
        f: { with: others.map((e) => ctx.ekey(e)!) },
        n: { count: msgs.length },
        thread: `${server}:${id}`,
        raw: t,
      });
    }
    for (const m of arr(seed.messages)) {
      const t = str(m.thread_id);
      const sender = who(str(m.sender_id));
      const atts = arr(m.attachments).map((a) => ctx.media(str(a.name), null, str(a.mime_type)));
      ctx.add(messages, {
        id: str(m.id),
        title: ctx.reg.entities[sender]?.name ?? "Unknown",
        sub: convSub(titleOf.get(t) ?? t, ctx.reg.entities[sender]?.name ?? "", sender === ctx.self),
        text: str(m.text),
        when: m.created_at ?? m.timestamp,
        people: [ctx.ref(sender, "from")],
        f: {
          conversation: titleOf.get(t) ?? t,
          sender: [ctx.ekey(sender)!],
          direction: sender === ctx.self ? "Sent" : "Received",
          state: m.unsent_at ? "Unsent" : "Sent normally",
          attachment: atts.length ? "With attachment" : "Text only",
        },
        media: atts,
        thread: `${server}:${t}`,
        refs: atts.map((a) => a.name),
        raw: m,
      });
    }
  },
};

/** The persona's Messenger ids: the user with their address, and the owner of
 *  the contact list. */
function messengerSelf(seed: Rec): Set<string> {
  const ids = new Set<string>();
  const selfEmail = str(seed.current_user_email).toLowerCase();
  for (const u of arr(seed.users)) if (selfEmail && str(u.email).toLowerCase() === selfEmail) ids.add(str(u.id));
  const owners = new Map<string, number>();
  for (const c of arr(seed.contacts)) owners.set(str(c.owner_id), (owners.get(str(c.owner_id)) ?? 0) + 1);
  const top = [...owners].sort((a, b) => b[1] - a[1])[0];
  if (top && top[0]) ids.add(top[0]);
  return ids;
}

/* ------------------------------------------------------------------ slack */

export const slack: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.users)) {
      reg.claim({ ids: ["slack:" + str(u.id)], names: [str(u.real_name) || str(u.display_name) || str(u.name)], emails: [str(u.email)], kind: "person", strength: 2, handle: { server: "slack", label: "@" + (str(u.display_name) || str(u.name)) } });
    }
  },
  build(seed, ctx, server) {
    const users = new Map(arr(seed.users).map((u) => [str(u.id), u]));
    const who = (id: string) => ctx.person({ ids: ["slack:" + id], names: [str(users.get(id)?.real_name) || id] });
    const channels = new Map(arr(seed.channels).map((c) => [str(c.id), c]));
    const chanLabel = (id: string) => {
      const c = channels.get(id);
      if (!c) return id;
      if (c.is_im) {
        const other = arr2(c.members).map(who).find((e) => e !== ctx.self);
        return other !== undefined ? `Direct message with ${ctx.reg.entities[other].name}` : "Direct message";
      }
      return "#" + str(c.name);
    };
    const emoji = (name: string) => ctx.src.emoji[name] ?? `:${name}:`;
    const msgs = arr(seed.messages);
    const parentText = new Map(msgs.filter((m) => !m.thread_ts || m.thread_ts === m.ts).map((m) => [str(m.ts), firstLine(str(m.text), 70)]));
    const ds = ctx.dataset(server, {
      id: "messages",
      label: "Messages",
      noun: "messages",
      row: "message",
      facets: [
        { id: "channel", label: "Channel", primary: true },
        { id: "sender", label: "Author", entity: true, primary: true },
        { id: "shape", label: "In a thread", order: "given", given: ["Started a thread", "Reply in a thread", "On its own"] },
        { id: "reaction", label: "Reactions", top: 12 },
        { id: "files", label: "Files", order: "given", given: ["With files", "No files"] },
        { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD, sortNum("replies", "Most replies", "replies"), sortNum("reactions", "Most reactions", "reactions")],
      groups: [
        { id: "thread", label: "Thread", key: (it) => it.thread, order: "time", fmt: (k) => parentText.get(k.split(":").pop() ?? "") ?? "Thread" },
        groupFacet("channel", "Channel"),
        { id: "sender", label: "Author", key: (it) => it.f.sender, entity: true, order: "count" },
        GROUP_DAY,
      ],
      defaultSort: "new",
    });
    for (const m of msgs) {
      const sender = who(str(m.user));
      const ts = str(m.ts);
      const threadTs = str(m.thread_ts);
      const reactions = arr(m.reactions);
      const files = arr(m.files).map((f) => ctx.media(str(f.name) || str(f.title), null, str(f.mimetype)));
      const mentions = [...str(m.text).matchAll(/<@([A-Z0-9_]+)>/g)].map((x) => who(x[1]));
      ctx.add(ds, {
        id: str(m.channel) + ":" + ts,
        title: ctx.reg.entities[sender]?.name ?? str(m.user),
        sub: chanLabel(str(m.channel)),
        text: str(m.text).replace(/<@([A-Z0-9_]+)>/g, (_, id: string) => "@" + (ctx.reg.entities[who(id)]?.name ?? id)),
        when: ts,
        people: [ctx.ref(sender, "from"), ...mentions.map((e) => ctx.ref(e, "mentioned"))],
        f: {
          channel: chanLabel(str(m.channel)),
          sender: [ctx.ekey(sender)!],
          shape: Number(m.reply_count) > 0 ? "Started a thread" : threadTs && threadTs !== ts ? "Reply in a thread" : "On its own",
          reaction: reactions.map((r) => emoji(str(r.name))),
          files: files.length ? "With files" : "No files",
        },
        n: { replies: Number(m.reply_count) || 0, reactions: reactions.reduce((a, r) => a + (Number(r.count) || 0), 0) },
        media: files,
        thread: `${server}:${str(m.channel)}:${threadTs || ts}`,
        refs: files.map((f) => f.name),
        raw: m,
      });
    }
  },
};
