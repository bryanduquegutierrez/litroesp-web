"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { StoreButtons } from "./StoreButtons";

export function CTA() {
  const t = useTranslations("cta");
  return (
    <section
      id="download"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-brand-gradient opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-3xl mx-auto text-center text-white"
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          {t("title")}
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex justify-center">
          <StoreButtons centered />
        </div>
      </motion.div>
    </section>
  );
}
