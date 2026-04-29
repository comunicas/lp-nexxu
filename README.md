# lp-nexxu — Documentação Técnica do Projeto

> Versão da documentação: 1.0 · Abril 2026  
> Repositório: [github.com/comunicas/lp-nexxu](https://github.com/comunicas/lp-nexxu)  
> Produção: [nexxulab.com](https://nexxulab.com)

---

## Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Estrutura de Arquivos](#3-estrutura-de-arquivos)
4. [Design System](#4-design-system)
5. [Rotas e Páginas](#5-rotas-e-páginas)
6. [Componentes — Landing Page](#6-componentes--landing-page)
7. [Componentes — Diagnóstico (Quiz)](#7-componentes--diagnóstico-quiz)
8. [Componentes UI-Nexxu (Design System)](#8-componentes-ui-nexxu-design-system)
9. [Mapa de Âncoras e Navegação](#9-mapa-de-âncoras-e-navegação)
10. [Copy e Tom de Voz](#10-copy-e-tom-de-voz)
11. [Funil de Conversão](#11-funil-de-conversão)
12. [Decisões de Produto](#12-decisões-de-produto)
13. [Histórico de Iterações](#13-histórico-de-iterações)
14. [Próximos Passos](#14-próximos-passos)

---

## 1. Visão Geral do Projeto

A **lp-nexxu** é a landing page da Nexxu — consultoria de inovação operacional para PMEs que faturam R$20k+/mês. O projeto foi construído no Lovable com geração de código via IA e versionado no GitHub.

**Objetivo da LP:** converter donos de PMEs em leads qualificados via o formulário de Diagnóstico ORDEM™ (quiz de 10 perguntas, ~3 minutos, resultado imediato).

**Posicionamento central:** Processo antes de IA. Sempre.

**ICP (Perfil Ideal de Cliente):** O "Bombeiro-Chefe" — dono de PME que trabalha mais que o time inteiro e ainda assim a empresa não anda, preso na operação por falta de processo estruturado.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | TanStack Start | ^1.167.14 |
| UI Library | React | ^19.2.0 |
| Language | TypeScript | ^5.8.3 |
| Styling | Tailwind CSS v4 | ^4.2.1 |
| Animation | tw-animate-css | ^1.3.4 |
| Router | TanStack Router | ^1.168.0 |
| Build | Vite + Cloudflare | ^7.3.1 |
| Deploy | Cloudflare (via @cloudflare/vite-plugin) | ^1.25.5 |
| Icons | Lucide React | ^0.575.0 |
| Gerador de código | Lovable | — |

**Fontes (Google Fonts):**
- `Outfit` — corpo de texto (`--font-sans`)
- `Space Grotesk` — headings e display (`--font-display`)

**Notas importantes sobre a stack:**
- Não é Vite puro — é TanStack Start com file-based routing (`src/routes/`)
- Links internos usam `<Link to="...">` do `@tanstack/react-router`, **nunca** `<a href>`
- CSS usa Tailwind v4 com `@theme inline` e tokens `oklch` — **não** usa `tailwind.config.ts` clássico
- Design system próprio em `src/components/ui-nexxu/`, separado do shadcn/ui instalado

---

## 3. Estrutura de Arquivos

```
lp-nexxu/
├── src/
│   ├── components/
│   │   ├── landing/              # Seções da landing page
│   │   │   ├── Nav.tsx           # Navegação fixa com scroll detection
│   │   │   ├── Hero.tsx          # Hero fullscreen (dark)
│   │   │   ├── PainSection.tsx   # "Você se reconhece?" — 6 cards de dor
│   │   │   ├── OrdemMethod.tsx   # Método ORDEM™ — interativo (5 letras)
│   │   │   ├── Products.tsx      # 4 cards de produto (T1–T4)
│   │   │   ├── IndiceSection.tsx # Índice ORDEM™ — 4 níveis (dark)
│   │   │   ├── CasesSection.tsx  # Resultados — 30/60/90 dias
│   │   │   ├── Faq.tsx           # FAQ accordion
│   │   │   └── Footer.tsx        # Rodapé com links
│   │   │
│   │   ├── diagnostico/          # Formulário de diagnóstico (quiz)
│   │   │   ├── QuizHeader.tsx    # Barra de progresso + indicador de etapa
│   │   │   ├── QuizIntro.tsx     # Tela de entrada do quiz
│   │   │   ├── QuizQuestionView.tsx  # View de cada pergunta
│   │   │   ├── QuizResult.tsx    # Resultado com Índice ORDEM™
│   │   │   └── quizData.ts       # Dados das 10 perguntas e lógica de score
│   │   │
│   │   ├── ui-nexxu/             # Design system próprio da Nexxu
│   │   │   ├── Badge.tsx         # Badge com variantes (hero, gradient, featured)
│   │   │   ├── Button.tsx        # Botão primário
│   │   │   ├── CheckIcon.tsx     # Ícone de check (variante light)
│   │   │   ├── Logo.tsx          # Logo SVG da Nexxu
│   │   │   └── SectionHeader.tsx # Header padrão de seção (label + title + description)
│   │   │
│   │   ├── design-system/        # Página de referência visual interna
│   │   ├── ui/                   # shadcn/ui (instalado mas pouco usado na LP)
│   │   └── hooks/                # Custom hooks React
│   │
│   ├── routes/
│   │   ├── __root.tsx            # Layout raiz (providers, meta global)
│   │   ├── index.tsx             # Home / Landing Page — rota "/"
│   │   ├── diagnostico.tsx       # Quiz de diagnóstico — rota "/diagnostico"
│   │   └── design-system.tsx     # Design system visual — rota "/design-system"
│   │
│   ├── lib/
│   │   └── utils.ts              # cn() utility (clsx + tailwind-merge)
│   │
│   ├── hooks/                    # Hooks globais
│   ├── styles.css                # Design system tokens, @theme, variáveis CSS
│   ├── router.tsx                # Configuração do router
│   └── routeTree.gen.ts          # Gerado automaticamente pelo TanStack Router
│
├── public/                       # Assets estáticos
├── package.json
├── bunfig.toml
└── .prettierrc
```

---

## 4. Design System

Definido em `src/styles.css` usando `@theme inline` do Tailwind v4.

### Fontes

```css
--font-sans: "Outfit", system-ui, sans-serif;     /* corpo */
--font-display: "Space Grotesk", system-ui, sans-serif;  /* headings */
```

### Paleta de Cores

| Token CSS | Hex | Uso |
|---|---|---|
| `--brand-blue` | `#185FA5` | CTAs, trust signals, âncoras |
| `--brand-purple` | `#534AB7` | Método ORDEM™, IA, criatividade |
| `--brand-purple-deep` | `#3C3489` | Estados hover, botões inativos |
| `--brand-purple-mid` | `#7F77DD` | Labels de estado inativo |
| `--brand-purple-light` | `#AFA9EC` | Gradiente de texto claro |
| `--brand-purple-pale` | `#CECBF6` | Gradiente de texto pálido |
| `--brand-teal` | `#5DCAA5` | KPIs positivos, resultados, sucesso |
| `--brand-amber` | `#EF9F27` | Nível 1 (Caos), alertas |
| `--brand-dark` | `#0F0C1A` | Hero, seções dark, rodapé |
| `--brand-dark-2` | `#1A1520` | Quase-preto para texto |
| `--brand-page` | `#F8F7FF` | Background da página |
| `--brand-text` | `#1A1520` | Texto principal |
| `--brand-muted` | `#6B6580` | Texto secundário |
| `--brand-subtle` | `#9090A8` | Texto terciário, labels |

### Gradientes

```css
--gradient-brand: linear-gradient(135deg, #185fa5, #534ab7);
--gradient-brand-h: linear-gradient(90deg, #185fa5, #534ab7);
--gradient-text-light: linear-gradient(135deg, #85b7eb, #afa9ec);
--gradient-hero-headline: linear-gradient(135deg, #fff 0%, rgba(255,255,255,.7) 40%, #afa9ec 100%);
```

### Sombras / Glows

```css
--shadow-glow: 0 0 32px rgba(83,74,183,0.55), 0 4px 20px rgba(0,0,0,0.3);
--shadow-glow-sm: 0 0 16px rgba(83,74,183,0.4);
--shadow-card: 0 2px 8px rgba(0,0,0,0.04);
--shadow-card-hover: 0 0 24px rgba(24,95,165,0.15), 0 4px 20px rgba(0,0,0,0.06);
```

### Classes Utilitárias (definidas em @layer utilities)

| Classe | Efeito |
|---|---|
| `.grad-text` | Gradiente azul→roxo no texto |
| `.grad-text-light` | Gradiente claro azul→roxo |
| `.grad-text-pale` | Gradiente pálido azul→roxo |
| `.grad-text-hero` | Gradiente do H1 do hero (branco→roxo claro) |
| `.bg-brand-gradient` | Background gradiente azul→roxo |
| `.shadow-brand-glow` | Glow roxo grande |
| `.shadow-brand-glow-sm` | Glow roxo pequeno |
| `.section-label` | Estilo padrão de label uppercase de seção |
| `.font-display` | Aplica Space Grotesk |

---

## 5. Rotas e Páginas

### Lista completa de rotas ativas (`src/routeTree.gen.ts`)

- `/`
- `/diagnostico`
- `/solucoes/$slug`
- `/admin`
- `/design-system`
- `/api/public/send-diagnostico`
- `/api/public/generate-recommendations`

### Rotas públicas de página

#### `/` — Landing Page (`src/routes/index.tsx`)

- **Objetivo:** página principal de aquisição/conversão, apresentando proposta de valor, método ORDEM™ e CTAs para diagnóstico e soluções.
- **Entrada:** sem parâmetros de rota; renderização de componentes de seção (`Nav`, `Hero`, `PainSection`, `OrdemMethod`, `SolucoesSection`, `Products`, `IndiceSection`, `CasesSection`, `Faq`, `Footer`).
- **Saída:** HTML da landing page + metadados SEO/social (`title`, `description`, Open Graph, Twitter, `canonical`).
- **Dependências:** TanStack Router (`createFileRoute`), componentes de UI da landing.
- **Indexabilidade:** **indexável** (rota pública com metatags de SEO e canonical).

#### `/diagnostico` — Quiz de Diagnóstico (`src/routes/diagnostico.tsx`)

- **Objetivo:** coletar respostas do diagnóstico ORDEM™ em 10 perguntas e entregar resultado imediato.
- **Entrada:** sem parâmetros de rota; interação do usuário com estado local (`Stage` e `answers`), em fluxo `intro → question[0..9] → result`.
- **Saída:** telas de intro, perguntas e resultado (`QuizIntro`, `QuizQuestionView`, `QuizResult`) com progresso (`QuizHeader`).
- **Dependências:** React `useState`, dados de perguntas (`QUESTIONS`), componentes do módulo de diagnóstico.
- **Indexabilidade:** **indexável** (rota pública, sem meta robots de bloqueio).

#### `/solucoes/$slug` — Página dinâmica de solução (`src/routes/solucoes/$slug.tsx`)

- **Objetivo:** exibir página de solução específica por slug com SEO próprio e soluções relacionadas.
- **Entrada:** parâmetro dinâmico `slug`; `loader` consulta `getSolucaoBySlug(params.slug)` e `getSolucoesBySlugList(...)`.
- **Saída:** renderiza `SolucaoPageTemplate` com conteúdo da solução; em falha retorna `notFoundComponent` ou `errorComponent`.
- **Dependências:** TanStack Router (`loader`, `notFound`), utilitários de dados de soluções, componente de template.
- **Indexabilidade:** **indexável** para slugs válidos (metas dinâmicas por solução); slugs inválidos retornam 404.

### Rotas internas

#### `/admin` — Painel administrativo (`src/routes/admin.tsx`)

- **Objetivo:** autenticar administradores por OTP e listar leads capturados.
- **Entrada:** email + código OTP; sessão Supabase; consulta tabela `leads`; whitelist de emails autorizados.
- **Saída:** UI de login OTP, estados de acesso negado/carregamento e painel com dados de leads.
- **Dependências:** Supabase Auth (`getSession`, `onAuthStateChange`, `verifyOtp`, `signOut`), Supabase Database (`from("leads")`), função `sendAdminOtp`.
- **Indexabilidade:** **não indexável / interna** (`meta robots: noindex, nofollow`).

#### `/design-system` — Referência visual interna (`src/routes/design-system.tsx`)

- **Objetivo:** documentar visualmente tokens, seções e componentes da marca/produto.
- **Entrada:** sem parâmetros; composição estática de seções de design system.
- **Saída:** página de documentação visual (`DSLayout` + seções de brand, cores, tipografia, etc.).
- **Dependências:** componentes `design-system/*`.
- **Indexabilidade:** **não indexável / interna** (`meta robots: noindex, nofollow`).

### Rotas de API públicas

#### `/api/public/send-diagnostico` — Persistência + envio de diagnóstico (`src/routes/api/public/send-diagnostico.ts`)

- **Objetivo:** receber payload final do diagnóstico, salvar lead, enviar e-mail com resultado/PDF e notificar admins.
- **Entrada:** `POST` JSON com dados do lead, score, breakdown por pilar, recomendações de IA e PDF em Base64; `OPTIONS` para CORS.
- **Saída:** respostas HTTP JSON de sucesso/erro (`400` payload inválido, `409` e-mail duplicado, demais erros internos); cabeçalhos CORS.
- **Dependências:** `supabaseAdmin` (insert/update em `leads`), validações básicas de payload (nome, email, nível 1..4), Resend API (`RESEND_API_KEY`), sanitização HTML para conteúdo dinâmico, notificação por e-mail aos admins.
- **Indexabilidade:** **não indexável / interna técnica** (endpoint backend, não é página para indexação).

#### `/api/public/generate-recommendations` — Recomendações de IA do diagnóstico (`src/routes/api/public/generate-recommendations.ts`)

- **Objetivo:** gerar recomendações acionáveis e resumo personalizado com base nos pilares ORDEM™.
- **Entrada:** `POST` JSON (`name`, `overallScore`, `maturityLevel`, `pillarScores`); `OPTIONS` para preflight CORS; validação de origem via allowlist.
- **Saída:** JSON com `recommendations`, `mentoriaCTA` e `summary`; erros de validação/origem (`4xx`) quando aplicável.
- **Dependências:** validações/sanitização (`validateInput`, `sanitizeName`), controle de CORS por regex de origem (`ALLOWED_ORIGIN_PATTERNS`), rate limiting (`checkRateLimit`), fallback determinístico quando IA não retorna formato válido.
- **Indexabilidade:** **não indexável / interna técnica** (endpoint backend, não é página para indexação).

### Nota explícita de indexação (resumo)

- **Indexáveis:** `/`, `/diagnostico`, `/solucoes/$slug` (quando slug válido).
- **Internas / não indexáveis:** `/admin`, `/design-system`, `/api/public/send-diagnostico`, `/api/public/generate-recommendations`.

---

## 6. Componentes — Landing Page

### Nav.tsx

**Localização:** `src/components/landing/Nav.tsx`

**Comportamento:** Fixa no topo. Detecta scroll via `useEffect` — muda de transparente para `bg-[rgba(15,12,26,0.92)] backdrop-blur-lg` após 20px de scroll.

**Itens de menu:**
```
Método    → #metodo
Produtos  → #produtos
Diagnóstico → #diagnostico
[CTA] Fazer diagnóstico → → /diagnostico
```

**Props:** nenhuma.

---

### Hero.tsx

**Localização:** `src/components/landing/Hero.tsx`

**Layout:** `min-h-screen`, fundo `--brand-dark`, texto centralizado.

**Elementos:**
- Badge variant="hero" — copyline acima do H1
- H1 com `.grad-text-hero` — headline principal
- Parágrafo subhead — promise em 1 frase
- 2 CTAs: primário (`Link to="/diagnostico"`) + secundário (`<a href="#metodo">`)
- 3 stats (num + label): `90 dias` / `Processo` / `ORDEM™`
- Indicador de scroll SCROLL + linha gradiente

**Copy atual:**
```
Badge:   "Já usou IA. O caos continuou. Era de se esperar."
H1:      "IA sem processo / só faz o ruim / acontecer mais rápido."
Subhead: "Em 90 dias, montamos o processo. Depois a IA faz sentido — e resultado."
CTA 1:   "Descobrir meu nível operacional — gratuito →"
CTA 2:   "Ver o método"
```

---

### PainSection.tsx

**Localização:** `src/components/landing/PainSection.tsx`

**Layout:** Fundo `--brand-page`. Grid 3 colunas (1 col mobile, 2 sm, 3 lg).

**Elementos:**
- `SectionHeader` com label "VOCÊ SE RECONHECE?" e title "Parece familiar?"
- Badge inline do Bombeiro-Chefe (centralizado, pill roxo)
- 6 cards de dor (array `PAINS`)
- Card CTA full-width (col-span-full) com texto + botão horizontal

**Array PAINS — 6 itens:**
1. Você é o gargalo
2. O time vai. Você fica.
3. Mês bom, mês ruim — sem saber por quê.
4. Contratou. O caos voltou.
5. Crescer virou ameaça.
6. Usou IA. O caos continuou.

**Âncora:** sem id (seção sem âncora direta).

---

### OrdemMethod.tsx

**Localização:** `src/components/landing/OrdemMethod.tsx`

**Layout:** Fundo gradiente suave azul→roxo→page. Seção interativa.

**Âncora:** `id="metodo"`

**Elementos:**
- `SectionHeader` com label "METODOLOGIA PROPRIETÁRIA" e title "Método ORDEM™"
- 5 botões interativos (letras O-R-D-E-M) — clique troca o card central
- Card central exibe: letra grande, nome da etapa, descrição
- Bloco de contexto "A sequência é sempre essa..."
- Grid 3 colunas com cards 30/60/90 dias

**Estado:** `useState(0)` — índice da letra ativa.

**Array LETTERS — 5 etapas:**
| Letra | Nome | Função |
|---|---|---|
| O | Organização | Mapear processos críticos |
| R | Rotinas | Implementar gestão estruturada |
| D | Dados | Indicadores confiáveis para decisão |
| E | Eficiência IA | IA depois do processo — nunca antes |
| M | Maturidade | Empresa autônoma, dono lidera |

**Array TIMELINE — 3 cards:**
| Prazo | Título | O que acontece |
|---|---|---|
| 30 dias | Você sabe onde trava. | Processos mapeados, gargalos no papel |
| 60 dias | O time roda. Você respira. | Rotinas rodando sem depender da memória do dono |
| 90 dias | Dono lidera. IA amplifica. | Empresa opera, decisões com dado, IA aplicada |

---

### Products.tsx

**Localização:** `src/components/landing/Products.tsx`

**Layout:** Fundo branco. Grid 4 colunas (1→2→4).

**Âncora:** `id="produtos"`

**Elementos:**
- `SectionHeader` com label "PRODUTOS" e title "Quatro caminhos. / Mesma direção."
- Indicador de progressão 01→02→03→04 com labels
- 4 cards de produto (componente `ProductCard`)
- CTA final centralizado

**Type Product:**
```typescript
type Product = {
  step: 1 | 2 | 3 | 4;
  category: string;
  verb: string;       // nome ação (Mapear, Estruturar, etc.)
  promise: string;    // frase de benefício
  duration: string;
  scope: string;
  items: string[];    // bullets
  accent: string;     // cor da barra superior
  featured?: boolean; // destaca com glow e badge "mais escolhido"
}
```

**4 Produtos:**

| Step | Categoria | Verbo | Duração | Scope | Featured |
|---|---|---|---|---|---|
| 1 | Diagnóstico | Mapear | 45 dias | 1–3 processos | — |
| 2 | Mentoria | Estruturar | 6 meses | 2–4 processos | — |
| 3 | Implementação | Implementar | 6 meses | 4–7 processos | ✅ |
| 4 | Serviço | Terceirizar | 6 meses | 7+ processos | — |

**CTAs nos cards:**
- Featured (T3): botão primário full-width com gradiente
- Não-featured (T1, T2, T4): botão outline roxo full-width

---

### IndiceSection.tsx

**Localização:** `src/components/landing/IndiceSection.tsx`

**Layout:** Fundo `--brand-dark` (dark). Grid 4 colunas.

**Âncora:** `id="diagnostico"`

**Elementos:**
- `SectionHeader` com label "ÍNDICE ORDEM™", title em branco e description com gancho
- 4 cards de nível (array `LEVELS`) com bordas coloridas e glow no hover
- Bloco CTA horizontal com título + parágrafo + botão

**Array LEVELS — 4 níveis:**
| Num | Nome | Cor da borda | O que significa |
|---|---|---|---|
| 01 | Caos | `#EF9F27` (amber) | Opera no improviso total |
| 02 | Reativo | roxo claro | Apaga incêndio melhor, mas ainda indispensável |
| 03 | Estruturado | azul | Time segue processo, mas escalar ainda assusta |
| 04 | Autônoma | `#5DCAA5` (teal) | Empresa funciona sem o dono no centro |

**Hover:** `onMouseEnter/onMouseLeave` com `boxShadow` inline (glow colorido por nível).

---

### CasesSection.tsx

**Localização:** `src/components/landing/CasesSection.tsx`

**Layout:** Fundo `--brand-page`. Grid 3 colunas.

**Âncora:** `id="resultados"`

**Elementos:**
- `SectionHeader` label "RESULTADOS"
- 3 cards de promessa (30/60/90 dias) com linha decorativa teal no topo
- CTA de saída com glow teal + microtext "Gratuito. 3 minutos. Resultado imediato."

**Array PROMISES:**
| Stat | Label | Detail |
|---|---|---|
| 30 dias | você sai do achismo | Processos mapeados. Gargalos no papel. |
| 60 dias | o time opera. você respira. | Rotinas rodando. Time resolve. |
| 90 dias | dono lidera. empresa roda. | Empresa funciona. IA amplificando — não consertando. |

---

### Faq.tsx

**Localização:** `src/components/landing/Faq.tsx`

**Layout:** Fundo branco. Accordion de item único aberto por vez.

**Âncora:** `id="faq"`

**Estado:** `useState<number | null>(0)` — índice do item aberto.

**5 Perguntas:**
1. A Nexxu é consultoria de IA?
2. Minha empresa fatura menos de R$20k/mês. Posso contratar?
3. Quanto tempo leva para ver resultado?
4. Preciso entender de tecnologia para trabalhar com a Nexxu?
5. Como funciona a call de diagnóstico?

**Nota:** A resposta da pergunta 5 distingue explicitamente o formulário online (~3 min) da call humana (15–30 min) — dois momentos diferentes do funil.

---

### Footer.tsx

**Localização:** `src/components/landing/Footer.tsx`

**Layout:** Fundo `--brand-dark`. Flex com logo + descrição à esquerda, links no centro-direita, contato à direita.

**Estrutura de links:**

Coluna **NAVEGAÇÃO:**
- ORDEM™ → `#metodo`
- Produtos → `#produtos`
- Índice ORDEM™ → `#diagnostico`
- FAQ → `#faq`

Coluna **CONTATO:**
- `contato@nexxu.com.br`
- São Paulo, BR

---

## 7. Componentes — Diagnóstico (Quiz)

### quizData.ts

**Localização:** `src/components/diagnostico/quizData.ts`

Exporta `QUESTIONS` — array com 10 perguntas, cada uma com opções e lógica de pontuação que determina o Índice ORDEM™ (Nível 1–4).

### QuizIntro.tsx

**Props:** `{ onStart: () => void }`

Tela de entrada. Apresenta o quiz com 3 highlights, prévia dos 4 níveis (01–04) e botão "Começar diagnóstico →".

### QuizHeader.tsx

Barra de progresso com indicador visual de perguntas respondidas e etapa atual (`current` / `total`).

### QuizQuestionView.tsx

Renderiza cada pergunta com suas opções. Seleção avança automaticamente para a próxima.

### QuizResult.tsx

Exibe o Índice ORDEM™ calculado (Nível 1–4), descrição do nível, e CTA para agendar call ou iniciar o produto T1.

---

## 8. Componentes UI-Nexxu (Design System)

### Badge.tsx

**Variantes:** `hero` | `gradient` | `featured`

- `hero`: pill dark com borda sutil, texto branco — usado no hero da LP
- `gradient`: pill com gradiente azul→roxo — usado no QuizIntro
- `featured`: pill compacto roxo — usado no card T3 ("mais escolhido")

### Button.tsx

**Variantes:** `primary`

Botão primário com gradiente de marca. Usado no QuizIntro.

### CheckIcon.tsx

**Variantes:** `default` | `light`

Ícone SVG de check. `light` é usado nos bullets dos cards de produto.

### Logo.tsx

SVG da logo Nexxu com gradiente. Usado em Nav e Footer.

### SectionHeader.tsx

**Props:**
```typescript
{
  label?: string;
  labelColor?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}
```

Padrão de abertura de seção: label uppercase pequeno + título grande + descrição. Usado em todas as seções da LP.

---

## 9. Mapa de Âncoras e Navegação

### IDs de seção existentes

| Seção | ID | Componente |
|---|---|---|
| Método ORDEM™ | `#metodo` | `OrdemMethod.tsx` |
| Produtos | `#produtos` | `Products.tsx` |
| Índice ORDEM™ | `#diagnostico` | `IndiceSection.tsx` |
| Resultados | `#resultados` | `CasesSection.tsx` |
| FAQ | `#faq` | `Faq.tsx` |

### Nav — links atuais

| Label | Destino | Tipo |
|---|---|---|
| Método | `#metodo` | âncora |
| Produtos | `#produtos` | âncora |
| Diagnóstico | `#diagnostico` | âncora |
| Fazer diagnóstico → | `/diagnostico` | rota |

### Footer — links atuais

| Label | Destino |
|---|---|
| ORDEM™ | `#metodo` |
| Produtos | `#produtos` |
| Índice ORDEM™ | `#diagnostico` |
| FAQ | `#faq` |
| contato@nexxu.com.br | mailto (sem href ainda) |

---

## 10. Copy e Tom de Voz

### Princípios

- **Pessoal:** fala com "você", não para "você"
- **Sincero:** nomeia o problema sem suavizar
- **Direto:** sentenças curtas, uma ideia por vez
- **Moderadamente formal:** tom profissional sem distância

### Palavras Proibidas

`disruptivo · ecossistema · sinergias · holístico · revolucionário · gamechanger · próximo nível · jornada transformadora · exponencial · hub de soluções · de ponta · customizado`

### Frases centrais da marca

- "IA sem processo só faz o ruim acontecer mais rápido."
- "Processo antes de IA. Sempre."
- "Você não tem problema de esforço. Tem problema de processo."
- "O problema nunca foi quem — foi o processo."
- "Dono lidera. Empresa roda."

### Personagem central: o Bombeiro-Chefe

Dono de PME que trabalha mais que o time inteiro e ainda assim a empresa não anda. Preso na operação porque ninguém montou o sistema ainda.

---

## 11. Funil de Conversão

```
Topo (Hero/PainSection)
  ↓  CTA: "Descobrir meu nível operacional — gratuito →"
  ↓
Meio (IndiceSection / CasesSection)
  ↓  CTA: "Fazer diagnóstico gratuito →"
  ↓
/diagnostico (QuizIntro → Quiz 10 perguntas → Resultado)
  ↓  CTA resultado: agendar call / contratar T1
  ↓
Call de diagnóstico (15–30 min, humana)
  ↓
Produto T1 Diagnóstico (R$500–1.500, 45 dias)
  ↓  upsell natural
Produto T2/T3/T4 (R$3k–40k+, 6 meses)
```

### CTAs por seção

| Seção | CTA primário | Destino |
|---|---|---|
| Hero | Descobrir meu nível operacional — gratuito → | `/diagnostico` |
| Hero | Ver o método | `#metodo` |
| PainSection | Descobrir meu nível operacional — gratuito → | `/diagnostico` |
| Products (T3) | Quero esse caminho → | `/diagnostico` |
| Products (outros) | Quero esse caminho → | `/diagnostico` |
| Products (bottom) | Conversar sobre meu caso → | `/diagnostico` |
| IndiceSection | Fazer diagnóstico gratuito → | `/diagnostico` |
| CasesSection | Descobrir meu nível operacional → | `/diagnostico` |

**Nota:** Todos os CTAs da LP levam para `/diagnostico`. O formulário online (3 min) é o único ponto de entrada de leads.

---

## 12. Decisões de Produto

### Por que TanStack Start e não Next.js?

Projeto iniciado no Lovable com template TanStack. Mantido pela compatibilidade com o gerador de código e pelo deploy via Cloudflare Workers.

### Por que design system próprio (`ui-nexxu/`) em vez de shadcn/ui?

shadcn/ui está instalado como dependência (Radix UI), mas os tokens visuais da Nexxu (gradientes, glows, cores específicas) são incompatíveis com a arquitetura de tokens do shadcn. O `ui-nexxu/` garante consistência visual sem conflito.

### Por que todos os CTAs apontam para `/diagnostico`?

O produto T1 (Diagnóstico) é o primeiro passo do funil — baixa fricção, gratuito, resultado imediato. A call humana (15–30 min) acontece *depois* do quiz, com o lead já qualificado pelo resultado. O quiz filtra o anti-cliente antes de qualquer contato humano.

### Por que não há depoimentos reais?

Cases reais ainda estão sendo construídos (Nexxu em fase de lançamento). A seção "Resultados" usa promessas verificáveis (30/60/90 dias) em vez de depoimentos genéricos sem credibilidade. Quando cases reais estiverem disponíveis, devem substituir os cards com: nome, empresa, setor, número concreto e citação.

### Inconsistência conhecida: "15 minutos" vs "3 minutos"

- O quiz online leva ~3 minutos (10 perguntas)
- A call humana de diagnóstico leva 15–30 minutos
- São momentos diferentes do funil
- O FAQ (pergunta 5) distingue os dois explicitamente
- Todos os textos de CTA e formulário usam "3 minutos"

---

## 13. Histórico de Iterações

Documentação das principais mudanças feitas via prompts Lovable (sessão de Abril 2026):

| Etapa | Arquivo | Mudança |
|---|---|---|
| 1 | `Faq.tsx` | FAQ distingue formulário (3 min) da call humana (15–30 min) |
| 2 | `Hero.tsx` | Stats: substituído "0" ambíguo por "Processo" / "antes de IA — sem exceção" |
| 3 | `PainSection.tsx` | Adicionado badge Bombeiro-Chefe centralizado antes do grid |
| 4 | `CasesSection.tsx` | Substituídos depoimentos genéricos por cards 30/60/90 dias |
| 5 | `Hero.tsx` + `PainSection.tsx` | CTAs unificados: "Descobrir meu nível operacional — gratuito →" |
| 6 | `OrdemMethod.tsx` | Adicionado contexto "quem executa" com bloco informativo |
| 7 | `QuizIntro.tsx` | Adicionada prévia dos 4 níveis antes do botão de início |
| 8 | `Hero.tsx` | Nova headline: badge IA + H1 persuasivo + subhead direto |
| 9 | `PainSection.tsx` | Refatoração copy + UX: bullets, card CTA full-width, cores corrigidas |
| 10 | `OrdemMethod.tsx` | Refatoração copy: description, letra E, bloco de contexto, cards 30/60/90 |
| 11 | `OrdemMethod.tsx` | UX: cor dos textos, botões inativos, padding, alinhamento, card compacto |
| 12 | `Products.tsx` | Refatoração copy + UX: promises, bullets, CTA outline T4, progressão visível |
| 13 | `IndiceSection.tsx` | Refatoração copy + UX: headline, description com gancho, cards compactos |
| 14 | `CasesSection.tsx` | Refatoração copy + UX: título como promessa, CTA de saída com teal |
| 15 | `Nav.tsx` | Adicionado item "Diagnóstico" + CTA corrigido para "Fazer diagnóstico →" |
| 16 | `Footer.tsx` | Coluna renomeada para "NAVEGAÇÃO" + 4 links corretos |
| 17 | `Faq.tsx` | Adicionado `id="faq"` para âncora |
| 18 | `CasesSection.tsx` | Adicionado `id="resultados"` para âncora |

---

## 14. Próximos Passos

### Prioridade Alta

- [ ] **Script da call de diagnóstico** — qualificação estruturada por tier (30 min)
- [ ] **Cases reais** — substituir cards de promessa por depoimentos com nome, empresa, número e citação real
- [ ] **Email de captura** — adicionar campo de email/WhatsApp no resultado do quiz para coleta de lead antes do CTA
- [ ] **Automação pós-quiz** — mensagem WhatsApp personalizada por nível (1–4) via Make/n8n

### Prioridade Média

- [ ] **Política de garantia** — para produtos T3 e T4
- [ ] **Playbook de onboarding** — por tier, garante entrega consistente ao escalar
- [ ] **Analytics** — implementar GA4 ou Plausible para tracking de conversão por seção
- [ ] **OG Image** — imagem social customizada para compartilhamento no WhatsApp/LinkedIn
- [ ] **Mobile review** — testar e ajustar layout em viewport 375px (iPhone SE)

### Melhorias técnicas

- [ ] **Lazy loading** — componentes pesados (OrdemMethod, Products) podem ser lazy-loaded
- [ ] **SEO** — adicionar Schema.org (Organization, FAQPage) nas páginas
- [ ] **Sitemap** — gerar `sitemap.xml` e `robots.txt`
- [ ] **Acessibilidade** — revisar contraste de cores (especialmente textos `white/30` e `white/50` em fundo dark)

---

*lp-nexxu · Documentação Técnica · v1.0 · Abril 2026*  
*Flavio Horita & Rafael Bruno · Nexxu · nexxulab.com*
