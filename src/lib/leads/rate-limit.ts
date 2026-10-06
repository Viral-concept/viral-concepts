/**
 * Fixed-window rate limiter held in memory.
 *
 * Best effort only: each serverless instance keeps its own counts and loses them on a cold
 * start. It slows a burst hitting one instance; the real limit is the Vercel Firewall rule on
 * POST /contact (see README) together with Turnstile. No database is needed for either.
 */
export interface RateLimiter {
  /** Records a hit for `key`; false when the key is over its limit for the current window. */
  hit(key: string, now?: number): boolean;
}

export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 5_000,
}: {
  readonly limit: number;
  readonly windowMs: number;
  /** Bound memory: the oldest windows are dropped first when this many keys are tracked. */
  readonly maxKeys?: number;
}): RateLimiter {
  const windows = new Map<string, { start: number; count: number }>();

  return {
    hit(key, now = Date.now()) {
      const current = windows.get(key);
      if (!current || now - current.start >= windowMs) {
        windows.delete(key);
        if (windows.size >= maxKeys) {
          const oldest = windows.keys().next().value;
          if (oldest !== undefined) windows.delete(oldest);
        }
        windows.set(key, { start: now, count: 1 });
        return true;
      }
      current.count += 1;
      return current.count <= limit;
    },
  };
}
