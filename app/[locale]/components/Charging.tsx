"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Activity,
  Gauge,
  Globe2,
  Megaphone,
  Plug,
  Star,
  Zap,
} from "lucide-react";

/* Mockup de móvil con la captura, proporcional al ratio nativo (1242×2688). */
function PhoneShot({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative rounded-[2.5rem] bg-gradient-to-br from-emerald-100 to-teal-200 p-2.5 shadow-2xl shadow-emerald-900/10 w-full max-w-[230px] sm:max-w-[250px]"
        style={{ aspectRatio: "1242 / 2688" }}
      >
        <div className="relative rounded-[2rem] w-full h-full overflow-hidden bg-white">
          <Image
            src={src}
            alt={caption}
            fill
            sizes="(max-width: 1024px) 230px, 250px"
            className="object-contain"
          />
        </div>
      </div>
      <span className="text-sm font-semibold text-[color:var(--fg)]">{caption}</span>
    </div>
  );
}

export function Charging() {
  const t = useTranslations("charging");

  const stats = [
    { key: "points", Icon: Zap },
    { key: "countries", Icon: Globe2 },
    { key: "realtime", Icon: Activity },
  ] as const;

  const caps = [
    { key: "power", Icon: Gauge },
    { key: "report", Icon: Megaphone },
    { key: "status", Icon: Activity },
    { key: "connectors", Icon: Plug },
  ] as const;

  const gallery = [
    { key: "tab", src: "/assets/feat-charging.png" },
    { key: "power", src: "/assets/feat-charging-power.png" },
    { key: "report", src: "/assets/feat-charging-report.png" },
  ] as const;

  return (
    <section id="charging" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Decoración verde EV */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -left-40 w-[480px] h-[480px] rounded-full bg-emerald-300/15 blur-[130px]" />
        <div className="absolute bottom-0 -right-40 w-[480px] h-[480px] rounded-full bg-teal-400/10 blur-[130px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              {t("kicker")}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-[color:var(--muted)] max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cifras */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-14">
          {stats.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative rounded-2xl bg-white border border-black/5 shadow-sm px-4 py-5 sm:px-6 sm:py-7 text-center sm:text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <s.Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-emerald-700 leading-none">
                {t(`stats.${s.key}.value`)}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-[color:var(--fg)]">
                {t(`stats.${s.key}.label`)}
              </div>
              <div className="mt-1 hidden sm:block text-xs text-[color:var(--muted)] leading-relaxed">
                {t(`stats.${s.key}.hint`)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Galería de capturas (huecos para imágenes) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 justify-items-center"
        >
          {gallery.map((g) => (
            <PhoneShot key={g.key} src={g.src} caption={t(`gallery.${g.key}`)} />
          ))}
        </motion.div>

        {/* Capacidades */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {caps.map((c, idx) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="relative rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <c.Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[color:var(--fg)] mb-1.5">
                    {t(`caps.${c.key}.title`)}
                  </h3>
                  <p className="text-sm text-[color:var(--muted)] leading-relaxed">
                    {t(`caps.${c.key}.body`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banda destacada: disponibilidad colaborativa en tiempo real */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 px-7 py-9 sm:px-12 sm:py-12 shadow-xl shadow-emerald-900/15"
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 mb-5">
                <Megaphone className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  {t("highlight.kicker")}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.1] mb-4">
                {t("highlight.title")}
              </h3>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-6 max-w-xl">
                {t("highlight.body")}
              </p>
              <ul className="space-y-3">
                {(t.raw("highlight.points") as string[]).map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-base text-white">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Imagen del modal de reporte */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="relative rounded-[2rem] bg-white/95 p-2 shadow-2xl shadow-emerald-900/25 w-full max-w-[220px]"
                style={{ aspectRatio: "1242 / 2688" }}
              >
                <div className="relative rounded-[1.6rem] w-full h-full overflow-hidden bg-white">
                  <Image
                    src="/assets/feat-charging-report.png"
                    alt={t("highlight.imageCaption")}
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-white/90 text-center">
                {t("highlight.imageCaption")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
