import { Icon } from "@/components/ui/icons";
import type { TimelineEvent } from "@/components/applications/applications.types";

/**
 * How each kind of step is drawn.
 *
 * <p>The colour carries the meaning at a glance - an offer and a rejection should not look the
 * same when you are scanning six applications. `label` is the step's own heading; the detail the
 * backend wrote goes underneath it.
 */
export const WORKFLOW_STEPS: Record<
  TimelineEvent,
  { label: string; icon: keyof typeof Icon; dot: string; ring: string }
> = {
  APPLICATION_CREATED: {
    label: "Application started",
    icon: "Applications",
    dot: "bg-info",
    ring: "ring-info/25",
  },
  STATUS_CHANGED: {
    label: "Status changed",
    icon: "ArrowRight",
    dot: "bg-brand",
    ring: "ring-brand/25",
  },
  SCREENING_CALL: {
    label: "Screening call",
    icon: "Screening",
    dot: "bg-accent",
    ring: "ring-accent/25",
  },
  ASSIGNMENT_RECEIVED: {
    label: "Take-home received",
    icon: "Assignments",
    dot: "bg-warn",
    ring: "ring-warn/25",
  },
  ASSIGNMENT_SUBMITTED: {
    label: "Take-home submitted",
    icon: "Check",
    dot: "bg-good",
    ring: "ring-good/25",
  },
  INTERVIEW_ROUND: {
    label: "Interview round",
    icon: "Interviews",
    dot: "bg-brand",
    ring: "ring-brand/25",
  },
};
