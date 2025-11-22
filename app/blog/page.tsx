async function getPosts() {
  const res = await fetch("/api/blog/posts", { cache: "no-store" });
  if (!res.ok) return { posts: [] };
  return res.json();
}
export default async function BlogPage() {
  const { posts } = await getPosts();
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Blog</h1>
        <a href="/blog/new" className="rounded-lg border px-4 py-2 hover:bg-black/5">New post</a>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts?.map((p: any) => (
          <article key={p.id} className="rounded-xl border p-6">
            <h2 className="mb-2 text-2xl font-bold">{p.title}</h2>
            <p className="line-clamp-3 opacity-80 whitespace-pre-wrap">{p.content}</p>
            <div className="mt-4 text-sm opacity-60">
              {new Date(p.created_at).toLocaleString()} · {p.status}
            </div>
          </article>
        ))}
        {!posts?.length && <p>No posts yet.</p>}
      </div>
    </main>
  );
}
