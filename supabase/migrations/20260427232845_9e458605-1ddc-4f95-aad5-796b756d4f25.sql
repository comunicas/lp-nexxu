-- Revoga EXECUTE público da função has_role (uso interno de policies)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM authenticated;

-- Substitui a policy de insert por uma com validação de campos mínimos
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Anyone can submit a valid lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(email)) > 3
    AND email LIKE '%@%.%'
    AND nivel BETWEEN 1 AND 4
    AND score >= 0
    AND score_pct BETWEEN 0 AND 100
  );