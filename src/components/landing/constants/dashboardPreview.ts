/** The three views the preview cycles through, in order. */
export const PREVIEW_VIEWS = ["Overview", "Applications", "Interviews"] as const;

/** How long each view holds before the preview moves on. */
export const PREVIEW_CYCLE_MS = 3800;

/** The miniature sidebar - the real one, shrunk. */
export const PREVIEW_NAV = ["Overview", "Applications", "Interviews", "Assignments", "Calls"];

export const PREVIEW_STATS = [
  { label: "Applications", value: "24", tone: "text-ink" },
  { label: "Interviews", value: "6", tone: "text-accent" },
  { label: "Assignments", value: "3", tone: "text-ink" },
  { label: "Offers", value: "2", tone: "text-good" },
];

export const PREVIEW_PIPELINE = [
  { label: "Applied", width: "92%", tone: "bg-info" },
  { label: "Interviewing", width: "64%", tone: "bg-accent" },
  { label: "Assignment", width: "44%", tone: "bg-brand" },
  { label: "Offered", width: "24%", tone: "bg-good" },
  { label: "Rejected", width: "38%", tone: "bg-bad" },
];

export const PREVIEW_FILTERS = ["Any status", "LinkedIn", "Nearest deadline"];

/** `urgent` paints the deadline red, the way the real table does inside three days. */
export const PREVIEW_APPLICATIONS = [
  { company: "Stripe", role: "Backend Engineer", badge: "Interviewing", tone: "bg-accent-soft text-accent", due: "in 18d", urgent: false },
  { company: "Linear", role: "Product Engineer", badge: "Not applied", tone: "bg-surface-sunken text-ink-muted", due: "in 3d", urgent: true },
  { company: "Datadog", role: "Platform Engineer", badge: "Assignment", tone: "bg-brand-soft text-brand", due: "in 6d", urgent: false },
  { company: "Figma", role: "Senior Backend", badge: "Offered", tone: "bg-good-soft text-good", due: "—", urgent: false },
];
