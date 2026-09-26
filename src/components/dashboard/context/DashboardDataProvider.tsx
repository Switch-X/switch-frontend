"use client";

/**
 * The four lists the overview is built from, loaded once and shared by every block on it.
 *
 * <p>Everything on the dashboard is derived from the same four list calls the other pages make,
 * rather than from a summary endpoint, because the backend does not have one. That is fine at
 * this size: the applications call is capped at one page and the rest are small. If the totals
 * ever need to be exact past that cap, it wants an endpoint rather than a bigger page.
 *
 * <p>The page itself is a server component; this is the one piece of it that holds state, so the
 * blocks that show the account's data read it from here rather than each fetching their own.
 */

import { createContext, useContext, type ReactNode } from "react";
import { api } from "@/lib/api";
import { useResource } from "@/lib/hooks";
import type {
  ApplicationView,
  AssignmentView,
  InterviewView,
  ScreeningCallView,
} from "@/lib/types";
import { APPLICATION_LOOKUP_SIZE } from "@/components/shared/constants/applications";
import { companyNameMap } from "@/components/shared/utils/companyNames";
import { isUpcoming } from "@/components/shared/utils/interviews";

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
   * Interviews dated today or later. The backend already sorted them upcoming-first against the
   * account's own timezone, so this only filters rather than sorting again.
   */
  upcoming: InterviewView[];
  /** Interviews and assignments carry only `applicationId`; this names them. */
  companyOf: Map<number, string>;
  reloadAll: () => void;
};

const DashboardDataContext = createContext<DashboardData | null>(null);

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const applications = useResource(
    () => api.applications.list({ size: APPLICATION_LOOKUP_SIZE }),
    [],
  );
  const interviews = useResource(() => api.interviews.list(), []);
  const assignments = useResource(() => api.assignments.list(), []);
  const calls = useResource(() => api.screeningCalls.list(), []);

  const allApplications = applications.data?.content ?? [];
  const allInterviews = interviews.data ?? [];

  const value: DashboardData = {
    loading: applications.loading || interviews.loading || assignments.loading || calls.loading,
    error: applications.error ?? interviews.error ?? assignments.error ?? calls.error,
    applications: allApplications,
    totalApplications: applications.data?.totalElements ?? 0,
    interviews: allInterviews,
    assignments: assignments.data ?? [],
    screeningCalls: calls.data ?? [],
    upcoming: allInterviews.filter(isUpcoming),
    companyOf: companyNameMap(allApplications),
    reloadAll: () => {
      applications.reload();
      interviews.reload();
      assignments.reload();
      calls.reload();
    },
  };

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData(): DashboardData {
  const value = useContext(DashboardDataContext);
  if (!value) throw new Error("useDashboardData must be used inside <DashboardDataProvider>");
  return value;
}
