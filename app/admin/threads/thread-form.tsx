'use client';
import { useForm } from "react-hook-form";
import { createClientBrowser } from "@/lib/supabase";

export default function ThreadForm() {
  const { register, handleSubmit, reset } = useForm();
  const supabase = createClientBrowser();

  const onSubmit = async (v:any) => {
    const slug = v.slug || v.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
    const viewpoints = [v.view1, v.view2, v.view3].filter(Boolean).map((x:string)=>({view:x}));
    const { error } = await supabase.from("threads").insert({
      title: v.title, slug, question: v.question, context_mdx: v.context_mdx,
      viewpoints_json: viewpoints, status: "published"
    });
    if (error) alert(error.message); else { alert("Thread created"); reset(); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded p-4 space-y-3">
      <h2 className="text-lg font-semibold">Create New Thread</h2>
      <input className="w-full border p-2 rounded" placeholder="Title" {...register("title",{required:true})} />
      <input className="w-full border p-2 rounded" placeholder="Slug (optional)" {...register("slug")} />
      <input className="w-full border p-2 rounded" placeholder="Loaded question" {...register("question",{required:true})} />
      <textarea className="w-full border p-2 rounded h-24" placeholder="Context (MDX allowed)" {...register("context_mdx")} />
      <input className="w-full border p-2 rounded" placeholder="Viewpoint 1" {...register("view1")} />
      <input className="w-full border p-2 rounded" placeholder="Viewpoint 2" {...register("view2")} />
      <input className="w-full border p-2 rounded" placeholder="Viewpoint 3" {...register("view3")} />
      <button className="px-3 py-2 bg-black text-white rounded">Create Thread</button>
    </form>
  );
}
