import { devpostImages, type Project } from "../project-types";

export const mytwin: Project = {
  id: "mytwin",
  title: "myTwin",
  category: "Full stack",
  hackathon: true,
  color: "lime",
  eyebrow: "REVENUECAT SHIPATON 2026 / IOS + HEALTH AI",
  summary:
    "An iOS planner with Dash, an animated 3D companion who turns your sleep, calendar and goals into a day you can actually follow, and talks it through with you.",
  did: "Built a native iOS app that reads Apple Health and your calendar, estimates your energy, schedules your goals around real events, and holds spoken mentor conversations.",
  how: "SwiftUI with HealthKit and EventKit, a Blender-modelled Dash running in RealityKit, a small energy model trained on the PMData dataset, Gemini Live for voice, and RevenueCat for Pro.",
  tags: ["Swift", "SwiftUI", "RealityKit", "HealthKit", "Gemini Live"],
  metric: "90",
  metricLabel: "passing unit tests",
  period: "Oct 2026",
  context: "RevenueCat Shipaton 2026 · October 2026 · Solo build",
  github: "https://github.com/aditya-baniya-ai/myTwin",
  devpost: "https://devpost.com/software/mytwin",
  facts: [
    { label: "Event", value: "RevenueCat Shipaton 2026" },
    { label: "When", value: "October 2026" },
    { label: "Team", value: "Solo project" },
    { label: "Status", value: "Prototype, heading to the App Store" },
  ],
  metrics: [
    { value: "90", label: "passing unit tests" },
    { value: "1,747", label: "labelled days from 16 people used to evaluate the energy model" },
    { value: "4", label: "energy states for Dash, with 9 animation clips" },
    { value: "Free + Pro", label: "guest demo lets anyone explore both with fictional data" },
  ],
  media: [
    { type: "youtube", id: "kqYKN65R0ek", title: "myTwin demo video" },
    ...devpostImages(
      "myTwin",
      [
        "005/463/702",
        "005/463/686",
        "005/463/687",
        "005/463/688",
        "005/463/689",
        "005/463/690",
        "005/463/693",
        "005/463/694",
        "005/463/695",
        "005/463/696",
        "005/463/697",
        "005/463/698",
        "005/463/699",
        "005/463/700",
        "005/463/701",
      ],
      {
        0: "myTwin app screenshot without device frames",
        4: "The myTwin app icon, 1024 by 1024",
      },
    ),
  ],
  sections: [
    {
      id: "inspiration",
      title: "Why I built it",
      paragraphs: [
        "I had a Garmin watch that gave me plenty of health and activity data, but I didn’t always know what to do with it. Seeing the numbers was one thing; knowing how to use them to plan my day was another.",
        "At the same time I kept asking ChatGPT “What should I do today?” but those conversations didn’t have my health records, calendar or goals. I was asking for personal guidance without giving the assistant the context it needed.",
        "That led to myTwin: a personal assistant I could talk to, backed by the information I choose to share, that turns health data, commitments and goals into a practical plan and then has a real back-and-forth about it. I built it as a solo project.",
      ],
    },
    {
      id: "what-it-does",
      title: "What it does",
      paragraphs: [
        "Meet Dash, an animated 3D companion who can look energetic, relaxed, tired or exhausted based on your estimated energy. Check in with how you actually feel and the plan adjusts.",
      ],
      bullets: [
        { lead: "See your day", text: "sleep, activity and other Apple Health records alongside your calendar." },
        { lead: "Understand your energy", text: "Pro shows an estimated energy curve, possible focus times and a recap of your week." },
        { lead: "Plan your goals", text: "write or speak goals for today and tomorrow; Pro finds time around existing events. Edit times, tick goals off and carry unfinished work forward." },
        { lead: "Rescue a busy day", text: "preview a change to a flexible activity, confirm it, and undo it if needed. Fixed appointments stay put." },
        { lead: "Talk to Dash", text: "short mentor conversations with Gemini Live voice. Speak or type; Dash can use your calendar, goals and available health data, and any calendar change suggested in chat needs your confirmation." },
        { lead: "Stay on track", text: "a Home Screen widget with your energy estimate, Live Activities on the Lock Screen and Dynamic Island, and notifications for goals, events, check-ins and winding down." },
      ],
      note: "A guest demo lets anyone explore Free and Pro with a fictional person, without connecting a watch or sharing personal health records.",
    },
    {
      id: "how-i-built-it",
      title: "How it was built",
      paragraphs: [
        "The app is Swift and SwiftUI. Apple HealthKit supplies health records and EventKit connects the calendar. Dash was modelled, rigged and animated in Blender and runs inside the app with RealityKit, with four energy states, nine animation clips and moving facial features.",
        "For the energy model I downloaded the public PMData research dataset and trained and evaluated against 1,747 labelled days from 16 people, testing each person with a model trained on the other participants. The training and evaluation code is in the repo; the dataset is not bundled.",
        "Regular chat can use Apple’s on-device Foundation Models on supported devices. Pro conversations use Gemini Live for replies and spoken audio, with on-device speech recognition turning the user’s speech into text. Gemini requires permission and internet access. RevenueCat manages Pro access, offerings, purchases and restores.",
      ],
      note: "Honest results: the model helps track some day-to-day changes but does not improve the accuracy of exact energy scores, so the app labels its percentage and hourly curve as estimates, not medical advice.",
    },
    {
      id: "challenges",
      title: "Challenges",
      bullets: [
        {
          lead: "Making voice feel natural",
          text: "the microphone must wait until Dash finishes speaking so he doesn’t hear himself as the user’s answer, and the conversation has to handle pauses, typed replies and ending cleanly.",
        },
        {
          lead: "Incomplete health data",
          text: "someone may have steps but no sleep, or not enough history for a forecast. myTwin shows what’s missing and still allows check-ins and goal tracking.",
        },
        {
          lead: "Clear calendar controls",
          text: "Rescue previews before saving and chat asks for confirmation, so users always understand what will happen to their calendar.",
        },
        {
          lead: "Demo and real Pro must match",
          text: "a feature working in the demo doesn’t prove it works for a personal subscriber, so both are tested separately.",
        },
      ],
    },
    {
      id: "learned",
      title: "What I learned",
      bullets: [
        "More complex models are not always better. Testing several approaches led to a small model and a clearer explanation of what its predictions can and cannot mean.",
        "Voice interfaces need careful turn-taking, not just speech in and speech out.",
        "Demo access and real subscription access need separate tests.",
      ],
    },
    {
      id: "status",
      title: "Where it stands",
      paragraphs: [
        "The project combines a custom animated character, health data, calendar planning, goal tracking, Pro subscriptions and voice or text conversations in one iOS app. Verification includes 90 passing unit tests, app walkthroughs, a personal Pro test using a simulated purchase, and Gemini conversations using fictional data.",
        "Real-phone microphone behavior, Bluetooth and live Health syncing still need further device checks. The goal is to finish real-device testing, publish on the App Store, and keep improving it from feedback.",
      ],
    },
  ],
  builtWith: [
    "Swift",
    "SwiftUI",
    "HealthKit",
    "EventKit",
    "RealityKit",
    "WidgetKit",
    "ActivityKit",
    "Foundation Models",
    "Gemini Live API",
    "RevenueCat",
    "Blender",
    "Python",
    "Xcode",
  ],
};
