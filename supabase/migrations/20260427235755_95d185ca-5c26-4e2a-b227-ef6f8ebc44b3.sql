
-- Trigger to auto-grant admin role to whitelisted emails on signup
CREATE OR REPLACE FUNCTION public.grant_admin_to_whitelist()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IN ('rbruno@nexxulab.com', 'fhorita@nexxulab.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.grant_admin_to_whitelist();

-- Backfill: if these users already exist in auth.users, grant role now
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email IN ('rbruno@nexxulab.com', 'fhorita@nexxulab.com')
ON CONFLICT (user_id, role) DO NOTHING;
