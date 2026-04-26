import { Logo } from "@/components/ui-nexxu/Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--brand-dark)] px-[5%] pt-15 pb-10" style={{ paddingTop: 60, paddingBottom: 40 }}>
      <div className="max-w-[1040px] mx-auto">
        <div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(83,74,183,.6),rgba(24,95,165,.6),transparent)",
          }}
        />

        <div className="flex justify-between items-start flex-wrap gap-10 mb-12">
          <div className="max-w-[280px]">
            <Logo />
            <p className="text-[13px] text-white/40 mt-4 leading-relaxed">
              Consultoria de inovação operacional. Criatividade, processo e tecnologia trabalhando
              juntos para sua empresa parar de depender de você.
            </p>
          </div>

          <div className="flex gap-15 flex-wrap" style={{ gap: 60 }}>
            <div>
              <div className="text-[11px] font-semibold tracking-widest text-white/30 uppercase mb-4">
                Método
              </div>
              <a
                href="#metodo"
                className="block text-[13px] text-white/50 mb-2.5 hover:text-white/80 transition-colors"
              >
                ORDEM™
              </a>
              <a
                href="#produtos"
                className="block text-[13px] text-white/50 mb-2.5 hover:text-white/80 transition-colors"
              >
                Produtos
              </a>
              <a
                href="#diagnostico"
                className="block text-[13px] text-white/50 mb-2.5 hover:text-white/80 transition-colors"
              >
                Índice
              </a>
            </div>

            <div>
              <div className="text-[11px] font-semibold tracking-widest text-white/30 uppercase mb-4">
                Contato
              </div>
              <span className="block text-[13px] text-white/50 mb-2.5">contato@nexxu.com.br</span>
              <span className="block text-[13px] text-white/50 mb-2.5">São Paulo, BR</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-3 pt-6 border-t border-white/[0.06]">
          <span className="text-xs text-white/25">
            © {new Date().getFullYear()} Nexxu — Todos os direitos reservados.
          </span>
          <em className="text-[11px] text-white/20 not-italic">
            Criatividade. Processo. Tecnologia.
          </em>
        </div>
      </div>
    </footer>
  );
}
