'use client'

import { useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { SceneCanvas } from './SceneCanvas'

function ChromeDemonDoll() {
  const ref = useRef<THREE.Group>(null)
  const gltf = useLoader(
    GLTFLoader,
    '/models/optimized/Meshy_AI_Chrome_Demon_Doll_0602204809_texture.glb',
    (loader) => loader.setMeshoptDecoder(MeshoptDecoder),
  )

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += 0.5 * Math.min(delta, 0.05)
  })

  return (
    <group ref={ref} scale={18} position={[0, -1, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export function ChromeDemonDollScene() {
  return (
    <SceneCanvas
      camera={{ position: [0, 10, 40], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={1}
    >
      <ambientLight intensity={3} />
      <hemisphereLight args={['#888888', '#222222', 3]} />
      <directionalLight position={[10, 20, 10]} intensity={6} />
      <directionalLight position={[-10, 10, -5]} intensity={3} color="#c0202b" />
      <Suspense fallback={null}>
        <ChromeDemonDoll />
      </Suspense>
    </SceneCanvas>
  )
}
