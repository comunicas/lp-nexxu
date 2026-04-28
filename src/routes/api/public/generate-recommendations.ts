import { createFileRoute } from "@tanstack/react-router";
import { checkRateLimit } from "@/lib/rate-limiter";

type Pillar = "O" | "R" | "D" | "E" | "M";

type Input = {
  name: string;
  overallScore: number;
  maturityLevel: "Caos" | "Organizada" | "Inteligente" | "Autônoma";
  pillarScores: Array<{ pillar: Pillar; score: number; maxScore: number }>;
};

type Recommendation = {
  title: string;
  description: string;
  pillar: Pillar;
  link?: string;
};

type Output = {
  recommendations: Recommendation[];
  mentoriaCTA: { headline: string; justification: string; urgency: string };
  summary: string;
};

const PILLAR_NAMES: Record<Pillar, string> = {
  O: "Organização",
  R: "Rotinas",
  D: "Dados",
  E: "Eficiência Inteligente",
  M: "Maturidade Operacional",
};

const ALLOWED_ORIGIN_PATTERNS: RegExp[] = [
  /^https?:\/\/([a-z0-9-]+\.)*lovable\.app$/i,
  /^https?:\/\/([a-z0-9-]+\.)*lovable\.dev$/i,
  /^https?:\/\/([a-z0-9-]+\.)*lovableproject\.com$/i,
  /^https?:\/\/(www\.)?nexxulab\.com$/i,
  /^https?:\/\/localhost(:\d+)?$/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/i,
];

function corsHeadersFor(origin: string | null): Record<string, string> {
  const allow =
    origin && ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin))
      ? origin
      : "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Origin",
    Vary: "Origin",
  };
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));
}

function sanitizeName(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/[<>{}\[\]\\]/g, "").trim().slice(0, 100);
}

function validateInput(body: any):
  | { ok: true; data: Input }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };

  const name = sanitizeName(body.name);
  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: "name must be 2–100 chars" };
  }

  const overallScore = Number(body.overallScore);
  if (!Number.isFinite(overallScore) || overallScore < 0 || overallScore > 100) {
    return { ok: false, error: "overallScore must be 0–100" };
  }

  const maturityLevel = body.maturityLevel;
  if (!["Caos", "Organizada", "Inteligente", "Autônoma"].includes(maturityLevel)) {
    return { ok: false, error: "invalid maturityLevel" };
  }

  if (!Array.isArray(body.pillarScores) || body.pillarScores.length === 0) {
    return { ok: false, error: "pillarScores required" };
  }

  const pillarScores: Input["pillarScores"] = [];
  for (const p of body.pillarScores) {
    if (!p || !["O", "R", "D", "E", "M"].includes(p.pillar)) {
      return { ok: false, error: "invalid pillar" };
    }
    const score = Number(p.score);
    const maxScore = Number(p.maxScore);
    if (!Number.isFinite(score) || !Number.isFinite(maxScore) || maxScore <= 0) {
      return { ok: false, error: "invalid pillar score" };
    }
    pillarScores.push({ pillar: p.pillar, score, maxScore });
  }

  return { ok: true, data: { name, overallScore, maturityLevel, pillarScores } };
}

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf;
  return "unknown";
}

function buildFallback(input: Input, weakest: Pillar[]): Output {
  const tplByPillar: Record<Pillar, Recommendation> = {
    O: {
      pillar: "O",
      title: "Mapeie 3 processos críticos esta semana",
      description:
        "Liste os 3 processos que mais geram retrabalho ou dependem de você. Documente o passo a passo em uma página por processo. Sem ferramenta nova: um doc compartilhado já basta.",
    },
    R: {
      pillar: "R",
      title: "Implante reunião semanal de 30 minutos",
      description:
        "Defina dia, hora e pauta fixa: indicadores, prioridades, bloqueios. Registre decisões em um único lugar. É a rotina que sustenta tudo o resto.",
    },
    D: {
      pillar: "D",
      title: "Escolha 3 KPIs e acompanhe semanalmente",
      description:
        "Selecione 3 indicadores que realmente movem o negócio (receita, conversão, ticket). Atualize toda segunda. Decisão sem dado é palpite.",
    },
    E: {
      pillar: "E",
      title: "Automatize uma tarefa repetitiva com IA",
      description:
        "Identifique a tarefa manual que mais consome tempo no time. Use IA para gerar rascunhos, classificar ou resumir. Comece pequeno, escale o que funcionar.",
    },
    M: {
      pillar: "M",
      title: "Delegue 1 decisão recorrente esta semana",
      description:
        "Escolha uma decisão que sempre passa por você e defina critérios claros para alguém do time decidir. Maturidade começa quando o dono sai do caminho.",
    },
  };

  const recs = weakest.map((p) => tplByPillar[p]);
  // Garante 4–5 itens completando com pilares restantes
  const remaining = (Object.keys(tplByPillar) as Pillar[]).filter(
    (p) => !weakest.includes(p),
  );
  while (recs.length < 4 && remaining.length) {
    recs.push(tplByPillar[remaining.shift()!]);
  }

  const weakestNames = weakest.map((p) => PILLAR_NAMES[p]).join(", ");
  return {
    recommendations: recs.slice(0, 5),
    mentoriaCTA: {
      headline: `Estruture ${weakestNames} em 90 dias com a Mentoria ORDEM™`,
      justification:
        "Suas maiores oportunidades estão concentradas nesses pilares. A Mentoria ORDEM™ entrega acompanhamento semanal com método validado para transformar caos em operação previsível.",
      urgency: "Vagas limitadas por turma",
    },
    summary:
      `${input.name}, sua operação tem potencial claro — agora é executar com método.`,
  };
}

