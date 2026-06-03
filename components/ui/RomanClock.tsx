"use client";

import { useEffect, useState } from "react";
import { toRoman } from "@/lib/roman";

export function RomanClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const h = now.getHours();
  const m = now.getMinutes();
  const day = now.getDate();

  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.3em] text-bone ${className}`}
      title={now.toLocaleString("es-CL")}
    >
      HORA {toRoman(h === 0 ? 24 : h)} · MIN {toRoman(m === 0 ? 60 : m)} · DIES {toRoman(day)}
    </span>
  );
}
