"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session, status } = useSession();

  const cls =
    "rounded-xl border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition";

  if (status === "loading") {
    return <button className={`${cls} opacity-60`} disabled>…</button>;
    }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-muted-foreground sm:inline">
          {session.user?.email}
        </span>
        <button onClick={() => signOut({ callbackUrl: "/" })} className={cls}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google", { callbackUrl: "/" })} className={cls}>
      Sign in with Google
    </button>
  );
}
