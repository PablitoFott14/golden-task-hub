import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import type { VideoGuide, XLink } from "../data/types";
import { Crosslinks } from "./ui";
import { asset } from "../lib/util";

/** The recordings are 1920 by 1140, so the frame is written from that rather
 *  than assumed to be 16 by 9. */
const FRAME = "1920 / 1140";

/**
 * One recording as a strip card: poster on the left, label on the right. The
 * whole card is the play button, so the row costs one line of page height per
 * video and still reads as three distinct, titled things.
 */
function VideoCard({
  v,
  onPlay,
}: {
  v: VideoGuide;
  onPlay: (el: HTMLButtonElement) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      onClick={() => ref.current && onPlay(ref.current)}
      aria-label={`Play ${v.title}, ${v.duration}`}
      className="card card-hover group flex w-full items-center gap-3.5 p-3 text-left"
    >
      <span
        className="relative w-[104px] shrink-0 overflow-hidden rounded-lg bg-ink-100 sm:w-[124px]"
        style={{ aspectRatio: FRAME }}
      >
        <img
          src={asset(v.poster)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-black/25 transition group-hover:bg-black/10">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/95 text-black shadow-soft transition duration-300 group-hover:scale-110">
            <Play size={11} className="translate-x-px fill-current" aria-hidden />
          </span>
        </span>
        <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1 py-px font-mono text-[9.5px] font-bold text-white">
          {v.duration}
        </span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-1.5">
          <span className="font-mono text-[10.5px] font-bold text-amber-600 dark:text-amber-300">
            {v.n}
          </span>
          <span className="truncate text-[13.5px] font-bold text-ink-900">{v.title}</span>
        </span>
        <span className="mt-1 block text-[12.5px] leading-snug text-ink-500">{v.covers}</span>
      </span>
    </button>
  );
}

/**
 * The player. It opens over the page rather than in the strip, which is the
 * whole reason three videos cost one row: the homepage never carries a player
 * at all. `seen` and `fix` sit beside it, so the recording arrives with the
 * mistake it answers already stated.
 */
function Lightbox({
  v,
  videos,
  onSelect,
  onClose,
}: {
  v: VideoGuide;
  videos: VideoGuide[];
  onSelect: (v: VideoGuide) => void;
  onClose: () => void;
}) {
  const i = videos.findIndex((x) => x.id === v.id);
  const prev = videos[i - 1];
  const next = videos[i + 1];

  /** Escape closes, and the page behind must not scroll under the player. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${v.title}, Universe Interaction video ${v.n} of ${videos.length}`}
      className="fixed inset-0 z-[60] flex justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 6 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="card my-auto w-full max-w-4xl overflow-hidden"
      >
        <div className="flex items-center gap-3 border-b border-ink-200/70 px-4 py-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-500 font-mono text-[12px] font-bold text-white">
            {v.n}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-[15px] font-bold tracking-tight text-ink-900">
              {v.title}
            </h3>
            <p className="mono-label mt-0.5 text-ink-400">
              Universe interaction · {v.n} of {videos.length} · {v.duration}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close the player"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-500 transition hover:border-ink-300 hover:text-ink-900"
          >
            <X size={15} />
          </button>
        </div>

        {/* Keyed on the id so stepping to the next video loads it rather than
            leaving the previous one playing. */}
        <div className="grid place-items-center bg-black">
          <video
            key={v.id}
            src={asset(v.src)}
            poster={asset(v.poster)}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full"
            style={{ aspectRatio: FRAME, maxHeight: "52vh" }}
          />
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-300/70 bg-rose-50/60 p-3.5 dark:border-rose-500/30 dark:bg-rose-500/10">
            <div className="mono-label mb-1.5 text-rose-700 dark:text-rose-300">What we keep seeing</div>
            <p className="text-[13px] leading-relaxed text-ink-700">{v.seen}</p>
          </div>
          <div className="rounded-xl border border-emerald-300/70 bg-emerald-50/60 p-3.5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <div className="mono-label mb-1.5 text-emerald-700 dark:text-emerald-300">Do this instead</div>
            <p className="text-[13px] leading-relaxed text-ink-700">{v.fix}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-ink-200/70 px-4 py-3">
          {prev && (
            <button onClick={() => onSelect(prev)} className="btn-ghost text-[12.5px]">
              <ArrowLeft size={14} /> {prev.title}
            </button>
          )}
          {next && (
            <button onClick={() => onSelect(next)} className="btn-primary ml-auto text-[12.5px]">
              Next: {next.title} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * The video set as one row. Three recordings, three cards, one line of height,
 * and the player opens over the page. The band is the first thing under the
 * hero because universe interaction is the most common reason a task is
 * rejected, so it has to be found without scrolling for it.
 */
export default function VideoStrip({
  eyebrow,
  title,
  sub,
  videos,
  runtime,
  links,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  videos: VideoGuide[];
  runtime: string;
  links?: XLink[];
}) {
  const [open, setOpen] = useState<VideoGuide | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const play = useCallback((v: VideoGuide, el: HTMLButtonElement) => {
    opener.current = el;
    setOpen(v);
  }, []);

  /** Send focus back to the card that opened the player, so keyboard readers
   *  do not land at the top of the document after closing. */
  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <span className="chip bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-300">
            <Play size={11} className="fill-current" aria-hidden /> {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-[22px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[26px]">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500">{sub}</p>
        </div>
        <span className="mono-label whitespace-nowrap text-ink-400">
          {videos.length} videos · {runtime} total
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <VideoCard key={v.id} v={v} onPlay={(el) => play(v, el)} />
        ))}
      </div>

      <Crosslinks links={links} className="mt-4" />

      <AnimatePresence>
        {open && (
          <Lightbox
            key="player"
            v={open}
            videos={videos}
            onSelect={setOpen}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}
