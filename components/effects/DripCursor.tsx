"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DRIP_INTERVAL = 120;

interface Drip {
  id: number;
  x: number;
  y: number;
}

export function DripCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [drips, setDrips] = useState<Drip[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastDripTimeRef = useRef(0);
  const frameIdRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (!frameIdRef.current) {
        frameIdRef.current = requestAnimationFrame(() => {
          setMousePos({ ...mousePosRef.current });
          frameIdRef.current = undefined;

          // Añade un goteo cada DRIP_INTERVAL ms
          const now = Date.now();
          if (now - lastDripTimeRef.current > DRIP_INTERVAL) {
            const newDrip: Drip = {
              id: now,
              x: mousePosRef.current.x,
              y: mousePosRef.current.y,
            };
            setDrips((prev) => [...prev, newDrip]);
            lastDripTimeRef.current = now;

            setTimeout(() => {
              setDrips((prev) => prev.filter((d) => d.id !== newDrip.id));
            }, 800);
          }
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Ocultamos el cursor del navegador */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Cruz principal */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          x: mousePos.x,
          y: mousePos.y,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="-translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          {/* Cruz */}
          <line
            x1="16"
            y1="4"
            x2="16"
            y2="28"
            stroke="#c0202b"
            strokeWidth="2"
            opacity="0.8"
          />
          <line
            x1="4"
            y1="16"
            x2="28"
            y2="16"
            stroke="#c0202b"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Pequeños puntos en los extremos */}
          <circle cx="16" cy="4" r="1.5" fill="#c0202b" opacity="0.6" />
          <circle cx="16" cy="28" r="1.5" fill="#c0202b" opacity="0.6" />
          <circle cx="4" cy="16" r="1.5" fill="#c0202b" opacity="0.6" />
          <circle cx="28" cy="16" r="1.5" fill="#c0202b" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Goteos de sangre */}
      <AnimatePresence>
        {drips.map((drip) => (
          <motion.div
            key={drip.id}
            className="pointer-events-none fixed z-[9998]"
            style={{
              x: drip.x,
              y: drip.y,
            }}
            initial={{ opacity: 1, scale: 1, y: drip.y }}
            animate={{ opacity: 0, scale: 0.3, y: drip.y + 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
          >
            <svg
              width="6"
              height="12"
              viewBox="0 0 6 12"
              className="-translate-x-1/2"
              aria-hidden
            >
              {/* Gota alargada de sangre */}
              <path
                d="M3 0 C1.5 2 0 4 0 6 C0 9 1.3 12 3 12 C4.7 12 6 9 6 6 C6 4 4.5 2 3 0"
                fill="#c0202b"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
