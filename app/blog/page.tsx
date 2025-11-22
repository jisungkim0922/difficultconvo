import { getPosts } from "../../lib/posts";
import BlogCard from "../../components/BlogCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogIndex() {
  const posts = await getPosts();
  return (
    <main className="mx-auto max-w-[1400px] px-4 pb-24 pt-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Perspective Exchange • Blog</h1>
        <Link
          href="/blog/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
        >
          New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {posts.map((p) => <BlogCard key={p.id} post={p} />)}
      </div>
    </main>
  );
}
