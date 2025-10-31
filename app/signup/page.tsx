export default function Signup() {
  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <section className="rounded-3xl border border-black/5 bg-white/55 p-8 shadow-[0_1px_0_rgba(0,0,0,.06),0_20px_60px_-30px_rgba(0,0,0,.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">
        <h1 className="text-2xl font-semibold tracking-tight">Get involved</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up by using <a className="underline" href="/signin">Sign in with Google</a>.
        </p>
      </section>
    </main>
  );
}
