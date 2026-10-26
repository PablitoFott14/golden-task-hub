import { fmtDay } from "../time";
import { GROUP_MONTH, GROUP_WEEK, GROUP_WEEKDAY, MONTH_FACET, SORT_NEW, SORT_OLD, WEEKDAY_FACET, arr, groupFacet, num, pretty, sortNum, str, type Ctx, type Rec, type ServerDef } from "../ctx";
import type { Column, Facet, Item, Sort } from "../types";
import { generic } from "./money";
import { HOUR_BUCKETS, hourBucket } from "./comms";

/**
 * Health servers keep one record per metric per day, or many small sleep
 * segments a night. Explore lines them up as one row per day, so a day's
 * steps, sleep and heart rate sit side by side and against everything else
 * that happened that day; the stored records stay listed under each day.
 */

interface DayAcc {
  n: Record<string, number>;
  recs: Record<string, Rec[]>;
  bed?: number;
  wake?: number;
  workouts: string[];
}

function days(): Map<string, DayAcc> & { at(day: string): DayAcc } {
  const m = new Map<string, DayAcc>() as Map<string, DayAcc> & { at(day: string): DayAcc };
  m.at = (day: string) => {
    let d = m.get(day);
    if (!d) {
      d = { n: {}, recs: {}, workouts: [] };
      m.set(day, d);
    }
    return d;
  };
  return m;
}
const keep = (d: DayAcc, coll: string, r: Rec) => (d.recs[coll] ??= []).push(r);
const add = (d: DayAcc, k: string, v: number | null) => {
  if (v !== null && Number.isFinite(v)) d.n[k] = (d.n[k] ?? 0) + v;
};

export const SLEEP_BUCKETS = ["Under 6 hours", "6 to 7 hours", "7 to 8 hours", "8 hours or more", "No sleep record"];
const sleepBucket = (min: number | undefined) =>
  min === undefined ? SLEEP_BUCKETS[4] : min < 360 ? SLEEP_BUCKETS[0] : min < 420 ? SLEEP_BUCKETS[1] : min < 480 ? SLEEP_BUCKETS[2] : SLEEP_BUCKETS[3];
export const BED_BUCKETS = ["Before 9 pm", "9 to 10 pm", "10 to 11 pm", "11 pm to midnight", "After midnight", "No sleep record"];
/** Minutes after noon the evening before, so 11 pm sorts before 1 am. */
const bedBucket = (m: number | undefined) =>
  m === undefined ? BED_BUCKETS[5] : m < 540 ? BED_BUCKETS[0] : m < 600 ? BED_BUCKETS[1] : m < 660 ? BED_BUCKETS[2] : m < 720 ? BED_BUCKETS[3] : BED_BUCKETS[4];
export const WAKE_BUCKETS = ["Before 4 am", "4 to 6 am", "6 to 8 am", "8 am or later", "No sleep record"];
const wakeBucket = (m: number | undefined) =>
  m === undefined ? WAKE_BUCKETS[4] : m < 240 ? WAKE_BUCKETS[0] : m < 360 ? WAKE_BUCKETS[1] : m < 480 ? WAKE_BUCKETS[2] : WAKE_BUCKETS[3];
export const STEP_BUCKETS = ["Under 5,000", "5,000 to 10,000", "10,000 to 15,000", "15,000 or more", "No step record"];
const stepBucket = (s: number | undefined) =>
  s === undefined ? STEP_BUCKETS[4] : s < 5000 ? STEP_BUCKETS[0] : s < 10000 ? STEP_BUCKETS[1] : s < 15000 ? STEP_BUCKETS[2] : STEP_BUCKETS[3];

const hm = (min: number | undefined) => (min === undefined ? null : `${Math.floor(min / 60)}h ${String(Math.round(min % 60)).padStart(2, "0")}m`);
const clockOf = (ctx: Ctx, ms: number | undefined) => (ms === undefined ? null : ctx.clock.time(ms));

const DAY_FACETS: Facet[] = [
  { id: "sleep", label: "Sleep", order: "given", given: SLEEP_BUCKETS, primary: true },
  { id: "bed", label: "Bedtime", order: "given", given: BED_BUCKETS, primary: true },
  { id: "wake", label: "Woke up", order: "given", given: WAKE_BUCKETS },
  { id: "steps", label: "Steps", order: "given", given: STEP_BUCKETS },
  WEEKDAY_FACET,
  MONTH_FACET,
];

