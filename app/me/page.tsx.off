"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function MePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="mx-auto max-w-xl p-6">Loading…</main>;
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Sign in</h1>
        <p className="mb-4 text-sm text-neutral-600">You need to sign in to view your page.</p>
        <button onClick={() => signIn("google")} className="rounded bg-black px-4 py-2 text-white">
          Continue with Google
        </button>
      </main>
    );
  }

  const u = session.user!;
  return (
    <main className="mx-auto max-w-xl p-6 space-y-6">
      <header className="flex items-center gap-4">
        {u.image && <Image src={u.image} alt={u.name ?? "User"} width={56} height={56} className="h-14 w-14 rounded-full" />}
        <div>
          <h1 className="text-2xl font-bold">{u.name ?? "Me"}</h1>
          {u.email && <p className="text-sm text-neutral-600">{u.email}</p>}
        </div>
      </header>

      <section className="rounded-lg border p-4">
        <h2 className="mb-2 font-semibold">My Settings</h2>
        <p className="text-sm text-neutral-600">This page uses NextAuth cookies, so you stay signed in until you sign out.</p>
      </section>

      <button onClick={() => signOut()} className="rounded border px-4 py-2">
        Sign out
      </button>
    </main>
  );
}
