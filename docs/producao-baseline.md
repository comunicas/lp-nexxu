# Produção Baseline — Landing Page Nexxu

> Última atualização: 2026-04-29

## 1) Mapa de páginas públicas

| Tipo | Rota | Origem no código | Objetivo |
|---|---|---|---|
| Landing page | `/` | `src/routes/index.tsx` | Captação e direcionamento para diagnóstico e seções da LP |
| Diagnóstico | `/diagnostico` | `src/routes/diagnostico.tsx` | Coleta de respostas, cálculo do nível ORDEM™ e captura de lead |
| Solução dinâmica | `/solucoes/$slug` | `src/routes/solucoes/$slug.tsx` | SEO + conversão para páginas de soluções por segmento/pain point |
| API pública | `/api/public/generate-recommendations` | `src/routes/api/public/generate-recommendations.ts` | Geração de recomendações de plano de ação (IA + fallback) |
| API pública | `/api/public/send-diagnostico` | `src/routes/api/public/send-diagnostico.ts` | Persistência de lead + disparo de e-mail com resultado |

### Observações
- Rotas como `/admin` e `/design-system` existem no código, mas não entram no baseline de páginas públicas de produção voltadas à LP (uso interno/apoio).
- Rota 404 é tratada em `src/routes/__root.tsx` via `notFoundComponent`.

## 2) Principais CTAs e jornadas

## CTA primários

| Página/Seção | CTA | Destino/Ação | Objetivo de negócio |
|---|---|---|---|
| Navbar (LP) | `Fazer diagnóstico →` | navegação para `/diagnostico` | Iniciar funil de diagnóstico |
| Hero (LP) | `Descobrir meu nível operacional — gratuito →` | navegação para `/diagnostico` | Conversão topo de funil |
| Hero (LP) | `Ver o método` | âncora `#metodo` | Educação da proposta ORDEM™ |
| Resultado do diagnóstico | Envio de formulário (nome/e-mail/whatsapp) | POST em `/api/public/send-diagnostico` | Geração e qualificação de lead |
| Resultado por e-mail | `Falar com a Nexxu →` | link `wa.me` no template de e-mail | Conversão para contato comercial |

## Jornada principal (macro)
1. Usuário chega na LP (`/`) por mídia orgânica/paga.
2. Navega por seções de prova e método (âncoras: `#metodo`, `#solucoes`, `#produtos`, `#diagnostico`).
3. Clica em CTA para `/diagnostico`.
4. Responde quiz, recebe score e recomendações.
5. Preenche formulário para receber PDF.
6. Front aciona APIs públicas (`generate-recommendations` e `send-diagnostico`).
7. Lead é salvo no banco e recebe e-mail com resultado + próximo passo.

## 3) Metadados SEO por página

## Metadados globais (root)
Definidos em `src/routes/__root.tsx`:
- charset, viewport
- title e description padrão
- Open Graph básico (`og:title`, `og:description`, `og:type`, `og:image`)
- Twitter card básico (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

## Página `/`
Definidos em `src/routes/index.tsx`:
- `title`: “Nexxu | Consultoria de Processo e IA para PME — Resultados em 90 Dias”
- `description`: proposta de valor + ICP
- OG: `og:title`, `og:description`, `og:url`, `og:type`
- Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`
- Canonical: `https://nexxulab.com/`

## Página `/diagnostico`
Definidos em `src/routes/diagnostico.tsx`:
- `title`: “Diagnóstico ORDEM™ — Descubra seu nível operacional | Nexxu”
- `description`: quiz de 10 perguntas e promessa de resultado
- OG: `og:title`, `og:description`

## Página `/solucoes/$slug`
Definidos dinamicamente em `src/routes/solucoes/$slug.tsx`:
- `title` e `description` vindos de `solucao.metaTitle` e `solucao.metaDescription`
- OG/Twitter derivados dos mesmos campos dinâmicos
- `og:image` padrão compartilhada

## 4) Endpoints públicos utilizados no front

| Endpoint | Método | Consumido por | Finalidade | Dependências |
|---|---|---|---|---|
| `/api/public/generate-recommendations` | POST | `QuizResult` (`useEffect`) | Gerar plano de ação personalizado por pilares ORDEM™ | Rate limit, validação de input, LLM/fallback |
| `/api/public/send-diagnostico` | POST | `QuizResult` (`handleSubmit`) | Salvar lead e enviar e-mail com resultado + PDF | Supabase Admin, Resend API, geração de PDF |

### Regras técnicas relevantes
- `generate-recommendations` possui CORS com allowlist de domínios + tratamento de OPTIONS.
- `send-diagnostico` usa `Access-Control-Allow-Origin: *` e valida payload mínimo.
- Fluxo depende de variáveis de ambiente (ex.: `RESEND_API_KEY`) e integração Supabase.

## 5) Cadência de revisão e responsável

- **Cadência mínima obrigatória:** a cada release para produção.
- **Cadência complementar recomendada:** revisão mensal de SEO e integrações (mesmo sem release).
- **Responsável primário (DRI):** Tech Lead da LP Nexxu.
- **Responsável secundário (backup):** Pessoa de Growth/Marketing responsável por conteúdo e SEO.
- **Gate de release:** não publicar sem validar checklist `docs/checklist-alinhamento-docs.md`.

## 6) Histórico de divergências e resolução (log de auditoria documental)

> Preencher continuamente. Uma linha por divergência identificada.

| Data | Item auditado | Divergência encontrada | Impacto | Ação corretiva | Responsável | Status |
|---|---|---|---|---|---|---|
| 2026-04-29 | Baseline inicial | Documento inexistente (sem baseline formal de produção) | Risco de desalinhamento entre código, SEO e operação | Criação deste baseline + checklist de aceite | Time de Produto/Engenharia | Resolvido |

