import { GROUP_MONTH, MONTH_FACET, SORT_NEW, SORT_OLD, SORT_TITLE, WEEKDAY_FACET, arr, firstLine, groupFacet, isRef, money, num, pretty, sortNum, str, type Ctx, type Rec, type ServerDef } from "../ctx";
import type { Item, Media } from "../types";
import { generic } from "./money";

/** Where the persona appears elsewhere, for "Also in" facets on social graphs. */
function elsewhere(ctx: Ctx, items: { it: Item; e: number }[], server: string) {
  ctx.post(() => {
    for (const { it, e } of items) {
      const ent = ctx.reg.entities[e];
      const others = Object.keys(ent?.servers ?? {}).filter((s) => s !== server);
      it.f.elsewhere = others.length ? others.map((s) => ctx.src.nav.find((n) => n.id === s)?.label ?? pretty(s)) : ["Only here"];
      it.n.reach = others.length;
    }
  });
}

/* -------------------------------------------------------------- instagram */

export const instagram: ServerDef = {
  claims(seed, reg) {
    const self = str(seed.current_user_id);
    const users = new Map(arr(seed.users).map((u) => [str(u.id), u]));
    for (const u of arr(seed.users)) {
      reg.claim({
        ids: ["instagram:" + str(u.id)],
        names: [str(u.display_name)],
        emails: [str(u.email)],
        kind: "person",
        strength: 1.5,
        self: str(u.id) === self || undefined,
        handle: { server: "instagram", label: "@" + str(u.username) },
      });
    }
    for (const a of arr(seed.accounts)) {
      const owner = users.get(str(a.owner_user_id));
      reg.claim({
        ids: ["instagram:" + str(a.id), "instagram:" + str(a.owner_user_id)],
        kind: str(a.account_type) === "business" && str(a.owner_user_id) !== self ? "org" : undefined,
        handle: owner && str(owner.username) !== str(a.username) ? { server: "instagram", label: "@" + str(a.username) } : undefined,
      });
    }
  },
  build(seed, ctx, server) {
    const self = str(seed.current_user_id);
    const users = new Map(arr(seed.users).map((u) => [str(u.id), u]));
    const accounts = new Map(arr(seed.accounts).map((a) => [str(a.id), a]));
    const assets = new Map(arr(seed.media_assets).map((m) => [str(m.id), m]));
    const who = (userId: string) => ctx.person({ ids: ["instagram:" + userId] });
    const ownerOf = (acctId: string) => who(str(accounts.get(acctId)?.owner_user_id) || acctId);
    const handle = (acctId: string) => "@" + (str(accounts.get(acctId)?.username) || acctId);
    const mine = new Set(arr(seed.accounts).filter((a) => str(a.owner_user_id) === self).map((a) => str(a.id)));
    const comments = arr(seed.comments);
    const commentsOn = new Map<string, Rec[]>();
    for (const c of comments) {
      if (!commentsOn.has(str(c.post_id))) commentsOn.set(str(c.post_id), []);
      commentsOn.get(str(c.post_id))!.push(c);
    }
    const saves = arr(seed.saves);
    const savesOf = new Map<string, number>();
    for (const s of saves) savesOf.set(str(s.post_id), (savesOf.get(str(s.post_id)) ?? 0) + 1);
    const posts = arr(seed.posts);
    const caption = new Map(posts.map((p) => [str(p.id), firstLine(str(p.caption), 60) || "Post"]));
    const mediaOf = (p: Rec): Media[] =>
      arr(p.media).map((m) => {
        const a = assets.get(str(m.asset_id)) ?? m;
        const ref = isRef(a.content_base64) ? a.content_base64._extracted_to : null;
        return ctx.media(str(a.rel_path).split("/").pop() || str(m.asset_id), ref, str(a.mime_type) || str(m.mime_type), num(a.size) ?? undefined);
      });

    const postsDs = ctx.dataset(server, {
      id: "posts",
      label: "Posts",
      noun: "posts",
      row: "post",
      facets: [
        { id: "account", label: "Account", primary: true },
        { id: "kind", label: "Kind", order: "given", given: ["Feed", "Story", "Reel"] },
        { id: "talk", label: "Comments", order: "given", given: ["With comments", "No comments"] },
        { id: "commenter", label: "Commented on by", entity: true, top: 10 },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD, sortNum("comments", "Most comments", "comments"), sortNum("saves", "Most saved", "saves")],
      groups: [GROUP_MONTH, groupFacet("account", "Account")],
      defaultSort: "new",
    });
    for (const p of posts) {
      const cs = commentsOn.get(str(p.id)) ?? [];
      const author = ownerOf(str(p.account_id));
      const commenters = [...new Set(cs.map((c) => who(str(c.author_user_id))))];
      const media = mediaOf(p);
      ctx.add(postsDs, {
        id: str(p.id),
        title: caption.get(str(p.id)) ?? "Post",
        sub: handle(str(p.account_id)),
        text: str(p.caption),
        when: p.created_at,
        people: [ctx.ref(author, "author"), ...commenters.map((e) => ctx.ref(e, "commenter"))],
        f: {
          account: handle(str(p.account_id)),
          kind: pretty(p.kind) || "Feed",
          talk: cs.length ? "With comments" : "No comments",
          commenter: commenters.filter((e) => e !== author).map((e) => ctx.ekey(e)!),
        },
        n: { comments: cs.length, saves: savesOf.get(str(p.id)) ?? 0 },
        media,
        refs: media.map((m) => m.name),
        also: arr(p.media).map((m) => assets.get(str(m.asset_id))).filter((a): a is Rec => !!a).map((rec) => ({ label: "Media", rec })),
        raw: p,
      });
    }

    if (comments.length) {
      const ds = ctx.dataset(server, {
        id: "comments",
        label: "Comments",
        noun: "comments",
        row: "comment",
        facets: [
          { id: "author", label: "Author", entity: true, top: 12, primary: true },
          { id: "post", label: "On post", top: 10 },
          { id: "side", label: "From", order: "given", given: [`${ctx.first}'s accounts`, "Others"] },
          MONTH_FACET,
          WEEKDAY_FACET,
        ],
        sorts: [SORT_NEW, SORT_OLD],
        groups: [groupFacet("post", "Post"), { id: "author", label: "Author", key: (it) => it.f.author, entity: true, order: "count" }, GROUP_MONTH],
        defaultSort: "new",
      });
      for (const c of comments) {
        const author = who(str(c.author_user_id));
        const u = users.get(str(c.author_user_id));
        ctx.add(ds, {
          id: str(c.id),
          title: ctx.reg.entities[author]?.name ?? str(u?.display_name),
          sub: `On "${caption.get(str(c.post_id)) ?? "a post"}"`,
          text: str(c.text),
          when: c.created_at,
          people: [ctx.ref(author, "commenter")],
          f: { author: [ctx.ekey(author)!], post: caption.get(str(c.post_id)) ?? str(c.post_id), side: author === ctx.self ? `${ctx.first}'s accounts` : "Others" },
          links: [{ key: `${server}/posts/${str(c.post_id)}`, why: "On this post", back: "Comment" }],
          raw: c,
        });
      }
    }

    // The persona's graph: every other account, and how it relates to theirs.
    const follows = arr(seed.follows);
    const followsMe = new Set(follows.filter((f) => mine.has(str(f.followed_account_id))).map((f) => str(f.follower_account_id)));
    const iFollow = new Set(follows.filter((f) => mine.has(str(f.follower_account_id))).map((f) => str(f.followed_account_id)));
    const others = arr(seed.accounts).filter((a) => !mine.has(str(a.id)));
    const followRows = new Map<string, Rec[]>();
    for (const f of follows) {
      for (const side of [str(f.follower_account_id), str(f.followed_account_id)]) {
        if (mine.has(side)) continue;
        if (!followRows.has(side)) followRows.set(side, []);
        followRows.get(side)!.push(f);
      }
    }
    if (others.length) {
      const ds = ctx.dataset(server, {
        id: "accounts",
        label: "Accounts",
        noun: "accounts",
        row: "account",
        facets: [
          { id: "relation", label: "Relation", order: "given", given: ["Mutual", `Follows ${ctx.first}`, `${ctx.first} follows`, "Neither"], primary: true },
          { id: "elsewhere", label: "Also appears in", primary: true },
          { id: "type", label: "Account type" },
          { id: "private", label: "Visibility", order: "given", given: ["Private", "Public"] },
          { id: "bio", label: "Bio", order: "given", given: ["Has a bio", "No bio"] },
        ],
        sorts: [{ ...SORT_TITLE, label: "Name" }, sortNum("reach", "Most other servers", "reach")],
        groups: [groupFacet("relation", "Relation"), groupFacet("type", "Account type")],
        defaultSort: "reach",
        note: "Every account in the universe other than the persona's, and how it relates to theirs.",
      });
      const added: { it: Item; e: number }[] = [];
      for (const a of others) {
        const id = str(a.id);
        const e = ownerOf(id);
        const u = users.get(str(a.owner_user_id));
        const rel = followsMe.has(id) && iFollow.has(id) ? "Mutual" : followsMe.has(id) ? `Follows ${ctx.first}` : iFollow.has(id) ? `${ctx.first} follows` : "Neither";
        const it = ctx.add(ds, {
          id,
          also: [...(u ? [{ label: "User", rec: u }] : []), ...(followRows.get(id) ?? []).map((rec) => ({ label: "Follow", rec }))],
          title: str(u?.display_name) || "@" + str(a.username),
          sub: "@" + str(a.username) + (str(a.bio) ? ` · ${firstLine(str(a.bio), 70)}` : ""),
          text: str(a.bio),
          people: [ctx.ref(e, "account")],
          f: { relation: rel, type: pretty(a.account_type), private: u?.is_private ? "Private" : "Public", bio: str(a.bio) ? "Has a bio" : "No bio" },
          raw: a,
        });
        added.push({ it, e });
      }
      elsewhere(ctx, added, server);
    }

    const insights = arr(seed.insights);
    if (insights.length) {
      const ds = ctx.dataset(server, {
        id: "insights",
        label: "Insights",
        noun: "daily figures",
        row: "record",
        facets: [{ id: "metric", label: "Metric", primary: true }, { id: "account", label: "Account" }, MONTH_FACET],
        sorts: [SORT_NEW, SORT_OLD, sortNum("value", "Highest", "value")],
        groups: [groupFacet("metric", "Metric"), GROUP_MONTH],
        defaultSort: "new",
        chart: "insights",
      });
      for (const r of insights) {
        ctx.add(ds, {
          id: str(r.id),
          title: `${pretty(r.metric)}: ${Number(r.value).toLocaleString("en-US")}`,
          sub: handle(str(r.account_id)),
          when: r.date,
          f: { metric: pretty(r.metric), account: handle(str(r.account_id)) },
          n: { value: num(r.value) ?? NaN },
          raw: r,
        });
      }
    }

    if (saves.length) {
      const ds = ctx.dataset(server, { id: "saves", label: "Saves", noun: "saves", row: "record", facets: [{ id: "by", label: "Saved by" }], sorts: [SORT_NEW, SORT_OLD], groups: [], defaultSort: "new" });
      for (const s of saves) {
        ctx.add(ds, {
          id: str(s.id),
          title: caption.get(str(s.post_id)) ?? "Post",
          sub: `Saved by ${handle(str(s.account_id))}`,
          when: s.created_at,
          people: [ctx.ref(ownerOf(str(s.account_id)), "account")],
          f: { by: handle(str(s.account_id)) },
          links: [{ key: `${server}/posts/${str(s.post_id)}`, why: "Saved post", back: "Saved" }],
          raw: s,
        });
      }
    }
    generic(ctx, server, seed, ["users", "accounts", "posts", "comments", "saves", "follows", "insights", "media_assets"]);
  },
};

