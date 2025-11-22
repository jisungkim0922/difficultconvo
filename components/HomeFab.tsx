"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function HomeFab() {
  const path = usePathname();
  if (!path || path === "/") return null; // hide on homepage
  return (
    <Link
      href="/"
      aria-label="Home"
      className="fixed bottom-6 right-6 z-[50] grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-lg transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/30"
    >
      <Home className="h-5 w-5" />
    </Link>
  );
}
