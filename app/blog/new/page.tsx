"use client";
import { useState } from "react";
export default function NewPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File|null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  async function uploadImage() {
    if (!image) return null;
    const fd = new FormData(); fd.append("file", image);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json(); return data.url as string;
  }
  async function submit(e:any) {
    e.preventDefault(); setSaving(true); setMsg("");
    try {
      const imageUrl = await uploadImage();
      const res = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, imageUrl }),
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = "/blog";
    } catch (err:any) { setMsg(err.message || "Error"); }
    finally { setSaving(false); }
  }
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">New Post</h1>
      <form onSubmit={submit} className="space-y-4 max-w-2xl">
        <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="Slug (e.g., first-post)" value={slug} onChange={e=>setSlug(e.target.value)} required />
        <textarea className="w-full border rounded p-2 min-h-[240px]" placeholder="Write here..." value={content} onChange={e=>setContent(e.target.value)} required />
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0]||null)} />
        <button disabled={saving} className="px-4 py-2 rounded-lg border">{saving ? "Saving..." : "Publish"}</button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
}
