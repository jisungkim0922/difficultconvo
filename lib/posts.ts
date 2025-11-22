import { supabaseServer } from "./supabaseServer";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  cover_url?: string;
  author_email: string;
  author_name?: string;
  created_at: string;
  updated_at: string;
};

const TABLE = "posts";

export async function listPosts(): Promise<Post[]> {
  const s = supabaseServer();
  const { data, error } = await s.from(TABLE)
    .select("id, slug, title, excerpt, cover_url, author_email, author_name, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const s = supabaseServer();
  const { data, error } = await s.from(TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
}
