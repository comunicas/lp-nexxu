import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/ui-nexxu/Logo";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-[5%] h-16 flex items-center justify-between transition-all duration-300 animate-fade-in overflow-hidden",
        scrolled
          ? "bg-[rgba(15,12,26,0.92)] backdrop-blur-lg border-b border-[rgba(83,74,183,0.2)]"
          : "bg-[rgba(15,12,26,0.6)] backdrop-blur-sm",
      )}
    >
      <Link
        to="/"
        className="flex items-center rounded-md focus-ring"
        aria-label="Nexxu — ir para a página inicial"
      >
        <Logo />
      </Link>
      <div className="flex gap-3 items-center">
        <a
          href="#metodo"
          className="hidden sm:inline-block text-white/65 text-sm font-medium px-2 py-1.5 rounded-md hover:text-white transition-colors focus-ring"
        >
          Método
        </a>
        <a
          href="#produtos"
          className="hidden sm:inline-block text-white/65 text-sm font-medium px-2 py-1.5 rounded-md hover:text-white transition-colors focus-ring"
        >
          Produtos
        </a>
        <Link
          to="/diagnostico"
          aria-label="Falar com a Nexxu — iniciar diagnóstico"
          className="px-5 py-2.5 rounded-2xl bg-brand-gradient text-white text-sm font-semibold shadow-brand-glow-sm hover:opacity-90 transition-opacity focus-ring"
        >
          Falar com a Nexxu
        </Link>
      </div>
    </nav>
  );
}
