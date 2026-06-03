"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WireframeMorph } from "@/components/effects/WireframeMorph";
import { RedButton } from "@/components/ui/RedButton";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { MidnightSpikedOrbScene } from "@/components/three/MidnightSpikedOrbScene";
// useLoader hooks removed - they cannot be used outside of a Canvas context

export function LoadingScreen({
  onEnter,
}: {
  onEnter: (withAudio: boolean) => void;
}) {
  const [percent, setPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // reset scroll and lock body while intro is up
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

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 8);
      setPercent(Math.floor(v));
      if (v >= 100) {
        clearInterval(id);
        setReady(true);
      }
    }, 70);
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
            <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-none text-ink">
              {"{NÓCTURA}"}
            </h1>

            {!ready ? (
              <div className="flex flex-col items-center gap-2">
                <div className="font-mono text-sm tracking-[0.3em] text-bone">
                  CARGANDO
                </div>
                <div className="font-mono text-xs tracking-[0.3em] text-ink">
                  {percent} %
                </div>
                <div className="mt-2 h-px w-32 bg-ash overflow-hidden">
                  <motion.div
                    className="h-full bg-blood"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>
              </div>
            ) : (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-3">
                  <RedButton variant="outline" onClick={() => handleEnter(true)}>
                    ENTRAR CON AUDIO
                  </RedButton>
                  <RedButton variant="ghost" onClick={() => handleEnter(false)}>
                    ENTRAR SIN AUDIO
                  </RedButton>
                </div>
                <BracketLabel className="mt-4 text-bone normal-case tracking-[0.2em]">
                  ESTA EXPERIENCIA INCLUYE SONIDO · PARA LA ATMÓSFERA DESEADA, ACTIVE EL AUDIO
                </BracketLabel>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
