export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* top-center */}
      <Fleur className="absolute left-1/2 top-[5vh] -translate-x-1/2 text-neutral-300/65 h-[200px] w-[200px] md:h-[260px] md:w-[260px] xl:h-[300px] xl:w-[300px]" />
      {/* mid-right */}
      <Fleur className="absolute right-[4.5vw] top-[18vh] text-neutral-300/60 h-[240px] w-[240px] md:h-[300px] md:w-[300px] xl:h-[340px] xl:w-[340px]" />
      {/* bottom-left */}
      <Fleur className="absolute left-[-2vw] bottom-[6vh] text-neutral-300/50 h-[220px] w-[220px] md:h-[280px] md:w-[280px] xl:h-[320px] xl:w-[320px]" />
    </div>
  );
}
function Fleur({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M50 10c0 17-13 30-30 30 17 0 30 13 30 30 0-17 13-30 30-30-17 0-30-13-30-30z"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
