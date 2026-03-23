import { forwardRef, type SelectHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  fullWidth?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, disabled, fullWidth = false, ...props }, ref) => {
    return (
      <select
        ref={ref}
        disabled={disabled}
        className={cn(
          [
            "h-control-md appearance-none rounded-inline border border-borderStrong",
            "bg-surfaceRaised px-2 pr-8 text-sm text-text shadow-sm",
            "outline-none transition duration-fast ease-standard",
            "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "bg-[right_var(--space-3)_center] bg-no-repeat",
          ],
          fullWidth ? "w-full min-w-0" : "min-w-[16rem]",
          className,
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23636B74' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
          backgroundSize: "1rem 1rem",
        }}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";
