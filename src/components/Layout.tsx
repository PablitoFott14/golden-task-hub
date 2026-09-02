import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { cx } from "../lib/util";
import { useTheme } from "../lib/useTheme";
import CommandPalette from "./CommandPalette";

const links = [
  { to: "/", label: "The Method", end: true },
  { to: "/golden-tasks", label: "Golden Tasks" },
  { to: "/checklist", label: "Pre-Submit" },
  { to: "/spec", label: "QC Spec" },
  { to: "/faq", label: "FAQ" },
];

function Mark() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-950 shadow-soft transition group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" width="18" height="18" aria-hidden>
        <path
          d="M12 3.2l2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 16.5l-5.2 2.7 1-5.75-4.2-4.1 5.8-.85z"
          className="fill-gold-400"
        />
      </svg>
    </span>
  );
}

function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-500 transition hover:border-ink-300 hover:text-ink-900"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

/**
 * Scroll to `#hash` after navigation. HashRouter keeps the route in the hash,
 * so this reads the trailing fragment that react-router exposes as `hash`.
 *
 * Two things make this fiddly. Web fonts and images settle after mount, which
 * moves the target: a smooth scroll animates to a pixel position captured when
 * it started, so it lands short. And a deep link from another route can be a
 * fifteen-thousand pixel ride, which is not worth animating. So: instant when
 * the route changed, smooth for an anchor inside the page, and re-correct once
 * the fonts are ready and once more after the images have had a moment.
 *
 * `behavior: "instant"` rather than `"auto"`, because `html` carries
 * `scroll-behavior: smooth` and `"auto"` defers to it.
 */
function useHashScroll() {
  const { pathname, hash } = useLocation();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const sameRoute = previous.current === pathname;
    previous.current = pathname;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const timers: number[] = [];
    let cancelled = false;

    const align = (behavior: ScrollBehavior) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior, block: "start" });
      return el;
    };

    // Anything more than a few pixels out is a layout shift, not a rounding.
    const correct = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (!el) return;
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const drift = el.getBoundingClientRect().top - margin;
      if (Math.abs(drift) > 8) el.scrollIntoView({ behavior: "instant", block: "start" });
    };

    let tries = 0;
    const tick = () => {
      if (cancelled) return;
      if (align(sameRoute ? "smooth" : "instant")) {
        document.fonts?.ready.then(correct).catch(() => {});
        timers.push(window.setTimeout(correct, sameRoute ? 700 : 250));
        timers.push(window.setTimeout(correct, 900));
      } else if (tries++ < 20) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [pathname, hash]);
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  useHashScroll();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navClass = (active: boolean) =>
    cx(
      "relative rounded-lg px-3 py-2 text-[13.5px] font-semibold transition duration-200",
      active
        ? "bg-brand-600 text-white shadow-glow"
        : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
    );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-ink-50/85 backdrop-blur-md">
        <div className="wrap flex h-16 items-center gap-4">
          <Link to="/" className="group flex items-center gap-2.5">
            <Mark />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[15px] font-bold tracking-tight text-ink-900">
                Golden Task Hub
              </span>
              <span className="mono-label block text-[9.5px] text-ink-400">Red Shell</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  navClass(isActive || (l.to === "/golden-tasks" && pathname.startsWith("/golden-tasks")))
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <button
              onClick={() => setSearch(true)}
              className="group hidden items-center gap-2 rounded-lg border border-ink-200 bg-surface py-1.5 pl-2.5 pr-2 text-ink-400 transition hover:border-ink-300 sm:flex"
              aria-label="Search the hub"
            >
              <Search size={14} />
              <span className="text-[13px] text-ink-400 group-hover:text-ink-600">Search</span>
              <kbd className="rounded border border-ink-200 bg-ink-100 px-1.5 py-0.5 font-mono text-[10px] text-ink-500">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
              className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-600 lg:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-ink-200/70 bg-surface lg:hidden"
            >
              <div className="wrap grid gap-1 py-3">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      cx(
                        navClass(
                          isActive || (l.to === "/golden-tasks" && pathname.startsWith("/golden-tasks"))
                        ),
                        "block"
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 border-t border-ink-200/70 bg-surface">
        <div className="wrap flex flex-col gap-4 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[13px] text-ink-500">
            <span className="font-semibold text-ink-800">Golden Task Hub</span>, the practical
            reference for Red Shell contributors.
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-ink-500 transition hover:text-brand-600">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="wrap pb-8 text-[12px] text-ink-400">
          [External] OpenClaw MM Rubrics MULTI TURN Guidelines v2 stays the source of truth. This
          hub is a practical companion to it, never a replacement.
        </div>
      </footer>

      <CommandPalette open={search} onClose={() => setSearch(false)} />
    </div>
  );
}
