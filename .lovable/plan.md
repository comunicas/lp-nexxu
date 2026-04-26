## Objetivo

Adicionar acessibilidade (a11y) consistente em toda a landing page sem alterar layout, copy ou animações — apenas atributos semânticos, foco visível por teclado e melhoria de contraste em pontos críticos.

## Princípios

- **Não mexer** em copy, layout, classes de animação, gradientes ou estrutura JSX.
- **Adicionar** `aria-label`, `aria-labelledby`, `role`, `aria-controls`, `aria-hidden`, `id` semânticos onde fazem falta.
- **Foco visível** global via utility CSS (`focus-visible:ring`) aplicada a links e botões — nunca remover outline.
- **Contraste**: ajustar apenas elementos abaixo de WCAG AA (4.5:1 texto / 3:1 UI).
- **Skip link** "Pular para o conteúdo" para navegação por teclado.
- **Respeito a `prefers-reduced-motion`**: orbs flutuantes e animações de entrada pausam quando o usuário pede menos movimento.

---

## Mudanças por arquivo

### 1. `src/styles.css` — base de a11y global

- Adicionar utility `.focus-ring` com `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-dark)]` (versão clara para fundos escuros) e variante `.focus-ring-light` para fundos claros (offset branco).
- Adicionar regra `@media (prefers-reduced-motion: reduce)` que neutraliza `animate-float-slow`, `animate-float-medium`, `animate-glow-pulse`, `animate-fade-up`, `animate-fade-in`, `animate-scale-in` e o `scrollHint` do Hero.
- Adicionar classe `.sr-only` (caso ainda não exista via Tailwind) usada pelo skip link.

### 2. `src/routes/__root.tsx` — skip link global

- Adicionar `<a href="#main-content" className="sr-only focus:not-sr-only ...">Pular para o conteúdo</a>` como primeiro filho do shell, posicionado fixo no topo quando focado, com fundo sólido e contraste alto.

### 3. `src/components/landing/Nav.tsx`

- Adicionar `aria-label="Principal"` no `<nav>`.
- Adicionar `aria-label` descritivo nos links âncora (Método/Produtos) — eles já têm texto visível, então só `focus-ring` (foco visível).
- Aplicar `focus-ring` em Logo, links de navegação e CTA.

### 4. `src/components/landing/Hero.tsx`

