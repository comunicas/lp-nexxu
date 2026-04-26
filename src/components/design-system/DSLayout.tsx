import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/ui-nexxu/Logo";

const NAV_ITEMS = [
  { id: "brand", label: "Brand" },
  { id: "cores", label: "Cores" },
  { id: "tipografia", label: "Tipografia" },
  { id: "gradientes", label: "Gradientes & Sombras" },
  { id: "logo", label: "Logo" },
  { id: "primitivos", label: "Primitivos" },
  { id: "modulos-landing", label: "Módulos da Landing" },
  { id: "modulos-diagnostico", label: "Módulos do Diagnóstico" },
];

export function DSLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--brand-page)] text-[var(--brand-text)]">
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[rgba(83,74,183,0.12)]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden sm:inline-block text-xs font-bold tracking-widest uppercase text-[var(--brand-purple)] border-l border-[rgba(83,74,183,0.2)] pl-4">
              Design System
            </span>
          </div>
          <Link
            to="/"
            className="text-sm font-semibold text-[var(--brand-muted)] hover:text-[var(--brand-purple)] transition-colors"
          >
            ← Voltar para o site
          </Link>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block py-10">
          <nav
            aria-label="Design system"
            className="sticky top-24 space-y-1"
          >
            <p className="section-label text-[var(--brand-subtle)] mb-3 px-3">Navegação</p>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--brand-muted)] hover:text-[var(--brand-purple)] hover:bg-[rgba(83,74,183,0.06)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="py-10 min-w-0">{children}</main>
      </div>

      <footer className="border-t border-[rgba(83,74,183,0.12)] py-8 text-center text-xs text-[var(--brand-subtle)]">
        Nexxu Design System — documentação viva dos componentes em produção
      </footer>
    </div>
  );
}
