"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [publishDate, setPublishDate] = useState<string>(() => new Date().toISOString().slice(0,10));
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setErr(null);
    let cover_url: string | null = null;

    try {
      if (file) {
        const ext = file.name.split(".").pop() || "jpg";
        const key = `covers/${slug}.${ext}`;
        const up = await supabase.storage.from("blog").upload(key, file, { upsert: true });
        if (up.error) throw up.error;
        const pub = supabase.storage.from("blog").getPublicUrl(key);
        cover_url = pub.data.publicUrl;
      }

      const { error } = await supabase.from("posts").insert({
        title,
        slug,
        content,
        excerpt: content.slice(0, 220),
        cover_url,
        publish_date: new Date(publishDate).toISOString(),
        published: true
      });
      if (error) throw error;
      r.push(`/blog/${slug}`);
    } catch (e:any) {
      setErr(e.message ?? String(e));
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">New Post</h1>
      {err ? <p className="text-red-600 mb-4">{err}</p> : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <input required placeholder="Title" className="w-full border rounded-lg px-3 py-2"
               value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input required placeholder="Slug (e.g., my-first-post)" className="w-full border rounded-lg px-3 py-2"
               value={slug} onChange={(e)=>setSlug(e.target.value)} />
        <input type="date" className="border rounded-lg px-3 py-2" value={publishDate}
               onChange={(e)=>setPublishDate(e.target.value)} />
        <textarea required placeholder="Write your post…" className="w-full border rounded-lg px-3 py-2 min-h-[260px]"
                  value={content} onChange={(e)=>setContent(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
        <button disabled={saving} className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition disabled:opacity-60">
          {saving ? "Saving…" : "Publish"}
        </button>
      </form>
    </div>
  );
}
