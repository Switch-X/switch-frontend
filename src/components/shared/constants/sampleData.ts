import { SAMPLE_DATA_COUNTS } from "@/lib/sampleData";

/** What the sample-data dialog promises, line by line, before anything is created. */
export const SAMPLE_DATA_CHECKLIST: { count: number; noun: string }[] = [
  { count: SAMPLE_DATA_COUNTS.applications, noun: "applications, across every status" },
  { count: SAMPLE_DATA_COUNTS.interviews, noun: "interviews" },
  { count: SAMPLE_DATA_COUNTS.rounds, noun: "rounds, with questions and feedback" },
  { count: SAMPLE_DATA_COUNTS.assignments, noun: "assignments" },
  { count: SAMPLE_DATA_COUNTS.screeningCalls, noun: "screening calls" },
];
