"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Nav() {
  const t = useTranslations("nav");
  // `scrolled` = el usuario ya ha pasado la cabecera (Banner) con fondo del tema.
  // Threshold ~180px cubre todo el alto del Banner.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Color del texto: blanco sobre el Banner (color del tema), oscuro sobre el resto
  const linkClass = scrolled
    ? "text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--fg)] transition-colors hidden sm:block"
    : "text-sm font-medium text-white/85 hover:text-white transition-colors hidden sm:block";

  const logoClass = scrolled ? "text-[color:var(--fg)]" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/85 border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-3 items-center">
        {/* Logo (izquierda) */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 group">
            <span className={`font-semibold tracking-tight text-lg transition-colors ${logoClass}`}>
              Litro
            </span>
          </Link>
        </div>

        {/* Enlaces (centro) */}
        <div className="flex items-center justify-center gap-6">
          <a href="#features" className={linkClass}>
            {t("features")}
          </a>
          <a href="#contact" className={linkClass}>
            {t("contact")}
          </a>
          <a href="#download" className={linkClass}>
            {t("download")}
          </a>
        </div>

        {/* Idioma (derecha) */}
        <div className="flex items-center justify-end">
          <LocaleSwitcher scrolled={scrolled} />
        </div>
      </nav>
    </header>
  );
}
