import { GrainCanvas } from "./GrainCanvas";
import { Scanlines } from "./Scanlines";
import { Vignette } from "./Vignette";

export function CRTOverlay() {
  return (
    <>
      <Vignette />
      <Scanlines opacity={0.08} />
      <GrainCanvas opacity={0.15} />
    </>
  );
}
