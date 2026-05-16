"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { StoreButtons } from "./StoreButtons";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-32 w-[480px] h-[480px] rounded-full bg-brand-300/30 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-brand-500/15 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-4"
        >
          {t("kicker")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          {t("title")}
          <br />
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            {t("titleAccent")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-[color:var(--muted)] max-w-2xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <StoreButtons centered />
        </motion.div>

        {/* Mockup placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-16 mx-auto max-w-md"
        >
          <div className="relative rounded-[2.5rem] aspect-[9/19] bg-gradient-to-br from-brand-100 to-brand-300 p-3 shadow-2xl shadow-brand-900/20">
            <div className="relative rounded-[2rem] w-full h-full overflow-hidden bg-white">
              <Image
                src="/assets/hero.png"
                alt="Litro app"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.a
          href="#features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 inline-flex flex-col items-center gap-1 text-xs text-[color:var(--muted)] hover:text-[color:var(--fg)] transition-colors"
        >
          <span>{t("scroll")}</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
