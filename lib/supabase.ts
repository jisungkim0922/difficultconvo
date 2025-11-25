import { createClient } from "@supabase/supabase-js";
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE!;
export function supabaseAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE) throw new Error("Supabase admin env missing");
  return createClient(SUPABASE_URL, SUPABASE_SERVICE, { auth: { persistSession: false }});
}
export function supabaseAnon() {
  if (!SUPABASE_URL || !SUPABASE_ANON) throw new Error("Supabase anon env missing");
  return createClient(SUPABASE_URL, SUPABASE_ANON, { auth: { persistSession: false }});
}
