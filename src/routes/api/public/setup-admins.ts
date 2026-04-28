import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["rbruno@nexxulab.com", "fhorita@nexxulab.com"];

export const Route = createFileRoute("/api/public/setup-admins")({
  server: {
    handlers: {
      POST: async () => {
        const supabaseUrl = process.env.SUPABASE_URL!;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

        const admin = createClient(supabaseUrl, serviceKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });

        const results: Array<{
          email: string;
          status: string;
          userId?: string;
          error?: string;
        }> = [];

        for (const email of ADMIN_EMAILS) {
          try {
            const { data: created, error: createErr } =
              await admin.auth.admin.createUser({
                email,
                email_confirm: true,
              });

            let userId: string | undefined;
            let alreadyExisted = false;

            if (createErr) {
              alreadyExisted = true;
              const { data: list } = await admin.auth.admin.listUsers({
                page: 1,
                perPage: 1000,
              });
              const existing = list?.users.find(
                (u) => u.email?.toLowerCase() === email.toLowerCase()
              );
              if (!existing) {
                results.push({
                  email,
                  status: "error",
                  error: createErr.message,
                });
                continue;
              }
              userId = existing.id;
            } else {
              userId = created.user?.id;
            }

            if (!userId) {
              results.push({ email, status: "error", error: "no user id" });
              continue;
            }

            const { error: roleErr } = await admin
              .from("user_roles")
              .upsert(
                { user_id: userId, role: "admin" },
                { onConflict: "user_id,role" }
              );

            if (roleErr) {
              results.push({
                email,
                status: "user_ok_role_failed",
                userId,
                error: roleErr.message,
              });
              continue;
            }

            results.push({
              email,
              status: alreadyExisted ? "already_existed_role_ok" : "created",
              userId,
            });
          } catch (e: any) {
            results.push({
              email,
              status: "exception",
              error: e?.message || String(e),
            });
          }
        }

        return Response.json({ results });
      },
    },
  },
});
