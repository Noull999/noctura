"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitTextReveal } from "@/components/effects/SplitTextReveal";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { CoordsTag } from "@/components/ui/CoordsTag";
import { IronEyeScene } from "@/components/three/IronEyeScene";

const MANIFIESTO = `Construimos liturgias digitales. Cada pixel es un sacramento, cada animación un encantamiento. El detalle es nuestra teología y el silencio entre transiciones, oración.`;

export function Manifiesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-surface flex items-center justify-start px-6 md:px-16 py-32"
    >
      {/* Iron Eye Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-screen opacity-100 pointer-events-none">
        <IronEyeScene />
      </div>

      {/* Layered SVG depth */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 800 800" className="w-full h-full">
          <g stroke="#3a3a3a" fill="none" strokeWidth="0.5">
            <circle cx="400" cy="400" r="350" />
            <circle cx="400" cy="400" r="280" />
            <circle cx="400" cy="400" r="210" />
            <path d="M400 50 L400 750 M50 400 L750 400" />
          </g>
        </svg>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none opacity-15">
        <svg viewBox="0 0 800 800" className="w-full h-full">
          <g stroke="#c0202b" fill="none" strokeWidth="0.7">
            <path d="M100 400 Q400 100 700 400 Q400 700 100 400 Z" />
            <path d="M200 400 Q400 200 600 400 Q400 600 200 400 Z" />
          </g>
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-xl flex flex-col gap-12">
        <BracketLabel className="text-bone">MANIFIESTO / 001</BracketLabel>
        <SplitTextReveal
          text={MANIFIESTO}
          className="font-display text-3xl md:text-5xl leading-tight text-ink"
        />
        <div className="flex items-center justify-between border-t border-ash/40 pt-4">
          <CoordsTag />
          <BracketLabel className="text-bone">MMXXVI</BracketLabel>
        </div>
      </div>
    </section>
  );
}
