import type { Metadata } from "next";
import AuthProvider from "../components/AuthProvider";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Difficult Conversations",
  description: "Changing the world, one difficult conversation at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <AuthProvider>
          <main className="relative mx-auto max-w-7xl px-5 py-10">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <Header />
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