function tryParseJson(text: string): any | null {
  if (!text) return null;
  // Tenta JSON puro
  try {
    return JSON.parse(text);
  } catch {}
  // Tenta extrair de bloco ```json ... ```
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) {
    try {
      return JSON.parse(fence[1]);
    } catch {}
  }
  // Tenta extrair primeiro objeto { ... }
  const obj = text.match(/\{[\s\S]*\}/);
  if (obj) {
    try {
      return JSON.parse(obj[0]);
    } catch {}
  }
  return null;
}

function normalizeOutput(parsed: any, input: Input): Output | null {
  if (!parsed || typeof parsed !== "object") return null;
  const recs = Array.isArray(parsed.recommendations)
    ? parsed.recommendations
        .filter(
          (r: any) =>
            r &&
            typeof r.title === "string" &&
            typeof r.description === "string" &&
            ["O", "R", "D", "E", "M"].includes(r.pillar),
        )
        .slice(0, 5)
        .map((r: any) => ({
          title: String(r.title).slice(0, 120),
          description: String(r.description).slice(0, 600),
          pillar: r.pillar as Pillar,
          link: typeof r.link === "string" ? r.link.slice(0, 300) : undefined,
        }))
    : [];

  if (recs.length < 3) return null;

  const cta = parsed.mentoriaCTA;
  const mentoriaCTA =
    cta && typeof cta.headline === "string" && typeof cta.justification === "string"
      ? {
          headline: String(cta.headline).slice(0, 200),
          justification: String(cta.justification).slice(0, 600),
          urgency:
            typeof cta.urgency === "string"
              ? String(cta.urgency).slice(0, 100)
              : "Vagas limitadas",
        }
      : {
          headline: "Mentoria ORDEM™ — método para escalar com clareza",
          justification:
            "Acompanhamento semanal em 90 dias para estruturar rotinas, papéis e indicadores no seu negócio.",
          urgency: "Vagas limitadas",
        };

  const summary =
    typeof parsed.summary === "string" && parsed.summary.trim()
      ? String(parsed.summary).slice(0, 280)
      : `${input.name}, transformar diagnóstico em operação previsível começa por uma decisão.`;

  return { recommendations: recs, mentoriaCTA, summary };
}

