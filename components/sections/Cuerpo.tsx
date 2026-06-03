"use client";

import dynamic from "next/dynamic";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Marquee } from "@/components/effects/Marquee";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

export function Cuerpo() {
  return (
    <section id="cuerpo" className="relative min-h-[140vh] w-full overflow-hidden bg-void">
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0">
          <ParticleField />
        </div>

        <div className="relative z-10 grid grid-cols-12 gap-4 px-6 md:px-12 h-full items-center">
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <BracketLabel className="text-bone">CAPÍTULO</BracketLabel>
            <p className="max-w-sm font-mono text-xs tracking-[0.18em] text-bone leading-relaxed">
              La materia se reúne. Forma silueta, halo, columna. Y al pasar el ojo, se disgrega — pura partícula, puro polvo.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 flex justify-end items-end h-full pb-16">
            <div className="flex flex-col items-end gap-2">
              <h2 className="font-display text-[16vw] md:text-[12vw] leading-[0.8] tracking-tight text-right">
                CUERPO
              </h2>
              <div className="flex items-center gap-4">
                <ChapterIndex n="002" className="text-[8vw] md:text-[4vw]" />
                <BracketLabel highlight>CUERPO</BracketLabel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee
        items={[
          { label: "CARNE DIGITAL" },
          { label: "PIEL DE SOMBRA" },
          { label: "VÉRTEBRA" },
          { index: "002", label: "CUERPO", highlight: true },
          { label: "DISOLUCIÓN" },
          { label: "LATIDO ROTO" },
          { label: "LO QUE HABITA" },
          { label: "ENTRE DOS MUNDOS" },
        ]}
      />
    </section>
  );
}
