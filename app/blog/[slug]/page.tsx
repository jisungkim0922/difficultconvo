import "../article.css";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function readTime(text: string) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data } = await supabase
    .from("posts")
    .select("title, content, cover_url, author, publish_date, created_at")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!data) {
    return <div className="blog-article mx-auto max-w-3xl px-6 py-16">Post not found.</div>;
  }

  const dateISO = data.publish_date ?? data.created_at;
  const dateText = dateISO ? new Date(dateISO as string).toLocaleDateString() : "";
  const rt = readTime(data.content || "");

  return (
    <article className="blog-article mx-auto max-w-3xl px-6 py-12">
      <header>
        <h1>{data.title}</h1>
        <div className="byline">{data.author ? `${data.author} · ` : ""}{dateText}{rt ? ` · ${rt}` : ""}</div>
        {data.cover_url ? <img src={data.cover_url as string} alt="" className="cover" /> : null}
      </header>
      <div className="prose" style={{ whiteSpace: "pre-wrap" }}>{data.content}</div>
    </article>
  );
}
