import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "sm" | "md" | "lg" | "xl";
  gutter?: "default" | "mobile" | "tablet" | "desktop" | "none";
};

const sizeClassMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-[var(--container-lg)]",
  wide: "max-w-[var(--container-xl)]",
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
};

const gutterClassMap: Record<NonNullable<ContainerProps["gutter"]>, string> = {
  default: "px-[var(--gutter-mobile)] md:px-[var(--gutter-tablet)] xl:px-[var(--gutter-desktop)]",
  mobile: "px-[var(--gutter-mobile)]",
  tablet: "px-[var(--gutter-tablet)]",
  desktop: "px-[var(--gutter-desktop)]",
  none: "px-0",
};

export function Container({
  className,
  size = "default",
  gutter = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClassMap[size],
        gutterClassMap[gutter],
        className,
      )}
      {...props}
    />
  );
}
