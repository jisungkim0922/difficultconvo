"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setMsg(null);

    let cover_url: string | null = null;
    if (file) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `covers/${slug}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("blog").upload(path, file, { upsert: true });
      if (upErr) { setSaving(false); setMsg(upErr.message); return; }
      const { data } = supabase.storage.from("blog").getPublicUrl(path);
      cover_url = data.publicUrl;
    }

    const { error } = await supabase.from("posts").insert({
      title, slug, content, cover_url, published: true
    });

    setSaving(false);
    setMsg(error ? error.message : "Published!");
    if (!error) window.location.href = "/blog";
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">New Post</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input required placeholder="Title" className="w-full border rounded-lg px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
        <input required placeholder="Slug (my-first-post)" className="w-full border rounded-lg px-3 py-2" value={slug} onChange={e=>setSlug(e.target.value)} />
        <textarea required placeholder="Write your post…" className="w-full border rounded-lg px-3 py-2 min-h-[240px]" value={content} onChange={e=>setContent(e.target.value)} />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
        <button disabled={saving} className="px-4 py-2 rounded-lg border">{saving ? "Saving…" : "Publish"}</button>
      </form>
      {msg && <p className="mt-4 text-sm">{msg}</p>}
    </main>
  );
}
