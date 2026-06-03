import { cn } from "@/lib/cn";

export function ChapterIndex({
  n,
  className,
}: {
  n: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-display text-[10vw] leading-none text-ash select-none",
        className,
      )}
    >
      {n}
    </span>
  );
}
