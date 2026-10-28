import type { Project } from "../project-types";

const photo = "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/180/366/datas";

export const drivebot: Project = {
  id: "robot",
  title: "Autonomous DriveBot",
  category: "Robotics",
  hackathon: true,
  color: "purple",
  eyebrow: "ROBOTICS / REAL-TIME SYSTEMS",
  summary:
    "A LiveKit-powered robot car that enters unsafe zones, streams live audio and video, and lets you talk to it in real time. Built so remote doctors could assess patients faster and more safely.",
  did: "Built a Raspberry Pi robot car with two-way voice, live camera streaming, remote control, and autonomous navigation to objects it recognises, all driven from a web console.",
  how: "A LiveKit agent on the Pi, WebRTC for low-latency audio and video, a Next.js operator console, and OpenCV ArUco markers for distance estimation and navigation.",
  tags: ["LiveKit", "WebRTC", "OpenCV", "Next.js", "Raspberry Pi"],
  metric: "4 objects",
  metricLabel: "found by ArUco markers",
  period: "Jan 2026",
  context: "January 2026 · NexHacks at Carnegie Mellon University",
  github: "https://github.com/aditya-baniya-ai/robotic_car",
  devpost: "https://devpost.com/software/ai-smart",
  facts: [
    { label: "Event", value: "NexHacks · Carnegie Mellon University" },
    { label: "When", value: "January 2026" },
    { label: "Team", value: "Team build" },
    { label: "Status", value: "Working demo" },
  ],
  metrics: [
    { value: "2-way", label: "low-latency voice conversation with the robot" },
    { value: "4", label: "objects it finds on its own: a drink, a water bottle, a cube and a laptop" },
    { value: "3", label: "parts working together: Pi agent, LiveKit Cloud, web console" },
    { value: "WebRTC", label: "live camera and audio streamed straight to the browser" },
  ],
  media: [
    {
      type: "image",
      src: `${photo}/gallery.jpg`,
      full: `${photo}/original.JPG`,
      alt: "The Autonomous DriveBot, a small robot car with a camera, on a desk in front of two monitors",
      caption: "Our Autonomous DriveBot",
    },
    { type: "youtube", id: "fd6o90UWnfs", title: "AI Smart (Autonomous DriveBot) demo video" },
  ],
  sections: [
    {
      id: "inspiration",
      title: "Why we built it",
      paragraphs: [
        "AI Smart came from imagining where human-robot interaction is going: controlling sophisticated hardware should feel as natural as having a conversation. We wanted to show how real-time communication technology (LiveKit) could turn a Raspberry Pi robot car into an agent that sees, listens and responds to commands instantly.",
        "The challenge that drove us was combining autonomous navigation, computer vision and natural voice interaction in one system, on accessible hardware and modern web tools.",
      ],
    },
    {
      id: "what-it-does",
      title: "What it does",
      paragraphs: [
        "AI Smart is a LiveKit-powered robotic car with two-way, low-latency voice conversation and autonomous navigation, controlled through a web-based operator console.",
      ],
      steps: [
        {
          title: "Voice and visual interaction",
          text: "Talk to the robot naturally and get instant replies from a LiveKit agent. The Raspberry Pi streams its camera to the web UI with minimal latency, and an optional OpenAI vision step can have the robot describe what it sees.",
        },
        {
          title: "Remote control",
          text: "Drive forward, backward, left, right or stop. Pan, tilt and centre the camera, look left, right, up or down, and open or close the camera feed on demand.",
        },
        {
          title: "Autonomous navigation (demo mode)",
          text: "Using OpenCV, the robot detects ArUco markers, estimates distance, and navigates by itself to the object a marker identifies: a Monster drink (marker 0), a water bottle (marker 1), a cube (marker 2) or a laptop (marker 3).",
        },
      ],
    },
    {
      id: "how-we-built-it",
      title: "How we built it",
      paragraphs: ["The system is distributed across three main parts."],
      steps: [
        {
          title: "Raspberry Pi agent",
          text: "The LiveKit Agents runtime orchestrates room connections and real-time communication. Python scripts drive the PiCar-X motors, Picamera2 feeds LiveKit video tracks, and demo mode adds ArUco detection with OpenCV and autonomous navigation.",
        },
        {
          title: "LiveKit Cloud",
          text: "Room and session orchestration, WebRTC audio and video streaming, and data channels that carry commands (topic: car-control), on scalable cloud infrastructure.",
        },
        {
          title: "Web console",
          text: "A Next.js and React control console using the LiveKit JavaScript SDK, with token-based authentication through a connection-details endpoint and a responsive UI that renders live video next to the command controls.",
        },
      ],
      bullets: [
        { lead: "Back end", text: "Python 3 with the LiveKit Agents SDK, Picamera2, OpenCV for computer vision and ArUco detection, NumPy for distance estimation, and the OpenAI API (optional) for vision descriptions." },
        { lead: "Front end", text: "Next.js, the LiveKit client SDK, modern web media APIs, and pnpm." },
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      bullets: [
        { lead: "Real-time complexity", text: "keeping audio, video and data channels in sync while holding latency low took careful orchestration." },
        { lead: "Raspberry Pi limits", text: "camera processing, OpenCV and motor control all compete for a small CPU." },
        { lead: "Smooth autonomous navigation", text: "path planning that goes to a marker without oscillating." },
      ],
    },
    {
      id: "proud-of",
      title: "What we’re proud of",
      bullets: [
        "Genuinely low-latency two-way voice: talking to the robot feels natural and immediate.",
        "A working autonomous navigation system that identifies objects and drives to them on its own.",
        "A polished, intuitive web console that makes controlling a robot feel accessible.",
      ],
    },
    {
      id: "learned",
      title: "What we learned",
      bullets: [
        "A deep understanding of WebRTC and how to use it for robotics.",
        "How to drive Raspberry Pi GPIO and motor controllers from Python.",
        "Managing several hardware peripherals (camera, motors, servos) at once.",
      ],
    },
    {
      id: "next",
      title: "What’s next",
      bullets: [
        { lead: "SLAM", text: "map and localise indoors without needing markers." },
        { lead: "Advanced path planning", text: "obstacle avoidance and dynamic re-routing." },
        { lead: "Natural language", text: "understand complex, multi-step commands." },
        { lead: "Emotion detection", text: "read vocal tone and adapt the robot’s behaviour." },
      ],
    },
  ],
  builtWith: [
    "LiveKit",
    "WebRTC",
    "Python",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "OpenCV",
    "NumPy",
    "OpenAI API",
    "Raspberry Pi",
    "PiCar-X",
  ],
};
