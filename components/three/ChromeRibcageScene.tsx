'use client'

import { useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { SceneCanvas } from './SceneCanvas'

function ChromeRibcage() {
  const ref = useRef<THREE.Group>(null)
  const gltf = useLoader(
    GLTFLoader,
    '/models/optimized/Meshy_AI_Chrome_Ribcage_0603162821_texture.glb',
    (loader) => loader.setMeshoptDecoder(MeshoptDecoder),
  )

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.3 * delta
      ref.current.position.y = Math.sin(Date.now() * 0.0008) * 0.5
    }
  })

  return (
    <group ref={ref} scale={17} position={[-7, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export function ChromeRibcageScene() {
  return (
    <SceneCanvas
      camera={{ position: [0, 4, 28], fov: 65 }}
      style={{ background: 'transparent' }}
      dpr={1}
    >
      <ambientLight intensity={4} />
      <hemisphereLight args={['#aaaaaa', '#222222', 3]} />
      <directionalLight position={[10, 20, 10]} intensity={8} />
      <directionalLight position={[-10, 10, -5]} intensity={5} color="#c0202b" />
      <directionalLight position={[0, -5, 10]} intensity={3} color="#e63946" />
      <Suspense fallback={null}>
        <ChromeRibcage />
      </Suspense>
    </SceneCanvas>
  )
}
