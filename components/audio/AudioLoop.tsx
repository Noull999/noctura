'use client'

import { useEffect, useRef } from 'react'
import { Howl } from 'howler'

export function AudioLoop() {
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    if (soundRef.current) return

    soundRef.current = new Howl({
      src: ['/audio/ambient-loop.mp3'],
      loop: true,
      volume: 0.3,
      autoplay: true,
    })

    return () => {
      soundRef.current?.stop()
      soundRef.current = null
    }
  }, [])

  return null
}
