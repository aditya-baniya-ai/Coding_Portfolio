import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I am <span className="text-primary">Aaditya Baniya</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-muted-foreground">
            Full Stack Developer and AI Enthusiast
          </h2>
          <p className="text-lg mb-8">
            I specialize in building full-stack web applications and am currently conducting research in computer vision, AI model training, 
            and fine-tuning, as a research assistant. I am seeking career opportunities that allow me to merge these fields, leveraging AI to enhance web applications and create innovative, intelligent solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </div>

        {/* Profile Image with Glowing Effect */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary 
          shadow-lg hover:shadow-primary/70 hover:shadow-2xl transition-all duration-300">
            <Image src="/aditya.jpeg" alt="Your Name" fill className="object-cover" priority />
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="section-heading">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Certifications - Glowing Effect */}
          <div className="bg-accent/50 p-6 rounded-lg border border-border shadow-md hover:shadow-primary/60 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <BookOpen className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Certification</h3>
            <p className="text-muted-foreground">
              Certified for Dean List, Solving coding challenges, and Volunteering.
            </p>
          </div>

          {/* Achievements - Glowing Effect */}
          <div className="bg-accent/50 p-6 rounded-lg border border-border shadow-md hover:shadow-primary/60 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <Link href="/experience" className="flex flex-col">
              <Briefcase className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Experience</h3>
              <p className="text-muted-foreground">
                Over 2 years of experience in working as a freelancer Full Stack Web Developer and building models in Computer Vision.
              </p>
            </Link>
          </div>


        </div>
      </div>
    </div>
  )
}