/* --------------------------------------------------------------- facebook */

export const facebook: ServerDef = {
  claims(seed, reg) {
    const self = str(seed.current_user_id);
    for (const u of arr(seed.users)) {
      reg.claim({ ids: ["facebook:" + str(u.id)], names: [str(u.name)], emails: [str(u.email)], kind: "person", strength: 2, self: str(u.id) === self || undefined });
    }
  },
  build(seed, ctx, server) {
    const users = new Map(arr(seed.users).map((u) => [str(u.id), u]));
    const self = str(seed.current_user_id) || [...users.values()].find((u) => ctx.person({ ids: ["facebook:" + str(u.id)] }) === ctx.self)?.id;
    const who = (id: string) => ctx.person({ ids: ["facebook:" + id], names: [str(users.get(id)?.name)] });
    const groups = new Map(arr(seed.groups).map((g) => [str(g.id), g]));
    const pages = new Map(arr(seed.pages).map((p) => [str(p.id), p]));
    const me = users.get(str(self));
    const myFriends = new Set<string>(Array.isArray(me?.friend_ids) ? me!.friend_ids.map(String) : []);
    for (const u of users.values()) if (Array.isArray(u.friend_ids) && u.friend_ids.map(String).includes(str(self))) myFriends.add(str(u.id));
    const whereOf = (p: Rec) => (p.group_id ? str(groups.get(str(p.group_id))?.name) || "Group" : p.page_id ? str(pages.get(str(p.page_id))?.name) || "Page" : "Profile");

    const posts = arr(seed.posts);
    const postsDs = ctx.dataset(server, {
      id: "posts",
      label: "Posts",
      noun: "posts",
      row: "post",
      facets: [
        { id: "where", label: "Posted in", primary: true },
        { id: "author", label: "Author", entity: true, top: 12, primary: true },
        { id: "visibility", label: "Visibility" },
        { id: "side", label: "From", order: "given", given: [ctx.first, "Friends", "Others"] },
        MONTH_FACET,
        WEEKDAY_FACET,
      ],
      sorts: [SORT_NEW, SORT_OLD],
      groups: [groupFacet("where", "Posted in"), { id: "author", label: "Author", key: (it) => it.f.author, entity: true, order: "count" }, GROUP_MONTH],
      defaultSort: "new",
    });
    for (const p of posts) {
      const author = who(str(p.author_id));
      ctx.add(postsDs, {
        id: str(p.id),
        title: firstLine(str(p.message), 90) || "Post",
        sub: `${ctx.reg.entities[author]?.name ?? "Someone"} · ${whereOf(p)}`,
        text: str(p.message),
        when: p.created_at,
        people: [ctx.ref(author, "author")],
        f: {
          where: whereOf(p),
          author: [ctx.ekey(author)!],
          visibility: pretty(p.visibility),
          side: author === ctx.self ? ctx.first : myFriends.has(str(p.author_id)) ? "Friends" : "Others",
        },
        raw: p,
      });
    }

    const listings = arr(seed.marketplace_listings);
    if (listings.length) {
      const hasDistance = listings.some((l) => num(l.distance_miles) !== null);
      const ds = ctx.dataset(server, {
        id: "marketplace",
        label: "Marketplace",
        noun: "listings",
        row: "listing",
        facets: [
          { id: "status", label: "Status", primary: true },
          { id: "mine", label: "Seller", order: "given", given: [`${ctx.first}'s listings`, "Others"], primary: true },
          { id: "category", label: "Category" },
          { id: "seller", label: "Sold by", entity: true, top: 10 },
          { id: "area", label: "Area", top: 10 },
          MONTH_FACET,
        ],
        sorts: [SORT_NEW, SORT_OLD, { id: "cheap", label: "Cheapest", key: (it) => it.n.price ?? null, dir: 1 }, sortNum("price", "Most expensive", "price"), ...(hasDistance ? [{ id: "near", label: "Nearest", key: (it: Item) => it.n.distance ?? null, dir: 1 as const }] : [])],
        groups: [groupFacet("category", "Category"), groupFacet("status", "Status"), groupFacet("area", "Area"), GROUP_MONTH],
        defaultSort: "new",
        ranges: [{ id: "price", label: "Price", get: (it) => it.n.price ?? null, money: true }, ...(hasDistance ? [{ id: "distance", label: "Distance", get: (it: Item) => it.n.distance ?? null, unit: "mi" }] : [])],
      });
      for (const l of listings) {
        const seller = who(str(l.seller_id));
        const loc = (l.location ?? {}) as Rec;
        const area = str(loc.neighborhood) || str(loc.city);
        ctx.add(ds, {
          id: str(l.id),
          title: str(l.title) || "Listing",
          sub: `${money(num(l.price) ?? 0)} · ${pretty(l.status)}${area ? ` · ${area}` : ""}${num(l.distance_miles) !== null ? ` · ${str(l.distance_miles)} mi` : ""}`,
          text: str(l.description),
          when: l.created_at,
          people: [ctx.ref(seller, "seller")],
          f: {
            status: pretty(l.status),
            mine: seller === ctx.self ? `${ctx.first}'s listings` : "Others",
            category: pretty(l.category),
            seller: [ctx.ekey(seller)!],
            area: area || "Not stated",
          },
          n: { price: num(l.price) ?? NaN, distance: num(l.distance_miles) ?? NaN },
          media: arr(l.media).map((m) => ctx.media(str(m.asset_id) + ".jpg", isRef(m.content_base64) ? m.content_base64._extracted_to : null, str(m.mime_type), num(m.size) ?? undefined)),
          raw: l,
        });
      }
    }

    const people = [...users.values()].filter((u) => str(u.id) !== str(self));
    if (people.length) {
      const ds = ctx.dataset(server, {
        id: "people",
        label: "People",
        noun: "people",
        row: "account",
        facets: [
          { id: "relation", label: "Relation", order: "given", given: ["Friend", "Not a friend"], primary: true },
          { id: "elsewhere", label: "Also appears in", primary: true },
          { id: "groups", label: "Groups" },
          { id: "area", label: "Area", top: 10 },
          { id: "visibility", label: "Profile" },
        ],
        sorts: [{ ...SORT_TITLE, label: "Name" }, sortNum("reach", "Most other servers", "reach")],
        groups: [groupFacet("relation", "Relation"), groupFacet("groups", "Group")],
        defaultSort: "reach",
      });
      const added: { it: Item; e: number }[] = [];
      for (const u of people) {
        const e = who(str(u.id));
        const loc = (u.location ?? {}) as Rec;
        const gs = (Array.isArray(u.group_ids) ? u.group_ids : []).map((g: unknown) => str(groups.get(str(g))?.name)).filter(Boolean);
        const it = ctx.add(ds, {
          id: str(u.id),
          title: str(u.name),
          sub: [myFriends.has(str(u.id)) ? "Friend" : "", gs.join(", "), str(loc.neighborhood) || str(loc.city)].filter(Boolean).join(" · "),
          people: [ctx.ref(e, "account")],
          f: {
            relation: myFriends.has(str(u.id)) ? "Friend" : "Not a friend",
            groups: gs.length ? gs : ["No groups"],
            area: str(loc.neighborhood) || str(loc.city) || "Not stated",
            visibility: pretty(u.visibility),
          },
          raw: u,
        });
        added.push({ it, e });
      }
      elsewhere(ctx, added, server);
    }

    const gs = arr(seed.groups);
    if (gs.length) {
      const ds = ctx.dataset(server, { id: "groups", label: "Groups", noun: "groups", row: "record", facets: [{ id: "visibility", label: "Visibility" }], sorts: [sortNum("members", "Most members", "members"), SORT_TITLE], groups: [], defaultSort: "members" });
      for (const g of gs) {
        const members = Array.isArray(g.member_ids) ? g.member_ids.map(String) : [];
        ctx.add(ds, {
          id: str(g.id),
          title: str(g.name),
          sub: `${pretty(g.visibility)} · ${members.length} members · ${posts.filter((p) => str(p.group_id) === str(g.id)).length} posts`,
          people: members.map((m: string) => ctx.ref(who(m), "member")),
          f: { visibility: pretty(g.visibility) },
          n: { members: members.length },
          raw: g,
        });
      }
    }

    const saved = arr(seed.saved_items);
    if (saved.length) {
      const ds = ctx.dataset(server, { id: "saved", label: "Saved", noun: "saved items", row: "record", facets: [{ id: "type", label: "Kind" }, { id: "by", label: "Saved by", entity: true }], sorts: [SORT_NEW, SORT_OLD], groups: [], defaultSort: "new" });
      for (const s of saved) {
        const type = str(s.item_type);
        const target = type === "marketplace_listing" ? `${server}/marketplace/${str(s.item_id)}` : `${server}/posts/${str(s.item_id)}`;
        const listing = listings.find((l) => str(l.id) === str(s.item_id));
        const post = posts.find((p) => str(p.id) === str(s.item_id));
        const by = who(str(s.user_id));
        ctx.add(ds, {
          id: str(s.id),
          title: listing ? str(listing.title) : post ? firstLine(str(post.message), 80) : str(s.item_id),
          sub: `${pretty(type)} saved by ${ctx.reg.entities[by]?.name ?? "someone"}`,
          when: s.created_at,
          people: [ctx.ref(by, "account")],
          f: { type: pretty(type), by: [ctx.ekey(by)!] },
          links: [{ key: target, why: "The saved item", back: "Saved" }],
          raw: s,
        });
      }
    }
    generic(ctx, server, seed, ["users", "pages", "groups", "posts", "marketplace_listings", "saved_items"]);
  },
};
