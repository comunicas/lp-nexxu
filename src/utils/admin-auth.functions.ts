import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["rbruno@nexxulab.com", "fhorita@nexxulab.com"];

export const sendAdminOtp = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => {
    if (!input || typeof input.email !== "string") {
      throw new Error("Invalid input");
    }
    const email = input.email.trim().toLowerCase();
    return { email };
  })
  .handler(async ({ data }) => {
    // Always return generic success to prevent email enumeration.
    // Only actually send OTP if email is in allowlist.
    if (!ADMIN_EMAILS.includes(data.email)) {
      return { success: true as const };
    }

    const supabaseUrl = process.env.SUPABASE_URL!;
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY!;

    const client = createClient(supabaseUrl, publishableKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await client.auth.signInWithOtp({
      email: data.email,
      options: {
        shouldCreateUser: false,
      },
    });

    if (error) {
      console.error("sendAdminOtp error:", error);
    }

    return { success: true as const };
  });
