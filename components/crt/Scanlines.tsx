export function Scanlines({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 crt-scanlines"
      style={{ opacity }}
    />
  );
}
