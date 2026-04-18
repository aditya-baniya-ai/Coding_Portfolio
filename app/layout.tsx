import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata: Metadata = {
  title: "Aaditya Baniya | Full Stack Developer & AI Engineer",
  description:
    "Portfolio of Aaditya Baniya — Full Stack Developer, AI Researcher, and Computer Vision Engineer specializing in building intelligent web applications.",
  keywords: [
    "Aaditya Baniya",
    "Full Stack Developer",
    "AI Engineer",
    "Computer Vision",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
  ],
  openGraph: {
    title: "Aaditya Baniya | Full Stack Developer & AI Engineer",
    description:
      "Building intelligent web applications at the intersection of full-stack development and AI.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground min-h-screen flex flex-col antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
