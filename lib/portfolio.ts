export type Project = {
  id: string;
  title: string;
  category: "AI & vision" | "Full stack" | "Experiments";
  eyebrow: string;
  summary: string;
  tags: string[];
  featured?: boolean;
  color: string;
  image?: string;
  metric?: string;
  metricLabel?: string;
  context: string;
  approach: string[];
  outcome: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "sentinel",
    title: "Makerspace Sentinel",
    category: "AI & vision",
    eyebrow: "EDGE AI / INDUSTRIAL SAFETY",
    featured: true,
    color: "blue",
    summary:
      "Real-time PPE detection, from model training to a live edge deployment at Texas State.",
    tags: ["YOLOv8 + CBAM", "TensorRT", "NVIDIA Orin"],
    metric: "25–30 ms",
    metricLabel: "edge inference",
    context:
      "January 2025–Present · Ingram School of Engineering, Texas State University",
    approach: [
      "Built an end-to-end pipeline from dataset selection to a CBAM-enhanced YOLOv8 model fine-tuned on three PPE classes.",
      "Validated on 18,000+ unseen images, including work with the SH17 and R2PPE benchmarks.",
      "Optimized inference with TensorRT and deployed on NVIDIA Jetson AGX Orin.",
    ],
    outcome:
      "Running live in Ingram with 25–30 ms inference. Supported by a $3,000 Makerspace Digital Twin grant.",
  },
  {
    id: "reelstudio",
    title: "ReelStudio",
    category: "Full stack",
    eyebrow: "GENERATIVE AI / CREATIVE TOOLS",
    featured: true,
    color: "coral",
    summary:
      "Real-estate photos become beat-synced cinematic reels through a 10-layer agentic pipeline.",
    tags: ["FastAPI", "Next.js", "FAL + Kling", "FFmpeg"],
    metric: "1st prize",
    metricLabel: "Best Use of FAL API",
    context: "March 2026 · AITX Codex Hackathon",
    approach: [
      "Built three agents for room classification, shot-order planning, and Kling clip generation.",
      "Combined GPT-4o Vision, FAL, and Kling with a Python / FastAPI backend and Next.js frontend.",
      "Used FFmpeg and BPM timing to assemble generated clips into beat-synced cinematic reels.",
    ],
    outcome: "Won first prize and $1,000 in the Best Use of FAL API category.",
    github: "https://github.com/AITX-codex-hackathon/Reel_Studio",
  },
  {
    id: "mostify",
    title: "MOSTify",
    category: "AI & vision",
    eyebrow: "COMPUTER VISION / PRODUCT ENGINEERING",
    featured: true,
    color: "lime",
    summary:
      "Making industrial time studies faster with human action recognition and computer vision.",
    tags: ["Python", "Action recognition", "Computer vision"],
    metric: "1–2 hours",
    metricLabel: "down from 3–5 days",
    context:
      "September 2024–Present · Tech Lead, BobCatalyst Innovation Accelerator Program",
    image: "/most_cv.png",
    approach: [
      "Led technical direction and built the inference pipeline from dataset collection through model training, optimization, and deployment.",
      "Applied human action recognition to manufacturing time-study sequences.",
      "Conducted 40+ customer discovery interviews to validate the product direction.",
    ],
    outcome:
      "Reduced 3–5 days of manual analysis to 1–2 hours of semi-automated work. Supported by a $5,000 BIAP II grant; earlier MOST work won the Bobcat Innovation Challenge.",
  },
  {
    id: "robot",
    title: "Autonomous DriveBot",
    category: "AI & vision",
    eyebrow: "ROBOTICS / REAL-TIME SYSTEMS",
    featured: true,
    color: "purple",
    summary:
      "A Raspberry Pi surveillance robot with autonomous navigation, live video, and two-way voice.",
    tags: ["LiveKit", "WebRTC", "OpenCV", "Next.js"],
    image: "/ai_smart.png",
    context: "January 2026 · NexHacks at Carnegie Mellon University",
    approach: [
      "Built a LiveKit-powered Raspberry Pi robot and a Next.js operator console for real-time home surveillance over WebRTC.",
      "Integrated OpenCV ArUco marker detection for autonomous indoor navigation.",
      "Added two-way voice through the OpenAI API alongside live camera streaming and remote control.",
    ],
    outcome:
      "Connected robotics, computer vision, and a web interface in one real-time system.",
    github: "https://github.com/aditya-baniya-ai/robotic_car",
  },
  {
    id: "tflash",
    title: "T-Flash",
    category: "Full stack",
    eyebrow: "HACKTX 2025 / AUDIO NEWS",
    color: "blue",
    image: "/t_flash.png",
    summary:
      "An AI audio news companion that finds headlines, summarizes them, and turns them into narration.",
    tags: ["n8n", "Gemini", "ElevenLabs", "Next.js"],
    context: "HackTX 2025",
    approach: [
      "Automated news retrieval and summarization through an n8n pipeline.",
      "Used Gemini for summaries and ElevenLabs for text-to-speech.",
      "Connected the workflow to a Flutter iOS experience with Supabase and NewsAPI.",
    ],
    outcome: "A voice-first way to catch up on news.",
    github: "https://github.com/Rizsaurav/T-Flash",
  },
  {
    id: "fruit",
    title: "MediaPipe Fruit Catcher",
    category: "Experiments",
    eyebrow: "INTERACTIVE COMPUTER VISION",
    color: "lime",
    image: "/fruit_catcher.png",
    summary:
      "A webcam game that turns hand movement into a basket for catching falling fruit.",
    tags: ["Python", "MediaPipe", "OpenCV"],
    context: "Computer vision experiment",
    approach: [
      "Used the MediaPipe Holistic model to detect wrists in real time.",
      "Mapped wrist positions to a dynamic basket.",
      "Added falling-fruit physics and particle effects with OpenCV.",
    ],
    outcome: "A playful application of real-time body tracking.",
    github:
      "https://github.com/aditya-baniya-ai/Fruit_catcher_using_mediapipe_computer_vision",
  },
  {
    id: "automation",
    title: "Job Search Automation",
    category: "AI & vision",
    eyebrow: "AI WORKFLOWS / AUTOMATION",
    color: "purple",
    image: "/n8n_workflow.png",
    summary:
      "A connected workflow for finding roles, ranking matches, and preparing tailored application materials.",
    tags: ["n8n", "Gemini", "Python", "Docker"],
    context: "Personal automation project",
    approach: [
      "Collected and ranked job postings from multiple sources.",
      "Used Gemini to tailor resumes and prepare cover letters.",
      "Generated PDFs through Gotenberg and stored them in Google Drive, with application tracking in Google Sheets.",
    ],
    outcome:
      "Connected research, document preparation, and tracking in a single workflow.",
  },
  {
    id: "seremo",
    title: "Seremo",
    category: "Full stack",
    eyebrow: "AITX 2024 / COMMUNITY PLATFORM",
    color: "coral",
    image: "/seremo.png",
    summary:
      "A platform connecting Hindus abroad with priests for ceremonies and religious guidance.",
    tags: ["Flask", "Next.js", "LLaMA API", "Docker"],
    context: "AITX Hackathon · 2024",
    approach: [
      "Built a full-stack ceremonial booking platform with secure role-based access.",
      "Integrated a religious guidance chatbot with Meta’s LLaMA API.",
      "Added real-time video calls for virtual ceremonies.",
    ],
    outcome:
      "Combined ceremony coordination and remote connection in one application.",
    github: "https://github.com/aditya-baniya-ai/hackathon_aitx",
  },
  {
    id: "spam",
    title: "Spam Detection System",
    category: "AI & vision",
    eyebrow: "BOKOHACKS 2024 / APPLIED ML",
    color: "blue",
    image: "/spam_message.png",
    summary:
      "An interactive spam classifier with machine learning and conversational analysis.",
    tags: ["Flask", "React", "Scikit-learn", "OpenAI API"],
    context: "BokoHacks · 2024",
    approach: [
      "Cleaned training data with Pandas and NLTK, then trained a Scikit-learn classifier.",
      "Served predictions through a Flask API to a React frontend.",
      "Integrated ChatGPT for conversational analysis.",
    ],
    outcome:
      "Made a trained classifier accessible through an interactive web application.",
    github: "https://github.com/aditya-baniya-ai/scam_msg_classifier_hackathon",
  },
  {
    id: "netflix",
    title: "Netflix Interface Study",
    category: "Experiments",
    eyebrow: "FRONTEND / INTERFACE DESIGN",
    color: "purple",
    image: "/netflix.png",
    summary:
      "A responsive Netflix interface replica built with the fundamentals of the web.",
    tags: ["HTML", "CSS", "JavaScript"],
    context: "Frontend learning project",
    approach: [
      "Recreated a familiar streaming interface with vanilla HTML, CSS, and JavaScript.",
      "Built responsive layouts and hover interactions.",
    ],
    outcome: "An exercise in visual fidelity, layout, and interaction design.",
    github: "https://github.com/aditya-baniya-ai/netflix_clone",
    demo: "https://adeanetfli.netlify.app/",
  },
  {
    id: "drums",
    title: "Interactive Drum Kit",
    category: "Experiments",
    eyebrow: "WEB AUDIO / CREATIVE CODING",
    color: "lime",
    image: "/drum.png",
    summary: "A browser drum kit you can play with clicks or your keyboard.",
    tags: ["JavaScript", "Web Audio", "CSS"],
    context: "Creative coding experiment",
    approach: [
      "Mapped keyboard and click interactions to drum sounds.",
      "Added responsive audio playback and visual feedback.",
    ],
    outcome: "An accessible entry point into browser audio and interactive UI.",
    github: "https://github.com/aditya-baniya-ai/drum",
  },
];

