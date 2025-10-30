export const metadata = {
  title: "Introduction — Difficult Conversations",
  description:
    "Slogan, mission, and vision of Difficult Conversations — building a culture of healthy disagreement.",
};

export default function IntroductionPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-16">
      <section className="rounded-3xl border border-black/5 bg-white/50 p-10 shadow-[0_1px_0_rgba(0,0,0,.06),0_20px_60px_-30px_rgba(0,0,0,.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Introduction
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground">
          <strong>Slogan:</strong> Changing the world, one difficult conversation at a time.
        </p>
        <div className="mt-10 text-center">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Which “landmark” historical event happened without difficult conversations?
          </p>
          <p className="mt-3 text-lg font-semibold tracking-wide">
            Every peace, every justice.
          </p>
        </div>
        <p className="mt-10 text-sm md:text-base leading-relaxed text-foreground">
          <strong>Mission Statement:</strong> To lead a culture of healthy disagreements; to help
          people build emotional maturity and resilience; to depolarize local communities; to help
          learn negotiation and de-escalation tactics; and to call world leaders to action on issues
          that have been put off because they were considered “too polarizing.”
        </p>
        <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground">
          <strong>Vision Statement:</strong> To create a world where difficult conversations don’t
          feel so difficult.
        </p>
      </section>
      <section className="rounded-2xl border p-5 text-xs text-muted-foreground">
        “Difficult Conversations” is a KYMN project. © {new Date().getFullYear()} KYMN.
      </section>
    </main>
  );
}
