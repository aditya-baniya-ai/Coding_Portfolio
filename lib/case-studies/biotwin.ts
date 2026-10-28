import { devpostImages, type MediaItem, type Project } from "../project-types";

const diagram = (file: string, alt: string): MediaItem => ({
  type: "image",
  src: `https://raw.githubusercontent.com/HackRice2026/BioTwin/main/docs/screenshots/${file}`,
  alt,
  caption: alt,
});

export const biotwin: Project = {
  id: "biotwin",
  title: "BioTwin",
  category: "AI & vision",
  hackathon: true,
  featured: true,
  color: "purple",
  eyebrow: "HACKRICE 16 / HEALTH AI",
  summary:
    "A voice-enabled 3D digital twin of your body. Your watch tells you what happened; BioTwin tells you what it means, forecasts your recovery, and helps plan your day around it.",
  did: "Built a talking health twin: import wearable data, see it on an animated 3D avatar and live charts, ask questions out loud, and book recovery or workout time on your calendar.",
  how: "React + Three.js front end, FastAPI + MATLAB modelling back end, Gemini answers grounded in computed context and validated before display, and ElevenLabs speech synced to the avatar.",
  tags: ["React", "Three.js", "FastAPI", "MATLAB", "Gemini", "ElevenLabs"],
  metric: "1.92 MAE",
  metricLabel: "1-hour forecast vs 2.35 baseline",
  period: "Sep 2026",
  context: "HackRice 16 · September 2026",
  github: "https://github.com/HackRice2026/BioTwin",
  devpost: "https://devpost.com/software/biotwin-1jwpxt",
  facts: [
    { label: "Event", value: "HackRice 16" },
    { label: "When", value: "September 2026" },
    { label: "Team", value: "Team build" },
    { label: "Status", value: "Working prototype" },
  ],
  metrics: [
    { value: "2.35 → 1.92", label: "1-hour Body Battery forecast error (MAE), baseline vs boosted trees" },
    { value: "~111 s", label: "personal heart-rate recovery constant fitted from real Garmin data" },
    { value: "4 × 4", label: "forecast horizons × model families compared" },
    { value: "PWA", label: "installable, with desktop and mobile layouts" },
  ],
  media: [
    {
      type: "image",
      src: "/projects/biotwin/cover.jpg",
      alt: "BioTwin overview: an animated digital twin avatar with voice input, the headline “Beyond Numbers”, and a Body Battery reading",
      caption: "The BioTwin overview: your digital twin, ready to talk",
    },
    { type: "youtube", id: "NDVqUmvhcm8", title: "bioTwin | Hack Rice 16 demo video" },
    { type: "youtube", id: "T8H4S3MSeT4", title: "BioTwin demo walkthrough" },
    ...devpostImages("BioTwin", [
      "005/308/177",
      "005/308/178",
      "005/308/179",
      "005/308/180",
      "005/308/181",
      "005/308/182",
      "005/308/183",
      "005/308/184",
      "005/308/185",
      "005/308/186",
      "005/308/194",
    ]),
    diagram("fitted-model.png", "Diagram: from your watch to a fitted model"),
    diagram("live-system.png", "Diagram: the live system, from watch to voice"),
  ],
  sections: [
    {
      id: "problem",
      title: "The problem",
      paragraphs: [
        "Wearables collect an enormous amount of health data, but most people are left staring at disconnected numbers: heart rate, HRV, sleep stages, stress, respiration and Body Battery. The problem is not a lack of data. It is a lack of understanding.",
        "Instead of another dashboard that reports what a watch measured, we wanted a physiological digital twin that learns one person’s patterns, forecasts their near-term recovery, and explains what the data means through natural conversation.",
      ],
      note: "Your watch tells you what happened. BioTwin tells you what it means.",
    },
    {
      id: "what-it-does",
      title: "What it does",
      bullets: [
        "Imports Garmin FIT and supported health-data exports, and receives supported live heart-rate broadcasts over Bluetooth.",
        "Visualizes heart rate, HRV, sleep, respiration, activity and recovery on an animated 3D avatar and live charts.",
        "Learns a personalized baseline instead of relying only on population averages.",
        "Forecasts Garmin Body Battery at several horizons and fits a personalized heart-rate recovery curve after activity.",
        "Answers spoken or typed questions from the user’s computed physiological context, speaks naturally through ElevenLabs, and syncs captions and avatar behavior to the audio.",
        "Explores clearly labeled rest, light-activity and exercise scenarios, and suggests calendar-feasible recovery or workout periods. Google Calendar events require explicit confirmation.",
      ],
      closing: [
        "Ask about a specific topic like heart rate or sleep and the relevant visualization opens while the twin explains the result. BioTwin is a wellness and experimentation platform, not a medical diagnostic system; forecasts and simulations are labeled honestly and kept separate from what Garmin measured.",
      ],
    },
    {
      id: "how-we-built-it",
      title: "How we built it",
      bullets: [
        {
          lead: "Front end",
          text: "React, TypeScript, Three.js, React Three Fiber and Recharts: an avatar, responsive desktop and mobile layouts, live charts, synchronized captions and installable PWA support.",
        },
        {
          lead: "Back end",
          text: "MATLAB, Python and FastAPI. Measurements are normalized into a shared format, stored with account and source provenance, and processed into personalized baselines, readiness states, forecasts and recovery curves. Authenticated WebSockets deliver live updates without polling.",
        },
        {
          lead: "Grounded conversation",
          text: "Gemini on Vertex AI receives a structured snapshot of computed health context rather than raw application data. BioTwin validates numerical claims and evidence references before showing an answer, and falls back to grounded text instead of inventing one.",
        },
        {
          lead: "Voice",
          text: "ElevenLabs turns each validated response into speech. Timestamped alignment is matched against the browser’s real audio position so captions, speaking indicators and avatar behavior stay in sync.",
        },
      ],
    },
    {
      id: "matlab",
      title: "How MATLAB shaped the models",
      paragraphs: [
        "MATLAB is BioTwin’s modelling and validation layer: where we tested whether the predictions meant anything. We broke real Garmin Venu 2 history into synchronized five-minute windows (Body Battery, recent change, heart rate, stress, sleep context, respiration, activity, time of day) and, before any machine learning, built strong baselines: persistence, trend extrapolation, time-of-day behaviour, a combined trend-and-clock rule and a daily mean. Any trained model had to beat those.",
        "We then compared Ridge Regression, Bagged Trees, Boosted Trees (LSBoost) and Gaussian Process Regression at four horizons. Because nearby five-minute windows are highly correlated, evaluation was grouped by calendar day rather than treating every row as independent.",
      ],
      table: {
        caption: "Body Battery forecast error (MAE), lower is better",
        head: ["Horizon", "Best simple rule", "Best trained model"],
        rows: [
          ["30 minutes", "1.21 (trend)", "0.84 (Gaussian process)"],
          ["1 hour", "2.35 (trend)", "≈1.92 (boosted trees)"],
          ["3 hours", "5.20 (trend + clock)", "4.84 (bagged trees)"],
          ["6 hours", "Time-of-day rule wins", "No trained model beat it"],
        ],
      },
      bullets: [
        {
          lead: "Nonlinear matters at 3 hours",
          text: "a linear Ridge model on the same inputs did not beat the baseline there; only the tree ensemble did.",
        },
        {
          lead: "Reported honestly at 6 hours",
          text: "the simple rule still won, and we kept that result instead of dressing up a weaker model.",
        },
        {
          lead: "Personal recovery curve",
          text: "HR(t) = HR∞ + A·e^(−t/τ) gave τ ≈ 111 s from the user’s own post-exercise data. Our first fit forced the asymptote toward resting heart rate and inflated τ; letting the asymptote be estimated from the recovery segment stabilized the fit.",
        },
        {
          lead: "In production",
          text: "a lightweight Ridge model evaluated by the FastAPI backend predicts Body Battery about one hour ahead at roughly 1.91 validation MAE, and refuses to forecast if the latest reading is stale.",
        },
      ],
    },
    {
      id: "learned",
      title: "What we learned",
      bullets: [
        "Sophisticated machine learning is not automatically better than a simple, well-designed baseline. Time of day stayed extremely hard to beat at long horizons.",
        "Generative AI is much more trustworthy behind a structured evidence boundary: Gemini explains, while BioTwin’s models remain responsible for the numbers.",
        "Voice is more compelling when connected to the whole interface: captions, state, animation and data respond together.",
        "A digital twin doesn’t need to pretend to be clinically authoritative to be useful.",
      ],
    },
    {
      id: "next",
      title: "What’s next",
      bullets: [
        "Validate the forecasts on longer histories and more participants, and evaluate the sealed test set.",
        "Expand supported wearable integrations and add continuous model recalibration.",
        "Native mobile sensor integrations, stronger uncertainty estimates and privacy-preserving learning across users.",
      ],
    },
  ],
  builtWith: [
    "React",
    "TypeScript",
    "Three.js",
    "Vite",
    "FastAPI",
    "Python",
    "MATLAB",
    "NumPy",
    "SciPy",
    "SQLAlchemy",
    "PostgreSQL",
    "SQLite",
    "WebSockets",
    "Docker",
    "Gemini",
    "Vertex AI",
    "ElevenLabs",
    "Garmin",
  ],
};
