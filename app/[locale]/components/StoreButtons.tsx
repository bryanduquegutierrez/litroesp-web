"use client";

import { useTranslations } from "next-intl";
import { Apple } from "lucide-react";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const APP_STORE_URL =
  "https://apps.apple.com/es/app/litro/id6761688926?l=en-GB";

// TODO: reemplazar cuando se publique en Google Play
const PLAY_STORE_URL = "";

type DeviceType = "ios" | "android" | "desktop";

function detectDevice(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent || navigator.vendor || "";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
}

export function StoreButtons({ centered = false }: { centered?: boolean }) {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const appleButton = (
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
  );

  const androidButton = PLAY_STORE_URL ? (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#3ddc84]/10 text-[color:var(--fg)] hover:scale-[1.02] transition-transform shadow-lg shadow-black/5 border border-[#3ddc84]/20"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3ddc84">
        <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333zm3.199-2.302 2.92-1.69a1 1 0 0 1 0 1.733l-3.018 1.747-2.232-2.231zm-3.199-3.001L5.464 1.07l10.939 6.334z" />
      </svg>
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] opacity-70 uppercase tracking-wider">
          Google Play
        </span>
        <span className="text-sm font-semibold">{t("downloadGoogle")}</span>
      </div>
    </a>
  ) : (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/5 text-[color:var(--fg)] cursor-default border border-black/5">
      <svg viewBox="0 0 24 24" className="w-6 h-6 opacity-60" fill="currentColor">
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
  );

  // ── Móvil iOS → solo botón App Store
  if (device === "ios") {
    return (
      <div className={`flex flex-col gap-3 ${centered ? "items-center justify-center" : "items-start"}`}>
        {appleButton}
      </div>
    );
  }

  // ── Móvil Android → solo botón Google Play
  if (device === "android") {
    return (
      <div className={`flex flex-col gap-3 ${centered ? "items-center justify-center" : "items-start"}`}>
        {androidButton}
      </div>
    );
  }

  // ── Desktop → QR code + ambos botones pequeños debajo
  return (
    <div className={`flex flex-col gap-6 ${centered ? "items-center justify-center" : "items-start"}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white rounded-2xl shadow-lg shadow-black/10">
          <QRCodeSVG
            value={APP_STORE_URL}
            size={160}
            level="M"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
        <p className="text-sm opacity-70 font-medium">
          {tCta("scanQR")}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {appleButton}
        {androidButton}
      </div>
    </div>
  );
}
