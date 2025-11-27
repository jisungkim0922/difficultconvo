import "./article.css";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function readTime(text: string) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export default async function BlogIndex() {
  const { data } = await supabase
    .from("posts")
    .select("title, slug, cover_url, content, publish_date, created_at, author, published")
    .order("publish_date", { ascending: false })
    .order("created_at", { ascending: false });

  const posts = (data || []).filter(p => p.published !== false);

  return (
    <main className="blog-list mx-auto max-w-6xl px-6 py-10">
      <h1 className="sr-only">All Posts</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(p => {
          const dateISO = p.publish_date ?? p.created_at;
          const dateText = dateISO ? new Date(dateISO as string).toLocaleDateString() : "";
          const excerpt = (p.content || "").slice(0, 180).trim() + ((p.content || "").length > 180 ? "…" : "");
          return (
            <Link key={p.slug} href={`/blog/${encodeURIComponent(p.slug as string)}`} className="block rounded-xl border p-4 hover:shadow-md transition bg-white">
              {p.cover_url ? <img src={p.cover_url as string} alt="" className="w-full h-44 object-cover rounded-lg mb-3" /> : null}
              <h2 className="text-xl font-semibold mb-1">{p.title}</h2>
              <div className="text-sm text-gray-500 mb-2">
                {p.author ? `${p.author} · ` : ""}{dateText} · {readTime(p.content || "")}
              </div>
              <p className="text-[15px] leading-6 text-gray-700">{excerpt}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
