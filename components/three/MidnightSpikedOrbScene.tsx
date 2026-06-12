'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

function MidnightSpikedOrb() {
  const ref = useRef<THREE.Group>(null)
  const gltf = useLoader(
    GLTFLoader,
    '/models/optimized/Meshy_AI_Midnight_Spiked_Orb_0602212519_texture.glb',
    (loader) => loader.setMeshoptDecoder(MeshoptDecoder),
  )

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += 0.45 * delta
  })

  return (
    <group ref={ref} scale={20} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export function MidnightSpikedOrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 10, 40], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={1}
      frameloop="always"
    >
      <ambientLight intensity={6} />
      <hemisphereLight args={['#aaaaaa', '#333333', 5]} />
      <directionalLight position={[10, 20, 10]} intensity={12} />
      <directionalLight position={[-10, 10, -5]} intensity={6} color="#c0202b" />
      <directionalLight position={[0, -10, 10]} intensity={4} />
      <Suspense fallback={null}>
        <MidnightSpikedOrb />
      </Suspense>
    </Canvas>
  )
}
