import { NextResponse } from "next/server";
import { supabaseAdmin, SUPABASE_URL } from "@/lib/supabase";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const s = supabaseAdmin();
  await s.storage.createBucket("images", { public: true }).catch(()=>{});
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const key = `images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await s.storage.from("images").upload(key, file, { upsert: true, contentType: file.type || undefined });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${key}`;
  return NextResponse.json({ key, url: publicUrl }, { status: 201 });
}
