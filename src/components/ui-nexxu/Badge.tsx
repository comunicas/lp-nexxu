import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "hero" | "gradient" | "section-label" | "featured";
  color?: string;
  className?: string;
  children: ReactNode;
};

export function Badge({ variant = "gradient", color, className, children }: BadgeProps) {
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(83,74,183,0.4)] bg-[rgba(83,74,183,0.12)]",
          className,
        )}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]"
          style={{ boxShadow: "0 0 8px var(--brand-teal)" }}
        />
        <span className="text-xs text-white/70 font-medium tracking-wider">{children}</span>
      </div>
    );
  }

  if (variant === "section-label") {
    return (
      <p
        className={cn("section-label", className)}
        style={color ? { color } : undefined}
      >
        {children}
      </p>
    );
  }

  if (variant === "featured") {
    return (
      <span
        className={cn(
          "px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-brand-gradient whitespace-nowrap shadow-brand-glow-sm",
          className,
        )}
      >
        {children}
      </span>
    );
  }

  // gradient (default — used in welcome/lead screens)
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-brand-gradient text-white shadow-brand-glow-sm uppercase tracking-wider",
        className,
      )}
    >
      {children}
    </span>
  );
}
