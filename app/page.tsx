// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl border bg-background p-8 md:p-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm uppercase tracking-wider text-muted-foreground">KYMN presents</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Difficult Conversations
          </h1>
          <p className="text-lg text-muted-foreground">
            Changing the world, one difficult conversation at a time. We build tools, spaces, and habits
            so people can disagree respectfully—and learn something real.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/peb">Explore Perspective Exchange Blog</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/signup">Join / Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-sm transition">
          <CardContent className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">Perspective Exchange Blog</h3>
            <p className="text-sm text-muted-foreground">
              Read a prompt, see credible viewpoints, then add your own letter—steel-manned and respectful.
            </p>
            <Button asChild variant="ghost" className="px-0">
              <Link href="/peb">Browse threads →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition">
          <CardContent className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">Food for Talk</h3>
            <p className="text-sm text-muted-foreground">
              Interviews, skill cards, and classroom kits for running judgment-free difficult conversations.
            </p>
            <Button asChild variant="ghost" className="px-0">
              <Link href="/resources">Open the library →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition">
          <CardContent className="p-6 space-y-2">
            <h3 className="text-lg font-semibold">Authoring to Authority</h3>
            <p className="text-sm text-muted-foreground">
              Practice writing to people in power—parents, coaches, officials—with evidence and empathy.
            </p>
            <Button asChild variant="ghost" className="px-0">
              <Link href="/peb">Start a letter →</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border p-8 text-center md:p-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Ready to build emotionally mature conversations?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Join KYMN and help pilot formats across schools and communities.
        </p>
        <div className="mt-5 flex justify-center">
          <Button asChild size="lg">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