function dayItems(ctx: Ctx, server: string, acc: Map<string, DayAcc>, columns: Column[], sorts: Sort[], extraFacets: Facet[], summary: (d: DayAcc) => string, extra: (d: DayAcc) => Record<string, string | string[]>) {
  const ds = ctx.dataset(server, {
    id: "days",
    label: "Days",
    noun: "days",
    row: "health",
    facets: [...extraFacets, ...DAY_FACETS],
    sorts: [{ ...SORT_NEW, label: "Latest day first" }, { ...SORT_OLD, label: "Earliest day first" }, ...sorts],
    groups: [GROUP_WEEK, GROUP_MONTH, GROUP_WEEKDAY, groupFacet("sleep", "Sleep", { order: "given", given: SLEEP_BUCKETS })],
    defaultSort: "new",
    columns,
    chart: "health",
    note: "One row per day, every metric that day side by side.",
  });
  for (const [day, d] of [...acc].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    ctx.add(ds, {
      id: day,
      title: fmtDay(day),
      sub: summary(d),
      when: day,
      allDay: true,
      f: { sleep: sleepBucket(d.n.asleep), bed: bedBucket(d.n.bedMin), wake: wakeBucket(d.n.wakeMin), steps: stepBucket(d.n.steps), ...extra(d) },
      n: { ...d.n, ...(d.bed !== undefined ? { bedAt: d.bed } : {}), ...(d.wake !== undefined ? { wakeAt: d.wake } : {}) },
      raw: { date: day, ...d.recs },
    });
  }
  return ds;
}

function setSleep(ctx: Ctx, d: DayAcc, startMs: number, endMs: number) {
  d.bed = d.bed === undefined ? startMs : Math.min(d.bed, startMs);
  d.wake = d.wake === undefined ? endMs : Math.max(d.wake, endMs);
  d.n.bedMin = (ctx.clock.minute(d.bed) + 720) % 1440;
  d.n.wakeMin = ctx.clock.minute(d.wake);
}

const numCol = (id: string, label: string, opts: Partial<Column> = {}): Column => ({ id, label, num: true, get: (it: Item) => (it.n[id] === undefined ? null : Math.round(it.n[id] * 10) / 10), ...opts });

/* ------------------------------------------------------------ apple health */

