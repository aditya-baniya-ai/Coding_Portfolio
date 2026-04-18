"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TimelineItem {
  title: string
  subtitle: string
  date: string
  description: string
  tags?: string[]
  link?: string
  icon?: React.ReactNode
  award?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 opacity-30" />

      {items.map((item, idx) => (
        <TimelineEntry key={idx} item={item} index={idx} isLeft={idx % 2 === 0} />
      ))}
    </div>
  )
}

function TimelineEntry({
  item,
  isLeft,
}: {
  item: TimelineItem
  index: number
  isLeft: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Dot on timeline */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 z-10 shadow-lg shadow-cyan-500/30"
      />

      {/* Content card */}
      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -50 : 50,
        }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`ml-12 md:ml-0 md:w-[45%] ${
          isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
        }`}
      >
        <div className="glass rounded-xl p-6 hover:glow-mixed transition-all duration-300 group">
          {/* Date badge */}
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 mb-3">
            {item.date}
          </span>

          {/* Award badge */}
          {item.award && (
            <span className="inline-block ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30 mb-3">
              🏆 {item.award}
            </span>
          )}

          <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-purple-400 font-medium mb-3">{item.subtitle}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Link */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Learn More →
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}
