"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostPage() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState<File | null>(null);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);
    const form = ev.currentTarget;
    const fd = new FormData(form);
    let cover_url: string | undefined;
    const file = (cover || (fd.get("cover") as File | null));
    if (file && file.size > 0) {
      const up = new FormData();
      up.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: up });
      const j = await res.json();
      if (j?.url) cover_url = j.url;
    }
    const payload = {
      title: String(fd.get("title") || ""),
      excerpt: String(fd.get("excerpt") || ""),
      body: String(fd.get("body") || ""),
      cover_url,
    };
    const res = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const j = await res.json();
    setLoading(false);
    if (res.ok && j?.post?.slug) r.push(`/blog/${j.post.slug}`);
    else alert(j?.error || "Failed to publish");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Publish a New Post</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Title</span>
            <input name="title" required className="w-full rounded-lg border px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Cover image</span>
            <input name="cover" type="file" accept="image/*" className="w-full rounded-lg border px-3 py-2" onChange={(e)=>setCover(e.target.files?.[0]||null)} />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Excerpt</span>
          <textarea name="excerpt" rows={2} className="w-full rounded-lg border px-3 py-2" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Body (HTML or plain text)</span>
          <textarea name="body" rows={12} className="w-full rounded-lg border px-3 py-2 font-mono text-sm" placeholder="<p>Write your post…</p>" />
        </label>

        <div className="flex items-center gap-3">
          <button disabled={loading} className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90 disabled:opacity-60">
            {loading ? "Publishing…" : "Publish"}
          </button>
          <a href="/blog" className="text-sm underline">Cancel</a>
        </div>
      </form>
    </main>
  );
}
