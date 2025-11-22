"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  useEffect(() => { if (status === "authenticated") fetch("/api/session/mark", { method: "POST" }).catch(() => {}); }, [status]);

  return (
    <header className="relative z-10 w-screen">
      <div className="flex w-full items-center justify-between py-6 px-0">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/dcm-logo.png"
            alt="Difficult Conversations Movement"
            width={520}
            height={208}
            priority
            className="h-20 w-auto md:h-24"
          />
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-neutral-700">
          <Link className="hidden md:inline hover:underline" href="#mission">Mission</Link>
          <a className="hidden md:inline hover:underline" href="/blog">Blog</a> 
          <Link className="hidden md:inline hover:underline" href="#initiatives">Initiatives</Link>
          <Link className="hidden md:inline hover:underline" href="#listen">Podcast</Link>
          {!session ? (
            <button onClick={() => signIn("google")} className="rounded-xl border px-3 py-1.5 text-sm">Sign in</button>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/me" className="text-sm hover:underline">My page</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-xl border px-3 py-1.5 text-sm">Sign out</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
