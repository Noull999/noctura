"use client";

import { useEffect, useState } from "react";

/**
 * Aplica un modo visual más oscuro/cálido entre las 23h y 4h locales.
 * - Vignette más fuerte
 * - Tinte crimson sutil
 * - Reduce un poco la luminosidad
 */
export function ShadowHourMode() {
  const [isShadowHour, setIsShadowHour] = useState(false);

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setIsShadowHour(h >= 23 || h < 4);
    };
    check();
    // Revisar cada minuto
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!isShadowHour) return null;

  return (
    <>
      {/* Tinte crimson + vignette intensificado */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9991]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.85) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9992]"
        style={{
          background: "rgba(192, 32, 43, 0.06)",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
