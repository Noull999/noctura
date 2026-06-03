"use client";

import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";

function FigureCloud() {
  const COUNT = 1200;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      const angle = t * Math.PI * 14;
      const radius = 0.4 + Math.sin(t * Math.PI) * 1.1;
      const y = (t - 0.5) * 3.2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, []);

  const target = useMemo(() => positions.slice(), [positions]);
  const ref = useRef<THREE.Points>(null);
  const scrollRef = useRef(0);

  useFrame((state, dt) => {
    if (!ref.current) return;

    const d = Math.min(dt, 0.05);
    ref.current.rotation.y += d * 0.08;

    const scrollY = typeof window !== "undefined"
      ? window.scrollY / window.innerHeight : 0;
    scrollRef.current = THREE.MathUtils.lerp(scrollRef.current, scrollY, 0.05);
    const disperse = Math.max(0, scrollRef.current - 2.6) * 1.6;

    if (disperse > 0.001) {
      const geom = ref.current.geometry as THREE.BufferGeometry;
      const attr = geom.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const t = state.clock.elapsedTime;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i]     = target[i]     + Math.sin(t * 0.3 + i) * 0.5 * disperse;
        arr[i + 1] = target[i + 1] + Math.cos(t * 0.2 + i) * 0.5 * disperse;
        arr[i + 2] = target[i + 2] + Math.sin(t * 0.4 + i) * 0.5 * disperse;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c0202b"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

export function ParticleField() {
  return (
    <SceneCanvas
      camera={{ position: [0, 0, 3.2], fov: 55 }}
      dpr={1}
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      <color attach="background" args={["#000"]} />
      <fog attach="fog" args={["#000", 5, 12]} />
      <FigureCloud />
    </SceneCanvas>
  );
}
