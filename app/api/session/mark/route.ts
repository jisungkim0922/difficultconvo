import { NextResponse } from "next/server";
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("dc_last_login", Date.now().toString(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return res;
}
