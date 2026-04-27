
REVOKE EXECUTE ON FUNCTION public.grant_admin_to_whitelist() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.grant_admin_to_whitelist() FROM anon;
REVOKE EXECUTE ON FUNCTION public.grant_admin_to_whitelist() FROM authenticated;
