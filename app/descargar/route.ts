import { NextResponse } from "next/server";

// Redirección inteligente para el QR: detecta el SO por user-agent y manda a la
// store correcta. Pensado para escanearse con el móvil desde la web (escritorio).
const APP_STORE = "https://apps.apple.com/es/app/litro/id6761688926";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.litroesp.app";
const SITE = "https://litroesp.com";

// Depende del user-agent → no cachear.
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const ua = request.headers.get("user-agent") || "";
  if (/android/i.test(ua)) return NextResponse.redirect(PLAY_STORE, 302);
  if (/iphone|ipad|ipod/i.test(ua)) return NextResponse.redirect(APP_STORE, 302);
  // Escritorio u otros: a la home (donde están ambos botones).
  return NextResponse.redirect(SITE, 302);
}
