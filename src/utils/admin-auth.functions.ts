import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminEmail } from "@/config/admin";

function toAdminRedirectUrl(rawOrigin: string): string {
  const url = new URL(rawOrigin);
  if (!url.pathname || url.pathname === "/") {
    url.pathname = "/admin";
  } else if (!url.pathname.endsWith("/admin")) {
    url.pathname = `${url.pathname.replace(/\/$/, "")}/admin`;
  }
  url.search = "";
  url.hash = "";
  return url.toString();
}

function getAdminRedirectUrl(): string {
  const configuredOrigin = process.env.ADMIN_AUTH_REDIRECT_ORIGIN || process.env.SITE_URL;
  if (configuredOrigin) return toAdminRedirectUrl(configuredOrigin);

  const request = getRequest();
  const host = request?.headers.get("x-forwarded-host") || request?.headers.get("host");
  if (host) {
    const proto = request?.headers.get("x-forwarded-proto") || "https";
    return toAdminRedirectUrl(`${proto}://${host}`);
  }

  return "https://nexxulab.com/admin";
}

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
    if (!isAdminEmail(data.email)) {
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
        emailRedirectTo: getAdminRedirectUrl(),
      },
    });

    if (error) {
      console.error("sendAdminOtp error:", error);
    }

    return { success: true as const };
  });
