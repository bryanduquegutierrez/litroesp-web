import { getTranslations } from "next-intl/server";
import fs from "node:fs/promises";
import path from "node:path";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Feature, Geometry } from "geojson";

// Países UE integrados en la app (ISO 3166-1 alpha-2 minúsculas)
const SUPPORTED_COUNTRIES = new Set([
  "es", "fr", "it", "pt", "at", "gr", "de",
  "si", "be", "nl", "lu", "se", "dk", "sk", "cz",
  "ro", "bg", "ee", "lv", "lt", "hu", "pl", "fi",
]);

// El TopoJSON de leakyMirror solo tiene NAME (sin ISO).
// Mapeo NAME → ISO2 minúsculas para los 51 países europeos.
const NAME_TO_ISO: Record<string, string> = {
  "Albania": "al",
  "Andorra": "ad",
  "Armenia": "am",
  "Austria": "at",
  "Azerbaijan": "az",
  "Belarus": "by",
  "Belgium": "be",
  "Bosnia and Herzegovina": "ba",
  "Bulgaria": "bg",
  "Croatia": "hr",
  "Cyprus": "cy",
  "Czech Republic": "cz",
  "Denmark": "dk",
  "Estonia": "ee",
  "Faroe Islands": "fo",
  "Finland": "fi",
  "France": "fr",
  "Georgia": "ge",
  "Germany": "de",
  "Greece": "gr",
  "Holy See (Vatican City)": "va",
  "Hungary": "hu",
  "Iceland": "is",
  "Ireland": "ie",
  "Israel": "il",
  "Italy": "it",
  "Latvia": "lv",
  "Liechtenstein": "li",
  "Lithuania": "lt",
  "Luxembourg": "lu",
  "Malta": "mt",
  "Monaco": "mc",
  "Montenegro": "me",
  "Netherlands": "nl",
  "Norway": "no",
  "Poland": "pl",
  "Portugal": "pt",
  "Republic of Moldova": "md",
  "Romania": "ro",
  "Russia": "ru",
  "San Marino": "sm",
  "Serbia": "rs",
  "Slovakia": "sk",
  "Slovenia": "si",
  "Spain": "es",
  "Sweden": "se",
  "Switzerland": "ch",
  "The former Yugoslav Republic of Macedonia": "mk",
  "Turkey": "tr",
  "Ukraine": "ua",
  "United Kingdom": "gb",
};

const SUPPORTED_COLOR = "#0a7ea4"; // brand-500
const REST_COLOR = "#e5e7eb";       // gray-200
const STROKE_COLOR = "#ffffff";

// Dimensiones del SVG generado. Aspect ratio panorámico para que se extienda horizontal.
const SVG_WIDTH = 1400;
const SVG_HEIGHT = 700;

type EuropeFeature = Feature<Geometry, { NAME: string }>;

export async function EuropeHero() {
  const t = await getTranslations("europeHero");

  // Leer TopoJSON
  const topoPath = path.join(process.cwd(), "public", "assets", "europe.topo.json");
  const topoRaw = await fs.readFile(topoPath, "utf8");
  const topo = JSON.parse(topoRaw);
  const fc = feature(topo, topo.objects.europe) as unknown as FeatureCollection<Geometry, { NAME: string }>;

  // Filtramos Rusia entera por estética: solo se extiende muy a la derecha
  // y desbalancea el resto del mapa. La dejamos pero la proyección la encajará.
  // Si quisieras quitarla, descomenta la siguiente línea:
  // fc.features = fc.features.filter((f) => f.properties.NAME !== "Russia");

  // Proyección Mercator centrada en Europa, ajustada al ancho/alto del SVG
  const projection = geoMercator().fitExtent(
    [
      [10, 10],
      [SVG_WIDTH - 10, SVG_HEIGHT - 10],
    ],
    {
      type: "FeatureCollection",
      // Para el fit usamos solo el cuerpo central de Europa, ignorando Rusia/Turquía/Israel/Faroe
      // que distorsionan la escala. Así Europa central queda grande.
      features: fc.features.filter(
        (f) => !["Russia", "Turkey", "Israel", "Faroe Islands", "Cyprus"].includes(f.properties.NAME)
      ),
    } as FeatureCollection
  );
  const pathGen = geoPath(projection);

  // Generamos un <path> por cada feature
  const renderedPaths = (fc.features as EuropeFeature[])
    .map((f) => {
      const d = pathGen(f);
      if (!d) return null;
      const iso = NAME_TO_ISO[f.properties.NAME];
      const isSupported = iso && SUPPORTED_COUNTRIES.has(iso);
      return {
        id: iso ?? f.properties.NAME.toLowerCase().replace(/[^a-z]/g, ""),
        d,
        fill: isSupported ? SUPPORTED_COLOR : REST_COLOR,
        name: f.properties.NAME,
      };
    })
    .filter((p): p is { id: string; d: string; fill: string; name: string } => p !== null);

  return (
    <section
      id="europe-hero"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-brand-50/40 via-white to-white"
    >
      {/* Decoración */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-brand-300/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      {/* Cabecera de texto */}
      <div className="relative max-w-3xl mx-auto px-6 text-center mb-10 sm:mb-14">
        <p className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-3">
          {t("kicker")}
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          {t("title")}
        </h2>
        <p className="mt-5 text-lg text-[color:var(--muted)] leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Mapa a todo el ancho de la página */}
      <div className="relative w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Mapa de Europa con países cubiertos por Litro"
        >
          {renderedPaths.map((p) => (
            <path
              key={p.id}
              id={p.id}
              d={p.d}
              fill={p.fill}
              stroke={STROKE_COLOR}
              strokeWidth={0.6}
            >
              <title>{p.name}</title>
            </path>
          ))}
        </svg>
      </div>

      {/* Leyenda */}
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[color:var(--muted)] px-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm inline-block" style={{ backgroundColor: SUPPORTED_COLOR }} />
          <span>{t("legendCovered", { n: SUPPORTED_COUNTRIES.size })}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm border border-gray-300 inline-block" style={{ backgroundColor: REST_COLOR }} />
          <span>{t("legendOther")}</span>
        </div>
      </div>
    </section>
  );
}
