import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
export const runtime = "nodejs";

// Storage-only blog: JSON files in bucket "blog", key blog/{slug}.json

export async function GET() {
  const s = supabaseAdmin();
  const list = await s.storage.from("blog").list("", { limit: 100, search: ".json" });
  if (list.error) return NextResponse.json({ error: list.error.message }, { status: 500 });

  const files = list.data?.filter(f => f.name.endsWith(".json")) ?? [];
  const posts: any[] = [];
  for (const f of files) {
    const { data, error } = await s.storage.from("blog").download(f.name);
    if (!error && data) {
      try {
        const text = await data.text();
        const json = JSON.parse(text);
        posts.push({ title: json.title, slug: json.slug, imageUrl: json.imageUrl ?? null, createdAt: json.createdAt });
      } catch {}
    }
  }
  posts.sort((a,b)=> (b.createdAt||"").localeCompare(a.createdAt||""));
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=> ({}));
  const { title, slug, content, imageUrl } = body || {};
  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const s = supabaseAdmin();
  await s.storage.createBucket("blog").catch(()=>{});
  const payload = JSON.stringify({ title, slug, content, imageUrl: imageUrl || null, createdAt: new Date().toISOString() }, null, 2);
  const { error } = await s.storage.from("blog").upload(`${slug}.json`, new Blob([payload], { type: "application/json" }), { upsert: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
