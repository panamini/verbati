import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";
type ClusterJustify =
  | "start"
  | "center"
  | "between"
  | "around"
  | "evenly"
  | "end";
type ClusterAlign = "start" | "center" | "end" | "stretch" | "baseline";

type ClusterProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  gap?: ClusterGap;
  justify?: ClusterJustify;
  align?: ClusterAlign;
  wrap?: boolean;
};

const gapMap: Record<ClusterGap, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

const justifyMap: Record<ClusterJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
  end: "justify-end",
};

const alignMap: Record<ClusterAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

export function Cluster<T extends ElementType = "div">({
  as,
  children,
  className,
  gap = "md",
  justify = "start",
  align = "center",
  wrap = true,
  ...props
}: ClusterProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ClusterProps<T>>) {
  const Component = as ?? "div";

  return (
    <Component
      data-slot="cluster"
      className={cn(
        "flex min-w-0",
        wrap ? "flex-wrap" : "flex-nowrap",
        gapMap[gap],
        justifyMap[justify],
        alignMap[align],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
