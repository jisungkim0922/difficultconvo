import Link from "next/link";
import KymnPresents from "@/components/sections/KymnPresents";

function Card({
  title, blurb, href,
}: { title: string; blurb: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-black/35"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{blurb}</p>
      <span className="mt-3 inline-block text-sm text-zinc-700 transition dark:text-zinc-300">
        Open →
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="space-y-12">
      {/* HERO: slogan only */}
      <section className="rounded-3xl border border-black/10 bg-white/55 p-10 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/35">
        <h1 className="max-w-3xl text-4xl md:text-6xl font-semibold leading-tight">
          Changing the world, one difficult conversation at a time.
        </h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/intro" className="rounded-lg border border-black/15 px-4 py-2 hover:bg-black hover:text-white dark:border-white/15">
            What is this?
          </Link>
          <Link href="/peb" className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90">
            Explore the PEB
          </Link>
        </div>
      </section>

      {/* Section: KYMN Presents */}
      <KymnPresents />

      {/* Section: What you’ll find (fills lower half) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">What you’ll find here</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="Perspective Exchange Blog"
            blurb="Read a prompt, consider 2–3 credible views, and contribute a letter."
            href="/peb"
          />
          <Card
            title="Food for Talk"
            blurb="Teacher-friendly library of interviews, skill cards, and classroom kits."
            href="/food-for-talk"
          />
          <Card
            title="Profiles"
            blurb="Meet the people building healthy disagreement in their communities."
            href="/profiles"
          />
        </div>
      </section>
    </div>
  );
}
