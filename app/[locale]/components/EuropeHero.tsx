import { getTranslations } from "next-intl/server";
import fs from "node:fs/promises";
import path from "node:path";

// Países UE integrados en la app (ISO 3166-1 alpha-2 en minúsculas).
// Se aplican via CSS para pintarlos con el color del tema.
const SUPPORTED_COUNTRIES = [
  "es", "fr", "it", "pt", "at", "gr", "de",
  "si", "be", "nl", "lu", "se", "dk", "sk", "cz",
] as const;

// Recortamos el viewBox del world-map para mostrar Europa.
// El SVG original tiene viewBox="30.767 241.591 784.077 458.627" (mundo entero).
const EUROPE_VIEWBOX = "350 245 180 165";

export async function EuropeHero() {
  const t = await getTranslations("europeHero");

  // Leer el SVG en build time (server component)
  const svgPath = path.join(process.cwd(), "public", "assets", "world-map.svg");
  const raw = await fs.readFile(svgPath, "utf8");
  // Quitamos el envoltorio <?xml ... ?> y <!DOCTYPE ...> y <svg ...> apertura/cierre para reinjectar con nuestros props
  const inner = raw
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!DOCTYPE[^>]*>/g, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title>[^<]*<\/title>/g, "")
    .replace(/<desc>[\s\S]*?<\/desc>/g, "");

  // Lista de selectores CSS para los países con fill del color del tema
  const supportedSelectors = SUPPORTED_COUNTRIES.map((c) => `#${c}`).join(", ");

  return (
    <section
      id="europe-hero"
      className="relative py-20 sm:py-28 px-6 overflow-hidden bg-gradient-to-b from-brand-50/40 via-white to-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-brand-300/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-3">
            {t("kicker")}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mx-auto">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-[color:var(--muted)] max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Mapa */}
        <div className="relative mx-auto w-full max-w-5xl">
          <style>{`
            .europe-map path,
            .europe-map g > path,
            .europe-map g .mainland {
              fill: #e5e7eb;
              stroke: #ffffff;
              stroke-width: 0.4;
              transition: fill 0.3s ease;
            }
            .europe-map ${supportedSelectors},
            .europe-map ${SUPPORTED_COUNTRIES.map((c) => `#${c} .mainland`).join(", ")},
            .europe-map ${SUPPORTED_COUNTRIES.map((c) => `#${c} > path`).join(", ")} {
              fill: #0a7ea4;
            }
          `}</style>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={EUROPE_VIEWBOX}
            className="europe-map w-full h-auto"
            aria-label="Mapa de Europa con países cubiertos por Litro"
            dangerouslySetInnerHTML={{ __html: inner }}
          />
        </div>

        {/* Leyenda */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[color:var(--muted)]">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-brand-500 inline-block" />
            <span>{t("legendCovered", { n: SUPPORTED_COUNTRIES.length })}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-gray-200 border border-gray-300 inline-block" />
            <span>{t("legendOther")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
