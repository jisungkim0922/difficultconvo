"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    let cover_url: string | null = null;
    if (file) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `covers/${slug || Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("blog").upload(path, file, { upsert: true });
      if (upErr) { alert(upErr.message); setSaving(false); return; }
      const { data: pub } = supabase.storage.from("blog").getPublicUrl(path);
      cover_url = pub?.publicUrl ?? null;
    }

    const published_at = date ? new Date(date).toISOString() : null;

    const { error } = await supabase.from("posts").insert({
      title, slug, excerpt, content, cover_url, published_at,
    });
    if (error) { alert(error.message); setSaving(false); return; }

    router.push(`/blog/${slug}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-serif mb-4">New Post</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input required placeholder="Title" className="w-full border rounded-lg px-3 py-2"
               value={title} onChange={(e) => setTitle(e.target.value)} />
        <input required placeholder="Slug (e.g., the-trap-of-simplicity)" className="w-full border rounded-lg px-3 py-2"
               value={slug} onChange={(e) => setSlug(e.target.value)} />
        <input placeholder="One-line excerpt (optional)" className="w-full border rounded-lg px-3 py-2"
               value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        <label className="block text-sm text-gray-600">Upload date (used for sorting)</label>
        <input type="date" className="w-full border rounded-lg px-3 py-2"
               value={date} onChange={(e) => setDate(e.target.value)} />
        <textarea required placeholder="Write your post…" className="w-full border rounded-lg px-3 py-2 min-h-[260px]"
                  value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button disabled={saving} className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition disabled:opacity-60">
          {saving ? "Publishing…" : "Publish"}
        </button>
      </form>
    </main>
  );
}
