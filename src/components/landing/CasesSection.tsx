import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const CASES = [
  {
    stat: "-60%",
    label: "de horas do dono em operacional",
    context: "Agência B2B · 8 pessoas no time · 90 dias",
    quote:
      "Pela primeira vez em 4 anos, tirei um fim de semana sem checar o celular. Parecia impossível antes.",
  },
  {
    stat: "0",
    label: "crises apagadas pelo dono no último mês",
    context: "Varejo local · 3 funcionários · 4 meses",
    quote: "O time resolve. Eu aprovo o que importa. Era o que eu queria desde o começo.",
  },
  {
    stat: "3×",
    label: "capacidade sem caos proporcional",
    context: "Startup B2B · 12 pessoas · 6 meses",
    quote:
      "Triplicamos o time e a operação ficou mais simples. A IA que implementamos depois foi fácil — porque o processo já estava claro.",
  },
];

export function CasesSection() {
  return (
    <section className="bg-[var(--brand-page)] px-[5%] py-24">
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          label="RESULTADOS"
          labelColor="var(--brand-blue)"
          title="O que muda quando o processo vem antes da IA"
          description="Não prometemos milagre de faturamento nem magia de IA. Prometemos que sua empresa para de depender de você — com processo real."
        />

        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {CASES.map((c) => (
            <div
              key={c.label}
              className="p-8 rounded-[28px] bg-white border border-[rgba(93,202,165,0.2)]"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,.05)" }}
            >
              <div className="text-[52px] font-black text-[var(--brand-teal)] tracking-tight leading-none mb-1.5">
                {c.stat}
              </div>
              <div className="text-sm font-semibold text-[var(--brand-text)] mb-1">{c.label}</div>
              <div className="text-xs text-[var(--brand-subtle)] mb-5">{c.context}</div>
              <p className="text-sm text-[var(--brand-muted)] italic leading-relaxed border-l-2 border-[rgba(93,202,165,0.4)] pl-3.5 m-0">
                "{c.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
