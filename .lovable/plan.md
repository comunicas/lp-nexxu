## Problema

O dev-server está cuspindo o erro:

```
Serialization error: Seroval Error  value: Symbol(react.forward_ref)
Invariant failed: Expected to find a dehydrated data on window.$_TSR.router
```

O `loader` em `src/routes/solucoes/$slug.tsx` retorna objetos de `solucoes-data.ts` que contêm `icon: LucideIcon` (componentes React do `lucide-react`). O TanStack Start tenta serializar o resultado do loader via `seroval` para enviar do servidor pro cliente, e componentes React (forwardRef) **não são serializáveis** — isso quebra o SSR, a hidratação falha e a página fica em branco / não carrega no preview.

## Causa raiz

`src/utils/solucoes-data.ts` define cada solução com:

```ts
{ icon: Clock, ... } // Clock é um componente React de lucide-react
```

E `src/routes/solucoes/$slug.tsx` retorna esses objetos diretamente do `loader`, que precisa ser serializável.

## Solução

Não usar o `loader` do TanStack para esses dados — eles são estáticos e já existem como módulo no bundle do cliente. Basta lê-los direto no `component` (sem passar pelo pipeline de serialização SSR).

### Mudanças em `src/routes/solucoes/$slug.tsx`

1. **Remover o `loader`** completamente.
2. **Manter `head()`** — só retorna strings (já é serializável, sem problema).
3. **No `component`**, usar `Route.useParams()` e chamar `getSolucaoBySlug(slug)` / `getSolucoesBySlugList(...)` ali. Se não achar, renderizar o `notFoundComponent` via `throw notFound()` dentro do componente (ou simplesmente retornar o markup de "não encontrado").

### Esqueleto resultante

```tsx
export const Route = createFileRoute("/solucoes/$slug")({
  head: ({ params }) => { /* mantém igual, só strings */ },
  component: function SolucaoPage() {
    const { slug } = Route.useParams();
    const solucao = getSolucaoBySlug(slug);
    if (!solucao) {
      return <NotFoundView />;
    }
    const relacionadas = getSolucoesBySlugList(solucao.relacionadas);
    return <SolucaoPageTemplate solucao={solucao} relacionadas={relacionadas} />;
  },
  errorComponent: ({ error }) => (...),
  notFoundComponent: () => (...),
});
```

## Verificação após o fix

1. Conferir `/tmp/dev-server-logs/dev-server.log` — não deve mais aparecer `Seroval Error`.
2. Carregar `/` e uma rota `/solucoes/<slug>` no preview do editor — devem renderizar sem tela branca.
3. Avisar o usuário para clicar em **Publish → Update** para que a correção também vá ao ar em `nexxulab.com` / `lp-nexxu.lovable.app`.

## Fora de escopo

- Não vou mexer em `solucoes-data.ts` (manter os ícones como componentes é o padrão correto para uso no cliente).
- Não vou alterar outras rotas — apenas `solucoes/$slug.tsx` tem `loader` que devolve dados não-serializáveis.
