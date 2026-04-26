## Ajustes no Hero (`src/components/landing/Hero.tsx`)

### Diagnóstico do que está quebrado

1. **H1 desproporcional no desktop (1414px)** — `clamp(44px, 6vw, 80px)` resolve em ~80px e os 3 `<br />` forçam linhas curtas, criando blocos enormes que comem espaço vertical e empurram os stats pra baixo do fold.
2. **Parágrafo sub-headline grande demais** — `clamp(16px, 2vw, 20px)` chega no teto em telas largas e compete em peso com o h1.
3. **Indicador de SCROLL quebrado** — está com `opacity-40` no container inteiro (texto quase ilegível), é só um traço estático sem affordance de scroll, e fica colado em `bottom-8` numa seção `min-h-screen justify-center` — em telas curtas ou com zoom o traço se sobrepõe ao bloco de stats.
4. **Sem "legados" estruturais** além dos `<br />` no h1 — o resto do componente já usa o `Badge variant="hero"` atual, gradientes de fundo e CTAs corretos. Não há código morto a remover.

### Mudanças propostas

**Tipografia (escala mais equilibrada)**
- H1: `clamp(44px,6vw,80px)` → **`clamp(36px,5vw,64px)`**, com `text-balance` e `max-w-[760px]` pra quebra natural em 2 linhas. Remove os 3 `<br />` — texto vira frase corrida.
- Parágrafo: `clamp(16px,2vw,20px)` → **`clamp(15px,1.5vw,18px)`** e cor `white/60` → `white/65` (legibilidade).
- Stats: número `22px` → `20px`, label `xs (12px)` → `11px` com `mt-2` pra respiro. Spacing `gap-10` → `gap-x-10 gap-y-6` pra wrap limpo no mobile.
- CTAs: `text-base` (16px) → `text-[15px]`, padding `px-8 py-4` → `px-7 py-3.5` pra alinhar com a nova escala.
- Container: `max-w-[780px]` → `max-w-[860px]` (acomoda h1 em uma linha quando couber).

**Indicador de scroll (refeito)**
- Vira um `<a href="#metodo">` clicável (não só decorativo) com `aria-label`.
- Substitui o traço vertical por um **ícone de mouse com scroll dot** SVG animado (padrão reconhecível).
- Animação `scrollHint` de 1.8s: dot desce 4px e desvanece — comunica "role pra baixo" sem JS.
- Cor `text-white/55` (legível) com hover `text-white/80`.
- `hidden md:flex` — esconde em mobile pra nunca colidir com os stats.
- Seção ganha `pb-32` (era `pb-20`) pra garantir espaço entre stats e o indicador.

### Antes / depois (ASCII)

```text
ANTES                          DEPOIS
┌──────────────────┐           ┌──────────────────┐
│  [badge]         │           │  [badge]         │
│                  │           │                  │
│  VOCÊ NÃO TEM    │           │  Você não tem    │
│  PROBLEMA DE     │  80px     │  problema de     │ 64px
│  ESFORÇO.        │  3 linhas │  esforço. Tem    │ 2 linhas
│  TEM PROBLEMA    │  forçadas │  problema de     │ naturais
│  DE PROCESSO.    │           │  processo.       │
│                  │           │                  │
│  parágrafo 20px  │           │  parágrafo 18px  │
│  [CTA] [CTA]     │           │  [CTA] [CTA]     │
│  90d  0  ORDEM   │  stats    │  90d  0  ORDEM   │  stats
│                  │  colados  │                  │  com ar
│ |  ← traço pálido│           │ [▾ mouse anim.]  │  scroll
└──────────────────┘           └──────────────────┘  hint
```

### Arquivos tocados
- `src/components/landing/Hero.tsx` — único arquivo. Sem mudanças em `styles.css`, Badge, ou outras seções.

### O que NÃO muda
- Cores, gradientes radiais de fundo, classe `grad-text-hero`, badge, copy do h1/sub/stats/CTAs, link de destino do CTA principal.
