"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAPTERS = [
  { id: "manifiesto", label: "001", title: "MANIFIESTO" },
  { id: "origen", label: "002", title: "ORIGEN" },
  { id: "cuerpo", label: "003", title: "CUERPO" },
  { id: "vestigios", label: "004", title: "VESTIGIOS" },
];

export function ChapterNav() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Mostrar solo después del Hero (1 viewport)
      setVisible(window.scrollY > window.innerHeight * 0.8);

      // Detectar sección activa
      for (const ch of [...CHAPTERS].reverse()) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActive(ch.id);
            return;
          }
        }
      }
      setActive(null);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const w = window as unknown as { __lenis?: { scrollTo: (el: HTMLElement, o?: { offset?: number }) => void } };
    if (w.__lenis) {
      w.__lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-4 items-end"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.4 }}
          aria-label="Navegación de capítulos"
        >
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className="group flex items-center gap-2"
            >
              {/* Label que aparece en hover */}
              <span className="font-mono text-[9px] tracking-[0.3em] text-bone opacity-0 group-hover:opacity-100 transition-all duration-200 uppercase">
                {ch.title}
              </span>

              {/* Línea / punto indicador */}
              <span
                className={`block h-px transition-all duration-300 ${
                  active === ch.id
                    ? "w-8 bg-blood"
                    : "w-3 bg-ash group-hover:w-5 group-hover:bg-bone"
                }`}
              />

              {/* Número */}
              <span
                className={`font-mono text-[9px] tracking-[0.3em] transition-colors duration-200 ${
                  active === ch.id ? "text-blood" : "text-ash group-hover:text-bone"
                }`}
              >
                {ch.label}
              </span>
            </button>
          ))}

          {/* Cruz decorativa al final */}
          <span className="font-calig text-sm text-blood opacity-40 mt-2">✠</span>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
