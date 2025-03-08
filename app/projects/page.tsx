import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      title: "AITX HACKATHON PROJECT: Seremo A Hindu Ritual Platform",
      description:
        "<strong>Seremo</strong> is a full-stack web application that helps Hindus abroad connect with priests for ceremonies. It features an <strong>AI-powered chatbot using Meta’s LLaMA API</strong> for instant religious guidance and real-time video calls for virtual ceremonies. Built with <strong>React, Flask, and SQLite</strong>, it ensures secure authentication and role-based access control. <strong>Dockerized and deployed on Fly.io</strong>, Seremo enhances accessibility to religious services worldwide.",
      image: "/seremo.png",
      tags: ["Llama API", "Flask Python", "Docker", "CORS", "Next.js", "TypeScript", "React.js", "Tailwind CSS", "SQLite3"],
      liveLink: "https://frontend-flask-adea.fly.dev/",
      githubLink: "https://github.com/adityahacker-1/hackathon_aitx",
    },
    {
      title: "BOKOHACKS HACKATHON PROJECT: Spam Detection System with ChatGPT Integration",
      description:
        "Developed a <strong>Spam detection system</strong> that classifies messages and emails as spam or non-spam using a <strong>machine learning model</strong> trained on a cleaned dataset with <strong>Pandas</strong> in <strong>Jupyter Notebook</strong>. The model was integrated into a <strong>Flask backend</strong>, while the results were displayed on a <strong>React frontend</strong>. Additionally, the project leverages <strong>OpenAI’s ChatGPT</strong> to enhance interactivity, allowing users to engage with the system through a conversational interface.",
      image: "/spam_message.png",
      tags: ["Flask", "React", "OpenAI API", "Pandas", "Pickle", "Numpy", "Sklearn", "Matplotlib", "NLTK"],
      liveLink: "https://github.com/adityahacker-1/scam_msg_classifier_hackathon",
      githubLink: "https://github.com/adityahacker-1/scam_msg_classifier_hackathon",
    },
    {
      title: "NETFLIX CLONE",
      description:
        "I built a <strong>Netflix Clone</strong>, a frontend demo using <strong>HTML, CSS, and JavaScript</strong>, replicating the core design of Netflix. This project uses plain HTML, JS, and CSS for styling and layout. JavaScript adds basic interactivity, such as hover effects and clickable elements. Although this version is not fully responsive, it effectively showcases my ability to design and structure a web interface using vanilla web technologies.",
      image: "/netflix.png",
      tags: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://adeanetfli.netlify.app/",
      githubLink: "https://github.com/adityahacker-1/netflix_clone",
    },
    {
      title: "To-Do List",
      description:
        "I built a <strong>To-Do List App</strong> using <strong>React, HTML, and plain CSS</strong>, providing a clean and intuitive task management experience. This project allows users to <strong>add tasks</strong>, ensuring a smooth workflow with a dynamic UI. Leveraging <strong>Reacts component-based architecture</strong>, the app efficiently updates for a seamless user experience. The styling, done with <strong>pure CSS</strong>, enhances the visual appeal while maintaining simplicity.",
      image: "/to_do_list.png",
      tags: ["React.js", "HTML", "Vanilla CSS", "Netlify"],
      liveLink: "https://adea.netlify.app/",
      githubLink: "https://github.com/adityahacker-1/to_do_list_react",
    },
    {
      title: "Interactive Drum Kit",
      description:
        "I built an <strong>Interactive Drum Kit</strong> using HTML, CSS, and JavaScript, allowing users to produce drum sounds by clicking on the drum elements or pressing corresponding keys. This project combines visual appeal with interactivity, featuring well-designed graphics and smooth user experience. JavaScript handles <strong>event listeners for both mouse clicks and keyboard inputs</strong>, ensuring responsive and engaging drum play.",
      image: "/drum.png",
      tags: ["HTML", "CSS", "JavaScript", "Audio API"],
      liveLink: "https://adityahacker-1.github.io/drum/",
      githubLink: "https://github.com/adityahacker-1/drum",
    },
  ]

  return (
    <div className="container-custom">
      <h1 className="section-heading">My Projects</h1>
      <p className="text-lg mb-12 max-w-3xl">
        Here are some of the projects I have worked on. Each project represents different skills and technologies I have mastered.
      </p>

      <div className="grid grid-cols-1 gap-16">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="relative bg-accent/50 rounded-lg border border-border overflow-hidden hover:border-primary transition-all duration-300
            shadow-lg hover:shadow-primary/70 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-in-out p-2"
          >
            <div className="relative w-full h-[55vh] overflow-hidden">
              <Image 
                src={project.image || "/placeholder.svg"} 
                alt={project.title} 
                fill 
                className="object-contain brightness-90 hover:brightness-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-500"></div>
            </div>
            
            <div className="p-6 md:p-10 flex flex-col bg-black/80 backdrop-blur-md text-white">
              <h2 className="text-3xl font-bold mb-3">{project.title}</h2>
              <p className="text-muted-foreground mb-4 text-lg" dangerouslySetInnerHTML={{ __html: project.description }}></p>

              <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-3 py-1 bg-primary/80 text-sm rounded-full border border-border text-black">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <Button asChild variant="outline" size="lg" className="hover:bg-primary hover:text-white">
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Demo
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover:bg-primary hover:text-white">
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    Source Code
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
