import { cn } from "@/lib/cn";

export function CoordsTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] text-bone",
        className,
      )}
    >
      41,4693° S / 72,9424° O
    </span>
  );
}
