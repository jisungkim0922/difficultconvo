"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Post = { title:string; content:string; cover_url:string|null; created_at:string };

export default function PostPage() {
  const { slug } = useParams<{ slug:string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("posts")
        .select("title, content, cover_url, created_at")
        .eq("slug", slug)
        .maybeSingle();
      setPost(data ?? null);
    })();
  }, [slug]);

  if (!post) return <div className="mx-auto max-w-3xl px-6 py-12">Loading…</div>;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 prose">
      <h1>{post.title}</h1>
      {post.cover_url ? <img src={post.cover_url} alt="" className="w-full h-auto rounded-xl" /> : null}
      <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
      <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
    </article>
  );
}
