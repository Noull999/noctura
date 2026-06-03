"use client";

import { useEffect, useState } from "react";
import { AsciiRain } from "./AsciiRain";

const TRIGGERS = [0.18, 0.30, 0.46, 0.72];
const WINDOW = 0.08;

export function AsciiRainController() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let lastZone = -1;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const t = window.scrollY / max;
      const zone = TRIGGERS.findIndex((tp) => Math.abs(t - tp) < WINDOW);
      if (zone !== -1 && zone !== lastZone) {
        lastZone = zone;
        setActive(true);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => setActive(false), 1200);
      }
      if (zone === -1) lastZone = -1;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return <AsciiRain active={active} />;
}
