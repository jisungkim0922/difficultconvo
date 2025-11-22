"use client";
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* top center */}
      <Fleur className="absolute left-1/2 top-[6vh] h-[120px] w-[120px] -translate-x-1/2 text-neutral-300/60" />
      {/* mid right */}
      <Fleur className="absolute right-[6vw] top-[22vh] h-[160px] w-[160px] text-neutral-300/60" />
      {/* bottom left */}
      <Fleur className="absolute -left-[2vw] bottom-[8vh] h-[180px] w-[180px] text-neutral-300/40" />
    </div>
  );
}

function Fleur({ className = "" }: { className?: string }) {
  // simple 4-lobed pinwheel; stroke follows currentColor so we can tint via className
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M50 10c0 17-13 30-30 30 17 0 30 13 30 30 0-17 13-30 30-30-17 0-30-13-30-30z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
