"use client"

import { TypeAnimation } from "react-type-animation"

interface TypingAnimationProps {
  sequences: (string | number)[]
  className?: string
}

export default function TypingAnimation({ sequences, className = "" }: TypingAnimationProps) {
  return (
    <TypeAnimation
      sequence={sequences}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className={className}
      cursor={true}
    />
  )
}
