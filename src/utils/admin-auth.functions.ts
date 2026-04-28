import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["rbruno@nexxulab.com", "fhorita@nexxulab.com"];

export const generateAdminMagicLink = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => {
    if (!input || typeof input.email !== "string") {
      throw new Error("Invalid input");
    }
    const email = input.email.trim().toLowerCase();
    if (!ADMIN_EMAILS.includes(email)) {
      throw new Error("Email não autorizado");
    }
    return { email };
  })
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: linkData, error } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: data.email,
      options: {
        redirectTo: "https://nexxulab.com/admin",
      },
    });

    if (error || !linkData?.properties?.action_link) {
      console.error("generateLink error:", error);
      return {
        success: false as const,
        error: error?.message || "Falha ao gerar link",
      };
    }

    return {
      success: true as const,
      actionLink: linkData.properties.action_link as string,
    };
  });
