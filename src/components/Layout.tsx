import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CommandPalette from "./CommandPalette";
import {
  IconChecklist,
  IconHome,
  IconProcess,
  IconSearch,
  IconSpec,
  IconTasks,
} from "./ui";
import { cx } from "../lib/hooks";
import { tasks, taskById } from "../data";
import { clarifications } from "../data/spec";
import { totalChecks } from "../data/checklist";

const NAV = [
  { to: "/", label: "Overview", icon: <IconHome />, end: true },
  { to: "/golden-tasks", label: "Golden Tasks", icon: <IconTasks />, count: tasks.length },
  { to: "/spec", label: "Spec & Clarifications", icon: <IconSpec />, count: clarifications.length },
  { to: "/checklist", label: "Pre-Submit Checklist", icon: <IconChecklist />, count: totalChecks },
];

/** Human breadcrumb for the top bar, derived from the path. */
function useCrumbs(pathname: string): { label: string; to?: string }[] {
  if (pathname === "/") return [{ label: "Overview" }];
  if (pathname.startsWith("/golden-tasks/")) {
    const id = pathname.split("/")[2];
    const t = taskById(id);
    return [
      { label: "Golden Tasks", to: "/golden-tasks" },
      { label: t?.meta.title ?? id },
    ];
  }
  if (pathname.startsWith("/golden-tasks")) return [{ label: "Golden Tasks" }];
  if (pathname.startsWith("/spec")) return [{ label: "Spec & Clarifications" }];
  if (pathname.startsWith("/checklist")) return [{ label: "Pre-Submit Checklist" }];
  return [{ label: "Not found" }];
}

export default function Layout({ children }: { children: ReactNode }) {
  const [cmdk, setCmdk] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { pathname, hash } = useLocation();
  const crumbs = useCrumbs(pathname);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdk((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setDrawer(false);
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        window.requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  const isTasks = (to: string) => to === "/golden-tasks" && pathname.startsWith("/golden-tasks");

  const brand = (
    <Link className="sidebar__brand" to="/" onClick={() => setDrawer(false)}>
      <span className="sidebar__mark" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="square">
          <path d="M3 8.4 6.4 12 13 5" />
        </svg>
      </span>
      <span className="sidebar__brand-text">
        <b>Golden Task Hub</b>
        <span>Red Shell</span>
      </span>
    </Link>
  );

  return (
    <div className="app">
      <aside className={cx("sidebar", drawer && "is-open")} aria-label="Primary">
        {brand}

        <button className="sidebar__search" onClick={() => setCmdk(true)} aria-label="Search the hub">
          <IconSearch />
          <span>Search everything</span>
          <kbd>⌘K</kbd>
        </button>

        <nav className="sidebar__nav" aria-label="Sections">
          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => cx("navitem", (isActive || isTasks(l.to)) && "is-active")}
            >
              <span className="navitem__icon">{l.icon}</span>
              {l.label}
              {typeof l.count === "number" && <span className="navitem__count">{l.count}</span>}
            </NavLink>
          ))}

          <p className="sidebar__group label">Reference</p>
          <Link className="navitem" to="/#process">
            <span className="navitem__icon"><IconProcess /></span>
            The Process
          </Link>
        </nav>

        <div className="sidebar__foot">
          <p>Source of truth</p>
          <p><code>[External] OpenClaw MM Rubrics MULTI TURN — Guidelines</code></p>
        </div>
      </aside>

      {drawer && <div className="scrim is-open" onClick={() => setDrawer(false)} aria-hidden="true" />}

      <div className="main">
        <div className="mobilebar">
          <button className="iconbtn" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          </button>
          {brand}
          <button className="iconbtn" onClick={() => setCmdk(true)} aria-label="Search the hub">
            <IconSearch size={16} />
          </button>
        </div>

        <div className="topbar">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Hub</Link>
            {crumbs.map((c, i) => (
              <span key={c.label + i} style={{ display: "contents" }}>
                <span className="crumbs__sep" aria-hidden="true">/</span>
                {c.to && i < crumbs.length - 1 ? (
                  <Link to={c.to}>{c.label}</Link>
                ) : (
                  <span className="crumbs__here">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <span className="topbar__spacer" />
          <button className="btn btn--sm btn--ghost" onClick={() => setCmdk(true)}>
            <IconSearch size={14} /> Search <kbd>⌘K</kbd>
          </button>
        </div>

        <main>{children}</main>
      </div>

      <CommandPalette open={cmdk} onClose={() => setCmdk(false)} />
    </div>
  );
}
