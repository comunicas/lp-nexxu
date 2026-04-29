import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { isAdminEmail } from "@/config/admin";

/**
 * Retorna isAdmin=true somente se houver sessão Supabase ativa
 * cujo email esteja na whitelist de admins.
 * Seguro para uso em componentes públicos — nunca expõe dados.
 */
export function useAdminSession(): { isAdmin: boolean; session: Session | null } {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const apply = (s: Session | null) => {
      const admin = s ? isAdminEmail(s.user.email) : false;
      setSession(admin ? s : null);
      setIsAdmin(admin);
    };

    supabase.auth.getSession().then(({ data }) => apply(data.session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => apply(s));
    return () => subscription.unsubscribe();
  }, []);

  return { isAdmin, session };
}
