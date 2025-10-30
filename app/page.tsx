import GlassCard from "@/components/ui/GlassCard";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* HERO: slogan only, soft glass */}
      <section className="rounded-3xl border border-black/5 bg-white/50 p-10 shadow-[0_1px_0_rgba(0,0,0,.06),0_20px_60px_-30px_rgba(0,0,0,.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Changing the world, one difficult conversation at a time.
        </h1>
      </section>

      {/* PROJECTS — equal weighting */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <GlassCard
            title="Perspective Exchange Blog"
            blurb="Prompts that require weighing 2–3 credible views before writing."
            href="/peb"
          />
          <GlassCard
            title="Food for Talk"
            blurb="Teacher-friendly kits: interviews, skill cards, and facilitation guides."
            href="/food-for-talk"
          />
          <GlassCard
            title="Authoring to Authority"
            blurb="Respectful letters to leaders and coaches with an action request."
            href="/authoring"
          />
          <GlassCard
            title="Forum"
            blurb="Rules-first dialogue with trained facilitators."
            href="/forum"
          />
          <GlassCard
            title="Kits"
            blurb="One-page charters and run-sheets teachers can print and use."
            href="/kits"
          />
          <GlassCard
            title="Media"
            blurb="Neutral tone & framing templates for sensitive topics."
            href="/media"
          />
        </div>
      </section>

      {/* PEOPLE / PROFILES */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight">People</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <GlassCard
            title="Profiles"
            blurb="Meet the students, teachers, and mentors practicing healthy disagreement."
            href="/profiles"
          />
          <GlassCard
            title="Get Involved"
            blurb="Join a sector, contribute prompts, or pilot a classroom kit."
            href="/signup"
          />
          <GlassCard
            title="Introduction"
            blurb="Slogan, mission, and vision—our north star."
            href="/intro"
          />
        </div>
      </section>

      {/* FOOTER INFO */}
      <section className="rounded-2xl border p-5 text-xs text-muted-foreground">
        “Difficult Conversations” is a KYMN project. © {new Date().getFullYear()} KYMN.
        <br />
        Youth-led nonprofit initiative fostering respectful disagreement and learning.
        <br />
        Contact:{" "}
        <a href="mailto:info@difficultconvo.org" className="underline">
          info@difficultconvo.org
        </a>
      </section>
    </div>
  );
}
