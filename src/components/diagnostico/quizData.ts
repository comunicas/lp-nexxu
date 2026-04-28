// Quiz ORDEM™ — 10 afirmações em escala Likert 1–5
// Cada resposta vale de 1 (Discordo totalmente) a 5 (Concordo totalmente).
// Score por pilar: soma das 2 respostas (mín 2, máx 10) → percentual = ((soma − 2) / 8) × 100.
// Índice geral: média dos 5 pilares (0–100%).

export type Pillar = "O" | "R" | "D" | "E" | "M";

export type QuizOption = {
  label: string;
  score: 1 | 2 | 3 | 4 | 5;
};

export type QuizQuestion = {
  id: number;
  pillar: Pillar;
  pillarName: string;
  question: string;
  options: QuizOption[];
};

// Escala Likert única — usada em todas as 10 perguntas
const LIKERT_OPTIONS: QuizOption[] = [
  { label: "Discordo totalmente", score: 1 },
  { label: "Discordo", score: 2 },
  { label: "Neutro", score: 3 },
  { label: "Concordo", score: 4 },
  { label: "Concordo totalmente", score: 5 },
];

const mk = (
  id: number,
  pillar: Pillar,
  pillarName: string,
  question: string,
): QuizQuestion => ({
  id,
  pillar,
  pillarName,
  question,
  options: LIKERT_OPTIONS.map((o) => ({ ...o })),
});

export const QUESTIONS: QuizQuestion[] = [
  // O — Organização
  mk(1, "O", "Organização", "Os processos críticos da minha empresa estão mapeados e documentados."),
  mk(2, "O", "Organização", "Identificamos e priorizamos gargalos operacionais de forma sistemática."),
  // R — Rotinas
  mk(3, "R", "Rotinas", "Realizamos reuniões de gestão com pauta definida e decisões registradas."),
  mk(4, "R", "Rotinas", "Delego responsabilidades com padrão claro de entrega e acompanhamento."),
  // D — Dados
  mk(5, "D", "Dados", "Acompanho indicadores-chave (KPIs) do negócio regularmente."),
  mk(6, "D", "Dados", "Minhas decisões são baseadas em dados concretos, não apenas em intuição."),
  // E — Eficiência Inteligente
  mk(7, "E", "Eficiência Inteligente", "Utilizo ferramentas de IA no meu dia a dia para aumentar a produtividade."),
  mk(8, "E", "Eficiência Inteligente", "Já implementamos automações em processos-chave da empresa."),
  // M — Maturidade Operacional
  mk(9, "M", "Maturidade Operacional", "O negócio funciona bem mesmo quando não estou presente no operacional."),
  mk(10, "M", "Maturidade Operacional", "A empresa consegue crescer sem aumentar proporcionalmente o caos e a sobrecarga."),
];

// Índice geral é em pontos percentuais (0–100). Mantemos o nome MAX_SCORE para
// compatibilidade com componentes/payload existentes.
export const MAX_SCORE = 100;

export type LevelKey = "caos" | "organizada" | "inteligente" | "autonoma";

export type LevelInfo = {
  key: LevelKey;
  num: string;
  name: string;
  range: [number, number]; // em % (0–100)
  headline: string;
  desc: string;
  recommendation: string;
  recommendedTier: string;
  border: string;
  glow: string;
};

export const LEVELS: LevelInfo[] = [
  {
    key: "caos",
    num: "01",
    name: "Caos",
    range: [0, 25],
    headline: "Sua operação roda no improviso.",
    desc: "Cada dia é uma surpresa — boa ou ruim. Você está em todos os lugares ao mesmo tempo e nada acontece sem o seu dedo. Isso não é falha sua: é falta de estrutura.",
    recommendation:
      "Comece pelo Diagnóstico ORDEM™ aprofundado. Antes de implementar qualquer coisa, é preciso enxergar o todo.",
    recommendedTier: "T1 — Diagnóstico ORDEM™",
    border: "#EF9F27",
    glow: "rgba(239,159,39,0.35)",
  },
  {
    key: "organizada",
    num: "02",
    name: "Organizada",
    range: [26, 50],
    headline: "Existe estrutura — mas o time ainda depende de você.",
    desc: "Há ilhas de organização e algumas rotinas funcionando. Mas o que realmente importa ainda passa pelas suas mãos. Crescer hoje significa trabalhar mais — não melhor.",
    recommendation:
      "Mentoria ORDEM™ é o caminho: 90 dias estruturando rotinas, papéis e indicadores com acompanhamento semanal.",
    recommendedTier: "T2 — Mentoria ORDEM™",
    border: "rgba(175,169,236,0.55)",
    glow: "rgba(83,74,183,0.3)",
  },
  {
    key: "inteligente",
    num: "03",
    name: "Inteligente",
    range: [51, 75],
    headline: "Os processos existem — e o time os segue.",
    desc: "Você já tem uma operação que funciona com dado e rotina. Mas escalar ainda assusta: a estrutura não absorve crescimento sem fricção e a IA ainda não trabalha por você.",
    recommendation:
      "Implementação ORDEM™: estruturamos a operação completa com automações + IA para escalar sem aumentar o time.",
    recommendedTier: "T3 — Implementação ORDEM™",
    border: "rgba(24,95,165,0.6)",
    glow: "rgba(24,95,165,0.3)",
  },
  {
    key: "autonoma",
    num: "04",
    name: "Autônoma",
    range: [76, 100],
    headline: "Sua empresa funciona sem depender de você.",
    desc: "Decisões acontecem com dado. O dono lidera — não opera. Agora o desafio é manter esse nível enquanto a empresa cresce e novos times entram.",
    recommendation:
      "Serviço ORDEM™ contínuo: governança, otimização e evolução da stack para sustentar a autonomia em escala.",
    recommendedTier: "T4 — Serviço ORDEM™",
    border: "#5DCAA5",
    glow: "rgba(93,202,165,0.3)",
  },
];

// Recebe percentual (0–100) e retorna o nível correspondente.
export function getLevel(scorePct: number): LevelInfo {
  const clamped = Math.max(0, Math.min(100, scorePct));
  return (
    LEVELS.find((l) => clamped >= l.range[0] && clamped <= l.range[1]) ?? LEVELS[0]
  );
}

// Retorna percentual (0–100) por pilar — média ponderada das 2 respostas Likert.
export function getPillarBreakdown(answers: number[]): Record<Pillar, number> {
  const sums: Record<Pillar, number> = { O: 0, R: 0, D: 0, E: 0, M: 0 };
  const counts: Record<Pillar, number> = { O: 0, R: 0, D: 0, E: 0, M: 0 };

  QUESTIONS.forEach((q, i) => {
    const ans = answers[i];
    if (ans !== undefined) {
      sums[q.pillar] += q.options[ans].score;
      counts[q.pillar] += 1;
    }
  });

  const out: Record<Pillar, number> = { O: 0, R: 0, D: 0, E: 0, M: 0 };
  (Object.keys(sums) as Pillar[]).forEach((p) => {
    const c = counts[p];
    if (c > 0) {
      // soma mín = c (todos 1), soma máx = c*5 → normalizar para 0–100
      const min = c;
      const max = c * 5;
      out[p] = Math.round(((sums[p] - min) / (max - min)) * 100);
    }
  });
  return out;
}

// Índice geral (0–100): média dos percentuais dos 5 pilares.
export function getOverallScore(answers: number[]): number {
  const breakdown = getPillarBreakdown(answers);
  const values = Object.values(breakdown);
  const avg = values.reduce((s, v) => s + v, 0) / values.length;
  return Math.round(avg);
}
