import { cn } from "@/lib/utils";
import type { QuizQuestion } from "./quizData";

type Props = {
  question: QuizQuestion;
  selected: number | undefined;
  onSelect: (optionIndex: number) => void;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  isLast: boolean;
};

export function QuizQuestionView({
  question,
  selected,
  onSelect,
  onBack,
  onNext,
  canGoBack,
  isLast,
}: Props) {
  return (
    <section className="px-[5%] py-12 md:py-16">
      <div className="max-w-[680px] mx-auto">
        <p className="section-label text-[var(--brand-purple)] mb-3">
          Pilar {question.pillar} · {question.pillarName}
        </p>
        <h2 className="font-display font-extrabold tracking-tight text-[var(--brand-text)] text-[clamp(26px,4vw,38px)] leading-[1.15] mb-8">
          {question.question}
        </h2>

        <div className="space-y-3 mb-10">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={isSelected}
                className={cn(
                  "w-full text-left rounded-2xl p-5 border transition-all duration-200 flex items-start gap-4",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple)]/40",
                  isSelected
                    ? "border-[var(--brand-purple)] bg-[rgba(83,74,183,0.06)] shadow-[0_0_24px_rgba(83,74,183,0.15)]"
                    : "border-[rgba(83,74,183,0.18)] bg-white hover:border-[var(--brand-purple)]/60 hover:bg-[rgba(83,74,183,0.03)]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 grid place-items-center transition-colors",
                    isSelected
                      ? "border-[var(--brand-purple)] bg-[var(--brand-purple)]"
                      : "border-[rgba(83,74,183,0.35)]",
                  )}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <span
                  className={cn(
                    "text-[15px] leading-relaxed",
                    isSelected
                      ? "text-[var(--brand-text)] font-medium"
                      : "text-[var(--brand-text)]/85",
                  )}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className={cn(
              "px-5 py-3 rounded-xl text-sm font-semibold font-display transition-colors",
              canGoBack
                ? "text-[var(--brand-muted)] hover:text-[var(--brand-purple)] hover:bg-[rgba(83,74,183,0.05)]"
                : "text-[var(--brand-subtle)]/50 cursor-not-allowed",
            )}
          >
            ← Voltar
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={selected === undefined}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-7 py-3.5 rounded-2xl text-white text-[15px]",
              selected === undefined
                ? "bg-[rgba(83,74,183,0.3)] cursor-not-allowed"
                : "bg-brand-gradient shadow-brand-glow-sm hover:-translate-y-0.5",
            )}
          >
            {isLast ? "Ver meu resultado" : "Próxima"} →
          </button>
        </div>
      </div>
    </section>
  );
}
