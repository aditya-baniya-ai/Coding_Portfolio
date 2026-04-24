"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ExternalLink,
  Github,
  ChevronDown,
  Award,
  Briefcase,
  Code,
  Database,
  Globe,
  Layout,
  Layers,
  Server,
  Terminal,
  Cloud,
  Box,
  Mail,
  MapPin,
  Phone,
  Send,
  Trophy,
  Zap,
  Brain,
  Cpu,
  Rocket,
  GraduationCap,
} from "lucide-react"
import {
  FaDocker,
  FaReact,
  FaPython,
  FaHtml5,
  FaCss3,
  FaJs,
  FaDatabase,
  FaFlask,
  FaGithub,
} from "react-icons/fa"
import {
  SiNetlify,
  SiHeroku,
  SiOpencv,
  SiPytorch,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiGoogle,
} from "react-icons/si"

import AnimatedSection from "@/components/animated-section"
import ParticleBackground from "@/components/particle-background"
import TypingAnimation from "@/components/typing-animation"
import Timeline from "@/components/timeline"
import Counter from "@/components/counter"
import GradientCard from "@/components/gradient-card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import type React from "react"

/* ============================================
   DATA
   ============================================ */

const projects = [
  {
    title: "MOST — Hybrid Computer Vision",
    description:
      "Tackles manual data entry bottlenecks by implementing a Hybrid Computer Vision model to automate manufacturing time study sequences, providing instant feedback and eliminating human error. Winner of the Bobcat Innovation Challenge.",
    image: "/most_cv.png",
    tags: ["Computer Vision", "Machine Learning", "Automation", "Python"],
    liveLink: "https://github.com/txst-digitaltwins",
    githubLink: "https://github.com/txst-digitaltwins",
  },
  {
    title: "AI Smart — Autonomous DriveBot",
    description:
      "A LiveKit-powered robotic car providing low-latency two-way voice conversation and autonomous navigation. Built with Raspberry Pi, OpenCV, and a sleek Next.js operator console for remote control.",
    image: "/ai_smart.png",
    tags: ["LiveKit", "Python", "Next.js", "WebRTC", "OpenCV"],
    liveLink: "https://github.com/aditya-baniya-ai/robotic_car",
    githubLink: "https://github.com/aditya-baniya-ai/robotic_car",
  },
  {
    title: "T-Flash — AI Audio News",
    description:
      "\"Hear the world. In seconds.\" Minimalist AI-powered app that fetches news, summarizes with Gemini, and narrates with ElevenLabs TTS via an automated n8n pipeline.",
    image: "/t_flash.png",
    tags: ["n8n", "ElevenLabs", "Gemini", "Next.js"],
    liveLink: "https://github.com/Rizsaurav/T-Flash",
    githubLink: "https://github.com/Rizsaurav/T-Flash",
  },
  {
    title: "MediaPipe Fruit Catcher",
    description:
      "An interactive, real-time webcam game built with Python, OpenCV, and MediaPipe. Uses Google's MediaPipe Holistic model to detect wrists and draw a dynamic basket to catch falling fruits with physics and particle effects.",
    image: "/fruit_catcher.png",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    liveLink: "https://github.com/aditya-baniya-ai/Fruit_catcher_using_mediapipe_computer_vision",
    githubLink: "https://github.com/aditya-baniya-ai/Fruit_catcher_using_mediapipe_computer_vision",
  },
  {
    title: "Automated Job Search & Application Workflow",
    description:
      "A fully autonomous system that scrapes job postings from multiple platforms, parses and ranks them, and uses Gemini AI to tailor resumes and write cover letters. Automatically generates PDFs via Gotenberg and saves them directly to Google Drive while tracking applications in Google Sheets.",
    image: "/n8n_workflow.png",
    tags: ["n8n", "Gemini", "OpenAI", "Python", "Docker", "Automation"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Seremo — Hindu Ritual Platform",
    description:
      "Full-stack web app helping Hindus abroad connect with priests for ceremonies. Features an AI-powered chatbot using Meta's LLaMA API for instant religious guidance and real-time video calls.",
    image: "/seremo.png",
    tags: ["LLaMA API", "Flask", "Docker", "Next.js", "TypeScript", "React", "SQLite3"],
    liveLink: "https://frontend-flask-adea.fly.dev/",
    githubLink: "https://github.com/adityahacker-1/hackathon_aitx",
  },
  {
    title: "Spam Detection System",
    description:
      "ML-powered spam classifier with ChatGPT integration. Trained on cleaned datasets using Pandas + Sklearn, served through Flask API, with a React frontend for interactive classification.",
    image: "/spam_message.png",
    tags: ["Flask", "React", "OpenAI API", "Sklearn", "NLTK", "Pandas"],
    liveLink: "https://github.com/adityahacker-1/scam_msg_classifier_hackathon",
    githubLink: "https://github.com/adityahacker-1/scam_msg_classifier_hackathon",
  },
  {
    title: "Netflix Clone",
    description:
      "Frontend replica of Netflix using vanilla HTML, CSS, and JavaScript. Showcases UI design skills with hover effects and responsive layout using pure web technologies.",
    image: "/netflix.png",
    tags: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://adeanetfli.netlify.app/",
    githubLink: "https://github.com/adityahacker-1/netflix_clone",
  },
  {
    title: "Interactive Drum Kit",
    description:
      "Browser-based drum kit with keyboard and click interactions. Features responsive audio playback using the Web Audio API with smooth visual feedback.",
    image: "/drum.png",
    tags: ["HTML", "CSS", "JavaScript", "Audio API"],
    liveLink: "https://adityahacker-1.github.io/drum/",
    githubLink: "https://github.com/adityahacker-1/drum",
  },
]

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", icon: <FaReact className="h-5 w-5 text-blue-400" /> },
      { name: "Next.js", icon: <Server className="h-5 w-5 text-gray-400" /> },
      { name: "HTML5", icon: <FaHtml5 className="h-5 w-5 text-orange-500" /> },
      { name: "CSS3", icon: <FaCss3 className="h-5 w-5 text-blue-400" /> },
      { name: "JavaScript", icon: <FaJs className="h-5 w-5 text-yellow-400" /> },
      { name: "TypeScript", icon: <Code className="h-5 w-5 text-blue-500" /> },
      { name: "Tailwind", icon: <Layers className="h-5 w-5 text-teal-400" /> },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Python", icon: <FaPython className="h-5 w-5 text-blue-500" /> },
      { name: "Flask", icon: <FaFlask className="h-5 w-5 text-gray-400" /> },
      { name: "REST APIs", icon: <Globe className="h-5 w-5 text-green-400" /> },
    ],
  },
  {
    title: "Database",
    icon: <Database className="h-6 w-6" />,
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "MySQL", icon: <FaDatabase className="h-5 w-5 text-yellow-400" /> },
      { name: "Firebase", icon: <Cloud className="h-5 w-5 text-orange-400" /> },
      { name: "SQLite", icon: <Database className="h-5 w-5 text-blue-400" /> },
    ],
  },
  {
    title: "AI / ML",
    icon: <Brain className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "OpenCV", icon: <SiOpencv className="h-5 w-5 text-green-400" /> },
      { name: "MediaPipe", icon: <SiGoogle className="h-5 w-5 text-blue-400" /> },
      { name: "YOLO", icon: <Cpu className="h-5 w-5 text-purple-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="h-5 w-5 text-orange-500" /> },
      { name: "NumPy", icon: <SiNumpy className="h-5 w-5 text-blue-500" /> },
      { name: "Pandas", icon: <SiPandas className="h-5 w-5 text-blue-300" /> },
      { name: "Sklearn", icon: <SiScikitlearn className="h-5 w-5 text-orange-400" /> },
    ],
  },
  {
    title: "DevOps",
    icon: <Terminal className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Git", icon: <FaGithub className="h-5 w-5 text-gray-300" /> },
      { name: "Docker", icon: <FaDocker className="h-5 w-5 text-blue-400" /> },
      { name: "Heroku", icon: <SiHeroku className="h-5 w-5 text-purple-400" /> },
      { name: "Netlify", icon: <SiNetlify className="h-5 w-5 text-teal-400" /> },
      { name: "Vercel", icon: <Globe className="h-5 w-5 text-gray-300" /> },
    ],
  },
  {
    title: "Design",
    icon: <Layers className="h-6 w-6" />,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "System Design", icon: <Box className="h-5 w-5 text-gray-400" /> },
      { name: "UI/UX", icon: <Layers className="h-5 w-5 text-pink-400" /> },
    ],
  },
]

