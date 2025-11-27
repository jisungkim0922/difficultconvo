import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const key  = (form.get("key") as string | null) ?? `covers/${Date.now()}.jpg`;

  if (!file) return NextResponse.json({ error: "file missing" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabaseAdmin
    .storage
    .from("blog")
    .upload(key, Buffer.from(arrayBuffer), { upsert: true, contentType: file.type || "application/octet-stream" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabaseAdmin.storage.from("blog").getPublicUrl(key);
  return NextResponse.json({ url: data.publicUrl, key });
}
