export const metadata = {
  title: "Copyright & Organization — Difficult Conversations",
  description: "Copyright, licensing, org details, and brand requirements for an NPO.",
};

export default function CopyrightPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight">Copyright & Organization</h1>

      <section className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
        <h2 className="text-xl font-semibold">Copyright</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          © {new Date().getFullYear()} KYMN — Difficult Conversations. All rights reserved.
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Unless otherwise noted, content on this site is owned by KYMN. Student submissions remain
          the intellectual property of their authors; by submitting you grant KYMN a non-exclusive,
          worldwide license to display and archive your work.
        </p>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
        <h2 className="text-xl font-semibold">Organization Info (NPO)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-zinc-700 dark:text-zinc-300">
          <li><span className="font-medium">Legal Name:</span> KYMN (Non-Profit Initiative)</li>
          <li><span className="font-medium">Doing Business As:</span> Difficult Conversations</li>
          <li><span className="font-medium">Location:</span> Seoul, South Korea (global / remote)</li>
          <li><span className="font-medium">Contact:</span> hello@difficultconvo.org</li>
          <li><span className="font-medium">Governance:</span> Board-supervised; student advisory circle</li>
          <li><span className="font-medium">Data Protection:</span> Minimal collection; student work stored with consent</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
        <h2 className="text-xl font-semibold">Brand Requirements (NPO basics)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Always pair the name with the slogan when space allows.</li>
          <li>Prefer accessible color contrast (WCAG AA), large touch targets, and plain language.</li>
          <li>Use student work with explicit permission and reversible consent.</li>
          <li>Credit interviewees, photographers, and partner schools.</li>
          <li>Prohibit partisan endorsements; keep formats neutral and process-driven.</li>
          <li>Provide dispute and takedown channels for sensitive materials.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
        <h2 className="text-xl font-semibold">KYMN Presents</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          KYMN Presents is a rotating showcase of formats that make disagreement a learnable skill:
          The Steelman Project, Letters to Authority, Food for Talk Kits, and more.
        </p>
      </section>
    </div>
  );
}
