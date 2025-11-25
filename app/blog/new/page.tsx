"use client";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const onImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.append("file", f);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json?.url) setCoverUrl(json.url);
  }, []);

  const submit = async () => {
    if (!title || !slug || !content) return alert("Fill in title, slug, content");
    setBusy(true);
    const res = await fetch("/api/blog/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, content, cover_url: coverUrl }),
    });
    setBusy(false);
    if (!res.ok) return alert("Save failed");
    router.push("/blog");
  };

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">New Post</h1>
      <div className="space-y-4">
        <input className="border p-3 rounded w-full" placeholder="Title"
               value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="border p-3 rounded w-full" placeholder="Slug (e.g. my-first-post)"
               value={slug} onChange={e=>setSlug(e.target.value)} />
        <div className="border rounded">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={onImage} />
          {coverUrl && <span className="text-sm">uploaded ✓</span>}
        </div>
        <button disabled={busy} onClick={submit}
                className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
          {busy ? "Saving…" : "Publish"}
        </button>
      </div>
    </main>
  );
}
