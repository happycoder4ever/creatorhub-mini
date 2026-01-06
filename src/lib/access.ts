// lib/access.ts
export async function checkAccess(wallet: string): Promise<boolean> {
  const res = await fetch("/api/access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet }),
  });

  if (!res.ok) return false;

  const data = await res.json();
  return !!data.hasAccess;
}
