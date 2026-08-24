# {NÓCTURA} — RITO Y CÓDIGO

Experiencia web 3D inmersiva, scrolleable como un ritual: cinco capítulos (Origen, Cuerpo, Vestigios, Manifiesto, Códice), cada uno con su propia escena WebGL, tipografía y ritmo de animación.

**Live:** [noctura-wheat.vercel.app](https://noctura-wheat.vercel.app)

![Preview](https://noctura-wheat.vercel.app/opengraph-image)

## Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-r184-000000?logo=three.js&logoColor=white) ![React Three Fiber](https://img.shields.io/badge/R3F-9-black) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

## Qué tiene

- **5 escenas 3D distintas** (`components/three/`): modelos GLB generados con IA (calavera, caja torácica, ojo de hierro, muñeca demoníaca, orbe con púas), optimizados con meshopt + texturas WebP (167MB → 30MB) para que carguen razonable en la web.
- **Motor de efectos propio** (`components/effects/`): lluvia ASCII disparada por `IntersectionObserver` (no por scroll-percentage), modo "hora sombría" que cambia la paleta automáticamente entre las 23h-4h locales, cursor con goteo, glitch text, marquees con velocidad progresiva por capítulo, reloj en números romanos en vivo.
- **CRT look** (`components/crt/`): scanlines, viñeta, grano animado en canvas — estética de monitor viejo sobre contenido moderno.
- **Audio ambiental** con Web Audio API generado en sintético (sin archivos de sonido), sonidos de hover/click condicionados a que el usuario active el audio.
- **Smooth scroll** con Lenis + carga inicial con loading screen custom.
- **Open Graph dinámico**: la imagen de preview se genera en runtime con `next/og` (`app/opengraph-image.tsx`).
- **Analytics propio**: tracking de pageviews/clicks vía [Gloubal Panel](https://github.com/Noull999/admingloubal).

## Estructura

```
app/                layout, page, metadata, OG image, providers (Lenis)
components/
  sections/         los 5 capítulos + footer
  three/            escenas WebGL individuales
  effects/          ASCII rain, glitch, marquee, modo nocturno, etc
  crt/              scanlines, viñeta, grano
  header/           header sticky con navegación
  intro/            loading screen
  audio/            loop ambiental
```

## Deploy

Vercel, deploy automático desde `master`.
