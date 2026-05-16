"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-semibold tracking-tight text-lg">Litro</span>
          <span className="text-sm text-[color:var(--muted)] mt-1">
            {t("tagline")}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-[color:var(--muted)]">
          <a
            href="mailto:litroesp@gmail.com"
            className="hover:text-[color:var(--fg)] transition-colors"
          >
            {t("contact")}
          </a>
          <span>·</span>
          <span>© {year} Litro</span>
        </div>
      </div>
    </footer>
  );
}
