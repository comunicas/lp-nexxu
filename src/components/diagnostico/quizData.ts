// Quiz ORDEM™ — 10 perguntas (2 por pilar)
// Cada opção dá 0–4 pontos. Pontuação máxima: 40.

export type Pillar = "O" | "R" | "D" | "E" | "M";

export type QuizOption = {
  label: string;
  score: 0 | 1 | 2 | 3 | 4;
};

export type QuizQuestion = {
  id: number;
  pillar: Pillar;
  pillarName: string;
  question: string;
  options: QuizOption[];
};

export const QUESTIONS: QuizQuestion[] = [
  // O — Organização
  {
    id: 1,
    pillar: "O",
    pillarName: "Organização",
    question: "Quem responde quando algo dá errado na operação?",
    options: [
      { label: "Sempre eu — sou o último ponto de decisão", score: 0 },
      { label: "Eu, mas alguns gestores ajudam a apagar incêndio", score: 1 },
      { label: "Há responsáveis claros, mas dependem de mim para decidir", score: 2 },
      { label: "Cada área tem dono e autonomia para resolver", score: 4 },
    ],
  },
  {
    id: 2,
    pillar: "O",
    pillarName: "Organização",
    question: "Como está o organograma e a divisão de papéis hoje?",
    options: [
      { label: "Não temos — todo mundo faz um pouco de tudo", score: 0 },
      { label: "Existe na cabeça, mas não está documentado", score: 1 },
      { label: "Documentado, mas desatualizado ou pouco usado", score: 2 },
      { label: "Claro, atualizado e cada papel tem entregas definidas", score: 4 },
    ],
  },
  // R — Rotinas
  {
    id: 3,
    pillar: "R",
    pillarName: "Rotinas",
    question: "Os processos críticos da empresa estão documentados?",
    options: [
      { label: "Nada documentado — está tudo na cabeça das pessoas", score: 0 },
      { label: "Alguns POPs soltos, sem padrão", score: 1 },
      { label: "Maior parte documentada, mas pouco seguida", score: 2 },
      { label: "Documentados, vivos e revisados periodicamente", score: 4 },
    ],
  },
  {
    id: 4,
    pillar: "R",
    pillarName: "Rotinas",
    question: "Como você acompanha o que o time está executando?",
    options: [
      { label: "Acompanho perguntando — não há ritual fixo", score: 0 },
      { label: "Reuniões existem, mas sem agenda nem cadência", score: 1 },
      { label: "Temos rituais semanais, mas faltam indicadores claros", score: 2 },
      { label: "Rituais com pauta, KPIs e plano de ação documentado", score: 4 },
    ],
  },
  // D — Dados
  {
    id: 5,
    pillar: "D",
    pillarName: "Dados",
    question: "Você sabe qual é seu CAC, LTV e margem por produto?",
    options: [
      { label: "Não — opero pelo extrato bancário", score: 0 },
      { label: "Tenho ideia, mas não está calculado", score: 1 },
      { label: "Sei alguns, outros estimo", score: 2 },
      { label: "Sim, com fonte única e revisão mensal", score: 4 },
    ],
  },
  {
    id: 6,
    pillar: "D",
    pillarName: "Dados",
    question: "Como as decisões importantes são tomadas hoje?",
    options: [
      { label: "Por feeling — minha intuição decide", score: 0 },
      { label: "Mistura de feeling com planilhas avulsas", score: 1 },
      { label: "Olho relatórios, mas nem sempre confio nos números", score: 2 },
      { label: "Dashboards confiáveis guiam praticamente todas as decisões", score: 4 },
    ],
  },
  // E — Eficiência (IA & Automação)
  {
    id: 7,
    pillar: "E",
    pillarName: "Eficiência IA",
    question: "Quanto da operação repetitiva já está automatizada?",
    options: [
      { label: "Quase nada — fazemos tudo na mão", score: 0 },
      { label: "Algumas planilhas e zaps soltos", score: 1 },
      { label: "Áreas-chave automatizadas, outras manuais", score: 2 },
      { label: "Automações integradas com IA reduzindo trabalho braçal", score: 4 },
    ],
  },
  {
    id: 8,
    pillar: "E",
    pillarName: "Eficiência IA",
    question: "Suas ferramentas conversam entre si?",
    options: [
      { label: "Cada ferramenta é uma ilha — copiamos dado entre elas", score: 0 },
      { label: "Algumas integrações básicas existem", score: 1 },
      { label: "Stack integrada, mas com retrabalho em pontos críticos", score: 2 },
      { label: "Stack unificada, dado flui sem intervenção humana", score: 4 },
    ],
  },
  // M — Maturidade
  {
    id: 9,
    pillar: "M",
    pillarName: "Maturidade",
    question: "Se você sumisse por 30 dias, o que aconteceria?",
    options: [
      { label: "A operação trava em poucos dias", score: 0 },
      { label: "Roda capengando — alguém ligaria muito", score: 1 },
      { label: "Funciona, mas decisões importantes ficariam paradas", score: 2 },
      { label: "Continua girando normalmente — o time decide e executa", score: 4 },
    ],
  },
  {
    id: 10,
    pillar: "M",
    pillarName: "Maturidade",
    question: "Qual é o seu papel hoje na empresa?",
    options: [
      { label: "Operador-chefe — apago incêndio o dia inteiro", score: 0 },
      { label: "Gerente-geral — coordeno tudo, mas ainda executo muito", score: 1 },
      { label: "Líder — guio a estratégia, mas opero quando aperta", score: 2 },
      { label: "Dono estratégico — penso o futuro, o time toca o presente", score: 4 },
    ],
  },
];

