"use client";

import { useEffect, useRef, useState } from "react";
import { AsciiRain } from "./AsciiRain";

// IDs de secciones que disparan ASCII rain al ENTRAR al viewport.
const TRIGGER_IDS = ["manifiesto", "origen", "cuerpo", "vestigios", "codice"];

const DURATION = 1700; // cuánto dura visible — más presencia ahora que las secciones son más largas
const COOLDOWN = 2200; // tiempo mínimo entre triggers

export function AsciiRainController() {
  const [active, setActive] = useState(false);
  const lastTriggerRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const trigger = () => {
      const now = Date.now();
      if (now - lastTriggerRef.current < COOLDOWN) return;
      lastTriggerRef.current = now;
      setActive(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setActive(false), DURATION);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) trigger();
        }
      },
      {
        // Dispara cuando la sección entra a la franja vertical central
        // (zona detectable: 15% del top al 50% del bottom)
        rootMargin: "-15% 0px -50% 0px",
        threshold: 0,
      }
    );

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
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return <AsciiRain active={active} />;
}
