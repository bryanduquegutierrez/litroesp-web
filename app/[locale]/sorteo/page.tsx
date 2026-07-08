import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Ticket } from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

// ════════════════════════════════════════════════════════════════════════
// Bases legales del sorteo "Litro Discover" (julio 2026)
// ════════════════════════════════════════════════════════════════════════
// El sorteo está limitado a España, por lo que las bases se publican
// únicamente en español (versión vinculante) con independencia del idioma
// de navegación. Página estática, sin claves i18n.
// ════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Bases del sorteo Litro Discover | Litro",
  description:
    "Bases legales del sorteo Litro Discover: canjea el código en la app, completa una racha de 7 días reportando gasolineras y participa.",
};

type Section = { id: string; title: string; body?: string; items?: string[] };

const LAST_UPDATED = "8 de julio de 2026";

const sections: Section[] = [
  {
    id: "organizador",
    title: "Organizador",
    body:
      "La promoción \"Sorteo Litro Discover\" (en adelante, el \"Sorteo\") está organizada por el titular de la aplicación Litro (en adelante, el \"Organizador\"), con domicilio en España. Contacto: litroesp@gmail.com.",
  },
  {
    id: "ambito",
    title: "Ámbito y duración",
    items: [
      "El Sorteo se dirige exclusivamente a personas físicas residentes en España.",
      "Periodo de participación: desde el 10 de julio de 2026 a las 00:00 hasta el 17 de julio de 2026 a las 23:59 (hora peninsular española, Europe/Madrid).",
      "Todas las acciones necesarias para participar (canje del código y racha completa de reportes) deben realizarse dentro de dicho periodo.",
    ],
  },
  {
    id: "requisitos",
    title: "Requisitos para participar",
    items: [
      "Ser mayor de 18 años.",
      "Residir en España.",
      "Disponer de la aplicación Litro instalada y de una cuenta registrada (correo electrónico, Google o Apple). Las cuentas de invitado no pueden participar.",
      "La participación es gratuita y no implica compra ni pago alguno.",
    ],
  },
  {
    id: "mecanica",
    title: "Mecánica de participación",
    items: [
      "1. Introduce el código LITRO_DISCOVER en la sección \"Código promocional\" de los Ajustes de la app. El canje inscribe la cuenta en el Sorteo.",
      "2. Completa una racha de 7 días consecutivos reportando cada día los servicios de al menos una gasolinera distinta (no reportada anteriormente por el mismo usuario) desde la app.",
      "3. Los reportes requieren presencia física: la app verifica que el usuario se encuentra a menos de 500 metros de la gasolinera reportada.",
      "El cómputo de días se realiza en la zona horaria Europe/Madrid. Si un día no se reporta, la racha se rompe; podrá reiniciarse siempre que queden días suficientes dentro del periodo del Sorteo.",
      "Solo se admite una participación por persona y cuenta. Completar la racha otorga una (1) participación en el Sorteo.",
    ],
  },
  {
    id: "premio",
    title: "Premio",
    items: [
      "Un (1) premio consistente en un depósito de combustible valorado en un máximo de 80 €.",
      "El premio se entregará mediante tarjeta regalo de carburante o transferencia bancaria, a elección del Organizador de acuerdo con el ganador.",
      "El premio es personal e intransferible y no podrá canjearse por otro distinto. El Organizador cumplirá las obligaciones fiscales que resulten de aplicación.",
    ],
  },
  {
    id: "sorteo",
    title: "Elección del ganador y comunicación",
    items: [
      "El ganador se elegirá de forma aleatoria entre todas las cuentas que hayan completado la racha dentro del periodo, mediante un proceso automatizado y auditable ejecutado en los servidores del Organizador.",
      "El sorteo se celebrará dentro de los 7 días siguientes al cierre del periodo de participación.",
      "El ganador será contactado mediante notificación en la app y/o al correo electrónico asociado a su cuenta, y dispondrá de 72 horas para responder y aceptar el premio.",
      "Si el ganador no responde en plazo, renuncia al premio o incumple estas bases, el premio pasará al siguiente participante elegido aleatoriamente (suplente).",
      "El Organizador podrá anunciar al ganador en la app y en sus canales (nombre de pila e inicial del apellido, o alias), previo consentimiento del interesado.",
    ],
  },
  {
    id: "fraude",
    title: "Descalificación y juego limpio",
    items: [
      "Quedarán descalificadas las participaciones que utilicen datos falsos o manifiestamente incorrectos en los reportes, múltiples cuentas de una misma persona, o cualquier mecanismo automatizado o fraudulento.",
      "El Organizador se reserva el derecho de verificar los reportes (incluida la coherencia de los datos aportados y la ubicación) y de excluir del Sorteo a cualquier participante que incumpla estas bases.",
    ],
  },
  {
    id: "datos",
    title: "Protección de datos (RGPD)",
    items: [
      "Responsable del tratamiento: el Organizador (contacto: litroesp@gmail.com).",
      "Finalidad: gestionar la participación en el Sorteo, verificar el cumplimiento de estas bases, contactar con el ganador y entregar el premio.",
      "Base jurídica: la ejecución de la promoción aceptada al canjear el código.",
      "Los datos no se cederán a terceros salvo obligación legal. Puedes ejercer tus derechos de acceso, rectificación, supresión y demás previstos en el RGPD escribiendo a litroesp@gmail.com. Más información en nuestra Política de Privacidad.",
    ],
  },
  {
    id: "aceptacion",
    title: "Aceptación y otras condiciones",
    items: [
      "La participación en el Sorteo implica la aceptación íntegra de estas bases.",
      "El Organizador se reserva el derecho a modificar estas bases, suspender o cancelar el Sorteo por causas justificadas, comunicándolo en esta misma página.",
      "Apple Inc. y Google LLC no patrocinan, avalan ni administran esta promoción, ni están asociadas a ella en modo alguno.",
      "Para cualquier consulta sobre el Sorteo: litroesp@gmail.com.",
    ],
  },
];

export default function SorteoPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Cabecera con color del tema */}
      <header className="relative w-full bg-brand-gradient text-white text-center py-16 px-6 pt-32 sm:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-5">
            <Ticket className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Sorteo</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Bases del sorteo Litro Discover
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Canjea el código <strong>LITRO_DISCOVER</strong> en la app, reporta una gasolinera
            distinta cada día durante 7 días seguidos y participa en el sorteo de un depósito
            de combustible.
          </p>
          <p className="mt-3 text-sm text-white/70">Última actualización: {LAST_UPDATED}</p>
        </div>
      </header>

      {/* Contenido */}
      <article className="relative max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Aviso de idioma */}
        <p className="text-sm text-[color:var(--muted)] italic mb-10">
          El sorteo está limitado a España; estas bases se publican únicamente en español y
          constituyen la versión vinculante.
        </p>

        {/* Índice */}
        <div className="rounded-2xl border border-black/5 bg-brand-50/40 px-6 py-5 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] mb-3">
            Índice
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
                <ul className="space-y-2.5">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-base leading-relaxed">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" />
                      <span className="text-[color:var(--fg)]/90">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
