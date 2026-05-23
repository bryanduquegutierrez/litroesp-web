"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heart, Landmark, ExternalLink } from "lucide-react";

const IBAN = "ES52 1583 0001 1090 5091 9959";
const IBAN_RAW = "ES5215830001109050919959";
const GOFUNDME_URL = "https://gofund.me/dc570f96";

export function AboutUs() {
  const t = useTranslations("about");

  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(IBAN_RAW);
    } catch {
      // fallback silencioso
    }
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Decoracion */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -left-32 w-[420px] h-[420px] rounded-full bg-amber-300/15 blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] rounded-full bg-red-400/10 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-3">
            {t("kicker")}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
        </motion.div>

        {/* Texto descriptivo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-5 text-center"
        >
          <p className="text-base sm:text-lg text-[color:var(--muted)] leading-relaxed">
            {t("p1")}
          </p>
          <p className="text-base sm:text-lg text-[color:var(--muted)] leading-relaxed">
            {t("p2")}
          </p>
        </motion.div>

        {/* Caja de donacion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 px-6 py-8 sm:px-10 sm:py-10"
        >
          {/* Titulo con icono */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-md shadow-red-500/20">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-900">
              {t("donateTitle")}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-amber-800/80 leading-relaxed text-center mb-8">
            {t("donateBody")}
          </p>

          {/* Opciones de donacion */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Transferencia bancaria */}
            <div className="rounded-2xl bg-white border border-black/5 shadow-sm px-5 py-5">
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
                  {t("bankTransfer")}
                </span>
              </div>
              <p className="font-mono text-sm font-bold text-[color:var(--fg)] break-all leading-relaxed">
                {IBAN}
              </p>
              <button
                onClick={handleCopyIban}
                className="mt-3 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors cursor-pointer"
              >
                Copiar IBAN
              </button>
            </div>

            {/* GoFundMe */}
            <div className="rounded-2xl bg-white border border-black/5 shadow-sm px-5 py-5 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
                  {t("gofundme")}
                </span>
              </div>
              <div className="flex-1" />
              <a
                href={GOFUNDME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-red-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                {t("gofundmeButton")}
              </a>
            </div>
          </div>

          {/* Pie gracioso */}
          <p className="text-center text-sm text-amber-700/60 mt-6 italic">
            {t("footer")} &#9749; + &#9981; = &#10084;&#65039;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
