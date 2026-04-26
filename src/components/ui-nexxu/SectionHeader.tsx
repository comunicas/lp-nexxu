import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

type Props = {
  label?: string;
  labelColor?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

export function SectionHeader({
  label,
  labelColor,
  title,
  description,
  align = "center",
  titleClassName,
  descriptionClassName,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {label && (
        <div className="mb-3">
          <Badge variant="section-label" color={labelColor}>
            {label}
          </Badge>
        </div>
      )}
      <h2
        className={cn(
          "text-[clamp(32px,4vw,52px)] font-extrabold tracking-tight leading-tight m-0",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg text-[var(--brand-muted)] max-w-md leading-relaxed",
            align === "center" && "mx-auto",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
