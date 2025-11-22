"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/session/mark", { method: "POST" }).catch(() => {});
    }
  }, [status]);

  return (
    <header className="mb-8 flex items-center justify-between">
      <Link href="/" className="text-sm font-semibold">
        Difficult Conversations
      </Link>
      <nav className="flex items-center gap-3">
        <Link
          href="#mission"
          className="hidden md:inline text-sm hover:underline"
        >
          Mission
        </Link>
        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="rounded-xl border px-3 py-1.5 text-sm"
          >
            Sign in
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/me" className="text-sm hover:underline">
              My page
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-xl border px-3 py-1.5 text-sm"
            >
              Sign out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
