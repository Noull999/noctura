"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { CoordsTag } from "@/components/ui/CoordsTag";
import { RedButton } from "@/components/ui/RedButton";
import { RomanClock } from "@/components/ui/RomanClock";
import { toggle, onChange, isPlaying } from "@/lib/audio";

const EASTER_EGG_MESSAGES = [
  "NÓCTURA TE OBSERVA",
  "EL CÓDIGO ES EL RITO",
  "PUERTO MONTT · MMXXVI",
  "SANGRE Y CÓDIGO",
  "TODO LO OSCURO TIENE FORMA",
  "✠ OMNIA MUTANTUR ✠",
];

export function StickyHeader({ onContact }: { onContact?: () => void }) {
  const [show, setShow] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [eggActive, setEggActive] = useState(false);
  const [eggMsg, setEggMsg] = useState("");

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eggTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Cuando se alcanzan 3 clics, disparar easter egg
  useEffect(() => {
    if (clickCount >= 3) {
      const msg = EASTER_EGG_MESSAGES[Math.floor(Math.random() * EASTER_EGG_MESSAGES.length)];
      setEggMsg(msg);
      setEggActive(true);
      setClickCount(0);
      if (eggTimer.current) clearTimeout(eggTimer.current);
      eggTimer.current = setTimeout(() => setEggActive(false), 3000);
    } else if (clickCount > 0) {
      // Resetear contador si no llega a 3 dentro de 800ms
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setClickCount(0), 800);
    }
  }, [clickCount]);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (eggTimer.current) clearTimeout(eggTimer.current);
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
            <button
              type="button"
              onClick={() => setClickCount((c) => c + 1)}
              className={`font-calig text-2xl leading-none select-none cursor-pointer transition-colors ${
                eggActive ? "text-blood" : clickCount > 0 ? "text-pulse" : "text-ink hover:text-blood"
              }`}
              style={{
                transform: eggActive ? "rotate(5deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease, color 0.3s ease",
              }}
              aria-label="Logo Nóctura"
            >
              ✠
            </button>

            <div className="flex flex-col gap-0.5">
              <BracketLabel>NÓCTURA</BracketLabel>
              <BracketLabel className="text-bone normal-case tracking-[0.2em] hidden md:block">
                RITO Y CÓDIGO
              </BracketLabel>
            </div>
          </div>

          {/* Easter egg message */}
          <AnimatePresence>
            {eggActive && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 font-mono text-[10px] tracking-[0.3em] text-blood bg-void/95 border border-blood/40 px-4 py-2 pointer-events-none whitespace-nowrap"
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {eggMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centro — coords + reloj romano, solo desktop */}
          <div className="hidden md:flex flex-col gap-1 items-center">
            <CoordsTag />
            <BracketLabel className="text-bone normal-case tracking-[0.2em]">
              PUERTO MONTT / CL
            </BracketLabel>
            <RomanClock className="mt-1" />
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
