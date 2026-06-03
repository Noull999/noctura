"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone opacity-60">
        DESPLAZARSE
      </span>
      <svg
        width="20"
        height="12"
        viewBox="0 0 20 12"
        className="opacity-60"
      >
        <polyline
          points="2,2 10,10 18,2"
          stroke="#7a7a7a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
