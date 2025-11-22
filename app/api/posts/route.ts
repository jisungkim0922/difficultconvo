import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseServer } from "../../../lib/supabaseServer";
import { getUserRole } from "../../../lib/roles";

export async function GET() {
  const s = supabaseServer();
  const { data, error } = await s
    .from("posts")
    .select("id, slug, title, excerpt, cover_url, author_email, author_name, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data || [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || null;
  const name = session?.user?.name || null;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = await getUserRole(email);
  if (!role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const html = String(body.body || "");
  const cover_url = body.cover_url ? String(body.cover_url) : null;

  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const s = supabaseServer();
  const { data, error } = await s.from("posts").upsert({
    slug, title, excerpt, body: html, cover_url,
    author_email: email, author_name: name || email,
    updated_at: new Date().toISOString(),
  }, { onConflict: "slug" }).select().maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}
