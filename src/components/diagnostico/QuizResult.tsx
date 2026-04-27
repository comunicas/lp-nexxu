import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui-nexxu/Badge";
import { generateDiagnosticoPDF } from "@/lib/generateDiagnosticoPDF";
import { Button } from "@/components/ui-nexxu/Button";
import {
  getLevel,
  getPillarBreakdown,
  MAX_SCORE,
  QUESTIONS,
  type Pillar,
} from "./quizData";

type Props = {
  answers: number[];
  onRestart: () => void;
};

const PILLAR_LABELS: Record<Pillar, string> = {
  O: "Organização",
  R: "Rotinas",
  D: "Dados",
  E: "Eficiência IA",
  M: "Maturidade",
};

export function QuizResult({ answers, onRestart }: Props) {
  // Calcula score total
  const score = QUESTIONS.reduce((sum, q, i) => {
    const a = answers[i];
    return sum + (a !== undefined ? q.options[a].score : 0);
  }, 0);

  const level = getLevel(score);
  const breakdown = getPillarBreakdown(answers);
  const pct = Math.round((score / MAX_SCORE) * 100);

  return (
    <section className="px-[5%] py-12 md:py-20">
      <div className="max-w-[760px] mx-auto">
        {/* Card principal do nível */}
        <div
          className="rounded-[32px] p-8 md:p-12 mb-8 bg-[var(--brand-dark)] text-white relative overflow-hidden"
          style={{
            border: `1px solid ${level.border}`,
            boxShadow: `0 0 60px ${level.glow}`,
          }}
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: level.glow }}
          />
          <div className="relative">
            <Badge variant="hero" className="mb-6">
              SEU ÍNDICE ORDEM™
            </Badge>

            <div className="flex items-baseline gap-4 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest text-white/40">
                NÍVEL {level.num}
              </span>
              <span className="text-xs font-bold tracking-widest text-white/40">
                {score}/{MAX_SCORE} PONTOS
              </span>
            </div>

            <h1 className="font-display font-extrabold tracking-tight text-[clamp(40px,7vw,72px)] leading-[0.95] mb-5">
              <span className="grad-text-pale">{level.name}</span>
            </h1>

            <p className="text-[20px] md:text-[22px] font-semibold text-white/90 leading-snug mb-4">
              {level.headline}
            </p>
            <p className="text-[15px] md:text-[16px] text-white/60 leading-relaxed max-w-[560px]">
              {level.desc}
            </p>

            {/* Barra de progresso geral */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-white/50 mb-2">
                <span>Maturidade operacional</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-brand-gradient transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown por pilar */}
        <div className="bg-white border border-[rgba(83,74,183,0.12)] rounded-3xl p-7 md:p-9 mb-8 shadow-[var(--shadow-card)]">
          <h2 className="font-display font-extrabold text-[22px] text-[var(--brand-text)] mb-1">
            Detalhe por pilar ORDEM™
          </h2>
          <p className="text-sm text-[var(--brand-muted)] mb-6">
            Cada pilar vale até 8 pontos (2 perguntas).
          </p>
          <div className="space-y-4">
            {(Object.keys(breakdown) as Pillar[]).map((p) => {
              const value = breakdown[p];
              const pillarPct = Math.round((value / 8) * 100);
              return (
                <div key={p}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-semibold text-[var(--brand-text)]">
                      <span className="grad-text font-extrabold mr-1.5">{p}</span>
                      {PILLAR_LABELS[p]}
                    </span>
                    <span className="text-[13px] font-semibold text-[var(--brand-muted)]">
                      {value}/8
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[rgba(83,74,183,0.1)] overflow-hidden">
                    <div
                      className="h-full bg-brand-gradient transition-all duration-700"
                      style={{ width: `${pillarPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recomendação */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-8 border border-[rgba(83,74,183,0.25)]"
          style={{
            background: "linear-gradient(135deg, rgba(24,95,165,0.05), rgba(83,74,183,0.08))",
          }}
        >
          <p className="section-label text-[var(--brand-purple)] mb-3">PRÓXIMO PASSO</p>
          <h3 className="font-display font-extrabold text-[24px] md:text-[28px] text-[var(--brand-text)] leading-tight mb-4">
            {level.recommendedTier}
          </h3>
          <p className="text-[15px] md:text-[16px] text-[var(--brand-text)]/80 leading-relaxed mb-6">
            {level.recommendation}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              as="a"
              variant="primary"
              href="https://wa.me/5500000000000?text=Quero%20conversar%20sobre%20o%20diagn%C3%B3stico%20ORDEM"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a Nexxu →
            </Button>
            <Link
              to="/"
              className="px-5 py-3 rounded-xl text-sm font-semibold font-display text-[var(--brand-muted)] hover:text-[var(--brand-purple)] transition-colors"
            >
              Ver produtos
            </Link>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onRestart}
            className="text-sm font-semibold text-[var(--brand-muted)] hover:text-[var(--brand-purple)] transition-colors underline-offset-4 hover:underline"
          >
            Refazer diagnóstico
          </button>
        </div>
      </div>
    </section>
  );
}
