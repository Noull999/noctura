"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { CoordsTag } from "@/components/ui/CoordsTag";
import { RedButton } from "@/components/ui/RedButton";
import { toggle, onChange, isPlaying } from "@/lib/audio";

export function StickyHeader({ onContact }: { onContact?: () => void }) {
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
          className="fixed top-0 left-0 right-0 z-[55] flex items-center justify-between gap-4 px-6 py-4 bg-void/90 border-b border-ash/30"
        >
          {/* Logo + nombre */}
          <div className="flex items-center gap-3">
            <span className="font-calig text-2xl leading-none text-ink">✠</span>
            <div className="flex flex-col gap-0.5">
              <BracketLabel>NÓCTURA</BracketLabel>
              <BracketLabel className="text-bone normal-case tracking-[0.2em] hidden md:block">
                RITO Y CÓDIGO
              </BracketLabel>
            </div>
          </div>

          {/* Centro — coords, solo desktop */}
          <div className="hidden md:flex flex-col gap-1 items-center">
            <CoordsTag />
            <BracketLabel className="text-bone normal-case tracking-[0.2em]">
              PUERTO MONTT / CL
            </BracketLabel>
          </div>

          {/* Derecha — audio + contacto */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggle()}
              className="font-mono text-xs uppercase tracking-[0.25em] text-bone hover:text-blood transition-colors"
            >
              {"{SONIDO}"}{" "}
              <span className={audioOn ? "text-blood" : "text-ash"}>
                {audioOn ? "ON" : "OFF"}
              </span>
            </button>
            <RedButton variant="filled" onClick={onContact}>CONTACTO</RedButton>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
