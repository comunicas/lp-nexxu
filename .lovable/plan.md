## Diagnóstico (a partir do screenshot 390px)

1. **Quebras feias do sub** — "antes / de qualquer IA entrar." e "depender de / você para funcionar" cortam frases no meio.
2. **Stats ocupam ~50% da viewport** — `flex-col` + `gap-y-6` + 3 itens empilhados criam um bloco vertical enorme; "R$20k+/mês" só aparece muito abaixo da dobra.
3. **Microcopy** "Método ORDEM™ · Consultoria de inovação operacional · PMEs com R$20k+/mês" quebra em 2 linhas e empurra tudo para baixo.
4. **H1 "Só escala o caos."** está bem perto da borda direita em 32–34px.
5. **Espaçamentos verticais** (`mb-9`, `mb-12`, `gap-y-6`) calibrados para desktop, exagerados em mobile.

## Mudanças (apenas `src/components/landing/Hero.tsx`)

### Copy resumida
- **Badge**: "Para donos de PME que já tentaram IA — e o caos continuou" → **"Para PMEs que já tentaram IA — e o caos continuou"**
- **Sub**: 2 frases viram 1 linha contínua, sem `<span block>`:
  > "A Nexxu organiza processo, rotina e dados **antes da IA entrar** — em 90 dias sua empresa para de depender de você."
- **Microcopy**: "Método ORDEM™ · Consultoria de inovação operacional · PMEs com R$20k+/mês" → **"Método ORDEM™ · PMEs com R$20k+/mês"**
- **CTA primário**: "Descobrir meu nível operacional →" → **"Descobrir meu nível →"**
- **Stat labels** mais curtos:
  - "para parar de apagar incêndio na própria empresa" → **"para sair do operacional"**
  - "Processo, rotinas e dados vêm antes. Sempre." → **"Processo vem antes. Sempre."**
  - "Para quem já tem operação — e quer ela funcionando" → **"Para quem já tem operação"**

### Tipografia
- H1 mobile: `text-[34px]` → **`text-[32px]`** (folga de borda).
- Sub: `text-white/70` → **`text-white/75`** + `text-pretty` (algoritmo de wrap melhor).
- Stat número mobile: `text-[18px]` → **`text-[14px]`** (cabe em 3 colunas).
- Stat label: `text-[11px]` → **`text-[10.5px]`** em mobile.

### Espaçamento
- Badge: `mb-6 sm:mb-7` → `mb-5 sm:mb-7`
- H1: `mb-5 sm:mb-6` → `mb-4 sm:mb-6`
- Microcopy: `mb-9 sm:mb-10` → `mb-7 sm:mb-10`
- CTAs: `mb-12` → `mb-10 sm:mb-12`
- CTAs padding lateral mobile: `px-7` → `px-6` (mais respiro nas bordas)

### Layout dos stats (a maior melhoria)
- Mobile: trocar `flex flex-col gap-y-6` por **`grid grid-cols-3 gap-x-3`** — 3 stats lado a lado, ocupa ~1 linha em vez de 3.
- Desktop (sm+): mantém `flex flex-row gap-x-10` como antes via `sm:flex sm:flex-row`.
- Largura: `max-w-[560px]` em mobile pra estabilizar o grid.

### Resultado esperado
- Toda a dobra inicial (badge → h1 → sub → microcopy → CTAs → stats) cabe acima do fold em 390×844 sem cortar.
- Nenhuma frase quebrada em meio de palavra ou conceito.
- Hierarquia preserva: badge < microcopy < stat label < sub < stat número < h1.
- Desktop (≥640px) permanece visualmente idêntico ao layout atual.
