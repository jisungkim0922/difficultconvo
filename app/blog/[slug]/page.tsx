import { getPostBySlug } from "../../../lib/posts";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="mb-6 text-sm text-neutral-500">Post not found.</p>
        <Link href="/blog" className="underline">Back to blog</Link>
      </main>
    );
  }
  const d = new Date(post.dateISO);
  const date = d.toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/blog" className="text-sm underline">← Back to blog</Link>
      <h1 className="mt-3 text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm text-neutral-600">{post.author.name} • {date} • {post.readMinutes} min read</p>
      {post.coverUrl && (
        <div className="relative my-6 h-[300px] w-full overflow-hidden rounded-lg md:h-[420px]">
          <Image src={post.coverUrl} alt={post.title} fill className="object-cover" />
        </div>
      )}
      {post.excerpt && <p className="mb-4 text-lg text-neutral-800">{post.excerpt}</p>}
      <article className="prose max-w-none prose-neutral">
        <pre className="whitespace-pre-wrap">{post.body}</pre>
      </article>
    </main>
  );
}
