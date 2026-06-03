'use client'

import { useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { SceneCanvas } from './SceneCanvas'

function CrimsonSkull() {
  const ref = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, '/models/Meshy_AI_Crimson_Chrome_Skull_0603211752_texture.glb')

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.25 * delta
      ref.current.position.y = Math.sin(Date.now() * 0.0007) * 0.4
    }
  })

  return (
    <group ref={ref} scale={17} position={[-4, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export function CrimsonSkullScene() {
  return (
    <SceneCanvas
      camera={{ position: [0, 3, 26], fov: 65 }}
      style={{ background: 'transparent' }}
      dpr={1}
    >
      <ambientLight intensity={3.5} />
      <hemisphereLight args={['#aaaaaa', '#1a1a1a', 3]} />
      <directionalLight position={[10, 20, 10]} intensity={7} />
      <directionalLight position={[-10, 8, -5]} intensity={6} color="#c0202b" />
      <directionalLight position={[0, -8, 12]} intensity={3} color="#e63946" />
      <Suspense fallback={null}>
        <CrimsonSkull />
      </Suspense>
    </SceneCanvas>
  )
}
