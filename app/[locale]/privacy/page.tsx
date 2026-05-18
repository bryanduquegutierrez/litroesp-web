import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

type Section = {
  id: string;
  title: string;
  body?: string;
  /** Lista de párrafos / bullets opcionales */
  items?: string[];
  /** Sub-items con texto + enlace (para servicios de terceros) */
  links?: { label: string; href: string }[];
};

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  const sections: Section[] = [
    {
      id: "data-collected",
      title: t("s1.title"),
      items: t.raw("s1.items") as string[],
    },
    {
      id: "data-usage",
      title: t("s2.title"),
      items: t.raw("s2.items") as string[],
    },
    {
      id: "third-parties",
      title: t("s3.title"),
      body: t("s3.intro"),
      links: [
        { label: "Supabase", href: "https://supabase.com/privacy" },
        { label: "Google Maps Platform", href: "https://policies.google.com/privacy" },
        { label: "Stripe", href: "https://stripe.com/privacy" },
        { label: "Apple Sign In", href: "https://www.apple.com/legal/privacy/" },
        { label: "Google Sign In", href: "https://policies.google.com/privacy" },
      ],
    },
    {
      id: "storage",
      title: t("s4.title"),
      body: t("s4.body"),
    },
    {
      id: "retention",
      title: t("s5.title"),
      body: t("s5.body"),
    },
    {
      id: "rights",
      title: t("s6.title"),
      body: t("s6.intro"),
      items: t.raw("s6.items") as string[],
    },
    {
      id: "minors",
      title: t("s7.title"),
      body: t("s7.body"),
    },
    {
      id: "changes",
      title: t("s8.title"),
      body: t("s8.body"),
    },
  ];

  return (
    <main className="min-h-screen">
      <Nav />

      {/* Cabecera con color del tema */}
      <header className="relative w-full bg-brand-gradient text-white text-center py-16 px-6 pt-32 sm:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-5">
            <ShieldCheck className="w-4 h-4" />
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
        {/* Volver al inicio */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backHome")}
        </Link>

        {/* Índice */}
        <div className="rounded-2xl border border-black/5 bg-brand-50/40 px-6 py-5 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] mb-3">
            {t("toc")}
          </h2>
          <ol className="space-y-1.5 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-brand-700 hover:text-brand-900 hover:underline transition-colors"
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Secciones numeradas */}
        <div className="space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-brand-500 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  {s.title}
                </h2>
              </div>

              {s.body && (
                <p className="text-base text-[color:var(--fg)]/90 leading-relaxed mb-4">
                  {s.body}
                </p>
              )}

              {s.items && (
                <ul className="space-y-3">
                  {s.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-base text-[color:var(--fg)]/90 leading-relaxed"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {s.links && (
                <ul className="space-y-2 mt-4">
                  {s.links.map((l) => (
                    <li key={l.href} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base text-brand-600 hover:text-brand-700 hover:underline font-medium transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Contacto al final */}
        <div className="mt-16 rounded-2xl bg-brand-50 border border-brand-200 px-6 py-5 text-center">
          <p className="text-sm text-brand-800">
            {t("contactPrompt")}{" "}
            <a
              href="mailto:litroesp@gmail.com"
              className="font-semibold underline hover:text-brand-900"
            >
              litroesp@gmail.com
            </a>
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
