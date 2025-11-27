"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = { id:number; title:string; slug:string; cover_url:string|null; created_at:string };

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, cover_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (!error) setPosts(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link href="/blog/new" className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition">
          New Post
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {!loading && (!posts || posts.length === 0) && <p>No posts yet.</p>}

      <ul className="space-y-6">
        {posts?.map(p => (
          <li key={p.id} className="border rounded-xl p-4 hover:shadow-sm transition">
            <Link href={`/blog/${p.slug}`}>
              <div className="flex gap-4">
                {p.cover_url ? <img src={p.cover_url} alt="" className="w-24 h-24 object-cover rounded-lg" /> : null}
                <div>
                  <h2 className="text-xl font-semibold">{p.title}</h2>
                  <p className="text-sm text-gray-500">{new Date(p.created_at).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
