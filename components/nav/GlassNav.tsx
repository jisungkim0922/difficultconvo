import Link from "next/link"
import { cn } from "@/lib/utils"

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center px-1 py-0.5 text-sm text-zinc-700 dark:text-zinc-300",
        "transition-colors hover:text-black dark:hover:text-white",
        "after:absolute after:left-1/2 after:top-full after:h-[1px] after:w-0 after:-translate-x-1/2",
        "after:bg-current after:opacity-40 after:transition-all after:duration-300 hover:after:w-2/3"
      )}
    >
      {children}
    </Link>
  )
}

export default function GlassNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Difficult Conversations
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavLink href="/peb">PEB</NavLink>
          <NavLink href="/profiles">Profiles</NavLink>
          <Link
            href="/signup"
            className={cn(
              "rounded-lg border border-black/15 px-3 py-1.5 text-sm transition-colors",
              "hover:bg-black hover:text-white dark:border-white/15"
            )}
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  )
}
