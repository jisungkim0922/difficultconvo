import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buf = Buffer.from(bytes);
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabaseAdmin.storage.from("blog").upload(path, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data: pub } = supabaseAdmin.storage.from("blog").getPublicUrl(path);
  return NextResponse.json({ url: pub.publicUrl, path: data?.path });
}
