
## Refino UX do componente Products (`src/components/landing/Products.tsx`)

### Diagnóstico dos problemas atuais

1. **Densidade visual**: 4 cards numa única linha em desktop espremem o texto — bullets quebram em 2-3 linhas e prejudicam o scan.
2. **Hierarquia confusa**: T1 / Nome / Modelo (DoItYourself) / Período empilham 4 níveis tipográficos pequenos sem respiro.
3. **Modelo técnico sem tradução**: "DoItYourself / DoWithYou / DoForYou" é jargão — o usuário precisa decodificar.
4. **Falta âncora de decisão**: nenhum card responde "esse aqui é pra mim porque…".
5. **Sem progressão visível**: os 4 tiers são uma jornada (diagnosticar → estruturar → implementar → operar), mas cada card aparece como uma opção isolada.
6. **Variantes de cor inconsistentes**: azul, roxo, featured e dark competem sem reforçar significado — o olho não sabe onde pousar.
7. **CTA único no rodapé**: forçar scroll até o botão geral perde quem decidiu no T2 ou T4.
8. **Entregável escondido**: vai num pill cinza no rodapé, com tipografia menor que os bullets — sendo que ele é o ponto-chave de venda.

### Princípios de UX aplicados

- **Hierarquia única por card**: 1 título grande, 1 subtítulo claro, 1 promessa-âncora, 1 lista, 1 CTA.
- **Progressão narrativa**: numerador "Etapa 1 de 4" + label de intenção ("Para mapear", "Para estruturar", "Para implementar", "Para terceirizar").
- **Featured contido**: destaque sutil (badge + borda gradiente + leve elevação) — sem deslocar o grid nem brigar com os vizinhos.
- **Entregável como promessa, não como tag**: vira o subtítulo do card ("Você sai sabendo onde está o problema").
- **CTA por card**: link discreto "Quero esse →" que leva para `/diagnostico` com âncora.
- **Respiração**: layout 2x2 em telas médias, 1x4 só em telas largas (≥1280px) com `max-w-[1200px]`.

### Nova estrutura de cada card (de cima para baixo)

```text
┌─────────────────────────────────┐
│ ETAPA 1 · DIAGNÓSTICO           │  ← eyebrow tipo step
│                                 │
│ Mapear                          │  ← verbo de ação grande (display)
│ Você sai sabendo onde está      │  ← promessa (era "entregável")
│ o problema.                     │
│ ─────────────────────────────── │
│ ⏱ 45 dias  ·  1–3 processos     │  ← meta info compacta
│                                 │
│ ✓ Processos mapeados            │  ← bullets (sem quebra dura)
│ ✓ Gargalos identificados        │
│ ✓ Plano de ação priorizado      │
│ ✓ Índice ORDEM™ calculado       │
│                                 │
│ Quero esse →                    │  ← CTA por card
└─────────────────────────────────┘
```

### Mudanças concretas no código

1. **Atualizar o tipo `Product`**:
   - Substituir `name` por `verb` (Mapear / Estruturar / Implementar / Terceirizar).
   - Renomear `model` → `audience` (texto humano: "Para quem quer começar a entender a operação").
   - Trocar `deliverable` por `promise` (frase curta usada como subtítulo).
   - Adicionar `step: 1 | 2 | 3 | 4`.

2. **Reduzir variantes para apenas 2**: `default` (branco) e `featured` (gradiente sutil + badge). Eliminar `light-blue`, `light-purple` e `dark` — a cor agora vem do step accent (faixa lateral fina de 3px com `--brand-blue → --brand-purple → gradient → --brand-dark` usada apenas como detalhe de progressão, não como cor de fundo).

3. **Layout do grid**:
   - `grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5`
   - Container `max-w-[1200px]`
   - Cards com `min-h` consistente para alinhar bullets e CTAs.

4. **Header do card**:
   - Eyebrow `ETAPA N · CATEGORIA` em `text-[11px] tracking-widest`.
   - Verbo em `font-display text-[28px] font-extrabold`.
   - Promessa em `text-[14px] text-brand-muted` (2 linhas máx).
   - Divider sutil.

5. **Meta info**: linha única com ícone de relógio inline + período + contagem de processos, em `text-[12px] text-brand-subtle`.

6. **Bullets**: lista com `gap-3`, `text-[13.5px]`, `leading-relaxed`. Frases reescritas para caber em 1 linha em desktop (ex: "Índice ORDEM™ calculado" em vez de "Índice ORDEM™ da sua operação").

7. **CTA por card**: `<Link to="/diagnostico">` estilizado como link forte (não botão pesado) — `inline-flex`, sublinha em hover, cor `--brand-purple`. No featured, vira botão sólido com `bg-brand-gradient`.

8. **Featured tratamento**:
   - Badge "mais escolhido" no topo direito (mantém).
   - Borda externa com `outline: 1.5px solid rgba(83,74,183,.4)` + `box-shadow` glow leve.
   - Sem `-translate-y` (não desalinha o grid).
   - Topo com a mesma faixa de step accent, só que em gradiente cheio.

9. **Header da seção** (`SectionHeader`): manter, mas refinar a descrição para introduzir a ideia de jornada: *"Quatro caminhos. Mesma direção: tirar a operação das suas costas."*

10. **Rodapé da seção**: manter o CTA central como reforço, mas reduzir peso visual (botão menor + microcopy abaixo). Razão: agora cada card já tem seu CTA.

### Arquivos afetados

- `src/components/landing/Products.tsx` — reescrita do componente (mantém export, `id="produtos"`, mesma rota de destino `/diagnostico`).

### Não muda

- Tokens em `styles.css` (uso só o que já existe).
- `SectionHeader`, `Badge`, `CheckIcon`, `Button` (primitivos do DS).
- A integração com `/design-system` continua viva — o preview lá reflete automaticamente o novo design.
- Demais seções da landing.
