"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
type Post={title:string;content:string|null;cover_url:string|null;publish_date:string|null;};
export default function PostPage({params}:{params:{slug:string}}){
  const [post,setPost]=useState<Post|null>(null);
  useEffect(()=>{(async()=>{
    const {data}=await supabase.from("posts")
      .select("title,content,cover_url,publish_date").eq("slug",params.slug).maybeSingle();
    if(data) setPost(data as Post);
  })();},[params.slug]);
  if(!post) return <div className="mx-auto max-w-3xl px-6 py-12">Loading…</div>;
  return <article className="mx-auto max-w-3xl px-6 py-12 prose">
    <h1>{post.title}</h1>
    <p style={{marginTop:-12}} className="text-sm text-gray-500">
      {post.publish_date?new Date(post.publish_date).toLocaleString():""}
    </p>
    {post.cover_url && <img src={post.cover_url} alt="" className="w-full h-auto rounded-xl" />}
    <div style={{whiteSpace:"pre-wrap"}}>{post.content}</div>
  </article>;
}
