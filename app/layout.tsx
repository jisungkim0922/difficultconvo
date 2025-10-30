import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Plasma from "@/components/bg/Plasma"
import GlassNav from "@/components/nav/GlassNav"
import CommandPalette from "@/components/cmdk/CommandPalette"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Difficult Conversations",
  description: "Changing the world, one conversation at a time.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("bg-zinc-50 text-black dark:bg-black dark:text-zinc-50", inter.className)}>
        {/* Liquid plasma background */}
        <Plasma />

        {/* Glass navbar */}
        <GlassNav />

        {/* ⌘K command palette */}
        <CommandPalette />

        {/* Main glass wrapper */}
        <main className="relative mx-auto max-w-5xl px-5 py-10">
          <div className="rounded-2xl border border-black/10 bg-white/55 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
