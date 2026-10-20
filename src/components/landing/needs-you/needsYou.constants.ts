import { Icon } from "@/components/ui/icons";
import type { IconComponent } from "@/components/ui/icons";

/**
 * The dashboard's "needs you this week" list, as the landing page shows it.
 *
 * <p>Built to the real rule, not to look tidy. `dueThisWeek` takes applications still to be sent
 * and take-homes still to be handed in, inside a seven-day window - and keeps the overdue ones
 * on the list rather than letting them drop off it, which is the whole point of the block. So
 * the first row here is late. A screenshot where everything is comfortably in hand would be
 * advertising a problem nobody has.
 */
type NeedsYouRow = {
  kind: string;
  icon: IconComponent;
  company: string;
  role: string;
  when: string;
  /** `late` is past its date, `soon` is inside three days, `ahead` is the rest of the window. */
  urgency: "late" | "soon" | "ahead";
};

export const NEEDS_YOU: NeedsYouRow[] = [
  {
    kind: "Submit before",
    icon: Icon.Assignments,
    company: "Datadog",
    role: "Platform Engineer",
    when: "2 days late",
    urgency: "late",
  },
  {
    kind: "Apply before",
    icon: Icon.Applications,
    company: "Linear",
    role: "Product Engineer",
    when: "in 3 days",
    urgency: "soon",
  },
  {
    kind: "Interview",
    icon: Icon.Interviews,
    company: "Stripe",
    role: "Backend Engineer",
    when: "in 5 days",
    urgency: "ahead",
  },
  {
    kind: "Submit before",
    icon: Icon.Assignments,
    company: "Figma",
    role: "Senior Backend Engineer",
    when: "in 6 days",
    urgency: "ahead",
  },
];

/** The left edge, the chip, and the countdown - one colour decision per row, used three ways. */
export const URGENCY: Record<NeedsYouRow["urgency"], { edge: string; chip: string; when: string }> = {
  late: { edge: "bg-bad", chip: "bg-bad-soft text-bad", when: "text-bad" },
  soon: { edge: "bg-warn", chip: "bg-warn-soft text-warn", when: "text-warn" },
  ahead: { edge: "bg-border-strong", chip: "bg-surface-sunken text-ink-muted", when: "text-ink-muted" },
};