const hackathons = [
  {
    title: "AI Smart — Autonomous DriveBot",
    subtitle: "NexHacks Hackathon",
    date: "2026",
    description:
      "Built a LiveKit-powered robotic car with two-way voice conversation, live camera streaming, and autonomous navigation. Features ArUco marker detection with OpenCV, real-time WebRTC communication, and a Next.js operator console for remote control.",
    tags: ["LiveKit", "Python", "Next.js", "WebRTC", "OpenCV", "Raspberry Pi", "OpenAI"],
    link: "https://github.com/aditya-baniya-ai/robotic_car",
  },
  {
    title: "T-Flash — AI Audio News Companion",
    subtitle: "HackTX 2025",
    date: "2025",
    description:
      "\"Hear the world. In seconds.\" AI-powered voice-first news app that fetches real-time headlines, summarizes with Google Gemini, and generates lifelike narration through ElevenLabs TTS. Fully automated n8n pipeline delivering audio news to a Flutter iOS app.",
    tags: ["n8n", "Gemini", "ElevenLabs", "Supabase", "Next.js", "NewsAPI", "Flutter"],
    link: "https://github.com/Rizsaurav/T-Flash",
  },
  {
    title: "Seremo — Hindu Ritual Platform",
    subtitle: "AITX Hackathon",
    date: "2024",
    description:
      "Built a full-stack ceremonial booking platform with AI-powered religious guidance chatbot using Meta's LLaMA API. Features real-time video calls for virtual ceremonies and secure role-based access.",
    tags: ["LLaMA API", "Flask", "Docker", "Next.js", "React", "SQLite3", "Fly.io"],
    link: "https://frontend-flask-adea.fly.dev/",
  },
  {
    title: "Spam Detection System with ChatGPT",
    subtitle: "BokoHacks Hackathon",
    date: "2024",
    description:
      "Developed an ML-powered spam classifier trained on cleaned datasets. Integrated OpenAI's ChatGPT for conversational analysis, with a Flask backend serving a React frontend.",
    tags: ["Flask", "React", "OpenAI API", "Sklearn", "NLTK", "Pandas"],
    link: "https://github.com/adityahacker-1/scam_msg_classifier_hackathon",
  },
]

