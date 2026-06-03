"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DRIP_INTERVAL = 120;

interface Drip {
  id: number;
  x: number;
  y: number;
}

export function DripCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [drips, setDrips] = useState<Drip[]>([]);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const lastDripTimeRef = useRef(0);
  const frameIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Solo activar en dispositivos con puntero fino (mouse/trackpad, no touch)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsPointerDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointerDevice(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (!frameIdRef.current) {
        frameIdRef.current = requestAnimationFrame(() => {
          setMousePos({ ...mousePosRef.current });
          frameIdRef.current = undefined;

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
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [isPointerDevice]);

  // En touch no renderizar nada (ni el cursor personalizado ni el CSS que oculta el cursor)
  if (!isPointerDevice) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Cruz principal */}
      <motion.div
        className="pointer-events-none fixed z-[9999] text-2xl text-blood -translate-x-1/2 -translate-y-1/2"
        style={{ x: mousePos.x, y: mousePos.y }}
      >
        ✠
      </motion.div>

      {/* Goteos de sangre */}
      <AnimatePresence>
        {drips.map((drip) => (
          <motion.div
            key={drip.id}
            className="pointer-events-none fixed z-[9998]"
            style={{ x: drip.x, y: drip.y }}
            initial={{ opacity: 1, scale: 1, y: drip.y }}
            animate={{ opacity: 0, scale: 0.3, y: drip.y + 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
          >
            <svg width="6" height="12" viewBox="0 0 6 12" className="-translate-x-1/2" aria-hidden>
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
