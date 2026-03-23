import { useThemeSystem } from "@/app/providers/ThemeProvider";
import { cn } from "@/lib/cn";

export function ThemeSwitch({ className }: { className?: string }) {
  const { dark, toggleTheme } = useThemeSystem();

  return (
    <button
      type="button"
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-control-md items-center gap-1 rounded-pill border border-border bg-surfaceRaised px-1 text-sm shadow-sm transition duration-fast ease-standard",
        "hover:-translate-y-px hover:bg-surfaceMuted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className,
      )}
      style={
        {
          "--switch-track-h": "calc(var(--control-sm) - 10px)",
          "--switch-track-w": "calc((var(--control-sm) - 10px) * 1.73)",
          "--switch-thumb-size": "calc((var(--control-sm) - 10px) - 6px)",
          "--switch-thumb-offset": "2px",
          "--switch-thumb-travel": "calc(((var(--control-sm) - 10px) * 1.73) - ((var(--control-sm) - 10px) - 6px) - 4px)",
        } as React.CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="relative shrink-0 rounded-pill border border-border bg-surface"
        style={
          {
            width: "var(--switch-track-w)",
            height: "var(--switch-track-h)",
          } as React.CSSProperties
        }
      >
        <span
          className={cn(
            "absolute rounded-full bg-accent transition duration-fast ease-standard",
            dark ? "translate-x-[var(--switch-thumb-travel)]" : "translate-x-0",
          )}
          style={
            {
              left: "var(--switch-thumb-offset)",
              top: "var(--switch-thumb-offset)",
              width: "var(--switch-thumb-size)",
              height: "var(--switch-thumb-size)",
            } as React.CSSProperties
          }
        />
      </span>

      <span className="min-w-[4ch] font-semibold text-textMuted">
        {dark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
