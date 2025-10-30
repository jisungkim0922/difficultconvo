import { createClientServer } from './supabase-server';

export async function getSessionProfile() {
  const supabase = createClientServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile };
}

export function requireRole(profile: any, roles: string[]) {
  return !!profile && roles.includes(profile.role);
}
