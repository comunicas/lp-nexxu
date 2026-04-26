import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui-nexxu/Badge";

export function Hero() {
  return (
    <section
      id="main-content"
      aria-labelledby="hero-headline"
      className="relative bg-[var(--brand-dark)] min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-[5%] pt-28 sm:pt-32 pb-24 sm:pb-32 text-center"
    >
      {/* Orbs decorativos — invisíveis para leitores de tela */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[15%] left-[10%] w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full animate-float-slow animate-glow-pulse"
        style={{ background: "radial-gradient(circle,rgba(24,95,165,.22) 0%,transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[15%] right-[8%] w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] rounded-full animate-float-medium animate-glow-pulse"
        style={{ background: "radial-gradient(circle,rgba(83,74,183,.18) 0%,transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[55%] left-[55%] w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] rounded-full animate-float-slow animate-glow-pulse"
        style={{ background: "radial-gradient(circle,rgba(93,202,165,.10) 0%,transparent 70%)" }}
      />

      <div className="relative z-[2] w-full max-w-[860px] mx-auto">
        {/* Badge */}
        <div className="mb-5 sm:mb-7 animate-fade-in animation-delay-100 flex justify-center">
          <Badge variant="hero">
            Para PMEs que já tentaram IA — e o caos continuou
          </Badge>
        </div>

        {/* Headline — 3 linhas curtas com impacto progressivo */}
        <h1
          id="hero-headline"
          className="grad-text-hero text-white font-extrabold leading-[1.05] tracking-[-0.01em] sm:tracking-tight mb-4 sm:mb-6 max-w-[820px] mx-auto text-balance animate-fade-up animation-delay-200 text-[32px] sm:text-[48px] md:text-[60px] lg:text-[74px]"
        >
          <span className="block">IA sem processo</span>
          <span className="block">não resolve.</span>
          <span className="block">Só escala o caos.</span>
        </h1>

        {/* Sub — 1 frase enxuta + reforço da promessa */}
        <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[19px] text-white/75 leading-relaxed mb-3 max-w-[560px] sm:max-w-[640px] mx-auto animate-fade-up animation-delay-400 text-pretty">
          A Nexxu organiza processo, rotina e dados{" "}
          <span className="text-white/95 font-semibold">antes da IA entrar</span>
          {" — "}em 90 dias sua empresa para de depender de você.
        </p>
        <p className="text-[11.5px] sm:text-[13px] text-white/60 mb-7 sm:mb-10 max-w-[560px] mx-auto animate-fade-up animation-delay-500">
          Método ORDEM™ · PMEs com R$20k+/mês
        </p>

        {/* CTAs — coluna no mobile, linha no sm+ */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center sm:flex-wrap mb-10 sm:mb-12 animate-fade-up animation-delay-600">
          <Link
            to="/diagnostico"
            aria-label="Iniciar diagnóstico gratuito do nível operacional"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl text-white text-[15px] sm:text-base bg-brand-gradient shadow-brand-glow hover:-translate-y-0.5 focus-ring"
          >
            <span>Descobrir meu nível</span>
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href="#metodo"
            aria-label="Ver detalhes do Método ORDEM"
            className="inline-flex items-center justify-center gap-2 font-display font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl text-[15px] sm:text-base text-white/80 border border-white/15 bg-white/[0.04] backdrop-blur-md hover:border-white/35 hover:bg-white/[0.08] transition-all focus-ring"
          >
            Ver o Método ORDEM™
          </a>
        </div>

        {/* Stats — grid 3 colunas em mobile pra evitar pilha enorme */}
        <ul
          aria-label="Diferenciais da Nexxu"
          className="list-none p-0 m-0 grid grid-cols-3 gap-x-2 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-6 justify-center items-start animate-fade-up animation-delay-700 max-w-[560px] sm:max-w-none mx-auto"
        >
          {[
            { num: "90 dias", lbl: "para sair do operacional" },
            { num: "IA no passo 4", lbl: "Processo vem antes. Sempre." },
            { num: "R$20k+/mês", lbl: "Para quem já tem operação" },
          ].map((s) => (
            <li
              key={s.num}
              aria-label={`${s.num}: ${s.lbl}`}
              className="flex flex-col items-center sm:max-w-[200px]"
            >
              <div className="grad-text-light text-[13px] sm:text-[20px] font-extrabold leading-tight text-center whitespace-nowrap">
                {s.num}
              </div>
              <div className="text-[10.5px] sm:text-[11px] text-white/65 mt-1.5 sm:mt-2 text-center leading-snug">
                {s.lbl}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll indicator */}
      <a
        href="#metodo"
        aria-label="Rolar para a seção Método ORDEM"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/55 hover:text-white/80 transition-colors animate-fade-in animation-delay-800 rounded-md focus-ring"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="animate-[scrollHint_1.8s_ease-in-out_infinite]"
        >
          <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="7" cy="6" r="1.4" fill="currentColor" />
        </svg>
      </a>

      <style>{`
        @keyframes scrollHint {
          0%, 100% { transform: translateY(0); opacity: .9; }
          50% { transform: translateY(4px); opacity: .4; }
        }
        @media (prefers-reduced-motion: reduce) {
          a[aria-label="Rolar para a seção Método ORDEM"] svg { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
