## Análise dos breakpoints intermediários (390–430px)

Após inspeção, o ponto crítico real é **o grid de stats em 3 colunas**:

- Em 390px com `px-5` (20px laterais) + `gap-x-3` (12px), cada coluna = `(390 - 40 - 24) / 3 ≈ 109px`.
- "IA no passo 4" em `text-[14px]` font-extrabold ocupa ~108px. Está no fio — em 375px (iPhone SE) já estoura e quebra entre "passo" e "4".
- Em 360px quebra também "R$20k+/mês".

Outros elementos (h1 32px, sub, CTAs em coluna, microcopy) já estão confortáveis nesse range. Não precisam de mudança.

## Mudanças (apenas `src/components/landing/Hero.tsx`)

### 1. Padding lateral do `<section>` mais enxuto
- `px-5 sm:px-[5%]` → **`px-4 sm:px-[5%]`** (16px em vez de 20px no mobile, ganha 8px de largura útil)

### 2. Stats — proteger o número de quebrar
- Número: `text-[14px]` → **`text-[13px] sm:text-[20px]`** + adicionar **`whitespace-nowrap`** (impede quebra como "IA no passo / 4")
- `gap-x-3` → **`gap-x-2 sm:gap-x-10`** (8px em vez de 12px no mobile, mais 8px de respiro por coluna)

### 3. Microcopy — garantir 1 linha em 360–430px
- `text-[12px]` → **`text-[11.5px] sm:text-[13px]`** (margem extra para evitar wrap em 360px)

### 4. H1 — folga adicional em 360–375px
- Mantém `text-[32px]` em mobile, mas trocar `tracking-tight` por **`tracking-[-0.01em]`** (levemente menos apertado, evita roçar borda em telas pequenas)

### Resultado esperado
- 360px (iPhone SE): toda dobra cabe, stats em 3 colunas sem quebra, microcopy em 1 linha.
- 390px (iPhone 14): respiro confortável em todos elementos.
- 430px (iPhone 14 Pro Max): mantém grid de 3 colunas com folga generosa.
- ≥640px: layout desktop intacto (todas as mudanças têm `sm:` revertendo aos valores originais).
