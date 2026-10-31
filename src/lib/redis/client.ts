import Redis from "ioredis";

const redisUrl =
  process.env.REDIS_URL ||
  "redis://default:FHEacGw8WZQ5oaJrjcI0EWTeIjoZUg7O@holiday-huggable-microsnug-47939.db.redis.io:19729";

// Singleton global client to avoid duplicate connections in Next.js hot-reload
const globalForRedis = globalThis as unknown as {
  redisClient: Redis | undefined;
};

export const redis =
  globalForRedis.redisClient ??
  new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    lazyConnect: true,
  });

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redisClient = redis;
}

/**
 * Checks and increments rate limiting for login attempts.
 * Allows up to 10 attempts per 60 seconds per email/IP.
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const key = `ratelimit:login:${identifier}`;
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }

    const remaining = Math.max(0, limit - current);
    return {
      allowed: current <= limit,
      remaining,
    };
  } catch (error) {
    console.warn("Redis rate limit check error:", error);
    // Graceful fallback: do not block user if redis has transient connection issues
    return { allowed: true, remaining: limit };
  }
}

/**
 * Stores an authenticated session in Redis with a 7-day TTL.
 */
export async function storeSession(
  sessionToken: string,
  sessionData: {
    email: string;
    role: string;
    fullName?: string;
    signedInAt: string;
  },
  ttlSeconds: number = 7 * 24 * 60 * 60
): Promise<boolean> {
  try {
    const key = `session:${sessionToken}`;
    await redis.set(key, JSON.stringify(sessionData), "EX", ttlSeconds);

    // Also update last login tracker for this email
    const lastLoginKey = `user:last_login:${sessionData.email}`;
    await redis.set(
      lastLoginKey,
      JSON.stringify({
        lastLogin: sessionData.signedInAt,
        role: sessionData.role,
      })
    );

    return true;
  } catch (error) {
    console.warn("Redis storeSession error:", error);
    return false;
  }
}

/**
 * Retrieves a session from Redis.
 */
export async function getSession(sessionToken: string) {
  try {
    const key = `session:${sessionToken}`;
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn("Redis getSession error:", error);
    return null;
  }
}

/**
 * Revokes a session in Redis (logout).
 */
export async function revokeSession(sessionToken: string) {
  try {
    const key = `session:${sessionToken}`;
    await redis.del(key);
    return true;
  } catch (error) {
    console.warn("Redis revokeSession error:", error);
    return false;
  }
}
