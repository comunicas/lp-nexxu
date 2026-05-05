## Simplificar carrossel da Trajetória — apenas imagens

Remover textos (tag e legenda) dos cards do carrossel em `/fundadores`, mantendo somente as fotos.

### Mudanças em `src/components/landing/FoundersJourney.tsx`

1. **Card slim**: substituir o `<article>` atual (imagem + bloco `p-5` com tag e caption) por um card só com a imagem:
   - Container `rounded-2xl overflow-hidden shadow-card border border-brand-purple/10 h-full`
   - `<img>` com `aspect-video object-cover w-full h-full`
   - Manter `alt` descritivo para acessibilidade (não é texto visível)
2. **Limpeza**: remover os campos `tag` e `caption` do tipo `Slide` e dos 9 itens do array `SLIDES` (mantendo `src` e `alt`).
3. **Manter**: header da seção ("TRAJETÓRIA / De palcos, bastidores e operações reais"), navegação (setas), dots de paginação e responsividade (1/2/3 slides).

Sem mudanças em outros arquivos.
