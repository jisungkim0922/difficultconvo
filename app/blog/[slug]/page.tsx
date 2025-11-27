"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import "../article.css";

type Post = {
  title: string;
  content: string;
  excerpt: string | null;
  cover_url: string | null;
  published_at: string | null;
  created_at: string;
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("posts")
        .select("title, content, excerpt, cover_url, published_at, created_at")
        .eq("slug", params.slug)
        .maybeSingle();
      setPost(data);
    })();
  }, [params.slug]);

  if (!post) return <div className="mx-auto max-w-3xl px-6 py-12">Post not found.</div>;

  const when = (post.published_at ? new Date(post.published_at) : new Date(post.created_at)).toLocaleString();

  return (
    <article className="blog-article mx-auto max-w-3xl px-6 py-12 prose">
      <h1>{post.title}</h1>
      <p className="byline">{when}</p>
      {post.cover_url ? <img src={post.cover_url} alt="" className="cover" /> : null}
      {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}
      <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
    </article>
  );
}
