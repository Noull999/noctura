"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { BracketLabel } from "@/components/ui/BracketLabel";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: Props) {
  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Bloquear scroll mientras está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-lg border border-ash/40 bg-surface p-10 flex flex-col gap-8"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Sigilo decorativo */}
            <div className="absolute top-4 right-4 font-calig text-3xl text-blood opacity-40">✠</div>

            <div className="flex flex-col gap-2">
              <BracketLabel className="text-bone">CONTACTO</BracketLabel>
              <h2 className="font-display text-4xl md:text-5xl leading-none text-ink">
                HABLA AL VACÍO
              </h2>
              <p className="font-mono text-xs tracking-[0.18em] text-bone leading-relaxed mt-2">
                Cada proyecto es un rito. Si tienes una visión que requiere profundidad,
                oscuridad y código — escribenos.
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 border-t border-ash/30 pt-6">
              <BracketLabel className="text-bone text-[10px]">CORREO / INVOCACIÓN DIRECTA</BracketLabel>
              <a
                href="mailto:joseestebanasencio@gmail.com"
                className="font-mono text-sm tracking-[0.15em] text-blood hover:text-pulse transition-colors mt-1"
              >
                joseestebanasencio@gmail.com
              </a>
            </div>

            {/* Coords */}
            <div className="flex items-center justify-between border-t border-ash/30 pt-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-bone">
                41,4693° S / 72,9424° O · PUERTO MONTT / CL
              </span>
              <BracketLabel className="text-bone">MMXXVI</BracketLabel>
            </div>

            {/* Cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] text-bone hover:text-blood transition-colors uppercase"
            >
              [CERRAR]
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
