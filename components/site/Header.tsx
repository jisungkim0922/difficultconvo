"use client";
import Link from "next/link";
import SignInButton from "@/components/auth/SignInButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-black/5 dark:border-white/10 bg-background/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          <span className="font-medium tracking-tight">Difficult Conversations</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/projects" className="text-muted-foreground hover:underline">Projects</Link>
          <Link href="/intro" className="text-muted-foreground hover:underline">Intro</Link>
          <Link href="/signup" className="text-muted-foreground hover:underline">Get involved</Link>
          <SignInButton />
        </nav>
      </div>
    </header>
  );
}
