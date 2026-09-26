"use client";

import type { ReactNode } from "react";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";

/**
 * Everything below the greeting, or the reason it cannot be shown.
 *
 * <p>If any of the four lists fails, the page is the error rather than a half-drawn dashboard
 * with zeroes in it that look like real counts.
 */
export function DashboardBody({ children }: { children: ReactNode }) {
  const { error } = useDashboardData();
  if (error) return <ErrorNote>{error}</ErrorNote>;

  return <>{children}</>;
}
