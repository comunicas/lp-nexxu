import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { QuizHeader } from "@/components/diagnostico/QuizHeader";
import { QuizIntro } from "@/components/diagnostico/QuizIntro";
import { QuizQuestionView } from "@/components/diagnostico/QuizQuestionView";
import { QuizResult } from "@/components/diagnostico/QuizResult";
import { QUESTIONS } from "@/components/diagnostico/quizData";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico ORDEM™ — Descubra seu nível operacional | Nexxu" },
      {
        name: "description",
        content:
          "10 perguntas rápidas para mapear o nível operacional da sua empresa nos 5 pilares ORDEM™ e descobrir o próximo passo recomendado.",
      },
      { property: "og:title", content: "Diagnóstico ORDEM™ — Nexxu" },
      {
        property: "og:description",
        content:
          "Descubra em 3 minutos se sua operação está no nível Caos, Reativo, Estruturado ou Autônoma.",
      },
    ],
  }),
  component: DiagnosticoPage,
});

type Stage =
  | { kind: "intro" }
  | { kind: "question"; index: number }
  | { kind: "result" };

function DiagnosticoPage() {
  const [stage, setStage] = useState<Stage>({ kind: "intro" });
  const [answers, setAnswers] = useState<number[]>([]);

  const total = QUESTIONS.length;

  const headerCurrent =
    stage.kind === "intro" ? -1 : stage.kind === "result" ? total : stage.index;

  const start = () => {
    setAnswers([]);
    setStage({ kind: "question", index: 0 });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (index: number, optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  };

  const goNext = (index: number) => {
    if (index + 1 < total) {
      setStage({ kind: "question", index: index + 1 });
    } else {
      setStage({ kind: "result" });
    }
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = (index: number) => {
    if (index > 0) {
      setStage({ kind: "question", index: index - 1 });
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const restart = () => {
    setAnswers([]);
    setStage({ kind: "intro" });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--brand-page)]">
      <QuizHeader current={headerCurrent} total={total} />

      {stage.kind === "intro" && <QuizIntro onStart={start} />}

      {stage.kind === "question" && (
        <QuizQuestionView
          question={QUESTIONS[stage.index]}
          selected={answers[stage.index]}
          onSelect={(opt) => handleSelect(stage.index, opt)}
          onBack={() => goBack(stage.index)}
          onNext={() => goNext(stage.index)}
          canGoBack={stage.index > 0}
          isLast={stage.index === total - 1}
        />
      )}

      {stage.kind === "result" && <QuizResult answers={answers} onRestart={restart} />}
    </div>
  );
}
