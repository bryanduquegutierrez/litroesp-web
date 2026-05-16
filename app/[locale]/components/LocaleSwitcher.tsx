"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "es" ? "en" : "es";
    // Reemplaza el prefijo del idioma en el path actual
    const segments = pathname.split("/");
    if (segments[1] === "es" || segments[1] === "en") {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    startTransition(() => router.replace(segments.join("/") || "/"));
  };

  return (
    <button
      onClick={toggle}
      className="text-sm font-medium px-3 py-1.5 rounded-full border border-black/10 hover:bg-black/5 transition-colors"
      aria-label="Cambiar idioma"
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
