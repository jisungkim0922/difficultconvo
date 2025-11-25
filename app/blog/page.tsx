import Link from "next/link";

async function loadPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/blog/posts`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const posts = await loadPosts();
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Link className="px-4 py-2 rounded-lg border" href="/blog/new">New Post</Link>
      </div>
      {(!posts || posts.length===0) ? (
        <p className="mt-10 text-gray-500">No posts yet.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {posts.map((p: any) => (
            <li key={p.id}>
              <Link href={`/blog/${p.slug}`} className="text-2xl font-semibold underline">{p.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
