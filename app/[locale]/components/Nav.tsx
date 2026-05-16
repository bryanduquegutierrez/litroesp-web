"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-semibold tracking-tight text-lg">Litro</span>
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)] transition-colors hidden sm:block"
          >
            {t("features")}
          </a>
          <a
            href="#download"
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)] transition-colors hidden sm:block"
          >
            {t("download")}
          </a>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
