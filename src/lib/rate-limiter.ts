// Simple in-memory sliding-window rate limiter.
// Suitable for MVP usage on Worker SSR. Keyed by `${ip}:${route}`.

const buckets = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const arr = (buckets.get(key) ?? []).filter((t) => t > cutoff);

  if (arr.length >= limit) {
    const oldest = arr[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    buckets.set(key, arr);
    return { allowed: false, retryAfter };
  }

  arr.push(now);
  buckets.set(key, arr);

  // Opportunistic cleanup
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      const filtered = v.filter((t) => t > cutoff);
      if (filtered.length === 0) buckets.delete(k);
      else buckets.set(k, filtered);
    }
  }

  return { allowed: true };
}
