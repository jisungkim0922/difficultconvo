import { promises as fs } from "fs";
import path from "path";

export type Post = {
  id: string;
  slug: string;
  title: string;
  author: { name: string; avatarUrl?: string };
  dateISO: string;
  readMinutes: number;
  coverUrl?: string;
  excerpt?: string;
  body?: string;
  stats: { views: number; likes: number };
};

const DATA = path.join(process.cwd(), "data");
const FILE = path.join(DATA, "posts.json");

async function ensureStore() {
  try { await fs.mkdir(DATA, { recursive: true }); } catch {}
  try { await fs.access(FILE); }
  catch { await fs.writeFile(FILE, "[]", "utf8"); }
}

export async function getPosts(): Promise<Post[]> {
  await ensureStore();
  const raw = await fs.readFile(FILE, "utf8");
  const arr = JSON.parse(raw || "[]") as Post[];
  return arr.sort((a,b)=> (a.dateISO < b.dateISO ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const arr = await getPosts();
  return arr.find(p => p.slug === slug);
}

export async function addPost(p: Omit<Post,"id"|"stats"|"slug"|"dateISO"> & { slug?: string; dateISO?: string }): Promise<Post> {
  await ensureStore();
  const now = new Date().toISOString();
  const slug = (p.slug ?? p.title)
    .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  const post: Post = {
    id,
    slug,
    title: p.title,
    author: p.author,
    dateISO: p.dateISO ?? now,
    readMinutes: Math.max(1, Math.round(p.readMinutes || 3)),
    coverUrl: p.coverUrl,
    excerpt: p.excerpt,
    body: p.body,
    stats: { views: 0, likes: 0 }
  };
  const arr = await getPosts();
  arr.push(post);
  await fs.writeFile(FILE, JSON.stringify(arr, null, 2), "utf8");
  return post;
}
