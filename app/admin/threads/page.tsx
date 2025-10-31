import { requireRole } from "@/lib/admin-gate";
export default async function AdminThreads() {
  const gate = await requireRole("admin");
  if (!gate.ok) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <section className="rounded-2xl border p-6">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Admin tools are temporarily disabled.</p>
        </section>
      </main>
    );
  }
  return null;
}
