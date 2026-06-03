"use client";

import { useEffect, useRef } from "react";

const SIZE = 220;
const POOL = 8; // frames pre-generados

export function GrainCanvas({ opacity = 0.15 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    canvas.width = SIZE;
    canvas.height = SIZE;

    // Pre-generar pool de frames de ruido
    const frames: ImageData[] = [];
    for (let f = 0; f < POOL; f++) {
      const img = ctx.createImageData(SIZE, SIZE);
      const buf = img.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 32;
      }
      frames.push(img);
    }

    let frameIdx = 0;
    let raf = 0;
    let last = 0;
    const interval = 1000 / 15;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < interval) return;
      last = t;
      ctx.putImageData(frames[frameIdx % POOL], 0, 0);
      frameIdx++;
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      style={{
        opacity,
        imageRendering: "pixelated",
        mixBlendMode: "overlay",
        backgroundSize: `${SIZE}px ${SIZE}px`,
      }}
    />
  );
}
