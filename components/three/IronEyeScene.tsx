'use client'

import { useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { SceneCanvas } from './SceneCanvas'

function IronEye() {
  const ref = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, '/models/Meshy_AI_The_Iron_Eye_0602205245_texture.glb')

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += 0.5 * Math.min(delta, 0.05)
  })

  return (
    <group ref={ref} scale={26} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export function IronEyeScene() {
  return (
    <SceneCanvas
      camera={{ position: [0, 10, 40], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={1}
    >
      <ambientLight intensity={6} />
      <hemisphereLight args={['#aaaaaa', '#333333', 5]} />
      <directionalLight position={[10, 20, 10]} intensity={12} />
      <directionalLight position={[-10, 10, -5]} intensity={6} color="#c0202b" />
      <directionalLight position={[0, -10, 10]} intensity={4} />
      <Suspense fallback={null}>
        <IronEye />
      </Suspense>
    </SceneCanvas>
  )
}
