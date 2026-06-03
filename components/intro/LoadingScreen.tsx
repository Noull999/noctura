"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WireframeMorph } from "@/components/effects/WireframeMorph";
import { RedButton } from "@/components/ui/RedButton";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { MidnightSpikedOrbScene } from "@/components/three/MidnightSpikedOrbScene";

const RITUAL_STEPS = [
  "ENCENDIENDO ALTAR...",
  "INVOCANDO SOMBRAS...",
  "ABRIENDO EL UMBRAL...",
  "DESPERTANDO LA FORMA...",
  "TEJIENDO EL CÓDIGO...",
  "SELLANDO EL RITO...",
  "PREPARANDO LA ENTRADA...",
];

// Efecto de escritura letra a letra
function TypeWriter({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, 55); // más lento para que se lea bien
    return () => clearInterval(id);
  }, [text, onDone]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-blood">_</span>
    </span>
  );
}

export function LoadingScreen({
  onEnter,
}: {
  onEnter: (withAudio: boolean) => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    const w = window as unknown as {
      __lenis?: {
        scrollTo: (t: number, o?: { immediate?: boolean }) => void;
        stop: () => void;
        start: () => void;
      };
    };
    w.__lenis?.scrollTo(0, { immediate: true });
    w.__lenis?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      w.__lenis?.start();
    };
  }, []);

  // Avanza el % y controla qué paso ritual mostrar
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 2 + 0.5); // avg 1.5 por tick
      setPercent(Math.floor(v));
      const idx = Math.min(
        Math.floor((v / 100) * RITUAL_STEPS.length),
        RITUAL_STEPS.length - 1
      );
      setStepIndex(idx);
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setReady(true), 600);
      }
    }, 110); // 110ms × ~67 ticks ≈ 7.4s + 0.6s buffer ≈ 8s total
    return () => clearInterval(id);
  }, []);

  const handleEnter = (withAudio: boolean) => {
    setOpen(false);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    const w = window as unknown as { __lenis?: { start: () => void } };
    w.__lenis?.start();
    setTimeout(() => onEnter(withAudio), 700);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: "fixed" }}
        >
          <div className="absolute inset-0 opacity-90">
            <MidnightSpikedOrbScene />
          </div>
          <WireframeMorph />

          <div className="relative z-10 flex flex-col items-center gap-10 text-ink">
            <motion.h1
              className="font-display text-5xl md:text-7xl tracking-tight leading-none text-ink"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {"{NÓCTURA}"}
            </motion.h1>

            {!ready ? (
              <div className="flex flex-col items-center gap-4 w-64">
                {/* Texto ritual progresivo */}
                <div className="font-mono text-xs tracking-[0.25em] text-bone h-5 text-center">
                  <TypeWriter key={stepIndex} text={RITUAL_STEPS[stepIndex]} />
                </div>

                {/* Barra de progreso */}
                <div className="w-full h-px bg-ash overflow-hidden">
                  <motion.div
                    className="h-full bg-blood"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ ease: "linear", duration: 0.15 }}
                  />
                </div>

                {/* Porcentaje romano-estético */}
                <div className="flex justify-between w-full">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-ash">
                    RITUAL
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-blood">
                    {percent.toString().padStart(3, "0")} ‰
                  </span>
                </div>
              </div>
            ) : (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="font-mono text-xs tracking-[0.3em] text-bone text-center mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  EL UMBRAL ESTÁ ABIERTO
                </motion.div>
                <div className="flex gap-3">
                  <RedButton variant="outline" onClick={() => handleEnter(true)}>
                    ENTRAR CON AUDIO
                  </RedButton>
                  <RedButton variant="ghost" onClick={() => handleEnter(false)}>
                    ENTRAR SIN AUDIO
                  </RedButton>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone text-center max-w-xs leading-relaxed">
                  {"{"} ESTA EXPERIENCIA INCLUYE SONIDO · PARA LA ATMÓSFERA DESEADA, ACTIVE EL AUDIO {"}"}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
