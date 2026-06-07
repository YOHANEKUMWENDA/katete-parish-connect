import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CrossIcon } from "./Cross";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/mass", label: "Mass & Liturgy" },
  { to: "/ministries", label: "Ministries" },
  { to: "/news", label: "News & Events" },
  { to: "/outreach", label: "Outreach" },
  { to: "/gallery", label: "Gallery" },
  { to: "/give", label: "Give" },
  { to: "/prayer", label: "Prayer" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--cream)]/95 backdrop-blur shadow-[var(--shadow-soft)]"
          : "bg-[var(--cream)]/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--navy)] text-[var(--gold)] group-hover:rotate-6 transition-transform">
            <CrossIcon className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-[var(--navy-deep)]">Katete Catholic</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)]">Church Mission</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-[var(--navy-deep)]/80 hover:text-[var(--navy)] transition-colors relative"
              activeProps={{ className: "text-[var(--navy)]" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/give"
          className="hidden xl:inline-flex items-center rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-semibold text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors"
        >
          Give
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="xl:hidden flex h-10 w-10 items-center justify-center rounded-md text-[var(--navy)]"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-[var(--border)] bg-[var(--cream)] animate-fade-in">
          <nav className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-[var(--navy-deep)] border-b border-[var(--border)] last:border-b-0"
                activeProps={{ className: "text-[var(--gold)]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
