# Login admin sem email — link gerado na própria tela

## Arquivos

### 1. Criar `src/utils/admin-auth.functions.ts`

Server function `generateAdminMagicLink({ email })`:
- Valida que `email` está na whitelist `["rbruno@nexxulab.com", "fhorita@nexxulab.com"]` (rejeita qualquer outro)
- Usa `SUPABASE_SERVICE_ROLE_KEY` (somente server) para chamar `admin.auth.admin.generateLink({ type: 'magiclink', email })`
- Retorna `{ success: true, actionLink }` ou `{ success: false, error }`

### 2. Editar `src/routes/admin.tsx`

Substituir o formulário de email atual por **2 botões fixos** (um para cada admin):

- "Entrar como rbruno@nexxulab.com"
- "Entrar como fhorita@nexxulab.com"

Ao clicar:
1. Estado `loading` no botão clicado
2. Chama `generateAdminMagicLink({ data: { email } })`
3. Se sucesso → `window.location.href = actionLink` (redireciona pro link, que loga e volta pra `/admin`)
4. Se erro → exibe mensagem

Remove os states `loginEmail`, `sendMagicLink` e o estado `"sent"` (não precisa mais aguardar email).

## Segurança

- `SUPABASE_SERVICE_ROLE_KEY` nunca sai do servidor (server function)
- Whitelist hardcoded valida no servidor — mesmo que alguém chame a função direto via DevTools, só funciona pros 2 emails
- Página continua `noindex, nofollow`
- Signup público segue desabilitado

## Resultado

Você abre `/admin`, clica no seu nome, ~1s depois está logado no dashboard. Sem email envolvido.
