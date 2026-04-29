## Problema

Na seção Hero (`src/components/landing/Hero.tsx`), o indicador "SCROLL" está posicionado de forma absoluta (`absolute bottom-8`) enquanto os badges estatísticos ("90 dias" / "Processo") ficam no fluxo normal. Em viewports com altura ~850px, o conteúdo central centralizado empurra os stats para baixo até colidirem visualmente com o SCROLL, criando o efeito de "cortado" que aparece no print.

## Causa

- `<section>` usa `min-h-screen` + `justify-center` + `pb-20` (80px).
- O indicador SCROLL é `absolute bottom-8` (32px do fundo) — fora do fluxo, sem reserva de espaço.
- Os stats acabam ocupando a faixa onde o SCROLL renderiza.

## Correção proposta

Aumentar o padding-bottom da section para reservar espaço suficiente abaixo dos stats, garantindo que o indicador SCROLL nunca colida com o conteúdo, em qualquer altura razoável de viewport.

### Mudança única em `src/components/landing/Hero.tsx`

Na tag `<section>`, alterar `pb-20` para `pb-32` (de 80px para 128px). Isso adiciona ~48px de folga entre os stats e o indicador SCROLL no `bottom-8`, eliminando a sobreposição em viewports a partir de ~720px de altura sem afetar o restante do layout.

Nada mais é alterado — estrutura JSX, classes dos filhos, conteúdo dos badges e o próprio bloco SCROLL ficam exatamente como estão.

## Resultado esperado

O indicador "SCROLL" aparece nitidamente abaixo dos dois badges estatísticos, com respiro visual, sem corte ou sobreposição na viewport atual (1336x853) e em telas menores/maiores.