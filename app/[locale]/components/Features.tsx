"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Bell,
  Car,
  Fuel,
  Map as MapIcon,
  Route,
  Star,
  TrendingUp,
} from "lucide-react";
import { Feature } from "./Feature";

export function Features() {
  const t = useTranslations("features");

  const features = [
    { key: "parking",   icon: Car,        reverse: false, accent: "cool" as const, src: "/assets/feat-parking.png" },
    { key: "prices",    icon: Fuel,       reverse: true,  accent: "tint" as const, src: "/assets/feat-prices.png" },
    { key: "alerts",    icon: Bell,       reverse: false, accent: "warm" as const, src: "/assets/feat-alerts.png" },
    { key: "map",       icon: MapIcon,    reverse: true,  accent: "tint" as const, src: "/assets/feat-map.png" },
    { key: "routes",    icon: Route,      reverse: false, accent: "cool" as const, src: "/assets/feat-routes.png" },
    { key: "favorites", icon: Star,       reverse: true,  accent: "gold" as const, src: "/assets/feat-favorites.png" },
    { key: "savings",   icon: TrendingUp, reverse: false, accent: "tint" as const, src: "/assets/feat-savings.png" },
  ];

  return (
    <div id="features" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center pt-32 pb-12 px-6"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          {t("sectionTitle")}
        </h2>
        <p className="mt-4 text-lg text-[color:var(--muted)] max-w-2xl mx-auto">
          {t("sectionSubtitle")}
        </p>
      </motion.div>

      {features.map((f) => (
        <Feature
          key={f.key}
          kicker={t(`${f.key}.kicker`)}
          title={t(`${f.key}.title`)}
          body={t(`${f.key}.body`)}
          highlights={t.raw(`${f.key}.highlights`) as string[]}
          icon={f.icon}
          reverse={f.reverse}
          accent={f.accent}
          imageSrc={f.src}
          imageAlt={t(`${f.key}.title`)}
        />
      ))}
    </div>
  );
}
