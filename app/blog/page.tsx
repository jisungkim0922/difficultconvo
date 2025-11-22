import { headers } from "next/headers";
type Post = { id: string; title: string; content: string; author_id: string; created_at: string; status: string; };

async function getBaseUrl() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const envBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/,'');
  return envBase || (host ? `${proto}://${host}` : "http://localhost:3000");
}

async function getPosts(): Promise<Post[]> {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/blog/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load posts: ${res.status}`);
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts().catch(() => [] as Post[]);
  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-8">
          {posts.map((p) => (
            <article key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              <p className="mt-3 opacity-80 whitespace-pre-wrap">{p.content}</p>
              <div className="mt-4 text-sm opacity-60">
                {new Date(p.created_at).toLocaleString()} · {p.status}
              </div>
            </article>
          ))}
          {!posts.length && <p>No posts yet.</p>}
        </div>
      </div>
    </main>
  );
}
