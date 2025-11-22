"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="relative z-[3] w-screen">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/dcm-logo.png"
            alt="Difficult Conversations"
            width={220} height={70}
            className="h-[64px] w-auto"  /* bigger logo */
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex text-sm">
          <Link className="hover:underline" href="#mission">Mission</Link>
          <Link className="hover:underline" href="/blog">Blog</Link>
          <Link className="hover:underline" href="#initiatives">Initiatives</Link>
          <Link className="hover:underline" href="#podcast">Podcast</Link>
          {session?.user ? (
            <button onClick={() => signOut()} className="rounded border px-3 py-1">
              Sign out
            </button>
          ) : (
            <button onClick={() => signIn("google")} className="rounded border px-3 py-1">
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
