import Link from "next/link";
import { listPosts } from "../../lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await listPosts();
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <a href="/blog/new" className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90">Write</a>
      </div>
      <div className="grid gap-4">
        {posts.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-xl border p-4 hover:bg-black/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <span className="text-xs text-neutral-500">{new Date(p.created_at).toLocaleDateString()}</span>
            </div>
            {p.excerpt && <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{p.excerpt}</p>}
            <p className="mt-1 text-xs text-neutral-500">{p.author_name || p.author_email}</p>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-sm text-neutral-600">No posts yet.</p>}
      </div>
    </main>
  );
}
