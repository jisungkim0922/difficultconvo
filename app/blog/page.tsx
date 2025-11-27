import Link from "next/link";
import { supabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export default async function BlogList() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("title, slug, excerpt, cover_url, publish_date")
    .eq("published", true)
    .order("publish_date", { ascending: false });

  if (error) return <div className="px-6 py-12">{error.message}</div>;
  if (!posts?.length) return <div className="px-6 py-12">No posts yet.</div>;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(p => (
        <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-xl overflow-hidden border hover:shadow-md transition">
          {p.cover_url ? (
            <img src={p.cover_url} alt="" className="h-48 w-full object-cover" />
          ) : <div className="h-48 w-full bg-gray-100" />}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">
              {p.publish_date ? new Date(p.publish_date).toLocaleDateString() : ""}
            </p>
            {p.excerpt ? <p className="mt-2 line-clamp-3">{p.excerpt}</p> : null}
          </div>
        </Link>
      ))}
    </main>
  );
}