export const MAX_SCORE = QUESTIONS.length * 4; // 40

export type LevelKey = "caos" | "reativo" | "estruturado" | "autonoma";

export type LevelInfo = {
  key: LevelKey;
  num: string;
  name: string;
  range: [number, number];
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
    range: [0, 10],
    headline: "Sua operação roda no improviso.",
    desc: "Cada dia é uma surpresa — boa ou ruim. Você está em todos os lugares ao mesmo tempo e nada acontece sem o seu dedo. Isso não é falha sua: é falta de estrutura.",
    recommendation:
      "Comece pelo Diagnóstico ORDEM™ aprofundado. Antes de implementar qualquer coisa, é preciso enxergar o todo.",
    recommendedTier: "T1 — Diagnóstico ORDEM™",
    border: "#EF9F27",
    glow: "rgba(239,159,39,0.35)",
  },
  {
    key: "reativo",
    num: "02",
    name: "Reativo",
    range: [11, 20],
    headline: "Você apaga incêndio com mais eficiência.",
    desc: "Há ilhas de organização, mas o time ainda depende de você para tudo que importa. Crescer hoje significa trabalhar mais — não melhor.",
    recommendation:
      "Mentoria ORDEM™ é o caminho: 90 dias estruturando rotinas, papéis e indicadores com acompanhamento semanal.",
    recommendedTier: "T2 — Mentoria ORDEM™",
    border: "rgba(175,169,236,0.55)",
    glow: "rgba(83,74,183,0.3)",
  },
  {
    key: "estruturado",
    num: "03",
    name: "Estruturado",
    range: [21, 30],
    headline: "Os processos existem — e o time os segue.",
    desc: "Você já tem uma operação que funciona. Mas escalar ainda assusta: a estrutura não absorve crescimento sem fricção e a IA ainda não trabalha por você.",
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
    range: [31, 40],
    headline: "Sua empresa funciona sem depender de você.",
    desc: "Decisões acontecem com dado. O dono lidera — não opera. Agora o desafio é manter esse nível enquanto a empresa cresce e novos times entram.",
    recommendation:
      "Serviço ORDEM™ contínuo: governança, otimização e evolução da stack para sustentar a autonomia em escala.",
    recommendedTier: "T4 — Serviço ORDEM™",
    border: "#5DCAA5",
    glow: "rgba(93,202,165,0.3)",
  },
];

export function getLevel(score: number): LevelInfo {
  return (
    LEVELS.find((l) => score >= l.range[0] && score <= l.range[1]) ?? LEVELS[0]
  );
}

export function getPillarBreakdown(answers: number[]): Record<Pillar, number> {
  const totals: Record<Pillar, number> = { O: 0, R: 0, D: 0, E: 0, M: 0 };
  QUESTIONS.forEach((q, i) => {
    const ans = answers[i];
    if (ans !== undefined) totals[q.pillar] += q.options[ans].score;
  });
  return totals;
}
