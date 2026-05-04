## Reframe da seção Trilha — de "caminhos" para "4 produtos"

Hoje a seção `Products` (`src/components/landing/Products.tsx`) é apresentada como uma trilha sequencial ("Quatro caminhos. Mesma direção.", indicador 01→02→03→04, CTA "Quero esse caminho"). A proposta é reposicionar como **quatro produtos** independentes que se adaptam ao momento do cliente, mantendo o mesmo grid de 4 cards.

### Mudanças em `src/components/landing/Products.tsx`

1. **Header da seção**
   - `label`: `TRILHA DO MÉTODO ORDEM™` → `NOSSOS PRODUTOS`
   - `title`: substituir por
     ```
     Nos adaptamos
     ao seu momento.
     ```
     (segunda linha em `grad-text`)
   - `description`: trocar por algo como: "Quatro produtos para quatro estágios de maturidade. Você escolhe por onde entrar — a Nexxu se ajusta ao tamanho do seu caos."

2. **Remover o indicador de progressão 01–02–03–04** (linhas ~213–235). Ele reforça a ideia de trilha linear; sai por completo.

3. **Eyebrow dos cards**
   - Trocar `ETAPA {n} · {CATEGORIA}` por apenas `{CATEGORIA}` (ex.: `DIAGNÓSTICO`, `MENTORIA`, `IMPLEMENTAÇÃO`, `SERVIÇO`), com a mesma tipografia atual. Mantém hierarquia visual sem sugerir ordem.

4. **CTA dos cards**
   - "Quero esse caminho →" → "Quero esse produto →" (tanto na variante featured quanto nas demais).

5. **Bloco final (após o grid)**
   - Texto: "Não sabe por onde começar? O diagnóstico define isso." → "Em dúvida sobre qual produto faz sentido agora? A gente te orienta."
   - Botão: "Conversar sobre meu caso →" (mantém)
   - Subtexto: mantém ("15 minutos. Sem pitch. Só diagnóstico.")

6. **Tipo `Product`**: o campo `step: 1|2|3|4` permanece (usado como `key`), mas deixa de ser exibido como "ETAPA". Sem mudança estrutural além de remover o uso visual.

### Fora de escopo
- Conteúdo dos bullets, durações, escopos e cores dos 4 cards ficam como estão.
- `Hero`, `OrdemMethod` e demais seções não são tocadas — o método ORDEM™ continua sendo a metodologia; a seção Products apenas para de se vender como "trilha".
- Sem mudanças em rotas, dados ou backend.

### Resultado esperado
A seção `#produtos` passa a comunicar "4 produtos que se adaptam ao seu momento" em vez de uma trilha sequencial obrigatória, mantendo layout, cores e CTAs principais.