const experiences = [
  {
    title: "Research Assistant (AI & Computer Vision)",
    subtitle: "Texas State University — Ingram CHips Lab",
    date: "2024 — Present",
    description:
      "Conducting research in AI model training and computer vision. Building object detection models with YOLO and PyTorch for real-time detection. Developed fatigue detection systems for industrial workers and automated MOST analysis tools for manufacturing optimization. Deployed models on NVIDIA Jetson with TensorRT.",
    tags: ["PyTorch", "YOLO", "OpenCV", "MediaPipe", "TensorRT", "NVIDIA Jetson", "Data Science"],
    link: "https://chips.engineering.txst.edu/",
  },
  {
    title: "Student Assistant — CS Department",
    subtitle: "Texas State University",
    date: "2024",
    description:
      "Provided academic support in C++ programming, data structures, and OOP. Proctored exams, graded assignments, and conducted review sessions, making complex programming concepts accessible to students.",
    tags: ["C++", "Teaching", "Data Structures", "OOP"],
    link: "https://cs.txst.edu/",
  },
  {
    title: "Full Stack Developer Intern",
    subtitle: "Orgware Construct — Nepal",
    date: "2022 — 2023",
    description:
      "Developed a full-stack web application using React, Flask, and MySQL for an IT assistance company. Built secure authentication systems, optimized database queries, and managed version control workflows with Git.",
    tags: ["React", "Flask", "MySQL", "Docker", "Git"],
    link: "https://www.linkedin.com/company/orgware-construct/",
  },
]

const achievements = [
  {
    icon: <Award className="h-8 w-8" />,
    title: "1st Place — Bobcat Innovation",
    description: "Won Bobcat Innovation Challenge by automating manufacturing studies using Computer Vision",
    color: "from-amber-400 to-yellow-500",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Dean's List",
    description: "Recognized for academic excellence at Texas State University",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI Research Assistant",
    description: "Leading CV research at Texas State Ingram CHips Lab with YOLO & PyTorch",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    title: "Makerspace Sentinel",
    description: "Deployed CV models on NVIDIA Jetson Orin with TensorRT optimization",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "AI Job Automation",
    description: "Built automated job search & resume tailoring system using n8n workflows",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "MediaPipe Fruit Catcher",
    description: "Created real-time hand-tracking game using MediaPipe and OpenCV",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "4+ Hackathons",
    description: "Active hackathon participant — AITX, BokoHacks, HackTX, NexHacks and more",
    color: "from-indigo-500 to-purple-500",
  },
]

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 4, suffix: "+", label: "Hackathons" },
  { value: 3, suffix: "", label: "Work Positions" },
]

