"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"
import type React from "react"

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

interface MagneticButtonProps
  extends Omit<
    NativeButtonProps,
    | "onMouseMove"
    | "onMouseLeave"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onDragEnter"
    | "onDragLeave"
    | "onDragOver"
    | "onDragExit"
    | "onDrop"
    | "onTransitionEnd"
  > {
  children: React.ReactNode
  strength?: number
}

export default function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 260, damping: 18, mass: 0.5 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
