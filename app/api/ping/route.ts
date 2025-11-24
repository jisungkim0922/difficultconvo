export const runtime = "nodejs";
import { NextResponse } from "next/server";
export async function GET() {
  console.log("[/api/ping] ok");
  return NextResponse.json({ ok: true, t: Date.now() });
}
