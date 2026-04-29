## Remover card de nota da seção ORDEM™

O card mostrado no screenshot ("A sequência é sempre essa. O quanto a Nexxu assume na execução — a conversa de diagnóstico define.") fica entre o card de detalhe da letra ativa (O/R/D/E/M) e o grid de 3 cards do timeline (30/60/90 dias).

### Mudança

**Arquivo:** `src/components/landing/OrdemMethod.tsx`

Remover o bloco completo das linhas 132–142:

```tsx
<div className="mb-10 mx-auto p-5 rounded-2xl border border-[rgba(83,74,183,0.15)] bg-[rgba(83,74,183,0.03)] max-w-[600px]">
  <p className="text-sm text-[var(--brand-muted)] leading-relaxed m-0">
    <span className="font-semibold text-[var(--brand-text)]">
      A sequência é sempre essa.
    </span>{" "}
    O quanto a Nexxu assume na execução —{" "}
    <span className="text-[var(--brand-purple)] font-medium">
      a conversa de diagnóstico define.
    </span>
  </p>
</div>
```

### Preservar

- Todo o resto do componente intacto: header, abas O/R/D/E/M, card de detalhe da letra ativa, e o grid timeline (30/60/90 dias) logo abaixo.
- O espaçamento entre o card de detalhe (que já tem `marginBottom: 60`) e o grid do timeline continuará adequado, sem necessidade de ajuste adicional.

### Resultado

A seção ORDEM™ passa do card de detalhe da letra direto para os 3 cards do timeline, sem a caixa de nota intermediária.
