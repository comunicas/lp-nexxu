# Login do admin somente via magic link

## O que muda

Remover a etapa de "digitar código de 6 dígitos" no `/admin`, já que o Supabase está enviando magic link (botão clicável no email), não código numérico. O backend já manda o link correto — só o frontend está pedindo OTP.

## Fluxo final

1. Usuário acessa `/admin`
2. Digita email → clica "Enviar link de acesso"
3. Vê tela "Verifique seu email — clicamos um link de acesso para [email]"
4. Clica no link no email → cai em `/admin?code=...`
5. `exchangeCodeForSession` (já existe no `useEffect`) cria a sessão
6. Painel carrega com os leads

## Mudanças em `src/routes/admin.tsx`

- Remover estados `otpCode` e `step`
- Adicionar estado `linkSent` (bool)
- `handleSendOtp` (renomear para `handleSendLink`): após `sendAdminOtp` retornar, setar `linkSent = true` e mostrar mensagem "Verifique seu email"
- Remover `handleVerifyOtp` e todo o `<form>` de OTP
- Substituir o bloco de form condicional por:
  - se `linkSent === false`: form de email + botão "Enviar link de acesso"
  - se `linkSent === true`: card com mensagem de confirmação + botão "Usar outro email" para resetar
- Adicionar `console.error` no `fetchLeads` quando houver erro (para debug futuro)
- Corrigir potencial race no `useEffect([session])`: usar `session?.user?.id` como dep em vez de `session` (objeto), evitando refetch quando o objeto session é recriado mas o user é o mesmo

## Backend

Nenhuma mudança. `src/utils/admin-auth.functions.ts` já chama `signInWithOtp` com `emailRedirectTo` — isso é o magic link. O nome da função (`sendAdminOtp`) fica como está para evitar quebrar o import; é só um nome interno.

## Texto da UI (pt-BR)

- Título: "Acesso restrito"
- Descrição (antes): "Informe seu email autorizado. Você receberá um link de acesso seguro."
- Botão: "Enviar link de acesso" / "Enviando..."
- Após envio: 
  - Título: "Verifique seu email"
  - Texto: "Enviamos um link de acesso para **[email]**. Clique no botão do email para entrar no painel. O link expira em 1 hora."
  - Link: "← Usar outro email"

## Validação após implementar

Você acessa `/admin`, informa `rbruno@nexxulab.com`, vê a tela de confirmação, abre o email, clica no botão "Log In", cai logado em `/admin` e os 12 leads aparecem.

Necessário publicar (Publish → Update) depois para refletir no `nexxulab.com`.
