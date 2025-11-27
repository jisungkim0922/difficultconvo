"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewPostPage() {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File|null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);

    let cover_url: string | null = null;

    if (file) {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const key = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("blog").upload(key, file, { upsert: true });
      if (upErr) { setErr(upErr.message); setSaving(false); return; }
      const { data } = supabase.storage.from("blog").getPublicUrl(key);
      cover_url = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({ title, slug, content, cover_url, published: true })
      .select("slug")
      .single();

    if (error) { setErr(error.message); setSaving(false); return; }
    r.push(`/blog/${data.slug}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">New Post</h1>
      {err ? <p className="text-red-600 mb-3">{err}</p> : null}
      <form className="space-y-4" onSubmit={onSubmit}>
        <input required placeholder="Title" className="w-full border rounded-lg px-3 py-2"
               value={title} onChange={e=>setTitle(e.target.value)} />
        <input required placeholder="Slug (e.g., my-first-post)" className="w-full border rounded-lg px-3 py-2"
               value={slug} onChange={e=>setSlug(e.target.value)} />
        <textarea required placeholder="Write your post…" className="w-full border rounded-lg px-3 py-2 min-h-[240px]"
                  value={content} onChange={e=>setContent(e.target.value)} />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
        <button disabled={saving} className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition disabled:opacity-60">
          {saving ? "Publishing…" : "Publish"}
        </button>
      </form>
    </div>
  );
}
