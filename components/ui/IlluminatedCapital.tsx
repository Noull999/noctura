"use client";

/**
 * Capital iluminada al estilo manuscrito medieval.
 * Se usa al inicio de un párrafo: la primera letra flota a la izquierda,
 * grande, en font-calig roja con glow y una cruz decorativa.
 *
 * Uso:
 *   <IlluminatedCapital text="Construimos liturgias..." />
 *
 * Toma automáticamente la primera letra y la renderiza como capital.
 */
export function IlluminatedCapital({
  text,
  className = "",
  textClassName = "",
}: {
  text: string;
  className?: string;
  textClassName?: string;
}) {
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);

  return (
    <p className={`${className} ${textClassName}`}>
      <span className="relative inline-block float-left mr-3 md:mr-4">
        <span
          className="font-calig leading-none text-blood"
          style={{
            fontSize: "5rem",
            textShadow:
              "0 0 24px rgba(192,32,43,0.4), 0 0 8px rgba(192,32,43,0.3)",
            lineHeight: "0.85",
          }}
        >
          {firstLetter}
        </span>
        {/* Decoración: pequeña cruz junto a la capital */}
        <span
          className="absolute -top-1 -right-2 font-calig text-xs text-ash opacity-60"
          aria-hidden
        >
          ✠
        </span>
      </span>
      {rest}
    </p>
  );
}
