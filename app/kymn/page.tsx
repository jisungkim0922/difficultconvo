import KymnPresents from "@/components/sections/KymnPresents";

export const metadata = {
  title: "KYMN Presents — Difficult Conversations",
  description: "Curated projects and formats from KYMN.",
};

export default function KymnPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">KYMN Presents</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          A living showcase of formats that make disagreement a learnable skill.
        </p>
      </header>
      <KymnPresents compact />
    </div>
  );
}
