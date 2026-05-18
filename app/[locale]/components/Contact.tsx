"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Building2, Car, Droplets, Mail, MapPin, Users, Wrench } from "lucide-react";

const ICONS = [Building2, Wrench, Car, Droplets, MapPin, Users];

export function Contact() {
  const t = useTranslations("contact");
  const categories = t.raw("categories") as string[];

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -right-32 w-[420px] h-[420px] rounded-full bg-brand-300/20 blur-[110px]" />
        <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-brand-500/10 blur-[110px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-3">
            {t("kicker")}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-[color:var(--muted)] max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <div className="rounded-2xl bg-brand-50 border border-brand-200 px-6 py-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-brand-700">
              {t("marketStat")}
            </p>
          </div>
          <div className="rounded-2xl bg-brand-50 border border-brand-200 px-6 py-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-brand-700">
              {t("audienceStat")}
            </p>
          </div>
        </motion.div>

        {/* Categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] mb-6">
            {t("categoriesTitle")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {categories.map((c, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={c}
                  className="flex items-center gap-3 rounded-xl bg-white border border-black/5 px-4 py-3 shadow-sm"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-600" />
                  </div>
                  <span className="text-sm font-medium">{c}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <p className="text-sm text-[color:var(--muted)]">{t("emailLabel")}</p>
          <a
            href="mailto:litroesp@gmail.com?subject=Anunciarse%20en%20Litro"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-brand-gradient text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-brand-900/20"
          >
            <Mail className="w-5 h-5" />
            <span>litroesp@gmail.com</span>
          </a>
          <a
            href="mailto:litroesp@gmail.com?subject=Anunciarse%20en%20Litro"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
          >
            {t("ctaButton")} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
