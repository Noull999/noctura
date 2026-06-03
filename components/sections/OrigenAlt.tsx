"use client";

import { RotatingModel } from "@/components/three/RotatingModel";

export function OrigenAlt() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-void">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-md">
          <RotatingModel
            modelPath="/models/Meshy_AI_Chrome_Demon_Doll_0602204809_texture.glb"
            scale={22}
            rotationSpeed={0.0018}
          />
        </div>
      </div>
    </section>
  );
}
