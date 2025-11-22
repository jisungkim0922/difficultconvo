import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { supabaseServer } from "../../../../lib/supabaseServer";
import { getUserRole, canEditOrDelete } from "../../../../lib/roles";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const s = supabaseServer();
  const { data, error } = await s.from("posts").select("*").eq("slug", params.slug).maybeSingle();
  if (error && error.code !== "PGRST116") return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || null;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const s = supabaseServer();
  const { data: existing, error: e0 } = await s.from("posts").select("author_email").eq("slug", params.slug).maybeSingle();
  if (e0) return NextResponse.json({ error: e0.message }, { status: 500 });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const role = await getUserRole(email);
  if (!canEditOrDelete(role, existing.author_email, email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const patch: any = {};
  if (body.title) patch.title = String(body.title);
  if (body.excerpt !== undefined) patch.excerpt = String(body.excerpt || "");
  if (body.body !== undefined) patch.body = String(body.body || "");
  if (body.cover_url !== undefined) patch.cover_url = body.cover_url ? String(body.cover_url) : null;
  patch.updated_at = new Date().toISOString();

  const { data, error } = await s.from("posts").update(patch).eq("slug", params.slug).select().maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || null;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const s = supabaseServer();
  const { data: existing, error: e0 } = await s.from("posts").select("author_email").eq("slug", params.slug).maybeSingle();
  if (e0) return NextResponse.json({ error: e0.message }, { status: 500 });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const role = await getUserRole(email);
  if (!canEditOrDelete(role, existing.author_email, email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await s.from("posts").delete().eq("slug", params.slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
