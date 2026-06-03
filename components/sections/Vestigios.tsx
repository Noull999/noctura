"use client";

import { motion } from "framer-motion";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Marquee } from "@/components/effects/Marquee";

const TILES = [
  {
    caption: "ANATOMÍA DEL SILENCIO",
    h: "tall",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #3a0a0a 50%, #0d0d0d 100%)"
  },
  {
    caption: "CATEDRAL DERRITIDA",
    h: "wide",
    gradient: "linear-gradient(45deg, #0a1a1a 0%, #2a1a2a 50%, #1a0a0a 100%)"
  },
  {
    caption: "HALO DE ESPINAS",
    h: "tall",
    gradient: "linear-gradient(180deg, #2a1a1a 0%, #1a0a3a 50%, #0a0a1a 100%)"
  },
  {
    caption: "MANUSCRITO 04",
    h: "wide",
    gradient: "linear-gradient(225deg, #1a1a1a 0%, #3a1a0a 50%, #0d0d0d 100%)"
  },
  {
    caption: "ESCAPULARIO ROTO",
    h: "tall",
    gradient: "linear-gradient(90deg, #0d0d0d 0%, #2a0a0a 50%, #1a1a2a 100%)"
  },
  {
    caption: "RITO DE PASO",
    h: "wide",
    gradient: "linear-gradient(315deg, #1a0a1a 0%, #2a1a0a 50%, #0a1a1a 100%)"
  },
];

function Tile({
  caption,
  variant,
  index,
  gradient,
}: {
  caption: string;
  variant: "tall" | "wide";
  index: number;
  gradient?: string;
}) {
  return (
    <motion.div
      className={
        "group relative overflow-hidden border border-ash/30 " +
        (variant === "tall" ? "row-span-2" : "")
      }
      whileHover={{
        rotateX: -4,
        rotateY: 6,
        scale: 1.02,
        transition: { duration: 0.4 },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: gradient || "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)" }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply opacity-60"
        style={{
          background: `radial-gradient(circle at ${20 + index * 12}% ${
            30 + index * 10
          }%, transparent 0%, #000 70%)`,
        }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at center, #c0202b 0%, transparent 70%)"
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-20 mix-blend-overlay" aria-hidden>
        <defs>
          <pattern id={`p${index}`} width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.7" fill="#ededed" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p${index})`} />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
        <BracketLabel className="text-ink">{caption}</BracketLabel>
        <span className="font-mono text-[10px] text-bone tracking-[0.3em]">
          0{index + 1}
        </span>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <BracketLabel className="text-blood">VESTIGIO</BracketLabel>
      </div>
    </motion.div>
  );
}

export function Vestigios() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-void py-32">
      <div className="px-6 md:px-12 flex items-end justify-between mb-12">
        <div className="flex flex-col gap-3">
          <BracketLabel className="text-bone">CAPÍTULO</BracketLabel>
          <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tight">
            VESTIGIOS
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <ChapterIndex n="003" className="text-[8vw] md:text-[4vw]" />
          <BracketLabel highlight>VESTIGIOS</BracketLabel>
        </div>
      </div>

      <div className="px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 grid-rows-[180px_180px_180px] md:grid-rows-[220px_220px_220px] gap-4 mb-16">
        {TILES.map((t, i) => (
          <Tile key={i} caption={t.caption} variant={t.h as "tall" | "wide"} index={i} gradient={t.gradient} />
        ))}
      </div>

      <Marquee
        items={[
          { label: "HUESO QUEMADO" },
          { label: "CICATRIZ" },
          { label: "LO QUE QUEDA" },
          { index: "003", label: "VESTIGIOS", highlight: true },
          { label: "RESIDUO SAGRADO" },
          { label: "MARCA SIN NOMBRE" },
          { label: "ESPECTRO" },
          { label: "RUINA VIVA" },
        ]}
      />
    </section>
  );
}
