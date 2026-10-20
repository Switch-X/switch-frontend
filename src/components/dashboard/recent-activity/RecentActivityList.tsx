"use client";

import { EmptyState } from "@/components/ui/feedback/EmptyState";
import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { Icon } from "@/components/ui/icons";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import { mostRecentlyActive } from "@/components/dashboard/recent-activity/recentActivity.utils";
import { RecentActivityItem } from "./RecentActivityItem";

export function RecentActivityList() {
  const { loading, applications } = useDashboardData();

  if (loading) return <SkeletonList count={3} itemClassName="h-12" />;

  const recent = mostRecentlyActive(applications);
  if (recent.length === 0) {
    return (
      <EmptyState
        icon={<Icon.Inbox />}
        title="Nothing has moved yet"
        description="Activity shows up here as you update applications."
      />
    );
  }

  return (
    <ul className="divide-y divide-border">
      {recent.map((application) => (
        <RecentActivityItem key={application.id} application={application} />
      ))}
    </ul>
  );
}
