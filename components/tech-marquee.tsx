"use client"

import { motion } from "framer-motion"
import {
  FaReact,
  FaPython,
  FaDocker,
  FaJs,
  FaHtml5,
  FaCss3,
  FaFlask,
  FaGithub,
  FaDatabase,
} from "react-icons/fa"
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPytorch,
  SiOpencv,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiFirebase,
  SiMysql,
  SiSqlite,
} from "react-icons/si"
import type { IconType } from "react-icons"

interface TechItem {
  Icon: IconType
  name: string
  color: string
}

const items: TechItem[] = [
  { Icon: FaReact, name: "React", color: "text-cyan-400" },
  { Icon: SiNextdotjs, name: "Next.js", color: "text-foreground" },
  { Icon: SiTypescript, name: "TypeScript", color: "text-blue-400" },
  { Icon: FaJs, name: "JavaScript", color: "text-yellow-400" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400" },
  { Icon: FaHtml5, name: "HTML5", color: "text-orange-500" },
  { Icon: FaCss3, name: "CSS3", color: "text-blue-400" },
  { Icon: FaPython, name: "Python", color: "text-blue-400" },
  { Icon: FaFlask, name: "Flask", color: "text-muted-foreground" },
  { Icon: SiPytorch, name: "PyTorch", color: "text-orange-400" },
  { Icon: SiOpencv, name: "OpenCV", color: "text-green-400" },
  { Icon: SiNumpy, name: "NumPy", color: "text-blue-500" },
  { Icon: SiPandas, name: "Pandas", color: "text-blue-300" },
  { Icon: SiScikitlearn, name: "Sklearn", color: "text-orange-400" },
  { Icon: FaDocker, name: "Docker", color: "text-blue-400" },
  { Icon: FaGithub, name: "GitHub", color: "text-foreground" },
  { Icon: SiVercel, name: "Vercel", color: "text-foreground" },
  { Icon: SiNetlify, name: "Netlify", color: "text-teal-400" },
  { Icon: SiHeroku, name: "Heroku", color: "text-purple-400" },
  { Icon: SiFirebase, name: "Firebase", color: "text-orange-400" },
  { Icon: SiMysql, name: "MySQL", color: "text-blue-400" },
  { Icon: SiSqlite, name: "SQLite", color: "text-blue-300" },
  { Icon: FaDatabase, name: "SQL", color: "text-yellow-400" },
]

export default function TechMarquee() {
  const row = [...items, ...items]

  return (
    <div
      className="group relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label="Tech stack"
    >
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
      >
        {row.map(({ Icon, name, color }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-3 px-5 py-3 rounded-full glass border border-border/30 hover:border-cyan-500/40 transition-colors shrink-0"
          >
            <Icon className={`h-6 w-6 ${color}`} />
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
