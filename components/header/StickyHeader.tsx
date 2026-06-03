"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { CoordsTag } from "@/components/ui/CoordsTag";
import { RedButton } from "@/components/ui/RedButton";
import { toggle, onChange, isPlaying } from "@/lib/audio";

export function StickyHeader() {
  const [show, setShow] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    setAudioOn(isPlaying());
    const off = onChange((p) => setAudioOn(p));
    return () => {
      window.removeEventListener("scroll", onScroll);
      off();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="fixed top-0 left-0 right-0 z-[55] grid grid-cols-12 items-start gap-4 px-6 py-5 bg-void/90 border-b border-ash/30"
        >
          <div className="col-span-1 font-calig text-3xl leading-none text-ink">
            ✠
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <BracketLabel>NÓCTURA</BracketLabel>
            <BracketLabel className="text-bone normal-case tracking-[0.2em]">
              DISEÑO DE EXPERIENCIAS
            </BracketLabel>
            <BracketLabel className="text-bone normal-case tracking-[0.2em]">
              RITO Y CÓDIGO
            </BracketLabel>
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <CoordsTag />
            <BracketLabel className="text-bone normal-case tracking-[0.2em]">
              SANTIAGO / CL
            </BracketLabel>
          </div>
          <div className="col-span-3 flex flex-col gap-1">
            <button
              onClick={() => toggle()}
              className="text-left font-mono text-xs uppercase tracking-[0.25em] text-bone hover:text-blood transition-colors"
            >
              {"{SONIDO}"}
            </button>
            <span className="font-mono text-xs uppercase tracking-[0.25em]">
              <span className="text-blood">ES</span>{" "}
              <span className="text-bone">{audioOn ? "ENCENDIDO" : "APAGADO"}</span>
            </span>
          </div>
          <div className="col-span-2 flex justify-end">
            <RedButton variant="filled">CONTACTO</RedButton>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
