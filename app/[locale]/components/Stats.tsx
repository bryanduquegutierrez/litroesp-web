"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Building2, Clock, Globe2, Users } from "lucide-react";

type Card = {
  key: "stations" | "updates" | "countries" | "drivers";
  Icon: typeof Globe2;
};

const CARDS: Card[] = [
  { key: "stations", Icon: Building2 },
  { key: "updates", Icon: Clock },
  { key: "countries", Icon: Globe2 },
  { key: "drivers", Icon: Users },
];

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section
      id="stats"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -right-32 w-[460px] h-[460px] rounded-full bg-brand-300/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[460px] h-[460px] rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-3">
            {t("kicker")}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-[color:var(--muted)] max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid de cifras */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow px-5 py-6 sm:px-6 sm:py-7"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                <card.Icon className="w-5 h-5 text-brand-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-700 leading-none">
                {t(`${card.key}.value`)}
              </div>
              <div className="mt-2 text-sm font-semibold text-[color:var(--fg)]">
                {t(`${card.key}.label`)}
              </div>
              <div className="mt-1 text-xs text-[color:var(--muted)] leading-relaxed">
                {t(`${card.key}.hint`)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Caja explicativa: por qué 4 actualizaciones al día */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-12 rounded-3xl bg-gradient-to-br from-brand-50 to-white border border-brand-200/60 px-6 py-7 sm:px-10 sm:py-9"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md shadow-brand-500/20">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[color:var(--fg)] mb-2">
                {t("whyTitle")}
              </h3>
              <p className="text-sm sm:text-base text-[color:var(--muted)] leading-relaxed">
                {t("whyBody")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
