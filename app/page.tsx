import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Globe2, Lightbulb, Music2, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-white text-[#1A1A1A]">
      <FleurPattern />

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="sr-only">Difficult Conversations Movement</span>
            <span className="text-xl font-black tracking-tight">difficult<br/>conversations</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
            <Link className="hover:underline" href="#mission">Mission</Link>
            <Link className="hover:underline" href="#initiatives">Initiatives</Link>
            <Link className="hover:underline" href="#listen">Podcast</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-8 pt-6 md:grid-cols-2 lg:px-8 lg:pb-14 lg:pt-12">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-sm font-medium tracking-wide text-neutral-600">KYND Presents:</p>
            <h1 className="display text-balance text-4xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl lg:text-6xl">
              Difficult Conversations<br/>Movement
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4" id="listen">
              <Link href="https://open.spotify.com/" className="inline-flex items-center gap-2 rounded-lg bg-[#F2CC50] px-5 py-3 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:translate-y-[1px] hover:shadow">
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#mission" className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50">
                Our Mission
              </Link>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <Image
              src="https://bc-user-uploads.brandcrowd.com/public/media-Production/3a036466-f3c6-49f6-9137-3ef46ba531c1/d948096c-7d9e-49b5-97d7-111d37c43040_2x"
              alt="Studio microphone"
              width={740}
              height={740}
              priority
              className="h-auto w-full max-w-[520px] object-contain drop-shadow-sm md:max-w-[620px]"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <hr className="border-neutral-200" />
      </div>

      {/* Mission */}
      <section id="mission" className="relative z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-2 lg:px-8 lg:py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#5D2A55] sm:text-3xl">
              Changing the world, one difficult conversation at a time.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-800">
            <p className="font-medium text-neutral-900">
              Which “landmark” historical event happened without difficult conversations?
            </p>
            <p className="text-[17px] font-semibold">Every peace, every justice did.</p>
            <div className="space-y-3">
              <p className="font-semibold">Mission Statement:</p>
              <p>
                To lead a culture of healthy disagreements; to help people build emotional maturity and resilience; to
                depolarize local communities; to help learn negotiation and de-escalation tactics; and to call world
                leaders to action on issues that have been put off because they were considered “too polarizing.”
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Vision Statement:</p>
              <p>To create a world where difficult conversations don’t feel so difficult.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark initiative band */}
      <section id="initiatives" className="relative z-10 mt-6 bg-[#121212] py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <IconTile icon={<Globe2 className="h-8 w-8" />} label="Global Perspectives" href="#" />
            <IconTile icon={<Lightbulb className="h-8 w-8" />} label="Food for Talk" href="#" />
            <IconTile icon={<Mail className="h-8 w-8" />} label="Authoring to Authority" href="#" />
            <IconTile icon={<Instagram className="h-8 w-8" />} label="Perspective Exchange Blog" href="#" />
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/70">
            <p>© 2024 by Difficult Conversations Movement.</p>
            <div className="flex items-center gap-4">
              <Link aria-label="Instagram" href="https://instagram.com" className="transition hover:opacity-80">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link aria-label="Spotify" href="https://open.spotify.com" className="transition hover:opacity-80">
                <Music2 className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function IconTile({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center shadow-sm transition hover:bg-white/10"
    >
      <div className="mb-3 opacity-90 transition group-hover:opacity-100">{icon}</div>
      <div className="text-sm font-medium opacity-90">{label}</div>
    </Link>
  );
}

function FleurPattern() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <Fleur className="absolute -left-8 -top-6 hidden h-40 w-40 text-neutral-200/60 sm:block" />
      <Fleur className="absolute -right-10 top-24 hidden h-44 w-44 text-neutral-200/60 sm:block" />
      <Fleur className="absolute -left-6 bottom-40 hidden h-44 w-44 text-neutral-200/50 lg:block" />
      <Fleur className="absolute -right-8 bottom-24 hidden h-52 w-52 text-neutral-200/50 md:block" />
    </div>
  );
}

function Fleur({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="fleurStroke" x1="0" x2="1">
          <stop offset="0%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <path
        d="M50 10c0 17-13 30-30 30 17 0 30 13 30 30 0-17 13-30 30-30-17 0-30-13-30-30z"
        fill="none"
        stroke="url(#fleurStroke)"
        strokeWidth="2"
      />
    </svg>
  );
}
