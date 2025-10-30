// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Blobs from "@/components/bg/Blobs"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Difficult Conversations",
  description: "Changing the world, one conversation at a time.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("bg-zinc-50 text-black dark:bg-black dark:text-zinc-50", inter.className)}>
        {/* Animated background */}
        <Blobs />

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-black/40">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              Difficult Conversations
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/peb" className="hover:opacity-70">PEB</Link>
              <Link href="/profiles" className="hover:opacity-70">Profiles</Link>
              <Link
                href="/signup"
                className="rounded-lg border border-black/15 px-3 py-1.5 transition-colors hover:bg-black hover:text-white dark:border-white/15"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content with glass wrapper */}
        <main className="relative mx-auto max-w-5xl px-5 py-10">
          <div className="rounded-2xl border border-black/10 bg-white/55 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
