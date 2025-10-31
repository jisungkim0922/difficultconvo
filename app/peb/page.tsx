// @ts-nocheck
import Link from "next/link";
import { createClientServer } from "@/lib/supabase-server";

export default async function PEBList() {
  const supabase = createClientServer();
  const { data: threads } = await supabase
    .from("threads")
    .select("id, title, slug, question")
    .eq("status","published")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Perspective Exchange Blog</h1>
      <div className="space-y-3">
        {threads?.length ? threads.map(t => (
          <div key={t.id} className="border rounded p-4">
            <h2 className="text-xl font-medium"><Link href={`/peb/${t.slug}`}>{t.title}</Link></h2>
            <p className="text-sm text-gray-600">{t.question}</p>
          </div>
        )) : <p>No threads yet.</p>}
      </div>
    </div>
  );
}
