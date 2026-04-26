import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/ui-nexxu/Logo";

type Props = {
  current: number; // 0-based question index, or -1 for intro, QUESTIONS.length for result
  total: number;
};

export function QuizHeader({ current, total }: Props) {
  const pct =
    current < 0 ? 0 : current >= total ? 100 : Math.round(((current + 1) / total) * 100);

  return (
    <header className="sticky top-0 z-40 bg-[var(--brand-page)]/90 backdrop-blur-md border-b border-[rgba(83,74,183,0.12)]">
      <div className="max-w-[760px] mx-auto px-[5%] py-4 flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <div className="flex-1 max-w-[340px]">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-[var(--brand-muted)] mb-1.5">
            <span>
              {current < 0
                ? "Diagnóstico ORDEM™"
                : current >= total
                  ? "Resultado"
                  : `Pergunta ${current + 1} de ${total}`}
            </span>
            <span className="text-[var(--brand-purple)]">{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[rgba(83,74,183,0.12)] overflow-hidden">
            <div
              className="h-full bg-brand-gradient transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
