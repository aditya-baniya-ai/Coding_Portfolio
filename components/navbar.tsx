"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
const links = [
  ["About", "about"],
  ["Work", "projects"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuToggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const theme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link
          href="/#top"
          className="wordmark"
          aria-label="Aaditya Baniya, home"
        >
          <span className="brand-mark">
            a<span>.</span>
          </span>
          <span>
            Aaditya Baniya<span className="wordmark-sub">SOFTWARE + AI</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, id]) => (
            <Link key={id} href={`/#${id}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={theme}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link className="nav-resume" href="/#resumes">
            Résumé <ArrowUpRight size={16} />
          </Link>
          <button
            ref={menuToggle}
            className="icon-button menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([label, id]) => (
            <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <Link href="/#resumes" onClick={() => setOpen(false)}>
            Résumés
            <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}