- Adicionar `id="main-content"` e `aria-labelledby="hero-headline"` na `<section>`.
- Adicionar `id="hero-headline"` no `<h1>`.
- Marcar as 3 divs de orb como `aria-hidden="true"` (decorativas).
- CTA primário: adicionar `aria-label="Iniciar diagnóstico gratuito do nível operacional"`.
- CTA secundário (#metodo): adicionar `aria-label="Ver detalhes do Método ORDEM"`.
- Stats: envolver o grupo em `<dl>` semântico — **NÃO**, manteria layout. Em vez disso, adicionar `role="list"` na div container e `role="listitem"` em cada stat com `aria-label` combinando `num + lbl`.
- Aplicar `focus-ring` aos dois CTAs e ao scroll indicator.
- Melhorar contraste: subtítulo `text-white/45` (linha do método/consultoria) → `text-white/60` (sobe de ~3.7:1 para ~5:1 sobre `--brand-dark`).

### 5. `src/components/landing/PainSection.tsx`

- Adicionar `aria-labelledby` apontando para o título do `SectionHeader` (criar `id` correspondente).
- Cada card de dor: envolver em `<article>` semântico (mantendo classes) com `aria-labelledby={`pain-${i}`}` e `id` correspondente no `<h3>`.
- Card CTA final: link com `aria-label="Fazer diagnóstico operacional gratuito"` e `focus-ring-light`.

### 6. `src/components/landing/Products.tsx`

- `<section>` com `aria-labelledby` ligado ao título.
- Indicador de progressão (1→4): adicionar `role="list"` na div container e `aria-label="Progressão de etapas"`. Marcar separadores `aria-hidden`.
- Cada `ProductCard` (já é `<article>`): adicionar `aria-labelledby={`prod-${step}`}` e `id` no `<h3>` do verbo.
- Badge "mais escolhido": já é texto, mas adicionar `aria-label` no article do featured indicando "produto mais escolhido".
- CTAs internos: `aria-label` específico por produto (ex.: `Quero o caminho ${verb}: ${category}`). Os dois símbolos `→` ficam `aria-hidden`.
- CTA rodapé: `aria-label="Conversar com a Nexxu sobre meu caso"`.
- Aplicar `focus-ring-light` em todos os Links/CTAs.

### 7. `src/components/landing/OrdemMethod.tsx`

- `<section>` com `aria-labelledby`.
- Botões das 5 letras: já têm `aria-pressed`. Adicionar:
  - `role="tab"` no botão e envolver a fila em `role="tablist"` com `aria-label="Etapas do Método ORDEM"`.
  - `aria-controls="ordem-panel"` em cada botão e `aria-label="${name}: etapa ${i+1} do método"`.
  - `focus-ring-light`.
- Painel da letra ativa: adicionar `id="ordem-panel"`, `role="tabpanel"`, `aria-live="polite"`, `tabIndex={-1}` para receber foco quando alterna.
- Timeline: `role="list"` no grid, cada card com `role="listitem"` e `<h4>` mantém o título.

### 8. `src/components/landing/IndiceSection.tsx`

- `<section>` com `aria-labelledby`.
- Grid dos 4 níveis: `role="list"`, cada card `role="listitem"` e adicionar um `<h3>` semântico (atualmente é só `<div>` com nome do nível) — converter o div do nome em `<h3>` mantendo as classes.
- Substituir os handlers `onMouseEnter/onMouseLeave` que mexem em `boxShadow` inline por classes `hover:` no Tailwind com a mesma cor de glow — necessário para que o efeito também responda a foco por teclado (`focus-visible:shadow-...`). Como cada card tem cor de glow dinâmica via prop, manter inline mas adicionar também handlers `onFocus/onBlur` espelhando o comportamento, e `tabIndex={0}` para que cards alcancem foco (eles não são interativos hoje, então alternativa: deixar sem foco e remover handlers de mouse para apenas adicionar uma classe `hover:bg-white/[0.06]` mais forte). **Decisão**: cards são puramente informativos → manter sem foco, sem handlers, e mover o efeito visual para puro `hover:` CSS — remover handlers JS.
- Card CTA final: link com `aria-label="Fazer diagnóstico operacional gratuito"` e `focus-ring`.
- Melhorar contraste do texto descritivo `text-white/50` → `text-white/65` nos cards de níveis.

### 9. `src/components/landing/CasesSection.tsx`

- `<section>` com `aria-labelledby`.
- Cada card: envolver em `<article>` (substituindo `<div>`) com `aria-labelledby` apontando para um `id` na linha do `stat`.
- Quote: usar `<blockquote>` em vez de `<p>` para a citação, com `<cite>` no contexto (`Agência B2B · ...`). Mantém todas as classes atuais.

### 10. `src/components/landing/Faq.tsx`

- `<section>` com `aria-labelledby`.
- `FaqItem`: o `<button>` precisa de `aria-controls={`faq-panel-${i}`}` e o painel precisa de `id` correspondente + `role="region"` + `aria-labelledby={`faq-q-${i}`}` no botão.
- Adicionar `id` no `<span>` da pergunta para amarrar o `aria-labelledby` da região.
- Aplicar `focus-ring-light` no botão.
- O painel `max-h-0` esconde visualmente mas continua no DOM e legível por leitores de tela — adicionar `aria-hidden={!open}` e `inert` (via atributo) quando fechado para evitar foco em conteúdo invisível.

### 11. `src/components/landing/Footer.tsx`

- Adicionar `aria-labelledby` no `<footer>` (já é landmark, só rotular).
- Adicionar `<h2 className="sr-only">Rodapé</h2>` para o landmark ter nome acessível.
- Cada coluna de links: envolver em `<nav aria-label="...">` (Método, Contato).
- Aplicar `focus-ring` nos links âncora.
- Email "contato@nexxu.com.br" — converter em `<a href="mailto:...">` com `focus-ring`.
- Melhorar contraste: `text-white/40` da descrição → `text-white/55`; `text-white/25` do copyright → `text-white/45`.

---

## Detalhes técnicos

**Padrão para identificar seções:**
```tsx
// SectionHeader não expõe id no h2 hoje. Solução sem alterar o componente:
<section aria-labelledby="metodo-title">
  <SectionHeader title={<span id="metodo-title">Método <span className="grad-text">ORDEM™</span></span>} ... />
```
O `SectionHeader` aceita `title: ReactNode`, então o `id` vai dentro do conteúdo, sem mexer no componente.

**focus-ring (em styles.css, dentro de `@layer utilities`):**
```css
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple-light)] focus-visible:ring-offset-2;
  --tw-ring-offset-color: var(--brand-dark);
}
.focus-ring-light {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple)] focus-visible:ring-offset-2;
  --tw-ring-offset-color: #ffffff;
}
```

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-float-slow,
  .animate-float-medium,
  .animate-glow-pulse,
  .animate-fade-up,
  .animate-fade-in,
  .animate-scale-in { animation: none !important; }
}
```

**O que NÃO muda:** classes de cor de texto/fundo (exceto os 4 ajustes de contraste listados), gradientes, copy, estrutura de breakpoints, animações em si (só pausam por preferência do usuário), `<Link to="/diagnostico">` em todos os pontos.

## Checklist de saída esperada

- Tab navigation percorre Nav → Skip link visível → Hero CTAs → âncoras → cards de produto → tabs do ORDEM → CTAs finais → FAQ → Footer, com anel de foco visível em cada um.
- Leitores de tela anunciam landmarks (banner, main, navigation, contentinfo) e cada seção com título.
- FAQ funciona como disclosure correto (`aria-expanded` + `aria-controls` + `inert` no painel fechado).
- ORDEM funciona como tablist + tabpanel com live region.
- Sem regressão visual em nenhum breakpoint.
