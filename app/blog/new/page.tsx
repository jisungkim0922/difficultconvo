"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<string>(""); // YYYY-MM-DD
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSaving(true);
    try {
      let cover_url: string | null = null;

      if (file) {
        const key = `covers/${slug || title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}.${file.name.split(".").pop()}`;
        const { error: upErr } = await supabase.storage.from("blog").upload(key, file, { upsert: true });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from("blog").getPublicUrl(key);
        cover_url = data.publicUrl;
      }

      const display_date = date ? new Date(date).toISOString() : null;

      const { error: insErr } = await supabase.from("posts").insert({
        title, slug, content, cover_url, display_date,
      });
      if (insErr) throw insErr;

      router.push("/blog");
    } catch (e: any) {
      setErr(e.message ?? String(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-4xl font-serif mb-6">New Post</h1>
      {err ? <div className="mb-4 text-red-600">{err}</div> : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <input required placeholder="Title" className="w-full border rounded-lg px-3 py-2"
               value={title} onChange={(e) => setTitle(e.target.value)} />
        <input required placeholder="Slug (e.g., my-first-post)" className="w-full border rounded-lg px-3 py-2"
               value={slug} onChange={(e) => setSlug(e.target.value)} />
        <textarea required placeholder="Write your post…" className="w-full border rounded-lg px-3 py-2 min-h-[240px]"
                  value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="flex items-center gap-3">
          <label className="text-sm w-32">Upload date</label>
          <input type="date" className="border rounded-lg px-3 py-2" value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button disabled={saving} className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition disabled:opacity-60">
          {saving ? "Publishing…" : "Publish"}
        </button>
      </form>
    </div>
  );
}
