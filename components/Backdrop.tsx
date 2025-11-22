export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-center */}
      <Fleur className="absolute left-1/2 top-[6vh] h-[120px] w-[120px] -translate-x-1/2 text-neutral-300/60" />
      {/* Mid-right */}
      <Fleur className="absolute right-[6vw] top-[24vh] h-[170px] w-[170px] text-neutral-300/60" />
      {/* Bottom-left */}
      <Fleur className="absolute left-[-2vw] bottom-[8vh] h-[190px] w-[190px] text-neutral-300/40" />
    </div>
  );
}

function Fleur({ className = "" }: { className?: string }) {
  // 4-lobed pinwheel; uses currentColor so parent class controls color/opacity
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M50 10c0 17-13 30-30 30 17 0 30 13 30 30 0-17 13-30 30-30-17 0-30-13-30-30z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
