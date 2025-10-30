import Link from "next/link";

export default function GlassCard({
  title,
  blurb,
  href,
  badge,
}: {
  title: string;
  blurb: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-black/5 bg-white/55 p-5 shadow-[0_1px_0_rgba(0,0,0,.06),0_12px_24px_-12px_rgba(0,0,0,.25)] backdrop-blur-xl transition
                 hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(0,0,0,.06),0_18px_36px_-16px_rgba(0,0,0,.35)]
                 dark:border-white/10 dark:bg-black/35"
    >
      {badge && (
        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
          {badge}
        </span>
      )}
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{blurb}</p>
      <span className="mt-3 inline-block text-sm text-zinc-800 opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-zinc-200">
        Open →
      </span>
    </Link>
  );
}
