'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'

/**
 * Canvas que solo renderiza cuando está en pantalla.
 * - En vista  -> frameloop="always" (render continuo, fluido, sin tirones)
 * - Fuera     -> frameloop="never"  (el contexto WebGL deja de renderizar = cero GPU)
 *
 * Así solo hay 1 Canvas activo a la vez mientras se hace scroll.
 */
export function SceneCanvas({
  children,
  rootMargin = '120px',
  ...canvasProps
}: CanvasProps & { rootMargin?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas frameloop={inView ? 'always' : 'never'} {...canvasProps}>
        {children}
      </Canvas>
    </div>
  )
}
