"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: number; title: string; slug: string;
  excerpt: string | null; cover_url: string | null;
  publish_date: string;
};

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    supabase
      .from("posts")
      .select("id,title,slug,excerpt,cover_url,publish_date")
      .order("publish_date", { ascending:false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Link href="/blog/new" className="border rounded-lg px-3 py-2 hover:bg-black hover:text-white">New Post</Link>
      </div>

      {posts.length === 0 ? <p>No posts yet.</p> : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="rounded-xl overflow-hidden border group">
              {p.cover_url ? (
                <img src={p.cover_url} alt="" className="w-full h-48 object-cover group-hover:opacity-90 transition"/>
              ) : <div className="w-full h-48 bg-gray-100"/>}
              <div className="p-4">
                <p className="text-xs text-gray-500">{new Date(p.publish_date).toLocaleDateString()}</p>
                <h2 className="text-xl font-semibold mt-1">{p.title}</h2>
                {p.excerpt ? <p className="text-gray-600 mt-2 line-clamp-2">{p.excerpt}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
