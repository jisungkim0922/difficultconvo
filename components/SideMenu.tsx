"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // hide the FAB when open to match the screenshot behavior
  return (
    <>
      {/* Floating menu button (top-right) */}
      {!open && (
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="fixed right-6 top-6 z-[60] grid h-10 w-10 place-items-center rounded-full bg-[#F2CC50] text-[#1A1A1A] shadow-md transition hover:translate-y-[1px]"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[50] bg-black/60 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside
        aria-label="Site menu"
        className={`fixed left-0 top-0 z-[55] h-screen w-[260px] bg-[#6B0F2A] text-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold">Menu</span>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-1 space-y-1 px-2">
          <MenuItem href="/" label="Home" onClick={() => setOpen(false)} active />
          <MenuItem href="/#about" label="About" onClick={() => setOpen(false)} />
          <MenuItem href="/#contact" label="Contact" onClick={() => setOpen(false)} />
          <MenuItem href="/blog" label="Perspective Exchange" onClick={() => setOpen(false)} />
          <MenuItem href="/#food-for-talk" label="Food for Talk" onClick={() => setOpen(false)} />
          <MenuItem href="/#authoring" label="Authoring to Authority" onClick={() => setOpen(false)} />
          <MenuItem href="/#global" label="Global Perspectives" onClick={() => setOpen(false)} />
        <a href="/blog" className="block rounded-lg px-4 py-2 hover:bg-black\/5">Blog</a>
        </nav>
      </aside>
    </>
  );
}

function MenuItem({ href, label, onClick, active=false }: { href:string; label:string; onClick?:()=>void; active?:boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded px-3 py-3 text-sm transition ${
        active ? "bg-amber-300/40 text-amber-200/90" : "hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );
}
