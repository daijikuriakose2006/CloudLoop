# Architecture decisions

- Next.js App Router exposes UI and HTTP API.
- Prisma is the server data-access layer; Supabase hosts PostgreSQL and Auth.
- RLS and route-level role checks both enforce tenant access.
- Redis supplies short-lived cache, rate limiting, and distributed locks.
- Razorpay is limited to test mode and webhooks must be signature-verified and idempotent.

## Boundary map

`app` is routing only → `features` provides business behavior → `lib` provides infrastructure → `prisma` persists data.
