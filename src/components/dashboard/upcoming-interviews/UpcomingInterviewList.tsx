"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonList } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";
import { linkedCompanyName } from "@/components/shared/utils/companyNames";
import { UPCOMING_INTERVIEWS_SHOWN } from "@/components/dashboard/constants/overview";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import { UpcomingInterviewItem } from "./UpcomingInterviewItem";

export function UpcomingInterviewList() {
  const { loading, upcoming, companyOf } = useDashboardData();

  if (loading) return <SkeletonList count={3} itemClassName="h-12" />;

  if (upcoming.length === 0) {
    return (
      <EmptyState
        icon={<Icon.Calendar />}
        title="Nothing scheduled"
        description="Interviews with a date in the future will appear here."
      />
    );
  }

  return (
    <ul className="divide-y divide-border">
      {upcoming.slice(0, UPCOMING_INTERVIEWS_SHOWN).map((interview) => (
        <UpcomingInterviewItem
          key={interview.id}
          interview={interview}
          company={linkedCompanyName(
            companyOf,
            interview.applicationId,
            "Not linked to an application",
          )}
        />
      ))}
    </ul>
  );
}
