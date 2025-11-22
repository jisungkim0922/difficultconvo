import { supabaseServer } from "./supabaseServer";
export type Role = "editor" | "member";
export async function getUserRole(email?: string | null): Promise<Role | null> {
  if (!email) return null;
  const s = supabaseServer();
  const { data, error } = await s.from("user_roles").select("role").eq("email", email).maybeSingle();
  if (error) return null;
  return (data?.role as Role) || "member";
}
export function canEditOrDelete(role: Role | null, postAuthorEmail: string, userEmail?: string | null) {
  if (role === "editor") return true;
  return !!userEmail && userEmail === postAuthorEmail;
}
