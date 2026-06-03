"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import { IlluminatedCapital } from "@/components/ui/IlluminatedCapital";
import { Marquee } from "@/components/effects/Marquee";

// Lazy load — solo se carga cuando llega al Códice
const InfectedMaskScene = dynamic(
  () => import("@/components/three/InfectedMaskScene").then((m) => m.InfectedMaskScene),
  { ssr: false },
);

interface CodexEntry {
  title: string;
  description: string;
  href: string;
  category: string;
  /** Ruta a una imagen en /public si la tienes. Si no, se usa el gradiente. */
  image?: string;
  /** Color gradiente del tile cuando no hay imagen. */
  gradient: string;
  /** Glifo decorativo */
  glyph: string;
}

// Reliquias / proyectos — tus repos reales de GitHub
const ENTRIES: CodexEntry[] = [
  {
    title: "MAREA ALERTA",
    description: "Sistema de alertas marítimas en tiempo real.",
    href: "https://marea-alerta.vercel.app",
    category: "RELIQUIA · I",
    gradient: "linear-gradient(135deg, #0a1a2a 0%, #1a0a1a 50%, #0d0d0d 100%)",
    glyph: "≈",
  },
  {
    title: "PORTFOLIO V4",
    description: "Three.js, GSAP y geometría sagrada.",
    href: "https://portfolio-v4-rho-opal.vercel.app",
    category: "RELIQUIA · II",
    gradient: "linear-gradient(45deg, #1a1a1a 0%, #3a0a0a 50%, #0d0d0d 100%)",
    glyph: "✠",
  },
  {
    title: "WORKLY",
    description: "Página empresarial multifunciones.",
    href: "https://github.com/Noull999/Workly",
    category: "RELIQUIA · III",
    gradient: "linear-gradient(180deg, #2a1a1a 0%, #1a0a3a 50%, #0a0a1a 100%)",
    glyph: "◆",
  },
  {
    title: "DASHBOARD INDUSTRIAL",
    description: "Sensores en tiempo real para plantas pesqueras.",
    href: "https://github.com/Noull999/dashboard-industrial",
    category: "RELIQUIA · IV",
    gradient: "linear-gradient(225deg, #1a1a1a 0%, #3a1a0a 50%, #0d0d0d 100%)",
    glyph: "▣",
  },
  {
    title: "MUSIC DOWNLOADER",
    description: "SoundCloud con auto-sync y detección de duplicados.",
    href: "https://github.com/Noull999/music-downloader",
    category: "RELIQUIA · V",
    gradient: "linear-gradient(90deg, #0d0d0d 0%, #2a0a0a 50%, #1a1a2a 100%)",
    glyph: "♪",
  },
  {
    title: "MUUUSIK",
    description: "Bot de música para Discord.",
    href: "https://github.com/Noull999/MUUUSIK",
    category: "RELIQUIA · VI",
    gradient: "linear-gradient(315deg, #1a0a1a 0%, #2a1a0a 50%, #0a1a1a 100%)",
    glyph: "⌬",
  },
];

function CodexTile({ entry, index }: { entry: CodexEntry; index: number }) {
  return (
    <motion.a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden border border-ash/30 aspect-[4/5] bg-tomb"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      {/* Fondo: imagen si existe, si no gradiente */}
      {entry.image ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${entry.image})` }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: entry.gradient }} />
      )}

      {/* Overlay oscuro siempre, para legibilidad */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Halo crimson en hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(192, 32, 43, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Glifo grande decorativo */}
      <div
        className="absolute top-6 right-6 font-calig text-5xl text-blood opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        aria-hidden
      >
        {entry.glyph}
      </div>

      {/* Categoría arriba */}
      <div className="absolute top-4 left-4">
        <BracketLabel className="text-bone text-[10px]">{entry.category}</BracketLabel>
      </div>

      {/* Contenido inferior */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
        <h3 className="font-display text-2xl leading-tight text-ink group-hover:text-blood transition-colors duration-300">
          {entry.title}
        </h3>
        <p className="font-mono text-[10px] tracking-[0.15em] text-bone leading-relaxed">
          {entry.description}
        </p>
        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="h-px w-6 bg-blood" />
          <span className="font-mono text-[9px] tracking-[0.3em] text-blood uppercase">
            INVOCAR →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function Codice() {
  return (
    <section
      id="codice"
      className="relative z-[1] min-h-screen w-full overflow-hidden bg-void py-32"
    >
      <div className="px-6 md:px-12 grid grid-cols-12 gap-4 mb-12 md:mb-16 items-center">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
          <BracketLabel className="text-bone">CAPÍTULO</BracketLabel>
          <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tight">
            CÓDICE
          </h2>
          <IlluminatedCapital
            text="Reliquias del trabajo. Cada entrada es un rito completado, un sistema vivo. Toca para invocarla."
            className="max-w-md mt-2"
            textClassName="font-mono text-xs tracking-[0.18em] text-bone leading-relaxed"
          />
          <div className="flex items-center gap-4 mt-4">
            <ChapterIndex n="004" className="text-[8vw] md:text-[4vw]" />
            <BracketLabel highlight>CÓDICE</BracketLabel>
          </div>
        </div>

        {/* Modelo 3D — solo desktop para no afectar mobile */}
        <div className="hidden md:block col-span-5 h-[500px] relative">
          <div className="absolute inset-0">
            <InfectedMaskScene />
          </div>
          {/* Halo crimson detrás del modelo */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(192,32,43,0.15) 0%, transparent 60%)",
            }}
          />
        </div>
      </div>

      <div className="px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        {ENTRIES.map((entry, i) => (
          <CodexTile key={entry.title} entry={entry} index={i} />
        ))}
      </div>

      <Marquee
        items={[
          { label: "RELIQUIAS" },
          { label: "CÓDIGO VIVO" },
          { label: "SISTEMAS DESPIERTOS" },
          { index: "004", label: "CÓDICE", highlight: true },
          { label: "GITHUB · NOULL999" },
          { label: "PROYECTOS ACTIVOS" },
          { label: "INVOCAR · ABRIR" },
        ]}
      />
    </section>
  );
}
