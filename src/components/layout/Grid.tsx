import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type GridCols = 1 | 2 | 3 | 4;
type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
type GridAlign = "start" | "center" | "end" | "stretch";

type GridOwnProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  cols?: GridCols;
  gap?: GridGap;
  align?: GridAlign;
  dense?: boolean;
  autoFitMin?: "xs" | "sm" | "md" | "lg";
};

type GridProps<T extends ElementType = "div"> = GridOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GridOwnProps<T>>;

const colsMap: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 lg:grid-cols-2",
  3: "grid-cols-1 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
};

const gapMap: Record<GridGap, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

const alignMap: Record<GridAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const autoFitMinMap = {
  xs: "[grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]",
  sm: "[grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))]",
  md: "[grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]",
  lg: "[grid-template-columns:repeat(auto-fit,minmax(24rem,1fr))]",
} as const;

export function Grid<T extends ElementType = "div">({
  as,
  className,
  cols = 1,
  gap = "md",
  align = "stretch",
  dense = false,
  autoFitMin,
  ...props
}: GridProps<T>) {
  const Comp = (as ?? "div") as ElementType;

  return (
    <Comp
      data-slot="grid"
      className={cn(
        "grid min-w-0",
        gapMap[gap],
        alignMap[align],
        dense && "grid-flow-row-dense",
        autoFitMin ? autoFitMinMap[autoFitMin] : colsMap[cols],
        className,
      )}
      {...props}
    />
  );
}
