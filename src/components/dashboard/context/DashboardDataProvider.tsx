"use client";

/**
 * The four lists the overview is built from, loaded once and shared by every block on it.
 *
 * <p>Everything on the dashboard is derived from the same four list calls the other pages make,
 * rather than from a summary endpoint, because the backend does not have one.
 *
 * <p>All four are paged, and all four are asked for one deliberately large page rather than the
 * ten a list screen shows - the blocks here count rows, bucket them by status and work out what
 * is due, so a page of ten would quietly answer those questions about ten records. `totalElements`
 * is the server's own count and keeps going past the cap, which is why the counts that have to be
 * right read that rather than `content.length`. If the rest ever need to be exact past the cap,
 * that wants a summary endpoint rather than a bigger page.
 *
 * <p>The page itself is a server component; this is the one piece of it that holds state, so the
 * blocks that show the account's data read it from here rather than each fetching their own.
 */

import { screeningCallsApi } from "@/components/screening-calls/screeningCalls.api";
import { interviewsApi } from "@/components/interviews/interviews.api";
import { assignmentsApi } from "@/components/assignments/assignments.api";
import { applicationsApi } from "@/components/applications/applications.api";
import { createContext, useContext, type ReactNode } from "react";

import { useResource } from "@/lib/hooks/useResource";
import type { ApplicationView } from "@/components/applications/applications.types";
import type { AssignmentView } from "@/components/assignments/assignments.types";
import type { InterviewView } from "@/components/interviews/interviews.types";
import type { ScreeningCallView } from "@/components/screening-calls/screeningCalls.types";
import { OVERVIEW_PAGE_SIZE } from "@/components/dashboard/overview.constants";
import { bySoonest, isUpcoming } from "@/components/shared/utils/interviews";

type DashboardData = {
  loading: boolean;
  /** The first of the four lists to fail, if any did. */
  error: string | null;
  applications: ApplicationView[];
  /** The server's count, which keeps going past the one page `applications` holds. */
  totalApplications: number;
  interviews: InterviewView[];
  assignments: AssignmentView[];
  screeningCalls: ScreeningCallView[];
  /**
   * Interviews dated today or later, the soonest first.
   *
   * <p>Sorted here, and it has to be: the interviews endpoint sends the most recent first, which
   * is the right order for a log of what has happened and the wrong one for a list of what is
   * coming - it would lead with the interview furthest away. Sorting a page in the browser is
   * only safe because this block is a view of one capped page rather than a pager of its own.
   */
  upcoming: InterviewView[];
};

const DashboardDataContext = createContext<DashboardData | null>(null);

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const applications = useResource(
    () => applicationsApi.list({ size: OVERVIEW_PAGE_SIZE }),
    [],
  );
  const interviews = useResource(() => interviewsApi.list({ size: OVERVIEW_PAGE_SIZE }), []);
  const assignments = useResource(() => assignmentsApi.list({ size: OVERVIEW_PAGE_SIZE }), []);
  const calls = useResource(() => screeningCallsApi.list({ size: OVERVIEW_PAGE_SIZE }), []);

  const allApplications = applications.data?.content ?? [];
  const allInterviews = interviews.data?.content ?? [];

  const value: DashboardData = {
    loading: applications.loading || interviews.loading || assignments.loading || calls.loading,
    error: applications.error ?? interviews.error ?? assignments.error ?? calls.error,
    applications: allApplications,
    totalApplications: applications.data?.totalElements ?? 0,
    interviews: allInterviews,
    assignments: assignments.data?.content ?? [],
    screeningCalls: calls.data?.content ?? [],
    upcoming: allInterviews.filter(isUpcoming).sort(bySoonest),
  };

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData(): DashboardData {
  const value = useContext(DashboardDataContext);
  if (!value) throw new Error("useDashboardData must be used inside <DashboardDataProvider>");
  return value;
}
