import { devpostImages, type Project } from "../project-types";

export const ingather: Project = {
  id: "ingather",
  title: "InGather",
  category: "Full stack",
  hackathon: true,
  featured: true,
  color: "coral",
  eyebrow: "HACKTX 2026 / SOCIAL AI",
  summary:
    "A privacy-first app that turns “I wish I had someone to do this with” into a small, real meetup. AI does the awkward coordination; humans approve every step.",
  did: "Built an Instagram-style meetup planner: describe a plan in plain words, get matched with compatible people, vote on real nearby places, then chat.",
  how: "A gradient-boosted matcher trained on 300k real Meetup.com join decisions picks people, Meta’s Muse models handle intake, venues and photos, and a FastAPI policy layer enforces every privacy rule.",
  tags: ["React + Vite", "FastAPI", "Gradient-boosted trees", "Muse Spark", "PostgreSQL"],
  metric: "72%",
  metricLabel: "top-5 match precision",
  period: "Oct 2026",
  date: "2026-10-25",
  context: "HackTX 2026 · Meta track · October 2026",
  github: "https://github.com/aditya-baniya-ai/InGather",
  devpost: "https://devpost.com/software/ingather",
  facts: [
    { label: "Event", value: "HackTX 2026 · Meta track" },
    { label: "When", value: "October 2026" },
    { label: "Team", value: "Team build" },
    { label: "Status", value: "Working end-to-end demo" },
  ],
  metrics: [
    { value: "72%", label: "top-5 picks who really joined, vs 62% for counting shared interests" },
    { value: "300k", label: "real join decisions the matcher was trained on" },
    { value: "186", label: "backend tests that try to break our own privacy rules" },
    { value: "~1 s", label: "per search, with no AI tokens spent on matching" },
  ],
  media: [
    { type: "youtube", id: "iuFTTQOmCwA", title: "InGather demo video" },
    ...devpostImages("InGather", [
      "005/686/887",
      "005/686/878",
      "005/686/879",
      "005/686/885",
      "005/686/886",
      "005/686/882",
      "005/686/881",
      "005/686/883",
      "005/686/884",
      "005/686/888",
      "005/686/889",
      "005/686/880",
      "005/687/101",
      "005/687/102",
    ]),
  ],
  sections: [
    {
      id: "inspiration",
      title: "The problem",
      paragraphs: [
        "It started at HackTX. One of us came looking for teammates and had a hard time finding any. We posted in the Discord and the team-finding channels and nobody replied. In the end the only option was walking up to people one by one and asking, “Are you already on a team?”",
        "Starting a conversation with a stranger is awkward, and most people are in the same position, so everyone waits for someone else to go first. The problem is not a lack of people. It is that first step: finding the right people and breaking the ice without putting yourself out there to everyone.",
        "We also didn’t want the usual fix of posting your plans and schedule publicly, because that is a real privacy risk. So we asked: what if AI did the awkward part, finding people who share your plans and organizing the meetup, while everyone stays in control of who they meet?",
      ],
      note: "Less scrolling. More together.",
    },
    {
      id: "what-it-does",
      title: "What it does",
      steps: [
        {
          title: "Describe your plan in plain words",
          text: "Type or say “I’m at HackTX this weekend, free after 6, looking for 2–3 people to grab tacos and talk about AI.” Muse Spark fills in city, dates, free times, interests and group size. Nothing is saved until you check it.",
        },
        {
          title: "Choose how to find people",
          text: "Public plans appear on the Home feed so people with similar interests can ask to join, and you accept or decline each request. Private plans are invisible; the matcher suggests people to reach out to, each with a short reason.",
        },
        {
          title: "Stay in control",
          text: "Nobody is invited until you approve them and nobody joins without saying yes. Passing on someone is private. If someone declines, InGather finds a replacement and asks before inviting anyone new.",
        },
        {
          title: "Pick a place together",
          text: "InGather finds the midpoint of everyone’s rough areas and Muse Spark searches the web for three real public places nearby, like a café or a library. Everyone votes and the most-voted place wins.",
        },
        {
          title: "Meet up",
          text: "Once everyone confirms the time and place, a private group chat opens with an icebreaker based on what the group has in common, and the meetup goes on your calendar in one tap.",
        },
      ],
      closing: [
        "The details that make it feel like a real social app: an Instagram-style home feed with realistic photos of each activity, profiles with optional details hidden unless you share them, shuffle-or-upload avatars, blocking and reporting, and the option to remove any plan, group or chat.",
      ],
    },
    {
      id: "how-we-built-it",
      title: "How we built it",
      paragraphs: [
        "Matching people uses our own ML model, not a chatbot. We trained gradient-boosted trees over 11 pair features (shared interests, similarity in a learned interest space, same activity, free-time overlap and more) on the public Meetup.com dataset: 1.78 million members and 10.6 million group memberships.",
        "Interests are embedded with vectors learned from 1.76 million real members’ topic lists, so “AI” and “machine learning” count as close while “AI” and “knitting” don’t. The fit part is trained on about 300,000 real join decisions.",
      ],
      table: {
        caption: "Held-out groups the model had never seen",
        head: ["Approach", "AUC", "Top-5 picks who really joined"],
        rows: [
          ["Hand-written rule (count shared interests)", "0.57", "62%"],
          ["InGather matcher", "0.67", "72%"],
        ],
      },
      bullets: [
        {
          lead: "Muse Spark 1.3",
          text: "an intake agent that turns a sentence into a full plan, a venue agent that uses web search to find real public places, a scene agent that briefs a photo of each group’s activity, plus icebreakers, join-request notes and welcome messages.",
        },
        {
          lead: "Muse Image and Muse Voice Transcribe",
          text: "realistic cover photos for every plan and group, and speaking your plan instead of typing it.",
        },
        {
          lead: "The math the backend checks",
          text: "a group can only meet if everyone has some free time in common: A₁ ∩ A₂ ∩ … ∩ Aₙ ≠ ∅. The server checks this, not a model, so the AI can never invent a time that doesn’t work.",
        },
        {
          lead: "Privacy by design",
          text: "one backend policy service decides who can see what, and anyone outside a plan gets the same “not found” response. Uploaded photos are stripped of hidden data like GPS. Profile details are opt-in and never sent to AI.",
        },
        {
          lead: "Stack",
          text: "React, Vite and Tailwind on the front end; FastAPI, SQLAlchemy and Postgres on the back end; one Docker container; Supabase for auth. The demo ships with 1,000 fictional Austin residents so you can try the whole flow.",
        },
      ],
      note: "We built it with Claude Code as a team of AI “engineers” plus a reviewer agent that approved or rejected each piece of work.",
    },
    {
      id: "challenges",
      title: "Challenges",
      bullets: [
        {
          lead: "Deciding where AI should help, and where it shouldn’t",
          text: "a trained model picks people, Muse Spark handles language and web research, and a human approves every step that involves another person. The backend enforces the rules no matter what any model says.",
        },
        {
          lead: "Privacy versus usefulness",
          text: "a fair meeting spot needs roughly where people are, without revealing anyone’s location. We round everyone’s area to about 1 km, share only the group’s midpoint, and never show coordinates.",
        },
        {
          lead: "Making AI output trustworthy",
          text: "early on the AI drafted free times outside the plan’s dates, generated photos showing messy apartments instead of public places, and venue search couldn’t prove where a place came from. We added server-side checks for each, and venues are labeled “Verified via search” only when that’s true.",
        },
      ],
    },
    {
      id: "proud-of",
      title: "What we’re proud of",
      bullets: [
        "The full journey works end to end: describe a plan, get matched, invite, replan after a decline, vote on a real place, confirm, chat.",
        "A model trained on real human data that beats the simple “count shared interests” approach.",
        "The venue vote, where the group picks between three real, nearby places instead of one person deciding.",
        "Privacy we tested ourselves, with 186 backend tests that try to break it.",
      ],
    },
    {
      id: "learned",
      title: "What we learned",
      bullets: [
        {
          lead: "Match the tool to the job",
          text: "a trained model ranks people better (fast, consistent, fair), while Muse Spark shines at messy human sentences and researching real places.",
        },
        {
          lead: "Good AI products need guardrails outside the AI",
          text: "the most important safety rules live in the backend, not in prompts.",
        },
      ],
    },
    {
      id: "next",
      title: "What’s next",
      bullets: [
        "Deploy it so people at the next hackathon can use it, starting with team-finding at events like HackTX.",
        "Retrain the matcher on real InGather outcomes (who accepted and who passed) instead of simulated parts.",
        "Add what a real launch needs: email confirmation, password reset, real ID verification and human moderation.",
        "Event mode, so organizers can let attendees find teammates and groups safely.",
      ],
      note: "Verification in the demo is simulated: no ID is checked, and all demo people are fictional. A real Stripe Identity check is built but needs API keys.",
    },
  ],
  builtWith: [
    "React",
    "Vite",
    "TypeScript",
    "Tailwind",
    "FastAPI",
    "Python",
    "SQLAlchemy",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "Muse Spark",
    "Muse Image",
    "Muse Voice Transcribe",
    "Google Maps",
    "scikit-learn",
  ],
};
