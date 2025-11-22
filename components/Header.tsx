"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") fetch("/api/session/mark", { method: "POST" }).catch(() => {});
  }, [status]);

  return (
    <header className="relative z-10 w-screen">
      <div className="flex w-full items-center justify-between py-6 pl-2 pr-2 md:pl-4 md:pr-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/dcm-logo.png"
            alt="Difficult Conversations Movement"
            width={360}
            height={144}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-neutral-700">
          <Link className="hidden md:inline hover:underline" href="#mission">Mission</Link>
          <Link className="hidden md:inline hover:underline" href="#initiatives">Initiatives</Link>
          <Link className="hidden md:inline hover:underline" href="#listen">Podcast</Link>

          {!session ? (
            <button onClick={() => signIn("google")} className="rounded-xl border px-3 py-1.5 text-sm">
              Sign in
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/me" className="text-sm hover:underline">My page</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-xl border px-3 py-1.5 text-sm">
                Sign out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
