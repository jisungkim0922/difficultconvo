export async function requireRole(_role: string) {
  return { ok: false as const, reason: "admin_disabled" as const };
}
