import { 
  Code, Database, Globe, Layout, Layers, Server, Smartphone, Terminal, 
  GitBranch, Cloud, PenTool, Box, ServerCog
} from "lucide-react"

import { 
  FaAws, FaDocker, FaGitAlt, FaNodeJs, FaReact, FaPython, FaHtml5, FaCss3, FaJs, FaDatabase, FaFlask, FaMobileAlt, FaGithub
} from "react-icons/fa"

import { 
  SiNetlify, SiHeroku, SiOpencv, SiPytorch, SiNumpy, SiPandas, SiScikitlearn, SiGoogle, SiPython
} from "react-icons/si"

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout className="h-8 w-8 mb-4 text-primary" />,
      skills: [
        { name: "React", icon: <FaReact className="h-6 w-6 text-blue-500" /> },
        { name: "Next.js", icon: <Server className="h-6 w-6 text-gray-500" /> },
        { name: "HTML5", icon: <FaHtml5 className="h-6 w-6 text-orange-500" /> },
        { name: "CSS3", icon: <FaCss3 className="h-6 w-6 text-blue-500" /> },
        { name: "JavaScript", icon: <FaJs className="h-6 w-6 text-yellow-500" /> },
        { name: "TypeScript", icon: <Code className="h-6 w-6 text-blue-600" /> },
        { name: "Tailwind CSS", icon: <Layers className="h-6 w-6 text-teal-500" /> },
      ],
    },
    {
      title: "Backend Development",
      icon: <Server className="h-8 w-8 mb-4 text-primary" />,
      skills: [
        { name: "Python", icon: <FaPython className="h-6 w-6 text-blue-600" /> },
        { name: "Flask", icon: <FaFlask className="h-6 w-6 text-blue-600" /> },
        { name: "RESTful APIs", icon: <Globe className="h-6 w-6 text-gray-600" /> },
      ],
    },
    {
      title: "Database",
      icon: <Database className="h-8 w-8 mb-4 text-primary" />,
      skills: [
        { name: "MySQL", icon: <FaDatabase className="h-6 w-6 text-yellow-500" /> },
        { name: "Firebase", icon: <Cloud className="h-6 w-6 text-orange-500" /> },
      ],
    },
    {
      title: "AI/ML & Data Science",
      icon: <Code className="h-8 w-8 mb-4 text-primary" />,
      skills: [
        { name: "OpenCV", icon: <SiOpencv className="h-6 w-6 text-blue-500" /> },
        { name: "Mediapipe", icon: <SiGoogle className="h-6 w-6 text-blue-500" /> },
        { name: "Yolo", icon: <SiOpencv className="h-6 w-6 text-blue-500" /> },
        { name: "Matplotlib", icon: <SiPython className="h-6 w-6 text-blue-500" /> },
        { name: "PyTorch", icon: <SiPytorch className="h-6 w-6 text-orange-500" /> },
        { name: "NumPy", icon: <SiNumpy className="h-6 w-6 text-blue-600" /> },
        { name: "Pandas", icon: <SiPandas className="h-6 w-6 text-black" /> },
        { name: "Scikit-Learn", icon: <SiScikitlearn className="h-6 w-6 text-yellow-500" /> },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <Terminal className="h-8 w-8 mb-4 text-primary" />,
      skills: [
        { name: "Git/GitHub", icon: <FaGithub className="h-6 w-6 text-black" /> },
        { name: "Docker", icon: <FaDocker className="h-6 w-6 text-blue-500" /> },
        { name: "Heroku", icon: <SiHeroku className="h-6 w-6 text-purple-500" /> },  
        { name: "Netlify", icon: <SiNetlify className="h-6 w-6 text-blue-500" /> },  
        { name: "Vercel", icon: <Globe className="h-6 w-6 text-black" /> },
      ],
    },
    {
      title: "Architecture & Design",
      icon: <Layers className="h-8 w-8 mb-4 text-primary" />,
      skills: [
        { name: "System Design", icon: <Box className="h-6 w-6 text-gray-500" /> },
        { name: "UI/UX Basics", icon: <Layers className="h-6 w-6 text-gray-400" /> },
      ],
    },
    
  ]

  return (
    <div className="container-custom">
      <h1 className="section-heading">My Skills</h1>
      <p className="text-lg mb-12 max-w-3xl">
        I've developed a diverse set of skills throughout my career. Here's an overview of my technical expertise and
        the technologies I work with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-accent/50 p-6 rounded-lg border border-border hover:border-primary transition-all duration-300
            shadow-lg hover:shadow-primary/70 hover:shadow-2xl hover:scale-[1.02]"
          >
            {category.icon}
            <h2 className="text-xl font-bold mb-4">{category.title}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex flex-col items-center p-2 bg-background rounded-lg border border-border transition-all duration-300 
                  shadow-md hover:shadow-primary/60 hover:shadow-lg hover:scale-105"
                  title={skill.name}
                >
                  {skill.icon}
                  <p className="text-sm mt-2">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
