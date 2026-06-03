'use client'

// Sigilo gótico línea-art — basado en referencias reales del usuario
// Cruz central + crescentes laterales + espinas ornamentadas + simetría vertical pura
// Sin animación. Trazo fino tipo tattoo/black metal logo.

interface SigilProps {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

// -------------------------------------------------------------------
// SIGILO PRINCIPAL — Cruz con crescentes y espinas radiantes
// Basado en imagen 5 del usuario + fila 1 img 1 de búsqueda Pinterest
// -------------------------------------------------------------------
export function GothicSigilMain({ size = 400, color = '#ededed', strokeWidth = 1.2, className }: SigilProps) {
  return (
    <svg
      viewBox="0 0 300 420"
      width={size}
      height={(size * 420) / 300}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* ── EJE VERTICAL ── */}
      <line x1="150" y1="18" x2="150" y2="402" />

      {/* ── PUNTA SUPERIOR — diamante agudo ── */}
      <path d="M 143 28 L 150 18 L 157 28 L 150 38 Z" fill={color} />

      {/* ── BARRA HORIZONTAL ── */}
      <line x1="80" y1="145" x2="220" y2="145" />

      {/* Punta izquierda */}
      <path d="M 88 138 L 80 145 L 88 152 L 94 145 Z" fill={color} />
      {/* Punta derecha */}
      <path d="M 212 138 L 220 145 L 212 152 L 206 145 Z" fill={color} />

      {/* ── ESPINAS EN EJE VERTICAL (arriba de la barra) ── */}
      <line x1="144" y1="80" x2="134" y2="68" />
      <line x1="156" y1="80" x2="166" y2="68" />
      <line x1="141" y1="100" x2="128" y2="91" />
      <line x1="159" y1="100" x2="172" y2="91" />
      <line x1="140" y1="120" x2="126" y2="114" />
      <line x1="160" y1="120" x2="174" y2="114" />

      {/* ── ORNAMENTO EN INTERSECCIÓN — nodo central ── */}
      {/* Lóbulos góticos arriba */}
      <path d="M 136 145 Q 130 132 143 125 Q 150 120 157 125 Q 170 132 164 145" />
      {/* Lóbulos góticos abajo */}
      <path d="M 136 145 Q 130 158 143 165 Q 150 170 157 165 Q 170 158 164 145" />

      {/* Detalle interior del nodo */}
      <path d="M 143 145 Q 146 138 150 136 Q 154 138 157 145 Q 154 152 150 154 Q 146 152 143 145 Z" />

      {/* ── CRESCENTES LATERALES ── */}
      {/* Izquierdo — abre hacia afuera (C) */}
      <path d="M 78 120 Q 48 145 78 170" strokeWidth={strokeWidth * 1.4} />
      <path d="M 72 128 Q 45 145 72 162" strokeWidth={strokeWidth * 0.8} />
      {/* Pequeñas espinas en el crescente izquierdo */}
      <line x1="60" y1="137" x2="50" y2="130" />
      <line x1="55" y1="145" x2="44" y2="145" />
      <line x1="60" y1="153" x2="50" y2="160" />

      {/* Derecho — abre hacia afuera ()) */}
      <path d="M 222 120 Q 252 145 222 170" strokeWidth={strokeWidth * 1.4} />
      <path d="M 228 128 Q 255 145 228 162" strokeWidth={strokeWidth * 0.8} />
      {/* Pequeñas espinas en el crescente derecho */}
      <line x1="240" y1="137" x2="250" y2="130" />
      <line x1="245" y1="145" x2="256" y2="145" />
      <line x1="240" y1="153" x2="250" y2="160" />

      {/* ── SECCIÓN INFERIOR — espinas descendentes ── */}
      <line x1="144" y1="200" x2="132" y2="212" />
      <line x1="156" y1="200" x2="168" y2="212" />
      <line x1="143" y1="225" x2="130" y2="235" />
      <line x1="157" y1="225" x2="170" y2="235" />
      <line x1="142" y1="250" x2="128" y2="258" />
      <line x1="158" y1="250" x2="172" y2="258" />
      <line x1="142" y1="275" x2="129" y2="282" />
      <line x1="158" y1="275" x2="171" y2="282" />

      {/* ── CRESCENTES INFERIORES (simétricas) ── */}
      <path d="M 100 310 Q 70 340 100 370" strokeWidth={strokeWidth * 1.2} />
      <path d="M 95 318 Q 68 340 95 362" strokeWidth={strokeWidth * 0.7} />
      <path d="M 200 310 Q 230 340 200 370" strokeWidth={strokeWidth * 1.2} />
      <path d="M 205 318 Q 232 340 205 362" strokeWidth={strokeWidth * 0.7} />

      {/* Espinas en crescentes inferiores */}
      <line x1="84" y1="332" x2="74" y2="326" />
      <line x1="80" y1="345" x2="69" y2="345" />
      <line x1="84" y1="358" x2="74" y2="364" />
      <line x1="216" y1="332" x2="226" y2="326" />
      <line x1="220" y1="345" x2="231" y2="345" />
      <line x1="216" y1="358" x2="226" y2="364" />

      {/* ── PUNTA INFERIOR — diamante agudo ── */}
      <path d="M 143 392 L 150 402 L 157 392 L 150 382 Z" fill={color} />

      {/* ── ORNAMENTOS BARRAS LATERALES ── */}
      {/* Pequeñas cruces en los brazos horizontales */}
      <line x1="105" y1="138" x2="105" y2="152" strokeWidth={strokeWidth * 0.8} />
      <line x1="125" y1="138" x2="125" y2="152" strokeWidth={strokeWidth * 0.8} />
      <line x1="175" y1="138" x2="175" y2="152" strokeWidth={strokeWidth * 0.8} />
      <line x1="195" y1="138" x2="195" y2="152" strokeWidth={strokeWidth * 0.8} />
    </svg>
  )
}

