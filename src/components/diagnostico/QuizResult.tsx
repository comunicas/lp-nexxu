import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui-nexxu/Badge";
import { generateDiagnosticoPDF } from "@/lib/generateDiagnosticoPDF";
import { Button } from "@/components/ui-nexxu/Button";
import {
  getLevel,
  getOverallScore,
  getPillarBreakdown,
  MAX_SCORE,
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
  // Índice geral em % (0–100), média dos 5 pilares
  const score = getOverallScore(answers);
  const breakdown = getPillarBreakdown(answers);
  const level = getLevel(score);
  const pct = score;

  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [formError, setFormError] = useState("");

  // ===== Plano de ação personalizado (IA) =====
  type AIRecommendation = {
    title: string;
    description: string;
    pillar: Pillar;
    link?: string;
  };
  type AIData = {
    recommendations: AIRecommendation[];
    mentoriaCTA: { headline: string; justification: string; urgency: string };
    summary: string;
  };
  const [aiState, setAiState] = useState<"loading" | "ready" | "error">("loading");
  const [aiData, setAiData] = useState<AIData | null>(null);
  const aiFetched = useRef(false);

  useEffect(() => {
    if (aiFetched.current) return;
    aiFetched.current = true;

    const payload = {
      name: "Visitante",
      overallScore: score,
      maturityLevel: level.name,
      pillarScores: (Object.keys(breakdown) as Pillar[]).map((p) => ({
        pillar: p,
        score: breakdown[p],
        maxScore: 100,
      })),
    };

    fetch("/api/public/generate-recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: AIData) => {
        setAiData(data);
        setAiState("ready");
      })
      .catch((err) => {
        console.error("AI recommendations error:", err);
        setAiState("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setFormError("Nome e email são obrigatórios.");
      return;
    }
    setFormState("loading");
    setFormError("");

    try {
      const pdfBase64 = generateDiagnosticoPDF({
        name: formData.name,
        nivel: parseInt(level.num),
        nivelNome: level.name,
        nivelHeadline: level.headline,
        nivelDesc: level.desc,
        nivelRecommendation: level.recommendation,
        nivelRecommendedTier: level.recommendedTier,
        score,
        scoreMax: MAX_SCORE,
        scorePct: pct,
        pillarBreakdown: breakdown as Record<"O" | "R" | "D" | "E" | "M", number>,
      });

      const res = await fetch("/api/public/send-diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          nivel: parseInt(level.num),
          nivelNome: level.name,
          nivelHeadline: level.headline,
          nivelDesc: level.desc,
          nivelRecommendation: level.recommendation,
          nivelRecommendedTier: level.recommendedTier,
          score,
          scoreMax: MAX_SCORE,
          scorePct: pct,
          answers,
          pillarBreakdown: breakdown,
          aiRecommendations: aiData,
          pdfBase64,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Request failed");
      }
      setFormState("success");
    } catch (err) {
      console.error(err);
      setFormError("Algo deu errado. Tente novamente.");
      setFormState("error");
    }
  };

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
                {score}% DE MATURIDADE
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
            Cada pilar é a média de 2 respostas, normalizada de 0 a 100%.
          </p>
          <div className="space-y-4">
            {(Object.keys(breakdown) as Pillar[]).map((p) => {
              const value = breakdown[p];
              return (
                <div key={p}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-semibold text-[var(--brand-text)]">
                      <span className="grad-text font-extrabold mr-1.5">{p}</span>
                      {PILLAR_LABELS[p]}
                    </span>
                    <span className="text-[13px] font-semibold text-[var(--brand-muted)]">
                      {value}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[rgba(83,74,183,0.1)] overflow-hidden">
                    <div
                      className="h-full bg-brand-gradient transition-all duration-700"
                      style={{ width: `${value}%` }}
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

        {/* Plano de ação personalizado (IA) */}
        <div className="bg-white border border-[rgba(83,74,183,0.12)] rounded-3xl p-7 md:p-9 mb-8 shadow-[var(--shadow-card)]">
          <p className="section-label text-[var(--brand-purple)] mb-3">
            PLANO DE AÇÃO PERSONALIZADO
          </p>
          <h2 className="font-display font-extrabold text-[22px] md:text-[26px] text-[var(--brand-text)] leading-tight mb-2">
            O que fazer esta semana
          </h2>
          <p className="text-[14px] text-[var(--brand-muted)] mb-6 leading-relaxed">
            Recomendações geradas a partir dos seus 3 pilares mais fracos.
          </p>

          {aiState === "loading" && (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-[rgba(83,74,183,0.06)] animate-pulse"
                />
              ))}
              <p className="text-[12px] text-[var(--brand-muted)] text-center pt-2">
                Gerando seu plano com IA...
              </p>
            </div>
          )}

          {aiState === "ready" && aiData && (
            <>
              <div
                className="rounded-2xl p-5 mb-6 border border-[rgba(83,74,183,0.18)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(24,95,165,0.04), rgba(83,74,183,0.06))",
                }}
              >
                <p className="text-[15px] md:text-[16px] font-semibold text-[var(--brand-text)] leading-snug">
                  “{aiData.summary}”
                </p>
              </div>

              <div className="space-y-3 mb-7">
                {aiData.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[rgba(83,74,183,0.12)] bg-[var(--brand-page)] p-4 md:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grad-text font-extrabold text-[18px] leading-none mt-0.5">
                        {rec.pillar}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-[15px] md:text-[16px] text-[var(--brand-text)] leading-tight mb-1.5">
                          {rec.title}
                        </p>
                        <p className="text-[13px] md:text-[14px] text-[var(--brand-muted)] leading-relaxed">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-2xl p-6 md:p-7 border border-[rgba(83,74,183,0.3)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(24,95,165,0.07), rgba(83,74,183,0.12))",
                }}
              >
                <p className="section-label text-[var(--brand-purple)] mb-2">
                  MENTORIA ORDEM™
                </p>
                <h3 className="font-display font-extrabold text-[20px] md:text-[22px] text-[var(--brand-text)] leading-tight mb-3">
                  {aiData.mentoriaCTA.headline}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[var(--brand-text)]/80 leading-relaxed mb-4">
                  {aiData.mentoriaCTA.justification}
                </p>
                <p className="text-[12px] font-bold tracking-widest uppercase text-[var(--brand-purple)] mb-4">
                  {aiData.mentoriaCTA.urgency}
                </p>
                <Button
                  as="a"
                  variant="primary"
                  href="https://wa.me/5500000000000?text=Quero%20conhecer%20a%20Mentoria%20ORDEM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero a Mentoria ORDEM™ →
                </Button>
              </div>
            </>
          )}

          {aiState === "error" && (
            <p className="text-[13px] text-[var(--brand-muted)]">
              Não foi possível gerar o plano agora. Tente novamente em alguns
              segundos ou continue para receber o PDF completo abaixo.
            </p>
          )}
        </div>


          <div className="bg-white border border-[rgba(83,74,183,0.12)] rounded-3xl p-7 md:p-9 mb-8 shadow-[var(--shadow-card)]">
            <p className="section-label text-[var(--brand-purple)] mb-3">RECEBA O PDF COMPLETO</p>
            <h3 className="font-display font-extrabold text-[22px] md:text-[24px] text-[var(--brand-text)] leading-tight mb-2">
              Enviaremos o diagnóstico no seu email.
            </h3>
            <p className="text-[14px] text-[var(--brand-muted)] mb-6 leading-relaxed">
              Análise completa + recomendação de produto + próximos passos. Sem spam.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl border border-[rgba(83,74,183,0.2)] text-[var(--brand-text)] text-[14px] outline-none focus:border-[var(--brand-purple)] transition-colors bg-[var(--brand-page)]"
              />
              <input
                type="email"
                placeholder="Seu email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl border border-[rgba(83,74,183,0.2)] text-[var(--brand-text)] text-[14px] outline-none focus:border-[var(--brand-purple)] transition-colors bg-[var(--brand-page)]"
              />
              <input
                type="tel"
                placeholder="WhatsApp (opcional)"
                pattern="[\d\s\(\)\-\+]*"
                value={formData.whatsapp}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^\d\s()\-+]/g, "");
                  setFormData((p) => ({ ...p, whatsapp: val }));
                }}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(83,74,183,0.2)] text-[var(--brand-text)] text-[14px] outline-none focus:border-[var(--brand-purple)] transition-colors bg-[var(--brand-page)]"
              />
              {formError && (
                <p className="text-[13px] text-red-600 font-medium">{formError}</p>
              )}
              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full px-5 py-3.5 rounded-xl bg-brand-gradient text-white text-[14px] font-bold font-display transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {formState === "loading" ? "Enviando..." : "Receber diagnóstico completo →"}
              </button>
              <p className="text-[12px] text-[var(--brand-muted)] text-center pt-1">
                Gratuito. Sem spam. Usado apenas pela Nexxu.
              </p>
            </form>
          </div>
        ) : (
          <div className="bg-white border border-[rgba(93,202,165,0.4)] rounded-3xl p-8 md:p-10 mb-8 shadow-[var(--shadow-card)] text-center">
            <div className="w-14 h-14 rounded-full bg-[#5DCAA5] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h3 className="font-display font-extrabold text-[22px] text-[var(--brand-text)] mb-2">
              PDF enviado!
            </h3>
            <p className="text-[14px] text-[var(--brand-muted)] leading-relaxed">
              Verifique <span className="font-semibold text-[var(--brand-text)]">{formData.email}</span>.
              <br />
              Se não chegar em 5 minutos, confira o spam.
            </p>
          </div>
        )}

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
