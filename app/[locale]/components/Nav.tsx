"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  // `scrolled` = ya pasado el Banner con fondo del tema
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (drawerOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = original; };
    }
  }, [drawerOpen]);

  // Cierra el drawer cuando cambia el viewport a desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => { if (e.matches) setDrawerOpen(false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const linkClass = scrolled
    ? "text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--fg)] transition-colors"
    : "text-sm font-medium text-white/85 hover:text-white transition-colors";

  const logoClass = scrolled ? "text-[color:var(--fg)]" : "text-white";

  const burgerClass = scrolled
    ? "text-[color:var(--fg)] border-black/10 hover:bg-black/5"
    : "text-white border-white/30 hover:bg-white/10";

  const links = [
    { key: "features", href: "/#features", external: false },
    { key: "stats", href: "/#stats", external: false },
    { key: "about", href: "/#about", external: false },
    { key: "contact", href: "/#contact", external: false },
    { key: "download", href: "/#download", external: false },
    { key: "privacy", href: "/privacy", external: true },
  ] as const;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/85 border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between md:grid md:grid-cols-3">
          {/* Logo (izquierda) */}
          <div className="flex items-center justify-start">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <Image
                src="/assets/icon.png"
                alt="Litro"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className={`font-semibold tracking-tight text-lg transition-colors ${logoClass}`}>
                Litro
              </span>
            </Link>
          </div>

          {/* Enlaces (centro) — solo visibles en desktop */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {links.map(l => (
              l.external
                ? <Link key={l.key} href={l.href} className={linkClass}>{t(l.key)}</Link>
                : <a key={l.key} href={l.href} className={linkClass}>{t(l.key)}</a>
            ))}
          </div>

          {/* Idioma + hamburguesa (derecha) */}
          <div className="flex items-center justify-end gap-2">
            <LocaleSwitcher scrolled={scrolled} />
            {/* Botón hamburguesa visible solo en móvil */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={t("menu")}
              className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${burgerClass}`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer móvil */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />
          {/* Panel lateral */}
          <aside className="absolute right-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-2xl flex flex-col animate-[slideInRight_0.25s_ease-out]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icon.png"
                  alt="Litro"
                  width={28}
                  height={28}
                  className="rounded-md"
                />
                <span className="font-semibold tracking-tight text-lg text-[color:var(--fg)]">Litro</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar menú"
                className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5 text-[color:var(--fg)]" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-3">
                {links.map(l => (
                  <li key={l.key}>
                    {l.external ? (
                      <Link
                        href={l.href}
                        onClick={() => setDrawerOpen(false)}
                        className="block px-4 py-3 rounded-xl text-base font-medium text-[color:var(--fg)] hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        {t(l.key)}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        onClick={() => setDrawerOpen(false)}
                        className="block px-4 py-3 rounded-xl text-base font-medium text-[color:var(--fg)] hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        {t(l.key)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <style jsx>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
          `}</style>
        </div>
      )}
    </>
  );
}
