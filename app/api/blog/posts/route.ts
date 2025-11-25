export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log("[/api/blog/posts] GET");
  // TODO: replace with your real data fetch
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, content } = body || {};
    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("[/api/blog/posts] POST", { title, slug, len: (content || "").length });
    // TODO: persist to DB/storage
    return NextResponse.json({ ok: true, post: { title, slug, content } }, { status: 201 });
  } catch (e: any) {
    console.error("[/api/blog/posts] POST error", e);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
