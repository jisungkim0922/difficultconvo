export const runtime = "nodejs";
import { NextResponse } from "next/server";

mkdir -p "$appdir/api/ping" "$appdir/api/blog/posts"

cat > "$appdir/api/ping/route.ts" <<'TS'
export const runtime = "nodejs";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("[/api/ping] ok");
  return NextResponse.json({ ok: true, t: Date.now() });
}
