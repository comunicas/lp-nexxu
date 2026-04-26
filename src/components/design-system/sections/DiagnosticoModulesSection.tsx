import { useState } from "react";
import { QuizHeader } from "@/components/diagnostico/QuizHeader";
import { QuizIntro } from "@/components/diagnostico/QuizIntro";
import { QuizQuestionView } from "@/components/diagnostico/QuizQuestionView";
import { QuizResult } from "@/components/diagnostico/QuizResult";
import { QUESTIONS } from "@/components/diagnostico/quizData";
import { DSSection } from "../DSSection";
import { DSPreview } from "../DSPreview";

function QuestionDemo() {
  const [selected, setSelected] = useState<number | undefined>(2);
  return (
    <QuizQuestionView
      question={QUESTIONS[0]}
      selected={selected}
      onSelect={setSelected}
      onBack={() => {}}
      onNext={() => {}}
      canGoBack={false}
      isLast={false}
    />
  );
}

function ResultDemo() {
  // Mock answers — escolhe a opção 2 (score=2) em todas as 10 perguntas → score 20 (Reativo)
  const mockAnswers = QUESTIONS.map(() => 2);
  return <QuizResult answers={mockAnswers} onRestart={() => {}} />;
}

export function DiagnosticoModulesSection() {
  return (
    <DSSection
      id="modulos-diagnostico"
      title="Módulos do Diagnóstico"
      description="Componentes da rota /diagnostico, exibidos com dados de exemplo controlados."
    >
      <DSPreview
        name="QuizHeader"
        path="diagnostico/QuizHeader"
        description="Cabeçalho sticky com barra de progresso."
        isolate
      >
        <QuizHeader current={3} total={10} />
      </DSPreview>

      <DSPreview
        name="QuizIntro"
        path="diagnostico/QuizIntro"
        description="Tela de boas-vindas do quiz."
      >
        <QuizIntro onStart={() => {}} />
      </DSPreview>

      <DSPreview
        name="QuizQuestionView"
        path="diagnostico/QuizQuestionView"
        description="Pergunta interativa com seleção de opção."
      >
        <QuestionDemo />
      </DSPreview>

      <DSPreview
        name="QuizResult"
        path="diagnostico/QuizResult"
        description="Resultado com nível, breakdown por pilar e CTA."
      >
        <ResultDemo />
      </DSPreview>
    </DSSection>
  );
}
