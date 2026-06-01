"use client";

import { useEffect, useState } from "react";

/**
 * Página intermediaria para el flujo de reset-password.
 *
 * Supabase (flowType implicit) redirige aquí con los tokens. Según el cliente de
 * correo y la plataforma, pueden llegar:
 *   • en el fragment:  …/auth-redirect#access_token=…&refresh_token=…&type=recovery
 *   • o en la query:   …/auth-redirect?access_token=…&refresh_token=…  (algunos
 *     clientes mueven/recortan el fragment, o llega un ?token_hash=…&type=recovery)
 *
 * Los fragments se pierden al abrir deep links, así que pasamos TODO a la app como
 * query params del esquema `com.litroesp.app://reset-password?…`, que sí se
 * preservan. Además, iOS/Safari bloquean el redirect automático a un esquema
 * personalizado sin gesto del usuario, por eso mostramos un botón bien visible
 * que lleva el MISMO deep link (con tokens) — antes el enlace de respaldo iba sin
 * tokens y la app abría sin sesión de recuperación.
 */
const APP_SCHEME = "com.litroesp.app://reset-password";

// Claves que la app necesita para reconstruir la sesión de recuperación.
const KEYS = [
  "access_token",
  "refresh_token",
  "token_hash",
  "type",
  "code",
  "error",
  "error_description",
];

function construirDeepLink(): string {
  if (typeof window === "undefined") return APP_SCHEME;
  // Combinar fragment (#) y query (?): el fragment tiene prioridad si hay duplicados.
  const query = new URLSearchParams(window.location.search);
  const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const out = new URLSearchParams();
  for (const k of KEYS) {
    const v = fragment.get(k) ?? query.get(k);
    if (v) out.set(k, v);
  }
  const qs = out.toString();
  return qs ? `${APP_SCHEME}?${qs}` : APP_SCHEME;
}

export default function AuthRedirect() {
  const [deepLink, setDeepLink] = useState(APP_SCHEME);

  useEffect(() => {
    const link = construirDeepLink();
    setDeepLink(link);
    // Intento automático (puede bloquearse en iOS sin gesto: por eso el botón).
    window.location.replace(link);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#064e6e",
        color: "white",
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <p style={{ fontSize: 20, fontWeight: 700 }}>Cambiar tu contraseña</p>
        <p style={{ fontSize: 14, opacity: 0.7, marginTop: 8, marginBottom: 24 }}>
          Pulsa el botón para abrir Litro y elegir una contraseña nueva.
        </p>
        <a
          href={deepLink}
          style={{
            display: "inline-block",
            backgroundColor: "#fff",
            color: "#064e6e",
            fontSize: 16,
            fontWeight: 800,
            padding: "14px 28px",
            borderRadius: 14,
            textDecoration: "none",
          }}
        >
          Abrir Litro
        </a>
      </div>
    </div>
  );
}
