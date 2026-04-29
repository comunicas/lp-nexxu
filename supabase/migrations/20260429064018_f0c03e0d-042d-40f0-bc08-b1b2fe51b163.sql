-- Fix: Re-grant EXECUTE on has_role to authenticated
-- The previous migration revoked this permission, breaking all RLS
-- policies on "leads" that call has_role(auth.uid(), 'admin').
-- has_role() is SECURITY DEFINER and only returns a boolean — it is safe
-- to grant EXECUTE to authenticated users.
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;