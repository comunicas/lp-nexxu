
# Plano — Nexxu: Landing Page + Diagnóstico ORDEM™

Vamos portar os dois HTMLs anexos para o stack do projeto (TanStack Start + React + Tailwind v4), priorizando **componentização** e **manutenibilidade**. O trabalho é dividido em 5 fases pequenas e independentes, cada uma entregando algo testável.

---

## Visão geral

Duas páginas:
- **`/`** — Landing page institucional (Nav, Hero, Dor, Método ORDEM™, Produtos, Índice, Cases, FAQ, Footer)
- **`/diagnostico`** — Quiz interativo de 9 perguntas com captura de lead e cálculo do Índice ORDEM™ (níveis 1–4)

Identidade visual extraída dos HTMLs:
- **Cores**: azul `#185FA5`, roxo `#534AB7`, roxo profundo `#3C3489`, teal `#5DCAA5`, âmbar `#EF9F27`, dark `#0F0C1A`, page `#F8F7FF`
- **Tipografia**: `Space Grotesk` (headings) + `Outfit` (body), via Google Fonts
- **Linguagem**: gradientes lineares azul→roxo, cantos arredondados (16–28px), glow/shadow roxo, layout escuro no Hero/Índice/Footer e claro nas demais seções

---

## Fase 1 — Design System & Fundamentos

Estabelecer base visual reutilizável antes de qualquer página.

1. **Tokens em `src/styles.css`**: substituir paleta padrão por tokens semânticos Nexxu (em oklch + variantes diretas para os hex acima), adicionar `--gradient-brand`, `--shadow-glow`, fontes Space Grotesk + Outfit via `@import url(...)`.
2. **Utilities**: classes `.grad-text`, `.section-label` no styles.css (reutilizadas em várias seções).
3. **Componentes primitivos** em `src/components/ui-nexxu/`:
   - `Logo.tsx` (SVG inline com 2 variantes de tamanho — usado em Nav e Header do diagnóstico)
   - `Button.tsx` (variantes: `primary`, `ghost`, `sm`, `secondary`)
   - `Badge.tsx` (variantes: `hero` com dot teal, `gradient`, `section-label`)
   - `SectionHeader.tsx` (label + h2 + parágrafo, usado em todas as seções)
   - `CheckIcon.tsx` (SVG do bullet dos cards de produto)

Entregável: build funciona, tokens disponíveis, componentes prontos para uso.

---

## Fase 2 — Componentes de Seção da Landing

Cada seção da LP vira um componente isolado em `src/components/landing/`:

- `Nav.tsx` — fixa no topo, fica opaca ao scroll (estado `scrolled`)
- `Hero.tsx` — fundo dark, headline com gradiente, badge, CTAs, 3 stats, indicador de scroll. Canvas animado vira efeito CSS estático (mais leve, sem JS de física)
- `PainSection.tsx` — grid de 5 `PainCard` + 1 `PainCtaCard`
- `OrdemMethod.tsx` — 5 botões de letra interativos (`O R D E M`), card de detalhe reativo, timeline 30/60/90 dias. Estado local com `useState`
- `Products.tsx` — 4 `ProductCard` (T1..T4) com prop `variant` (light/featured/dark)
- `IndiceSection.tsx` — fundo dark, 4 níveis + CTA box
- `CasesSection.tsx` — 3 `CaseCard` com stat grande
- `Faq.tsx` — lista de `FaqItem` com accordion controlado
- `Footer.tsx` — duas colunas + linha gradiente

Entregável: cada componente renderiza isolado, props tipadas, conteúdo em PT-BR fiel aos HTMLs.

---

## Fase 3 — Página `/` (Landing Page)

- Atualizar `src/routes/index.tsx`: remover placeholder, montar página compondo as seções da Fase 2 na ordem: Nav → Hero → Pain → OrdemMethod → Products → Indice → Cases → Faq → Footer.
- Atualizar `head()` da rota com title/description/og em PT-BR ("Nexxu — Criatividade. Processo. Tecnologia.").
- Atualizar `__root.tsx` com meta padrão pt-BR e charset.
- Garantir scroll suave para âncoras `#metodo`, `#produtos`, `#diagnostico`.

Entregável: LP completa navegável, responsiva (≤768px ajusta grids e esconde links da nav).

---

## Fase 4 — Página `/diagnostico` (Quiz)

- Criar `src/routes/diagnostico.tsx` com `head()` próprio.
- Componentes em `src/components/diagnostico/`:
  - `DiagHeader.tsx` (logo + voltar)
  - `ProgressBar.tsx`
  - `WelcomeScreen.tsx`
  - `QuestionScreen.tsx` (renderiza pergunta atual + 4 opções, suporta atalho teclado 1–4)
  - `LeadForm.tsx` (nome obrigatório, email, whatsapp; Enter envia)
  - `ResultScreen.tsx` (header com nível, análise, barras por dimensão animadas, recomendação de produto, CTAs)
- Dados em `src/data/diagnostico.ts`: arrays `questions`, `levels`, `dims` (cópia fiel do JS do HTML).
- Lógica em `src/hooks/useDiagnostico.ts`: estado de `cur`, `answers`, `scores`, transições entre telas, cálculo de nível (≤15→1, ≤22→2, ≤29→3, senão 4).
- Animações: barra de progresso, fade-in das telas, fill animado das barras de dimensão (Tailwind transitions).

Entregável: quiz funcional ponta-a-ponta. Dados do lead apenas exibem o resultado por enquanto (sem envio para backend — fica para fase futura, se desejado).

---

## Fase 5 — Polimento & SEO

- Revisar responsividade nas 2 páginas (mobile-first).
- og:image: gerar imagem placeholder ou omitir até termos arte oficial.
- Verificar contraste e foco de teclado (acessibilidade básica).
- Validar `<Link>` interno entre `/` e `/diagnostico` (substituir `href="diagnostico.html"` dos HTMLs).
- Build de produção e checagem de console.

---

## Estrutura de arquivos esperada

```text
src/
  components/
    ui-nexxu/        Logo, Button, Badge, SectionHeader, CheckIcon
    landing/         Nav, Hero, PainSection, OrdemMethod, Products,
                     IndiceSection, CasesSection, Faq, Footer
    diagnostico/     DiagHeader, ProgressBar, WelcomeScreen,
                     QuestionScreen, LeadForm, ResultScreen
  data/
    diagnostico.ts   questions, levels, dims
  hooks/
    useDiagnostico.ts
  routes/
    index.tsx        Landing
    diagnostico.tsx  Quiz
  styles.css         Tokens Nexxu + fontes
```

---

## Fora de escopo (podem virar próximos pedidos)

- Persistência dos leads (Lovable Cloud + tabela `diagnostico_leads`)
- Integração WhatsApp / envio de e-mail com resultado
- Animação canvas de partículas no Hero (substituída por gradiente/orbs)
- Blog, área de cliente, autenticação
