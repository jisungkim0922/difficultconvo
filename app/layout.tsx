import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Difficult Conversations",
  description: "Practice kind, brave dialogue.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b">
          <div className="mx-auto max-w-5xl p-4 flex gap-6">
            <Link href="/">Difficult Conversations</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/peb">PEB</Link>
              <Link href="/resources">Food for Talk</Link>
              <Link href="/profiles">Profiles</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
