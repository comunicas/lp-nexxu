import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  path: string;
  description?: string;
  background?: "page" | "white" | "dark";
  /** Use when the inner component has fixed/sticky positioning (e.g. Nav, QuizHeader). */
  isolate?: boolean;
  children: ReactNode;
};

const bgClass = {
  page: "bg-[var(--brand-page)]",
  white: "bg-white",
  dark: "bg-[var(--brand-dark)]",
} as const;

export function DSPreview({
  name,
  path,
  description,
  background = "page",
  isolate = false,
  children,
}: Props) {
  return (
    <article className="mb-10 rounded-3xl border border-[rgba(83,74,183,0.15)] overflow-hidden bg-white shadow-[var(--shadow-card)]">
      <header className="px-6 py-4 flex items-start justify-between gap-4 border-b border-[rgba(83,74,183,0.1)] bg-white">
        <div>
          <h3 className="font-display font-bold text-[17px] text-[var(--brand-text)]">{name}</h3>
          {description && (
            <p className="text-[13px] text-[var(--brand-muted)] mt-0.5">{description}</p>
          )}
        </div>
        <code className="text-[11px] font-mono text-[var(--brand-purple)] bg-[rgba(83,74,183,0.08)] px-2 py-1 rounded-md whitespace-nowrap">
          {path}
        </code>
      </header>
      <div
        className={cn(
          "relative overflow-hidden",
          bgClass[background],
          isolate && "isolate [&_.fixed]:!absolute [&_.sticky]:!relative",
        )}
      >
        {children}
      </div>
    </article>
  );
}
