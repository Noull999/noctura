"use client";

import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "filled" | "outline" | "ghost";
}

export function RedButton({
  children,
  className,
  variant = "outline",
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={cn(
        "group relative inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] transition-colors",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-blood",
        variant === "filled" &&
          "bg-blood text-void hover:bg-pulse",
        variant === "outline" &&
          "border border-blood text-blood hover:bg-blood hover:text-void",
        variant === "ghost" && "text-ink hover:text-blood",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
