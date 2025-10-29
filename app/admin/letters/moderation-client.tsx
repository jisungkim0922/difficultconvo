'use client';
import { useState } from "react";
import { createClientBrowser } from "@/lib/supabase";

export default function ModerationClient({ initial }: { initial: any[] }) {
  const [rows, setRows] = useState(initial);
  const supabase = createClientBrowser();

  const act = async (id:string, status:"published"|"rejected") => {
    const { error } = await supabase.from("letters")
      .update({ status, published_at: status==='published' ? new Date().toISOString() : null })
      .eq("id", id);
    if (!error) setRows(rows.filter(r => r.id!==id));
    else alert(error.message);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Letters Review Queue</h1>
      {rows.length===0 && <p>No letters awaiting review.</p>}
      {rows.map(l => (
        <div key={l.id} className="border rounded p-4">
          <pre className="whitespace-pre-wrap">{l.body}</pre>
          <div className="mt-2 space-x-2">
            <button onClick={()=>act(l.id,'published')} className="px-3 py-1 bg-green-700 text-white rounded">Approve</button>
            <button onClick={()=>act(l.id,'rejected')} className="px-3 py-1 bg-red-700 text-white rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
