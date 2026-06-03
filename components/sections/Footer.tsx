"use client";

import { motion } from "framer-motion";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { CoordsTag } from "@/components/ui/CoordsTag";
import { RedButton } from "@/components/ui/RedButton";
import { Marquee } from "@/components/effects/Marquee";

export function FooterSection({ onContact }: { onContact?: () => void }) {
  return (
    <footer className="relative w-full overflow-hidden bg-void border-t border-ash/30">
      <div className="relative py-32 px-6 md:px-12 flex flex-col items-center gap-12">
        <motion.h2
          className="font-display text-[28vw] md:text-[18vw] leading-[0.85] tracking-tight text-center text-ash select-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
          style={{
            backgroundImage:
              "linear-gradient(180deg, #ededed 0%, #c0202b 50%, #3a3a3a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          VACÍO
        </motion.h2>

        <div className="flex items-center gap-6">
          <RedButton
            variant="outline"
            onClick={() => {
              const w = window as unknown as { __lenis?: { scrollTo: (t: number, o?: { duration?: number }) => void } };
              w.__lenis?.scrollTo(0, { duration: 2 });
            }}
          >
            VOLVER ARRIBA
          </RedButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-ash/30 pt-8">
          <div className="flex flex-col gap-1">
            <BracketLabel className="text-bone">NÓCTURA</BracketLabel>
            <span className="font-mono text-[10px] text-ash">MMXXVI</span>
          </div>
          <div className="flex flex-col gap-1">
            <BracketLabel className="text-bone">RITO Y CÓDIGO</BracketLabel>
            <span className="font-mono text-[10px] text-ash">TODOS LOS DERECHOS</span>
          </div>
          <div className="flex flex-col gap-1">
            <CoordsTag />
            <span className="font-mono text-[10px] text-ash">PUERTO MONTT / CL</span>
          </div>
          <div className="flex flex-col gap-1">
            <BracketLabel className="text-bone">CONTACTO</BracketLabel>
            <button
              onClick={onContact}
              className="font-mono text-[10px] text-blood hover:text-pulse transition-colors text-left tracking-[0.1em]"
            >
              JOSEESTEBANASENCIO@GMAIL.COM
            </button>
          </div>
        </div>
      </div>

      <Marquee
        items={[
          { label: "NÓCTURA" },
          { label: "EL RITO NO TERMINA" },
          { label: "2026" },
          { label: "TODO LO OSCURO TIENE FORMA" },
          { label: "VUELVE" },
          { label: "SANGRE Y CÓDIGO" },
        ]}
        duration={28}
      />
    </footer>
  );
}
