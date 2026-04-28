## Recomendações personalizadas com IA após o Diagnóstico ORDEM™

Adicionar geração de plano de ação personalizado via Lovable AI Gateway logo após o usuário ver o resultado do quiz. Implementado como **server route TanStack Start** (não Supabase Edge Function — este projeto não usa edge functions; segue o padrão de `send-diagnostico.ts`).

### 1. Novo endpoint: `src/routes/api/public/generate-recommendations.ts`

**Contrato (input POST JSON):**

```ts
{
  name: string;
  overallScore: number;        // 0–100
  maturityLevel: "Caos" | "Organizada" | "Inteligente" | "Autônoma";
  pillarScores: Array<{ pillar: "O"|"R"|"D"|"E"|"M"; score: number; maxScore: number }>;
}
```

**Output JSON:**

```ts
{
  recommendations: Array<{ title: string; description: string; pillar: "O"|"R"|"D"|"E"|"M"; link?: string }>; // 4–5 itens
  mentoriaCTA: { headline: string; justification: string; urgency: string };
  summary: string;
}
```

**Lógica do handler:**

- `OPTIONS` para preflight + CORS completo (`Access-Control-Allow-Origin`, `Methods: POST, OPTIONS`, `Headers: Content-Type, Authorization, Origin`).
- **Allowed origins:** validar header `Origin` contra lista (`*.lovable.app`, `*.lovable.dev`, `*.lovableproject.com`, `nexxulab.com`, `www.nexxulab.com`, `localhost:*`). Se inválido → 403.
- **Validação de input** (manual, sem dependência nova): `name` 2–100 chars, `overallScore` 0–100, `pillarScores` array não vazio com pillars ∈ {O,R,D,E,M}. Erros → 400.
- **Sanitizar `name**`: `name.replace(/[<>{}\[\]\\]/g, "").trim().slice(0, 100)`.
- **Rate limit**: 5 req/min por IP, em helper compartilhado `**src/lib/rate-limiter.ts**` (Map em memória com janela deslizante, `(ip, route) → timestamps[]`). IP via `getRequestHeader("x-forwarded-for")` ou `cf-connecting-ip`. Excedido → 429.
- **Calcular 3 pilares mais fracos** ordenando `score/maxScore` ascendente.
- Verificar `LOVABLE_API_KEY` (já existe em secrets). Ausente → 503.
- **Chamar Lovable AI Gateway** (`POST https://ai.gateway.lovable.dev/v1/chat/completions`) com `Authorization: Bearer ${LOVABLE_API_KEY}`.
  - Modelo: `google/gemini-2.5-flash` (boa relação custo × qualidade para JSON estruturado).
  - **Tool calling** (não pedir JSON em texto livre) com schema da resposta — function `emit_recommendations` com `parameters` espelhando o output. `tool_choice` forçado nessa função.
  - System prompt conforme spec do usuário (mentor ORDEM™, comunicação direta, descrição dos 5 pilares e dos 4 níveis, regras: priorizar 3 pilares mais fracos, recomendações acionáveis "esta semana").
  - User prompt: nome sanitizado, score geral, nível, breakdown por pilar com %, lista explícita dos 3 pilares mais fracos.
- **Tratamento de erros do gateway:**
  - 429 → `{ error: "Rate limit exceeded. Tente novamente em alguns segundos." }` status 429.
  - 402 → `{ error: "Créditos insuficientes para gerar recomendações." }` status 402.
  - Outros → 502 com mensagem genérica.
- **Parse robusto:** preferir `tool_calls[0].function.arguments` (JSON.parse). Fallback: extrair de bloco `json ...`  ou JSON solto em `choices[0].message.content`.
- **Fallback estático** se o parse falhar: gerar recomendações pré-definidas baseadas nos 3 pilares mais fracos (mapa pillar → recomendação template) + CTA padrão para Mentoria ORDEM™ + summary genérico. Garante que o usuário sempre vê algo.
- **Logs:** apenas `console.error` para falhas técnicas, sem dados pessoais (nunca logar `name`, score do usuário, etc.). Logar status do gateway, IP truncado, mensagem de erro.

### 2. Helper de rate limiting: `src/lib/rate-limiter.ts`

Função `checkRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfter?: number }`. Map em memória escopado ao módulo (Worker dura o suficiente entre requests para casos comuns; aceitável para MVP). Usado por `key = \`${ip}:generate-recommendations`.

### 3. Integração no `QuizResult.tsx`

Após o usuário responder as 10 perguntas (componente já renderiza com `answers`), **antes do formulário de email** mostrar uma nova seção "Plano de ação personalizado":

- Estado: `aiState: "loading" | "ready" | "error"`, `aiData: typeof Output | null`.
- `useEffect` no mount do `QuizResult`: chamar `POST /api/public/generate-recommendations` com:
  - `name: "Visitante"` (ainda não temos nome — será atualizado se quisermos refazer após submit; MVP usa "Visitante" para gerar imediatamente).
  - `overallScore: score`, `maturityLevel: level.name`, `pillarScores: [{pillar:"O", score: breakdown.O, maxScore: 100}, ...]`.
- Exibir skeleton/loader enquanto `loading`.
- Renderizar:
  - **Cards das 4–5 recomendações** (título + descrição + badge do pilar).
  - `**summary**` como frase de impacto destacada acima das recomendações.
- Se `error` ou fallback: mostrar mensagem discreta + recomendações estáticas (mesmo fallback do servidor já cobre, então o usuário vê algo útil).
- Incluir `aiData` no payload enviado para `/api/public/send-diagnostico` (campo opcional `aiRecommendations`) para que o admin/PDF possam usar futuramente. **Sem mudança de schema do banco** nesta entrega — apenas passa pelo body.

### 4. Sem mudanças em banco, secrets ou edge functions

- `LOVABLE_API_KEY` já existe nos secrets.
- Sem migrações.
- Nenhuma edge function Supabase (projeto usa TanStack Start server routes).

### Arquivos editados/criados

- **Criar** `src/routes/api/public/generate-recommendations.ts`
- **Criar** `src/lib/rate-limiter.ts`
- **Editar** `src/components/diagnostico/QuizResult.tsx` (nova seção AI + chamada no mount + propagar `aiRecommendations` para o send)

### Resultado esperado

- Ao terminar o quiz, o usuário vê em ~2–4s um plano de ação com 4–5 ações acionáveis priorizando seus 3 pilares mais fracos, uma frase de impacto.
- Endpoint protegido por CORS, allowed origins, rate limit (5/min/IP), validação de input e fallback estático garantindo resposta útil mesmo se a IA falhar.