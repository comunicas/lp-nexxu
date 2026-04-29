## Problema

O endpoint `src/routes/api/public/send-diagnostico.ts` tem uma função `escapeHtml()` definida, mas ela só é aplicada no conteúdo gerado por IA. Vários campos enviados pelo cliente (name, nivelNome, nivelHeadline, nivelDesc, nivelRecommendation, nivelRecommendedTier, email, whatsapp) são interpolados **crus** no HTML dos emails — tanto no email enviado ao lead quanto no email de notificação aos admins.

Isso permite que um atacante envie HTML/scripts arbitrários (incluindo conteúdo de phishing) usando o domínio `diagnostico@nexxulab.com` como remetente.

## Correção

Aplicar a função `escapeHtml()` já existente em **todos** os campos dinâmicos interpolados no HTML dos dois emails. Também escapar o nome no `subject` (apesar do subject não ser HTML, evita caracteres problemáticos) e sanitizar o nome usado no nome do arquivo PDF.

### Arquivo: `src/routes/api/public/send-diagnostico.ts`

**1. Mover `escapeHtml` para antes do uso** (já está antes — ok).

**2. Email do lead (linhas 155–202):**
- `${name}` → `${escapeHtml(name)}` (linha 166)
- `${nivelNome}` → `${escapeHtml(nivelNome)}` (linha 172)
- `${nivelHeadline}` → `${escapeHtml(nivelHeadline)}` (linha 175)
- `${nivelDesc}` → `${escapeHtml(nivelDesc)}` (linha 176)
- `${nivelRecommendedTier}` → `${escapeHtml(nivelRecommendedTier)}` (linha 181)
- `${nivelRecommendation}` → `${escapeHtml(nivelRecommendation)}` (linha 182)
- Filename do attachment: sanitizar `name` removendo caracteres não alfanuméricos antes do `.replace(/\s+/g, "-")` para evitar path traversal / cabeçalhos malformados.

**3. Email de notificação admin (linhas 231–254):**
- `${name}` no subject (linha 234) → `${escapeHtml(name)}` (defensivo)
- `${nivelNome}` no subject (linha 234) → `${escapeHtml(nivelNome)}`
- `${name}` (linha 242) → `${escapeHtml(name)}`
- `${email}` (linha 243) → `${escapeHtml(email)}`
- `${whatsapp || "—"}` (linha 244) → `${escapeHtml(whatsapp || "—")}`
- `${nivelNome}` (linha 245) → `${escapeHtml(nivelNome)}`

Os campos numéricos (`nivel`, `score`, `scoreMax`, `scorePct`) já são validados como `number` e não precisam de escape.

## Resultado esperado

Todos os campos controlados pelo cliente passam por `escapeHtml()` antes de serem inseridos no HTML dos emails. Tentativas de injetar `<script>`, `<a href="phishing">`, ou qualquer outra tag HTML serão renderizadas como texto literal. Nenhuma outra lógica do endpoint muda.