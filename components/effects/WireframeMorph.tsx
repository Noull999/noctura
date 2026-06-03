"use client";

export function WireframeMorph() {
  return (
    <svg
      viewBox="0 0 800 800"
      className="absolute inset-0 w-full h-full opacity-30"
      aria-hidden
    >
      <g fill="none" stroke="#3a3a3a" strokeWidth="1">
        <path d="M400 100 L700 300 L600 700 L200 700 L100 300 Z">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 400 400"
            to="360 400 400"
            dur="40s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M400 150 L650 320 L580 650 L220 650 L150 320 Z" opacity="0.6">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 400 400"
            to="0 400 400"
            dur="60s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M400 220 L600 340 L540 580 L260 580 L200 340 Z" opacity="0.4">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 400 400"
            to="-360 400 400"
            dur="80s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
}
