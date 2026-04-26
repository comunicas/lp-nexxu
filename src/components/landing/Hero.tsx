import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui-nexxu/Badge";

export function Hero() {
  return (
    <section className="relative bg-[var(--brand-dark)] min-h-screen flex flex-col items-center justify-center overflow-hidden px-[5%] pt-32 pb-32 text-center">
      <div
        className="pointer-events-none absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(24,95,165,.18) 0%,transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(83,74,183,.15) 0%,transparent 70%)" }}
      />

      <div className="relative z-[2] max-w-[860px] mx-auto">
        <div className="mb-7">
          <Badge variant="hero">Para donos que já tentaram de tudo — inclusive IA</Badge>
        </div>

        <h1 className="grad-text-hero text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.08] tracking-tight mb-5 max-w-[760px] mx-auto text-balance">
          Você não tem problema de esforço. Tem problema de processo.
        </h1>

        <p className="text-[clamp(15px,1.5vw,18px)] text-white/65 leading-relaxed mb-10 max-w-[560px] mx-auto">
          Em 90 dias, você para de ser o gargalo da sua própria empresa. Processo primeiro. IA
          depois — quando vale a pena usar.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mb-12">
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-7 py-3.5 rounded-2xl text-white text-[15px] bg-brand-gradient shadow-brand-glow hover:-translate-y-0.5"
          >
            Descubra seu nível operacional →
          </Link>
          <a
            href="#metodo"
            className="inline-flex items-center justify-center gap-2 font-display font-semibold px-7 py-3.5 rounded-2xl text-[15px] text-white/85 border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40 hover:bg-white/10 transition-all"
          >
            Ver o método
          </a>
        </div>

        <div className="flex gap-x-10 gap-y-6 justify-center flex-wrap">
          {[
            { num: "90 dias", lbl: "é o que leva para parar de apagar incêndio" },
            { num: "0", lbl: "implementações de IA jogadas fora por falta de processo" },
            { num: "ORDEM™", lbl: "processo antes de IA. Sempre." },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className="grad-text-light text-[20px] font-extrabold leading-none">{s.num}</div>
              <div className="text-[11px] text-white/50 mt-2 max-w-[140px] text-center leading-snug">
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#metodo"
        aria-label="Rolar para o método"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/55 hover:text-white/80 transition-colors"
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
