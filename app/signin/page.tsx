"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <section className="rounded-3xl border border-black/5 bg-white/55 p-8 shadow-[0_1px_0_rgba(0,0,0,.06),0_20px_60px_-30px_rgba(0,0,0,.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-2xl border bg-background/70" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with Google to continue.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4" aria-hidden><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.826 31.91 29.337 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C33.847 5.053 29.142 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.371 16.246 18.839 13 24 13c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C33.847 5.053 29.142 3 24 3c-7.91 0-14.7 4.564-17.694 11.691z"/><path fill="#4CAF50" d="M24 43c5.274 0 10.053-2.02 13.67-5.309l-6.303-5.329C29.3 33.846 26.86 35 24 35c-5.309 0-9.81-3.621-11.303-8.49l-6.543 5.036C9.102 38.191 15.999 43 24 43z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303A12.02 12.02 0 0 1 24 35c-6.627 0-12-5.373-12-12 0-1.99.489-3.864 1.354-5.509l-6.571-4.817C4.979 15.64 4 19.204 4 23c0 11.045 8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/></svg>
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          “Difficult Conversations” is a KYMN project.
        </p>
      </section>
    </main>
  );
}
