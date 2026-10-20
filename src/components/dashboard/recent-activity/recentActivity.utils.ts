import type { ApplicationView } from "@/components/applications/applications.types";
import { RECENT_ACTIVITY_SHOWN } from "@/components/dashboard/overview.constants";

/** The applications that changed most recently, newest first. */
export function mostRecentlyActive(
  applications: ApplicationView[],
  limit = RECENT_ACTIVITY_SHOWN,
): ApplicationView[] {
  return [...applications]
    .filter((application) => application.lastActivity)
    .sort((left, right) => (right.lastActivity ?? "").localeCompare(left.lastActivity ?? ""))
    .slice(0, limit);
}
