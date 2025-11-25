export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log("[/api/blog/posts] GET");
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  try {
    const { title, slug, content } = await req.json();
    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    console.log("[/api/blog/posts] POST", { title, slug, len: (content || "").length });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
