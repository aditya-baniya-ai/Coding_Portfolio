import type { Project } from "../project-types";

const base = "/projects/robo";

export const robo: Project = {
  id: "robo",
  title: "Robo, the Makerspace Greeter",
  category: "Robotics",
  color: "blue",
  eyebrow: "ROBOTICS / EMBODIED AI",
  summary:
    "A table robot arm that sees people, greets them with gestures and a voice, listens, talks back, and plays hand-controlled arcade games, all running locally on an NVIDIA Jetson.",
  did: "Turned a ROBOTIS OpenMANIPULATOR-X arm into the Ingram Hall Makerspace’s greeter: it waves at visitors, holds spoken conversations, and runs three games controlled by your hand.",
  how: "ROS 2 Humble on a Jetson Orin NX, YOLO and YOLO-World for vision, Whisper for hearing, a local Llama 3.2 3B for thinking, Piper for speech, and MediaPipe hand tracking for the games.",
  tags: ["ROS 2", "Jetson Orin NX", "YOLO-World", "Whisper", "Ollama", "MediaPipe"],
  metric: "15.8 → 6.6 s",
  metricLabel: "time to first words",
  period: "Makerspace · 2026",
  context: "Ingram Hall Makerspace · Texas State University · 2026",
  github: "https://github.com/PawPrintStudio/Open_manipulator_x",
  facts: [
    { label: "Where", value: "Ingram Hall Makerspace, Texas State" },
    { label: "When", value: "2026" },
    { label: "Hardware", value: "OpenMANIPULATOR-X + Jetson Orin NX 16GB" },
    { label: "Status", value: "Core features working; voice and panel under test" },
  ],
  metrics: [
    { value: "On-device", label: "vision, hearing, language model and voice all run on the Jetson" },
    { value: "15.8 → 6.6 s", label: "time to first spoken words after pausing detection during conversation" },
    { value: "3", label: "hand-controlled games: Puppet Master, Ball Carry and Chocolate Catcher" },
    { value: "11.5 tok/s", label: "local LLM speed on the Jetson when it has the GPU to itself" },
  ],
  media: [
    {
      type: "image",
      src: `${base}/cover.jpg`,
      alt: "Robo’s black robot arm beside a monitor showing the Chocolate Catcher game, with a basket and a box of chocolates on the table",
      caption: "Robo and the Chocolate Catcher game at the Makerspace",
    },
    {
      type: "video",
      src: `${base}/chocolate-catcher.mp4`,
      poster: `${base}/chocolate-catcher-poster.jpg`,
      title: "Students playing Chocolate Catcher with Robo",
    },
    {
      type: "image",
      src: `${base}/chocolate-catcher-1.jpg`,
      alt: "Students gathered around a monitor playing the Chocolate Catcher claw game, with the robot arm on the table in front of it",
      caption: "Chocolate Catcher at the Makerspace: your hand steers the claw",
    },
    {
      type: "image",
      src: `${base}/chocolate-catcher-3.jpg`,
      alt: "A student holding up an open hand toward the camera to control the robot arm",
      caption: "An open hand opens the claw",
    },
    {
      type: "image",
      src: `${base}/chocolate-catcher-2.jpg`,
      alt: "Two students laughing as they play the game next to the robot arm and a box of chocolates",
      caption: "Lives, a 10-second timer and a basket make it a real game",
    },
    {
      type: "image",
      src: `${base}/group-visit.jpg`,
      alt: "A group of students posing together in the makerspace lab next to a humanoid robot",
      caption: "A school group visiting the Makerspace",
    },
    {
      type: "image",
      src: `${base}/humanoid.jpg`,
      alt: "A person standing beside a humanoid robot with a glowing visor in the makerspace lab",
      caption: "A humanoid robot in the makerspace lab",
    },
  ],
  sections: [
    {
      id: "overview",
      title: "What Robo is",
      paragraphs: [
        "Robo is a table robot built from a ROBOTIS OpenMANIPULATOR-X arm and an NVIDIA Jetson Orin NX 16GB running ROS 2 Humble. The goal: it sees people with a camera, greets them with gestures and voice, listens to commands, and picks up small objects like a pencil.",
        "It lives at the Ingram Hall Makerspace at Texas State University, and the control panel is styled in Texas State maroon and gold. Everything (vision, hearing, language model and voice) runs on the Jetson itself.",
      ],
    },
    {
      id: "what-it-does",
      title: "What it can do",
      bullets: [
        { lead: "Gestures", text: "wave, nod, shake, bow and look around, plus your own moves: record them in simulation and replay them on the real arm." },
        { lead: "Sees people and objects", text: "YOLO and YOLO-World on the Jetson GPU run live from a Logitech BRIO. Robo waves automatically when someone steps into view, and greets each person once." },
        { lead: "Listens", text: "Whisper on the GPU turns speech into text, for voice commands like “wave” or “go home”." },
        { lead: "Talks", text: "a local Llama 3.2 3B (via Ollama) decides what to say and which gesture to use, and Piper speaks through a USB speaker. Robo only talks about robotics, itself, Texas State and the Makerspace, and politely declines anything else." },
        { lead: "Control panel", text: "one window with gestures, joints, gripper, recording, live video with detection boxes, talking with Robo and the games." },
      ],
    },
    {
      id: "games",
      title: "The arcade games",
      paragraphs: [
        "A camera on a stand tracks the player’s hand with MediaPipe, and Robo’s arm follows it, so anyone can try robotics just by raising a hand.",
      ],
      steps: [
        {
          title: "Puppet Master",
          text: "Your hand controls Robo’s gripper and a fist whacks. Target stickers light up on the table; whack them before the timer runs out, avoid the red ones, and build combos. A 60-second round, with ranks from C to S and a leaderboard.",
        },
        {
          title: "Ball Carry",
          text: "Carry the balls across the table with the claw; the fastest time wins.",
        },
        {
          title: "Chocolate Catcher",
          text: "A claw machine with Robo as the claw. Move your hand to steer, make a fist to grab, and open your hand over the basket to win the chocolate. Five lives shown as hearts, a 10-second carry timer, and a 2-minute game, with sound effects generated in code.",
        },
      ],
      note: "The safety rules are in the code: the arm only moves inside the play area, never faster than 1.5 rad/s, never below the touch height, and it holds still when it loses sight of the hand.",
    },
    {
      id: "engineering",
      title: "Engineering notes",
      paragraphs: [
        "The control stack is layered: gesture and game code send joint angles over a ROS 2 action, an arm controller turns them into a smooth path, the Dynamixel hardware interface sends servo commands over USB to the OpenCR board, and the servos report their angles back as joint states.",
      ],
      bullets: [
        {
          lead: "A shared GPU is a budget",
          text: "YOLO checking 30 frames a second slowed the LLM and Whisper about 3.5× (11.5 tok/s alone, 3.3 with everything running). Pausing detection while Robo talks cut the wait for first words from 15.8 s to 6.6 s.",
        },
        {
          lead: "Faster turn-taking",
          text: "Whisper starts transcribing the moment you pause and discards the work if you keep talking; Robo decides you’ve finished after 0.8 s of quiet; and every answer begins with a very short sentence so speech starts almost as soon as the LLM does.",
        },
        {
          lead: "Calmer servos",
          text: "the default base-servo gains made the arm jitter about ±0.3° while holding a pose. Gentler P/I/D settings, sent at every launch, fixed it without changing the servo permanently.",
        },
        {
          lead: "Reproducible setup",
          text: "the README walks through the whole Jetson setup, including pinned Python versions so ROS 2 Humble, NumPy and OpenCV keep working together.",
        },
      ],
    },
    {
      id: "status",
      title: "Where it stands",
      checklist: [
        { text: "Arm control, gestures, recorded moves, gripper and the button panel", done: true },
        { text: "Camera, live YOLO / YOLO-World detection and automatic greeting", done: true },
        { text: "Speech to text, text to speech and a local LLM", done: true },
        { text: "Voice commands and talking with the arm attached", done: false },
        { text: "One-command launch with the full voice-enabled panel", done: false },
        { text: "Saying hello while it greets, and picking objects up", done: false },
      ],
      note: "Unchecked items are written but still being tested on the real arm.",
    },
  ],
  builtWith: [
    "ROS 2 Humble",
    "Python",
    "NVIDIA Jetson Orin NX",
    "OpenMANIPULATOR-X",
    "Dynamixel",
    "YOLO",
    "YOLO-World",
    "MediaPipe",
    "Whisper",
    "Ollama",
    "Llama 3.2",
    "Piper TTS",
    "OpenCV",
    "PyTorch",
  ],
};
