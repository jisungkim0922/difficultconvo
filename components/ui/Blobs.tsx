"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useEffect } from "react"

function Blob({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ x: "-8%", y: "-8%", scale: 0.95, opacity: 0.7 }}
      animate={{ x: "8%", y: "8%", scale: 1.07, opacity: 0.85 }}
      transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
      className={className}
    />
  )
}

export default function Blobs() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 30, damping: 20 })
  const ry = useSpring(useTransform(my, [-1, 1], [-12, 12]), { stiffness: 30, damping: 20 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mx.set(x); my.set(y)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ x: rx, y: ry }}
    >
      {/* Colorful gradient blobs with additive blending */}
      <Blob
        delay={0}
        className="
          absolute -top-24 -left-24 h-[42rem] w-[42rem] rounded-full blur-3xl
          bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.45),transparent_60%)]
          mix-blend-screen
          dark:bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.35),transparent_60%)]
        "
      />
      <Blob
        delay={3}
        className="
          absolute -bottom-32 -right-28 h-[38rem] w-[38rem] rounded-full blur-3xl
          bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.40),transparent_60%)]
          mix-blend-screen
          dark:bg-[radial-gradient(circle_at_70%_30%,rgba(244,114,182,0.32),transparent_60%)]
        "
      />
      <Blob
        delay={6}
        className="
          absolute top-1/3 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl
          bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.35),transparent_60%)]
          mix-blend-screen
          dark:bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.28),transparent_60%)]
        "
      />
    </motion.div>
  )
}
