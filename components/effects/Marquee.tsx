import { cn } from "@/lib/cn";
import { BracketLabel } from "@/components/ui/BracketLabel";

export interface MarqueeItem {
  label: string;
  index?: string;
  highlight?: boolean;
}

export function Marquee({
  items,
  className,
  duration = 40,
}: {
  items: MarqueeItem[];
  className?: string;
  duration?: number;
}) {
  const Track = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-4">
          {it.index && (
            <span className="font-mono text-[10px] tracking-[0.3em] text-bone">
              {it.index}
            </span>
          )}
          <BracketLabel highlight={it.highlight}>{it.label}</BracketLabel>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-ash/40 bg-tomb/80 py-3",
        className,
      )}
    >
      <div
        className="flex w-max animate-[marquee-x_var(--dur)_linear_infinite] marquee-track"
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {Track}
        {Track}
      </div>
    </div>
  );
}
