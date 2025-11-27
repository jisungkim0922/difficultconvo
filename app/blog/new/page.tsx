"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function NewPost(){
  const [title,setTitle]=useState(""),[slug,setSlug]=useState(""),
        [excerpt,setExcerpt]=useState(""),[content,setContent]=useState(""),
        [publishDate,setPublishDate]=useState(""),[file,setFile]=useState<File|null>(null),
        [saving,setSaving]=useState(false);
  const router=useRouter();
  async function uploadCover(){
    if(!file) return null;
    const ext=(file.name.split(".").pop()||"jpg"), path=`covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const {error}=await supabase.storage.from("blog").upload(path,file,{upsert:false});
    if(error){ alert(error.message); return null; }
    return supabase.storage.from("blog").getPublicUrl(path).data.publicUrl ?? null;
  }
  async function onSubmit(e:React.FormEvent){
    e.preventDefault(); setSaving(true);
    const cover_url=await uploadCover();
    const {error}=await supabase.from("posts").insert({
      title, slug, excerpt, content, cover_url,
      publish_date: publishDate?new Date(publishDate).toISOString():new Date().toISOString(),
      published: true
    });
    setSaving(false); if(error){ alert(error.message); return; }
    router.push("/blog");
  }
  return <div className="mx-auto max-w-3xl px-6 py-12">
    <h1 className="text-2xl font-semibold mb-4">New Post</h1>
    <form className="space-y-4" onSubmit={onSubmit}>
      <input required placeholder="Title" className="w-full border rounded-lg px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
      <input required placeholder="Slug (e.g., my-first-post)" className="w-full border rounded-lg px-3 py-2" value={slug} onChange={e=>setSlug(e.target.value)} />
      <textarea placeholder="Excerpt (1–2 lines)" className="w-full border rounded-lg px-3 py-2" value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
      <textarea required placeholder="Write your post…" className="w-full border rounded-lg px-3 py-2 min-h-[240px]" value={content} onChange={e=>setContent(e.target.value)} />
      <div className="grid gap-2 md:grid-cols-2">
        <label className="text-sm text-gray-600">Upload date (orders cards)
          <input type="datetime-local" className="w-full border rounded-lg px-3 py-2" value={publishDate} onChange={e=>setPublishDate(e.target.value)} />
        </label>
        <label className="text-sm text-gray-600">Cover image
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
        </label>
      </div>
      <button disabled={saving} className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition disabled:opacity-60">
        {saving? "Publishing…" : "Publish"}
      </button>
    </form>
  </div>;
}
