"use client";

import { useEffect, useState } from "react";
import { AsciiRain } from "./AsciiRain";

// IDs de secciones que disparan ASCII rain al ENTRAR al viewport.
// Mucho más preciso que basarse en porcentaje de scroll global.
const TRIGGER_IDS = ["origen", "cuerpo", "vestigios"];

export function AsciiRainController() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const triggered = new Set<string>();
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered.has(entry.target.id)) {
            triggered.add(entry.target.id);
            setActive(true);
            if (hideTimer) clearTimeout(hideTimer);
            hideTimer = setTimeout(() => setActive(false), 1100);
          }
        }
      },
      {
        // Dispara cuando el TOP de la sección entra a un 65% de la altura del viewport
        // (es decir, justo antes de que el usuario llegue a la sección)
        rootMargin: "-30% 0px -35% 0px",
        threshold: 0,
      }
    );

    // Esperar a que las secciones estén en el DOM
    const attach = () => {
      for (const id of TRIGGER_IDS) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    };

    // Intento inicial + reintento por si las secciones se montan tarde (dynamic imports)
    attach();
    const retry = setTimeout(attach, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(retry);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return <AsciiRain active={active} />;
}
