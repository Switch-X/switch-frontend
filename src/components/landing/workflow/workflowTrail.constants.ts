import { Icon } from "@/components/ui/icons";
import type { IconComponent } from "@/components/ui/icons";

/**
 * One application's whole run, as the landing page draws it.
 *
 * <p>Six steps: enough to show the shape of a real run - applied, screened, a take-home, two
 * rounds, an answer - and few enough that each one still has room to be read when they are laid
 * across the screen. A real search is longer and messier, which is what the product is for.
 *
 * <p>Every one of these is a step the product genuinely records. The last is green because a
 * tracker that only ever shows amber is a depressing advertisement for itself.
 */
type TrailStep = {
  label: string;
  detail: string;
  when: string;
  icon: IconComponent;
  /** The node's fill, and the line leading away from it. */
  dot: string;
  ring: string;
};

export const WORKFLOW_TRAIL: TrailStep[] = [
  {
    label: "Applied",
    detail: "Stripe — Backend Engineer",
    when: "2 Oct",
    icon: Icon.Applications,
    dot: "bg-info",
    ring: "ring-info/20",
  },
  {
    label: "Screening call",
    detail: "Kofi Mensah · 25 min",
    when: "7 Oct",
    icon: Icon.Screening,
    dot: "bg-accent",
    ring: "ring-accent/20",
  },
  {
    label: "Take-home",
    detail: "Build a rate limiter",
    when: "9 Oct",
    icon: Icon.Assignments,
    dot: "bg-warn",
    ring: "ring-warn/20",
  },
  {
    label: "Round 1",
    detail: "Online · Medium · cleared",
    when: "15 Oct",
    icon: Icon.Interviews,
    dot: "bg-brand",
    ring: "ring-brand/20",
  },
  {
    label: "Round 2",
    detail: "On site · Hard · cleared",
    when: "18 Oct",
    icon: Icon.Interviews,
    dot: "bg-brand",
    ring: "ring-brand/20",
  },
  {
    label: "Offer",
    detail: "And the part you did this for",
    when: "22 Oct",
    icon: Icon.Check,
    dot: "bg-good",
    ring: "ring-good/20",
  },
];

/** How long between one step landing and the next starting. */
export const TRAIL_STEP_MS = 420;
