"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { motion } from "framer-motion"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/aditya-baniya-ai",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aadityabaniya/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://x.com/its_me_adi_",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:adityabaniya.us@gmail.com",
    icon: Mail,
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border/20">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="container py-10 md:py-14">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span
              className="text-lg font-bold gradient-text"
              style={{ fontFamily: "var(--font-space)" }}
            >
              {"<Aaditya />"}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Building the future with code & AI
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.div
                key={social.name}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg glass border border-border/30 text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aaditya Baniya. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
