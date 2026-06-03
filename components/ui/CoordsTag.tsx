import { cn } from "@/lib/cn";

export function CoordsTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] text-bone",
        className,
      )}
    >
      33,4489° S / 70,6693° O
    </span>
  );
}