export const skills = [
  {
    title: "AI, vision & edge",
    number: "01",
    description: "From training data to real-time inference.",
    items: [
      "PyTorch",
      "YOLOv8",
      "TensorRT",
      "ONNX Runtime",
      "OpenCV",
      "MediaPipe",
      "Transformers",
      "Jetson AGX Orin",
      "Isaac Sim",
      "NumPy",
      "Pandas",
      "Scikit-learn",
    ],
  },
  {
    title: "Software & systems",
    number: "02",
    description: "The applications around the intelligence.",
    items: [
      "Python",
      "C++",
      "Java",
      "TypeScript",
      "SQL",
      "React",
      "Next.js",
      "FastAPI",
      "Flask",
      "REST APIs",
      "WebRTC",
      "LiveKit",
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "UI/UX",
      "System design",
    ],
  },
  {
    title: "Data, APIs & delivery",
    number: "03",
    description: "Connecting, testing, and shipping the whole system.",
    items: [
      "MySQL",
      "SQLite",
      "Firebase",
      "RAG",
      "OpenAI APIs",
      "Llama APIs",
      "Git",
      "Docker",
      "Linux",
      "AWS",
      "CI/CD",
      "n8n",
      "Netlify",
      "Heroku",
      "Vercel",
    ],
  },
];

