"use client";

import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setMsg("Posted ✔");
      setTitle(""); setSlug(""); setContent("");
    } catch (err: any) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input className="w-full border p-2 rounded" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Slug</label>
          <input className="w-full border p-2 rounded" value={slug} onChange={e=>setSlug(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Content</label>
          <textarea className="w-full border p-2 rounded min-h-[200px]" value={content} onChange={e=>setContent(e.target.value)} required />
        </div>
        <button disabled={busy} className="border px-4 py-2 rounded">
          {busy ? "Posting…" : "Post"}
        </button>
        {msg && <p className="mt-2">{msg}</p>}
      </form>
    </main>
  );
}
