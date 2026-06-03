"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function SplitTextReveal({
  text,
  className,
  staggerChildren = 0.04,
}: {
  text: string;
  className?: string;
  staggerChildren?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] },
            },
          }}
        >
          {w + " "}
        </motion.span>
      ))}
    </motion.p>
  );
}
