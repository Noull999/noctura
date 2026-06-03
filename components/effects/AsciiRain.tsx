"use client";

import { useEffect, useRef } from "react";

export function AsciiRain({
  active,
  color = "#c0202b",
}: {
  active: boolean;
  color?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  // Setup canvas size — runs once
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Animation loop — only runs when active
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const rows = Math.floor(canvas.height / fontSize);
    const drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * rows),
    );
    const chars = "@$%&#?+=<>:;~^*aksjf01+†∞◊";
    let raf = 0;
    let last = 0;
    const fps = 1000 / 24;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < fps) return;
      last = t;
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] transition-opacity duration-200"
      style={{ opacity: active ? 1 : 0 }}
    />
  );
}
