"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#barbeiros", label: "Equipe" },
  { href: "#galeria", label: "Galeria" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "var(--surface-1)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
      }}
    >
      <div className="container-page flex items-center justify-between h-20">
        <a
          href="#top"
          className="font-display font-bold uppercase tracking-[0.15em] text-white text-lg"
        >
          Navalha Preta
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase tracking-[0.1em] text-white/85 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#agendar" className="hidden md:inline-block btn-primary !py-3 !px-6 text-[11px]">
          Agendar
        </a>

        <button
          aria-label="Abrir menu"
          className="md:hidden text-white text-2xl leading-none"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden" style={{ background: "var(--surface-1)" }}>
          <div className="container-page flex flex-col py-4 gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-[0.1em] text-white/85"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="#agendar" className="btn-primary text-center text-[11px]" onClick={() => setOpen(false)}>
              Agendar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
