import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Trash2, Smartphone, Mail, Check, Database } from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

const SUPPORT_EMAIL = "litroesp@gmail.com";

export default async function DeleteAccountPage() {
  const t = await getTranslations("deleteAccount");

  const steps = t.raw("inApp.steps") as string[];
  const deletedItems = t.raw("deleted.items") as string[];
  const keptItems = t.raw("kept.items") as string[];

  return (
    <main className="min-h-screen">
      <Nav />

      {/* Cabecera */}
      <header className="relative w-full bg-brand-gradient text-white text-center py-16 px-6 pt-32 sm:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-5">
            <Trash2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">{t("kicker")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            {t("title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <p className="mt-3 text-sm text-white/70">
            {t("lastUpdatedLabel")}: {t("lastUpdatedDate")}
          </p>
        </div>
      </header>

      {/* Contenido */}
      <article className="relative max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backHome")}
        </Link>

        {/* 1. Borrar desde la app — pasos destacados */}
        <section id="in-app" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-brand-600" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {t("inApp.title")}
            </h2>
          </div>
          <p className="text-base text-[color:var(--fg)]/90 leading-relaxed mb-6">
            {t("inApp.intro")}
          </p>

          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50/50 px-5 py-4"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-500 text-white font-extrabold flex items-center justify-center text-base">
                  {i + 1}
                </span>
                <span className="text-base text-[color:var(--fg)] font-medium leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-sm text-[color:var(--muted)] leading-relaxed">
            {t("inApp.note")}
          </p>
        </section>

        {/* 2. Pedir por email */}
        <section id="by-email" className="scroll-mt-24 mt-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-brand-600" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {t("byEmail.title")}
            </h2>
          </div>
          <p className="text-base text-[color:var(--fg)]/90 leading-relaxed mb-4">
            {t("byEmail.body")}
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(t("byEmail.subject"))}`}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {SUPPORT_EMAIL}
          </a>
        </section>

        {/* 3. Datos que se eliminan */}
        <section id="deleted" className="scroll-mt-24 mt-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {t("deleted.title")}
            </h2>
          </div>
          <p className="text-base text-[color:var(--fg)]/90 leading-relaxed mb-4">
            {t("deleted.intro")}
          </p>
          <ul className="space-y-3">
            {deletedItems.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-base text-[color:var(--fg)]/90 leading-relaxed">
                <Check className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Datos que se conservan + retención */}
        <section id="kept" className="scroll-mt-24 mt-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
              <Database className="w-5 h-5 text-amber-600" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {t("kept.title")}
            </h2>
          </div>
          <p className="text-base text-[color:var(--fg)]/90 leading-relaxed mb-4">
            {t("kept.intro")}
          </p>
          <ul className="space-y-3">
            {keptItems.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-base text-[color:var(--fg)]/90 leading-relaxed">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contacto */}
        <div className="mt-16 rounded-2xl bg-brand-50 border border-brand-200 px-6 py-5 text-center">
          <p className="text-sm text-brand-800">
            {t("contactPrompt")}{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold underline hover:text-brand-900"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
