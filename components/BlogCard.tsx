import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, MoreHorizontal } from "lucide-react";
import type { Post } from "../lib/posts";

export default function BlogCard({ post }: { post: Post }) {
  const d = new Date(post.dateISO);
  const date = d.toLocaleString(undefined, { month: "short", day: "numeric" });
  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      {post.coverUrl ? (
        <div className="relative h-48 w-full">
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : <div className="h-48 w-full bg-neutral-100" />}
      <div className="bg-[#121212] p-4 text-white">
        <div className="mb-2 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10" />
            <span className="opacity-90">{post.author.name}</span>
            <span className="opacity-60">• {date}</span>
            <span className="opacity-60">• {post.readMinutes} min read</span>
          </div>
          <MoreHorizontal className="h-4 w-4 opacity-70" />
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-lg font-semibold tracking-tight"
              style={{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-1 text-sm text-white/80"
               style={{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
              {post.excerpt}
            </p>
          )}
        </Link>

        <div className="mt-3 flex items-center gap-4 text-xs text-white/70">
          <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" /> {post.stats.views}</span>
          <span className="inline-flex items-center gap-1"><Heart className="h-4 w-4" /> {post.stats.likes}</span>
        </div>
      </div>
    </article>
  );
}
