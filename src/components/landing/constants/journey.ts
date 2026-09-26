import { Icon } from "@/components/ui/icons";
import type { JourneyStage } from "@/components/landing/types/journey";

/** How long each stage holds before the journey moves on by itself. */
export const STAGE_DWELL_MS = 5200;

/**
 * The five stages of a job search, in order. Each names the record SWITCH keeps and shows what
 * that record actually holds, which explains the data model without ever calling it one.
 */
export const JOURNEY_STAGES: JourneyStage[] = [
  {
    key: "applied",
    label: "Applied",
    icon: Icon.Applications,
    headline: "Every application, with the date that actually matters",
    body: "Company, role, job id, where it came from, and the deadline you stop being able to apply. Sorted by whichever is closest, so the list is a to-do rather than an archive.",
    tone: "from-info/15 to-transparent",
    dot: "bg-info",
    fields: [
      { label: "Company", value: "Linear" },
      { label: "Role", value: "Product Engineer" },
      { label: "Source", value: "Cold email" },
      { label: "Apply before", value: "in 3 days", accent: "text-bad" },
    ],
  },
  {
    key: "screening",
    label: "Screening call",
    icon: Icon.Screening,
    headline: "The recruiter call you will not remember in a fortnight",
    body: "Who called, from where, how long it ran and what happened next. A cold reach-out has no application behind it yet, so it does not need one — log it and link it later.",
    tone: "from-accent/15 to-transparent",
    dot: "bg-accent",
    fields: [
      { label: "Who called", value: "Kofi Mensah" },
      { label: "Company", value: "Datadog" },
      { label: "Length", value: "25m" },
      { label: "Outcome", value: "Assignment sent", accent: "text-accent" },
    ],
  },
  {
    key: "assignment",
    label: "Assignment",
    icon: Icon.Assignments,
    headline: "Take-homes, and the Friday you keep forgetting",
    body: "What was set, when it landed, when it is due and how hard it turned out to be. Outstanding work with a deadline inside the week is pulled onto the dashboard on its own.",
    tone: "from-brand/15 to-transparent",
    dot: "bg-brand",
    fields: [
      { label: "Task", value: "Metrics ingestion pipeline" },
      { label: "Difficulty", value: "Hard", accent: "text-warn" },
      { label: "Submit before", value: "in 2 days", accent: "text-warn" },
      { label: "State", value: "In progress" },
    ],
  },
  {
    key: "interview",
    label: "Interview",
    icon: Icon.Interviews,
    headline: "Rounds, not just interviews",
    body: "A five-round loop is one thread, and every round keeps its own interviewer, format, difficulty, outcome and the questions you were actually asked. Those notes pay off three interviews later.",
    tone: "from-brand/15 to-transparent",
    dot: "bg-brand",
    fields: [
      { label: "Round 3 of 3", value: "Priya Nair" },
      { label: "Format", value: "On site · 1h 30m" },
      { label: "Questions kept", value: "2" },
      { label: "Outcome", value: "Awaiting result", accent: "text-warn" },
    ],
  },
  {
    key: "offer",
    label: "Offer",
    icon: Icon.Check,
    headline: "And the part you are doing all this for",
    body: "Ten statuses, including the ones nobody puts in a demo — on hold, withdrawn, missed, offer revoked. A tracker that only models success is no use on the week you need it.",
    tone: "from-good/15 to-transparent",
    dot: "bg-good",
    fields: [
      { label: "Company", value: "Figma" },
      { label: "Role", value: "Senior Backend Engineer" },
      { label: "Route", value: "Through a connection" },
      { label: "Status", value: "Offered", accent: "text-good" },
    ],
  },
];
