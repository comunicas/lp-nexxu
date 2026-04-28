## Reestruturar diagnóstico ORDEM™ para escala Likert 1–5

Substituir o sistema atual (10 perguntas com 4 alternativas únicas, score 0–4 cada, total 0–40) por uma escala Likert uniforme (1–5) com novos nomes de nível baseados em percentual.

### 1. Reescrever banco de perguntas e cálculo (`src/components/diagnostico/quizData.ts`)

**Novas perguntas** (2 por pilar, todas afirmativas, mesma escala Likert):

- **O — Organização**
  1. Os processos críticos da minha empresa estão mapeados e documentados.
  2. Identificamos e priorizamos gargalos operacionais de forma sistemática.
- **R — Rotinas**
  3. Realizamos reuniões de gestão com pauta definida e decisões registradas.
  4. Delego responsabilidades com padrão claro de entrega e acompanhamento.
- **D — Dados**
  5. Acompanho indicadores-chave (KPIs) do negócio regularmente.
  6. Minhas decisões são baseadas em dados concretos, não apenas em intuição.
- **E — Eficiência Inteligente**
  7. Utilizo ferramentas de IA no meu dia a dia para aumentar a produtividade.
  8. Já implementamos automações em processos-chave da empresa.
- **M — Maturidade Operacional**
  9. O negócio funciona bem mesmo quando não estou presente no operacional.
  10. A empresa consegue crescer sem aumentar proporcionalmente o caos e a sobrecarga.

**Escala única** (mesma para todas as 10 perguntas):
1. Discordo totalmente
2. Discordo
3. Neutro
4. Concordo
5. Concordo totalmente

**Modelo de cálculo:**
- Score por pilar: soma das 2 respostas (mín 2, máx 10) → percentual = `((soma − 2) / 8) × 100`.
- Índice geral: média dos percentuais dos 5 pilares (0–100%).
- Compatibilidade com a UI/PDF/email atuais: `score` passa a ser o índice geral em pontos percentuais (0–100), `scoreMax = 100`, `scorePct = score`.

**Novos níveis (4) por percentual do índice geral:**
| # | Nome | Faixa | Tier recomendado |
|---|------|-------|------------------|
| 01 | Caos | 0–25% | T1 — Diagnóstico ORDEM™ |
| 02 | Organizada | 26–50% | T2 — Mentoria ORDEM™ |
| 03 | Inteligente | 51–75% | T3 — Implementação ORDEM™ |
| 04 | Autônoma | 76–100% | T4 — Serviço ORDEM™ |

Reescrever `headline`, `desc`, `recommendation` para os novos rótulos (mantendo o tom atual). Cores/borders existentes ficam mapeadas: Caos=âmbar, Organizada=roxo, Inteligente=azul, Autônoma=teal.

**API mantida:** `QUESTIONS`, `LEVELS`, `getLevel(scorePct)`, `getPillarBreakdown(answers)` (retorna percentuais 0–100 por pilar), `MAX_SCORE = 100`. As opções continuam tendo `score` (agora 1–5) para o cálculo interno.

### 2. Ajustar `QuizResult.tsx`

- Calcular percentual por pilar (média ponderada → `((soma − 2)/8) × 100`).
- `score` passa a ser o índice geral em % (inteiro), `MAX_SCORE = 100`, `pct = score`.
- Card principal: trocar “{score}/{MAX_SCORE} PONTOS” por “{score}% DE MATURIDADE”.
- Breakdown por pilar: trocar “Cada pilar vale até 8 pontos (2 perguntas)” por “Cada pilar vale 0–100% (média de 2 perguntas)” e exibir “{value}%” em vez de “{value}/8”.
- Continuar enviando `score`, `scoreMax`, `scorePct` no payload (todos coerentes com 0–100).

### 3. Ajustar `QuizIntro.tsx` e `IndiceSection.tsx`

- Atualizar os 4 cards de nível para os novos nomes/descrições: **Caos**, **Organizada**, **Inteligente**, **Autônoma**.
- Manter as cores existentes (âmbar/roxo/azul/teal).
- Atualizar copy curta de cada nível para refletir o novo significado (foco em maturidade, não só em caos→escala).

### 4. Ajustar Design System demo (`DiagnosticoModulesSection.tsx`)

- Trocar `mockAnswers` para usar índices válidos da nova escala (ex.: opção `2` → score 3 “Neutro”). Sem mudanças estruturais.

### 5. Backend / Admin / PDF — sem alteração de schema

- `send-diagnostico.ts`, `admin.tsx`, `generateDiagnosticoPDF.ts` continuam funcionando: `nivel` (1–4), `nivel_nome`, `score`, `score_max`, `score_pct` permanecem com o mesmo contrato. Apenas a interpretação muda (score agora é 0–100 em vez de 0–40), o que é transparente para o backend.
- Email de admin e admin dashboard exibirão “{score}/{scoreMax} ({scorePct}%)” → ficará “85/100 (85%)”, o que é coerente.

### Arquivos editados

- `src/components/diagnostico/quizData.ts` — reescrita completa de QUESTIONS + LEVELS + cálculo
- `src/components/diagnostico/QuizResult.tsx` — labels de pontuação e breakdown
- `src/components/diagnostico/QuizIntro.tsx` — cards dos 4 níveis
- `src/components/landing/IndiceSection.tsx` — cards dos 4 níveis
- `src/components/design-system/sections/DiagnosticoModulesSection.tsx` — mock answers

### Resultado esperado

- Quiz passa a usar a mesma Likert 1–5 em todas as 10 perguntas.
- Índice exibido em % (0–100) com 4 níveis: Caos / Organizada / Inteligente / Autônoma.
- PDF, email e admin continuam funcionando sem migração de banco.
