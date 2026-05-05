## Novo módulo: FoundersTeaser na Home

Criar um bloco resumido sobre os fundadores na home, posicionado entre `CasesSection` e `Faq`, com imagem dupla (Flávio + Rafael) e CTA para `/fundadores`.

### 1. Adicionar imagem dupla
- Copiar `user-uploads://40c4054f-7d9d-49dd-9691-661937684140.png` para `public/lovable-uploads/fundadores-nexxu.jpg`.

### 2. Criar `src/components/landing/FoundersTeaser.tsx`
Layout em 2 colunas (desktop) / empilhado (mobile), fundo `bg-brand-page`:

- **Coluna esquerda (imagem)**: a foto dupla em `rounded-2xl`, com `shadow-card` e leve `border` purple/blue.
- **Coluna direita (texto)**:
  - Eyebrow: "OS FUNDADORES" (purple, uppercase, tracking-widest).
  - Título (`font-display`, 3xl/4xl): "Quem está por trás do Método ORDEM™".
  - Parágrafo resumido: "Flávio Horita (PhD USP, CTO) e Rafael Bruno (VP de Mídia, MBA) já participaram de projetos digitais que impactam mais de 20 milhões de pessoas/mês — Globo, iFood, Ford, Petrobras. Agora aplicam essa experiência para estruturar PMEs que crescem sem depender do dono."
  - Linha de tags rápidas: `PhD USP` · `Warwick` · `MBA Madia` · `XBA StartSe` · `AI Summit 2026`.
  - CTA primário (`Link` do TanStack para `/fundadores`) com estilo do botão branco/gradiente já usado no projeto: "Conhecer os fundadores →".

### 3. Inserir no `src/routes/index.tsx`
Importar `FoundersTeaser` e renderizar entre `<CasesSection />` e `<Faq />`.

### Detalhes técnicos
- Usa apenas Tailwind + tokens existentes (`brand-purple`, `brand-blue`, `brand-page`, `shadow-card`, `font-display`).
- `Link` de `@tanstack/react-router` (já é o padrão do projeto, ver `FoundersSection.tsx`).
- Imagem servida de `public/lovable-uploads/` (mesmo padrão das fotos individuais), `loading="lazy"`.
- Sem novas dependências, sem mudanças de roteamento (rota `/fundadores` já existe).
