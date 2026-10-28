import type { Project } from "../project-types";

export const autoChess: Project = {
  id: "auto-chess",
  title: "Auto-chess",
  category: "Robotics",
  featured: true,
  color: "purple",
  art: "chess",
  eyebrow: "ROBOTICS / GAME AI",
  summary:
    "A chess-playing robot arm, hanging upside down over a real board. A camera watches, Stockfish picks the moves, and the arm moves the pieces.",
  did: "Built the chess core, the touch-screen game and the arm motion for a robot that plays you, or itself, on a real wooden board.",
  how: "Stockfish with four difficulty levels and python-chess, a Tkinter game screen, and custom kinematics and safety checks that drive an OpenMANIPULATOR-X through ROS 2 on a Jetson Orin NX.",
  tags: ["Python", "Stockfish", "ROS 2", "Jetson Orin NX", "Kinematics"],
  metric: "4 levels",
  metricLabel: "Beginner to Hard",
  period: "Oct 2026 · ongoing",
  date: "2026-10-20",
  context: "Ingram Hall Makerspace · Texas State University · October 2026 · In progress",
  github: "https://github.com/PawPrintStudio/Auto-chess",
  facts: [
    { label: "Where", value: "Ingram Hall Makerspace, Texas State" },
    { label: "When", value: "October 2026" },
    { label: "Hardware", value: "OpenMANIPULATOR-X + Jetson Orin NX 16GB" },
    { label: "Status", value: "In progress: camera step next" },
  ],
  metrics: [
    { value: "430 mm", label: "mount height above the board, so the arm reaches every square" },
    { value: "±179°", label: "base rotation, more than the table-mounted arm’s ±160°" },
    { value: "2 modes", label: "robot vs robot, or you vs the robot with a leaderboard" },
    { value: "10–60 min", label: "chess clock presets per side, counting only the robot’s thinking time" },
  ],
  sections: [
    {
      id: "overview",
      title: "The idea",
      paragraphs: [
        "An OpenMANIPULATOR-X arm, hanging upside down above a real chess board and driven by an NVIDIA Jetson Orin NX with ROS 2 Humble, plays chess: a camera watches the board, Stockfish picks the moves, and the arm moves the pieces.",
        "It runs on the same Jetson and the same arm as Robo, the Ingram Hall Makerspace robot, so everything it inherits (hardware, setup, arm coordinates and safety rules) is written down in a handoff document.",
      ],
    },
    {
      id: "play",
      title: "Two ways to play",
      steps: [
        {
          title: "Robot vs robot",
          text: "The arm plays both White and Black, one move each, at a difficulty you pick for each side.",
        },
        {
          title: "Human vs robot",
          text: "A visitor types their name, picks a difficulty (Beginner, Easy, Medium or Hard), a time (10, 15, 30 or 60 minutes per side) and a colour, then plays the robot. Finished games are saved and the start screen shows a leaderboard of wins against the robot for each difficulty.",
        },
      ],
      note: "The robot’s clock only counts its thinking time, not the time the arm spends moving.",
    },
    {
      id: "engineering",
      title: "Why upside down, and how it stays safe",
      paragraphs: [
        "Standing on the table, the arm can’t reach the far rows of the board. Hanging 430 mm above the board centre from an aluminium-extrusion frame, it reaches every square with the gripper tilted up to 30°.",
      ],
      bullets: [
        {
          lead: "Geometry",
          text: "forward and inverse kinematics for the hanging arm, a “park” pose that folds it up under the beam, and checks that it stays clear of its mount plate and keeps its elbow above the gripper.",
        },
        {
          lead: "Safe motion",
          text: "joint moves that never dip over the board, straight lines up and down, and a fallback that searches for a chain of small one-joint moves when moving all joints together wouldn’t be safe.",
        },
        {
          lead: "Carrying height",
          text: "while carrying, the elbow and wrist stay above the tallest piece (the 80 mm king) plus 15 mm, measured from the board surface under the arm, so a board that isn’t quite level is fine.",
        },
        {
          lead: "Calibration",
          text: "touch the four corner squares with the fingertips and every other square is blended from them. Calibrating again after raising the arm straight up is a one-line command that shifts the saved calibration.",
        },
        {
          lead: "Real chess rules at the arm",
          text: "captures, castling, en passant and promotion each become arm steps, and each piece type is gripped at its own height. If the gripper closes on nothing twice, the arm puts the piece back, parks, and asks a human to finish the move so the game carries on.",
        },
        {
          lead: "Developed without the robot",
          text: "a pretend arm and pretend eyes let the whole thing run and be tested on a Mac, then be pulled onto the Jetson.",
        },
      ],
    },
    {
      id: "status",
      title: "Where it stands",
      checklist: [
        { text: "Chess core: Stockfish levels, clock and game loop", done: true },
        { text: "Screen: start screen, game screen, saved results and a leaderboard", done: true },
        { text: "Arm: park pose, calibration, pick and place, captures, castling, en passant, promotion", done: true },
        { text: "First test on the real arm", done: false },
        { text: "Camera: four-corner board calibration and spotting the human’s move by comparing the board before and after", done: false },
        { text: "Everything together on the Jetson, with launch and stop scripts", done: false },
      ],
      note: "Tested with a fake arm so far. The arm code is written but has not yet been run on the real hardware, which is the next milestone.",
    },
  ],
  builtWith: [
    "Python",
    "Stockfish",
    "python-chess",
    "Tkinter",
    "ROS 2 Humble",
    "NVIDIA Jetson Orin NX",
    "OpenMANIPULATOR-X",
    "pytest",
  ],
};
