import type {
  ApplicationView,
  AssignmentView,
  InterviewView,
  ScreeningCallView,
} from "@/lib/types";
import { ACTIVE_STATUSES } from "@/components/dashboard/constants/overview";

export function countActive(applications: ApplicationView[]): number {
  return applications.filter((item) => ACTIVE_STATUSES.has(item.applicationStatus)).length;
}

export function countOffers(applications: ApplicationView[]): number {
  return applications.filter((item) => item.applicationStatus === "OFFERED").length;
}

export function countOutstanding(assignments: AssignmentView[]): number {
  return assignments.filter((item) => item.submission !== "COMPLETED").length;
}

/**
 * "Empty" means the whole account, not just one list - an account with a screening call and
 * nothing else has started, and should not be offered a fresh-start block.
 */
export function isAccountEmpty(account: {
  applications: ApplicationView[];
  interviews: InterviewView[];
  assignments: AssignmentView[];
  screeningCalls: ScreeningCallView[];
}): boolean {
  return (
    account.applications.length === 0 &&
    account.interviews.length === 0 &&
    account.assignments.length === 0 &&
    account.screeningCalls.length === 0
  );
}

/** What the greeting calls someone. */
export function firstNameOf(fullName: string | null | undefined): string {
  return fullName?.split(" ")[0] ?? "there";
}
