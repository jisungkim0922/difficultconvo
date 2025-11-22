import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

async function getOrCreateProfile(email: string) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .upsert({ email }, { onConflict: "email" })
    .select("*")
    .single();
  if (error) throw error;
  return data!;
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, status } = await req.json();
  if (!title || !content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const prof = await getOrCreateProfile(session.user.email);

  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert({ author_id: prof.id, title, content, status: status ?? "published" })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data }, { status: 201 });
}
