"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { CoordsTag } from "@/components/ui/CoordsTag";
import { IronEyeScene } from "@/components/three/IronEyeScene";

// Versículos del manifiesto, divididos para enumerarlos
const VERSES = [
  {
    n: "I",
    text: "Construimos liturgias digitales.",
  },
  {
    n: "II",
    text: "Cada pixel es un sacramento, cada animación un encantamiento.",
  },
  {
    n: "III",
    text: "El detalle es nuestra teología y el silencio entre transiciones, oración.",
  },
];

// La primera letra de la primera frase, separada para tratarse como capital iluminada
const FIRST_LETTER = "C";

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
      id="manifiesto"
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

      <div className="relative z-10 max-w-2xl flex flex-col gap-12">
        <BracketLabel className="text-bone">MANIFIESTO / 001</BracketLabel>

        {/* Versículos con capital iluminada */}
        <div className="flex flex-col gap-8">
          {VERSES.map((verse, i) => (
            <motion.div
              key={verse.n}
              className="flex gap-4 md:gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              {/* Número de versículo */}
              <span className="font-calig text-2xl md:text-3xl leading-none text-blood pt-1 shrink-0 w-8 text-right">
                {verse.n}
              </span>

              {/* Texto del versículo (con capital iluminada solo en el primero) */}
              {i === 0 ? (
                <p className="font-display text-2xl md:text-4xl leading-tight text-ink">
                  {/* Capital iluminada */}
                  <span className="relative inline-block float-left mr-3 md:mr-4">
                    <span
                      className="font-calig leading-none text-blood"
                      style={{
                        fontSize: "5.5rem",
                        textShadow: "0 0 24px rgba(192,32,43,0.4), 0 0 8px rgba(192,32,43,0.3)",
                        lineHeight: "0.85",
                      }}
                    >
                      {FIRST_LETTER}
                    </span>
                    {/* Decoración: pequeña cruz junto a la capital */}
                    <span className="absolute -top-1 -right-2 font-calig text-xs text-ash opacity-60">✠</span>
                  </span>
                  {verse.text.slice(1)}
                </p>
              ) : (
                <p className="font-display text-2xl md:text-4xl leading-tight text-ink">
                  {verse.text}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ash/40 pt-4 mt-4">
          <CoordsTag />
          <BracketLabel className="text-bone">MMXXVI</BracketLabel>
        </div>
      </div>
    </section>
  );
}
