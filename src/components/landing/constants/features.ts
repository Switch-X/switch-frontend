/** The "What needs you today" tile's example rows. */
export const BENTO_DEADLINES = [
  { label: "Datadog · assignment", when: "in 2 days", tone: "text-warn" },
  { label: "Linear · apply before", when: "in 3 days", tone: "text-warn" },
  { label: "Atlassian · missed", when: "10 days ago", tone: "text-bad" },
];

/** Every application status, drawn as the badge the app uses for it. */
export const BENTO_STATUSES = [
  { label: "Not applied yet", tone: "bg-surface-sunken text-ink-muted" },
  { label: "Applied", tone: "bg-info-soft text-info" },
  { label: "Interviewing", tone: "bg-accent-soft text-accent" },
  { label: "Assignment", tone: "bg-brand-soft text-brand" },
  { label: "On hold", tone: "bg-warn-soft text-warn" },
  { label: "Offered", tone: "bg-good-soft text-good" },
  { label: "Offer revoked", tone: "bg-bad-soft text-bad" },
  { label: "Rejected", tone: "bg-bad-soft text-bad" },
  { label: "Missed", tone: "bg-bad-soft text-bad" },
  { label: "Withdrawn", tone: "bg-surface-sunken text-ink-muted" },
];
