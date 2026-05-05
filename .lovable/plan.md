Substituir as fotos atuais do Flávio e Rafael na página `/fundadores` pelas novas imagens enviadas (fundo roxo/azul institucional).

## Mudanças

1. Copiar as imagens enviadas para o projeto:
   - `user-uploads://flavio.png` → `public/lovable-uploads/flavio-horita.jpg`
   - `user-uploads://rafael.png` → `public/lovable-uploads/rafael-bruno.jpg`

   Mantém os mesmos caminhos já referenciados em `FoundersSection.tsx`, então nenhum ajuste de código é necessário.

2. Nenhuma alteração em `FoundersSection.tsx` — os `<img src="/lovable-uploads/...">` continuam apontando para os arquivos corretos, agora com as novas fotos.

## Resultado

Os cards dos fundadores passam a exibir as fotos novas (fundo escuro com gradiente roxo/azul), recortadas em círculo no topo, sem alterar bio, tags, accent, LinkedIn ou demais seções.