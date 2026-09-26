import { daysUntil } from "@/lib/format";
import type { InterviewView } from "@/lib/types";

/**
 * Dated today or later.
 *
 * <p>Only ever used to filter or badge - never to sort. `InterviewServiceImpl` already orders
 * interviews upcoming-first against the account holder's own timezone, and re-sorting in the
 * browser would substitute this machine's zone and get it wrong for anyone else.
 */
export function isUpcoming(interview: InterviewView): boolean {
  const days = daysUntil(interview.interviewDate);
  return days !== null && days >= 0;
}
