import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // always fresh
export const dynamic = "force-dynamic";

export default async function BlogIndex() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("title, slug, cover_url, content, display_date, created_at")
    .order("display_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="mx-auto max-w-5xl px-6 py-10 text-red-600">{error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif">All Posts</h1>
        <Link href="/blog/new" className="border rounded-lg px-3 py-2 hover:bg-black hover:text-white">New Post</Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(posts ?? []).map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-xl overflow-hidden border hover:shadow transition">
            {p.cover_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.cover_url} alt="" className="w-full h-48 object-cover" />
            ) : <div className="w-full h-48 bg-gray-100" />}
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-2">
                {new Date(p.display_date ?? p.created_at).toLocaleDateString()}
              </div>
              <h2 className="text-xl font-serif leading-snug">{p.title}</h2>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2" style={{display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"}}>
                {p.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
