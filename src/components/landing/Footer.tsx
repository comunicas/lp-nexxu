import { Logo } from "@/components/ui-nexxu/Logo";

export function Footer() {
  return (
    <footer
      aria-labelledby="footer-title"
      className="bg-[var(--brand-dark)] px-[5%]"
      style={{ paddingTop: 60, paddingBottom: 40 }}
    >
      <h2 id="footer-title" className="sr-only">
        Rodapé
      </h2>
      <div className="max-w-[1040px] mx-auto">
        <div
          aria-hidden="true"
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(83,74,183,.6),rgba(24,95,165,.6),transparent)",
          }}
        />

        <div className="flex justify-between items-start flex-wrap gap-10 mb-12">
          <div className="max-w-[280px]">
            <Logo />
            <p className="text-[13px] text-white/55 mt-4 leading-relaxed">
              Consultoria de inovação operacional. Criatividade, processo e tecnologia trabalhando
              juntos para sua empresa parar de depender de você.
            </p>
          </div>

          <div className="flex flex-wrap" style={{ gap: 60 }}>
            <nav aria-label="Método">
              <h3 className="text-[11px] font-semibold tracking-widest text-white/45 uppercase mb-4">
                Método
              </h3>
              <a
                href="#metodo"
                className="block text-[13px] text-white/65 mb-2.5 rounded-md hover:text-white transition-colors focus-ring"
              >
                ORDEM™
              </a>
              <a
                href="#produtos"
                className="block text-[13px] text-white/65 mb-2.5 rounded-md hover:text-white transition-colors focus-ring"
              >
                Produtos
              </a>
              <a
                href="#diagnostico"
                className="block text-[13px] text-white/65 mb-2.5 rounded-md hover:text-white transition-colors focus-ring"
              >
                Índice
              </a>
            </nav>

            <div>
              <h3 className="text-[11px] font-semibold tracking-widest text-white/45 uppercase mb-4">
                Contato
              </h3>
              <a
                href="mailto:contato@nexxu.com.br"
                className="block text-[13px] text-white/65 mb-2.5 rounded-md hover:text-white transition-colors focus-ring"
              >
                contato@nexxu.com.br
              </a>
              <span className="block text-[13px] text-white/65 mb-2.5">São Paulo, BR</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-3 pt-6 border-t border-white/[0.06]">
          <span className="text-xs text-white/50">
            © {new Date().getFullYear()} Nexxu — Todos os direitos reservados.
          </span>
          <em className="text-[11px] text-white/45 not-italic">
            Criatividade. Processo. Tecnologia.
          </em>
        </div>
      </div>
    </footer>
  );
}
