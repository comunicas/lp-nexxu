import { useState } from "react";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "A Nexxu é consultoria de IA?",
    a: "Não. A Nexxu é consultoria de inovação operacional — e IA é uma das ferramentas, não o produto principal. A IA entra depois que o processo está claro. IA sem processo não resolve. Só adiciona uma camada de gambiarra mais cara. Essa é a diferença entre resultado real e hype de transformação digital.",
  },
  {
    q: "Qual a diferença entre a Nexxu e uma consultoria de IA?",
    a: "Consultoria de IA implementa tecnologia. A Nexxu organiza o processo antes de qualquer tecnologia entrar. IA em processo caótico não transforma — multiplica o erro. Por isso o nosso Método ORDEM™ coloca a IA no 4º passo, não no 1º. Quando o processo está claro, a IA funciona de verdade.",
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
    q: "Posso contratar a Nexxu só para implementar IA na minha empresa?",
    a: "Não. E vamos ser diretos: se o processo não estiver claro, implementar IA vai piorar o que já está ruim — só de forma mais cara e mais rápida. Primeiro a gente organiza. Depois, se fizer sentido, a IA entra como amplificador — não como solução.",
  },
  {
    q: "Preciso entender de tecnologia para trabalhar com a Nexxu?",
    a: "Não. Toda implementação de tecnologia e IA é feita junto com você e seu time. O objetivo é que a solução faça sentido para a sua realidade — não que você aprenda a usar ferramentas complexas.",
  },
  {
    q: "Como funciona a call de diagnóstico?",
    a: "É uma conversa de 15–30 minutos onde mapeamos: quantos processos precisam ser estruturados, o tamanho do time, se há demanda de IA e quanto tempo você tem para implementar. A partir daí, fica claro qual tier faz sentido. Sem pressão de venda.",
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
          open ? "max-h-[500px]" : "max-h-0",
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
    <section className="bg-white px-[5%] py-20">
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
