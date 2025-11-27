import { supabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from("posts")
    .select("title, content, cover_url, publish_date")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error) return <div className="mx-auto max-w-3xl px-6 py-12">{error.message}</div>;
  if (!data) return <div className="mx-auto max-w-3xl px-6 py-12">Post not found.</div>;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 prose prose-lg">
      <h1 className="!mb-2">{data.title}</h1>
      <p className="text-sm text-gray-500 !mt-0">{data.publish_date ? new Date(data.publish_date).toLocaleString() : ""}</p>
      {data.cover_url ? <img src={data.cover_url} alt="" className="w-full h-auto rounded-xl my-6" /> : null}
      <div style={{ whiteSpace: "pre-wrap" }}>{data.content}</div>
    </article>
  );
}
