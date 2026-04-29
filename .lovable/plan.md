# Por que os leads não aparecem no admin

## Diagnóstico

Confirmei direto no banco: **existem 12 leads** capturados (de 28/04, vindos de `feahorita@gmail.com`, `rafael@comunicas.com.br`, `teste@nexxulab.com`).

A configuração de segurança está correta:
- Tabela `leads` tem RLS ativo
- Política `"Only admins can view leads"` libera SELECT para quem tem `has_role(auth.uid(), 'admin')`
- Sua conta `rbruno@nexxulab.com` (e a do Flavio) já estão na tabela `user_roles` com role `admin`
- A função `has_role` está como `SECURITY DEFINER` (sem recursão)

Ou seja: rodando o código mais recente, em uma sessão Supabase válida, você consegue ver os leads — testei a query direto no banco e ela retorna os 12 registros.

## Causa do problema

A screenshot foi tirada em **`nexxulab.com/admin`** (site publicado). O que está em produção é a versão **anterior** às correções de segurança que aplicamos nas últimas iterações:

- A versão antiga tinha o bug do "magic link direto no browser" — o painel exibia o usuário como "logado" sem necessariamente ter uma sessão Supabase real associada
- Sem sessão Supabase real, `auth.uid()` é nulo → RLS bloqueia SELECT → a query retorna `[]` (array vazio, sem erro) → admin mostra "0 leads"
- O fluxo novo (OTP de 6 dígitos via `verifyOtp`) cria sessão Supabase de verdade, e aí o `auth.uid()` bate com `user_roles` e os leads aparecem

Confirmação no log de auth: o envio de OTP via `/otp` retornou 200 às 06:06 UTC, originado de `https://nexxulab.com/admin` — então o backend já tem o fluxo novo, mas o **frontend publicado** ainda não, então ele provavelmente nem está chamando `verifyOtp` corretamente.

## O que fazer

**Publicar a versão atual** (botão Publish → Update no editor). Isso já vai resolver, porque:

1. Sobe o frontend novo do `/admin` (fluxo OTP correto, com sessão Supabase real)
2. Sobe o fix de SSR do `/solucoes/$slug` que estava quebrando o build publicado

Depois de publicar:
1. Acesse `nexxulab.com/admin`
2. Faça login com `rbruno@nexxulab.com` → digite o código de 6 dígitos recebido por email
3. Os 12 leads devem aparecer (todos os 12 estão em "Nível 02/03/04", então os cards "Nível 01" continuarão em 0 — isso é correto, não tem nenhum lead nível 1 no banco)

## Validação extra

Se mesmo após publicar continuar vazio, abra o console do navegador em `nexxulab.com/admin` logado e rode:

```js
const { data: { session } } = await window.supabase?.auth.getSession?.() ?? {};
console.log('user:', session?.user?.email, 'uid:', session?.user?.id);
```

O `uid` precisa ser `5579db67-39dd-4721-ab3b-c9b53c393205` (rbruno) ou `d360f821-4218-4532-9e0d-fe173454e91d` (fhorita). Se vier `null`, é problema de sessão; se vier um UUID diferente, é uma conta sem role admin e basta adicionar em `user_roles`.

Nenhuma alteração de código é necessária neste momento — o fix é operacional (publicar).
