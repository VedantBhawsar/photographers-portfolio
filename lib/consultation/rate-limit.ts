import "server-only";

type Window = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5_000;

/**
 * Fixed-window, in-memory limiter. It only protects a single server instance —
 * on multi-instance / serverless hosting, back it with a shared store
 * (e.g. Upstash Redis) if abuse becomes a problem.
 */
const windows = new Map<string, Window>();

export function checkRateLimit(key: string, now = Date.now()): { allowed: boolean } {
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    if (windows.size >= MAX_TRACKED_KEYS) pruneExpired(now);
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= MAX_REQUESTS) return { allowed: false };

  current.count += 1;
  return { allowed: true };
}

function pruneExpired(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
  // Still full (sustained flood): drop the oldest entries rather than grow unbounded.
  if (windows.size >= MAX_TRACKED_KEYS) {
    const overflow = windows.size - MAX_TRACKED_KEYS + 1;
    for (const key of [...windows.keys()].slice(0, overflow)) windows.delete(key);
  }
}

/** Remembers recently accepted submission ids so a double-submit is not delivered twice. */
const recentSubmissions = new Map<string, number>();
const SUBMISSION_TTL_MS = 30 * 60 * 1000;

export function wasRecentlySubmitted(id: string, now = Date.now()): boolean {
  for (const [key, expiresAt] of recentSubmissions) {
    if (expiresAt <= now) recentSubmissions.delete(key);
  }
  return recentSubmissions.has(id);
}

export function rememberSubmission(id: string, now = Date.now()) {
  recentSubmissions.set(id, now + SUBMISSION_TTL_MS);
}
