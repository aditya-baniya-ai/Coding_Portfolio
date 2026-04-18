"use client"

import { motion } from "framer-motion"
import type React from "react"

interface GradientCardProps {
  children: React.ReactNode
  className?: string
  hoverGlow?: boolean
}

export default function GradientCard({
  children,
  className = "",
  hoverGlow = true,
}: GradientCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-xl overflow-hidden ${className}`}
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-cyan-500/30 p-[1px]">
        <div className="h-full w-full rounded-xl bg-card" />
      </div>
      {/* Content */}
      <div className={`relative z-10 p-6 rounded-xl glass transition-all duration-300 ${hoverGlow ? 'hover:glow-mixed' : ''}`}>
        {children}
      </div>
    </motion.div>
  )
}
