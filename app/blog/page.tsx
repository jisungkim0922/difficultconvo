"use client";

import Link from "next/link";
import "./article.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  published_at: string | null; // user-chosen date
  created_at: string;          // server default
};

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, cover_url, published_at, created_at")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (!error && data) setPosts(data);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="blog-list mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-end justify-between gap-4 mb-8">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-tight font-serif">
          Perspective Exchange
        </h1>
        <Link href="/blog/new" className="text-sm border rounded-lg px-3 py-2 hover:bg-black hover:text-white">
          New Post
        </Link>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <li key={p.id} className="rounded-xl border overflow-hidden hover:shadow-md transition bg-white">
              <Link href={`/blog/${p.slug}`} className="block">
                {p.cover_url ? (
                  <img src={p.cover_url} alt="" className="w-full h-44 object-cover" />
                ) : null}
                <div className="p-4">
                  <h2 className="font-serif text-lg mb-1 line-clamp-2">{p.title}</h2>
                  <p className="text-xs text-gray-500 mb-2">
                    {(p.published_at ? new Date(p.published_at) : new Date(p.created_at)).toLocaleDateString()}
                  </p>
                  {p.excerpt ? <p className="text-sm text-gray-700 line-clamp-3">{p.excerpt}</p> : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
