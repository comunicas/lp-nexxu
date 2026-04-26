
# Fase 2 — Componentes da Landing Page

Criar 5 componentes em `src/components/landing/` usando o design system da Fase 1 (tokens `--brand-*`, utilities `grad-text*`, `bg-brand-gradient`, `shadow-brand-glow*`, e primitivos `Logo`, `Button`, `Badge`, `SectionHeader`, `CheckIcon`).

## Arquivos a criar

### 1. `Nav.tsx`
- Nav fixo no topo, transparente por padrão.
- Hook de scroll (`window.scrollY > 20`) ativa fundo `rgba(15,12,26,0.92)` + blur + borda inferior roxa.
- Logo (componente `Logo` full) à esquerda dentro de `<Link to="/">`.
- Links âncora `#metodo` e `#produtos` (ocultos abaixo de `sm`).
- CTA `<Link to="/diagnostico">` "Falar com a Nexxu" com gradiente da marca.

### 2. `Hero.tsx`
- Seção dark full-height (`bg-[var(--brand-dark)]`, `min-h-screen`).
- Dois orbs ambientais via `radial-gradient` (azul à esquerda, roxo à direita).
- `<Badge variant="hero">` com dot teal: "CONSULTORIA DE INOVAÇÃO OPERACIONAL".
- H1 com classe `grad-text-hero` (clamp 44–80px), 3 linhas: "Você não tem / problema de esforço. / Tem problema de processo."
- Subhead em `text-white/60`.
- Dois CTAs: `Link` primário "Descubra seu nível operacional →" para `/diagnostico` e âncora ghost "Ver o método" para `#metodo`.
- 3 stats com números em `grad-text-light`.
- Indicador "SCROLL" no rodapé.

### 3. `OrdemMethod.tsx`
- Seção com `id="metodo"`, fundo gradiente azul→roxo claro.
- Estado local `useState<number>` controla letra ativa (0 = O).
- Constante `LETTERS` com 5 itens: O/Organização, R/Rotinas, D/Dados, E/Eficiência IA, M/Maturidade — cada um com `letter`, `short`, `name`, `desc`.
- 5 botões 72×72 px arredondados; o ativo recebe `bg-brand-gradient` + `shadow-brand-glow-sm`, os demais `bg-[rgba(83,74,183,0.08)]`.
- Card central reativo (600px) exibe a letra grande em `grad-text` + nome + descrição.
- Timeline grid (1 col mobile, 3 cols desktop) com 30/60/90 dias, cores azul/roxo/teal por item.

### 4. `Products.tsx`
- Seção com `id="produtos"`, fundo branco.
- Constante `PRODUCTS` com 4 itens (T1 Diagnóstico, T2 Mentoria, T3 Implementação featured, T4 Serviço dark).
- Componente interno `ProductCard` com prop `variant`: `"light-blue" | "light-purple" | "featured" | "dark"`.
- Variante `featured`: gradiente sutil azul→roxo, outline roxo, glow forte, badge "mais escolhido", barra superior gradiente, leve `-translate-y`.
- Variante `dark`: fundo `#0F0C1A` com texto branco e checks roxo claro (usa `<CheckIcon variant="dark" />`).
- Variantes claras usam `<CheckIcon />` padrão (verde teal).
- CTA inferior `<Link to="/diagnostico">` + texto "15 minutos. Sem pitch de venda. Só diagnóstico."

### 5. `Faq.tsx`
- Container 720px, fundo branco.
- Constante `FAQS` com 5 perguntas/respostas (cópia fiel do HTML).
- Estado `useState<number | null>` controla qual item está aberto (apenas um por vez; primeiro aberto por padrão).
- Cada `FaqItem` é um `<button>` (`aria-expanded`) com chevron que rotaciona 180° quando aberto.
- Resposta usa `max-h` animado para efeito accordion suave.
- Item aberto recebe borda e fundo levemente roxos.

## Padrões aplicados em todos os componentes

- Sem cores hard-coded de Tailwind (`text-white`, etc) onde houver token equivalente — uso direto de `var(--brand-*)` ou utilities da marca quando há gradiente/glow.
- `cn()` (de `@/lib/utils`) para classes condicionais.
- Imports com alias `@/components/ui-nexxu/*`.
- Links internos via `<Link>` do `@tanstack/react-router` (nunca `<a href="/...">`).
- Acessibilidade: `aria-pressed` nos botões da letra, `aria-expanded` no FAQ, `aria-label` nos SVGs.

## Fora do escopo desta fase

- `PainSection`, `IndiceSection`, `CasesSection`, `Footer` — virão na Fase 2b (mesma fase do plano original, separadas só para entregar este lote primeiro).
- Composição em `src/routes/index.tsx` — Fase 3.
