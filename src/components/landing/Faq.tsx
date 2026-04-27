import { useState } from "react";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "A Nexxu é consultoria de IA?",
    a: "Não exatamente. A Nexxu é consultoria de inovação operacional. A IA entra como ferramenta — mas sempre depois que o processo está claro. IA sem processo não resolve. Só adiciona uma camada de gambiarra mais cara.",
  },
  {
    q: "Minha empresa fatura menos de R$20k/mês. Posso contratar?",
    a: "O foco da Nexxu são empresas com R$20k+/mês porque nesses casos já existe operação rodando — e é exatamente onde processo faz diferença real. Abaixo disso, o problema geralmente ainda não é operacional.",
  },
  {
    q: "Quanto tempo leva para ver resultado?",
    a: "Os primeiros resultados aparecem entre 30 e 45 dias — quando os processos críticos estão mapeados e as rotinas começam a funcionar. Em 90 dias, a maioria dos clientes já parou de apagar incêndio diariamente.",
  },
  {
    q: "Preciso entender de tecnologia para trabalhar com a Nexxu?",
    a: "Não. Toda implementação de tecnologia e IA é feita junto com você e seu time. O objetivo é que a solução faça sentido para a sua realidade — não que você aprenda a usar ferramentas complexas.",
  },
  {
    q: "Como funciona a call de diagnóstico?",
    a: "São dois momentos distintos. Primeiro, o formulário online: 10 perguntas objetivas, ~3 minutos, resultado imediato com seu Índice ORDEM™. Depois, se fizer sentido, uma call de 15–30 minutos com a gente para aprofundar o diagnóstico e definir o caminho certo — sem pressão de venda.",
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border overflow-hidden transition-all duration-200",
        open
          ? "border-[rgba(83,74,183,0.3)] bg-[rgba(83,74,183,0.03)]"
          : "border-black/10 bg-white",
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 bg-transparent border-0 cursor-pointer flex justify-between items-center gap-4 text-left font-sans"
        aria-expanded={open}
      >
        <span className="text-[15px] font-bold text-[var(--brand-text)] leading-snug">{q}</span>
        <svg
          className={cn(
            "shrink-0 transition-transform duration-200",
            open ? "rotate-180 text-[var(--brand-purple)]" : "text-[var(--brand-subtle)]",
          )}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <polyline
            points="5,7 10,13 15,7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300",
          open ? "max-h-64" : "max-h-0",
        )}
      >
        <p className="px-6 pb-5 pt-0 text-sm text-[var(--brand-muted)] leading-relaxed m-0">{a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-[5%] py-20">
      <div className="max-w-[720px] mx-auto">
        <SectionHeader
          title="Perguntas frequentes"
          description="Sem enrolação."
          titleClassName="text-[clamp(28px,3.5vw,44px)]"
          descriptionClassName="text-base text-[var(--brand-subtle)]"
        />
        <div className="flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
