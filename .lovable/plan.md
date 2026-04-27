## Atualizar resposta do FAQ sobre a call de diagnóstico

**Arquivo:** `src/components/landing/Faq.tsx`

**Mudança única:** No array `FAQS`, localizar o item com `q: "Como funciona a call de diagnóstico?"` e substituir apenas o valor do campo `a` pelo novo texto que distingue os dois momentos do funil (formulário online vs. call humana).

### Texto novo (campo `a`)

> "São dois momentos distintos. Primeiro, o formulário online: 10 perguntas objetivas, ~3 minutos, resultado imediato com seu Índice ORDEM™. Depois, se fizer sentido, uma call de 15–30 minutos com a gente para aprofundar o diagnóstico e definir o caminho certo — sem pressão de venda."

### Preservado integralmente

- Estrutura do array `FAQS` e todas as outras 4 perguntas/respostas
- Componente `FaqItem` (lógica de accordion, ícone, animação)
- Estado `openIdx` e lógica de toggle
- `SectionHeader`, layout, classes e estilos da seção

### Resultado

O FAQ deixa de soar contraditório para o lead que acabou de completar o quiz em ~3 minutos: o formulário online (rápido, automático) e a call humana (15–30 min, aprofundamento) ficam claramente separados.