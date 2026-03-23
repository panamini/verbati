import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const pillVariants = cva(
  [
    "inline-flex min-w-0 select-none items-center justify-center whitespace-nowrap",
    "rounded-pill border text-sm leading-sm transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/35 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: "border-border bg-surface text-textMuted",
        accent: "border-transparent bg-accentSoft text-text",
      },
      size: {
        sm: "h-[calc(var(--control-sm)-4px)] px-2",
        md: "h-[var(--control-sm)] px-2.5",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "sm",
    },
  },
);

export type PillProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof pillVariants>;

export function Pill({ className, tone, size, ...props }: PillProps) {
  return <span className={cn(pillVariants({ tone, size }), className)} {...props} />;
}
