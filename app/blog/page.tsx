"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = { id: number; title: string; slug: string; cover_url: string | null; created_at: string; };

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    supabase.from("posts")
      .select("id, title, slug, cover_url, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => { if (!error && data) setPosts(data as Post[]); });
  }, []);
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {!posts.length && <p>No posts yet.</p>}
      <div className="space-y-6">
        {posts.map(p => (
          <article key={p.id} className="border rounded-xl p-4 hover:bg-gray-50">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold">{p.title}</Link>
            <p className="text-sm text-gray-500">{new Date(p.created_at).toLocaleString()}</p>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <a href="/blog/new" className="inline-block px-4 py-2 border rounded-lg">New Post</a>
      </div>
    </main>
  );
}