export const Route = createFileRoute("/api/public/generate-recommendations")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) => {
        const origin = request.headers.get("origin");
        return new Response(null, {
          status: 204,
          headers: corsHeadersFor(origin),
        });
      },
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        const cors = corsHeadersFor(origin);

        if (!isOriginAllowed(origin)) {
          return new Response(JSON.stringify({ error: "Origin not allowed" }), {
            status: 403,
            headers: { ...cors, "Content-Type": "application/json" },
          });
        }

        // Rate limit
        const ip = getClientIp(request);
        const rl = checkRateLimit(`${ip}:generate-recommendations`, 5, 60_000);
        if (!rl.allowed) {
          return new Response(
            JSON.stringify({
              error: "Rate limit exceeded. Tente novamente em alguns segundos.",
            }),
            {
              status: 429,
              headers: {
                ...cors,
                "Content-Type": "application/json",
                "Retry-After": String(rl.retryAfter ?? 30),
              },
            },
          );
        }

        let body: any;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { ...cors, "Content-Type": "application/json" },
          });
        }

        const validation = validateInput(body);
        if (!validation.ok) {
          return new Response(JSON.stringify({ error: validation.error }), {
            status: 400,
            headers: { ...cors, "Content-Type": "application/json" },
          });
        }
        const input = validation.data;

        // 3 pilares mais fracos
        const weakest = [...input.pillarScores]
          .sort((a, b) => a.score / a.maxScore - b.score / b.maxScore)
          .slice(0, 3)
          .map((p) => p.pillar);

        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        if (!LOVABLE_API_KEY) {
          console.error("generate-recommendations: LOVABLE_API_KEY missing");
          return new Response(
            JSON.stringify({ error: "AI service not configured" }),
            {
              status: 503,
              headers: { ...cors, "Content-Type": "application/json" },
            },
          );
        }

        const systemPrompt = `Você é mentor de líderes e criador da Mentoria ORDEM™.
Comunicação direta, estratégica, com autoridade e empatia.

Pilares ORDEM™:
- O (Organização): processos mapeados e padronizados
- R (Rotinas): reuniões e ritmo semanal de gestão
- D (Dados): KPIs e decisões baseadas em dados
- E (Eficiência Inteligente): IA aplicada e automações
- M (Maturidade Operacional): autonomia, negócio funciona sem o dono

Níveis:
- Caos (0-25%): tudo depende do dono, vive apagando incêndio
- Organizada (26-50%): processos básicos, dono ainda é gargalo
- Inteligente (51-75%): processos rodando, dados em uso, delegação
- Autônoma (76-100%): operação previsível e escalável

Regras:
- Identifique os 3 pilares mais fracos e priorize neles
- Cada recomendação deve ser acionável ESTA SEMANA
- Título com no máximo 8 palavras
- Descrição com 2-3 frases objetivas
- Frase de impacto curta e motivacional`;

        const pillarLines = input.pillarScores
          .map(
            (p) =>
              `- ${p.pillar} (${PILLAR_NAMES[p.pillar]}): ${Math.round(
                (p.score / p.maxScore) * 100,
              )}%`,
          )
          .join("\n");

        const userPrompt = `Líder: ${input.name}
Índice geral: ${input.overallScore}%
Nível atual: ${input.maturityLevel}

Score por pilar:
${pillarLines}

Pilares mais fracos (priorize): ${weakest.map((p) => `${p} (${PILLAR_NAMES[p]})`).join(", ")}

Gere 4 a 5 recomendações acionáveis priorizando esses pilares, um CTA contextualizado para a Mentoria ORDEM™ baseado nos gaps, e uma frase de impacto curta.`;

        const tools = [
          {
            type: "function",
            function: {
              name: "emit_recommendations",
              description:
                "Retorna o plano de ação personalizado e CTA para o líder.",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    minItems: 4,
                    maxItems: 5,
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        pillar: {
                          type: "string",
                          enum: ["O", "R", "D", "E", "M"],
                        },
                        link: { type: "string" },
                      },
                      required: ["title", "description", "pillar"],
                      additionalProperties: false,
                    },
                  },
                  mentoriaCTA: {
                    type: "object",
                    properties: {
                      headline: { type: "string" },
                      justification: { type: "string" },
                      urgency: { type: "string" },
                    },
                    required: ["headline", "justification", "urgency"],
                    additionalProperties: false,
                  },
                  summary: { type: "string" },
                },
                required: ["recommendations", "mentoriaCTA", "summary"],
                additionalProperties: false,
              },
            },
          },
        ];

        let aiRes: Response;
        try {
          aiRes = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-2.5-flash",
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "user", content: userPrompt },
                ],
                tools,
                tool_choice: {
                  type: "function",
                  function: { name: "emit_recommendations" },
                },
              }),
            },
          );
        } catch (err) {
          console.error(
            "generate-recommendations: gateway fetch failed",
            err instanceof Error ? err.message : err,
          );
          const fb = buildFallback(input, weakest);
          return new Response(JSON.stringify(fb), {
            status: 200,
            headers: { ...cors, "Content-Type": "application/json" },
          });
        }

        if (aiRes.status === 429) {
          return new Response(
            JSON.stringify({
              error: "Rate limit exceeded. Tente novamente em alguns segundos.",
            }),
            {
              status: 429,
              headers: { ...cors, "Content-Type": "application/json" },
            },
          );
        }
        if (aiRes.status === 402) {
          return new Response(
            JSON.stringify({
              error: "Créditos insuficientes para gerar recomendações.",
            }),
            {
              status: 402,
              headers: { ...cors, "Content-Type": "application/json" },
            },
          );
        }
        if (!aiRes.ok) {
          console.error(
            "generate-recommendations: gateway error",
            aiRes.status,
            await aiRes.text().catch(() => ""),
          );
          const fb = buildFallback(input, weakest);
          return new Response(JSON.stringify(fb), {
            status: 200,
            headers: { ...cors, "Content-Type": "application/json" },
          });
        }

        let aiJson: any;
        try {
          aiJson = await aiRes.json();
        } catch {
          const fb = buildFallback(input, weakest);
          return new Response(JSON.stringify(fb), {
            status: 200,
            headers: { ...cors, "Content-Type": "application/json" },
          });
        }

        // Preferir tool_calls
        let parsed: any = null;
        const toolCall =
          aiJson?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
        if (toolCall) {
          try {
            parsed =
              typeof toolCall === "string" ? JSON.parse(toolCall) : toolCall;
          } catch {}
        }
        if (!parsed) {
          const content = aiJson?.choices?.[0]?.message?.content;
          if (typeof content === "string") parsed = tryParseJson(content);
        }

        const out = parsed ? normalizeOutput(parsed, input) : null;
        const finalOut = out ?? buildFallback(input, weakest);

        return new Response(JSON.stringify(finalOut), {
          status: 200,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      },
    },
  },
});
