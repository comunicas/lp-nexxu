## Carrossel "Trajetória" na página /fundadores

Adicionar um carrossel interativo com as 9 fotos enviadas, contando visualmente a história dos fundadores em palcos, eventos e bastidores.

### 1. Copiar imagens para o projeto
Copiar os 9 uploads para `public/lovable-uploads/trajetoria/` com nomes semânticos:

- `futurecom.jpg` — Rafael no palco Futurecom 30 anos
- `workshop-logistica.jpg` — Rafael em workshop de inovação (post-its)
- `sprintpro.jpg` — Rafael palestrando SprintPro
- `forum-apps.jpg` — Rafael em painel "Fórum dos Apps" (Climatempo)
- `tdc-business.jpg` — Rafael palestrando TDC Business (Data Science)
- `qa-startup.jpg` — Rafael em Q&A de startup
- `climatempo-workshop.jpg` — Time Climatempo em treinamento
- `google-cloud-summit.jpg` — Flávio + time no Google Cloud Summit SP
- `app-summit-google.jpg` — Flávio palestrando no App Summit Google

### 2. Criar `src/components/landing/FoundersJourney.tsx`

Componente client-side usando o `Carousel` já existente do projeto (`@/components/ui/carousel`, embla):

- **Header da seção**:
  - Eyebrow: "TRAJETÓRIA" (purple)
  - Título: "De palcos, bastidores e operações reais"
  - Subtítulo curto: "Mais de uma década compartilhando o que aprenderam em eventos como AI Summit, Futurecom, TDC, Google Cloud Summit e dentro de operações com milhões de usuários."

- **Carousel** com `opts={{ align: "start", loop: true }}`:
  - `CarouselItem` com `basis-full md:basis-1/2 lg:basis-1/3`
  - Cada slide: card `rounded-2xl overflow-hidden shadow-card bg-white` com:
    - `<img>` 16:9 (`aspect-video object-cover`), `loading="lazy"`
    - Footer com tag (ex.: "Futurecom · Palestrante") + legenda curta (1 linha)
  - `CarouselPrevious` / `CarouselNext` posicionados dentro do container (com offset positivo, não negativo, para não cortar no mobile)
  - Indicadores de progresso (dots) opcionais usando o `api` do carousel para feedback visual

- **Fundo**: `bg-white` (para alternar com a seção anterior `bg-brand-dark` de prova social) ou `bg-brand-page` — definir conforme o fluxo. Padding `py-20 md:py-24`.

### 3. Inserir na página `/fundadores`
Editar `src/routes/fundadores.tsx` (ou diretamente `FoundersSection.tsx`) para renderizar `<FoundersJourney />` entre a **Seção 4 — Prova Social** (`bg-brand-dark`) e a **Seção 5 — CTA Final** (gradiente). Assim a narrativa fica: cards → história pessoal → prova social (logos/credenciais) → carrossel visual (rosto + palco) → CTA.

### Detalhes técnicos
- Componente usa `"use client"`-equivalente: como o projeto é TanStack Start com SSR, o `Carousel` (embla) já funciona via hook — sem necessidade de marcação especial; ele apenas hidrata no client.
- Sem novas dependências (`embla-carousel-react` já está no projeto, ver `src/components/ui/carousel.tsx`).
- Imagens servidas de `/lovable-uploads/trajetoria/...` (mesma convenção do resto do projeto).
- Acessibilidade: cada `<img>` com `alt` descritivo do contexto (ex.: "Rafael Bruno palestrando no Futurecom 2025").
- Responsivo: 1 slide no mobile, 2 em md, 3 em lg.
