"use client";

import { cn } from "@/lib/cn";

export interface MarqueeItem {
  label: string;
  index?: string;
  highlight?: boolean;
}

function GlitchItem({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className={cn(
        "group relative font-mono text-xs uppercase tracking-[0.2em] whitespace-nowrap select-none cursor-default",
        highlight ? "bg-blood text-void px-1" : "text-ink"
      )}
    >
      {/* Capas glitch — solo en hover */}
      <span
        aria-hidden
        className="absolute inset-0 text-pulse opacity-0 group-hover:opacity-100 px-[inherit]"
        style={{ animation: "glitch-a 600ms infinite steps(1)" }}
      >
        {"{"}
        {label}
        {"}"}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-blood opacity-0 group-hover:opacity-100 px-[inherit]"
        style={{ animation: "glitch-b 600ms infinite steps(1)" }}
      >
        {"{"}
        {label}
        {"}"}
      </span>
      {/* Texto real */}
      <span className="relative transition-opacity duration-150 group-hover:opacity-0">
        {"{"}
        {label}
        {"}"}
      </span>
    </span>
  );
}

export function Marquee({
  items,
  className,
  duration = 40,
}: {
  items: MarqueeItem[];
  className?: string;
  duration?: number;
}) {
  const Track = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-4">
          {it.index && (
            <span className="font-mono text-[10px] tracking-[0.3em] text-bone">
              {it.index}
            </span>
          )}
          <GlitchItem label={it.label} highlight={it.highlight} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-ash/40 bg-tomb/80 py-3",
        className,
      )}
    >
      <div
        className="flex w-max animate-[marquee-x_var(--dur)_linear_infinite] marquee-track"
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {Track}
        {Track}
      </div>
    </div>
  );
}