export const apple_health: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.user_profiles)) if (u.is_user) reg.claim({ self: true, emails: [str(u.email)] });
  },
  build(seed, ctx, server) {
    const acc = days();
    const dayOf = (v: unknown) => {
      const p = ctx.clock.parse(v);
      return p ? (p.dateOnly ? str(v).slice(0, 10) : ctx.clock.day(p.ms)) : null;
    };
    for (const r of arr(seed.activity_summaries)) {
      const day = dayOf(r.date);
      if (!day) continue;
      const d = acc.at(day);
      keep(d, "activity_summaries", r);
      add(d, "active", num(r.active_energy_kcal));
      add(d, "basal", num(r.basal_energy_kcal));
      add(d, "exercise", num(r.exercise_minutes));
      add(d, "stand", num(r.stand_hours));
      add(d, "km", num(r.distance_km));
      add(d, "flights", num(r.flights_climbed));
    }
    for (const r of arr(seed.step_records)) {
      const day = dayOf(r.date);
      if (!day) continue;
      keep(acc.at(day), "step_records", r);
      add(acc.at(day), "steps", num(r.total_steps));
    }
    for (const [coll, key] of [["resting_heart_rate_records", "rhr"], ["hrv_records", "hrv"], ["vo2max_records", "vo2"], ["body_mass_records", "mass"]] as const) {
      for (const r of arr(seed[coll])) {
        const day = dayOf(r.date);
        if (!day) continue;
        const d = acc.at(day);
        keep(d, coll, r);
        // One reading a day in practice; more are averaged.
        const n = (d.recs[coll] ?? []).length;
        const v = num(r.value);
        if (v !== null) d.n[key] = n > 1 ? ((d.n[key] ?? v) * (n - 1) + v) / n : v;
      }
    }
    for (const w of arr(seed.workout_records)) {
      const day = dayOf(w.start);
      if (!day) continue;
      const d = acc.at(day);
      keep(d, "workout_records", w);
      d.workouts.push(pretty(w.activity_type));
      add(d, "workoutMin", num(w.duration_minutes));
    }
    // Sleep is a run of stage segments; a gap of three hours starts a new
    // night, and a night belongs to the day it ends on.
    const segs = arr(seed.sleep_records)
      .map((s) => ({ s, a: ctx.clock.parse(s.start)?.ms, b: ctx.clock.parse(s.end)?.ms }))
      .filter((x): x is { s: Rec; a: number; b: number } => x.a !== undefined && x.b !== undefined)
      .sort((x, y) => x.a - y.a);
    let night: typeof segs = [];
    const flush = () => {
      if (!night.length) return;
      const end = Math.max(...night.map((x) => x.b));
      const d = acc.at(ctx.clock.day(end));
      for (const x of night) {
        keep(d, "sleep_records", x.s);
        const min = (x.b - x.a) / 60000;
        const stage = str(x.s.stage);
        if (/^asleep/i.test(stage)) add(d, "asleep", min);
        add(d, /deep/i.test(stage) ? "deep" : /rem/i.test(stage) ? "rem" : /core/i.test(stage) ? "core" : /awake/i.test(stage) ? "awake" : "otherSleep", min);
      }
      setSleep(ctx, d, Math.min(...night.map((x) => x.a)), end);
      night = [];
    };
    for (const x of segs) {
      if (night.length && x.a - Math.max(...night.map((y) => y.b)) > 3 * 3_600_000) flush();
      night.push(x);
    }
    flush();

    const workoutTypes = [...new Set([...acc.values()].flatMap((d) => d.workouts))];
    dayItems(
      ctx,
      server,
      acc,
      [
        numCol("steps", "Steps"),
        numCol("km", "Distance km"),
        numCol("active", "Active kcal"),
        numCol("exercise", "Exercise min"),
        numCol("stand", "Stand h"),
        numCol("flights", "Flights"),
        numCol("rhr", "Resting HR"),
        numCol("hrv", "HRV ms"),
        { id: "asleep", label: "Asleep", get: (it) => hm(it.n.asleep) },
        { id: "deep", label: "Deep", get: (it) => hm(it.n.deep) },
        { id: "rem", label: "REM", get: (it) => hm(it.n.rem) },
        { id: "bed", label: "Bedtime", get: (it) => clockOf(ctx, it.n.bedAt) },
        { id: "wake", label: "Woke", get: (it) => clockOf(ctx, it.n.wakeAt) },
        { id: "workout", label: "Workout", get: (it) => ((it.f.workout as string[]) ?? []).filter((w) => w !== "No workout").join(", ") || null },
      ],
      [sortNum("steps", "Most steps", "steps"), sortNum("asleep", "Most sleep", "asleep"), sortNum("asleep_low", "Least sleep", "asleep", 1), sortNum("rhr", "Highest resting HR", "rhr"), sortNum("hrv", "Highest HRV", "hrv"), sortNum("bedMin", "Latest bedtime", "bedMin"), sortNum("exercise", "Most exercise", "exercise")],
      workoutTypes.length ? [{ id: "workout", label: "Workout", order: "given", given: [...workoutTypes, "No workout"], primary: true }] : [],
      (d) => [d.n.steps !== undefined ? `${Math.round(d.n.steps).toLocaleString("en-US")} steps` : "", d.n.asleep !== undefined ? `${hm(d.n.asleep)} asleep` : "", d.n.rhr !== undefined ? `resting ${Math.round(d.n.rhr)} bpm` : "", d.workouts.length ? d.workouts.join(", ") : ""].filter(Boolean).join(" · "),
      (d) => ({ workout: d.workouts.length ? [...new Set(d.workouts)] : ["No workout"] })
    );

    const workouts = arr(seed.workout_records);
    if (workouts.length) {
      const ds = ctx.dataset(server, {
        id: "workouts",
        label: "Workouts",
        noun: "workouts",
        row: "activity",
        facets: [{ id: "type", label: "Activity", primary: true }, { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS }, WEEKDAY_FACET, MONTH_FACET],
        sorts: [SORT_NEW, SORT_OLD, sortNum("km", "Longest distance", "km"), sortNum("min", "Longest time", "min"), sortNum("kcal", "Most energy", "kcal")],
        groups: [GROUP_MONTH, groupFacet("type", "Activity")],
        defaultSort: "new",
      });
      for (const w of workouts) {
        ctx.add(ds, {
          id: str(w.record_id),
          title: pretty(w.activity_type),
          sub: [num(w.total_distance_km) !== null ? `${str(w.total_distance_km)} km` : "", num(w.duration_minutes) !== null ? `${Math.round(Number(w.duration_minutes))} min` : "", num(w.total_energy_kcal) !== null ? `${Math.round(Number(w.total_energy_kcal))} kcal` : ""].filter(Boolean).join(" · "),
          when: w.start,
          end: w.end,
          f: { type: pretty(w.activity_type) },
          n: { km: num(w.total_distance_km) ?? NaN, min: num(w.duration_minutes) ?? NaN, kcal: num(w.total_energy_kcal) ?? NaN },
          raw: w,
        });
      }
    }
    const hr = arr(seed.heart_rate_records);
    if (hr.length) {
      const ds = ctx.dataset(server, {
        id: "heart_rate",
        label: "Heart rate",
        noun: "readings",
        row: "record",
        facets: [{ id: "band", label: "Reading", order: "given", given: ["Under 60", "60 to 99", "100 to 139", "140 or more"] }, { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS }, MONTH_FACET],
        sorts: [SORT_NEW, SORT_OLD, sortNum("bpm", "Highest", "bpm"), sortNum("bpm_low", "Lowest", "bpm", 1)],
        groups: [GROUP_MONTH],
        defaultSort: "new",
      });
      for (const r of hr) {
        const v = num(r.value) ?? 0;
        ctx.add(ds, {
          id: str(r.record_id),
          title: `${Math.round(v)} bpm`,
          sub: str(r.unit),
          when: r.date,
          f: { band: v < 60 ? "Under 60" : v < 100 ? "60 to 99" : v < 140 ? "100 to 139" : "140 or more" },
          n: { bpm: v },
          raw: r,
        });
      }
    }
    generic(ctx, server, seed, ["user_profiles", "heart_rate_records", "resting_heart_rate_records", "hrv_records", "sleep_records", "step_records", "workout_records", "vo2max_records", "body_mass_records", "activity_summaries"]);
  },
};

