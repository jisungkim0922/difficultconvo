"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("");
  const [cover, setCover] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-serif mb-6">New Post</h1>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          const { error } = await supabase.from("posts").insert({
            title, slug, excerpt, content,
            cover_url: cover || null,
            published: true,
            publish_date: date ? new Date(date).toISOString() : new Date().toISOString(),
          });
          setSaving(false);
          if (error) alert(error.message);
          else window.location.href = `/blog/${slug}`;
        }}
      >
        <input required placeholder="Title" className="w-full border rounded-lg px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
        <input required placeholder="Slug (e.g., the-trap-of-simplicity)" className="w-full border rounded-lg px-3 py-2" value={slug} onChange={e=>setSlug(e.target.value)} />
        <input type="date" className="w-full border rounded-lg px-3 py-2" value={date} onChange={e=>setDate(e.target.value)} />
        <input placeholder="Cover image URL (optional)" className="w-full border rounded-lg px-3 py-2" value={cover} onChange={e=>setCover(e.target.value)} />
        <input placeholder="Excerpt (optional)" className="w-full border rounded-lg px-3 py-2" value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
        <textarea required placeholder="Write your post…" className="w-full border rounded-lg px-3 py-2 min-h-[240px]" value={content} onChange={e=>setContent(e.target.value)} />
        <button disabled={saving} className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition disabled:opacity-60">
          {saving ? "Saving…" : "Publish"}
        </button>
      </form>
    </div>
  );
}
