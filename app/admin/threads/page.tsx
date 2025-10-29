import Link from "next/link";
import ThreadForm from "./thread-form";
import { getSessionProfile, requireRole } from "@/lib/auth";
import { createClientServer } from "@/lib/supabase-server";

export default async function AdminThreads() {
  const session = await getSessionProfile();
  if (!session || !requireRole(session.profile, ["editor","admin"])) return <div>Not authorized.</div>;

  const supabase = createClientServer();
  const { data: threads } = await supabase
    .from("threads")
    .select("id, title, slug, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Threads</h1>
      <ThreadForm />
      <div className="space-y-2">
        {threads?.map(t => (
          <div key={t.id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-600">{t.slug} — {t.status}</div>
            </div>
            <Link href={`/peb/${t.slug}`} className="text-blue-600 underline">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
