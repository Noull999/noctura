"use client";

/**
 * Vela con flama animada — SVG puro, sin assets externos.
 * Pensada para usarse como decoración en esquinas.
 */
export function CandleFlame({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      {/* Halo de luz cálida — se intensifica con el modo sombra */}
      <div
        className="absolute -inset-16 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(255, 140, 60, ${0.12 * intensity}) 0%, rgba(192, 32, 43, ${0.06 * intensity}) 40%, transparent 70%)`,
          animation: "candle-flicker 2.5s ease-in-out infinite",
        }}
      />

      {/* Vela */}
      <svg width="32" height="80" viewBox="0 0 32 80" className="relative">
        {/* Llama */}
        <g style={{ transformOrigin: "16px 30px", animation: "flame-dance 1.2s ease-in-out infinite" }}>
          {/* Halo externo de llama */}
          <ellipse cx="16" cy="20" rx="7" ry="14" fill="#c0202b" opacity="0.4">
            <animate attributeName="ry" values="14;13;15;13;14" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
          {/* Llama media */}
          <ellipse cx="16" cy="22" rx="5" ry="11" fill="#e63946" opacity="0.7">
            <animate attributeName="ry" values="11;10;12;10;11" dur="1.2s" repeatCount="indefinite" />
          </ellipse>
          {/* Núcleo amarillo */}
          <ellipse cx="16" cy="24" rx="2.5" ry="6" fill="#ffaa44" opacity="0.9">
            <animate attributeName="ry" values="6;5;7;5;6" dur="0.9s" repeatCount="indefinite" />
          </ellipse>
          {/* Punto blanco caliente */}
          <ellipse cx="16" cy="26" rx="1" ry="2.5" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Mecha */}
        <line x1="16" y1="32" x2="16" y2="38" stroke="#1a1a1a" strokeWidth="1" />

        {/* Cuerpo de la vela */}
        <rect x="12" y="38" width="8" height="38" fill="#3a3a3a" />
        <rect x="12" y="38" width="2" height="38" fill="#1a1a1a" />
        <rect x="18" y="38" width="2" height="38" fill="#7a7a7a" opacity="0.4" />

        {/* Base de cera derretida */}
        <path d="M11 38 Q13 36 14 38 Q15 35 17 38 Q19 37 20 38 Q21 39 21 41 L11 41 Z" fill="#3a3a3a" />
      </svg>

      <style>{`
        @keyframes candle-flicker {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.85; }
          50% { opacity: 1; }
          75% { opacity: 0.9; }
        }
        @keyframes flame-dance {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-0.5px) rotate(-2deg); }
          50% { transform: translateX(0.5px) rotate(1deg); }
          75% { transform: translateX(-0.3px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
