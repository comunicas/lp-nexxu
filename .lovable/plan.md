## Objetivo

Criar uma página interna `/design-system` que funciona como **brandbook + biblioteca viva de componentes** da Nexxu. Fonte única para o time consultar identidade visual, tokens, primitivos e módulos prontos — tudo renderizado a partir do código real (não mockup).

## Estrutura da página

Layout de duas colunas: sidebar fixa de navegação (esquerda) + conteúdo rolável com seções âncora (direita). Cabeçalho próprio com logo Nexxu e link de volta para `/`.

```text
/design-system
├── Sidebar (sticky)         Conteúdo (sections)
│  • Brand                   1. Brand
│  • Cores                   2. Cores
│  • Tipografia              3. Tipografia
│  • Gradientes & Sombras    4. Gradientes & Sombras
│  • Logo                    5. Logo
│  • Primitivos              6. Primitivos (Button, Badge, CheckIcon, SectionHeader)
│  • Módulos da Landing      7. Módulos (Nav, Hero, Pain, Ordem, Products, Indice, Cases, Faq, Footer)
│  • Módulos do Diagnóstico  8. Módulos (QuizHeader, QuizIntro, QuizQuestionView, QuizResult)
```

## Seções em detalhe

### 1. Brand
Card com logo grande, missão/posicionamento curto ("Consultoria de inovação operacional…"), e os 3 pilares do método ORDEM™ resumidos.

### 2. Cores
Grid de swatches agrupado por família:
- **Primárias**: `--brand-blue`, `--brand-purple`, `--brand-purple-deep`
- **Secundárias roxo**: mid, light, pale, min
- **Acentos**: `--brand-teal`, `--brand-amber`
- **Neutros**: dark, dark-2, page, text, muted, subtle

Cada swatch mostra: amostra de cor (96px), nome do token CSS, valor hex, botão "copiar".

### 3. Tipografia
- Famílias: Outfit (sans) e Space Grotesk (display) — exibidas com sample text.
- Escala: H1 hero (`grad-text-hero`), H2 seção, H3, body, label, section-label.
- Cada item mostra: rótulo + sample renderizado + a classe usada.

### 4. Gradientes & Sombras
- 4 cartões de gradiente: `gradient-brand`, `gradient-text-light`, `gradient-text-pale`, `gradient-hero-headline` (este sobre fundo dark).
- 3 cartões de sombra: `shadow-brand-glow`, `shadow-brand-glow-sm`, `shadow-card-hover`.

### 5. Logo
Variantes lado a lado: `Logo variant="full"` e `Logo variant="mark"`, ambos sobre fundo claro e fundo dark, com legendas de uso.

### 6. Primitivos
Para cada componente do `ui-nexxu/`, um bloco com:
- Título + descrição curta
- Demo renderizado (todas as variantes)
- Snippet de uso

Componentes:
- **Button** — variantes `primary`, `ghost`, `sm`, `secondary`, `cta` (ghost demonstrado sobre fundo dark).
- **Badge** — variantes `hero` (dark bg), `gradient`, `section-label`, `featured`.
- **CheckIcon** — `light` e `dark` (sobre fundos correspondentes).
- **SectionHeader** — exemplo center e left.

### 7. Módulos da Landing
Galeria de previews dos componentes em `src/components/landing/`. Cada módulo aparece em um cartão `<DSPreview>` com:
- Header: nome do componente + path + descrição de 1 linha
- Preview: componente real renderizado em iframe-like container (largura full do conteúdo, com indicação do background nativo do módulo)

Módulos: Nav, Hero, PainSection, OrdemMethod, Products, IndiceSection, CasesSection, Faq, Footer.

### 8. Módulos do Diagnóstico
Mesmo padrão para `src/components/diagnostico/`: QuizHeader, QuizIntro, QuizQuestionView (com pergunta de exemplo controlada), QuizResult (com mock de respostas).

## Arquivos a criar

```text
src/routes/design-system.tsx                 (rota da página)
src/components/design-system/
  ├── DSLayout.tsx                           (sidebar + conteúdo)
  ├── DSSection.tsx                          (wrapper de seção com id+título)
  ├── DSPreview.tsx                          (cartão de preview de módulo)
  ├── DSColorSwatch.tsx                      (swatch de cor com copy)
  ├── DSTokenCard.tsx                        (token genérico — gradiente/sombra)
  └── sections/
      ├── BrandSection.tsx
      ├── ColorsSection.tsx
      ├── TypographySection.tsx
      ├── GradientsShadowsSection.tsx
      ├── LogoSection.tsx
      ├── PrimitivesSection.tsx
      ├── LandingModulesSection.tsx
      └── DiagnosticoModulesSection.tsx
```

## Detalhes técnicos

- **Rota**: `createFileRoute("/design-system")` com `head()` próprio (`title: "Design System — Nexxu"`, `noindex` via `<meta name="robots" content="noindex">`).
- **Sidebar**: `position: sticky; top: 0; height: 100vh`; lista com âncoras `#brand`, `#cores`, etc. Usa `scroll-behavior: smooth` (já no css).
- **Copy-to-clipboard** nos swatches: `navigator.clipboard.writeText(value)` + estado local de feedback "Copiado!" (300ms).
- **Previews dos módulos**: renderizados diretamente (sem iframe). Cada `DSPreview` aplica `overflow: hidden; border-radius: 16px; border: 1px solid rgba(83,74,183,0.15)`. Para módulos que dependem de fundo dark (Hero, Footer, Nav scrolled), o container já aplica `bg-[var(--brand-dark)]`.
- **Nav** dentro do preview: usar key/wrapper para não conflitar com o Nav global da rota (a rota `/design-system` NÃO renderiza o `Nav` da landing globalmente — apenas o cabeçalho próprio do DS).
- **OrdemMethod / Faq / QuizQuestionView**: já têm estado interno — funcionam normalmente dentro do preview.
- **QuizResult**: criar wrapper `QuizResultDemo` que monta um array de respostas mock (uma por pilar) e chama `<QuizResult answers={mock} onRestart={() => {}} />`.
- **Tipografia / cores**: ler tokens via `getComputedStyle(document.documentElement).getPropertyValue('--brand-blue')` para mostrar o hex resolvido (ou listar os hex hardcoded — mais simples e SSR-safe; vou usar a lista hardcoded com referência ao token).
- **Sem novas dependências.** Usa apenas o que já existe (`@/lib/utils`, primitivos `ui-nexxu`, módulos existentes, `@tanstack/react-router`).
- **Acessibilidade**: sidebar é `<nav aria-label="Design system">`; cada seção é `<section aria-labelledby="...">`.

## Fora do escopo

- Não criar página de formulário (Fase 5 do plano original).
- Não modificar componentes existentes — design system apenas consome.
- Não adicionar geração automática de docs (MDX/Storybook). É uma página manual mas componentizada.
- Não linkar para `/design-system` a partir do site público (rota interna, descoberta via URL direta).
