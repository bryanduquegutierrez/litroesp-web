"use client";

import { useTranslations } from "next-intl";

export function Banner() {
  const t = useTranslations("banner");
  return (
    <div className="relative w-full bg-brand-gradient text-white text-center py-10 px-6 pt-24 sm:pt-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
          {t("title")}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-medium">
          {t("tagline")}
        </p>
      </div>
    </div>
  );
}
