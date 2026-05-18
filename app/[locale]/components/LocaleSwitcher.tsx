"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";

const LOCALES = [
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pt", label: "PT", flag: "🇵🇹" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "de", label: "DE", flag: "🇩🇪" },
] as const;

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
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 min-w-[140px] rounded-xl border border-black/10 bg-white shadow-lg shadow-black/10 overflow-hidden z-50">
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => change(l.code)}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-black/5 transition-colors ${
                  l.code === locale ? "bg-brand-50 text-brand-700 font-semibold" : ""
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
