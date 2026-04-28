# Criar usuários admin via server route

## O que será feito

Criar uma server route TanStack temporária que usa a Admin API do Supabase (com `SUPABASE_SERVICE_ROLE_KEY`) para criar os 2 usuários admin de uma só vez. Como o trigger `grant_admin_to_whitelist` só dispara em login, a route também garante a role `admin` na tabela `user_roles` via upsert.

## Arquivo a criar

**`src/routes/api/public/setup-admins.ts`** — server route POST que, para cada email da whitelist (`rbruno@nexxulab.com`, `fhorita@nexxulab.com`):

1. Chama `admin.auth.admin.createUser({ email, email_confirm: true })` (sem senha — eles entrarão via magic link)
2. Se já existir, busca o `user_id` via `listUsers`
3. Faz `upsert` em `user_roles` com role `admin` (idempotente, on conflict do nothing)
4. Retorna JSON com status de cada email

## Como executar

Após criação, eu chamo a route uma vez via `curl_edge_functions`/fetch interno. Depois:
- Você confere o resultado (devem aparecer como `created` ou `already_existed_role_ok`)
- **Apago a route** (`src/routes/api/public/setup-admins.ts`) para não ficar exposta

## Segurança

A route fica em `/api/public/*` (pública), mas:
- É temporária — apagada logo após uso
- Whitelist hardcoded — só cria esses 2 emails específicos, nada mais
- Signup público já está desabilitado no Supabase Auth
- Não recebe input do caller

## Resultado esperado

Após a execução, os 2 emails existem em `auth.users` (confirmados) e têm role `admin` em `user_roles`. Eles podem ir em `/admin`, pedir magic link e entrar direto no dashboard.
