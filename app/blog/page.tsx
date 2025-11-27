"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  publish_date: string | null;
};

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, cover_url, publish_date")
        .eq("published", true)
        .order("publish_date", { ascending: false })
        .limit(50);
      if (!error && data) setPosts(data as Post[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Perspective Exchange</h1>
        <Link href="/blog/new" className="border px-3 py-2 rounded-lg hover:bg-black hover:text-white transition">New Post</Link>
      </div>

      {loading ? <div>Loading…</div> : (
        <div className="blog-grid">
          {posts.map((p) => (
            <article key={String(p.id)} className="blog-card">
              <Link href={`/blog/${p.slug}`}>
                {p.cover_url && <img src={p.cover_url} alt="" />}
                <h2>{p.title}</h2>
              </Link>
              {p.excerpt && <p className="excerpt">{p.excerpt}</p>}
              <div className="blog-meta">{p.publish_date ? new Date(p.publish_date).toLocaleDateString() : ""}</div>
            </article>
          ))}
          {!posts.length && <div>No posts yet.</div>}
        </div>
      )}
    </div>
  );
}