// -------------------------------------------------------------------
// SIGILO CARMESÍ — versión rojo para secciones oscuras
// -------------------------------------------------------------------
export function GothicSigilRed({ size = 400, className }: { size?: number; className?: string }) {
  return <GothicSigilMain size={size} color="#c0202b" strokeWidth={1.4} className={className} />
}

// -------------------------------------------------------------------
// SIGILO MINI — para cards y detalles decorativos (Cap 004 ECO)
// -------------------------------------------------------------------
export function GothicSigilMini({ size = 80, color = '#ededed', className }: SigilProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      width={size}
      height={(size * 160) / 120}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Cruz gótica compacta */}
      <line x1="60" y1="10" x2="60" y2="150" />
      <line x1="25" y1="55" x2="95" y2="55" />

      {/* Punta superior */}
      <path d="M 55 18 L 60 10 L 65 18 L 60 26 Z" fill={color} />
      {/* Punta inferior */}
      <path d="M 55 142 L 60 150 L 65 142 L 60 134 Z" fill={color} />
      {/* Puntas laterales */}
      <path d="M 29 50 L 25 55 L 29 60 L 33 55 Z" fill={color} />
      <path d="M 91 50 L 95 55 L 91 60 L 87 55 Z" fill={color} />

      {/* Nodo central */}
      <circle cx="60" cy="55" r="7" />
      <circle cx="60" cy="55" r="3" fill={color} />

      {/* Crescentes laterales mini */}
      <path d="M 22 42 Q 8 55 22 68" strokeWidth="1.5" />
      <path d="M 98 42 Q 112 55 98 68" strokeWidth="1.5" />

      {/* Espinas */}
      <line x1="55" y1="88" x2="47" y2="96" strokeWidth="1" />
      <line x1="65" y1="88" x2="73" y2="96" strokeWidth="1" />
      <line x1="55" y1="108" x2="47" y2="114" strokeWidth="1" />
      <line x1="65" y1="108" x2="73" y2="114" strokeWidth="1" />
    </svg>
  )
}

// -------------------------------------------------------------------
// CORONA DE ESPINAS — para halos y overlays de sección
// Basado en imagen 1 del usuario (corona de espinas circular)
// -------------------------------------------------------------------
export function ThornCrown({ size = 300, color = '#ededed', className }: SigilProps) {
  const cx = 150
  const cy = 150
  const r = 90

  // Generar espinas radiando hacia afuera
  const thorns = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24
    const rad = (angle * Math.PI) / 180
    const baseOffset = i % 3 === 0 ? 18 : i % 2 === 0 ? 10 : 6
    const x1 = cx + r * Math.cos(rad)
    const y1 = cy + r * Math.sin(rad)
    const x2 = cx + (r + baseOffset) * Math.cos(rad)
    const y2 = cy + (r + baseOffset) * Math.sin(rad)
    return { x1, y1, x2, y2 }
  })

  // Variaciones interiores
  const innerThorns = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 360) / 16 + 11.25
    const rad = (angle * Math.PI) / 180
    const rInner = r - 12
    const x1 = cx + rInner * Math.cos(rad)
    const y1 = cy + rInner * Math.sin(rad)
    const x2 = cx + (rInner - 8) * Math.cos(rad)
    const y2 = cy + (rInner - 8) * Math.sin(rad)
    return { x1, y1, x2, y2 }
  })

  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Anillo principal */}
      <circle cx={cx} cy={cy} r={r} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r - 6} strokeWidth="0.8" />

      {/* Espinas exteriores */}
      {thorns.map((t, i) => (
        <line key={`t${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
      ))}

      {/* Espinas interiores */}
      {innerThorns.map((t, i) => (
        <line key={`it${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth="0.8" />
      ))}
    </svg>
  )
}

