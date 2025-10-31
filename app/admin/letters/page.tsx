import { requireRole } from "@/lib/auth";

export default async function AdminLetters() {
  const gate = await requireRole("admin");
  if (!("ok" in gate) || !gate.ok) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <section className="rounded-2xl border p-6">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Admin tools are temporarily disabled.
          </p>
        </section>
      </main>
    );
  }
  return null;
}
