import type { IconComponent } from "@/components/ui/icons";

/** One stage of "How it works": the record SWITCH keeps, and what it holds. */
export type JourneyStage = {
  key: string;
  label: string;
  icon: IconComponent;
  headline: string;
  body: string;
  /** Gradient classes for the stage card. */
  tone: string;
  /** Background class for the pulsing dot. */
  dot: string;
  fields: { label: string; value: string; accent?: string }[];
};
