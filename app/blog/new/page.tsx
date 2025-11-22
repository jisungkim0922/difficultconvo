import { addPost } from "../../../lib/posts";
import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import RichEditor from "../../../components/RichEditor";

async function createPost(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const author = String(formData.get("author") || "").trim();
  const minutes = Number(formData.get("minutes") || 3);
  const excerpt = String(formData.get("excerpt") || "").trim();
  const bodyHtml = String(formData.get("body") || ""); // from RichEditor
  const file = formData.get("cover") as File | null;

  if (!title || !author) return;

  let coverUrl: string | undefined;
  if (file && file.size > 0) {
    const slugForFile = title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    const ext = (file.name?.split(".").pop() || "jpg").toLowerCase();
    const fname = `${slugForFile}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fname), bytes);
    coverUrl = `/uploads/${fname}`;
  }

  await addPost({
    title,
    author: { name: author },
    readMinutes: minutes || 3,
    excerpt,
    body: bodyHtml,
    coverUrl,
  });

  redirect("/blog");
}

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Publish a New Post</h1>

      <form action={createPost} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Title</span>
            <input name="title" required className="w-full rounded-lg border px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Author</span>
            <input name="author" required className="w-full rounded-lg border px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Read time (minutes)</span>
            <input name="minutes" type="number" min={1} defaultValue={3} className="w-full rounded-lg border px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Cover image</span>
            <input name="cover" type="file" accept="image/*" className="w-full rounded-lg border px-3 py-2" />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Excerpt</span>
          <textarea name="excerpt" rows={2} className="w-full rounded-lg border px-3 py-2" />
        </label>

        <div className="block">
          <span className="mb-1 block text-sm font-medium">Body</span>
          <RichEditor name="body" placeholder="Write your post… You can paste or drop images, too." />
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90">
            Publish
          </button>
          <a href="/blog" className="text-sm underline">Cancel</a>
        </div>
      </form>
    </main>
  );
}
