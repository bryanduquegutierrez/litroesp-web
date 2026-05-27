"use client";

import { useEffect } from "react";

/**
 * Página intermediaria para el flujo de reset-password.
 *
 * Supabase redirige aquí con los tokens en el fragment (#access_token=...&refresh_token=...).
 * Como los fragments se pierden al abrir deep links directos, esta página:
 * 1. Lee los tokens del fragment (accesible via JS en el browser)
 * 2. Redirige a la app con los tokens como query params (que SÍ se preservan)
 */
export default function AuthRedirect() {
  useEffect(() => {
    const fragment = window.location.hash.substring(1); // quita el #
    if (!fragment) {
      // Sin tokens — redirigir a la app igualmente
      window.location.href = "com.litroesp.app://reset-password";
      return;
    }

    // Convertir fragment a query params
    const params = new URLSearchParams(fragment);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      // Redirigir a la app con tokens como query params (se preservan en deep links)
      window.location.href = `com.litroesp.app://reset-password?access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`;
    } else {
      window.location.href = "com.litroesp.app://reset-password";
    }
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
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 600 }}>Redirigiendo a Litro...</p>
        <p style={{ fontSize: 14, opacity: 0.6, marginTop: 8 }}>
          Si la app no se abre,{" "}
          <a href="com.litroesp.app://reset-password" style={{ color: "#7dd3fc", textDecoration: "underline" }}>
            toca aquí
          </a>
        </p>
      </div>
    </div>
  );
}
