"use client";
import { useState, useEffect } from "react";
import { BarChart3, Menu, X } from "lucide-react";

const links = [
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Scatter", href: "#scatter" },
  { label: "Sectors", href: "#sectors" },
  { label: "Winners & Losers", href: "#winners-losers" },
  { label: "Methodology", href: "#methodology" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <a href="#" className="flex items-center gap-2 active:scale-[0.97]">
          <BarChart3
            className={`w-5 h-5 ${scrolled ? "text-blue-600" : "text-cyan-300"}`}
            aria-hidden="true"
          />
          <span
            className={`font-semibold text-sm tracking-tight ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            IPO Scorecard
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs font-medium tracking-wide uppercase active:scale-[0.97] ${
                scrolled
                  ? "text-slate-500 hover:text-slate-900"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 active:scale-[0.97]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className={`w-5 h-5 ${scrolled ? "text-slate-900" : "text-white"}`} />
          ) : (
            <Menu className={`w-5 h-5 ${scrolled ? "text-slate-900" : "text-white"}`} />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-slate-700 hover:text-slate-900 active:scale-[0.97]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