/* ------------------------------------------------------------------ fitbit */

export const fitbit: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.user_profiles)) if (u.is_user !== false) reg.claim({ self: true, emails: [str(u.email)] });
  },
  build(seed, ctx, server) {
    const acc = days();
    for (const r of arr(seed.daily_stats)) {
      const day = str(r.date).slice(0, 10);
      if (!day) continue;
      const d = acc.at(day);
      keep(d, "daily_stats", r);
      for (const [k, f] of [
        ["steps", "steps"],
        ["km", "distance"],
        ["kcal", "calories"],
        ["active", "calories_active"],
        ["floors", "floors"],
        ["azm", "active_zone_minutes"],
        ["sedentary", "sedentary_minutes"],
        ["veryActive", "very_active_minutes"],
        ["rhr", "resting_heart_rate"],
      ] as const)
        add(d, k, num(r[f]));
    }
    for (const r of arr(seed.heart_rate_summaries)) {
      const day = str(r.date).slice(0, 10);
      if (!day) continue;
      const d = acc.at(day);
      keep(d, "heart_rate_summaries", r);
      add(d, "fatBurn", num(r.fat_burn_minutes));
      add(d, "cardio", num(r.cardio_minutes));
      add(d, "peak", num(r.peak_minutes));
      if (d.n.rhr === undefined) add(d, "rhr", num(r.resting_heart_rate));
    }
    for (const s of arr(seed.sleep_logs)) {
      const day = str(s.date).slice(0, 10);
      if (!day) continue;
      const d = acc.at(day);
      keep(d, "sleep_logs", s);
      add(d, "asleep", num(s.minutes_asleep));
      add(d, "awakeMin", num(s.minutes_awake));
      add(d, "deep", num(s.deep_minutes));
      add(d, "rem", num(s.rem_minutes));
      add(d, "light", num(s.light_minutes));
      const eff = num(s.efficiency);
      if (eff !== null) d.n.efficiency = eff;
      const a = ctx.clock.parse(s.start_time)?.ms;
      const b = ctx.clock.parse(s.end_time)?.ms;
      if (a !== undefined && b !== undefined) setSleep(ctx, d, a, b);
    }
    const acts = arr(seed.activities);
    for (const a of acts) {
      const day = str(a.date).slice(0, 10) || (ctx.clock.parse(a.start_time) ? ctx.clock.day(ctx.clock.parse(a.start_time)!.ms) : "");
      if (!day) continue;
      const d = acc.at(day);
      keep(d, "activities", a);
      d.workouts.push(str(a.activity_name) || "Activity");
      add(d, "actMin", num(a.duration_minutes));
      const at = ctx.clock.parse(a.start_time)?.ms;
      if (at !== undefined && d.n.actStart === undefined) d.n.actStart = at;
    }
    const names = [...new Set(acts.map((a) => str(a.activity_name)).filter(Boolean))];
    dayItems(
      ctx,
      server,
      acc,
      [
        numCol("steps", "Steps"),
        numCol("km", "Distance km"),
        numCol("kcal", "Calories"),
        numCol("azm", "Active zone min"),
        numCol("rhr", "Resting HR"),
        { id: "asleep", label: "Asleep", get: (it) => hm(it.n.asleep) },
        numCol("efficiency", "Sleep efficiency"),
        { id: "bed", label: "Bedtime", get: (it) => clockOf(ctx, it.n.bedAt) },
        { id: "wake", label: "Woke", get: (it) => clockOf(ctx, it.n.wakeAt) },
        { id: "act", label: names.length === 1 ? names[0] : "Activity", get: (it) => (it.n.actStart === undefined ? null : `${clockOf(ctx, it.n.actStart)}, ${Math.round(it.n.actMin ?? 0)} min`) },
      ],
      [sortNum("steps", "Most steps", "steps"), sortNum("asleep", "Most sleep", "asleep"), sortNum("asleep_low", "Least sleep", "asleep", 1), sortNum("rhr", "Highest resting HR", "rhr"), sortNum("azm", "Most active zone minutes", "azm"), sortNum("bedMin", "Latest bedtime", "bedMin")],
      acts.length ? [{ id: "acttime", label: names.length === 1 ? `${names[0]} starts` : "Activity starts", order: "given", given: [...HOUR_BUCKETS, "No activity"], primary: true }] : [],
      (d) => [d.n.steps !== undefined ? `${Math.round(d.n.steps).toLocaleString("en-US")} steps` : "", d.n.asleep !== undefined ? `${hm(d.n.asleep)} asleep` : "", d.n.rhr !== undefined ? `resting ${Math.round(d.n.rhr)} bpm` : ""].filter(Boolean).join(" · "),
      (d) => ({ acttime: d.n.actStart === undefined ? "No activity" : hourBucket(ctx.clock.minute(d.n.actStart)) })
    );

    if (acts.length) {
      const ds = ctx.dataset(server, {
        id: "activities",
        label: "Activities",
        noun: "activities",
        row: "activity",
        facets: [{ id: "name", label: "Activity", primary: true }, { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS, primary: true }, WEEKDAY_FACET, MONTH_FACET],
        sorts: [SORT_NEW, SORT_OLD, sortNum("km", "Longest distance", "km"), sortNum("min", "Longest time", "min"), sortNum("hr", "Highest average HR", "hr"), { id: "pace", label: "Fastest pace", key: (it) => it.n.pace ?? null, dir: 1 }],
        groups: [GROUP_MONTH, GROUP_WEEK, GROUP_WEEKDAY],
        defaultSort: "new",
      });
      for (const a of acts) {
        ctx.add(ds, {
          id: str(a.id),
          title: str(a.activity_name) || "Activity",
          sub: [num(a.duration_minutes) !== null ? `${Math.round(Number(a.duration_minutes))} min` : "", num(a.distance) !== null ? `${str(a.distance)} ${str(a.distance_unit) || "km"}` : "", num(a.average_heart_rate) !== null ? `avg ${str(a.average_heart_rate)} bpm` : "", num(a.steps) !== null ? `${Number(a.steps).toLocaleString("en-US")} steps` : ""].filter(Boolean).join(" · "),
          when: a.start_time ?? a.date,
          f: { name: str(a.activity_name) || "Activity" },
          n: { km: num(a.distance) ?? NaN, min: num(a.duration_minutes) ?? NaN, hr: num(a.average_heart_rate) ?? NaN, pace: num(a.pace) ?? NaN, kcal: num(a.calories) ?? NaN },
          raw: a,
        });
      }
    }
    generic(ctx, server, seed, ["user_profiles", "daily_stats", "heart_rate_summaries", "activities", "sleep_logs"]);
  },
};

