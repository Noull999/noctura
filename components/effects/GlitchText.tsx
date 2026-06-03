"use client";

import { cn } from "@/lib/cn";

export function GlitchText({
  text,
  className,
  as: As = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "div";
}) {
  return (
    <As className={cn("relative inline-block group", className)}>
      <span aria-hidden className="absolute inset-0 text-pulse opacity-0 group-hover:opacity-100" style={{ animation: "glitch-a 700ms infinite steps(1)" }}>
        {text}
      </span>
      <span aria-hidden className="absolute inset-0 text-blood opacity-0 group-hover:opacity-100" style={{ animation: "glitch-b 700ms infinite steps(1)" }}>
        {text}
      </span>
      <span className="relative">{text}</span>
    </As>
  );
}
