import { createClientServer } from "@/lib/supabase";
import SubmitLetter from "./submit-letter";

export default async function ThreadPage({ params }: { params: { slug: string } }) {
  const supabase = createClientServer();
  const { data: thread } = await supabase.from("threads").select("*").eq("slug", params.slug).maybeSingle();
  if (!thread) return <div>Thread not found.</div>;

  const { data: letters } = await supabase
    .from("letters")
    .select("id, body, published_at")
    .eq("thread_id", thread.id)
    .eq("status","published")
    .order("published_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{thread.title}</h1>
      <p className="mt-2">{thread.question}</p>

      <div className="border rounded p-4 space-y-3">
        <h2 className="text-lg font-medium">Submit a Letter</h2>
        <SubmitLetter threadId={thread.id} />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Published Letters</h2>
        {letters?.length
          ? letters.map(l => <article key={l.id} className="border rounded p-4 whitespace-pre-wrap">{l.body}</article>)
          : <p>No letters yet.</p>}
      </section>
    </div>
  );
}
