import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const PROMISES = [
  {
    icon: "🗓️",
    stat: "30 dias",
    label: "para saber onde está o problema de verdade",
    detail:
      "Mapa de processos completo. Gargalos identificados. Pela primeira vez, você para de operar no achismo.",
  },
  {
    icon: "🔁",
    stat: "60 dias",
    label: "para o time operar sem depender de você",
    detail:
      "Rotinas documentadas e ativas. O time resolve. Você aprova só o que importa.",
  },
  {
    icon: "📈",
    stat: "90 dias",
    label: "para a empresa funcionar sem você no centro",
    detail:
      "Decisões com dado. Processos rodando. Dono lidera — não opera. IA amplificando o que já funciona.",
  },
];

export function CasesSection() {
  return (
    <section className="bg-[var(--brand-page)] px-[5%] py-24">
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          label="RESULTADOS"
          labelColor="var(--brand-blue)"
          title="O que muda de verdade"
          description="Não prometemos milagre de faturamento. Prometemos que sua empresa para de depender de você para funcionar."
        />

        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {PROMISES.map((p) => (
            <div
              key={p.stat}
              className="p-8 rounded-[28px] bg-white border border-[rgba(93,202,165,0.2)]"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,.05)" }}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
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
      </div>
    </section>
  );
}
