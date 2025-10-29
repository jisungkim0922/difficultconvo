'use client';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createClientBrowser } from "@/lib/supabase";

export default function SubmitLetter({ threadId }: { threadId: string }) {
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState<string | null>(null);
  const supabase = createClientBrowser();

  const onSubmit = async (v:any) => {
    if (!v.steelman_ack) { alert("Please confirm the steel-man checkbox."); return; }
    const { error } = await supabase.from("letters").insert({
      thread_id: threadId,
      author_profile_id: null,
      to_entity: v.to_entity || null,
      body: v.body,
      sources_json: v.sources ? [{ ref: v.sources }] : null,
      steelman_ack: !!v.steelman_ack,
      status: "review"
    });
    if (error) setMsg("Error: " + error.message);
    else { setMsg("Submitted for review. Thank you!"); reset(); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input className="w-full border p-2 rounded" placeholder="Addressed to (optional)" {...register("to_entity")} />
      <textarea className="w-full border p-2 rounded h-32" placeholder="Your 250–400 word letter" {...register("body", { required: true })} />
      <input className="w-full border p-2 rounded" placeholder="Source (optional link/title)" {...register("sources")} />
      <label className="text-sm flex items-center gap-2">
        <input type="checkbox" {...register("steelman_ack")} /> I have steel-manned one opposing point.
      </label>
      <button className="px-3 py-2 bg-black text-white rounded">Submit</button>
      {msg && <p className="text-sm text-gray-700">{msg}</p>}
    </form>
  );
}
