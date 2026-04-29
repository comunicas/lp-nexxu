export const ADMIN_EMAILS = ["rbruno@nexxulab.com", "fhorita@nexxulab.com"] as const;

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase() as (typeof ADMIN_EMAILS)[number]);
}
