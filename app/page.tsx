// app/page.tsx
import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

/** Reusable, premium-feel button */
function ButtonLink({
  href,
  children,
  variant = "outline",
}: {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid" | "muted";
}) {
  const base =
    "group relative block w-full rounded-xl px-5 py-3 text-center transition-all duration-300";

  const outline =
    // subtle glass card + animated gradient border on hover
    "border border-black/15 bg-white/90 backdrop-blur-sm " +
    "shadow-sm hover:shadow-md " +
    "before:absolute before:inset-0 before:-z-10 before:rounded-xl " +
    "before:opacity-0 before:transition-opacity before:duration-300 " +
    "hover:before:opacity-100 " +
    "before:bg-[linear-gradient(120deg,rgba(0,0,0,.12),rgba(0,0,0,.02))] " +
    "hover:-translate-y-0.5 " +
    "text-black";

  const solid =
    "bg-black text-white shadow-sm hover:shadow-md hover:-translate-y-0.5";

  const muted =
    "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 shadow-sm hover:shadow-md";

  const variantClasses =
    variant === "solid" ? solid : variant === "muted" ? muted : outline;

  return (
    <Link href={href} className={clsx(base, variantClasses)}>
      {/* shimmer underline on hover */}
      <span className="relative">
        {children}
        <span className="absolute left-1/2 top-full block h-px w-0 -translate-x-1/2 bg-black/30 transition-all duration-300 group-hover:w-2/3" />
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950">
      <main className="w-full max-w-3xl px-6 py-20">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-black dark:text-white">
            Difficult Conversations
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Changing the world, one difficult conversation at a time.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 grid gap-4">
          <ButtonLink href="/peb" variant="outline">
            Perspective Exchange Blog
          </ButtonLink>

          <ButtonLink href="/food-for-talk" variant="outline">
            Food for Talk
          </ButtonLink>

          <ButtonLink href="/profiles" variant="outline">
            Profiles
          </ButtonLink>

          <ButtonLink href="/signup" variant="muted">
            Sign Up / Log In
          </ButtonLink>

          <Link
            href="/admin"
            className="mx-auto w-max text-sm text-zinc-600 hover:text-black underline underline-offset-4 transition"
          >
            <span className="inline-flex items-center gap-1">
              Admin Dashboard
              <svg
                className="size-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
