"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";

// Códigos ISO 3166-1 alpha-2 para servir las banderas SVG desde flagcdn.com.
// Usamos SVG en lugar de emoji porque Windows (y algunos navegadores en otras
// plataformas) no incluye fuentes con glifos de banderas regionales y se ven
// como rectángulos con letras "ES", "GB"… Esto es un fix universal.
const LOCALES = [
  { code: "es", label: "ES", country: "es" },
  { code: "en", label: "EN", country: "gb" },
  { code: "pt", label: "PT", country: "pt" },
  { code: "fr", label: "FR", country: "fr" },
  { code: "it", label: "IT", country: "it" },
  { code: "de", label: "DE", country: "de" },
] as const;

function Flag({ country, className = "" }: { country: string; className?: string }) {
  // flagcdn.com sirve banderas SVG nítidas en cualquier tamaño.
  return (
    <img
      src={`https://flagcdn.com/${country}.svg`}
      alt=""
      aria-hidden
      className={`inline-block rounded-sm object-cover ${className}`}
      width={18}
      height={14}
      loading="lazy"
    />
  );
}

export function LocaleSwitcher({ scrolled = true }: { scrolled?: boolean } = {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const change = (next: string) => {
    setOpen(false);
    const segments = pathname.split("/");
    const codes = LOCALES.map((l) => l.code) as string[];
    if (codes.includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    startTransition(() => router.replace(segments.join("/") || "/"));
  };

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
          scrolled
            ? "text-[color:var(--fg)] border-black/10 hover:bg-black/5"
            : "text-white border-white/30 hover:bg-white/10"
        }`}
        aria-label="Cambiar idioma"
      >
        <Flag country={current.country} className="w-[18px] h-[14px]" />
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 min-w-[150px] rounded-xl border border-black/10 bg-white shadow-lg shadow-black/10 overflow-hidden z-50">
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => change(l.code)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm hover:bg-black/5 transition-colors ${
                  l.code === locale ? "bg-brand-50 text-brand-700 font-semibold" : ""
                }`}
              >
                <Flag country={l.country} className="w-5 h-[15px]" />
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
