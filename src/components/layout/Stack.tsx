import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type StackSpace = "xs" | "sm" | "md" | "lg" | "xl";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between";

type StackProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  space?: StackSpace;
  align?: StackAlign;
  justify?: StackJustify;
  reverse?: boolean;
  fullWidth?: boolean;
};

const gapMap: Record<StackSpace, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

const alignMap: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function Stack<T extends ElementType = "div">({
  as,
  children,
  className,
  space = "md",
  align = "stretch",
  justify = "start",
  reverse = false,
  fullWidth = false,
  ...props
}: StackProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StackProps<T>>) {
  const Component = as ?? "div";

  return (
    <Component
      data-slot="stack"
      className={cn(
        "flex min-w-0 flex-col",
        reverse && "flex-col-reverse",
        fullWidth && "w-full",
        gapMap[space],
        alignMap[align],
        justifyMap[justify],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
