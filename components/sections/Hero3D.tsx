"use client";

import { HeroScene } from "@/components/three/HeroScene";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { CoordsTag } from "@/components/ui/CoordsTag";
import { GlitchText } from "@/components/effects/GlitchText";

export function Hero3D({ onBreak }: { onBreak?: () => void } = {}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10">
        <div className="flex items-start justify-between">
          <div className="font-calig text-4xl md:text-5xl leading-none text-ink">
            ✠
          </div>
          <BracketLabel className="text-bone">{`33,4489°S / 70,6693°O`}</BracketLabel>
        </div>

        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-3">
            <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.85] tracking-tight text-ink">
              <GlitchText text="NÓCTURA" />
            </h1>
            <div className="max-w-md font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-bone">
              {"{CADA SOLUCIÓN ES UN RITO / OBJETIVO, PROFUNDIDAD, RESULTADO}"}
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col items-end gap-2 self-end">
            <div className="pointer-events-none">
              <span className="bg-bone text-void px-2 py-1 font-mono text-xs uppercase tracking-[0.25em] opacity-60">
                HAZ CLIC PARA MOVER
              </span>
            </div>
            <CoordsTag />
          </div>
        </div>
      </div>
    </section>
  );
}
