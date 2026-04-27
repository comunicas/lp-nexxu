import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const PROMISES = [
  {
    stat: "30 dias",
    label: "você sai do achismo",
    detail: "Processos mapeados. Gargalos no papel. Pela primeira vez, uma decisão com dado.",
  },
  {
    stat: "60 dias",
    label: "o time opera. você respira.",
    detail: "Rotinas rodando. Time resolve. Você aprova só o que importa.",
  },
  {
    stat: "90 dias",
    label: "dono lidera. empresa roda.",
    detail: "Empresa funciona. Dono lidera. IA amplificando — não consertando.",
  },
];

export function CasesSection() {
  return (
    <section className="bg-[var(--brand-page)] px-[5%] py-24">
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          label="RESULTADOS"
          labelColor="var(--brand-blue)"
          title="Sua empresa para de depender de você."
          description="Não prometemos milagre de faturamento. Prometemos isso."
        />

        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {PROMISES.map((p) => (
            <div
              key={p.stat}
              className="relative p-8 rounded-[28px] bg-white border border-[rgba(93,202,165,0.2)] overflow-hidden"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,.05)" }}
            >
              {/* linha decorativa teal no topo */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]"
                style={{ background: "var(--brand-teal)" }}
                aria-hidden
              />
              <div className="text-[52px] font-black text-[var(--brand-teal)] tracking-tight leading-none mb-1.5">
                {p.stat}
              </div>
              <div className="text-sm font-semibold text-[var(--brand-text)] mb-3">{p.label}</div>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed border-l-2 border-[rgba(93,202,165,0.4)] pl-3.5 m-0">
                {p.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-7 py-3.5 rounded-2xl text-white text-[15px] bg-brand-gradient hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 28px rgba(93,202,165,.45)" }}
          >
            Descobrir meu nível operacional →
          </Link>
          <p className="text-[12px] text-[var(--brand-subtle)] mt-3">
            Gratuito. 3 minutos. Resultado imediato.
          </p>
        </div>
      </div>
    </section>
  );
}
