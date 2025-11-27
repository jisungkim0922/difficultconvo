import { supabase } from "@/lib/supabase";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from("posts")
    .select("title, content, cover_url, created_at, display_date")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error) return <div className="mx-auto max-w-3xl px-6 py-12 text-red-600">{error.message}</div>;
  if (!data) return <div className="mx-auto max-w-3xl px-6 py-12">Post not found.</div>;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 prose">
      <h1 className="font-serif">{data.title}</h1>
      {data.cover_url ? <img src={data.cover_url} alt="" className="w-full h-auto rounded-xl" /> : null}
      <p className="text-sm text-gray-500">
        {new Date(data.display_date ?? data.created_at).toLocaleString()}
      </p>
      <div style={{ whiteSpace: "pre-wrap" }}>{data.content}</div>
    </article>
  );
}
