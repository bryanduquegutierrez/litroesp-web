"use client";

import { useTranslations } from "next-intl";
import { Apple } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/es/app/litro/id6761688926?l=en-GB";

export function StoreButtons({ centered = false }: { centered?: boolean }) {
  const t = useTranslations("hero");
  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 ${centered ? "items-center justify-center" : "items-start"}`}
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-black text-white hover:scale-[1.02] transition-transform shadow-lg shadow-black/10"
      >
        <Apple className="w-6 h-6" strokeWidth={1.5} />
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] opacity-70 uppercase tracking-wider">
            App Store
          </span>
          <span className="text-sm font-semibold">{t("downloadApple")}</span>
        </div>
      </a>

      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/5 text-[color:var(--fg)] cursor-default border border-black/5">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 opacity-60"
          fill="currentColor"
        >
          <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333zm3.199-2.302 2.92-1.69a1 1 0 0 1 0 1.733l-3.018 1.747-2.232-2.231zm-3.199-3.001L5.464 1.07l10.939 6.334z" />
        </svg>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] opacity-70 uppercase tracking-wider">
            Google Play
          </span>
          <span className="text-sm font-semibold opacity-80">
            {t("downloadGoogle")}
          </span>
        </div>
      </div>
    </div>
  );
}
