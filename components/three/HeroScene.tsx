'use client'

import { useRef, useEffect, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { SceneCanvas } from './SceneCanvas'

function TribalBracelet({ mousePosition, isMousePressed }: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>
  isMousePressed: React.MutableRefObject<boolean>
}) {
  const ref = useRef<THREE.Group>(null)
  const gltf = useLoader(
    GLTFLoader,
    '/models/optimized/meshy-model.glb',
    (loader) => loader.setMeshoptDecoder(MeshoptDecoder),
  )
  const autoRotationRef = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return
    const d = Math.min(delta, 0.05)
    if (isMousePressed.current) {
      ref.current.rotation.y = mousePosition.current.x * 6
      ref.current.rotation.x = mousePosition.current.y * 3
    } else {
      autoRotationRef.current += 0.5 * d
      ref.current.rotation.y = autoRotationRef.current
    }
  })

  return (
    <group ref={ref} scale={26} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export function HeroScene() {
  const mousePosition = useRef({ x: 0, y: 0 })
  const isMousePressed = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX / window.innerWidth - 0.5
      mousePosition.current.y = e.clientY / window.innerHeight - 0.5
    }
    const down = () => { isMousePressed.current = true }
    const up = () => { isMousePressed.current = false }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <SceneCanvas
      camera={{ position: [0, 10, 40], fov: 75 }}
      style={{ background: '#000' }}
      dpr={1}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={3} />
      <hemisphereLight args={['#888888', '#222222', 3]} />
      <directionalLight position={[10, 20, 10]} intensity={6} />
      <directionalLight position={[-10, 10, -5]} intensity={3} color="#c0202b" />
      <Suspense fallback={null}>
        <TribalBracelet mousePosition={mousePosition} isMousePressed={isMousePressed} />
      </Suspense>
    </SceneCanvas>
  )
}
