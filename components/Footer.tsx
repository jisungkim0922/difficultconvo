import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-4">
        {/* About / Location */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight">Difficult Conversations</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A KYMN initiative to practice healthy disagreement.
          </p>
          <div className="pt-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div><span className="font-medium">Location:</span> Seoul, South Korea</div>
            <div><span className="font-medium">Region:</span> Global / Remote</div>
          </div>
        </div>

        {/* Projects (equal weight) */}
        <div>
          <h4 className="text-sm font-semibold tracking-tight">Projects</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link className="hover:underline" href="/peb">Perspective Exchange Blog</Link></li>
            <li><Link className="hover:underline" href="/food-for-talk">Food for Talk</Link></li>
            <li><Link className="hover:underline" href="/authoring">Authoring to Authority</Link></li>
            <li><Link className="hover:underline" href="/profiles">Profiles</Link></li>
          </ul>
        </div>

        {/* KYMN Presents (footer placement) */}
        <div>
          <h4 className="text-sm font-semibold tracking-tight">KYMN Presents</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link className="hover:underline" href="/kymn">Overview</Link></li>
            <li><Link className="hover:underline" href="/kymn/steelman">The Steelman Project</Link></li>
            <li><Link className="hover:underline" href="/kymn/letters">Letters to Authority</Link></li>
            <li><Link className="hover:underline" href="/kymn/food-for-talk">Food for Talk Kits</Link></li>
          </ul>
        </div>

        {/* Legal / Org */}
        <div>
          <h4 className="text-sm font-semibold tracking-tight">Organization</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link className="hover:underline" href="/legal/copyright">Copyright & Org Info</Link></li>
            <li><Link className="hover:underline" href="/intro">Introduction</Link></li>
            <li><Link className="hover:underline" href="/kymn">KYMN</Link></li>
            <li><a className="hover:underline" href="mailto:hello@difficultconvo.org">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 px-5 py-4 text-center text-xs text-zinc-600 dark:border-white/10 dark:text-zinc-400">
        © <span className="font-medium">KYMN</span> — Difficult Conversations. All rights reserved.
      </div>
    </footer>
  );
}
