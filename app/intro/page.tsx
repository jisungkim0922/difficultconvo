export const metadata = {
  title: "Introduction — Difficult Conversations",
  description: "Slogan, mission, vision, and our north star.",
}

export default function IntroPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Introduction</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Why we exist and what we’re building—clearly and simply.
        </p>
      </header>

      <div className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
        <div className="space-y-6">
          <p className="text-lg">
            <span className="font-semibold">Slogan:</span>{" "}
            Changing the world, one difficult conversation at a time.
          </p>

          <div className="rounded-xl border border-black/10 bg-white/70 p-5 text-center dark:border-white/10 dark:bg-black/40">
            <p className="text-sm tracking-widest text-zinc-600 dark:text-zinc-400">
              WHICH “LANDMARK” HISTORICAL EVENT HAPPENED WITHOUT DIFFICULT CONVERSATIONS?
            </p>
            <p className="mt-3 text-xl font-semibold">Every peace, every justice.</p>
          </div>

          <div className="space-y-4">
            <p className="text-lg leading-8">
              <span className="font-semibold">Mission Statement:</span>{" "}
              To lead a culture of healthy disagreements; to help people build emotional maturity
              and resilience; to depolarize local communities; to help learn negotiation and
              de-escalation tactics; and to call world leaders to action on issues that have been
              put off because they were considered “too polarizing”.
            </p>

            <p className="text-lg leading-8">
              <span className="font-semibold">Vision Statement:</span>{" "}
              To create a world where difficult conversations don’t feel so difficult.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
