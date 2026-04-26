import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DSSection({ id, title, description, children, className }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-24 py-14 border-b border-[rgba(83,74,183,0.1)]", className)}
    >
      <header className="mb-8">
        <p className="section-label text-[var(--brand-purple)] mb-2">Seção</p>
        <h2
          id={`${id}-heading`}
          className="font-display font-extrabold tracking-tight text-[var(--brand-text)] text-[clamp(28px,3.4vw,40px)] leading-tight"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-[15px] text-[var(--brand-muted)] leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
