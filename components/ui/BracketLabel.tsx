import { cn } from "@/lib/cn";

export function BracketLabel({
  children,
  className,
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em] whitespace-nowrap",
        highlight && "bg-blood text-void px-1",
        className,
      )}
    >
      {"{"}
      {children}
      {"}"}
    </span>
  );
}
