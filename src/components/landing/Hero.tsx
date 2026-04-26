import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui-nexxu/Badge";

export function Hero() {
  return (
    <section className="relative bg-[var(--brand-dark)] min-h-screen flex flex-col items-center justify-center overflow-hidden px-[5%] pt-32 pb-32 text-center">
      {/* Orbs decorativos animados */}
      <div
        className="pointer-events-none absolute top-[15%] left-[10%] w-[440px] h-[440px] rounded-full animate-float-slow animate-glow-pulse"
        style={{ background: "radial-gradient(circle,rgba(24,95,165,.22) 0%,transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[15%] right-[8%] w-[520px] h-[520px] rounded-full animate-float-medium animate-glow-pulse"
        style={{ background: "radial-gradient(circle,rgba(83,74,183,.18) 0%,transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-[55%] left-[55%] w-[320px] h-[320px] rounded-full animate-float-slow animate-glow-pulse"
        style={{ background: "radial-gradient(circle,rgba(93,202,165,.10) 0%,transparent 70%)" }}
      />

      <div className="relative z-[2] max-w-[860px] mx-auto">
        <div className="mb-7 animate-fade-in animation-delay-100">
          <Badge variant="hero">Consultoria de inovação operacional para PMEs</Badge>
        </div>

        <h1 className="grad-text-hero text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.08] tracking-tight mb-5 max-w-[820px] mx-auto text-balance animate-fade-up animation-delay-200">
          Você não tem
          <br />
          problema de esforço.
          <br />
          <span className="block mt-1">Tem problema de processo.</span>
        </h1>

        <p className="text-[clamp(15px,1.5vw,18px)] text-white/65 leading-relaxed mb-10 max-w-[620px] mx-auto animate-fade-up animation-delay-400">
          Sua empresa não para de crescer por falta de esforço.
          <br className="hidden sm:block" />
          Para porque processo, rotina e dados nunca foram estruturados.
          <br />
          <span className="block mt-2 text-white/75">
            Em 90 dias, o Método ORDEM™ muda isso — sem hype de IA, sem PowerPoint bonito.
          </span>
        </p>

        <div className="flex gap-3 justify-center flex-wrap mb-12 animate-fade-up animation-delay-500">
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-8 py-4 rounded-2xl text-white text-base bg-brand-gradient shadow-brand-glow hover:-translate-y-0.5"
          >
            Descobrir meu nível operacional →
          </Link>
          <a
            href="#metodo"
            className="inline-flex items-center justify-center gap-2 font-display font-semibold px-8 py-4 rounded-2xl text-base text-white/80 border border-white/15 bg-white/[0.04] backdrop-blur-md hover:border-white/35 hover:bg-white/[0.08] transition-all"
          >
            Ver o Método ORDEM™
          </a>
        </div>

        <div className="flex gap-x-10 gap-y-6 justify-center flex-wrap animate-fade-up animation-delay-700">
          {[
            { num: "90 dias", lbl: "para parar de ser o gargalo da sua própria empresa" },
            { num: "5 pilares", lbl: "Organização · Rotinas · Dados · IA · Maturidade" },
            { num: "Processo 1°", lbl: "IA só entra depois do processo estar claro. Sempre." },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className="grad-text-light text-[20px] font-extrabold leading-none">{s.num}</div>
              <div className="text-[11px] text-white/50 mt-2 max-w-[160px] text-center leading-snug">
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#metodo"
        aria-label="Rolar para o método"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/55 hover:text-white/80 transition-colors animate-fade-in animation-delay-800"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          aria-hidden
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
      `}</style>
    </section>
  );
}
