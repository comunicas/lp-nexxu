# Checklist de Alinhamento — Código x Documentação

> Usar este checklist em toda release para produção.

## 1) Rotas em produção e documentação

- [ ] Toda rota pública ativa em produção existe no código atual.
- [ ] Toda rota pública ativa em produção está documentada no `docs/producao-baseline.md`.
- [ ] Rotas descontinuadas foram removidas da documentação e/ou marcadas como legadas.
- [ ] Rotas novas possuem owner, objetivo e jornada mapeados.

## 2) Seções da LP no código e na documentação

- [ ] Todas as seções visíveis da LP (`/`) existem no código e estão refletidas na documentação de jornada/CTAs.
- [ ] CTAs principais da navegação e hero estão consistentes entre experiência real e docs.
- [ ] Qualquer alteração de copy/posição de CTA com impacto no funil foi atualizada no baseline.

## 3) Integrações e dependências atualizadas

- [ ] Endpoints públicos chamados pelo front estão listados e válidos.
- [ ] Dependências críticas de integração (Supabase, Resend, variáveis de ambiente) estão atualizadas no documento.
- [ ] Regras de CORS e validações dos endpoints públicos seguem o comportamento documentado.
- [ ] Mudanças em contratos de payload/resposta foram refletidas na documentação.

## 4) SEO e metadados

- [ ] Todas as páginas públicas possuem metadados SEO documentados (title/description/OG/Twitter/canonical quando aplicável).
- [ ] Alterações de SEO foram revisadas por responsável de conteúdo/Growth.
- [ ] URLs canônicas e metadados dinâmicos estão coerentes com o ambiente de produção.

## 5) Governança da revisão

- [ ] Revisão executada na cadência definida (por release).
- [ ] DRI (responsável primário) identificado nesta revisão.
- [ ] Pendências abertas foram registradas no log de auditoria documental.
- [ ] Evidências da revisão (PR/commit/data) foram anexadas no registro interno.

## 6) Registro da execução do checklist

| Data | Release/Versão | DRI | Resultado | Pendências |
|---|---|---|---|---|
| _AAAA-MM-DD_ | _vX.Y.Z_ | _nome_ | _aprovado/reprovado_ | _itens_ |

