"use client";

import { motion } from "framer-motion";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Marquee } from "@/components/effects/Marquee";
import { ChromeDemonDollScene } from "@/components/three/ChromeDemonDollScene";

export function Origen() {
  return (
    <section id="origen" className="relative z-[1] min-h-screen w-full overflow-hidden bg-void">
      {/* Model ocupa solo la mitad derecha para no tapar el texto */}
      <div className="absolute inset-y-0 right-0 w-full md:w-2/3 opacity-90">
        <ChromeDemonDollScene />
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-4 px-6 md:px-12 py-24 items-center min-h-screen">
        <motion.div
          className="col-span-12 md:col-span-5 flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <BracketLabel className="text-bone">CAPÍTULO</BracketLabel>
          <h2 className="font-display text-[18vw] md:text-[10vw] leading-[0.85] tracking-tight">
            ORIGEN
          </h2>
          <p className="max-w-md font-mono text-xs tracking-[0.18em] text-bone leading-relaxed">
            El primer signo. Una marca dibujada en la pared antes del lenguaje.
            Forma simétrica, ritual, callada — el principio de todo sistema.
          </p>
          <div className="flex items-center gap-6 mt-2">
            <ChapterIndex n="001" className="text-[8vw] md:text-[5vw]" />
            <BracketLabel highlight>ORIGEN</BracketLabel>
          </div>
        </motion.div>
      </div>

      <Marquee
        items={[
          { label: "INVOCACIÓN" },
          { label: "UMBRAL" },
          { label: "SANGRE Y FORMA" },
          { index: "001", label: "ORIGEN", highlight: true },
          { label: "NOMBRE SIN VOZ" },
          { label: "LO QUE PERSISTE" },
          { label: "CENIZA VIVA" },
          { label: "PRIMER TRAZO" },
        ]}
      />
    </section>
  );
}
