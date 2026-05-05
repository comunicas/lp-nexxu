import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/ui-nexxu/Logo";
import { cn } from "@/lib/utils";
import { useAdminSession } from "@/hooks/use-admin-session";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin } = useAdminSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-[5%] h-16 flex items-center justify-between transition-all duration-300",
        scrolled
          ? "bg-[rgba(15,12,26,0.92)] backdrop-blur-lg border-b border-[rgba(83,74,183,0.2)]"
          : "bg-transparent",
      )}
    >
      <Link to="/" className="flex items-center" aria-label="Nexxu — início">
        <Logo />
      </Link>
      <div className="flex gap-3 items-center">
        <a
          href="#metodo"
          className="hidden sm:inline-block text-white/65 text-sm font-medium px-1 py-1.5 hover:text-white transition-colors"
        >
          Método
        </a>
        <a
          href="#solucoes"
          className="hidden sm:inline-block text-white/65 text-sm font-medium px-1 py-1.5 hover:text-white transition-colors"
        >
          Soluções
        </a>
        <a
          href="#produtos"
          className="hidden sm:inline-block text-white/65 text-sm font-medium px-1 py-1.5 hover:text-white transition-colors"
        >
          Produtos
        </a>
        <a
          href="#diagnostico"
          className="hidden sm:inline-block text-white/65 text-sm font-medium px-1 py-1.5 hover:text-white transition-colors"
        >
          Índice ORDEM™
        </a>
        <Link
          to="/fundadores"
          className="hidden sm:inline-block text-white/65 text-sm font-medium px-1 py-1.5 hover:text-white transition-colors"
        >
          Fundadores
        </Link>

        {/* CTA Admin — invisível para todos exceto admins autenticados */}
        {isAdmin && (
          <Link
            to="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white/85 border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40 hover:bg-white/10 transition-colors"
            aria-label="Acessar painel administrativo"
          >
            <span aria-hidden>🔒</span>
            Admin
          </Link>
        )}

        <Link
          to="/diagnostico"
          className="px-5 py-2.5 rounded-2xl bg-brand-gradient text-white text-sm font-semibold shadow-brand-glow-sm hover:opacity-90 transition-opacity"
        >
          Fazer diagnóstico →
        </Link>
      </div>
    </nav>
  );
}