/* ----------------------------------------------------------- garmin health */

export const garmin_health: ServerDef = {
  claims(seed, reg) {
    for (const u of arr(seed.users)) if (u.is_user !== false) reg.claim({ self: true, emails: [str(u.email)], phones: [str(u.phone)] });
  },
  build(seed, ctx, server) {
    const acc = days();
    // One record per metric per day in practice; more in a day are averaged.
    const each = (coll: string, fields: [string, string][]) => {
      for (const r of arr(seed[coll])) {
        const day = str(r.date).slice(0, 10);
        if (!day) continue;
        const d = acc.at(day);
        keep(d, coll, r);
        const n = d.recs[coll].length;
        for (const [k, f] of fields) {
          const v = num(r[f]);
          if (v !== null) d.n[k] = n > 1 && d.n[k] !== undefined ? (d.n[k] * (n - 1) + v) / n : v;
        }
      }
    };
    each("daily_stats", [["steps", "steps"], ["meters", "distance_meters"], ["kcal", "calories_total"], ["active", "calories_active"], ["floors", "floors_climbed"], ["intensity", "intensity_minutes"]]);
    for (const d of acc.values()) if (d.n.meters !== undefined) d.n.km = d.n.meters / 1000;
    each("heart_rate", [["rhr", "resting_hr"], ["maxHr", "max_hr"]]);
    each("hrv", [["hrv", "hrv_last_night"]]);
    each("sleep", [["asleep", "total_sleep_minutes"], ["deep", "deep_sleep_minutes"], ["light", "light_sleep_minutes"], ["rem", "rem_sleep_minutes"], ["awakeMin", "awake_minutes"], ["sleepScore", "sleep_score"]]);
    each("stress", [["stress", "avg_stress"]]);
    each("body_battery", [["battery", "morning_value"], ["batteryHigh", "high_value"], ["batteryLow", "low_value"]]);
    each("training_readiness", [["readiness", "readiness_score"]]);
    each("respiration", [["resp", "avg_waking_respiration"]]);
    each("spo2", [["spo2", "avg_spo2"]]);
    each("body_composition", [["weight", "weight_kg"]]);
    for (const d of acc.values()) {
      const s = d.recs.sleep?.[0];
      const a = ctx.clock.parse(s?.sleep_start)?.ms;
      const b = ctx.clock.parse(s?.sleep_end)?.ms;
      if (a !== undefined && b !== undefined) setSleep(ctx, d, a, b);
    }
    const acts = arr(seed.activities);
    for (const a of acts) {
      const at = ctx.clock.parse(a.start_time)?.ms;
      if (at === undefined) continue;
      const d = acc.at(ctx.clock.day(at));
      keep(d, "activities", a);
      d.workouts.push(pretty(a.activity_type) || "Activity");
      add(d, "workoutMin", (num(a.duration_seconds) ?? 0) / 60);
    }
    const first = (d: DayAcc, coll: string, f: string) => str(d.recs[coll]?.[0]?.[f]);
    const types = [...new Set([...acc.values()].flatMap((d) => d.workouts))];
    dayItems(
      ctx,
      server,
      acc,
      [
        numCol("steps", "Steps"),
        numCol("km", "Distance km"),
        numCol("kcal", "Calories"),
        numCol("rhr", "Resting HR"),
        numCol("hrv", "HRV ms"),
        { id: "asleep", label: "Asleep", get: (it) => hm(it.n.asleep) },
        numCol("sleepScore", "Sleep score"),
        numCol("stress", "Stress"),
        numCol("battery", "Body battery"),
        numCol("readiness", "Readiness"),
        { id: "bed", label: "Bedtime", get: (it) => clockOf(ctx, it.n.bedAt) },
        { id: "wake", label: "Woke", get: (it) => clockOf(ctx, it.n.wakeAt) },
        { id: "workout", label: "Activity", get: (it) => ((it.f.workout as string[]) ?? []).filter((w) => w !== "No activity").join(", ") || null },
      ],
      [sortNum("steps", "Most steps", "steps"), sortNum("asleep", "Most sleep", "asleep"), sortNum("asleep_low", "Least sleep", "asleep", 1), sortNum("rhr", "Highest resting HR", "rhr"), sortNum("hrv", "Highest HRV", "hrv"), sortNum("stress", "Most stress", "stress"), sortNum("battery_low", "Lowest body battery", "battery", 1), sortNum("bedMin", "Latest bedtime", "bedMin")],
      [
        ...(types.length ? [{ id: "workout", label: "Activity", order: "given" as const, given: [...types, "No activity"], primary: true }] : []),
        { id: "hrvStatus", label: "HRV status" },
        { id: "stressLevel", label: "Stress level" },
        { id: "readinessLevel", label: "Readiness" },
      ],
      (d) => [d.n.steps !== undefined ? `${Math.round(d.n.steps).toLocaleString("en-US")} steps` : "", d.n.asleep !== undefined ? `${hm(d.n.asleep)} asleep` : "", d.n.rhr !== undefined ? `resting ${Math.round(d.n.rhr)} bpm` : "", d.workouts.length ? d.workouts.join(", ") : ""].filter(Boolean).join(" · "),
      (d) => ({
        workout: d.workouts.length ? [...new Set(d.workouts)] : ["No activity"],
        ...(first(d, "hrv", "hrv_status") ? { hrvStatus: pretty(first(d, "hrv", "hrv_status")) } : {}),
        ...(first(d, "stress", "stress_qualifier") ? { stressLevel: pretty(first(d, "stress", "stress_qualifier")) } : {}),
        ...(first(d, "training_readiness", "readiness_level") ? { readinessLevel: pretty(first(d, "training_readiness", "readiness_level")) } : {}),
      })
    );

    if (acts.length) {
      const ds = ctx.dataset(server, {
        id: "activities",
        label: "Activities",
        noun: "activities",
        row: "activity",
        facets: [{ id: "type", label: "Activity", primary: true }, { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS, primary: true }, WEEKDAY_FACET, MONTH_FACET],
        sorts: [SORT_NEW, SORT_OLD, sortNum("km", "Longest distance", "km"), sortNum("min", "Longest time", "min"), sortNum("hr", "Highest average HR", "hr"), { id: "pace", label: "Fastest pace", key: (it) => it.n.pace ?? null, dir: 1 }, sortNum("elev", "Most climbing", "elev")],
        groups: [GROUP_MONTH, GROUP_WEEK, groupFacet("type", "Activity")],
        defaultSort: "new",
      });
      for (const a of acts) {
        const min = (num(a.duration_seconds) ?? NaN) / 60;
        const km = (num(a.distance_meters) ?? NaN) / 1000;
        ctx.add(ds, {
          id: str(a.activity_id),
          title: str(a.activity_name) || pretty(a.activity_type) || "Activity",
          sub: [Number.isFinite(min) ? `${Math.round(min)} min` : "", Number.isFinite(km) && km > 0 ? `${km.toFixed(1)} km` : "", num(a.avg_hr) !== null ? `avg ${str(a.avg_hr)} bpm` : "", num(a.calories) !== null ? `${str(a.calories)} kcal` : ""].filter(Boolean).join(" · "),
          when: a.start_time,
          f: { type: pretty(a.activity_type) || "Activity" },
          n: { km, min, hr: num(a.avg_hr) ?? NaN, pace: num(a.avg_pace_seconds_per_km) ?? NaN, kcal: num(a.calories) ?? NaN, elev: num(a.elevation_gain_meters) ?? NaN },
          raw: a,
        });
      }
    }
    generic(ctx, server, seed, ["users", "daily_stats", "heart_rate", "hrv", "sleep", "stress", "body_battery", "training_readiness", "respiration", "spo2", "body_composition", "activities", "devices"]);
  },
};

