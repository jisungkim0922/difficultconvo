"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft"|"published">("published");
  const [err, setErr] = useState<string|undefined>();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(undefined);
    const res = await fetch("/api/blog/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, content, status }),
    });
    if (res.status === 401) {
      window.location.href = "/api/auth/signin";
      return;
    }
    const data = await res.json();
    if (!res.ok) {
      setErr(data?.error || "Failed to post");
      return;
    }
    router.push("/blog");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-extrabold">New Post</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full rounded-lg border px-3 py-2"
               placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea className="h-60 w-full rounded-lg border px-3 py-2"
                  placeholder="Write your post (markdown or plain text)"
                  value={content} onChange={e=>setContent(e.target.value)} required />
        <div className="flex items-center gap-3">
          <label className="text-sm">Status</label>
          <select className="rounded-lg border px-2 py-1"
                  value={status} onChange={e=>setStatus(e.target.value as any)}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <button className="ml-auto rounded-lg bg-black px-4 py-2 text-white hover:opacity-90">
            Post
          </button>
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <p className="text-sm opacity-60">Members can post and edit/delete their own. Editors can edit/delete all.</p>
      </form>
    </main>
  );
}