/* ============================================
   PAGE COMPONENT
   ============================================ */

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Particle background */}
        <ParticleBackground />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-cyan-400 font-medium mb-4 text-sm tracking-wider uppercase"
              >
                Welcome to my portfolio
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Hi, I&apos;m{" "}
                <span className="gradient-text">Aaditya Baniya</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-muted-foreground h-10"
              >
                <TypingAnimation
                  sequences={[
                    "Full Stack Developer",
                    2000,
                    "AI Researcher",
                    2000,
                    "Computer Vision Engineer",
                    2000,
                    "Problem Solver",
                    2000,
                  ]}
                  className="gradient-text"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed"
              >
                I specialize in building full-stack web applications and conducting
                research in computer vision & AI model training. Seeking to merge
                these fields to create innovative, intelligent solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="btn-gradient px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="btn-outline-gradient px-8 py-3 rounded-xl text-sm font-semibold"
                >
                  View Projects
                </button>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Glowing ring behind image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 blur-2xl opacity-30 animate-pulse-glow scale-110" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-cyan-500/30 animate-float">
                  <Image
                    src="/aditya.jpeg"
                    alt="Aaditya Baniya"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center glass rounded-xl p-6 hover:glow-mixed transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground animate-scroll-down" />
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================
          SKILLS SECTION
          ============================================ */}
      <section id="skills" className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="section-heading">Technical Skills</h2>
            <p className="section-subheading">
              Technologies and tools I use to bring ideas to life.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <GradientCard>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold">{category.title}</h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="flex flex-col items-center p-3 rounded-lg bg-background/50 border border-border/30 hover:border-cyan-500/30 transition-all duration-300 cursor-default"
                      >
                        {skill.icon}
                        <p className="text-xs mt-2 text-muted-foreground text-center">
                          {skill.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </GradientCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================
          PROJECTS SECTION
          ============================================ */}
      <section id="projects" className="relative py-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="section-heading">Featured Projects</h2>
            <p className="section-subheading">
              A showcase of projects demonstrating different skills and technologies.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group rounded-xl overflow-hidden glass border border-border/30 hover:border-cyan-500/30 transition-all duration-500 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Hover overlay with buttons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 transition-all"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 hover:bg-purple-500/30 transition-all"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================
          HACKATHONS SECTION
          ============================================ */}
      <section id="hackathons" className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-8 w-8 text-cyan-400" />
              <h2 className="section-heading">Hackathons</h2>
            </div>
            <p className="section-subheading">
              Building innovative solutions under pressure — 24-48 hours of pure creation.
            </p>
          </AnimatedSection>

          <Timeline items={hackathons} />
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================
          EXPERIENCE SECTION
          ============================================ */}
      <section id="experience" className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-8 w-8 text-cyan-400" />
              <h2 className="section-heading">Experience</h2>
            </div>
            <p className="section-subheading">
              My professional journey in software development and AI research.
            </p>
          </AnimatedSection>

          <Timeline items={experiences} />
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================
          ACHIEVEMENTS SECTION
          ============================================ */}
      <section id="achievements" className="relative py-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-8 w-8 text-cyan-400" />
              <h2 className="section-heading">Achievements</h2>
            </div>
            <p className="section-subheading">
              Milestones and accomplishments along my journey.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-xl p-6 border border-border/30 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${achievement.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================
          CONTACT SECTION
          ============================================ */}
      <section id="contact" className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="section-heading">Get In Touch</h2>
            <p className="section-subheading">
              Have a question or want to work together? I&apos;d love to hear from you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection delay={0.1}>
              <div className="glass rounded-xl p-8 border border-border/30">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-400 mb-4">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I&apos;ll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="bg-background/50 border-border/30 focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="bg-background/50 border-border/30 focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What is this regarding?"
                        className="bg-background/50 border-border/30 focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Your message here..."
                        rows={5}
                        className="bg-background/50 border-border/30 focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gradient px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h8z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="glass rounded-xl p-8 border border-border/30 h-full">
                <h3 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-space)" }}>
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a
                        href="mailto:adityabaniya.us@gmail.com"
                        className="text-muted-foreground hover:text-cyan-400 transition-colors"
                      >
                        adityabaniya.us@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <a
                        href="tel:+17373150786"
                        className="text-muted-foreground hover:text-purple-400 transition-colors"
                      >
                        +1 (737) 315-0786
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-muted-foreground">San Marcos, Texas, USA</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border/20">
                  <h4 className="font-medium mb-4">Let&apos;s Connect</h4>
                  <div className="flex gap-3">
                    {[
                      { href: "https://github.com/aditya-baniya-ai", icon: Github, label: "GitHub" },
                      {
                        href: "https://www.linkedin.com/in/aadityabaniya/",
                        icon: () => (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                          </svg>
                        ),
                        label: "LinkedIn",
                      },
                    ].map((social) => (
                      <motion.div key={social.label} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 rounded-xl glass border border-border/30 text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
