import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const CASES = [
  {
    stat: "-60%",
    label: "de horas do dono em operacional",
    context: "Agência B2B · 8 pessoas no time · 90 dias",
    quote:
      "Pela primeira vez em 4 anos tirei um fim de semana sem checar o celular. Parecia impossível antes do ORDEM™.",
  },
  {
    stat: "0",
    label: "crises apagadas pelo dono no último mês",
    context: "Varejo local · 3 funcionários · 4 meses",
    quote:
      "O time resolve. Eu aprovo só o que importa. Era exatamente o que eu precisava — e levou 90 dias.",
  },
  {
    stat: "3×",
    label: "capacidade sem caos proporcional",
    context: "Startup B2B · 12 pessoas · 6 meses",
    quote:
      "Quando a IA entrou, o processo já estava claro. Aí funcionou de verdade. Sem o processo antes, teria sido mais uma ferramenta jogada fora.",
  },
];

export function CasesSection() {
  return (
    <section
      aria-labelledby="cases-title"
      className="bg-[var(--brand-page)] px-[5%] py-24"
    >
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          titleId="cases-title"
          label="RESULTADOS"
          labelColor="var(--brand-blue)"
          title="O que muda quando processo vem antes da IA"
          description="Não prometemos milagre de faturamento. Prometemos que sua empresa para de depender de você — com processo real, entregáveis tangíveis e IA apenas quando vale a pena."
        />

        <ul
          aria-label="Casos de clientes"
          className="list-none p-0 m-0 grid gap-5 grid-cols-1 md:grid-cols-3"
        >
          {CASES.map((c, i) => (
            <li key={c.label}>
              <article
                aria-labelledby={`case-${i}-stat case-${i}-label`}
                className="h-full p-8 rounded-[28px] bg-white border border-[rgba(93,202,165,0.2)] transition-all duration-300 hover:shadow-[0_4px_32px_rgba(93,202,165,0.15)] hover:-translate-y-0.5"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,.05)" }}
              >
                <div
                  id={`case-${i}-stat`}
                  className="text-[52px] font-black text-[var(--brand-teal)] tracking-tight leading-none mb-1.5"
                >
                  {c.stat}
                </div>
                <div
                  id={`case-${i}-label`}
                  className="text-sm font-semibold text-[var(--brand-text)] mb-1"
                >
                  {c.label}
                </div>
                <div className="text-xs text-[var(--brand-subtle)] mb-5">{c.context}</div>
                <blockquote className="m-0">
                  <p className="text-sm text-[var(--brand-muted)] italic leading-relaxed border-l-2 border-[rgba(93,202,165,0.4)] pl-3.5 m-0">
                    "{c.quote}"
                  </p>
                  <cite className="sr-only">{c.context}</cite>
                </blockquote>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
