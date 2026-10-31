# services/

Place your data-fetching functions here. These are plain async functions
that call your API routes and are used as `queryFn` in TanStack Query.

Convention: name files `<feature>.service.ts`.

Example:
```typescript
// services/users.service.ts
export async function getUsers() {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
```
