import type { TimelineEvent } from "@/components/applications/applications.types";

/**
 * One application's walkthrough, for the Workflows view the hero preview cycles through.
 *
 * <p>The same four fields a real entry has - the kind of step, its date, and the line of detail
 * the backend writes beside it. Kept honest on purpose: a preview that shows a shape the product
 * cannot produce is a promise it has to keep later.
 */
export const EXAMPLE_WORKFLOW: { event: TimelineEvent; label: string; detail: string; when: string }[] = [
  {
    event: "APPLICATION_CREATED",
    label: "Application started",
    detail: "Applied to Stripe",
    when: "2 Oct",
  },
  {
    event: "SCREENING_CALL",
    label: "Screening call",
    detail: "Kofi Mensah",
    when: "7 Oct",
  },
  {
    event: "ASSIGNMENT_RECEIVED",
    label: "Take-home received",
    detail: "Build a rate limiter",
    when: "9 Oct",
  },
  {
    event: "INTERVIEW_ROUND",
    label: "Interview round",
    detail: "Round 2 of 4 — cleared",
    when: "15 Oct",
  },
];