export const experiences = [
  {
    role: "Undergraduate Research Assistant",
    org: "Texas State University · Ingram School of Engineering",
    date: "Sep 2024 — Present",
    label: "HUMAN DIGITAL TWIN & COMPUTER VISION",
    bullets: [
      "Built a real-time MediaPipe pipeline to identify hazardous factory actions and trigger voice alerts for visually impaired workers; deployed at a San Antonio facility.",
      "Optimized CBAM-enhanced YOLOv8 for PPE detection on Jetson AGX Orin with TensorRT.",
      "Improved action recognition accuracy by 10% on industrial footage with YOLOv8, MediaPipe, and a TimeSformer trained on Assembly101.",
      "Research also includes worker fatigue detection and automated MOST analysis.",
    ],
    link: "https://chips.engineering.txst.edu/",
  },
  {
    role: "Tech Lead · MOSTify",
    org: "BobCatalyst Innovation Accelerator · Texas State University",
    date: "Sep 2024 — Present",
    label: "COMPUTER VISION STARTUP",
    bullets: [
      "Led the computer vision pipeline from dataset collection through training, optimization, and deployment.",
      "Reduced 3–5 days of manual time-study analysis to 1–2 hours of semi-automated work.",
      "Conducted 40+ customer discovery interviews; supported by a $5,000 BIAP II grant.",
    ],
  },
  {
    role: "Student Assistant",
    org: "Computer Science Department · Texas State University",
    date: "2024",
    label: "TEACHING & ACADEMIC SUPPORT",
    bullets: [
      "Supported students in C++ programming, data structures, and object-oriented programming.",
      "Proctored exams, graded assignments, and led review sessions.",
    ],
    link: "https://cs.txst.edu/",
  },
  {
    role: "Software Development Intern",
    org: "Orgware Construct Pvt. Ltd. · Nepal",
    date: "Apr 2023 — Dec 2023",
    label: "FULL-STACK ENGINEERING",
    bullets: [
      "Built a Flask and React support platform connecting rural businesses, schools, and offices with IT teams; average issue resolution took under 20 minutes.",
      "Redesigned the MySQL schema and slow queries to support 100 concurrent users without performance degradation.",
      "Wrote backend unit and integration tests, collaborated through pull requests, and helped deploy and monitor the application on Linux.",
    ],
    link: "https://www.linkedin.com/company/orgware-construct/",
  },
];

export const awards = [
  ["BIAP II grant", "MOSTify", "$5,000"],
  ["Quanta Fellowship", "Undergraduate research", "$3,500"],
  ["Makerspace Digital Twin grant", "Makerspace Sentinel", "$3,000"],
  ["Best Use of FAL API · 1st prize", "ReelStudio", "$1,000"],
  [
    "Bobcat Innovation Challenge · 1st place",
    "Computer vision time studies",
    "$500",
  ],
];
