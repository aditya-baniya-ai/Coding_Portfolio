import { Briefcase, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ExperiencePage() {
  const experiences = [
    {
      role: "Full Stack Developer Intern",
      company: "Orgware Construct",
      duration: "2022 - 2023",
      description: `
        During my first internship, I developed a full-stack web application using React, Flask, and MySQL for an IT assistance company in Nepal. The platform helps individuals pursue careers in Information Technology by offering career guidance and programming lectures. My focus was on building a secure system with encrypted login and registration, ensuring data protection. I also structured the database efficiently for smooth user management and optimized data retrieval. 
        <br /><br />
        Beyond development, I gained valuable experience in team collaboration and project management. I learned how to work in a team, communicate ideas effectively, and use Git and GitHub for version control. Managing branches, resolving merge conflicts, and reviewing pull requests helped me understand the importance of organized workflows. Regular discussions and feedback sessions improved my ability to explain technical concepts and integrate team input. 
        <br /><br />
        I also enhanced my debugging skills, learning to identify and resolve issues efficiently. This helped me improve data fetching, optimize performance, and handle errors effectively. Additionally, I focused on creating an intuitive user interface with smooth navigation for a better user experience. This internship strengthened my problem-solving abilities and prepared me for future roles in software development.
      `,
      skills: ["React", "Flask", "MySQL", "Docker"],
      link: "https://www.linkedin.com/company/orgware-construct/?originalSubdomain=np",
    },
    
    {
      role: "Research Assistant (AI & Computer Vision)",
      company: "Texas State University-Ingram CHips",
      duration: "2024 - Present",
      description:
        "I am conducting research in AI model training, fine-tuning, and computer vision applications. My work involves collecting and annotating datasets to train object detection models. I use YOLO and PyTorch to develop models that can detect objects and humans in real-time. For human detection, I integrate Mediapipe, while OpenCV helps with video processing. The goal is to create efficient and accurate models that work with both recorded footage and live video feeds.<br/><br/>Through this research, I have gained experience in data collection, preprocessing, and cleaning to ensure high-quality training data. I have learned how to annotate images for YOLO, use Mediapipe for human detection, and apply OpenCV for image and video processing. I have also developed skills in training models, splitting datasets for testing and validation, and evaluating model performance using real-world data. <br /><br /> As part of my research, I built a fatigue detection model for vision-impaired workers in industrial settings. This system helps identify worker fatigue in real-time, reducing risks and improving productivity. I also developed a MOST (Maynard Operation Sequence Technique) analysis tool that automates product counting, eliminating manual tracking. This project optimizes cycle time and frequency measurement, reducing human effort and improving efficiency in manufacturing environments.",
      skills: ["PyTorch","Mediapipe", "Numpy","Pandas", "YOLO", "OpenCV", "Data Science", "Data Cleaning", "Model Training", "Digital Twin"],
      link: "https://chips.engineering.txst.edu/",
    },
    {
      role: "Student Assistant",
      company: "Texas State University-Computer Science Department",
      duration: "2024-2024",
      description:
        "As a student assistant for the Computer Science department, I provided academic support in C++ programming, focusing on data structures, object-oriented programming, and fundamental concepts. My role involved assisting students with understanding complex programming concepts, debugging their code, and guiding them through assignments and projects. I also facilitated discussions on algorithmic problem-solving, helping students strengthen their logical thinking and programming skills.  <br /><br /> Beyond classroom support, I was responsible for proctoring exams and tests, ensuring a fair and organized examination environment. I also played a key role in grading assignments, quizzes, and exams, providing detailed feedback to help students improve their coding proficiency. My experience in assessing student work allowed me to develop a strong understanding of evaluating programming efficiency, readability, and correctness.  <br /><br /> Additionally, I occasionally conducted lectures and review sessions, explaining core C++ concepts and reinforcing data structures and object-oriented programming principles. Through this experience, I improved my communication, leadership, and teaching skills, making complex topics more accessible to students. This role not only deepened my expertise in C++ but also enhanced my ability to mentor and support aspiring programmers effectively.",
      skills: ["Communication", "Teaching", "Grading"],
      link: "https://cs.txst.edu/",
    },
  ]

  return (
    <div className="container-custom">
      <h1 className="section-heading">My Experience</h1>
      <p className="text-lg mb-12 max-w-3xl">
        Here are some of the roles and experiences that have shaped my journey in web development and AI.
      </p>

      <div className="grid grid-cols-1 gap-16">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="relative bg-accent/50 rounded-lg border border-border overflow-hidden hover:border-primary transition-all duration-300
            shadow-lg hover:shadow-primary/70 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-in-out p-6"
          >
            <h2 className="text-3xl font-bold mb-3">{experience.role}</h2>
            <h3 className="text-xl font-medium text-muted-foreground">{experience.company}</h3>
            <p className="text-muted-foreground text-lg mb-4">{experience.duration}</p>
            <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: experience.description }}></p>

            <div className="flex flex-wrap gap-3 mb-6">
              {experience.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="px-3 py-1 bg-primary/80 text-sm rounded-full border border-border text-black">
                  {skill}
                </span>
              ))}
            </div>

            <Button asChild variant="outline" size="lg" className="hover:bg-primary hover:text-white">
              <Link href={experience.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
