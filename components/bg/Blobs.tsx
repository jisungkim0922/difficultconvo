"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useEffect } from "react"

function Blob({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ x: "-10%", y: "-10%", scale: 0.9, opacity: 0.5 }}
      animate={{ x: "10%", y: "10%", scale: 1.05, opacity: 0.6 }}
      transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
      className={className + " blur-3xl opacity-60"}
    />
  )
}

export default function Blobs() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 30, damping: 20 })
  const ry = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 30, damping: 20 })

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
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ x: rx, y: ry }}>
      <Blob delay={0}  className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,.08),transparent_60%)]" />
      <Blob delay={3}  className="absolute -bottom-32 -right-28 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,.08),transparent_60%)]" />
      <Blob delay={6}  className="absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,.06),transparent_60%)]" />
    </motion.div>
  )
}
