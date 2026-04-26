import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui-nexxu/Badge";

export function Hero() {
  return (
    <section className="relative bg-[var(--brand-dark)] min-h-screen flex flex-col items-center justify-center overflow-hidden px-[5%] pt-32 pb-20 text-center">
      <div
        className="pointer-events-none absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(24,95,165,.18) 0%,transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(83,74,183,.15) 0%,transparent 70%)" }}
      />

      <div className="relative z-[2] max-w-[780px] mx-auto">
        <div className="mb-8">
          <Badge variant="hero">Para donos que já tentaram de tudo — inclusive IA</Badge>
        </div>

        <h1 className="grad-text-hero text-[clamp(44px,6vw,80px)] font-extrabold leading-[1.05] tracking-tight mb-6">
          Você não tem
          <br />
          problema de esforço.
          <br />
          Tem problema de processo.
        </h1>

        <p className="text-[clamp(16px,2vw,20px)] text-white/60 leading-relaxed mb-11 max-w-[540px] mx-auto">
          Em 90 dias, você para de ser o gargalo da sua própria empresa. Processo primeiro. IA
          depois — quando vale a pena usar.
        </p>

        <div className="flex gap-3.5 justify-center flex-wrap mb-14">
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-8 py-4 rounded-2xl text-white text-base bg-brand-gradient shadow-brand-glow hover:-translate-y-0.5"
          >
            Descubra seu nível operacional →
          </Link>
          <a
            href="#metodo"
            className="inline-flex items-center justify-center gap-2 font-display font-semibold px-8 py-4 rounded-2xl text-base text-white/85 border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40 hover:bg-white/10 transition-all"
          >
            Ver o método
          </a>
        </div>

        <div className="flex gap-10 justify-center flex-wrap">
          {[
            { num: "90 dias", lbl: "é o que leva para parar de apagar incêndio" },
            { num: "0", lbl: "implementações de IA jogadas fora por falta de processo" },
            { num: "ORDEM™", lbl: "processo antes de IA. Sempre." },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className="grad-text-light text-[22px] font-extrabold">{s.num}</div>
              <div className="text-xs text-white/45 mt-1 max-w-[130px] text-center">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <span className="text-[11px] text-white tracking-widest">SCROLL</span>
        <div
          className="w-px h-8"
          style={{ background: "linear-gradient(180deg,rgba(255,255,255,.6),transparent)" }}
        />
      </div>
    </section>
  );
}
