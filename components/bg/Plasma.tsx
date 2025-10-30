"use client";

import { motion } from "framer-motion";

export default function Plasma() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Layer stack */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-white/5" />
      <div className="plasma-container">
        <div className="plasma-blob plasma-1" />
        <div className="plasma-blob plasma-2" />
        <div className="plasma-blob plasma-3" />
      </div>
      {/* soft vignette */}
      <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000_60%,transparent_100%)]" />
    </motion.div>
  );
}
