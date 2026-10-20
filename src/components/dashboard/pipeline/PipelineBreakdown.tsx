"use client";

import { EmptyState } from "@/components/ui/feedback/EmptyState";
import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { Icon } from "@/components/ui/icons";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import { statusBreakdown } from "@/components/dashboard/pipeline/pipeline.utils";
import { PipelineRow } from "./PipelineRow";

export function PipelineBreakdown() {
  const { loading, applications } = useDashboardData();

  if (loading) return <SkeletonList count={4} itemClassName="h-8" />;

  const ordered = statusBreakdown(applications);
  if (ordered.length === 0) {
    return (
      <EmptyState
        icon={<Icon.Applications />}
        title="No applications yet"
        description="Add one and the breakdown will build itself."
      />
    );
  }

  const highest = ordered[0]?.[1] ?? 1;

  return (
    <ul className="space-y-3 p-5">
      {ordered.map(([status, count]) => (
        <PipelineRow key={status} status={status} count={count} highest={highest} />
      ))}
    </ul>
  );
}
