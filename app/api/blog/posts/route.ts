export const runtime = "nodejs";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("[/api/blog/posts] start");
  // swap in real data fetch later
  const data: any[] = [];
  console.log("[/api/blog/posts] returning", data.length);
  return NextResponse.json(data);
}
