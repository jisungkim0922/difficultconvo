import Link from "next/link";
import Header from "../components/Header";
import { Instagram, Mail, Globe2, Lightbulb, Music2, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen w-screen bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="relative w-screen min-h-[76vh] md:min-h-[86vh]">
        {/* Mic pinned right, scaled 1.2× */}
        <div className="pointer-events-none absolute inset-y-0 right-0 md:right-[-1vw] w-[72vw] sm:w-[65vw] md:w-[58vw] origin-right scale-[1.08]">
          <img
            src="https://bc-user-uploads.brandcrowd.com/public/media-Production/3a036466-f3c6-49f6-9137-3ef46ba531c1/d948096c-7d9e-49b5-97d7-111d37c43040_2x"
            alt="Studio microphone"
            className="h-full w-full object-contain object-right"
            decoding="async"
          />
        </div>

        {/* Left text column */}
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          <div className="order-2 md:order-1 flex items-center p-6 sm:p-10 lg:p-16 xl:p-20">
            <div>
              <p className="mb-3 text-sm font-medium tracking-wide text-neutral-600">KYND Presents:</p>
              <h1 className="display text-balance font-black tracking-[-0.02em]
                             text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
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
          </div>
          <div className="order-1 md:order-2 h-[40vh] md:h-auto" />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-screen"><hr className="border-neutral-200" /></div>

      {/* MISSION */}
      <section id="mission" className="w-screen">
        <div className="grid w-full grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2 lg:px-16 lg:py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#5D2A55] sm:text-3xl">
              Changing the world, one difficult conversation at a time.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-800">
            <p className="font-medium text-neutral-900">Which “landmark” historical event happened without difficult conversations?</p>
            <p className="text-[17px] font-semibold">Every peace, every justice did.</p>
            <div className="space-y-3">
              <p className="font-semibold">Mission Statement:</p>
              <p>To lead a culture of healthy disagreements; to help people build emotional maturity and resilience; to depolarize local communities; to help learn negotiation and de-escalation tactics; and to call world leaders to action on issues that have been put off because they were considered “too polarizing.”</p>
            </div>
            <div className="space-y-3">
              <p className="font-semibold">Vision Statement:</p>
              <p>To create a world where difficult conversations don’t feel so difficult.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DARK BAND */}
      <section id="initiatives" className="mt-6 w-screen bg-[#121212] py-12 text-white">
        <div className="w-full px-6 lg:px-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <IconTile icon={<Globe2 className="h-8 w-8" />} label="Global Perspectives" href="#" />
            <IconTile icon={<Lightbulb className="h-8 w-8" />} label="Food for Talk" href="#food-for-talk" />
            <IconTile icon={<Mail className="h-8 w-8" />} label="Authoring to Authority" href="#authoring" />
            <IconTile icon={<Instagram className="h-8 w-8" />} label="Perspective Exchange Blog" href="/blog" />
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/70">
            <p>© 2024 by Difficult Conversations Movement.</p>
            <div className="flex items-center gap-4">
              <Link aria-label="Instagram" href="https://instagram.com" className="transition hover:opacity-80"><Instagram className="h-5 w-5" /></Link>
              <Link aria-label="Spotify" href="https://open.spotify.com" className="transition hover:opacity-80"><Music2 className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function IconTile({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link href={href} className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center shadow-sm transition hover:bg-white/10">
      <div className="mb-3 opacity-90 transition group-hover:opacity-100">{icon}</div>
      <div className="text-sm font-medium opacity-90">{label}</div>
    </Link>
  );
}
