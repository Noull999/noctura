"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Silencio — sección de respiro entre Manifiesto y Origen.
 * Pantalla negra, una sola cruz paté que respira con el scroll.
 * El propósito es que cuando aparezca la siguiente sección, golpee.
 */
export function Silencio() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // La cruz aparece, alcanza pico, y vuelve a desaparecer
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 1],
    [0, 0.22, 0.22, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.06]);
  const breath = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={ref}
      id="silencio"
      aria-hidden="true"
      className="relative w-full h-screen bg-void overflow-hidden flex items-center justify-center"
    >
      {/* Halo radial casi imperceptible */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity,
          background:
            "radial-gradient(circle at center, rgba(192,32,43,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Cruz paté gigante */}
      <motion.span
        className="font-calig text-[40vw] md:text-[28vw] leading-none select-none pointer-events-none"
        style={{ opacity, scale, rotate: breath, color: "#5c0a10" }}
      >
        ✠
      </motion.span>

      {/* Susurro mínimo abajo */}
      <motion.span
        style={{ opacity }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.5em] text-ash/40 uppercase"
      >
        respira
      </motion.span>

    </section>
  );
}
