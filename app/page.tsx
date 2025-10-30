import Link from "next/link"

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <h1 className="text-center sm:text-left text-4xl sm:text-6xl font-semibold tracking-tight">
          <span
            className={[
              "bg-[linear-gradient(120deg,#111,_#111),linear-gradient(120deg,#06b6d4,#a855f7,#f43f5e)]",
              "[background-clip:text] [color:transparent]",
              "[background-size:100%_100%,200%_200%]",
              "[background-position:0_0,0%_50%]",
              "animate-shine" // uses global CSS we added
            ].join(" ")}
          >
            Difficult Conversations
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-center sm:text-left text-lg text-zinc-600 dark:text-zinc-400">
          Changing the world, one difficult conversation at a time.
          Practice steel-manning, share letters to authority, and explore teacher-ready tools.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/peb"
            className="inline-flex items-center justify-center rounded-xl border border-black/15 bg-white/80 px-5 py-3 text-sm shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/15 dark:bg-black/40"
          >
            Explore the PEB
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Quick tiles */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 pb-12 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white/55 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
          <div className="text-sm font-medium">Perspective Exchange Blog</div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Read the prompt, consider 2–3 credible views, and contribute a letter.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/55 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
          <div className="text-sm font-medium">Food for Talk</div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Teacher-friendly library of interviews, skill cards, and classroom kits.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/55 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
          <div className="text-sm font-medium">Authoring to Authority</div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Practice respectful letters to leaders, coaches, and public officials.
          </p>
        </div>
      </section>
    </div>
  )
}
