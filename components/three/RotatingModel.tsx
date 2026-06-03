"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

interface RotatingModelProps {
  modelPath: string;
  scale?: number;
  rotationSpeed?: number;
  position?: [number, number, number];
}

function ModelContent({
  modelPath,
  scale = 20,
  rotationSpeed = 0.002,
}: Omit<RotatingModelProps, "position">) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(scale, scale, scale);

      groupRef.current?.clear();
      groupRef.current?.add(model);
      modelRef.current = model;
    });
  }, [modelPath, scale]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <>
      <ambientLight intensity={8} />
      <pointLight position={[10, 10, 10]} intensity={10} />
      <pointLight position={[-10, 5, 5]} intensity={9} />
      <pointLight position={[5, -5, 10]} intensity={8} />
      <group ref={groupRef} />
    </>
  );
}

export function RotatingModel({
  modelPath,
  scale = 20,
  rotationSpeed = 0.002,
  position = [0, 0, 0],
}: RotatingModelProps) {
  return (
    <Canvas
      camera={{ position, fov: 75 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ModelContent
        modelPath={modelPath}
        scale={scale}
        rotationSpeed={rotationSpeed}
      />
    </Canvas>
  );
}
