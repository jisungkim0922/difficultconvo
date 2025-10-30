import Link from "next/link";

type Card = { title: string; blurb: string; href: string };

const items: Card[] = [
  { title: "The Steelman Project", blurb: "Real students, real disagreements—modeled with care.", href: "/kymn/steelman" },
  { title: "Letters to Authority", blurb: "Respectful, actionable letters to leaders and coaches.", href: "/kymn/letters" },
  { title: "Food for Talk", blurb: "Teacher-ready kits: interviews, skill cards, and prompts.", href: "/kymn/food-for-talk" },
];

export default function KymnPresents({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">KYMN Presents</h2>
        {!compact && (
          <Link href="/kymn" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
            View all →
          </Link>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.title}
            href={it.href}
            className="group rounded-2xl border border-black/10 bg-white/60 p-4 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-black/35"
          >
            <h3 className="font-semibold">{it.title}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{it.blurb}</p>
            <span className="mt-3 inline-block text-sm text-zinc-700 group-hover:translate-x-0.5 transition dark:text-zinc-300">
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
