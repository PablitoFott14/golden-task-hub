import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CommandPalette from "./CommandPalette";
import { IconArrow, IconMenu, IconSearch } from "./ui";
import { cx } from "../lib/hooks";

const NAV = [
  { to: "/", label: "Start here", end: true },
  { to: "/golden-tasks", label: "Golden tasks" },
  { to: "/spec", label: "Spec doc" },
  { to: "/checklist", label: "Pre-submit" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [cmdk, setCmdk] = useState(false);
  const [sheet, setSheet] = useState(false);
  const { pathname, hash } = useLocation();

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
    setSheet(false);
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        window.requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <>
      <header className="nav">
        <div className="shell nav__inner">
          <Link className="nav__brand" to="/">
            Golden Task Hub <span>Red Shell</span>
          </Link>

          <nav className="nav__rail" aria-label="Sections">
            {NAV.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cx("nav__link", (isActive || (l.to === "/golden-tasks" && pathname.startsWith("/golden-tasks"))) && "is-active")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__spacer" />

          <button className="searchpill" onClick={() => setCmdk(true)} aria-label="Search the hub">
            <IconSearch />
            <span className="searchpill__text">Search everything</span>
            <kbd>⌘K</kbd>
          </button>

          <button className="nav__menu" onClick={() => setSheet((s) => !s)} aria-expanded={sheet} aria-label="Menu">
            <IconMenu />
          </button>
        </div>

        {sheet && (
          <div className="navsheet">
            <div className="shell">
              {NAV.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                  <IconArrow />
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="foot-line">
        <div className="shell foot-line__row">
          <span>Golden Task Hub · OpenClaw MM Rubrics MULTI TURN · Red Shell</span>
          <span className="nav__spacer" />
          <Link to="/golden-tasks">Golden tasks</Link>
          <Link to="/spec">Spec doc</Link>
          <Link to="/checklist">Pre-submit</Link>
          <span>Source of truth: [External] OpenClaw MM Rubrics MULTI TURN – Guidelines</span>
        </div>
      </footer>

      <CommandPalette open={cmdk} onClose={() => setCmdk(false)} />
    </>
  );
}
