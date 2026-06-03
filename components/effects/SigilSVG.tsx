import { cn } from "@/lib/cn";

export function SigilSVG({
  className,
  color = "#c0202b",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      aria-hidden
    >
      <defs>
        <pattern
          id="halftone"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1.4" fill={color} />
        </pattern>
        <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
      </defs>

      <g
        stroke={color}
        strokeWidth="1.2"
        fill="url(#halftone)"
        filter="url(#rough)"
      >
        {/* central vertical spine */}
        <path d="M200 40 L200 560" fill="none" />
        {/* upper crown spikes */}
        <path d="M200 60 L180 20 M200 60 L220 20 M200 60 L160 30 M200 60 L240 30 M200 60 L150 40 M200 60 L250 40" fill="none" />

        {/* arms of cross */}
        <path d="M120 180 L280 180" fill="none" />
        <path d="M120 180 L100 150 L80 170 L70 200" fill="none" />
        <path d="M280 180 L300 150 L320 170 L330 200" fill="none" />

        {/* upper crescents */}
        <path d="M140 250 Q200 200 260 250 Q200 230 140 250 Z" />
        <path d="M120 320 Q200 240 280 320 Q200 290 120 320 Z" opacity="0.6" />

        {/* lower thorny crescents */}
        <path d="M100 420 Q200 340 300 420 Q200 380 100 420 Z" />
        <path d="M80 480 Q200 380 320 480 Q200 440 80 480 Z" opacity="0.55" />

        {/* thorn spikes around */}
        <path d="M70 200 L40 180 M70 200 L40 210 M70 200 L40 240" fill="none" />
        <path d="M330 200 L360 180 M330 200 L360 210 M330 200 L360 240" fill="none" />

        {/* lower point */}
        <path d="M200 480 L200 560" fill="none" />
        <path d="M200 555 L180 540 M200 555 L220 540" fill="none" />

        {/* inner sigil */}
        <circle cx="200" cy="180" r="10" fill="none" />
        <path d="M200 170 L200 190 M190 180 L210 180" fill="none" />
      </g>
    </svg>
  );
}
