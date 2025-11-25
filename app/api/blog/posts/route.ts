import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const s = supabaseAdmin();
  await s.storage.createBucket("blog").catch(()=>{});
  const list = await s.storage.from("blog").list("", { limit: 100 });
  if (list.error) return NextResponse.json({ error: list.error.message }, { status: 500 });

  const posts:any[] = [];
  for (const f of (list.data ?? []).filter(f => f.name.endsWith(".json"))) {
    const { data } = await s.storage.from("blog").download(f.name);
    if (data) { try { posts.push(JSON.parse(await data.text())); } catch {} }
  }
  posts.sort((a,b)=> (b.createdAt||"").localeCompare(a.createdAt||""));
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { title, slug, content, imageUrl } = await req.json().catch(()=> ({}));
  if (!title || !slug || !content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const s = supabaseAdmin();
  await s.storage.createBucket("blog").catch(()=>{});
  const key = `${slug}.json`;
  const payload = JSON.stringify({ title, slug, content, imageUrl: imageUrl||null, createdAt: new Date().toISOString() }, null, 2);
  const { error } = await s.storage.from("blog").upload(key, new Blob([payload], { type: "application/json" }), { upsert: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
