import { useEffect, useId, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { XLink } from "../data/types";
import { asset, cx, useDismissable } from "../lib/hooks";

/* --------------------------------------------------------------- icons */
/* One stroke voice, drawn here rather than pulled from three libraries. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function IconSearch({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...S}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.4 10.4 14 14" />
    </svg>
  );
}
export function IconArrow({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...S}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
export function IconCheck({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...S} strokeWidth={2.4}>
      <path d="M3 8.4l3.4 3.4L13 5" />
    </svg>
  );
}
export function IconMenu({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...S}>
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  );
}
export function IconClose({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...S}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}
export function IconFile({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...S}>
      <path d="M4 2h5l3 3v9H4z" />
      <path d="M9 2v3h3" />
    </svg>
  );
}

/* ---------------------------------------------------------------- bits */

export function Chip({
  tone = "plain",
  children,
  dot,
}: {
  tone?: "plain" | "ok" | "no" | "warn" | "accent";
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <span className={cx("chip", tone !== "plain" && `chip--${tone}`)}>
      {dot && <span className="chip__dot" />}
      {children}
    </span>
  );
}

export function Crosslinks({ links, label = "See also" }: { links?: XLink[]; label?: string }) {
  if (!links?.length) return null;
  return (
    <div className="xlinks">
      <span className="label">{label}</span>
      {links.map((l) => (
        <Link key={l.to + l.label} className="xlink" to={l.to}>
          {l.tag && <b>{l.tag}</b>}
          {l.label}
          <IconArrow size={11} />
        </Link>
      ))}
    </div>
  );
}

export function Disclose({
  summary,
  meta,
  children,
  defaultOpen = false,
}: {
  summary: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="disclose">
      <button className="disclose__btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span>{summary}</span>
        <span className="disclose__mark">{meta ?? (open ? "hide" : "show")}</span>
      </button>
      <div id={id} hidden={!open} className="disclose__body">
        {children}
      </div>
    </div>
  );
}

export function Code({ label, note, children, light }: { label: string; note?: string; children: string; light?: boolean }) {
  return (
    <div className={cx("code", light && "code--light")}>
      <div className="code__label">
        <span>{label}</span>
        {note && <span>{note}</span>}
      </div>
      <pre>{children}</pre>
    </div>
  );
}

/* ------------------------------------------------------------ lightbox */

export function Lightbox({
  open,
  src,
  name,
  caption,
  onClose,
}: {
  open: boolean;
  src: string;
  name: string;
  caption?: string;
  onClose: () => void;
}) {
  useDismissable(open, onClose);
  useEffect(() => {
    if (!open) return;
    const el = document.getElementById("lightbox-close");
    el?.focus();
  }, [open, src]);
  return (
    <div
      className={cx("overlay", "overlay--lightbox", open && "is-open")}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={name}>
          <div className="lightbox__bar">
            <span>{name}</span>
            {caption && <span style={{ opacity: 0.72 }}>{caption}</span>}
            <button id="lightbox-close" className="btn btn--sm" style={{ marginLeft: "auto" }} onClick={onClose}>
              <IconClose /> Close
            </button>
          </div>
          <img src={src} alt={name} />
        </div>
      )}
    </div>
  );
}

/** A file that is not an image — offered as a link, never faked as a preview. */
export function FileLink({ file, src, what }: { file: string; src?: string; what: string }) {
  const body = (
    <>
      <span className="thumb__name">{file}</span>
      <span className="small dim">{what}</span>
    </>
  );
  if (!src) {
    return (
      <div className="panel" style={{ padding: "var(--space-sm) var(--space-md)" }}>
        {body}
      </div>
    );
  }
  return (
    <a
      className="panel"
      href={asset(src)}
      target="_blank"
      rel="noreferrer"
      style={{ display: "block", padding: "var(--space-sm) var(--space-md)", textDecoration: "none" }}
    >
      {body}
      <span className="xlink" style={{ marginTop: "var(--space-xs)" }}>
        <IconFile /> Open file
      </span>
    </a>
  );
}
