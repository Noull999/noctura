"use client";

export function GrainOverlay() {
  return (
    <>
      <svg className="hidden">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.035]"
        style={{
          filter: "url(#grain-filter)",
          background: "#ededed",
          mixBlendMode: "overlay",
        }}
        aria-hidden
      />
    </>
  );
}
