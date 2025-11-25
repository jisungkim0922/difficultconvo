export const dynamic = "force-dynamic";
async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/blog/posts`, { cache: "no-store" }).catch(()=>null);
  if (!res || !res.ok) return [];
  return res.json();
}
export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <a className="px-4 py-2 rounded-lg border inline-block mb-6" href="/blog/new">New Post</a>
      {(!posts || posts.length===0) ? <p>No posts yet.</p> : (
        <ul className="space-y-4">
          {posts.map((p:any)=> (
            <li key={p.slug} className="p-4 rounded-lg border">
              <a href={`/blog/${p.slug}`} className="font-semibold">{p.title}</a>
              {p.imageUrl ? <div className="mt-2"><img src={p.imageUrl} alt="" className="max-h-48 rounded"/></div> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
