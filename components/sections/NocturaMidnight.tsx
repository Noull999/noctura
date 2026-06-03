"use client";

import { RotatingModel } from "@/components/three/RotatingModel";

export function NocturaMidnight() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-void">
      <div className="absolute inset-0 flex items-center justify-end pr-12">
        <div className="w-full h-full max-w-lg">
          <RotatingModel
            modelPath="/models/Meshy_AI_Midnight_Spiked_Orb_0602212519_texture.glb"
            scale={20}
            rotationSpeed={0.0012}
          />
        </div>
      </div>
    </section>
  );
}