/* ------------------------------------------------------------------ strava */

export const strava: ServerDef = {
  claims(seed, reg) {
    for (const a of arr(seed.athletes)) {
      reg.claim({ ids: ["strava:" + str(a.user_id)], names: [`${str(a.firstname)} ${str(a.lastname)}`.trim()], emails: [str(a.email)], kind: "person", strength: 2, self: a.is_user === true || undefined });
    }
  },
  build(seed, ctx, server) {
    const acts = arr(seed.activities);
    const gearIds = [...new Set(acts.map((a) => str(a.gear_id)).filter(Boolean))];
    const ds = ctx.dataset(server, {
      id: "activities",
      label: "Activities",
      noun: "activities",
      row: "activity",
      facets: [
        { id: "type", label: "Sport", primary: true },
        { id: "device", label: "Recorded with", primary: true },
        { id: "gear", label: "Gear" },
        { id: "hr", label: "Heart rate", order: "given", given: ["With heart rate", "No heart rate"] },
        { id: "notes", label: "Notes", order: "given", given: ["Has a description", "No description"] },
        { id: "achievements", label: "Achievements", order: "given", given: ["With achievements", "None"] },
        { id: "hour", label: "Time of day", order: "given", given: HOUR_BUCKETS },
        WEEKDAY_FACET,
        MONTH_FACET,
      ],
      sorts: [
        SORT_NEW,
        SORT_OLD,
        sortNum("km", "Longest distance", "km"),
        sortNum("elev", "Most climbing", "elev"),
        sortNum("moving", "Longest moving time", "moving"),
        sortNum("speed", "Fastest average", "speed"),
        sortNum("kudos", "Most kudos", "kudos"),
        sortNum("suffer", "Hardest effort", "suffer"),
      ],
      groups: [GROUP_MONTH, GROUP_WEEK, groupFacet("device", "Recorded with"), groupFacet("gear", "Gear")],
      defaultSort: "new",
      ranges: [{ id: "km", label: "Distance", get: (it) => it.n.km ?? null, unit: "km" }],
    });
    for (const a of acts) {
      const km = (num(a.distance) ?? 0) / 1000;
      const moving = (num(a.moving_time) ?? 0) / 60;
      ctx.add(ds, {
        id: str(a.activity_id),
        title: str(a.name) || "Activity",
        sub: [`${km.toFixed(1)} km`, `${Math.round(moving)} min moving`, num(a.total_elevation_gain) !== null ? `${Math.round(Number(a.total_elevation_gain))} m up` : "", num(a.average_heartrate) !== null ? `avg ${Math.round(Number(a.average_heartrate))} bpm` : ""].filter(Boolean).join(" · "),
        text: str(a.description),
        when: a.start_date ?? a.start_date_local,
        f: {
          type: pretty(a.sport_type || a.type),
          device: str(a.device_name) || "Not stated",
          gear: a.gear_id ? `Gear ${gearIds.indexOf(str(a.gear_id)) + 1} of ${gearIds.length}` : "No gear",
          hr: num(a.average_heartrate) !== null ? "With heart rate" : "No heart rate",
          notes: str(a.description) ? "Has a description" : "No description",
          achievements: Number(a.achievement_count) > 0 || Number(a.pr_count) > 0 ? "With achievements" : "None",
        },
        n: {
          km,
          moving,
          elev: num(a.total_elevation_gain) ?? NaN,
          speed: (num(a.average_speed) ?? NaN) * 3.6,
          kudos: num(a.kudos_count) ?? NaN,
          suffer: num(a.suffer_score) ?? NaN,
          hr: num(a.average_heartrate) ?? NaN,
          kcal: num(a.calories) ?? NaN,
        },
        raw: a,
      });
    }
    const routes = arr(seed.routes);
    if (routes.length) {
      const rd = ctx.dataset(server, {
        id: "routes",
        label: "Routes",
        noun: "routes",
        row: "activity",
        facets: [{ id: "starred", label: "Starred", order: "given", given: ["Starred", "Not starred"] }, { id: "private", label: "Visibility", order: "given", given: ["Private", "Public"] }],
        sorts: [sortNum("km", "Longest", "km"), SORT_NEW],
        groups: [],
        defaultSort: "km",
      });
      for (const r of routes) {
        ctx.add(rd, {
          id: str(r.route_id),
          title: str(r.name),
          sub: `${((num(r.distance) ?? 0) / 1000).toFixed(1)} km · ${Math.round(num(r.elevation_gain) ?? 0)} m up · about ${Math.round((num(r.estimated_moving_time) ?? 0) / 60)} min`,
          text: str(r.description),
          when: r.created_at,
          f: { starred: r.starred ? "Starred" : "Not starred", private: r.private ? "Private" : "Public" },
          n: { km: (num(r.distance) ?? 0) / 1000 },
          raw: r,
        });
      }
    }
    generic(ctx, server, seed, ["activities", "routes"]);
  },
};
