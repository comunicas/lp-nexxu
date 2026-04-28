import jsPDF from "jspdf";

type Pillar = "O" | "R" | "D" | "E" | "M";

const PILLAR_LABELS: Record<Pillar, string> = {
  O: "Organização",
  R: "Rotinas",
  D: "Dados",
  E: "Eficiência IA",
  M: "Maturidade",
};

const NIVEL_COLORS: Record<number, string> = {
  1: "#EF9F27",
  2: "#7F77DD",
  3: "#185FA5",
  4: "#5DCAA5",
};

type DiagnosticoPDFData = {
  name: string;
  nivel: number;
  nivelNome: string;
  nivelHeadline: string;
  nivelDesc: string;
  nivelRecommendation: string;
  nivelRecommendedTier: string;
  score: number;
  scoreMax: number;
  scorePct: number;
  pillarBreakdown: Record<Pillar, number>;
};

export function generateDiagnosticoPDF(data: DiagnosticoPDFData): string {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const margin = 20;
  const contentW = W - margin * 2;
  const bottomLimit = 270; // leave room for footer (footer at 280)
  let y = 0;

  // ── Helpers ──────────────────────────────────────────────
  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b] as [number, number, number];
  };

  const setColor = (hex: string) => {
    const [r, g, b] = hex2rgb(hex);
    doc.setTextColor(r, g, b);
  };

  const setFillColor = (hex: string) => {
    const [r, g, b] = hex2rgb(hex);
    doc.setFillColor(r, g, b);
  };

  const setDrawColor = (hex: string) => {
    const [r, g, b] = hex2rgb(hex);
    doc.setDrawColor(r, g, b);
  };

  const addWrappedText = (
    text: string,
    x: number,
    yPos: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return yPos + lines.length * lineHeight;
  };

  const drawFooter = () => {
    setFillColor("#F0EFFE");
    doc.rect(0, 280, W, 17, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    setColor("#9090A8");
    doc.text(
      "nexxu · Criatividade. Processo. Tecnologia.  ·  nexxulab.com  ·  contato@nexxu.com.br",
      W / 2,
      289,
      { align: "center" }
    );
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > bottomLimit) {
      drawFooter();
      doc.addPage();
      y = margin;
    }
  };

  // ── HEADER ───────────────────────────────────────────────
  setFillColor("#0F0C1A");
  doc.rect(0, 0, W, 40, "F");

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  setColor("#FFFFFF");
  doc.text("nexxu", margin, 20);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setColor("#FFFFFF");
  doc.setTextColor(255, 255, 255, 0.5);
  doc.text("Diagnóstico ORDEM™  ·  Confidencial", margin, 28);

  doc.setFontSize(9);
  setColor("#9090A8");
  doc.text(
    new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
    W - margin,
    28,
    { align: "right" }
  );

  y = 52;

  // ── SAUDAÇÃO ─────────────────────────────────────────────
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  setColor("#1A1520");
  doc.text(`Olá, ${data.name}.`, margin, y);
  y += 7;

  doc.setFontSize(10);
  setColor("#6B6580");
  y = addWrappedText(
    "Abaixo está o resultado completo do seu Diagnóstico ORDEM™. Guarde este documento — ele mapeia o estado atual da sua operação e aponta o próximo passo.",
    margin, y, contentW, 5
  );
  y += 10;

  // ── CARD DE NÍVEL ────────────────────────────────────────
  const nivelColor = NIVEL_COLORS[data.nivel] || "#534AB7";
  setFillColor("#F8F7FF");
  setDrawColor(nivelColor);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentW, 52, 4, 4, "FD");

  // Barra lateral colorida
  setFillColor(nivelColor);
  doc.roundedRect(margin, y, 4, 52, 2, 2, "F");

  // Nível número
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  setColor(nivelColor);
  doc.text(`NÍVEL ${data.nivel < 10 ? "0" + data.nivel : data.nivel} — ÍNDICE ORDEM™`, margin + 10, y + 10);

  // Nível nome
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  setColor("#1A1520");
  doc.text(data.nivelNome.toUpperCase(), margin + 10, y + 24);

  // Score
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor("#6B6580");
  doc.text(`${data.score}/${data.scoreMax} pontos  ·  ${data.scorePct}% de maturidade operacional`, margin + 10, y + 34);

  // Barra de progresso
  setFillColor("#E0DFF5");
  doc.roundedRect(margin + 10, y + 40, contentW - 20, 4, 2, 2, "F");
  setFillColor(nivelColor);
  doc.roundedRect(margin + 10, y + 40, (contentW - 20) * (data.scorePct / 100), 4, 2, 2, "F");

  y += 62;

  // ── HEADLINE + DESCRIÇÃO ─────────────────────────────────
  ensureSpace(40);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  setColor("#1A1520");
  const headlineLines = doc.splitTextToSize(data.nivelHeadline, contentW);
  doc.text(headlineLines, margin, y);
  y += headlineLines.length * 7 + 2;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor("#6B6580");
  y = addWrappedText(data.nivelDesc, margin, y, contentW, 5.5);
  y += 10;

  // ── BREAKDOWN POR PILAR ──────────────────────────────────
  ensureSpace(20 + 16 * 5);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  setColor("#1A1520");
  doc.text("Análise por Pilar ORDEM™", margin, y);
  y += 2;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setColor("#6B6580");
  doc.text("Cada pilar vale até 8 pontos (2 perguntas).", margin, y + 5);
  y += 12;

  const pillars: Pillar[] = ["O", "R", "D", "E", "M"];
  pillars.forEach((p) => {
    ensureSpace(16);
    const value = data.pillarBreakdown[p] ?? 0;
    const pct = Math.round((value / 8) * 100);

    // Label
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setColor("#534AB7");
    doc.text(p, margin, y + 4);

    doc.setFont("helvetica", "normal");
    setColor("#1A1520");
    doc.text(PILLAR_LABELS[p], margin + 6, y + 4);

    doc.setFont("helvetica", "bold");
    setColor("#6B6580");
    doc.text(`${value}/8`, W - margin, y + 4, { align: "right" });

    // Barra de progresso
    setFillColor("#E0DFF5");
    doc.roundedRect(margin, y + 7, contentW, 3, 1, 1, "F");

    const barColor = pct >= 75 ? "#5DCAA5" : pct >= 50 ? "#534AB7" : pct >= 25 ? "#EF9F27" : "#EF9F27";
    setFillColor(barColor);
    doc.roundedRect(margin, y + 7, contentW * (pct / 100), 3, 1, 1, "F");

    y += 16;
  });

  y += 4;

  // ── PRÓXIMO PASSO ─────────────────────────────────────────
  setFillColor("#F0EFFE");
  setDrawColor("#534AB7");
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentW, 38, 4, 4, "FD");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  setColor("#534AB7");
  doc.text("PRÓXIMO PASSO RECOMENDADO", margin + 6, y + 10);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  setColor("#1A1520");
  doc.text(data.nivelRecommendedTier, margin + 6, y + 20);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setColor("#6B6580");
  y = addWrappedText(data.nivelRecommendation, margin + 6, y + 27, contentW - 12, 4.5);

  y += 14;

  // ── APRESENTAÇÃO DOS PRODUTOS ─────────────────────────────
  const products = [
    { tier: "T1 · Diagnóstico", duration: "45 dias", scope: "1–3 processos", desc: "Mapeamento completo + Índice ORDEM™ + plano priorizado.", price: "R$500–1.500" },
    { tier: "T2 · Mentoria", duration: "6 meses", scope: "2–4 processos", desc: "Rotinas + indicadores. Você implementa com nosso acompanhamento.", price: "R$3k–6k" },
    { tier: "T3 · Implementação", duration: "6 meses", scope: "4–7 processos", desc: "A Nexxu implementa junto ao seu time. IA aplicada onde faz sentido.", price: "R$8k–15k" },
    { tier: "T4 · Serviço", duration: "6 meses", scope: "7+ processos", desc: "A Nexxu opera. Você lidera. Transformação completa.", price: "R$20k–40k+" },
  ];

  const recommendedTierNum = data.nivel;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  setColor("#1A1520");
  doc.text("Produtos Nexxu — Escolha o seu caminho", margin, y);
  y += 10;

  products.forEach((prod, idx) => {
    const isRecommended = idx + 1 === recommendedTierNum;

    setFillColor(isRecommended ? "#0F0C1A" : "#F8F7FF");
    setDrawColor(isRecommended ? "#5DCAA5" : "#E0DFF5");
    doc.setLineWidth(isRecommended ? 0.5 : 0.3);
    doc.roundedRect(margin, y, contentW, 22, 3, 3, "FD");

    if (isRecommended) {
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      setColor("#5DCAA5");
      doc.text("RECOMENDADO PARA VOCÊ", W - margin - 2, y + 5, { align: "right" });
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setColor(isRecommended ? "#FFFFFF" : "#1A1520");
    doc.text(prod.tier, margin + 6, y + 9);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    setColor(isRecommended ? "#FFFFFF" : "#6B6580");
    doc.text(`${prod.duration}  ·  ${prod.scope}  ·  ${prod.price}`, margin + 6, y + 15);

    doc.setFontSize(8);
    setColor(isRecommended ? "#CCCCCC" : "#9090A8");
    doc.text(prod.desc, W - margin - 2, y + 9, { align: "right", maxWidth: 90 });

    y += 26;
  });

  y += 6;

  // ── CTA FINAL ─────────────────────────────────────────────
  setFillColor("#185FA5");
  doc.roundedRect(margin, y, contentW, 18, 3, 3, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor("#FFFFFF");
  doc.text("Agende sua call de diagnóstico: nexxulab.com/diagnostico", W / 2, y + 11, { align: "center" });

  y += 26;

  // ── FOOTER ────────────────────────────────────────────────
  setFillColor("#F0EFFE");
  doc.rect(0, 280, W, 17, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  setColor("#9090A8");
  doc.text("nexxu · Criatividade. Processo. Tecnologia.  ·  nexxulab.com  ·  contato@nexxu.com.br", W / 2, 289, { align: "center" });

  return doc.output("datauristring").split(",")[1]; // base64 puro
}
