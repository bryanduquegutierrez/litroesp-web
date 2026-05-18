"use client";

import { motion } from "framer-motion";
import { Check, LucideIcon } from "lucide-react";
import Image from "next/image";

export type FeatureProps = {
  kicker: string;
  title: string;
  body: string;
  highlights: string[];
  reverse?: boolean;
  icon: LucideIcon;
  imageSrc: string;
  imageAlt: string;
  accent?: "tint" | "warm" | "cool" | "gold";
};

const ACCENT_BG: Record<NonNullable<FeatureProps["accent"]>, string> = {
  tint: "from-brand-100 to-brand-300",
  warm: "from-orange-100 to-rose-200",
  cool: "from-sky-100 to-indigo-200",
  gold: "from-amber-100 to-yellow-200",
};

export function Feature({
  kicker,
  title,
  body,
  highlights,
  reverse = false,
  icon: Icon,
  imageSrc,
  imageAlt,
  accent = "tint",
}: FeatureProps) {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
        >
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 mb-6">
              <Icon className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                {kicker}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              {title}
            </h2>
            <p className="text-lg text-[color:var(--muted)] leading-relaxed mb-8 max-w-xl">
              {body}
            </p>

            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check
                      className="w-3.5 h-3.5 text-brand-600"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-base">{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Imagen — phone mockup proporcional al ratio nativo (1242×2688) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center"
          >
            <div
              className={`relative rounded-[2.5rem] bg-gradient-to-br ${ACCENT_BG[accent]} p-2.5 shadow-2xl shadow-black/10 w-full max-w-[260px] sm:max-w-[280px]`}
              style={{ aspectRatio: "1242 / 2688" }}
            >
              <div className="relative rounded-[2rem] w-full h-full overflow-hidden bg-white">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 260px, 280px"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
