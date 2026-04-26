import { Badge } from "@/components/ui-nexxu/Badge";
import { Button } from "@/components/ui-nexxu/Button";
import { CheckIcon } from "@/components/ui-nexxu/CheckIcon";

type Props = {
  onStart: () => void;
};

const HIGHLIGHTS = [
  "10 perguntas objetivas — leva ~3 minutos",
  "Avaliação dos 5 pilares ORDEM™ (Organização, Rotinas, Dados, Eficiência IA, Maturidade)",
  "Resultado imediato com seu Índice ORDEM™ e o próximo passo recomendado",
];

export function QuizIntro({ onStart }: Props) {
  return (
    <section className="px-[5%] py-16 md:py-24">
      <div className="max-w-[680px] mx-auto text-center">
        <Badge variant="gradient" className="mb-6">
          Diagnóstico Gratuito
        </Badge>

        <h1 className="font-display font-extrabold tracking-tight text-[var(--brand-text)] text-[clamp(36px,6vw,56px)] leading-[1.05] mb-5">
          Descubra em 3 minutos o{" "}
          <span className="grad-text">nível operacional</span> da sua empresa.
        </h1>

        <p className="text-[17px] md:text-[18px] text-[var(--brand-muted)] leading-relaxed mb-10 max-w-[560px] mx-auto">
          Responda 10 perguntas honestas sobre como sua operação funciona hoje. No fim, você
          recebe seu Índice ORDEM™ e a recomendação de qual caminho faz sentido começar.
        </p>

        <ul className="text-left space-y-3 mb-10 bg-white border border-[rgba(83,74,183,0.12)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]">
          {HIGHLIGHTS.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <CheckIcon />
              <span className="text-[15px] text-[var(--brand-text)] leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        <Button onClick={onStart} variant="primary">
          Começar diagnóstico →
        </Button>
        <p className="mt-4 text-xs text-[var(--brand-subtle)]">
          Sem cadastro. Sem pitch de venda. Só clareza.
        </p>
      </div>
    </section>
  );
}
