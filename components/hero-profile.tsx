"use client"

import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

export default function HeroProfile() {
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springConfig = { stiffness: 80, damping: 18, mass: 0.6 }
  const sx = useSpring(px, springConfig)
  const sy = useSpring(py, springConfig)

  const tiltX = useTransform(sy, [-1, 1], [10, -10])
  const tiltY = useTransform(sx, [-1, 1], [-10, 10])
  const imgX = useTransform(sx, [-1, 1], [-12, 12])
  const imgY = useTransform(sy, [-1, 1], [-12, 12])
  const glowX = useTransform(sx, [-1, 1], [-30, 30])
  const glowY = useTransform(sy, [-1, 1], [-30, 30])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (window.innerWidth / 2)
      const dy = (e.clientY - cy) / (window.innerHeight / 2)
      px.set(Math.max(-1, Math.min(1, dx)))
      py.set(Math.max(-1, Math.min(1, dy)))
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [px, py])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="order-1 lg:order-2 flex justify-center"
    >
      <motion.div
        ref={ref}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        }}
        className="relative will-change-transform"
      >
        <motion.div
          aria-hidden
          style={{ x: glowX, y: glowY }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 blur-2xl opacity-30 animate-pulse-glow scale-110"
        />
        <motion.div
          aria-hidden
          style={{ x: glowX, y: glowY }}
          className="absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,rgba(34,211,238,0.35),rgba(168,85,247,0.35),rgba(34,211,238,0.35))] blur-3xl opacity-20"
        />
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-cyan-500/30 animate-float"
        >
          <Image
            src="/aditya.jpeg"
            alt="Aaditya Baniya"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
