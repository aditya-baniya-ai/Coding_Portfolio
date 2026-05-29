"use client"

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import type React from "react"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  spotlight?: boolean
  spotlightColor?: string
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  spotlight = true,
  spotlightColor = "rgba(34,211,238,0.18)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 }
  const sx = useSpring(px, springConfig)
  const sy = useSpring(py, springConfig)

  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])

  const bgX = useTransform(sx, (v) => `${v * 100}%`)
  const bgY = useTransform(sy, (v) => `${v * 100}%`)
  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${bgX} ${bgY}, ${spotlightColor}, transparent 45%)`

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
    setHovering(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{ background: spotlightBg, opacity: hovering ? 1 : 0 }}
        />
      )}
    </motion.div>
  )
}
