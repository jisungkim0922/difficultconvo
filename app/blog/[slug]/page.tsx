import Link from "next/link";
import { getPostBySlug } from "../../../lib/posts";
import { getUserRole, canEditOrDelete } from "../../../lib/roles";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PostView({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return <main className="mx-auto max-w-3xl px-4 py-10"><p>Not found.</p></main>;
  }
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || null;
  const role = await getUserRole(email);
  const mayEdit = canEditOrDelete(role, post.author_email, email);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex gap-2">
          <Link href="/blog" className="rounded border px-3 py-1 text-sm">Back</Link>
          {mayEdit && (
            <>
              <Link href={`/blog/${post.slug}/edit`} className="rounded border px-3 py-1 text-sm">Edit</Link>
              <form action={`/api/posts/${post.slug}`} method="post" onSubmit={(e)=>{if(!confirm('Delete this post?')) e.preventDefault();}}>
                <input type="hidden" name="_method" value="DELETE" />
                <button formAction={`/api/posts/${post.slug}`} className="rounded border px-3 py-1 text-sm"
                  onClick={async (ev)=>{
                    ev.preventDefault();
                    await fetch(`/api/posts/${post.slug}`, { method: "DELETE" }).then(()=>location.href="/blog");
                  }}>
                  Delete
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      {post.excerpt && <p className="text-neutral-600">{post.excerpt}</p>}
      {post.cover_url && <img src={post.cover_url} alt="" className="mt-2 w-full rounded-lg" />}
      {post.body && <article className="prose max-w-none" dangerouslySetInnerHTML={{__html: post.body}} />}
      <p className="pt-4 text-xs text-neutral-500">
        By {post.author_name || post.author_email} · {new Date(post.created_at).toLocaleString()}
      </p>
    </main>
  );
}
