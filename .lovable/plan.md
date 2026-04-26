## Objetivo

Garantir que o H1 e o parágrafo sub do Hero não tenham linhas cortadas, sobreposição ou wrap quebrado em mobile (375px) e tablet (640px), mantendo o impacto visual no desktop.

## Diagnóstico

**H1 atual:**
```
text-[38px] sm:text-[54px] lg:text-[74px]
<span className="block">IA sem processo</span>
<span className="block">não resolve.</span>
<span className="block mt-1">Só escala o caos.</span>
```

- Em **375px** com padding `px-5` (20px lateral) → largura útil ~335px. "IA sem processo" em 38px/extrabold cabe (~280px), "Só escala o caos." cabe. Margem confortável.
- Em **640px (sm)** o salto direto pra **54px** é agressivo: "Só escala o caos." em 54px extrabold ≈ 430px → cabe em 600px úteis, mas fica colado nas bordas em viewports de 600–640px (resoluções intermediárias entre `sm` e o ponto onde sobra ar).
- O `mt-1` na 3ª linha cria respiro inconsistente entre linhas (1 e 2 sem gap, 3 com gap).

**Sub atual:**
```
text-[15px] sm:text-[17px] lg:text-[19px]
"... antes de qualquer IA entrar." + <br className="hidden sm:block" />
<span className="block mt-2">Em 90 dias, ...</span>
```

- O `<br className="hidden sm:block" />` injeta uma quebra **só no sm+**, mas a 2ª frase já está num `<span className="block">` — ou seja, vira **duas quebras** no sm+ (br + block), criando uma linha em branco visível entre as frases no tablet/desktop.
- Em mobile sem o br, o block já dá a quebra única correta — então o `<br>` é redundante e quebra o ritmo no sm+.

## Mudanças

### 1. H1 — escala intermediária + leading uniforme

Adicionar breakpoint `md` para suavizar o salto 38→54→74:

```tsx
className="... text-[34px] sm:text-[48px] md:text-[60px] lg:text-[74px] leading-[1.05]"
```

E remover o `mt-1` da 3ª linha (o `leading-[1.05]` já dá respiro consistente entre as 3 linhas):

```tsx
<span className="block">IA sem processo</span>
<span className="block">não resolve.</span>
<span className="block">Só escala o caos.</span>
```

Resultado:
- **375px**: 34px → "Só escala o caos." ≈ 235px, folga generosa.
- **640px**: 48px → ~380px, margem confortável dentro de 600px úteis.
- **768px (md)**: 60px → impacto visual sem risco.
- **1024px+ (lg)**: 74px (inalterado).

### 2. Sub — remover `<br>` redundante

```tsx
<p className="...">
  A Nexxu organiza processo, rotina e dados{" "}
  <span className="text-white/90 font-semibold">antes de qualquer IA entrar.</span>
  <span className="block mt-2">
    Em 90 dias, sua empresa para de depender de você para funcionar.
  </span>
</p>
```

O `<br className="hidden sm:block" />` é removido. O `<span className="block mt-2">` sozinho já garante quebra única correta em todos os breakpoints, com 8px de respiro entre as frases.

### 3. Sub — escala intermediária

```tsx
className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[19px] ..."
```

Salto mais suave entre mobile e tablet, evitando texto grande demais em viewports de 640–767px.

## Arquivo tocado

- `src/components/landing/Hero.tsx` — apenas o H1 e o `<p>` do sub. Badge, CTAs, stats, orbs e scroll indicator ficam intactos.

## O que NÃO muda

- Copy (texto literal das 3 linhas e das 2 frases)
- Cores, gradientes, animações, classes de delay
- Estrutura de Link/href, Badge, layout de CTAs e stats
- Padding lateral da section
